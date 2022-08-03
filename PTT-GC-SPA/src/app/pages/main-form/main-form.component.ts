import { PermissionService } from '@services/permission/permission.service';
import { DateUtil } from './../../shared/utils/date.utils';
import { CpiService } from '@services/cpi/cpi.service';
import { Component, Input, Output, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailService } from '@services/detail/detail.service';
import { SwalTool } from '@tools/swal.tools';
import { CimFormValidateService } from '@services/cim-form-validate/cim-form-validate.service';
import { StatusService } from '@services/status/status.service';
import { MaxService } from '@services/max/max.service';
import { CimService } from '@services/cim/cim.service';
import { ValidateService } from '@services/validate/validate.service';
import { RiskService } from '@services/risk/risk.service';
import { CapexService } from '@services/capex/capex.service';
import { DimService } from '@services/dim/dim.service';
import { PimService } from '@services/pim/pim.service';
import { AuditService } from '@services/audit/audit.service';
import { ProgressService } from '@services/progress/progress.service';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { Initiative, StageDetail } from '@models/initiative';
import { BestPracticeService } from '@services/best-practice/best-practice.service';
import { StageService } from '@services/stage/stage.service';
import { LessonLearnTableDataService } from '@services/lesson-learn-table-data/lesson-learn-table-data.service';
import { SubmitService } from '@services/submit/submit.service';
import { InitiativeAttachmentComponent } from '@components/initiative-attachment/initiative-attachment.component';
import { SettingServiceService } from '@services/settingService/setting-service.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { ViewLogHistoryComponent } from '@components/view-log-history/view-log-history.component';
import { ContactIoComponent } from '@components/contact-io/contact-io.component';
import { ItBudgetService } from '@services/it-budget/it-budget.service';
import { ActionService } from '@services/action/action.service';
import { Interface } from 'readline';
import { InterfaceserviceService } from '@services/interfaceservice/interfaceservice.service';
import { RolePermissionModel } from '@models/RolePermissionModel';
import Swal from 'sweetalert2';
import { EventEmitter } from 'events';
declare var require: any;

