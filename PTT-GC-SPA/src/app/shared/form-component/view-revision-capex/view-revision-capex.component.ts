import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Capexs, ReturnDetail } from '@models/Capexs';
import { Currency } from '@models/commonData';
import { Initiative } from '@models/initiative';
import { CapexService } from '@services/capex/capex.service';
import { CommonDataService } from '@services/common-data/common-data.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { PermissionService } from '@services/permission/permission.service';
import { ProgressService } from '@services/progress/progress.service';
import { SwalTool } from '@tools/swal.tools';
import { DateUtil } from '@utils/date.utils';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-revision-capex',
  templateUrl: './view-revision-capex.component.html',
  styleUrls: ['./view-revision-capex.component.css']
})
export class ViewRevisionCapexComponent implements OnInit, OnDestroy {

  constructor(
    private initiativeService: InitiativeService,
    private capexService: CapexService,
    private dateUtil: DateUtil,
    private fb: FormBuilder,
    private swalTool: SwalTool,
    private progressService: ProgressService,
    private cdr: ChangeDetectorRef,
    private commonDataService: CommonDataService,
    public ps: PermissionService,
    private route: ActivatedRoute,
  ) {
    // this.progressService.currentMessage.subscribe(message => this.RequestIniNoDate = message);
    this.capexService.getManagerDetail.subscribe((managerRes) => {
      if (managerRes) {
        this.capexInformationForm.patchValue({
          manager: managerRes.manager,
          projectManager: managerRes.projectManager,
        });
      }

    });

    this.capexService.getReturnDetail.subscribe((returnDetailRes) => {
      if (returnDetailRes && this.initiativeService.isReturn && this.page != 'pool-edit') {
        this.patchReturnData(returnDetailRes);
      }
    });
  }

  @Input() formGroup: FormGroup;
  @Input() id: number;
  @Input() page: string;
  @Input() generalData: Initiative;
  generalDatas: Initiative;


  selectedVP: string = '';
  selectionVP: string = '';
  name = 'CAPEX Information';
  capexInformationList: Capexs[];

  CapexType = this.IsReturn ? 'ReturnCapex' : this.IsAddmore ? 'AddmoreCapex' : 'Createnew';

  capexType_: any;
  PoolID: any;
  AvailableBudget: any;

  bsConfigYear: Partial<BsDatepickerConfig>;
  minMode: BsDatepickerViewMode = 'year';

  presidentList: any = [];
  managerList: any = [];
  projectManagerList: any = [];
  eventManagerSelectSubscribtion: Subscription;
  is_Max: boolean;
  is_RequestCapex: boolean;
  stage_Max: string;
  manager: string = '';
  projectManager: string = '';
  currentYear: boolean = null;


  BudgetAva: any;
  Cim: boolean;
  Dim: boolean;
  Capex: boolean;
  Strategy: boolean;
  Max: boolean;
  year_now: any;
  year_next: any;
  xxxx: any;
  IsMax = false;
  isTrusted = false;
  isDisabledCapex = true;
  collapseExample = false;
  isDisabledDraft = false;
  isDisabledSubmit = false;
  status: any;
  remark: string;
  stage: string;
  username: string;
  dateStart: any;
  dateFinish: any;
  startingDate: string;
  dateStartDisplay: any;
  dateFinishDisplay: any;
  BetweenDateDiff: any;
  RequestIniNoDateDisplay: string;
  dateBudget: any;
  dateBetweenDate: any;
  year: any;
  date1_: any;
  setYear: any;

  // Table

  MillionBaht: any;
  TmpdateStartDisplay: any;
  TmpdateFinishDisplay: any;
  initiativeCode: string;
  FXcostEstCapex: any;
  TableYear: any;
  strategicObjectives: any = [];
  planStatus: any = [];
  attachments: any = [];
  owners: any = [];
  organizations: any = [];
  years: any = [];
  params: any = {};
  diffInMonth: number;
  diffInYear: number;
  RemarkShow = false;
  inshow = false;
  ferPool = false;
  showContingency = false;
  showTransfer = false;
  showBOD = false;
  showTransferForm = false;
  showSubBOD = false;
  test: string = '1';
  capexType: any;
  route_: any = 'no';
  route_m: any = 'no';

  capexvalidate = false;
  CapexReqForm: FormGroup;

  PoolYear_close = false;

  IsShowRevisionButton = false;

  IsCreatePool = null;

  currencyList: Currency[] = [];

  currencyMountList: Currency[] = [];

  // IsCreate: boolean;

  // capexInformationForm: FormGroup;

  capexInformationForm = this.fb.group({
    capexInformationId: 0,
    startingDate: '',
    projecctComRun: '',
    requestIniNoDate: null,
    projectExePeriodYear: '',
    projectExePeriodMonth: '',
    budgetStartDate: '',
    projectCost: '',
    organization: '',
    reasonOfChanging: '',
    budgetPeriod: '',
    betweenYear: '',
    transferForm: '',
    poolBudgetForm: '',
    strategy: '',
    poolYear: '',
    costCenterOfVP: null,
    codeCostCenterOfVP: '',
    poolID: '0',
    availableBudget: 0,
    // add for submit
    submitTo: '',
    revistion: 0,
    capexType: this.IsReturn ? 'ReturnCapex' : this.IsAddmore ? 'AddmoreCapex' : 'Createnew',
    budgetYear: '',
    capexStatus: '',
    isMaxApprovedRev: false,
    sequent: '',
    existingBudget: 0,
    spendingActual: 0,
    additionalCost: 0,
    returnCost: 0,
    // availableBudgetPool: '',
    actionYear: '',
    //for monthly
    year_m: '',
    startingDate_tmp: '',
    projecctComRun_tmp: '',
    requestIniNoDate_tmp: '',
    showRemark_tmp: false,
    manager: '',
    projectManager: '',
    //for addmore
    budgetAvailable: 0,
    totalAvailable: 0,
    tableShow: false,
    existingCost: 0,

    //Temporary First Addmore
    firstAddmoreStatus: null

  });
  additionalCost: any = 0;
  returnCost: any;

  capexDisableField: boolean = false;

  get IsReturn() {
    return this.initiativeService.isReturn;
  }
  get IsAddmore() {
    return this.initiativeService.isAddmore;

  }
  get IsRevise() {
    return this.initiativeService.isRevise;

  }

  setSpendingActual(value) {
    if (value != "" && value != null) {
      if (Number.parseFloat(value) <= this.capexInformationForm.get('existingCost').value) {
        this.capexInformationForm.get('spendingActual').patchValue(value)
        this.capexInformationForm.get('budgetAvailable').patchValue(parseFloat(this.capexInformationForm.get('existingCost').value) - parseFloat(value.replace(/,/g, '')));
        this.capexInformationForm.get('totalAvailable').patchValue(parseFloat(this.capexInformationForm.get('budgetAvailable').value) + parseFloat(this.capexInformationForm.get('additionalCost').value));
        this.capexInformationForm.patchValue({
          budgetAvailable: parseFloat(this.capexInformationForm.get('budgetAvailable').value).toFixed(2),
          totalAvailable: parseFloat(this.capexInformationForm.get('totalAvailable').value).toFixed(2),
          spendingActual: this.capexInformationForm.get('spendingActual').value
        });
      } else {
        this.capexInformationForm.get('spendingActual').patchValue(0);
        if (!this.initiativeService.viewMode) {
          this.initiativeService.viewMode ? false : this.swalTool.SpendingActual();
        }
      }

    } else if (this.initiativeService.isAddmore) {
      this.flag_fail = "yes";
    }

    this.CHk_validate();

  }

  setadditionalCost() {
    let additionalCost = parseFloat(this.capexInformationForm.get('additionalCost').value);
    let AnnualTotal_overall_ = 0;
    let TotalAdditional_total_ = 0;
    let IsAdditionalInBudget = false;


    //เงื่อนไขนี้คือ
    if (this.capexInformationForm.get('betweenYear').value == 'Pool Budget' && this.capexInformationForm.get('budgetPeriod').value == 'Current year') {
      let availableBudget = parseFloat(this.capexInformationForm.get('availableBudget').value);
      if (additionalCost >= availableBudget) {
        this.capexInformationForm.patchValue({
          additionalCost: null,
        });
        this.swalTool.PoolBudgetError(availableBudget);
        return;
      }
    }
    ///

    if (additionalCost != null) {
      // this.capexInformationForm.get('additionalCost').patchValue(value)
      this.capexInformationForm.get('tableShow').patchValue(true);


      if (this.AnnualForm.controls['AnnualTotal_overall'].value != "" &&
        this.AnnualForm.controls['AnnualTotal_overall'].value != undefined) {
        AnnualTotal_overall_ = this.AnnualForm.controls['AnnualTotal_overall'].value
      }

      if (this.AnnualForm.controls['TotalAdditional_total'].value != "" &&
        this.AnnualForm.controls['TotalAdditional_total'].value != undefined) {
        TotalAdditional_total_ = this.AnnualForm.controls['TotalAdditional_total'].value
      }

      let totalAvailable = parseFloat(this.capexInformationForm.get('budgetAvailable').value) + parseFloat(this.capexInformationForm.get('additionalCost').value);

      this.ProjectCost = parseFloat(this.capexInformationForm.get('existingBudget').value) + additionalCost;

      this.capexInformationForm.get('totalAvailable').patchValue(+this.capexInformationForm.get('budgetAvailable').value + +this.capexInformationForm.get('additionalCost').value);

      this.additionalCost = parseFloat(this.capexInformationForm.get('additionalCost').value).toFixed(2);



      this.capexInformationForm.patchValue({
        projectCost: parseFloat(this.ProjectCost).toFixed(2),
        additionalCost: parseFloat(this.additionalCost).toFixed(2),
        totalAvailable: totalAvailable.toFixed(2)
      });

      this.setProjectCost(parseFloat(this.ProjectCost).toFixed(2));


      if (+this.ProjectCost < AnnualTotal_overall_) {
        this.flag_fail = "yes";
        this.initiativeService.viewMode ? false : this.swalTool.SumCost();
      }

      if (+additionalCost < TotalAdditional_total_) {
        this.flag_fail = "yes";
        this.initiativeService.viewMode ? false : this.swalTool.TotalAdd_Alert();
      }
    }
    else {
      //this.capexInformationForm.get('additionalCost').patchValue(0);
      let totalAvailable: number = 0;
      this.capexInformationForm.get('tableShow').patchValue(false);
      this.ProjectCost = parseFloat(this.capexInformationForm.get('projectCost').value) - parseFloat(this.additionalCost);
      totalAvailable = parseFloat(this.capexInformationForm.get('totalAvailable').value) - parseFloat(this.additionalCost);
      this.additionalCost = 0;

      this.capexInformationForm.patchValue({
        additionalCost: null,
        projectCost: parseFloat(this.ProjectCost).toFixed(2),
        totalAvailable: totalAvailable.toFixed(2)
      });

      this.flag_fail = "yes";
      this.setProjectCost(parseFloat(this.ProjectCost).toFixed(2));
    }
    this.CHk_validate();

  }

  setreturnCost() {
    let returnCost = this.capexInformationForm.get('returnCost').value;
    let AnnualTotal_overall_ = 0;
    let TotalAdditional_total_ = 0;

    if (returnCost != "" && returnCost != null) {
      // this.capexInformationForm.get('returnCost').patchValue(value)
      this.capexInformationForm.get('tableShow').patchValue(true);


      if (this.AnnualForm.controls['AnnualTotal_overall'].value != "" &&
        this.AnnualForm.controls['AnnualTotal_overall'].value != undefined) {
        AnnualTotal_overall_ = this.AnnualForm.controls['AnnualTotal_overall'].value
      }

      if (this.AnnualForm.controls['TotalAdditional_total'].value != "" &&
        this.AnnualForm.controls['TotalAdditional_total'].value != undefined) {
        TotalAdditional_total_ = this.AnnualForm.controls['TotalAdditional_total'].value
      }

      let totalAvailable = parseFloat(this.capexInformationForm.get('budgetAvailable').value) - parseFloat(this.capexInformationForm.get('returnCost').value);

      this.ProjectCost = parseFloat(this.capexInformationForm.get('existingCost').value) - parseFloat(returnCost.replace(/,/g, ''));

      this.capexInformationForm.get('totalAvailable').patchValue(parseFloat(this.capexInformationForm.get('budgetAvailable').value) - parseFloat(this.capexInformationForm.get('returnCost').value));

      this.returnCost = parseFloat(this.capexInformationForm.get('returnCost').value).toFixed(2);
      this.capexInformationForm.patchValue({
        projectCost: parseFloat(this.ProjectCost).toFixed(2),
        returnCost: parseFloat(this.returnCost).toFixed(2),
        totalAvailable: totalAvailable.toFixed(2)
      });
      this.setProjectCost(parseFloat(this.ProjectCost).toFixed(2));


      // if (+this.ProjectCost < AnnualTotal_overall_) {
      //   this.flag_fail = "yes";
      //   this.swalTool.SumCost();
      // }

      // if (+additionalCost < TotalAdditional_total_) {
      //   this.flag_fail = "yes";
      //   this.swalTool.TotalAdd_Alert();
      // }
    }
    else {
      //this.capexInformationForm.get('returnCost').patchValue(0);

      // this.capexInformationForm.get('tableShow').patchValue(false);

      // this.capexInformationForm.patchValue({
      //   returnCost: this.capexInformationForm.get('returnCost').value
      // });
      let totalAvailable: number = 0;
      this.capexInformationForm.get('tableShow').patchValue(false);
      this.ProjectCost = parseFloat(this.capexInformationForm.get('projectCost').value) + parseFloat(this.returnCost);
      totalAvailable = parseFloat(this.capexInformationForm.get('totalAvailable').value) + parseFloat(this.returnCost);
      this.returnCost = 0;

      this.capexInformationForm.patchValue({
        returnCost: null,
        projectCost: parseFloat(this.ProjectCost).toFixed(2),
        totalAvailable: totalAvailable.toFixed(2)
      });

      this.flag_fail = "yes";
      this.setProjectCost(parseFloat(this.ProjectCost).toFixed(2));

    }

    this.CHk_validate();

  }

  get GetEntryMode() {
    return false;
    // return this.formGroup.get('initiativesDetailForm') ? this.formGroup.get('initiativesDetailForm').get('entryMode').value === 'E001' : false;
  }

  annualForm_list = this.fb.array(
    [this.fb.group({
      currencyTitle: 'Million Baht',
      y1: '',
      y2: '',
      y3: '',
      y4: '',
      y5: '',
      y6: '',
      y7: '',
      y8: '',
      y9: '',
      y10: '',
      currencyFx: '',
      overall: '',
      flagFirst_row: true
    })]);

  InitiativeDetail = { code: null, name: null, year: null, owner: null, Organization: null };


