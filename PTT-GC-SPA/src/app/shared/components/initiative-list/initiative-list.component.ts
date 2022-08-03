import { RemoveService } from '@services/remove/remove.service';
import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalTool } from '@tools/swal.tools';
import { Pagination } from '@models/pagination';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { StatusService } from '@services/status/status.service';
import { CapexService } from '@services/capex/capex.service';
import { PermissionService } from '@services/permission/permission.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { ActionService } from '@services/action/action.service';
import { DropDownData } from '@models/initiative';
import { RolePermissionModel } from '@models/RolePermissionModel';
import { DetailInformationService } from '@services/detail-information/detail-information.service';

@Component({
  selector: 'app-initiative-list',
  templateUrl: './initiative-list.component.html',
  styleUrls: ['./initiative-list.component.css']
})
export class InitiativeListComponent implements OnInit, OnChanges {

  userPermission: RolePermissionModel[];
  constructor(
    private remove: RemoveService,
    private swalTool: SwalTool,
    private router: Router,
    private fb: FormBuilder,
    private capexService: CapexService,
    public permissionService: PermissionService,
    private initiativeService: InitiativeService,
    private actionService: ActionService,
    private detailService: DetailInformationService
  ) {
    this.userPermission = JSON.parse(sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY));
  }



  @Input() name: string;

  @Input() text: string;

  @Input() IsRefresh: boolean;

  @Input() progress: boolean;
  @Input() complete: boolean;
  @Input() cancel: boolean;

  @Input() pagination: Pagination;

  @Input() initiatives: [];

  @Input() advanced;

  @Output() sortByColumn = new EventEmitter();
  @Output() deleteInitiative = new EventEmitter();
  @Output() OnPageChanged = new EventEmitter();
  @Output() changePageLength = new EventEmitter();


  username: string;
  showSuperApprovalButton = false;

  maxSize = 10;
  length = [10, 25, 50, 100];

  isDelete = false;

  sortFrom = this.fb.group({
    column: null,
    orderBy: null,
    username: null,
    text: null,
    id: '',
    name: '',
    status: '',
    type: '',
    ownerName: null,
    organization: null,
    plant: null,
    typeOfInvestment: null,
    registerDateSince: null,
    registerDateTo: null,
    progress: [true],
    complete: [true],
    cancel: [true],
    workstream: null,
    subWorkstream1: null
  });

  sortId = 'asc';
  sortName = 'asc';
  sortOwner = 'asc';
  sortStage = 'asc';
  sortRegister = 'asc';
  sortOrganization = 'asc';
  sortType = 'asc';
  sortStatus = 'asc';
  sortRegisteringDate = 'asc';
  sortUpdatedDate = 'asc';
  sortWbsNo = 'asc';
  sortCompany = 'asc';
  sortInitiativeType = 'asc';

  ReqType: any;

  currentPage = 1;
  isOverview: boolean = false;
  approveEdit: boolean = false;


  isAdminITDigital: boolean = false;
  adminIIDigitalList = [
    'subin.p@pttgcgroup.com',
    'satreerat.k@pttgcgroup.com'
  ]
  public permissionServiceStaticVar = PermissionService;

  ngOnInit() {
    this.username = this.initiativeService.username;
    switch (this.name) {
      case 'Overview':
        this.isOverview = true;
        this.SetCurrentPageOverview();

        break;
      case 'My Own Initiatives': this.SetCurrentPageMyOwn(); break;
      case 'My Tasks': this.SetCurrentPageMyTask(); break;
    }
    //this.CheckPermissionSuperApproval();
  }

  ngOnChanges(): void {
    if (this.advanced) { this.sortFrom.patchValue(this.advanced); }
    this.text = this.text ? this.text : null;
    if (this.IsRefresh) { this.PatchSort(); }
  }

  SetCurrentPageOverview() {
    if (sessionStorage.getItem('CurrentPageOverview')) {
      this.currentPage = Number(sessionStorage.getItem('CurrentPageOverview'));
    }
  }

  SetCurrentPageMyOwn() {
    if (sessionStorage.getItem('CurrentPageMyOwn')) {
      this.currentPage = Number(sessionStorage.getItem('CurrentPageMyOwn'));
    }
  }

  SetCurrentPageMyTask() {
    if (sessionStorage.getItem('CurrentPageMyTask')) {
      this.currentPage = Number(sessionStorage.getItem('CurrentPageMyTask'));
    }
  }

  PatchSort() {
    this.sortFrom.patchValue({
      id: '',
      name: '',
      status: '',
      type: '',
      ownerName: null,
      organization: null,
      plant: null,
      typeOfInvestment: null,
      registerDateSince: null,
      registerDateTo: null,
    });
  }

  ChangePageLength(e) {
    this.changePageLength.emit(e.target.value);
  }

  SortBy(column) {
    switch (column) {
      case 'InitiativeCode':
        this.sortId = this.sortId === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortId });
        break;
      case 'Name':
        this.sortName = this.sortName === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortName });
        break;
      case 'OwnerName':
        this.sortOwner = this.sortOwner === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortOwner });
        break;
      case 'RegisteringDate':
        this.sortRegisteringDate = this.sortRegisteringDate === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortRegisteringDate });
        break;
      case 'UpdatedDate':
        this.sortUpdatedDate = this.sortUpdatedDate === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortUpdatedDate });
        break;
      case 'WbsNo':
        this.sortWbsNo = this.sortWbsNo === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortWbsNo });
        break;
      case 'Company':
        this.sortCompany = this.sortCompany === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortCompany });
        break;
      case 'Stage':
        this.sortStage = this.sortStage === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortStage });
        break;
      case 'Organization':
        this.sortOrganization = this.sortOrganization === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortOrganization });
        break;
      case 'InitiativeType':
        this.sortInitiativeType = this.sortInitiativeType === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortInitiativeType });
        break;
      case 'Status':
        this.sortStatus = this.sortStatus === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortStatus });
        break;
      case 'SAPMOCStatus':
        this.sortStatus = this.sortStatus === 'asc' ? 'desc' : 'asc';
        this.sortFrom.patchValue({ column: column, orderBy: this.sortStatus });
        break;
    }
    this.sortFrom.patchValue({ progress: this.progress, complete: this.complete, cancel: this.cancel });

    if (this.text) {
      this.PatchSort();
      this.sortFrom.patchValue({ text: this.text });
      this.sortByColumn.emit(this.sortFrom.value);
    } else {
      this.sortFrom.patchValue({ text: null });
      this.sortByColumn.emit(this.sortFrom.value);
    }
  }

  DefaultInitiative(status, id) {
    sessionStorage.setItem('type_pool', "");
    switch (this.name) {
      case 'My Tasks':
        switch (status) {
          case 'admin check':
          case 'wait for cancellation':
            this.router.navigate(['/initiative/approve']);
            break;
          case 'wait for submission':
          case 'revise':
          case 'revised':
          case 'add more':
            this.router.navigate(['/initiative/edit']);
            break;
          case 'add more pool':
            this.router.navigate(['/initiative/addmore-pool']);
            break;
        }
        break;
      case 'My Own Initiative':
        switch (status) {
          case 'draft':
          case 'wait for submission':
          case 'revise':
          case 'revised':
          case 'approved':
            this.router.navigate(['/initiative/edit']);
            break;
          case 'add more':
            this.router.navigate(['/initiative/addmore']);
            break;
          case 'add more pool':
            this.router.navigate(['/initiative/addmore-pool']);
            break;
          case 'admin check':
          case 'reject':
          case 'rejected':
          case 'cancelled':
          case 'wait for cancellation':
            this.router.navigate(['/initiative/information']);
            break;
          case 'finish':
            // this.router.navigate(['/initiative/addmore']);
            break;
        }
        break;
      case 'OverView':
        switch (status) {
          case 'draft':
          case 'admin check':
          case 'wait for submission':
          case 'revise':
          case 'reject':
          case 'wait for approval':
          case 'rejected':
          case 'cancelled':
          case 'approved':
          case 'finish':
          case 'wait for cancellation':
            this.router.navigate(['/initiative/information']);
        }
        break;
    }
  }

  ClearFormSetId(id) {
    this.remove.Form();
    this.remove.Validate();
    sessionStorage.setItem('id', id.toString());
  }

  // ActionInitiative(status, id, type) {
  //   if (!this.isDelete) {
  //     this.ClearFormSetId(id);
  //     switch (type) {
  //       case 'IT':
  //       case 'Digital':
  //       default:
  //         this.DefaultInitiative(status, id);
  //         break;
  //     }
  //   }
  // }

  CheckOverView(status) {
    const statuses = [
      'draft', 'admin check', 'wait for submission', 'revise', 'reject', 'add more', 'add more pool',
      'wait for approval', 'rejected', 'revised', 'cancelled', 'approved',
      'finish', 'wait for review', 'wait for create App.', 'wait for create WBS', 'wait for cancellation', 'principle approved', 'wait for review', 'in progress', 'wait for create', 'update progress', '', 'adopt', 'implementing in progress', 'project planning', 'wait for DIM approval'
      , 'baseline committed'
    ];
    return statuses.indexOf(status) !== -1 ? true : false;
  }

  CheckViewMyOwn(status) {
    sessionStorage.setItem('type_pool', "");

    const statuses =
      ['admin check', 'reject', 'wait for approval', 'rejected', 'cancelled', 'finish',
        'wait for review', 'wait for create App.', 'wait for create WBS', 'wait for cancellation', 'wait for review', 'in progress', 'wait for update', 'wait for create', 'wait for DIM approval'
        , 'baseline committed'
      ];
    return statuses.indexOf(status) !== -1 ? true : false;
  }

  CheckAddmore(status) {
    const statuses = ['finish'];
    return statuses.indexOf(status) !== -1 ? true : false;
  }

  CheckActionMyOwn(status) {
    const statuses = ['draft', 'wait for submission', 'revise', 'revised', 'approved', 'add more', 'add more pool', '', 'in progress', 'wait for update', 'update progress', 'principle approved', 'adopt', 'implementing in progress', 'project planning'];
    return statuses.indexOf(status) !== -1 ? true : false;
  }

  CheckFinishMyOwn(status, stage, initiativeType) {
    sessionStorage.setItem('type_pool', "");
    var stageNotRequire = ["Admin Check", "First Review-1", "First Review-2"]
    if (((status == 'approved' || status == 'finish') && (stage == 'BOD' || stage == 'Budget Team')) || (stage == 'Budget Distribute' && status == 'finish') || (stage == 'App. Request')) {
      return initiativeType == 'directCapex';
    }
    if (!stageNotRequire.includes(stage)) {
      return initiativeType == 'cim';
    }
  }

  CheckPool(status, initiativeType) {
    sessionStorage.setItem('type_pool', "");
    if (status == 'finish') {
      return status === 'finish' && initiativeType == 'Request Pool';
    } else if (status == 'wait for approval') {
      return status === 'wait for approval' && initiativeType == 'Request Pool';
    }
  }

  CheckApproveMyTask(status) {
    sessionStorage.setItem('type_pool', "");

    const statuses = [
      'admin check', 'wait for approval', 'wait for review',
      'wait for create App.', 'wait for create WBS', 'wait for cancellation', 'wait for assign', 'wait for create', 'wait for DIM approval', 'baseline committed'];
    return statuses.indexOf(status) !== -1 ? true : false;
  }

  CheckActionMyTask(status) {
    sessionStorage.setItem('type_pool', "");

    const statuses = ['draft', 'wait for submission', 'revise', 'revised', 'approved', '', 'in progress', 'wait for update', 'update progress', 'principle approved', 'adopt', 'implementing in progress', 'project planning'];
    return statuses.indexOf(status) !== -1 ? true : false;
  }

  DeleteInitiative(id, type, stage, status) {
    if (!stage && status === 'draft') {
      this.isDelete = true;
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this initiative?!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.value) {
          this.deleteInitiative.emit(id);
          this.swalTool.DeleteInitiative();
          this.isDelete = false;
        } else {
          this.isDelete = false;
        }
      });
    } else {
      this.ClearFormSetId(id);
      switch (type) {
        // new Feature
        case 'IT':
        case 'Digital':
          this.initiativeService.id = id;
          this.initiativeService.isCancel = true;
          sessionStorage.setItem('page', 'dim-edit');
          this.router.navigate(['/initiative/edit']);
          break;
        case 'Request Pool':
          // sessionStorage.setItem('page', 'pool-edit');
          // this.router.navigate(['/initiative/pool']);
          this.initiativeService.id = id;
          this.initiativeService.page = 'pool-edit';
          this.router.navigate(['/initiative/pool-edit']);
          break;
        default:
          // sessionStorage.setItem('cancel', 'true');
          this.initiativeService.id = id;
          this.initiativeService.page = 'edit';
          this.initiativeService.isCancel = true;
          this.router.navigate(['/initiative/edit']);
          break;
      }
    }
  }

  PageChanged(e) {
    switch (this.name) {
      case 'Overview': sessionStorage.setItem('CurrentPageOverview', e.page.toString()); break;
      case 'My Own Initiatives': sessionStorage.setItem('CurrentPageMyOwn', e.page.toString()); break;
      case 'My Tasks': sessionStorage.setItem('CurrentPageMyTask', e.page.toString()); break;
    }
    this.OnPageChanged.emit(e.page);
  }

  Edit(id, type) {

    this.initiativeService.id = id;
    this.initiativeService.page = 'edit';
    this.ClearFormSetId(id);


    //getSuggestion
    const GetInitiativeStages = new Promise((resolve, reject) => {
      this.initiativeService.GetInitiativeStagesById(this.initiativeService.id).then((responseStages) => {
        this.initiativeService.setInitiativeStageDetail(responseStages);
        resolve(true);
      }, error => {
        reject();
      });
    });

    // //getSuggestion
    // const GetSuggestStatus = new Promise((resolve, reject) => {
    //   this.initiativeService.GetSuggestStatus(id).subscribe(response => {
    //     this.initiativeService.setSuggestStatus(response);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    //getGeneral
    const GetGeneralData = new Promise((resolve, reject) => {
      this.initiativeService.GetInitiative(id).subscribe((res) => {
        this.initiativeService.isRevise = res.isReviseFlow ? true : false;
        resolve(true);
      }, error => {
        reject();
      });
    });

    // //getDetail max capex pim
    // const GetInitiativeDetailMax = new Promise((resolve, reject) => {
    //   this.detailInformationService.GetDetailInformation(id).subscribe((response) => {
    //     this.detailInformationService.setDetailInformation(response);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    // //getDetail cim Strategy
    // const GetInitiativeDetailForm = new Promise((resolve, reject) => {
    //   this.detailService.GetInitiativeDetail(id).subscribe((response) => {
    //     this.detailService.setDetailFormData(response);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    // //getImpact
    // const GetImpactTracking = new Promise((resolve, reject) => {
    //   this.impactService.GetImpactTracking(id).subscribe((response) => {
    //     this.impactService.setImpactData(response);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });

    // });


    // //getShareBenefit
    // const GetShareBenefitWorkstream = new Promise((resolve, reject) => {
    //   this.impactService.GetShareBenefitWorkstream(id).subscribe(response => {
    //     this.impactService.setShareBenefitWorkstream(response);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    // //getCapex
    // const GetCapexInformationList = new Promise((resolve, reject) => {
    //   this.capexService.GetCapexInformationList(id.toString()).subscribe(response => {
    //     this.capexService.changeCapexListData(response);
    //     if (response && response.length > 0) {
    //       this.capexService.GetCapexsInfo(response[response.length - 1].poolId, 'Requestpool').subscribe(usePoolRes => {
    //         this.capexService.changeUsePoolDataData(usePoolRes);
    //       });
    //       this.capexService.GetAnnualInvestmentPlan(id.toString(), response[response.length - 1].capexInformationId.toString()).subscribe(annualInvestmentPlanRes => {
    //         this.capexService.changeAnnualInvestmentPlan(annualInvestmentPlanRes);
    //         resolve(true);
    //       });
    //     } else {
    //       resolve(true);
    //     }
    //   }, error => {
    //     reject();
    //   });
    // });

    // //GetProgress
    // const GetProgress = new Promise((resolve, reject) => {
    //   this.progressService.GetProgress(id).subscribe((getProgressRes) => {
    //     this.progressService.changeProgressData(getProgressRes);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    // //GetProgress
    // const GetProgressAndMileStone = new Promise((resolve, reject) => {
    //   this.progressService.GetProgressAndMilestone(id).subscribe(response => {
    //     this.progressService.changeProgressAndMileStone(response);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    // //GetProgress
    // const GetAllCostSpending = new Promise((resolve, reject) => {
    //   this.progressService.GetAllCostSpending(id).then((allCostesponse) => {
    //     this.progressService.setCostSpendingData(allCostesponse);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });



    // const GetShareBenefitWorkstream = new Promise((resolve, reject) => {
    //   this.GetShareBenefitWorkstream(this.id);
    //   resolve(true);

    // });

    Promise.all([
      GetInitiativeStages,
      // GetSuggestStatus,
      GetGeneralData,
      // GetImpactTracking,
      // GetInitiativeDetailMax,
      // GetInitiativeDetailForm,
      // GetShareBenefitWorkstream,
      // GetCapexInformationList,
      // GetProgress,
      // GetAllCostSpending,
      // GetProgressAndMileStone
    ]).then((values) => {


      let ST = '';

      if (type === 'directCapex') {

        this.capexService.GetCapexsInfo_one(id).subscribe(result => {
          // this.router.navigate(['/initiative/edit']);
          var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
          window.open(url);
          // if (result == null) {
          //   this.router.navigate(['/initiative/edit']);
          // }
          // else {
          //   if (result.capexType == 'AddmoreCapex') {
          //     this.router.navigate(['/initiative/addmore']);
          //   } else {
          //     this.router.navigate(['/initiative/edit']);
          //   }
          // }
        });

      } else if (type === 'Request Pool') {
        this.capexService.GetCapexsInfo_one(id).subscribe(result => {
          if (result == null) {
            this.initiativeService.page = 'pool-edit';
            // this.router.navigate(['/initiative/pool-edit']);
            var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
            window.open(url);
          } else {
            if (result.capexType == 'Requestpool') {
              this.initiativeService.page = 'pool-edit';
              // this.router.navigate(['/initiative/pool-edit']);
              var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
              window.open(url);
            } else {
              // this.router.navigate(['/initiative/addmore-pool']);
              this.initiativeService.page = 'pool-edit';
              // this.router.navigate(['/initiative/pool-edit']);
              var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
              window.open(url);
            }
          }

        });


      }
      else {
        switch (type) {
          // new Feature
          case 'IT':
          case 'Digital':
            this.initiativeService.id = id;
            sessionStorage.setItem('page', 'dim-edit');
            // this.router.navigate(['/initiative/edit']);
            var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
            window.open(url);

            break;
          case 'Request Pool':
            this.initiativeService.page = 'pool-edit';
            //this.router.navigate(['/initiative/pool-edit']);
            var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
            window.open(url);
            break;
          default:
            // let url = 'initiative/edit';
            // window.open(url);
            // this.initiativeService.id = id;
            // sessionStorage.setItem('page', 'dim-edit');
            //window.open(window.location.origin + '/initiative/edit', '_blank');
            var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
            window.open(url);
            // this.router.navigate(['/initiative/edit']);
            break;
        }

        return;

        let ST = '';

        if (type === 'directCapex') {

          this.capexService.GetCapexsInfo(id, 'Createnew').subscribe(result => {

            ST = result.capexType;

            if (ST === 'Createnew') {

              switch (type) {
                // new Feature
                case 'IT':
                case 'Digital':
                  this.initiativeService.id = id;
                  sessionStorage.setItem('page', 'dim-edit');
                  // this.router.navigate(['/initiative/edit']);
                  var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
                  window.open(url);
                  break;
                case 'Request Pool':
                  sessionStorage.setItem('page', 'pool-edit');
                  // this.router.navigate(['/initiative/pool-edit']);
                  var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
                  window.open(url);
                  break;
                default:
                  // this.router.navigate(['/initiative/edit']);
                  var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
                  window.open(url);
                  // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit';
                  // window.open(url);
                  break;
              }
            } else {
              // this.router.navigate(['/initiative/addmore']);
              this.initiativeService.page = 'pool-edit';
              // this.router.navigate(['/initiative/pool-edit']);
              var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
              window.open(url);
            }
          });
        } else if (type === 'Request Pool') {
          this.capexService.GetCapexsInfo(id, 'Requestpool').subscribe(result => {
            ST = result.capexType;

            if (ST !== 'Addmorepool') {
              switch (type) {
                // new Feature
                case 'IT':
                case 'Digital':
                  this.initiativeService.id = id;
                  sessionStorage.setItem('page', 'dim-edit');
                  // this.router.navigate(['/initiative/edit']);
                  var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
                  window.open(url);
                  break;
                case 'Request Pool':
                  this.initiativeService.page = 'pool-edit';
                  // this.router.navigate(['/initiative/pool-edit']);
                  var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
                  window.open(url);
                  break;
                default:
                  // this.router.navigate(['/initiative/edit']);
                  var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
                  window.open(url);
                  break;
              }
            } else {
              // this.router.navigate(['/initiative/addmore-pool']);
              this.initiativeService.page = 'pool-edit';
              // this.router.navigate(['/initiative/pool-edit']);
              var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
              window.open(url);
            }

          });
        } else {
          switch (type) {
            // new Feature
            case 'IT':
            case 'Digital':
              this.initiativeService.id = id;
              sessionStorage.setItem('page', 'dim-edit');
              // this.router.navigate(['/initiative/edit']);
              var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
              window.open(url);
              break;
            case 'Requestpool':
              this.initiativeService.page = 'pool-edit';
              // this.router.navigate(['/initiative/pool-edit']);
              var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
              window.open(url);
              break;
            default:
              // this.router.navigate(['/initiative/edit']);
              var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
              window.open(url);
              break;
          }
        }
      }
    });
  }

  Approve(id) {
    this.ClearFormSetId(id);
    sessionStorage.setItem('page', 'approve');
    this.initiativeService.id = id;
    this.initiativeService.page = 'approve';
    this.initiativeService.GetInitiative(id).subscribe((response) => {
      this.initiativeService.setGeneralData(response);
      let switchProcess: {
        type: string;
        stage: string;
      } = {
        type: response.initiativeType,
        stage: response.stage
      }
      // this.actionService.GetSwitchProcessList(switchProcess).subscribe(listRes => {
      //   let switchProcessList: DropDownData[] = [];
      //   listRes.forEach((list) => {
      //     let val: {
      //       name: string;
      //       value: string;
      //     } = {
      //       name: list,
      //       value: list
      //     }
      //     switchProcessList.push(val);
      //   });
      //   this.initiativeService.setSwitchProcessList(switchProcessList);
      //   // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=approve';
      //   // window.open(url);
      //   // this.router.navigate(['/initiative/approve']);
      //   if (this.approveEdit) {
      //     var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=approveEdit&openTab=true';
      //   } else {
      //     var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=approve&openTab=true';
      //   }
      //   window.open(url);
      // });
      if (this.approveEdit) {
        var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=approveEdit&openTab=true';
      } else {
        var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=approve&openTab=true';
      }
      window.open(url);
    });
  }

  ApproveOverview(id, type, status) {
    this.ClearFormSetId(id);
    sessionStorage.setItem('page', 'overview-approve');
    this.initiativeService.id = id;
    let data = {
      id: id.toString(),
      email: this.initiativeService.username
    }
    let permission = this.userPermission?.find(x =>
      x.pageId.toLowerCase() === PermissionService.ONBEHAFTOFAPPROVE_PAGE_ID
      && x.sectionId.toLowerCase() === "access"
    );
    if (this.CheckApproveOverview(status) && (permission?.isEnable || this.CheckInitiativeTypeITDigital(type))) {
      var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=overview-approve&openTab=true';
      window.open(url);
    } else {
      this.Information(id, type);
    }
    // this.initiativeService.GetButtonAction(data).subscribe((buttonResponse) => {
    //   if (buttonResponse['action']) {
    //     switch (buttonResponse['action']) {
    //       case "approveEdit":
    //       case "approve":
    //         this.initiativeService.viewMode = false;
    //         this.initiativeService.approveEdit = true;
    //         this.initiativeService.page = 'overview-approve';
    //         this.initiativeService.GetInitiative(id).subscribe((response) => {
    //           this.initiativeService.setGeneralData(response);
    //           let switchProcess: {
    //             type: string;
    //             stage: string;
    //           } = {
    //             type: response.initiativeType,
    //             stage: response.stage
    //           }
    //           this.actionService.GetSwitchProcessList(switchProcess).subscribe(listRes => {
    //             let switchProcessList: DropDownData[] = [];
    //             listRes.forEach((list) => {
    //               let val: {
    //                 name: string;
    //                 value: string;
    //               } = {
    //                 name: list,
    //                 value: list
    //               }
    //               switchProcessList.push(val);
    //             });
    //             this.initiativeService.setSwitchProcessList(switchProcessList);
    //             // this.router.navigate(['/initiative/approve']);
    //             var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=overview-approve&openTab=true';
    //             window.open(url);
    //           });
    //         });
    //         break;

    //       // case "approve":
    //       //   this.Approve(id);
    //       //   break;

    //       case "view":
    //         this.Information(id, type);
    //         break;
    //       case "edit":
    //         this.Edit(id, type);
    //         break;

    //       default:
    //         //this.initiativeService.approveEdit = true;
    //         // this.initiativeService.viewMode = true;
    //         // this.initiativeService.page = 'overview-approve';
    //         // this.initiativeService.GetInitiative(id).subscribe((response) => {
    //         //   this.initiativeService.setGeneralData(response);
    //         //   let switchProcess: {
    //         //     type: string;
    //         //     stage: string;
    //         //   } = {
    //         //     type: response.initiativeType,
    //         //     stage: response.stage
    //         //   }
    //         //   this.actionService.GetSwitchProcessList(switchProcess).subscribe(listRes => {
    //         //     let switchProcessList: DropDownData[] = [];
    //         //     listRes.forEach((list) => {
    //         //       let val: {
    //         //         name: string;
    //         //         value: string;
    //         //       } = {
    //         //         name: list,
    //         //         value: list
    //         //       }
    //         //       switchProcessList.push(val);
    //         //     });
    //         //     this.initiativeService.setSwitchProcessList(switchProcessList);
    //         //     // this.router.navigate(['/initiative/approve']);
    //         //     var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=overview-approve&openTab=true';
    //         //     window.open(url);
    //         //   });
    //         // });
    //         break;
    //     }
    //   } else {
    //     //this.initiativeService.approveEdit = true;
    //     this.initiativeService.viewMode = true;
    //     this.initiativeService.page = 'overview-approve';
    //     this.initiativeService.GetInitiative(id).subscribe((response) => {
    //       this.initiativeService.setGeneralData(response);
    //       let switchProcess: {
    //         type: string;
    //         stage: string;
    //       } = {
    //         type: response.initiativeType,
    //         stage: response.stage
    //       }
    //       this.actionService.GetSwitchProcessList(switchProcess).subscribe(listRes => {
    //         let switchProcessList: DropDownData[] = [];
    //         listRes.forEach((list) => {
    //           let val: {
    //             name: string;
    //             value: string;
    //           } = {
    //             name: list,
    //             value: list
    //           }
    //           switchProcessList.push(val);
    //         });
    //         this.initiativeService.setSwitchProcessList(switchProcessList);
    //         // this.router.navigate(['/initiative/approve']);
    //         var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=overview-approve&openTab=true';
    //         window.open(url);
    //       });
    //     });
    //   }
    // });

  }

  CheckApproveOverview(status) {
    // const statuses = ['wait for approval'];
    const statuses = [
      'wait for approval',
      'wait for create App.',
      'wait for review',
      'wait for create WBS',
      'wait for assign',
      'wait for create',
      'wait for DIM approval',
      'baseline committed',
      'wait for cancellation',
      'wait for switch process'
    ]; //for capex approver

    return statuses.indexOf(status) !== -1 ? true : false;
  }



  CheckInitiativeTypeITDigital(type) {
    const initiativeType = ['IT', 'Digital'];
    //check budget
    let accessDetail: RolePermissionModel = this.userPermission?.find(x =>
      x.pageId.toLowerCase() === PermissionService.CREATE_BUDGET_SURVEY_PAGE_ID
      && x.roleName.toLowerCase() === "pmo dim"
    );
    if (initiativeType.indexOf(type) >= 0 && accessDetail && accessDetail.isEnable) {
      return true;
    }
    return false;
  }

  convertType(type: string) {
    if (type?.toUpperCase() == 'DIRECTCAPEX') {
      return 'DIRECT CAPEX';
    }
    if (type?.toUpperCase() == 'RANDD') {
      return 'R&D';
    }
    return type;
    // return initiativeType.indexOf(type) !== -1 ? true : false;
  }

  Information(id, type) {

    sessionStorage.setItem('type_pool', "");
    this.ClearFormSetId(id);
    this.initiativeService.id = id;
    this.initiativeService.viewMode = true;
    switch (type) {
      case 'IT':
      case 'Digital':
        sessionStorage.setItem('page', 'dim-view');
        // this.router.navigate(['/initiative/information']);
        var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=view&openTab=true';
        window.open(url);
        break;
      case 'Request Pool':
        this.initiativeService.page = 'pool-view';
        // this.router.navigate(['/initiative/pool-view']);
        var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=view&openTab=true';
        window.open(url);
        break;
      default:
        // this.router.navigate(['/initiative/information']);
        var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=view&openTab=true';
        window.open(url);
        break;
    }
  }

  Addmore(id: number, type: string) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.isAddmore = true;
    this.initiativeService.id = id;
    if (type === 'Request Pool') {
      this.initiativeService.page = 'pool-edit';
      var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&capexType=isAddmore&openTab=true';
      window.open(url);
      // this.router.navigate(['/initiative/pool-edit']);
    } else {
      this.initiativeService.page = 'edit';
      var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&capexType=isAddmore&openTab=true';
      window.open(url);
      //this.router.navigate(['/initiative/edit']);
    }
  }

  AddmorePool(id) {
    this.remove.Form();
    this.remove.Validate();
    sessionStorage.setItem('id', id.toString());
    sessionStorage.setItem('type_pool', "addmore");
    // this.router.navigate(['/initiative/addmore-pool']);
    this.initiativeService.page = 'pool-edit';
    var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&capexType=isAddmore&openTab=true';
    window.open(url);
    // this.router.navigate(['/initiative/pool-edit']);
  }

  Return(id: number, type: string) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.isReturn = true;
    this.initiativeService.id = id;
    if (type === 'Request Pool') {
      this.initiativeService.page = 'pool-edit';
      // this.router.navigate(['/initiative/pool-edit']);
      var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&capexType=isReturn&openTab=true';
      window.open(url);
    } else {
      this.initiativeService.page = 'edit';
      // this.router.navigate(['/initiative/edit']);
      var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&capexType=isReturn&openTab=true';
      window.open(url);
    }
  }

  Revise(id: number, type: string) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.isRevise = true;
    this.initiativeService.id = id;
    if (type === 'Request Pool') {
      this.initiativeService.page = 'pool-edit';
      // this.router.navigate(['/initiative/pool-edit']);
      var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&capexType=isRevise&openTab=true';
      window.open(url);
    } else {
      this.initiativeService.page = 'edit';
      // this.router.navigate(['/initiative/edit']);
      var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&capexType=isRevise&openTab=true';
      window.open(url);
    }
  }

  carried(id) {
    this.remove.Form();
    this.remove.Validate();
    sessionStorage.setItem('id', id.toString());
    this.router.navigate(['/initiative/carried']);
  }

  UpperCaseReplaceStage(stage: string) {
    return stage.replace(/(\-\d)/g, '').toUpperCase();
  }

  direction(id: number, type: string, stage: string) {
    let initiativeIdString = id.toString();
    //this.initiativeService.directionButton = 'listButton';
    console.log('user Name pess direction', this.initiativeService.username);
    let data = {
      id: id.toString(),
      email: this.initiativeService.username
    }
    this.initiativeService.GetButtonAction(data).subscribe((buttonResponse) => {
      if (buttonResponse['action']) {
        switch (buttonResponse['action']) {
          case "view":
            this.Information(id, type);
            break;
          case "edit":
            this.Edit(id, type);
            break;
          case "approve":
            //this.initiativeService.approveEdit = true;
            this.initiativeService.viewMode = true;
            this.Approve(id);
            break;
          case "approveEdit":
            this.initiativeService.viewMode = false;
            this.approveEdit = true;
            this.initiativeService.approveEdit = true;
            this.Approve(id);
            break;
          default:
            break;
        }
      }
    });

  }

  CheckPermissionSuperApproval() {
    var permissionResult;
    permissionResult = this.permissionService.CheckAccessPages().then(value => {
      permissionResult = value;
      if (value) {
        permissionResult.forEach(element => {
          if (element.roleName?.trim().toUpperCase().includes('SPOC')) {
            this.showSuperApprovalButton = true;
          }
        });
      }

    }).catch(error => {
      console.log(error)
    })
  }

  CheckPermissionSetting(pageId: string, type: string): boolean {
    if (!this.userPermission) {
      return false;
    }
    let accessDetail: RolePermissionModel = this.userPermission.find(x =>
      x.pageId.toLowerCase() === pageId
      && x.sectionId.toLowerCase() === "access"
      && x.initiativeType === type
    );
    if (accessDetail?.isEnable) {
      return true;
    }
    return false;

  }
}