@Component({
    selector: 'app-main-form',
    templateUrl: './main-form.component.html',
    styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit, OnDestroy {

    //@ViewChild('ViewLogHistoryModal', { static: false }) ViewLogHistoryModal: ModalDirective;

    //@ViewChild('HistoryStatus', { static: false }) HistoryStatus: ModalDirective;

    //@ViewChild('ContactIO', { static: false }) ContactIO: ModalDirective;

    //@ViewChild('AttachmentModal', { static: false }) AttachmentModal: ModalDirective;

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
    history: string;
    generalData: Initiative;
    isStagePimCapexInfo: boolean;
    isStagePimRiskResource: boolean;
    isStagePimBestPractice: boolean;
    stageIL5: boolean;
    stageAdopt: boolean;
    lookbackPim: boolean;
    submitToItems: {
        attribute01: string;
        attribute02: string;
    }[] = [];
    isITDigitalBudgetSurvey: boolean;
    showTabEMOC: boolean;

    costEst: number;

    FreezeButton: boolean;
    gotWBS: boolean = false;
    categoryType: string = null;
    historyId: any;

    tabCondition: {
        name: string;
        value: boolean;
    }[] = [];
    stageDetail: StageDetail[] = [];
    stageDetailList: StageDetail[] = [];


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

    activeLookbackTabs: { link: string, tabs: string } = {
        link: '',
        tabs: ''
    };

    CheckSubmitTo: boolean;
    Comment: boolean;
    SuggestStatusMain: boolean;

    // approve
    approveAdmin: boolean;

    // request capex button
    showRequestCapexButton: boolean;

    //config dim
    dimConfig: boolean;

    mailAccount: string;
    newFeature: boolean;

    rolesParams: {
        email: string,
        id?: number
    } = {
            email: null,
            id: 0
        }

    capexDone: boolean;
    ShowTabCapex: boolean;
    ShowTabPim: boolean;
    bsModalRef: BsModalRef;
    config: ModalOptions = {
        class: 'modal-xl'
    };
    initiativeCode: string;

    isTestLoading: boolean;
    aliasOwner: any;
    workStream: string;


    InitiativeStatus: string;
    userPermission: RolePermissionModel[];
    public permissionServiceStaticVar = PermissionService;

    sapStatus: string;
    mocStatus: string;


    constructor(
        private initiativeService: InitiativeService,
        private router: Router,
        private swalTool: SwalTool,
        private statusService: StatusService,
        private maxService: MaxService,
        private cimService: CimService,
        private validateService: ValidateService,
        private capexService: CapexService,
        private dimService: DimService,
        private pimService: PimService,
        private cpiService: CpiService,
        private lessonLearnService: LessonLearnTableDataService,
        private fb: FormBuilder,
        private auditService: AuditService,
        private progressService: ProgressService,
        private stageService: StageService,
        public permissionService: PermissionService,
        private submitService: SubmitService,
        private modalService: BsModalService,
        private settingService: SettingServiceService,
        private detailInformationService: DetailInformationService,
        private activeRoute: ActivatedRoute,
        private itBudgetService: ItBudgetService,
        private actionService: ActionService,
        private interfaceService: InterfaceserviceService
    ) {
        this.page = null;
        this.userPermission = JSON.parse(sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY));
        setTimeout(() => {
            this.isTestLoading = true;
        }, 10000);
    }

    ngOnInit() {
        this.activeRoute.data.subscribe(data => {
            if (data?.page) {
                this.page = data.page;
            }           
        });



        // if (sessionStorage.getItem('id') && sessionStorage.getItem('page')) {
        //   this.page = sessionStorage.getItem('page');
        //   this.initiativeService.page = sessionStorage.getItem('page');
        //   this.initiativeService.id = parseInt(sessionStorage.getItem('id'));
        // } else {
        // }
        this.settingService.GetInitiativeSetting().then((settingResponse) => {
            if (settingResponse) {
                this.settingService.setSettingData(settingResponse);
            }
        });
        this.initiativeService.getNewFeature().subscribe((newFeatureRes) => {
            this.initiativeService.newFeature = newFeatureRes;
            this.newFeature = newFeatureRes;
        });
        if (this.page == "create" || this.page == "create-survey") {
            this.initiativeService.page = this.page;
            this.initiativeService.id = null;
            this.initiativeService.initiativeCode = null;
            this.initiativeService.legacyInitiativeCode = null;
            this.initiativeService.suggestion = false;
            this.initiativeService.viewMode = false;
            this.initiativeService.showCostEstOpex = false;
            this.initiativeService.historyFlag = null;
            this.initiativeService.SubmitDone = false;
            this.initiativeService.SavingData = false;
        } else {
            this.page = this.initiativeService.page;
        }
        if ((!this.initiativeService.id && this.page === 'edit') || this.page == null) {
            this.router.navigate(['/initiative/my-own']);
            return;
        }
        this.rolesParams.email = this.initiativeService.username;
        this.rolesParams.id = this.initiativeService.id;
        this.permissionService.GetRolesDetailList(this.rolesParams);

        if (this.initiativeService.id && this.page === 'edit') {
            if (this.initiativeService.id) {
                this.initiativeService.GetInitiativeStages(this.initiativeService.id).then((responseStages) => {
                    if (responseStages) {
                        this.initiativeService.stageDetailList = responseStages;
                        this.stageDetail = responseStages;
                    }
                });
                this.actionService.GetInitiativeActionSubmit(this.initiativeService.id).subscribe((aliasOwner: any[]) => {
                    if (aliasOwner && Object.keys(aliasOwner).length > 0) {
                        this.aliasOwner = aliasOwner.filter(x => x.actionBy?.toLowerCase() != this.initiativeService.username?.toLowerCase());
                        if (this.aliasOwner?.length > 0) {
                            if (!this.submitToForm.get('aliasOwner')) {
                                this.submitToForm.addControl('aliasOwner', new FormControl(null));
                            }
                            this.submitToForm.patchValue({ aliasOwner: this.aliasOwner[0].actionBy });
                        }
                    }
                });
            }
        }

        this.mailAccount = this.initiativeService.username;

        this.formGroup = new FormGroup({});
        this.initiativeService.setFormGroup(this.formGroup);
        this.init();
        this.initSubmitForm();       
    }

    init() {
        if (this.page !== 'create' && this.page != "create-survey") {
            this.initiativeService.GetSuggestStatus(this.initiativeService.id).subscribe(response => {
                this.initiativeService.suggestionStatus = response;
                this.InitiativeStatus = response.status;
                this.history = response.stage;
                this.isITDigitalBudgetSurvey = response.initiativeType == 'Digital' || response.initiativeType == 'IT' ? true : false;

                if (response) {
                    this.initiativeService.GetInitiative(this.initiativeService.id).subscribe((res) => {
                        this.initiativeService.historyFlag = res.historyFlag;
                        this.initiativeService.surveyVersions = res.surveyVersions;
                        this.initiativeCode = res.initiativeCode;
                        this.initiativeService.initiativeCode = res.initiativeCode;

                        //this.initiativeService.isRevise = res.flowType == 'revise' ? true : false;
                        this.initiativeService.initiativeCode = res.initiativeCode;

                        this.progressService.setGeneralData(res);
                        this.initiativeService.setGeneralData(res);

                        this.detailInformationService.GetDetailInformation(this.initiativeService.id).subscribe((detailRes) => {
                            if (detailRes) {
                                this.workStream = detailRes.subWorkstream1;
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


                        //check capex
                        //
                        this.configTabs(res);
                        this.ShowTabCapex = (res.directCapex && !res.requestProjectEngineer) || (res.capexTabStatus && res.capexTabStatus > 0) ? true : false;
                        this.initiativeService.ShowTabCapex = (res.directCapex && !res.requestProjectEngineer) || (res.capexTabStatus && res.capexTabStatus > 0) ? true : false;

                        this.generalData = res;
                        this.typeBenefit = res.typeBenefit;
                        this.isRequestProjectEngineer = Boolean(res.requestProjectEngineer);
                        this.stageIL5 = response.stage === 'IL5' ? true : false;
                        this.stageAdopt = response.stage?.startsWith('Adopt');
                        if (response.stage) {
                            this.lookbackPim = response.stage.toUpperCase().startsWith('GATE3') || response.stage.toUpperCase().startsWith('GATE4');
                        } else {
                            this.lookbackPim = null;
                        }

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
                                        this.submitToItems.push({ attribute01: 'forward', attribute02: 'Submitted Forward' });
                                        this.submitToForm.patchValue({ status: 'forward' });
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

                                } else {
                                    this.submitToItems = [{ attribute01: 'forward', attribute02: 'Submitted Forward' }, { attribute01: 'cancelled', attribute02: 'Submitted Cancelled' }];
                                    this.submitToForm.patchValue({ status: 'forward' });
                                    if (response.strategy && response.stage === 'Initiative-1') {
                                        this.submitToItems.push({ attribute01: 'updateprogress', attribute02: 'Update Progress' });
                                    }
                                }
                            });

                        }




                        //this.initiativeService.suggestion = true;
                        // force suggest strategy to cpi for test
                        this.isCpi = response.cpi ? true : false;
                        this.isCimAndStrategy = response.cim || response.strategy ? true : false;
                        this.isCim = response.cim ? true : false;
                        // this.isCimAndStrategy = response.cim ? true : false;

                        // please change before deploy to production

                        this.isRequestCapex = response.isRequestCapex ? true : false;

                        this.isCapex = response.directCapex ? true : false;
                        this.isDim = response.dim ? true : false;
                        this.isMax = response.max ? true : false;

                        this.requestCapex = response.requestCapex ? true : false;
                        this.isPim = response.pim ? true : false;

                        if (this.isRequestProjectEngineer) {
                            this.showTabEMOC = false;

                            if (res.stage != null && res.stage != '') {
                                this.showTabEMOC = true;
                            }
                        }
                        else {
                            this.showTabEMOC = true;
                        }

                        if (((response.cim || response.directCapex || response.strategy || response.max || response.dim || response.pim || response.cpi || response.randD || response.other)
                            && response.stage == null && response.status === 'draft' && this.page === 'edit')
                            || this.initiativeService.gotoTab == 'detail') {
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
                        } else if (this.initiativeService.gotoTab == 'lookback') {
                            this.activeGeneralTabs.link = '';
                            this.activeGeneralTabs.tabs = '';
                            this.activeDetailTabs.link = '';
                            this.activeDetailTabs.tabs = '';
                            this.activeProgressTabs.link = '';
                            this.activeProgressTabs.tabs = '';
                            this.activeLookbackTabs.link = 'active';
                            this.activeLookbackTabs.tabs = 'show active';
                        } else {
                            this.activeGeneralTabs.link = 'active';
                            this.activeGeneralTabs.tabs = 'show active';
                            this.activeDetailTabs.link = '';
                            this.activeDetailTabs.tabs = '';
                            this.activeProgressTabs.link = '';
                            this.activeProgressTabs.tabs = '';
                        }

                        // tslint:disable-next-line: max-line-length
                        if (response.cim || response.directCapex || response.strategy || response.max || response.dim || response.pim || response.cpi || response.randD || response.other) {
                            this.SuggestStatusMain = false;
                            this.initiativeService.suggestion = false;
                        } else {
                            this.SuggestStatusMain = true;
                            this.initiativeService.suggestion = false;
                        }

                        this.progressService.GetProgress(this.initiativeService.id).subscribe((getProgressRes) => {
                            // tslint:disable-next-line: max-line-length            
                            if (getProgressRes.wbsNo) {
                                this.initiativeService.wbsNo = getProgressRes.wbsNo;
                                this.gotWBS = true;
                                //Check SAPMOCStatus
                                this.interfaceService.SAPMOCStatus(this.initiativeService.id).subscribe((SAPMOCStatus) => {
                                    this.formGroup.addControl('sapStatus', new FormControl(SAPMOCStatus.sapStatus));
                                    this.formGroup.addControl('mocStatus', new FormControl(SAPMOCStatus.mocStatus));
                                });
                            } else {
                                this.initiativeService.wbsNo = null;
                                this.gotWBS = false;
                            }
                        });
                    });

                    // show request capex button
                    if (response.stage) {
                        // tslint:disable-next-line: max-line-length
                        if (response.max && response.requestCapex && response.isRequestCapex !== true && response.stage === 'IL3-2') {
                            this.showRequestCapexButton = true;
                        } else if
                            ((response.cim &&
                                response.requestCapex &&
                                response.isRequestCapex !== true) &&
                            (response.stage?.startsWith('DD') ||
                                response.stage?.startsWith('Detail F/S') ||
                                response.stage?.startsWith('Pre-DD') ||
                                response.stage?.startsWith('Seeking Potential') ||
                                // response.stage?.startsWith('Initiative') ||
                                response.stage?.startsWith('BEP'))
                        ) {
                            this.showRequestCapexButton = true;
                        } else {
                            this.showRequestCapexButton = false;
                        }
                    } else {
                        this.showRequestCapexButton = false;
                    }

                    //stage not draft
                    if (response.stage && response?.stage.toLowerCase() != "draft") {
                        this.approveAdmin = true;
                    } else {
                        this.approveAdmin = false;
                    }

                    // Check Capex Dim Stage
                    let dimStage = ['IL0', 'Admin Check', 'draft', null];
                    if (response.dim && dimStage.indexOf(response.stage) === -1) {
                        this.dimStageCheck = true;
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
                    let check = {};
                    this.CheckSubmitTo = response.stage ? true : false;

                    if (response.strategy && response.stage === 'Initiative-1' && !this.initiativeService.isCancel) {
                        this.submitToForm.patchValue({ status: 'updateprogress' });
                    } else if (this.initiativeService.isCancel) {
                        this.Comment = true;
                        this.submitToForm.patchValue({ status: 'cancelled' });
                    } else {
                        this.submitToForm.patchValue({ status: 'forward' });
                    }
                } else {
                    this.router.navigate(['/initiative/my-own']);
                }
            });
        } else {
            this.itBudgetService.getLastSurveyVersions().subscribe((response) => {
                this.initiativeService.surveyVersions = Number(response);
            });
        }
    }


    getFormError(field) {
        return (this.formGroup.get('submitToForm').get(field).touched || this.formGroup.get('submitToForm').get(field).dirty) && this.formGroup.get('submitToForm').get(field).invalid;
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

    ngOnDestroy() {
        this.initiativeService.isAddmore = false;
        this.initiativeService.isReturn = false;
        this.initiativeService.isRevise = false;
        this.validateService.inValidtab = [];
        this.initiativeService.isCancel = false;
        this.progressService.haveProgress = false;
        this.initiativeService.isUtilityOtherRequire = false;
        this.initiativeService.SubmitDone = false;
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

    showTabByCondition(tabName: string) {
        if (this.tabCondition.length > 0 && this.tabCondition.find((tab) => tab.name == tabName)) {
            return this.tabCondition.find((tab) => tab.name == tabName).value;
        } else {
            return false;
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
        if (this.formGroup.get('submitToForm').get('status')) {
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

    async Draft() {
        if (this.initiativeService.SubmitDone || this.initiativeService.SavingData) {
            return;
        }
        // if (this.formGroup.get('initiativesForm').get('benefitAmount')) {
        //   this.formGroup.get('initiativesForm').get('benefitAmount').patchValue(this.initiativeService.benefitAmount);
        // }
        this.swalTool.savingLoading('draft');


        if (this.initiativeService.isRevise) {
            await this.SetFlowRevise();
        }

        switch (this.page) {
            case 'create':
                // call validate service
                this.swalTool.savingLoading('draft');
                this.initiativeService.SavingData = true;
                if (this.validateService.checkInitiativeName(this.formGroup.get('initiativesForm') as FormGroup)) {
                    if (!this.initiativeService.id) {
                        // Create Draft
                        this.initiativeService.CreateDraftInitiative((this.formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe(async response => {
                            this.initiativeService.initiativeCode = response.initiativeCode;
                            this.initiativeService.id = response.id;
                            this.formGroup.get('initiativesForm').get('id').setValue(response.id);
                            if (this.formGroup.get('initiativesForm').get('coDeveloper').value) {
                                this.initiativeService.UpdateCoDeveloper(response.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => {
                                    this.initiativeService.setGeneralData((this.formGroup.get('initiativesForm') as FormGroup).getRawValue());
                                    this.initiativeService.SavingData = false;
                                    this.swalTool.Draft();
                                });
                            } else {
                                //await this.auditService.CallAuditLog(this.initiativeService.id);
                                this.initiativeService.SavingData = false;
                                this.swalTool.Draft();
                            }
                        });
                    } else {
                        // updateDraft
                        this.swalTool.savingLoading('draft');
                        this.initiativeService.SavingData = true;



                        this.initiativeService.UpdateDraftInitiative(this.initiativeService.id, (this.formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe(async response => {
                            this.initiativeService.initiativeCode = response.initiativeCode;
                            this.lessonLearnService.DATA.toPromise().then(t => this.cpiService.UpdateLessonLearn(t));
                            if (this.formGroup.get('initiativesForm').get('coDeveloper').value) {
                                this.initiativeService.UpdateCoDeveloper(response.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => {
                                    this.initiativeService.setGeneralData((this.formGroup.get('initiativesForm') as FormGroup).getRawValue());
                                    this.initiativeService.SavingData = false;
                                    this.swalTool.Draft();
                                });
                            } else {
                                this.initiativeService.SavingData = false;
                                this.swalTool.Draft();
                            }
                        });
                    }
                } else {
                    this.formGroup.get('initiativesForm').get('name').markAsTouched();
                    this.initiativeService.SavingData = false;
                    this.swalTool.Required();
                }
                break;
            case 'create-survey':
                if (this.validateService.checkInitiativeName(this.formGroup.get('initiativesForm') as FormGroup)) {
                    let dimForm = (this.formGroup.get('DimForm') as FormGroup).getRawValue();
                    switch (dimForm.capexNo) {
                        case 'capex002':
                        case 'capex003':
                            this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'Digital' });
                            break;
                        default:
                            this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'IT' });
                            break;
                    }
                    if (Number(this.formGroup.get('initiativesForm').get('id').value) > 0) {
                        this.UpdateDraftInitiative();
                    } else {
                        this.CreateDraftInitiative();
                    }
                } else {
                    this.formGroup.get('initiativesForm').get('name').markAsTouched();
                    this.initiativeService.SavingData = false;
                    this.swalTool.Required();
                }
                break;
            default:
                let generalData: Initiative = this.initiativeService.generalData.value;
                if (generalData.initiativeType == "Digital" || generalData.initiativeType == "IT") {
                    let dimForm = (this.formGroup.get('DimForm') as FormGroup).getRawValue();
                    switch (dimForm.capexNo) {
                        case 'capex002':
                        case 'capex003':
                            this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'Digital' });
                            break;
                        default:
                            this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'IT' });
                            break;
                    }
                    this.UpdateDraftInitiative();
                    this.initiativeService.SavingData = false;
                    this.swalTool.Draft();
                } else {
                    await this.auditService.CallFullLog(this.initiativeService.id).then(fullLogRespond => {
                        this.auditService.historyId = fullLogRespond;
                        this.historyId = fullLogRespond;
                    });
                    this.editPageDarftAndSubmitForm('draft');
                }
                break;
        }
    }

    CreateCoDeveloper(id: number) {
        this.initiativeService.CreateCoDeveloper(id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(async () => {
            await this.auditService.CallAuditLog(this.initiativeService.id, this.historyId);
            this.initiativeService.SavingData = false;
            this.swalTool.Draft();
        });
    }

    async LogSubmit() {
        console.log(this.formGroup.getRawValue());
    }

    // createPimGate(gateForm :any,id,gate): Promise<boolean> {
    //  return new Promise((resolve, reject) => {
    //    this.detailService.CreateDetailPimGate(gateForm,id,gate).subscribe(response2 => {
    //      alert(response2);
    //      resolve();
    //    });
    //  });
    // }



    SubmitValidation() {
        let returnValue = true;
        this.swalTool.savingLoading('Check Validation');
        if (!this.validateService.SubmitValidation(this.formGroup as FormGroup)) {
            returnValue = false;
        }
        return returnValue;
    }


    async ClickNextOrSubmit(typeSubmit: string) {
        if (this.page !== 'create' && typeSubmit == 'submit' && (this.formGroup.get('initiativesForm').get('initiativeType').value != "IT" && this.formGroup.get('initiativesForm').get('initiativeType').value != "Digital")) {
            await this.auditService.CallFullLog(this.initiativeService.id).then(fullLogRespond => {
                this.auditService.historyId = fullLogRespond;
                this.historyId = fullLogRespond;
            });
        }
        // check initiativeType && suggestion
        if (this.formGroup.get('initiativesForm').get('initiativeType').value != "IT" && this.formGroup.get('initiativesForm').get('initiativeType').value != "Digital") {
            if (!this.checkInitiativeType) {
                this.swalTool.InitiativeTypeError();
                return;
            }

        }

        if (this.initiativeService.isRevise) {
            await this.SetFlowRevise();
        }

        // this.swalTool.Success();
        // return;

        if (this.initiativeService.isCancel) {
            // why ?
            // this.initiativeService.DeleteInitiative(this.initiativeService.id).subscribe(() => {
            //   this.swalTool.DeleteInitiativeNew();
            // });
            this.swalTool.savingLoading('Cancel');
            //saveData
            let generalData: Initiative = this.initiativeService.generalData.value;
            if (generalData.initiativeType == "Digital" || generalData.initiativeType == "IT") {
                let dimForm = (this.formGroup.get('DimForm') as FormGroup).getRawValue();
                switch (dimForm.capexNo) {
                    case 'capex002':
                    case 'capex003':
                        this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'Digital' });
                        break;
                    default:
                        this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'IT' });
                        break;
                }
                this.formGroup.get("submitToForm").patchValue({
                    status: 'cancelled',
                    comment: ''
                })
                if (Number(this.formGroup.get('initiativesForm').get('id').value) > 0) {
                    this.UpdateSubmitInitiative();
                } else {
                    this.CreateSubmitInitiative();
                }
            } else {

                if (this.mailAccount?.toLowerCase() === 'thammatad.a@frontiscompany.com' && this.submitToForm.get('aliasOwner')?.value) {
                    let aliasOwner = this.submitToForm.get('aliasOwner').value;
                    this.submitToForm.get('username').patchValue(aliasOwner);
                }
                this.initiativeService.SavingData = true;
                this.editPageDarftAndSubmitForm('cancel');
            }

        } else {



            switch (this.page) {
                case 'create':
                    if (this.initiativeService.id) {
                        this.swalTool.savingLoading('submit');
                        this.initiativeService.SavingData = true;
                        this.initiativeService.UpdateSubmitInitiative(this.initiativeService.id, (this.formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe(async res => {
                            this.initiativeService.id = res.id;
                            this.initiativeService.initiativeCode = res.initiativeCode;
                            this.initiativeService.legacyInitiativeCode = res.lagacyInitiativeCode;
                            this.initiativeService.page = 'edit';
                            if (this.formGroup.get('initiativesForm').get('coDeveloper') && this.formGroup.get('initiativesForm').get('coDeveloper').value) {
                                this.initiativeService.UpdateCoDeveloper(res.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => {
                                    this.swalTool.SubmitNewEngine();
                                    this.initiativeService.SubmitDone = true;
                                    this.initiativeService.SavingData = false;
                                    this.router.navigate(['/initiative/edit'])
                                });
                            } else {
                                this.initiativeService.SubmitDone = true;
                                this.initiativeService.SavingData = false;
                                this.swalTool.SubmitNewEngine();
                                this.router.navigate(['/initiative/edit'])
                            }
                        });
                    } else {

                        this.swalTool.savingLoading('submit');
                        this.initiativeService.SavingData = true;
                        this.initiativeService.CreateSubmitInitiative((this.formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe(async res => {
                            this.initiativeService.id = res.id;
                            this.initiativeService.initiativeCode = res.initiativeCode;
                            this.initiativeService.legacyInitiativeCode = res.lagacyInitiativeCode;
                            this.initiativeService.page = 'edit';
                            if (this.formGroup.get('initiativesForm').get('coDeveloper') && this.formGroup.get('initiativesForm').get('coDeveloper').value) {
                                this.initiativeService.UpdateCoDeveloper(res.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => {
                                    this.swalTool.SubmitNewEngine();
                                    this.initiativeService.SubmitDone = true;
                                    this.initiativeService.SavingData = false;
                                    this.router.navigate(['/initiative/edit'])
                                });
                            } else {
                                this.initiativeService.SubmitDone = true;
                                this.initiativeService.SavingData = false;
                                this.swalTool.SubmitNewEngine();
                                this.router.navigate(['/initiative/edit'])
                            }
                        });
                    }
                    break;
                case 'create-survey':
                    let dimForm = (this.formGroup.get('DimForm') as FormGroup).getRawValue();
                    switch (dimForm.capexNo) {
                        case 'capex002':
                        case 'capex003':
                            this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'Digital' });
                            break;
                        default:
                            this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'IT' });
                            break;
                    }
                    this.formGroup.get("submitToForm").patchValue({
                        status: 'forward',
                        comment: ''
                    })
                    if (Number(this.formGroup.get('initiativesForm').get('id').value) > 0) {
                        this.UpdateSubmitInitiative();
                    } else {
                        this.CreateSubmitInitiative();
                    }
                    break;
                case 'edit':
                    // define type
                    //it budget 
                    let generalData: Initiative = this.initiativeService.generalData.value;
                    if (generalData.initiativeType == "Digital" || generalData.initiativeType == "IT") {
                        let dimForm = (this.formGroup.get('DimForm') as FormGroup).getRawValue();
                        switch (dimForm.capexNo) {
                            case 'capex002':
                            case 'capex003':
                                this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'Digital' });
                                break;
                            default:
                                this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'IT' });
                                break;
                        }
                        this.formGroup.get("submitToForm").patchValue({
                            status: 'forward',
                            comment: ''
                        })
                        if (Number(this.formGroup.get('initiativesForm').get('id').value) > 0) {
                            this.UpdateSubmitInitiative();
                        } else {
                            this.CreateSubmitInitiative();
                        }
                    } else {
                        if (typeSubmit == 'next') {
                            this.swalTool.savingLoading('submit');
                            this.initiativeService.SavingData = true;
                            this.initiativeService.UpdateSubmitInitiative(this.initiativeService.id, (this.formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe(async res => {
                                this.initiativeService.id = res.id;
                                this.initiativeService.initiativeCode = res.initiativeCode;
                                this.initiativeService.legacyInitiativeCode = res.lagacyInitiativeCode;
                                this.initiativeService.page = 'edit';
                                if (this.formGroup.get('initiativesForm').get('coDeveloper') && this.formGroup.get('initiativesForm').get('coDeveloper').value) {
                                    this.initiativeService.UpdateCoDeveloper(res.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => {
                                        this.swalTool.SubmitNewEngine();
                                        this.initiativeService.SubmitDone = true;
                                        this.initiativeService.SavingData = false;
                                        //var url = '/initiative/initiativeredirector?gotoId=' + result.initiativeId + '&gotoPage=edit';
                                        this.router.navigate(['/initiative/initiativeredirector'], { queryParams: { gotoPage: "edit", gotoId: res.id } })
                                    });
                                } else {
                                    this.initiativeService.SubmitDone = true;
                                    this.initiativeService.SavingData = false;
                                    this.swalTool.SubmitNewEngine();
                                    this.router.navigate(['/initiative/initiativeredirector'], { queryParams: { gotoPage: "edit", gotoId: res.id } })
                                }
                            });
                        } else {
                            if (this.mailAccount?.toLowerCase() === 'thammatad.a@frontiscompany.com' && this.submitToForm.get('aliasOwner')?.value) {
                                let aliasOwner = this.submitToForm.get('aliasOwner').value;
                                this.submitToForm.get('username').patchValue(aliasOwner);
                            }
                            this.initiativeService.SavingData = true;
                            this.editPageDarftAndSubmitForm('submit');
                        }
                    }
                    break;
            }
        }
    }
    // submit
    async Submit(typeSubmit: string) {
        // if (this.formGroup.get('initiativesForm').get('benefitAmount')) {
        //   this.formGroup.get('initiativesForm').get('benefitAmount').patchValue(this.initiativeService.benefitAmount);
        // }
        if (this.initiativeService.SubmitDone || this.initiativeService.SavingData) {
            return;
        }
        let isSubmit = typeSubmit == 'submit'
        if (this.formGroup.get('submitToForm').get('status').value == 'backward') {
            this.swalTool.savingLoading('submit');

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



            //saveData
            let generalData: Initiative = this.initiativeService.generalData.value;
            if (generalData.initiativeType == "Digital" || generalData.initiativeType == "IT") {
                let dimForm = (this.formGroup.get('DimForm') as FormGroup).getRawValue();
                switch (dimForm.capexNo) {
                    case 'capex002':
                    case 'capex003':
                        this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'Digital' });
                        break;
                    default:
                        this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'IT' });
                        break;
                }
                this.formGroup.get("submitToForm").patchValue({
                    status: 'backward',
                    comment: ''
                })
                if (Number(this.formGroup.get('initiativesForm').get('id').value) > 0) {
                    this.UpdateSubmitInitiative();
                } else {
                    this.CreateSubmitInitiative();
                }
            } else {

                if (this.mailAccount?.toLowerCase() === 'thammatad.a@frontiscompany.com' && this.submitToForm.get('aliasOwner')?.value) {
                    let aliasOwner = this.submitToForm.get('aliasOwner').value;
                    this.submitToForm.get('username').patchValue(aliasOwner);
                }
                this.initiativeService.SavingData = true;
                this.editPageDarftAndSubmitForm('backward');
            }

        } else if (this.formGroup.get('submitToForm').get('status').value == 'cancelled') {
        this.swalTool.savingLoading('submit');

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


            //saveData
            let generalData: Initiative = this.initiativeService.generalData.value;
            if (generalData.initiativeType == "Digital" || generalData.initiativeType == "IT") {
                let dimForm = (this.formGroup.get('DimForm') as FormGroup).getRawValue();
                switch (dimForm.capexNo) {
                    case 'capex002':
                    case 'capex003':
                        this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'Digital' });
                        break;
                    default:
                        this.formGroup.get('initiativesForm').patchValue({ initiativeType: 'IT' });
                        break;
                }
                this.formGroup.get("submitToForm").patchValue({
                    status: 'cancelled',
                    comment: ''
                })
                if (Number(this.formGroup.get('initiativesForm').get('id').value) > 0) {
                    this.UpdateSubmitInitiative();
                } else {
                    this.CreateSubmitInitiative();
                }
            } else {

                if (this.mailAccount?.toLowerCase() === 'thammatad.a@frontiscompany.com' && this.submitToForm.get('aliasOwner')?.value) {
                    let aliasOwner = this.submitToForm.get('aliasOwner').value;
                    this.submitToForm.get('username').patchValue(aliasOwner);
                }
                this.initiativeService.SavingData = true;
                this.editPageDarftAndSubmitForm('cancel');
            }

        } else if (this.validateService.SubmitValidation(this.formGroup as FormGroup)) {
            if (isSubmit) {
                Swal.fire({
                    icon: "warning",
                    title: 'Submit to Next Stage?',
                    text: "By confirming you will not be able to return to current stage.",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm'
                }).then(async (res) => {
                    if (res.isConfirmed) {
                        this.ClickNextOrSubmit(typeSubmit);
                    }
                })
            }
            else{
                this.ClickNextOrSubmit(typeSubmit);
            }

        } else {
            //
            this.swalTool.Required();
        }


        // this.swalTool.savingLoading('submit');
        // this.formGroup.markAllAsTouched();
        // if (this.formGroup.valid && this.formGroup.get('initiativesForm') && this.initiativeService.suggestion) {

    }

    get checkInitiativeType(): boolean {
        let initiativeTypeList: string[] = [];
        this.formGroup.get('initiativesForm').get('cim').value ? initiativeTypeList.push('cim') : false;
        this.formGroup.get('initiativesForm').get('pim').value ? initiativeTypeList.push('pim') : false;
        this.formGroup.get('initiativesForm').get('dim').value ? initiativeTypeList.push('dim') : false;
        this.formGroup.get('initiativesForm').get('max').value ? initiativeTypeList.push('max') : false;
        this.formGroup.get('initiativesForm').get('cpi').value ? initiativeTypeList.push('cpi') : false;
        this.formGroup.get('initiativesForm').get('directCapex').value ? initiativeTypeList.push('directCapex') : false;
        this.formGroup.get('initiativesForm').get('strategy').value ? initiativeTypeList.push('strategy') : false;
        this.formGroup.get('initiativesForm').get('randD').value ? initiativeTypeList.push('randD') : false;
        this.formGroup.get('initiativesForm').get('other').value ? initiativeTypeList.push('other') : false;

        if (initiativeTypeList.length == 1) {
            this.formGroup.get('initiativesForm').patchValue({ initiativeType: initiativeTypeList.toString() });
            return true;
        } else {
            return false;
        }
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

    submitRequestCapex() {
        if (this.initiativeService.SubmitDone) {
            return;
        }
        this.initiativeService.SetRequestCapex(this.initiativeService.id, '').subscribe(() => {
            // this.initiativeService.id = this.id;
            // this.initiativeService.page = 'edit';
            this.swalTool.SubmitRequestCapexNewStructure(this.initiativeService.id);
        }, error => {
            this.swalTool.Error(error);
        });
    }

    validateTabs(tabName: string) {
        if (this.validateService.inValidtab.findIndex((v) => v.tabName == tabName) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    Print() {
        if (this.initiativeService.SubmitDone) {
            return;
        }
        this.swalTool.Printing();
        this.initiativeService.GetPrintData().subscribe((r: any) => {
            if (r.type !== 'text/plain') {
                const blob = new Blob([r]);
                const saveAs = require('file-saver');
                const file = this.generalData?.initiativeCode + '.xlsx';
                saveAs(blob, file);
                this.swalTool.PrintSuccess();
            } else {
                this.swalTool.Error('No data found.');
            }
        },
            error => {
                if (error.status == 500) {
                    this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
                } else {
                    this.swalTool.Error('Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.')
                }
            });
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
            overrideConfig.initialState = { initiativeId: this.initiativeService.id,initiativeMode:this.page };
            this.modalService.show(InitiativeAttachmentComponent, overrideConfig);
        } else {
            this.swalTool.InitiativeNotFound();
        }
    }

    // CloseAttachment() {
    //   this.AttachmentModal.hide();
    // }

    get isLoading() {
        return this.initiativeService.isDelay;
    }

    get checkMaxStage() {
        let hideOnStage = ["IL5"];
        // let permissionSPOC: RolePermissionModel = this.userPermission.find(x =>
        //   x.pageId.toUpperCase() === "EDITALLTYPEMAX"
        //   && x.roleName.toLowerCase() === "spoc all workstream"
        // );
        // if (this.isMax && ((!permissionSPOC && stageSPOC.indexOf(this.initiativeService.suggestionStatus?.stage) >= 0)
        //   || this.initiativeService.suggestionStatus?.status?.toLowerCase() == "wait for cancellation")) {
        //   return false;
        // } else {
        //   return true;
        // }
        if ((this.isMax && (hideOnStage.indexOf(this.initiativeService.suggestionStatus?.stage) >= 0))
            || this.initiativeService.suggestionStatus?.status?.toLowerCase() == "wait for cancellation") {
            return false;
        } else {
            return true;
        }
    }

    async SetFlowRevise() {
        await this.initiativeService.SetFlowRevise(this.initiativeService.id);
    }

    async UpdateInitiative() {
        // updateDraft
        this.initiativeService.SavingData = true;
        await this.initiativeService.UpdateDraftInitiative(this.initiativeService.id, this.formGroup.get('initiativesForm').value).subscribe(async response => {
            this.initiativeService.initiativeCode = response.initiativeCode;

            await this.initiativeService.RealtimeInterface(this.initiativeService.id).then(rep => { }).catch(error => {
                this.swalTool.SAPError(error.error);
            });

            await this.lessonLearnService.DATA.toPromise().then(t => this.cpiService.UpdateLessonLearn(t));
            if (this.formGroup.get('initiativesForm').get('coDeveloper').value) {
                this.CreateCoDeveloper(response.id);
            } else {
                this.initiativeService.SavingData = false;
                this.swalTool.Update();
            }
        });
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

    isSuggestion(event) {
        if (event) {
            this.SuggestStatusMain = true;
            this.initiativeService.suggestion = true;
            this.formGroup = new FormGroup({});
            //this.init();
            this.initSubmitForm();
        }
        return;

        if (this.generalData) {

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

    get neatStageTobe() {
        return this.stageService.nextSatageTobe;
    }

    get selectForword() {
        if (this.formGroup?.get('submitToForm')?.get('status').value == 'forward') {
            return true;
        }
        return false;
    }

    CreateDraftInitiative() {
        this.initiativeService.CreateDraftInitiative((this.formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe(response => {
            this.id = response.id;
            this.initiativeService.id = response.id;
            this.initiativeService.initiativeCode = response.initiativeCode;
            this.formGroup.get('initiativesForm').get('id').setValue(response.id);
            if (this.formGroup.get('initiativesForm').get('coDeveloper').value) {
                this.initiativeService.CreateCoDeveloper(response.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => { });
            }
            this.itBudgetService.CreateCapexBudgetSurveyNew(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe(() => { });
            if (Number(this.formGroup.get('DimForm').get('id').value) > 0) {
                // this.formGroup.get('DimForm').patchValue({ initiativeId: response.id });
                this.itBudgetService.UpdateITBudget(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe((responseUpdate) => {
                    this.itBudgetService.CreateSoftware(responseUpdate.id, (this.formGroup.get('DimForm').get('software') as FormArray).getRawValue()).subscribe(() => {
                        this.initiativeService.SavingData = false;
                        this.swalTool.Draft();
                    });
                });
            } else {
                this.formGroup.get('DimForm').patchValue({ id: 0 });
                this.itBudgetService.CreateITBudget(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe((responseCreate) => {
                    this.formGroup.get('DimForm').patchValue({ id: responseCreate.id });
                    this.itBudgetService.CreateSoftware(responseCreate.id, (this.formGroup.get('DimForm').get('software') as FormArray).getRawValue()).subscribe(() => {
                        this.initiativeService.SavingData = false;
                        this.swalTool.Draft();
                    });
                });
            }
        });
    }

    UpdateDraftInitiative() {
        this.formGroup.get('initiativesForm').patchValue({ updatedBy: this.initiativeService.username });
        this.initiativeService.UpdateDraftInitiative(this.initiativeService.id, (this.formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe(response => {
            this.id = response.id;
            this.initiativeService.id = response.id;
            this.initiativeService.initiativeCode = response.initiativeCode;
            this.formGroup.get('initiativesForm').get('id').setValue(response.id);
            if (this.formGroup.get('initiativesForm').get('coDeveloper').value) {
                this.initiativeService.UpdateCoDeveloper(response.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => { });
            }
            this.itBudgetService.CreateCapexBudgetSurveyNew(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe(() => { });
            if (Number(this.formGroup.get('DimForm').get('id').value) > 0) {
                this.itBudgetService.UpdateITBudget(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe((responseUpdate) => {
                    // console.log(responseUpdate)

                    this.itBudgetService.CreateSoftware(responseUpdate.id, (this.formGroup.get('DimForm').get('software') as FormArray).getRawValue()).subscribe(() => {
                        this.initiativeService.SavingData = false;
                        this.swalTool.Draft();
                    });
                });
            } else {
                this.formGroup.get('DimForm').patchValue({ id: 0 });
                this.itBudgetService.CreateITBudget(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe((responseCreate) => {
                    this.formGroup.get('DimForm').patchValue({ id: responseCreate.id });
                    // console.log(responseCreate)
                    this.itBudgetService.CreateSoftware(responseCreate.id, (this.formGroup.get('DimForm').get('software') as FormArray).getRawValue()).subscribe(() => {
                        this.initiativeService.SavingData = false;
                        this.swalTool.Draft();
                    });
                });
            }
        });
    }

    CreateSubmitInitiative() {
        this.initiativeService.CreateSubmitInitiative((this.formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe(response => {
            this.id = response.id;
            this.initiativeService.id = response.id;
            this.initiativeService.initiativeCode = response.initiativeCode;
            this.formGroup.get('initiativesForm').get('id').setValue(response.id);
            if (this.formGroup.get('initiativesForm').get('coDeveloper').value) {
                this.initiativeService.CreateCoDeveloper(response.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => { });
            }
            this.itBudgetService.CreateCapexBudgetSurveyNew(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe(() => { });

            if (Number(this.formGroup.get('DimForm').get('id').value) > 0) {
                this.itBudgetService.UpdateITBudget(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe((responseUpdate) => {
                    this.itBudgetService.CreateSoftware(responseUpdate.id, (this.formGroup.get('DimForm').get('software') as FormArray).getRawValue()).subscribe(() => {
                        this.submitService.SubmitStageStatus(response.id, this.formGroup.get('submitToForm').value).subscribe(() => {
                            this.initiativeService.SavingData = false;
                            this.swalTool.Submit()
                        });
                    });
                });
            } else {
                this.formGroup.get('DimForm').patchValue({ id: 0 });
                this.itBudgetService.CreateITBudget(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe((responseCreate) => {
                    this.formGroup.get('DimForm').patchValue({ id: responseCreate.id });
                    this.itBudgetService.CreateSoftware(responseCreate.id, (this.formGroup.get('DimForm').get('software') as FormArray).getRawValue()).subscribe(() => {
                        this.submitService.SubmitStageStatus(response.id, this.formGroup.get('submitToForm').value).subscribe(() => {
                            this.initiativeService.SavingData = false;
                            this.swalTool.Submit()
                        });
                    });
                });
            }
        });

    }

    UpdateSubmitInitiative() {
        this.formGroup.get('initiativesForm').patchValue({ updatedBy: this.initiativeService.username });
        this.initiativeService.UpdateSubmitInitiative(this.initiativeService.id, (this.formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe(response => {
            this.id = response.id;
            this.initiativeService.id = response.id;
            this.initiativeService.initiativeCode = response.initiativeCode;
            this.formGroup.get('initiativesForm').get('id').setValue(response.id);
            if (this.formGroup.get('initiativesForm').get('coDeveloper').value) {
                this.initiativeService.UpdateCoDeveloper(response.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => { });
            }
            this.itBudgetService.CreateCapexBudgetSurveyNew(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe(() => { });

            if (Number(this.formGroup.get('DimForm').get('id').value) > 0) {
                this.itBudgetService.UpdateITBudget(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe((responseUpdate) => {
                    console.log(responseUpdate)
                    this.itBudgetService.CreateSoftware(response.id, (this.formGroup.get('DimForm').get('software') as FormArray).getRawValue()).subscribe(() => {
                        this.submitService.SubmitStageStatus(response.id, this.formGroup.get('submitToForm').value).subscribe(() => {
                            this.initiativeService.SavingData = false;
                            this.swalTool.Submit()
                        });
                    });
                });
            } else {
                this.formGroup.get('DimForm').patchValue({ id: 0 });
                this.itBudgetService.CreateITBudget(response.id, (this.formGroup.get('DimForm') as FormGroup).getRawValue()).subscribe((responseCreate) => {
                    this.formGroup.get('DimForm').patchValue({ id: responseCreate.id });
                    console.log(responseCreate)
                    this.itBudgetService.CreateSoftware(response.id, (this.formGroup.get('DimForm').get('software') as FormArray).getRawValue()).subscribe(() => {
                        this.submitService.SubmitStageStatus(response.id, this.formGroup.get('submitToForm').value).subscribe(() => {
                            this.initiativeService.SavingData = false;
                            this.swalTool.Submit()
                        });
                    });
                });
            }
        });
    }

    CheckPermissionSetting(pageId: string): boolean {
        if (!this.userPermission) {
            return false;
        }
        let accessDetail: RolePermissionModel = this.userPermission.find(x =>
            x.pageId.toLowerCase() === pageId
            && x.sectionId.toLowerCase() === "access"
        );
        if (accessDetail?.isEnable) {
            return true;
        }
        return false;

    }

    CheckPermissionSubmit(pageId: string): boolean {
        if (!this.userPermission || !this.initiativeService.generalData.value) {
            return false;
        }
        let generalData: Initiative = this.initiativeService.generalData.value;
        let accessDetailByType: RolePermissionModel = this.userPermission.find(x =>
            x.pageId.toLowerCase() === pageId
            && x.sectionId.toLowerCase() === "access"
            && x.initiativeType.toLowerCase() === generalData.initiativeType.toLowerCase()
        );
        let accessDetailAllType: RolePermissionModel = this.userPermission.find(x =>
            x.pageId.toLowerCase() === pageId
            && x.sectionId.toLowerCase() === "access"
            && x.initiativeType.toLowerCase() === "all"
        );
        if (accessDetailByType?.isEnable || accessDetailAllType?.isEnable) {
            return true;
        }
        return false;

    }

    receiveCostEst($event) {
        this.costEst = +$event;
        console.log(`..DEB: mainComponent this.costEst = ${this.costEst}`);
    }

}