  //===================== Date Format ======================
  bsConfigStart = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  bsConfigFinish = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  bsConBetween = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };


  //==================== Validate no fill ==============================
  get invalidCostEstCapex() {
    return this.capexInformationForm.controls.projectCost.touched && this.capexInformationForm.controls.projectCost.invalid;
  }
  get invalidAdditionalCost() {
    return this.capexInformationForm.controls.additionalCost.touched && this.capexInformationForm.controls.additionalCost.invalid;
  }

  get invalidReturnCost() {
    return this.capexInformationForm.controls.returnCost.touched && this.capexInformationForm.controls.returnCost.invalid;
  }

  get invalidOrganization() {
    return this.capexInformationForm.controls.costCenterOfVP.touched && this.capexInformationForm.controls.costCenterOfVP.invalid;
  }

  get invalidCodeCostCenterOfVP() {
    return this.capexInformationForm.controls.codeCostCenterOfVP.touched && this.capexInformationForm.controls.codeCostCenterOfVP.invalid;
  }

  get invalidStartingDate() {
    return this.capexInformationForm.controls.startingDate.touched && this.capexInformationForm.controls.startingDate.invalid;
  }

  get invalidFinishingDate() {
    return this.capexInformationForm.controls.projecctComRun.touched && this.capexInformationForm.controls.projecctComRun.invalid;
  }

  get invalidRequestIniNoDate() {
    return this.capexInformationForm.controls.requestIniNoDate.touched && this.capexInformationForm.controls.requestIniNoDate.invalid;
  }

  get invalidBudget() {
    return this.capexInformationForm.controls.budgetPeriod.touched && this.capexInformationForm.controls.budgetPeriod.invalid;
  }

  get invalidSubmit() {
    return this.capexvalidate;
  }

  get invalidReasonOfchanging() {
    return this.capexInformationForm.controls.reasonOfChanging.touched && this.capexInformationForm.controls.reasonOfChanging.invalid;
  }

  //================= Value 20200422 =================

  StartingDate: any;
  ProjecctComRun: any;
  RequestIniNoDate: any = null;
  RequestIniNoDate_tmp: any;
  ProjectExePeriodYear: any;
  ProjectExePeriodMonth: any;
  BudgetStartDate: any;
  ProjectCost: any;
  OldProjectCost: any;
  organization: any;
  ReasonOfChanging: any;
  BudgetForm: any;
  BetweenYear: any;
  TransferForm: any;
  PoolBudgetForm: any;
  strategy: any;
  CostCenterOfVP: any;
  CodeCostCenterOfVP: any;

  Initiative_tmp: any;

  OwnerList: any;

  StartYear_1: any;
  EndYear_1: any;

  YearTable_capex = [];

  lastMonthIndex: any;

  totalCost: number = 0;
  totalCost_tmp: any = [];

  yearColumn = [];
  TotalYearColumn = [];

  totalCost_m: number = 0;
  totalCost_tmp_m = [[], []];

  monthColumn = [[], []];
  TotalMonthColumn = [[], []];

  Ownerselect: any;
  OwnerItemTmp: any;
  OwnerItem: any[] = [
    { ownerName: '' }
  ];


  AnnualForm: FormGroup;
  JointInvestmentForm: FormGroup;
  JointLoanForm: FormGroup;
  monthForm0: FormGroup;
  monthForm1: FormGroup;
  monthForm2: FormGroup;
  monthForm3: FormGroup;
  monthForm4: FormGroup;
  monthForm5: FormGroup;
  monthForm6: FormGroup;
  monthForm7: FormGroup;
  monthForm8: FormGroup;
  monthForm9: FormGroup;

  year_m = [];
  diffYear: any;

  StartingDateDisplayTMP: any;
  ProjecctComRunDateDisplayTMP: any;
  RequestIniNoDateDateDisplayTMP: any;

  ProjectExePeriodYearTMP: any;
  ProjectExePeriodMonthTMP: any;
  BudgetStartDateTMP: any;
  ProjectCostTMP: any;
  organizationTMP: any;
  ReasonOfChangingTMP: any;
  BudgetFormTMP: any;
  BetweenYearTMP: any;
  TransferFormTMP: any;
  PoolBudgetFormTMP: any;
  strategyTMP: any;
  OwnerID: any;
  CostCenterOfVPTMP: any;
  CodeCostCenterOfVPTMP: any;
  ShowRemark_tmp_TMP: any;

  seq_: any;
  capexInformationId: any;

  typeTransaction_: any[];

  PoolID_list: any[];
  PoolID_close = false;
  IsRequestPool: boolean;

  typeTransaction: any[] = [
    { code: 'Million Baht', chooes: 'Million Baht' },
    { code: 'Million Yuan', chooes: 'Million Yuan' },
    { code: 'Million SG Dollar', chooes: 'Million SG Dollar' },
    { code: 'Million Pond', chooes: 'Million Pond' },
    { code: 'Million Dong', chooes: 'Million Dong' },
    { code: 'Million Euro', chooes: 'Million Euro' },
    { code: 'Million Yen', chooes: 'Million Yen' },
    { code: 'Million Dollar', chooes: 'Million Dollar' },
  ];

  typeTransaction_month: any[] = [
    { code: 'Baht', chooes: 'Baht' },
    { code: 'Yuan', chooes: 'Yuan' },
    { code: 'SG Dollar', chooes: 'SG Dollar' },
    { code: 'Pond', chooes: 'Pond' },
    { code: 'Dong', chooes: 'Dong' },
    { code: 'Euro', chooes: 'Euro' },
    { code: 'Yen', chooes: 'Yen' },
    { code: 'Dollar', chooes: 'Dollar' },
  ];

  months = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  monthList_1 = [];
  monthList_x = [];
  monthList_last = [];
  totalAnual = [];

  AnnualTotal_overall_tmp: any;

  flag_fail: any = "no";
  tmp_error: any = "no";
  tmp_error_m: any = "no";

  Revistion_: any;
  CheckStatus: boolean;
  a: any

  pool_id: any;
  PoolYear: any;
  OwnerVP: any;
  tmp_error_AnnualTotal: any;
  tmp_error_pool: any;
  CapexId: any;

  get annualForm_() {
    return this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
  }

  get monthForm0_() {
    return this.monthForm0.get('monthForm_list') as FormArray;
  }

  get monthForm1_() {
    return this.monthForm1.get('monthForm_list') as FormArray;
  }

  get monthForm2_() {
    return this.monthForm2.get('monthForm_list') as FormArray;
  }

  get monthForm3_() {
    return this.monthForm3.get('monthForm_list') as FormArray;
  }

  get monthForm4_() {
    return this.monthForm4.get('monthForm_list') as FormArray;
  }

  get monthForm5_() {
    return this.monthForm5.get('monthForm_list') as FormArray;
  }

  get monthForm6_() {
    return this.monthForm6.get('monthForm_list') as FormArray;
  }

  get monthForm7_() {
    return this.monthForm7.get('monthForm_list') as FormArray;
  }

  get monthForm8_() {
    return this.monthForm8.get('monthForm_list') as FormArray;
  }

  get monthForm9_() {
    return this.monthForm9.get('monthForm_list') as FormArray;
  }

  JointVentureInvestment = this.fb.group({
    jointVentureType: "Investment",
    total1: null,
    total2: null,
    total3: null,
    total4: null,
    total5: null,
    total6: null,
    total7: null,
    total8: null,
    total9: null,
    total10: null,
    total11: null,
    totalOverall: null,
    currencyTitle: 'Million Baht',
    y1: null,
    y2: null,
    y3: null,
    y4: null,
    y5: null,
    y6: null,
    y7: null,
    y8: null,
    y9: null,
    y10: null,
    overall: null,
  });

  JointVentureLoan = this.fb.group({
    jointVentureType: "Loan",
    total1: null,
    total2: null,
    total3: null,
    total4: null,
    total5: null,
    total6: null,
    total7: null,
    total8: null,
    total9: null,
    total10: null,
    total11: null,
    totalOverall: null,
    currencyTitle: 'Million Baht',
    y1: null,
    y2: null,
    y3: null,
    y4: null,
    y5: null,
    y6: null,
    y7: null,
    y8: null,
    y9: null,
    y10: null,
    overall: null,
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.CapexId = params['gotoId'] || null;
    });
    //this.initiativeService.getGeneralData.subscribe((data) => this.generalDatas = data);

    // if (!this.capexInformationForm) {
    //   this.formGroup.addControl('capexInformationForm', this.capexInformationForm);
    // }
    this.initiativeService.GetOwners().subscribe(owners => this.owners = owners);
    this.bsConfigYear = Object.assign({}, { isAnimated: true, dateInputFormat: 'YYYY', minMode: this.minMode });
    this.GetInitiative();


    //check disable
    // this.capexService.GetIsDisabledCapexTab(this.initiativeService.id).then((responseDisable) => {
    //   if (responseDisable) {
    //     this.capexInformationForm.disable();
    //   }
    // });

    ////add by oat disable
    this.DisableCapexForm();


    if (this.initiativeService.viewMode) {
      this.capexInformationForm.disable();
    }
    if (this.GetEntryMode) {
      this.formGroup.addControl('JointVentureInvestment', this.JointVentureInvestment);
      this.formGroup.addControl('JointVentureLoan', this.JointVentureLoan);
    }


    this.commonDataService.GetcommonDataByType('currency').then((commonResp) => {
      if (commonResp.length > 0) {
        this.currencyList = [];
        this.currencyMountList = [];

        commonResp.forEach((data) => {
          if (data.attribute02 != 'Baht') {
            this.currencyList.push({
              currencyValue: data.attribute02,
              currencyName: data.attribute02,
              currencyMillionName: 'Million ' + data.attribute02,
              fxRate: data.attribute03 ? parseFloat(data.attribute03) : 1
            });
          }
          this.currencyMountList.push({
            currencyValue: data.attribute02,
            currencyMillionName: 'Million ' + data.attribute02,
            currencyName: data.attribute02,
            fxRate: data.attribute03 ? parseFloat(data.attribute03) : 1
          });
        });
      }


    })
    // this.progressService.currentMessage().subscribe(message => this.RequestIniNoDate = message);
  }


  // ngOnChanges() {
  //   this.capexInformationForm.valueChanges.subscribe((changeResData) => {
  //     let returnDetail: ReturnDetail = {} as ReturnDetail;
  //     returnDetail.existingCost = changeResData.existingCost;
  //     returnDetail.spendingActual = changeResData.spendingActual;
  //     returnDetail.budgetAvailable = changeResData.budgetAvailable;
  //     returnDetail.returnCost = changeResData.returnCost;
  //     returnDetail.projectCost = changeResData.projectCost;
  //     returnDetail.totalAvailable = changeResData.totalAvailable;
  //     // for (let index = 0; index < 10; index++) {
  //     //   console.log(changeResData['monthForm' + index]);
  //     // }
  //     if (this.page != 'pool-edit') {
  //       const capexData: Capexs = (this.capexInformationForm as FormGroup).getRawValue();
  //       this.capexService.changeCapexData(capexData);
  //       // this.capexService.changeReturnDetail(returnDetail);
  //     }
  //   });

  //   // let monthly: CapexMonthly[] = [] as CapexMonthly[];
  //   // for (let index = 0; index < 10; index++) {
  //   //   this.capexInformationForm.get('monthForm' + index).valueChanges.subscribe((monthlyData) => {
  //   //     monthly[index].jan = monthlyData.monthTotal1;
  //   //     monthly[index].feb = monthlyData.monthTotal2;
  //   //     monthly[index].mar = monthlyData.monthTotal3;
  //   //     monthly[index].apr = monthlyData.monthTotal4;
  //   //     monthly[index].may = monthlyData.monthTotal5;
  //   //     monthly[index].jun = monthlyData.monthTotal6;
  //   //     monthly[index].jul = monthlyData.monthTotal7;
  //   //     monthly[index].aug = monthlyData.monthTotal8;
  //   //     monthly[index].sep = monthlyData.monthTotal9;
  //   //     monthly[index].oct = monthlyData.monthTotal10;
  //   //     monthly[index].nov = monthlyData.monthTotal11;
  //   //     monthly[index].dec = monthlyData.monthTotal12;
  //   //     monthly[index].monthlyOverall = monthlyData.monthTotal_overall;
  //   //   });
  //   // }

  //   // this.capexService.changeMonthlyDetail(monthly);
  // }

  monthlyChange() {

  }


  ngOnDestroy() {
    this.progressService.capexLoading = false;
  }


  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }


  /////////////  get DM VP Project
  //VP
  SearchOwnerName(event) {
    this.GetOwners(event.term.toString());
  }


  GetOwners(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.owners = owners;
    });
  }

  ClearOwnerName() {
    //clear
    this.capexInformationForm.get('codeCostCenterOfVP').setValue(null);
    if (this.formGroup.get('DetailMaxForm')) {
      this.formGroup.get('DetailMaxForm').get('president').setValue(null);
    }
  }

  GetOwnersVP(event) {
    if (event) {
      this.capexService.GetCodeOfCostCenterVP(event.ownerName).subscribe((response) => {
        if (response.length != 0) {
          this.capexInformationForm.controls["codeCostCenterOfVP"].setValue(response[0].mainPositionCostCenter);
          if (!this.generalData.requestProjectEngineer) {
            this.progressService.getResponsibleNoEng(response[0].mainPositionCostCenter).then((getRespoRes) => {
              if (getRespoRes.length > 0) {
                this.progressService.changeCodeOfVP(getRespoRes[0].attribute01);
              } else {
                this.progressService.changeCodeOfVP("");
              }
              // this.formGroup.get('progessForm')?.get('responsible')?.patchValue(getRespoRes[0].attribute01);
            });
          }
          //update detail max form
          if (this.formGroup.get('DetailMaxForm')) {
            this.formGroup.get('DetailMaxForm').get('president').setValue(event.ownerName);
          }

        }
        this.CHk_validate();
      });
    }
  }

  //manager
  SearchManager(event) {
    this.GetManager(event.term);
  }

  changeManager($event) {
    if ($event) {
      if (this.formGroup.get('DetailMaxForm')) {
        this.formGroup.get('DetailMaxForm').get('manager').setValue($event.ownerName);
      }
    }
    // this.manager = encodeURIComponent($event.ownerName);
  }

  ClearGetManager() {
    this.GetManager();
    sessionStorage.removeItem('capexManager');
    this.manager = '';
  }

  GetManager(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.managerList = owners;
    });
  }

  //Project manager

  changeProjectManager($event) {
    if ($event) {
      if (this.formGroup.get('DetailMaxForm')) {
        this.formGroup.get('DetailMaxForm').get('projectManager').setValue($event.ownerName);
      }
    }
    // this.projectManager = encodeURIComponent($event.ownerName);

  }

  SearchProjectManager(event) {
    this.GetProjectManager(event.term);
  }

  ClearProjectManager() {
    this.GetProjectManager();
    if (this.formGroup.get('DetailMaxForm')) {
      this.formGroup.get('DetailMaxForm').get('projectManager').setValue(null);
    }
  }

  GetProjectManager(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.projectManagerList = owners;
    });
  }


  /////////////////////////


  ChangeYear(value) {

    if (value != null && value != undefined) {
      const controls = this.capexInformationForm.get('poolYear') as FormArray;

      this.PoolID_close = true;

      this.year = value.getFullYear();

      if (controls != null) {
        for (let i = 0; i < controls.length; i++) {
          controls.at(i).get('year').patchValue(this.year + i);
        }
      }
      if (this.PoolBudgetForm !== "") {
        this.capexService.GetPoolInnitiative(this.PoolBudgetForm, this.year_now, this.id).subscribe(resp => this.PoolID_list = resp); // this.PoolID_list = resp);
      }


      this.setYear = this.dateUtil.SetYear(new Date(value));
    }
    else {
      this.PoolID_close = false;
    }

  }


  duplicates(value) {

    this.a = value;

    for (let i = 0; this.typeTransaction.length > i; i++) {

      this.typeTransaction_ = this.typeTransaction[i];


      if (value != this.typeTransaction_) {

      }

    }

  }

  GetCapexsInformationBySubmit() {

    this.capexService.GetCapexsInformationBySubmit(this.id).subscribe(Revistion => this.Revistion_ = Revistion);

  }


  CheckValidate() {
    if (sessionStorage.getItem('InitiativeValidate_capex') === 'false') {
      setTimeout(() => this.SetMarkAsTouchedFormGeneral(), 50);
    }
  }

  Revision(controls) {
    this.capexService.revistionData = controls.capexInformationId;
    sessionStorage.getItem('InitiativeValidate_capex') === 'false'
    var url;
    if (controls.capexType == 'AddmoreCapex') {
      url = '/initiative/view-revistion-addmore?gotoId=' + controls.capexInformationId;
    } else {
      url = '/initiative/view-revistion?gotoId=' + controls.capexInformationId;
    }
    window.open(url);
  }

  GetInitiative() {


    if (this.page == 'pool-create') {
      this.IsCreatePool = true;
    }
    //for pool
    if (this.id == null && this.page == 'pool-create') {
      this.year_now = (new Date()).getFullYear();
      this.year_next = (new Date()).getFullYear() + 1;
      this.seq_ = 1;
      //change get form value and this.initativeService.suggestion
      //get data form General form


      this.StartingDate = null;
      this.ProjecctComRun = null;
      this.ProjectExePeriodYear = "0";
      this.ProjectExePeriodMonth = "0";
      this.BudgetStartDate = "";
      this.ProjectCost = 0;
      this.OldProjectCost = 0;
      this.organization = "";
      this.ReasonOfChanging = "";
      this.BudgetForm = "";
      this.BetweenYear = "";
      this.TransferForm = "";
      this.PoolBudgetForm = "";
      this.strategy = "MillionBaht";
      this.CostCenterOfVP = "";
      this.PoolYear = this.year_now;

      //====================== Year Table ======================


      this.AnnualForm = this.fb.group({
        AnnualTotal1: null,
        AnnualTotal2: null,
        AnnualTotal3: null,
        AnnualTotal4: null,
        AnnualTotal5: null,
        AnnualTotal6: null,
        AnnualTotal7: null,
        AnnualTotal8: null,
        AnnualTotal9: null,
        AnnualTotal10: null,
        AnnualTotal11: null,
        AnnualTotal_overall: null,
        TotalAdditional_total: null,
        annualForm_list: this.fb.array([this.fb.group({
          currencyTitle: 'Million Baht',
          y1: null,
          y2: null,
          y3: null,
          y4: null,
          y5: null,
          y6: null,
          y7: null,
          y8: null,
          y9: null,
          y10: null,
          overall: null,
          currencyFx: null,
          flagFirst_row: true
        })])
      });
      this.EndYear_1 = this.ProjecctComRun ? new Date(this.ProjecctComRun).getFullYear() : null;
      this.StartYear_1 = this.year_now;
      this.YearTable_capex = [];

      for (let i = 0; i < 10; i++) {
        if (this.StartingDate != null && this.ProjecctComRun != null && this.RequestIniNoDate != null
          && this.StartingDate != "" && this.ProjecctComRun != "" && this.RequestIniNoDate != "") {
          if (+this.StartYear_1 + i <= +this.EndYear_1) {
            this.YearTable_capex.push({
              columnname: +this.StartYear_1 + i,
              isEdit: this.capexDisableField ? true : false
            })
          }
          else {
            this.YearTable_capex.push({
              columnname: +this.StartYear_1 + i,
              isEdit: true
            })
          }
        }
        else {
          this.YearTable_capex.push({
            columnname: +this.StartYear_1 + i,
            isEdit: true
          })
        }
      }

      this.initial_month();

      if (!this.capexInformationForm.get('AnnualForm')) {
        this.capexInformationForm.addControl('AnnualForm', this.AnnualForm);
      }

      this.capexInformationForm.patchValue({
        startingDate: this.StartingDate,
        projecctComRun: this.ProjecctComRun,
        requestIniNoDate: this.RequestIniNoDate ? this.RequestIniNoDate : null,
        projectExePeriodYear: this.ProjectExePeriodYear,
        projectExePeriodMonth: this.ProjectExePeriodMonth,
        budgetStartDate: this.BudgetStartDate,
        projectCost: this.ProjectCost ? this.ProjectCost : null,
        organization: this.organization,
        reasonOfChanging: this.ReasonOfChanging,
        budgetPeriod: this.BudgetForm,
        betweenYear: this.BetweenYear,
        transferForm: this.TransferForm,
        poolBudgetForm: this.PoolBudgetForm,
        strategy: this.strategy,
        costCenterOfVP: this.CostCenterOfVP ? this.CostCenterOfVP : null,
        codeCostCenterOfVP: this.CodeCostCenterOfVP ? this.CodeCostCenterOfVP : null,
        availableBudget: 0,
        poolID: 0,
        existingCost: this.ProjectCost,
        existingBudget: this.ProjectCost,
        budgetAvailable: 0,
        totalAvailable: 0,
        // startingDate_tmp: response.startingDate,
        // projecctComRun_tmp: response.finishingDate,
        requestIniNoDate_tmp: null,
        showRemark_tmp: false,
        poolYear: this.PoolYear,

        sequent: 0,
        revistion: 0,
        capexType: "Requestpool"
      });
      if (this.initiativeService.page === 'pool-create') {
        this.currentYear = true;
      }
      else {
        this.currentYear = null;
      }
    } else {





      // this.capexService.GetCapexInformationList(this.id.toString()).subscribe(response => {
      this.capexService.GetCapexsInformationsByCapexInformationId(this.CapexId).subscribe(async response => {


        if (response) {
          this.id = response.initiativeId;
          this.initiativeService.GetInitiative(response.initiativeId).subscribe((initiativeResponse) => {
            if (initiativeResponse) {
              //this.capexDisableField = initiativeResponse.capexTabStatus == 2 ? true : false;
              this.IsRequestPool = initiativeResponse.initiativeType == "Request Pool" ? true : false;

              this.initiativeService.GetSuggestStatus(response.initiativeId).subscribe(responseSuggest => {
                //set data form suggestion
                if (responseSuggest) {

                  this.stage_Max = responseSuggest.stage;
                  this.is_RequestCapex = responseSuggest.isRequestCapex ? true : false;
                  this.is_Max = responseSuggest.max ? true : false;
                  this.status = responseSuggest.status;
                  this.stage = responseSuggest.stage;
                  this.remark = responseSuggest.remark;
                  this.Cim = responseSuggest.cim ? true : false;
                  this.Dim = responseSuggest.dim ? true : false;
                  this.Capex = responseSuggest.directCapex ? true : false;
                  this.Strategy = responseSuggest.strategy ? true : false;
                  this.Max = responseSuggest.max ? true : false;
                }
              });

              this.initiativeService.DisableTabCapex = true;
              //get data
              // return cost
              this.returnCost = response.returnCost;

              this.capexInformationForm.patchValue(response);
              this.year_now = (new Date()).getFullYear();
              this.year_next = (new Date()).getFullYear() + 1;
              this.seq_ = response.sequent;

              if (response.capexType == 'AddmoreCapex') {
                this.initiativeService.isAddmore = true;
              } else if (response.capexType == 'ReturnCapex') {
                this.initiativeService.isReturn = true;
              } else if (response.capexType == 'ReviseCapex') {
                this.initiativeService.isRevise = true;
              }

              //this.capexInformationForm.get('existingCost').patchValue(response.projectCost);

              this.capexInformationId = response.capexInformationId;

              this.StartingDate = response.startingDate ? new Date(response.startingDate) : new Date(initiativeResponse.startingDate);

              this.ProjecctComRun = response.projecctComRun ? new Date(response.projecctComRun) : new Date(initiativeResponse.finishingDate);
              this.capexInformationForm.patchValue({
                startingDate: this.StartingDate,
                projecctComRun: this.ProjecctComRun
              });
              this.ProjectExePeriodYear = response.projectExePeriodYear;
              this.ProjectExePeriodMonth = response.projectExePeriodMonth;
              if (response.requestIniNoDate != null) {
                this.RequestIniNoDate = response.requestIniNoDate ? new Date(response.requestIniNoDate) : null;
                this.BudgetStartDate = response.requestIniNoDate ? new Date(response.requestIniNoDate) : null;
              }
              else {
                this.RequestIniNoDate = null;
                this.BudgetStartDate = null;
              }

              this.capexInformationForm.patchValue({
                requestIniNoDate: this.RequestIniNoDate ? new Date(this.RequestIniNoDate) : null
              });
              this.ProjectCost = response.projectCost ? (response.projectCost).toFixed(2) : 0.00;
              this.OldProjectCost = response.projectCost ? (response.projectCost).toFixed(2) : 0.00;
              this.organization = "";
              this.ReasonOfChanging = response.reasonOfChanging;

              if (response.reasonOfChanging != "" && response.reasonOfChanging != null) {
                this.RemarkShow = true;
              }




              if (response.budgetPeriod == "Annual") {
                this.BudgetForm = "Annual";
                this.year_now = response.budgetYear ? +response.budgetYear - 1 : (new Date()).getFullYear();
                this.year_next = response.budgetYear ? +response.budgetYear : (new Date()).getFullYear() + 1;
              }
              else if (response.budgetPeriod == "Mid Year") {
                this.BudgetForm = "Mid Year";
                this.year_now = response.budgetYear ? +response.budgetYear : (new Date()).getFullYear();
                this.year_next = response.budgetYear ? +response.budgetYear + 1 : (new Date()).getFullYear() + 1;
              }
              else if (response.budgetPeriod == "Current year") {
                this.year_now = response.budgetYear ? +response.budgetYear : (new Date()).getFullYear();
                this.year_next = response.budgetYear ? +response.budgetYear + 1 : (new Date()).getFullYear() + 1;
                this.BudgetForm = "Current year";
                this.showContingency = true;
                this.ferPool = false;
                this.inshow = false;
              }

              if (response.betweenYear == "Contingency") {
                this.BetweenYear = "Contingency";
              }
              else if (response.betweenYear == "Transfer") {
                this.BetweenYear = "Transfer";
                this.inshow = true;
                this.ferPool = false;
              }
              else if (response.betweenYear == "BOD Approval on") {
                this.BetweenYear = "BOD Approval on";
              }
              else if (response.betweenYear == "Pool Budget") {
                this.BetweenYear = "Pool Budget";
                this.inshow = false;
                this.ferPool = true;
              }
              else {
                this.BetweenYear = "";
                this.ferPool = false;
                this.inshow = false;
              }

              this.TransferForm = response.transferForm;
              this.PoolBudgetForm = response.poolBudgetForm;
              this.strategy = "MillionBaht";
              this.CostCenterOfVP = response.costCenterOfVP;
              this.CodeCostCenterOfVP = response.codeCostCenterOfVP;
              this.AvailableBudget = response.availableBudget;
              this.PoolID = response.poolId;
              this.PoolYear = this.year_now;

              if (this.year_now != "" && this.PoolBudgetForm != "") {
                this.capexService.GetPoolInnitiative(this.PoolBudgetForm, this.year_now, this.id).subscribe(resp => this.PoolID_list = resp); // this.PoolID_list = resp);
              }

              let poolID_ = response.poolId;

              if (poolID_) {

                this.capexService.GetCapexsInfo(poolID_, 'Requestpool').subscribe(response2 => {
                  if (response2 != null && response2 != undefined) {
                    // if (response.availableBudget == 0) {
                    this.AvailableBudget = response2.availableBudget;
                    if ((this.initiativeService.suggestionStatus.flowType === 'initiative') ? this.initiativeService.suggestionStatus.status === 'revised' : (this.initiativeService.suggestionStatus.subStage !== null && this.initiativeService.suggestionStatus.subStage !== undefined) ? this.initiativeService.suggestionStatus.subStatus === 'revised' : false) {
                      this.AvailableBudget += (response.capexType == 'AddmoreCapex') ? parseFloat(this.capexInformationForm.get('additionalCost').value) : parseFloat(this.capexInformationForm.get('projectCost').value);
                    }
                    // }
                    // else {
                    //   this.AvailableBudget = response.availableBudget;
                    // }
                    this.capexInformationForm.controls['poolID'].setValue(poolID_);
                    this.capexInformationForm.controls['availableBudget'].setValue(this.AvailableBudget);
                  }
                });
              }
              this.capexInformationList = response;
              this.additionalCost = response.additionalCost;



              this.capexInformationForm.patchValue({
                capexInformationId: response.capexInformationId,
                projectCost: response.projectCost,
                startingDate_tmp: response.startingDate,
                projecctComRun_tmp: response.projecctComRun,
                requestIniNoDate_tmp: response.requestIniNoDate,
                showRemark_tmp: false,

                existingCost: response.existingBudget,
                spendingActual: response.spendingActual,

                budgetAvailable: response.existingBudget - response.spendingActual,
                additionalCost: response.additionalCost,
                totalAvailable: this.ProjectCost - response.spendingActual,

                //add
                submitTo: response.submitTo,
                revistion: response.revistion,
                capexType: response.capexType,
                budgetYear: response.budgetYear,
                capexStatus: response.capexStatus,
                isMaxApprovedRev: response.isMaxApprovedRev,
                sequent: response.sequent,
                existingBudget: response.existingBudget,
                returnCost: response.returnCost,
                availableBudget: response.availableBudget,
                // availableBudgetPool: response.availableBudgetPool,
                actionYear: response.actionYear,
                poolYear: this.PoolYear,
                costCenterOfVP: response.costCenterOfVP,
                codeCostCenterOfVP: response.codeCostCenterOfVP
              })

              this.capexInformationForm.patchValue({
                projecctComRun: this.ProjecctComRun,
                poolID: poolID_
              });
              //====================== Year Table ======================
              this.AnnualForm = this.fb.group({
                AnnualTotal1: '',
                AnnualTotal2: '',
                AnnualTotal3: '',
                AnnualTotal4: '',
                AnnualTotal5: '',
                AnnualTotal6: '',
                AnnualTotal7: '',
                AnnualTotal8: '',
                AnnualTotal9: '',
                AnnualTotal10: '',
                AnnualTotal11: '',
                AnnualTotal_overall: '',
                TotalAdditional_total: '',
                annualForm_list: this.fb.array([this.fb.group({
                  currencyTitle: 'Million Baht',
                  y1: '',
                  y2: '',
                  y3: '',
                  y4: '',
                  y5: '',
                  y6: '',
                  y7: '',
                  y8: '',
                  y9: '',
                  y10: '',
                  overall: '',
                  currencyFx: '',
                  flagFirst_row: true
                })])
              })

              this.EndYear_1 = this.ProjecctComRun ? new Date(this.ProjecctComRun).getFullYear() : null;
              if (this.RequestIniNoDate != null && this.RequestIniNoDate != undefined && this.RequestIniNoDate != '') {
                this.StartYear_1 = this.RequestIniNoDate ? new Date(this.RequestIniNoDate).getFullYear() : null;
              }
              else {
                this.StartYear_1 = this.year_now;
              }


              this.YearTable_capex = [];

              for (let i = 0; i < 10; i++) {
                if (this.StartingDate != null && this.ProjecctComRun != null && this.RequestIniNoDate != null
                  && this.StartingDate != "" && this.ProjecctComRun != "" && this.RequestIniNoDate != "") {
                  if (+this.StartYear_1 + i <= +this.EndYear_1) {
                    this.YearTable_capex.push({
                      columnname: +this.StartYear_1 + i,
                      isEdit: this.capexDisableField ? true : false
                    })
                  }
                  else {
                    this.YearTable_capex.push({
                      columnname: +this.StartYear_1 + i,
                      isEdit: true
                    })
                  }
                }
                else {
                  this.YearTable_capex.push({
                    columnname: +this.StartYear_1 + i,
                    isEdit: true
                  })
                }
              }
              //====================== Month Table ======================

              this.initial_month();
              if (!this.capexInformationForm.get('AnnualForm')) {
                this.capexInformationForm.addControl('AnnualForm', this.AnnualForm);
              }

              this.capexService.GetAnnualInvestmentPlan(response.initiativeId, this.capexInformationId).subscribe(resp => {
                const control = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;

                if (resp.length != 0) {
                  for (let xx = 1; xx < resp.length; xx++) {
                    if (resp[xx].planType != "SumTotalBaht" && resp[xx].planType != "TotalBahtbyRevision")
                      this.addSellingPoint_withvalue(
                        resp[xx].currency,
                        resp[xx].year1,
                        resp[xx].year2,
                        resp[xx].year3,
                        resp[xx].year4,
                        resp[xx].year5,
                        resp[xx].year6,
                        resp[xx].year7,
                        resp[xx].year8,
                        resp[xx].year9,
                        resp[xx].year10,
                        +resp[xx].yearOverall,
                        resp[xx].currencyFx
                      );
                  }

                  control.at(0).get('currencyTitle').patchValue(resp[0].currency);
                  control.at(0).get('y1').patchValue(parseFloat(resp[0].year1).toFixed(2));  //parseFloat(resp[0].year1).toFixed(2)
                  control.at(0).get('y2').patchValue(parseFloat(resp[0].year2).toFixed(2));
                  control.at(0).get('y3').patchValue(parseFloat(resp[0].year3).toFixed(2));
                  control.at(0).get('y4').patchValue(parseFloat(resp[0].year4).toFixed(2));
                  control.at(0).get('y5').patchValue(parseFloat(resp[0].year5).toFixed(2));
                  control.at(0).get('y6').patchValue(parseFloat(resp[0].year6).toFixed(2));
                  control.at(0).get('y7').patchValue(parseFloat(resp[0].year7).toFixed(2));
                  control.at(0).get('y8').patchValue(parseFloat(resp[0].year8).toFixed(2));
                  control.at(0).get('y9').patchValue(parseFloat(resp[0].year9).toFixed(2));
                  control.at(0).get('y10').patchValue(parseFloat(resp[0].year10).toFixed(2));
                  control.at(0).get('overall').patchValue(resp[0].yearOverall);
                  control.at(0).get('currencyFx').patchValue(resp[0].currencyFx);
                  control.at(0).get('flagFirst_row').patchValue(true);

                  let xx = +control.length

                  let AnnualTotal_overall = 0;

                  for (let i = 0; i < xx; i++) {
                    let overall = 0;

                    for (let j = 1; j <= 10; j++) {
                      if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
                        overall = overall + +control.at(i).get('y' + j).value;
                      }
                    }
                    control.at(i).get('overall').patchValue(overall.toFixed(2));
                  }

                  for (let j = 1; j <= 10; j++) {
                    let total = 0;
                    for (let i = 0; i < xx; i++) {

                      if (i != 0) {
                        if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
                          if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
                            total = total + (+control.at(i).get('y' + j).value * +control.at(i).get('currencyFx').value);
                          }
                        }
                      }
                      else {
                        if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
                          total = total + +control.at(i).get('y' + j).value;
                        }
                      }

                    }
                    this.capexInformationForm.get('AnnualForm').get('AnnualTotal' + j).setValue(total.toFixed(2));
                    AnnualTotal_overall = AnnualTotal_overall + +total;
                    this.AnnualTotal_overall_tmp = +AnnualTotal_overall.toFixed(2);


                    this.totalAnual[this.YearTable_capex[j - 1].columnname] = total;

                  }


                  this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').setValue(AnnualTotal_overall.toFixed(2));

                  // if (!this.capexInformationForm.get('AnnualForm')) {
                  //   this.capexInformationForm.addControl('AnnualForm', this.AnnualForm);
                  // }
                  this.flag_fail = "no";
                }

                this.capexInformationForm.get('year_m').setValue(this.year_m ? this.year_m : '');

                for (let i = 0; i < +this.year_m.length; i++) {
                  this.capexService.GetMonthlyInvestmentPlan(this.id.toString(), this.capexInformationId, this.year_m[i]).subscribe(resp => {
                    if (i == 0) {
                      if (resp.length != 0) {

                        for (let j = 0; j < resp.length; j++) {
                          if (j == 0) {
                            const controlMonth0 = this.monthForm0.get('monthForm_list') as FormArray;

                            controlMonth0.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                            controlMonth0.at(0).get('m1').patchValue(resp[0].jan);
                            controlMonth0.at(0).get('m2').patchValue(resp[0].feb);
                            controlMonth0.at(0).get('m3').patchValue(resp[0].mar);
                            controlMonth0.at(0).get('m4').patchValue(resp[0].apr);
                            controlMonth0.at(0).get('m5').patchValue(resp[0].may);
                            controlMonth0.at(0).get('m6').patchValue(resp[0].jun);
                            controlMonth0.at(0).get('m7').patchValue(resp[0].jul);
                            controlMonth0.at(0).get('m8').patchValue(resp[0].aug);
                            controlMonth0.at(0).get('m9').patchValue(resp[0].sep);
                            controlMonth0.at(0).get('m10').patchValue(resp[0].oct);
                            controlMonth0.at(0).get('m11').patchValue(resp[0].nov);
                            controlMonth0.at(0).get('m12').patchValue(resp[0].dec);
                            controlMonth0.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                            controlMonth0.at(0).get('flagFirst_row').patchValue(true);
                          }
                          else {
                            this.addMonth_withvalue1(resp[j].investmentCost,
                              resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                              resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                              resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                              '', resp[j].investmentCostFx)
                          }
                        }

                        this.ChangingValue_month_table1(this.year_m[i]);

                      }
                      if (!this.capexInformationForm.get('monthForm0')) {
                        this.capexInformationForm.addControl('monthForm0', this.monthForm0);
                      }
                    }
                    else if (i == 1) {
                      if (resp.length != 0) {
                        for (let j = 0; j < resp.length; j++) {
                          const controlMonth1 = this.monthForm1.get('monthForm_list') as FormArray;
                          if (j == 0) {
                            controlMonth1.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                            controlMonth1.at(0).get('m1').patchValue(resp[0].jan);
                            controlMonth1.at(0).get('m2').patchValue(resp[0].feb);
                            controlMonth1.at(0).get('m3').patchValue(resp[0].mar);
                            controlMonth1.at(0).get('m4').patchValue(resp[0].apr);
                            controlMonth1.at(0).get('m5').patchValue(resp[0].may);
                            controlMonth1.at(0).get('m6').patchValue(resp[0].jun);
                            controlMonth1.at(0).get('m7').patchValue(resp[0].jul);
                            controlMonth1.at(0).get('m8').patchValue(resp[0].aug);
                            controlMonth1.at(0).get('m9').patchValue(resp[0].sep);
                            controlMonth1.at(0).get('m10').patchValue(resp[0].oct);
                            controlMonth1.at(0).get('m11').patchValue(resp[0].nov);
                            controlMonth1.at(0).get('m12').patchValue(resp[0].dec);
                            controlMonth1.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                            controlMonth1.at(0).get('flagFirst_row').patchValue(true);
                          }
                          else {
                            this.addMonth_withvalue2(resp[j].investmentCost,
                              resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                              resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                              resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                              '', resp[j].investmentCostFx)
                          }
                        }

                        this.ChangingValue_month_table2(this.year_m[i]);

                      }
                      if (!this.capexInformationForm.get('monthForm1')) {
                        this.capexInformationForm.addControl('monthForm1', this.monthForm1);
                      }
                    }
                    else if (i == 2) {
                      if (resp.length != 0) {
                        for (let j = 0; j < resp.length; j++) {
                          const controlMonth2 = this.monthForm2.get('monthForm_list') as FormArray;
                          if (j == 0) {
                            controlMonth2.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                            controlMonth2.at(0).get('m1').patchValue(resp[0].jan);
                            controlMonth2.at(0).get('m2').patchValue(resp[0].feb);
                            controlMonth2.at(0).get('m3').patchValue(resp[0].mar);
                            controlMonth2.at(0).get('m4').patchValue(resp[0].apr);
                            controlMonth2.at(0).get('m5').patchValue(resp[0].may);
                            controlMonth2.at(0).get('m6').patchValue(resp[0].jun);
                            controlMonth2.at(0).get('m7').patchValue(resp[0].jul);
                            controlMonth2.at(0).get('m8').patchValue(resp[0].aug);
                            controlMonth2.at(0).get('m9').patchValue(resp[0].sep);
                            controlMonth2.at(0).get('m10').patchValue(resp[0].oct);
                            controlMonth2.at(0).get('m11').patchValue(resp[0].nov);
                            controlMonth2.at(0).get('m12').patchValue(resp[0].dec);
                            controlMonth2.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                            controlMonth2.at(0).get('flagFirst_row').patchValue(true);
                          }
                          else {
                            this.addMonth_withvalue3(resp[j].investmentCost,
                              resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                              resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                              resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                              '', resp[j].investmentCostFx)
                          }
                        }
                        this.ChangingValue_month_table3(this.year_m[i]);

                      }
                      if (!this.capexInformationForm.get('monthForm2')) {
                        this.capexInformationForm.addControl('monthForm2', this.monthForm2);
                      }
                    }
                    else if (i == 3) {
                      if (resp.length != 0) {
                        for (let j = 0; j < resp.length; j++) {
                          const controlMonth3 = this.monthForm3.get('monthForm_list') as FormArray;
                          if (j == 0) {
                            controlMonth3.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                            controlMonth3.at(0).get('m1').patchValue(resp[0].jan);
                            controlMonth3.at(0).get('m2').patchValue(resp[0].feb);
                            controlMonth3.at(0).get('m3').patchValue(resp[0].mar);
                            controlMonth3.at(0).get('m4').patchValue(resp[0].apr);
                            controlMonth3.at(0).get('m5').patchValue(resp[0].may);
                            controlMonth3.at(0).get('m6').patchValue(resp[0].jun);
                            controlMonth3.at(0).get('m7').patchValue(resp[0].jul);
                            controlMonth3.at(0).get('m8').patchValue(resp[0].aug);
                            controlMonth3.at(0).get('m9').patchValue(resp[0].sep);
                            controlMonth3.at(0).get('m10').patchValue(resp[0].oct);
                            controlMonth3.at(0).get('m11').patchValue(resp[0].nov);
                            controlMonth3.at(0).get('m12').patchValue(resp[0].dec);
                            controlMonth3.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                            controlMonth3.at(0).get('flagFirst_row').patchValue(true);
                          }
                          else {
                            this.addMonth_withvalue4(resp[j].investmentCost,
                              resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                              resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                              resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                              '', resp[j].investmentCostFx)
                          }
                        }
                        this.ChangingValue_month_table4(this.year_m[i]);

                      }
                      if (!this.capexInformationForm.get('monthForm3')) {
                        this.capexInformationForm.addControl('monthForm3', this.monthForm3);
                      }
                    }
                    else if (i == 4) {
                      if (resp.length != 0) {
                        for (let j = 0; j < resp.length; j++) {
                          const controlMonth4 = this.monthForm4.get('monthForm_list') as FormArray;
                          if (j == 0) {
                            controlMonth4.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                            controlMonth4.at(0).get('m1').patchValue(resp[0].jan);
                            controlMonth4.at(0).get('m2').patchValue(resp[0].feb);
                            controlMonth4.at(0).get('m3').patchValue(resp[0].mar);
                            controlMonth4.at(0).get('m4').patchValue(resp[0].apr);
                            controlMonth4.at(0).get('m5').patchValue(resp[0].may);
                            controlMonth4.at(0).get('m6').patchValue(resp[0].jun);
                            controlMonth4.at(0).get('m7').patchValue(resp[0].jul);
                            controlMonth4.at(0).get('m8').patchValue(resp[0].aug);
                            controlMonth4.at(0).get('m9').patchValue(resp[0].sep);
                            controlMonth4.at(0).get('m10').patchValue(resp[0].oct);
                            controlMonth4.at(0).get('m11').patchValue(resp[0].nov);
                            controlMonth4.at(0).get('m12').patchValue(resp[0].dec);
                            controlMonth4.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                            controlMonth4.at(0).get('flagFirst_row').patchValue(true);
                          }
                          else {
                            this.addMonth_withvalue5(resp[j].investmentCost,
                              resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                              resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                              resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                              '', resp[j].investmentCostFx)
                          }
                          this.ChangingValue_month_table5(this.year_m[i]);

                        }
                      }
                      if (!this.capexInformationForm.get('monthForm4')) {
                        this.capexInformationForm.addControl('monthForm4', this.monthForm4);
                      }
                    }
                    else if (i == 5) {
                      if (resp.length != 0) {
                        for (let j = 0; j < resp.length; j++) {
                          const controlMonth5 = this.monthForm5.get('monthForm_list') as FormArray;
                          if (j == 0) {
                            controlMonth5.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                            controlMonth5.at(0).get('m1').patchValue(resp[0].jan);
                            controlMonth5.at(0).get('m2').patchValue(resp[0].feb);
                            controlMonth5.at(0).get('m3').patchValue(resp[0].mar);
                            controlMonth5.at(0).get('m4').patchValue(resp[0].apr);
                            controlMonth5.at(0).get('m5').patchValue(resp[0].may);
                            controlMonth5.at(0).get('m6').patchValue(resp[0].jun);
                            controlMonth5.at(0).get('m7').patchValue(resp[0].jul);
                            controlMonth5.at(0).get('m8').patchValue(resp[0].aug);
                            controlMonth5.at(0).get('m9').patchValue(resp[0].sep);
                            controlMonth5.at(0).get('m10').patchValue(resp[0].oct);
                            controlMonth5.at(0).get('m11').patchValue(resp[0].nov);
                            controlMonth5.at(0).get('m12').patchValue(resp[0].dec);
                            controlMonth5.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                            controlMonth5.at(0).get('flagFirst_row').patchValue(true);
                          }
                          else {
                            this.addMonth_withvalue6(resp[j].investmentCost,
                              resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                              resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                              resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                              '', resp[j].investmentCostFx)
                          }

                        }
                        this.ChangingValue_month_table6(this.year_m[i]);

                      }
                      if (!this.capexInformationForm.get('monthForm5')) {
                        this.capexInformationForm.addControl('monthForm5', this.monthForm5);
                      }
                    }
                    else if (i == 6) {
                      if (resp.length != 0) {
                        for (let j = 0; j < resp.length; j++) {
                          const controlMonth6 = this.monthForm6.get('monthForm_list') as FormArray;
                          if (j == 0) {
                            controlMonth6.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                            controlMonth6.at(0).get('m1').patchValue(resp[0].jan);
                            controlMonth6.at(0).get('m2').patchValue(resp[0].feb);
                            controlMonth6.at(0).get('m3').patchValue(resp[0].mar);
                            controlMonth6.at(0).get('m4').patchValue(resp[0].apr);
                            controlMonth6.at(0).get('m5').patchValue(resp[0].may);
                            controlMonth6.at(0).get('m6').patchValue(resp[0].jun);
                            controlMonth6.at(0).get('m7').patchValue(resp[0].jul);
                            controlMonth6.at(0).get('m8').patchValue(resp[0].aug);
                            controlMonth6.at(0).get('m9').patchValue(resp[0].sep);
                            controlMonth6.at(0).get('m10').patchValue(resp[0].oct);
                            controlMonth6.at(0).get('m11').patchValue(resp[0].nov);
                            controlMonth6.at(0).get('m12').patchValue(resp[0].dec);
                            controlMonth6.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                            controlMonth6.at(0).get('flagFirst_row').patchValue(true);
                          }
                          else {
                            this.addMonth_withvalue7(resp[j].investmentCost,
                              resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                              resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                              resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                              '', resp[j].investmentCostFx)
                          }
                        }
                        this.ChangingValue_month_table7(this.year_m[i]);

                      }
                      if (!this.capexInformationForm.get('monthForm6')) {
                        this.capexInformationForm.addControl('monthForm6', this.monthForm6);
                      }
                    }
                    else if (i == 7) {
                      if (resp.length != 0) {

                        for (let j = 0; j < resp.length; j++) {
                          const controlMonth7 = this.monthForm7.get('monthForm_list') as FormArray;
                          if (j == 0) {
                            controlMonth7.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                            controlMonth7.at(0).get('m1').patchValue(resp[0].jan);
                            controlMonth7.at(0).get('m2').patchValue(resp[0].feb);
                            controlMonth7.at(0).get('m3').patchValue(resp[0].mar);
                            controlMonth7.at(0).get('m4').patchValue(resp[0].apr);
                            controlMonth7.at(0).get('m5').patchValue(resp[0].may);
                            controlMonth7.at(0).get('m6').patchValue(resp[0].jun);
                            controlMonth7.at(0).get('m7').patchValue(resp[0].jul);
                            controlMonth7.at(0).get('m8').patchValue(resp[0].aug);
                            controlMonth7.at(0).get('m9').patchValue(resp[0].sep);
                            controlMonth7.at(0).get('m10').patchValue(resp[0].oct);
                            controlMonth7.at(0).get('m11').patchValue(resp[0].nov);
                            controlMonth7.at(0).get('m12').patchValue(resp[0].dec);
                            controlMonth7.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                            controlMonth7.at(0).get('flagFirst_row').patchValue(true);
                          }
                          else {
                            this.addMonth_withvalue8(resp[j].investmentCost,
                              resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                              resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                              resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                              '', resp[j].investmentCostFx)
                          }
                        }
                        this.ChangingValue_month_table8(this.year_m[i]);

                      }
                      if (!this.capexInformationForm.get('monthForm7')) {
                        this.capexInformationForm.addControl('monthForm7', this.monthForm7);
                      }
                    }
                    else if (i == 8) {
                      if (resp.length != 0) {

                        for (let j = 0; j < resp.length; j++) {
                          const controlMonth8 = this.monthForm8.get('monthForm_list') as FormArray;
                          if (j == 0) {
                            controlMonth8.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                            controlMonth8.at(0).get('m1').patchValue(resp[0].jan);
                            controlMonth8.at(0).get('m2').patchValue(resp[0].feb);
                            controlMonth8.at(0).get('m3').patchValue(resp[0].mar);
                            controlMonth8.at(0).get('m4').patchValue(resp[0].apr);
                            controlMonth8.at(0).get('m5').patchValue(resp[0].may);
                            controlMonth8.at(0).get('m6').patchValue(resp[0].jun);
                            controlMonth8.at(0).get('m7').patchValue(resp[0].jul);
                            controlMonth8.at(0).get('m8').patchValue(resp[0].aug);
                            controlMonth8.at(0).get('m9').patchValue(resp[0].sep);
                            controlMonth8.at(0).get('m10').patchValue(resp[0].oct);
                            controlMonth8.at(0).get('m11').patchValue(resp[0].nov);
                            controlMonth8.at(0).get('m12').patchValue(resp[0].dec);
                            controlMonth8.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                            controlMonth8.at(0).get('flagFirst_row').patchValue(true);
                          }
                          else {
                            this.addMonth_withvalue9(resp[j].investmentCost,
                              resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                              resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                              resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                              '', resp[j].investmentCostFx)
                          }
                        }

                        this.ChangingValue_month_table9(this.year_m[i]);

                      }
                      if (!this.capexInformationForm.get('monthForm8')) {
                        this.capexInformationForm.addControl('monthForm8', this.monthForm8);
                      }
                    }
                    else if (i == 9) {
                      if (resp.length != 0) {

                        for (let j = 0; j < resp.length; j++) {
                          const controlMonth9 = this.monthForm9.get('monthForm_list') as FormArray;
                          if (j == 0) {
                            controlMonth9.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                            controlMonth9.at(0).get('m1').patchValue(resp[0].jan);
                            controlMonth9.at(0).get('m2').patchValue(resp[0].feb);
                            controlMonth9.at(0).get('m3').patchValue(resp[0].mar);
                            controlMonth9.at(0).get('m4').patchValue(resp[0].apr);
                            controlMonth9.at(0).get('m5').patchValue(resp[0].may);
                            controlMonth9.at(0).get('m6').patchValue(resp[0].jun);
                            controlMonth9.at(0).get('m7').patchValue(resp[0].jul);
                            controlMonth9.at(0).get('m8').patchValue(resp[0].aug);
                            controlMonth9.at(0).get('m9').patchValue(resp[0].sep);
                            controlMonth9.at(0).get('m10').patchValue(resp[0].oct);
                            controlMonth9.at(0).get('m11').patchValue(resp[0].nov);
                            controlMonth9.at(0).get('m12').patchValue(resp[0].dec);
                            controlMonth9.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                            controlMonth9.at(0).get('flagFirst_row').patchValue(true);
                          }
                          else {
                            this.addMonth_withvalue10(resp[j].investmentCost,
                              resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                              resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                              resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                              '', resp[j].investmentCostFx)
                          }
                        }

                        this.ChangingValue_month_table10(this.year_m[i]);


                      }
                      if (!this.capexInformationForm.get('monthForm9')) {
                        this.capexInformationForm.addControl('monthForm9', this.monthForm9);
                      }

                    }
                  })
                }


              })


              this.IsShowRevisionButton = false;
              this.capexInformationForm.disable();
              //set flag capex loaded
              this.progressService.capexLoading = true;
            }
            this.CHk_validate();
          });
        }
      });

    }
  }

  getAnnualForm(form: string) {
    return this.capexInformationForm.get(form);

  }

  GetOwnerID(systemName) {
    this.capexService
      .GetCodeOfCostCenterVP(systemName)
      .subscribe((response) => {
        this.capexInformationForm.controls["costCenterOfVP"].setValue(systemName);
        if (systemName != '') {
          sessionStorage.setItem("ViceOwner", systemName);
          this.selectionVP = systemName;
          this.capexInformationForm.controls["costCenterOfVP"].setValue(systemName);
        } else {
          this.selectionVP = sessionStorage.getItem('ViceOwner');
          this.capexInformationForm.controls["costCenterOfVP"].setValue(sessionStorage.getItem('ViceOwner'));
        }
        if (response.length != 0) {
          this.capexInformationForm.controls["codeCostCenterOfVP"].setValue(response[0].mainPositionCostCenter);
        }
        this.CHk_validate();
      });
  }
  /////// This is new /////////////////

  addSellingPoint() {
    this.annualForm_.push(this.fb.group({
      currencyTitle: '',
      y1: '',
      y2: '',
      y3: '',
      y4: '',
      y5: '',
      y6: '',
      y7: '',
      y8: '',
      y9: '',
      y10: '',
      overall: '',
      currencyFx: '',
      flagFirst_row: false
    }));
  }


  addSellingPoint_withvalue(currencyTitle, y1, y2, y3, y4, y5, y6, y7, y8, y9, y10,
    overall, currencyFx) {
    this.annualForm_.push(this.fb.group({
      currencyTitle: currencyTitle,
      y1: y1,
      y2: y2,
      y3: y3,
      y4: y4,
      y5: y5,
      y6: y6,
      y7: y7,
      y8: y8,
      y9: y9,
      y10: y10,
      overall: overall,
      currencyFx: currencyFx,
      flagFirst_row: false
    }));
  }

  getPoolAva(event) {
    let projectCost = this.capexInformationForm.get('projectCost').value;

    if (this.initiativeService.isAddmore) {
      let additionalCost = this.capexInformationForm.get('additionalCost').value;
      if (parseFloat(additionalCost) > parseFloat(event.availableBudget)) {
        this.capexInformationForm.get('poolID').setValue(null);
        this.capexInformationForm.get('availableBudget').setValue(null);
        this.swalTool.PoolBudgetError(parseFloat(event.availableBudget));
      } else {
        this.AvailableBudget = event.availableBudget;
        this.capexInformationForm.get('availableBudget').setValue(parseFloat(event.availableBudget));
      }
    } else {
      if (parseFloat(projectCost) > parseFloat(event.availableBudget)) {
        this.capexInformationForm.get('poolID').setValue(null);
        this.capexInformationForm.get('availableBudget').setValue(null);
        this.swalTool.PoolBudgetError(parseFloat(event.availableBudget));
      } else {
        this.AvailableBudget = event.availableBudget;
        this.capexInformationForm.get('availableBudget').setValue(parseFloat(event.availableBudget));
      }
    }
    // if (event.availableBudget == 0) {
    //   this.AvailableBudget = event.projectCost;
    // } else {
    //   this.AvailableBudget = event.availableBudget;
    // }
  }

  changeRate(value, i) {
    const control = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    let fxRate = this.currencyList.find(fx => fx.currencyMillionName == control.at(i).get('currencyTitle').value);
    control.at(i).get('currencyFx').patchValue(fxRate.fxRate);
    if (control.at(i).get('currencyTitle').value != "" && control.at(i).get('currencyTitle').value != undefined &&
      control.at(i).get('currencyFx').value != "" && control.at(i).get('currencyFx').value != undefined) {
      const control1 = this.capexInformationForm.get('monthForm0')?.get('monthForm_list') as FormArray;
      if (control1.at(i) == undefined) {

        // this.addMonth_withvalue1(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
        //   '', '', '', '', '', '', '', '', '', control.at(i).get('currencyFx').value);
        this.addMonth_withvalue1(fxRate.currencyName, '', '', '', '',
          '', '', '', '', '', '', '', '', '', fxRate.fxRate);
      }
      else {
        control1.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
        control1.at(i).get('currencyFx').patchValue(fxRate.fxRate);
      }
      const control2 = this.capexInformationForm.get('monthForm1')?.get('monthForm_list') as FormArray;
      if (control2) {
        if (control2.at(i) == undefined) {
          this.addMonth_withvalue2(fxRate.currencyName, '', '', '', '',
            '', '', '', '', '', '', '', '', '', fxRate.fxRate);
        }
        else {
          control2.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
          control2.at(i).get('currencyFx').patchValue(fxRate.fxRate);
        }
      }
      const control3 = this.capexInformationForm.get('monthForm2')?.get('monthForm_list') as FormArray;
      if (control3) {

        if (control3.at(i) == undefined) {
          this.addMonth_withvalue3(fxRate.currencyName, '', '', '', '',
            '', '', '', '', '', '', '', '', '', fxRate.fxRate);
        }
        else {
          control3.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
          control3.at(i).get('currencyFx').patchValue(fxRate.fxRate);
        }
      }
      const control4 = this.capexInformationForm.get('monthForm3')?.get('monthForm_list') as FormArray;
      if (control4) {

        if (control4.at(i) == undefined) {
          this.addMonth_withvalue4(fxRate.currencyName, '', '', '', '',
            '', '', '', '', '', '', '', '', '', fxRate.fxRate);
        }
        else {
          control4.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
          control4.at(i).get('currencyFx').patchValue(fxRate.fxRate);
        }
      }
      const control5 = this.capexInformationForm.get('monthForm4')?.get('monthForm_list') as FormArray;
      if (control5) {

        if (control5.at(i) == undefined) {
          this.addMonth_withvalue5(fxRate.currencyName, '', '', '', '',
            '', '', '', '', '', '', '', '', '', fxRate.fxRate);
        }
        else {
          control5.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
          control5.at(i).get('currencyFx').patchValue(fxRate.fxRate);
        }
      }
      const control6 = this.capexInformationForm.get('monthForm5')?.get('monthForm_list') as FormArray;
      if (control6) {

        if (control6.at(i) == undefined) {
          this.addMonth_withvalue6(fxRate.currencyName, '', '', '', '',
            '', '', '', '', '', '', '', '', '', fxRate.fxRate);
        }
        else {
          control6.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
          control6.at(i).get('currencyFx').patchValue(fxRate.fxRate);
        }
      }
      const control7 = this.capexInformationForm.get('monthForm6')?.get('monthForm_list') as FormArray;
      if (control7) {

        if (control7.at(i) == undefined) {
          this.addMonth_withvalue7(fxRate.currencyName, '', '', '', '',
            '', '', '', '', '', '', '', '', '', fxRate.fxRate);
        }
        else {
          control7.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
          control7.at(i).get('currencyFx').patchValue(fxRate.fxRate);
        }
      }
      const control8 = this.capexInformationForm.get('monthForm7')?.get('monthForm_list') as FormArray;
      if (control8) {

        if (control8.at(i) == undefined) {
          this.addMonth_withvalue8(fxRate.currencyName, '', '', '', '',
            '', '', '', '', '', '', '', '', '', fxRate.fxRate);
        }
        else {
          control8.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
          control8.at(i).get('currencyFx').patchValue(fxRate.fxRate);
        }
      }
      const control9 = this.capexInformationForm.get('monthForm8')?.get('monthForm_list') as FormArray;
      if (control9) {

        if (control9.at(i) == undefined) {
          this.addMonth_withvalue9(fxRate.currencyName, '', '', '', '',
            '', '', '', '', '', '', '', '', '', fxRate.fxRate);
        }
        else {
          control9.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
          control9.at(i).get('currencyFx').patchValue(fxRate.fxRate);
        }
      }
      const control10 = this.capexInformationForm.get('monthForm9')?.get('monthForm_list') as FormArray;
      if (control10) {

        if (control10.at(i) == undefined) {
          this.addMonth_withvalue10(fxRate.currencyName, '', '', '', '',
            '', '', '', '', '', '', '', '', '', fxRate.fxRate);
        }
        else {
          control10.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
          control10.at(i).get('currencyFx').patchValue(fxRate.fxRate);
        }
      }
    }

  }

  addMonth_withvalue1(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, currencyFx) {
    this.monthForm0_.push(this.fb.group({
      currencyTitle: currencyTitle,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      m6: m6,
      m7: m7,
      m8: m8,
      m9: m9,
      m10: m10,
      m11: m11,
      m12: m12,
      overall: overall,
      currencyFx: currencyFx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue2(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, currencyFx) {
    this.monthForm1_.push(this.fb.group({
      currencyTitle: currencyTitle,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      m6: m6,
      m7: m7,
      m8: m8,
      m9: m9,
      m10: m10,
      m11: m11,
      m12: m12,
      overall: overall,
      currencyFx: currencyFx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue3(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, currencyFx) {
    this.monthForm2_.push(this.fb.group({
      currencyTitle: currencyTitle,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      m6: m6,
      m7: m7,
      m8: m8,
      m9: m9,
      m10: m10,
      m11: m11,
      m12: m12,
      overall: overall,
      currencyFx: currencyFx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue4(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, currencyFx) {
    this.monthForm3_.push(this.fb.group({
      currencyTitle: currencyTitle,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      m6: m6,
      m7: m7,
      m8: m8,
      m9: m9,
      m10: m10,
      m11: m11,
      m12: m12,
      overall: overall,
      currencyFx: currencyFx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue5(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, currencyFx) {
    this.monthForm4_.push(this.fb.group({
      currencyTitle: currencyTitle,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      m6: m6,
      m7: m7,
      m8: m8,
      m9: m9,
      m10: m10,
      m11: m11,
      m12: m12,
      overall: overall,
      currencyFx: currencyFx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue6(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, currencyFx) {
    this.monthForm5_.push(this.fb.group({
      currencyTitle: currencyTitle,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      m6: m6,
      m7: m7,
      m8: m8,
      m9: m9,
      m10: m10,
      m11: m11,
      m12: m12,
      overall: overall,
      currencyFx: currencyFx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue7(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, currencyFx) {
    this.monthForm6_.push(this.fb.group({
      currencyTitle: currencyTitle,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      m6: m6,
      m7: m7,
      m8: m8,
      m9: m9,
      m10: m10,
      m11: m11,
      m12: m12,
      overall: overall,
      currencyFx: currencyFx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue8(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, currencyFx) {
    this.monthForm7_.push(this.fb.group({
      currencyTitle: currencyTitle,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      m6: m6,
      m7: m7,
      m8: m8,
      m9: m9,
      m10: m10,
      m11: m11,
      m12: m12,
      overall: overall,
      currencyFx: currencyFx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue9(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, currencyFx) {
    this.monthForm8_.push(this.fb.group({
      currencyTitle: currencyTitle,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      m6: m6,
      m7: m7,
      m8: m8,
      m9: m9,
      m10: m10,
      m11: m11,
      m12: m12,
      overall: overall,
      currencyFx: currencyFx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue10(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, currencyFx) {
    this.monthForm9_.push(this.fb.group({
      currencyTitle: currencyTitle,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      m6: m6,
      m7: m7,
      m8: m8,
      m9: m9,
      m10: m10,
      m11: m11,
      m12: m12,
      overall: overall,
      currencyFx: currencyFx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  deleteSellingPoint(index) {
    this.annualForm_.removeAt(index);
    const control = this.AnnualForm.get('annualForm_list') as FormArray;
    const AnnualTotal1 = this.AnnualForm.get('AnnualTotal1') as FormArray;
    let xx = +control.length
    let AnnualTotal_overall = 0;
    for (let j = 1; j <= 10; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {
        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
              total = total + (+control.at(i).get('y' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
            total = total + +control.at(i).get('y' + j).value;
          }
        }
      }
      this.AnnualForm.controls['AnnualTotal' + j].setValue(total);
      AnnualTotal_overall = AnnualTotal_overall + +total;
      this.AnnualTotal_overall_tmp = +AnnualTotal_overall.toFixed(2);
      this.totalAnual[this.YearTable_capex[j - 1].columnname] = total;
    }

    this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall);

    //========================== month ==========================================

    this.monthForm0_.removeAt(index);
    this.monthForm1_.removeAt(index);
    this.monthForm2_.removeAt(index);
    this.monthForm3_.removeAt(index);
    this.monthForm4_.removeAt(index);
    this.monthForm5_.removeAt(index);
    this.monthForm6_.removeAt(index);
    this.monthForm7_.removeAt(index);
    this.monthForm8_.removeAt(index);
    this.monthForm9_.removeAt(index);

    if (this.year_m.length != 0) {
      for (let x = 0; x < this.year_m.length; x++) {
        this.ChangingValue_month_table1(this.year_m[x]);
        this.ChangingValue_month_table2(this.year_m[x]);
        this.ChangingValue_month_table3(this.year_m[x]);
        this.ChangingValue_month_table4(this.year_m[x]);
        this.ChangingValue_month_table5(this.year_m[x]);
        this.ChangingValue_month_table6(this.year_m[x]);
        this.ChangingValue_month_table7(this.year_m[x]);
        this.ChangingValue_month_table8(this.year_m[x]);
        this.ChangingValue_month_table9(this.year_m[x]);
        this.ChangingValue_month_table10(this.year_m[x]);
      }
    }
  }

  ChangingValue_fx(ii) {
    const control = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const AnnualTotal1 = this.capexInformationForm.get('AnnualForm').get('AnnualTotal1') as FormArray;
    let xx = +control.length
    let AnnualTotal_overall = 0;
    for (let i = 0; i < xx; i++) {
      let overall = 0;
      for (let j = 1; j <= 10; j++) {
        if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
          overall = overall + +control.at(i).get('y' + j).value;
        }
      }
      control.at(i).get('overall').patchValue(+overall.toFixed(2));
    }

    for (let j = 1; j <= 10; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {
        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
              total = total + (+control.at(i).get('y' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
            total = total + +control.at(i).get('y' + j).value;
          }
        }

      }
      this.AnnualForm.controls['AnnualTotal' + j].setValue(total.toFixed(2));
      AnnualTotal_overall = AnnualTotal_overall + +total.toFixed(2);
      this.AnnualTotal_overall_tmp = +AnnualTotal_overall.toFixed(2);
      this.totalAnual[this.YearTable_capex[j - 1].columnname] = total.toFixed(2);


    }

    this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall);

    if (control.at(ii).get('currencyTitle').value != "" && control.at(ii).get('currencyTitle').value != undefined &&
      control.at(ii).get('currencyFx').value != "" && control.at(ii).get('currencyFx').value != undefined) {
      const control1 = this.monthForm0.get('monthForm_list') as FormArray;
      if (control1.at(ii) == undefined) {
        this.addMonth_withvalue1(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('currencyFx').value);
      }
      else {
        control1.at(ii).get('currencyFx').patchValue(control.at(ii).get('currencyFx').value);
      }

      const control2 = this.monthForm1.get('monthForm_list') as FormArray;
      if (control2.at(ii) == undefined) {
        this.addMonth_withvalue2(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('currencyFx').value);
      }
      else {
        control2.at(ii).get('currencyFx').patchValue(control.at(ii).get('currencyFx').value);
      }

      const control3 = this.monthForm2.get('monthForm_list') as FormArray;
      if (control3.at(ii) == undefined) {
        this.addMonth_withvalue3(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('currencyFx').value);
      }
      else {
        control3.at(ii).get('currencyFx').patchValue(control.at(ii).get('currencyFx').value);
      }

      const control4 = this.monthForm3.get('monthForm_list') as FormArray;
      if (control4.at(ii) == undefined) {
        this.addMonth_withvalue4(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('currencyFx').value);
      }
      else {
        control4.at(ii).get('currencyFx').patchValue(control.at(ii).get('currencyFx').value);
      }

      const control5 = this.monthForm4.get('monthForm_list') as FormArray;
      if (control5.at(ii) == undefined) {
        this.addMonth_withvalue5(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('currencyFx').value);
      }
      else {
        control5.at(ii).get('currencyFx').patchValue(control.at(ii).get('currencyFx').value);
      }

      const control6 = this.monthForm5.get('monthForm_list') as FormArray;
      if (control6.at(ii) == undefined) {
        this.addMonth_withvalue6(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('currencyFx').value);
      }
      else {
        control6.at(ii).get('currencyFx').patchValue(control.at(ii).get('currencyFx').value);
      }

      const control7 = this.monthForm6.get('monthForm_list') as FormArray;
      if (control7.at(ii) == undefined) {
        this.addMonth_withvalue7(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('currencyFx').value);
      }
      else {
        control7.at(ii).get('currencyFx').patchValue(control.at(ii).get('currencyFx').value);
      }

      const control8 = this.monthForm7.get('monthForm_list') as FormArray;
      if (control8.at(ii) == undefined) {
        this.addMonth_withvalue8(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('currencyFx').value);
      }
      else {
        control8.at(ii).get('currencyFx').patchValue(control.at(ii).get('currencyFx').value);
      }

      const control9 = this.monthForm8.get('monthForm_list') as FormArray;
      if (control9.at(ii) == undefined) {
        this.addMonth_withvalue9(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('currencyFx').value);
      }
      else {
        control9.at(ii).get('currencyFx').patchValue(control.at(ii).get('currencyFx').value);
      }

      const control10 = this.monthForm9.get('monthForm_list') as FormArray;
      if (control10.at(ii) == undefined) {
        this.addMonth_withvalue10(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('currencyFx').value);
      }
      else {
        control10.at(ii).get('currencyFx').patchValue(control.at(ii).get('currencyFx').value);
      }

      if (this.year_m.length != 0) {
        for (let x = 0; x < this.year_m.length; x++) {
          this.ChangingValue_month_table1(this.year_m[x]);
          this.ChangingValue_month_table2(this.year_m[x]);
          this.ChangingValue_month_table3(this.year_m[x]);
          this.ChangingValue_month_table4(this.year_m[x]);
          this.ChangingValue_month_table5(this.year_m[x]);
          this.ChangingValue_month_table6(this.year_m[x]);
          this.ChangingValue_month_table7(this.year_m[x]);
          this.ChangingValue_month_table8(this.year_m[x]);
          this.ChangingValue_month_table9(this.year_m[x]);
          this.ChangingValue_month_table10(this.year_m[x]);
        }
      }
    }
    this.CHk_validate();
  }

  ChangingValue(year_name) {
    const control = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    let xx = control.length;
    let AnnualTotal_overall = 0;
    for (let i = 0; i < xx; i++) {
      let overall = 0;

      for (let j = 1; j <= 10; j++) {
        if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
          overall = overall + +control.at(i).get('y' + j).value;
          overall = +overall.toFixed(2);
        }
      }
      control.at(i).get('overall').patchValue(overall.toFixed(2));
    }

    for (let j = 1; j <= 10; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {
        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
              total = total + (+control.at(i).get('y' + j).value * +control.at(i).get('currencyFx').value);
              total = +total.toFixed(2);
            }
          }
        }
        else {
          if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
            total = total + +control.at(i).get('y' + j).value;
            total = +total.toFixed(2);
          }
        }
      }
      this.capexInformationForm.get('AnnualForm').get('AnnualTotal' + j).setValue(total.toFixed(2));
      AnnualTotal_overall = AnnualTotal_overall + +total.toFixed(2);
      AnnualTotal_overall = +AnnualTotal_overall.toFixed(2);
      this.AnnualTotal_overall_tmp = AnnualTotal_overall.toFixed(2);
      this.totalAnual[this.YearTable_capex[j - 1].columnname] = total.toFixed(2);
    }

    this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').setValue(AnnualTotal_overall.toFixed(2));

    if (this.initiativeService.isAddmore) {
      if (+AnnualTotal_overall != 0 && +AnnualTotal_overall == +this.additionalCost) {
        this.flag_fail = "no";
      } else if (+AnnualTotal_overall > +this.additionalCost) {
        this.initiativeService.viewMode ? false : this.swalTool.SumCost_3();
        this.flag_fail = "yes";
      } else {
        this.flag_fail = "yes";
      }
    } else if (this.initiativeService.isReturn) {
      if (+AnnualTotal_overall != 0 && +AnnualTotal_overall == +this.returnCost) {
        this.flag_fail = "no";
      } else if (+AnnualTotal_overall > +this.returnCost) {
        this.initiativeService.viewMode ? false : this.swalTool.SumCost_3();
        this.flag_fail = "yes";
      } else {
        this.flag_fail = "yes";
      }
    } else {
      if (+AnnualTotal_overall != 0 && +AnnualTotal_overall == +this.ProjectCost) {
        this.flag_fail = "no";
      } else if (+AnnualTotal_overall > +this.ProjectCost) {
        this.initiativeService.viewMode ? false : this.swalTool.SumCost_3();
        this.flag_fail = "yes";
      } else {
        this.flag_fail = "yes";
      }
    }
    const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
    let xx_ = +control_month0.length
    for (let i = 0; i < xx_; i++) {
      let overall = 0;
      if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {
        control_month0.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
      }
      else {
        control_month0.at(i).get('flag_alert').patchValue(false);

      }
    }

    const control_month1 = this.monthForm1.get('monthForm_list') as FormArray;
    xx_ = +control_month1.length
    for (let i = 0; i < xx_; i++) {
      let overall = 0;
      if (control_month1.at(i).get('overall').value != "") {

        if (control_month1.at(i).get('overall').value != control_annual.at(i).get('y2').value * 1000000) {
          control_month1.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        }
        else {
          control_month1.at(i).get('flag_alert').patchValue(false);
        }
      }
    }

    const control_month2 = this.monthForm2.get('monthForm_list') as FormArray;
    xx_ = +control_month2.length
    for (let i = 0; i < xx_; i++) {
      let overall = 0;
      if (control_month2.at(i).get('overall').value != "") {
        if (control_month2.at(i).get('overall').value != control_annual.at(i).get('y3').value * 1000000) {
          control_month2.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        }
        else {
          control_month2.at(i).get('flag_alert').patchValue(false);
        }
      }
    }

    const control_month3 = this.monthForm3.get('monthForm_list') as FormArray;
    xx_ = +control_month3.length
    for (let i = 0; i < xx_; i++) {
      let overall = 0;
      if (control_month3.at(i).get('overall').value) {
        if (control_month3.at(i).get('overall').value != control_annual.at(i).get('y4').value * 1000000) {
          control_month3.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        }
        else {
          control_month3.at(i).get('flag_alert').patchValue(false);
        }
      }
    }

    const control_month4 = this.monthForm4.get('monthForm_list') as FormArray;
    xx_ = +control_month4.length
    for (let i = 0; i < xx_; i++) {
      let overall = 0;
      if (control_month4.at(i).get('overall').value != "") {
        if (control_month4.at(i).get('overall').value != control_annual.at(i).get('y5').value * 1000000) {
          control_month4.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        }
        else {
          control_month4.at(i).get('flag_alert').patchValue(false);
        }
      }
    }

    const control_month5 = this.monthForm5.get('monthForm_list') as FormArray;
    xx_ = +control_month5.length
    for (let i = 0; i < xx_; i++) {
      let overall = 0;
      if (control_month5.at(i).get('overall').value != "") {
        if (control_month5.at(i).get('overall').value != control_annual.at(i).get('y6').value * 1000000) {
          control_month5.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        }
        else {
          control_month5.at(i).get('flag_alert').patchValue(false);
        }
      }
    }

    const control_month6 = this.monthForm6.get('monthForm_list') as FormArray;
    xx_ = +control_month6.length
    for (let i = 0; i < xx_; i++) {
      let overall = 0;
      if (control_month6.at(i).get('overall').value) {
        if (control_month6.at(i).get('overall').value != control_annual.at(i).get('y7').value * 1000000) {
          control_month6.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        }
        else {
          control_month6.at(i).get('flag_alert').patchValue(false);
        }
      }
    }

    const control_month7 = this.monthForm7.get('monthForm_list') as FormArray;
    xx_ = +control_month7.length
    for (let i = 0; i < xx_; i++) {
      let overall = 0;
      if (control_month7.at(i).get('overall').value) {
        if (control_month7.at(i).get('overall').value != control_annual.at(i).get('y8').value * 1000000) {
          control_month7.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        }
        else {
          control_month7.at(i).get('flag_alert').patchValue(false);
        }
      }
    }

    const control_month8 = this.monthForm8.get('monthForm_list') as FormArray;
    xx_ = +control_month8.length
    for (let i = 0; i < xx_; i++) {
      let overall = 0;
      if (control_month8.at(i).get('overall').value != "") {
        if (control_month8.at(i).get('overall').value != control_annual.at(i).get('y9').value * 1000000) {
          control_month8.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        }
        else {
          control_month8.at(i).get('flag_alert').patchValue(false);
        }
      }
    }

    const control_month9 = this.monthForm9.get('monthForm_list') as FormArray;
    xx_ = +control_month9.length
    for (let i = 0; i < xx_; i++) {
      let overall = 0;
      if (control_month9.at(i).get('overall').value != "") {
        if (control_month9.at(i).get('overall').value != control_annual.at(i).get('y10').value * 1000000) {
          control_month9.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        }
        else {
          control_month9.at(i).get('flag_alert').patchValue(false);
        }
      }
    }
    this.CHk_validate();
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  initial_year() {
    //====================== Year Table ======================

    this.AnnualForm.reset();
    this.AnnualForm = this.fb.group({
      AnnualTotal1: '',
      AnnualTotal2: '',
      AnnualTotal3: '',
      AnnualTotal4: '',
      AnnualTotal5: '',
      AnnualTotal6: '',
      AnnualTotal7: '',
      AnnualTotal8: '',
      AnnualTotal9: '',
      AnnualTotal10: '',
      AnnualTotal11: '',
      AnnualTotal_overall: '',
      TotalAdditional_total: '',
      annualForm_list: this.fb.array([this.fb.group({
        currencyTitle: 'Million Baht',
        y1: '',
        y2: '',
        y3: '',
        y4: '',
        y5: '',
        y6: '',
        y7: '',
        y8: '',
        y9: '',
        y10: '',
        currencyFx: '',
        overall: '',
        flagFirst_row: true
      })])
    })

    this.YearTable_capex = [];
    this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
    this.StartYear_1 = this.year_now;

    for (let i = 0; i < 10; i++) {
      if (this.StartingDate != null && this.ProjecctComRun != null && this.RequestIniNoDate != null
        && this.StartingDate != "" && this.ProjecctComRun != "" && this.RequestIniNoDate != "") {
        if (+this.StartYear_1 + i <= +this.EndYear_1) {
          this.YearTable_capex.push({
            columnname: +this.StartYear_1 + i,
            isEdit: this.capexDisableField ? true : false
          })
        }
        else {
          this.YearTable_capex.push({
            columnname: +this.StartYear_1 + i,
            isEdit: true
          })
        }
      }
      else {
        this.YearTable_capex.push({
          columnname: +this.StartYear_1 + i,
          isEdit: true
        })
      }
    }

    ////add by oat disable
    this.DisableCapexForm();
  }

  initial_month() {
    //====================== Month Table ======================
    this.diffYear = +this.EndYear_1 - +this.StartYear_1;
    let startMonth = this.RequestIniNoDate ? new Date(this.RequestIniNoDate).getMonth() + 1 : 0;
    let endMonth = this.ProjecctComRun ? new Date(this.ProjecctComRun).getMonth() + 1 : 0;
    this.year_m = [];
    for (let i = 0; i <= this.diffYear; i++) {
      this.year_m.push(+this.StartYear_1 + +i);
    }
    this.monthList_1 = [];
    this.monthList_x = [];
    this.monthList_last = [];
    if (this.diffYear == 0) {
      for (let i = 1; i <= 12; i++) {
        if (i < +startMonth) {
          this.monthList_1.push({
            columnname: this.months[i],
            readOnly: true
          })
        }
        else if (i > +endMonth) {
          this.monthList_1.push({
            columnname: this.months[i],
            readOnly: true
          })
        }
        else {
          this.monthList_1.push({
            columnname: this.months[i],
            readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
          })
        }
      }
    }
    else if (this.diffYear == 1) {
      for (let i = 1; i <= 12; i++) {
        if (i < +startMonth) {
          this.monthList_1.push({
            columnname: this.months[i],
            readOnly: true
          })
        }
        else {
          this.monthList_1.push({
            columnname: this.months[i],
            readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
          })
        }

        if (i > +endMonth) {
          this.monthList_last.push({
            columnname: this.months[i],
            readOnly: true
          })
        }
        else {
          this.monthList_last.push({
            columnname: this.months[i],
            readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
          })
        }
      }
    }
    else {
      for (let i = 1; i <= 12; i++) {
        if (i < +startMonth) {
          this.monthList_1.push({
            columnname: this.months[i],
            readOnly: true
          })
        }
        else {
          this.monthList_1.push({
            columnname: this.months[i],
            readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
          })
        }

        this.monthList_x.push({
          columnname: this.months[i],
          readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
        })

        if (i > +endMonth) {
          this.monthList_last.push({
            columnname: this.months[i],
            readOnly: true
          })
        }
        else {
          this.monthList_last.push({
            columnname: this.months[i],
            readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
          })
        }
      }
    }

    this.monthForm0 = this.fb.group({
      monthTotal1: '',
      monthTotal2: '',
      monthTotal3: '',
      monthTotal4: '',
      monthTotal5: '',
      monthTotal6: '',
      monthTotal7: '',
      monthTotal8: '',
      monthTotal9: '',
      monthTotal10: '',
      monthTotal11: '',
      monthTotal12: '',
      monthTotal_overall: '',
      monthForm_list: this.fb.array([this.fb.group({
        currencyTitle: 'Baht',
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        m6: '',
        m7: '',
        m8: '',
        m9: '',
        m10: '',
        m11: '',
        m12: '',
        overall: '',
        currencyFx: '',
        flag_alert: false,
        flagFirst_row: true
      })])
    })

    this.monthForm1 = this.fb.group({
      monthTotal1: '',
      monthTotal2: '',
      monthTotal3: '',
      monthTotal4: '',
      monthTotal5: '',
      monthTotal6: '',
      monthTotal7: '',
      monthTotal8: '',
      monthTotal9: '',
      monthTotal10: '',
      monthTotal11: '',
      monthTotal12: '',
      monthTotal_overall: '',
      monthForm_list: this.fb.array([this.fb.group({
        currencyTitle: 'Baht',
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        m6: '',
        m7: '',
        m8: '',
        m9: '',
        m10: '',
        m11: '',
        m12: '',
        overall: '',
        currencyFx: '',
        flag_alert: false,
        flagFirst_row: true
      })])
    })

    this.monthForm2 = this.fb.group({
      monthTotal1: '',
      monthTotal2: '',
      monthTotal3: '',
      monthTotal4: '',
      monthTotal5: '',
      monthTotal6: '',
      monthTotal7: '',
      monthTotal8: '',
      monthTotal9: '',
      monthTotal10: '',
      monthTotal11: '',
      monthTotal12: '',
      monthTotal_overall: '',
      monthForm_list: this.fb.array([this.fb.group({
        currencyTitle: 'Baht',
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        m6: '',
        m7: '',
        m8: '',
        m9: '',
        m10: '',
        m11: '',
        m12: '',
        overall: '',
        currencyFx: '',
        flag_alert: false,
        flagFirst_row: true
      })])
    })

    this.monthForm3 = this.fb.group({
      monthTotal1: '',
      monthTotal2: '',
      monthTotal3: '',
      monthTotal4: '',
      monthTotal5: '',
      monthTotal6: '',
      monthTotal7: '',
      monthTotal8: '',
      monthTotal9: '',
      monthTotal10: '',
      monthTotal11: '',
      monthTotal12: '',
      monthTotal_overall: '',
      monthForm_list: this.fb.array([this.fb.group({
        currencyTitle: 'Baht',
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        m6: '',
        m7: '',
        m8: '',
        m9: '',
        m10: '',
        m11: '',
        m12: '',
        overall: '',
        currencyFx: '',
        flag_alert: false,
        flagFirst_row: true
      })])
    })

    this.monthForm4 = this.fb.group({
      monthTotal1: '',
      monthTotal2: '',
      monthTotal3: '',
      monthTotal4: '',
      monthTotal5: '',
      monthTotal6: '',
      monthTotal7: '',
      monthTotal8: '',
      monthTotal9: '',
      monthTotal10: '',
      monthTotal11: '',
      monthTotal12: '',
      monthTotal_overall: '',
      monthForm_list: this.fb.array([this.fb.group({
        currencyTitle: 'Baht',
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        m6: '',
        m7: '',
        m8: '',
        m9: '',
        m10: '',
        m11: '',
        m12: '',
        overall: '',
        currencyFx: '',
        flag_alert: false,
        flagFirst_row: true
      })])
    })

    this.monthForm5 = this.fb.group({
      monthTotal1: '',
      monthTotal2: '',
      monthTotal3: '',
      monthTotal4: '',
      monthTotal5: '',
      monthTotal6: '',
      monthTotal7: '',
      monthTotal8: '',
      monthTotal9: '',
      monthTotal10: '',
      monthTotal11: '',
      monthTotal12: '',
      monthTotal_overall: '',
      monthForm_list: this.fb.array([this.fb.group({
        currencyTitle: 'Baht',
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        m6: '',
        m7: '',
        m8: '',
        m9: '',
        m10: '',
        m11: '',
        m12: '',
        overall: '',
        currencyFx: '',
        flag_alert: false,
        flagFirst_row: true
      })])
    })

    this.monthForm6 = this.fb.group({
      monthTotal1: '',
      monthTotal2: '',
      monthTotal3: '',
      monthTotal4: '',
      monthTotal5: '',
      monthTotal6: '',
      monthTotal7: '',
      monthTotal8: '',
      monthTotal9: '',
      monthTotal10: '',
      monthTotal11: '',
      monthTotal12: '',
      monthTotal_overall: '',
      monthForm_list: this.fb.array([this.fb.group({
        currencyTitle: 'Baht',
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        m6: '',
        m7: '',
        m8: '',
        m9: '',
        m10: '',
        m11: '',
        m12: '',
        overall: '',
        currencyFx: '',
        flag_alert: false,
        flagFirst_row: true
      })])
    })

    this.monthForm7 = this.fb.group({
      monthTotal1: '',
      monthTotal2: '',
      monthTotal3: '',
      monthTotal4: '',
      monthTotal5: '',
      monthTotal6: '',
      monthTotal7: '',
      monthTotal8: '',
      monthTotal9: '',
      monthTotal10: '',
      monthTotal11: '',
      monthTotal12: '',
      monthTotal_overall: '',
      monthForm_list: this.fb.array([this.fb.group({
        currencyTitle: 'Baht',
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        m6: '',
        m7: '',
        m8: '',
        m9: '',
        m10: '',
        m11: '',
        m12: '',
        overall: '',
        currencyFx: '',
        flag_alert: false,
        flagFirst_row: true
      })])
    })

    this.monthForm8 = this.fb.group({
      monthTotal1: '',
      monthTotal2: '',
      monthTotal3: '',
      monthTotal4: '',
      monthTotal5: '',
      monthTotal6: '',
      monthTotal7: '',
      monthTotal8: '',
      monthTotal9: '',
      monthTotal10: '',
      monthTotal11: '',
      monthTotal12: '',
      monthTotal_overall: '',
      monthForm_list: this.fb.array([this.fb.group({
        currencyTitle: 'Baht',
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        m6: '',
        m7: '',
        m8: '',
        m9: '',
        m10: '',
        m11: '',
        m12: '',
        overall: '',
        currencyFx: '',
        flag_alert: false,
        flagFirst_row: true
      })])
    })

    this.monthForm9 = this.fb.group({
      monthTotal1: '',
      monthTotal2: '',
      monthTotal3: '',
      monthTotal4: '',
      monthTotal5: '',
      monthTotal6: '',
      monthTotal7: '',
      monthTotal8: '',
      monthTotal9: '',
      monthTotal10: '',
      monthTotal11: '',
      monthTotal12: '',
      monthTotal_overall: '',
      monthForm_list: this.fb.array([this.fb.group({
        currencyTitle: 'Baht',
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        m6: '',
        m7: '',
        m8: '',
        m9: '',
        m10: '',
        m11: '',
        m12: '',
        overall: '',
        currencyFx: '',
        flag_alert: false,
        flagFirst_row: true
      })])
    })

    ////add by oat disable
    this.DisableCapexForm();
  }





  ChangingValue_month_table1(year_name) {
    const control = this.monthForm0.get('monthForm_list') as FormArray;
    const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const annual_total = this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').value;
    let xx = +control.length
    let monthTotal_overall = 0;
    let mTotal = 0;
    for (let i = 0; i < xx; i++) {
      let overall = 0;
      for (let j = 1; j <= 12; j++) {
        if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
          overall = overall + +control.at(i).get('m' + j).value;
        }
      }
      control.at(i).get('overall').patchValue(+overall.toFixed(0));
      if (+control.at(i).get('overall').value != 0 && +control.at(i).get('overall').value == +control_annual.at(i).get('y1').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);

        if (parseFloat(annual_total) != this.returnCost && this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.additionalCost && this.initiativeService.isAddmore) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.ProjectCost && !this.initiativeService.isAddmore && !this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else {
          this.flag_fail = "no";
        }
      }
      else {
        control.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);

      }
      // else {
      //   control.at(i).get('flag_alert').patchValue(true);
      //   this.flag_fail = "yes";
      // }
    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {
        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
            total = total + +control.at(i).get('m' + j).value;
          }
        }
      }
      this.monthForm0.controls['monthTotal' + j].setValue(total.toFixed(0));
      monthTotal_overall = monthTotal_overall + +total;
      mTotal = +this.totalAnual[year_name] * 1000000;
    }

    this.monthForm0.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));
    // if ((+monthTotal_overall) != 0 && (+monthTotal_overall) == +mTotal) {

    //   if (!isNaN(parseFloat(annual_total)) && (parseFloat(annual_total) * 1000000) != +mTotal) {
    //     this.flag_fail = "yes";
    //   } else {
    //     this.flag_fail = "no";
    //   }
    // }
    // else {
    //   this.flag_fail = "yes";
    // }

    if (!this.capexInformationForm.get('monthForm0')) {
      let capexForm = this.capexInformationForm as FormGroup;
      capexForm.addControl('monthForm0', this.monthForm0);
    }
    this.CHk_validate();
  }

  ChangingValue_month_table2(year_name) {
    const control = this.monthForm1.get('monthForm_list') as FormArray;
    const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const annual_total = this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').value;
    let xx = +control.length
    let monthTotal_overall = 0;
    let mTotal = 0;
    for (let i = 0; i < xx; i++) {
      let overall = 0;
      for (let j = 1; j <= 12; j++) {
        if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
          overall = overall + +control.at(i).get('m' + j).value;
        }
      }
      control.at(i).get('overall').patchValue(overall.toFixed(0));
      if (+control.at(i).get('overall').value != 0 && +control.at(i).get('overall').value == +control_annual.at(i).get('y2').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        if (parseFloat(annual_total) != this.returnCost && this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.additionalCost && this.initiativeService.isAddmore) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.ProjectCost && !this.initiativeService.isAddmore && !this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else {
          this.flag_fail = "no";
        }
      }
      else {
        control.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);

      }
    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {
        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
            total = total + +control.at(i).get('m' + j).value;
          }
        }
      }
      this.monthForm1.controls['monthTotal' + j].setValue(total.toFixed(0));
      monthTotal_overall = monthTotal_overall + +total;
      mTotal = +this.totalAnual[year_name] * 1000000;
    }

    this.monthForm1.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));
    // if ((+monthTotal_overall) != 0 && (+monthTotal_overall) == +mTotal) {
    //   if (!isNaN(parseFloat(annual_total)) && (parseFloat(annual_total) * 1000000) != +mTotal) {
    //     this.flag_fail = "yes";
    //   } else {
    //     this.flag_fail = "no";
    //   }
    // }
    // else {
    //   this.flag_fail = "yes";
    // }
    if (!this.capexInformationForm.get('monthForm1')) {
      let capexForm = this.capexInformationForm as FormGroup;
      capexForm.addControl('monthForm1', this.monthForm1);
    }
    this.CHk_validate();
  }

  ChangingValue_month_table3(year_name) {
    const control = this.monthForm2.get('monthForm_list') as FormArray;
    const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const annual_total = this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').value;
    let xx = +control.length
    let monthTotal_overall = 0;
    let mTotal = 0;
    for (let i = 0; i < xx; i++) {
      let overall = 0;
      for (let j = 1; j <= 12; j++) {
        if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
          overall = overall + +control.at(i).get('m' + j).value;
        }
      }
      control.at(i).get('overall').patchValue(overall.toFixed(0));
      if (+control.at(i).get('overall').value != 0 && +control.at(i).get('overall').value == +control_annual.at(i).get('y3').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        if (parseFloat(annual_total) != this.returnCost && this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.additionalCost && this.initiativeService.isAddmore) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.ProjectCost && !this.initiativeService.isAddmore && !this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else {
          this.flag_fail = "no";
        }
      }
      else {
        // this.flag_fail = "yes";
        control.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
      }
    }

    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {
        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
            total = total + +control.at(i).get('m' + j).value;
          }
        }
      }
      this.monthForm2.controls['monthTotal' + j].setValue(total.toFixed(0));
      monthTotal_overall = monthTotal_overall + +total;
      mTotal = +this.totalAnual[year_name] * 1000000;
    }

    this.monthForm2.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));
    // if ((+monthTotal_overall) != 0 && (+monthTotal_overall) == +mTotal) {
    //   if (!isNaN(parseFloat(annual_total)) && (parseFloat(annual_total) * 1000000) != +mTotal) {
    //     this.flag_fail = "yes";
    //   } else {
    //     this.flag_fail = "no";
    //   }
    // }
    // else {
    //   this.flag_fail = "yes";
    // }
    if (!this.capexInformationForm.get('monthForm2')) {
      let capexForm = this.capexInformationForm as FormGroup;
      capexForm.addControl('monthForm2', this.monthForm2);
    }
    this.CHk_validate();

  }

  ChangingValue_month_table4(year_name) {
    const control = this.monthForm3.get('monthForm_list') as FormArray;
    const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const annual_total = this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').value;
    let xx = +control.length
    let monthTotal_overall = 0;
    let mTotal = 0;

    for (let i = 0; i < xx; i++) {
      let overall = 0;

      for (let j = 1; j <= 12; j++) {
        if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
          overall = overall + +control.at(i).get('m' + j).value;
        }
      }
      control.at(i).get('overall').patchValue(overall.toFixed(0));

      if (+control.at(i).get('overall').value != 0 && +control.at(i).get('overall').value == +control_annual.at(i).get('y4').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        if (parseFloat(annual_total) != this.returnCost && this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.additionalCost && this.initiativeService.isAddmore) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.ProjectCost && !this.initiativeService.isAddmore && !this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else {
          this.flag_fail = "no";
        }

      }
      else {
        // this.flag_fail = "yes";
        control.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
            total = total + +control.at(i).get('m' + j).value;
          }
        }

      }
      this.monthForm3.controls['monthTotal' + j].setValue(total.toFixed(0));
      monthTotal_overall = monthTotal_overall + +total;

      mTotal = +this.totalAnual[year_name] * 1000000;

    }

    this.monthForm3.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


    // if ((+monthTotal_overall) != 0 && (+monthTotal_overall) == +mTotal) {
    //   if (!isNaN(parseFloat(annual_total)) && (parseFloat(annual_total) * 1000000) != +mTotal) {
    //     this.flag_fail = "yes";
    //   } else {
    //     this.flag_fail = "no";
    //   }

    // }
    // else {
    //   this.flag_fail = "yes";

    // }
    if (!this.capexInformationForm.get('monthForm3')) {
      let capexForm = this.capexInformationForm as FormGroup;
      capexForm.addControl('monthForm3', this.monthForm3);
    }
    this.CHk_validate();

  }

  ChangingValue_month_table5(year_name) {

    const control = this.monthForm4.get('monthForm_list') as FormArray;
    const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const annual_total = this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').value;

    let xx = +control.length
    let monthTotal_overall = 0;
    let mTotal = 0;

    for (let i = 0; i < xx; i++) {
      let overall = 0;

      for (let j = 1; j <= 12; j++) {
        if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
          overall = overall + +control.at(i).get('m' + j).value;
        }
      }
      control.at(i).get('overall').patchValue(overall.toFixed(0));

      if (+control.at(i).get('overall').value != 0 && +control.at(i).get('overall').value == +control_annual.at(i).get('y5').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        if (parseFloat(annual_total) != this.returnCost && this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.additionalCost && this.initiativeService.isAddmore) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.ProjectCost && !this.initiativeService.isAddmore && !this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else {
          this.flag_fail = "no";
        }

      }
      else {
        control.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        // this.flag_fail = "yes";
      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
            total = total + +control.at(i).get('m' + j).value;
          }
        }

      }
      this.monthForm4.controls['monthTotal' + j].setValue(total.toFixed(0));
      monthTotal_overall = monthTotal_overall + +total;

      mTotal = +this.totalAnual[year_name] * 1000000;

    }

    this.monthForm4.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


    // if ((+monthTotal_overall) != 0 && (+monthTotal_overall) == +mTotal) {
    //   if (!isNaN(parseFloat(annual_total)) && (parseFloat(annual_total) * 1000000) != +mTotal) {
    //     this.flag_fail = "yes";
    //   } else {
    //     this.flag_fail = "no";
    //   }

    // }
    // else {
    //   this.flag_fail = "yes";

    // }
    if (!this.capexInformationForm.get('monthForm4')) {
      let capexForm = this.capexInformationForm as FormGroup;
      capexForm.addControl('monthForm4', this.monthForm4);
    }
    this.CHk_validate();

  }

  ChangingValue_month_table6(year_name) {


    const control = this.monthForm5.get('monthForm_list') as FormArray;
    const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const annual_total = this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').value;

    let xx = +control.length
    let monthTotal_overall = 0;
    let mTotal = 0;

    for (let i = 0; i < xx; i++) {
      let overall = 0;

      for (let j = 1; j <= 12; j++) {
        if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
          overall = overall + +control.at(i).get('m' + j).value;
        }
      }
      control.at(i).get('overall').patchValue(overall.toFixed(0));

      if (+control.at(i).get('overall').value != 0 && +control.at(i).get('overall').value == +control_annual.at(i).get('y6').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        if (parseFloat(annual_total) != this.returnCost && this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.additionalCost && this.initiativeService.isAddmore) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.ProjectCost && !this.initiativeService.isAddmore && !this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else {
          this.flag_fail = "no";
        }


      }
      else {
        // this.flag_fail = "yes";
        control.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
            total = total + +control.at(i).get('m' + j).value;
          }
        }

      }
      this.monthForm5.controls['monthTotal' + j].setValue(total.toFixed(0));
      monthTotal_overall = monthTotal_overall + +total;

      mTotal = +this.totalAnual[year_name] * 1000000;

    }

    this.monthForm5.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


    // if ((+monthTotal_overall) != 0 && (+monthTotal_overall) == +mTotal) {
    //   if (!isNaN(parseFloat(annual_total)) && (parseFloat(annual_total) * 1000000) != +mTotal) {
    //     this.flag_fail = "yes";
    //   } else {
    //     this.flag_fail = "no";
    //   }

    // }
    // else {
    //   this.flag_fail = "yes";

    // }
    if (!this.capexInformationForm.get('monthForm5')) {
      let capexForm = this.capexInformationForm as FormGroup;
      capexForm.addControl('monthForm5', this.monthForm5);
    }
    this.CHk_validate();

  }

  ChangingValue_month_table7(year_name) {

    const control = this.monthForm6.get('monthForm_list') as FormArray;
    const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const annual_total = this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').value;

    let xx = +control.length
    let monthTotal_overall = 0;
    let mTotal = 0;

    for (let i = 0; i < xx; i++) {
      let overall = 0;

      for (let j = 1; j <= 12; j++) {
        if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
          overall = overall + +control.at(i).get('m' + j).value;
        }
      }
      control.at(i).get('overall').patchValue(overall.toFixed(0));

      if (+control.at(i).get('overall').value != 0 && +control.at(i).get('overall').value == +control_annual.at(i).get('y7').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        if (parseFloat(annual_total) != this.returnCost && this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.additionalCost && this.initiativeService.isAddmore) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.ProjectCost && !this.initiativeService.isAddmore && !this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else {
          this.flag_fail = "no";
        }


      }
      else {
        control.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        // this.flag_fail = "yes";

      }

    }

    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
            total = total + +control.at(i).get('m' + j).value;
          }
        }

      }
      this.monthForm6.controls['monthTotal' + j].setValue(total.toFixed(0));
      monthTotal_overall = monthTotal_overall + +total;

      mTotal = +this.totalAnual[year_name] * 1000000;

    }

    this.monthForm6.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));

    // if ((+monthTotal_overall) != 0 && (+monthTotal_overall) == +mTotal) {
    //   if (!isNaN(parseFloat(annual_total)) && (parseFloat(annual_total) * 1000000) != +mTotal) {
    //     this.flag_fail = "yes";
    //   } else {
    //     this.flag_fail = "no";
    //   }

    // }
    // else {
    //   this.flag_fail = "yes";
    // }
    if (!this.capexInformationForm.get('monthForm6')) {
      let capexForm = this.capexInformationForm as FormGroup;
      capexForm.addControl('monthForm6', this.monthForm6);
    }
    this.CHk_validate();

  }

  ChangingValue_month_table8(year_name) {

    const control = this.monthForm7.get('monthForm_list') as FormArray;
    const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const annual_total = this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').value;

    let xx = +control.length
    let monthTotal_overall = 0;
    let mTotal = 0;

    for (let i = 0; i < xx; i++) {
      let overall = 0;

      for (let j = 1; j <= 12; j++) {
        if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
          overall = overall + +control.at(i).get('m' + j).value;
        }
      }
      control.at(i).get('overall').patchValue(overall.toFixed(0));

      if (+control.at(i).get('overall').value != 0 && +control.at(i).get('overall').value == +control_annual.at(i).get('y8').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        if (parseFloat(annual_total) != this.returnCost && this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.additionalCost && this.initiativeService.isAddmore) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.ProjectCost && !this.initiativeService.isAddmore && !this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else {
          this.flag_fail = "no";
        }


      }
      else {
        control.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        // this.flag_fail = "yes";

      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
            total = total + +control.at(i).get('m' + j).value;
          }
        }

      }
      this.monthForm7.controls['monthTotal' + j].setValue(total.toFixed(0));
      monthTotal_overall = monthTotal_overall + +total;

      mTotal = +this.totalAnual[year_name] * 1000000;

    }

    this.monthForm7.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


    // if ((+monthTotal_overall) != 0 && (+monthTotal_overall) == +mTotal) {
    //   if (!isNaN(parseFloat(annual_total)) && (parseFloat(annual_total) * 1000000) != +mTotal) {
    //     this.flag_fail = "yes";
    //   } else {
    //     this.flag_fail = "no";
    //   }

    // }
    // else {
    //   this.flag_fail = "yes";
    // }
    if (!this.capexInformationForm.get('monthForm7')) {
      let capexForm = this.capexInformationForm as FormGroup;
      capexForm.addControl('monthForm7', this.monthForm7);
    }
    this.CHk_validate();

  }

  ChangingValue_month_table9(year_name) {


    const control = this.monthForm8.get('monthForm_list') as FormArray;
    const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const annual_total = this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').value;

    let xx = +control.length
    let monthTotal_overall = 0;
    let mTotal = 0;

    for (let i = 0; i < xx; i++) {
      let overall = 0;

      for (let j = 1; j <= 12; j++) {
        if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
          overall = overall + +control.at(i).get('m' + j).value;
        }
      }
      control.at(i).get('overall').patchValue(overall.toFixed(0));

      if (+control.at(i).get('overall').value != 0 && +control.at(i).get('overall').value == +control_annual.at(i).get('y9').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        if (parseFloat(annual_total) != this.returnCost && this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.additionalCost && this.initiativeService.isAddmore) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.ProjectCost && !this.initiativeService.isAddmore && !this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else {
          this.flag_fail = "no";
        }
      }
      else {
        control.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        // this.flag_fail = "yes";

      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
            total = total + +control.at(i).get('m' + j).value;
          }
        }

      }
      this.monthForm8.controls['monthTotal' + j].setValue(total.toFixed(0));
      monthTotal_overall = monthTotal_overall + +total;

      mTotal = +this.totalAnual[year_name] * 1000000;

    }

    this.monthForm8.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


    // if ((+monthTotal_overall) != 0 && (+monthTotal_overall) == +mTotal) {
    //   if (!isNaN(parseFloat(annual_total)) && (parseFloat(annual_total) * 1000000) != +mTotal) {
    //     this.flag_fail = "yes";
    //   } else {
    //     this.flag_fail = "no";
    //   }

    // }
    // else {
    //   this.flag_fail = "yes";
    // }
    if (!this.capexInformationForm.get('monthForm8')) {
      let capexForm = this.capexInformationForm as FormGroup;
      capexForm.addControl('monthForm8', this.monthForm8);
    }
    this.CHk_validate();

  }

  ChangingValue_month_table10(year_name) {


    const control = this.monthForm9.get('monthForm_list') as FormArray;
    const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
    const annual_total = this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall').value;

    let xx = +control.length
    let monthTotal_overall = 0;
    let mTotal = 0;

    for (let i = 0; i < xx; i++) {
      let overall = 0;

      for (let j = 1; j <= 12; j++) {
        if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
          overall = overall + +control.at(i).get('m' + j).value;
        }
      }
      control.at(i).get('overall').patchValue(overall.toFixed(0));

      if (+control.at(i).get('overall').value != 0 && +control.at(i).get('overall').value == +control_annual.at(i).get('y10').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        if (parseFloat(annual_total) != this.returnCost && this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.additionalCost && this.initiativeService.isAddmore) {
          this.flag_fail = "yes";
        } else if (parseFloat(annual_total) != this.ProjectCost && !this.initiativeService.isAddmore && !this.initiativeService.isReturn) {
          this.flag_fail = "yes";
        } else {
          this.flag_fail = "no";
        }

      }
      else {
        control.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
        // this.flag_fail = "yes";
      }


    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('currencyFx').value != undefined && control.at(i).get('currencyFx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('currencyFx').value);
            }
          }
        }
        else {
          if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
            total = total + +control.at(i).get('m' + j).value;
          }
        }

      }
      this.monthForm9.controls['monthTotal' + j].setValue(total.toFixed(0));
      monthTotal_overall = monthTotal_overall + +total;

      mTotal = +this.totalAnual[year_name] * 1000000;



    }

    this.monthForm9.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));



    // if ((+monthTotal_overall) != 0 && (+monthTotal_overall) == +mTotal) {
    //   if (!isNaN(parseFloat(annual_total)) && (parseFloat(annual_total) * 1000000) != +mTotal) {
    //     this.flag_fail = "yes";
    //   } else {
    //     this.flag_fail = "no";
    //   }

    // }
    // else {
    //   this.flag_fail = "yes";
    // }
    if (!this.capexInformationForm.get('monthForm9')) {
      let capexForm = this.capexInformationForm as FormGroup;
      capexForm.addControl('monthForm9', this.monthForm9);
    }
    this.CHk_validate();

  }

  setStartingDate(date1_Start: Date) {
    return;
    if (date1_Start) {
      this.capexvalidate = true;
      let convertDate = new Date(date1_Start);
      if (!isNaN(convertDate.getTime())) {
        if (new Date(this.StartingDate).getTime() != convertDate.getTime()) {
          this.StartingDate = convertDate;
          this.capexInformationForm.controls['requestIniNoDate'].setValue('');
          this.capexInformationForm.controls['startingDate'].setValue(convertDate);
          if (this.initiativeService.page != 'pool-create' && this.initiativeService.page != 'pool-edit') {
            this.formGroup.get('initiativesForm').get('startingDate').setValue(convertDate);
            this.formGroup.get('initiativesForm').get('finishingDate').setValue('');
          }


          this.ProjecctComRun = "";
          this.RequestIniNoDate = "";
          this.year_m = [];

          this.capexInformationForm.patchValue({
            projecctComRun: "",
            startingDate_tmp: this.convertDate(convertDate)
          });
          this.clearMonthlyInvestmentTable();
          // this.adjustAnnualAndMonthlyTable(new Date(), 'startingDate');
          this.Diff();
        }
      }
    } else {
      this.capexvalidate = false;
    }
  }

  setFinishDate(date1: Date) {
    if (date1) {
      let convertDate = new Date(date1);
      if (!isNaN(convertDate.getTime()) && convertDate.getTime() > 0) {
        this.capexvalidate = true;
        this.ProjecctComRun = convertDate;
        if (this.progressService.capexLoading) {
          this.capexService.changeFinishDate(this.ProjecctComRun);
          //this.formGroup.get('progressForm')?.get('standardProjectDef')?.patchValue(null);
          // this.progressService.changeCapexFinish = false;
          // if (this.formGroup.get('poc2Form')) {
          //   this.formGroup.removeControl('poc2Form');
          // }
          // if (this.formGroup.get('poc1')) {
          //   this.formGroup.removeControl('poc1');
          // }
        }

        if ((this.RequestIniNoDate != "" && this.RequestIniNoDate) && (this.ProjecctComRun != "" && this.ProjecctComRun)) {
          //this.adjustAnnualAndMonthlyTable(convertDate, 'finishDate');
          this.adjustAnnualAndMonthlyTable(new Date(), 'projecctComRun');
          this.Diff();
        }

      }
      else {
        this.capexvalidate = false;
      }
    }
  }

  setRequestDate(date1) {
    if (date1 != null && date1 != '') {
      let convertDate1 = new Date(date1);
      if (!isNaN(convertDate1.getTime()) && convertDate1.getTime() > 0) {

        // if (new Date(this.RequestIniNoDate).getTime() != convertDate1.getTime()) {
        if (this.capexInformationForm.get('AnnualForm')) {
          let capexForm = this.capexInformationForm as FormGroup;
          capexForm.removeControl('AnnualForm');
        }

        this.RequestIniNoDate = convertDate1;
        if (this.progressService.capexLoading) {
          this.capexService.changeRequestIniNoDate(this.RequestIniNoDate);
        }
        if ((this.RequestIniNoDate != "" && this.RequestIniNoDate) && (this.ProjecctComRun != "" && this.ProjecctComRun)) {
          this.adjustAnnualAndMonthlyTable(convertDate1, 'RequestIniNoDate');
          this.Diff();
          this.CHk_validate();
        }

      } else {
        this.clearMonthlyInvestmentTable();
      }
    } else {
      this.clearMonthlyInvestmentTable();
    }

    // this.initial_month();


  }

  clearMonthlyInvestmentTable() {
    this.year_m = [];
    // this.capexInformationForm.get('requestIniNoDate').setValue(null);
    this.RequestIniNoDate = null;
    let capexForm = this.capexInformationForm as FormGroup;
    capexForm.get('year_m').setValue(this.year_m);
    for (let index = 0; index < 10; index++) {
      if (this.capexInformationForm.get('monthForm' + index)) {
        capexForm.get('monthForm' + index).reset();
        capexForm.removeControl('monthForm' + index);
      }
    }
    if (this.capexInformationForm.get('AnnualForm')) {
      this.initial_year();
    }
  }

  adjustAnnualAndMonthlyTable(dateStart: Date, type: string) {
    let oldYear = this.year_m;
    let d1 = this.StartingDate;
    let d2 = this.ProjecctComRun;
    let d3 = this.RequestIniNoDate;

    // if ((d3 >= d1 && d3 < d2) == false && type === "RequestIniNoDate") {
    //   this.RequestIniNoDate = "";
    //   this.capexInformationForm.get('requestIniNoDate').invalid;
    //   this.capexInformationForm.get('requestIniNoDate').setValue('');
    //   this.initiativeService.viewMode ? false : this.swalTool.DateBudgetStart();
    //   this.capexvalidate = false;
    // }


    if ((d3 < d2) == false && type === "RequestIniNoDate" && (this.initiativeService.page != 'pool-create' && this.initiativeService.page != 'pool-edit')) {
      this.RequestIniNoDate = "";
      this.capexInformationForm.get('requestIniNoDate').invalid;
      this.capexInformationForm.get('requestIniNoDate').setValue('');
      this.initiativeService.viewMode || this.initiativeService.DisableTabCapex ? false : this.swalTool.DateBudgetStart();
      this.capexvalidate = false;
    } else {

      //auto fill data
      if (this.progressService.capexLoading && this.formGroup.get('progressForm')?.get('standardProjectDef')?.value) {

        //this.formGroup.get('progessForm')?.get('standardProjectDef')?.patchValue(null);
        // if (this.formGroup.get('progessForm')) {
        // }
        if (this.formGroup.get('poc2FormNewLogic')) {
          this.formGroup.get('poc2FormNewLogic').get('overallForm').patchValue({
            basicStartDate: new Date(this.RequestIniNoDate),
            basicFinishDate: new Date(this.ProjecctComRun)
          });
        }
        if (this.formGroup.get('poc1')) {
          this.formGroup.get('poc1').patchValue({
            basicStartDate: new Date(this.RequestIniNoDate),
            basicFinishDate: new Date(this.ProjecctComRun)
          });
        }
        this.progressService.changeRequestIniNoDate(this.RequestIniNoDate);
        this.progressService.changeFinishDate(this.ProjecctComRun);
      }


      this.flag_fail = "yes";
      // this.flag_fail = "no";
      this.capexvalidate = true;
      this.capexInformationForm.patchValue({
        requestIniNoDate: this.RequestIniNoDate,
        actionYear: this.RequestIniNoDate,
        requestIniNoDate_tmp: this.RequestIniNoDate
      });

      this.YearTable_capex = [];

      if (!this.AnnualForm) {
        this.AnnualForm = this.fb.group({
          AnnualTotal1: null,
          AnnualTotal2: null,
          AnnualTotal3: null,
          AnnualTotal4: null,
          AnnualTotal5: null,
          AnnualTotal6: null,
          AnnualTotal7: null,
          AnnualTotal8: null,
          AnnualTotal9: null,
          AnnualTotal10: null,
          AnnualTotal11: null,
          AnnualTotal_overall: null,
          TotalAdditional_total: null,
          annualForm_list: this.fb.array([this.fb.group({
            currencyTitle: 'Million Baht',
            y1: null,
            y2: null,
            y3: null,
            y4: null,
            y5: null,
            y6: null,
            y7: null,
            y8: null,
            y9: null,
            y10: null,
            overall: null,
            currencyFx: null,
            flagFirst_row: true
          })])
        });
      }
      let control_old = this.AnnualForm.get('annualForm_list') as FormArray;
      let oldValYear = control_old.value;

      this.EndYear_1 = this.ProjecctComRun ? new Date(this.ProjecctComRun).getFullYear() : 0;
      this.StartYear_1 = this.RequestIniNoDate ? new Date(this.RequestIniNoDate).getFullYear() : 0;
      const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;


      if (!this.capexInformationForm.get('AnnualForm')) {
        this.capexInformationForm.addControl('AnnualForm', this.AnnualForm);
      }
      for (let i = 0; i < 10; i++) {

        let yearname = +this.StartYear_1 + i;


        if (yearname <= +this.EndYear_1) {
          this.YearTable_capex.push({
            columnname: yearname,
            isEdit: this.capexDisableField ? true : false
          })

          var n = oldYear.indexOf(yearname);

          let xx = +control_annual.length
          for (let j = 0; j < xx; j++) {
            let ind = +i + 1;
            var n = oldYear.indexOf(yearname);

            let v = 0.00;
            if (n == 0) {
              v = oldValYear[j].y1;
            }
            else if (n == 1) {
              v = oldValYear[j].y2;
            }
            else if (n == 2) {
              v = oldValYear[j].y3;
            }
            else if (n == 3) {
              v = oldValYear[j].y4;
            }
            else if (n == 4) {
              v = oldValYear[j].y5;
            }
            else if (n == 5) {
              v = oldValYear[j].y6;
            }
            else if (n == 6) {
              v = oldValYear[j].y7;
            }
            else if (n == 7) {
              v = oldValYear[j].y8;
            }
            else if (n == 8) {
              v = oldValYear[j].y9;
            }
            else if (n == 9) {
              v = oldValYear[j].y10;
            }

            control_annual.at(j).get('y' + ind).patchValue(v);
          }


        }
        else {

          this.YearTable_capex.push({
            columnname: yearname,
            isEdit: true
          })


          let xx = +control_annual.length
          for (let j = 0; j < xx; j++) {
            let ind = +i + 1;
            control_annual.at(j).get('y' + ind).patchValue("");
          }
        }

      }

      //====== Cal Over All Year =========

      let xx = +control_annual.length
      let AnnualTotal_overall = 0;

      for (let i = 0; i < xx; i++) {
        let overall = 0;

        for (let j = 1; j <= 10; j++) {
          if (control_annual.at(i).get('y' + j).value != undefined && control_annual.at(i).get('y' + j).value != "") {
            overall = overall + +control_annual.at(i).get('y' + j).value;
            overall = +overall.toFixed(2);
          }
        }
        control_annual.at(i).get('overall').patchValue(overall.toFixed(2));
      }

      for (let j = 1; j <= 10; j++) {
        let total = 0;
        for (let i = 0; i < xx; i++) {

          if (i != 0) {
            if (control_annual.at(i).get('currencyFx').value != undefined && control_annual.at(i).get('currencyFx').value != "") {
              if (control_annual.at(i).get('y' + j).value != undefined && control_annual.at(i).get('y' + j).value != "") {
                total = total + (+control_annual.at(i).get('y' + j).value * +control_annual.at(i).get('currencyFx').value);
                total = +total.toFixed(2);
              }
            }
          }
          else {
            if (control_annual.at(i).get('y' + j).value != undefined && control_annual.at(i).get('y' + j).value != "") {
              total = total + +control_annual.at(i).get('y' + j).value;
              total = +total.toFixed(2);
            }
          }

        }
        this.AnnualForm.controls['AnnualTotal' + j].setValue(total.toFixed(2));
        AnnualTotal_overall = AnnualTotal_overall + +total.toFixed(2);
        AnnualTotal_overall = +AnnualTotal_overall.toFixed(2);
        this.AnnualTotal_overall_tmp = AnnualTotal_overall.toFixed(2);

        this.totalAnual[this.YearTable_capex[j - 1].columnname] = total.toFixed(2);

      }

      this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall.toFixed(2));

      if (+AnnualTotal_overall != 0 && +AnnualTotal_overall == +this.returnCost && this.initiativeService.isReturn) {
        this.flag_fail = "no";
        this.capexvalidate = true;
      } else if (+AnnualTotal_overall != 0 && +AnnualTotal_overall == +this.additionalCost && this.initiativeService.isAddmore) {
        this.flag_fail = "no";
        this.capexvalidate = true;
      } else if (+AnnualTotal_overall != 0 && +AnnualTotal_overall == +this.ProjectCost && !this.initiativeService.isReturn && !this.initiativeService.isAddmore) {
        this.flag_fail = "no";
        this.capexvalidate = true;
      } else {
        this.flag_fail = "yes";
        this.capexvalidate = false;
      }



      if (this.monthForm0 == undefined) {
        this.initial_month();
      }
      else {

        //====================== Month Table ======================

        if (this.StartYear_1 == 0) this.StartYear_1 = new Date().getFullYear();
        this.diffYear = parseInt(this.EndYear_1) - parseInt(this.StartYear_1);
        let startMonth = this.RequestIniNoDate ? new Date(this.RequestIniNoDate).getMonth() + 1 : null;
        let endMonth = this.ProjecctComRun ? new Date(this.ProjecctComRun).getMonth() + 1 : null;

        this.year_m = [];
        for (let i = 0; i <= this.diffYear; i++) {
          this.year_m.push(+this.StartYear_1 + +i);
        }


        this.capexInformationForm.get('year_m').setValue(this.year_m);


        this.monthList_1 = [];
        this.monthList_x = [];
        this.monthList_last = [];

        if (this.diffYear == 0) {

          for (let i = 1; i <= 12; i++) {
            if (i < +startMonth) {
              this.monthList_1.push({
                columnname: this.months[i],
                readOnly: true
              })
            }
            else if (i > +endMonth) {
              this.monthList_1.push({
                columnname: this.months[i],
                readOnly: true
              })
            }
            else {
              this.monthList_1.push({
                columnname: this.months[i],
                readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
              })
            }
          }

          let xxx = this.monthList_1.map(a => a.readOnly);

          const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
          for (let j = 0; j <= this.monthList_1.length; j++) {
            if (xxx[j] == true) {
              let tmp = 'm' + (+j + 1);
              control_month0.at(0).get(tmp).patchValue("");
            }
          }


        }
        else if (this.diffYear == 1) {
          for (let i = 1; i <= 12; i++) {
            if (i < +startMonth) {
              this.monthList_1.push({
                columnname: this.months[i],
                readOnly: true
              })
            }
            else {
              this.monthList_1.push({
                columnname: this.months[i],
                readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
              })
            }

            let xxx = this.monthList_1.map(a => a.readOnly);

            const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
            for (let j = 0; j <= this.monthList_1.length; j++) {
              if (xxx[j] == true) {
                let tmp = 'm' + (+j + 1);
                control_month0.at(0).get(tmp).patchValue("");
              }
            }


            if (i > +endMonth) {
              this.monthList_last.push({
                columnname: this.months[i],
                readOnly: true
              })
            }
            else {
              this.monthList_last.push({
                columnname: this.months[i],
                readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
              })
            }

            let yyy = this.monthList_last.map(a => a.readOnly);

            const control_month1 = this.monthForm1.get('monthForm_list') as FormArray;
            for (let j = 0; j <= this.monthList_last.length; j++) {
              if (yyy[j] == true) {
                let tmp = 'm' + (+j + 1);
                control_month1.at(0).get(tmp).patchValue("");
              }
            }

          }
        }
        else {
          for (let i = 1; i <= 12; i++) {
            if (i < +startMonth) {
              this.monthList_1.push({
                columnname: this.months[i],
                readOnly: true
              })
            }
            else {
              this.monthList_1.push({
                columnname: this.months[i],
                readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
              })
            }

            this.monthList_x.push({
              columnname: this.months[i],
              readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
            })

            if (i > +endMonth) {
              this.monthList_last.push({
                columnname: this.months[i],
                readOnly: true
              })
            }
            else {
              this.monthList_last.push({
                columnname: this.months[i],
                readOnly: this.initiativeService.viewMode || this.capexDisableField ? true : false
              })
            }

            for (let i = 0; i <= this.diffYear; i++) {
              if (i == 0) {

                let xxx = this.monthList_1.map(a => a.readOnly);

                const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
                for (let j = 0; j <= this.monthList_1.length; j++) {
                  if (xxx[j] == true) {
                    let tmp = 'm' + (+j + 1);
                    control_month0.at(0).get(tmp).patchValue("");
                  }
                }

              }
              else {

                if (i == this.diffYear) {

                  let yyy = this.monthList_last.map(a => a.readOnly);

                  if (i == 1) {

                    const control_month1 = this.monthForm1.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_last.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month1.at(0).get(tmp).patchValue("");
                      }
                    }

                  }
                  else if (i == 2) {
                    const control_month2 = this.monthForm2.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_last.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month2.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 3) {
                    const control_month3 = this.monthForm3.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_last.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month3.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 4) {

                    const control_month4 = this.monthForm4.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_last.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month4.at(0).get(tmp).patchValue("");
                      }
                    }

                  }
                  else if (i == 5) {
                    const control_month5 = this.monthForm5.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_last.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month5.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 6) {
                    const control_month6 = this.monthForm6.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_last.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month6.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 7) {
                    const control_month7 = this.monthForm7.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_last.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month7.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 8) {
                    const control_month8 = this.monthForm8.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_last.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month8.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 9) {
                    const control_month9 = this.monthForm9.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_last.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month9.at(0).get(tmp).patchValue("");
                      }
                    }
                  }



                }
                else {

                  let yyy = this.monthList_x.map(a => a.readOnly);

                  if (i == 1) {

                    const control_month1 = this.monthForm1.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_x.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month1.at(0).get(tmp).patchValue("");
                      }
                    }

                  }
                  else if (i == 2) {
                    const control_month2 = this.monthForm2.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_x.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month2.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 3) {
                    const control_month3 = this.monthForm3.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_x.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month3.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 4) {

                    const control_month4 = this.monthForm4.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_x.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month4.at(0).get(tmp).patchValue("");
                      }
                    }

                  }
                  else if (i == 5) {
                    const control_month5 = this.monthForm5.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_x.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month5.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 6) {
                    const control_month6 = this.monthForm6.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_x.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month6.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 7) {
                    const control_month7 = this.monthForm7.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_x.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month7.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 8) {
                    const control_month8 = this.monthForm8.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_x.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month8.at(0).get(tmp).patchValue("");
                      }
                    }
                  }
                  else if (i == 9) {
                    const control_month9 = this.monthForm9.get('monthForm_list') as FormArray;
                    for (let j = 0; j <= this.monthList_x.length; j++) {
                      if (yyy[j] == true) {
                        let tmp = 'm' + (+j + 1);
                        control_month9.at(0).get(tmp).patchValue("");
                      }
                    }
                  }


                }


              }

            }


          }
        }


        //============= Cal All Month =======================

        for (let i = 0; i < this.year_m.length; i++) {
          if (i == 0) {
            this.ChangingValue_month_table1(this.year_m[i]);
          }
          else if (i == 1) {
            this.ChangingValue_month_table2(this.year_m[i]);
          }
          else if (i == 2) {
            this.ChangingValue_month_table3(this.year_m[i]);
          }
          else if (i == 3) {
            this.ChangingValue_month_table4(this.year_m[i]);
          }
          else if (i == 4) {
            this.ChangingValue_month_table5(this.year_m[i]);
          }
          else if (i == 5) {
            this.ChangingValue_month_table6(this.year_m[i]);
          }
          else if (i == 6) {
            this.ChangingValue_month_table7(this.year_m[i]);
          }
          else if (i == 7) {
            this.ChangingValue_month_table8(this.year_m[i]);
          }
          else if (i == 8) {
            this.ChangingValue_month_table9(this.year_m[i]);
          }
          else if (i == 9) {
            this.ChangingValue_month_table10(this.year_m[i]);
          }
        }

      }

    }
  }

  convertDate(di) {

    let x = "";
    if (di != "" && di != null) {
      di = this.dateUtil.GetDate(new Date(di));
      x = di.substring(6).substring(0, 4) + '-' + di.substring(3).substring(0, 2) + '-' + di.substring(0, 2);
    }

    return x;
  }

  convertDate_display(di) {
    let x = di.substring(8).substring(0, 2) + "/" + di.substring(5).substring(0, 2) + "/" + di.substring(0, 4);
    return x;
  }

  setProjectCost(value) {
    if (value) {

      if (this.initiativeService.page != 'pool-create' && this.initiativeService.isAddmore) {
        var x1 = +value.replace(/,/g, "");
        var x2 = +this.OldProjectCost;

        if (x1 != x2) {
          this.RemarkShow = true;
          this.capexInformationForm.controls['showRemark_tmp'].setValue(true);
        }
        else {
          this.RemarkShow = false;
        }
      }

      this.ProjectCost = value.replace(/,/g, "");
      this.capexInformationForm.controls['projectCost'].setValue(value.replace(/,/g, ""));

      if (+this.AnnualTotal_overall_tmp != 0 && +this.AnnualTotal_overall_tmp == +this.ProjectCost) {
        this.flag_fail = "no";
        this.capexvalidate = true;
      }
      else {
        this.flag_fail = "yes";
        this.capexvalidate = false;
      }
      this.CHk_validate();


      const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

      const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
      let xx = +control_month0.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {
          this.initiativeService.viewMode ? control_month0.at(i).get('flag_alert').patchValue(false) : control_month0.at(i).get('flag_alert').patchValue(true);

        }
        else {
          control_month0.at(i).get('flag_alert').patchValue(false);

        }
      }

      const control_month1 = this.monthForm1.get('monthForm_list') as FormArray;
      xx = +control_month1.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;
        if (control_month1.at(i).get('overall').value != "") {

          if (control_month1.at(i).get('overall').value != control_annual.at(i).get('y2').value * 1000000) {
            this.initiativeService.viewMode ? control_month1.at(i).get('flag_alert').patchValue(false) : control_month1.at(i).get('flag_alert').patchValue(true);
          }
          else {
            control_month1.at(i).get('flag_alert').patchValue(false);

          }

        }

      }

      const control_month2 = this.monthForm2.get('monthForm_list') as FormArray;
      xx = +control_month2.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month2.at(i).get('overall').value != "") {
          if (control_month2.at(i).get('overall').value != control_annual.at(i).get('y3').value * 1000000) {
            this.initiativeService.viewMode ? control_month2.at(i).get('flag_alert').patchValue(false) : control_month2.at(i).get('flag_alert').patchValue(true);
          }
          else {
            control_month2.at(i).get('flag_alert').patchValue(false);

          }
        }
      }

      const control_month3 = this.monthForm3.get('monthForm_list') as FormArray;
      xx = +control_month3.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month3.at(i).get('overall').value) {
          if (control_month3.at(i).get('overall').value != control_annual.at(i).get('y4').value * 1000000) {
            this.initiativeService.viewMode ? control_month3.at(i).get('flag_alert').patchValue(false) : control_month3.at(i).get('flag_alert').patchValue(true);
          }
          else {
            control_month3.at(i).get('flag_alert').patchValue(false);

          }
        }
      }

      const control_month4 = this.monthForm4.get('monthForm_list') as FormArray;
      xx = +control_month4.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month4.at(i).get('overall').value != "") {
          if (control_month4.at(i).get('overall').value != control_annual.at(i).get('y5').value * 1000000) {
            this.initiativeService.viewMode ? control_month4.at(i).get('flag_alert').patchValue(false) : control_month4.at(i).get('flag_alert').patchValue(true);
          }
          else {
            control_month4.at(i).get('flag_alert').patchValue(false);

          }
        }
      }

      const control_month5 = this.monthForm5.get('monthForm_list') as FormArray;
      xx = +control_month5.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month5.at(i).get('overall').value != "") {
          if (control_month5.at(i).get('overall').value != control_annual.at(i).get('y6').value * 1000000) {
            this.initiativeService.viewMode ? control_month5.at(i).get('flag_alert').patchValue(false) : control_month5.at(i).get('flag_alert').patchValue(true);
          }
          else {
            control_month5.at(i).get('flag_alert').patchValue(false);

          }
        }

      }

      const control_month6 = this.monthForm6.get('monthForm_list') as FormArray;
      xx = +control_month6.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month6.at(i).get('overall').value) {

          if (control_month6.at(i).get('overall').value != control_annual.at(i).get('y7').value * 1000000) {
            this.initiativeService.viewMode ? control_month6.at(i).get('flag_alert').patchValue(false) : control_month6.at(i).get('flag_alert').patchValue(true);
          }
          else {
            control_month6.at(i).get('flag_alert').patchValue(false);

          }
        }

      }

      const control_month7 = this.monthForm7.get('monthForm_list') as FormArray;
      xx = +control_month7.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month7.at(i).get('overall').value) {
          if (control_month7.at(i).get('overall').value != control_annual.at(i).get('y8').value * 1000000) {
            this.initiativeService.viewMode ? control_month7.at(i).get('flag_alert').patchValue(false) : control_month7.at(i).get('flag_alert').patchValue(true);
          }
          else {
            control_month7.at(i).get('flag_alert').patchValue(false);

          }
        }
      }

      const control_month8 = this.monthForm8.get('monthForm_list') as FormArray;
      xx = +control_month8.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month8.at(i).get('overall').value != "") {
          if (control_month8.at(i).get('overall').value != control_annual.at(i).get('y9').value * 1000000) {
            this.initiativeService.viewMode ? control_month8.at(i).get('flag_alert').patchValue(false) : control_month8.at(i).get('flag_alert').patchValue(true);
          }
          else {
            control_month8.at(i).get('flag_alert').patchValue(false);

          }
        }

      }

      const control_month9 = this.monthForm9.get('monthForm_list') as FormArray;
      xx = +control_month9.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month9.at(i).get('overall').value != "") {
          if (control_month9.at(i).get('overall').value != control_annual.at(i).get('y10').value * 1000000) {
            this.initiativeService.viewMode ? control_month9.at(i).get('flag_alert').patchValue(false) : control_month9.at(i).get('flag_alert').patchValue(true);
          }
          else {
            control_month9.at(i).get('flag_alert').patchValue(false);

          }
        }

      }
    }
  }

  monthDiff(dateFrom, dateTo) {
    let date1 = new Date(dateFrom);
    let date2 = new Date(dateTo);
    let years = this.yearsDiff(dateFrom, dateTo);
    let months = (years * 12) + (date2.getMonth() - date1.getMonth());
    return months;
  }

  yearsDiff(d1, d2) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let yearsDiff = date2.getFullYear() - date1.getFullYear();
    return yearsDiff;
  }

  toFix_(num, p) {
    num *= Math.pow(10, p);
    num = (Math.round(num) + (((num - Math.round(num)) >= 0.5) ? 1 : 0)) / Math.pow(10, p);
    return num.toFixed(p);
  }

  Diff() {
    if (this.RequestIniNoDate != undefined && this.RequestIniNoDate != "") {
      var date1 = this.RequestIniNoDate ? new Date(this.RequestIniNoDate) : null;
      var date2 = this.ProjecctComRun ? new Date(this.ProjecctComRun) : null;
      let m;
      let yy;

      if (this.monthDiff(date1, date2) < 12) {
        yy = 0;
        m = this.monthDiff(date1, date2);
      }
      else {

        let tmp_;

        tmp_ = (+this.monthDiff(date1, date2) / 12).toString().split('.');
        yy = +tmp_[0];

        m = +this.monthDiff(date1, date2) - (+tmp_[0] * 12);
      }
      this.ProjectExePeriodYear = yy;
      this.capexInformationForm.controls['projectExePeriodYear'].setValue(this.ProjectExePeriodYear);

      this.ProjectExePeriodMonth = m + 1;
      this.capexInformationForm.controls['projectExePeriodMonth'].setValue(this.ProjectExePeriodMonth);
    }
    else {
      this.capexInformationForm.controls['projectExePeriodYear'].setValue("0");
      this.capexInformationForm.controls['projectExePeriodMonth'].setValue("0");

    }
  }

  setCost(value, i) {
    if (value != undefined) {
      this.totalCost_tmp[i] = +value;
      this.TotalYearColumn[i] = +value;
      if (this.totalCost_tmp.length > 1) {
        this.totalCost = 0;
        for (let j = 1; j < this.totalCost_tmp.length; j++) {
          if (this.totalCost_tmp[j] != "" && this.totalCost_tmp[j] != undefined) {
            this.totalCost = +this.totalCost_tmp[j] + +this.totalCost;
          }
        }
      }

      if (+this.ProjectCost != +this.totalCost || +this.totalCost == 0) {
        this.yearColumn[i] = "";
        this.totalCost_tmp[i] = "";
        this.TotalYearColumn[i] = "";
        if (this.totalCost_tmp.length > 1) {
          this.totalCost = 0;
          for (let j = 1; j < this.totalCost_tmp.length; j++) {
            if (this.totalCost_tmp[j] != "" && this.totalCost_tmp[j] != undefined) {
              this.totalCost = +this.totalCost_tmp[j] + +this.totalCost;
            }
          }
        }
        if (+this.ProjectCost < +this.totalCost) {
          this.initiativeService.viewMode ? false : this.swalTool.SumCost();
        }
        this.flag_fail = "yes";

        this.capexvalidate = false;
      }
      else {
        this.flag_fail = "no";
        this.capexvalidate = true;

      }
      this.CHk_validate();

      this.yearColumn[11] = this.totalCost;
      this.TotalYearColumn[11] = this.totalCost;
    }


    for (let j = 1; j <= 11; j++) {
      if (this.TotalYearColumn[j] == undefined) {
        this.TotalYearColumn[j] = "";
      }
    }

  }

  setCostMonth(value, year, index) {

    if (this.TotalYearColumn[1] != undefined && this.TotalYearColumn[1] != "") {
      if (value != undefined) {
        this.totalCost_tmp_m[year][index] = +value;
        this.TotalMonthColumn[year][index] = +value;

        if (this.totalCost_tmp_m[year].length > 1) {

          this.totalCost_m = 0;
          for (let j = 1; j < this.totalCost_tmp_m[year].length; j++) {
            if (this.totalCost_tmp_m[year][j] != "" && this.totalCost_tmp_m[year][j] != undefined) {
              this.totalCost_m = +this.totalCost_tmp_m[year][j] + +this.totalCost_m;
            }
          }

          if (+this.TotalYearColumn[1] * 1000000 != +this.totalCost_m || +this.totalCost_m == 0) {
            this.monthColumn[year][index] = "";
            this.totalCost_tmp_m[year][index] = "";
            this.TotalMonthColumn[year][index] = "";
            if (this.totalCost_tmp_m[year].length > 1) {
              this.totalCost_m = 0;
              for (let j = 1; j < this.totalCost_tmp_m[year].length; j++) {
                if (this.totalCost_tmp_m[year][j] != "" && this.totalCost_tmp_m[year][j] != undefined) {
                  this.totalCost_m = +this.totalCost_tmp_m[year][j] + +this.totalCost_m;
                }
              }
            }
            // this.initiativeService.viewMode ? false : this.swalTool.SumCostMonth();
            // this.flag_fail = "yes";
            this.flag_fail = "no";
            this.capexvalidate = false;

          }
          else {
            this.flag_fail = "no";
            this.capexvalidate = true;

          }
          this.CHk_validate();

          this.monthColumn[year][13] = this.totalCost_m;
          this.TotalMonthColumn[year][13] = this.totalCost_m;
        }

      }

      for (let j = 1; j <= 13; j++) {
        if (this.TotalMonthColumn[year][j] == undefined) {
          this.TotalMonthColumn[year][j] = "";
          this.flag_fail = "no";
          this.capexvalidate = true;

        }
      }
    }
    else {
      this.monthColumn[year][index] = "";
      this.totalCost_tmp_m[year][index] = "";
      this.initiativeService.viewMode ? false : this.swalTool.AlertAnnualInvestment();
      this.flag_fail = "yes";
      this.capexvalidate = false;

    }

    this.CHk_validate();

  }

  GetAddCAPEX() {
    this.AddCAPEX();
  }

  createItemInvestment(): FormGroup {
    return this.fb.group({
      OverallOther: [],
      MillionOther: [],
      yearOther1: [],
      yearOther2: [],
      yearOther3: [],
      yearOther4: [],
      yearOther5: [],
      yearOther6: [],
      yearOther7: [],
      yearOther8: [],
      yearOther9: [],
      yearOther10: [],
      FX: []
    });
  }

  AddCAPEX() {
    const control = this.CapexReqForm.get('capexPlane') as FormArray;
    control.push(this.createItemInvestment());
    this.isDisabledCapex = control.length > 1 ? false : true;
  }

  RemoveCAPEX(index: number) {
    const control = this.CapexReqForm.get('capexPlane') as FormArray;
    control.removeAt(index);
    this.isDisabledCapex = control.length > 1 ? false : true;
  }


  OnChangeRequestOPEX(value) {


    this.BudgetForm = value;

    if (value == "Annual") {
      this.capexInformationForm.get('budgetYear').setValue(this.year_next);
      this.showContingency = false;
      this.ferPool = false;
      this.inshow = false;
    }
    else if (value == "Mid Year") {
      this.capexInformationForm.get('budgetYear').setValue(this.year_now);
      this.showContingency = false;
      this.ferPool = false;
      this.inshow = false;
    }
    else {
      this.capexInformationForm.get('budgetYear').setValue(this.year_now);
      this.showContingency = true;
      this.ferPool = false;
      this.inshow = false;

      if (this.BetweenYear == "Transfer") {
        this.inshow = true;
        this.ferPool = false;
      } else if (this.BetweenYear == "Pool Budget") {
        this.inshow = false;
        this.ferPool = true;
      } else {
        this.ferPool = false;
        this.inshow = false;
      }


    }


  }


  OnChangeBetweenYear(value) {

    this.BetweenYear = value;

    if (value == "Transfer") {
      this.inshow = true;
      this.ferPool = false;
    } else if (value == "Pool Budget") {
      this.inshow = false;
      this.ferPool = true;
    } else {
      this.ferPool = false;
      this.inshow = false;
    }


  }

  transfer(value) {
    this.TransferForm = value
    this.capexInformationForm.controls['transferForm'].setValue(this.TransferForm);
    this.capexInformationForm.controls['poolBudgetForm'].setValue("");

  }


  GetAvailablePoolLIst(value) {
    this.PoolBudgetForm = value;
    if (value != "") {
      this.PoolYear_close = true;
    }
    else {
      this.PoolYear_close = false;
    }
    if (this.PoolYear != "" && this.PoolBudgetForm != "") {
      this.PoolID_list = [];
      this.capexService.GetPoolInnitiative(this.PoolBudgetForm, this.PoolYear, this.id).subscribe(resp => { this.PoolID_list = resp; this.process_pool_afterservice(); }); // this.PoolID_list = resp);
    }

  }

  process_pool_afterservice() {

    this.capexInformationForm.controls['poolID'].setValue("");
    this.capexInformationForm.controls['poolBudgetForm'].setValue(this.PoolBudgetForm);
    this.capexInformationForm.controls['transferForm'].setValue("");
    this.capexInformationForm.controls['availableBudget'].setValue("");
  }

  SetMarkAsTouchedFormGeneral() {

    this.capexInformationForm.controls.startingDate.markAllAsTouched();
    this.capexInformationForm.controls.projecctComRun.markAllAsTouched();
    this.capexInformationForm.controls.requestIniNoDate.markAllAsTouched();
    this.capexInformationForm.controls.projectCost.markAllAsTouched();
    this.capexInformationForm.controls.costCenterOfVP.markAllAsTouched();
    this.capexInformationForm.controls.codeCostCenterOfVP.markAllAsTouched();
    this.capexInformationForm.controls.budgetPeriod.markAllAsTouched();

  }

  bindMonth() {
    for (let i = 0; i < +this.year_m.length; i++) {
      this.capexService.GetMonthlyInvestmentPlan(this.id.toString(), this.capexInformationId,
        this.year_m[i]).subscribe(resp => {

          if (i == 0) {
            if (resp.length != 0) {

              for (let j = 0; j < resp.length; j++) {
                if (j == 0) {
                  const control = this.monthForm0.get('monthForm_list') as FormArray;

                  control.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                  control.at(0).get('m1').patchValue(resp[0].jan);
                  control.at(0).get('m2').patchValue(resp[0].feb);
                  control.at(0).get('m3').patchValue(resp[0].mar);
                  control.at(0).get('m4').patchValue(resp[0].apr);
                  control.at(0).get('m5').patchValue(resp[0].may);
                  control.at(0).get('m6').patchValue(resp[0].jun);
                  control.at(0).get('m7').patchValue(resp[0].jul);
                  control.at(0).get('m8').patchValue(resp[0].aug);
                  control.at(0).get('m9').patchValue(resp[0].sep);
                  control.at(0).get('m10').patchValue(resp[0].oct);
                  control.at(0).get('m11').patchValue(resp[0].nov);
                  control.at(0).get('m12').patchValue(resp[0].dec);
                  control.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                  control.at(0).get('flagFirst_row').patchValue(true);
                }
                else {
                  const control = this.monthForm0.get('monthForm_list') as FormArray;

                  this.addMonth_withvalue1(resp[j].investmentCost,
                    resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                    resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                    resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                    '', resp[j].investmentCostFx)
                }
              }

              this.ChangingValue_month_table1(this.year_m[i]);

            }
          }
          else if (i == 1) {
            if (resp.length != 0) {
              for (let j = 0; j < resp.length; j++) {
                const control = this.monthForm1.get('monthForm_list') as FormArray;
                if (j == 0) {
                  control.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                  control.at(0).get('m1').patchValue(resp[0].jan);
                  control.at(0).get('m2').patchValue(resp[0].feb);
                  control.at(0).get('m3').patchValue(resp[0].mar);
                  control.at(0).get('m4').patchValue(resp[0].apr);
                  control.at(0).get('m5').patchValue(resp[0].may);
                  control.at(0).get('m6').patchValue(resp[0].jun);
                  control.at(0).get('m7').patchValue(resp[0].jul);
                  control.at(0).get('m8').patchValue(resp[0].aug);
                  control.at(0).get('m9').patchValue(resp[0].sep);
                  control.at(0).get('m10').patchValue(resp[0].oct);
                  control.at(0).get('m11').patchValue(resp[0].nov);
                  control.at(0).get('m12').patchValue(resp[0].dec);
                  control.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                  control.at(0).get('flagFirst_row').patchValue(true);
                }
                else {
                  this.addMonth_withvalue2(resp[j].investmentCost,
                    resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                    resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                    resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                    '', resp[j].investmentCostFx)
                }
              }

              this.ChangingValue_month_table2(this.year_m[i]);

            }
          }
          else if (i == 2) {
            if (resp.length != 0) {
              for (let j = 0; j < resp.length; j++) {
                const control = this.monthForm2.get('monthForm_list') as FormArray;
                if (j == 0) {
                  control.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                  control.at(0).get('m1').patchValue(resp[0].jan);
                  control.at(0).get('m2').patchValue(resp[0].feb);
                  control.at(0).get('m3').patchValue(resp[0].mar);
                  control.at(0).get('m4').patchValue(resp[0].apr);
                  control.at(0).get('m5').patchValue(resp[0].may);
                  control.at(0).get('m6').patchValue(resp[0].jun);
                  control.at(0).get('m7').patchValue(resp[0].jul);
                  control.at(0).get('m8').patchValue(resp[0].aug);
                  control.at(0).get('m9').patchValue(resp[0].sep);
                  control.at(0).get('m10').patchValue(resp[0].oct);
                  control.at(0).get('m11').patchValue(resp[0].nov);
                  control.at(0).get('m12').patchValue(resp[0].dec);
                  control.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                  control.at(0).get('flagFirst_row').patchValue(true);
                }
                else {
                  this.addMonth_withvalue3(resp[j].investmentCost,
                    resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                    resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                    resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                    '', resp[j].investmentCostFx)
                }
              }
              this.ChangingValue_month_table3(this.year_m[i]);

            }
          }
          else if (i == 3) {
            if (resp.length != 0) {
              for (let j = 0; j < resp.length; j++) {
                const control = this.monthForm3.get('monthForm_list') as FormArray;
                if (j == 0) {
                  control.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                  control.at(0).get('m1').patchValue(resp[0].jan);
                  control.at(0).get('m2').patchValue(resp[0].feb);
                  control.at(0).get('m3').patchValue(resp[0].mar);
                  control.at(0).get('m4').patchValue(resp[0].apr);
                  control.at(0).get('m5').patchValue(resp[0].may);
                  control.at(0).get('m6').patchValue(resp[0].jun);
                  control.at(0).get('m7').patchValue(resp[0].jul);
                  control.at(0).get('m8').patchValue(resp[0].aug);
                  control.at(0).get('m9').patchValue(resp[0].sep);
                  control.at(0).get('m10').patchValue(resp[0].oct);
                  control.at(0).get('m11').patchValue(resp[0].nov);
                  control.at(0).get('m12').patchValue(resp[0].dec);
                  control.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                  control.at(0).get('flagFirst_row').patchValue(true);
                }
                else {
                  this.addMonth_withvalue4(resp[j].investmentCost,
                    resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                    resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                    resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                    '', resp[j].investmentCostFx)
                }
              }
              this.ChangingValue_month_table4(this.year_m[i]);

            }
          }
          else if (i == 4) {
            if (resp.length != 0) {
              for (let j = 0; j < resp.length; j++) {
                const control = this.monthForm4.get('monthForm_list') as FormArray;
                if (j == 0) {
                  control.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                  control.at(0).get('m1').patchValue(resp[0].jan);
                  control.at(0).get('m2').patchValue(resp[0].feb);
                  control.at(0).get('m3').patchValue(resp[0].mar);
                  control.at(0).get('m4').patchValue(resp[0].apr);
                  control.at(0).get('m5').patchValue(resp[0].may);
                  control.at(0).get('m6').patchValue(resp[0].jun);
                  control.at(0).get('m7').patchValue(resp[0].jul);
                  control.at(0).get('m8').patchValue(resp[0].aug);
                  control.at(0).get('m9').patchValue(resp[0].sep);
                  control.at(0).get('m10').patchValue(resp[0].oct);
                  control.at(0).get('m11').patchValue(resp[0].nov);
                  control.at(0).get('m12').patchValue(resp[0].dec);
                  control.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                  control.at(0).get('flagFirst_row').patchValue(true);
                }
                else {
                  this.addMonth_withvalue5(resp[j].investmentCost,
                    resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                    resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                    resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                    '', resp[j].investmentCostFx)
                }
                this.ChangingValue_month_table5(this.year_m[i]);

              }
            }
          }
          else if (i == 5) {
            if (resp.length != 0) {
              for (let j = 0; j < resp.length; j++) {
                const control = this.monthForm5.get('monthForm_list') as FormArray;
                if (j == 0) {
                  control.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                  control.at(0).get('m1').patchValue(resp[0].jan);
                  control.at(0).get('m2').patchValue(resp[0].feb);
                  control.at(0).get('m3').patchValue(resp[0].mar);
                  control.at(0).get('m4').patchValue(resp[0].apr);
                  control.at(0).get('m5').patchValue(resp[0].may);
                  control.at(0).get('m6').patchValue(resp[0].jun);
                  control.at(0).get('m7').patchValue(resp[0].jul);
                  control.at(0).get('m8').patchValue(resp[0].aug);
                  control.at(0).get('m9').patchValue(resp[0].sep);
                  control.at(0).get('m10').patchValue(resp[0].oct);
                  control.at(0).get('m11').patchValue(resp[0].nov);
                  control.at(0).get('m12').patchValue(resp[0].dec);
                  control.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                  control.at(0).get('flagFirst_row').patchValue(true);
                }
                else {
                  this.addMonth_withvalue6(resp[j].investmentCost,
                    resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                    resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                    resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                    '', resp[j].investmentCostFx)
                }

              }
              this.ChangingValue_month_table6(this.year_m[i]);

            }
          }
          else if (i == 6) {
            if (resp.length != 0) {
              for (let j = 0; j < resp.length; j++) {
                const control = this.monthForm6.get('monthForm_list') as FormArray;
                if (j == 0) {
                  control.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                  control.at(0).get('m1').patchValue(resp[0].jan);
                  control.at(0).get('m2').patchValue(resp[0].feb);
                  control.at(0).get('m3').patchValue(resp[0].mar);
                  control.at(0).get('m4').patchValue(resp[0].apr);
                  control.at(0).get('m5').patchValue(resp[0].may);
                  control.at(0).get('m6').patchValue(resp[0].jun);
                  control.at(0).get('m7').patchValue(resp[0].jul);
                  control.at(0).get('m8').patchValue(resp[0].aug);
                  control.at(0).get('m9').patchValue(resp[0].sep);
                  control.at(0).get('m10').patchValue(resp[0].oct);
                  control.at(0).get('m11').patchValue(resp[0].nov);
                  control.at(0).get('m12').patchValue(resp[0].dec);
                  control.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                  control.at(0).get('flagFirst_row').patchValue(true);
                }
                else {
                  this.addMonth_withvalue7(resp[j].investmentCost,
                    resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                    resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                    resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                    '', resp[j].investmentCostFx)
                }
              }
              this.ChangingValue_month_table7(this.year_m[i]);

            }
          }
          else if (i == 7) {
            if (resp.length != 0) {

              for (let j = 0; j < resp.length; j++) {
                const control = this.monthForm7.get('monthForm_list') as FormArray;
                if (j == 0) {
                  control.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                  control.at(0).get('m1').patchValue(resp[0].jan);
                  control.at(0).get('m2').patchValue(resp[0].feb);
                  control.at(0).get('m3').patchValue(resp[0].mar);
                  control.at(0).get('m4').patchValue(resp[0].apr);
                  control.at(0).get('m5').patchValue(resp[0].may);
                  control.at(0).get('m6').patchValue(resp[0].jun);
                  control.at(0).get('m7').patchValue(resp[0].jul);
                  control.at(0).get('m8').patchValue(resp[0].aug);
                  control.at(0).get('m9').patchValue(resp[0].sep);
                  control.at(0).get('m10').patchValue(resp[0].oct);
                  control.at(0).get('m11').patchValue(resp[0].nov);
                  control.at(0).get('m12').patchValue(resp[0].dec);
                  control.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                  control.at(0).get('flagFirst_row').patchValue(true);
                }
                else {
                  this.addMonth_withvalue8(resp[j].investmentCost,
                    resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                    resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                    resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                    '', resp[j].investmentCostFx)
                }
              }
              this.ChangingValue_month_table8(this.year_m[i]);

            }
          }
          else if (i == 8) {
            if (resp.length != 0) {

              for (let j = 0; j < resp.length; j++) {
                const control = this.monthForm8.get('monthForm_list') as FormArray;
                if (j == 0) {
                  control.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                  control.at(0).get('m1').patchValue(resp[0].jan);
                  control.at(0).get('m2').patchValue(resp[0].feb);
                  control.at(0).get('m3').patchValue(resp[0].mar);
                  control.at(0).get('m4').patchValue(resp[0].apr);
                  control.at(0).get('m5').patchValue(resp[0].may);
                  control.at(0).get('m6').patchValue(resp[0].jun);
                  control.at(0).get('m7').patchValue(resp[0].jul);
                  control.at(0).get('m8').patchValue(resp[0].aug);
                  control.at(0).get('m9').patchValue(resp[0].sep);
                  control.at(0).get('m10').patchValue(resp[0].oct);
                  control.at(0).get('m11').patchValue(resp[0].nov);
                  control.at(0).get('m12').patchValue(resp[0].dec);
                  control.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                  control.at(0).get('flagFirst_row').patchValue(true);
                }
                else {
                  this.addMonth_withvalue9(resp[j].investmentCost,
                    resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                    resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                    resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                    '', resp[j].investmentCostFx)
                }
              }

              this.ChangingValue_month_table9(this.year_m[i]);

            }
          }
          else if (i == 9) {
            if (resp.length != 0) {

              for (let j = 0; j < resp.length; j++) {
                const control = this.monthForm9.get('monthForm_list') as FormArray;
                if (j == 0) {
                  control.at(0).get('currencyTitle').patchValue(resp[0].investmentCost);
                  control.at(0).get('m1').patchValue(resp[0].jan);
                  control.at(0).get('m2').patchValue(resp[0].feb);
                  control.at(0).get('m3').patchValue(resp[0].mar);
                  control.at(0).get('m4').patchValue(resp[0].apr);
                  control.at(0).get('m5').patchValue(resp[0].may);
                  control.at(0).get('m6').patchValue(resp[0].jun);
                  control.at(0).get('m7').patchValue(resp[0].jul);
                  control.at(0).get('m8').patchValue(resp[0].aug);
                  control.at(0).get('m9').patchValue(resp[0].sep);
                  control.at(0).get('m10').patchValue(resp[0].oct);
                  control.at(0).get('m11').patchValue(resp[0].nov);
                  control.at(0).get('m12').patchValue(resp[0].dec);
                  control.at(0).get('currencyFx').patchValue(resp[0].investmentCostFx);
                  control.at(0).get('flagFirst_row').patchValue(true);
                }
                else {
                  this.addMonth_withvalue10(resp[j].investmentCost,
                    resp[j].jan, resp[j].feb, resp[j].mar, resp[j].apr,
                    resp[j].may, resp[j].jun, resp[j].jul, resp[j].aug,
                    resp[j].sep, resp[j].oct, resp[j].nov, resp[j].dec,
                    '', resp[j].investmentCostFx)
                }
              }

              this.ChangingValue_month_table10(this.year_m[i]);


            }
          }


        })
    }

  }

  CHk_validate() {
    this.tmp_error = "no";
    this.tmp_error_m = "no";
    this.tmp_error_AnnualTotal = "no";
    this.tmp_error_pool = "no";

    try {

      const control_annual = this.capexInformationForm.get('AnnualForm').get('annualForm_list') as FormArray;
      const AnnualTotal_overall = this.capexInformationForm.get('AnnualForm').get('AnnualTotal_overall') as FormArray;

      if (+AnnualTotal_overall.value > +this.ProjectCost) {
        this.tmp_error_AnnualTotal = "yes";
      } else {
        this.tmp_error_AnnualTotal = "no";
      }
      if (+AnnualTotal_overall.value < +this.ProjectCost) {
        this.tmp_error = "yes";
      }

      if (this.BetweenYear == "Pool Budget") {
        if (+this.AvailableBudget < +this.ProjectCost) {
          this.tmp_error_pool = "yes";
        }
      }


      const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
      let xx = +control_month0.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month0.at(i).get('overall').value.toString().replace('.00', '') !=
          (control_annual.at(i).get('y1').value * 1000000).toFixed(0)) {

          control_month0.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);
          this.tmp_error_m = "yes";
        }
        else {
          control_month0.at(i).get('flag_alert').patchValue(false);
          if (this.tmp_error_m != "yes") {
            this.tmp_error_m = "no";
          }

        }
      }

      const control_month1 = this.monthForm1.get('monthForm_list') as FormArray;
      xx = +control_month1.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;
        if (control_month1.at(i).get('overall').value != "") {


          if (control_month1.at(i).get('overall').value.toString().replace('.00', '') !=
            (control_annual.at(i).get('y2').value * 1000000).toFixed(0)) {

            control_month1.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);

            this.tmp_error_m = "yes";

          }
          else {
            control_month1.at(i).get('flag_alert').patchValue(false);

            if (this.tmp_error_m != "yes") {
              this.tmp_error_m = "no";
            }

          }

        }

      }

      const control_month2 = this.monthForm2.get('monthForm_list') as FormArray;
      xx = +control_month2.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month2.at(i).get('overall').value != "") {

          if (control_month2.at(i).get('overall').value.toString().replace('.00', '') !=
            (control_annual.at(i).get('y3').value * 1000000).toFixed(0)) {

            control_month2.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);

            this.tmp_error_m = "yes";

          }
          else {
            control_month2.at(i).get('flag_alert').patchValue(false);
            if (this.tmp_error_m != "yes") {
              this.tmp_error_m = "no";
            }
          }
        }
      }

      const control_month3 = this.monthForm3.get('monthForm_list') as FormArray;
      xx = +control_month3.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month3.at(i).get('overall').value) {

          if (control_month3.at(i).get('overall').value.toString().replace('.00', '') !=
            (control_annual.at(i).get('y4').value * 1000000).toFixed(0)) {

            control_month3.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);

            this.tmp_error_m = "yes";

          }
          else {
            control_month3.at(i).get('flag_alert').patchValue(false);
            if (this.tmp_error_m != "yes") {
              this.tmp_error_m = "no";
            }

          }
        }
      }

      const control_month4 = this.monthForm4.get('monthForm_list') as FormArray;
      xx = +control_month4.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month4.at(i).get('overall').value != "") {

          if (control_month4.at(i).get('overall').value.toString().replace('.00', '') !=
            (control_annual.at(i).get('y5').value * 1000000).toFixed(0)) {

            // if (control_month4.at(i).get('overall').value != control_annual.at(i).get('y5').value * 1000000) {
            control_month4.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);

            this.tmp_error_m = "yes";

          }
          else {
            control_month4.at(i).get('flag_alert').patchValue(false);
            if (this.tmp_error_m != "yes") {
              this.tmp_error_m = "no";
            }
          }
        }
      }

      const control_month5 = this.monthForm5.get('monthForm_list') as FormArray;
      xx = +control_month5.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month5.at(i).get('overall').value != "") {

          if (control_month5.at(i).get('overall').value.toString().replace('.00', '') !=
            (control_annual.at(i).get('y6').value * 1000000).toFixed(0)) {

            // if (control_month5.at(i).get('overall').value != control_annual.at(i).get('y6').value * 1000000) {

            control_month5.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);

            this.tmp_error_m = "yes";


          }
          else {
            control_month5.at(i).get('flag_alert').patchValue(false);
            if (this.tmp_error_m != "yes") {
              this.tmp_error_m = "no";
            }
          }
        }

      }

      const control_month6 = this.monthForm6.get('monthForm_list') as FormArray;
      xx = +control_month6.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month6.at(i).get('overall').value) {

          if (control_month6.at(i).get('overall').value.toString().replace('.00', '') !=
            (control_annual.at(i).get('y7').value * 1000000).toFixed(0)) {

            // if (control_month6.at(i).get('overall').value != control_annual.at(i).get('y7').value * 1000000) {
            control_month6.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);

            this.tmp_error_m = "yes";


          }
          else {
            control_month6.at(i).get('flag_alert').patchValue(false);
            if (this.tmp_error_m != "yes") {
              this.tmp_error_m = "no";
            }
          }
        }

      }

      const control_month7 = this.monthForm7.get('monthForm_list') as FormArray;
      xx = +control_month7.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month7.at(i).get('overall').value) {

          if (control_month7.at(i).get('overall').value.toString().replace('.00', '') !=
            (control_annual.at(i).get('y8').value * 1000000).toFixed(0)) {

            // if (control_month7.at(i).get('overall').value != control_annual.at(i).get('y8').value * 1000000) {
            control_month7.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);

            this.tmp_error_m = "yes";


          }
          else {
            control_month7.at(i).get('flag_alert').patchValue(false);
            if (this.tmp_error_m != "yes") {
              this.tmp_error_m = "no";
            }
          }
        }
      }

      const control_month8 = this.monthForm8.get('monthForm_list') as FormArray;
      xx = +control_month8.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month8.at(i).get('overall').value != "") {

          if (control_month8.at(i).get('overall').value.toString().replace('.00', '') !=
            (control_annual.at(i).get('y9').value * 1000000).toFixed(0)) {

            // if (control_month8.at(i).get('overall').value != control_annual.at(i).get('y9').value * 1000000) {
            control_month8.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);

            this.tmp_error_m = "yes";


          }
          else {
            control_month8.at(i).get('flag_alert').patchValue(false);
            if (this.tmp_error_m != "yes") {
              this.tmp_error_m = "no";
            }
          }
        }

      }

      const control_month9 = this.monthForm9.get('monthForm_list') as FormArray;
      xx = +control_month9.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month9.at(i).get('overall').value != "") {

          if (control_month9.at(i).get('overall').value.toString().replace('.00', '') !=
            (control_annual.at(i).get('y10').value * 1000000).toFixed(0)) {

            // if (control_month9.at(i).get('overall').value != control_annual.at(i).get('y10').value * 1000000) {
            control_month9.at(i).get('flag_alert').patchValue(this.initiativeService.viewMode ? false : true);

            this.tmp_error_m = "yes";

          }
          else {
            control_month9.at(i).get('flag_alert').patchValue(false);
            if (this.tmp_error_m != "yes") {
              this.tmp_error_m = "no";
            }
          }
        }

      }



      if (this.RequestIniNoDate == "" || this.RequestIniNoDate == null || this.RequestIniNoDate == undefined) {
        // this.flag_fail = "yes";
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
        return;
      }

      if (this.capexInformationForm.controls['costCenterOfVP'].value == "" ||
        this.capexInformationForm.controls['costCenterOfVP'].value == null ||
        this.capexInformationForm.controls['costCenterOfVP'].value == undefined) {

        // this.flag_fail = "yes";
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;

        return;

      }

      if (this.BudgetForm == "" || this.BudgetForm == null || this.BudgetForm == undefined) {

        // this.flag_fail = "yes";
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
        return;
      }
      if (this.CodeCostCenterOfVP == "" || this.CodeCostCenterOfVP == null || this.CodeCostCenterOfVP == undefined) {
        // this.flag_fail = "yes";
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
        return;
      }

      if (this.tmp_error_AnnualTotal == "yes") {
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
      }
      else if (this.tmp_error_pool == "yes") {

        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
      }
      else if (this.tmp_error_m == "yes") {

        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
      }
      else if (this.tmp_error == "yes") {

        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
      }
      else {

        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(true));
        this.capexvalidate = true;
      }
      //set flag capex loaded
      this.progressService.capexLoading = true;
    }
    catch {

    }
  }


  DisableCapexForm() {
    this.capexInformationForm.disable();
    if (this.AnnualForm)
      this.AnnualForm.disable();
    if (this.monthForm0)
      this.monthForm0.disable();
    if (this.monthForm1)
      this.monthForm1.disable();
    if (this.monthForm2)
      this.monthForm2.disable();
    if (this.monthForm3)
      this.monthForm3.disable();
    if (this.monthForm4)
      this.monthForm4.disable();
    if (this.monthForm5)
      this.monthForm5.disable();
    if (this.monthForm6)
      this.monthForm6.disable();
    if (this.monthForm7)
      this.monthForm7.disable();
    if (this.monthForm8)
      this.monthForm8.disable();
    if (this.monthForm9)
      this.monthForm9.disable();
  }

  patchReturnData(res: ReturnDetail) {
    this.capexInformationForm.patchValue({
      existingCost: res.existingCost,
      spendingActual: res.spendingActual,
      budgetAvailable: res.budgetAvailable,
      returnCost: res.returnCost,
      projectCost: res.projectCost,
      totalAvailable: res.totalAvailable
    });
  }

}
