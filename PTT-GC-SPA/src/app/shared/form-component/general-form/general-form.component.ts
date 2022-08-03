import { StageService } from './../../../core/services/stage/stage.service';
import { DetailService } from '@services/detail/detail.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ImpactService } from '@services/impact/impact.service';
import { RemoveService } from '@services/remove/remove.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { AuthService } from '@services/authentication/auth.service';
import { SuggestionService } from '@services/suggestion/suggestion.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { SwalTool } from '@tools/swal.tools';
import { DateUtil } from '@utils/date.utils';
import { ResponseService } from '@errors/response/response.service';
import { FileUploader } from 'ng2-file-upload';
import { CompanyList } from '@models/companyList';
import { CompamyService } from '@services/company/compamy.service';
import { ValidateService } from '@services/validate/validate.service';
import { PermissionService } from '@services/permission/permission.service';
import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { SelectFactorModel, IrrDetail, RamDetail, JFactorDetail, Initiative } from '@models/initiative';
import { CommonDataService } from '@services/common-data/common-data.service';
import { CapexInformationFormComponent } from '../capex-information-form/capex-information-form.component';

@Component({
    selector: 'app-general-form',
    templateUrl: './general-form.component.html',
    styleUrls: ['./general-form.component.css']
})
export class GeneralFormComponent implements OnInit, AfterContentChecked {

    @ViewChild('InvestmentModal', { static: false }) InvestmentModal: ModalDirective;

