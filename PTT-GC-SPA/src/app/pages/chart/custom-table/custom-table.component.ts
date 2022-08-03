import { Component, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { RemoveService } from '@services/remove/remove.service';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { AuthService } from '@services/authentication/auth.service';
import { KeyValue } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { InitiativeService } from '@services/initiative/initiative.service';
import { CapexService } from '@services/capex/capex.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnDestroy, OnInit {


  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private remove: RemoveService,
    private router: Router,
    private unauthorized: UnauthorizedService,
    private authService: AuthService,
    private initiativeService: InitiativeService,
    private capexService: CapexService,
  ) { }

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  show: boolean;
  isLoadingData: boolean = true;
  isNoData: boolean;
  baseUrl = environment.apiUrl;  // Base URL
  queryParam = '';  // Get query string URL
  storeName = '';
  gotoId = null;
  gotoPage = null;
  userName = '';
  isApproverLogin: boolean;
  public chartJS: any = [];
  // result: Result[] = [];  // result from api
  ss: number[];
  result: Result[] = [];  // result from api
  dataTablez: any = null;
  columns: any = [];
  dataRow: any = [];
  approveEdit: boolean = false;
  async ngOnInit() {
    this.SetDatatables();
    await this.CheckAuth();
    this.CheckNewTabGoto();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  SetDatatables() {
    this.dtOptions = {
      data: [],
      columns: [],
      columnDefs: [],
      scrollX: true,
      scrollY: "450px",
      paging: false,
      lengthMenu: [[-1], ["All"]],
      searchDelay: 350,
      scrollCollapse: false,
      processing: true,
      deferRender: true,
    };
  }

  showTable() {
    this.show = true;
    setTimeout(() => {
      this.dtTrigger.next();
    });
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  // Order by ascending property value
  valueAscOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.value.localeCompare(b.value);
  }

  // Order by descending property key
  keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  CheckAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.getMsalUser().subscribe((user) => {
        this.userName = user.mail;
        resolve(true);
      }, error => {
        this.unauthorized.error(error);
        reject();
      });
    });
  }

  CheckNewTabGoto() {
    this.route.queryParams.subscribe(async params => {
      this.queryParam = params['reportid'] || null;
      this.storeName = params['storeName'] || null;
      this.gotoId = params['gotoId'] || null;
      this.gotoPage = params['gotoPage'] || null;
      this.initiativeService.id = this.gotoId;

      // if (this.gotoId != null && this.gotoPage != null) {
      //   switch (this.gotoPage) {
      //     case 'view': {
      //       this.Information(this.gotoId);
      //       break;
      //     }

      //     case 'approve': {
      //       this.Approve(this.gotoId);
      //       break;
      //     }

      //     default: {
      //       this.Information(this.gotoId);
      //       break;
      //     }
      //   }
      if (this.gotoId != null) {
        let initiativeTypeAndStage: InitiativeTypeAndStage = {
          initiativeType: null,
          stage: null
        };

        initiativeTypeAndStage = await this.CheckInitiativeType_Stage(this.gotoId);

        this.direction(this.gotoId, initiativeTypeAndStage.initiativeType, initiativeTypeAndStage.stage);

      } else if (this.queryParam != null && this.storeName != null) {
        this.http.get<Result[]>(this.baseUrl + 'chart/customtable?storeName=' + this.storeName
          + '&reportid=' + this.queryParam).subscribe(r => {
            this.isLoadingData = false;
            this.dataTablez = r;
            if (r.length == 0) this.isNoData = true;

            for (var key in r[0]) {
              if (key.toLowerCase() == "initiativeidparam") {
                this.columns.push({
                  title: 'Action',
                  width: this.GetWidthByName('Action'),
                  orderable: false,
                  data: null,
                  render: (data, type, full, meta) => {
                    // if (this.CheckApprover(meta.row)) {
                    //   return `<a type="button" class="btn btn-info btn-sm mr-1 text-white btn-list"
                    //   onClick="window.open('` + window.location.origin + window.location.pathname + `?gotoId=` + data[0] + `&gotoPage=view', '_blank')">
                    //   <i class="fas fa-eye"></i>
                    //   </a>
                    //   <a  type="button" class="btn btn-success btn-sm mr-1 text-white btn-list"
                    //   onClick="window.open('` + window.location.origin + window.location.pathname + `?gotoId=` + data[0] + `&gotoPage=approve', '_blank')">
                    //       <i class="fas fa-clipboard-check"></i>
                    //   </a>`;
                    // } else {
                    //   return `<a type="button" class="btn btn-info btn-sm mr-1 text-white btn-list"
                    //   onClick="window.open('` + window.location.origin + window.location.pathname + `?gotoId=` + data[0] + `&gotoPage=view', '_blank')">
                    //   <i class="fas fa-eye"></i>
                    //   </a>`
                    // }
                    //one button actions
                    return `<a type="button" class="btn btn-info btn-sm mr-1 text-white btn-list"
                      onClick="window.open('` + window.location.origin + window.location.pathname + `?gotoId=` + data[0] + `', '_blank')">
                      <i class="fas fa-chalkboard-teacher"></i>
                      </a>`
                  }
                });
              } else {
                this.columns.push({ title: key, width: this.GetWidthByName(key) });
              }
            }

            for (let index = 0; index < r.length; index++) {
              var row = [];
              for (var key in r[index]) {
                let val = r[index][key] == null ? "" : r[index][key];
                row.push(val);
              }
              this.dataRow.push(row);
            }

            this.dtOptions.data = this.dataRow;
            this.dtOptions.columns = this.columns;

            this.showTable();
          }, error => {
            console.error(error);
            this.isNoData = true;
            this.isLoadingData = false;
          });
      }
    });
  }

  CheckApprover(rowId: any) {
    var userNameLower = this.userName.toString().toLowerCase();
    return this.dataTablez[rowId]['pending Finance Approvers']?.toString().toLowerCase().includes(userNameLower) == true
      || this.dataTablez[rowId]['pending CFO Approvers']?.toString().toLowerCase().includes(userNameLower) == true
      || this.dataTablez[rowId]['pending Sponsor Approvers']?.toString().toLowerCase().includes(userNameLower) == true
      || this.dataTablez[rowId]['pending CTO Approvers']?.toString().toLowerCase().includes(userNameLower) == true
      || this.dataTablez[rowId]['pending Workstream Lead Approvers']?.toString().toLowerCase().includes(userNameLower) == true
      || this.dataTablez[rowId]['pending TO Team Approvers']?.toString().toLowerCase().includes(userNameLower) == true
      || this.dataTablez[rowId]['pending TF-BT-TO Approvers']?.toString().toLowerCase().includes(userNameLower) == true
  }


  OpenNewTab(id: any, type: any) {
    window.open(window.location.origin + window.location.pathname + '?gotoId=' + id + '&gotoPage=' + type, '_blank');
  }

  GetClassName(columnName: string) {
    switch (columnName.trim().toLowerCase()) {
      case "name": {
        return "extend-name";
      }
      default: {
        return "";
      }
    }
  }

  GetWidthByName(columnName: string) {
    switch (columnName.trim().toLowerCase()) {
      case "name": {
        return "400px";
      }
      case "initiative Name": {
        return "1000px";
      }

      case "id": {
        return "100px";
      }
      case "action": {
        return "60px";
      }

      default: {
        return "";
      }
    }
  }

  ClearFormSetId(id) {
    this.remove.Form();
    this.remove.Validate();
    sessionStorage.setItem('id', id.toString());
  }

  CheckInitiativeType_Stage(id): Promise<InitiativeTypeAndStage> {

    return new Promise<InitiativeTypeAndStage>((resolve, reject) => {
      let returnModel: InitiativeTypeAndStage = {
        initiativeType: null,
        stage: null
      }
      this.initiativeService.GetInitiative(id).subscribe((response) => {
        if (response != null) {
          returnModel.initiativeType = response.initiativeType;
          returnModel.stage = response.stage;

          resolve(returnModel);
        }
        else {
          resolve(returnModel);
        }
      }
        , (err) => {
          reject(returnModel);
        }
      );
    });
  }

  direction(id: number, type: string, stage: string) {
    let initiativeIdString = id.toString();
    let data = {
      id: id.toString(),
      email: this.userName
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

  Information(id, type) {
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
        this.initiativeService.setGeneralData(res);
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

      sessionStorage.setItem('type_pool', "");
      this.ClearFormSetId(id);
      this.initiativeService.id = id;
      this.initiativeService.viewMode = true;
      switch (type) {
        case 'IT':
        case 'Digital':
          sessionStorage.setItem('page', 'dim-view');
          this.router.navigate(['/initiative/information']);
          // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=view&openTab=true';
          // window.open(url);
          break;
        case 'Request Pool':
          this.initiativeService.page = 'pool-view';
          this.router.navigate(['/initiative/pool-view']);
          // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=view&openTab=true';
          // window.open(url);
          break;
        default:
          this.router.navigate(['/initiative/information']);
          // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=view&openTab=true';
          // window.open(url);
          break;
      }
    });
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
        this.initiativeService.setGeneralData(res);
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
          this.router.navigate(['/initiative/edit']);
          // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
          // window.open(url);
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
            this.router.navigate(['/initiative/pool-edit']);
            // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
            // window.open(url);
          } else {
            if (result.capexType == 'Requestpool') {
              this.initiativeService.page = 'pool-edit';
              this.router.navigate(['/initiative/pool-edit']);
              // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
              // window.open(url);
            } else {
              // this.router.navigate(['/initiative/addmore-pool']);
              this.initiativeService.page = 'pool-edit';
              this.router.navigate(['/initiative/pool-edit']);
              // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
              // window.open(url);
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
            this.router.navigate(['/initiative/edit']);
            // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
            // window.open(url);

            break;
          case 'Request Pool':
            this.initiativeService.page = 'pool-edit';
            this.router.navigate(['/initiative/pool-edit']);
            // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
            // window.open(url);
            break;
          default:
            // let url = 'initiative/edit';
            // window.open(url);
            // this.initiativeService.id = id;
            // sessionStorage.setItem('page', 'dim-edit');
            //window.open(window.location.origin + '/initiative/edit', '_blank');
            // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=edit&openTab=true';
            // window.open(url);
            this.router.navigate(['/initiative/edit']);
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
      // if (this.approveEdit) {
      //   var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=approveEdit&openTab=true';
      // } else {
      //   var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=approve&openTab=true';
      // }
      // window.open(url);
      this.router.navigate(['/initiative/approve']);
    });
  }


}

interface RootObject {
  result: Result[];
}
interface Result {
  titleText: string;
  dataLabel: string[];
  datasets: DatasetsChart[];
}
interface DatasetsChart {
  label: string;
  data: number[];
  backgroundColor: string[];
}

interface InitiativeTypeAndStage {
  initiativeType: string;
  stage: string;
}
