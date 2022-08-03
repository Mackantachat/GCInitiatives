import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { ProgressService } from '@services/progress/progress.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { CapexService } from '../../../core/services/capex/capex.service';
import { Initiative } from '@models/initiative';
import { DateUtil } from '@utils/date.utils';
import { PermissionService } from '@services/permission/permission.service';


@Component({
    selector: 'app-progress-milestone1',
    templateUrl: './progress-milestone1.component.html',
    styleUrls: ['./progress-milestone1.component.css']
})
export class ProgressMilestone1Component implements OnInit, OnDestroy, OnChanges {
    @Input() formGroup: FormGroup;
    @Input() generalDataProgrerss: Initiative;
    @Input() requestIniNoDate: any;
    @Input() finishDate: any;
    @Input() wbsNo: any;

    progressForm: FormGroup;
    progressFormNewLogic: FormGroup;
    bsConfig: Partial<BsDatepickerConfig>;
    bsActualConfig: Partial<BsDatepickerConfig>;
    bsBasicConfig: Partial<BsDatepickerConfig>;
    today = new Date();
    dataPOC = [{ id: 1, type: 'Overall', name: 'Plan (%)' }, { id: 2, type: 'Overall', name: 'Actual (%)' }];

    listOfMonth = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    planActualType = ['Plan', 'Actual'];
    planActualForm = ['planValue', 'actualValue'];


    // START DATE
    basicStartDate: Date;
    basicFinishDate: Date;

    actualStartDate: Date;
    actualFinishDate: Date;

    RequestIniNoDate: Date;
    ProjecctComRun: Date;
    generalData: Initiative;

    currentYear: number;
    diffYear: number;
    status = '';
    name = '';
    sumOfval: number;
    progressPlanMile1: Array<{
        year: any;
        listMonth: Array<{
            monthName: string;
            planValue: number;
            planAccumulate: number,
            planDisabled: boolean;
            actualValue: number;
            actualAccumulate: number,
            actualDisabled: boolean;
        }>;
    }> = [];

    progressPlanObj: {
        year: any;
        listMonth: Array<{
            monthName: string;
            planValue: number;
            planAccumulate: number,
            planDisabled: boolean;
            actualValue: number;
            actualAccumulate: number,
            actualDisabled: boolean;
        }>;
    }

    listMonth = [
        {
            monthName: 'Jan',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        }, {
            monthName: 'Feb',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        }, {
            monthName: 'Mar',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        }, {
            monthName: 'Apr',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        }, {
            monthName: 'May',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        }, {
            monthName: 'Jun',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        }, {
            monthName: 'Jul',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        }, {
            monthName: 'Aug',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        }, {
            monthName: 'Sep',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        }, {
            monthName: 'Oct',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        }, {
            monthName: 'Nov',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        }, {
            monthName: 'Dec',
            planValue: null,
            planAccumulate: 0,
            planDisabled: false,
            actualValue: null,
            actualAccumulate: null,
            actualDisabled: false
        },
    ];

    isLoaded: boolean;
    overallBasicStartDate: Date;
    overallBasicFinishDate: Date;

