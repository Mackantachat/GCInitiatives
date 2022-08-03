import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { Plan, ProgressPlan } from '../../../core/models/progress-milestone-model';
import { ProgressService } from '@services/progress/progress.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { Initiative } from '@models/initiative';
import { CapexService } from '@services/capex/capex.service';
import { DateUtil } from '@utils/date.utils';
import { PermissionService } from '@services/permission/permission.service';

@Component({
    selector: 'app-progress-milestone2',
    templateUrl: './progress-milestone2.component.html',
    styleUrls: ['./progress-milestone2.component.css']
})
export class ProgressMilestone2Component implements OnInit, OnChanges {
    @Input() formGroup: FormGroup;
    @Input() generalDataProgrerss: Initiative = null;
    @Input() requestIniNoDate: any;
    @Input() finishDate: any;
    @Input() wbsNo: any;
    overallForm: FormGroup;
    engineeringForm: FormGroup;
    procurementForm: FormGroup;
    constructionForm: FormGroup;
    commissioningForm: FormGroup;
    bsConfig: Partial<BsDatepickerConfig>;
    bsConfigOverAllBasicStart: Partial<BsDatepickerConfig>;
    bsConfigOverAllBasicFinish: Partial<BsDatepickerConfig>;
    bsConfigOverAllStart: Partial<BsDatepickerConfig>;
    bsConfigOverAllFinish: Partial<BsDatepickerConfig>;
    // Actual
    bsConfigEngineeringStart: Partial<BsDatepickerConfig>;
    bsConfigEngineeringFinish: Partial<BsDatepickerConfig>;
    bsConfigProcurementStart: Partial<BsDatepickerConfig>;
    bsConfigProcurementFinish: Partial<BsDatepickerConfig>;
    bsConfigConstructionStart: Partial<BsDatepickerConfig>;
    bsConfigConstructionFinish: Partial<BsDatepickerConfig>;
    bsConfigCommissionStart: Partial<BsDatepickerConfig>;
    bsConfigCommissionFinish: Partial<BsDatepickerConfig>;
    // Basic
    bsConfigBasicEngineeringStart: Partial<BsDatepickerConfig>;
    bsConfigBasicEngineeringFinish: Partial<BsDatepickerConfig>;
    bsConfigBasicProcurementStart: Partial<BsDatepickerConfig>;
    bsConfigBasicProcurementFinish: Partial<BsDatepickerConfig>;
    bsConfigBasicConstructionStart: Partial<BsDatepickerConfig>;
    bsConfigBasicConstructionFinish: Partial<BsDatepickerConfig>;
    bsConfigBasicCommissionStart: Partial<BsDatepickerConfig>;
    bsConfigBasicCommissionFinish: Partial<BsDatepickerConfig>;
    today = new Date();
    p = {} as ProgressPlan;
    progressPlan: Array<ProgressPlan> = [];
    listMonthFirst = [];
    listMonth = [];
    listMonthLast = [];
    name = '';
    RequestIniNoDate: Date = null;
    projecctComRun: Date = null;
    Startdate: Date = null;
    minDate: [{
        name: string,
        basicStartDate: Date,
        basicFinishDate: Date,
        actualStartDate: Date
    }];

    sumOfval: number;

    formDate = this.formBuilder.group({
        basicStartDate: [null, Validators.required],
        basicFinishDate: [null, Validators.required],
        actualStartDate: [null, Validators.required],
        actualFinishDate: [null, Validators.required],
        pocWeightPercent: [null, Validators.required],
    })
    initPlan = new Plan();
    poc2Form: FormGroup = this.formBuilder.group({
        overallForm: this.formBuilder.group({
            basicStartDate: [null, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required]
        }),
        engineeringForm: this.formBuilder.group({
            basicStartDate: [null, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required],
            pocWeightPercent: [null, Validators.required],
        }),
        procurementForm: this.formBuilder.group({
            basicStartDate: [null, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required],
            pocWeightPercent: [null, Validators.required],
        }),
        constructionForm: this.formBuilder.group({
            basicStartDate: [null, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required],
            pocWeightPercent: [null, Validators.required],
        }),
        commissioningForm: this.formBuilder.group({
            basicStartDate: [null, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required],
            pocWeightPercent: [null, Validators.required],
        }),
        progressPlan: null
    });


    poc2FormNewLogic: FormGroup = this.formBuilder.group({
        overallForm: this.formBuilder.group({
            basicStartDate: [null, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required]
        }),
        engineeringForm: this.formBuilder.group({
            basicStartDate: [null, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required],
            pocWeightPercent: [null, Validators.required],
        }),
        procurementForm: this.formBuilder.group({
            basicStartDate: [null, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required],
            pocWeightPercent: [null, Validators.required],
        }),
        constructionForm: this.formBuilder.group({
            basicStartDate: [null, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required],
            pocWeightPercent: [null, Validators.required],
        }),
        commissioningForm: this.formBuilder.group({
            basicStartDate: [null, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required],
            pocWeightPercent: [null, Validators.required],
        }),
        progressPlan: this.formBuilder.array([])
    });


