import { AttachmentService } from './../../core/services/attachment/attachment.service';
import { SubmitService } from './../../core/services/submit/submit.service';
import { AuthService } from './../../core/services/authentication/auth.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuditService } from '@services/audit/audit.service';
import { CapexService } from '@services/capex/capex.service';
import { CimService } from '@services/cim/cim.service';
import { CpiService } from '@services/cpi/cpi.service';
import { DimService } from '@services/dim/dim.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { MaxService } from '@services/max/max.service';
import { PimService } from '@services/pim/pim.service';
import { ProgressService } from '@services/progress/progress.service';
import { ValidateService } from '@services/validate/validate.service';
import { SwalTool } from '@tools/swal.tools';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { Initiative, StageDetail } from '@models/initiative';
import { StageService } from '@services/stage/stage.service';
import { InitiativeAttachmentComponent } from '@components/initiative-attachment/initiative-attachment.component';
import { PermissionService } from '@services/permission/permission.service';
import { SettingServiceService } from '@services/settingService/setting-service.service';
import { ViewLogHistoryComponent } from '@components/view-log-history/view-log-history.component';
import { ContactIoComponent } from '@components/contact-io/contact-io.component';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { RolePermissionModel } from '@models/RolePermissionModel';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit, OnDestroy {

  //@ViewChild('ViewLogHistoryModal', { static: false }) ViewLogHistoryModal: ModalDirective;

  //@ViewChild('HistoryStatus', { static: false }) HistoryStatus: ModalDirective;

  //@ViewChild('ContactIO', { static: false }) ContactIO: ModalDirective;

  @ViewChild('AttachmentModal', { static: false }) AttachmentModal: ModalDirective;

  @Input() isApprove: boolean;

  id: number;
  formGroup: FormGroup;
  submitToForm: FormGroup;
  page: string;
  showTabs: boolean;
  requestCapex: boolean;
  isCimAndStrategy: boolean;
  isMax: boolean;
  isCapex: boolean;
  isCpi: boolean;
  isDim: boolean;
  isPim: boolean;
  isCim: boolean;
  isRequestCapex: boolean;
  cimStageCheck: boolean;
  dimStageCheck: boolean;
  progressDimStage: boolean;
  isRequestProjectEngineer: boolean;
  typeBenefit: string;
  isLookBack: boolean;
  isDimLookBack: boolean;
  isMaxPimGate: boolean;
  isStagePimCapexInfo: boolean;
  stageIL5: boolean;
  stageAdopt: boolean;
  lookbackPim: boolean;
  showTabEMOC: boolean;
  submitToItems: any = [];
  history: string;
  generalData: any;


  tabCondition: {
    name: string;
    value: boolean;
  }[] = [];

  //tab common require
  tabGeneralRequire: boolean;
  tabProgressRequire: boolean;

  //max
  tabDetailRequire: boolean;
  tabImpactRequire: boolean;

  //capex
  tabCapexInformationRequire: boolean;

  //cpi
  tabDetailCpiRequire: boolean;
  tabLessonLearnRequire: boolean;
  tabBestPracticeRequire: boolean;

  //cim
  tabResourceNeedRequire: boolean;
  tabRiskRequire: boolean;

  //dim
  tabDetailDimRequire: boolean;


  CheckSubmitTo: boolean;
  IsOwner: boolean;
  IsCreator: boolean;
  IsViewSubmitto: boolean = false;
  IsFileAttach: boolean;
  Comment: boolean;
  SuggestStatusMain: boolean;

  //approve
  approveAdmin: boolean;

  //request capex button
  showRequestCapexButton: boolean;
  isStagePimBestPractice: boolean;
  isStagePimRiskResource: boolean;
  //config dim
  dimConfig: boolean;
  capexDone: boolean;

  mailAccount: string;

  stageDetail: StageDetail[] = [];

  ShowTabCapex: boolean;
  newFeature: boolean;
  isITDigitalBudgetSurvey: boolean;

  bsModalRef: BsModalRef;
  config: ModalOptions = {
    class: 'modal-xl'
  };

  // switch to detail tab
  activeGeneralTabs: { link: string, tabs: string } = {
    link: 'active',
    tabs: 'show active'
  };
  activeDetailTabs: { link: string, tabs: string } = {
    link: '',
    tabs: ''
  };

  activeProgressTabs: { link: string, tabs: string } = {
    link: '',
    tabs: ''
  };
  historyId: any;
  rolesParams: {
    email: string,
    id?: number
  } = {
      email: null,
      id: 0
    }

  isTestLoading: boolean;
  InitiativeStatus: string;
  userPermission: RolePermissionModel[];
  public permissionServiceStaticVar = PermissionService;


  constructor(
    private initiativeService: InitiativeService,
    private router: Router,
    private swalTool: SwalTool,
    private auditService: AuditService,
    private progressService: ProgressService,
    private authService: AuthService,
    private submitService: SubmitService,
    private attachmentService: AttachmentService,
    private stageService: StageService,
    private modalService: BsModalService,
    private permissionService: PermissionService,
    private settingService: SettingServiceService,
    private detailInformationService: DetailInformationService,
    private maxService: MaxService,
    private cimService: CimService,
    private validateService: ValidateService,
    private capexService: CapexService,
    private dimService: DimService,
    private pimService: PimService,
    private cpiService: CpiService,
  ) {
    this.page = null;
    this.userPermission = JSON.parse(sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY));
    setTimeout(() => {
      this.isTestLoading = true;
    }, 3000);
  }

  ngOnInit(): void {
    this.initiativeService.getNewFeature().subscribe((newFeatureRes) => {
      this.initiativeService.newFeature = newFeatureRes;
      this.newFeature = newFeatureRes;
    });
    this.settingService.GetInitiativeSetting().then((settingResponse) => {
      if (settingResponse) {
        this.settingService.setSettingData(settingResponse);
      }
    });
    this.mailAccount = this.initiativeService.username;
    this.page = 'information';
    this.rolesParams.email = this.initiativeService.username;
    this.rolesParams.id = this.initiativeService.id;
    this.permissionService.GetRolesDetailList(this.rolesParams);

    if (this.initiativeService.id) {
      this.initiativeService.GetInitiativeStages(this.initiativeService.id).then((responseStages) => {
        if (responseStages) {
          this.initiativeService.stageDetailList = responseStages;
          this.stageDetail = responseStages;
        }
      });
    }

    this.formGroup = new FormGroup({});
    this.initiativeService.viewMode = true;
    if (this.initiativeService.id == null) {
      this.router.navigate(['/initiative/my-own']);
    } else {
      this.initSubmitForm();
      this.init();
    }

  }

  ngOnDestroy() {
    this.initiativeService.viewMode = false;
    this.initiativeService.isAddmore = false;
    this.initiativeService.isReturn = false;
    this.initiativeService.isRevise = false;
    this.validateService.inValidtab = [];
    this.initiativeService.isCancel = false;
    this.progressService.haveProgress = false;
    this.initiativeService.isUtilityOtherRequire = false;
    this.initiativeService.SubmitDone = false;
  }


  init() {
    if (this.page != 'create') {
      this.initiativeService.GetSuggestStatus(this.initiativeService.id).subscribe(response => {
        if (response) {

          this.initiativeService.GetInitiative(this.initiativeService.id).subscribe((res) => {
            this.initiativeService.surveyVersions = res.surveyVersions;
            this.initiativeService.initiativeCode = res.initiativeCode;
            this.configTabs(res);
            this.generalData = res;
            this.initiativeService.setGeneralData(res);
            this.ShowTabCapex = (res.directCapex && !res.requestProjectEngineer) || (res.capexTabStatus && res.capexTabStatus > 0) ? true : false;
            this.initiativeService.ShowTabCapex = (res.directCapex && !res.requestProjectEngineer) || (res.capexTabStatus && res.capexTabStatus > 0) ? true : false;
            this.typeBenefit = res.typeBenefit;
            this.isRequestProjectEngineer = Boolean(res.requestProjectEngineer);
            //check capex
            this.capexDone = res.isCreatedApp;


            if(this.isRequestProjectEngineer)
            {
              this.showTabEMOC = false;

              if (res.stage != null && res.stage != '') {
                this.showTabEMOC = true;
              }
            }
            else {
              this.showTabEMOC = true;
            }


            this.authService.getMsalUser().subscribe((response) => {
              if (response) {
                let hideOnStage = ["IL5"];
                this.initiativeService.GetIsViewSubmitForm(response.mail).subscribe(getviewResponse => {
                  console.log(getviewResponse);
                  if (getviewResponse && hideOnStage.indexOf(this.initiativeService.suggestionStatus?.stage) <= 0) {
                    this.IsViewSubmitto = getviewResponse;
                  } else {
                    this.IsViewSubmitto = false;
                  }
                });
              }
            });

            this.detailInformationService.GetDetailInformation(this.initiativeService.id).subscribe((detailRes) => {
              if (detailRes) {
                if ((response.max && Number(detailRes?.requestSubPic) > 0) || res.detailPimTabStatus > 0) {
                  this.isMaxPimGate = true;
                }
                else {
                  this.isMaxPimGate = false;
                }
              } else {
                this.isMaxPimGate = false;
              }
            });


            this.stageAdopt = response.stage?.startsWith('Adopt');
            this.stageIL5 = response.stage === 'IL5' ? true : false;
            if (response.stage) {
              this.lookbackPim = response.stage.toUpperCase().startsWith('GATE3') || response.stage.toUpperCase().startsWith('GATE4');
            }

            if (response.strategy) {
              // this.tabCondition.push({
              //   name: 'lesson-learn',
              //   value: true
              // });
              if (response.stage === 'Initiative-1' || response.stage === 'Initiative-2') {
                this.tabCondition.push({
                  name: 'best-practice',
                  value: true
                })
                this.tabCondition.push({
                  name: 'lesson-learn',
                  value: true
                });
              }
            }

            //new code
            if (response.cim && response.stage && !response.strategy) {
              let stageDetailList: StageDetail[] = this.setStageList(this.stageDetail);
              let stageDetail: StageDetail = null;
              let stageDetailHaveDash: StageDetail = null;
              let riskCheck: StageDetail = null;
              let progressCheck: StageDetail = null;
              let resourceNeedCheck: StageDetail = null;
              let lookbackCheck: StageDetail = null;
              let bestPracticeCheck: StageDetail = null;
              let lessonLearnCheck: StageDetail = null;
              if (res.typeOfInvestment === 'M&A' || res.typeOfInvestment === 'CVC') {
                riskCheck = this.stageDetail.find((x) => x.subtype == 'm&a,cvc' && x.stage == "Initiative-1");
                progressCheck = this.stageDetail.find((x) => x.subtype == 'm&a,cvc' && x.stage == "Initiative-1");
                resourceNeedCheck = this.stageDetail.find((x) => x.subtype == 'm&a,cvc' && x.stage == "DD-1");
                lookbackCheck = this.stageDetail.find((x) => x.subtype == 'm&a,cvc' && x.stage == "Lookback-1");
                bestPracticeCheck = this.stageDetail.find((x) => x.subtype == 'm&a,cvc' && x.stage == "Lookback-1");
                lessonLearnCheck = this.stageDetail.find((x) => x.subtype == 'm&a,cvc' && x.stage == "Initiative-1");
                stageDetail = stageDetailList.find((x) => x.subtype == 'm&a,cvc' && x.stage == response.stage);
                stageDetailHaveDash = this.stageDetail.find((x) => x.subtype == 'm&a,cvc' && x.stage == response.stage);
                stageDetailHaveDash = stageDetailHaveDash ? stageDetailHaveDash : stageDetail;
                if (stageDetailHaveDash.sequence >= riskCheck.sequence) {
                  this.tabCondition.push({
                    name: 'risk',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= progressCheck.sequence) {
                  this.tabCondition.push({
                    name: 'progress',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= resourceNeedCheck.sequence) {
                  this.tabCondition.push({
                    name: 'resource-need',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= lookbackCheck.sequence) {
                  this.tabCondition.push({
                    name: 'lookback',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= bestPracticeCheck.sequence) {
                  this.tabCondition.push({
                    name: 'best-practice',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= lessonLearnCheck.sequence) {
                  this.tabCondition.push({
                    name: 'lesson-learn',
                    value: true
                  });
                }
              }
              else if (res.typeOfInvestment === 'Divestment' || res.divestment) {
                riskCheck = this.stageDetail.find((x) => x.subtype == "divest" && x.stage == "Initiative-1");
                progressCheck = this.stageDetail.find((x) => x.subtype == "divest" && x.stage == "Initiative-1");
                resourceNeedCheck = this.stageDetail.find((x) => x.subtype == "divest" && x.stage == "DD-1");
                lookbackCheck = this.stageDetail.find((x) => x.subtype == "divest" && x.stage == "Lookback-1");
                bestPracticeCheck = this.stageDetail.find((x) => x.subtype == "divest" && x.stage == "Lookback-1");
                lessonLearnCheck = this.stageDetail.find((x) => x.subtype == "divest" && x.stage == "Initiative-1");
                stageDetail = stageDetailList.find((x) => x.subtype == 'divest' && x.stage == response.stage);
                stageDetailHaveDash = this.stageDetail.find((x) => x.subtype == 'divest' && x.stage == response.stage);
                stageDetailHaveDash = stageDetailHaveDash ? stageDetailHaveDash : stageDetail;

                if (stageDetailHaveDash.sequence >= riskCheck.sequence) {
                  this.tabCondition.push({
                    name: 'risk',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= progressCheck.sequence) {
                  this.tabCondition.push({
                    name: 'progress',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= resourceNeedCheck.sequence) {
                  this.tabCondition.push({
                    name: 'resource-need',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= lookbackCheck.sequence) {
                  this.tabCondition.push({
                    name: 'lookback',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= bestPracticeCheck.sequence) {
                  this.tabCondition.push({
                    name: 'best-practice',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= lessonLearnCheck.sequence) {
                  this.tabCondition.push({
                    name: 'lesson-learn',
                    value: true
                  });
                }
              } else {
                riskCheck = this.stageDetail.find((x) => x.subtype == "bigproject" && x.stage == "Initiative-1");
                progressCheck = this.stageDetail.find((x) => x.subtype == "bigproject" && x.stage == "Initiative-1");
                resourceNeedCheck = this.stageDetail.find((x) => x.subtype == "bigproject" && x.stage == "BEP-1");
                lookbackCheck = this.stageDetail.find((x) => x.subtype == "bigproject" && x.stage == "Lookback-1");
                bestPracticeCheck = this.stageDetail.find((x) => x.subtype == "bigproject" && x.stage == "Lookback-1");
                lessonLearnCheck = this.stageDetail.find((x) => x.subtype == "bigproject" && x.stage == "Initiative-1");
                stageDetail = stageDetailList.find((x) => x.subtype == 'bigproject' && x.stage == response.stage);
                stageDetailHaveDash = this.stageDetail.find((x) => x.subtype == 'bigproject' && x.stage == response.stage);
                stageDetailHaveDash = stageDetailHaveDash ? stageDetailHaveDash : stageDetail;
                if (stageDetailHaveDash.sequence >= riskCheck.sequence) {
                  this.tabCondition.push({
                    name: 'risk',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= progressCheck.sequence) {
                  this.tabCondition.push({
                    name: 'progress',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence >= resourceNeedCheck.sequence) {
                  this.tabCondition.push({
                    name: 'resource-need',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence > lookbackCheck.sequence) {
                  this.tabCondition.push({
                    name: 'lookback',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence > bestPracticeCheck.sequence) {
                  this.tabCondition.push({
                    name: 'best-practice',
                    value: true
                  });
                }
                if (stageDetailHaveDash.sequence > lessonLearnCheck.sequence) {
                  this.tabCondition.push({
                    name: 'lesson-learn',
                    value: true
                  });
                }
              }
            }
            if (response.pim && response.stage) {
              let sequenceCondition = this.stageDetail.find((s) => (s.stage).toLowerCase() == (response.stage).toLowerCase());
              if (sequenceCondition) {
                if (sequenceCondition.sequence >= 11) {
                  this.isStagePimCapexInfo = true;
                }
                if (sequenceCondition.sequence >= 19) {
                  this.isStagePimBestPractice = true
                }
                if (sequenceCondition.sequence >= 4) {
                  this.isStagePimRiskResource = true
                }
              }
            }

            if (response.dim && response.stage) {
              let sequenceCondition = this.stageDetail.find((s) => (s.stage).toLowerCase() == (response.stage).toLowerCase());
              if (sequenceCondition) {
                if (sequenceCondition.sequence >= 11) {
                  this.isStagePimCapexInfo = true;
                }
                if (sequenceCondition.sequence >= 19) {
                  this.isStagePimBestPractice = true
                }
                if (sequenceCondition.sequence >= 4) {
                  this.isStagePimRiskResource = true
                }
              }
            }

          });

          this.initiativeService.suggestion = true
          // force suggest strategy to cpi for test
          this.isCpi = response.cpi ? true : false;
          this.isCimAndStrategy = response.cim || response.strategy ? true : false;
          this.isCim = response.cim ? true : false;
          // this.isCimAndStrategy = response.cim ? true : false;

          // please change before deploy to production

          this.isRequestCapex = response.isRequestCapex ? true : false;

          this.initiativeService.suggestionStatus = response;
          this.isCapex = response.directCapex ? true : false;
          this.isDim = response.dim ? true : false;
          this.isMax = response.max ? true : false;
          this.requestCapex = response.requestCapex ? true : false;
          this.isPim = response.pim ? true : false;
          this.isITDigitalBudgetSurvey = response.initiativeType == 'Digital' || response.initiativeType == 'IT' ? true : false;

          if (this.initiativeService.gotoTab == 'detail') {
            // link:'active',
            // tabs:'show active'
            this.activeGeneralTabs.link = '';
            this.activeGeneralTabs.tabs = '';
            this.activeDetailTabs.link = 'active';
            this.activeDetailTabs.tabs = 'show active';
            this.activeProgressTabs.link = '';
            this.activeProgressTabs.tabs = '';

          } else if (this.initiativeService.gotoTab == 'progress') {
            this.activeGeneralTabs.link = '';
            this.activeGeneralTabs.tabs = '';
            this.activeDetailTabs.link = '';
            this.activeDetailTabs.tabs = '';
            this.activeProgressTabs.link = 'active';
            this.activeProgressTabs.tabs = 'show active';
          } else {
            this.activeGeneralTabs.link = 'active';
            this.activeGeneralTabs.tabs = 'show active';
            this.activeDetailTabs.link = '';
            this.activeDetailTabs.tabs = '';
            this.activeProgressTabs.link = '';
            this.activeProgressTabs.tabs = '';
          }




          if (response.cim || response.directCapex || response.strategy || response.max || response.dim || response.pim || response.cpi || response.randD || response.other) {
            this.SuggestStatusMain = false;
            this.initiativeService.suggestion = true;
          } else {
            this.SuggestStatusMain = true;
            this.initiativeService.suggestion = false;
          }


          //show request capex button
          //check for approve
          const check = { status: response.status, stage: response.stage };
          // this.statusService.CheckInitiativeDetail(check).subscribe(result => {
          //   // if (response.status !== 'add more' && this.CapexType_ != "AddmoreCapex") {
          //   //   this.ApproveCapex = this.Capex ? true : false;
          //   //   this.ApproveAdmin = result;
          //   this.approveAdmin = result;
          //   // } else {
          //   //   this.AddMoreCapex = true;
          //   // }
          // });
          if (response.stage && response?.stage.toLowerCase() != "draft") {
            this.approveAdmin = true;
          }

          // Check Capex Dim Stage
          let dimStage = ['IL0', 'Admin Check', 'draft', null];
          if (response.dim && dimStage.indexOf(response.stage) === -1) {
            this.dimStageCheck = true
          }
          else {
            this.dimStageCheck = false;
          }
          // Check Progress Dim Stage
          let dimProgressStage = ['IL0', 'Admin Check', 'Implementing', 'Ideate-1', 'Ideate-2', 'Ideate-3', null];
          if (response.dim && dimProgressStage.indexOf(response.stage) === -1) {
            this.progressDimStage = true;
          }
          else {
            this.progressDimStage = false;
          }
          //isLookback
          let lookbackStage = ['Lookback-1', 'Lookback-2', 'Lookback-3', 'Lookback-4', 'Lookback-5']
          if (response.stage && lookbackStage.indexOf(response.stage) >= 0) {
            this.isLookBack = true;
          }
          else {
            this.isLookBack = false;
          }

          if (response.stage && this.stageService.stageForShowDimLookback.indexOf(response.stage) >= 0) {
            this.isDimLookBack = true;
          }
          else {
            this.isDimLookBack = false;
          }
          // const check = { status: response.status, stage: response.stage };
          // this.statusService.CheckApproveInitiative(check).subscribe(result => {
          //   // if (response.status !== 'add more' && this.CapexType_ != "AddmoreCapex") {
          //   //   this.ApproveCapex = this.Capex ? true : false;
          //   // } else {
          //   //   this.AddMoreCapex = true;
          //   // }
          // });
          if (response.stage) {
            this.initiativeService.GetInitiativeStageForMaxPermission(this.initiativeService.id).subscribe((res) => {
              let stageSPOC = ["IL4", "IL5"];
              if (response.max) {
                // let permissionSPOC: RolePermissionModel = this.userPermission.find(x =>
                //   x.pageId.toUpperCase() === "EDITALLTYPEMAX"
                //   && x.roleName.toLowerCase() === "spoc all workstream"
                // );

                let permission: RolePermissionModel = this.userPermission.find(x =>
                  x.pageId.toLowerCase() === PermissionService.MAINFORM_PAGE_ID
                  && x.sectionId.toLowerCase() === "submitform"
                  && x.fieldName.toLowerCase() === "status"
                  && x.parameter01.toLowerCase() === "backward"
                  && x.roleName.toLowerCase() === "spoc all workstream"
                  && x.stage.toUpperCase() === response.stage.toUpperCase()
                );

                if (response.status != "wait for approval") {
                  this.submitToForm.patchValue({ status: 'forward' });
                  this.submitToItems.push({ attribute01: 'forward', attribute02: 'Submitted Forward' });
                }
                if (stageSPOC.indexOf(response.stage.toUpperCase()) >= 0 && permission && (res.length <= 0)) {
                  if (this.submitToItems.length <= 0) {
                    this.submitToForm.patchValue({ status: 'backward' });
                  }
                  this.submitToItems.push({ attribute01: 'backward', attribute02: 'Submitted Backward' });
                } else if (stageSPOC.indexOf(response.stage.toUpperCase()) < 0 && (res.length <= 0)) {
                  if (this.submitToItems.length <= 0) {
                    this.submitToForm.patchValue({ status: 'backward' });
                  }
                  this.submitToItems.push({ attribute01: 'backward', attribute02: 'Submitted Backward' });
                }
                if (this.submitToItems.length <= 0) {
                  this.submitToForm.patchValue({ status: 'cancelled' });
                }
                this.submitToItems.push({ attribute01: 'cancelled', attribute02: 'Submitted Cancelled' });

              }
            });

          }

        } else {
          this.router.navigate(['/initiative/my-own']);
        }
      });
    }

    this.attachmentService.GetAttachment(this.initiativeService.id).subscribe(response => {
      let attachements = response;
      if (attachements) {
        this.IsFileAttach = true;
      }
      else {
        this.IsFileAttach = false;
      }
    });
  }

  setStageList(list: StageDetail[]) {
    let dup: string = null;
    let phaseList: StageDetail[] = [];
    list.forEach(t => {
      let length = t.stage.length;
      let index = t.stage.substring(length, length - 1);
      if (parseInt(index) > 0) {
        let showtext = t.stage.substring(0, length - 2);
        if (showtext != dup) {
          dup = showtext;
          phaseList.push({
            process: t.process,
            stage: showtext,
            subtype: t.subtype,
            sequence: t.sequence,
            flowType: t.flowType,
            initiativeId: t.initiativeId
          });
        }
      } else {
        phaseList.push({
          process: t.process,
          stage: t.stage,
          subtype: t.subtype,
          sequence: t.sequence,
          flowType: t.flowType,
          initiativeId: t.initiativeId
        });
      }
    });
    return phaseList;
  }



  initSubmitForm() {
    if (!this.formGroup.get('submitToForm')) {
      this.submitToForm = new FormGroup({});
      this.submitToForm.addControl('status', new FormControl(null));
      this.submitToForm.addControl('username', new FormControl(this.initiativeService.username));
      this.submitToForm.addControl('commentCancelled', new FormControl(null));
      this.formGroup.addControl('submitToForm', this.submitToForm);
    }
  }

  get Impact() {
    return true;
  }

  getInitiativeName() {
    return this.initiativeService.initiativeName;
  }

  getSuggestion() {
    return this.initiativeService.suggestion;
  }

  GetId() {
    return this.initiativeService.id;
  }

  OnChangeStatus() {
    if (this.formGroup.get('submitToForm')) {
      switch (this.formGroup.get('submitToForm').get('status').value) {
        case 'cancelled':
          this.Comment = true;
          this.formGroup.get('submitToForm').get('commentCancelled').setValidators([Validators.required]);
          this.formGroup.get('submitToForm').get('commentCancelled').updateValueAndValidity();
          break;
        case 'backward':
        case 'forward':
          this.Comment = false;
          this.formGroup.get('submitToForm').get('commentCancelled').clearValidators();
          this.formGroup.get('submitToForm').get('commentCancelled').updateValueAndValidity();
          this.formGroup.get('submitToForm').get('commentCancelled').markAsUntouched();
          break;
      }
    }
  }

  showTabByCondition(tabName: string) {
    if (this.tabCondition.length > 0 && this.tabCondition.find((tab) => tab.name == tabName)) {
      return this.tabCondition.find((tab) => tab.name == tabName).value;
    } else {
      return false;
    }
  }


  CreateCoDeveloper(id: number) {
    this.initiativeService.CreateCoDeveloper(id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => {
      this.swalTool.Draft();
    });
  }

  LogSubmit() {
  }

  SubmitValidation() {
    var returnValue = true;
    this.swalTool.savingLoading('Check Validation');
    if (!this.validateService.SubmitValidation(this.formGroup as FormGroup)) {
      returnValue = false;
    }
    return returnValue;
  }



  // submit
  async Submit() {
    if (this.initiativeService.SubmitDone || this.initiativeService.SavingData) {
      return;
    }
    this.initiativeService.SavingData = true;
    this.swalTool.savingLoading('submit');
    // this.formGroup.markAllAsTouched();
    // if (this.formGroup.valid && this.formGroup.get('initiativesForm') && this.initiativeService.suggestion) {
    if (this.formGroup.get('submitToForm').get('status').value == 'backward') {

      // backward
      this.swalTool.savingLoading('Backward');
      if (this.page !== 'create') {
        await this.auditService.CallFullLog(this.initiativeService.id).then(fullLogRespond => {
          this.auditService.historyId = fullLogRespond;
          this.historyId = fullLogRespond;
        });
      }

      if (this.mailAccount?.toLowerCase() === 'thammatad.a@frontiscompany.com' && this.submitToForm.get('aliasOwner')?.value) {
        let aliasOwner = this.submitToForm.get('aliasOwner').value;
        this.submitToForm.get('username').patchValue(aliasOwner);
      }
      this.initiativeService.SavingData = true;
      this.editPageDarftAndSubmitForm('backward');

    } else if (this.formGroup.get('submitToForm').get('status').value == 'cancelled') {
      // cancel 
      if (!this.formGroup.get('submitToForm').get('commentCancelled').value) {
        this.formGroup.get('submitToForm').get('commentCancelled').setValidators([Validators.required]);
        this.formGroup.get('submitToForm').get('commentCancelled').updateValueAndValidity();
        this.formGroup.get('submitToForm').markAllAsTouched();
        this.swalTool.Required();
        return;
      } else {
        this.formGroup.get('submitToForm').get('commentCancelled').clearValidators();
        this.formGroup.get('submitToForm').get('commentCancelled').updateValueAndValidity();
      }

      if (this.page !== 'create') {
        await this.auditService.CallFullLog(this.initiativeService.id).then(fullLogRespond => {
          this.auditService.historyId = fullLogRespond;
        });
      }
      this.swalTool.savingLoading('Cancel');

      if (this.mailAccount?.toLowerCase() === 'thammatad.a@frontiscompany.com' && this.submitToForm.get('aliasOwner')?.value) {
        let aliasOwner = this.submitToForm.get('aliasOwner').value;
        this.submitToForm.get('username').patchValue(aliasOwner);
      }
      this.initiativeService.SavingData = true;
      this.editPageDarftAndSubmitForm('cancel');

    }
  }


  ShowViewLogHistory() {
    //this.ViewLogHistoryModal.show();
    const overrideConfig = this.config;

    if (this.initiativeService.id) {
      overrideConfig.initialState = {
        initiativeId: this.initiativeService.id,
        initiativeCode: this.initiativeService.initiativeCode
      };
      this.modalService.show(ViewLogHistoryComponent, overrideConfig);
    } else {
      this.swalTool.DataNotFound();
    }
  }

  CloseViewLogHistory() {
    //this.ViewLogHistoryModal.hide();
  }

  ShowContactIO() {
    const overrideConfig = this.config;

    if (this.initiativeService.id) {
      overrideConfig.initialState = {
        id: this.initiativeService.id
      };
      this.modalService.show(ContactIoComponent, overrideConfig);
    } else {
      this.swalTool.DataNotFound();
    }
  }

  CloseContactIO() {
    // this.ContactIO.hide();
  }

  ShowHistory(stage) {
    this.history = stage;
    //this.HistoryStatus.show();
  }

  CloseHistoryStatus() {
    //this.HistoryStatus.hide();
  }

  ShowAttachment() {
    const overrideConfig = this.config;
    if (this.initiativeService.SubmitDone) {
      return;
    }
    if (this.initiativeService.id) {
      overrideConfig.initialState = { initiativeId: this.initiativeService.id };
      this.modalService.show(InitiativeAttachmentComponent, overrideConfig);
    } else {
      this.swalTool.InitiativeNotFound();
    }
  }

  CloseAttachment() {
    this.AttachmentModal.hide();
  }

  configTabs(response: Initiative) {

    this.initiativeService.configTabs.isNextButtonClicked = response.isNextButtonClicked;

    this.initiativeService.configTabs.generalTabStatus = response.generalTabStatus;
    this.initiativeService.configTabs.detailCimStrategyTabStatus = response.detailCimStrategyTabStatus;
    this.initiativeService.configTabs.detailCpiTabStatus = response.detailCpiTabStatus;
    this.initiativeService.configTabs.detailMaxDimCapexTabStatus = response.detailMaxDimCapexTabStatus;

    //requestTPX
    if (Number(response.max) == 0) {
      if (response.requestProjectEngineer && response.detailPimTabStatus == null) {
        this.initiativeService.configTabs.detailPimTabStatus = null;
      } else {
        this.initiativeService.configTabs.detailPimTabStatus = 1;
      }
    } else {
      if (response.requestProjectEngineer) {
        this.initiativeService.configTabs.detailPimTabStatus = 1;
      }
    }



    this.initiativeService.configTabs.statusTabStatus = response.statusTabStatus;


    this.initiativeService.configTabs.impactTabStatus = response.impactTabStatus;
    this.initiativeService.configTabs.capexTabStatus = response.capexTabStatus;
    this.initiativeService.configTabs.progressTabStatus = response.progressTabStatus;
    this.initiativeService.configTabs.lessonLearnTabStatus = response.lessonLearnTabStatus;
    this.initiativeService.configTabs.lookbackTabStatus = response.lookbackTabStatus;
    this.initiativeService.configTabs.bestPracticeTabStatus = response.bestPracticeTabStatus;
    this.initiativeService.configTabs.lessonLearnTabStatus = response.lessonLearnTabStatus;
    this.initiativeService.configTabs.riskTabStatus = response.riskTabStatus;
    this.initiativeService.configTabs.resourceTabStatus = response.resourceTabStatus;
    this.initiativeService.configTabs.strategyTabStatus = response.strategyTabStatus;
    this.ShowTabCapex = response.directCapex || response.capexTabStatus && response.capexTabStatus > 0 ? true : false;
    this.initiativeService.ShowTabCapex = response.directCapex || response.capexTabStatus && response.capexTabStatus > 0 ? true : false;
    //this.initiativeService.DisableTabCapex = response.capexTabStatus && response.capexTabStatus == 2 ? true : false;
    this.initiativeService.DisableTabCapex = (response.capexTabStatus && response.capexTabStatus == 2) || response.isReviseFlow ? true : false;
  }

  isSuggestion() {
    if (this.generalData) {
      // this.SuggestStatusMain = true;
      // this.initiativeService.suggestion = false;

      this.generalData.isNextButtonClicked = false;
      //general tabs
      this.generalData.generalTabStatus = 1;

      //detail tabs
      this.generalData.detailCimStrategyTabStatus = null;
      this.generalData.detailCpiTabStatus = null;
      this.generalData.detailMaxDimCapexTabStatus = null;
      this.generalData.detailPimTabStatus = null;

      //capex info tabs
      this.generalData.capexTabStatus = null;
      //progress tabs
      this.generalData.progressTabStatus = null;
      //imapact tabs
      this.generalData.impactTabStatus = null;
      //risk tabs
      this.generalData.riskTabStatus = null;
      //resource need tabs
      this.generalData.resourceTabStatus = null;
      //lookback
      this.generalData.lookbackTabStatus = null;
      //best practice tabs
      this.generalData.bestPracticeTabStatus = null;
      //lesson learn tab
      this.generalData.lessonLearnTabStatus = null;
      //status tab
      this.generalData.statusTabStatus = null;
    }
  }

  get Showtabs() {
    return this.initiativeService.configTabs;
  }

  Duplicate() {
    if (this.initiativeService.SubmitDone) {
      return;
    }
    this.swalTool.Duplicating();
    this.initiativeService.DuplicateInitiative().subscribe((responseId: number) => {
      if (responseId != 0) {
        this.swalTool.DuplicateSuccess(responseId);
      } else {
        this.swalTool.Error('Duplicating initiative failed.')
      }
    },
      error => {
        this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
      }
    )
  }

  Print() {
    if (this.initiativeService.SubmitDone) {
      return;
    }

    var url;
    // const GetSuggestStatus = new Promise((resolve, reject) => {
    //   this.initiativeService.GetSuggestStatus(this.id).subscribe(response => {
    //     this.in = response;
    //    // console.log("gestStatusData :",this.gestStatusData);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    //getGeneral
    const GetGeneralData = new Promise((resolve, reject) => {
      this.initiativeService.GetInitiative(this.initiativeService.id).subscribe((res) => {
        this.initiativeService.setGeneralData(res);
        //     this.generalData = res;
        //     if (res.createdBy) {
        //       this.initiativeService.GetOwnerEmail({ text: res.createdBy }).subscribe(
        //         responseEmail => {
        //           if (responseEmail) {
        //             this.creatorName = responseEmail.ownerName;
        //           }
        //         });
        //     }
        //     let coDeveloperSelected : InitiativeCoDeveloper[] = res.initiativeCoDevelopers;
        //     coDeveloperSelected.forEach((element) => {
        //       if (element.coDeveloperName) { this.selectListCoDeveloper.push(element.coDeveloperName); }
        //     });

        //     let companyData = this.companyService.companyList.find((com)=>com.value == res.company);
        //     this.company = companyData.name;
        //     this.organization = companyData.org.find((com)=>com.name == res.organization).name;
        //     this.plant = companyData.plant.find((com)=>com.id == res.plant).name;

        //     if (res.strategicObjective) {
        //       this.detailService.GetStrategies(res.strategicObjective).subscribe(strategies =>
        //         this.strategies = strategies);
        //       //if (!this.initiativeService.viewMode) this.initiativesForm.get('strategyType').enable();
        //         console.log("strategies :",this.strategies)
        //     }

        //     //get fromDetail
        //     switch (this.generalData.initiativeType){
        //       case 'cim': this.isCim = true; 
        //       break;
        //       case 'cpi': this.isCpi = true; 
        //       break;
        //       case 'dim': this.isDim = true; 
        //       break;
        //       case 'directCapex': this.isDirectCapex = true; 
        //       break;
        //       case 'max': this.isMax = true; 
        //       break;
        //       case 'pim': this.isPim = true; 
        //       break;
        //       case 'strategy': this.isStategy = true; 
        //       break;
        //     };

        //  console.log("generalData :",this.initiativeService.setGeneralData(res));
        resolve(true);
      }, error => {
        reject();
      });
    });

    // //getDetail max capex pim
    // const GetInitiativeDetailMax = new Promise((resolve, reject) => {
    //   this.detailInformationService.GetDetailInformation(this.id).subscribe((response) => {
    //     this.getDetailmaxcapexpim = response;
    //     console.log("getDetailmaxcapexpim :",this.getDetailmaxcapexpim);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    //getDetail cim Strategy
    // const GetInitiativeDetailForm = new Promise((resolve, reject) => {
    //   this.detailService.GetInitiativeDetail(this.id).subscribe((response) => {
    //     this.getDetailcimStrategy = response;

    //     this.initiativeService.GetInitiative(this.id).subscribe(general => {

    //       if (response.typeOfInvestment === 'CVC') {
    //         this.entryModes.push({ entryModeId: 'E002', entryModeTitle: 'CVC' });
    //       }
    //       else if (response.typeOfInvestment === 'M&A') {
    //         this.entryModes.push({ entryModeId: 'E005', entryModeTitle: 'M&A' });
    //       }
    //       else if (response.typeOfInvestment === 'Divestment' || general.divestment) {

    //         this.entryModes.push({ entryModeId: 'E006', entryModeTitle: 'Divestment' });
    //       }
    //       else {
    //         this.entryModes.push({ entryModeId: 'E001', entryModeTitle: 'JV' });
    //         this.entryModes.push({ entryModeId: 'E003', entryModeTitle: 'Existing Unit' });
    //         this.entryModes.push({ entryModeId: 'E004', entryModeTitle: 'Organic' });
    //         this.entryModes.push({ entryModeId: 'E009', entryModeTitle: 'Other' });
    //       }
    //     });
    //     console.log("entryModes :",this.entryModes);
    //     console.log("getDetailcimStrategy :",this.getDetailcimStrategy);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    //getImpact
    // const GetImpactTracking = new Promise((resolve, reject) => {
    //   this.impactService.GetImpactTracking(this.id).subscribe((response) => {
    //     this.getImpact = response;
    //     console.log("getImpact :",this.getImpact);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });

    // });


    //getShareBenefit
    // const GetShareBenefitWorkstream = new Promise((resolve, reject) => {
    //   this.impactService.GetShareBenefitWorkstream(this.id).subscribe(response => {
    //     this.getShareBenefit = response;
    //     console.log("getShareBenefit :",this.getShareBenefit);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    //getCapex
    // const GetCapexInformationList = new Promise((resolve, reject) => {
    //   this.capexService.GetCapexInformationList(this.id.toString()).subscribe(response => {
    //     this.getCapex = response;
    //     if (response && response.length > 0) {
    //       this.capexService.GetCapexsInfo(response[response.length - 1].poolId, 'Requestpool').subscribe(usePoolRes => {
    //         //this.capexService.changeUsePoolDataData(usePoolRes);
    //       });
    //       // this.capexService.GetAnnualInvestmentPlan(this.id.toString(), response[response.length - 1].capexInformationId.toString()).subscribe(annualInvestmentPlanRes => {
    //       //   this.capexService.changeAnnualInvestmentPlan(annualInvestmentPlanRes);
    //       //   resolve(true);
    //       // });
    //     } else {
    //       resolve(true);
    //     }
    //   }, error => {
    //     reject();
    //   });
    // });

    //GetProgress
    // const GetProgress = new Promise((resolve, reject) => {
    //   this.progressService.GetProgress(this.id).subscribe((getProgressRes) => {
    //     this.getProgress = getProgressRes;
    //     console.log("GetProgress : ",this.getProgress)
    //     //this.progressService.changeProgressData(getProgressRes);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    //GetProgress
    // const GetProgressAndMileStone = new Promise((resolve, reject) => {
    //   this.progressService.GetProgressAndMilestone(this.id).subscribe(response => {
    //     this.getProgressAndMilestone = response;
    //     console.log("getProgressAndMilestone : ",this.getProgressAndMilestone)
    //     //this.progressService.changeProgressAndMileStone(response);
    //     resolve(true);
    //   }, error => {
    //     reject();
    //   });
    // });

    //GetProgress
    // const GetAllCostSpending = new Promise((resolve, reject) => {
    //   this.progressService.GetAllCostSpending(this.id).then((allCostesponse) => {
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
      console.log(values);
      // console.log(this.generalData)
      // console.log(this.gestStatusData)
      // console.log(this.getDetailmaxcapexpim)
      // console.log(this.getDetailcimStrategy)
      // console.log(this.getImpact)
      // console.log(this.getShareBenefit)
      //api get 
      // url = '/initiative/print/' + this.initiativeService.initiativeCode;
      url = '/initiative/print/' + this.initiativeService.id;
      window.open(url);
    });





    // this.swalTool.Printing();
    // this.initiativeService.GetPrintData().subscribe((r: any) => {
    //   if (r.type !== 'text/plain') {
    //     const blob = new Blob([r]);
    //     const saveAs = require('file-saver');
    //     const file = this.generalData?.initiativeCode + '.xlsx';
    //     saveAs(blob, file);
    //     this.swalTool.PrintSuccess();
    //   } else {
    //     this.swalTool.Error('No data found.');
    //   }
    // },
    //   error => {
    //     if (error.status == 500) {
    //       this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
    //     } else {
    //       this.swalTool.Error('Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.')
    //     }
    //   });
  }

  CheckPermissionSubmit(pageId: string): boolean {

    if (!this.userPermission || !this.initiativeService.generalData.value) {
      return false;
    }
    let stageSPOC = ["IL5"];
    let permissionSPOC: RolePermissionModel = this.userPermission.find(x =>
      x.pageId.toUpperCase() === "EDITALLTYPEMAX"
      && x.roleName.toLowerCase() === "spoc all workstream"
    );
    let generalData: Initiative = this.initiativeService.generalData.value;
    // let accessDetailByType: RolePermissionModel = this.userPermission.find(x =>
    //   x.pageId.toLowerCase() === PermissionService.MAINFORM_PAGE_ID
    //   && x.sectionId.toUpperCase() === "SUBMITFORM"
    //   && x.parameter01.toUpperCase() === "BACKWARD"
    //   && x.initiativeType.toLowerCase() === generalData.initiativeType.toLowerCase()
    //   && x.stage.toLowerCase() === generalData.stage.toLowerCase()
    // );
    if (!permissionSPOC && stageSPOC.indexOf(this.initiativeService.suggestionStatus?.stage) < 0) {
      return true;
    } else if (permissionSPOC) {
      return true;
    }
    return false;

  }

  editPageDarftAndSubmitForm(saveType: string) {
    if (this.isMax) {
      this.maxService.SaveDraftSubmit(this.formGroup, saveType, this.historyId);
    } else if (this.isCapex || (this.isDim && this.dimConfig)) {
      this.capexService.SaveDraftSubmit(this.formGroup, saveType, this.historyId);
    } else if (this.isCimAndStrategy) {
      this.cimService.SaveDraftAndSubmit(this.formGroup, saveType, this.historyId);
    }
    else if (this.isDim && !this.dimConfig) {
      this.dimService.saveDraftSubmitDim(this.formGroup, saveType, this.historyId);
    } else if (this.isPim) {
      this.pimService.SaveDraftSubmitPim(this.formGroup, saveType, this.historyId);
    } else if (this.isCpi) {
      this.cpiService.SaveDraftSubmitCpi(this.formGroup, saveType, this.historyId);


      // if (saveType == 'submit') {
      //   this.cpiService.SaveSubmit(this.formGroup);
      // } else {
      //   this.cpiService.SaveDraft(this.formGroup);
      // }
      // this.lessonLearnService.DATA.subscribe(data => {
      //   this.cpiService.UpdateLessonLearn(data);
      // });
    } else {
      this.swalTool.savingLoading('draft');
      this.initiativeService.SavingData = true;
      this.initiativeService.UpdateDraftInitiative(this.initiativeService.id, (this.formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe(response => {
        if (this.formGroup.get('initiativesForm').get('coDeveloper').value) {
          this.initiativeService.UpdateCoDeveloper(response.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => {
            this.initiativeService.SavingData = false;
            this.swalTool.Draft();
          });
        } else {
          this.initiativeService.SavingData = false;
          this.swalTool.Draft();
        }
      });
    }
  }



}
