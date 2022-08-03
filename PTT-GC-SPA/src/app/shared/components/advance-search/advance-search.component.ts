import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { InitiativeService } from '@services/initiative/initiative.service';
import { AuthService } from '@services/authentication/auth.service';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { FormBuilder } from '@angular/forms';
import { DateUtil } from '@utils/date.utils';
import { ImpactService } from '@services/impact/impact.service';
import { MaxService } from '@services/max/max.service';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dateUtil: DateUtil,
    private authService: AuthService,
    private unauthorized: UnauthorizedService,
    private initiativeService: InitiativeService,
    private impactService: ImpactService,
    private maxService: MaxService,
  ) { }

  @Input() name: string;

  @Input() progress: boolean;
  @Input() complete: boolean;
  @Input() cancel: boolean;

  @Output() modelClose = new EventEmitter();
  @Output() AdvancedSearch = new EventEmitter();

  params: any = {};
  owners: any = [];
  organizations: any = [];
  plants: any = [];
  typeOfInvestments: any = [];
  workStreams: any = [];
  subWorkstreams: any = [];

  typeList: {
    typeName: string;
    typeValue: string;
  }[] = [
      { typeName: "CIM", typeValue: "cim" },
      { typeName: "PIM", typeValue: "pim" },
      { typeName: "DIM", typeValue: "dim" },
      { typeName: "MAX", typeValue: "max" },
      { typeName: "Direct CAPEX", typeValue: "directCapex" },
      { typeName: "CPI", typeValue: "cpi" },
      { typeName: "Strategy", typeValue: "strategy" },
      { typeName: "R&D", typeValue: "randD" },
      { typeName: "Other", typeValue: "other" },
      { typeName: "IT", typeValue: "IT" },
      { typeName: "Digital", typeValue: "Digital" },
      { typeName: "Request Pool", typeValue: "Request Pool" }
    ]

  statusList: {
    statusName: string;
    statusValue: string;
  }[] = [
      { statusName: "Draft", statusValue: "draft" },
      { statusName: "Admin check", statusValue: "admin check" },
      { statusName: "Wait for submission", statusValue: "wait for submission" },
      { statusName: "Revise", statusValue: "revise" },
      { statusName: "Reject", statusValue: "reject" },
      { statusName: "Wait for approval", statusValue: "wait for approval" },
      { statusName: "Wait for review", statusValue: "wait for review" },
      { statusName: "Approved", statusValue: "approved" },
      { statusName: "Revised", statusValue: "revised" },
      { statusName: "Rejected", statusValue: "rejected" },
      { statusName: "Cancelled", statusValue: "cancelled" },

      //new Status
      { statusName: "Wait for final charter", statusValue: "wait for final charter" },
      { statusName: "Wait for CAPEX info", statusValue: "wait for CAPEX info" },
      { statusName: "Wait for final plan", statusValue: "wait for final plan" },
      { statusName: "Wait for go-live update", statusValue: "wait for golive update" },
      { statusName: "Wait for closure", statusValue: "wait for closure" },
      { statusName: "Wait for cancellation", statusValue: "wait for cancellation" }

    ]

  advancedSearchForm = this.fb.group({
    id: '',
    name: '',
    status: '',
    stage: '',
    type: '',
    registerDateSince: '',
    registerDateTo: '',
    ownerName: null,
    organization: null,
    plant: null,
    typeOfInvestment: null,
    username: '',
    progress: true,
    complete: true,
    cancel: true,
    workstream: '',
    subWorkstream1: { value: '', disabled: true }
  });

  bsConfig = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };

  ngOnInit(): void {
    this.initiativeService.GetOwners().subscribe(owners => this.owners = owners);
    this.initiativeService.GetOrganizations().subscribe(organizations => this.organizations = organizations);
    this.initiativeService.GetTypeOfInvestments().subscribe(typeOfInvestments => {
      this.typeOfInvestments = typeOfInvestments;
      this.typeOfInvestments.push({ id: 9999, typeOfInvestment: 'Other', typeOfInvestmentTitle: 'Other' });
    });
    this.initiativeService.GetPlants().subscribe(plants => {
      this.plants = plants;
      // this.plants.push({ id: 9999, plantId: 'P9999', plantTitle: 'Others (please specify)' });
    });
    this.impactService.GetWorkStream().subscribe(workStreams => this.workStreams = workStreams);
  }

  HideModal() {
    this.modelClose.emit();
  }

  OnChangeWorkstream(event) {
    const workstreamName = event.target.value;
    this.advancedSearchForm.controls.subWorkstream1.enable();
    this.advancedSearchForm.patchValue({ subWorkstream1: '' });
    this.maxService.GetSubWorkstream1(workstreamName).subscribe(subWorkstream => this.subWorkstreams = subWorkstream);
  }

  AdvanceSearch(): void {
    const statusProgress = this.progress;
    const statusComplete = this.complete;
    const statusCancel = this.cancel;
    const DateSince = this.advancedSearchForm.value.registerDateSince;
    const DateTo = this.advancedSearchForm.value.registerDateTo;
    const setDateSince = DateSince ? this.dateUtil.SetDate(this.advancedSearchForm.value.registerDateSince) : null;
    const setDateTo = DateTo ? this.dateUtil.SetDate(this.advancedSearchForm.value.registerDateTo) : null;
    this.advancedSearchForm.patchValue({
      progress: statusProgress,
      complete: statusComplete,
      cancel: statusCancel,
      registerDateSince: setDateSince,
      registerDateTo: setDateTo
    });
    switch (this.name) {
      case 'My Tasks':
        this.authService.getMsalUser().subscribe((user) => {
          this.advancedSearchForm.patchValue({ username: user.mail });
          this.AdvancedSearch.emit(this.advancedSearchForm.value);
          this.PatchSearch();
        }, error => this.unauthorized.error(error));
        break;
      case 'My Own Initiatives':
        this.authService.getMsalUser().subscribe((user) => {
          this.advancedSearchForm.patchValue({ username: user.mail });
          this.AdvancedSearch.emit(this.advancedSearchForm.value);
          this.PatchSearch();
        }, error => this.unauthorized.error(error));
        break;
      case 'Overview':
        this.AdvancedSearch.emit(this.advancedSearchForm.value);
        this.PatchSearch();
        break;
    }
    this.GetOwners();
  }

  PatchSearch() {
    this.advancedSearchForm.patchValue({
      id: null,
      username: null,
      name: null,
      status: null,
      type: null,
      registerDateSince: null,
      registerDateTo: null,
      ownerName: null,
      organization: null,
      plant: null,
      typeOfInvestment: null,
      workstream: null,
      subWorkstream1: null,
      stage: null
    });
  }

  SearchOwnerName(event) {
    this.GetOwners(event.term);
  }

  ClearOwnerName() {
    this.GetOwners();
  }

  GetOwners(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.owners = owners;
    });
  }

}
