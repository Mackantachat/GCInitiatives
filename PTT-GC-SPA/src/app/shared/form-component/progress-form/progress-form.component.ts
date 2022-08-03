import { Component, OnInit, Input, AfterContentChecked, ChangeDetectorRef, OnDestroy, OnChanges } from '@angular/core';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { SwalTool } from '@tools/swal.tools';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { DateUtil } from '@utils/date.utils';
import { InitiativeService } from '@services/initiative/initiative.service';
import { ProgressService } from '@services/progress/progress.service';

import { Chart } from 'chart.js';
import 'chartjs-plugin-annotation';
import 'chartjs-plugin-datalabels';
import { Initiative } from '@models/initiative';
import { DatePipe } from '@angular/common';
import { PermissionService } from '@services/permission/permission.service';
import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { CostSpending } from '@models/cost-spending';
import { CapexService } from '@services/capex/capex.service';
import { Capexs, ReturnDetail } from '@models/Capexs';
import { StdProjectDefParams, StdProjectDefRes } from '@models/commonData';
import { MaxService } from '@services/max/max.service';
import { CimService } from '@services/cim/cim.service';
import { DimService } from '@services/dim/dim.service';
import { PimService } from '@services/pim/pim.service';
import { CpiService } from '@services/cpi/cpi.service';
import { ProgressPlanDateModel } from '@models/progress-milestone-model';

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 150 });
}


@Component({
  selector: 'app-progress-form',
  templateUrl: './progress-form.component.html',
  styleUrls: ['./progress-form.component.css']
})
export class ProgressFormComponent implements OnInit, OnDestroy, OnChanges {

  constructor(
    private swalTool: SwalTool,
    private fb: FormBuilder,
    private initiativeService: InitiativeService,
    private progressService: ProgressService,
    private cdref: ChangeDetectorRef,
    private dp: DatePipe,
    public ps: PermissionService,
    private maxService: MaxService,
    private cimService: CimService,
    private capexService: CapexService,
    private dimService: DimService,
    private pimService: PimService,
    private cpiService: CpiService,
    public permissionService: PermissionService,
    private dateUti: DateUtil
  ) {
    this.progressService.haveProgress = true;
    // this.progressService.getCostSpendingData.subscribe((costRes) => {
    //   this.allCostSpening = costRes;
    // });

    this.capexService.getReturnDetail.subscribe((returnDetailRes) => {
      if (returnDetailRes && this.initiativeService.isReturn) {
        if (returnDetailRes.projectCost && returnDetailRes.projectCost != '') {
          this.projectCostValue = returnDetailRes.projectCost * 1000000;
        }
        this.returnDetail = returnDetailRes;
      }
    });

    this.progressService.getCodeOfVP.subscribe((codeRes) => {
      if (codeRes != null && this.dataLoaded) {
        this.progessForm.get('responsible').patchValue(codeRes);
      }
    });

  }

  capexData: Capexs = {} as Capexs;
  returnDetail: ReturnDetail = {} as ReturnDetail;
  IsReturn: boolean;
  IsRevise: boolean;
  Cim: boolean;
  Capex: boolean;
  Dim: boolean;
  Strategy: boolean;
  isRequestCapex: boolean;
  Max: boolean;
  Pim: boolean;
  Cpi: boolean;
  validatePlanCost: boolean;
  isRequestProjectEngineer: boolean;
  dataLoaded: boolean;
  dataLoadedSpending: boolean;
  dateSelect: Date;
  allCostSpening: CostSpending[];
  returnForm = this.fb.group({
    existingCost: "",
    spendingActual: "",
    budgetAvailable: "",
    returnCost: "",
    projectCost: "",
    totalAvailable: ""
  });



  IsEnableSolomon: boolean;
  name = 'Initiative Progress & Milestone';
  generalDataProgrerss: Initiative;

  @Input() formGroup: FormGroup;
  @Input() id: number;
  page: string;
  sapDropdown: any = [];

  standardProjectDefList: StdProjectDefRes[] = [];
  responsibleList: any = [];
  solomonCategoryList: any = [];
  areaPlantList: any = [];
  physicalBuList: any = [];
  physicalUnitList: any = [];