    //today -10 Day
    todayYear = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 10)).getFullYear();
    todayMonth = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 10)).getMonth();

    isAdmin: boolean = false;
    planComplete: string;
    dateComplete: {
        year: string;
        month: number;
    } = {
            year: null,
            month: null
        };
    allowActualFinishDate: boolean = true;
    isActualStartDate: boolean = false;
    disActualFinish: boolean = true;

    // Patch Value 0/null parameters block.
    // Plan value
    minPlanValue: number = 0;
    maxPlanValue: number = 0;
    maximumPlanIndex: number = 0;

    // Actual value
    minActualValue: number = 0;
    maxActualValue: number = 0;

    // Display Switcher
    swPlan = true;
    swActual = true;
    // Value Dips
    planDisp = 0;
    acctualDisp = 0;
    // =========================


    constructor(
        private progressService: ProgressService,
        private datePipe: DatePipe,
        private formBuilder: FormBuilder,
        private initiativeService: InitiativeService,
        private capexService: CapexService,
        private dateUtil: DateUtil,
        private ps: PermissionService
    ) {
        this.bsConfig = Object.assign({}, {
            // minDate: this.today,
            dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false
        });
        this.bsActualConfig = Object.assign({}, {
            dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false
        });
        this.bsBasicConfig = Object.assign({}, {
            dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false
        });
        this.progressForm = this.formBuilder.group({
            basicStartDate: [this.today, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required],
            pocWeightPercent: [100, Validators.required],
            initiativeId: this.initiativeService.id,
            progressPlan: null
        });

        this.progressFormNewLogic = this.formBuilder.group({
            basicStartDate: [this.today, Validators.required],
            basicFinishDate: [null, Validators.required],
            actualStartDate: [null, Validators.required],
            actualFinishDate: [null, Validators.required],
            pocWeightPercent: [100, Validators.required],
            initiativeId: this.initiativeService.id,
            progressPlan: this.formBuilder.array([])
        });

        this.capexService.getRequestIniNoDate.subscribe((requestIniRes) => {
            if (requestIniRes && this.isLoaded) {
                // this.progressForm.get('basicStartDate').patchValue(requestIniRes);
                this.progressFormNewLogic.get('basicStartDate').patchValue(requestIniRes);
                this.clearDateOverRangeNewLogic();
            }
        });

        this.capexService.getFinishDate.subscribe((finishRes) => {
            if (finishRes && this.isLoaded && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise && !this.initiativeService.isReturn)) {
                // this.progressForm.get('basicFinishDate').patchValue(finishRes);
                this.progressFormNewLogic.get('basicFinishDate').patchValue(finishRes);
                this.clearDateOverRangeNewLogic();
            }
        });




    }

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
        if (!this.formGroup.get('poc1')) {
            // this.formGroup.addControl('poc1', this.progressForm);
            this.formGroup.addControl('poc1', this.progressFormNewLogic);
        }



        this.GetProgressPlanDate();

    }
    isInvalid(controlName){
        return (this.progressFormNewLogic.get(controlName).touched || this.progressFormNewLogic.get(controlName).dirty) && this.progressFormNewLogic.get(controlName).invalid;
    }


    ngOnChanges() {
        this.progressFormNewLogic.get('progressPlan').valueChanges.subscribe((pocDataRes) => {
            //this.progressPlan = pocDataRes;
            this.progressService.changeProgressPlanDataPoc1(pocDataRes);
        });
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

    checkLimit(type: string, mIndex: number, yIndex: number) {
        if (type === "actualValue" && this.progressPlanMile1[yIndex].listMonth[mIndex].actualDisabled) {
            return;
        }
        if (type === "planValue" && (this.progressPlanMile1[yIndex].listMonth[mIndex].planDisabled
            || (this.progressPlanMile1[yIndex].listMonth[mIndex].planValue == null))) {
            return;
        }
        let max = 0;
        this.progressService.checkPlan = true;
        const checkValue = this.progressPlanMile1[yIndex].listMonth[mIndex][type];
        if (checkValue >= 100) {
            if (type === "actualValue") {
                this.allowActualFinishDate = false;
                this.dateComplete.year = this.progressPlanMile1[yIndex].year;
                this.dateComplete.month = mIndex;
                this.disActualFinish = false;
                this.progressPlanMile1[yIndex].listMonth[mIndex][type] = 100;
            }
            if (type === "planValue") {
                this.surroundCheckUp(yIndex, mIndex);
            }

        } else if (checkValue?.toString().length > 0 && checkValue <= 0) {
            if (type === "actualValue") {
                this.disActualFinish = true;
                this.allowActualFinishDate = true;
                this.dateComplete.year = null;
                this.dateComplete.month = null;
                this.progressFormNewLogic.get('actualFinishDate').setValue(null);
                this.progressPlanMile1[yIndex].listMonth[mIndex][type] = 0
            }

            if (type === "planValue") {
                if (checkValue >= this.progressPlanMile1[yIndex].listMonth[mIndex]['planValue']) {
                    let checkerPrevYear = (): any => {
                        if (mIndex == 0 && yIndex != 0) {
                            // this.logs('Prevs val' + this.logs(this.progressPlanMile1[yIndex - 1].listMonth[11][type]));
                            return this.progressPlanMile1[yIndex - 1].listMonth[11][type];
                        } else {
                            return this.progressPlanMile1[yIndex].listMonth[mIndex - 1][type]
                        }
                    }

                    if (checkerPrevYear && checkValue >= checkerPrevYear && +checkValue >= +max) {
                        this.progressPlanMile1[yIndex].listMonth[mIndex][type] = checkValue;
                        this.surroundCheckUp(yIndex, mIndex);
                    }
                    else {
                        // this.logs('return null caues Val < PrevsVal');
                        this.progressPlanMile1[yIndex].listMonth[mIndex][type] = +max;
                        this.surroundCheckUp(yIndex, mIndex);
                    }
                } else {
                    // this.logs('return null cause Val < planDisp');
                    this.progressPlanMile1[yIndex].listMonth[mIndex][type] = +max;
                    this.surroundCheckUp(yIndex, mIndex);
                }
            }

        } else {

            if (type === "actualValue") {
                this.disActualFinish = true;
                this.allowActualFinishDate = true;
                this.dateComplete.year = null;
                this.dateComplete.month = null;
                this.progressFormNewLogic.get('actualFinishDate').setValue(null);

                let checkerPrevYear = (): any => {
                    if (mIndex == 0 && yIndex != 0) {
                        // this.logs('Prevs val' + this.logs(this.progressPlanMile1[yIndex - 1].listMonth[11][type]));
                        return this.progressPlanMile1[yIndex - 1].listMonth[11][type];
                    } else {
                        return this.progressPlanMile1[yIndex].listMonth[mIndex - 1][type]
                    }
                }

                this.progressPlanMile1.forEach(y => {
                    y.listMonth.forEach(m => {
                        if (+m[type] > +max) max = m[type];
                    });
                });

                // this.logs(checkValue + ' // ' + max + ' // ' + checkerPrevYear);
                if (checkValue >= this.progressPlanMile1[yIndex].listMonth[mIndex]['actualValue']) {
                    if (checkerPrevYear && checkValue >= checkerPrevYear && +checkValue >= +max) {
                        this.progressPlanMile1[yIndex].listMonth[mIndex][type] = checkValue;
                    }
                    else {
                        // this.logs('return null caues Val < PrevsVal');
                        this.progressPlanMile1[yIndex].listMonth[mIndex][type] = +max;
                    }
                } else {
                    // this.logs('return null cause Val < planDisp');
                    this.progressPlanMile1[yIndex].listMonth[mIndex][type] = +max;
                }

            }
            if (type === "planValue") {
                this.allowActualFinishDate = true;
                this.dateComplete.year = null;
                this.dateComplete.month = null;
                this.progressFormNewLogic.get('actualFinishDate').setValue(null);

                let checkerPrevYear = (): any => {
                    if (mIndex == 0 && yIndex != 0) {
                        return this.progressPlanMile1[yIndex - 1].listMonth[11][type];
                    } else {
                        return this.progressPlanMile1[yIndex].listMonth[mIndex - 1][type]
                    }
                }

                if (checkValue >= this.progressPlanMile1[yIndex].listMonth[mIndex]['planValue']) {
                    if (checkerPrevYear && checkValue >= checkerPrevYear && +checkValue >= +max) {
                        this.progressPlanMile1[yIndex].listMonth[mIndex][type] = checkValue;
                        this.surroundCheckUp(yIndex, mIndex);
                    }
                    else {
                        this.progressPlanMile1[yIndex].listMonth[mIndex][type] = +max;
                        this.surroundCheckUp(yIndex, mIndex);
                    }
                } else {
                    this.progressPlanMile1[yIndex].listMonth[mIndex][type] = +max;
                    this.surroundCheckUp(yIndex, mIndex);
                }
            }

        }
    }

    ngOnDestroy() {
        this.isLoaded = false;
    }

    get getPlanError() {
        return this.progressService.checkPlan;
    }

    checkerPrevYear(type: string, mIndex: number, yIndex: number) {
        if (mIndex == 0 && yIndex != 0) {
            return this.progressPlanMile1[yIndex - 1].listMonth[11][type];
        } else {
            return this.progressPlanMile1[yIndex].listMonth[mIndex - 1][type]
        }
    }


    GetProgressPlanDate() {
        this.progressService.GetProgressPlanDate(this.initiativeService.id).subscribe(res => {
            this.progressService.GetProgressPlanComplete(this.initiativeService.id).then((planRes) => {
                this.planComplete = planRes;
                if (res.length > 0 && !this.progressService.changeStandard) {
                    this.progressFormNewLogic.patchValue({
                        basicStartDate: res[0].basicStartDate ? new Date(res[0].basicStartDate) : null,
                        basicFinishDate: res[0].basicFinishDate ? new Date(res[0].basicFinishDate) : null,
                        actualStartDate: res[0].actualStartDate ? new Date(res[0].actualStartDate) : null,
                        actualFinishDate: res[0].actualFinishDate ? new Date(res[0].actualFinishDate) : null
                    });
                    this.clearDateOverRangeNewLogic();
                } else if (this.requestIniNoDate && this.progressService.changeStandard) {
                    this.progressFormNewLogic.patchValue({
                        basicStartDate: new Date(this.requestIniNoDate),
                        basicFinishDate: new Date(this.finishDate),
                    });
                    this.clearDateOverRangeNewLogic();
                }
                else {
                    this.capexService.GetCapexInformationList(this.initiativeService.id).subscribe(response => {
                        // StartingDate
                        if (response.length > 0) {
                            this.RequestIniNoDate = response[response.length - 1].requestIniNoDate ? new Date(response[response.length - 1].requestIniNoDate) : new Date(response[response.length - 1].startingDate);
                            this.ProjecctComRun = response[response.length - 1].projecctComRun ? new Date(response[response.length - 1].projecctComRun) : null;
                            this.overallBasicStartDate = response[response.length - 1].requestIniNoDate ? new Date(response[response.length - 1].requestIniNoDate) : null;
                            this.progressFormNewLogic.patchValue({
                                basicStartDate: this.RequestIniNoDate ? new Date(this.RequestIniNoDate) : null,
                                basicFinishDate: this.ProjecctComRun ? new Date(this.ProjecctComRun) : null
                            });
                            // }
                            this.clearDateOverRangeNewLogic();
                        } else {
                            this.initiativeService.GetInitiative(this.initiativeService.id).subscribe((generalRes) => {
                                this.generalData = generalRes;
                                this.progressFormNewLogic.patchValue({
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
            if (res.length > 0) {
                let year = null;
                let i = 0;
                this.progressPlanMile1.length > 0 ? this.progressPlanMile1 : this.progressPlanMile1 = this.progressForm.get('progressPlan').value;
                for (let index = 0; index < res.length; index++) {
                    if (year == null || year == res[index].year) {
                        //year null
                        year = res[index].year;
                        this.progressPlanMile1[i].year = res[index].year;
                        if (res[index].planActual == "Plan" && res[index].progressPlanType == "-") {
                            this.progressPlanMile1[i].listMonth[0].planValue = res[index].jan ? parseFloat(res[index].jan) : null;
                            this.progressPlanMile1[i].listMonth[1].planValue = res[index].feb ? parseFloat(res[index].feb) : null;
                            this.progressPlanMile1[i].listMonth[2].planValue = res[index].mar ? parseFloat(res[index].mar) : null;
                            this.progressPlanMile1[i].listMonth[3].planValue = res[index].apr ? parseFloat(res[index].apr) : null;
                            this.progressPlanMile1[i].listMonth[4].planValue = res[index].may ? parseFloat(res[index].may) : null;
                            this.progressPlanMile1[i].listMonth[5].planValue = res[index].jun ? parseFloat(res[index].jun) : null;
                            this.progressPlanMile1[i].listMonth[6].planValue = res[index].jul ? parseFloat(res[index].jul) : null;
                            this.progressPlanMile1[i].listMonth[7].planValue = res[index].aug ? parseFloat(res[index].aug) : null;
                            this.progressPlanMile1[i].listMonth[8].planValue = res[index].sep ? parseFloat(res[index].sep) : null;
                            this.progressPlanMile1[i].listMonth[9].planValue = res[index].oct ? parseFloat(res[index].oct) : null;
                            this.progressPlanMile1[i].listMonth[10].planValue = res[index].nov ? parseFloat(res[index].nov) : null;
                            this.progressPlanMile1[i].listMonth[11].planValue = res[index].dec ? parseFloat(res[index].dec) : null;

                        }
                        if (res[index].planActual == "Actual" && res[index].progressPlanType == "-") {
                            this.progressPlanMile1[i].listMonth[0].actualValue = res[index].jan ? parseFloat(res[index].jan) : null;
                            this.progressPlanMile1[i].listMonth[1].actualValue = res[index].feb ? parseFloat(res[index].feb) : null;
                            this.progressPlanMile1[i].listMonth[2].actualValue = res[index].mar ? parseFloat(res[index].mar) : null;
                            this.progressPlanMile1[i].listMonth[3].actualValue = res[index].apr ? parseFloat(res[index].apr) : null;
                            this.progressPlanMile1[i].listMonth[4].actualValue = res[index].may ? parseFloat(res[index].may) : null;
                            this.progressPlanMile1[i].listMonth[5].actualValue = res[index].jun ? parseFloat(res[index].jun) : null;
                            this.progressPlanMile1[i].listMonth[6].actualValue = res[index].jul ? parseFloat(res[index].jul) : null;
                            this.progressPlanMile1[i].listMonth[7].actualValue = res[index].aug ? parseFloat(res[index].aug) : null;
                            this.progressPlanMile1[i].listMonth[8].actualValue = res[index].sep ? parseFloat(res[index].sep) : null;
                            this.progressPlanMile1[i].listMonth[9].actualValue = res[index].oct ? parseFloat(res[index].oct) : null;
                            this.progressPlanMile1[i].listMonth[10].actualValue = res[index].nov ? parseFloat(res[index].nov) : null;
                            this.progressPlanMile1[i].listMonth[11].actualValue = res[index].dec ? parseFloat(res[index].dec) : null;
                        }
                        if (res[index].planActual == "Plan" && res[index].progressPlanType == "Over All") {
                            this.progressPlanMile1[i].listMonth[0].planAccumulate = res[index].jan ? parseFloat(res[index].jan) : null;
                            this.progressPlanMile1[i].listMonth[1].planAccumulate = res[index].feb ? parseFloat(res[index].feb) : null;
                            this.progressPlanMile1[i].listMonth[2].planAccumulate = res[index].mar ? parseFloat(res[index].mar) : null;
                            this.progressPlanMile1[i].listMonth[3].planAccumulate = res[index].apr ? parseFloat(res[index].apr) : null;
                            this.progressPlanMile1[i].listMonth[4].planAccumulate = res[index].may ? parseFloat(res[index].may) : null;
                            this.progressPlanMile1[i].listMonth[5].planAccumulate = res[index].jun ? parseFloat(res[index].jun) : null;
                            this.progressPlanMile1[i].listMonth[6].planAccumulate = res[index].jul ? parseFloat(res[index].jul) : null;
                            this.progressPlanMile1[i].listMonth[7].planAccumulate = res[index].aug ? parseFloat(res[index].aug) : null;
                            this.progressPlanMile1[i].listMonth[8].planAccumulate = res[index].sep ? parseFloat(res[index].sep) : null;
                            this.progressPlanMile1[i].listMonth[9].planAccumulate = res[index].oct ? parseFloat(res[index].oct) : null;
                            this.progressPlanMile1[i].listMonth[10].planAccumulate = res[index].nov ? parseFloat(res[index].nov) : null;
                            this.progressPlanMile1[i].listMonth[11].planAccumulate = res[index].dec ? parseFloat(res[index].dec) : null;

                        }
                        if (res[index].planActual == "Actual" && res[index].progressPlanType == "Over All") {
                            this.progressPlanMile1[i].listMonth[0].actualAccumulate = res[index].jan ? parseFloat(res[index].jan) : null;
                            this.progressPlanMile1[i].listMonth[1].actualAccumulate = res[index].feb ? parseFloat(res[index].feb) : null;
                            this.progressPlanMile1[i].listMonth[2].actualAccumulate = res[index].mar ? parseFloat(res[index].mar) : null;
                            this.progressPlanMile1[i].listMonth[3].actualAccumulate = res[index].apr ? parseFloat(res[index].apr) : null;
                            this.progressPlanMile1[i].listMonth[4].actualAccumulate = res[index].may ? parseFloat(res[index].may) : null;
                            this.progressPlanMile1[i].listMonth[5].actualAccumulate = res[index].jun ? parseFloat(res[index].jun) : null;
                            this.progressPlanMile1[i].listMonth[6].actualAccumulate = res[index].jul ? parseFloat(res[index].jul) : null;
                            this.progressPlanMile1[i].listMonth[7].actualAccumulate = res[index].aug ? parseFloat(res[index].aug) : null;
                            this.progressPlanMile1[i].listMonth[8].actualAccumulate = res[index].sep ? parseFloat(res[index].sep) : null;
                            this.progressPlanMile1[i].listMonth[9].actualAccumulate = res[index].oct ? parseFloat(res[index].oct) : null;
                            this.progressPlanMile1[i].listMonth[10].actualAccumulate = res[index].nov ? parseFloat(res[index].nov) : null;
                            this.progressPlanMile1[i].listMonth[11].actualAccumulate = res[index].dec ? parseFloat(res[index].dec) : null;

                        }
                    } else {
                        ++i;
                        year = res[index].year;
                        this.progressPlanMile1[i].year = res[index].year;
                        if (res[index].planActual == "Plan" && res[index].progressPlanType == "-") {
                            this.progressPlanMile1[i].listMonth[0].planValue = res[index].jan ? parseFloat(res[index].jan) : null;
                            this.progressPlanMile1[i].listMonth[1].planValue = res[index].feb ? parseFloat(res[index].feb) : null;
                            this.progressPlanMile1[i].listMonth[2].planValue = res[index].mar ? parseFloat(res[index].mar) : null;
                            this.progressPlanMile1[i].listMonth[3].planValue = res[index].apr ? parseFloat(res[index].apr) : null;
                            this.progressPlanMile1[i].listMonth[4].planValue = res[index].may ? parseFloat(res[index].may) : null;
                            this.progressPlanMile1[i].listMonth[5].planValue = res[index].jun ? parseFloat(res[index].jun) : null;
                            this.progressPlanMile1[i].listMonth[6].planValue = res[index].jul ? parseFloat(res[index].jul) : null;
                            this.progressPlanMile1[i].listMonth[7].planValue = res[index].aug ? parseFloat(res[index].aug) : null;
                            this.progressPlanMile1[i].listMonth[8].planValue = res[index].sep ? parseFloat(res[index].sep) : null;
                            this.progressPlanMile1[i].listMonth[9].planValue = res[index].oct ? parseFloat(res[index].oct) : null;
                            this.progressPlanMile1[i].listMonth[10].planValue = res[index].nov ? parseFloat(res[index].nov) : null;
                            this.progressPlanMile1[i].listMonth[11].planValue = res[index].dec ? parseFloat(res[index].dec) : null;

                        }
                        if (res[index].planActual == "Actual" && res[index].progressPlanType == "-") {
                            this.progressPlanMile1[i].listMonth[0].actualValue = res[index].jan ? parseFloat(res[index].jan) : null;
                            this.progressPlanMile1[i].listMonth[1].actualValue = res[index].feb ? parseFloat(res[index].feb) : null;
                            this.progressPlanMile1[i].listMonth[2].actualValue = res[index].mar ? parseFloat(res[index].mar) : null;
                            this.progressPlanMile1[i].listMonth[3].actualValue = res[index].apr ? parseFloat(res[index].apr) : null;
                            this.progressPlanMile1[i].listMonth[4].actualValue = res[index].may ? parseFloat(res[index].may) : null;
                            this.progressPlanMile1[i].listMonth[5].actualValue = res[index].jun ? parseFloat(res[index].jun) : null;
                            this.progressPlanMile1[i].listMonth[6].actualValue = res[index].jul ? parseFloat(res[index].jul) : null;
                            this.progressPlanMile1[i].listMonth[7].actualValue = res[index].aug ? parseFloat(res[index].aug) : null;
                            this.progressPlanMile1[i].listMonth[8].actualValue = res[index].sep ? parseFloat(res[index].sep) : null;
                            this.progressPlanMile1[i].listMonth[9].actualValue = res[index].oct ? parseFloat(res[index].oct) : null;
                            this.progressPlanMile1[i].listMonth[10].actualValue = res[index].nov ? parseFloat(res[index].nov) : null;
                            this.progressPlanMile1[i].listMonth[11].actualValue = res[index].dec ? parseFloat(res[index].dec) : null;
                        }
                        if (res[index].planActual == "Plan" && res[index].progressPlanType == "Over All") {
                            this.progressPlanMile1[i].listMonth[0].planAccumulate = res[index].jan ? parseFloat(res[index].jan) : null;
                            this.progressPlanMile1[i].listMonth[1].planAccumulate = res[index].feb ? parseFloat(res[index].feb) : null;
                            this.progressPlanMile1[i].listMonth[2].planAccumulate = res[index].mar ? parseFloat(res[index].mar) : null;
                            this.progressPlanMile1[i].listMonth[3].planAccumulate = res[index].apr ? parseFloat(res[index].apr) : null;
                            this.progressPlanMile1[i].listMonth[4].planAccumulate = res[index].may ? parseFloat(res[index].may) : null;
                            this.progressPlanMile1[i].listMonth[5].planAccumulate = res[index].jun ? parseFloat(res[index].jun) : null;
                            this.progressPlanMile1[i].listMonth[6].planAccumulate = res[index].jul ? parseFloat(res[index].jul) : null;
                            this.progressPlanMile1[i].listMonth[7].planAccumulate = res[index].aug ? parseFloat(res[index].aug) : null;
                            this.progressPlanMile1[i].listMonth[8].planAccumulate = res[index].sep ? parseFloat(res[index].sep) : null;
                            this.progressPlanMile1[i].listMonth[9].planAccumulate = res[index].oct ? parseFloat(res[index].oct) : null;
                            this.progressPlanMile1[i].listMonth[10].planAccumulate = res[index].nov ? parseFloat(res[index].nov) : null;
                            this.progressPlanMile1[i].listMonth[11].planAccumulate = res[index].dec ? parseFloat(res[index].dec) : null;

                        }
                        if (res[index].planActual == "Actual" && res[index].progressPlanType == "Over All") {
                            this.progressPlanMile1[i].listMonth[0].actualAccumulate = res[index].jan ? parseFloat(res[index].jan) : null;
                            this.progressPlanMile1[i].listMonth[1].actualAccumulate = res[index].feb ? parseFloat(res[index].feb) : null;
                            this.progressPlanMile1[i].listMonth[2].actualAccumulate = res[index].mar ? parseFloat(res[index].mar) : null;
                            this.progressPlanMile1[i].listMonth[3].actualAccumulate = res[index].apr ? parseFloat(res[index].apr) : null;
                            this.progressPlanMile1[i].listMonth[4].actualAccumulate = res[index].may ? parseFloat(res[index].may) : null;
                            this.progressPlanMile1[i].listMonth[5].actualAccumulate = res[index].jun ? parseFloat(res[index].jun) : null;
                            this.progressPlanMile1[i].listMonth[6].actualAccumulate = res[index].jul ? parseFloat(res[index].jul) : null;
                            this.progressPlanMile1[i].listMonth[7].actualAccumulate = res[index].aug ? parseFloat(res[index].aug) : null;
                            this.progressPlanMile1[i].listMonth[8].actualAccumulate = res[index].sep ? parseFloat(res[index].sep) : null;
                            this.progressPlanMile1[i].listMonth[9].actualAccumulate = res[index].oct ? parseFloat(res[index].oct) : null;
                            this.progressPlanMile1[i].listMonth[10].actualAccumulate = res[index].nov ? parseFloat(res[index].nov) : null;
                            this.progressPlanMile1[i].listMonth[11].actualAccumulate = res[index].dec ? parseFloat(res[index].dec) : null;

                        }
                    }

                }

                //assign to service
                this.isLoaded = true;
                this.clearDateActual();
            } else {
                this.isLoaded = true;
            }
        });
    }
    GetProgressPlanNewLogic() {
        this.progressService.GetProgressPlan(this.initiativeService.id).subscribe(res => {
            let progressPlanType = ['-'];
            let planActualType = ['Plan', 'Actual'];
            let planActualForm = ['planValue', 'actualValue'];

            let year = null;
            let i = 0;
            let progressPlans = this.progressFormNewLogic.get('progressPlan') as FormArray;
            this.overallBasicStartDate = this.progressFormNewLogic.get('basicStartDate').value;
            let completeDate = this.planComplete ? new Date(parseInt(this.planComplete) - 1, 12, 31) : null;
            if(!!completeDate && completeDate > this.progressFormNewLogic.get('basicFinishDate').value){
                this.overallBasicFinishDate = completeDate;
            }else if (!!completeDate && completeDate < this.progressFormNewLogic.get('basicFinishDate').value){
                this.overallBasicFinishDate = this.progressFormNewLogic.get('basicFinishDate').value;
            }else if(!completeDate && this.dateUtil.GetToday > this.progressFormNewLogic.get('basicFinishDate').value){
                this.overallBasicFinishDate = this.dateUtil.GetToday;
            }else {
                this.overallBasicFinishDate = this.progressFormNewLogic.get('basicFinishDate').value;
            }
            if (res.length > 0) {
                res.forEach((resp, index) => {
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
                                                    this.dateComplete = {
                                                        year: resp.year,
                                                        month: monthIndex
                                                    };
                                                    this.allowActualFinishDate = false;
                                                }
                                                listMonthArray.at(monthIndex).get(planActualForm[planTypeIndex]).patchValue(resp[month]);
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

    clearDateOverRange = (): void => {

        const progressForm = this.progressForm.value;

        this.basicStartDate = progressForm.basicStartDate;
        this.basicFinishDate = progressForm.basicFinishDate;

        if (this.basicStartDate && this.basicFinishDate) {
            this.diffYear = this.basicFinishDate ? this.basicFinishDate.getFullYear() - this.basicStartDate.getFullYear() : 0;
            this.currentYear = this.basicStartDate.getFullYear();
            if (this.diffYear > 0) {
                this.progressPlanMile1 = [{
                    year: this.currentYear,
                    listMonth: this.listMonth.map(obj => ({ ...obj }))
                }];
                for (let i = 1; i <= this.diffYear; i++) {
                    this.progressPlanMile1.push(
                        {
                            year: this.currentYear + i,
                            listMonth: this.listMonth.map(obj => ({ ...obj }))
                        }
                    );
                }
            } else {
                this.progressPlanMile1 = [{
                    year: this.currentYear,
                    listMonth: this.listMonth.map(obj => ({ ...obj }))
                }];
            }
            const lenYear = this.progressPlanMile1.length - 1;
            if (this.progressPlanMile1.length > 1) {
                this.progressPlanMile1.forEach((element, index) => {
                    if (index === 0) {
                        element.listMonth.forEach((month, mIndex) => {

                            if (this.basicStartDate && mIndex < this.basicStartDate.getMonth()) {
                                month.planDisabled = true;
                                month.actualDisabled = true;
                            } else if (this.basicFinishDate && this.basicFinishDate.getFullYear() == this.basicStartDate.getFullYear() && mIndex > this.basicFinishDate.getMonth()) {
                                month.planDisabled = true;
                                month.actualDisabled = true;
                            } else {
                                month.planDisabled = (this.initiativeService.viewMode || !!this.wbsNo) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false;
                                month.actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                            }
                        });
                    } else if (index === lenYear) {

                        element.listMonth.forEach((month, mIndex) => {
                            if (this.basicFinishDate && mIndex > this.basicFinishDate.getMonth()) {
                                month.planDisabled = true;
                                month.actualDisabled = true;
                            } else {
                                month.planDisabled = (this.initiativeService.viewMode || !!this.wbsNo) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false;
                                month.actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                            }
                        });
                    }
                });
            } else {

                this.progressPlanMile1.forEach((element, index) => {
                    element.listMonth.forEach((month, mIndex) => {
                        if (this.basicStartDate && this.basicFinishDate) {

                            if (mIndex < this.basicStartDate.getMonth() || mIndex > this.basicFinishDate.getMonth()) {

                                month.planDisabled = true;
                                month.actualDisabled = true;
                            } else {

                                month.planDisabled = (this.initiativeService.viewMode || !!this.wbsNo) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false;
                                month.actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                            }
                        } else {

                            month.planDisabled = (this.initiativeService.viewMode || !!this.wbsNo) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false;
                            month.actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                        }

                    });
                });
            }
            this.progressForm.get('progressPlan').patchValue(this.progressPlanMile1);
            if (this.initiativeService.viewMode) {
                this.progressForm.disable();
            }
            this.GetProgressPlan();
        }
    }

    clearDateOverRangeNewLogic = (): void => {

        const progressForm = this.progressForm.value;
        const listMonthName = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

        let actualStartDate: Date = this.progressFormNewLogic.get('actualStartDate').value ? this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('actualStartDate').value) : new Date(8640000000000000);
        this.basicStartDate = this.progressFormNewLogic.get('basicStartDate').value ? this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('basicStartDate').value) : new Date(8640000000000000);
        this.bsBasicConfig = this.bsBasicConfig = Object.assign({}, {
            minDate: this.basicStartDate,
            dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false
        });
        this.formGroup.get('initiativesForm')?.get('finishingDate').setValue(this.progressFormNewLogic.get('basicFinishDate').value);
        let completeDate = this.planComplete ? new Date(parseInt(this.planComplete) - 1, 12, 31) : null;
        if(!!completeDate && completeDate > this.progressFormNewLogic.get('basicFinishDate').value){
            this.overallBasicFinishDate = completeDate;
        }else if (!!completeDate && completeDate < this.progressFormNewLogic.get('basicFinishDate').value){
            this.overallBasicFinishDate = this.progressFormNewLogic.get('basicFinishDate').value;
        }else if(!completeDate && this.dateUtil.GetToday > this.progressFormNewLogic.get('basicFinishDate').value){
            this.overallBasicFinishDate = this.dateUtil.GetToday;
        }else {
            this.overallBasicFinishDate = this.progressFormNewLogic.get('basicFinishDate').value;
        }
        this.basicFinishDate = this.overallBasicFinishDate;

        if (this.basicStartDate && this.basicFinishDate) {
            //get year
            const diffYear = this.dateUtil.GetFullYear(this.basicFinishDate) - this.dateUtil.GetFullYear(this.basicStartDate);


            let planArrayForm = this.progressFormNewLogic.get('progressPlan') as FormArray;
            planArrayForm.clear();
            for (let index = 0; index <= diffYear; index++) {

                let planForm: FormGroup = this.formBuilder.group({
                    year: this.dateUtil.GetFullYear(this.basicStartDate) + index,
                    listMonth: this.formBuilder.array([])
                });
                let plan = planForm.get('listMonth') as FormArray;
                for (let month = 0; month < 12; month++) {
                    let listMonthForm: FormGroup = this.formBuilder.group({
                        name: listMonthName[month],
                        planValue: null,
                        planAccumulate: 0,
                        planDisabled: false,
                        actualValue: null,
                        actualAccumulate: null,
                        actualDisabled: false
                    });

                    plan.push(listMonthForm);
                }
                planArrayForm.push(planForm);
            }
            this.GetProgressPlanNewLogic();
        }
    }

    clearDateFunctionChangeValue() {
        if (!this.isLoaded) {
            return;
        }
        this.basicStartDate = this.progressFormNewLogic.get('basicStartDate').value;
        let actualStartDate: Date = this.progressFormNewLogic.get('actualStartDate').value ? this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('actualStartDate').value) : this.dateUtil.GetDateOnly(this.basicStartDate);
        const listMonthName = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        this.bsBasicConfig = this.bsBasicConfig = Object.assign({}, {
            minDate: this.basicStartDate,
            dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false
        });
        this.formGroup.get('initiativesForm')?.get('finishingDate').setValue(this.progressFormNewLogic.get('basicFinishDate').value);
        let completeDate = this.planComplete ? new Date(parseInt(this.planComplete) - 1, 12, 31) : null;
        if(!!completeDate && completeDate > this.progressFormNewLogic.get('basicFinishDate').value){
            this.overallBasicFinishDate = completeDate;
        }else if (!!completeDate && completeDate < this.progressFormNewLogic.get('basicFinishDate').value){
            this.overallBasicFinishDate = this.progressFormNewLogic.get('basicFinishDate').value;
        }else if(!completeDate && this.dateUtil.GetToday > this.progressFormNewLogic.get('basicFinishDate').value){
            this.overallBasicFinishDate = this.dateUtil.GetToday;
        }else {
            this.overallBasicFinishDate = this.progressFormNewLogic.get('basicFinishDate').value;
        }
        this.basicFinishDate = this.overallBasicFinishDate;


        if (this.basicStartDate && this.basicFinishDate) {
            //get year
            const diffYear = this.dateUtil.GetFullYear(this.basicFinishDate) - this.dateUtil.GetFullYear(this.basicStartDate);
            let formPlanArray = this.progressPlanMile1;

            let planArrayForm = this.progressFormNewLogic.get('progressPlan') as FormArray;
            planArrayForm.clear();
            for (let index = 0; index <= diffYear; index++) {

                let planForm: FormGroup = this.formBuilder.group({
                    year: this.dateUtil.GetFullYear(this.progressFormNewLogic.get('basicStartDate').value) + index,
                    listMonth: this.formBuilder.array([])
                });
                let plan = planForm.get('listMonth') as FormArray;
                for (let month = 0; month < 12; month++) {
                    let listMonthForm: FormGroup = this.formBuilder.group({
                        name: listMonthName[month],
                        planValue: null,
                        planAccumulate: 0,
                        planDisabled: false,
                        actualValue: null,
                        actualAccumulate: null,
                        actualDisabled: false
                    });

                    plan.push(listMonthForm);
                }
                planArrayForm.push(planForm);
            }
            for (let indexPAF = 0; indexPAF < planArrayForm.length; indexPAF++) {
                for (let indexFPA = 0; indexFPA < formPlanArray.length; indexFPA++) {
                    if (planArrayForm.value[indexPAF].year == formPlanArray[indexFPA].year) {
                        let listMonthFormPFA = planArrayForm.at(indexPAF).get('listMonth') as FormArray;
                        let listMonthFormFPA = formPlanArray[indexFPA].listMonth;
                        for (let month = 0; month < 12; month++) {
                            if (listMonthFormFPA[month].planValue) {
                                listMonthFormPFA.at(month).get("planValue").patchValue(
                                    listMonthFormFPA[month].planValue
                                );
                            }
                            if (listMonthFormFPA[month].planDisabled) {
                                listMonthFormPFA.at(month).get("planDisabled").patchValue(
                                    listMonthFormFPA[month].planDisabled
                                );
                            }
                            if (listMonthFormFPA[month].planAccumulate) {
                                listMonthFormPFA.at(month).get("planAccumulate").patchValue(
                                    listMonthFormFPA[month].planAccumulate
                                );
                            }
                            if (listMonthFormFPA[month].actualValue) {
                                listMonthFormPFA.at(month).get("actualValue").patchValue(
                                    listMonthFormFPA[month].actualValue
                                );
                            }
                            if (listMonthFormFPA[month].actualDisabled) {
                                listMonthFormPFA.at(month).get("actualDisabled").patchValue(
                                    listMonthFormFPA[month].actualDisabled
                                );
                            }
                            if (listMonthFormFPA[month].actualAccumulate) {
                                listMonthFormPFA.at(month).get("actualAccumulate").patchValue(
                                    listMonthFormFPA[month].actualAccumulate
                                );
                            }
                        }
                    }
                }
            }

            for (let index = 0; index <= diffYear; index++) {
                let controlArray = planArrayForm.at(index).get('listMonth') as FormArray;
                for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                    if (actualStartDate.getFullYear() > parseInt(planArrayForm.at(index).get('year').value)) {
                        controlArray.at(monthIndex).get('planValue').patchValue(null);
                        controlArray.at(monthIndex).get('planAccumulate').patchValue(null);
                        controlArray.at(monthIndex).get('planDisabled').patchValue(true);
                        controlArray.at(monthIndex).get('actualValue').patchValue(null);
                        controlArray.at(monthIndex).get('actualAccumulate').patchValue(null);
                        controlArray.at(monthIndex).get('actualDisabled').patchValue(true);
                    } else if (this.basicFinishDate.getFullYear() < parseInt(planArrayForm.at(index).get('year').value)) {
                        controlArray.at(monthIndex).get('planValue').patchValue(null);
                        controlArray.at(monthIndex).get('planAccumulate').patchValue(null);
                        controlArray.at(monthIndex).get('planDisabled').patchValue(true);
                        controlArray.at(monthIndex).get('actualValue').patchValue(null);
                        controlArray.at(monthIndex).get('actualAccumulate').patchValue(null);
                        controlArray.at(monthIndex).get('actualDisabled').patchValue(true);
                    } else {
                        if ((monthIndex < actualStartDate.getMonth()) && actualStartDate.getFullYear() == parseInt(planArrayForm.at(index).get('year').value)) {
                            controlArray.at(monthIndex).get('planValue').patchValue(null);
                            controlArray.at(monthIndex).get('planAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get('planDisabled').patchValue(true);
                            controlArray.at(monthIndex).get('actualValue').patchValue(null);
                            controlArray.at(monthIndex).get('actualAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get('actualDisabled').patchValue(true);
                        } else if (monthIndex > this.basicFinishDate.getMonth() && this.basicFinishDate.getFullYear() == parseInt(planArrayForm.at(index).get('year').value)) {
                            controlArray.at(monthIndex).get('planValue').patchValue(null);
                            controlArray.at(monthIndex).get('planAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get('planDisabled').patchValue(true);
                            controlArray.at(monthIndex).get('actualValue').patchValue(null);
                            controlArray.at(monthIndex).get('actualAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get('actualDisabled').patchValue(true);
                        } else {
                            let value = controlArray.at(monthIndex).value;
                            controlArray.at(monthIndex).get('planDisabled').patchValue(this.wbsNo && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false);
                            let newValue = controlArray.at(monthIndex).value;
                            if (!controlArray.at(monthIndex).get('planDisabled').value) {
                                newValue.planValue = value.planValue
                                controlArray.at(monthIndex).patchValue(newValue);
                            } else {
                                newValue.planValue = null
                                controlArray.at(monthIndex).patchValue(newValue);
                            }
                            controlArray.at(monthIndex).get('actualDisabled').patchValue(this.initiativeService.viewMode || !this.wbsNo ? true : false);
                        }
                    }
                }
            }
        }
        this.clearDateFunctionNewLogic();
    }

    //เปิดให้แก้ไขได้
    clearDateFunctionNewLogic() {
        // Clear min, max val
        this.minPlanValue = 0;
        this.maxPlanValue = 0;
        this.minActualValue = 0;
        this.maxActualValue = 0;
        this.swPlan = true;
        this.swActual = true;

        let actualStartDate: Date = this.progressFormNewLogic.get('actualStartDate').value ? this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('actualStartDate').value) : new Date(8640000000000000);
        this.isActualStartDate = this.progressFormNewLogic.get('actualStartDate').value ? true : false;
        let basicStartDate: Date = this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('basicStartDate').value);
        let basicFinishDate: Date = this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('basicFinishDate').value);
        let actualMonth = actualStartDate.getMonth()
        let actualYear = actualStartDate.getFullYear()

        if (actualStartDate && basicFinishDate) {
            let formPlanArray = this.progressFormNewLogic.get('progressPlan') as FormArray;

            for (let index = 0; index < formPlanArray.length; index++) {
                let controlArray = formPlanArray.at(index).get('listMonth') as FormArray;
                for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                    if (actualStartDate.getFullYear() != 275760 &&
                        actualStartDate.getFullYear() > parseInt(formPlanArray.at(index).get('year').value)) {
                        controlArray.at(monthIndex).get('planValue').patchValue(null);
                        controlArray.at(monthIndex).get('planAccumulate').patchValue(null);
                        controlArray.at(monthIndex).get('planDisabled').patchValue(true);
                        controlArray.at(monthIndex).get('actualValue').patchValue(null);
                        controlArray.at(monthIndex).get('actualAccumulate').patchValue(null);
                        controlArray.at(monthIndex).get('actualDisabled').patchValue(true);
                    } else {
                        if (monthIndex < basicStartDate.getMonth() && monthIndex < actualStartDate.getMonth()
                        && actualStartDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)
                        && basicStartDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)) {
                            controlArray.at(monthIndex).get('planValue').patchValue(null);
                            controlArray.at(monthIndex).get('planAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get('planDisabled').patchValue(true);
                            controlArray.at(monthIndex).get('actualValue').patchValue(null);
                            controlArray.at(monthIndex).get('actualAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get('actualDisabled').patchValue(true);
                        } else if (monthIndex > basicFinishDate.getMonth() && basicFinishDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)) {
                            controlArray.at(monthIndex).get('planValue').patchValue(null);
                            controlArray.at(monthIndex).get('planAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get('planDisabled').patchValue(true);
                            //controlArray.at(monthIndex).get('actualValue').patchValue(null);
                            controlArray.at(monthIndex).get('actualAccumulate').patchValue(null);
                            controlArray.at(monthIndex).get('actualDisabled').patchValue(true);
                        } else {
                            //plan
                            if (basicFinishDate.getFullYear() > parseInt(formPlanArray.at(index).get('year').value)
                                && basicStartDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)
                                && monthIndex >= basicStartDate.getMonth()) {
                                let value = controlArray.at(monthIndex).value;
                                controlArray.at(monthIndex).get('planDisabled').patchValue((this.initiativeService.viewMode || !!this.wbsNo) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false);
                                let newValue = controlArray.at(monthIndex).value;
                                if (!controlArray.at(monthIndex).get('planDisabled').value || !this.isLoaded) {
                                    newValue.planValue = value.planValue
                                    controlArray.at(monthIndex).patchValue(newValue);
                                } else {
                                    newValue.planValue = null
                                    controlArray.at(monthIndex).patchValue(newValue);
                                }
                            } else if (basicFinishDate.getFullYear() > parseInt(formPlanArray.at(index).get('year').value)
                                && basicStartDate.getFullYear() < parseInt(formPlanArray.at(index).get('year').value)) {
                                let value = controlArray.at(monthIndex).value;
                                controlArray.at(monthIndex).get('planDisabled').patchValue((this.initiativeService.viewMode || !!this.wbsNo) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise)  && !this.isAdmin ? true : false);
                                let newValue = controlArray.at(monthIndex).value;
                                if (!controlArray.at(monthIndex).get('planDisabled').value || !this.isLoaded) {
                                    newValue.planValue = value.planValue
                                    controlArray.at(monthIndex).patchValue(newValue);
                                } else {
                                    newValue.planValue = null
                                    controlArray.at(monthIndex).patchValue(newValue);
                                }
                            } else if (basicFinishDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)
                                && basicStartDate.getFullYear() < basicFinishDate.getFullYear()) {
                                let value = controlArray.at(monthIndex).value;
                                controlArray.at(monthIndex).get('planDisabled').patchValue((this.initiativeService.viewMode || !!this.wbsNo) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false);
                                let newValue = controlArray.at(monthIndex).value;
                                if (!controlArray.at(monthIndex).get('planDisabled').value || !this.isLoaded) {
                                    newValue.planValue = value.planValue
                                    controlArray.at(monthIndex).patchValue(newValue);
                                } else {
                                    newValue.planValue = null
                                    controlArray.at(monthIndex).patchValue(newValue);
                                }
                            } else if ((monthIndex >= basicStartDate.getMonth()) && (monthIndex <= basicFinishDate.getMonth())
                                && basicStartDate.getFullYear() == parseInt(formPlanArray.at(index).get('year').value)
                                && basicStartDate.getFullYear() == basicFinishDate.getFullYear()) {
                                let value = controlArray.at(monthIndex).value;
                                controlArray.at(monthIndex).get('planDisabled').patchValue((this.initiativeService.viewMode || !!this.wbsNo) && (!this.initiativeService.isAddmore && !this.initiativeService.isRevise) && !this.isAdmin ? true : false);
                                let newValue = controlArray.at(monthIndex).value;
                                if (!controlArray.at(monthIndex).get('planDisabled').value || !this.isLoaded) {
                                    newValue.planValue = value.planValue
                                    controlArray.at(monthIndex).patchValue(newValue);
                                } else {
                                    newValue.planValue = null
                                    controlArray.at(monthIndex).patchValue(newValue);
                                }
                            } else {
                                controlArray.at(monthIndex).get('planDisabled').patchValue(true);
                            }

                            //actual 
                            if (this.todayYear == parseInt(formPlanArray.at(index).get('year').value) && this.todayMonth == monthIndex && this.allowActualFinishDate) {
                                let allowMonth: boolean = this.getStartMonth(actualMonth, actualYear)
                                controlArray.at(monthIndex).get('actualDisabled').patchValue(this.initiativeService.viewMode || !this.isActualStartDate || allowMonth ? true : false);
                            }
                            // DEBUG COOMENT
                            else {
                                controlArray.at(monthIndex).get('actualDisabled').patchValue(true);
                            }
                        }
                    }
                }
            }
            this.progressPlanMile1 = this.progressFormNewLogic.get('progressPlan').value;
        }

        this.patchValueController();

        //โหลดข้อมูลสำเร็จ
        this.isLoaded = true;
    }

    getYear(index: number) {
        return this.progressPlanMile1[index].year;
    }

    get viewMode() {
        return this.initiativeService.viewMode;
    }

    clearActualStart = (): void => {
        let actualStartDate = this.progressFormNewLogic.get('actualStartDate').value;
        let actualFinishDate = this.progressFormNewLogic.get('actualFinishDate').value ? this.progressFormNewLogic.get('actualFinishDate').value : this.overallBasicFinishDate;
        let actualMonth = actualStartDate !== null ? this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('actualStartDate').value).getMonth() : null;
        let actualYear = actualStartDate !== null ? this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('actualStartDate').value).getFullYear() : null;


        if (actualStartDate && actualFinishDate) {
            const lenYear = this.progressPlanMile1.length - 1;
            if (this.progressPlanMile1.length > 1) {
                this.progressPlanMile1.forEach((element, index) => {
                    if (index === 0) {
                        element.listMonth.forEach((month, mIndex) => {
                            if (actualStartDate && this.todayYear == element.year && this.todayMonth == mIndex && this.todayMonth >= actualMonth && actualYear == element.year) {
                                const allowMonth: boolean = this.getStartMonth(actualMonth, actualYear)
                                month.actualDisabled = this.initiativeService.viewMode || !this.wbsNo || allowMonth;
                            } else {
                                month.actualDisabled = true;
                            }
                        });
                    } else if (index === lenYear) {
                        element.listMonth.forEach((month, mIndex) => {
                            if (this.actualFinishDate && this.todayYear == element.year && this.todayMonth == mIndex) {
                                const allowMonth: boolean = this.getStartMonth(actualMonth, actualYear)
                                month.actualDisabled = this.initiativeService.viewMode || !this.wbsNo || allowMonth;
                            } else {
                                month.actualDisabled = true;
                            }
                        });
                    } else {
                        element.listMonth.forEach((month, mIndex) => {
                            month.actualDisabled = true;
                        });
                    }
                });
            } else {
                this.progressPlanMile1.forEach((element, index) => {
                    element.listMonth.forEach((month, mIndex) => {

                        if (mIndex == this.todayMonth) {
                            const allowMonth: boolean = this.getStartMonth(actualMonth, actualYear)
                            month.actualDisabled = this.initiativeService.viewMode || !this.wbsNo || allowMonth ? true : false;
                        } else {
                            month.actualDisabled = true;
                        }
                    });
                });
            }
            this.progressForm.get('progressPlan').patchValue(this.progressPlanMile1);
        }
    }

    clearActual = (): void => {
        this.actualFinishDate = this.progressFormNewLogic.get('actualFinishDate').value;
        this.actualStartDate = this.progressFormNewLogic.get('actualStartDate').value;
        let actualMonth = this.actualFinishDate !== null ? this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('actualFinishDate').value).getMonth() : null;
        let actualYear = this.actualFinishDate !== null ? this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('actualFinishDate').value).getFullYear() : null;


        if (this.actualStartDate) {
            const lenYear = this.progressPlanMile1.length - 1;
            if (this.progressPlanMile1.length > 1) {
                this.progressPlanMile1.forEach((element, index) => {
                    if (index === 0) {
                        element.listMonth.forEach((month, mIndex) => {
                            if (this.actualStartDate && this.todayYear == element.year && this.todayMonth == mIndex && this.todayMonth >= this.actualStartDate.getMonth() && this.actualStartDate.getFullYear() == element.year) {
                                const allowMonth: boolean = this.getFinishMonth(actualMonth, actualYear)
                                month.actualDisabled = this.initiativeService.viewMode || !this.disActualFinish;
                            } else {
                                month.actualDisabled = true;
                            }
                        });
                    } else if (index === lenYear) {
                        element.listMonth.forEach((month, mIndex) => {
                            if (this.actualStartDate && this.todayYear == element.year && this.todayMonth == mIndex && this.actualStartDate.getFullYear() <= element.year) {
                                const allowMonth: boolean = this.getFinishMonth(actualMonth, actualYear)
                                month.actualDisabled = this.initiativeService.viewMode || !this.disActualFinish;
                            } else {
                                month.actualDisabled = true;
                            }
                        });
                    } else {
                        element.listMonth.forEach((month, mIndex) => {
                            month.actualDisabled = true;
                        });
                    }
                });
            } else {
                this.progressPlanMile1.forEach((element, index) => {
                    element.listMonth.forEach((month, mIndex) => {

                        if (mIndex == this.todayMonth) {
                            const allowMonth: boolean = this.getFinishMonth(actualMonth, actualYear)
                            month.actualDisabled = (this.initiativeService.viewMode || allowMonth) && !this.disActualFinish ? true : false;
                        } else {
                            month.actualDisabled = true;
                        }
                    });
                });
            }
            this.progressForm.get('progressPlan').patchValue(this.progressPlanMile1);
        }
    }

    clearDateActual = (): void => {
        this.progressService.getRequestIniNoDate.subscribe(startDate => {

            this.RequestIniNoDate = startDate ? startDate : this.RequestIniNoDate;
            // this.clearDateOverRange();
        });
        this.progressService.getProjectComRun.subscribe(finishDate => {

            this.ProjecctComRun = finishDate ? finishDate : this.ProjecctComRun;
            // this.clearDateOverRange();
        });
        const progressForm = this.progressForm.value;
        this.actualStartDate = progressForm.actualStartDate ? progressForm.actualStartDate : new Date(this.RequestIniNoDate);
        this.actualFinishDate = progressForm.actualFinishDate ? progressForm.actualFinishDate : new Date(this.ProjecctComRun);

        if (this.actualStartDate && this.actualFinishDate) {
            const lenYear = this.progressPlanMile1.length - 1;
            if (this.progressPlanMile1.length > 1) {
                this.progressPlanMile1.forEach((element, index) => {
                    if (index === 0) {
                        element.listMonth.forEach((month, mIndex) => {
                            if (this.actualStartDate && this.todayYear == element.year && this.todayMonth == mIndex && this.todayMonth >= this.actualStartDate.getMonth() && this.actualStartDate.getFullYear() == element.year) {
                                month.actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                            } else {
                                month.actualDisabled = true;
                            }
                        });
                    } else if (index === lenYear) {
                        element.listMonth.forEach((month, mIndex) => {
                            if (this.actualFinishDate && this.todayYear == element.year && this.todayMonth == mIndex && this.todayMonth <= this.actualFinishDate.getMonth() && this.actualFinishDate.getFullYear() == element.year) {
                                month.actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                            } else {
                                month.actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                            }
                        });
                    } else {
                        element.listMonth.forEach((month, mIndex) => {
                            month.actualDisabled = true;
                        });
                    }
                });
            } else {
                this.progressPlanMile1.forEach((element, index) => {
                    element.listMonth.forEach((month, mIndex) => {

                        if (mIndex == this.todayMonth) {
                            month.actualDisabled = this.initiativeService.viewMode || !this.wbsNo ? true : false;
                        } else {
                            month.actualDisabled = true;
                        }
                    });
                });
            }
            this.progressForm.get('progressPlan').patchValue(this.progressPlanMile1);
        }


    }



    accumulateCalculation = (yearIndex: number, monthIndex: number, val: number): void => {
        if (val > 100 || val < 0) {
            this.progressPlanMile1[yearIndex].listMonth[monthIndex].planValue = 0;
            if (this.basicStartDate && monthIndex === this.basicStartDate.getMonth()) {
                this.sumOfval = 0.0;
                for (let i = 0; i < this.progressPlanMile1.length; i++) {
                    for (let m = 0; m < 12; m++) {
                        this.progressPlanMile1[i].listMonth[m].planAccumulate = Number(this.sumOfval);
                    }
                }
            }
        } else {
            this.sumOfval = 0.0;
            for (let i = 0; i < this.progressPlanMile1.length; i++) {
                for (let m = 0; m < 12; m++) {
                    this.sumOfval += Number(this.progressPlanMile1[i].listMonth[m].planValue);
                    this.progressPlanMile1[i].listMonth[m].planAccumulate = Number(this.sumOfval);
                }
            }
        }
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

    getMinDate() {
        if (!this.dateComplete.year || !this.dateComplete.month) {
            return;
        }
        return this.dateUtil.GetMinDate(this.dateComplete);
    }
    getMaxDate() {
        if (!this.dateComplete.year || !this.dateComplete.month) {
            return;
        }
        return this.dateUtil.GetMaxDate(this.dateComplete);
    }


    // PATCH VALUE PROCESSOR
    patchValueController = (): void => {
        this.setCapValue();
        this.renderDisplay();
    }

    setCapValue = (): void => {
        this.progressPlanMile1.forEach(elm => {
            elm.listMonth.forEach((m, mIndex) => {
                if (m.planValue > this.maxPlanValue) {
                    this.minPlanValue = this.maxPlanValue;
                    this.maxPlanValue = m.planValue;
                    if (this.maxPlanValue == 100) this.maximumPlanIndex = mIndex;
                }
                if (m.actualValue > this.maxActualValue) this.maxActualValue = m.actualValue;
                if (m.actualValue < this.minActualValue && m.planValue != 0) this.minActualValue = m.actualValue;

            });
        });
    }


    renderDisplay = (): void => {
        let basicStartDate: Date = this.progressFormNewLogic.get('basicStartDate').value ? this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('basicStartDate').value) : this.dateUtil.GetDateOnly(this.overallBasicStartDate);
        let basicFinishDate: Date = this.progressFormNewLogic.get('basicFinishDate').value ? this.dateUtil.GetDateOnly(this.progressFormNewLogic.get('basicFinishDate').value) : this.dateUtil.GetDateOnly(this.overallBasicFinishDate);
        let month = basicStartDate.getMonth();
        let year = basicStartDate.getFullYear();
        let fMonth = basicFinishDate.getMonth();
        let fYear = basicFinishDate.getFullYear();
        let prevs = null;
        let stacks = [];
        let stacksPlan = [];

        this.progressPlanMile1.forEach((element, yIndex) => {
            element.listMonth.forEach((m, mIndex) => {
                // Add planValue to stacks for checkup surrounding.
                if (m.planValue != null && m.planValue != 0 && !stacksPlan.includes(m.planValue)) stacksPlan.push(+m.planValue);

                m = Object.assign(m, {
                    actualDisp: this.displayActualPlanCheckUp(m, mIndex, element.year, stacks),
                })
                if (m.actualValue != null) stacks.push(m.actualValue);
            });
        });
    }

    displayActualPlanCheckUp = (dt: {
        actualValue: number,
        actualDisabled: boolean,
    }, mIndex: number, yIndex: number, stacks: number[]): number => {
        let m: Date = this.progressFormNewLogic.get('actualStartDate').value;
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

    preventNullEvent(event: any) {
        if (event.target.value === '') {
            let date: Date = new Date(this.progressFormNewLogic?.get('basicStartDate').value);
            this.progressFormNewLogic?.get('actualStartDate')?.patchValue(date);
            this.clearActualStart();
        }
    }

    /*prefillPlanValue = (dt: {
        planValue: number,
        planDisabled: boolean,
    }, mIndex: number, yIndex: number, stacks: number[]): number => {
        let m: Date = this.progressFormNewLogic.get('basicStartDate').value;
        let fin: Date = this.progressFormNewLogic.get('basicFinishDate').value;

        // this.logs(`fullyYear = ${fin.getFullYear()}`);
        this.logs(`mIndex = ${mIndex} // yIndex = ${yIndex}`);
        this.logs(`m = ${m.getMonth()} // fin = ${fin.getFullYear()}`);
        this.logs(`Stacks : ${stacks}`);
        if (yIndex > fin.getFullYear()) {
            return null;
        } else {
            if (yIndex <= fin.getFullYear()) {
                if (dt.planDisabled) {
                    return;
                }
                // if (mIndex == fin.getMonth() && yIndex == fin.getFullYear()) {
                //     return 100;
                // }
                // if (stacks[stacks.length - 1] != 100) {
                return stacks[stacks.length - 1];
                // }
            }
        }
    }*/

    // Surrounding checker
    surroundCheckUp = (yIndex: number, mIndex: number): void => {
        let masterData = [];
        // 1.Prefill all input first.
        this.progressPlanMile1.forEach((element, year) => {
            element.listMonth.forEach((m, month) => {
                masterData.push(+m.planValue);
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
            if (target <= prevV2 && target < nextV2) this.progressPlanMile1[yIndex].listMonth[mIndex].planValue = prevV2;
            if (target >= nextV2 && target > prevV2) this.progressPlanMile1[yIndex].listMonth[mIndex].planValue = nextV2;
        }

    }
}