    dataPOC = [{ id: 1, tag: 'engineering', type: 'Engineering', name: 'Plan (%)' },
    { id: 2, tag: 'engineering', type: 'Engineering', name: 'Actual (%)' },
    { id: 1, tag: 'procurement', type: 'Procurement', name: 'Plan (%)' },
    { id: 2, tag: 'procurement', type: 'Procurement', name: 'Actual (%)' },
    { id: 1, tag: 'construction', type: 'Construction', name: 'Plan (%)' },
    { id: 2, tag: 'construction', type: 'Construction', name: 'Actual (%)' },
    { id: 1, tag: 'commissioning', type: 'Commissioning', name: 'Plan (%)' },
    { id: 2, tag: 'commissioning', type: 'Commissioning', name: 'Actual (%)' }];
    dataOverall = [{ id: 1, tag: 'overall', type: 'Overall', name: 'Plan (%)' },
    { id: 2, tag: 'overall', type: 'Overall', name: 'Actual (%)' }];
    listOfMonth = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    //today -10 Day
    todayYear = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 10)).getFullYear();
    todayMonth = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 10)).getMonth();

    overallBasicStartDate: Date;
    overallBasicFinishDate: Date;
    overallActualStartDate: Date;
    engineeringBasicStartDate: Date;
    procurementBasicStartDate: Date;
    constructionBasicFinishDate: Date;
    commissioningBasicFinishDate: Date;
    basicStartDate: Date;
    basicFinishDate: Date;

    // ====== Patch value variable. ======
    engineerPlan: number = 0;
    engineerActual: number = 0;
    procurementPlan: number = 0;
    procurementActual: number = 0;
    constructionPlan: number = 0;
    constructionActual: number = 0;
    commissioningPlan: number = 0;
    commissioningActual: number = 0;

    // min,max controller variables
    swEn = true;
    swEnActual = true;
    capEn = {
        minPlan: 0,
        maxPlan: 0,
        minActual: 0,
        maxActual: 0,
    };
    swPro = true;
    swProActual = true;
    capPro = {
        minPlan: 0,
        maxPlan: 0,
        minActual: 0,
        maxActual: 0,
    };
    swCon = true;
    swConActual = true;
    capCon = {
        minPlan: 0,
        maxPlan: 0,
        minActual: 0,
        maxActual: 0,
    };
    swCom = true;
    swComActual = true;
    capCom = {
        minPlan: 0,
        maxPlan: 0,
        minActual: 0,
        maxActual: 0,
    };
    // ======================== //

    constructor(
        private formBuilder: FormBuilder,
        private progressService: ProgressService,
        private initiativeService: InitiativeService,
        private capexService: CapexService,
        private dateUtil: DateUtil,
        private ps: PermissionService
    ) {
        this.minDate = null;

        this.bsConfig = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigOverAllBasicStart = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigOverAllBasicFinish = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigOverAllStart = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigOverAllFinish = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigEngineeringStart = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigEngineeringFinish = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigProcurementStart = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigProcurementFinish = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigConstructionStart = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigConstructionFinish = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigCommissionStart = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigCommissionFinish = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicEngineeringStart = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicEngineeringFinish = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicProcurementStart = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicProcurementFinish = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicConstructionStart = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicConstructionFinish = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicCommissionStart = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicCommissionFinish = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        // this.poc2Form =
        this.p.year = this.currentYear;
        this.capexService.getRequestIniNoDate.subscribe((requestIniRes) => {
            if (requestIniRes && this.isLoaded) {
                this.poc2FormNewLogic.get('overallForm').get('basicStartDate').patchValue(requestIniRes);
                this.clearDateOverRangeNewLogic();
            }
        });

        this.capexService.getFinishDate.subscribe((finishRes) => {
            if (finishRes && this.isLoaded && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise && !this.initiativeService.isReturn)) {
                this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').patchValue(finishRes);
                this.clearDateOverRangeNewLogic();
            }
        });
    }

    currentYear: number = this.today.getFullYear();
    diffYear: number;
    values = '';
    status = '';
    isLoaded: boolean;
    isAdmin: boolean = false;
    planComplete: string;

    disEngineeringComplete: boolean = true;
    disProcurementComplete: boolean = true;
    disConstructionComplete: boolean = true;
    disCommissioningComplete: boolean = true;

    isPOCWeightEngineering: boolean = false;
    isPOCWeightProcurement: boolean = false;
    isPOCWeightConstruction: boolean = false;
    isPOCWeightCommissioning: boolean = false;
    haveValueActualPOCEngineering: boolean = true;
    haveValueActualPOCProcurement: boolean = true;
    haveValueActualPOCConstruction: boolean = true;
    haveValueActualPOCCommissioning: boolean = true;
    allowActualFinishDate: boolean = true;
    isActualStartDate: boolean = false;
    disActualFinish: boolean = true;
    keyPocWeightPercentEngineering: boolean = false;
    keyPocWeightPercentProcurement: boolean = false;
    keyPocWeightPercentConstruction: boolean = false;
    keyPocWeightPercentCommissioning: boolean = false;

    progressPlanFormType: {
        type: string;
        enable: boolean;
    }[] = [
            { type: 'engineering_plan', enable: true },
            { type: 'procurement_plan', enable: true },
            { type: 'construction_plan', enable: true },
            { type: 'commissioning_plan', enable: true },
            { type: 'overall_plan', enable: true },
        ];

    dateComplete: {
        type: string;
        year: string;
        month: number;
    }[] = [];


    ngOnInit(): void {
        if (this.ps.roleSettingDetail != null) {
            //pageId: "ADMIN-PROGRESS"
            if(this.initiativeService.viewMode == false){
                this.isAdmin = this.ps.roleSettingDetail.findIndex((x) => x.pageId == "ADMIN-PROGRESS") >= 0  ? true : false;
              }else{
                this.isAdmin =false;
              }
        }
        this.isLoaded = false;
        this.init();
        this.GetProgressPlanDate();
    }

    init() {
        if (!this.formGroup.get('poc2FormNewLogic')) {
            this.formGroup.addControl('poc2FormNewLogic', this['poc2FormNewLogic']);
        }
    }

    isInvalid(groupName,controlName){
        return (this.poc2FormNewLogic.get(groupName).get(controlName).touched || this.poc2FormNewLogic.get(groupName).get(controlName).dirty) && this.poc2FormNewLogic.get(groupName).get(controlName).invalid;
    }
    GetProgressPlanDate() {

        this.progressService.GetProgressPlanDate(this.initiativeService.id).subscribe(res => {
            this.progressService.GetProgressPlanComplete(this.initiativeService.id).then((planRes) => {
                this.planComplete = planRes;
                let form = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm'];
                let planDateType = ['Engineering', 'Procurement', 'Construction', 'Commissioning'];


                if (res.length > 0 && !this.progressService.changeStandard) {

                    let overAll = res.find(x => x.progressPlanDateType == 'Overall');
                    if (overAll) {
                        this.poc2FormNewLogic.get('overallForm').patchValue({
                            basicStartDate: overAll.basicStartDate ? new Date(overAll.basicStartDate) : null,
                            basicFinishDate: overAll.basicFinishDate ? new Date(overAll.basicFinishDate) : null,
                            actualStartDate: overAll.actualStartDate ? new Date(overAll.actualStartDate) : null,
                            actualFinishDate: overAll.actualFinishDate ? new Date(overAll.actualFinishDate) : null
                        });
                        // Actual Y_Y
                        this.overallActualStartDate = new Date(overAll.actualStartDate)

                        this.bsConfigEngineeringStart = Object.assign({}, { minDate: this.overallActualStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
                        this.bsConfigProcurementStart = Object.assign({}, { minDate: this.overallActualStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
                        this.bsConfigConstructionStart = Object.assign({}, { minDate: this.overallActualStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
                        this.bsConfigCommissionStart = Object.assign({}, { minDate: this.overallActualStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
                        // Basic Y_Y
                        this.overallBasicStartDate = new Date(overAll.basicStartDate)
                        this.bsConfigBasicEngineeringStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
                        this.bsConfigBasicProcurementStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
                        this.bsConfigBasicConstructionStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
                        this.bsConfigBasicCommissionStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });

                    }

                    res.forEach((resp) => {
                        let pIndex = planDateType.findIndex((pd) => pd == resp.progressPlanDateType);

                        if (pIndex >= 0) {
                            this.poc2FormNewLogic.get(form[pIndex])?.patchValue({
                                basicStartDate: resp.basicStartDate ? this.setBasicStartDate(new Date(resp.basicStartDate), form[pIndex]) : null,
                                basicFinishDate: resp.basicFinishDate ? new Date(resp.basicFinishDate) : null,
                                actualStartDate: resp.actualStartDate ? new Date(resp.actualStartDate) : null,
                                actualFinishDate: resp.actualFinishDate ? new Date(resp.actualFinishDate) : null,
                                pocWeightPercent: resp.pocWeightPercent
                            });
                            this['isPOCWeight' + planDateType[pIndex]] = resp.pocWeightPercent != null ? false : true;
                            if (form[pIndex] === 'engineeringForm') {
                                this.isPOCWeightEngineering = resp.pocWeightPercent && resp.pocWeightPercent > 0
                                this.bsConfigBasicEngineeringFinish = Object.assign({}, { minDate: this.setBasicStartDate(new Date(resp.basicStartDate), form[pIndex]), dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
                            } else if (form[pIndex] === 'procurementForm') {
                                this.isPOCWeightProcurement = resp.pocWeightPercent && resp.pocWeightPercent > 0;
                                this.bsConfigBasicProcurementFinish = Object.assign({}, { minDate: this.setBasicStartDate(new Date(resp.basicStartDate), form[pIndex]), dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
                            } else if (form[pIndex] === 'constructionForm') {
                                this.isPOCWeightConstruction = resp.pocWeightPercent && resp.pocWeightPercent > 0;
                                this.bsConfigBasicConstructionFinish = Object.assign({}, { minDate: this.setBasicStartDate(new Date(resp.basicStartDate), form[pIndex]), dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
                            } else if (form[pIndex] === 'commissioningForm') {
                                this.isPOCWeightCommissioning = resp.pocWeightPercent && resp.pocWeightPercent > 0;
                                this.bsConfigBasicCommissionFinish = Object.assign({}, { minDate: this.setBasicStartDate(new Date(resp.basicStartDate), form[pIndex]), dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
                            }
                        }
                    });
                    this.clearDateOverRangeNewLogic();

                } else if (this.requestIniNoDate && this.progressService.changeStandard) {
                    this.poc2FormNewLogic.get('overallForm').patchValue({
                        basicStartDate: new Date(this.requestIniNoDate),
                        basicFinishDate: new Date(this.finishDate)
                    });
                    this.clearDateOverRangeNewLogic();
                }
                else {

                    //get capex
                    this.capexService.GetCapexInformationList(this.initiativeService.id).subscribe(response => {
                        // StartingDate
                        if (response.length > 0) {
                            this.RequestIniNoDate = response[response.length - 1].requestIniNoDate ? new Date(response[response.length - 1].requestIniNoDate) : new Date(response[response.length - 1].startingDate);
                            this.projecctComRun = response[response.length - 1].projecctComRun ? new Date(response[response.length - 1].projecctComRun) : null;

                            this.overallBasicStartDate = response[response.length - 1].requestIniNoDate ? new Date(response[response.length - 1].requestIniNoDate) : null;
                            this.poc2FormNewLogic.get('overallForm').patchValue({
                                basicStartDate: this.RequestIniNoDate ? new Date(this.RequestIniNoDate) : new Date(this.Startdate),
                                basicFinishDate: this.projecctComRun ? new Date(this.projecctComRun) : null,
                            });
                            this.clearDateOverRangeNewLogic();

                        } else {
                            this.initiativeService.GetInitiative(this.initiativeService.id).subscribe((generalRes) => {
                                this.generalDataProgrerss = generalRes;
                                this.poc2FormNewLogic.get('overallForm').patchValue({
                                    basicStartDate: generalRes.startingDate ? new Date(generalRes.startingDate) : null,
                                    basicFinishDate: generalRes.finishingDate ? new Date(generalRes.finishingDate) : null
                                });
                                this.clearDateOverRangeNewLogic();
                            });

                        }
                    });
                }
            });
        });
    }
    GetProgressPlan() {
        this.progressService.GetProgressPlan(this.initiativeService.id).subscribe(res => {

            // "Procurement" "Engineering"
            let progressPlanType = ['Engineering', 'Procurement', 'Construction', 'Commissioning', 'Overall'];
            let progressPlanForm = ['engineering_plan', 'procurement_plan', 'construction_plan', 'commissioning_plan', 'overall_plan'];
            let planActualType = ['Plan', 'Actual'];
            let planActualForm = ['planValue', 'actualValue'];
            let year = null;
            let i = 0;
            this.progressPlan.length > 0 ? this.progressPlan : this.progressPlan = this.poc2Form.get('progressPlan').value;

            if (res.length > 0) {
                res.forEach((resp, index) => {
                    if (year == null || year == resp.year) {
                        year = resp.year
                        this.progressPlan[i].year = parseInt(resp.year);
                    } else {
                        year = resp.year
                        ++i;
                        this.progressPlan[i].year = parseInt(resp.year);
                    }
                    this.listOfMonth.forEach((month, monthIndex) => {
                        this.progressPlan[i].listMonth[monthIndex].name = month;
                        progressPlanType.forEach((planFormType, planFormIndex) => {
                            if (resp.progressPlanType == planFormType) {
                                planActualType.forEach((planType, planTypeIndex) => {
                                    if (resp.planActual == planType) {
                                        this.progressPlan[i].listMonth[monthIndex][progressPlanForm[planFormIndex]][planActualForm[planTypeIndex]] = resp[month];
                                    }
                                });
                            }
                        });
                    });
                });
            }
            this.isLoaded = true; 
            this.poc2Form.get('progressPlan').patchValue(this.progressPlan);
        });
    }

    get viewMode() {
        return this.initiativeService.viewMode;
    }

    get getPlanError() {
        return this.progressService.checkPlan;
    }

    get getPocPercentError() {
        return this.progressService.checkPocPercent;
    }

    keyPress(event: any) {
        this.progressService.checkPlan = true;
        const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
        if (inputChar == '-') {
            event.preventDefault();
        }
    }
    clearPercentValidate(event: any) {
        this.progressService.checkPocPercent = true;
    }

    clearKeyPercentValidate(event: any, plan: string) {
        if (event.type == 'keypress') {
            this['keyPocWeightPercent' + plan] = true
        }
        this.progressService.checkPocPercent = true;
    }

    clearDateFunction = (formName: string): void => {

        const progressForm = this.poc2Form.value;
        let progressFormName = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm'];
        let minDate = ['engineeringBasicStartDate', 'procurementBasicStartDate', 'constructionBasicFinishDate', 'commissioningBasicFinishDate'];
        let progressControlName = ['engineering_plan', 'procurement_plan', 'construction_plan', 'commissioning_plan'];
        let planActualType = ['Plan', 'Actual'];
        let planActualForm = ['planValue', 'actualValue'];

        let basicStartDate: Date = progressForm[formName]?.basicStartDate;
        let basicFinishDate: Date = progressForm[formName]?.basicFinishDate;


        this[minDate[progressFormName.indexOf(formName)]] = basicStartDate ? basicStartDate : this.overallBasicStartDate;

        if (basicStartDate && basicFinishDate && (basicFinishDate.getTime() > basicStartDate.getTime())) {


            // this.poc2Form.get(formName).get('actualStartDate').setValue(basicStartDate);
            const lenYear = this.progressPlan.length - 1;
            if (this.progressPlan.length > 1) {
                // มากกว่า 1 ปี
                this.progressPlan.forEach((element, index) => {
                    //new Logic
                    if (basicStartDate.getFullYear() > element.year) {
                        element.listMonth.forEach((month, mIndex) => {
                            month[progressControlName[progressFormName.indexOf(formName)]].planValue = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].planAccumulate = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].planDisabled = true;
                            month[progressControlName[progressFormName.indexOf(formName)]].actualValue = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].actualAccumulate = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                        });
                    } else if (basicFinishDate.getFullYear() < element.year) {
                        element.listMonth.forEach((month, mIndex) => {
                            month[progressControlName[progressFormName.indexOf(formName)]].planValue = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].planAccumulate = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].planDisabled = true;
                            month[progressControlName[progressFormName.indexOf(formName)]].actualValue = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].actualAccumulate = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                        });
                    } else {
                        element.listMonth.forEach((month, mIndex) => {
                            if (basicStartDate.getFullYear() == element.year && basicFinishDate.getFullYear() == element.year) {
                                if (mIndex < basicStartDate.getMonth() || mIndex > basicFinishDate.getMonth()) {
                                    // เดือนก่อนหน้า start date
                                    month[progressControlName[progressFormName.indexOf(formName)]].planValue = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].planAccumulate = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].planDisabled = true;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualValue = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualAccumulate = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                                } else {
                                    month[progressControlName[progressFormName.indexOf(formName)]].planDisabled = !!this.wbsNo && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                                }
                            } else if (basicStartDate.getFullYear() == element.year && basicFinishDate.getFullYear() > element.year) {
                                if (mIndex < basicStartDate.getMonth()) {
                                    // เดือนก่อนหน้า start date
                                    month[progressControlName[progressFormName.indexOf(formName)]].planValue = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].planAccumulate = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].planDisabled = true;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualValue = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualAccumulate = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                                } else {
                                    month[progressControlName[progressFormName.indexOf(formName)]].planDisabled = !!this.wbsNo && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                                }
                            } else if (basicFinishDate.getFullYear() == element.year && basicStartDate.getFullYear() < element.year) {
                                if (mIndex > basicFinishDate.getMonth()) {
                                    // เดือนก่อนหน้า start date
                                    month[progressControlName[progressFormName.indexOf(formName)]].planValue = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].planAccumulate = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].planDisabled = true;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualValue = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualAccumulate = null;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                                } else {
                                    month[progressControlName[progressFormName.indexOf(formName)]].planDisabled = !!this.wbsNo && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false;
                                    month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                                }
                            } else {
                                month[progressControlName[progressFormName.indexOf(formName)]].planDisabled = !!this.wbsNo && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false;
                                month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                            }
                        });
                    }


                });
            } else {
                this.progressPlan.forEach((element, index) => {
                    element.listMonth.forEach((month, mIndex) => {
                        if (this.overallBasicFinishDate && mIndex < basicStartDate.getMonth() || mIndex > basicFinishDate.getMonth()) {
                            month[progressControlName[progressFormName.indexOf(formName)]].planValue = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].planAccumulate = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].planDisabled = true;
                            month[progressControlName[progressFormName.indexOf(formName)]].actualValue = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].actualAccumulate = null;
                            month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                        } else {
                            month[progressControlName[progressFormName.indexOf(formName)]].planDisabled = !!this.wbsNo && (!!this.wbsNo && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise)) && !this.isAdmin ? true : false;
                            month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                        }
                    });
                });
            }

            this.poc2Form.get('progressPlan').setValue(this.progressPlan);
            this.clearDateActual(formName);
            this.isLoaded = true;
        }
    }

    getYear(index: number) {
        return this.progressPlan[index].year;
    }


    clearDateActual = (formName: string): void => {

        const progressForm = this.poc2FormNewLogic.value;
        let progressFormName = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm'];
        let progressControlName = ['engineering_plan', 'procurement_plan', 'construction_plan', 'commissioning_plan'];

        let actualStartDate: Date = progressForm[formName]?.actualStartDate;
        let actualFinishDate: Date = progressForm[formName]?.actualFinishDate ? progressForm[formName].actualFinishDate : this.overallBasicFinishDate;
        let actualMonth = actualStartDate !== null ? this.dateUtil.GetDateOnly(this.poc2FormNewLogic.get(formName).get('actualStartDate').value).getMonth() : null;
        let actualYear = actualStartDate !== null ? this.dateUtil.GetDateOnly(this.poc2FormNewLogic.get(formName).get('actualStartDate').value).getFullYear() : null;

        if (actualStartDate && actualFinishDate) {
            this.calMaxdate();
            const lenYear = this.progressPlan.length - 1;
            if (this.progressPlan.length > 1) {
                this.progressPlan.forEach((element, index) => {
                    if (index === 0) {
                        element.listMonth.forEach((month, mIndex) => {
                            if (this.todayYear == element.year && this.todayMonth == mIndex && this.todayYear == actualStartDate.getFullYear() && this.todayMonth >= actualStartDate.getMonth()) {
                                const allowMonth: boolean = this.getStartMonth(actualMonth, actualYear)
                                month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = this.initiativeService.viewMode || !this.wbsNo || allowMonth ? true : false;
                            } else {
                                month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                            }
                        });
                    } else if (index === lenYear) {
                        element.listMonth.forEach((month, mIndex) => {
                            if (this.todayYear == element.year && this.todayMonth == mIndex && this.todayMonth <= actualFinishDate.getMonth() && this.todayYear == actualFinishDate.getFullYear()) {
                                const allowMonth: boolean = this.getStartMonth(actualMonth, actualYear)
                                month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = this.initiativeService.viewMode || !this.wbsNo || allowMonth ? true : false;
                            } else {
                                month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                            }
                        });
                    } else {
                        element.listMonth.forEach((month, mIndex) => {
                            month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                        });
                    }
                });
            } else {
                this.progressPlan.forEach((element, index) => {
                    element.listMonth.forEach((month, mIndex) => {
                        if (mIndex == this.todayMonth) {
                            const allowMonth: boolean = this.getStartMonth(actualMonth, actualYear)
                            month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = this.initiativeService.viewMode || !this.wbsNo || allowMonth ? true : false;
                        } else {
                            month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                        }
                    });
                });
            }

            this.poc2Form.get('progressPlan').setValue(this.progressPlan);
        }
    }

    ngOnChanges() {
        this.poc2FormNewLogic.get('progressPlan').valueChanges.subscribe((pocDataRes) => {
            this.progressPlan = pocDataRes;
            this.progressService.changeProgressPlanDataPoc2(pocDataRes);
        });
    }

    checkValue = (type: string, formName: string): void => { }
    calMaxdate = (): void => {
        let progressFormName = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm'];
        let maxDate: Date = this.today;
        let datedata: Date;
        this.poc2Form.get('overallForm').get('actualFinishDate').setValue(null);
        progressFormName.forEach((formName) => {
            datedata = this.poc2Form.get(formName).get('actualFinishDate').value ? this.poc2Form.get(formName).get('actualFinishDate').value : null;
            if (maxDate && datedata && datedata.getTime() > maxDate.getTime()) {
                maxDate = datedata;
                this.poc2Form.get('overallForm').get('actualFinishDate').setValue(datedata);
            }
        })
    }


    show(type, name_item) {
        if (this.status === type && this.name !== name_item) {
            return 'display:none';
        } else {
            this.status = type;
            this.name = name_item;
            return 'vertical-align : middle;text-align:center;';
        }
    }

    onClickSave() {
        this.poc2Form.get('progressPlan').setValue(this.progressPlan);
    }

    get InitiativeService() {
        return this.initiativeService;
    }

    get getWBS() {
        if (this.wbsNo) {
            return true;
        } else {
            return false;
        }
    }

    clearDateOverRangeNewLogic = (): void => {
        const listMonthName = this.listOfMonth;

        this.overallBasicStartDate = this.poc2FormNewLogic.get('overallForm')?.get('basicStartDate').value;
        this.formGroup.get('initiativesForm')?.get('finishingDate').setValue(this.poc2FormNewLogic.get('overallForm')?.get('basicFinishDate').value);
        let completeDate = this.planComplete ? new Date(parseInt(this.planComplete) - 1, 12, 31) : null;
        
        if(!!completeDate && completeDate > this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value){
            this.overallBasicFinishDate = completeDate;
        }else if (!!completeDate && completeDate < this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value){
            this.overallBasicFinishDate = this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value;
        }else if(!completeDate && this.dateUtil.GetToday > this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value){
            this.overallBasicFinishDate = this.dateUtil.GetToday;
        }else {
            this.overallBasicFinishDate = this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value;
        }
        
        
        this.isActualStartDate = this.poc2FormNewLogic.get('overallForm')?.get('actualStartDate').value ? true : false;
        // Basic
        this.setMinDate()

        if (this.overallBasicFinishDate && this.overallBasicStartDate) {
            //set Min date

            let minDate = ['engineeringBasicStartDate', 'procurementBasicStartDate', 'constructionBasicFinishDate', 'commissioningBasicFinishDate'];
            minDate.forEach((min) => {
                this[min] = this.overallBasicStartDate
            });

            //get year
            const diffYear = this.dateUtil.GetFullYear(this.overallBasicFinishDate) - this.dateUtil.GetFullYear(this.overallBasicStartDate);


            let planArrayForm = this.poc2FormNewLogic.get('progressPlan') as FormArray;
            planArrayForm.clear();
            for (let index = 0; index <= diffYear; index++) {

                let planForm: FormGroup = this.formBuilder.group({
                    year: this.dateUtil.GetFullYear(this.overallBasicStartDate) + index,
                    listMonth: this.formBuilder.array([])
                });
                let plan = planForm.get('listMonth') as FormArray;
                for (let month = 0; month < 12; month++) {
                    let listMonthForm: FormGroup = this.formBuilder.group({
                        name: listMonthName[month],
                        engineering_plan: this.formBuilder.group({
                            planValue: null,
                            planAccumulate: null,
                            planDisabled: false,
                            actualValue: null,
                            actualAccumulate: null,
                            actualDisabled: false
                        }),
                        procurement_plan: this.formBuilder.group({
                            planValue: null,
                            planAccumulate: null,
                            planDisabled: false,
                            actualValue: null,
                            actualAccumulate: null,
                            actualDisabled: false
                        }),
                        construction_plan: this.formBuilder.group({
                            planValue: null,
                            planAccumulate: null,
                            planDisabled: false,
                            actualValue: null,
                            actualAccumulate: null,
                            actualDisabled: false
                        }),
                        commissioning_plan: this.formBuilder.group({
                            planValue: null,
                            planAccumulate: null,
                            planDisabled: false,
                            actualValue: null,
                            actualAccumulate: null,
                            actualDisabled: false
                        }),
                        overall_plan: this.formBuilder.group({
                            planValue: null,
                            planAccumulate: null,
                            planDisabled: false,
                            actualValue: null,
                            actualAccumulate: null,
                            actualDisabled: false
                        })
                    });

                    plan.push(listMonthForm);
                }
                planArrayForm.push(planForm);
            }
            this.GetProgressPlanNewLogic();
        }
    }

    //เรียกข้อมูลจาก DB
    GetProgressPlanNewLogic() {
        this.progressService.GetProgressPlan(this.initiativeService.id).subscribe(res => {
            let progressPlanType = ['Engineering', 'Procurement', 'Construction', 'Commissioning', 'Overall'];
            let progressPlanForm = ['engineering_plan', 'procurement_plan', 'construction_plan', 'commissioning_plan', 'overall_plan'];
            let planActualType = ['Plan', 'Actual'];
            let planActualForm = ['planValue', 'actualValue'];
            this.progressPlan.length > 0 ? this.progressPlan : this.progressPlan = this.poc2Form.get('progressPlan').value;
            let progressPlans = this.poc2FormNewLogic.get('progressPlan') as FormArray;
            this.overallBasicStartDate = this.poc2FormNewLogic.get('overallForm')?.get('basicStartDate').value;

            let completeDate = this.planComplete ? new Date(parseInt(this.planComplete) - 1, 12, 31) : null;
        
            if(!!completeDate && completeDate > this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value){
                this.overallBasicFinishDate = completeDate;
            }else if (!!completeDate && completeDate < this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value){
                this.overallBasicFinishDate = this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value;
            }else if(!completeDate && this.dateUtil.GetToday > this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value){
                this.overallBasicFinishDate = this.dateUtil.GetToday;
            }else {
                this.overallBasicFinishDate = this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value;
            }

            if (res.length > 0) {
                res.forEach((resp, respIndex) => {
                    for (let ppIndex = 0; ppIndex < progressPlans.length; ppIndex++) {
                        if (parseInt(resp.year) == parseInt(progressPlans.at(ppIndex).get('year').value)) {
                            let listMonthArray = progressPlans.at(ppIndex).get('listMonth') as FormArray;
                            this.listOfMonth.forEach((month, monthIndex) => {
                                listMonthArray.at(monthIndex).get('name').patchValue(month);
                                progressPlanType.forEach((planFormType, planFormIndex) => {
                                    if (resp.progressPlanType == planFormType) {
                                        planActualType.forEach((planType, planTypeIndex) => {
                                            if (resp.planActual == planType) {
                                                if (resp[month] == 100 && planType === "Actual") {
                                                    this[`dis${planFormType}Complete`] = false;
                                                    let dateInput: any = {
                                                        type: progressPlanForm[planFormIndex],
                                                        year: resp.year,
                                                        month: monthIndex
                                                    }
                                                    this.allowActualFinishDate = false;
                                                    this.dateComplete.push(dateInput);
                                                }
                                                listMonthArray.at(monthIndex).get(progressPlanForm[planFormIndex]).get(planActualForm[planTypeIndex]).patchValue(resp[month]);
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    }
                });
            }
            this.clearDateFunctionNewLogic();
        });
    }

    refreshVariables = (): void => {
        this.swEn = true;
        this.swEnActual = true;
        this.capEn = {
            minPlan: 0,
            maxPlan: 0,
            minActual: 0,
            maxActual: 0,
        };
        this.swPro = true;
        this.swProActual = true;
        this.capPro = {
            minPlan: 0,
            maxPlan: 0,
            minActual: 0,
            maxActual: 0,
        };
        this.swCon = true;
        this.swConActual = true;
        this.capCon = {
            minPlan: 0,
            maxPlan: 0,
            minActual: 0,
            maxActual: 0,
        };
        this.swCom = true;
        this.swComActual = true;
        this.capCom = {
            minPlan: 0,
            maxPlan: 0,
            minActual: 0,
            maxActual: 0,
        };
    }

    //เปิดให้แก้ไขได้
    clearDateFunctionNewLogic() {
        this.refreshVariables();

        let progressFormName = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm'];
        let minDate = ['engineeringBasicStartDate', 'procurementBasicStartDate', 'constructionBasicFinishDate', 'commissioningBasicFinishDate'];
        let progressPlanForm = ['engineering_plan', 'procurement_plan', 'construction_plan', 'commissioning_plan'];
        let progressPlanType = ['Engineering', 'Procurement', 'Construction', 'Commissioning', 'Overall'];
        let formPlanArray = this.poc2FormNewLogic.get('progressPlan') as FormArray;
        progressFormName.forEach((formType, formTypeIndex) => {
            let actualStartDate: Date = this.poc2FormNewLogic.get(formType).get('actualStartDate').value ? this.dateUtil.GetDateOnly(this.poc2FormNewLogic.get(formType).get('actualStartDate').value) : new Date(8640000000000000);
            let basicStartDate: Date = this.poc2FormNewLogic.get(formType).get('basicStartDate').value ? this.dateUtil.GetDateOnly(this.poc2FormNewLogic.get(formType).get('basicStartDate').value) : new Date(8640000000000000);
            let basicFinishDate: Date = this.poc2FormNewLogic.get(formType).get('basicFinishDate').value ? this.dateUtil.GetDateOnly(this.poc2FormNewLogic.get(formType).get('basicFinishDate').value) : new Date(8640000000000000);
            this[minDate[progressFormName.indexOf(formType)]] = actualStartDate ? actualStartDate : this.overallBasicStartDate;

            let completeDate = this.planComplete ? new Date(parseInt(this.planComplete) - 1, 12, 31) : null;
        
            if(!!completeDate && completeDate > this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value){
                this.overallBasicFinishDate = completeDate;
            }else if (!!completeDate && completeDate < this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value){
                this.overallBasicFinishDate = this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value;
            }else if(!completeDate && this.dateUtil.GetToday > this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value){
                this.overallBasicFinishDate = this.dateUtil.GetToday;
            }else {
                this.overallBasicFinishDate = this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').value;
            }

            let actualMonth = actualStartDate.getMonth()
            let actualYear = actualStartDate.getFullYear()

            if (actualStartDate && basicFinishDate) {
                for (let index = 0; index < formPlanArray.length; index++) {
                    let controlArray = formPlanArray.at(index).get('listMonth') as FormArray;
                    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                        if (actualStartDate.getFullYear() != 275760 &&
                            actualStartDate.getFullYear() > parseInt(formPlanArray.at(index).get('year').value)) {
                            controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planValue').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').patchValue(true);
                            controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('actualValue').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('actualAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('actualDisabled').patchValue(true);
                        } else {
                            if (monthIndex < basicStartDate.getMonth() && monthIndex < actualStartDate.getMonth() 
                            && actualStartDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)
                            && basicStartDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)) {
                                controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planValue').patchValue(null);
                                controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planAccumulate').patchValue(null);
                                controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').patchValue(true);
                                controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('actualValue').patchValue(null);
                                controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('actualAccumulate').patchValue(null);
                                controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('actualDisabled').patchValue(true);
                            } else if (basicFinishDate.getFullYear() != 275760 && monthIndex > basicFinishDate.getMonth() && basicFinishDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)) {
                                controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planValue').patchValue(null);
                                controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planAccumulate').patchValue(null);
                                controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').patchValue(true);
                                //controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('actualValue').patchValue(null);
                                controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('actualAccumulate').patchValue(null);
                                controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('actualDisabled').patchValue(true);
                            } else {
                                //plan
                                if (basicFinishDate.getFullYear() != 275760 && basicFinishDate.getFullYear() > parseInt(formPlanArray.at(index).get('year').value)
                                    && basicStartDate.getFullYear() != 275760 && basicStartDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)
                                    && monthIndex >= basicStartDate.getMonth()) {
                                    let value = controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).value;
                                    controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').patchValue((this.initiativeService.viewMode || !!this.wbsNo || !this['isPOCWeight' + progressPlanType[formTypeIndex]]) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false);
                                    let newValue = controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).value;
                                    if (!controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').value || !this.isLoaded) {
                                        newValue.planValue = value.planValue
                                        controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).patchValue(newValue);
                                    } else {
                                        newValue.planValue = null
                                        controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).patchValue(newValue);
                                    }
                                } else if (basicFinishDate.getFullYear() != 275760 && basicFinishDate.getFullYear() > parseInt(formPlanArray.at(index).get('year').value)
                                    && basicStartDate.getFullYear() != 275760 && basicStartDate.getFullYear() < parseInt(formPlanArray.at(index).get('year').value)) {
                                    let value = controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).value;
                                    controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').patchValue((this.initiativeService.viewMode || !!this.wbsNo || !this['isPOCWeight' + progressPlanType[formTypeIndex]]) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false);
                                    let newValue = controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).value;
                                    if (!controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').value || !this.isLoaded) {
                                        newValue.planValue = value.planValue
                                        controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).patchValue(newValue);
                                    } else {
                                        newValue.planValue = null
                                        controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).patchValue(newValue);
                                    }
                                } else if (basicFinishDate.getFullYear() != 275760 && basicFinishDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)
                                    && basicStartDate.getFullYear() != 275760 && basicStartDate.getFullYear() < basicFinishDate.getFullYear()) {
                                    let value = controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).value;
                                    controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').patchValue((this.initiativeService.viewMode || !!this.wbsNo || !this['isPOCWeight' + progressPlanType[formTypeIndex]]) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false);
                                    let newValue = controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).value;
                                    if (!controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').value || !this.isLoaded) {
                                        newValue.planValue = value.planValue
                                        controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).patchValue(newValue);
                                    } else {
                                        newValue.planValue = null
                                        controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).patchValue(newValue);
                                    }
                                } else if (basicFinishDate.getFullYear() != 275760 && (monthIndex >= basicStartDate.getMonth()) && (monthIndex <= basicFinishDate.getMonth())
                                    && basicStartDate.getFullYear() != 275760 && basicStartDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)
                                    && basicStartDate.getFullYear() == basicFinishDate.getFullYear()) {
                                    let value = controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).value;
                                    controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').patchValue((this.initiativeService.viewMode || !!this.wbsNo || !this['isPOCWeight' + progressPlanType[formTypeIndex]]) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false);
                                    let newValue = controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).value;
                                    if (!controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').value || !this.isLoaded) {
                                        newValue.planValue = value.planValue
                                        controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).patchValue(newValue);
                                    } else {
                                        newValue.planValue = null
                                        controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).patchValue(newValue);
                                    }
                                } else {
                                    controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planDisabled').patchValue(true);
                                    if (this.isLoaded) {
                                        controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('planValue').patchValue(null);
                                    }
                                }

                                //actual 
                                if (this.todayYear == parseInt(formPlanArray.at(index).get('year').value) && this.todayMonth == monthIndex && !this[`plan${progressPlanType[formTypeIndex]}Complete`]) {
                                    let startMonth: boolean = this.getStartMonth(actualMonth, actualYear)
                                    controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('actualDisabled').patchValue(this.initiativeService.viewMode || !this.wbsNo || startMonth ? true : false);
                                }
                                // DEBUG COMMENT
                                else {
                                    controlArray.at(monthIndex).get(progressPlanForm[formTypeIndex]).get('actualDisabled').patchValue(true);
                                }
                            }
                        }
                    }
                }
            }
        });
        this.progressPlan = this.poc2FormNewLogic.get('progressPlan').value;
        // Patch val
        this.patchValueController();

        //โหลดข้อมูลสำเร็จ
        this.isLoaded = true;
    }

    clearDateFunctionChangeValueOverall() {
        if (!this.isLoaded) {
            return;
        }
        const progressFormName = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm'];
        const listMonthName = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];


        /*if (this.poc2FormNewLogic.get("overallForm").get('basicStartDate').value
            && this.poc2FormNewLogic.get("overallForm").get('basicStartDate').value != this.overallBasicStartDate) {
            this.overallBasicStartDate = this.poc2FormNewLogic.get("overallForm").get('basicStartDate').value
        } else {
            this.poc2FormNewLogic.get("overallForm").get('basicStartDate').patchValue(this.overallBasicStartDate);
            return;
        }
        if (this.poc2FormNewLogic.get("overallForm").get('basicFinishDate').value
            && this.poc2FormNewLogic.get("overallForm").get('basicFinishDate').value != this.overallBasicFinishDate) {
            this.overallBasicFinishDate = this.poc2FormNewLogic.get("overallForm").get('basicFinishDate').value
        } else {
            this.poc2FormNewLogic.get("overallForm").get('basicFinishDate').patchValue(this.overallBasicFinishDate);
            return;
        }*/


        this.bsConfigBasicEngineeringStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicProcurementStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicConstructionStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicCommissionStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });

        for (let idx = 0; idx < progressFormName.length; idx++) {
            if (this.poc2FormNewLogic.get(progressFormName[idx]).get('basicStartDate').value &&
                this.overallBasicStartDate > this.poc2FormNewLogic.get(progressFormName[idx]).get('basicStartDate').value) {
                this.poc2FormNewLogic.get(progressFormName[idx]).get('basicStartDate').patchValue(this.overallBasicStartDate);
            }

            if (this.poc2FormNewLogic.get(progressFormName[idx]).get('basicFinishDate').value &&
                this.overallBasicFinishDate < this.poc2FormNewLogic.get(progressFormName[idx]).get('basicFinishDate').value) {
                this.poc2FormNewLogic.get(progressFormName[idx]).get('basicFinishDate').patchValue(this.overallBasicFinishDate);
            }
        }

        if (this.overallBasicStartDate > this.overallBasicFinishDate) {
            this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').patchValue(this.overallBasicStartDate);
            for (let idx = 0; idx < progressFormName.length; idx) {
                if (this.poc2FormNewLogic.get(progressFormName[idx]).get('basicFinishDate').value) {
                    this.poc2FormNewLogic.get(progressFormName[idx]).get('basicFinishDate').patchValue(this.overallBasicStartDate);
                }
            }
            this.overallBasicFinishDate = this.poc2FormNewLogic.get("overallForm").get('basicFinishDate').value
        }

        if (this.overallBasicStartDate && this.overallBasicFinishDate) {
            const diffYear = this.dateUtil.GetFullYear(this.overallBasicFinishDate) - this.dateUtil.GetFullYear(this.overallBasicStartDate);
            let progressPlan = this.progressPlan
            let progressPlanNew = this.poc2FormNewLogic.get('progressPlan') as FormArray;
            progressPlanNew.clear();
            for (let index = 0; index <= diffYear; index++) {

                let planForm: FormGroup = this.formBuilder.group({
                    year: this.dateUtil.GetFullYear(this.overallBasicStartDate) + index,
                    listMonth: this.formBuilder.array([])
                });
                let plan = planForm.get('listMonth') as FormArray;
                for (let month = 0; month < 12; month++) {
                    let listMonthForm: FormGroup = this.formBuilder.group({
                        name: listMonthName[month],
                        engineering_plan: this.formBuilder.group({
                            planValue: null,
                            planAccumulate: null,
                            planDisabled: false,
                            actualValue: null,
                            actualAccumulate: null,
                            actualDisabled: false
                        }),
                        procurement_plan: this.formBuilder.group({
                            planValue: null,
                            planAccumulate: null,
                            planDisabled: false,
                            actualValue: null,
                            actualAccumulate: null,
                            actualDisabled: false
                        }),
                        construction_plan: this.formBuilder.group({
                            planValue: null,
                            planAccumulate: null,
                            planDisabled: false,
                            actualValue: null,
                            actualAccumulate: null,
                            actualDisabled: false
                        }),
                        commissioning_plan: this.formBuilder.group({
                            planValue: null,
                            planAccumulate: null,
                            planDisabled: false,
                            actualValue: null,
                            actualAccumulate: null,
                            actualDisabled: false
                        }),
                        overall_plan: this.formBuilder.group({
                            planValue: null,
                            planAccumulate: null,
                            planDisabled: false,
                            actualValue: null,
                            actualAccumulate: null,
                            actualDisabled: false
                        })
                    });

                    plan.push(listMonthForm);
                }
                progressPlanNew.push(planForm);
            }

            for (let indexP = 0; indexP < progressPlan.length; indexP++) {
                for (let indexPN = 0; indexPN < progressPlanNew.length; indexPN++) {
                    if (progressPlan[indexP].year == progressPlanNew.value[indexPN].year) {
                        let listMonthFormPP = progressPlan[indexP].listMonth;
                        let listMonthFormPPN = progressPlanNew.at(indexPN).get('listMonth') as FormArray;
                        for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                            if (listMonthFormPP[monthIndex].engineering_plan.planDisabled) {
                                listMonthFormPPN.at(monthIndex).get('engineering_plan').get("planDisabled").patchValue(
                                    listMonthFormPP[monthIndex].engineering_plan.planDisabled
                                );
                            }
                            if (listMonthFormPP[monthIndex].procurement_plan.planDisabled) {
                                listMonthFormPPN.at(monthIndex).get('procurement_plan').get("planDisabled").patchValue(
                                    listMonthFormPP[monthIndex].procurement_plan.planDisabled
                                );
                            }
                            if (listMonthFormPP[monthIndex].construction_plan.planDisabled) {
                                listMonthFormPPN.at(monthIndex).get('construction_plan').get("planDisabled").patchValue(
                                    listMonthFormPP[monthIndex].construction_plan.planDisabled
                                );
                            }
                            if (listMonthFormPP[monthIndex].commissioning_plan.planDisabled) {
                                listMonthFormPPN.at(monthIndex).get('commissioning_plan').get("planDisabled").patchValue(
                                    listMonthFormPP[monthIndex].commissioning_plan.planDisabled
                                );
                            }

                            if (listMonthFormPP[monthIndex].engineering_plan.planValue) {
                                listMonthFormPPN.at(monthIndex).get('engineering_plan').get("planValue").patchValue(
                                    listMonthFormPP[monthIndex].engineering_plan.planValue
                                );
                            }
                            if (listMonthFormPP[monthIndex].procurement_plan.planValue) {
                                listMonthFormPPN.at(monthIndex).get('procurement_plan').get("planValue").patchValue(
                                    listMonthFormPP[monthIndex].procurement_plan.planValue
                                );
                            }
                            if (listMonthFormPP[monthIndex].construction_plan.planValue) {
                                listMonthFormPPN.at(monthIndex).get('construction_plan').get("planValue").patchValue(
                                    listMonthFormPP[monthIndex].construction_plan.planValue
                                );
                            }
                            if (listMonthFormPP[monthIndex].commissioning_plan.planValue) {
                                listMonthFormPPN.at(monthIndex).get('commissioning_plan').get("planValue").patchValue(
                                    listMonthFormPP[monthIndex].commissioning_plan.planValue
                                );
                            }

                            if (listMonthFormPP[monthIndex].engineering_plan.planAccumulate) {
                                listMonthFormPPN.at(monthIndex).get('engineering_plan').get("planAccumulate").patchValue(
                                    listMonthFormPP[monthIndex].engineering_plan.planAccumulate
                                );
                            }
                            if (listMonthFormPP[monthIndex].procurement_plan.planAccumulate) {
                                listMonthFormPPN.at(monthIndex).get('procurement_plan').get("planAccumulate").patchValue(
                                    listMonthFormPP[monthIndex].procurement_plan.planAccumulate
                                );
                            }
                            if (listMonthFormPP[monthIndex].construction_plan.planAccumulate) {
                                listMonthFormPPN.at(monthIndex).get('construction_plan').get("planAccumulate").patchValue(
                                    listMonthFormPP[monthIndex].construction_plan.planAccumulate
                                );
                            }
                            if (listMonthFormPP[monthIndex].commissioning_plan.planAccumulate) {
                                listMonthFormPPN.at(monthIndex).get('commissioning_plan').get("planAccumulate").patchValue(
                                    listMonthFormPP[monthIndex].commissioning_plan.planAccumulate
                                );
                            }

                            if (listMonthFormPP[monthIndex].engineering_plan.actualDisabled) {
                                listMonthFormPPN.at(monthIndex).get('engineering_plan').get("actualDisabled").patchValue(
                                    listMonthFormPP[monthIndex].engineering_plan.actualDisabled
                                );
                            }
                            if (listMonthFormPP[monthIndex].procurement_plan.actualDisabled) {
                                listMonthFormPPN.at(monthIndex).get('procurement_plan').get("actualDisabled").patchValue(
                                    listMonthFormPP[monthIndex].procurement_plan.actualDisabled
                                );
                            }
                            if (listMonthFormPP[monthIndex].construction_plan.actualDisabled) {
                                listMonthFormPPN.at(monthIndex).get('construction_plan').get("actualDisabled").patchValue(
                                    listMonthFormPP[monthIndex].construction_plan.actualDisabled
                                );
                            }
                            if (listMonthFormPP[monthIndex].commissioning_plan.actualDisabled) {
                                listMonthFormPPN.at(monthIndex).get('commissioning_plan').get("actualDisabled").patchValue(
                                    listMonthFormPP[monthIndex].commissioning_plan.actualDisabled
                                );
                            }

                            if (listMonthFormPP[monthIndex].engineering_plan.actualValue) {
                                listMonthFormPPN.at(monthIndex).get('engineering_plan').get("actualValue").patchValue(
                                    listMonthFormPP[monthIndex].engineering_plan.actualValue
                                );
                            }
                            if (listMonthFormPP[monthIndex].procurement_plan.actualValue) {
                                listMonthFormPPN.at(monthIndex).get('procurement_plan').get("actualValue").patchValue(
                                    listMonthFormPP[monthIndex].procurement_plan.actualValue
                                );
                            }
                            if (listMonthFormPP[monthIndex].construction_plan.actualValue) {
                                listMonthFormPPN.at(monthIndex).get('construction_plan').get("actualValue").patchValue(
                                    listMonthFormPP[monthIndex].construction_plan.actualValue
                                );
                            }
                            if (listMonthFormPP[monthIndex].commissioning_plan.actualValue) {
                                listMonthFormPPN.at(monthIndex).get('commissioning_plan').get("actualValue").patchValue(
                                    listMonthFormPP[monthIndex].commissioning_plan.actualValue
                                );
                            }

                            if (listMonthFormPP[monthIndex].engineering_plan.actualAccumulate) {
                                listMonthFormPPN.at(monthIndex).get('engineering_plan').get("actualAccumulate").patchValue(
                                    listMonthFormPP[monthIndex].engineering_plan.actualAccumulate
                                );
                            }
                            if (listMonthFormPP[monthIndex].procurement_plan.actualAccumulate) {
                                listMonthFormPPN.at(monthIndex).get('procurement_plan').get("actualAccumulate").patchValue(
                                    listMonthFormPP[monthIndex].procurement_plan.actualAccumulate
                                );
                            }
                            if (listMonthFormPP[monthIndex].construction_plan.actualAccumulate) {
                                listMonthFormPPN.at(monthIndex).get('construction_plan').get("actualAccumulate").patchValue(
                                    listMonthFormPP[monthIndex].construction_plan.actualAccumulate
                                );
                            }
                            if (listMonthFormPP[monthIndex].commissioning_plan.actualAccumulate) {
                                listMonthFormPPN.at(monthIndex).get('commissioning_plan').get("actualAccumulate").patchValue(
                                    listMonthFormPP[monthIndex].commissioning_plan.actualAccumulate
                                );
                            }
                        }
                    }
                }
            }
            this.progressPlan = progressPlanNew.value;
            this.clearDateFunctionNewLogic();
        }
    }

    //ทำงานเมื่อเปลี่ยนวันที่ของ engineeringForm เป็นต้น
    clearDateFunctionChangeValue(formName) {
        if (!this.isLoaded) {
            return;
        }
        let progressFormName = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm'];
        let minDate = ['engineeringBasicStartDate', 'procurementBasicStartDate', 'constructionBasicFinishDate', 'commissioningBasicFinishDate'];
        let progressPlanForm = ['engineering_plan', 'procurement_plan', 'construction_plan', 'commissioning_plan'];


        let actualStartDate: Date = this.poc2FormNewLogic.get(formName).get('actualStartDate').value ? this.dateUtil.GetDateOnly(this.poc2FormNewLogic.get(formName).get('actualStartDate').value) : this.dateUtil.GetDateOnly(this.overallBasicStartDate);
        let basicStartDate: Date = this.poc2FormNewLogic.get(formName).get('basicStartDate').value ? this.dateUtil.GetDateOnly(this.poc2FormNewLogic.get(formName).get('basicStartDate').value) : this.dateUtil.GetDateOnly(this.overallBasicStartDate);
        let basicFinishDate: Date = this.poc2FormNewLogic.get(formName).get('basicFinishDate').value ? this.dateUtil.GetDateOnly(this.poc2FormNewLogic.get(formName).get('basicFinishDate').value) : this.dateUtil.GetDateOnly(this.overallBasicFinishDate);
        this[minDate[progressFormName.indexOf(formName)]] = actualStartDate ? actualStartDate : this.overallBasicStartDate;

        // Basic
        const selected = this.poc2FormNewLogic.get(formName).get('basicStartDate').value;

        if (formName == 'engineeringForm') {
            this.bsConfigBasicEngineeringFinish = Object.assign({}, { minDate: selected, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        } else if (formName == 'procurementForm') {
            this.bsConfigBasicProcurementFinish = Object.assign({}, { minDate: selected, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        } else if (formName == 'constructionForm') {
            this.bsConfigBasicConstructionFinish = Object.assign({}, { minDate: selected, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        } else if (formName == 'commissioningForm') {
            this.bsConfigBasicCommissionFinish = Object.assign({}, { minDate: selected, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        }

        if (selected > basicFinishDate) {
            if (selected > this.overallBasicFinishDate) {
                this.poc2FormNewLogic.get('overallForm').get('basicFinishDate').patchValue(selected);
                this.poc2FormNewLogic.get(formName).get('basicFinishDate').patchValue(null);
            } else {
                this.poc2FormNewLogic.get(formName).get('basicFinishDate').patchValue(selected);
            }
        }

        if (actualStartDate && basicFinishDate && (basicFinishDate.getTime() > actualStartDate.getTime())) {
            let formPlanArray = this.poc2FormNewLogic.get('progressPlan') as FormArray;

            for (let index = 0; index < formPlanArray.length; index++) {
                let controlArray = formPlanArray.at(index).get('listMonth') as FormArray;
                for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                    if (actualStartDate.getFullYear() > parseInt(formPlanArray.at(index).get('year').value)) {
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planValue').patchValue(null);
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planAccumulate').patchValue(null);
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planDisabled').patchValue(true);
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualValue').patchValue(null);
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualAccumulate').patchValue(null);
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualDisabled').patchValue(true);
                    } else if (basicFinishDate.getFullYear() < parseInt(formPlanArray.at(index).get('year').value)) {
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planValue').patchValue(null);
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planAccumulate').patchValue(null);
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planDisabled').patchValue(true);
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualValue').patchValue(null);
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualAccumulate').patchValue(null);
                        controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualDisabled').patchValue(true);
                    } else {
                        if ((monthIndex < actualStartDate.getMonth()) && actualStartDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)) {
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planValue').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planDisabled').patchValue(true);
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualValue').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualDisabled').patchValue(true);
                        } else if (monthIndex > basicFinishDate.getMonth() && basicFinishDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)) {
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planValue').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planDisabled').patchValue(true);
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualValue').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualDisabled').patchValue(true);
                        } else {
                            let value = controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).value;
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planDisabled').patchValue(!!this.wbsNo && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false);
                            let newValue = controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).value;
                            if (!controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('planDisabled').value) {
                                newValue.planValue = value.planValue
                                controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).patchValue(newValue);
                            } else {
                                newValue.planValue = null
                                controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).patchValue(newValue);
                            }
                            controlArray.at(monthIndex).get(progressPlanForm[progressFormName.indexOf(formName)]).get('actualDisabled').patchValue(this.initiativeService.viewMode || !this.wbsNo ? true : false);
                        }
                    }
                }
            }
        }
        // Recall prefillfunction.
        this.patchValueController();
        this.clearDateFunctionNewLogic();
    }
    checkLimit(type: string, planType: string, mIndex: number, yIndex: number) {
        let progressFormName = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm'];
        let progressPlanForm = ['engineering_plan', 'procurement_plan', 'construction_plan', 'commissioning_plan'];
        const formIndex = progressPlanForm.findIndex(x => x == planType);
        let yIndexCompair = 0;
        let mIndexCompair = 0;
        let max = 0;
        if (type === "actualValue" && this.progressPlan[yIndex].listMonth[mIndex][planType].actualDisabled) {
            return null;
        }
        if (type === "planValue" && (this.progressPlan[yIndex].listMonth[mIndex][planType].planDisabled
            || (this.progressPlan[yIndex].listMonth[mIndex][planType].planValue == null))) {
            return;
        }

        // To check Previous years on Dec in case more than one years and input in Jan.
        if (mIndex == 0 && yIndex != 0) {
            yIndexCompair = yIndex - 1;
            mIndexCompair = 11;
        }

        this.progressService.checkPlan = true;
        const checkValue = this.progressPlan[yIndex].listMonth[mIndex][planType][type];
        if (checkValue >= 100) {
            if (type === "actualValue") {
                const index = this.progressPlanFormType.findIndex(x => x.type == planType);
                this.progressPlanFormType[index].enable = false;

                let dateInput: any = {
                    type: planType,
                    year: this.progressPlan[yIndex].year,
                    month: mIndex
                }
                if (this.dateComplete.findIndex(x => x.type == planType) >= 0) {
                    this.dateComplete.splice(this.dateComplete.findIndex(x => x.type == planType), 1);
                }
                this.dateComplete.push(dateInput);

                switch (planType) {
                    case 'engineering_plan':
                        this.disEngineeringComplete = false;
                        break;
                    case 'procurement_plan':
                        this.disProcurementComplete = false;
                        break;
                    case 'construction_plan':
                        this.disConstructionComplete = false;
                        break;
                    case 'commissioning_plan':
                        this.disCommissioningComplete = false;
                        break;
                }
                this.allowActualFinishDate = false;

                this.progressPlan[yIndex].listMonth[mIndex][planType][type] = 100;
            }

            if (type === "planValue") {
                switch (planType) {
                    case 'engineering_plan':
                        let enFin: Date = this.poc2FormNewLogic.get('engineeringForm').get('basicFinishDate').value;
                        if (mIndex == enFin.getMonth() && this.progressPlan[yIndex].year == enFin.getFullYear()) {
                            this.progressPlan[yIndex].listMonth[mIndex][planType][type] = 100;
                        } else {
                            this.surroundCheckUp(yIndex, mIndex, planType);
                        }
                        break;
                    case 'procurement_plan':
                        let proFin: Date = this.poc2FormNewLogic.get('procurementForm').get('basicFinishDate').value
                        if (mIndex == proFin.getMonth() && this.progressPlan[yIndex].year == proFin.getFullYear()) {
                            this.progressPlan[yIndex].listMonth[mIndex][planType][type] = 100;
                        } else {
                            this.surroundCheckUp(yIndex, mIndex, planType);
                        }
                        break;
                    case 'construction_plan':
                        let conFin: Date = this.poc2FormNewLogic.get('constructionForm').get('basicFinishDate').value;
                        if (mIndex == conFin.getMonth() && this.progressPlan[yIndex].year == conFin.getFullYear()) {
                            this.progressPlan[yIndex].listMonth[mIndex][planType][type] = 100;
                        } else {
                            this.surroundCheckUp(yIndex, mIndex, planType);
                        }
                        break;
                    case 'commissioning_plan':
                        let comFin: Date = this.poc2FormNewLogic.get('commissioningForm').get('basicFinishDate').value;
                        if (mIndex == comFin.getMonth() && this.progressPlan[yIndex].year == comFin.getFullYear()) {
                            this.progressPlan[yIndex].listMonth[mIndex][planType][type] = 100;
                        } else {
                            this.surroundCheckUp(yIndex, mIndex, planType);
                        }
                        break;
                    default:
                        break;
                }
            }

        } else if (checkValue?.toString().length > 0 && checkValue <= 0) {
            if (type === "actualValue") {
                const index = this.progressPlanFormType.findIndex(x => x.type == planType);
                this.progressPlanFormType[index].enable = true;
                this.poc2FormNewLogic.get([progressFormName[formIndex]]).get('actualFinishDate').setValue(null);
                if (this.dateComplete.findIndex(x => x.type == planType) >= 0) {
                    this.dateComplete.splice(this.dateComplete.findIndex(x => x.type == planType), 1);
                }
                this.progressPlan[yIndex].listMonth[mIndex][planType][type] = 0;
            }
            if (type === "planValue") {
                const index = this.progressPlanFormType.findIndex(x => x.type == planType);
                this.progressPlanFormType[index].enable = true;
                this.poc2FormNewLogic.get([progressFormName[formIndex]]).get('actualFinishDate').setValue(null);
                if (this.dateComplete.findIndex(x => x.type == planType) >= 0) {
                    this.dateComplete.splice(this.dateComplete.findIndex(x => x.type == planType), 1);
                }

                let checkerPrevYear = (): any => {
                    if (mIndex == 0 && yIndex != 0) {
                        return this.progressPlan[yIndex - 1].listMonth[11][planType][type];
                    } else {
                        return this.progressPlan[yIndex].listMonth[mIndex - 1][planType][type]
                    }
                }

                if (+checkValue >= this.progressPlan[yIndex].listMonth[mIndex][planType]['planValue']) {
                    if (checkerPrevYear && checkValue >= checkerPrevYear && +checkValue >= +max) {
                        this.progressPlan[yIndex].listMonth[mIndex][planType][type] = checkValue;
                        this.surroundCheckUp(yIndex, mIndex, planType);
                    }
                    else {
                        this.progressPlan[yIndex].listMonth[mIndex][planType][type] = +max;
                        this.progressPlan[yIndex].listMonth[mIndex][planType][type] = checkValue;
                        this.surroundCheckUp(yIndex, mIndex, planType);
                    }
                } else {
                    this.progressPlan[yIndex].listMonth[mIndex][planType][type] = +max;
                    this.progressPlan[yIndex].listMonth[mIndex][planType][type] = checkValue;
                    this.surroundCheckUp(yIndex, mIndex, planType);
                }
            }
        } else {
            if (type === "actualValue") {
                const index = this.progressPlanFormType.findIndex(x => x.type == planType);
                this.progressPlanFormType[index].enable = true;
                this.poc2FormNewLogic.get([progressFormName[formIndex]]).get('actualFinishDate').setValue(null);
                if (this.dateComplete.findIndex(x => x.type == planType) >= 0) {
                    this.dateComplete.splice(this.dateComplete.findIndex(x => x.type == planType), 1);
                }

                // Patch val block
                let checkerPrevYear = (): any => {
                    if (mIndex == 0 && yIndex != 0) {
                        return this.progressPlan[yIndex - 1].listMonth[11][planType][type];
                    } else {
                        return this.progressPlan[yIndex].listMonth[mIndex - 1][planType][type]
                    }

                }
                this.progressPlan.forEach(y => {
                    y.listMonth.forEach(m => {
                        if (+m[planType][type] > +max) {
                            max = m[planType][type]
                        };
                    });
                });

                switch (planType) {
                    case 'engineering_plan':
                        this.disEngineeringComplete = true;
                        break;
                    case 'procurement_plan':
                        this.disProcurementComplete = true;
                        break;
                    case 'construction_plan':
                        this.disConstructionComplete = true;
                        break;
                    case 'commissioning_plan':
                        this.disCommissioningComplete = true;
                        break;
                }

                if (this.capEn.maxActual < 100 &&
                    this.capPro.maxActual < 100 &&
                    this.capCon.maxActual < 100 &&
                    this.capCom.maxActual < 100)
                    this.allowActualFinishDate = true;

                if (+checkValue >= this.progressPlan[yIndex].listMonth[mIndex][planType]['actualValue']) {
                    if (checkerPrevYear && checkValue >= checkerPrevYear && +checkValue >= +max) {
                        this.progressPlan[yIndex].listMonth[mIndex][planType][type] = checkValue;
                    }
                    else {
                        this.progressPlan[yIndex].listMonth[mIndex][planType][type] = +max;
                    }
                } else {
                    this.progressPlan[yIndex].listMonth[mIndex][planType][type] = +max;
                }
            }

            if (type === "planValue") {
                const index = this.progressPlanFormType.findIndex(x => x.type == planType);
                this.progressPlanFormType[index].enable = true; // this.allowActualFinishDate = true;
                this.poc2FormNewLogic.get([progressFormName[formIndex]]).get('actualFinishDate').setValue(null);
                if (this.dateComplete.findIndex(x => x.type == planType) >= 0) {
                    this.dateComplete.splice(this.dateComplete.findIndex(x => x.type == planType), 1);
                }
                let checkerPrevYear = (): any => {
                    if (mIndex == 0 && yIndex != 0) {
                        return this.progressPlan[yIndex - 1].listMonth[11][planType][type];
                    } else {
                        return this.progressPlan[yIndex].listMonth[mIndex - 1][planType][type]
                    }
                }

                if (+checkValue >= this.progressPlan[yIndex].listMonth[mIndex][planType]['planValue']) {
                    if (checkerPrevYear && checkValue >= checkerPrevYear && +checkValue >= +max) {
                        this.progressPlan[yIndex].listMonth[mIndex][planType][type] = checkValue;
                        this.surroundCheckUp(yIndex, mIndex, planType);
                    }
                    else {
                        this.progressPlan[yIndex].listMonth[mIndex][planType][type] = +max;
                        this.surroundCheckUp(yIndex, mIndex, planType);
                    }
                } else {
                    this.progressPlan[yIndex].listMonth[mIndex][planType][type] = +max;
                    this.surroundCheckUp(yIndex, mIndex, planType);
                }
            }
        }
    }

    getActualEnable(type: string) {
        const index = this.progressPlanFormType.findIndex(x => x.type == type);
        return this.progressPlanFormType[index].enable;
    }

    clearActual(formName) {
        const progressForm = this.poc2FormNewLogic.value;

        let progressFormName = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm'];
        let progressControlName = ['engineering_plan', 'procurement_plan', 'construction_plan', 'commissioning_plan'];

        let actualStartDate: Date = progressForm[formName]?.actualStartDate;
        let actualFinishDate: Date = progressForm[formName]?.actualFinishDate;
        let actualMonth = actualStartDate ? this.dateUtil.GetDateOnly(this.poc2FormNewLogic.get(formName).get('actualStartDate').value).getMonth() : null;
        let actualYear = actualStartDate ? this.dateUtil.GetDateOnly(this.poc2FormNewLogic.get(formName).get('actualStartDate').value).getFullYear() : null;

        switch (formName) {
            case 'engineeringForm':
                this.disActualFinish = this.disEngineeringComplete;
                break;
            case 'procurementForm':
                this.disActualFinish = this.disProcurementComplete;
                break;
            case 'constructionForm':
                this.disActualFinish = this.disConstructionComplete;
                break;
            case 'commissioningForm':
                this.disActualFinish = this.disCommissioningComplete;
                break;
        }

        if (actualStartDate) {
            const lenYear = this.progressPlan.length - 1;
            if (this.progressPlan.length > 1) {
                this.progressPlan.forEach((element, index) => {
                    if (index === 0) {
                        element.listMonth.forEach((month, mIndex) => {
                            if (actualStartDate && this.todayYear == element.year && this.todayMonth == mIndex && this.todayMonth >= actualStartDate.getMonth() && actualStartDate.getFullYear() == element.year) {
                                const allowMonth: boolean = this.getFinishMonth(actualMonth, actualYear)
                                month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = this.initiativeService.viewMode || !this.disActualFinish;
                            } else {
                                month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                            }
                        });
                    } else if (index === lenYear) {
                        element.listMonth.forEach((month, mIndex) => {
                            if (actualStartDate && this.todayYear == element.year && this.todayMonth == mIndex) {
                                const allowMonth: boolean = this.getFinishMonth(actualMonth, actualYear)
                                month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = this.initiativeService.viewMode || !this.disActualFinish;
                            } else {
                                month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                            }
                        });
                    } else {
                        element.listMonth.forEach((month, mIndex) => {
                            month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                        });
                    }
                });
            } else {
                this.progressPlan.forEach((element, index) => {
                    element.listMonth.forEach((month, mIndex) => {

                        if (mIndex == this.todayMonth) {
                            const allowMonth: boolean = this.getFinishMonth(actualMonth, actualYear)
                            month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = this.initiativeService.viewMode || !this.disActualFinish;
                        } else {
                            month[progressControlName[progressFormName.indexOf(formName)]].actualDisabled = true;
                        }
                    });
                });
            }
            this.poc2Form.get('progressPlan').setValue(this.progressPlan);
        }
        this.calActualFinish()
    }

    calActualFinish() {
        let allActualFinishDate = []
        let progressFormName = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm'];
        let progressPlanForm = ['engineering_plan', 'procurement_plan', 'construction_plan', 'commissioning_plan'];

        progressFormName.forEach(element => {
            const selectedActualFinishDate = this.poc2FormNewLogic.get(element).get('actualFinishDate').value ? this.dateUtil.GetDateOnly(this.poc2FormNewLogic.get(element).get('actualFinishDate').value).getTime() : 0;
            allActualFinishDate.push(selectedActualFinishDate);
        });
        const maxActualFinish = Math.max(...allActualFinishDate);
        if (maxActualFinish !== 0) {
            const maxActualFinishDate = new Date(maxActualFinish);
            this.bsConfigOverAllFinish = Object.assign({}, { minDate: this.poc2FormNewLogic.get('overallForm').get('actualStartDate').value, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
            this.poc2FormNewLogic.get('overallForm').get('actualFinishDate').patchValue(maxActualFinishDate);
        } else {
            this.poc2FormNewLogic.get('overallForm').get('actualFinishDate').patchValue(null);
        }
    }

    getMinDate(type: string) {
        if (this.dateComplete.findIndex(x => x.type == type) < 0) {
            return;
        }
        const completeData = this.dateComplete[this.dateComplete.findIndex(x => x.type == type)];
        let data: {
            year: string;
            month: number;
        } = {
            year: completeData.year,
            month: completeData.month
        }
        return this.dateUtil.GetMinDate(data);
    }
    getMaxDate(type: string) {
        if (this.dateComplete.findIndex(x => x.type == type) < 0) {
            return;
        }
        const completeData = this.dateComplete[this.dateComplete.findIndex(x => x.type == type)];
        let data: {
            year: string;
            month: number;
        } = {
            year: completeData.year,
            month: completeData.month
        }
        return this.dateUtil.GetMaxDate(data);
    }

    // PATCH VALUE PROCESSOR
    // =========  Patch 0/null to input.  =========
    patchValueController = (): void => {
        this.setCapValue();
        this.renderDisplay();
    }

    setCapValue = (): void => {
        this.progressPlan.forEach(elm => {
            elm.listMonth.forEach(m => {
                this.capEn = {
                    minPlan: 0,
                    maxPlan: (m.engineering_plan.planValue > this.capEn.maxPlan) ? m.engineering_plan.planValue : this.capEn.maxPlan,
                    minActual: 0,
                    maxActual: (m.engineering_plan.actualValue > this.capEn.maxActual) ? m.engineering_plan.actualValue : this.capEn.maxActual,
                }

                this.capPro = {
                    minPlan: 0,
                    maxPlan: (m.procurement_plan.planValue > this.capPro.maxPlan) ? m.procurement_plan.planValue : this.capPro.maxPlan,
                    minActual: 0,
                    maxActual: (m.procurement_plan.actualValue > this.capPro.maxActual) ? m.procurement_plan.actualValue : this.capPro.maxActual,
                };

                this.capCon = {
                    minPlan: 0,
                    maxPlan: (m.construction_plan.planValue > this.capCon.maxPlan) ? m.construction_plan.planValue : this.capCon.maxPlan,
                    minActual: 0,
                    maxActual: (m.construction_plan.actualValue > this.capCon.maxActual) ? m.construction_plan.actualValue : this.capCon.maxActual,
                };

                this.capCom = {
                    minPlan: 0,
                    maxPlan: (m.commissioning_plan.planValue > this.capCom.maxPlan) ? m.commissioning_plan.planValue : this.capCom.maxPlan,
                    minActual: 0,
                    maxActual: (m.commissioning_plan.actualValue > this.capCom.maxActual) ? m.commissioning_plan.actualValue : this.capCom.maxActual,
                };
            });
        });
    }

    renderDisplay = (): void => {
        var enFinishDate: Date;
        var proFinishDate: Date;
        var conFinishDate: Date;
        var comFinishDate: Date;

        enFinishDate = this.poc2FormNewLogic.get('engineeringForm').get('basicFinishDate').value ? this.poc2FormNewLogic.get('engineeringForm').get('basicFinishDate').value : 0;
        proFinishDate = this.poc2FormNewLogic.get('procurementForm').get('basicFinishDate').value ? this.poc2FormNewLogic.get('procurementForm').get('basicFinishDate').value : 0;
        conFinishDate = this.poc2FormNewLogic.get('constructionForm').get('basicFinishDate').value ? this.poc2FormNewLogic.get('constructionForm').get('basicFinishDate').value : 0;
        comFinishDate = this.poc2FormNewLogic.get('commissioningForm').get('basicFinishDate').value ? this.poc2FormNewLogic.get('commissioningForm').get('basicFinishDate').value : 0;

        let enStacks = [];
        let enStacksPlan = [];
        let proStacks = [];
        let proStacksPlan = [];
        let conStacks = [];
        let conStacksPlan = [];
        let comStacks = [];
        let comStacksPlan = [];

        this.progressPlan.forEach((element, yIndex) => {
            element.listMonth.forEach((m, mIndex) => {
                // Add planValue to stacks for checkup surrounding.
                if (m.engineering_plan.planValue != null && m.engineering_plan.planValue != 0 && !enStacksPlan.includes(m.engineering_plan.planValue)) enStacksPlan.push(+m.engineering_plan.planValue);
                if (m.procurement_plan.planValue != null && m.procurement_plan.planValue != 0 && !proStacksPlan.includes(m.procurement_plan.planValue)) proStacksPlan.push(+m.procurement_plan.planValue);
                if (m.construction_plan.planValue != null && m.construction_plan.planValue != 0 && !conStacksPlan.includes(m.construction_plan.planValue)) conStacksPlan.push(+m.construction_plan.planValue);
                if (m.commissioning_plan.planValue != null && m.commissioning_plan.planValue != 0 && !comStacksPlan.includes(m.commissioning_plan.planValue)) comStacksPlan.push(+m.commissioning_plan.planValue);

                m = Object.assign(m, {
                    engineering_plan: Object.assign(m.engineering_plan, {
                        actualDisp: this.displayActualPlanCheckUp(1, m.engineering_plan, this.capEn.maxActual, mIndex, element.year, enStacks),
                    }),
                    procurement_plan: Object.assign(m.procurement_plan, {
                        actualDisp: this.displayActualPlanCheckUp(2, m.procurement_plan, this.capPro.maxActual, mIndex, element.year, proStacks),
                    }),
                    construction_plan: Object.assign(m.construction_plan, {
                        actualDisp: this.displayActualPlanCheckUp(3, m.construction_plan, this.capCon.maxActual, mIndex, element.year, conStacks),
                    }),
                    commissioning_plan: Object.assign(m.commissioning_plan, {
                        actualDisp: this.displayActualPlanCheckUp(4, m.commissioning_plan, this.capCom.maxActual, mIndex, element.year, comStacks),
                    }),
                })
                if (m.engineering_plan.actualValue != null) enStacks.push(m.engineering_plan.actualValue);
                if (m.procurement_plan.actualValue != null) proStacks.push(m.procurement_plan.actualValue);
                if (m.construction_plan.actualValue != null) conStacks.push(m.construction_plan.actualValue);
                if (m.commissioning_plan.actualValue != null) comStacks.push(m.commissioning_plan.actualValue);

                // Engineering
                // if (element.year == enFinishDate.getFullYear() && mIndex == enFinishDate.getMonth()) {
                //     m.engineering_plan.planValue = 100;
                // }
                //m.engineering_plan.planValue =
                //    (!m.engineering_plan.planDisabled) ? this.prefillPlanValue(m.engineering_plan, mIndex, element.year, enStacksPlan, 'engineering_plan') : m.engineering_plan.planValue;

                // Procurement
                // if (element.year == proFinishDate.getFullYear() && mIndex == proFinishDate.getMonth()) {
                //     m.procurement_plan.planValue = 100;
                // }
                //m.procurement_plan.planValue =
                //    (!m.procurement_plan.planDisabled) ? this.prefillPlanValue(m.procurement_plan, mIndex, element.year, proStacksPlan, 'procurement_plan') : m.procurement_plan.planValue;

                // Construction
                // if (element.year == conFinishDate.getFullYear() && mIndex == conFinishDate.getMonth()) {
                //     m.construction_plan.planValue = 100;
                // }
                //m.construction_plan.planValue =
                //    (!m.construction_plan.planDisabled) ? this.prefillPlanValue(m.construction_plan, mIndex, element.year, conStacksPlan, 'construction_plan') : m.construction_plan.planValue;

                // Commissioning
                // if (element.year == comFinishDate.getFullYear() && mIndex == comFinishDate.getMonth()) {
                //     m.commissioning_plan.planValue = 100;
                // }
                //m.commissioning_plan.planValue =
                //    (!m.commissioning_plan.planDisabled) ? this.prefillPlanValue(m.commissioning_plan, mIndex, element.year, proStacksPlan, 'commissioning_plan') : m.commissioning_plan.planValue;
            });
        });
    }


    displayPlanCheckUp = (type: number, dt: {
        planValue: number,
        planDisabled: boolean
    }, maxNum: number, mIndex: number, yIndex: number): number => {

        // engineering plan
        if (type == 1) {
            if (this.isPOCWeightEngineering) return null;
            if (dt.planValue == maxNum) this.swEn = false;
            if (yIndex > this.todayYear) {
                return null
            } else {
                if (yIndex < this.todayYear) {
                    if (mIndex >= this.todayMonth) {
                        if (!dt.planValue && this.swEn) {
                            return 0;
                        } else {
                            return maxNum;
                        }
                    }
                }
                if (mIndex < this.todayMonth) {
                    if (!dt.planValue && this.swEn) {
                        return null;
                    } else {
                        return maxNum;
                    }
                } else {
                    return null
                }
            }
        }

        // procurement plan
        if (type == 2) {
            if (this.isPOCWeightProcurement) return null;
            if (dt.planValue == maxNum) this.swPro = false;
            if (yIndex > this.todayYear) {
                return null
            } else {
                if (yIndex < this.todayYear) {
                    if (mIndex >= this.todayMonth) {
                        if (!dt.planValue && this.swPro) {
                            return 0;
                        } else {
                            return maxNum;
                        }
                    }
                }
                if (mIndex < this.todayMonth) {
                    if (!dt.planValue && this.swPro) {
                        return null;
                    } else {
                        return maxNum;
                    }
                } else {
                    return null
                }
            }
            ////
        }

        // construction plan
        if (type == 3) {
            if (this.isPOCWeightConstruction) return null;
            if (dt.planValue == maxNum) this.swCon = false;
            if (yIndex > this.todayYear) {
                return null
            } else {
                if (yIndex < this.todayYear) {
                    if (mIndex >= this.todayMonth) {
                        if (!dt.planValue && this.swCon) {
                            return 0;
                        } else {
                            return maxNum;
                        }
                    }
                }
                if (mIndex < this.todayMonth) {
                    if (!dt.planValue && this.swCon) {
                        return null;
                    } else {
                        return maxNum;
                    }
                } else {
                    return null
                }
            }
            ////
        }

        // commisioning plan
        if (type == 4) {
            if (this.isPOCWeightCommissioning) return null;
            if (dt.planValue == maxNum) this.swCom = false;
            if (yIndex > this.todayYear) {
                return null
            } else {
                if (yIndex < this.todayYear) {
                    if (mIndex >= this.todayMonth) {
                        if (!dt.planValue && this.swCom) {
                            return 0;
                        } else {
                            return maxNum;
                        }
                    }
                }
                if (mIndex < this.todayMonth) {
                    if (!dt.planValue && this.swCom) {
                        return null;
                    } else {
                        return maxNum;
                    }
                } else {
                    return null
                }
            }
        }

        return;
    }

    displayActualPlanCheckUp = (type: number, dt: {
        actualValue: number,
        actualDisabled: boolean,
    }, maxNum: number, mIndex: number, yIndex: number, stacks: number[]): number => {
        if (type == 1) {
            if (!this.isPOCWeightEngineering) return null;
            let m: Date = this.poc2FormNewLogic.get('engineeringForm').get('actualStartDate').value;
            if (yIndex > this.todayYear) {
                return null
            } else {
                if (m && yIndex == m.getFullYear() && yIndex < this.todayYear) {
                    if (m && mIndex >= m.getMonth()) {
                        if (stacks[stacks.length - 1] != 100) {
                            return stacks[stacks.length - 1]
                        }
                    } else {
                        return null;
                    }
                } else if (m && yIndex > m.getFullYear() && yIndex < this.todayYear) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                } else if (m && yIndex > m.getFullYear()
                    && yIndex == this.todayYear
                    && mIndex < this.todayMonth) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                } else if (m && mIndex >= m.getMonth()
                    && yIndex == this.todayYear
                    && mIndex < this.todayMonth) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                }
            }
        }

        // procurement plan
        if (type == 2) {
            if (!this.isPOCWeightProcurement) return null;
            let m: Date = this.poc2FormNewLogic.get('procurementForm').get('actualStartDate').value;
            if (yIndex > this.todayYear) {
                return null
            } else {
                if (m && yIndex == m.getFullYear() && yIndex < this.todayYear) {
                    if (m && mIndex >= m.getMonth()) {
                        if (stacks[stacks.length - 1] != 100) {
                            return stacks[stacks.length - 1]
                        }
                    } else {
                        return null;
                    }
                } else if (m && yIndex > m.getFullYear() && yIndex < this.todayYear) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                } else if (m && yIndex > m.getFullYear()
                    && yIndex == this.todayYear
                    && mIndex < this.todayMonth) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                } else if (m && mIndex >= m.getMonth()
                    && yIndex == this.todayYear
                    && mIndex < this.todayMonth) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                }
            }
        }

        // construction plan
        if (type == 3) {
            let m: Date = this.poc2FormNewLogic.get('constructionForm').get('actualStartDate').value;
            if (!this.isPOCWeightConstruction) return null;
            if (yIndex > this.todayYear) {
                return null
            } else {
                if (m && yIndex == m.getFullYear() && yIndex < this.todayYear) {
                    if (m && mIndex >= m.getMonth()) {
                        if (stacks[stacks.length - 1] != 100) {
                            return stacks[stacks.length - 1]
                        }
                    } else {
                        return null;
                    }
                } else if (m && yIndex > m.getFullYear() && yIndex < this.todayYear) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                } else if (m && yIndex > m.getFullYear()
                    && yIndex == this.todayYear
                    && mIndex < this.todayMonth) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                } else if (m && mIndex >= m.getMonth()
                    && yIndex == this.todayYear
                    && mIndex < this.todayMonth) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                }
            }
        }

        // commisioning plan
        if (type == 4) {
            let m: Date = this.poc2FormNewLogic.get('commissioningForm').get('actualStartDate').value;
            if (!this.isPOCWeightCommissioning) return null;
            if (yIndex > this.todayYear) {
                return null
            } else {
                if (m && yIndex == m.getFullYear() && yIndex < this.todayYear) {
                    if (m && mIndex >= m.getMonth()) {
                        if (stacks[stacks.length - 1] != 100) {
                            return stacks[stacks.length - 1]
                        }
                    } else {
                        return null;
                    }
                } else if (m && yIndex > m.getFullYear() && yIndex < this.todayYear) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                } else if (m && yIndex > m.getFullYear()
                    && yIndex == this.todayYear
                    && mIndex < this.todayMonth) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                } else if (m && mIndex >= m.getMonth()
                    && yIndex == this.todayYear
                    && mIndex < this.todayMonth) {
                    if (stacks[stacks.length - 1] != 100) {
                        return stacks[stacks.length - 1]
                    } else {
                        return null;
                    }
                }
            }
        }
    }

    getStartMonth = (actualMonth, actualYear): boolean => {
        let allowMonth: boolean = false
        if (actualYear == this.todayYear) {
            if (actualMonth > this.todayMonth && actualMonth !== null) {
                allowMonth = true
            } else {
                if (actualMonth == null) {
                    allowMonth = true
                }
            }
        } else if (actualYear < this.todayYear) {
            allowMonth = false
        } else {
            allowMonth = true
        }
        return allowMonth
    }

    getFinishMonth = (actualMonth, actualYear): boolean => {
        let allowMonth: boolean = false
        if (actualYear == this.todayYear) {
            if (actualMonth < this.todayMonth && actualMonth !== null) {
                allowMonth = true
            } else {
                if (actualMonth == null) {
                    allowMonth = true
                }
            }
        } else if (actualYear < this.todayYear) {
            allowMonth = false
        } else {
            allowMonth = true
        }
        return allowMonth
    }

    setMinDate = (): void => {
        const progressForm = this.poc2FormNewLogic.value;
        let progressFormName = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm'];
        this.overallBasicStartDate = this.poc2FormNewLogic.get('overallForm')?.get('basicStartDate').value;
        //this.overallBasicFinishDate = this.poc2FormNewLogic.get('overallForm')?.get('basicFinishDate').value;

        this.bsConfigOverAllBasicFinish = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicEngineeringStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicProcurementStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicConstructionStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
        this.bsConfigBasicCommissionStart = Object.assign({}, { minDate: this.overallBasicStartDate, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });

        progressFormName.forEach((formName, formIndex) => {
            const basicStartDate: Date = progressForm[formName]?.basicStartDate;
            const basicFinishDate: Date = progressForm[formName]?.basicFinishDate;

            if (basicStartDate && this.overallBasicStartDate > basicStartDate) {
                this.poc2FormNewLogic.get(formName).get('basicStartDate').patchValue(this.overallBasicStartDate);
            }
            if (basicFinishDate && this.overallBasicFinishDate < basicFinishDate) {
                this.poc2FormNewLogic.get(formName).get('basicFinishDate').patchValue(this.overallBasicFinishDate);
            }
        });
    }

    preventNullEvent(event: any) {
        if (event.target.value === '') {
            if (event.target.id === 'e_actual_start') {
                this.clearDateActual('engineeringForm');
            } else if (event.target.id === 'p_actual_start') {
                this.clearDateActual('procurementForm');
            } else if (event.target.id === 'c_actual_start') {
                this.clearDateActual('constructionForm');
            } else if (event.target.id === 'co_actual_start') {
                this.clearDateActual('commissioningForm');
            }
        }
    }

    setBasicStartDate(formBasicStartDate, formName) {
        if (this.overallBasicStartDate >= formBasicStartDate) {
            return this.overallBasicStartDate
        } else {
            return formBasicStartDate
        }
    }

    onChangePocWeightPercent(plan, formName) {
        if (!this.isLoaded) {
            return;
        }
        const pocWeightPercent = this.poc2FormNewLogic.get(formName).get('pocWeightPercent').value
        if (this['keyPocWeightPercent' + plan] == true) {
            if (pocWeightPercent == 0) {
                this['isPOCWeight' + plan] = false
                this.poc2FormNewLogic.get(formName).get('basicStartDate').patchValue(null);
                this.poc2FormNewLogic.get(formName).get('basicFinishDate').patchValue(null);
            } else if (pocWeightPercent != null) {
                this['isPOCWeight' + plan] = true
            }
        }
        this.clearDateFunctionNewLogic();
    }

    // Lot2 Prefill block
    prefillPlanValue = (dt: {
        planValue: number,
        planDisabled: boolean,
    }, mIndex: number, yIndex: number, stacks: number[], planType: string): number => {

        switch (planType) {
            case 'engineering_plan':
                let enFin = this.poc2FormNewLogic.get('engineeringForm').get('basicFinishDate').value;
                if (enFin == null) return null;
                if (yIndex > enFin.getFullYear()) {
                    return null;
                } else {
                    if (yIndex <= enFin.getFullYear()) {
                        return stacks[stacks.length - 1];
                    }
                }
                break;
            case 'procurement_plan':
                let proFin = this.poc2FormNewLogic.get('procurementForm').get('basicFinishDate').value;
                if (proFin == null) return null;
                if (yIndex > proFin.getFullYear()) {
                    return null;
                } else {
                    if (yIndex <= proFin.getFullYear()) {
                        return stacks[stacks.length - 1];
                    }
                }
                break;
            case 'construction_plan':
                let conFin = this.poc2FormNewLogic.get('constructionForm').get('basicFinishDate').value;
                if (conFin == null) return null;
                if (yIndex > conFin.getFullYear()) {
                    return null;
                } else {
                    if (yIndex <= conFin.getFullYear()) {
                        return stacks[stacks.length - 1];
                    }
                }
                break;
            case 'commissioning_plan':
                let comFin = this.poc2FormNewLogic.get('commissioningForm').get('basicFinishDate').value;
                if (comFin == null) return null;
                if (yIndex > comFin.getFullYear()) {
                    return null;
                } else {
                    if (yIndex <= comFin.getFullYear()) {
                        return stacks[stacks.length - 1];
                    }
                }
                break;
        }
    }

    // Surrounding checker
    surroundCheckUp = (yIndex: number, mIndex: number, planType): void => {
        let masterData: number[] = [];
        // 1.Prefill all input first.
        this.progressPlan.forEach((element, year) => {
            element.listMonth.forEach((m, month) => {
                masterData.push(+m[planType].planValue);

            });
        });
        masterData.push(100);


        // 2.Checking around
        let nextV2: number = 0;
        let prevV2: number = 0;
        let indexTartget = (yIndex * 12) + mIndex;
        let target = masterData[indexTartget];

        for (let index = indexTartget + 1; index < masterData.length; index++) {
            if (masterData[index] && masterData[index] != 0) {
                nextV2 = masterData[index];
                break;
            }
        }

        for (let index = indexTartget - 1; index > -1; index--) {
            if (masterData[index] && masterData[index] != 0) {
                prevV2 = masterData[index];
                break;
            }
        }

        // 3. Compare
        if (prevV2 <= target && target <= nextV2) {
        } else {
            if (target <= prevV2 && target < nextV2) this.progressPlan[yIndex].listMonth[mIndex][planType].planValue = prevV2;
            if (target >= nextV2 && target > prevV2) this.progressPlan[yIndex].listMonth[mIndex][planType].planValue = nextV2;
        }
    }
}
