import { InitiativeService } from '@services/initiative/initiative.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ResponseService } from '@errors/response/response.service';
import { Pagination, PaginatedResult } from '@models/pagination';
import { InitiativeList } from '@models/initiativeList';
import { ActivatedRoute, Router } from '@angular/router';
import { RemoveService } from '@services/remove/remove.service';
import { AuthService } from '@services/authentication/auth.service';
import { PermissionService } from '@services/permission/permission.service';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewInitiativeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private unauthorized: UnauthorizedService,
    private remove: RemoveService,
    private permissionService: PermissionService,
    private initiativeService: InitiativeService,
    private spinner: NgxSpinnerService,
    private response: ResponseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  @ViewChild('searchModal', { static: false }) searchModal: ModalDirective;

  name = 'Overview';

  initiatives: InitiativeList[];
  pagination: Pagination;
  params: any = {};

  currentPage = 1;

  isLoading = false;
  isRefresh = false;

  advanced: object;

  ngOnInit() {
    this.initiativeService.maskUnderline = 'overview';
    //this.CheckOverviewPermission();
    this.remove.Form();
    this.remove.Validate();
    this.remove.Suggestion();
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('box');
    sessionStorage.removeItem('tab');
    sessionStorage.removeItem('InformationTab');
    sessionStorage.removeItem('cancel');
    sessionStorage.removeItem('ActivePage');
    sessionStorage.setItem('page', 'overview');
    sessionStorage.removeItem('lasttime');
    sessionStorage.removeItem('CurrentPageMyOwn');
    sessionStorage.removeItem('CurrentPageMyTask');
    this.isLoading = true;
    this.spinner.show();
    this.route.data.subscribe(data => {
      this.initiatives = data.initiatives.result;
      this.pagination = data.initiatives.pagination;
      this.params.page = 'overview';
      this.params.progress = true;
      this.params.complete = true;
      this.params.cancel = true;
      this.params.text = '';
      this.params.username = '';
      this.params.column = '';
      this.params.orderBy = '';
      this.PatchAdvanced();
      this.GetInitiatives();

    });

  }

  CheckOverviewPermission() {
    // this.authService.getMsalUser().subscribe((user) => {
    //   this.permissionService.CheckOverviewPermission({ email: user.mail }).subscribe((result) => {
    //     // if (!result) { 
    //     //   this.router.navigate(['']); 
    //     // }
    //   });
    // });
  }

  PatchAdvanced() {
    this.params.id = '';
    this.params.name = '';
    this.params.status = '';
    this.params.stage = '';
    this.params.type = '';
    this.params.ownerName = '';
    this.params.organization = '';
    this.params.plant = '';
    this.params.typeOfInvestment = '';
    this.params.registerDateSince = '';
    this.params.registerDateTo = '';
    this.params.workstream = '';
    this.params.subWorkstream1 = '';
  }

  PageChanged(page) {
    this.pagination.currentPage = page;
    this.GetInitiatives();
    // this.searchModal.hide();
    // this.spinner.show();
    // this.isLoading = true;
  }

  ShowModal(status): void {
    this.params.progress = status.progress;
    this.params.complete = status.complete;
    this.params.cancel = status.cancel;
    this.searchModal.show();
  }

  HideModal(): void {
    this.searchModal.hide();
  }

  AdvancedSearch(advanced) {
    this.params.text = '';
    this.params.id = advanced.id ? advanced.id : '';
    this.params.name = advanced.name ? advanced.name : '';
    this.params.stage = advanced.stage ? advanced.stage : '';
    this.params.status = advanced.status ? this.ParamValueEncoding(advanced.status) : '';
    this.params.type = advanced.type ? this.ParamValueEncoding(advanced.type) : '';
    this.params.ownerName = advanced.ownerName ? this.ParamValueEncoding(advanced.ownerName) : '';
    this.params.organization = advanced.organization ? this.ParamValueEncoding(advanced.organization) : '';
    this.params.plant = advanced.plant ? this.ParamValueEncoding(advanced.plant) : '';
    this.params.typeOfInvestment = advanced.typeOfInvestment ? this.ParamValueEncoding(advanced.typeOfInvestment) : '';
    this.params.registerDateSince = advanced.registerDateSince ? advanced.registerDateSince : '';
    this.params.registerDateTo = advanced.registerDateTo ? advanced.registerDateTo : '';
    this.params.workstream = advanced.workstream ? advanced.workstream : '';
    this.params.subWorkstream1 = advanced.subWorkstream1 ? advanced.subWorkstream1 : '';
    this.GetInitiatives();
    this.searchModal.hide();
    this.spinner.show();
    this.isLoading = true;
    this.pagination.currentPage = 1;
  }

  ParamValueEncoding(textToEncode: string[]) {
    return textToEncode?.map(x => x == null ? '' : x.replace(/,/g, '<comma>'));
  }

  ParamValueDecoding(textToDecode: string[]) {
    return textToDecode?.map(x => x == null ? '' : x.replace(/\<comma\>/g, ','));
  }

  Search(searchForm) {
    this.params.text = '';
    this.params.id = '';
    this.params.name = '';
    this.params.stage = '';
    this.params.status = '';
    this.params.type = '';
    this.params.ownerName = '';
    this.params.organization = '';
    this.params.plant = '';
    this.params.typeOfInvestment = '';
    this.params.registerDateSince = '';
    this.params.registerDateTo = '';
    this.params.workstream = '';
    this.params.subWorkstream1 = '';
    this.spinner.show();
    this.isLoading = true;
    if (searchForm.text) {
      this.params.text = searchForm.text;
      this.GetInitiatives();
    } else {
      this.params.text = '';
      this.GetInitiatives();
    }
    this.spinner.show();
    this.isLoading = true;
    this.pagination.currentPage = 1;
  }

  ChangePageLength(itemsPerPage) {
    this.pagination.itemsPerPage = Number(itemsPerPage);
    this.GetInitiatives();
    this.pagination.currentPage = 1;
  }

  OnChangeStatus(typeStatus) {
    this.params.progress = typeStatus.progress;
    this.params.complete = typeStatus.complete;
    this.params.cancel = typeStatus.cancel;
    this.params.text = typeStatus.text;
    this.GetInitiatives();
    this.spinner.show();
    this.isLoading = true;
    this.pagination.currentPage = 1;
  }

  Refresh() {
    this.params.text = '';
    this.isRefresh = true;
    this.PatchAdvanced();
    this.GetInitiatives();
    // this.pagination.currentPage = 1;
  }

  SortBy(sortFrom) {
    this.params.column = sortFrom.column;
    this.params.orderBy = sortFrom.orderBy;
    this.params.text = this.params.text ? this.params.text : '';
    this.GetInitiatives();
  }

  GetInitiatives() {
    this.authService.getMsalUser().subscribe((user) => {
      this.params.username = user.mail;
      this.params.tmpusername = user.mail; //TempolarySolution 2020-07-29 : I don't know reason but it solveproblem my own not show data on refresh
      this.initiativeService.GetUser(user.mail).subscribe((owner) => {
        this.initiativeService.ownerName = owner.ownerName;
        this.params.myOwner = owner.ownerName;
        // this.initiativeService.GetInitiatives(this.pagination.currentPage, this.pagination.itemsPerPage, this.params).subscribe(
        //   (res: PaginatedResult<InitiativeList[]>) => {
        //     this.initiatives = res.result;
        //     this.pagination = res.pagination;
        //     this.isRefresh = false;
        //     this.spinner.hide();
        //     this.isLoading = false;

        //   });
        this.initiativeService.GetInitiativesOverview(this.pagination.currentPage, this.pagination.itemsPerPage, this.params).subscribe(
          (res: PaginatedResult<InitiativeList[]>) => {
            this.initiatives = res.result;
            this.pagination = res.pagination;
            this.isRefresh = false;
            this.spinner.hide();
            this.isLoading = false;

          });
      });
    });
  }

  DeleteInitiative(id) {
    this.initiativeService.DeleteInitiative(id).subscribe(() => {
      this.GetInitiatives();
    }, error => this.response.error(error));
  }
}