  status: string;
  stage: string;
  remark: string;
  thead: Array<string> = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'OVERALL'];
  controlName: Array<string> = ['janCost', 'febCost', 'marCost', 'aprCost', 'mayCost', 'junCost', 'julCost', 'augCost', 'sepCost', 'octCost', 'novCost', 'decCost', 'overallCost'];

  bsConfig = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };

  progessForm = this.fb.group({
    progressHeaderId: 0,
    details: this.fb.array([]),
    appropriationNo: null,
    wbsNo: null,
    standardProjectDef: "",
    responsible: "",
    solomonCategory: "",
    areaPlant: "",
    physicalBu: "",
    physicalUnit: "",
    initiativeId: this.initiativeService.id,
    planCost: this.fb.group({
      investmentCostId: 0,
      investmentCostType: "planCost",
      yearCost: null,
      janCost: 0,
      febCost: 0,
      marCost: 0,
      aprCost: 0,
      mayCost: 0,
      junCost: 0,
      julCost: 0,
      augCost: 0,
      sepCost: 0,
      octCost: 0,
      novCost: 0,
      decCost: 0,
      overallCost: 0,
      initiativeId: this.initiativeService.id
    }),
    actualCost: this.fb.group({
      investmentCostId: 0,
      investmentCostType: "actualCost",
      yearCost: null,
      janCost: 0,
      febCost: 0,
      marCost: 0,
      aprCost: 0,
      mayCost: 0,
      junCost: 0,
      julCost: 0,
      augCost: 0,
      sepCost: 0,
      octCost: 0,
      novCost: 0,
      decCost: 0,
      overallCost: 0,
      initiativeId: this.initiativeService.id
    }),

    //--------------------------
    // engineering: "",
    // construction: "",
    // procurement: "",
    // commissioningStartup: "",
    // projectManagement: "",
    // riskAndConcern: "",
    // mitigationPlan: "",
    // executiveSummary: "",
    // workForNextMonth: "",
    // environmentKpi: ""
    overAllCostSpending: 0,
    capexProjectCost: 0,
    overAllCostArray: this.fb.array([])
  });

  searchForm = this.fb.group({
    month: this.dateUti.GetCurrentMonth
  });

  monthMode: BsDatepickerViewMode = 'month';
  monthViewDateFormart = {
    isAnimated: true,
    dateInputFormat: 'MMMM',
    showWeekNumbers: false,
    // maxDate: this.dateUti.GetToday,
    minMode: 'month',
  };

  minDate: Date;
  maxDate: Date;

  wbsNo: any;


  showMileStone1: boolean;
  showMileStone2: boolean;
  requestIniNoDate: any;
  finishDate: any;

  isDisabledProgress = true;

  planStatus: any = [];

  Details: any = [];
  textDate: string;
  costSpendingDate: string;

  // lineChart: any = []; //ประกาศตัวแปรเก็บค่า

  public chartJS: any = [];
  public chartJSYear: any = [];
  public lineChart: any = {
    type: 'bar',
    data: {
      labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"], // ชื่อของข้อมูลในแนวแกน x
      datasets: [{ // กำหนดค่าข้อมูลภายในแผนภูมิแบบเส้น
        label: 'Plan',
        data: null,
        fill: false,
        //lineTension: 0.2,
        borderColor: "#0078B8",
        backgroundColor: "#0078B8",
        borderWidth: 1,
      }, {
        label: "Actual",
        backgroundColor: "#FF951B",
        borderColor: "#FF951B",
        borderWidth: 1,
        data: null,
      }
      ]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          display: false
        }
      },
      legend: {
        display: true
      },
      title: { // ข้อความที่อยู่ด้านบนของแผนภูมิ
        text: "Line Chart",
        display: false
      },
      scales: { // แสดง scales ของแผนภูมิเริมที่ 0
        yAxes: [{
          ticks: {
            beginAtZero: true,
            display: true,
            callback: function (value, index, values) {
              if (parseInt(value) >= 1000) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else {
                return value;
              }
            }
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true,
            display: true,
            callback: function (value, index, values) {
              if (parseInt(value) >= 1000) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else {
                return value;
              }
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
          }
        }
      }
    },

  };

  public costYearChart: any = {
    type: 'bar',
    data: {
      labels: [], // ชื่อของข้อมูลในแนวแกน x
      datasets: [{ // กำหนดค่าข้อมูลภายในแผนภูมิแบบเส้น
        label: 'Plan',
        data: null,
        fill: false,
        //lineTension: 0.2,
        borderColor: "#0078B8",
        backgroundColor: "#0078B8",
        borderWidth: 1,
      }, {
        label: "Actual",
        backgroundColor: "#FF951B",
        borderColor: "#FF951B",
        borderWidth: 1,
        data: null,
      }
      ]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          display: false
        }
      },
      legend: {
        display: true
      },
      title: { // ข้อความที่อยู่ด้านบนของแผนภูมิ
        text: "Line Chart",
        display: false
      },
      scales: { // แสดง scales ของแผนภูมิเริมที่ 0
        yAxes: [{
          ticks: {
            beginAtZero: true,
            display: true,
            callback: function (value, index, values) {
              if (parseInt(value) >= 1000) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else {
                return value;
              }
            }
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true,
            display: true
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
          }
        }
      }
    },

  }


  costPlan: any;
  costActual: any;
  overAllPlanDate: ProgressPlanDateModel;

  //
  capexCost: number;
  overAllCost: number;
  getSpendingCostFormError: boolean = false;
  projectCostValue: number;
  overallCost: number;
  isAdmin: boolean = false;
  requireSolomonCategory: boolean = false;

  get invalidSubmit() {
    return this.progessForm.valid;
  }

  getErrorMessage(formControlName: string) {
    if (this.progessForm.get(formControlName) && this.progessForm.get(formControlName).invalid && this.progessForm.get(formControlName).touched) {
      return true;
    } else {
      return false;
    }
  }

  get StageIL5() {
    return this.stage === 'IL5';
  }

  checkCurrentMonth(any: string) {
    if (!this.formGroup.get('capexInformationForm')) {
      return;
    }
    let monthCost: string[] = ['janCost', 'febCost', 'marCost', 'aprCost', 'mayCost', 'junCost', 'julCost', 'augCost', 'sepCost', 'octCost', 'novCost', 'decCost'];
    let controlMonth = monthCost.findIndex((m) => m === any);
    let selectMonthIndex = this.dp.transform(this.dateSelect, 'M');
    let selectMonth = this.dateSelect.getMonth();
    let selectYear = this.dateSelect.getFullYear();
    let currentMonth = this.dateUti.GetToday.getMonth();
    let currentYear = this.dateUti.GetToday.getFullYear();
    let capexStartDate = this.formGroup.get('capexInformationForm').get('requestIniNoDate').value ? new Date(this.formGroup.get('capexInformationForm').get('requestIniNoDate').value).getMonth() : null;

    let capexFinishDate
    let capexFinishYear
    if (this.formGroup.get('poc2FormNewLogic')) {
      currentMonth = this.formGroup.get('poc2FormNewLogic')?.get('overallForm')?.get('basicStartDate').value ? new Date(this.formGroup.get('poc2FormNewLogic')?.get('overallForm')?.get('basicStartDate').value).getMonth() : null;
      currentYear = this.formGroup.get('poc2FormNewLogic')?.get('overallForm')?.get('basicStartDate').value ? new Date(this.formGroup.get('poc2FormNewLogic')?.get('overallForm')?.get('basicStartDate').value).getFullYear() : null;
      capexFinishDate = this.formGroup.get('poc2FormNewLogic')?.get('overallForm')?.get('basicFinishDate').value ? new Date(this.formGroup.get('poc2FormNewLogic')?.get('overallForm')?.get('basicFinishDate').value).getMonth() : null;
      capexFinishYear = this.formGroup.get('poc2FormNewLogic')?.get('overallForm')?.get('basicFinishDate').value ? new Date(this.formGroup.get('poc2FormNewLogic')?.get('overallForm')?.get('basicFinishDate').value).getFullYear() : null;
    } else {
      currentMonth = this.formGroup.get('poc1')?.get('basicStartDate').value ? new Date(this.formGroup.get('poc1')?.get('basicStartDate').value).getMonth() : null;
      currentYear = this.formGroup.get('poc1')?.get('basicStartDate').value ? new Date(this.formGroup.get('poc1')?.get('basicStartDate').value).getFullYear() : null;
      capexFinishDate = this.formGroup.get('poc1')?.get('basicFinishDate').value ? new Date(this.formGroup.get('poc1')?.get('basicFinishDate').value).getMonth() : null;
      capexFinishYear = this.formGroup.get('poc1')?.get('basicFinishDate').value ? new Date(this.formGroup.get('poc1')?.get('basicFinishDate').value).getFullYear() : null;
    }


    let finishYear = capexFinishYear ? capexFinishYear : new Date(this.generalDataProgrerss?.finishingDate).getFullYear();
    let finishMonthIndex = capexFinishDate ? capexFinishDate : this.dp.transform(new Date(this.generalDataProgrerss?.finishingDate), 'M');
    // if ((any === monthCost[parseInt(currentMonthIndex) - 1] && currentMonth <= finishMonth) && (this.initiativeService.isRevise || this.initiativeService.isAddmore)) {
    let finishMonth
    if (selectYear < finishYear) {
      finishMonth = 11;
    } else {
      finishMonth = capexFinishDate ? capexFinishDate : new Date(this.generalDataProgrerss?.finishingDate).getMonth();
    }

    if (selectYear > currentYear) {
      currentMonth = 0;
    }



    if (this.initiativeService.isAddmore || this.initiativeService.isRevise || this.initiativeService.isReturn) {
      // if (selectYear >= currentYear && controlMonth >= currentMonth && controlMonth <= finishMonth) {
      //   return false;
      // } else {
      //   return true;
      // }
      if (controlMonth >= 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
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
    this.id = this.initiativeService.id;
    this.IsReturn = this.initiativeService.isReturn;
    this.IsRevise = this.initiativeService.isRevise;
    this.dateSelect = this.dateUti.GetToday;
    this.page = this.initiativeService.page;
    if (!this.formGroup.get('progressForm')) {
      this.formGroup.addControl('progressForm', this.progessForm);
    }

    this.GetSuggestStatus(this.initiativeService.id);


    this.GetProgress();


    this.progressService.getGeneralData.subscribe((data: Initiative) => this.generalDataProgrerss = data);




  }

  // ngAfterContentChecked() {
  //   this.cdref.detectChanges();
  // }

  ngOnChanges(): void {
    this.progessForm.get('planCost').valueChanges.subscribe((planChange: CostSpending) => {
      let year: string = this.dp.transform(this.searchForm.get('month').value, 'yyyy');
      let index: number = this.allCostSpening?.findIndex((x) => x.yearCost == year && x.investmentCostType == 'planCost');
      if (index >= 0) {
        if (planChange?.yearCost != null) {
          this.allCostSpening[index] = planChange;
          this.progressService.setCostSpendingData(this.allCostSpening);
        }
      }
    });

    // this.returnForm.valueChanges.subscribe((returnValueChange) => {
    //   this.capexService.changeReturnDetail(returnValueChange);
    // });
  }
//state1
  calulatePlan() {
    if (!this.dataLoadedSpending || !this.formGroup.get('capexInformationForm')) {
      return;
    }

     let plan: CostSpending = this.progessForm.get('planCost').value;    
    

    let actual: CostSpending = this.progessForm.get('actualCost').value;
    let overAllCost: number = this.calOverAllCostForValidate();
    this.overallCost = this.calOverAllCostForValidate();
    this.progessForm.get('planCost').get('overallCost').patchValue(this.calOverAllCost(plan));
    this.progessForm.get('overAllCostSpending').patchValue(this.calOverAllCostForValidate().toFixed(2));
    let capexCost = this.formGroup.get('capexInformationForm').get('projectCost').value ? parseFloat(this.formGroup.get('capexInformationForm').get('projectCost').value) : 0;
    // let additionalCost = this.formGroup.get('capexInformationForm').get('additionalCost').value ? parseFloat(this.formGroup.get('capexInformationForm').get('additionalCost').value) : 0;
    let returnCost: number = 0;
    if (this.initiativeService.isReturn) {
      returnCost = this.formGroup.get('capexInformationForm').get('returnCost').value ? parseFloat(this.formGroup.get('capexInformationForm').get('returnCost').value) : 0;
    }
    this.capexCost = capexCost;

    if ((overAllCost > parseFloat((this.capexCost * 1000000).toFixed(2))) && (this.initiativeService.isAddmore || this.initiativeService.isReturn || this.initiativeService.isRevise)) {
      //alert error
      this.getSpendingCostFormError = true;
      this.progessForm.get('planCost').setErrors({ 'invalid': true });
    } else {
      this.getSpendingCostFormError = false;
      this.progessForm.get('planCost').clearValidators();
      this.progessForm.get('planCost').updateValueAndValidity();
    }
    this.lineChart.data.datasets[0].data = this.convertToArray(plan);
    this.costYearChart.data.labels = [this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString()];
    this.costYearChart.data.datasets[0].data = [this.progessForm.get('planCost').get('overallCost').value];
    this.costYearChart.data.datasets[1].data = [this.progessForm.get('actualCost').get('overallCost').value];
    this.chartJS.update();
    this.chartJSYear.update();
    //this.chartJS = new Chart('lineChart', this.lineChart);
    //this.chartJS = new Chart('costYearChart', this.costYearChart);
  }

  ngOnDestroy() {
    this.progressService.changeStandard = false;
    this.progressService.changeCapexFinish = false;
    this.dataLoaded = false;
    this.dataLoadedSpending = false;
    this.initiativeService.wbsNo = null;
  }

  // getStandardProjectDefinition() {
  //   var AreaPlant = this.progessForm.get('areaPlant').value;
  //   this.progressService.GetSapDropdown('StandardProjectDefinition', this.initiativeService.id, AreaPlant).subscribe(res => {
  //     this.standardProjectDefList = res;
  //   });
  // }
  getResponsible() {
    var AreaPlant = this.progessForm.get('areaPlant').value;
    this.progressService.GetSapDropdown('Responsible', this.initiativeService.id, AreaPlant).subscribe(res => {
      this.responsibleList = res;
      // if (res.length > 0) {
      //   this.progessForm.get('responsible').patchValue(res[0].attribute01);
      // }
    });
  }
  getSolomonCategory() {
    var AreaPlant = this.progessForm.get('areaPlant').value;
    this.progressService.GetSapDropdown('solomoncategory', this.initiativeService.id, AreaPlant).subscribe(res => {
      this.solomonCategoryList = res;
    });
  }
  getAreaPlant() {
    var AreaPlant = this.progessForm.get('areaPlant').value;
    this.progressService.GetSapDropdown('AreaPlant', this.initiativeService.id, AreaPlant).subscribe(res => {
      if (res) {
        this.areaPlantList = res;
        if (res.length > 0) {
          this.progessForm.get('areaPlant').patchValue(res[0].attribute01);
          this.getPhysicalUnit();
        }
      }
    });
  }

  getPhysicalBu() {
    var AreaPlant = this.progessForm.get('areaPlant').value;
    this.progressService.GetSapDropdown('physicalbu', this.initiativeService.id, AreaPlant).subscribe(res => {
      this.physicalBuList = res;
    });
  }

  getPhysicalUnit() {
    var AreaPlant = this.progessForm.get('areaPlant').value;
    this.progressService.GetSapDropdown('physicalunit', this.initiativeService.id, AreaPlant).subscribe(res => {
      this.physicalUnitList = res;
    });
  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }

  get ShowTabCapex(): boolean {
    return this.initiativeService.ShowTabCapex;
  }


  GetProgress() {
    this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(generalRes => {

      if (!this.initiativeService.isReturn) {
        this.projectCostValue = generalRes.costEstCapex ? generalRes.costEstCapex * 1000000 : 0;
      }

      this.isRequestProjectEngineer = generalRes.requestProjectEngineer ? true : false;
      this.generalDataProgrerss = generalRes;
      this.capexCost = generalRes.costEstCapex;
      this.minDate = generalRes.startingDate ? new Date(generalRes.startingDate) : null;
      this.maxDate = generalRes.finishingDate ? new Date(generalRes.finishingDate) : null;
      let stdProjectParam: StdProjectDefParams;
      stdProjectParam = {
        initiativeId: this.initiativeService.id,
        typeOfInvestment: generalRes.typeOfInvestment,
        budgetSource: generalRes.budgetSource
      }

      // if (generalRes.requestProjectEngineer) {
      // }
      //this.getPhysicalUnit() Move   In Get Progress Function
      this.progressService.GetProgressPlanDate(this.initiativeService.id).subscribe(planDateResponse => {

        this.overAllPlanDate = planDateResponse.find(x => x.progressPlanDateType == 'Overall');

        this.progressService.GetProgress(this.initiativeService.id).subscribe(res => {
          //get default
          // this.getStandardProjectDefinition();
          if (res.progressHeaderId !== 0) {
            this.progressService.getSTDProjectDef(stdProjectParam).then((stdRes) => {
              if (stdRes) {
                this.standardProjectDefList = stdRes;
              }
            });
            this.wbsNo = res.wbsNo;
            this.progessForm.patchValue({
              appropriationNo: res.appropriationNo ? res.appropriationNo : null,
              wbsNo: res.wbsNo ? res.wbsNo : null,
              standardProjectDef: res.standardProjectDef ? res.standardProjectDef : null,
              responsible: res.responsible ? res.responsible : null,
              solomonCategory: res.solomonCategory ? res.solomonCategory : null,
              areaPlant: res.areaPlant ? res.areaPlant : null,
              physicalBu: res.physicalBu ? res.physicalBu : null,
              physicalUnit: res.physicalUnit ? res.physicalUnit : null,
              // planCost: res.planCost ? res.planCost : null,
              // actualCost: res.actualCost ? res.actualCost : null
            });
            if (generalRes.plant === '1011') {
              this.requireSolomonCategory = true;
              this.getSolomonCategory();
            }

            this.getAreaPlant();
            this.getPhysicalBu();
            this.getResponsible();
            if (res.wbsNo) {
              if (!this.isAdmin) {
                this.progessForm.get('standardProjectDef').disable();
                // this.progessForm.get('responsible').disable();
                this.progessForm.get('solomonCategory').disable();
                this.progessForm.get('areaPlant').disable();
                this.progessForm.get('physicalBu').disable();
                this.progessForm.get('physicalUnit').disable();
              }
              this.textDate = this.dp.transform(this.dateUti.GetToday, 'MMMM').toString() + "-" + this.dp.transform(this.dateUti.GetToday, 'yyyy').toString();
              this.costSpendingDate = this.dp.transform(this.dateUti.GetToday, 'yyyy').toString();

              this.getGetCostSpending(this.dateUti.GetToday.getFullYear().toString());
            }

            if (res.standardProjectDef && this.convertValue(res.standardProjectDef) == "CP1") {
              this.progressService.changeCapexFinish = true;
              this.showMileStone2 = true;
            } else if (res.standardProjectDef && (this.convertValue(res.standardProjectDef) != "CP1")) {
              this.progressService.changeCapexFinish = true;
              this.showMileStone1 = true;
            } else {
              this.showMileStone1 = false;
              this.showMileStone2 = false;
            }
            this.dataLoaded = true;
          } else {

            //call api 
            if (generalRes.capexTabStatus || generalRes.initiativeType.toLowerCase() == 'directcapex') {
              this.progressService.getSTDProjectDef(stdProjectParam).then((stdRes) => {
                if (stdRes) {
                  let defaultStd = stdRes.find((x) => x.defaultValue == 1);
                  if (defaultStd) {
                    this.progessForm.patchValue({
                      standardProjectDef: defaultStd.value
                    });
                  }
                  this.standardProjectDefList = stdRes;


                  if (defaultStd.value && this.convertValue(defaultStd.value) == "CP1") {
                    this.progressService.changeCapexFinish = true;
                    this.showMileStone2 = true;
                  } else if (defaultStd.value && (this.convertValue(defaultStd.value) != "CP1")) {
                    this.progressService.changeCapexFinish = true;
                    this.showMileStone1 = true;
                  } else {
                    this.showMileStone1 = false;
                    this.showMileStone2 = false;
                  }
                }
              });
            }
            if (generalRes.plant === '1011') {
              this.requireSolomonCategory = true;
              this.getSolomonCategory();
            }

            this.getAreaPlant();
            this.getPhysicalBu();
            this.getResponsible();

            //Check Responsible Person
            if (this.isRequestProjectEngineer) {
              let ownerName = this.formGroup.get("detailPimForm").get("projectEngineer").value
              this.progressService.getResponsibleEng(ownerName).then((getRespoRes) => {
                if (getRespoRes)
                  this.formGroup.get('progressForm')?.get('responsible')?.patchValue(getRespoRes.attribute01);
              });
            }
            this.dataLoaded = true;
          }
          if (this.initiativeService.viewMode) {
            this.progessForm.disable();
          }
        });
      });
    });

  }


  getGetCostSpending(dateSelect) {
    const today = this.dateUti.GetToday;

    this.progressService.GetAllCostSpending(this.initiativeService.id).then((allCostesponse) => {

      // let AllCostSpending = this.generateCostSpending(allCostesponse);
      if (allCostesponse.length > 0) {
        this.allCostSpening = allCostesponse;
        this.progressService.setCostSpendingData(allCostesponse);
      } else {
        this.allCostSpening = [] as CostSpending[];
        this.progressService.setCostSpendingData([] as CostSpending[]);
      }

      this.progressService.GetCostSpendingMonth(this.initiativeService.id, dateSelect, 'actualCost').then(async actualRes => {
        if (actualRes) {
          //this.costPlan = actualRes;
          this.progessForm.get('actualCost').patchValue({
            initiativeId: this.initiativeService.id,
            yearCost: this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString(),
            janCost: actualRes[0],
            febCost: actualRes[1],
            marCost: actualRes[2],
            aprCost: actualRes[3],
            mayCost: actualRes[4],
            junCost: actualRes[5],
            julCost: actualRes[6],
            augCost: actualRes[7],
            sepCost: actualRes[8],
            octCost: actualRes[9],
            novCost: actualRes[10],
            decCost: actualRes[11],
            overallCost: actualRes.reduce((a, b) => a + b, 0)
          });
          this.lineChart.data.datasets[1].data = actualRes;
          this.progressService.GetCostSpendingMonth(this.initiativeService.id, dateSelect, 'planCost').then(async planRes => {
            if (planRes) {
              //this.costPlan = planRes;            
              // if (this.initiativeService.isAddmore || this.initiativeService.isRevise || this.initiativeService.isReturn) {
              //   this.progessForm.get('planCost').patchValue({
              //     initiativeId: this.initiativeService.id,
              //     yearCost: this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString(),
              //     janCost: today.getMonth() >= 0 ? actualRes[0] : planRes[0],
              //     febCost: today.getMonth() >= 1 ? actualRes[1] : planRes[1],
              //     marCost: today.getMonth() >= 2 ? actualRes[2] : planRes[2],
              //     aprCost: today.getMonth() >= 3 ? actualRes[3] : planRes[3],
              //     mayCost: today.getMonth() >= 4 ? actualRes[4] : planRes[4],
              //     junCost: today.getMonth() >= 5 ? actualRes[5] : planRes[5],
              //     julCost: today.getMonth() >= 6 ? actualRes[6] : planRes[6],
              //     augCost: today.getMonth() >= 7 ? actualRes[7] : planRes[7],
              //     sepCost: today.getMonth() >= 8 ? actualRes[8] : planRes[8],
              //     octCost: today.getMonth() >= 9 ? actualRes[9] : planRes[9],
              //     novCost: today.getMonth() >= 10 ? actualRes[10] : planRes[10],
              //     decCost: today.getMonth() >= 11 ? actualRes[11] : planRes[11],
              //   });

              //   let overAllValue: CostSpending = this.progessForm.get('planCost').value;
              //   this.progessForm.get('planCost').patchValue({
              //     overallCost: overAllValue.janCost + overAllValue.febCost + overAllValue.marCost + overAllValue.aprCost + overAllValue.mayCost + overAllValue.junCost + overAllValue.julCost + overAllValue.augCost + overAllValue.sepCost + overAllValue.octCost + overAllValue.novCost + overAllValue.decCost
              //   });
              //   let sumOverallCost = overAllValue.janCost + overAllValue.febCost + overAllValue.marCost + overAllValue.aprCost + overAllValue.mayCost + overAllValue.junCost + overAllValue.julCost + overAllValue.augCost + overAllValue.sepCost + overAllValue.octCost + overAllValue.novCost + overAllValue.decCost

              //   this.convertActualToPlan(planRes, actualRes, today, sumOverallCost);
              //   this.lineChart.data.datasets[0].data = this.convertPlan(planRes, actualRes, today);
              // } else {
              this.progessForm.get('planCost').patchValue({
                initiativeId: this.initiativeService.id,
                yearCost: this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString(),
                janCost: planRes[0],
                febCost: planRes[1],
                marCost: planRes[2],
                aprCost: planRes[3],
                mayCost: planRes[4],
                junCost: planRes[5],
                julCost: planRes[6],
                augCost: planRes[7],
                sepCost: planRes[8],
                octCost: planRes[9],
                novCost: planRes[10],
                decCost: planRes[11],
                overallCost: planRes.reduce((a, b) => a + b, 0)
              });
              this.lineChart.data.datasets[0].data = planRes;
              // }
              // this.calulatePlan();

            } else {
              let plan: CostSpending = {
                investmentCostId: 0,
                investmentCostType: "planCost",
                initiativeId: this.initiativeService.id,
                yearCost: this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString(),
                janCost: 0,
                febCost: 0,
                marCost: 0,
                aprCost: 0,
                mayCost: 0,
                junCost: 0,
                julCost: 0,
                augCost: 0,
                sepCost: 0,
                octCost: 0,
                novCost: 0,
                decCost: 0,
                overallCost: 0
              }
              this.progessForm.get('planCost').patchValue({
                yearCost: this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString(),
                janCost: 0,
                febCost: 0,
                marCost: 0,
                aprCost: 0,
                mayCost: 0,
                junCost: 0,
                julCost: 0,
                augCost: 0,
                sepCost: 0,
                octCost: 0,
                novCost: 0,
                decCost: 0,
                overallCost: 0
              });
              if (plan.yearCost != null) {
                this.allCostSpening.push(plan);
              }
              this.progressService.setCostSpendingData(this.allCostSpening);
              this.lineChart.data.datasets[0].data = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
            }

            // this.chartJS = new Chart('lineChart', this.lineChart);
            this.chartJS.update();
            this.setCostYear(this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString());
            this.dataLoadedSpending = true;
          });
        } else {
          this.costYearChart.data.labels = this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString();
          this.costYearChart.data.datasets[0].data = ["0"];
          this.costYearChart.data.datasets[1].data = ["0"];
          this.lineChart.data.datasets[0].data = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
          this.lineChart.data.datasets[1].data = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
          this.dataLoadedSpending = true;
        }

        this.chartJS = new Chart('lineChart', this.lineChart);
        this.chartJSYear = new Chart('costYearChart', this.costYearChart);
        this.dataLoadedSpending = true;
        this.calulatePlan();
      });


      // this.progressService.GetCostSpendingYear(this.initiativeService.id, 'planCost').then(async r => {
      //   if (r) {
      //     this.costPlan = r;
      //     this.costYearChart.data.labels = r['year'];
      //   } else {
      //     this.costYearChart.data.labels = this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString();
      //   }
      // });
      // this.progressService.GetCostSpendingYear(this.initiativeService.id, 'actualCost').then(async r => {
      //   if (r) {
      //     this.costPlan = r;
      //     this.costYearChart.data.labels = r['year'];
      //     this.costYearChart.data.datasets[0].data = r.costSpendingYearArray[0].cost;
      //     this.costYearChart.data.datasets[1].data = r.costSpendingYearArray[1].cost;
      //   } else {
      //     this.costYearChart.data.labels = this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString();
      //     this.costYearChart.data.datasets[0].data = 0;
      //     this.costYearChart.data.datasets[1].data = 0;
      //   }
      //   this.chartJS = new Chart('costYearChart', this.costYearChart);
      // });
    });

  }

  setCostYear(year) {
    return;
    let spendingCost = this.allCostSpening.find(x => x.yearCost == year);
    this.costYearChart.data.labels = spendingCost.yearCost;
    this.costYearChart.data.datasets[0].data = [spendingCost.overallCost];
    this.costYearChart.data.datasets[1].data = [spendingCost.overallCost];
    this.chartJS = new Chart('costYearChart', this.costYearChart);
  }


  generateCostSpending(allCostesponse: CostSpending[]) {

    if (allCostesponse.length > 0) {
      let planCostCount = allCostesponse.filter((plan) => plan.investmentCostType == 'planCost');
      let actualCostCount = allCostesponse.filter((actual) => actual.investmentCostType == 'actualCost');


      if (planCostCount.length != actualCostCount.length) {
        //


      } else {

      }


    }

    return allCostesponse;
  }

  convertPlan(plan, actual, date: Date) {
    let data: any[] = [];

    date.getMonth() >= 0 ? data[0] = this.numberWithCommas(actual[0]) : data[0] = this.numberWithCommas(plan[0]);
    date.getMonth() >= 1 ? data[1] = this.numberWithCommas(actual[1]) : data[1] = this.numberWithCommas(plan[1]);
    date.getMonth() >= 2 ? data[2] = this.numberWithCommas(actual[2]) : data[2] = this.numberWithCommas(plan[2]);
    date.getMonth() >= 3 ? data[3] = this.numberWithCommas(actual[3]) : data[3] = this.numberWithCommas(plan[3]);
    date.getMonth() >= 4 ? data[4] = this.numberWithCommas(actual[4]) : data[4] = this.numberWithCommas(plan[4]);
    date.getMonth() >= 5 ? data[5] = this.numberWithCommas(actual[5]) : data[5] = this.numberWithCommas(plan[5]);
    date.getMonth() >= 6 ? data[6] = this.numberWithCommas(actual[6]) : data[6] = this.numberWithCommas(plan[6]);
    date.getMonth() >= 7 ? data[7] = this.numberWithCommas(actual[7]) : data[7] = this.numberWithCommas(plan[7]);
    date.getMonth() >= 8 ? data[8] = this.numberWithCommas(actual[8]) : data[8] = this.numberWithCommas(plan[8]);
    date.getMonth() >= 9 ? data[9] = this.numberWithCommas(actual[9]) : data[9] = this.numberWithCommas(plan[9]);
    date.getMonth() >= 10 ? data[10] = this.numberWithCommas(actual[10]) : data[10] = this.numberWithCommas(plan[10]);
    date.getMonth() >= 11 ? data[11] = this.numberWithCommas(actual[11]) : data[11] = this.numberWithCommas(plan[11]);
    // return data;
  }

  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }


  convertActualToPlan(plan, actual, date: Date, sum) {
    let data: any[];
    let year = date.getFullYear().toString();
    let planCost = this.allCostSpening.findIndex((cost) => cost.yearCost == year && cost.investmentCostType == 'planCost');

    if (planCost >= 0) {

      date.getMonth() >= 0 ? this.allCostSpening[planCost].janCost = actual[0] : this.allCostSpening[planCost].janCost = plan[0];
      date.getMonth() >= 1 ? this.allCostSpening[planCost].febCost = actual[1] : this.allCostSpening[planCost].febCost = plan[1];
      date.getMonth() >= 2 ? this.allCostSpening[planCost].marCost = actual[2] : this.allCostSpening[planCost].marCost = plan[2];
      date.getMonth() >= 3 ? this.allCostSpening[planCost].aprCost = actual[3] : this.allCostSpening[planCost].aprCost = plan[3];
      date.getMonth() >= 4 ? this.allCostSpening[planCost].mayCost = actual[4] : this.allCostSpening[planCost].mayCost = plan[4];
      date.getMonth() >= 5 ? this.allCostSpening[planCost].junCost = actual[5] : this.allCostSpening[planCost].junCost = plan[5];
      date.getMonth() >= 6 ? this.allCostSpening[planCost].julCost = actual[6] : this.allCostSpening[planCost].julCost = plan[6];
      date.getMonth() >= 7 ? this.allCostSpening[planCost].augCost = actual[7] : this.allCostSpening[planCost].augCost = plan[7];
      date.getMonth() >= 8 ? this.allCostSpening[planCost].sepCost = actual[8] : this.allCostSpening[planCost].sepCost = plan[8];
      date.getMonth() >= 9 ? this.allCostSpening[planCost].octCost = actual[9] : this.allCostSpening[planCost].octCost = plan[9];
      date.getMonth() >= 10 ? this.allCostSpening[planCost].novCost = actual[10] : this.allCostSpening[planCost].novCost = plan[10];
      date.getMonth() >= 11 ? this.allCostSpening[planCost].decCost = actual[11] : this.allCostSpening[planCost].decCost = plan[11];
      this.allCostSpening[planCost].overallCost = sum;
    }
  }


  getGetCostSpendingฺByDate(dateSelect) {
    if (!this.wbsNo) {
      return;
    }

    let startYear: number;
    let finishYear: number;

    //get year 

    if (this.formGroup.get('poc2FormNewLogic') && this.formGroup.get('poc2FormNewLogic').get('overallForm').get('basicStartDate').value && this.formGroup.get('poc2FormNewLogic').get('overallForm').get('basicFinishDate').value) {
      startYear = new Date(this.formGroup.get('poc2FormNewLogic').get('overallForm').get('basicStartDate').value).getFullYear();
      finishYear = new Date(this.formGroup.get('poc2FormNewLogic').get('overallForm').get('basicFinishDate').value).getFullYear();
    } else if (this.formGroup.get('poc1') && this.formGroup.get('poc1').get('basicStartDate').value && this.formGroup.get('poc1').get('basicFinishDate').value) {
      startYear = new Date(this.formGroup.get('poc1').get('basicStartDate').value).getFullYear();
      finishYear = new Date(this.formGroup.get('poc1').get('basicFinishDate').value).getFullYear();

    } else {
      return;
      // startYear = new Date(this.overAllPlanDate.basicStartDate).getFullYear();
      // finishYear = new Date(this.overAllPlanDate.basicFinishDate).getFullYear();
    }
    // const yearDiff = (finishYear - startYear) + 1;

    for (let index = startYear; index <= finishYear; index++) {
      let costSpending = this.allCostSpening.filter((cost) => cost.yearCost == index.toString());
      if (costSpending) {
        if (costSpending.findIndex((cost) => cost.investmentCostType == 'planCost') < 0) {
          let plan: CostSpending = {
            investmentCostId: 0,
            investmentCostType: "planCost",
            initiativeId: this.initiativeService.id,
            yearCost: index.toString(),
            janCost: 0,
            febCost: 0,
            marCost: 0,
            aprCost: 0,
            mayCost: 0,
            junCost: 0,
            julCost: 0,
            augCost: 0,
            sepCost: 0,
            octCost: 0,
            novCost: 0,
            decCost: 0,
            overallCost: 0
          }
          if (plan.yearCost != null) {
            this.allCostSpening.push(plan);
          }
          this.progressService.setCostSpendingData(this.allCostSpening);
        }
        if (costSpending.findIndex((cost) => cost.investmentCostType == 'actualCost') < 0) {
          let actual: CostSpending = {
            investmentCostId: 0,
            investmentCostType: "actualCost",
            initiativeId: this.initiativeService.id,
            yearCost: this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString(),
            janCost: 0,
            febCost: 0,
            marCost: 0,
            aprCost: 0,
            mayCost: 0,
            junCost: 0,
            julCost: 0,
            augCost: 0,
            sepCost: 0,
            octCost: 0,
            novCost: 0,
            decCost: 0,
            overallCost: 0
          }
          if (actual.yearCost != null) {
            this.allCostSpening.push(actual);
          }
          this.progressService.setCostSpendingData(this.allCostSpening);
        }
      }
    }


    let planData: CostSpending = this.allCostSpening?.find(plan => plan.yearCost == dateSelect && plan.investmentCostType == 'planCost');
    let actualData: CostSpending = this.allCostSpening?.find(actual => actual.yearCost == dateSelect && actual.investmentCostType == 'actualCost');





    // this.progessForm.get('planCost').patchValue(planData);
    // let overAllPlanCost = this.calOverAllCost(planData);
    // let overAllActualCost = this.calOverAllCost(actualData);
    if (planData?.yearCost == dateSelect) {

      this.progessForm.get('planCost').patchValue({
        investmentCostId: planData.investmentCostId,
        investmentCostType: "planCost",
        yearCost: planData.yearCost,
        janCost: planData.janCost ? planData.janCost : 0,
        febCost: planData.febCost ? planData.febCost : 0,
        marCost: planData.marCost ? planData.marCost : 0,
        aprCost: planData.aprCost ? planData.aprCost : 0,
        mayCost: planData.mayCost ? planData.mayCost : 0,
        junCost: planData.junCost ? planData.junCost : 0,
        julCost: planData.julCost ? planData.julCost : 0,
        augCost: planData.augCost ? planData.augCost : 0,
        sepCost: planData.sepCost ? planData.sepCost : 0,
        octCost: planData.octCost ? planData.octCost : 0,
        novCost: planData.novCost ? planData.novCost : 0,
        decCost: planData.decCost ? planData.decCost : 0,
        overallCost: planData.overallCost ? planData.overallCost : 0,
        initiativeId: this.initiativeService.id
      });

      this.lineChart.data.datasets[0].data = this.convertToArray(planData);
    } else {
      this.progessForm.get('planCost').patchValue({
        investmentCostId: 0,
        investmentCostType: "planCost",
        yearCost: this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString(),
        janCost: 0,
        febCost: 0,
        marCost: 0,
        aprCost: 0,
        mayCost: 0,
        junCost: 0,
        julCost: 0,
        augCost: 0,
        sepCost: 0,
        octCost: 0,
        novCost: 0,
        decCost: 0,
        overallCost: 0,
        initiativeId: this.initiativeService.id
      });
      if (this.progessForm.get('planCost').get('yearCost').value != null) {
        this.allCostSpening.push(this.progessForm.get('planCost').value);
      }
      this.lineChart.data.datasets[0].data = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    }


    if (actualData?.yearCost == dateSelect) {
      this.progessForm.get('actualCost').patchValue({
        investmentCostId: actualData.investmentCostId,
        investmentCostType: "actualCost",
        yearCost: actualData.yearCost,
        janCost: actualData.janCost ? actualData.janCost : 0,
        febCost: actualData.febCost ? actualData.febCost : 0,
        marCost: actualData.marCost ? actualData.marCost : 0,
        aprCost: actualData.aprCost ? actualData.aprCost : 0,
        mayCost: actualData.mayCost ? actualData.mayCost : 0,
        junCost: actualData.junCost ? actualData.junCost : 0,
        julCost: actualData.julCost ? actualData.julCost : 0,
        augCost: actualData.augCost ? actualData.augCost : 0,
        sepCost: actualData.sepCost ? actualData.sepCost : 0,
        octCost: actualData.octCost ? actualData.octCost : 0,
        novCost: actualData.novCost ? actualData.novCost : 0,
        decCost: actualData.decCost ? actualData.decCost : 0,
        overallCost: actualData.overallCost ? actualData.overallCost : 0
      });

      this.lineChart.data.datasets[1].data = this.convertToArray(actualData);
      // this.progessForm.get('actualCost').patchValue(actualData);
    } else {
      this.progessForm.get('actualCost').patchValue({
        investmentCostId: 0,
        investmentCostType: "actualCost",
        yearCost: this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString(),
        janCost: 0,
        febCost: 0,
        marCost: 0,
        aprCost: 0,
        mayCost: 0,
        junCost: 0,
        julCost: 0,
        augCost: 0,
        sepCost: 0,
        octCost: 0,
        novCost: 0,
        decCost: 0,
        overallCost: 0,
        initiativeId: this.initiativeService.id
      });
      if (this.progessForm.get('actualCost').get('yearCost').value != null) {

        this.allCostSpening.push(this.progessForm.get('actualCost').value);
      }
      this.lineChart.data.datasets[1].data = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    }

    // this.costYearChart.data.datasets[0].data = [this.progessForm.get('planCost').get('overallCost').value];
    // this.costYearChart.data.datasets[1].data = [this.progessForm.get('actualCost').get('overallCost').value];

    //this.chartJS = new Chart('lineChart', this.lineChart);
    this.calulatePlan();
    // this.chartJS = new Chart('costYearChart', this.costYearChart);

  }

  // onEndfocus(args): void {
  //   //sets cursor position at end of MaskedTextBox
  //   args.currentTarget.selectionStart = args.currentTarget.selectionEnd;
  // }

  calOverAllCost(cost: CostSpending): string {
    let field = ['janCost', 'febCost', 'marCost', 'aprCost', 'mayCost', 'junCost', 'julCost', 'augCost', 'sepCost', 'octCost', 'novCost', 'decCost'];
    let overAll: number = 0;
    field.forEach((f) => {
      let value = cost[f] ? cost[f] : 0;
      overAll += parseFloat(value);
    });

    return overAll.toString();
  }
 
  calOverAllCostForValidate() {
    // let field = ['janCost', 'febCost', 'marCost', 'aprCost', 'mayCost', 'junCost', 'julCost', 'augCost', 'sepCost', 'octCost', 'novCost', 'decCost'];
    let overAll: number = 0;
    this.allCostSpening.forEach((cost) => {
      if (cost.investmentCostType == 'planCost') {
        let field = ['janCost', 'febCost', 'marCost', 'aprCost', 'mayCost', 'junCost', 'julCost', 'augCost', 'sepCost', 'octCost', 'novCost', 'decCost'];
        field.forEach((f) => {
          let value = cost[f] ? cost[f] : 0;
          overAll += parseFloat(value);
        });
      }
    })
    return overAll;
  }
 


  convertToArray(cost: CostSpending): any[] {
    let field = ['janCost', 'febCost', 'marCost', 'aprCost', 'mayCost', 'junCost', 'julCost', 'augCost', 'sepCost', 'octCost', 'novCost', 'decCost'];
    let arrayList: any[] = [];
    field.forEach((f) => {
      let value = cost[f] ? cost[f] : 0;
      arrayList.push(value);
    });

    return arrayList;
  }

  getFormError(field) {
    return (this.formGroup.get('progressForm').get(field).touched || this.formGroup.get('progressForm').get(field).dirty) && this.formGroup.get('progressForm').get(field).invalid;
  }



  changeProjectDefinition(event) {
    if (!this.formGroup.get('capexInformationForm')) {
      return;
    }
    this.progressService.changeStandard = true;
    this.finishDate = this.formGroup.get('capexInformationForm').get('projecctComRun')?.value;
    this.requestIniNoDate = this.formGroup.get('capexInformationForm').get('requestIniNoDate')?.value;
    let choice = this.convertValue(event.value);
    this.progressService.changeCapexFinish = true;
    if (event.value && choice == "CP1") {
      if (this.formGroup.get('poc1')) {
        this.formGroup.removeControl('poc1');
      }
      if (this.formGroup.get('capexInformationForm').get('requestIniNoDate')?.value) {
        this.showMileStone1 = false;
        this.showMileStone2 = true;
      } else {
        if (this.formGroup.get('poc2FormNewLogic')) {
          this.formGroup.removeControl('poc2FormNewLogic');
        }
      }
    } else if (event.value && (choice != "CP1")) {
      if (this.formGroup.get('poc2FormNewLogic')) {
        this.formGroup.removeControl('poc2FormNewLogic');
      }
      if (this.formGroup.get('capexInformationForm').get('requestIniNoDate')?.value) {
        this.showMileStone1 = true;
        this.showMileStone2 = false;
      } else {
        if (this.formGroup.get('poc1')) {
          this.formGroup.removeControl('poc1');
        }
      }
    } else {
      this.showMileStone1 = false;
      this.showMileStone2 = false;
    }

  }

  convertValue(value: string): string {
    let firstChar = value.substr(0, 2)
    let lastChar = value.substr(value.length - 1);
    return value ? firstChar + parseInt(lastChar) : "0";
  }




  SetValidateForm() {
    if (this.stage === 'IL2') {
      const control = this.progessForm.get('details') as FormArray;
      for (let i = 0; i < control.length; i++) {
        control.at(i).get('milestone').setValidators([Validators.required]);
        control.at(i).get('milestone').updateValueAndValidity();
      }
    }
  }

  InvalidMilestone(i) {
    const control = this.progessForm.get('details') as FormArray;
    return control.at(i).get('milestone').touched && control.at(i).get('milestone').invalid;
  }
  InvalidStartDate(i) {
    const control = this.progessForm.get('details') as FormArray;
    return control.at(i).get('start').touched && control.at(i).get('start').invalid;
  }

  InvalidKeyDeliverable(i) {
    const control = this.progessForm.get('details') as FormArray;
    return control.at(i).get('keyDeliverable').touched && control.at(i).get('keyDeliverable').invalid;
  }
  InvalidPlanFinish(i) {
    const control = this.progessForm.get('details') as FormArray;
    return control.at(i).get('planFinish').touched && control.at(i).get('planFinish').invalid;
  }

  GetSuggestStatus(id) {
    this.initiativeService.GetSuggestStatus(id).subscribe(response => {
      this.status = response.status;
      this.stage = response.stage;
      this.remark = response.remark;
      this.isRequestCapex = response.isRequestCapex ? true : false;
      this.Cim = response.cim ? true : false;
      this.Capex = response.directCapex ? true : false;
      this.Dim = response.dim ? true : false;
      this.Strategy = response.strategy ? true : false;
      this.Pim = response.pim ? true : false;
      this.Max = response.max ? true : false;
      this.Cpi = response.cpi ? true : false;
      this.SetValidateForm();
      this.GetProgressAndMilestone(id);

      if (this.stage === 'IL5') {
        this.progessForm.disable();
      }

      // if (this.Capex || this.isRequestCapex) {
      //   //-----------------------------------------------------------------
      //   this.progressService.GetCostSpendingMonth(this.initiativeService.id, '2020', 'planCost').then(async r => {
      //     if (r) {
      //       this.costPlan = r;
      //       this.lineChart.data.datasets[0].data = r;
      //     }
      //   });
      //   this.progressService.GetCostSpendingMonth(this.initiativeService.id, '2020', 'actualCost').then(async r => {
      //     if (r) {
      //       this.costPlan = r;
      //       this.lineChart.data.datasets[1].data = r;
      //     }
      //   });
      //   this.progressService.GetCostSpendingYear(this.initiativeService.id, 'actualCost').then(async r => {
      //     if (r) {
      //       this.costPlan = r;
      //       this.costYearChart.data.labels = r['year'];
      //       this.costYearChart.data.datasets[0].data = r.costSpendingYearArray[0].cost;
      //       this.costYearChart.data.datasets[1].data = r.costSpendingYearArray[1].cost;
      //     }
      //   });

      //   this.chartJS = new Chart('lineChart', this.lineChart);
      //   this.chartJS = new Chart('costYearChart', this.costYearChart);
      //   //-----------------------------------------------------------------
      // }

    });
  }

  setRequestDate(date: any, fieldName: string, index: number) {

    let dateCheck = date ? new Date(date).setHours(0, 0, 0, 0) : 0;
    if (dateCheck > 0) {

      let dateStart = new Date(this.generalDataProgrerss?.startingDate).getTime();
      let dateFinish = new Date(this.generalDataProgrerss?.finishingDate).getTime();


      if (dateStart > 0 && dateFinish > 0) {
        //let mileStoneArray = this.progessForm.get('details') as FormArray;

        // let startFillDate = new Date(mileStoneArray.at(index).get('start').value).getTime();

        this.ChangePlanDate(index, new Date(date));
        this.ChangeActual(index);

        // if (fieldName == "planFinish") {
        //   this.ChangePlanDate(index, new Date(date));
        //   // if ((dateCheck >= startFillDate && dateCheck <= dateFinish) == false) {
        //   //   // mileStoneArray.at(index).get('planFinish').setValue('');
        //   //   // if(!this.initiativeService.viewMode){
        //   //   //   this.swalTool.ErrorText('Warning!!!', 'The Date you\'ve choosen is more than general finish date or before start date');
        //   //   // }
        //   //   // this.swalTool.DateBudgetStart();
        //   // } else {
        //   //   this.ChangePlanDate(index, new Date(date));
        //   // }
        // } else {
        //   if ((dateCheck >= dateStart && dateCheck <= dateFinish) == false) {
        //     if (fieldName == 'start') {
        //       this.ChangePlanDate(index, new Date(date));
        //       // mileStoneArray.at(index).get('start').setValue('');
        //       // mileStoneArray.at(index).get('planFinish').setValue('');
        //       // mileStoneArray.at(index).get('actualFinish').setValue('');
        //     } else {
        //       // mileStoneArray.at(index).get(fieldName).setValue('');
        //     }
        //     // this.swalTool.DateBudgetStart();
        //   } else {
        //     if (fieldName != 'start') {
        //       this.ChangeActual(index);
        //     }
        //   }
        // }

      }

    } else {
      if (this.dataLoaded && fieldName == 'actualFinish') {
        if (date == null) {
          this.ChangeActualNull(index);
        } else {
          this.ChangeActual(index);
        }
      } else if (this.dataLoaded && fieldName == 'planFinish') {
        if (date == null) {
          this.planStatus[index] = null;
        }
      }
    }
  }

  // changeStartDate(index: number) {
  //   let mileStoneArray = this.progessForm.get('details') as FormArray;
  //   mileStoneArray.at(index).get('planFinish').setValue('');
  //   mileStoneArray.at(index).get('actualFinish').setValue('');
  // }

  changeActualFinish(index: number) {
    this.ChangeActual(index);
  }


  ChangePlanDate(i, value: Date): void {
    const time = value ? this.dateUti.GetDateOnly(value).getTime() : null;
    const timeNow = this.dateUti.GetToday.getTime();
    if (this.progessForm.get('details')) {
      const control = this.progessForm.get('details') as FormArray;
      if (time > 0) {
        if (time <= timeNow && !control.at(i).get('actualFinish').value) {
          this.planStatus[i] = 'max';
        } else if (time >= timeNow && !control.at(i).get('actualFinish').value) {
          this.planStatus[i] = 'min';
        } else {
          this.planStatus[i] = 'actual';
        }
      }
    }
  }

  ChangeActual(i) {
    const control = this.progessForm.get('details') as FormArray;
    const time = control.at(i).get('planFinish').value ? this.dateUti.GetDateOnly(control.at(i).get('planFinish').value).getTime() : null;
    const timeNow = this.dateUti.GetToday.getTime();
    if (time > 0) {
      if (time < timeNow && !control.at(i).get('actualFinish').value) {
        this.planStatus[i] = 'max';
      } else if (time >= timeNow && !control.at(i).get('actualFinish').value) {
        this.planStatus[i] = 'min';
      } else {
        this.planStatus[i] = 'actual';
      }
    }
  }

  ChangeActualNull(i) {
    const control = this.progessForm.get('details') as FormArray;
    if (control) {
      const time = control.at(i).get('planFinish').value ? this.dateUti.GetDateOnly(control.at(i).get('planFinish').value).getTime() : null;
      //control.at(i).get('actualFinish').patchValue(null);
      const timeNow = this.dateUti.GetToday.getTime();
      if (time > 0) {
        if (time >= timeNow) {
          this.planStatus[i] = 'min';
        } else {
          this.planStatus[i] = 'max';
        }

      }
    }
  }

  get initiativeStartDate(): Date {
    return this.formGroup.get('initiativesForm').get('startingDate').value as Date;
  }

  get initiativeFinishDate(): Date {
    return this.formGroup.get('initiativesForm').get('finishingDate').value as Date;
  }
  getStartDate(i: number): Date {
    const control = this.progessForm.get('details') as FormArray;
    return control.at(i).get('start').value ? control.at(i).get('start').value as Date : this.formGroup.get('initiativesForm').get('startingDate').value as Date;
  }

  GetProgressAndMilestone(id) {
    this.progressService.GetProgressAndMilestone(id).subscribe(response => {
      if (response) {
        this.Details = response.progressDetails;
        if (this.Details.length === 0) {
          this.AddDetail();
        } else {
          const Controls = this.progessForm.get('details') as FormArray;
          for (let i = 0; i < this.Details.length; i++) {
            if (this.stage === 'IL2') {
              Controls.push(this.InitialprogessFormIL2());
            } else {
              Controls.push(this.InitialprogessForm());
            }
            Controls.at(i).patchValue(this.Details[i]);
            if (this.stage === 'IL5') { Controls.at(i).disable(); }
          }
          for (let i = 0; i < Controls.length; i++) {
            Controls.at(i).patchValue({
              id: 0,
              start: this.Details[i].start ? new Date(this.Details[i].start) : null,
              planFinish: this.Details[i].planFinish ? new Date(this.Details[i].planFinish) : null,
              actualFinish: this.Details[i].actualFinish ? new Date(this.Details[i].actualFinish) : null,
            });
          }
          this.isDisabledProgress = Controls.length > 1 ? false : true;
          this.isDisabledProgress = this.stage === 'IL5' ? true : false;
        }
      }
    });
  }

  InitialprogessForm(): FormGroup {
    return this.fb.group({
      id: 0,
      milestone: null,
      keyDeliverable: null,
      start: null,
      planFinish: null,
      actualFinish: null,
      activity: 'Critical',
      initiativeId: this.initiativeService.id
    });
  }

  InitialprogessFormIL2(): FormGroup {
    return this.fb.group({
      id: 0,
      milestone: null,
      keyDeliverable: null,
      start: null,
      planFinish: null,
      actualFinish: null,
      activity: 'Critical',
      initiativeId: this.initiativeService.id
    });
  }

  AddDetail() {
    const control = this.progessForm.get('details') as FormArray;
    if (this.stage === 'IL2') {
      control.push(this.InitialprogessFormIL2());
    } else {
      control.push(this.InitialprogessForm());
    }
    this.planStatus.push(null);
    this.isDisabledProgress = control.length > 1 ? false : true;
  }

  RemoveDetail(index: number) {
    const control = this.progessForm.get('details') as FormArray;
    control.removeAt(index);
    this.planStatus.splice(index, 1);
    this.isDisabledProgress = control.length > 1 ? false : true;
  }

  OnChangeAreaPlant() {
    this.getPhysicalUnit();
  }

  SetprogessForm() {
    const DetailControl = this.progessForm.get('details') as FormArray;
    for (let i = 0; i < DetailControl.length; i++) {
      if (DetailControl.at(i).get('id').value !== 0) {
        DetailControl.at(i).get('id').patchValue(0);
      }
    }
  }

  SetMarkAsTouchedDetail() {
    setTimeout(() => {
      const control = this.progessForm.get('details') as FormArray;
      for (let i = 0; i < control.length; i++) {
        control.at(i).get('milestone').markAsTouched();
      }
    }, 100);
  }



  getPlanFinishMinDate(i: number) {
    const control = this.progessForm.get('details') as FormArray;
    let date = (control.at(i).get('start').value as Date);
    if (date) {
      let temp = new Date(date.getTime() + (24 * 60 * 60 * 1000));
      return temp;
    }
    return null;
  }

  get getWBS() {
    return this.wbsNo;
  }

  get InitiativeService() {
    return this.initiativeService;
  }

  get changeCapexFinish() {
    return this.progressService.changeCapexFinish;
  }

  async monthChanged() {
    // this.finishDate = this.formGroup.get('capexInformationForm').get('projecctComRun')?.value;
    this.progressService.setSelectProgressDate(this.searchForm.get('month').value);
    this.textDate = this.dp.transform(this.searchForm.get('month').value, 'MMMM').toString() + "-" + this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString();
    this.costSpendingDate = this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString();
    if (this.dataLoadedSpending && this.allCostSpening) {
      this.dateSelect = this.searchForm.get('month').value;
      this.getGetCostSpendingฺByDate(this.dp.transform(this.searchForm.get('month').value, 'yyyy').toString());
    }
  }

  get finishPOcDate() {
    if (this.formGroup.get('poc1')) {
      return this.formGroup.get('poc1').get('basicFinishDate').value;
    } else if (this.formGroup.get('poc2FormNewLogic')) {
      return this.formGroup.get('poc2FormNewLogic').get('overallForm').get('basicFinishDate').value;
    }
    // {
    //   // "overallForm": {
    //   //     "basicStartDate": "2021-03-02T17:00:00.000Z",
    //   //     "basicFinishDate": "2021-12-30T17:00:00.000Z",
    //   //     "actualStartDate": "2021-03-02T17:00:00.000Z",
    //   //     "actualFinishDate": null
    //   // }
    // }
  }

  setSpendingActual(value) {
    if (value != "" && value != null) {
      if (Number.parseFloat(value) <= this.returnForm.get('existingCost').value) {
        this.returnForm.get('spendingActual').patchValue(value)
        this.returnForm.get('budgetAvailable').patchValue(parseFloat(this.returnForm.get('existingCost').value) - parseFloat(value.replace(/,/g, '')));
        this.returnForm.get('totalAvailable').patchValue(parseFloat(this.returnForm.get('budgetAvailable').value) + parseFloat(this.returnForm.get('additionalCost').value));
        this.returnForm.patchValue({
          budgetAvailable: parseFloat(this.returnForm.get('budgetAvailable').value).toFixed(2),
          totalAvailable: parseFloat(this.returnForm.get('totalAvailable').value).toFixed(2),
          spendingActual: this.returnForm.get('spendingActual').value
        });
      } else {
        this.returnForm.get('spendingActual').patchValue(0);
        this.initiativeService.viewMode ? false : this.swalTool.SpendingActual();
      }

    }

  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    // else {
    //   this.calulatePlan();
    // }
  }

  async SetFlowRevise() {
    await this.initiativeService.SetFlowRevise(this.initiativeService.id);
  }

  editPageDarftAndSubmitForm(saveType: string) {
    if (this.Max) {
      this.maxService.SaveDraftSubmit(this.formGroup, saveType, "");
    } else if (this.Capex) {
      this.capexService.SaveDraftSubmit(this.formGroup, saveType, "");
    } else if (this.Cim || this.Strategy) {
      this.cimService.SaveDraftAndSubmit(this.formGroup, saveType, "");
    } else if (this.Dim) {
      this.dimService.saveDraftSubmitDim(this.formGroup, saveType, "");
    } else if (this.Pim) {
      this.pimService.SaveDraftSubmitPim(this.formGroup, saveType, "");
    } else if (this.Cpi) {
      this.cpiService.SaveDraftSubmitCpi(this.formGroup, saveType, "");
    } else {
      this.initiativeService.SavingData = false;
      return;
      // this.initiativeService.SavingData = true;
      // this.initiativeService.UpdateDraftInitiative(this.initiativeService.id, this.formGroup.get('initiativesForm').value).subscribe(response => {
      //   if (this.formGroup.get('initiativesForm').get('coDeveloper').value) {
      //     this.initiativeService.UpdateCoDeveloper(response.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => {
      //       this.initiativeService.SavingData = false;
      //       this.swalTool.Draft();
      //     });
      //   } else {
      //     this.initiativeService.SavingData = false;
      //     this.swalTool.Draft();
      //   }
      // });
    }
  }

  getProjectCost() {
    let capexValue: Capexs = this.capexService.capexData.value ? this.capexService.capexData.value : {} as Capexs;
    let overAllCost = this.progessForm.get('overAllCostSpending').value ? parseFloat(this.progessForm.get('overAllCostSpending').value) : 0;
    if (overAllCost > parseFloat((capexValue.projectCost * 1000000).toFixed(2))) {
      //alert error
      this.getSpendingCostFormError = true;
      this.progessForm.get('planCost').setErrors({ 'invalid': true });
    } else {
      this.getSpendingCostFormError = false;
      this.progessForm.get('planCost').clearValidators();
      this.progessForm.get('planCost').updateValueAndValidity();
    }
    this.progessForm.get('capexProjectCost').setValue(capexValue.projectCost ? (capexValue.projectCost * 1000000).toFixed(2) : 0.00);
    return capexValue.projectCost ? (capexValue.projectCost * 1000000).toFixed(2) : 0.00;
  }
}

