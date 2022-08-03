import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RemoveService } from '@services/remove/remove.service';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { AuthService } from '@services/authentication/auth.service';
import { FormBuilder } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { DropDownData, Initiative } from '@models/initiative';
import { ActionService } from '@services/action/action.service';
import { CapexService } from '@services/capex/capex.service';
import { ShowControlDetailPim } from '@models/ShowControlDetailPim';
import { ValidateService } from '@services/validate/validate.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';

@Component({
  selector: 'app-initiativeredirector',
  templateUrl: './initiativeredirector.component.html',
  styleUrls: ['./initiativeredirector.component.css']
})
export class InitiativeredirectorComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private remove: RemoveService,
    private router: Router,
    private fb: FormBuilder,
    private unauthorized: UnauthorizedService,
    private authService: AuthService,
    private initiativeService: InitiativeService,
    private actionService: ActionService,
    private capexService: CapexService,
    private validateService: ValidateService,
    private detailService: DetailInformationService
  ) { }

  gotoId = null;
  gotoPage = null;
  gotoTab = null;
  capexType = null;
  openTab = null;
  //kpikri
  year = null;
  userName = '';
  isFirstLogin = true;
  user;
  register;
  initiativeTypeITDIGITAL = ["IT", "Digital"];
  initiativeTypeRequestPool = ["Request Pool"];
  registerForm = this.fb.group({ username: [''], password: [''] });

  loginForm = this.fb.group({ username: [''], password: [''] });

  generalData: Initiative;
  ngOnInit(): void {
    let showControl: ShowControlDetailPim = {
      showProjectEngineer: false,
      showProjectTeam: false,
      getSimProjectSkipGate2: false,
      isGate0Stage: false,
      showApprovalPlan: false
    }

    this.validateService.setShowControlDetailPim(showControl);
    //this.initiativeService.setGeneralData({} as Initiative);
    this.CheckAuth();
    // this.CheckNewTabGoto();
  }


  CheckAuth() {
    this.getUserProfile()
  }


  getUserProfile() {
    this.authService.getMsalUser().subscribe((response) => {
      this.user = response;
      this.initiativeService.username = this.user.mail;
      this.authService.UserExists({ username: this.user.mail }).subscribe((result) => {
        if (result) {
          this.loginForm.patchValue({ username: this.user.mail, password: 'password' });
          this.authService.Login(this.loginForm.value).subscribe(() => {
            if (!this.authService.loggedIn()) {
              this.router.navigate(['']);
            } else {
              this.CheckNewTabGoto();
            }
          });
        } else {
          this.registerForm.patchValue({ username: this.user.mail, password: 'password' });
          this.authService.Register(this.registerForm.value).subscribe((user) => {
            this.register = user;
            this.loginForm.patchValue({ username: this.register.username, password: 'password' });
            this.authService.Login(this.loginForm.value).subscribe(() => {
              if (!this.authService.loggedIn()) {
                this.router.navigate(['']);
              } else {
                this.CheckNewTabGoto();
              }
            });
          });
        }
      });
    });
  }

  CheckNewTabGoto() {
    //http://localhost:4200/initiative/kpi?year=2021&id=65912
    //http://localhost:4200/initiative/initiativeredirector?gotoPage=edit&gotoId=65912&gotoTab=progress

    this.route.queryParams.subscribe(params => {
      this.gotoId = params['gotoId'] || null;
      this.gotoPage = params['gotoPage'] || null;
      this.year = params['year'] || null;
      this.gotoTab = params['gotoTab'] || null;
      this.capexType = params['capexType'] || null;
      this.openTab = params['openTab'] || null;

      this.initiativeService.id = this.gotoId;
      this.initiativeService.gotoTab = this.gotoTab;
      this.initiativeService.directionButton = this.openTab;

      if (this.gotoPage == 'kpi') {
        const promiseFunction = new Promise((resolve, reject) => {
          this.initiativeService.GetInitiative(this.gotoId).subscribe((response) => {
            return resolve(true);
          });
        });

        promiseFunction.then((value) => {
          if (this.gotoId != null && this.gotoPage != null) {
            this.remove.Form();
            this.remove.Validate();
            this.initiativeService.id = this.gotoId;
            sessionStorage.setItem('id', this.gotoId.toString());
            this.router.navigate(['/initiative/kpi'], { queryParams: { year: this.year, id: this.gotoId } });
          }
        });
      } else if (this.gotoPage == 'kpi-maintain') {
        this.router.navigate(['/initiative/kpi-maintain']);
      } else {
        const Promise_CheckInitiativeActionStatusFromActionBy = new Promise((resolve, reject) => {
          this.initiativeService.GetInitiativeActionStatusFromActionBy(this.gotoId).subscribe((response) => {
            return resolve(response);
          });
        })

        const promiseFunction = new Promise((resolve, reject) => {
          this.initiativeService.GetInitiative(this.gotoId).subscribe((response) => {
            if (response != null) {
              this.initiativeService.isRevise = response.isReviseFlow ? true : false;
              this.generalData = response
              this.initiativeService.setGeneralData(response);
              let switchProcess: {
                type: string;
                stage: string;
              } = {
                type: response.initiativeType,
                stage: response.stage
              }
              //get process list
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
              // });

              //get stage
              this.initiativeService.GetInitiativeStagesById(this.initiativeService.id).then((responseStages) => {
                this.initiativeService.setInitiativeStageDetail(responseStages);
                // resolve(true);
              });
              return resolve(response.initiativeType)
            }
            else {
              return resolve("");
            }
          });
        });

        Promise_CheckInitiativeActionStatusFromActionBy.then((actionStatus: any) => {
          // approve
          // draft
          // add detail
          switch (actionStatus.status) {
            case "approve": {
              //if (this.initiativeService.username == "thammatad.a@frontiscompany.com") this.gotoPage = "approveEdit";
              break;
            }
            case "approveEdit": {
              this.initiativeService.approveEdit = true;
              break;
            }

            case "draft": {

              break;
            }

            case "add detail": {

              break;
            }

            default: {
              this.initiativeService.approveEdit = false;
              break;
            }
          }


        }).then(() => {

          promiseFunction.then((initiativeType: string) => {
            if (this.gotoId != null && this.gotoPage != null) {
              switch (this.gotoPage) {
                case 'view': {
                  // if (this.initiativeTypeITDIGITAL.includes(initiativeType)) {
                  //   this.InformationDim(this.gotoId);
                  // }
                  // else 
                  if (this.initiativeTypeRequestPool.includes(initiativeType)) {
                    this.InformationRequestPool(this.gotoId);
                  }
                  else {
                    this.Information(this.gotoId);
                  }
                  break;
                }

                case 'approve': {
                  if (!this.initiativeService.approveEdit) {
                    this.initiativeService.viewMode = true;
                  }
                  this.Approve(this.gotoId);
                  break;
                }

                case 'overview-approve': {
                  if (!this.initiativeService.approveEdit) {
                    this.initiativeService.viewMode = true;
                  }
                  this.OverviewApprove(this.gotoId);
                  break;
                }

                case 'approveEdit': {
                  this.initiativeService.viewMode = false;
                  this.initiativeService.approveEdit = true;
                  this.initiativeService.page = "approveEdit";
                  this.ApproveEdit(this.gotoId);
                  break;
                }

                case 'edit': {
                  // if (this.initiativeTypeITDIGITAL.includes(initiativeType)) {
                  //   this.EditDim(this.gotoId);
                  // } else 
                  if (this.initiativeTypeRequestPool.includes(initiativeType)) {
                    this.EditRequestPool(this.gotoId);
                  }
                  else {
                    this.Edit(this.gotoId);
                  }
                  break;
                }

                default: {
                  // if (this.initiativeTypeITDIGITAL.includes(initiativeType)) {
                  //   this.InformationDim(this.gotoId);
                  // }
                  // else 
                  if (this.initiativeTypeRequestPool.includes(initiativeType)) {
                    this.InformationRequestPool(this.gotoId);
                  } else {
                    this.Information(this.gotoId);
                  }
                  break;
                }
              }
            }

          });
        });

      }

    });


  }

  Information(itemId: any) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.id = itemId;
    this.initiativeService.page = 'information';
    sessionStorage.setItem('id', itemId.toString());
    this.router.navigate(['/initiative/information']);
  }

  InformationDim(itemId: any) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.id = itemId;
    sessionStorage.setItem('id', itemId.toString());
    sessionStorage.setItem('page', 'dim-view');
    this.router.navigate(['/initiative/dim']);
  }

  InformationRequestPool(itemId: any) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.id = itemId;
    this.initiativeService.page = 'pool-view';
    // sessionStorage.setItem('id', itemId.toString());
    // sessionStorage.setItem('page', 'pool-view');
    this.router.navigate(['/initiative/pool-view']);
  }

  Edit(itemId: any) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.id = itemId;
    this.initiativeService.page = 'edit';
    this.detailService.GetDetailInformation(this.gotoId).subscribe((response) => {
      this.capexService.GetCapexsInfo(this.gotoId, 'Createnew').subscribe(result => {
        if (result) {
          if (result.capexType === 'Createnew') {
            if (!response.simProjectSkipGate2 && this.generalData && this.generalData?.initiativeType == 'pim' && this.generalData?.stage.toLowerCase() == ('Gate3 : CAPEX-1').toLowerCase()) {
              this.initiativeService.isAddmore = true;
            }
          }
        }
      });
    });

    switch (this.capexType) {
      case "isAddmore":
        this.initiativeService.isAddmore = true;
        break
      case "isReturn":
        this.initiativeService.isReturn = true;
        break;
      case "isRevise":
        this.initiativeService.isRevise = true;
        break;
      default:
        break;
    }
    // sessionStorage.setItem('id', itemId.toString());
    // sessionStorage.setItem('page', 'edit');
    this.router.navigate(['/initiative/edit']);
  }

  EditDim(itemId: any) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.id = itemId;
    this.initiativeService.page = 'edit';
    sessionStorage.setItem('id', itemId.toString());
    sessionStorage.setItem('page', 'dim-edit');
    this.router.navigate(['/initiative/dim']);
  }

  EditRequestPool(itemId: any) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.id = itemId;
    this.initiativeService.page = 'edit';
    // sessionStorage.setItem('id', itemId.toString());
    // sessionStorage.setItem('page', 'pool-edit');
    sessionStorage.setItem('id', itemId.toString());
    switch (this.capexType) {
      case "isAddmore":
        this.initiativeService.isAddmore = true;
        break
      case "isReturn":
        this.initiativeService.isReturn = true;
        break;
      case "isRevise":
        this.initiativeService.isRevise = true;
        break;
      default:
        break;
    }
    this.router.navigate(['/initiative/pool-edit']);
  }

  Approve(id) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.id = id;
    this.initiativeService.page = 'approve';
    sessionStorage.setItem('id', id.toString());
    sessionStorage.setItem('page', 'approve');
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
      //   this.router.navigate(['/initiative/approve']);
      //   // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=overview-approve&openTab=true';
      //   // window.open(url);
      // });
      this.router.navigate(['/initiative/approve']);
    });
    // this.router.navigate(['/initiative/approve']);
  }

  ApproveEdit(id) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.id = id;
    this.initiativeService.page = 'approveEdit';
    this.initiativeService.viewMode = false;
    this.initiativeService.approveEdit = true;
    sessionStorage.setItem('id', id.toString());
    sessionStorage.setItem('page', 'approveEdit');
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
      //   this.router.navigate(['/initiative/approve']);
      //   // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=overview-approve&openTab=true';
      //   // window.open(url);
      // });
      this.router.navigate(['/initiative/approve']);
    });
    // this.router.navigate(['/initiative/approve']);
  }

  OverviewApprove(id) {
    this.remove.Form();
    this.remove.Validate();
    this.initiativeService.id = id;
    this.initiativeService.page = 'overview-approve';
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
      //   // var url = '/initiative/initiativeredirector?gotoId=' + id + '&gotoPage=overview-approve&openTab=true';
      //   // window.open(url);
      // });
      this.router.navigate(['/initiative/approve']);
    });
    // sessionStorage.setItem('id', id.toString());
    // sessionStorage.setItem('page', 'approve');
    // this.router.navigate(['/initiative/approve']);
  }

  CheckInitiativeType(id) {
    this.initiativeService.GetInitiative(id).subscribe((response) => {
      if (response != null) {
        return response.initiativeType
      }
      else {
        return "";
      }
    });
  }

  CheckInitiativeActionStatusFromActionBy(id) {
    this.initiativeService.GetInitiativeActionStatusFromActionBy(id).subscribe((response) => {
      if (response != null) {
        return "";
      }
      else {
        return response;
      }
    });
  }


}