    showChild: boolean = true;
    today: Date;
    getToday: Date;
    constructor(
        private impactService: ImpactService,
        private removeService: RemoveService,
        private fb: FormBuilder,
        private initiativeService: InitiativeService,
        private authService: AuthService,
        private suggestion: SuggestionService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private unauthorized: UnauthorizedService,
        private swalTool: SwalTool,
        private dateUtil: DateUtil,
        private response: ResponseService,
        private companyService: CompamyService,
        private validateService: ValidateService,
        public permissionService: PermissionService,
        private detailService: DetailService,
        private cdref: ChangeDetectorRef,
        private commonDataService: CommonDataService,

        // private capexInfo: CapexInformationFormComponent,
    ) {
        this.today = new Date();

        this.getToday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 0, 0, 0);

    }

    @Input() id: number;
    @Input() data: any;
    @Input() page: string;
    @Input() formGroup: FormGroup;

    @Output() SendCim = new EventEmitter();
    @Output() SendCapex = new EventEmitter();
    @Output() SendStrategy = new EventEmitter();
    @Output() SendMax = new EventEmitter();

    @Output() Suggestion = new EventEmitter();

    @Output() sendCostEst = new EventEmitter();


    initiativesForm: FormGroup;

    companyList: CompanyList[];

    strategicYearDateFormat = {
        isAnimated: true,
        dateInputFormat: 'YYYY',
        showWeekNumbers: false,
        minDate: new Date(),
        minMode: 'year',
    };
    bsConfigStart = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
    bsConfigFinish = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false, minDate: new Date() };

    uploader: FileUploader;
    hasBaseDropZoneOver = false;

    params: any = {};

    username: string;
    ownerEmail: string;

    status = 'draft';
    stage: string;

    strategicYear: string;

    plants: any = [];
    organizations: any = [];
    coDevelopers: any = [];
    owners: any = [];
    typeOfInvestments: any = [];
    years: any = []; // { name: string, value: string }[] = [];
    companyName: any = [];

    coDeveloperSelected: any = [];
    coDeveloperItems = [];

    isDisabledSubmit = false;
    isDisabledDraft = false;

    type: string;

    IsCim = false;
    IsPim = false;
    IsDim = false;
    IsCapex = false;
    IsMax = false;
    IsCpi = false;
    IsRandD = false;
    IsOther = false;
    IsStrategy = false;

    isLoadSuggest = false;

    IsSuggested = false;

    IsOtherCompany: boolean;

    showLocation = false;
    showSpecify = false;
    showBudget = false;
    showRam = false;
    showJFactor = false;
    showIrr = false;
    showWacc = false;
    showTypeBenefit = false;
    showBenefitAmount = false;
    showPayBackPeriod = false;
    showFxExchange = false;
    showCostEstCapex = true;
    // showCostEstOpex = false;
    showCostEstCapexType = true;
    showCostEstOpexType = false;
    showBudgetSource = true;
    showTypeOfInvestment = true;
    showDivestment = false;
    showSpecifyCompany = false;
    typeBenefitValue: string;

    condition: object;


    requestCapex: string;
    typeOfInvestment: string;
    budgetType: string;
    ram: string;
    jFactor: number;
    irr: number;
    costEstCapex: any;
    costEstCapexType: string;
    costEstOpex: any;
    costEstOpexType: string;
    typeBenefit: string;
    benefitAmount: number;
    benefitAmountType: string;
    payBackPeriod: number;
    fxExchange: number;
    involveItDigital: boolean;
    alignWithCorpStrategy: boolean;
    budgetSource: string;
    divestment: boolean;

    replace: string;
    obsolate: string;
    confirmText = 'Maintain Reliability';

    dateRegister: string;
    dateStart: string;
    dateFinish: string;
    dateRegisterDisplay: string;
    dateStartDisplay: string;
    dateFinishDisplay: string;
    lastSubmittedDate: Date;

    initiativeCode: string;
    legacyInitiativeCode: string;
    attachments: any = [];
    file: any = [];
    selectListCoDeveloper: any = [];
    strategicObjectives: any = [];
    strategies: any = [];

    admin: any = [];
    admins: any = [];
    userActions: any = [];
    actionUser: string;

    approverList: any = [];

    createdBy: string;

    ButtonNext = false;

    names: any = [];

    chooseUSD: boolean;
    haveCompany: boolean;

    minStrategicYear: Date;
    maxStrategicYear: Date;
    typeOfInvestmentTemp: string = null;

    checkkpiExist: any;
    useIrrCalculate: boolean;
    dataLoaded: boolean;
    CalculateLoading: boolean;

    //cal ram
    annualLikelihoodList: SelectFactorModel[];
    exposureFactorList: SelectFactorModel[];
    effectivenessList: SelectFactorModel[];
    hideShowBtnText = "Hide";
    newSuggest: boolean = false;
    direcCapexOnly: boolean = false;
    showProgessTab: boolean = false;
    disableStartDate: boolean = false;

    get Investment() {
        return this.initiativesForm.controls.typeOfInvestment.value;
    }


    get CheckSuggestion() {
        return (this.IsCim || this.IsPim || this.IsDim || this.IsCapex || this.IsMax ||
            this.IsCpi || this.IsRandD || this.IsStrategy || this.IsOther);
    }

    get CheckOnlyMax() {
        return (this.IsCim || this.IsPim || this.IsDim || this.IsCapex ||
            this.IsCpi || this.IsRandD || this.IsStrategy || this.IsOther);
    }

    get StageIL5() {
        const stages = ['IL0', 'IL1', 'IL2', 'IL3-2', 'IL4', 'IL5'];
        return stages.indexOf(this.stage) !== -1;
    }

    ngOnInit(): void {
        this.initiativeService.useIrrCalculate = false; //clear flag by oat 2021-02-01
        this.id = this.initiativeService.id;
        this.companyList = this.companyService.companyList;
        this.annualLikelihoodList = this.initiativeService.annualLikelihoodList;
        this.exposureFactorList = this.initiativeService.exposureFactorList;
        this.effectivenessList = this.initiativeService.effectivenessList;
        // this.pa
        if (!this.formGroup.get('initiativesForm')) {
            this.init();
            this.formGroup.addControl('initiativesForm', this.initiativesForm);
        }



    this.GetUser();
    this.GetYears();
    this.GetTypeOfInvestments();
    if (((this.page === 'edit' || this.page === 'addmore') && !this.initiativeService.suggestion) || this.page === 'information' || this.page === 'approve' || this.page === 'approveEdit' || this.page === 'overview-approve') {
      //if (this.id) {
      this.GetInitiative();
    } else {
      // this.SetFormModel();
      this.dataLoaded = true;
    }
    if (this.page === 'create') {
      //get fxRate
      this.commonDataService.GetCurrencyFxRate().then((resFx) => {
        this.fxExchange = resFx && resFx.attribute03 ? parseFloat(resFx.attribute03) : null;
        this.initiativesForm.get("fxExchange").patchValue(resFx && resFx.attribute03 ? parseFloat(resFx.attribute03) : null);
      });
      this.setStrategicYear();
      this.GetCompany();
    }
    this.permissionService.CheckInitiativeFormsPermission(this.formGroup, String(this.id));

        //get KPI
        this.checkkpiExist = null;
        if (this.initiativeService.id) {
            this.initiativeService.CheckkpiExist(this.id).subscribe((res) => {
                if (res) {
                    this.checkkpiExist = res;
                }
            });
        }
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }


    setStrategicYear() {
        this.initiativeService.getStrategicObjectiveYear().subscribe((resp) => {
            if (resp) {
                this.minStrategicYear = new Date(2016, 11, 31, 0, 0, 0);
                this.maxStrategicYear = new Date(parseInt(resp['response']), 11, 31, 0, 0, 0);
                this.initiativesForm.patchValue({ year: this.maxStrategicYear });
            }
        });
    }

    init() {
        this.initiativesForm = this.fb.group({
            id: null,
            initiativeCode: null,
            lagacyInitiativeCode: null,
            name: null,
            year: new Date().getFullYear().toString(),
            ownerName: null,
            creatorName: null,
            organization: null,
            company: null,
            specifyCompany: '',
            coDeveloper: null,
            integration: '',
            plant: null,
            specifyPlant: '',
            location: "domestic",
            specifyLocation: null,
            registeringDate: this.dateUtil.GetToday,
            startingDate: this.dateUtil.GetToday,
            finishingDate: null,
            background: '',
            resultObjective: '',
            scopeOfWork: '',
            initiativeType: null,
            requestCapex: 'true',
            typeOfInvestment: null,
            involveItDigital: false,
            requestProjectEngineer: '',
            budgetType: '',

            irr: null,
            wacc: this.initiativeService.waccValue,
            costEstCapex: null,
            costEstCapexType: 'THB',
            divestment: false,
            budgetSource: null,
            requestOpex: 'falseOpex',
            costEstOpex: { value: 0, disabled: true },
            costEstOpexType: { value: 'THB', disabled: true },
            typeBenefit: '',
            benefitAmount: null,
            benefitAmountType: 'THB',
            payBackPeriod: null,
            fxExchange: null,
            alignWithCorpStrategy: false,
            strategicObjective: null,
            strategyType: { value: '', disabled: true },
            strategicYear: null,
            cim: { value: '', disabled: true },
            pim: { value: '', disabled: true },
            dim: { value: '', disabled: true },
            max: { value: '', disabled: true },
            cpi: { value: '', disabled: true },
            directCapex: { value: '', disabled: true },
            strategy: { value: '', disabled: true },
            randD: { value: '', disabled: true },
            other: { value: '', disabled: true },
            // trackMax: { value: '', disabled: true },
            createdBy: '',
            updatedBy: '',

            // irr Calculate
            useIrrCalculate: false,
            residualValue: 0,
            utilitiesCost: 0,
            maintenanceCost: this.initiativeService.maintenanceCost, // default 1.5%
            catalystChemicalsCost: 0,
            labourCost: 0,

      //ram & jfactor
      likelihood: "",
      consequence: "",
      ram: '',
      jFactor: null,
      baseRisk: null,
      riskOfAlt: null,
      riskReduction: null,
      potentialConCost: null,
      annualLikelihood: "",
      annualLikelihoodRatio: null,
      exposureFactor: "",
      exposureFactorRatio: null,
      probability: null,
      effectiveness: "",
      effectivenessRatio: null,
      productionLoss: null,
      economicPenalties: null,
      economicBenefits: null,
      opexPenaltiesCost: null,
      justifiableCost: null,
      isRequestCapex: null
    });
    if (this.initiativeService.viewMode) {
      this.initiativesForm.disable();
    }
  }


    get viewMode() {
        return this.initiativeService.viewMode;
    }

    get showCostEstOpex() {
        return this.initiativeService.showCostEstOpex;
    }

    get getInitiativeService() {
        return this.initiativeService;
    }

    get creatorName() {
        return this.formGroup.get('initiativesForm').get('creatorName').value;
    }

    SubmitValidation() {

        var returnValue = true;

        if (!this.validateService.ValidateGeneralInformationForm(this.formGroup.get('initiativesForm') as FormGroup)) {
            this.swalTool.Required();
            returnValue = false;
        }


        return returnValue;
    }


    getFormError(field) {
        return (this.formGroup.get('initiativesForm').get(field).touched || this.formGroup.get('initiativesForm').get(field).dirty) && this.formGroup.get('initiativesForm').get(field).invalid;
    }

    ngOnDestroy() {

        this.initiativeService.setGeneralData({} as Initiative);
        //this.initiativeService.suggestionStatus = null;
        // sessionStorage.setItem('InitiativeValidated', this.stage === 'IL5' ? 'true' : JSON.stringify(this.CheckValidForm));
        // sessionStorage.setItem('InitiativeValidate', this.stage === 'IL5' ? 'true' : JSON.stringify(this.CheckValidForm));
        sessionStorage.setItem('InitiativeActive', 'true');
        // sessionStorage.setItem('isDivestment',this.divestment.toString());
        switch (this.page) {
            case 'edit':
                sessionStorage.setItem('Status', this.status);
                sessionStorage.setItem('Stage', this.stage);
                // if (this.initiativesForm.dirty) {
                this.SetFormDate();
                this.PatchSetDate();
                this.PatchSuggest();
                sessionStorage.setItem('isInitiativesForm', 'true');
                sessionStorage.setItem('InitiativeCode', this.initiativeCode);
                sessionStorage.setItem('InitiativesForm', JSON.stringify(this.initiativesForm.value));
                // }
                break;
        }
    }

    CheckCompanyOnEdit() {
        let companyName = this.initiativesForm.get('company').value;
        if (companyName != null && companyName != undefined) {
            if (companyName.toString().toLowerCase() == 'others') {
                this.IsOtherCompany = true;
                return true;
            }
        }
        this.initiativesForm.patchValue({ specifyCompany: '' });
        this.IsOtherCompany = false;

        return false;
    }

    onChangeCompany() {
        // let companyName = this.initiativesForm.get('company').value;
        // if (companyName == 'Others') {
        //   this.showSpecifyCompany = true;
        // }
        // else {
        //   this.showSpecifyCompany = false;
        // }
        // this.initiativesForm.get('organization').setValue(null);
        // this.initiativesForm.get('plant').setValue(null);
        // if (companyName) {
        //   let companyList = this.companyList.find(x => x.value == companyName);
        //   this.organizations = companyList.org;
        //   this.plants = companyList.plant;
        //   return true
        // }
        // this.organizations = [];
        // this.plants = [];
        // return false;
        let companyName = this.initiativesForm.get('company').value;
        this.initiativesForm.get('organization').setValue(null);
        this.initiativesForm.get('plant').setValue(null);
        if (companyName) {
            let companyList = this.companyList.find(x => x.value == companyName);
            this.organizations = companyList.org;
            this.plants = companyList.plant;

            if (companyName != null && companyName != undefined) {
                if (companyName.toString().toLowerCase() == 'others') {
                    this.IsOtherCompany = true;
                }
            }
            return true
        }
        this.organizations = [];
        this.plants = [];
        this.initiativesForm.patchValue({ specifyCompany: '' });
        this.IsOtherCompany = false;

        return false;
    }

    onChangeSpecifyCompany() {
        let companyName = this.initiativesForm.get('specifyCompany').value;
        if (companyName) {
            let companyList = this.companyList.find(x => x.value == companyName);
            return true
        }
    }

    SetGeneral() {
        sessionStorage.setItem('InitiativeActive', 'true');
    }

    // CheckRequired(event) {
    //   this.Required.emit(event);
    // }

    CheckValidate() {
        if (sessionStorage.getItem('InitiativeValidate') === 'false') {
            setTimeout(() => this.SetMarkAsTouchedFormGeneral(), 50);
        }
    }

    PatchSetDate() {
        this.initiativesForm.patchValue({
            registeringDate: this.dateRegister ? this.dateRegister : this.dateUtil.SetDate(new Date()),
            startingDate: this.dateStart ? this.dateStart : null,
            finishingDate: this.dateFinish ? this.dateFinish : null,
        });

    }

    PatchGetDate(InitiativesForm) {
        this.dateRegisterDisplay = this.dateUtil.GetDate(new Date(InitiativesForm.registeringDate));
        this.dateStartDisplay = this.dateUtil.GetDate(new Date(InitiativesForm.startingDate));
        this.dateFinishDisplay = InitiativesForm.finishingDate ? this.dateUtil.GetDate(new Date(InitiativesForm.finishingDate)) : null;
        this.initiativesForm.patchValue({
            // registeringDate: this.dateRegisterDisplay ? this.dateRegisterDisplay : null,
            startingDate: this.dateStartDisplay ? this.dateStartDisplay : null,
            finishingDate: this.dateFinishDisplay ? this.dateFinishDisplay : null,
        });
    }

    // IsInitiativesForm() {
    //   if (sessionStorage.getItem('isInitiativesForm') === 'true') {
    //     const InitiativesForm = JSON.parse(sessionStorage.getItem('InitiativesForm'));
    //     const InitiativesCode = sessionStorage.getItem('InitiativeCode');
    //     this.createdBy = InitiativesForm.createdBy;
    //     this.initiativesForm.patchValue(InitiativesForm);
    //     if (InitiativesForm.requestOpex === 'trueOpex') {
    //       this.impactService.GetImpactTotalCostOPEX(this.id).subscribe((result) => {
    //         if (result) {
    //           if (result !== 0) {
    //             this.initiativesForm.patchValue({ costEstOpex: result });
    //           }
    //         }
    //       });
    //     }
    //     if (InitiativesForm.benefitAmount) {
    //       if (sessionStorage.getItem('TotalRecurringOneTime')) {
    //         const TotalRecurringOneTime = Number(sessionStorage.getItem('TotalRecurringOneTime'));
    //         this.initiativesForm.patchValue({ benefitAmount: TotalRecurringOneTime.toFixed(3) });
    //         this.CalculatePayBackPeriod();
    //       } else {
    //         this.impactService.GetImpactTotalRecurringOneTime(this.id).subscribe((result) => {
    //           if (result) {
    //             if (result !== 0) {
    //               this.initiativesForm.patchValue({ benefitAmount: result.toFixed(3) });
    //               this.CalculatePayBackPeriod();
    //             }
    //           }
    //         });
    //       }
    //     }
    //     setTimeout(() => {
    //       this.initiativeCode = InitiativesCode;
    //       this.status = sessionStorage.getItem('Status');
    //       this.stage = sessionStorage.getItem('Stage');
    //       this.ActiveSuggestion(InitiativesForm);
    //       this.CheckTypeOfInvestment(InitiativesForm.typeOfInvestment);
    //       this.CheckTypeBenefit(InitiativesForm.typeBenefit);
    //       this.CheckCostEstCapexType(InitiativesForm.costEstCapexType);
    //       this.CheckCostEstCapex(InitiativesForm.costEstCapex);
    //       this.CheckRequestCapex(InitiativesForm.requestCapex);
    //       this.CheckRequestOpex(InitiativesForm.requestOpex);
    //       this.PatchGetDate(InitiativesForm);
    //       if (this.status == 'draft' && this.page == 'edit') {
    //         this.haveCompany = true;
    //       }
    //     }, 350);
    //   }

    //   if (sessionStorage.getItem('InitiativeActive') === 'true') {
    //     if (sessionStorage.getItem('TotalRecurringOneTime')) {
    //       setTimeout(() => {
    //         const TotalRecurringOneTime = Number(sessionStorage.getItem('TotalRecurringOneTime'));
    //         this.initiativesForm.patchValue({ benefitAmount: TotalRecurringOneTime.toFixed(3) });
    //         this.CalculatePayBackPeriod();
    //       }, 1500);
    //     }
    //   }

    //   if (sessionStorage.getItem('Stage') === 'IL5') {
    //     setTimeout(() => this.initiativesForm.disable(), 100);
    //   }
    // }

    CheckCostEstCapex(value) {
        if (value > 300) {
            this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc']);
            this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
            this.initiativesForm.patchValue({ typeBenefit: '' });
        }
    }

    CheckRequestCapex(value) {
        if (value === 'false') {
            this.EnableForm(['typeBenefit', 'divestment']);
            this.ShowForm(['typeBenefit', 'divestment']);
            this.HideForm(['typeOfInvestment', 'budgetType', 'ram', 'irr',
                'costEstCapex', 'costEstCapexType', 'fxExchange', 'budgetSource']);
            this.DisableForm(['typeOfInvestment', 'budgetType', 'ram', 'irr',
                'costEstCapex', 'costEstCapexType', 'fxExchange', 'budgetSource']);
        }
    }

    CheckRequestOpex(value) {
        if (value === 'falseOpex') {
            this.HideForm(['costEstOpex', 'costEstOpexType']);
            this.DisableForm(['costEstOpex', 'costEstOpexType']);
        } else {
            this.EnableForm(['costEstOpex', 'costEstOpexType']);
            this.ShowForm(['costEstOpex', 'costEstOpexType']);
        }
    }

    CheckOwner(ownerName, createdBy) {
        //   this.authService.getMsalUser().subscribe((user) => {
        //     this.params.text = ownerName;
        //     this.initiativeService.GetOwnerName(this.params).subscribe(owners => {
        //       if (user.mail !== owners.email) {
        //         if (user.mail !== createdBy) {
        //           this.router.navigate(['']);
        //         }
        //       }
        //     });
        //   }, error => this.unauthorized.error(error));
    }

    SetGetInitiative(response) {
        this.initiativesForm.patchValue({
            budgetSource: response.budgetSource !== undefined && response.budgetSource !== null ? response.budgetSource : '',
            jFactor: response.jFactor !== undefined && response.jFactor !== null ? response.jFactor : null,
            irr: response.irr !== undefined && response.irr !== null ? response.irr : null,
            costEstCapex: response.costEstCapex !== undefined && response.costEstCapex !== null ? response.costEstCapex : null,
            benefitAmount: response.benefitAmount !== undefined && response.benefitAmount !== null ? response.benefitAmount : null,
            fxExchange: response.fxExchange !== undefined && response.fxExchange !== null ? response.fxExchange : null,
            payBackPeriod: response.payBackPeriod !== undefined && response.payBackPeriod !== null ? parseFloat(response.payBackPeriod).toFixed(2) : null
        });
    }

    GetSetDate(registeringDate, startingDate, finishingDate) {
        // this.dateRegisterDisplay = this.dateUtil.GetDate(new Date(registeringDate));
        // this.dateStartDisplay = this.dateUtil.GetDate(new Date(startingDate));
        // this.dateFinishDisplay = finishingDate ? this.dateUtil.GetDate(new Date(finishingDate)) : null;
        // this.dateRegister = this.dateUtil.SetDate(new Date(registeringDate));
        // this.dateStart = this.dateUtil.SetDate(new Date(startingDate));
        // this.dateFinish = finishingDate ? this.dateUtil.SetDate(new Date(finishingDate)) : null;
        this.initiativesForm.patchValue({
            registeringDate: registeringDate ? new Date(registeringDate) : this.dateUtil.GetToday,
            startingDate: startingDate ? new Date(startingDate) : null,
            finishingDate: finishingDate ? new Date(finishingDate) : null
        });


    }

    GetInitiative() {
        this.initiativeService.GetInitiative(this.id).subscribe(response => {
            // console.log('Initiative : ',response);
            let lowLevel = ['Very Low', 'Low'];
            this.showProgessTab = response.progressTabStatus > 0 || this.initiativeService.ShowTabCapex ? true : false;
            this.disableStartDate = response.initiativeType ? true : false;
            this.useIrrCalculate = response.useIrrCalculate;
            this.initiativeService.useIrrCalculate = response.useIrrCalculate;
            this.typeOfInvestmentTemp = response.typeOfInvestment;
            this.initiativeService.benefitAmount = response.benefitAmount;
            if (response.typeOfInvestment) {
                this.CheckTypeOfInvestment(response.typeOfInvestment);
            }
            this.initiativeService.startDate = new Date(response.startingDate);
            this.initiativeService.finishDate = new Date(response.finishingDate);
            this.createdBy = response.createdBy;
            this.initiativeCode = response.initiativeCode;
            this.initiativeService.initiativeCode = response.initiativeCode;
            this.initiativeService.initiativeName = response.name;
            this.initiativeService.legacyInitiativeCode = response.lagacyInitiativeCode;
            this.status = response.status;
            this.stage = response.stage;

            if ((response.costEstCapexType && response.costEstCapexType != 'THB') || (response.costEstOpexType && response.costEstOpexType != 'THB')) {
                this.ShowForm(['fxExchange']);
            }

            if (response.createdBy) {
                this.initiativeService.GetOwnerEmail({ text: response.createdBy }).subscribe(
                    responseEmail => {
                        if (responseEmail) {
                            this.initiativesForm.patchValue({ creatorName: responseEmail.ownerName });
                        }
                    });
            }

      if (response.specifyCompany !== null) {
        this.IsOtherCompany = true;
      }
      this.alignWithCorpStrategy = response.alignWithCorpStrategy;
      if (response.year) {
        let year = new Date(response.year).getFullYear().toString();
        this.strategicYear = response.year;
        this.detailService.GetStrategicObjectives(year).subscribe((resp) => {
          this.strategicObjectives = resp;
          if (response.strategicObjective) {
            this.detailService.GetStrategies(response.strategicObjective).subscribe(strategies => {
              this.strategies = strategies
              if (!this.initiativeService.viewMode) this.initiativesForm.get('strategyType').enable();
            });
          }
        });

            }


            this.coDeveloperSelected = response.initiativeCoDevelopers;
            this.coDeveloperSelected.forEach((element) => {
                if (element.coDeveloperName) { this.selectListCoDeveloper.push(element.coDeveloperName); }
            });
            this.coDeveloperItems = this.selectListCoDeveloper;

            this.initiativesForm.patchValue(response);
            this.initiativesForm.patchValue({ coDeveloper: this.coDeveloperItems });
            this.initiativesForm.patchValue({ benefitAmountType: 'THB' });
            this.initiativeService.GetLastSubmittedDate(this.id).subscribe(res => {
                if (res) {
                    this.lastSubmittedDate = res;
                }
                this.ActiveSuggestion(response);
                if (res !== null) {
                    this.IsSuggested = true;
                }
                else {
                    this.IsSuggested = false;
                }
                if (this.stage === 'IL5') {
                    this.initiativesForm.disable();
                }
            });

            //ram
            this.showJFactor = lowLevel.indexOf(response.ram) >= 0 ? false : true;
            // this.CheckTypeOfInvestment(response.typeOfInvestment);
            this.HideShowField();
            this.CheckCompanyOnEdit();
            this.GetPlants();
            this.GetOrganizations();
            this.SetGetInitiative(response);
            if (response.typeBenefit) {
                this.CheckTypeBenefit(response.typeBenefit);
            }
            this.typeBenefit = response.typeBenefit;
            // this.CheckCostEstCapexType(response.costEstCapexType);
            // this.CheckCostEstCapex(response.costEstCapex);
            this.CheckRequestCapex(response.requestCapex);
            this.CheckRequestOpex(response.requestOpex);
            this.GetSetDate(response.registeringDate, response.startingDate, response.finishingDate);
            //this.DisableSuggest(['pim', 'cim', 'max', 'directCapex', 'dim', 'cpi', 'strategy', 'randD', 'other']);
            // this.initiativesForm.patchValue({
            //   registeringDate: this.dateRegisterDisplay,
            //   startingDate: this.dateStartDisplay,
            //   finishingDate: this.dateFinishDisplay
            // });

            if (response.likelihood === '' || response.likelihood === null) {
                this.clearRamForm();
            }
            if (response.jFactor === null) {
                this.clearJFactorForm();
            }

            if (response.requestOpex === 'trueOpex') {
                this.initiativeService.showCostEstOpex = true;
                this.initiativesForm.patchValue({ requestOpex: 'trueOpex' });
                if (this.formGroup.get("ImpactForm")) {
                    this.impactService.GetImpactTotalCostOPEX(this.id).subscribe((result) => {
                        if (result) {
                            if (result !== 0) {
                                this.initiativesForm.patchValue({ costEstOpex: result });
                            }
                        }
                    });
                }
            } else {
                this.initiativesForm.patchValue({ requestOpex: 'falseOpex' });
                this.initiativeService.showCostEstOpex = false;
            }
            //request capex
            if (response.requestCapex === 'true') {
                this.showCostEstCapex = true;
                this.initiativesForm.patchValue({ requestCapex: 'true' });
            } else {
                this.showCostEstCapex = false;
                this.initiativesForm.patchValue({ requestCapex: 'false' });
            }

            // }

            //Event on benefit amount change
            this.formGroup.get('initiativesForm').get('benefitAmount').valueChanges.subscribe(() => {
                this.OnChangeBenefitAmount();
                if (this.formGroup.get('bestPracticeForm')) this.formGroup.get('bestPracticeForm').get('benefitType').setValue(this.formGroup.get('initiativesForm').get('benefitAmount').value);
            });

            this.CheckOwner(response.ownerName, response.createdBy);



            if (this.stage === 'IL5') {
                this.initiativesForm.disable();
            }

            if ((response.status == 'draft' || this.page == 'edit') && response.company) {
                this.haveCompany = true;
            }
            this.CalculateRamAuto();
            this.dataLoaded = true;
        }, error => this.response.error(error)
        );
    }

    // SetFormModel() {
    //   this.initiativeService.GetInitiative(this.id).pipe(
    //     tap(() => this.testService.addItem({ functionName: 'GeneralGetImpactTotalCostOPEX', status: false } as SubjectBeta))
    //   ).toPromise().then(response => {
    //     // let response = this.initiativeService.generalData.value;
    //     // if (!response) {
    //     //   return;
    //     // }
    //     console.log('Initiative : ', response);
    //     let lowLevel = ['Very Low', 'Low'];
    //     this.useIrrCalculate = response.useIrrCalculate;
    //     this.initiativeService.useIrrCalculate = response.useIrrCalculate;
    //     this.typeOfInvestmentTemp = response.typeOfInvestment;
    //     this.initiativeService.benefitAmount = response.benefitAmount;
    //     if (response.typeOfInvestment) {
    //       this.CheckTypeOfInvestment(response.typeOfInvestment);
    //     }
    //     this.initiativeService.startDate = new Date(response.startingDate);
    //     this.initiativeService.finishDate = new Date(response.finishingDate);
    //     this.createdBy = response.createdBy;
    //     this.initiativeCode = response.initiativeCode;
    //     this.initiativeService.initiativeCode = response.initiativeCode;
    //     this.initiativeService.initiativeName = response.name;
    //     this.initiativeService.legacyInitiativeCode = response.lagacyInitiativeCode;
    //     this.status = response.status;
    //     this.stage = response.stage;

    //     if ((response.costEstCapexType && response.costEstCapexType != 'THB') || (response.costEstOpexType && response.costEstOpexType != 'THB')) {
    //       this.ShowForm(['fxExchange']);
    //     }

    //     if (response.createdBy) {
    //       this.initiativeService.GetOwnerEmail({ text: response.createdBy }).pipe(
    //         tap(() => this.testService.addItem({ functionName: 'GeneralGetOwnerEmail', status: false } as SubjectBeta))
    //       ).toPromise().then(
    //         responseEmail => {
    //           if (responseEmail) {
    //             this.initiativesForm.patchValue({ creatorName: responseEmail.ownerName });
    //           }
    //         }).finally(() => {
    //           this.testService.updateItem('GeneralGetOwnerEmail')
    //         });
    //     }

    //     if (response.specifyCompany !== null) {
    //       this.IsOtherCompany = true;
    //     }
    //     this.alignWithCorpStrategy = response.alignWithCorpStrategy;
    //     if (response.year) {
    //       let year = new Date(response.year).getFullYear().toString();
    //       this.strategicYear = response.year;
    //       this.detailService.GetStrategicObjectives(year).pipe(
    //         tap(() => this.testService.addItem({ functionName: 'GeneralGetStrategicObjectives', status: false } as SubjectBeta))
    //       ).toPromise().then((resp) => {
    //         this.strategicObjectives = resp;
    //       }).finally(() => {
    //         this.testService.updateItem('GeneralGetStrategicObjectives')
    //       });
    //       if (response.strategicObjective) {
    //         this.detailService.GetStrategies(response.strategicObjective).pipe(
    //           tap(() => this.testService.addItem({ functionName: 'GeneralGetStrategies', status: false } as SubjectBeta))
    //         ).toPromise().then(strategies =>
    //           this.strategies = strategies).finally(() => {
    //             this.testService.updateItem('GeneralGetStrategies')
    //           });
    //         if (!this.initiativeService.viewMode) this.initiativesForm.get('strategyType').enable();

    //       }

    //     }


    //     this.coDeveloperSelected = response.initiativeCoDevelopers;
    //     if (this.coDeveloperSelected) {
    //       this.coDeveloperSelected.forEach((element) => {
    //         if (element.coDeveloperName) { this.selectListCoDeveloper.push(element.coDeveloperName); }
    //       });
    //       this.coDeveloperItems = this.selectListCoDeveloper;
    //     }

    //     this.initiativesForm.patchValue(response);
    //     this.initiativesForm.patchValue({ coDeveloper: this.coDeveloperItems });
    //     this.initiativeService.GetLastSubmittedDate(this.id).pipe(
    //       tap(() => this.testService.addItem({ functionName: 'GeneralGetLastSubmittedDate', status: false } as SubjectBeta))
    //     ).toPromise().then(res => {
    //       if (res) {
    //         this.lastSubmittedDate = res;
    //       }
    //       this.ActiveSuggestion(response);
    //       if (res !== null) {
    //         this.IsSuggested = true;
    //       }
    //       else {
    //         this.IsSuggested = false;
    //       }
    //       if (this.stage === 'IL5') {
    //         this.initiativesForm.disable();
    //       }
    //     }).finally(() => {
    //       this.testService.updateItem('GeneralGetLastSubmittedDate')
    //     });

    //     //ram
    //     this.showJFactor = lowLevel.indexOf(response.ram) >= 0 ? false : true;
    //     // this.CheckTypeOfInvestment(response.typeOfInvestment);
    //     this.HideShowField();
    //     this.CheckCompanyOnEdit();
    //     this.GetPlants();
    //     this.GetOrganizations();
    //     this.SetGetInitiative(response);
    //     if (response.typeBenefit) {
    //       this.CheckTypeBenefit(response.typeBenefit);
    //     }
    //     this.typeBenefit = response.typeBenefit;
    //     // this.CheckCostEstCapexType(response.costEstCapexType);
    //     // this.CheckCostEstCapex(response.costEstCapex);
    //     this.CheckRequestCapex(response.requestCapex);
    //     this.CheckRequestOpex(response.requestOpex);
    //     this.GetSetDate(response.registeringDate, response.startingDate, response.finishingDate);
    //     //this.DisableSuggest(['pim', 'cim', 'max', 'directCapex', 'dim', 'cpi', 'strategy', 'randD', 'other']);
    //     // this.initiativesForm.patchValue({
    //     //   registeringDate: this.dateRegisterDisplay,
    //     //   startingDate: this.dateStartDisplay,
    //     //   finishingDate: this.dateFinishDisplay
    //     // });

    //     if (response.likelihood === '' || response.likelihood === null) {
    //       this.clearRamForm();
    //     }
    //     if (response.jFactor === null) {
    //       this.clearJFactorForm();
    //     }

    //     if (response.requestOpex === 'trueOpex') {
    //       this.impactService.GetImpactTotalCostOPEX(this.id).pipe(
    //         tap(() => this.testService.addItem({ functionName: 'GeneralGetImpactTotalCostOPEX', status: false } as SubjectBeta))
    //       ).toPromise().then((result) => {
    //         if (result) {
    //           if (result !== 0) {
    //             this.initiativesForm.patchValue({ costEstOpex: result });
    //           }
    //         }
    //       }).finally(() => {
    //         this.testService.updateItem('GeneralGetImpactTotalCostOPEX')
    //       });
    //     }

    //     //Event on benefit amount change
    //     this.formGroup.get('initiativesForm').get('benefitAmount').valueChanges.subscribe(() => {
    //       this.OnChangeBenefitAmount();
    //       if (this.formGroup.get('bestPracticeForm')) this.formGroup.get('bestPracticeForm').get('benefitType').setValue(this.formGroup.get('initiativesForm').get('benefitAmount').value);
    //     });

    //     this.CheckOwner(response.ownerName, response.createdBy);



    //     if (this.stage === 'IL5') {
    //       this.initiativesForm.disable();
    //     }

    //     if (response.status == 'draft' && this.page == 'edit') {
    //       this.haveCompany = true;
    //     }
    //     this.CalculateRamAuto();
    //     this.dataLoaded = true;
    //   }, error => this.response.error(error)).finally(() => {
    //     this.testService.updateItem('GeneralGetImpactTotalCostOPEX')
    //   });
    // }

    ActiveSuggestion(response) {
        if (response.cim) {
            if (!this.initiativeService.viewMode) this.initiativesForm.controls.cim.enable();
            this.initiativesForm.patchValue({ cim: true });
            this.IsCim = true;
            this.SendCim.emit(this.IsCim);
            this.initiativeService.initiativeType = "cim";
        }
        if (response.pim) {
            if (!this.initiativeService.viewMode) this.initiativesForm.controls.pim.enable();
            this.initiativesForm.patchValue({ pim: true });
            this.IsPim = true;
            this.initiativeService.initiativeType = "pim";

        }
        if (response.dim) {
            if (!this.initiativeService.viewMode) this.initiativesForm.controls.dim.enable();
            this.initiativesForm.patchValue({ dim: true });
            this.IsDim = true;
            this.initiativeService.initiativeType = "dim";

        }
        if (response.max) {
            if (!this.initiativeService.viewMode) this.initiativesForm.controls.max.enable();
            this.initiativesForm.patchValue({ max: true });
            this.IsMax = true;
            this.SendMax.emit(this.IsMax);
            this.initiativeService.initiativeType = "max";

        }
        if (response.cpi) {
            if (!this.initiativeService.viewMode) this.initiativesForm.controls.cpi.enable();
            this.initiativesForm.patchValue({ cpi: true });
            this.IsCpi = true;
            this.initiativeService.initiativeType = "cpi";

        }
        if (response.randD) {
            if (!this.initiativeService.viewMode) this.initiativesForm.controls.randD.enable();
            this.initiativesForm.patchValue({ randD: true });
            this.IsRandD = true;
        }
        if (response.other) {
            if (!this.initiativeService.viewMode) this.initiativesForm.controls.other.enable();
            this.initiativesForm.patchValue({ other: true });
            this.IsOther = true;
            this.initiativeService.initiativeType = "other";
        }
        if (response.strategy) {
            if (!this.initiativeService.viewMode) this.initiativesForm.controls.strategy.enable();
            this.initiativesForm.patchValue({ strategy: true });
            this.IsStrategy = true;
            this.SendCim.emit(this.IsStrategy);
            this.initiativeService.initiativeType = "strategy";
        }
        if (response.directCapex) {
            if (!this.initiativeService.viewMode) this.initiativesForm.controls.directCapex.enable();
            this.initiativesForm.patchValue({ directCapex: true });
            this.IsCapex = true;
            this.SendCapex.emit(this.IsCapex);
            this.initiativeService.initiativeType = "directCapex";
        }
    }

    CheckTypeBenefit(typeBenefit) {
        switch (typeBenefit) {
            case 'FINANCIAL':
                this.ShowForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
                this.EnableForm(['benefitAmount', 'payBackPeriod']);
                break;
            case 'NON-FINANCIAL':
                this.ShowForm(['typeBenefit']);
                break;
        }
    }

    HideModal(): void {
        this.InvestmentModal.hide();
    }

    ConfirmInvestment(confirmText): void {
        this.initiativesForm.patchValue({ typeOfInvestment: confirmText });
        this.RequestCapexHideShowCheck();
        // this.PatchForm();
        // //this.SetShowForm();
        // this.SetValidateForm();
        // this.SetMarkAsUntouchedForm();
        // this.SetEnableFrom();
        // switch (this.initiativesForm.controls.typeOfInvestment.value) {
        //   case 'Maintain Reliability':
        //     this.replace = 'not-in-kind';
        //     this.obsolate = 'no';
        //     this.confirmText = 'Maintain Reliability';
        //     this.InvestmentModal.show();
        //     this.HideForm(['ram', 'jFactor', 'budgetType', 'wacc']);
        //     this.DisableForm(['ram', 'jFactor', 'budgetType']);
        //     this.ShowForm(['irr', 'typeOfInvestment', 'costEstCapex', 'costEstCapexType', 'typeBenefit', 'fxExchange']);
        //     this.ValidateForm(['irr', 'costEstCapex', 'typeBenefit']);
        //     break;
        //   case 'Replacement':
        //     this.replace = 'in-kind';
        //     this.obsolate = 'yes';
        //     this.confirmText = 'Replacement';
        //     this.InvestmentModal.show();
        //     this.HideForm(['ram', 'jFactor', 'irr', 'wacc']);
        //     this.ShowForm(['budgetType', 'typeOfInvestment', 'costEstCapex', 'costEstCapexType', 'typeBenefit', 'fxExchange']);
        //     this.DisableForm(['ram', 'jFactor', 'irr']);
        //     this.ValidateForm(['costEstCapex', 'irr', 'budgetType', 'typeBenefit']);
        //     break;
        // }
        this.InvestmentModal.hide();
    }

    GetUser() {
        this.authService.getMsalUser().subscribe((response) => {
            if (response) {
                this.username = response.mail;
                this.initiativeService
                if (this.page == "create") {
                    this.initiativesForm.get('createdBy').setValue(response.mail);
                }
                this.params.text = this.username;
                this.initiativeService.GetOwnersEmail(this.params).subscribe(owners => {
                    this.owners = owners;
                    // if (this.owners[0].companyShortTxt) {
                    //   this.initiativesForm.get('company').setValue(this.owners[0].companyShortTxt)
                    //   this.haveCompany = true;
                    // } else {
                    //   this.haveCompany = false;
                    // }

                    if (this.page === 'edit') {
                        if (!this.initiativesForm.get('company').value) {
                            if (this.owners[0].companyShortTxt) {
                                this.initiativesForm.get('company').setValue(this.owners[0].companyShortTxt)
                                this.haveCompany = true;
                            } else {
                                this.haveCompany = false;
                            }
                        }
                    }
                    else {
                        if (this.owners[0].companyShortTxt) {
                            this.initiativesForm.get('company').setValue(this.owners[0].companyShortTxt)
                            this.haveCompany = true;
                        } else {
                            this.haveCompany = false;
                        }
                    }

                    const owner = this.owners.filter(obj => {
                        return obj.email.toLowerCase().trim() === this.username.toLowerCase().trim();
                    });
                    this.GetCoDevelopers();
                    if (!this.id) {
                        this.initiativesForm.patchValue({
                            ownerName: owner[0].ownerName,
                            creatorName: owner[0].ownerName
                        });
                    }

                });
            }
        }, error => this.unauthorized.error(error));
    }

    GetCoDevelopers(Text?) {
        this.params.text = Text ? Text : '';
        this.initiativeService.GetCoDevelopers(this.params).subscribe(coDevelopers => {
            if (coDevelopers) {
                this.coDevelopers = coDevelopers;
                this.initiativeService.GetUser(this.username).subscribe(user => {
                    if (user.ownerName === this.initiativesForm.controls.ownerName.value) {
                        this.coDevelopers = this.coDevelopers.filter(obj => {
                            return obj.email ? obj.email.toLowerCase().trim() : null !== this.username.toLowerCase().trim();
                        });
                    }
                });
            }
        }, error => this.response.error(error));
    }

    GetOwners(Text?) {
        this.params.text = Text ? Text : '';
        this.initiativeService.GetOwners(this.params).subscribe(owners => {
            this.owners = owners;
        });
    }

    GetYears() {
        const year = new Date().getFullYear();
        this.years.push({
            name: year.toString(),
            value: year.toString()
        });
        for (let i = 1; i <= 5; i++) {
            this.years.push({
                name: (year - i).toString(),
                value: (year - i).toString()
            });
        }
        this.years.unshift({
            name: (year + 1).toString(),
            value: (year + 1).toString()
        });
    }

    SetRegisterDate() {
        const dateNow = new Date();
        const date = this.dateUtil.GetDate(dateNow);
        this.initiativesForm.patchValue({ registeringDate: date });
    }

    GetPlants() {
        try {
            let companyName = this.initiativesForm.get('company').value;
            return companyName ? this.companyList.find(x => x.value == companyName).plant : [];
            // this.initiativeService.GetPlants().subscribe(plants => this.plants = plants);
            // this.plants.push({ id: 9999, plantId: 'P9999', plantTitle: 'Others (please specify)' });
        }
        catch (err) {
            [];
        }
    }

    GetOrganizations() {
        try {
            let companyName = this.initiativesForm.get('company').value;
            return companyName ? this.companyList.find(x => x.value == companyName).org : [];
            // this.initiativeService.GetOrganizations().subscribe(organizations => this.organizations = organizations);
        } catch (err) {
            [];
        }
    }

    GetCompany() {
        // haveCompany
        if (this.initiativeService.company) {
            this.initiativesForm.get('company').patchValue(this.initiativeService.company);
            this.haveCompany = true;
        } else {
            this.haveCompany = false;
        }
        // this.companyList = this.companyList.find(x=>x.value == this.initiativeService.company);
        // this.initiativeService.GetCompany().subscribe(companyName => this.companyName = companyName);
    }

    GetTypeOfInvestments() {
        this.initiativeService.GetTypeOfInvestments().subscribe(typeOfInvestments => {
            this.typeOfInvestments = typeOfInvestments;
            // this.typeOfInvestments.push({ id: 9999, typeOfInvestmentId: 'Others', typeOfInvestmentTitle: 'Others' });
        });
    }

    DisabledButtonSave() {
        setTimeout(() => {
            this.isDisabledSubmit = false;
            this.isDisabledDraft = false;
        }, 1700);
    }

    EnabledButtonSave() {
        this.isDisabledSubmit = true;
        this.isDisabledDraft = true;
    }

    StartDateChange(value: Date): void {
        // this.dateStart = new Date(value);
        let startTime = new Date(value).getTime();
        if (isNaN(startTime) || startTime <= 0) {
            return;
        }
        this.bsConfigFinish.minDate = new Date(value);
        if (this.initiativeService.suggestion) {
            return;
        }
        this.initiativesForm.patchValue({ finishingDate: null });
        if (this.formGroup.get('DetailMaxForm') && this.formGroup.get('DetailMaxForm').get('baselineStartDate') && this.initiativeService.suggestionStatus.dim) {
            this.formGroup.get('DetailMaxForm').patchValue({ baselineStartDate: new Date(value) });
        }
        if (this.dataLoaded) {
            this.initiativeService.setGeneralData(this.formGroup.get('initiativesForm').value);
            this.reCalculateIrr();
        }
    }

    FinishChange(value: Date): void {
        let initiativesForm = this.formGroup.get('initiativesForm');
        let finishTime = new Date(value).getTime();
        let startTime = new Date(initiativesForm.get('startingDate').value).getTime();
        if (finishTime > 0) {
            if (startTime > finishTime) {
                this.initiativesForm.get('finishingDate').markAsTouched()
                // if (!(this.isDisabledSubmit || this.isDisabledDraft)) {
                this.dateFinish = null;
                this.initiativesForm.patchValue({ finishingDate: null });
                if (!this.initiativeService.viewMode && this.dataLoaded) {
                    this.swalTool.DateValid();
                }
                // }
            }

            if (this.formGroup.get('DetailMaxForm') && this.formGroup.get('DetailMaxForm').get('baselineFinishDate') && this.initiativeService.suggestionStatus.dim) {
                this.formGroup.get('DetailMaxForm').patchValue({ baselineFinishDate: new Date(value) });
            }
            if (this.dataLoaded) {
                this.CalculateIrr();
            }
        }
    }

    OnShowFinish() {
        this.initiativesForm.controls.finishingDate.clearValidators();
        this.initiativesForm.controls.finishingDate.updateValueAndValidity();
    }

    OnHiddenFinish() {
        if (!this.initiativesForm.controls.finishingDate.value) {
            this.initiativesForm.controls.finishingDate.setValidators([Validators.required]);
            this.initiativesForm.controls.finishingDate.updateValueAndValidity();
        }
    }

    SetMarkAsTouchedFormGeneral() {
        this.initiativesForm.controls.name.markAsTouched();
        this.initiativesForm.controls.year.markAsTouched();
        this.initiativesForm.controls.ownerName.markAsTouched();
        this.initiativesForm.controls.organization.markAsTouched();
        this.initiativesForm.controls.finishingDate.markAsTouched();
        this.initiativesForm.controls.plant.markAsTouched();
        this.initiativesForm.controls.background.markAsTouched();
        this.initiativesForm.controls.resultObjective.markAsTouched();
        this.initiativesForm.controls.scopeOfWork.markAsTouched();
        this.initiativesForm.controls.typeOfInvestment.markAsTouched();
        this.initiativesForm.controls.costEstCapex.markAsTouched();
        this.initiativesForm.controls.costEstOpex.markAsTouched();
        this.initiativesForm.controls.jFactor.markAsTouched();
        this.initiativesForm.controls.ram.markAsTouched();
        this.initiativesForm.controls.irr.markAsTouched();
        this.initiativesForm.controls.budgetType.markAsTouched();
        this.initiativesForm.controls.benefitAmount.markAsTouched();
        this.initiativesForm.controls.payBackPeriod.markAsTouched();
        this.initiativesForm.controls.typeBenefit.markAsTouched();
        this.initiativesForm.controls.fxExchange.markAsTouched();
        this.initiativesForm.controls.company.markAsTouched();
        this.initiativesForm.controls.budgetSource.markAsTouched();
    }

    ClearValidateFormGeneral() {
        return;
        //this.initiativesForm.controls.name.clearValidators();
        //this.initiativesForm.controls.name.updateValueAndValidity();
        //this.initiativesForm.controls.year.clearValidators();
        //this.initiativesForm.controls.year.updateValueAndValidity();
        //this.initiativesForm.controls.ownerName.clearValidators();
        //this.initiativesForm.controls.ownerName.updateValueAndValidity();
        //this.initiativesForm.controls.organization.clearValidators();
        //this.initiativesForm.controls.organization.updateValueAndValidity();
        //this.initiativesForm.controls.finishingDate.clearValidators();
        //this.initiativesForm.controls.finishingDate.updateValueAndValidity();
        //this.initiativesForm.controls.plant.clearValidators();
        //this.initiativesForm.controls.plant.updateValueAndValidity();
        //this.initiativesForm.controls.background.clearValidators();
        //this.initiativesForm.controls.background.updateValueAndValidity();
        //this.initiativesForm.controls.resultObjective.clearValidators();
        //this.initiativesForm.controls.resultObjective.updateValueAndValidity();
        //this.initiativesForm.controls.scopeOfWork.clearValidators();
        //this.initiativesForm.controls.scopeOfWork.updateValueAndValidity();
        //this.initiativesForm.controls.company.clearValidators();
        //this.initiativesForm.controls.company.updateValueAndValidity();
        //this.initiativesForm.controls.budgetSource.clearValidators();
        //this.initiativesForm.controls.budgetSource.updateValueAndValidity();
    }

    SetValidateFormGeneral() {
        return;
        //this.initiativesForm.controls.name.setValidators([Validators.required]);
        //this.initiativesForm.controls.name.updateValueAndValidity();
        //this.initiativesForm.controls.year.setValidators([Validators.required]);
        //this.initiativesForm.controls.year.updateValueAndValidity();
        //this.initiativesForm.controls.ownerName.setValidators([Validators.required]);
        //this.initiativesForm.controls.ownerName.updateValueAndValidity();
        //this.initiativesForm.controls.organization.setValidators([Validators.required]);
        //this.initiativesForm.controls.organization.updateValueAndValidity();
        //this.initiativesForm.controls.finishingDate.setValidators([Validators.required]);
        //this.initiativesForm.controls.finishingDate.updateValueAndValidity();
        //this.initiativesForm.controls.plant.setValidators([Validators.required]);
        //this.initiativesForm.controls.plant.updateValueAndValidity();
        //this.initiativesForm.controls.background.setValidators([Validators.required]);
        //this.initiativesForm.controls.background.updateValueAndValidity();
        //this.initiativesForm.controls.resultObjective.setValidators([Validators.required]);
        //this.initiativesForm.controls.resultObjective.updateValueAndValidity();
        //this.initiativesForm.controls.scopeOfWork.setValidators([Validators.required]);
        //this.initiativesForm.controls.scopeOfWork.updateValueAndValidity();
        //this.initiativesForm.controls.company.setValidators([Validators.required]);
        //this.initiativesForm.controls.company.updateValueAndValidity();
        //this.initiativesForm.controls.budgetSource.setValidators([Validators.required]);
        //this.initiativesForm.controls.budgetSource.updateValueAndValidity();
    }

    ShowForm(FormControl) {
        if (FormControl.indexOf('typeOfInvestment') !== -1) { this.showTypeOfInvestment = true; }
        if (FormControl.indexOf('budgetType') !== -1) { this.showBudget = true; }
        if (FormControl.indexOf('ram') !== -1) {
            this.showRam = true;
            this.validateService.showRam = true;
            this.CalculateRamAuto();
        }
        if (FormControl.indexOf('jFactor') !== -1) {
            this.showJFactor = true;
            this.validateService.showJFactor = true;
        }
        if (FormControl.indexOf('irr') !== -1) {
            this.showIrr = true;
            this.validateService.showIrr = true;
        }
        if (FormControl.indexOf('costEstCapex') !== -1) { this.showCostEstCapex = true; }
        if (FormControl.indexOf('costEstOpex') !== -1) { this.initiativeService.showCostEstOpex = true; }
        if (FormControl.indexOf('costEstCapexType') !== -1) { this.showCostEstCapexType = true; }
        if (FormControl.indexOf('costEstOpexType') !== -1) { this.showCostEstOpexType = true; }
        if (FormControl.indexOf('budgetSource') !== -1) { this.showBudgetSource = true; }
        if (FormControl.indexOf('typeBenefit') !== -1) { this.showTypeBenefit = true; }
        if (FormControl.indexOf('wacc') !== -1) { this.showWacc = true; }
        if (FormControl.indexOf('benefitAmount') !== -1) {
            this.showBenefitAmount = true;
            this.validateService.showBenefitAmount = true;
        }
        if (FormControl.indexOf('payBackPeriod') !== -1) { this.showPayBackPeriod = true; }
        if (FormControl.indexOf('fxExchange') !== -1) { this.showFxExchange = true; }
        if (FormControl.indexOf('divestment') !== -1) { this.showDivestment = true; }
    }



    HideForm(FormControl) {
        if (FormControl.indexOf('typeOfInvestment') !== -1) { this.showTypeOfInvestment = false; }
        if (FormControl.indexOf('budgetType') !== -1) { this.showBudget = false; }
        if (FormControl.indexOf('ram') !== -1) {
            this.showRam = false;
            this.validateService.showRam = false;
            // this.clearRamForm();
        }
        if (FormControl.indexOf('jFactor') !== -1) {
            this.showJFactor = false;
            this.validateService.showJFactor = false;
            // this.clearJFactorForm();
        }
        if (FormControl.indexOf('irr') !== -1) {
            this.showIrr = false;
            this.validateService.showIrr = false;
        }
        if (FormControl.indexOf('costEstCapex') !== -1) { this.showCostEstCapex = false; }
        if (FormControl.indexOf('costEstOpex') !== -1) { this.initiativeService.showCostEstOpex = false; }
        if (FormControl.indexOf('costEstCapexType') !== -1) { this.showCostEstCapexType = false; }
        if (FormControl.indexOf('costEstOpexType') !== -1) { this.showCostEstOpexType = false; }
        if (FormControl.indexOf('budgetSource') !== -1) { this.showBudgetSource = false; }
        if (FormControl.indexOf('typeBenefit') !== -1) { this.showTypeBenefit = false; }
        if (FormControl.indexOf('wacc') !== -1) { this.showWacc = false; }
        if (FormControl.indexOf('benefitAmount') !== -1) {
            this.showBenefitAmount = false;
            this.validateService.showBenefitAmount = false;
        }
        if (FormControl.indexOf('payBackPeriod') !== -1) { this.showPayBackPeriod = false; }
        if (FormControl.indexOf('fxExchange') !== -1) { this.showFxExchange = false; }
        if (FormControl.indexOf('divestment') !== -1) { this.showDivestment = false; }

    }

    EnableForm(FormControl) {
        // let formControl = ['typeOfInvestment', 'budgetType', 'ram',
        //   'jFactor', 'irr', 'fxExchange', 'costEstCapex',
        //   'costEstOpex', 'costEstCapexType', 'costEstOpexType',
        //   'budgetSource', 'typeBenefit', 'wacc', 'benefitAmount',
        //   'payBackPeriod', 'divestment'];
        // FormControl.forEach((control) => {
        //   if (!this.initiativeService.viewMode) {
        //     this.initiativesForm.get(control)?.enable();
        //   }
        // })

        if (!this.initiativeService.viewMode) {
            if (FormControl.indexOf('typeOfInvestment') !== -1) { this.initiativesForm.controls.typeOfInvestment.enable(); }
            if (FormControl.indexOf('budgetType') !== -1) { this.initiativesForm.controls.budgetType.enable(); }
            if (FormControl.indexOf('ram') !== -1) { this.initiativesForm.controls.ram.enable(); }
            if (FormControl.indexOf('jFactor') !== -1) { this.initiativesForm.controls.jFactor.enable(); }
            if (FormControl.indexOf('irr') !== -1) { this.initiativesForm.controls.irr.enable(); }
            if (FormControl.indexOf('fxExchange') !== -1) { this.initiativesForm.controls.fxExchange.enable(); }
            if (FormControl.indexOf('costEstCapex') !== -1) { this.initiativesForm.controls.costEstCapex.enable(); }
            if (FormControl.indexOf('costEstOpex') !== -1) { this.initiativesForm.controls.costEstOpex.enable(); }
            if (FormControl.indexOf('costEstCapexType') !== -1) { this.initiativesForm.controls.costEstCapexType.enable(); }
            if (FormControl.indexOf('costEstOpexType') !== -1) { this.initiativesForm.controls.costEstOpexType.enable(); }
            if (FormControl.indexOf('budgetSource') !== -1) { this.initiativesForm.controls.budgetSource.enable(); }
            if (FormControl.indexOf('typeBenefit') !== -1) { this.initiativesForm.controls.typeBenefit.enable(); }
            if (FormControl.indexOf('wacc') !== -1) { this.initiativesForm.controls.wacc.enable(); }
            if (FormControl.indexOf('benefitAmount') !== -1) { this.initiativesForm.controls.benefitAmount.enable(); }
            if (FormControl.indexOf('payBackPeriod') !== -1) { this.initiativesForm.controls.payBackPeriod.enable(); }
            if (FormControl.indexOf('divestment') !== -1) { this.initiativesForm.controls.divestment.enable(); }
        }
    }

    DisableForm(FormControl) {
        if (FormControl.indexOf('typeOfInvestment') !== -1) { this.initiativesForm.controls.typeOfInvestment.disable(); }
        if (FormControl.indexOf('budgetType') !== -1) { this.initiativesForm.controls.budgetType.disable(); }
        if (FormControl.indexOf('ram') !== -1) { this.initiativesForm.controls.ram.disable(); }
        // if (FormControl.indexOf('jFactor') !== -1) { this.initiativesForm.controls.jFactor.disable(); }
        if (FormControl.indexOf('irr') !== -1) { this.initiativesForm.controls.irr.disable(); }
        if (FormControl.indexOf('fxExchange') !== -1) { this.initiativesForm.controls.fxExchange.disable(); }
        if (FormControl.indexOf('costEstCapex') !== -1) { this.initiativesForm.controls.costEstCapex.disable(); }
        if (FormControl.indexOf('costEstOpex') !== -1) { this.initiativesForm.controls.costEstOpex.disable(); }
        if (FormControl.indexOf('costEstCapexType') !== -1) { this.initiativesForm.controls.costEstCapexType.disable(); }
        if (FormControl.indexOf('costEstOpexType') !== -1) { this.initiativesForm.controls.costEstOpexType.disable(); }
        if (FormControl.indexOf('budgetSource') !== -1) { this.initiativesForm.controls.budgetSource.disable(); }
        if (FormControl.indexOf('typeBenefit') !== -1) { this.initiativesForm.controls.typeBenefit.disable(); }
        if (FormControl.indexOf('wacc') !== -1) { this.initiativesForm.controls.wacc.disable(); }
        if (FormControl.indexOf('benefitAmount') !== -1) { this.initiativesForm.controls.benefitAmount.disable(); }
        if (FormControl.indexOf('payBackPeriod') !== -1) { this.initiativesForm.controls.payBackPeriod.disable(); }
        if (FormControl.indexOf('divestment') !== -1) { this.initiativesForm.controls.divestment.disable(); }

    }

    ValidateForm(FormControl) {
        if (FormControl.indexOf('typeOfInvestment') !== -1) {
            this.initiativesForm.controls.typeOfInvestment.setValidators([Validators.required]);
            this.initiativesForm.controls.typeOfInvestment.updateValueAndValidity();
        }
        if (FormControl.indexOf('budgetType') !== -1) {
            this.initiativesForm.controls.budgetType.setValidators([Validators.required]);
            this.initiativesForm.controls.budgetType.updateValueAndValidity();
        }
        // if (FormControl.indexOf('ram') !== -1) {
        //   this.initiativesForm.controls.ram.setValidators([Validators.required]);
        //   this.initiativesForm.controls.ram.updateValueAndValidity();
        // }
        // if (FormControl.indexOf('jFactor') !== -1) {
        //   this.initiativesForm.controls.jFactor.setValidators([Validators.required]);
        //   this.initiativesForm.controls.jFactor.updateValueAndValidity();
        // }
        if (FormControl.indexOf('irr') !== -1) {
            this.initiativesForm.controls.irr.setValidators([Validators.required]);
            this.initiativesForm.controls.irr.updateValueAndValidity();
        }
        if (FormControl.indexOf('fxExchange') !== -1 && this.initiativesForm.get('costEstCapexType').value == 'USD') {
            this.initiativesForm.controls.fxExchange.setValidators([Validators.required]);
            this.initiativesForm.controls.fxExchange.updateValueAndValidity();
        }
        if (FormControl.indexOf('costEstCapex') !== -1) {
            this.initiativesForm.controls.costEstCapex.setValidators([Validators.required]);
            this.initiativesForm.controls.costEstCapex.updateValueAndValidity();
        }
        if (FormControl.indexOf('costEstCapexType') !== -1) {
            this.initiativesForm.controls.costEstCapexType.setValidators([Validators.required]);
            this.initiativesForm.controls.costEstCapexType.updateValueAndValidity();
        }
        if (FormControl.indexOf('costEstOpex') !== -1) {
            this.initiativesForm.controls.costEstOpex.setValidators([Validators.required]);
            this.initiativesForm.controls.costEstOpex.updateValueAndValidity();
        }
        if (FormControl.indexOf('typeBenefit') !== -1) {
            this.initiativesForm.controls.typeBenefit.setValidators([Validators.required]);
            this.initiativesForm.controls.typeBenefit.updateValueAndValidity();
        }
        if (FormControl.indexOf('wacc') !== -1) {
            this.initiativesForm.controls.wacc.setValidators([Validators.required]);
            this.initiativesForm.controls.wacc.updateValueAndValidity();
        }
        if (FormControl.indexOf('benefitAmount') !== -1) {
            this.initiativesForm.controls.benefitAmount.setValidators([Validators.required]);
            this.initiativesForm.controls.benefitAmount.updateValueAndValidity();
        }
        if (FormControl.indexOf('payBackPeriod') !== -1) {
            this.initiativesForm.controls.payBackPeriod.setValidators([Validators.required]);
            this.initiativesForm.controls.payBackPeriod.updateValueAndValidity();
        }
    }

    ClearInitiativeForm(FormControl) {
        if (FormControl.indexOf('typeOfInvestment') !== -1) { this.initiativesForm.patchValue({ typeOfInvestment: null }); }
        if (FormControl.indexOf('budgetType') !== -1) { this.initiativesForm.patchValue({ budgetType: null }); }
        if (FormControl.indexOf('ram') !== -1) { this.initiativesForm.patchValue({ ram: null }); }
        // if (FormControl.indexOf('jFactor') !== -1) { this.initiativesForm.patchValue({ jFactor: null }); }
        // if (FormControl.indexOf('irr') !== -1) { this.initiativesForm.patchValue({ irr: null }); }
        if (FormControl.indexOf('fxExchange') !== -1) { this.initiativesForm.patchValue({ fxExchange: null }); }
        if (FormControl.indexOf('costEstCapex') !== -1) { this.initiativesForm.patchValue({ costEstCapex: null }); }
        if (FormControl.indexOf('costEstOpex') !== -1) { this.initiativesForm.patchValue({ costEstOpex: null }); }
        if (FormControl.indexOf('costEstCapexType') !== -1) { this.initiativesForm.patchValue({ costEstCapexType: null }); }
        if (FormControl.indexOf('costEstOpexType') !== -1) { this.initiativesForm.patchValue({ costEstOpexType: null }); }
        if (FormControl.indexOf('budgetSource') !== -1) { this.initiativesForm.patchValue({ budgetSource: null }); }
        if (FormControl.indexOf('typeBenefit') !== -1) { this.initiativesForm.patchValue({ typeBenefit: null }); }
        if (FormControl.indexOf('wacc') !== -1) { this.initiativesForm.patchValue({ wacc: null }); }
        if (FormControl.indexOf('benefitAmount') !== -1) { this.initiativesForm.patchValue({ benefitAmount: null }); }
        if (FormControl.indexOf('payBackPeriod') !== -1) { this.initiativesForm.patchValue({ payBackPeriod: null }); }
        if (FormControl.indexOf('divestment') !== -1) { this.initiativesForm.patchValue({ divestment: false }); }

    }

    ClearValidateForm(FormControl) {
        if (FormControl.indexOf('typeOfInvestment') !== -1) {
            this.initiativesForm.controls.typeOfInvestment.clearValidators();
            this.initiativesForm.controls.typeOfInvestment.updateValueAndValidity();
        }
        if (FormControl.indexOf('budgetType') !== -1) {
            this.initiativesForm.controls.budgetType.clearValidators();
            this.initiativesForm.controls.budgetType.updateValueAndValidity();
        }
        if (FormControl.indexOf('ram') !== -1) {
            this.initiativesForm.controls.ram.clearValidators();
            this.initiativesForm.controls.ram.updateValueAndValidity();
        }
        if (FormControl.indexOf('jFactor') !== -1) {
            this.initiativesForm.controls.jFactor.clearValidators();
            this.initiativesForm.controls.jFactor.updateValueAndValidity();
        }
        if (FormControl.indexOf('irr') !== -1) {
            this.initiativesForm.controls.irr.clearValidators();
            this.initiativesForm.controls.irr.updateValueAndValidity();
        }
        if (FormControl.indexOf('fxExchange') !== -1) {
            this.initiativesForm.controls.fxExchange.clearValidators();
            this.initiativesForm.controls.fxExchange.updateValueAndValidity();
        }
        if (FormControl.indexOf('costEstCapex') !== -1) {
            this.initiativesForm.controls.costEstCapex.clearValidators();
            this.initiativesForm.controls.costEstCapex.updateValueAndValidity();
        }
        if (FormControl.indexOf('costEstCapexType') !== -1) {
            this.initiativesForm.controls.costEstCapexType.clearValidators();
            this.initiativesForm.controls.costEstCapexType.updateValueAndValidity();
        }
        if (FormControl.indexOf('costEstOpex') !== -1) {
            this.initiativesForm.controls.costEstOpex.clearValidators();
            this.initiativesForm.controls.costEstOpex.updateValueAndValidity();
        }
        if (FormControl.indexOf('typeBenefit') !== -1) {
            this.initiativesForm.controls.typeBenefit.clearValidators();
            this.initiativesForm.controls.typeBenefit.updateValueAndValidity();
        }
        if (FormControl.indexOf('wacc') !== -1) {
            this.initiativesForm.controls.wacc.clearValidators();
            this.initiativesForm.controls.wacc.updateValueAndValidity();
        }
        if (FormControl.indexOf('benefitAmount') !== -1) {
            this.initiativesForm.controls.benefitAmount.clearValidators();
            this.initiativesForm.controls.benefitAmount.updateValueAndValidity();
        }
        if (FormControl.indexOf('payBackPeriod') !== -1) {
            this.initiativesForm.controls.payBackPeriod.clearValidators();
            this.initiativesForm.controls.payBackPeriod.updateValueAndValidity();
        }
    }

    EnableSuggest(FormControl) {
        if (FormControl.indexOf('cim') !== -1) { this.initiativesForm.controls.cim.enable(); }
        if (FormControl.indexOf('pim') !== -1) { this.initiativesForm.controls.pim.enable(); }
        if (FormControl.indexOf('dim') !== -1) { this.initiativesForm.controls.dim.enable(); }
        if (FormControl.indexOf('max') !== -1) { this.initiativesForm.controls.max.enable(); }
        if (FormControl.indexOf('cpi') !== -1) { this.initiativesForm.controls.cpi.enable(); }
        if (FormControl.indexOf('randD') !== -1) { this.initiativesForm.controls.randD.enable(); }
        if (FormControl.indexOf('other') !== -1) { this.initiativesForm.controls.other.enable(); }
        if (FormControl.indexOf('strategy') !== -1) { this.initiativesForm.controls.strategy.enable(); }
        if (FormControl.indexOf('directCapex') !== -1) { this.initiativesForm.controls.directCapex.enable(); }
    }

    DisableSuggest(FormControl) {
        if (FormControl.indexOf('cim') !== -1) { this.initiativesForm.controls.cim.disable(); }
        if (FormControl.indexOf('pim') !== -1) { this.initiativesForm.controls.pim.disable(); }
        if (FormControl.indexOf('dim') !== -1) { this.initiativesForm.controls.dim.disable(); }
        if (FormControl.indexOf('max') !== -1) { this.initiativesForm.controls.max.disable(); }
        if (FormControl.indexOf('cpi') !== -1) { this.initiativesForm.controls.cpi.disable(); }
        if (FormControl.indexOf('randD') !== -1) { this.initiativesForm.controls.randD.disable(); }
        if (FormControl.indexOf('other') !== -1) { this.initiativesForm.controls.other.disable(); }
        if (FormControl.indexOf('strategy') !== -1) { this.initiativesForm.controls.strategy.disable(); }
        if (FormControl.indexOf('directCapex') !== -1) { this.initiativesForm.controls.directCapex.disable(); }
    }

    ClearSuggest(FormControl) {
        if (FormControl.indexOf('cim') !== -1) { this.initiativesForm.controls.cim.setValue(false); this.IsCim = false }
        if (FormControl.indexOf('pim') !== -1) { this.initiativesForm.controls.pim.setValue(false); this.IsPim = false }
        if (FormControl.indexOf('dim') !== -1) { this.initiativesForm.controls.dim.setValue(false); this.IsDim = false }
        if (FormControl.indexOf('max') !== -1) { this.initiativesForm.controls.max.setValue(false); this.IsMax = false }
        if (FormControl.indexOf('cpi') !== -1) { this.initiativesForm.controls.cpi.setValue(false); this.IsCpi = false }
        if (FormControl.indexOf('randD') !== -1) { this.initiativesForm.controls.randD.setValue(false); this.IsRandD = false }
        if (FormControl.indexOf('other') !== -1) { this.initiativesForm.controls.other.setValue(false); this.IsOther = false }
        if (FormControl.indexOf('strategy') !== -1) { this.initiativesForm.controls.strategy.setValue(false); this.IsStrategy = false }
        if (FormControl.indexOf('directCapex') !== -1) { this.initiativesForm.controls.directCapex.setValue(false); this.IsCapex = false }
    }



    //SetShowForm() {
    //  this.ShowForm(['typeOfInvestment', 'budgetType', 'ram', 'jFactor', 'irr', 'fxExchange', 'costEstCapex',
    //    'costEstCapexType', 'typeBenefit']);
    //  this.HideForm(['wacc', 'benefitAmount', 'payBackPeriod']);
    //}

    SetValidateForm() {
        this.ValidateForm(['typeOfInvestment']);
        this.ClearValidateForm(['costEstCapex', 'costEstOpex', 'jFactor', 'ram', 'irr', 'budgetType', 'typeBenefit', 'fxExchange']);
    }

    SetMarkAsUntouchedForm() {
        this.initiativesForm.controls.costEstCapex.markAsUntouched();
        this.initiativesForm.controls.costEstOpex.markAsUntouched();
        this.initiativesForm.controls.jFactor.markAsUntouched();
        this.initiativesForm.controls.ram.markAsUntouched();
        this.initiativesForm.controls.irr.markAsUntouched();
        this.initiativesForm.controls.budgetType.markAsUntouched();
        this.initiativesForm.controls.typeBenefit.markAsUntouched();
        this.initiativesForm.controls.fxExchange.markAsUntouched();
    }

    SetMarkAsTouchedForm() {
        this.initiativesForm.controls.typeOfInvestment.markAsTouched();
        this.initiativesForm.controls.costEstCapex.markAsTouched();
        this.initiativesForm.controls.costEstOpex.markAsTouched();
        this.initiativesForm.controls.jFactor.markAsTouched();
        this.initiativesForm.controls.ram.markAsTouched();
        this.initiativesForm.controls.irr.markAsTouched();
        this.initiativesForm.controls.budgetType.markAsTouched();
        this.initiativesForm.controls.benefitAmount.markAsTouched();
        this.initiativesForm.controls.payBackPeriod.markAsTouched();
        this.initiativesForm.controls.typeBenefit.markAsTouched();
        this.initiativesForm.controls.fxExchange.markAsTouched();
    }

    OnChangeTypeOfBenefit() {
        const requestCapex = this.initiativesForm.controls.requestCapex.value;
        const typeBenefit = this.initiativesForm.controls.typeBenefit.value;
        if (typeBenefit !== 'NON-FINANCIAL') {
            this.ValidateForm(['benefitAmount']);
            if (requestCapex === 'true') {
                this.ValidateForm(['payBackPeriod']);
            }
            this.ShowForm(['benefitAmount', 'payBackPeriod']);
            this.EnableForm(['benefitAmount', 'payBackPeriod']);
        } else {
            this.initiativesForm.patchValue({ benefitAmount: '', payBackPeriod: '' });
            this.ClearValidateForm(['benefitAmount', 'payBackPeriod']);
            this.HideForm(['benefitAmount', 'payBackPeriod']);
            this.DisableForm(['benefitAmount', 'payBackPeriod']);
        }
    }

    SetEnableFrom() {
        this.EnableForm([
            'typeOfInvestment', 'budgetType', 'ram', 'irr', 'wacc', 'costEstCapex',
            'costEstCapexType', 'typeBenefit', 'benefitAmount', 'payBackPeriod', 'fxExchange', 'budgetSource'
        ]);
    }

    PatchForm() {
        this.initiativesForm.patchValue({
            costEstCapexType: 'THB',
            typeBenefit: '',
            payBackPeriod: '',
            benefitAmount: '',
            irr: '',
            budgetType: '',
            ram: '',
            jFactor: ''
        });
    }

    PatchFormType() {
        this.initiativesForm.patchValue({
            typeBenefit: '',
            payBackPeriod: '',
            benefitAmount: '',
            irr: '',
            budgetType: '',
            ram: '',
            jFactor: ''
        });
    }

    OnChangeTypeOfInvestment() {
        this.PatchFormType();
        //this.SetShowForm();
        this.SetValidateForm();
        this.SetMarkAsUntouchedForm();
        this.SetEnableFrom();
        this.CheckModalTypeOfInvestment();
        this.CheckTypeOfInvestment(this.initiativesForm.controls.typeOfInvestment.value);
        this.OnChangeCostEstimated();
    }

    OnChangeDivestment() {
        this.initiativesForm.controls.typeOfInvestment.enable()
        this.initiativesForm.controls.typeOfInvestment.patchValue('Divestment')
    }

    CheckModalTypeOfInvestment() {
        switch (this.initiativesForm.controls.typeOfInvestment.value) {
            case 'Maintain Reliability':
                this.InvestmentModal.show();
                break;
            case 'Replacement':
                this.InvestmentModal.show();
                break;
        }
    }

    CheckTypeOfInvestment(typeOfInvestment) {
        switch (typeOfInvestment) {
            case 'Maintain Reliability':
                this.replace = 'not-in-kind';
                this.obsolate = 'no';
                this.confirmText = 'Maintain Reliability';
                this.HideForm(['ram', 'budgetType', 'wacc']);
                this.DisableForm(['ram', 'jFactor', 'budgetType']);
                this.ShowForm(['typeOfInvestment', 'irr', 'costEstCapex', 'costEstCapexType', 'typeBenefit']);
                // this.ShowForm(['fxExchange']);
                this.ValidateForm(['costEstCapex', 'costEstOpex', 'irr', 'typeBenefit']);
                break;
            case 'Replacement':
                this.replace = 'in-kind';
                this.obsolate = 'yes';
                this.confirmText = 'Replacement';
                this.HideForm(['ram', 'irr', 'wacc']);
                this.DisableForm(['ram', 'irr']);
                this.ShowForm(['typeOfInvestment', 'budgetType', 'costEstCapex', 'costEstCapexType', 'typeBenefit']);
                // this.ShowForm(['fxExchange']);
                this.ValidateForm(['costEstCapex', 'costEstOpex', 'irr', 'budgetType', 'typeBenefit']);
                break;
            case 'CSR':
            case 'Digital CAPEX':
            case 'IT CAPEX':
            case 'Turnaround':
            case 'Others':
            case 'Overhaul':
            case 'R&D':
            case 'Lab & Quality':
            case 'Technical Support for R&D':
            case 'Welfare':
                this.HideForm(['ram', 'irr', 'budgetType', 'wacc', 'benefitAmount', 'payBackPeriod']);
                this.DisableForm(['ram', 'irr', 'budgetType', 'wacc', 'benefitAmount', 'payBackPeriod']);
                this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType', 'typeBenefit']);
                // this.ShowForm(['fxExchange']);
                // this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                this.ValidateForm(['costEstCapex', 'costEstOpex', 'typeBenefit']);
                break;
            case 'Engineering Request ER':
                this.HideForm(['ram', 'irr', 'wacc']);
                this.DisableForm(['ram', 'irr']);
                this.ShowForm(['typeOfInvestment', 'budgetType', 'costEstCapex', 'costEstCapexType', 'typeBenefit']);
                // this.ShowForm(['fxExchange']);
                // this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                this.ValidateForm(['costEstCapex', 'costEstOpex', 'budgetType', 'typeBenefit']);
                break;
            case 'CVC':
                this.HideForm(['ram', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'payBackPeriod']);
                this.DisableForm(['ram', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);
                this.ShowForm(['fxExchange']);
                this.ValidateForm(['fxExchange', 'costEstCapex', 'costEstOpex']);
                this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                break;
            case 'Divestment':
                this.HideForm(['ram', 'irr', 'budgetType', 'wacc', 'typeBenefit']);//, 'fxExchange'
                this.DisableForm(['ram', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);//, 'fxExchange'
                this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                this.initiativesForm.patchValue({ costEstCapexType: 'THB' });
                this.OnchangeCostEstCapexType();
                this.ValidateForm(['costEstCapex', 'costEstOpex']);
                break;
            case 'M&A':
                this.HideForm(['ram', 'irr', 'budgetType', 'wacc', 'typeBenefit']);//, 'fxExchange'
                this.DisableForm(['ram', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);//, 'fxExchange'
                this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                // this.initiativesForm.patchValue({ costEstCapexType: 'THB' });
                this.ValidateForm(['costEstCapex', 'costEstOpex']);
                break;
            case 'Growth: Backbone':
            case 'Growth: New business':
            case 'Growth: Build International Competitive base':
            case 'Growth: Diversify to performance chemicals':
            case 'Growth: Enhance green':
            case 'Sustain Core: Synergy':
            case 'Sustain Core: Operational Excellence':
            case 'Sustain Core: Marketing Excellence':
            case 'Sustain Core: Debot/Expansion':
            case 'Sustain Core: Chain Integration':
            case 'Sustain Core: New derivative':
            case 'Sustain Core: Map ta put retrofit':
                this.HideForm(['ram', 'budgetType', 'wacc']);
                this.DisableForm(['budgetType', 'ram', 'jFactor']);
                this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType', 'typeBenefit']);
                // this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                this.ValidateForm(['costEstCapex', 'costEstOpex', 'typeBenefit']);
                break;
            case 'Sustain Core: Energy saving':
                this.HideForm(['ram', 'budgetType']);
                this.DisableForm(['budgetType', 'ram']);
                this.ShowForm(['typeOfInvestment', 'wacc', 'costEstCapex', 'costEstCapexType', 'typeBenefit']);
                // this.ShowForm(['fxExchange']);
                this.EnableForm(['wacc']);
                this.ValidateForm(['costEstCapex', 'costEstOpex', 'irr', 'typeBenefit']);
                break;
            case 'Safety':
            case 'Environment':
            case 'Law & Regulation':
                this.HideForm(['irr', 'typeBenefit', 'budgetType', 'wacc']);
                this.DisableForm(['budgetType', 'irr', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);
                this.ShowForm(['typeOfInvestment', 'ram', 'costEstCapex', 'costEstCapexType']);
                // this.ShowForm(['fxExchange']);
                this.ValidateForm(['jFactor', 'ram', 'costEstCapex', 'costEstOpex', 'typeBenefit']);
                break;
            default:
                this.HideForm(['ram', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'fxExchange']);
                this.DisableForm(['ram', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod', 'fxExchange']);
                this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                this.initiativesForm.patchValue({ costEstCapexType: 'THB' });
                this.ValidateForm(['costEstCapex', 'costEstOpex']);
                break;
        }
    }

    CalculateUSD() {
        const costEstCapex = this.initiativesForm.controls.costEstCapex.value;
        const fx = this.initiativesForm.controls.fxExchange.value;
        switch (this.initiativesForm.controls.costEstCapexType.value) {
            case 'USD':
                this.ValidateForm(['costEstCapex', 'fxExchange']);
                if (this.initiativesForm.controls.costEstCapexType.value === 'USD') {
                    if (fx) {
                        const result = costEstCapex * fx;
                        this.costEstCapex = Math.round(result * 100) / 100;
                        if (result > 300) {
                            this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                            this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                        } else {
                            this.ShowForm(['typeBenefit']);
                            this.EnableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
                        }
                    } else {
                        this.costEstCapex = costEstCapex;
                    }
                    this.costEstCapexType = 'THB';
                }
                break;
        }
    }

    CalculatePayBackPeriod() {
        switch (this.initiativesForm.controls.costEstCapexType.value) {
            case 'USD':
                const fx = this.initiativesForm.controls.fxExchange.value;
                this.costEstCapex = this.initiativesForm.controls.costEstCapex.value * fx;
                break;
            case 'THB':
                this.costEstCapex = this.initiativesForm.controls.costEstCapex.value;
                break;
            default:
                this.costEstCapex = 0.00;
                break;
        }
        switch (this.initiativesForm.controls.costEstOpexType.value) {
            case 'USD':
                const fx = this.initiativesForm.controls.fxExchange.value;
                this.costEstOpex = this.initiativesForm.controls.costEstOpex.value * fx;
                break;
            case 'THB':
                this.costEstOpex = this.initiativesForm.controls.costEstOpex.value;
                break;
            default:
                this.costEstOpex = 0.00;
                break;
        }
        const benefitAmount = this.initiativesForm.controls.benefitAmount.value;
        const result = (Number(this.costEstCapex) + Number(this.costEstOpex)) / Number(benefitAmount);
        this.initiativesForm.patchValue({ payBackPeriod: isFinite(result) ? result.toFixed(2) : null });
        // let projectCost = this.formGroup.get('capexInformationForm')?.get("projectCost").value
        // if (projectCost && projectCost.toString().length <= 0) {
        //   this.formGroup.get('capexInformationForm')?.patchValue({ projectCost: this.costEstCapex != null ? parseFloat(this.costEstCapex).toFixed(2) : null });
        // }
    }

    OnChangeCostEstimated() {
        this.costEstCapex = this.initiativesForm.controls.costEstCapex.value ? parseFloat(this.initiativesForm.controls.costEstCapex.value) : 0;
        switch (this.initiativesForm.controls.typeOfInvestment.value) {
            case 'CVC':
            case 'Divestment':
            case 'M&A':
                this.HideForm(['ram', 'irr', 'budgetType', 'wacc', 'typeBenefit']);
                this.DisableForm(['ram', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);
                this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                this.ValidateForm(['costEstCapex', 'costEstOpex']);
                break;
            case 'Sustain Core: Energy saving':
                if (this.costEstCapex > 300) {
                    this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc']);
                    this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
                    this.initiativesForm.patchValue({ typeBenefit: '' });
                } else {
                    this.ShowForm(['typeBenefit', 'irr']);
                    this.EnableForm(['typeBenefit', 'irr']);
                }
                break;
            case 'Maintain Reliability':
            case 'Replacement':
            case 'Turnaround':
            case 'Lab & Quality':
            case 'Technical Support for R&D':
            case 'R&D':
            case 'Overhaul':
            case 'CSR':
            case 'Welfare':
            case 'Environment':
            case 'Engineering Request ER':
            case 'Safety':
            case 'Others':
                if (this.costEstCapex > 300) {
                    this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc']);
                    this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
                    this.initiativesForm.patchValue({ typeBenefit: '' });
                } else {
                    this.ShowForm(['typeBenefit']);
                    this.EnableForm(['typeBenefit']);
                }
                break;
            case 'Growth: Backbone':
            case 'Growth: New business':
            case 'Growth: Build International Competitive base':
            case 'Growth: Diversify to performance chemicals':
            case 'Growth: Enhance green':
            case 'Sustain Core: Synergy':
            case 'Sustain Core: Operational Excellence':
            case 'Sustain Core: Marketing Excellence':
            case 'Sustain Core: Debot/Expansion':
            case 'Sustain Core: Chain Integration':
            case 'Sustain Core: New derivative':
            case 'Sustain Core: Map ta put retrofit':
                if (this.costEstCapex > 300) {
                    this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                    this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                    this.initiativesForm.patchValue({ typeBenefit: '' });
                } else {
                    this.ShowForm(['irr', 'typeBenefit']);
                    this.EnableForm(['irr', 'typeBenefit']);
                }
                break;
            case 'Digital CAPEX':
            case 'Law & Regulation':
            case 'IT CAPEX':
                if (this.costEstCapex > 300) {
                    this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                    this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                    this.initiativesForm.patchValue({ typeBenefit: '' });
                } else {
                    this.ShowForm(['typeBenefit']);
                    this.EnableForm(['typeBenefit']);
                }
                break;
        }
        // this.CalculateUSD();
        // this.OnChangeTypeOfInvestment();
        this.CalculatePayBackPeriod();
    }

    OnChangeCostOPEX() {
        this.CalculatePayBackPeriod();
    }

    OnChangeBenefitAmount() {
        this.CalculatePayBackPeriod();
    }

    OnchangeCostEstCapexType() {
        const costEstCapex = this.initiativesForm.controls.costEstCapex.value;
        const fx = this.initiativesForm.controls.fxExchange.value;
        switch (this.initiativesForm.controls.costEstCapexType.value) {
            case 'USD':
                this.ValidateForm(['costEstCapex', 'fxExchange']);
                if (fx) {
                    const result = costEstCapex * fx;
                    this.costEstCapex = Math.round(result * 100) / 100;
                    if (result > 300) {
                        this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                        this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                    }
                } else {
                    this.costEstCapex = costEstCapex;
                }
                this.costEstCapexType = 'USD';
                this.ShowForm(['fxExchange']);
                this.EnableForm(['fxExchange']);
                this.chooseUSD = true;
                break;
            case 'THB':
                if (this.initiativesForm.get('typeOfInvestment').value == 'CVC') {
                    this.swalTool.ErrorText(this.initiativesForm.get('typeOfInvestment').value + ' Warning!!', this.initiativesForm.get('typeOfInvestment').value + ' is required to have FX Exchange as USD.');
                    this.initiativesForm.get('costEstCapexType').setValue('USD');
                    break;
                }
                else {
                    this.costEstCapexType = 'THB';
                    this.CalculatePayBackPeriod();
                    this.SetValidateForm();
                    this.ValidateForm(['costEstCapex']);
                    if (this.initiativesForm.controls.costEstOpexType.value == 'THB') {
                        this.HideForm(['fxExchange']);
                        this.DisableForm(['fxExchange']);
                        this.chooseUSD = false;
                    }
                    break;
                }
        }
        this.OnChangeCostEstimated();
    }

    OnchangeCostEstOpexType() {
        const costEstOpex = this.initiativesForm.controls.costEstOpex.value;
        const fx = this.initiativesForm.controls.fxExchange.value;
        switch (this.initiativesForm.controls.costEstOpexType.value) {
            case 'USD':
                this.ValidateForm(['costEstOpex', 'fxExchange']);
                // if (this.initiativesForm.controls.costEstOpexType.value === 'USD') {
                if (fx) {
                    const result = costEstOpex * fx;
                    this.costEstOpex = Math.round(result * 100) / 100;
                } else {
                    this.costEstOpex = costEstOpex;
                }
                this.costEstOpexType = 'THB';
                // }
                this.ShowForm(['fxExchange']);
                this.EnableForm(['fxExchange']);
                this.chooseUSD = true;
                break;
            case 'THB':

                this.CalculatePayBackPeriod();
                this.SetValidateForm();
                this.ValidateForm(['costEstOpex']);
                if (this.initiativesForm.controls.costEstCapexType.value == 'THB') {
                    this.HideForm(['fxExchange']);
                    this.DisableForm(['fxExchange']);
                    this.chooseUSD = false;
                }
                break;

        }
    }

    OnChangeFx() {
        const costEstCapex = this.initiativesForm.controls.costEstCapex.value;
        const fx = this.initiativesForm.controls.fxExchange.value;
        switch (this.initiativesForm.controls.costEstCapexType.value) {
            case 'USD':
                this.ValidateForm(['costEstCapex', 'fxExchange']);
                if (this.initiativesForm.controls.costEstCapexType.value === 'USD' &&
                    this.initiativesForm.controls.typeOfInvestment.value !== 'CVC') {
                    if (fx) {
                        const result = costEstCapex * fx;
                        this.costEstCapex = Math.round(result * 100) / 100;
                        if (result > 300) {
                            this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                            this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                        } else {
                            this.ShowForm(['typeBenefit', 'irr']);
                            this.EnableForm(['typeBenefit', 'irr']);
                        }
                    } else {
                        this.costEstCapex = costEstCapex;
                    }
                    this.costEstCapexType = 'THB';
                }
                break;
            case 'THB':
                this.CalculatePayBackPeriod();
                this.SetValidateForm();
                this.HideForm(['fxExchange']);
                this.ValidateForm(['costEstCapex', 'typeBenefit']);
                break;

        }
    }

    CheckCostEstCapexType(costEstCapexType) {
        const typeOfInvestment = this.initiativesForm.controls.typeOfInvestment.value;
        const costEstCapex = this.initiativesForm.controls.costEstCapex.value;
        const fx = this.initiativesForm.controls.fxExchange.value;
        if (typeOfInvestment === 'CVC') {
            if (costEstCapexType === 'THB') {
                if (fx) {
                    const result = costEstCapex / fx;
                    this.costEstCapex = Math.round(result * 100) / 100;
                } else {
                    this.costEstCapex = costEstCapex;
                }
                this.costEstCapexType = 'USD';
            } else {
                this.costEstCapex = costEstCapex * fx;
                this.costEstCapex = Math.round(costEstCapex * 100) / 100;
            }
        } else {
            if (costEstCapexType === 'USD') {
                if (fx) {
                    const result = costEstCapex * fx;
                    this.costEstCapex = Math.round(result * 100) / 100;
                    if (result > 300) {
                        this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                        this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                    }
                } else {
                    this.costEstCapex = costEstCapex;
                }
                this.costEstCapexType = 'THB';
            }
        }
    }

    CheckCim(event) {
        if (!this.IsSuggested) {
            this.IsCim = event.target.checked ? true : false;
            if (event.target.checked) {
                this.initiativesForm.patchValue({ cim: true });
            } else {
                this.initiativesForm.patchValue({ cim: false });
            }
        }
        else {
            return false;
        }
    }

    CheckPim(event) {
        if (!this.IsSuggested) {
            this.IsPim = event.target.checked ? true : false;
        }
        else {
            return false;
        }
    }

    CheckDim(event) {
        if (!this.IsSuggested) {
            this.IsDim = event.target.checked ? true : false;
        }
        else {
            return false;
        }
    }

    CheckCapex(event) {
        if (!this.IsSuggested) { this.IsCapex = event.target.checked ? true : false; }
        else {
            return false;
        }
    }

    CheckMax(event) {
        if (!this.IsSuggested) {
            this.IsMax = event.target.checked ? true : false;
            if (event.target.checked === false) {
                if (this.IsDim) { this.initiativesForm.patchValue({ initiativeType: 'dim' }); }
                if (this.IsPim) { this.initiativesForm.patchValue({ initiativeType: 'pim' }); }
                if (this.IsCapex) { this.initiativesForm.patchValue({ initiativeType: 'directCapex' }); }
                if (this.IsCpi) { this.initiativesForm.patchValue({ initiativeType: 'cpi' }); }
                if (this.IsStrategy) { this.initiativesForm.patchValue({ initiativeType: 'strategy' }); }
                if (this.IsRandD) { this.initiativesForm.patchValue({ initiativeType: 'randD' }); }
                if (this.IsOther) { this.initiativesForm.patchValue({ initiativeType: 'other' }); }
            } else {
                if (this.IsDim) { this.initiativesForm.patchValue({ initiativeType: 'dim,max' }); }
                if (this.IsPim) { this.initiativesForm.patchValue({ initiativeType: 'pim,max' }); }
                //if (this.IsCapex)    { this.initiativesForm.patchValue({ initiativeType: 'directCapex,max' }); }
                if (this.IsCapex) { this.initiativesForm.patchValue({ initiativeType: 'max' }); }
                if (this.IsCpi) { this.initiativesForm.patchValue({ initiativeType: 'cpi,max' }); }
                if (this.IsStrategy) { this.initiativesForm.patchValue({ initiativeType: 'strategy,max' }); }
                if (this.IsRandD) { this.initiativesForm.patchValue({ initiativeType: 'randD,max' }); }
                if (this.IsOther) { this.initiativesForm.patchValue({ initiativeType: 'other,max' }); }
            }
        }
        else {
            return false;
        }
    }

    CheckCpi(event) {
        if (!this.IsSuggested) {
            if (event.target.checked) {
                this.DisableSuggest(['strategy', 'randD', 'other']);
                this.ClearSuggest(['strategy', 'randD', 'other']);

                this.IsCpi = true;
                this.initiativesForm.patchValue({ cpi: true, initiativeType: this.IsMax ? 'cpi,max' : 'cpi' });
            } else {
                this.EnableSuggest(['strategy', 'randD', 'other']);
                this.IsCpi = false;
                this.initiativesForm.patchValue({ cpi: false, initiativeType: null });
            }
        }
        else {
            return false;
        }
    }

    CheckStrategy(event) {
        if (!this.IsSuggested) {
            if (event.target.checked) {
                this.DisableSuggest(['cpi', 'randD', 'other']);
                this.ClearSuggest(['cpi', 'randD', 'other']);

                this.IsStrategy = true;
                this.initiativesForm.patchValue({ strategy: true, initiativeType: this.IsMax ? 'strategy,max' : 'strategy' });
            } else {
                this.EnableSuggest(['cpi', 'randD', 'other']);
                this.IsStrategy = false;
                this.initiativesForm.patchValue({ strategy: false, initiativeType: null });
            }
        }
        else {
            return false;
        }
    }

    CheckRAndD(event) {
        if (!this.IsSuggested) {
            if (event.target.checked) {
                this.DisableSuggest(['cpi', 'strategy', 'other']);
                this.ClearSuggest(['cpi', 'strategy', 'other']);

                this.IsRandD = true;
                this.initiativesForm.patchValue({ randD: true, initiativeType: this.IsMax ? 'randD,max' : 'randD' });
            } else {
                this.EnableSuggest(['cpi', 'strategy', 'other']);
                this.IsRandD = false;
                this.initiativesForm.patchValue({ randD: false, initiativeType: null });
            }
        }
        else {
            return false;
        }
    }

    CheckOther(event) {
        if (!this.IsSuggested) {
            if (event.target.checked) {
                //this.DisableSuggest(['cpi', 'strategy', 'randD']);
                this.IsOther = true;
                this.initiativesForm.patchValue({ other: true, initiativeType: this.IsMax ? 'other,max' : 'other' });
            } else {
                this.EnableSuggest(['cpi', 'strategy', 'randD']);
                this.IsOther = false;
                this.initiativesForm.patchValue({ other: false, initiativeType: null });
            }
        }
        else {
            return false;
        }
    }

    onChangeInvolveITDigital() {
        this.ClearSuggestion();
    }

    ClearSuggestion() {
        if (this.stage) {
            return;
        }
        this.initiativeService.suggestion = false;
        this.DisableSuggest(['pim', 'cim', 'max', 'directCapex', 'dim', 'cpi', 'strategy', 'randD', 'other']);
        this.IsPim = false;
        this.initiativesForm.patchValue({ pim: false });
        this.IsCim = false;
        this.initiativesForm.patchValue({ cim: false });
        this.IsMax = false;
        this.initiativesForm.patchValue({ max: false });
        this.IsCapex = false;
        this.initiativesForm.patchValue({ directCapex: false });
        this.IsDim = false;
        this.initiativesForm.patchValue({ dim: false });
        this.IsCpi = false;
        this.initiativesForm.patchValue({ cpi: false });
        this.IsStrategy = false;
        this.initiativesForm.patchValue({ strategy: false });
        this.IsRandD = false;
        this.initiativesForm.patchValue({ randD: false });
        this.IsOther = false;
        this.initiativesForm.patchValue({ other: false });
    }


    convertBenefit() {
        //parseFloat('100,000.00'.replace(/,/g, ''))
        let typeBenefitValue = this.initiativesForm.get('benefitAmount').value;
        if (typeBenefitValue && !isNaN(parseFloat(typeBenefitValue))) {

            this.typeBenefitValue = parseFloat(typeBenefitValue.replace(/,/g, '')).toFixed(3);
            //this.initiativeService.benefitAmount = parseFloat(typeBenefitValue.replace(/,/g, '')).toFixed(3);
            // this.initiativesForm.get('benefitAmount').patchValue(parseFloat(typeBenefitValue).toFixed(3));
            this.RequestCapexHideShowCheck();
        }
        // }

    }

    keyPress(event: any) {
        // const pattern = /[0-9]{1,2}([.][0-9]{1,2})/;
        const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
        if (isNaN(parseFloat(inputChar)) && inputChar != '.') {
            event.preventDefault();
        }
    }



    HideShowField() {
        if (this.dataLoaded && this.initiativesForm.get('useIrrCalculate')?.value) {
            this.reCalculateIrr();
        }
        let requestCapex = this.initiativesForm.get('requestCapex')?.value;
        let costEstCapex = this.initiativesForm.get('costEstCapex')?.value;
        // let costEstCapexType = this.initiativesForm.get('costEstCapexType')?.value;
        // let divestment = this.initiativesForm.get('divestment')?.value;
        // let fxExchange = this.initiativesForm.get('fxExchange')?.value;
        let typeOfInvestment = this.initiativesForm.get('typeOfInvestment')?.value;
        let typeBenefit = this.initiativesForm.get('typeBenefit')?.value;
        let benefitAmount = this.initiativesForm.get('benefitAmount')?.value;
        // this.OnChangeCostEstimated();

        // this.OnchangeCostEstCapexType();
        if (requestCapex === 'true') {
            let cost = 0;
            const fx = this.initiativesForm.controls.fxExchange.value;
            switch (this.initiativesForm.controls.costEstCapexType.value) {
                case 'USD':
                    this.ValidateForm(['costEstCapex', 'fxExchange']);
                    if (fx) {
                        cost = costEstCapex * fx;
                        this.costEstCapex = Math.round(cost * 100) / 100;
                        if (cost > 300) {
                            this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
                            this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
                        }
                    } else {
                        this.costEstCapex = costEstCapex;
                    }
                    this.costEstCapexType = 'USD';
                    this.ShowForm(['fxExchange']);
                    this.EnableForm(['fxExchange']);
                    this.chooseUSD = true;
                    break;
                case 'THB':
                    if (this.initiativesForm.get('typeOfInvestment').value == 'CVC') {
                        // this.swalTool.ErrorText(this.initiativesForm.get('typeOfInvestment').value + ' Warning!!', this.initiativesForm.get('typeOfInvestment').value + ' is required to have FX Exchange as USD.');
                        this.initiativesForm.get('costEstCapexType').setValue('USD');
                        break;
                    }
                    else {
                        cost = costEstCapex;
                        this.costEstCapexType = 'THB';
                        this.CalculatePayBackPeriod();
                        this.SetValidateForm();
                        this.ValidateForm(['costEstCapex']);
                        if (this.initiativesForm.controls.costEstCapexType.value == 'THB') {
                            this.HideForm(['fxExchange']);
                            this.DisableForm(['fxExchange']);
                            this.chooseUSD = false;
                        }
                        break;
                    }
            }

            let typeBenefitExclusionList = [
                'CVC',
                'Divestment',
                'M&A',
                'Environment',
                'Law & Regulation',
                'Safety',
                'Maintain Reliability',
                'Replacement',
                // 'Turnaround',
                // 'Overhaul',
                // 'CSR',
                // 'Welfare',
                // 'Lab & Quality',
                // 'Technical Support for R&D',
                // 'R&D',
                // 'Engineering Request ER',
                // 'Others'
            ];
            if (typeBenefitExclusionList.indexOf(typeOfInvestment) === -1) {
                if (cost > 300) {
                    this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
                    this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
                    this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
                } else {
                    this.ShowForm(['typeBenefit']);
                    this.EnableForm(['typeBenefit']);
                }
            }
            else {
                this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'payBackPeriod', 'benefitAmount']);
                this.DisableForm(['ram', 'jFactor', 'irr', 'wacc', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);
            }


            switch (typeOfInvestment) {
                case 'Maintain Reliability':
                    if (this.typeOfInvestmentTemp != 'Maintain Reliability') {
                        this.typeOfInvestmentTemp = 'Maintain Reliability';
                        this.CheckModalTypeOfInvestment();
                    }
                    this.replace = 'not-in-kind';
                    this.obsolate = 'no';
                    this.confirmText = 'Maintain Reliability';
                    this.HideForm(['ram', 'jFactor', 'budgetType']);
                    this.DisableForm(['ram', 'jFactor', 'budgetType']);
                    this.ShowForm(['typeOfInvestment', 'typeBenefit', 'costEstCapex', 'costEstCapexType', 'wacc', 'irr']);
                    this.EnableForm(['typeOfInvestment', 'typeBenefit', 'costEstCapex', 'costEstCapexType', 'wacc', 'irr']);
                    // this.ShowForm(['fxExchange']);
                    this.ValidateForm(['costEstCapex', 'costEstOpex', 'irr']);
                    if (this.initiativesForm.get('typeBenefit').value == 'FINANCIAL') {
                        this.ShowForm(['wacc', 'irr']);
                        this.EnableForm(['wacc', 'irr']);
                    } else {
                        this.initiativesForm.patchValue({ wacc: '', irr: '' });
                        this.ClearValidateForm(['wacc', 'irr']);
                        this.HideForm(['wacc', 'irr']);
                        this.DisableForm(['wacc', 'irr']);
                    }
                    break;
                case 'Replacement':
                    if (this.typeOfInvestmentTemp != 'Replacement') {
                        this.typeOfInvestmentTemp = 'Replacement';
                        this.CheckModalTypeOfInvestment();
                    }
                    this.replace = 'in-kind';
                    this.obsolate = 'yes';
                    this.confirmText = 'Replacement';
                    this.HideForm(['ram', 'jFactor', 'irr', 'wacc']);
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr']);
                    this.ShowForm(['typeBenefit', 'typeOfInvestment', 'budgetType', 'costEstCapex', 'costEstCapexType']);
                    this.EnableForm(['typeBenefit', 'typeOfInvestment', 'budgetType', 'costEstCapex', 'costEstCapexType']);
                    // this.ShowForm(['fxExchange']);
                    this.ValidateForm(['costEstCapex', 'costEstOpex', 'irr', 'budgetType']);
                    break;
                case 'CSR':
                case 'Digital CAPEX':
                case 'IT CAPEX':
                case 'Turnaround':
                case 'Others':
                case 'Overhaul':
                case 'R&D':
                case 'Lab & Quality':
                case 'Technical Support for R&D':
                case 'Welfare':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'benefitAmount', 'payBackPeriod']);
                    this.DisableForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'benefitAmount', 'payBackPeriod']);
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    // this.ShowForm(['fxExchange']);
                    // this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
                case 'Engineering Request ER':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'wacc']);
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr']);
                    this.ShowForm(['typeOfInvestment', 'budgetType', 'costEstCapex', 'costEstCapexType']);
                    this.EnableForm(['typeOfInvestment', 'budgetType', 'costEstCapex', 'costEstCapexType']);
                    // this.ShowForm(['fxExchange']);
                    // this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                    this.ValidateForm(['costEstCapex', 'costEstOpex', 'budgetType']);
                    break;
                case 'CVC':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'payBackPeriod', 'benefitAmount']);
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);
                    this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
                    this.ShowForm(['fxExchange']);
                    this.EnableForm(['fxExchange']);
                    this.ValidateForm(['fxExchange', 'costEstCapex', 'costEstOpex']);
                    this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                    break;
                case 'Divestment':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);//, 'fxExchange'
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);//, 'fxExchange'
                    this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    // this.initiativesForm.patchValue({ costEstCapexType: 'THB' });
                    this.OnchangeCostEstCapexType();
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
                case 'M&A':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);//, 'fxExchange'
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);//, 'fxExchange'
                    this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    this.EnableForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    // this.initiativesForm.patchValue({ costEstCapexType: 'THB' });
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
                case 'Growth: Backbone':
                case 'Growth: New business':
                case 'Growth: Build International Competitive base':
                case 'Growth: Diversify to performance chemicals':
                case 'Growth: Enhance green':
                case 'Sustain Core: Synergy':
                case 'Sustain Core: Operational Excellence':
                case 'Sustain Core: Marketing Excellence':
                case 'Sustain Core: Debot/Expansion':
                case 'Sustain Core: Chain Integration':
                case 'Sustain Core: New derivative':
                case 'Sustain Core: Map ta put retrofit':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'budgetType']);
                    this.DisableForm(['budgetType', 'ram', 'jFactor']);
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    this.EnableForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    if (cost <= 300 && this.initiativesForm.get('typeBenefit').value == 'FINANCIAL') {
                        this.ShowForm(['wacc', 'irr']);
                        this.EnableForm(['wacc', 'irr']);
                    } else {
                        this.HideForm(['wacc', 'irr']);
                        this.DisableForm(['wacc', 'irr']);
                    }
                    // this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
                case 'Sustain Core: Energy saving':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'budgetType']);
                    this.DisableForm(['budgetType', 'ram', 'jFactor']);
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    // this.ShowForm(['fxExchange']);
                    this.EnableForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    if (cost <= 300 && this.initiativesForm.get('typeBenefit').value == 'FINANCIAL') {
                        this.ShowForm(['wacc', 'irr']);
                        this.EnableForm(['wacc', 'irr']);
                    } else {
                        this.HideForm(['wacc', 'irr']);
                        this.DisableForm(['wacc', 'irr']);
                    }
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
                case 'Safety':
                case 'Environment':
                case 'Law & Regulation':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['budgetType', 'wacc', 'irr']);
                    this.DisableForm(['budgetType', 'benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
                    this.ShowForm(['typeOfInvestment', 'ram', 'costEstCapex', 'costEstCapexType']);
                    this.EnableForm(['typeOfInvestment', 'ram', 'costEstCapex', 'costEstCapexType']);
                    // this.ShowForm(['fxExchange']);
                    this.ValidateForm(['ram', 'costEstCapex', 'costEstOpex']);
                    break;
                default:
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit']);
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);
                    this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    // this.initiativesForm.patchValue({ costEstCapexType: 'THB' });
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
            }

            // let typeBenefitExclusionList = ['CVC', 'Divestment', 'M&A', 'Environment', 'Law & Regulation', 'Safety', 'Maintain Reliability'];
            // if (typeBenefitExclusionList.indexOf(typeOfInvestment) === -1) {
            //   if (cost > 300) {
            //     this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
            //     this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
            //     this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
            //   } else {
            //     this.ShowForm(['typeBenefit']);
            //     this.EnableForm(['typeBenefit']);
            //   }
            // }
            // else {
            //   this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'payBackPeriod', 'benefitAmount']);
            //   this.DisableForm(['ram', 'jFactor', 'irr', 'wacc', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);
            // }

            // this.CheckModalTypeOfInvestment();

            if (this.initiativesForm.get('typeBenefit').enabled) {
                // const requestCapex = this.initiativesForm.controls.requestCapex.value;
                // const typeBenefit = this.initiativesForm.controls.typeBenefit.value;
                if (typeBenefit === 'FINANCIAL') {
                    this.ValidateForm(['benefitAmount']);
                    if (requestCapex === 'true') {
                        this.ValidateForm(['payBackPeriod']);
                    }
                    this.ShowForm(['benefitAmount', 'payBackPeriod']);
                    this.EnableForm(['benefitAmount', 'payBackPeriod']);
                } else if (typeBenefit === 'NON-FINANCIAL') {
                    this.initiativesForm.patchValue({ benefitAmount: '', payBackPeriod: '' });
                    this.ClearValidateForm(['benefitAmount', 'payBackPeriod']);
                    this.HideForm(['benefitAmount', 'payBackPeriod']);
                    this.DisableForm(['benefitAmount', 'payBackPeriod']);
                }
            }

            //Calculate payback period
            switch (this.initiativesForm.controls.costEstCapexType.value) {
                case 'USD':
                    const fx = this.initiativesForm.controls.fxExchange.value;
                    this.costEstCapex = this.initiativesForm.controls.costEstCapex.value * fx;
                    break;
                case 'THB':
                    this.costEstCapex = this.initiativesForm.controls.costEstCapex.value;
                    break;
                default:
                    this.costEstCapex = 0.00;
                    break;
            }
            switch (this.initiativesForm.controls.costEstOpexType.value) {
                case 'USD':
                    const fx = this.initiativesForm.controls.fxExchange.value;
                    this.costEstOpex = this.initiativesForm.controls.costEstOpex.value * fx;
                    break;
                case 'THB':
                    this.costEstOpex = this.initiativesForm.controls.costEstOpex.value;
                    break;
                default:
                    this.costEstOpex = 0.00;
                    break;
            }
            const result = (Number(this.costEstCapex) + Number(this.costEstOpex)) / Number(benefitAmount);
            this.initiativesForm.patchValue({ payBackPeriod: isFinite(result) ? result.toFixed(2) : null });
            // let projectCost = this.formGroup.get('capexInformationForm')?.get("projectCost").value
            // if (projectCost && projectCost.toString().length <= 0) {
            //   this.formGroup.get('capexInformationForm')?.patchValue({ projectCost: this.costEstCapex != null ? parseFloat(this.costEstCapex).toFixed(2) : null });
            // }
        }
        else {
            this.HideForm(['wacc']);
            this.DisableForm(['wacc']);
            // const requestCapex = this.initiativesForm.controls.requestCapex.value;
            // const typeBenefit = this.initiativesForm.controls.typeBenefit.value;
            if (typeBenefit === 'FINANCIAL') {
                this.ValidateForm(['benefitAmount']);
                if (requestCapex === 'true') {
                    this.ValidateForm(['payBackPeriod']);
                }
                this.ShowForm(['benefitAmount', 'payBackPeriod']);
                this.EnableForm(['benefitAmount', 'payBackPeriod']);
            } else if (typeBenefit === 'NON-FINANCIAL') {
                this.initiativesForm.patchValue({ benefitAmount: '', payBackPeriod: '', wacc: '', irr: '' });
                this.ClearValidateForm(['benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
                this.HideForm(['benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
                this.DisableForm(['benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
            }
        }
        // this.OnChangeDivestment();
        // this.OnChangeFx();
        // this.OnChangeTypeOfInvestment();

        // this.OnChangeTypeOfBenefit();
        // this.OnChangeBenefitAmount();
        //this.initiativesForm.get('benefitAmount')?.patchValue(this.typeBenefitValue);
    }

    RequestCapexHideShowCheck() {

        if (!this.initiativeService.viewMode) {
            this.ClearSuggestion();
        }
        if (this.dataLoaded && this.initiativesForm.get('useIrrCalculate')?.value) {
            this.reCalculateIrr();
        }
        let requestCapex = this.initiativesForm.get('requestCapex')?.value;
        let costEstCapex = this.initiativesForm.get('costEstCapex')?.value;
        // let costEstCapexType = this.initiativesForm.get('costEstCapexType')?.value;
        // let divestment = this.initiativesForm.get('divestment')?.value;
        // let fxExchange = this.initiativesForm.get('fxExchange')?.value;
        let typeOfInvestment = this.initiativesForm.get('typeOfInvestment')?.value;
        let typeBenefit = this.initiativesForm.get('typeBenefit')?.value;
        let benefitAmount = this.initiativesForm.get('benefitAmount')?.value;
        // this.OnChangeCostEstimated();

        // this.OnchangeCostEstCapexType();
        if (requestCapex === 'true') {
            let cost = 0;
            const fx = this.initiativesForm.controls.fxExchange.value;
            switch (this.initiativesForm.controls.costEstCapexType.value) {
                case 'USD':
                    this.ValidateForm(['costEstCapex', 'fxExchange']);
                    if (fx) {
                        cost = costEstCapex * fx;
                        this.costEstCapex = Math.round(cost * 100) / 100;
                        if (cost > 300) {
                            this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
                            this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
                        }
                    } else {
                        this.costEstCapex = costEstCapex;
                    }
                    this.costEstCapexType = 'USD';
                    this.ShowForm(['fxExchange']);
                    this.EnableForm(['fxExchange']);
                    this.chooseUSD = true;
                    break;
                case 'THB':
                    if (this.initiativesForm.get('typeOfInvestment').value == 'CVC') {
                        // this.swalTool.ErrorText(this.initiativesForm.get('typeOfInvestment').value + ' Warning!!', this.initiativesForm.get('typeOfInvestment').value + ' is required to have FX Exchange as USD.');
                        this.initiativesForm.get('costEstCapexType').setValue('USD');
                        break;
                    }
                    else {
                        cost = costEstCapex;
                        this.costEstCapexType = 'THB';
                        this.CalculatePayBackPeriod();
                        this.SetValidateForm();
                        this.ValidateForm(['costEstCapex']);
                        if (this.initiativesForm.controls.costEstCapexType.value == 'THB') {
                            this.HideForm(['fxExchange']);
                            this.DisableForm(['fxExchange']);
                            this.chooseUSD = false;
                        }
                        break;
                    }
            }

            let typeBenefitExclusionList = [
                'CVC',
                'Divestment',
                'M&A',
                'Environment',
                'Law & Regulation',
                'Safety',
                'Maintain Reliability',
                'Replacement',
                // 'Turnaround',
                // 'Overhaul',
                // 'CSR',
                // 'Welfare',
                // 'Lab & Quality',
                // 'Technical Support for R&D',
                // 'R&D',
                // 'Engineering Request ER',
                // 'Others'
            ];
            if (typeBenefitExclusionList.indexOf(typeOfInvestment) === -1) {
                if (cost > 300) {
                    this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
                    this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
                    this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
                } else {
                    this.ShowForm(['typeBenefit']);
                    this.EnableForm(['typeBenefit']);
                }
            }
            else {
                this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'payBackPeriod', 'benefitAmount']);
                this.DisableForm(['ram', 'jFactor', 'irr', 'wacc', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);
            }


            switch (typeOfInvestment) {
                case 'Maintain Reliability':
                    if (this.typeOfInvestmentTemp != 'Maintain Reliability') {
                        this.typeOfInvestmentTemp = 'Maintain Reliability';
                        this.CheckModalTypeOfInvestment();
                    }
                    this.replace = 'not-in-kind';
                    this.obsolate = 'no';
                    this.confirmText = 'Maintain Reliability';
                    this.HideForm(['ram', 'jFactor', 'budgetType']);
                    this.DisableForm(['ram', 'jFactor', 'budgetType']);
                    this.ShowForm(['typeOfInvestment', 'typeBenefit', 'costEstCapex', 'costEstCapexType', 'wacc', 'irr']);
                    this.EnableForm(['typeOfInvestment', 'typeBenefit', 'costEstCapex', 'costEstCapexType', 'wacc', 'irr']);
                    // this.ShowForm(['fxExchange']);
                    this.ValidateForm(['costEstCapex', 'costEstOpex', 'irr']);
                    if (this.initiativesForm.get('typeBenefit').value == 'FINANCIAL') {
                        this.ShowForm(['wacc', 'irr']);
                        this.EnableForm(['wacc', 'irr']);
                    } else {
                        this.initiativesForm.patchValue({ wacc: '', irr: '' });
                        this.ClearValidateForm(['wacc', 'irr']);
                        this.HideForm(['wacc', 'irr']);
                        this.DisableForm(['wacc', 'irr']);
                    }
                    break;
                case 'Replacement':
                    if (this.typeOfInvestmentTemp != 'Replacement') {
                        this.typeOfInvestmentTemp = 'Replacement';
                        this.CheckModalTypeOfInvestment();
                    }
                    this.replace = 'in-kind';
                    this.obsolate = 'yes';
                    this.confirmText = 'Replacement';
                    this.HideForm(['ram', 'jFactor', 'irr', 'wacc']);
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr']);
                    this.ShowForm(['typeBenefit', 'typeOfInvestment', 'budgetType', 'costEstCapex', 'costEstCapexType']);
                    this.EnableForm(['typeBenefit', 'typeOfInvestment', 'budgetType', 'costEstCapex', 'costEstCapexType']);
                    // this.ShowForm(['fxExchange']);
                    this.ValidateForm(['costEstCapex', 'costEstOpex', 'irr', 'budgetType']);
                    break;
                case 'CSR':
                case 'Digital CAPEX':
                case 'IT CAPEX':
                case 'Turnaround':
                case 'Others':
                case 'Overhaul':
                case 'R&D':
                case 'Lab & Quality':
                case 'Technical Support for R&D':
                case 'Welfare':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'benefitAmount', 'payBackPeriod']);
                    this.DisableForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'benefitAmount', 'payBackPeriod']);
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    // this.ShowForm(['fxExchange']);
                    // this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
                case 'Engineering Request ER':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'wacc']);
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr']);
                    this.ShowForm(['typeOfInvestment', 'budgetType', 'costEstCapex', 'costEstCapexType']);
                    this.EnableForm(['typeOfInvestment', 'budgetType', 'costEstCapex', 'costEstCapexType']);
                    // this.ShowForm(['fxExchange']);
                    // this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                    this.ValidateForm(['costEstCapex', 'costEstOpex', 'budgetType']);
                    break;
                case 'CVC':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'payBackPeriod', 'benefitAmount']);
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);
                    this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
                    this.ShowForm(['fxExchange']);
                    this.EnableForm(['fxExchange']);
                    this.ValidateForm(['fxExchange', 'costEstCapex', 'costEstOpex']);
                    this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                    break;
                case 'Divestment':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);//, 'fxExchange'
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);//, 'fxExchange'
                    this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    // this.initiativesForm.patchValue({ costEstCapexType: 'THB' });
                    this.OnchangeCostEstCapexType();
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
                case 'M&A':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);//, 'fxExchange'
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);//, 'fxExchange'
                    this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    this.EnableForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    // this.initiativesForm.patchValue({ costEstCapexType: 'THB' });
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
                case 'Growth: Backbone':
                case 'Growth: New business':
                case 'Growth: Build International Competitive base':
                case 'Growth: Diversify to performance chemicals':
                case 'Growth: Enhance green':
                case 'Sustain Core: Synergy':
                case 'Sustain Core: Operational Excellence':
                case 'Sustain Core: Marketing Excellence':
                case 'Sustain Core: Debot/Expansion':
                case 'Sustain Core: Chain Integration':
                case 'Sustain Core: New derivative':
                case 'Sustain Core: Map ta put retrofit':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'budgetType']);
                    this.DisableForm(['budgetType', 'ram', 'jFactor']);
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    this.EnableForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    if (cost <= 300 && this.initiativesForm.get('typeBenefit').value == 'FINANCIAL') {
                        this.ShowForm(['wacc', 'irr']);
                        this.EnableForm(['wacc', 'irr']);
                    } else {
                        this.HideForm(['wacc', 'irr']);
                        this.DisableForm(['wacc', 'irr']);
                    }
                    // this.initiativesForm.patchValue({ costEstCapexType: 'USD' });
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
                case 'Sustain Core: Energy saving':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'budgetType']);
                    this.DisableForm(['budgetType', 'ram', 'jFactor']);
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    // this.ShowForm(['fxExchange']);
                    this.EnableForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    if (cost <= 300 && this.initiativesForm.get('typeBenefit').value == 'FINANCIAL') {
                        this.ShowForm(['wacc', 'irr']);
                        this.EnableForm(['wacc', 'irr']);
                    } else {
                        this.HideForm(['wacc', 'irr']);
                        this.DisableForm(['wacc', 'irr']);
                    }
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
                case 'Safety':
                case 'Environment':
                case 'Law & Regulation':
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['budgetType', 'wacc', 'irr']);
                    this.DisableForm(['budgetType', 'benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
                    this.ShowForm(['typeOfInvestment', 'ram', 'costEstCapex', 'costEstCapexType']);
                    this.EnableForm(['typeOfInvestment', 'ram', 'costEstCapex', 'costEstCapexType']);
                    // this.ShowForm(['fxExchange']);
                    this.ValidateForm(['ram', 'costEstCapex', 'costEstOpex']);
                    break;
                default:
                    this.typeOfInvestmentTemp = null;
                    this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit']);
                    this.DisableForm(['ram', 'jFactor', 'wacc', 'irr', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);
                    this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
                    this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType']);
                    // this.initiativesForm.patchValue({ costEstCapexType: 'THB' });
                    this.ValidateForm(['costEstCapex', 'costEstOpex']);
                    break;
            }

            // let typeBenefitExclusionList = ['CVC', 'Divestment', 'M&A', 'Environment', 'Law & Regulation', 'Safety', 'Maintain Reliability'];
            // if (typeBenefitExclusionList.indexOf(typeOfInvestment) === -1) {
            //   if (cost > 300) {
            //     this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
            //     this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc', 'irr']);
            //     this.initiativesForm.patchValue({ typeBenefit: '', benefitAmount: '' });
            //   } else {
            //     this.ShowForm(['typeBenefit']);
            //     this.EnableForm(['typeBenefit']);
            //   }
            // }
            // else {
            //   this.HideForm(['ram', 'jFactor', 'irr', 'budgetType', 'wacc', 'typeBenefit', 'payBackPeriod', 'benefitAmount']);
            //   this.DisableForm(['ram', 'jFactor', 'irr', 'wacc', 'budgetType', 'typeBenefit', 'benefitAmount', 'payBackPeriod']);
            // }

            // this.CheckModalTypeOfInvestment();

            if (this.initiativesForm.get('typeBenefit').enabled) {
                // const requestCapex = this.initiativesForm.controls.requestCapex.value;
                // const typeBenefit = this.initiativesForm.controls.typeBenefit.value;
                if (typeBenefit === 'FINANCIAL') {
                    this.ValidateForm(['benefitAmount']);
                    if (requestCapex === 'true') {
                        this.ValidateForm(['payBackPeriod']);
                    }
                    this.ShowForm(['benefitAmount', 'payBackPeriod']);
                    this.EnableForm(['benefitAmount', 'payBackPeriod']);
                } else if (typeBenefit === 'NON-FINANCIAL') {
                    this.initiativesForm.patchValue({ benefitAmount: '', payBackPeriod: '' });
                    this.ClearValidateForm(['benefitAmount', 'payBackPeriod']);
                    this.HideForm(['benefitAmount', 'payBackPeriod']);
                    this.DisableForm(['benefitAmount', 'payBackPeriod']);
                }
            }

            //Calculate payback period
            switch (this.initiativesForm.controls.costEstCapexType.value) {
                case 'USD':
                    const fx = this.initiativesForm.controls.fxExchange.value;
                    this.costEstCapex = this.initiativesForm.controls.costEstCapex.value * fx;
                    break;
                case 'THB':
                    this.costEstCapex = this.initiativesForm.controls.costEstCapex.value;
                    break;
                default:
                    this.costEstCapex = 0.00;
                    break;
            }
            switch (this.initiativesForm.controls.costEstOpexType.value) {
                case 'USD':
                    const fx = this.initiativesForm.controls.fxExchange.value;
                    this.costEstOpex = this.initiativesForm.controls.costEstOpex.value * fx;
                    break;
                case 'THB':
                    this.costEstOpex = this.initiativesForm.controls.costEstOpex.value;
                    break;
                default:
                    this.costEstOpex = 0.00;
                    break;
            }
            const result = (Number(this.costEstCapex) + Number(this.costEstOpex)) / Number(benefitAmount);
            this.initiativesForm.patchValue({ payBackPeriod: isFinite(result) ? result.toFixed(2) : null });
            // let projectCost = this.formGroup.get('capexInformationForm')?.get("projectCost").value
            // if (projectCost && projectCost.toString().length <= 0) {
            //   this.formGroup.get('capexInformationForm')?.patchValue({ projectCost: this.costEstCapex != null ? parseFloat(this.costEstCapex).toFixed(2) : null });
            // }
        }
        else {
            this.HideForm(['wacc']);
            this.DisableForm(['wacc']);
            // const requestCapex = this.initiativesForm.controls.requestCapex.value;
            // const typeBenefit = this.initiativesForm.controls.typeBenefit.value;
            if (typeBenefit === 'FINANCIAL') {
                this.ValidateForm(['benefitAmount']);
                if (requestCapex === 'true') {
                    this.ValidateForm(['payBackPeriod']);
                }
                this.ShowForm(['benefitAmount', 'payBackPeriod']);
                this.EnableForm(['benefitAmount', 'payBackPeriod']);
            } else if (typeBenefit === 'NON-FINANCIAL') {
                this.initiativesForm.patchValue({ benefitAmount: '', payBackPeriod: '' });
                this.ClearValidateForm(['benefitAmount', 'payBackPeriod']);
                this.HideForm(['benefitAmount', 'payBackPeriod']);
                this.DisableForm(['benefitAmount', 'payBackPeriod']);
            }
        }
        // this.OnChangeDivestment();
        // this.OnChangeFx();
        // this.OnChangeTypeOfInvestment();

        // this.OnChangeTypeOfBenefit();
        // this.OnChangeBenefitAmount();
        //this.initiativesForm.get('benefitAmount')?.patchValue(this.typeBenefitValue);
    }

    OnChangeRequestCAPEX(event) {
        event.target.value === 'true' ? this.YesRequestCAPEXFrom() : this.NoRequestCAPEXFrom();
    }

    OnChangeRequestOPEX(event) {
        event.target.value === 'trueOpex' ? this.YesRequestOPEXFrom() : this.NoRequestOPEXFrom();
    }

    YesRequestCAPEXFrom() {
        this.HideForm(['budgetType', 'ram', 'irr', 'wacc', 'typeBenefit', 'benefitAmount', 'payBackPeriod', 'divestment']);
        this.ClearInitiativeForm(['budgetType', 'ram', 'irr', 'wacc',
            'typeBenefit', 'benefitAmount', 'payBackPeriod', 'divestment']);
        this.DisableForm(['typeBenefit']);
        this.ShowForm(['typeOfInvestment', 'costEstCapex', 'costEstCapexType', 'budgetSource']);//typeOfInvestment
        this.SetEnableFrom();
        if (!this.StageIL5) { this.ClearSuggestion(); }
        this.ValidateForm(['payBackPeriod']);
        this.initiativesForm.patchValue({ costEstCapex: null });
        this.initiativesForm.patchValue({ costEstCapexType: 'THB' });
        this.initiativesForm.controls.payBackPeriod.markAsTouched();
    }

    NoRequestCAPEXFrom() {
        this.EnableForm(['typeBenefit']);
        this.PatchForm();
        this.HideForm(['typeOfInvestment', 'budgetType', 'ram', 'irr', 'jFactor',
            'costEstCapex', 'costEstCapexType', 'benefitAmount', 'payBackPeriod', 'fxExchange', 'budgetSource', 'wacc']);
        this.ClearInitiativeForm(['typeOfInvestment', 'budgetType', 'ram', 'irr',
            'costEstCapex', 'benefitAmount', 'payBackPeriod', 'budgetSource', 'wacc']);
        this.ShowForm(['typeBenefit', 'divestment']);
        this.DisableForm(['typeOfInvestment', 'budgetType', 'ram', 'irr',
            'costEstCapex', 'costEstCapexType', 'fxExchange', 'budgetSource', 'wacc']);
        if (!this.StageIL5) { this.ClearSuggestion(); }
        this.ClearValidateForm(['payBackPeriod']);
        this.initiativesForm.patchValue({ costEstCapex: 0 });
        this.CalculatePayBackPeriod();
        this.initiativesForm.controls.payBackPeriod.markAsUntouched();
    }

    YesRequestOPEXFrom() {
        this.ShowForm(['costEstOpex', 'costEstOpexType']);
        this.EnableForm(['costEstOpex', 'costEstOpexType']);
        this.initiativesForm.patchValue({ costEstOpex: null });
        this.initiativesForm.patchValue({ costEstOpexType: 'THB' });
    }

    NoRequestOPEXFrom() {
        this.HideForm(['costEstOpex', 'costEstOpexType']);
        this.ClearInitiativeForm(['costEstOpex']);
        this.initiativesForm.patchValue({ costEstOpex: 0 });
        // this.DisableForm(['costEstOpex', 'costEstOpexType']);
        this.CalculatePayBackPeriod();
    }

    DisableSuggestion() {
        // this.DisableSuggest(['pim', 'cim', 'max', 'directCapex', 'dim']);
        // this.EnableSuggest(['cpi', 'strategy', 'randD', 'other']);
    }

    NoRequestCAPEX() {
        if (this.requestCapex === 'false') {
            this.DisableSuggestion();
            if (this.divestment) {
                this.CIM_ACTIVE(true);
                this.initiativesForm.controls.cpi.disable();
                this.initiativesForm.controls.strategy.disable();
                this.initiativesForm.controls.randD.disable();
                this.initiativesForm.controls.other.disable();
            } else {
                if (this.typeBenefit) {
                    if (this.typeBenefit === 'NON-FINANCIAL') {
                        this.initiativesForm.controls.max.disable();
                        this.IsMax = false;

                        if (this.initiativesForm.get('alignWithCorpStrategy')?.value) {
                            this.initiativesForm.controls.strategy.enable();
                            this.initiativesForm.patchValue({ max: false, strategy: true });
                            this.IsStrategy = true;
                            this.initiativesForm.patchValue({ initiativeType: "strategy" });
                        } else {
                            this.initiativesForm.controls.cpi.enable();
                            this.initiativesForm.patchValue({ max: false, cpi: true });
                            this.IsCpi = true;
                            this.initiativesForm.patchValue({ initiativeType: "cpi" });
                        }

                    } else {
                        this.initiativesForm.patchValue({ max: true });
                        this.initiativesForm.controls.max.enable();
                        this.IsMax = true;
                    }
                } else {
                    this.initiativesForm.patchValue({ max: false });
                    this.initiativesForm.controls.max.disable();
                    this.IsMax = false;
                }
            }
        }
        this.CalculatePayBackPeriod();
    }

    InitVariable() {
        this.requestCapex = this.initiativesForm.controls.requestCapex.value;
        this.typeOfInvestment = this.initiativesForm.controls.typeOfInvestment.value;
        this.budgetType = this.initiativesForm.controls.budgetType.value;
        this.ram = this.initiativesForm.controls.ram.value;
        this.jFactor = this.initiativesForm.controls.jFactor.value;
        this.irr = this.initiativesForm.controls.irr.value;
        this.costEstCapex = this.initiativesForm.controls.costEstCapex.value;
        this.costEstCapexType = this.initiativesForm.controls.costEstCapexType.value;
        this.typeBenefit = this.initiativesForm.controls.typeBenefit.value;
        this.benefitAmount = this.initiativesForm.controls.benefitAmount.value;
        this.benefitAmountType = this.initiativesForm.controls.benefitAmountType.value;
        this.payBackPeriod = this.initiativesForm.controls.payBackPeriod.value;
        this.fxExchange = this.initiativesForm.controls.fxExchange.value;
        this.involveItDigital = this.initiativesForm.controls.involveItDigital.value;
        this.alignWithCorpStrategy = this.initiativesForm.controls.alignWithCorpStrategy.value;
        this.budgetSource = this.initiativesForm.controls.budgetSource.value;
        this.divestment = this.initiativesForm.controls.divestment.value;
    }

    Condition() {
        this.condition = {
            requestCapex: this.requestCapex,
            typeOfInvestment: this.typeOfInvestment,
            budgetType: this.budgetType,
            ram: this.ram,
            jFactor: this.jFactor,
            irr: this.irr,
            costEstCapex: this.costEstCapex,
            costEstCapexType: this.costEstCapexType,
            typeBenefit: this.typeBenefit,
            benefitAmount: this.benefitAmount,
            benefitAmountType: this.benefitAmountType,
            payBackPeriod: this.payBackPeriod,
            fxExchange: this.fxExchange,
            involveItDigital: this.involveItDigital,
            alignWithCorpStrategy: this.alignWithCorpStrategy,
            budgetSource: this.budgetSource,
            divestment: this.divestment
        };
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    PIM_ACTIVE(pim) {
        if (pim) {
            this.IsPim = true;
            this.initiativesForm.controls.pim.enable();
            this.initiativesForm.patchValue({ pim: true, initiativeType: 'pim' });
        }
        //2020-08-02 Tempolary Solutuion Prevent MAX to Combine with other process until 2020-08-05
        this.FINALIZE_ACTIVE();
    }

    CIM_ACTIVE(cim) {
        if (cim) {
            this.IsCim = true;
            this.initiativesForm.controls.cim.enable();
            this.initiativesForm.patchValue({ cim: true, initiativeType: 'cim' });
        }
        //2020-08-02 Tempolary Solutuion Prevent MAX to Combine with other process until 2020-08-05
        this.FINALIZE_ACTIVE();
    }

    DIM_ACTIVE(dim) {
        if (dim) {
            this.IsDim = true;
            this.initiativesForm.controls.dim.enable();
            this.initiativesForm.patchValue({ dim: true, initiativeType: 'dim' });
        }
        //2020-08-02 Tempolary Solutuion Prevent MAX to Combine with other process until 2020-08-05
        this.FINALIZE_ACTIVE();
    }

    CAPEX_ACTIVE(directCapex) {
        if (directCapex) {
            this.IsCapex = true;
            this.initiativesForm.controls.directCapex.enable();
            this.initiativesForm.patchValue({ directCapex: true, initiativeType: 'directCapex' });
        }
        //2020-08-02 Tempolary Solutuion Prevent MAX to Combine with other process until 2020-08-05
        this.FINALIZE_ACTIVE();
    }

    MAX_PIM_ACTIVE(MaxPim) {
        if (MaxPim) {
            this.IsPim = true;
            this.initiativesForm.controls.pim.enable();
            this.initiativesForm.patchValue({ pim: true });

            this.IsMax = true;
            this.initiativesForm.controls.max.enable();
            this.initiativesForm.patchValue({ max: true });
            this.initiativesForm.patchValue({ initiativeType: 'pim,max' });
        }
        //2020-08-02 Tempolary Solutuion Prevent MAX to Combine with other process until 2020-08-05
        this.FINALIZE_ACTIVE();
    }

    MAX_CAPEX_ACTIVE(MaxCapex) {
        if (MaxCapex) {
            //2020-08-02 Tempolary Solutuion Prevent MAX to Combine with other process until 2020-08-05
            //this.IsCapex = true;
            //this.SendCapex.emit(this.IsCapex);
            //this.initiativesForm.controls.directCapex.enable();
            //this.initiativesForm.patchValue({ directCapex: true });

            //this.IsMax = true;
            //this.initiativesForm.controls.max.enable();
            //this.initiativesForm.patchValue({ max: true });
            //this.initiativesForm.patchValue({ initiativeType: 'directCapex,max' });

            this.initiativesForm.patchValue({ max: true });
            this.initiativesForm.controls.max.enable();
            this.IsMax = true;

        }
        //2020-08-02 Tempolary Solutuion Prevent MAX to Combine with other process until 2020-08-05
        this.FINALIZE_ACTIVE();
    }

    MAX_DIM_ACTIVE(MaxDim) {
        if (MaxDim) {
            // this.DIM_ACTIVE(MaxDim);
            this.IsDim = true;
            this.initiativesForm.controls.dim.enable();
            this.initiativesForm.patchValue({ dim: true });

            this.IsMax = false;
            // this.initiativesForm.controls.max.enable();
            this.initiativesForm.patchValue({ max: false });

            this.initiativesForm.patchValue({ initiativeType: 'dim' });
        }

        //2020-08-02 Tempolary Solutuion Prevent MAX to Combine with other process
        this.FINALIZE_ACTIVE();

    }


    //2020-08-02 Tempolary Solutuion Prevent MAX to Combine with other process
    active_temp_count: number = 0;
    FINALIZE_ACTIVE() {
        this.initiativeService.suggestion = true;
        this.active_temp_count = this.active_temp_count + 1;

        if (this.IsMax === true && this.IsCapex === true && !this.direcCapexOnly) {
            this.initiativesForm.patchValue({ max: true, initiativeType: 'max' });
            this.initiativesForm.controls.max.enable();
            this.IsMax = true;
            this.IsCapex = false;
            this.initiativesForm.patchValue({ directCapex: false });
        }

    }





    LoadSuggest() {
        this.isLoadSuggest = true;
        this.isDisabledSubmit = true;
        this.spinner.show();
        setTimeout(() => {
            this.spinner.hide();
            this.isLoadSuggest = false;
            this.isDisabledSubmit = false;
        }, 1300);
    }

    SuggestionNew() {
        this.ClearValidateFormGeneral();
        this.SetMarkAsTouchedForm();
        this.InitVariable();
        this.CheckCostEstCapexType(this.initiativesForm.controls.costEstCapexType.value);
        this.ClearSuggestion();

        if (this.initiativesForm.valid) {
            this.LoadSuggest();
            this.Condition();
            this.suggestion.Suggest(this.condition).subscribe(result => {
                switch (result['suggestion']) {
                    case "CIM":
                        this.CIM_ACTIVE(true);
                        break;
                    case "CAPEX":
                        this.CAPEX_ACTIVE(true);
                        break;
                    case "CAPEX_MAX":
                        this.MAX_CAPEX_ACTIVE(true);
                        break;
                    case "MAX":
                        this.MAX_CAPEX_ACTIVE(true);
                        break;
                    case "DIM":
                        this.DIM_ACTIVE(true);
                        break;
                    case "DIM_MAX":
                        this.MAX_DIM_ACTIVE(true);
                        break;
                    case "PIM":
                        this.PIM_ACTIVE(true);
                        break;
                    case "PIM_MAX":
                        this.MAX_PIM_ACTIVE(true);
                        break;
                    default:
                        this.swalTool.NoCase();
                        break;
                }

            });
        }

    }

    Suggest() {
        //2020-08-02 Tempolary Solutuion Prevent MAX to Combine with other process
        //this.ClearValidateFormGeneral();
        //this.SetMarkAsTouchedForm();
        //this.CheckCostEstCapexType(this.initiativesForm.controls.costEstCapexType.value);
        //if (this.initiativesForm.valid) {


        this.active_temp_count = 0;
        this.InitVariable();
        this.ClearSuggestion();

        if (this.SubmitValidation()) {
            this.LoadSuggest();
            this.Condition();
            const company = this.formGroup.get('initiativesForm')?.get('company').value;
            const companyFormList = this.companyList.find(x => x.value == company);
            if (this.companyService.defaultToDirectCapex.indexOf(companyFormList.id) >= 0) {
                this.direcCapexOnly = true;
            }


            this.initiativeService.suggestion = false;
            let PIM_RAM_FACTOR_RAM_NoCase = new Promise((resolve, reject) => {
                this.suggestion.PIM_RAM_FACTOR_RAM_NoCase(this.condition).subscribe(result => {
                    result && !this.direcCapexOnly ? this.swalTool.NoCase() : null;
                    resolve(true);
                });
            });
            let PIM_RAM_FACTOR_JFactor_NoCase = new Promise((resolve, reject) => {
                this.suggestion.PIM_RAM_FACTOR_JFactor_NoCase(this.condition).subscribe(result => { result && !this.direcCapexOnly ? this.swalTool.NoCase() : null; resolve(true); });
            });
            let MAX_Maintain_NoCase = new Promise((resolve, reject) => {
                this.suggestion.MAX_Maintain_NoCase(this.condition).subscribe(result => { result && !this.direcCapexOnly ? this.swalTool.NoCase() : null; resolve(true); });
            });
            let MAX_Growth_NoCase = new Promise((resolve, reject) => {
                this.suggestion.MAX_Growth_NoCase(this.condition).subscribe(result => { result && !this.direcCapexOnly ? this.swalTool.NoCase() : null; resolve(true); });

            });
            let MAX_SustainCore_EnergySaving_NoCase = new Promise((resolve, reject) => {
                this.suggestion.MAX_SustainCore_EnergySaving_NoCase(this.condition).subscribe(result => { result && !this.direcCapexOnly ? this.swalTool.NoCase() : null; resolve(true); });

            });
            let MAX_Sustaincore_NoCase = new Promise((resolve, reject) => {
                this.suggestion.MAX_Sustaincore_NoCase(this.condition).subscribe(result => { result && !this.direcCapexOnly ? this.swalTool.NoCase() : null; resolve(true); });

            })
            let PIM_Maintain_NoCase = new Promise((resolve, reject) => {
                this.suggestion.PIM_Maintain_NoCase(this.condition).subscribe(result => { result && !this.direcCapexOnly ? this.swalTool.NoCase() : null; resolve(true); });

            });
            let PIM_RAM_FACTOR = new Promise((resolve, reject) => {
                this.suggestion.PIM_RAM_FACTOR(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result)
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_Maintain = new Promise((resolve, reject) => {
                this.suggestion.PIM_Maintain(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            })
            let PIM_Growth_Criteria = new Promise((resolve, reject) => {
                this.suggestion.PIM_Growth_Criteria(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_Growth_Criteria_TypeBenefit = new Promise((resolve, reject) => {
                this.suggestion.PIM_Growth_Criteria_TypeBenefit(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_Growth_Criteria_PayBackPeriod = new Promise((resolve, reject) => {
                this.suggestion.PIM_Growth_Criteria_PayBackPeriod(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_SustainCore_Criteria = new Promise((resolve, reject) => {
                this.suggestion.PIM_SustainCore_Criteria(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_SustainCore_Criteria_TypeBenefit = new Promise((resolve, reject) => {
                this.suggestion.PIM_SustainCore_Criteria_TypeBenefit(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_SustainCore_Criteria_PayBackPeriod = new Promise((resolve, reject) => {
                this.suggestion.PIM_SustainCore_Criteria_PayBackPeriod(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_SustainCore_EnergySaving_Criteria = new Promise((resolve, reject) => {
                this.suggestion.PIM_SustainCore_EnergySaving_Criteria(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_SustainCore_EnergySaving_Criteria_TypeBenefit = new Promise((resolve, reject) => {
                this.suggestion.PIM_SustainCore_EnergySaving_Criteria_TypeBenefit(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_SustainCore_EnergySaving_Criteria_PayBackPeriod = new Promise((resolve, reject) => {
                this.suggestion.PIM_SustainCore_EnergySaving_Criteria_PayBackPeriod(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_Maintain_Criteria = new Promise((resolve, reject) => {
                this.suggestion.PIM_Maintain_Criteria(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_Maintain_Criteria_TypeBenefit = new Promise((resolve, reject) => {
                this.suggestion.PIM_Maintain_Criteria_TypeBenefit(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let PIM_Maintain_Criteria_PayBackPeriod = new Promise((resolve, reject) => {
                this.suggestion.PIM_Maintain_Criteria_PayBackPeriod(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });

            });
            let CAPEX_Replacement = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Replacement(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_Replacement_Cost = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Replacement_Cost(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_Replacement_Criteria = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Replacement_Criteria(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_Replacement_Criteria_TypeBenefit = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Replacement_Criteria_TypeBenefit(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_Replacement_Criteria_PayBackPeriod = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Replacement_Criteria_PayBackPeriod(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_ER_Growth_SustainCore = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_ER_Growth_SustainCore(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_ER_Maintain = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_ER_Maintain(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_ER_Environment = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_ER_Environment(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_CostCapex = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_CostCapex(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_Criteria_TypeBenefit = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Criteria_TypeBenefit(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_Criteria_PayBackPeriod = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Criteria_PayBackPeriod(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_Criteria = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Criteria(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });
            });
            let CAPEX_Pool_Engineering = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Pool_Engineering(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });


            });
            let CAPEX_Pool_Cost_Engineering = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Pool_Cost_Engineering(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });


            });
            let CAPEX_Engineering_Cost = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Engineering_Cost(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });

            });
            let CAPEX_Engineering_Criteria = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Engineering_Criteria(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });


            });
            let CAPEX_Engineering_Criteria_TypeBenefit = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Engineering_Criteria_TypeBenefit(this.condition).subscribe(result => {
                    this.CAPEX_ACTIVE(result);
                    resolve(true);
                });


            });
            let CAPEX_Engineering_Criteria_PayBackPeriod = new Promise((resolve, reject) => {
                this.suggestion.CAPEX_Engineering_Criteria_PayBackPeriod(this.condition).subscribe(result => { this.CAPEX_ACTIVE(result); resolve(true); });


            });
            let CIM_Growth = new Promise((resolve, reject) => {
                this.suggestion.CIM_Growth(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.CIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });


            });
            let CIM_SustainCore = new Promise((resolve, reject) => {
                this.suggestion.CIM_SustainCore(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.CIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });


            });
            let CIM_SustainCore_EnergySaving = new Promise((resolve, reject) => {
                this.suggestion.CIM_SustainCore_EnergySaving(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.CIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });


            });
            let CIM_Divest_MnA = new Promise((resolve, reject) => {
                this.suggestion.CIM_Divest_MnA(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.CIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });


            });
            let CIM_CVC = new Promise((resolve, reject) => {
                this.suggestion.CIM_CVC(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.CIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });


            });
            let CIM_ItCapex_DigitalCapex = new Promise((resolve, reject) => {
                this.suggestion.CIM_ItCapex_DigitalCapex(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.CIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });
            });
            let DIM_ItCapex_DigitalCapex_Criteria = new Promise((resolve, reject) => {
                this.suggestion.DIM_ItCapex_DigitalCapex_Criteria(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let DIM_ItCapex_DigitalCapex_Criteria_TypeBenefit = new Promise((resolve, reject) => {
                this.suggestion.DIM_ItCapex_DigitalCapex_Criteria_TypeBenefit(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let DIM_ItCapex_DigitalCapex_Criteria_PayBackPeriod = new Promise((resolve, reject) => {
                this.suggestion.DIM_ItCapex_DigitalCapex_Criteria_PayBackPeriod(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let DIM_NON_FINANCIAL_Growth_SustainCore = new Promise((resolve, reject) => {
                this.suggestion.DIM_NON_FINANCIAL_Growth_SustainCore(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let DIM_Growth_SustainCore = new Promise((resolve, reject) => {
                this.suggestion.DIM_Growth_SustainCore(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let DIM_Maintain = new Promise((resolve, reject) => {
                this.suggestion.DIM_Maintain(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let DIM_NON_Maintain = new Promise((resolve, reject) => {
                this.suggestion.DIM_NON_Maintain(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let DIM_CostCapex = new Promise((resolve, reject) => {
                this.suggestion.DIM_CostCapex(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let DIM_NON_CostCapex = new Promise((resolve, reject) => {
                this.suggestion.DIM_NON_CostCapex(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let DIM_Environment = new Promise((resolve, reject) => {
                this.suggestion.DIM_Environment(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let DIM_MAX_Maintain = new Promise((resolve, reject) => {
                this.suggestion.DIM_MAX_Maintain(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.MAX_DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let DIM_MAX_CostCapex = new Promise((resolve, reject) => {
                this.suggestion.DIM_MAX_CostCapex(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.MAX_DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });

            });
            let CVC_SendEmail = new Promise((resolve, reject) => {
                this.suggestion.CVC_SendEmail(this.condition).subscribe(result => {
                    result && !this.direcCapexOnly ? this.swalTool.SendMail() : null;
                    resolve(true);
                });
            });
            let MAX_DIM_Growth_SustainCore = new Promise((resolve, reject) => {
                this.suggestion.MAX_DIM_Growth_SustainCore(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.MAX_DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let MAX_Maintain = new Promise((resolve, reject) => {
                this.suggestion.MAX_Maintain(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.MAX_PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let MAX_Replacement = new Promise((resolve, reject) => {
                this.suggestion.MAX_Replacement(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.MAX_CAPEX_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let MAX_Growth = new Promise((resolve, reject) => {
                this.suggestion.MAX_Growth(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.MAX_PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let MAX_SustainCore = new Promise((resolve, reject) => {
                this.suggestion.MAX_SustainCore(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.MAX_PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let MAX_SustainCore_EnergySaving = new Promise((resolve, reject) => {
                this.suggestion.MAX_SustainCore_EnergySaving(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.MAX_PIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let MAX_ItCapex_DigitalCapex = new Promise((resolve, reject) => {
                this.suggestion.MAX_ItCapex_DigitalCapex(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.MAX_DIM_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let MAX_CostCapex = new Promise((resolve, reject) => {
                this.suggestion.MAX_CostCapex(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.MAX_CAPEX_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });


            });
            let MAX_Engineering = new Promise((resolve, reject) => {
                this.suggestion.MAX_Engineering(this.condition).subscribe(result => {
                    if (!this.direcCapexOnly) {
                        this.MAX_CAPEX_ACTIVE(result);
                        resolve(true);
                    } else {
                        resolve(true);

                    }
                });
            });
            let NoRequestCAPEX = new Promise((resolve, reject) => {
                if (!this.direcCapexOnly) {
                    this.NoRequestCAPEX();
                    resolve(true);
                } else {
                    resolve(true);
                }
            });



            Promise.all(
                [PIM_RAM_FACTOR_RAM_NoCase,
                    PIM_RAM_FACTOR_JFactor_NoCase,
                    MAX_Maintain_NoCase,
                    MAX_Growth_NoCase,
                    MAX_SustainCore_EnergySaving_NoCase,
                    MAX_Sustaincore_NoCase,
                    PIM_Maintain_NoCase,
                    PIM_RAM_FACTOR,
                    PIM_Maintain,
                    PIM_Growth_Criteria,
                    PIM_Growth_Criteria_TypeBenefit,
                    PIM_Growth_Criteria_PayBackPeriod,
                    PIM_SustainCore_Criteria,
                    PIM_SustainCore_Criteria_TypeBenefit,
                    PIM_SustainCore_Criteria_PayBackPeriod,
                    PIM_SustainCore_EnergySaving_Criteria,
                    PIM_SustainCore_EnergySaving_Criteria_TypeBenefit,
                    PIM_SustainCore_EnergySaving_Criteria_PayBackPeriod,
                    PIM_Maintain_Criteria,
                    PIM_Maintain_Criteria_TypeBenefit,
                    PIM_Maintain_Criteria_PayBackPeriod,
                    CAPEX_Replacement,
                    CAPEX_Replacement_Cost,
                    CAPEX_Replacement_Criteria,
                    CAPEX_Replacement_Criteria_TypeBenefit,
                    CAPEX_Replacement_Criteria_PayBackPeriod,
                    CAPEX_ER_Growth_SustainCore,
                    CAPEX_ER_Maintain,
                    CAPEX_ER_Environment,
                    CAPEX_CostCapex,
                    CAPEX_Criteria_TypeBenefit,
                    CAPEX_Criteria_PayBackPeriod,
                    CAPEX_Criteria,
                    CAPEX_Pool_Engineering,
                    CAPEX_Pool_Cost_Engineering,
                    CAPEX_Engineering_Cost,
                    CAPEX_Engineering_Criteria,
                    CAPEX_Engineering_Criteria_TypeBenefit,
                    CAPEX_Engineering_Criteria_PayBackPeriod,
                    CIM_Growth,
                    CIM_SustainCore,
                    CIM_SustainCore_EnergySaving,
                    CIM_Divest_MnA,
                    CIM_CVC,
                    CIM_ItCapex_DigitalCapex,
                    DIM_ItCapex_DigitalCapex_Criteria,
                    DIM_ItCapex_DigitalCapex_Criteria_TypeBenefit,
                    DIM_ItCapex_DigitalCapex_Criteria_PayBackPeriod,
                    DIM_NON_FINANCIAL_Growth_SustainCore,
                    DIM_Growth_SustainCore,
                    DIM_Maintain,
                    DIM_NON_Maintain,
                    DIM_CostCapex,
                    DIM_NON_CostCapex,
                    DIM_Environment,
                    DIM_MAX_Maintain,
                    DIM_MAX_CostCapex,
                    CVC_SendEmail,
                    MAX_DIM_Growth_SustainCore,
                    MAX_Maintain,
                    MAX_Replacement,
                    MAX_Growth,
                    MAX_SustainCore,
                    MAX_SustainCore_EnergySaving,
                    MAX_ItCapex_DigitalCapex,
                    MAX_CostCapex,
                    MAX_Engineering,
                    NoRequestCAPEX
                ]
            ).then(
                () => {
                    let fx = (this.formGroup.get('initiativesForm')?.get('costEstCapexType').value === 'USD') ? this.formGroup.get('initiativesForm')?.get('fxExchange')?.value : 1;
                    let costEst = this.formGroup.get('initiativesForm')?.get('costEstCapex').value ? this.formGroup.get('initiativesForm')?.get('costEstCapex').value * fx : 0;
                    let typeOfInvestment = this.formGroup.get('initiativesForm')?.get('typeOfInvestment').value;

                    // console.log(this.IsCim, this.IsPim, this.IsDim, this.IsCapex, this.IsMax, this.IsCpi, this.IsStrategy, this.IsRandD, this.IsOther);


                    //set default suggestion to directcapex only ------------ 6-5-2021 krit
                    if (this.companyService.defaultToDirectCapex.indexOf(companyFormList.id) >= 0 && this.initiativesForm.controls.requestCapex.value == "true") {
                        this.DisableSuggest(['pim', 'cim', 'max', 'dim', 'cpi', 'strategy', 'randD', 'other']);
                        this.EnableSuggest(['directCapex']);
                        this.initiativesForm.controls.directCapex.setValue(true);
                        this.IsCapex = true;
                    } else {
                        if ((this.involveItDigital || typeOfInvestment === "IT CAPEX" || typeOfInvestment === "Digital CAPEX")) {
                            this.ClearSuggestion();
                            this.DisableSuggest(['pim', 'cim', 'max', 'directCapex', 'cpi', 'strategy', 'randD', 'other']);
                            this.EnableSuggest(['dim']);
                            this.initiativesForm.controls.dim.setValue(true);
                            this.IsDim = true;
                        }
                        else if (this.formGroup.get('initiativesForm')?.get('typeBenefit').value === 'FINANCIAL'
                            && this.formGroup.get('initiativesForm')?.get('payBackPeriod').value <= 3
                            && costEst < 300) {
                            this.initiativesForm.controls.max.setValue(true);
                            this.EnableSuggest(['max']);
                        }
                        this.initiativeService.suggestion = true;
                        let initiativeFormValue: Initiative = (this.formGroup.get('initiativesForm') as FormGroup).getRawValue();
                        this.initiativeService.setGeneralData(initiativeFormValue);
                        this.Suggestion.emit(true);


                    }
                }
            )
            // this.suggestion.PIM_RAM_FACTOR_RAM_NoCase(this.condition).subscribe(result => result ? this.swalTool.NoCase() : null);
            // this.suggestion.PIM_RAM_FACTOR_JFactor_NoCase(this.condition).subscribe(result => result ? this.swalTool.NoCase() : null);
            // this.suggestion.MAX_Maintain_NoCase(this.condition).subscribe(result => result ? this.swalTool.NoCase() : null);
            // this.suggestion.MAX_Growth_NoCase(this.condition).subscribe(result => result ? this.swalTool.NoCase() : null);
            // this.suggestion.MAX_SustainCore_EnergySaving_NoCase(this.condition).subscribe(result => result ? this.swalTool.NoCase() : null);
            // this.suggestion.MAX_Sustaincore_NoCase(this.condition).subscribe(result => result ? this.swalTool.NoCase() : null);
            // this.suggestion.PIM_Maintain_NoCase(this.condition).subscribe(result => result ? this.swalTool.NoCase() : null);
            // this.suggestion.PIM_RAM_FACTOR(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_Maintain(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_Growth_Criteria(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_Growth_Criteria_TypeBenefit(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_Growth_Criteria_PayBackPeriod(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_SustainCore_Criteria(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_SustainCore_Criteria_TypeBenefit(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_SustainCore_Criteria_PayBackPeriod(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_SustainCore_EnergySaving_Criteria(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_SustainCore_EnergySaving_Criteria_TypeBenefit(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_SustainCore_EnergySaving_Criteria_PayBackPeriod(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_Maintain_Criteria(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_Maintain_Criteria_TypeBenefit(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.PIM_Maintain_Criteria_PayBackPeriod(this.condition).subscribe(result => this.PIM_ACTIVE(result));
            // this.suggestion.CAPEX_Replacement(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Replacement_Cost(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Replacement_Criteria(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Replacement_Criteria_TypeBenefit(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Replacement_Criteria_PayBackPeriod(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_ER_Growth_SustainCore(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_ER_Maintain(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_ER_Environment(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_CostCapex(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Criteria_TypeBenefit(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Criteria_PayBackPeriod(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Criteria(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Pool_Engineering(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Pool_Cost_Engineering(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Engineering_Cost(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Engineering_Criteria(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Engineering_Criteria_TypeBenefit(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CAPEX_Engineering_Criteria_PayBackPeriod(this.condition).subscribe(result => this.CAPEX_ACTIVE(result));
            // this.suggestion.CIM_Growth(this.condition).subscribe(result => this.CIM_ACTIVE(result));
            // this.suggestion.CIM_SustainCore(this.condition).subscribe(result => this.CIM_ACTIVE(result));
            // this.suggestion.CIM_SustainCore_EnergySaving(this.condition).subscribe(result => this.CIM_ACTIVE(result));
            // this.suggestion.CIM_Divest_MnA(this.condition).subscribe(result => this.CIM_ACTIVE(result));
            // this.suggestion.CIM_CVC(this.condition).subscribe(result => this.CIM_ACTIVE(result));
            // this.suggestion.CIM_ItCapex_DigitalCapex(this.condition).subscribe(result => this.CIM_ACTIVE(result));
            // this.suggestion.DIM_ItCapex_DigitalCapex_Criteria(this.condition).subscribe(result => this.DIM_ACTIVE(result));
            // this.suggestion.DIM_ItCapex_DigitalCapex_Criteria_TypeBenefit(this.condition).subscribe(result => this.DIM_ACTIVE(result));
            // this.suggestion.DIM_ItCapex_DigitalCapex_Criteria_PayBackPeriod(this.condition).subscribe(result => this.DIM_ACTIVE(result));
            // this.suggestion.DIM_NON_FINANCIAL_Growth_SustainCore(this.condition).subscribe(result => this.DIM_ACTIVE(result));
            // this.suggestion.DIM_Growth_SustainCore(this.condition).subscribe(result => this.DIM_ACTIVE(result));
            // this.suggestion.DIM_Maintain(this.condition).subscribe(result => this.DIM_ACTIVE(result));
            // this.suggestion.DIM_NON_Maintain(this.condition).subscribe(result => this.DIM_ACTIVE(result));
            // this.suggestion.DIM_CostCapex(this.condition).subscribe(result => this.DIM_ACTIVE(result));
            // this.suggestion.DIM_NON_CostCapex(this.condition).subscribe(result => this.DIM_ACTIVE(result));
            // this.suggestion.DIM_Environment(this.condition).subscribe(result => this.DIM_ACTIVE(result));
            // this.suggestion.DIM_MAX_Maintain(this.condition).subscribe(result => this.MAX_DIM_ACTIVE(result));
            // this.suggestion.DIM_MAX_CostCapex(this.condition).subscribe(result => this.MAX_DIM_ACTIVE(result));
            // this.suggestion.CVC_SendEmail(this.condition).subscribe(result => result ? this.swalTool.SendMail() : null);
            // this.suggestion.MAX_DIM_Growth_SustainCore(this.condition).subscribe(result => this.MAX_DIM_ACTIVE(result));
            // this.suggestion.MAX_Maintain(this.condition).subscribe(result => this.MAX_PIM_ACTIVE(result));
            // this.suggestion.MAX_Replacement(this.condition).subscribe(result => this.MAX_CAPEX_ACTIVE(result));
            // this.suggestion.MAX_Growth(this.condition).subscribe(result => this.MAX_PIM_ACTIVE(result));
            // this.suggestion.MAX_SustainCore(this.condition).subscribe(result => this.MAX_PIM_ACTIVE(result));
            // this.suggestion.MAX_SustainCore_EnergySaving(this.condition).subscribe(result => this.MAX_PIM_ACTIVE(result));
            // this.suggestion.MAX_ItCapex_DigitalCapex(this.condition).subscribe(result => this.MAX_DIM_ACTIVE(result));
            // this.suggestion.MAX_CostCapex(this.condition).subscribe(result => this.MAX_CAPEX_ACTIVE(result));
            // this.suggestion.MAX_Engineering(this.condition).subscribe(result => this.MAX_CAPEX_ACTIVE(result));
            // this.NoRequestCAPEX();
        } else {
            //this.swalTool.Required();
            //this.formGroup.get('name').touched;
            //this.initiativesForm.controls['name'].markAsTouched();
            //this.initiativesForm.controls['name'].setErrors({ 'invalid': true });
        }
    }

    SearchCoDeveloper(event) {
        this.GetCoDevelopers(event.term);
    }

    RemoveCoDeveloper() {
        this.GetCoDevelopers();
    }

    SearchOwnerName(event) {
        this.GetOwners(event.term);
    }

    ClearOwnerName() {
        this.GetOwners();
    }

    ChangeOwnerName() {
        this.GetCoDevelopers();
    }

    SelectCoDeveloper() {
        if (this.initiativesForm.controls.coDeveloper.value) {
            this.initiativeService.UpdateCoDeveloper(this.id, this.initiativesForm.controls.coDeveloper.value).subscribe(() => {
                this.CheckSwalType();
            });
        } else {
            this.initiativeService.DeleteCoDeveloper(this.id).subscribe(() => this.CheckSwalType());
        }
    }

    SetFormDate() {
        switch (this.page) {
            case 'create':
                this.initiativesForm.patchValue({
                    registeringDate: this.dateRegister ? new Date(this.dateRegister) : new Date(),
                    startingDate: this.dateStart ? this.dateStart : null,
                    finishingDate: this.dateFinish ? this.dateFinish : null,
                    createdBy: this.createdBy ? this.createdBy : this.username,
                });
                break;
            case 'edit':
                this.initiativesForm.patchValue({
                    registeringDate: this.dateRegister ? new Date(this.dateRegister) : new Date(),
                    startingDate: this.dateStart ? this.dateStart : null,
                    finishingDate: this.dateFinish ? this.dateFinish : null,
                    createdBy: this.createdBy ? this.createdBy : this.username,
                });
                break;
        }
    }

    CheckSwalType() {
        switch (this.type) {
            case 'submit':
                if (this.ButtonNext) {
                    if (((this.IsCim || this.IsStrategy) && !this.IsMax)) {
                        this.swalTool.DetailCimStrategy();
                    } else if (this.IsMax) {
                        this.swalTool.DetailMax();
                    } else if (this.IsCapex && !this.IsMax) {
                        this.swalTool.DetailDirect();
                    }
                } else {
                    if (((this.IsCim || this.IsStrategy) && !this.IsMax) && (this.page === 'create')) {
                        this.swalTool.DetailCimStrategy();
                    } else if ((this.IsMax) && (this.page === 'create')) {
                        this.swalTool.DetailMax();
                    } else if ((this.IsCapex && this.page === 'create') && !this.IsMax) {
                        this.swalTool.DetailDirect();
                    }
                }
                break;
        }
    }

    SaveRequestOpex() {
        if (this.initiativesForm.controls.requestOpex.value === 'falseOpex') {
            this.impactService.DeleteImpiemantCost(this.id).subscribe(() => { });
        }
    }

    NextSubmit(value) {
        this.ButtonNext = value;
    }

    TypeRedirect() {
        this.DisabledButtonSave();
        // this.RemoveFormSession();
        switch (this.type) {
            case 'draft':
                setTimeout(() => {
                    if (this.page === 'create') {
                        this.router.navigate(['/initiative/edit']);
                    }
                }, 1700);
                break;
            case 'submit':
                if (this.ButtonNext) {
                    sessionStorage.setItem('isInitiativesForm', 'true');
                    sessionStorage.setItem('InitiativesForm', JSON.stringify(this.initiativesForm.value));
                    // sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
                    if ((this.IsCim || this.IsStrategy) && !this.IsMax) {
                        setTimeout(() => this.router.navigate(['/initiative/detail']), 1700);
                    }
                    else {
                        setTimeout(() => this.router.navigate(['/initiative/direct']), 1700);
                    }


                    //if ((this.IsCim || this.IsStrategy) && !this.IsMax) {
                    //  sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
                    //  setTimeout(() => this.router.navigate(['/initiative/detail']), 1700);
                    //} else if (this.IsMax) {
                    //  sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
                    //  setTimeout(() => this.router.navigate(['/initiative/detail-max']), 1700);
                    //} else if ((this.IsCapex) && !this.IsMax) {
                    //  sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
                    //  setTimeout(() => this.router.navigate(['/initiative/direct']), 1700);
                    //} else {
                    //  setTimeout(() => this.router.navigate(['/initiative/my-own']), 1700);
                    //}
                } else {

                    sessionStorage.setItem('isInitiativesForm', 'true');
                    sessionStorage.setItem('InitiativesForm', JSON.stringify(this.initiativesForm.value));
                    // sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
                    if (this.IsMax) {
                        setTimeout(() => this.router.navigate(['/initiative/detail-max']), 1700);
                    }
                    else if ((this.IsCim || this.IsStrategy)) {
                        setTimeout(() => this.router.navigate(['/initiative/detail']), 1700);
                    }
                    else {
                        setTimeout(() => this.router.navigate(['/initiative/direct']), 1700);
                    }


                    //setTimeout(() => this.router.navigate(['/initiative/direct']), 1700);
                    //if (((this.IsCim || this.IsStrategy) && !this.IsMax) && (this.page === 'create')) {
                    //  sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
                    //  setTimeout(() => this.router.navigate(['/initiative/detail']), 1700);
                    //} else if (this.IsMax && this.page === 'create') {
                    //  sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
                    //  setTimeout(() => this.router.navigate(['/initiative/detail-max']), 1700);
                    //} else if ((this.IsCapex && this.page === 'create') && !this.IsMax) {
                    //  sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
                    //  setTimeout(() => this.router.navigate(['/initiative/direct']), 1700);
                    //} else {
                    // setTimeout(() => this.router.navigate(['/initiative/my-own']), 1700);
                    //}
                }
                break;
        }
    }

    OnlyMax() {
        if (!this.CheckOnlyMax) {
            if (this.IsMax) { this.initiativesForm.patchValue({ initiativeType: 'max' }); }
        }
    }

    SaveDraft() {
        this.EnabledButtonSave();
        this.initiativesForm.controls.name.markAsTouched();

        if (this.initiativesForm.controls.name.valid) {
            this.OnlyMax();
            this.type = 'draft';
            this.SetFormDate();
            this.CurrentPage();
            this.DisabledButtonSave();
        } else {
            this.DisabledButtonSave();
            this.swalTool.Required();
        }
    }

    SaveSubmit() {
        this.EnabledButtonSave();
        // if (this.CheckValidForm) {
        //   this.OnlyMax();
        //   this.SetFormDate();
        //   this.type = 'submit';
        //   this.CurrentPage();
        //   this.DisabledButtonSave();
        // } else {
        //   this.DisabledButtonSave();
        //   if (this.initiativesForm.valid) {
        //     this.swalTool.SelectProcess();
        //   } else {
        //     this.SetMarkAsTouchedFormGeneral();
        //     this.swalTool.Required();
        //   }
        // }
    }

    PatchSuggest() {
        this.initiativesForm.patchValue({
            cim: this.IsCim ? true : false,
            pim: this.IsPim ? true : false,
            dim: this.IsDim ? true : false,
            max: this.IsMax ? true : false,
            cpi: this.IsCpi ? true : false,
            directCapex: this.IsCapex ? true : false,
            strategy: this.IsStrategy ? true : false,
            randD: this.IsRandD ? true : false,
            other: this.IsOther ? true : false
        });
    }

    CreateDraftInitiative() {
        this.initiativeService.CreateDraftInitiative(this.initiativesForm.value).subscribe(response => {
            sessionStorage.setItem('id', response.id.toString());
            if (this.initiativesForm.controls.coDeveloper.value) {
                this.initiativeService.CreateCoDeveloper(response.id, this.initiativesForm.controls.coDeveloper.value).subscribe(() => { });
            }
            this.CheckSwalType();
            this.TypeRedirect();
        }, error => this.response.error(error));
    }

    CreateSubmitInitiative() {
        this.initiativeService.CreateSubmitInitiative(this.initiativesForm.value).subscribe(response => {
            if (response) {
                sessionStorage.setItem('id', response.id.toString());
                this.initiativeCode = response.initiativeCode;
                this.initiativesForm.patchValue(response);
                if (this.initiativesForm.controls.coDeveloper.value) {
                    this.initiativeService.CreateCoDeveloper(response.id, this.initiativesForm.controls.coDeveloper.value).subscribe(() => { });
                }
                this.CheckSwalType();
                this.TypeRedirect();
            }
        }, error => this.response.error(error));
    }

    UpdateDraftInitiative() {
        this.initiativesForm.patchValue({ updatedBy: this.username });
        this.initiativeService.UpdateDraftInitiative(this.id, this.initiativesForm.value).subscribe(response => {

            let lastUpdate = response.updatedDate.toString();
            sessionStorage.setItem('lasttime', lastUpdate.slice(0, lastUpdate.indexOf('+')));
            sessionStorage.setItem('id', response.id.toString());
            this.initiativesForm.patchValue(response);
            this.GetSetDate(response.registeringDate, response.startingDate, response.finishingDate);
            setTimeout(() => {
                this.initiativesForm.patchValue({
                    // registeringDate: this.dateRegisterDisplay,
                    // startingDate: this.dateStartDisplay,
                    // finishingDate: this.dateFinishDisplay,
                    fxExchange: response.fxExchange !== 0 ? response.fxExchange : null,
                });
            }, 350);
            this.initiativesForm.patchValue({
                cim: false, pim: false, dim: false, max: false, directCapex: false, cpi: false, strategy: false, randD: false, other: false
            });
            this.DisableSuggest(['cim', 'pim', 'dim', 'directCapex', 'cpi', 'strategy', 'randD', 'other', 'max']);
            this.ActiveSuggestion(response);
            this.SelectCoDeveloper();
            this.TypeRedirect();

        }, error => this.response.error(error));
    }

    UpdateSubmitInitiative() {
        this.initiativesForm.patchValue({ updatedBy: this.username });
        this.initiativeService.UpdateSubmitInitiative(this.id, this.initiativesForm.value).subscribe(response => {
            sessionStorage.setItem('id', response.id.toString());
            this.initiativesForm.patchValue(response);
            this.GetSetDate(response.registeringDate, response.startingDate, response.finishingDate);
            this.initiativesForm.patchValue({
                // registeringDate: this.dateRegisterDisplay,
                // startingDate: this.dateStartDisplay,
                // finishingDate: this.dateFinishDisplay,
                fxExchange: response.fxExchange !== 0 ? response.fxExchange : null,
            });
            this.initiativesForm.patchValue({
                cim: false, pim: false, dim: false, max: false, directCapex: false, cpi: false, strategy: false, randD: false, other: false
            });
            this.DisableSuggest(['cim', 'pim', 'dim', 'directCapex', 'cpi', 'strategy', 'randD', 'other', 'max']);
            this.ActiveSuggestion(response);
            this.SelectCoDeveloper();
            this.TypeRedirect();
        }, error => this.response.error(error));
    }

    CurrentPage() {
        switch (this.page) {
            case 'create':
                switch (this.type) {
                    case 'draft':
                        this.CreateDraftInitiative();
                        break;
                    case 'submit':
                        this.CreateSubmitInitiative();
                        break;
                }
                break;
            case 'edit':
                this.EnableSuggest(['pim', 'cim', 'max', 'directCapex', 'dim', 'cpi', 'strategy', 'randD', 'other']);
                this.PatchSuggest();
                this.SaveRequestOpex();
                switch (this.type) {
                    case 'draft':
                        this.UpdateDraftInitiative();
                        break;
                    case 'submit':
                        this.UpdateSubmitInitiative();
                        break;
                }
                break;
        }
    }

    RemoveFormSession() {
        this.removeService.Form();
    }

    Draft(page) {
        if (['create', 'edit'].indexOf(page) !== -1) {
            this.SaveDraft();
        }
    }

    Submit(page) {
        if (['create', 'edit'].indexOf(page) !== -1) {
            this.SaveSubmit();
        }
    }

    OnChangeStrategyYear(value: Date) {
        if (value != null) {
            let year = value.getFullYear();
            let yearOld = this.strategicYear ? parseInt(this.strategicYear) : null;
            if (yearOld != year) {
                this.strategicYear = year.toString();
                this.initiativesForm.get('strategicObjective').setValue("");
                this.initiativesForm.get('strategyType').setValue("");
                this.initiativesForm.get('strategyType').disable();
                this.detailService.GetStrategicObjectives(year).subscribe(result => {
                    this.strategicObjectives = result
                });
            }
        }
    }

    OnChangeAlignStrategy() {
        this.alignWithCorpStrategy = this.initiativesForm.get('alignWithCorpStrategy')?.value;
        if (!this.alignWithCorpStrategy) {
            let control = ['strategicYear', 'strategicObjective', 'strategyType', 'year'];
            control.forEach(x => {
                this.initiativesForm.get(x).setValue(null);
            })
        }
        this.RequestCapexHideShowCheck();
    }

    OnChangeStrategic(event) {
        if (!this.initiativeService.viewMode) this.initiativesForm.controls.strategyType.enable();
        this.initiativesForm.controls.strategyType.setValidators([Validators.required]);
        this.initiativesForm.controls.strategyType.updateValueAndValidity();
        const strategicObjectiveId = event.target.value;
        this.detailService.GetStrategies(strategicObjectiveId).subscribe(strategies => {
            this.strategies = strategies
        });
    }

    get invalidStrategicObjective() {
        return this.initiativesForm.controls.strategicObjective.touched && this.initiativesForm.controls.strategicObjective.invalid;
    }

    get invalidStrategyDetail() {
        return this.initiativesForm.controls.strategyType.touched && this.initiativesForm.controls.strategyType.invalid;
    }

    OnChangeRequestProjectEngineer(event) {
        if(this.formGroup.get('detailPimForm').get('projectManager') && event === true){
            let plant = this.formGroup.get('initiativesForm').get('plant').value
            let Indicator = {
                variable: ['projectManager'],
                indicator: ['@projectmanager']
            };
            Indicator.indicator.forEach((ind, index) => {
                let IndicatorData: any = {
                    initiativeId: this.initiativeService.id,
                    indicator: ind
                }
                this.initiativeService.GetOwnerNameByIndicatorByPlant(IndicatorData,plant).then((responseInd) => {
                    this.formGroup.get('detailPimForm').get(Indicator.variable[index]).patchValue(responseInd && responseInd[0] ? responseInd[0].ownerName : null);
                });
            });
        } else {
            //claer value in Projectteam 
            this.formGroup.get('detailPimForm').get('projectManager').patchValue(null);
        }
    }

    OnChangeCalculationIrr() {
        if (this.formGroup.get('initiativesForm')?.get('useIrrCalculate').value) {
            this.useIrrCalculate = true;
            this.initiativeService.useIrrCalculate = true;
            this.reCalculateIrr();
        } else {
            this.reCalculateIrr();
            this.useIrrCalculate = false;
            this.initiativeService.useIrrCalculate = false;
            this.formGroup.get('initiativesForm').patchValue({
                residualValue: null,
                utilitiesCost: null,
                maintenanceCost: this.initiativeService.maintenanceCost,
                catalystChemicalsCost: null,
                labourCost: null,
            });
        }
    }

    CalculateIrr() {
        if (!this.useIrrCalculate) {
            return;
        }
        this.CalculateLoading = true;
        let detailIrr: IrrDetail = {
            costEstCapex: this.formGroup.get('initiativesForm').get('costEstCapex').value,
            benefitAmount: this.formGroup.get('initiativesForm').get('benefitAmount').value,
            residualValue: this.formGroup.get('initiativesForm').get('residualValue').value,
            utilitiesCost: this.formGroup.get('initiativesForm').get('utilitiesCost').value,
            maintenanceCost: this.formGroup.get('initiativesForm').get('maintenanceCost').value,
            catalystChemicalsCost: this.formGroup.get('initiativesForm').get('catalystChemicalsCost').value,
            labourCost: this.formGroup.get('initiativesForm').get('labourCost').value,
            wacc: this.formGroup.get('initiativesForm').get('wacc').value,
            startingDate: this.formGroup.get('initiativesForm').get('startingDate').value,
            finishingDate: this.formGroup.get('initiativesForm').get('finishingDate').value,
            fxExchange: this.costEstCapexType == 'THB' ? 1 : this.formGroup.get('initiativesForm').get('fxExchange').value
        }
        this.initiativeService.CalculateIrr(detailIrr).then((caculateRes) => {
            this.CalculateLoading = false;
            this.formGroup.get('initiativesForm').get('irr').setValue(caculateRes);
        }).catch((error) => {
            this.CalculateLoading = false;
            this.swalTool.CalculateIrrError();
        });
    }

    reCalculateIrr() {
        if (!this.useIrrCalculate || !this.dataLoaded) {
            return;
        }
        this.formGroup.get('initiativesForm').get('irr').setValue(null);
    }

    getFactor(type: string) {
        let valueSelect = this.initiativesForm.get(type).value;
        let index = this[type + 'List']?.findIndex((x) => x.value == valueSelect);
        if (index >= 0) {
            this.initiativesForm.get(type + 'Ratio').setValue(this[type + 'List'][index].factor);
        }
        this.changeConitionCalJFactor();
        this.calculateProbability();
    }

    getCustom(type: string) {
        if (this.initiativesForm.get(type).value == "Custom") {
            return false;
        } else {
            return true;
        }
    }

    changeConitionCalRam() {
        this.initiativesForm.get('ram').setValue(null);
        if (this.initiativesForm.get('jFactor')) {
            this.initiativesForm.get('jFactor').setValue(null);
        }
    }

    changeConitionCalJFactor() {
        if (this.initiativesForm.get('jFactor')) {
            this.initiativesForm.get('jFactor').setValue(null);
            this.initiativesForm.get('baseRisk').setValue(null);
            this.initiativesForm.get('riskOfAlt').setValue(null);
            this.initiativesForm.get('riskReduction').setValue(null);
        }
    }

    CalculateRam() {
        this.CalculateLoading = true;
        let detailRam: RamDetail = {
            plant: this.formGroup.get('initiativesForm').get('plant').value,
            likelihood: this.formGroup.get('initiativesForm').get('likelihood').value,
            consequence: this.formGroup.get('initiativesForm').get('consequence').value
        }
        this.initiativeService.CalculateRam(detailRam).then((caculateRes) => {
            let lowLevel = ['Very Low', 'Low'];
            this.CalculateLoading = false;
            this.formGroup.get('initiativesForm').get('ram').setValue(caculateRes['ram']);
            this.formGroup.get('initiativesForm').get('potentialConCost').setValue(caculateRes['potentialCons']);
            if (lowLevel.indexOf(caculateRes['ram']) >= 0) {
                // this.swalTool.LowlevelRam();
                this.HideForm('jFactor');
            } else if (caculateRes['ram'] && caculateRes['ram'] != '') {
                this.reCalculateJFactor();
                this.ShowForm('jFactor');
            }
        }).catch((error) => {
            this.CalculateLoading = false;
            this.swalTool.CalculateRamError();
        });
    }

    CalculateRamAuto() {
        let lowLevel = ['Very Low', 'Low'];
        let ramValue = this.initiativesForm.get('ram').value;
        if (lowLevel.indexOf(ramValue) >= 0) {
            this.HideForm('jFactor');
        } else if (ramValue && ramValue != '') {
            this.reCalculateJFactor();
            this.ShowForm('jFactor');
        }
    }


    CalculateJfactor() {
        this.CalculateLoading = true;
        let detailJFactor: JFactorDetail = {
            plant: this.formGroup.get('initiativesForm').get('plant').value,
            costEstCapex: this.formGroup.get('initiativesForm').get('costEstCapex').value,
            potentialConCost: this.formGroup.get('initiativesForm').get('potentialConCost').value,
            annualLikelihood: this.formGroup.get('initiativesForm').get('annualLikelihood').value,
            annualLikelihoodRatio: this.formGroup.get('initiativesForm').get('annualLikelihoodRatio').value,
            exposureFactor: this.formGroup.get('initiativesForm').get('exposureFactor').value,
            exposureFactorRatio: this.formGroup.get('initiativesForm').get('exposureFactorRatio').value,
            probability: this.formGroup.get('initiativesForm').get('probability').value,
            effectiveness: this.formGroup.get('initiativesForm').get('effectiveness').value,
            effectivenessRatio: this.formGroup.get('initiativesForm').get('effectivenessRatio').value,
            productionLoss: this.formGroup.get('initiativesForm').get('productionLoss').value,
            economicPenalties: this.formGroup.get('initiativesForm').get('economicPenalties').value,
            economicBenefits: this.formGroup.get('initiativesForm').get('economicBenefits').value,
            opexPenaltiesCost: this.formGroup.get('initiativesForm').get('opexPenaltiesCost').value,
            justifiableCost: this.formGroup.get('initiativesForm').get('justifiableCost').value,
            fxExchange: this.costEstCapexType == 'THB' ? 1 : this.formGroup.get('initiativesForm').get('fxExchange').value
        }
        this.initiativeService.CalculateJFactor(detailJFactor).then((caculateRes) => {
            this.CalculateLoading = false;
            this.formGroup.get('initiativesForm').get('jFactor').setValue(caculateRes['jFactor']);
            this.formGroup.get('initiativesForm').get('baseRisk').setValue(caculateRes['baseRisk']);
            this.formGroup.get('initiativesForm').get('riskOfAlt').setValue(caculateRes['riskOfAlt']);
            this.formGroup.get('initiativesForm').get('riskReduction').setValue(caculateRes['riskReduction']);
        }).catch((error) => {
            this.CalculateLoading = false;
            this.swalTool.CalculateJFactorError();
        });
    }
    reCalculateRam() {
        if (!this.showRam || !this.dataLoaded) {
            return;
        }
        this.formGroup.get('initiativesForm').get('ram').setValue(null);
    }
    reCalculateJFactor() {
        if (!this.showJFactor || !this.dataLoaded) {
            return;
        }
        this.formGroup.get('initiativesForm').get('jFactor').setValue(null);
        this.formGroup.get('initiativesForm').get('baseRisk').setValue(null);
        this.formGroup.get('initiativesForm').get('riskOfAlt').setValue(null);
        this.formGroup.get('initiativesForm').get('riskReduction').setValue(null);
    }

    OnHideShow() {
        if (this.hideShowBtnText == "Hide") {
            this.hideShowBtnText = "Show";
        }
        else {
            this.hideShowBtnText = "Hide";
        }
    }

    clearRamForm() {
        this.formGroup.get('initiativesForm').get('ram')?.setValue(null);
        this.formGroup.get('initiativesForm').get('likelihood')?.setValue('');
        this.formGroup.get('initiativesForm').get('consequence')?.setValue('');
    }

    clearJFactorForm() {
        this.formGroup.get('initiativesForm').get('potentialConCost')?.setValue(null);
        this.formGroup.get('initiativesForm').get('annualLikelihood')?.setValue('');
        this.formGroup.get('initiativesForm').get('annualLikelihoodRatio')?.setValue(null);
        this.formGroup.get('initiativesForm').get('exposureFactor')?.setValue('');
        this.formGroup.get('initiativesForm').get('exposureFactorRatio')?.setValue(null);
        this.formGroup.get('initiativesForm').get('probability')?.setValue(null);
        this.formGroup.get('initiativesForm').get('effectiveness')?.setValue('');
        this.formGroup.get('initiativesForm').get('effectivenessRatio')?.setValue(null);
        this.formGroup.get('initiativesForm').get('productionLoss')?.setValue(null);
        this.formGroup.get('initiativesForm').get('economicPenalties')?.setValue(null);
        this.formGroup.get('initiativesForm').get('economicBenefits')?.setValue(null);
        this.formGroup.get('initiativesForm').get('opexPenaltiesCost')?.setValue(null);
        this.formGroup.get('initiativesForm').get('justifiableCost')?.setValue(null);
    }

    onChangePlant() {
        this.reCalculateRam();
        this.reCalculateJFactor();
        this.HideForm('jFactor');
        if(this.formGroup.get('detailPimForm').get('projectManager') && this.formGroup.get('initiativesForm').get('requestProjectEngineer').value === true){
            let plant = this.formGroup.get('initiativesForm').get('plant').value
            let Indicator = {
                variable: ['projectManager'],
                indicator: ['@projectmanager']
            };
            Indicator.indicator.forEach((ind, index) => {
                let IndicatorData: any = {
                    initiativeId: this.initiativeService.id,
                    indicator: ind
                }
                this.initiativeService.GetOwnerNameByIndicatorByPlant(IndicatorData,plant).then((responseInd) => {
                    this.formGroup.get('detailPimForm').get(Indicator.variable[index]).patchValue(responseInd && responseInd[0] ? responseInd[0].ownerName : null);
                });
            });
        }
    }

    calculateProbability() {
        let annualLikelihoodRatio = this.initiativesForm.get('annualLikelihoodRatio').value != null ? this.initiativesForm.get('annualLikelihoodRatio').value : 0;
        let exposureFactorRatio = this.initiativesForm.get('exposureFactorRatio').value != null ? this.initiativesForm.get('exposureFactorRatio').value : 0;
        let calValue = Number(annualLikelihoodRatio) * Number(exposureFactorRatio);
        calValue =  Math.round(calValue*1000)/1000 
        this.initiativesForm.get('probability').patchValue(calValue);
    }

    checkMaxProcessAndStageNull() {
        if (this.initiativeService.suggestionStatus) {
            return this.initiativeService.suggestionStatus.max && (this.initiativeService.suggestionStatus.stage != null)
        }
        return false;
    }

    costEstChanged() {
        this.sendCostEst.emit(this.costEstCapex);
    }
}

