import { InitiativeService } from '@services/initiative/initiative.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { DetailInformation } from '@models/detailInformation';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { PoolService } from '@services/pool/pool.service';

@Component({
  selector: 'app-pool-detail-form',
  templateUrl: './pool-detail-form.component.html',
  styleUrls: ['./pool-detail-form.component.css']
})
export class PoolDetailFormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  id: number;
  detailKpisForm: FormGroup;
  isRemoveKpis: boolean;
  isDisableAddKpis: boolean;
  frequencies: any;
  kpiArray: any = [];
  kpises: any;
  kpiDetails: any;

  detailForm = this.fb.group({
    id: 0,
    productionProcess: null,
    milestoneSchedule: null,
    expectedTarget: null,
    comparisonWithOther: null,
    otherResources: null,
    otherInvestment: null,
    consistent: null,
    keySuccessFactor: null,
    synergyBenefit: null,
    otherStrategic: null,
    marketOverview: null,
    potentialCustomer: null,
    salesPlan: null,
    sourceOfFeedback: null,
    sourceOfFeedstock: null,
    otherBusiness: null,
    safetyIndex: null,
    corporateImageIndex: null,
    otherQuality: null,
    baseCase: null,
    projectIrrBaseCase: null,
    npvBaseCase: null,
    paybackBaseCase: null,
    ebitdaBaseCase: null,
    optimisticCase: null,
    projectIrrOptimisticCase: null,
    npvOptimisticCase: null,
    paybackOptimisticCase: null,
    ebitdaOptimisticCase: null,
    pessimisticCase: null,
    projectIrrPessimisticCase: null,
    npvPessimisticCase: null,
    paybackPessimisticCase: null,
    ebitdaPessimisticCase: null,
    depreciationCost: '0',
    usefulYear: null,
    usefulMonth: null,
    kpisForm: this.fb.group({ kpis: this.fb.array([]) }),
    remark: null,
    otherKpis: null,
    president: null
  });


  constructor(
    private fb: FormBuilder,
    private detailInformationService: DetailInformationService,
    private initiativeService: InitiativeService,
    private poolService: PoolService
  ) { }

  ngOnInit(): void {
    this.id = this.initiativeService.id;

    if (!this.formGroup.get('detailForm')) {
      this.formGroup.addControl('detailForm', this.detailForm);
    }
    if (this.initiativeService.id) {
      this.GetDetailInformation();
    }
  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }

  GetDetailInformation() {
    this.detailInformationService.GetDetailInformation(this.initiativeService.id).subscribe(response => {
      if (response) {
        this.detailForm.patchValue(response);
        this.GetFrequency();
        this.GetKpis();
      }
    });
    if (this.initiativeService.viewMode) {
      this.detailForm.disable();
    }
  }

  AddKpis() {
    const control = this.detailForm.controls.kpisForm.get('kpis') as FormArray;
    control.push(this.DetailKpisForm());
    this.isRemoveKpis = control.length > 1 ? false : true;
    this.isDisableAddKpis = control.length === this.kpises.length ? true : false;
  }

  DetailKpisForm(): FormGroup {
    return this.fb.group({ id: [0], kpis: '', target: null, frequency: '', initiativeId: this.initiativeService.id });
  }

  calculateDepreciationCost() {
    let depreciationCost = this.poolService.calculateDepreciationCost(this.formGroup);
    this.detailForm.get('depreciationCost').setValue(depreciationCost);

  }

  RemoveKpis(index: number) {
    this.kpiArray = this.kpiArray.filter(el => el.id !== index);
    this.SetKpiSelect();
    const control = this.detailForm.controls.kpisForm.get('kpis') as FormArray;
    control.removeAt(index);
    this.detailForm.controls.kpisForm.markAsDirty();
    this.isRemoveKpis = control.length > 1 ? false : true;
    this.isDisableAddKpis = control.length === this.kpises.length ? true : false;
  }

  SetKpiSelect() {
    this.kpises.forEach(result => {
      if (this.kpiArray.some(e => e.title === result.kpisTitle)) {
        result.disabled = true;
      } else {
        result.disabled = false;
      }
    });
  }

  GetKpis() {
    this.detailInformationService.GetKpis().subscribe(kpis => {
      this.kpises = kpis;
      this.kpises.forEach(result => result.disabled = false);
      this.GetKpiDetail(this.initiativeService.id);
      this.GetDetail(this.initiativeService.id);
    });
  }

  GetKpiDetail(id) {
    this.detailInformationService.GetKpiDetail(id).subscribe(response => {
      this.kpiDetails = response.kpiDetailInformations;
      if (this.kpiDetails.length !== 0) {
        const KpiControl = this.detailForm.controls.kpisForm.get('kpis') as FormArray;
        for (let i = 0; i < this.kpiDetails.length; i++) {
          KpiControl.push(this.DetailKpisForm());
          KpiControl.at(i).patchValue(this.kpiDetails[i]);
          KpiControl.at(i).get('id').patchValue(0);
          this.kpiArray.push({ id: i, title: this.kpiDetails[i].kpis });
          // if (this.page === 'pool-view') { KpiControl.at(i).disable(); }
        }
        this.SetKpiSelect();
        this.isRemoveKpis = KpiControl.length > 1 ? false : true;
        this.isDisableAddKpis = KpiControl.length === this.kpises.length ? true : false;
      } else {
        this.AddKpis();
      }
    });
  }

  GetDetail(id) {
    this.detailInformationService.GetDetailInformation(id).subscribe(response => {
      if (response) {
        this.detailForm.patchValue(response);
      }
    });
  }

  GetFrequency() {
    this.detailInformationService.GetFrequency().subscribe(frequency => {
      this.frequencies = frequency
    });
  }

  ChangeKpis(index, event) {
    this.kpiArray = this.kpiArray.filter(el => el.id !== index);
    this.kpiArray.push({ id: index, title: event.target.value });
    this.SetKpiSelect();
  }

  Log() {

  }
}
