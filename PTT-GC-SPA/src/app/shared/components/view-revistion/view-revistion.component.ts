import { CapexService } from '@services/capex/capex.service';
import { DetailService } from '@services/detail/detail.service';
import { StatusService } from '@services/status/status.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DateUtil } from '@utils/date.utils';
import { SwalTool } from '@tools/swal.tools';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/authentication/auth.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { StockToolsGuiDefinitionsFlagsFlagSquarepinOptions } from 'highcharts';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { Capexs } from '@models/Capexs';

@Component({
  selector: 'app-view-revistion',
  templateUrl: './view-revistion.component.html',
  styleUrls: ['./view-revistion.component.css']
})
export class ViewRevistionComponent implements OnInit {


  constructor(
    private initiativeService: InitiativeService,
    private detailService: DetailService,
    private capexService: CapexService,
    private dateUtil: DateUtil,
    private fb: FormBuilder,
    private swalTool: SwalTool,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private unauthorized: UnauthorizedService,
    private spinner: NgxSpinnerService,
    private statusService: StatusService

  ) {

  }

  // @Input() CapexType;

  selectedVP: string = '';
  selectionVP: string = '';
  name = 'CAPEX Information';
  // page = 'capex-information';

  id: any;

  CapexType = 'Createnew';

  capexType_: any;
  PoolID: any;
  AvailableBudget: any;

  bsConfigYear: Partial<BsDatepickerConfig>;
  minMode: BsDatepickerViewMode = 'year';
  capexStatus: any;
  BudgetAva: any;
  Cim: boolean;
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

  // CapexReqForm = this.fb.group({
  //   capexPlane: this.fb.array([
  //   ])
  // });

  capexvalidate = false;
  IsShowRevisionButton = false;
  capexInformationList: Capexs[];

  CapexReqForm: FormGroup;

  // InitiativeDetailForm: FormGroup;

  InitiativeDetailForm = this.fb.group({
    StartingDate: ['', Validators.required],
    ProjecctComRun: ['', Validators.required],
    RequestIniNoDate: ['', Validators.required],
    ProjectExePeriodYear: '',
    ProjectExePeriodMonth: '',
    BudgetStartDate: '',
    ProjectCost: ['', Validators.required],
    organization: '',
    ReasonOfChanging: '',
    BudgetForm: '',
    BetweenYear: '',
    TransferForm: '',
    PoolBudgetForm: '',
    strategy: '',
    PoolYear: '',
    CostCenterOfVP: [null, Validators.required],
    CodeCostCenterOfVP: ['', Validators.required],
    PoolID: ['', Validators.required],
    AvailableBudget: ['', Validators.required],

    StartingDate_tmp: '',
    ProjecctComRun_tmp: '',
    RequestIniNoDate_tmp: '',
    ShowRemark_tmp: false

  });

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
      fx: '',
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
    return this.InitiativeDetailForm.controls.ProjectCost.touched && this.InitiativeDetailForm.controls.ProjectCost.invalid;
  }

  get invalidOrganization() {
    return this.InitiativeDetailForm.controls.CostCenterOfVP.touched && this.InitiativeDetailForm.controls.CostCenterOfVP.invalid;
  }

  get invalidCodeCostCenterOfVP() {
    return this.InitiativeDetailForm.controls.CodeCostCenterOfVP.touched && this.InitiativeDetailForm.controls.CodeCostCenterOfVP.invalid;
  }

  get invalidStartingDate() {
    return this.InitiativeDetailForm.controls.StartingDate.touched && this.InitiativeDetailForm.controls.StartingDate.invalid;
  }

  get invalidFinishingDate() {
    return this.InitiativeDetailForm.controls.ProjecctComRun.touched && this.InitiativeDetailForm.controls.ProjecctComRun.invalid;
  }

  get invalidRequestIniNoDate() {
    return this.InitiativeDetailForm.controls.RequestIniNoDate.touched && this.InitiativeDetailForm.controls.RequestIniNoDate.invalid;
  }

  get invalidBudget() {
    return this.InitiativeDetailForm.controls.BudgetForm.touched && this.InitiativeDetailForm.controls.BudgetForm.invalid;
  }

  get invalidSubmit() {
    return this.capexvalidate;
  }

  //================= Value 20200422 =================

  StartingDate: any;
  ProjecctComRun: any;
  RequestIniNoDate: any;
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
  CostCenterOfVPTMP: any;
  CodeCostCenterOfVPTMP: any;
  ShowRemark_tmp_TMP: any;

  seq_: any;
  capexInformationId: any;

  typeTransaction_: any[];

  PoolID_list: any[];

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
  Capexid: any;

  get annualForm_() {
    return this.AnnualForm.get('annualForm_list') as FormArray;
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

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || null;
      this.initiativeService.id = params['id'] || null;
      this.Capexid = params['gotoId'] || null;
    });

    this.capexvalidate = false;

    this.initiativeService.GetOwners().subscribe(owners => this.owners = owners);


    this.year_now = (new Date()).getFullYear();
    this.year_next = (new Date()).getFullYear() + 1;

    //this.id = Number(sessionStorage.getItem('id'));
    this.bsConfigYear = Object.assign({}, { isAnimated: true, dateInputFormat: 'YYYY', minMode: this.minMode });

    //sessionStorage.setItem('id', this.id);
    // sessionStorage.setItem('page', 'capex-information');


    //this.GetInitiativeInformation(this.id);
    this.GetInitiative();



  }

  ChangeYear(value) {

    if (value != null && value != undefined) {
      const controls = this.InitiativeDetailForm.get('PoolYear') as FormArray;


      this.year = value.getFullYear();

      if (controls != null) {
        for (let i = 0; i < controls.length; i++) {
          controls.at(i).get('year').patchValue(this.year + i);
        }
      }
      if (this.PoolBudgetForm != "") {
        this.capexService.GetPoolInnitiative(this.PoolBudgetForm, this.year, this.id).subscribe(resp => this.PoolID_list = resp); // this.PoolID_list = resp);
      }


      this.setYear = this.dateUtil.SetYear(new Date(value));
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

  ngOnDestroy() {

    sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.invalidSubmit));
    sessionStorage.setItem('Capex_year_next', JSON.stringify(this.year_next));
    sessionStorage.setItem('Capex_year_now', JSON.stringify(this.year_now));
    sessionStorage.setItem('Capex_year_m', JSON.stringify(this.year_m));

    if (this.InitiativeDetailForm.controls.StartingDate.value != "" &&
      this.InitiativeDetailForm.controls.ProjecctComRun.value != "" &&
      this.InitiativeDetailForm.controls.RequestIniNoDate.value != "" &&
      this.InitiativeDetailForm.controls.ProjectCost.value != "" &&
      this.InitiativeDetailForm.controls.CostCenterOfVP.value != "" &&
      this.InitiativeDetailForm.controls.CodeCostCenterOfVP.value != "") {
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(true));
    }
    else {
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
    }

    let tmp_error = "no";
    let tmp_error_m = "no";

    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

    const AnnualTotal_overall = this.AnnualForm.get('AnnualTotal_overall') as FormArray;


    if (+AnnualTotal_overall.value < this.InitiativeDetailForm.controls['ProjectCost'].value) {
      tmp_error = "yes";
    }
    else {
      this.tmp_error = "no";
    }

    const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
    let xx = +control_month0.length
    for (let i = 0; i < xx; i++) {
      let overall = 0;
      if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {
        control_month0.at(i).get('flag_alert').patchValue(false);
        tmp_error_m = "yes";
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
          control_month1.at(i).get('flag_alert').patchValue(false);
          tmp_error_m = "yes";
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
          control_month2.at(i).get('flag_alert').patchValue(false);
          tmp_error_m = "yes";
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
          control_month3.at(i).get('flag_alert').patchValue(false);
          tmp_error_m = "yes";
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
          control_month4.at(i).get('flag_alert').patchValue(false);
          tmp_error_m = "yes";
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
          control_month5.at(i).get('flag_alert').patchValue(false);
          tmp_error_m = "yes";
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
          control_month6.at(i).get('flag_alert').patchValue(false);
          tmp_error_m = "yes";
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
          control_month7.at(i).get('flag_alert').patchValue(false);
          tmp_error_m = "yes";
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
          control_month8.at(i).get('flag_alert').patchValue(false);
          tmp_error_m = "yes";
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
          control_month9.at(i).get('flag_alert').patchValue(false);
          tmp_error_m = "yes";
        }
        else {
          control_month9.at(i).get('flag_alert').patchValue(false);
        }
      }

    }

    if (tmp_error != "yes" && tmp_error_m != "yes") {
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(true));
    }
    else {
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
    }


    if (this.InitiativeDetailForm.dirty) {
      sessionStorage.setItem('isDetailCapex', 'true');
      sessionStorage.setItem('DetailCapex', JSON.stringify(this.InitiativeDetailForm.value));
      // sessionStorage.setItem('')
    }

    if (this.AnnualForm.dirty) {
      sessionStorage.setItem('isAnnualCapex', 'true');
      sessionStorage.setItem('AnnualCapex', JSON.stringify(this.AnnualForm.value));
    }

    if (this.monthForm0.dirty) {
      sessionStorage.setItem('isMonthCapex1', 'true');
      sessionStorage.setItem('MonthCapex1', JSON.stringify(this.monthForm0.value));
    }

    if (this.monthForm1.dirty) {
      sessionStorage.setItem('isMonthCapex2', 'true');
      sessionStorage.setItem('MonthCapex2', JSON.stringify(this.monthForm1.value));
    }

    if (this.monthForm2.dirty) {
      sessionStorage.setItem('isMonthCapex3', 'true');
      sessionStorage.setItem('MonthCapex3', JSON.stringify(this.monthForm2.value));
    }

    if (this.monthForm3.dirty) {
      sessionStorage.setItem('isMonthCapex4', 'true');
      sessionStorage.setItem('MonthCapex4', JSON.stringify(this.monthForm3.value));
    }

    if (this.monthForm4.dirty) {
      sessionStorage.setItem('isMonthCapex5', 'true');
      sessionStorage.setItem('MonthCapex5', JSON.stringify(this.monthForm4.value));
    }

    if (this.monthForm5.dirty) {
      sessionStorage.setItem('isMonthCapex6', 'true');
      sessionStorage.setItem('MonthCapex6', JSON.stringify(this.monthForm5.value));
    }

    if (this.monthForm6.dirty) {
      sessionStorage.setItem('isMonthCapex7', 'true');
      sessionStorage.setItem('MonthCapex7', JSON.stringify(this.monthForm6.value));
    }

    if (this.monthForm7.dirty) {
      sessionStorage.setItem('isMonthCapex8', 'true');
      sessionStorage.setItem('MonthCapex8', JSON.stringify(this.monthForm7.value));
    }

    if (this.monthForm8.dirty) {
      sessionStorage.setItem('isMonthCapex9', 'true');
      sessionStorage.setItem('MonthCapex9', JSON.stringify(this.monthForm8.value));
    }

    if (this.monthForm9.dirty) {
      sessionStorage.setItem('isMonthCapex10', 'true');
      sessionStorage.setItem('MonthCapex10', JSON.stringify(this.monthForm9.value));
    }

  }

  CheckValidate() {

    if (sessionStorage.getItem('InitiativeValidate') === 'false') {
      setTimeout(() => this.SetMarkAsTouchedFormGeneral(), 50);
    }
  }

  IsDetailCapex() {
    if (sessionStorage.getItem('isDetailCapex') === 'true') {
      const DetailCapex = JSON.parse(sessionStorage.getItem('DetailCapex'));

      setTimeout(() => {

        this.StartingDateDisplayTMP = DetailCapex.StartingDate ? this.dateUtil.GetDate(new Date(DetailCapex.StartingDate_tmp)) : DetailCapex.StartingDate;
        this.ProjecctComRunDateDisplayTMP = DetailCapex.ProjecctComRun ? this.dateUtil.GetDate(new Date(DetailCapex.ProjecctComRun_tmp)) : DetailCapex.ProjecctComRun;
        this.RequestIniNoDateDateDisplayTMP = DetailCapex.RequestIniNoDate ? this.dateUtil.GetDate(new Date(DetailCapex.RequestIniNoDate_tmp)) : DetailCapex.RequestIniNoDate;

        this.BudgetStartDateTMP = DetailCapex.BudgetStartDate ? DetailCapex.BudgetStartDate : "";
        this.ProjectCostTMP = DetailCapex.ProjectCost ? DetailCapex.ProjectCost : "";
        this.organizationTMP = DetailCapex.organization ? DetailCapex.organization : null;
        this.ReasonOfChangingTMP = DetailCapex.ReasonOfChanging ? DetailCapex.ReasonOfChanging : "";
        this.BudgetFormTMP = DetailCapex.BudgetForm ? DetailCapex.BudgetForm : "";
        this.BetweenYearTMP = DetailCapex.BetweenYear ? DetailCapex.BetweenYear : "";
        this.TransferFormTMP = DetailCapex.TransferForm ? DetailCapex.TransferForm : "";
        this.PoolBudgetFormTMP = DetailCapex.PoolBudgetForm ? DetailCapex.PoolBudgetForm : "";
        this.strategyTMP = DetailCapex.strategy ? DetailCapex.strategy : "";
        this.CostCenterOfVPTMP = DetailCapex.CostCenterOfVP ? DetailCapex.CostCenterOfVP : "";
        this.CodeCostCenterOfVPTMP = DetailCapex.CodeCostCenterOfVP ? DetailCapex.CodeCostCenterOfVP : "";
        this.PoolID = DetailCapex.PoolID ? DetailCapex.PoolID : "";
        this.AvailableBudget = DetailCapex.AvailableBudget ? DetailCapex.AvailableBudget : "";

        this.ShowRemark_tmp_TMP = DetailCapex.ShowRemark_tmp ? DetailCapex.ShowRemark_tmp : false;
        this.RemarkShow = this.ShowRemark_tmp_TMP;

        this.BudgetForm = this.BudgetFormTMP;

        if (this.BudgetFormTMP == "Annual") {
          this.showContingency = false;
          this.ferPool = false;
          this.inshow = false;
        }
        else if (this.BudgetFormTMP == "Mid Year") {
          this.showContingency = false;
          this.ferPool = false;
          this.inshow = false;
        }
        else {
          this.showContingency = true;
          this.ferPool = false;
          this.inshow = false;

          if (this.BetweenYearTMP == "Transfer") {
            this.inshow = true;
            this.ferPool = false;
          } else if (this.BetweenYearTMP == "Pool Budget") {
            this.inshow = false;
            this.ferPool = true;
          } else {
            this.ferPool = false;
            this.inshow = false;
          }

        }

        this.InitiativeDetailForm.patchValue({
          StartingDate: this.StartingDateDisplayTMP,
          ProjecctComRun: this.ProjecctComRunDateDisplayTMP,
          RequestIniNoDate: this.RequestIniNoDateDateDisplayTMP,
          BudgetStartDate: this.BudgetStartDateTMP,
          ProjectCost: this.ProjectCostTMP,
          organization: this.organizationTMP,
          ReasonOfChanging: this.ReasonOfChangingTMP,
          BudgetForm: this.BudgetFormTMP,
          BetweenYear: this.BetweenYearTMP,
          TransferForm: this.TransferFormTMP,
          PoolBudgetForm: this.PoolBudgetFormTMP,
          strategy: this.strategyTMP,
          CostCenterOfVP: this.CostCenterOfVPTMP,
          CodeCostCenterOfVP: this.CodeCostCenterOfVPTMP,
          AvailableBudget: this.AvailableBudget,
          PoolID: this.PoolID
        });


      }, 500);
    }
  }


  IsDetailAnnual() {
    if (sessionStorage.getItem('isAnnualCapex') === 'true') {
      const AnnualCapex = JSON.parse(sessionStorage.getItem('AnnualCapex'));

      setTimeout(() => {


        const control = this.AnnualForm.get('annualForm_list') as FormArray;

        for (let i = 0; i < AnnualCapex.annualForm_list.length; i++) {
          if (i == 0) {
            control.at(0).get('currencyTitle').patchValue(AnnualCapex.annualForm_list[i].currencyTitle);
            control.at(0).get('y1').patchValue(AnnualCapex.annualForm_list[i].y1);
            control.at(0).get('y2').patchValue(AnnualCapex.annualForm_list[i].y2);
            control.at(0).get('y3').patchValue(AnnualCapex.annualForm_list[i].y3);
            control.at(0).get('y4').patchValue(AnnualCapex.annualForm_list[i].y4);
            control.at(0).get('y5').patchValue(AnnualCapex.annualForm_list[i].y5);
            control.at(0).get('y6').patchValue(AnnualCapex.annualForm_list[i].y6);
            control.at(0).get('y7').patchValue(AnnualCapex.annualForm_list[i].y7);
            control.at(0).get('y8').patchValue(AnnualCapex.annualForm_list[i].y8);
            control.at(0).get('y9').patchValue(AnnualCapex.annualForm_list[i].y9);
            control.at(0).get('y10').patchValue(AnnualCapex.annualForm_list[i].y10);
            control.at(0).get('overall').patchValue(AnnualCapex.annualForm_list[i].overall);
            control.at(0).get('fx').patchValue(AnnualCapex.annualForm_list[i].fx);
            control.at(0).get('flagFirst_row').patchValue(true);
          }
          else {
            this.addSellingPoint_withvalue(
              AnnualCapex.annualForm_list[i].currencyTitle,
              AnnualCapex.annualForm_list[i].y1,
              AnnualCapex.annualForm_list[i].y2,
              AnnualCapex.annualForm_list[i].y3,
              AnnualCapex.annualForm_list[i].y4,
              AnnualCapex.annualForm_list[i].y5,
              AnnualCapex.annualForm_list[i].y6,
              AnnualCapex.annualForm_list[i].y7,
              AnnualCapex.annualForm_list[i].y8,
              AnnualCapex.annualForm_list[i].y9,
              AnnualCapex.annualForm_list[i].y10,
              +AnnualCapex.annualForm_list[i].overall,
              AnnualCapex.annualForm_list[i].fx
            );
          }
        }

        // const AnnualTotal1 = this.AnnualForm.get('AnnualTotal1') as FormArray;

        let xx = +control.length
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
              if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
                  total = total + (+control.at(i).get('y' + j).value * +control.at(i).get('fx').value);
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
          this.AnnualForm.controls['AnnualTotal' + j].setValue(total.toFixed(2));
          AnnualTotal_overall = AnnualTotal_overall + +total.toFixed(2);
          AnnualTotal_overall = +AnnualTotal_overall.toFixed(2);
          this.AnnualTotal_overall_tmp = AnnualTotal_overall.toFixed(2);

          this.totalAnual[this.YearTable_capex[j - 1].columnname] = total.toFixed(2);

        }

        this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall.toFixed(2));


        if (+AnnualTotal_overall > +this.ProjectCost) {

          // this.swalTool.SumCost();
          this.flag_fail = "yes";
          this.capexvalidate = false;

        }
        else {
          this.capexvalidate = true;
          this.flag_fail = "no";

        }

        this.CHk_validate();


      }, 500);

    }
  }

  IsDetailMonth1() {
    if (sessionStorage.getItem('isMonthCapex1') === 'true') {
      const MonthCapex1 = JSON.parse(sessionStorage.getItem('MonthCapex1'));

      setTimeout(() => {
        const control = this.monthForm0.get('monthForm_list') as FormArray;
        for (let i = 0; i < MonthCapex1.monthForm_list.length; i++) {
          if (i == 0) {
            control.at(0).get('currencyTitle').patchValue(MonthCapex1.monthForm_list[i].currencyTitle);
            control.at(0).get('m1').patchValue(MonthCapex1.monthForm_list[i].m1);
            control.at(0).get('m2').patchValue(MonthCapex1.monthForm_list[i].m2);
            control.at(0).get('m3').patchValue(MonthCapex1.monthForm_list[i].m3);
            control.at(0).get('m4').patchValue(MonthCapex1.monthForm_list[i].m4);
            control.at(0).get('m5').patchValue(MonthCapex1.monthForm_list[i].m5);
            control.at(0).get('m6').patchValue(MonthCapex1.monthForm_list[i].m6);
            control.at(0).get('m7').patchValue(MonthCapex1.monthForm_list[i].m7);
            control.at(0).get('m8').patchValue(MonthCapex1.monthForm_list[i].m8);
            control.at(0).get('m9').patchValue(MonthCapex1.monthForm_list[i].m9);
            control.at(0).get('m10').patchValue(MonthCapex1.monthForm_list[i].m10);
            control.at(0).get('m11').patchValue(MonthCapex1.monthForm_list[i].m11);
            control.at(0).get('m12').patchValue(MonthCapex1.monthForm_list[i].m12);
            control.at(0).get('overall').patchValue(MonthCapex1.monthForm_list[i].overall);
            control.at(0).get('fx').patchValue(MonthCapex1.monthForm_list[i].fx);
            control.at(0).get('flagFirst_row').patchValue(true);
          }
          else {
            this.addMonth_withvalue1(
              MonthCapex1.monthForm_list[i].currencyTitle,
              MonthCapex1.monthForm_list[i].m1,
              MonthCapex1.monthForm_list[i].m2,
              MonthCapex1.monthForm_list[i].m3,
              MonthCapex1.monthForm_list[i].m4,
              MonthCapex1.monthForm_list[i].m5,
              MonthCapex1.monthForm_list[i].m6,
              MonthCapex1.monthForm_list[i].m7,
              MonthCapex1.monthForm_list[i].m8,
              MonthCapex1.monthForm_list[i].m9,
              MonthCapex1.monthForm_list[i].m10,
              MonthCapex1.monthForm_list[i].m11,
              MonthCapex1.monthForm_list[i].m12,
              +MonthCapex1.monthForm_list[i].overall,
              MonthCapex1.monthForm_list[i].fx
            );
          }
        }

        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

          if (+control.at(i).get('overall').value > +control_annual.at(i).get('y1').value * 1000000) {
            control.at(i).get('flag_alert').patchValue(false);
            // this.swalTool.SumCostMonth();
            this.flag_fail = "yes";
            this.capexvalidate = false;

          }
          else {
            this.flag_fail = "no";
            this.capexvalidate = true;

            control.at(i).get('flag_alert').patchValue(false);
          }

          this.CHk_validate();

        }



        for (let j = 1; j <= 12; j++) {
          let total = 0;
          for (let i = 0; i < xx; i++) {

            if (i != 0) {
              if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
                  total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

          mTotal = +this.totalAnual[this.year_m[0]] * 1000000;

        }

        this.monthForm0.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


        if ((+monthTotal_overall) > +mTotal) {

          // this.swalTool.SumCostMonth();
          this.flag_fail = "yes";
          this.capexvalidate = false;

        }
        else {
          this.flag_fail = "no";
          this.capexvalidate = true;

        }
        this.CHk_validate();



      }, 500);

    }
  }

  IsDetailMonth2() {
    if (sessionStorage.getItem('isMonthCapex2') === 'true') {
      const MonthCapex2 = JSON.parse(sessionStorage.getItem('MonthCapex2'));

      setTimeout(() => {
        const control = this.monthForm1.get('monthForm_list') as FormArray;
        for (let i = 0; i < MonthCapex2.monthForm_list.length; i++) {
          if (i == 0) {
            control.at(0).get('currencyTitle').patchValue(MonthCapex2.monthForm_list[i].currencyTitle);
            control.at(0).get('m1').patchValue(MonthCapex2.monthForm_list[i].m1);
            control.at(0).get('m2').patchValue(MonthCapex2.monthForm_list[i].m2);
            control.at(0).get('m3').patchValue(MonthCapex2.monthForm_list[i].m3);
            control.at(0).get('m4').patchValue(MonthCapex2.monthForm_list[i].m4);
            control.at(0).get('m5').patchValue(MonthCapex2.monthForm_list[i].m5);
            control.at(0).get('m6').patchValue(MonthCapex2.monthForm_list[i].m6);
            control.at(0).get('m7').patchValue(MonthCapex2.monthForm_list[i].m7);
            control.at(0).get('m8').patchValue(MonthCapex2.monthForm_list[i].m8);
            control.at(0).get('m9').patchValue(MonthCapex2.monthForm_list[i].m9);
            control.at(0).get('m10').patchValue(MonthCapex2.monthForm_list[i].m10);
            control.at(0).get('m11').patchValue(MonthCapex2.monthForm_list[i].m11);
            control.at(0).get('m12').patchValue(MonthCapex2.monthForm_list[i].m12);
            control.at(0).get('overall').patchValue(MonthCapex2.monthForm_list[i].overall);
            control.at(0).get('fx').patchValue(MonthCapex2.monthForm_list[i].fx);
            control.at(0).get('flagFirst_row').patchValue(true);
          }
          else {
            this.addMonth_withvalue2(
              MonthCapex2.monthForm_list[i].currencyTitle,
              MonthCapex2.monthForm_list[i].m1,
              MonthCapex2.monthForm_list[i].m2,
              MonthCapex2.monthForm_list[i].m3,
              MonthCapex2.monthForm_list[i].m4,
              MonthCapex2.monthForm_list[i].m5,
              MonthCapex2.monthForm_list[i].m6,
              MonthCapex2.monthForm_list[i].m7,
              MonthCapex2.monthForm_list[i].m8,
              MonthCapex2.monthForm_list[i].m9,
              MonthCapex2.monthForm_list[i].m10,
              MonthCapex2.monthForm_list[i].m11,
              MonthCapex2.monthForm_list[i].m12,
              +MonthCapex2.monthForm_list[i].overall,
              MonthCapex2.monthForm_list[i].fx
            );
          }
        }

        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

          if (+control.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
            control.at(i).get('flag_alert').patchValue(false);
            // this.swalTool.SumCostMonth();
            this.flag_fail = "yes";
            this.capexvalidate = false;

          }
          else {
            this.flag_fail = "no";
            this.capexvalidate = true;
            control.at(i).get('flag_alert').patchValue(false);
          }
          this.CHk_validate();

        }



        for (let j = 1; j <= 12; j++) {
          let total = 0;
          for (let i = 0; i < xx; i++) {

            if (i != 0) {
              if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
                  total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

          mTotal = +this.totalAnual[this.year_m[1]] * 1000000;

        }

        this.monthForm1.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


        if ((+monthTotal_overall) > +mTotal) {
          // this.swalTool.SumCostMonth();
          this.flag_fail = "yes";
          this.capexvalidate = false;
        }
        else {
          this.flag_fail = "no";
          this.capexvalidate = true;
        }
        this.CHk_validate();



      }, 500);

    }
  }

  IsDetailMonth3() {
    if (sessionStorage.getItem('isMonthCapex3') === 'true') {
      const MonthCapex3 = JSON.parse(sessionStorage.getItem('MonthCapex3'));

      setTimeout(() => {
        const control = this.monthForm2.get('monthForm_list') as FormArray;
        for (let i = 0; i < MonthCapex3.monthForm_list.length; i++) {
          if (i == 0) {
            control.at(0).get('currencyTitle').patchValue(MonthCapex3.monthForm_list[i].currencyTitle);
            control.at(0).get('m1').patchValue(MonthCapex3.monthForm_list[i].m1);
            control.at(0).get('m2').patchValue(MonthCapex3.monthForm_list[i].m2);
            control.at(0).get('m3').patchValue(MonthCapex3.monthForm_list[i].m3);
            control.at(0).get('m4').patchValue(MonthCapex3.monthForm_list[i].m4);
            control.at(0).get('m5').patchValue(MonthCapex3.monthForm_list[i].m5);
            control.at(0).get('m6').patchValue(MonthCapex3.monthForm_list[i].m6);
            control.at(0).get('m7').patchValue(MonthCapex3.monthForm_list[i].m7);
            control.at(0).get('m8').patchValue(MonthCapex3.monthForm_list[i].m8);
            control.at(0).get('m9').patchValue(MonthCapex3.monthForm_list[i].m9);
            control.at(0).get('m10').patchValue(MonthCapex3.monthForm_list[i].m10);
            control.at(0).get('m11').patchValue(MonthCapex3.monthForm_list[i].m11);
            control.at(0).get('m12').patchValue(MonthCapex3.monthForm_list[i].m12);
            control.at(0).get('overall').patchValue(MonthCapex3.monthForm_list[i].overall);
            control.at(0).get('fx').patchValue(MonthCapex3.monthForm_list[i].fx);
            control.at(0).get('flagFirst_row').patchValue(true);
          }
          else {
            this.addMonth_withvalue3(
              MonthCapex3.monthForm_list[i].currencyTitle,
              MonthCapex3.monthForm_list[i].m1,
              MonthCapex3.monthForm_list[i].m2,
              MonthCapex3.monthForm_list[i].m3,
              MonthCapex3.monthForm_list[i].m4,
              MonthCapex3.monthForm_list[i].m5,
              MonthCapex3.monthForm_list[i].m6,
              MonthCapex3.monthForm_list[i].m7,
              MonthCapex3.monthForm_list[i].m8,
              MonthCapex3.monthForm_list[i].m9,
              MonthCapex3.monthForm_list[i].m10,
              MonthCapex3.monthForm_list[i].m11,
              MonthCapex3.monthForm_list[i].m12,
              +MonthCapex3.monthForm_list[i].overall,
              MonthCapex3.monthForm_list[i].fx
            );
          }
        }

        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

          if (+control.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
            control.at(i).get('flag_alert').patchValue(false);
            // this.swalTool.SumCostMonth();
            this.flag_fail = "yes";
            this.capexvalidate = false;

          }
          else {
            this.flag_fail = "no";

            control.at(i).get('flag_alert').patchValue(false);
            this.capexvalidate = true;
          }
          this.CHk_validate();

        }



        for (let j = 1; j <= 12; j++) {
          let total = 0;
          for (let i = 0; i < xx; i++) {

            if (i != 0) {
              if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
                  total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

          mTotal = +this.totalAnual[this.year_m[2]] * 1000000;

        }

        this.monthForm1.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


        if ((+monthTotal_overall) > +mTotal) {
          // this.swalTool.SumCostMonth();
          this.flag_fail = "yes";
          this.capexvalidate = false;
        }
        else {
          this.flag_fail = "no";
          this.capexvalidate = true;
        }
        this.CHk_validate();


      }, 500);

    }
  }

  IsDetailMonth4() {
    if (sessionStorage.getItem('isMonthCapex4') === 'true') {
      const MonthCapex4 = JSON.parse(sessionStorage.getItem('MonthCapex4'));

      setTimeout(() => {
        const control = this.monthForm3.get('monthForm_list') as FormArray;
        for (let i = 0; i < MonthCapex4.monthForm_list.length; i++) {
          if (i == 0) {
            control.at(0).get('currencyTitle').patchValue(MonthCapex4.monthForm_list[i].currencyTitle);
            control.at(0).get('m1').patchValue(MonthCapex4.monthForm_list[i].m1);
            control.at(0).get('m2').patchValue(MonthCapex4.monthForm_list[i].m2);
            control.at(0).get('m3').patchValue(MonthCapex4.monthForm_list[i].m3);
            control.at(0).get('m4').patchValue(MonthCapex4.monthForm_list[i].m4);
            control.at(0).get('m5').patchValue(MonthCapex4.monthForm_list[i].m5);
            control.at(0).get('m6').patchValue(MonthCapex4.monthForm_list[i].m6);
            control.at(0).get('m7').patchValue(MonthCapex4.monthForm_list[i].m7);
            control.at(0).get('m8').patchValue(MonthCapex4.monthForm_list[i].m8);
            control.at(0).get('m9').patchValue(MonthCapex4.monthForm_list[i].m9);
            control.at(0).get('m10').patchValue(MonthCapex4.monthForm_list[i].m10);
            control.at(0).get('m11').patchValue(MonthCapex4.monthForm_list[i].m11);
            control.at(0).get('m12').patchValue(MonthCapex4.monthForm_list[i].m12);
            control.at(0).get('overall').patchValue(MonthCapex4.monthForm_list[i].overall);
            control.at(0).get('fx').patchValue(MonthCapex4.monthForm_list[i].fx);
            control.at(0).get('flagFirst_row').patchValue(true);
          }
          else {
            this.addMonth_withvalue4(
              MonthCapex4.monthForm_list[i].currencyTitle,
              MonthCapex4.monthForm_list[i].m1,
              MonthCapex4.monthForm_list[i].m2,
              MonthCapex4.monthForm_list[i].m3,
              MonthCapex4.monthForm_list[i].m4,
              MonthCapex4.monthForm_list[i].m5,
              MonthCapex4.monthForm_list[i].m6,
              MonthCapex4.monthForm_list[i].m7,
              MonthCapex4.monthForm_list[i].m8,
              MonthCapex4.monthForm_list[i].m9,
              MonthCapex4.monthForm_list[i].m10,
              MonthCapex4.monthForm_list[i].m11,
              MonthCapex4.monthForm_list[i].m12,
              +MonthCapex4.monthForm_list[i].overall,
              MonthCapex4.monthForm_list[i].fx
            );
          }
        }

        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

          if (+control.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
            control.at(i).get('flag_alert').patchValue(false);
            // this.swalTool.SumCostMonth();
            this.flag_fail = "yes";
            this.capexvalidate = false;

          }
          else {
            this.flag_fail = "no";
            control.at(i).get('flag_alert').patchValue(false);
            this.capexvalidate = true;
          }
          this.CHk_validate();

        }



        for (let j = 1; j <= 12; j++) {
          let total = 0;
          for (let i = 0; i < xx; i++) {

            if (i != 0) {
              if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
                  total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

          mTotal = +this.totalAnual[this.year_m[3]] * 1000000;

        }

        this.monthForm1.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


        if ((+monthTotal_overall) > +mTotal) {
          //  this.swalTool.SumCostMonth();
          this.flag_fail = "yes";
          this.capexvalidate = false;
        }
        else {
          this.flag_fail = "no";
          this.capexvalidate = true;
        }
        this.CHk_validate();


      }, 500);

    }
  }

  IsDetailMonth5() {
    if (sessionStorage.getItem('isMonthCapex5') === 'true') {
      const MonthCapex5 = JSON.parse(sessionStorage.getItem('MonthCapex5'));

      setTimeout(() => {
        const control = this.monthForm4.get('monthForm_list') as FormArray;
        for (let i = 0; i < MonthCapex5.monthForm_list.length; i++) {
          if (i == 0) {
            control.at(0).get('currencyTitle').patchValue(MonthCapex5.monthForm_list[i].currencyTitle);
            control.at(0).get('m1').patchValue(MonthCapex5.monthForm_list[i].m1);
            control.at(0).get('m2').patchValue(MonthCapex5.monthForm_list[i].m2);
            control.at(0).get('m3').patchValue(MonthCapex5.monthForm_list[i].m3);
            control.at(0).get('m4').patchValue(MonthCapex5.monthForm_list[i].m4);
            control.at(0).get('m5').patchValue(MonthCapex5.monthForm_list[i].m5);
            control.at(0).get('m6').patchValue(MonthCapex5.monthForm_list[i].m6);
            control.at(0).get('m7').patchValue(MonthCapex5.monthForm_list[i].m7);
            control.at(0).get('m8').patchValue(MonthCapex5.monthForm_list[i].m8);
            control.at(0).get('m9').patchValue(MonthCapex5.monthForm_list[i].m9);
            control.at(0).get('m10').patchValue(MonthCapex5.monthForm_list[i].m10);
            control.at(0).get('m11').patchValue(MonthCapex5.monthForm_list[i].m11);
            control.at(0).get('m12').patchValue(MonthCapex5.monthForm_list[i].m12);
            control.at(0).get('overall').patchValue(MonthCapex5.monthForm_list[i].overall);
            control.at(0).get('fx').patchValue(MonthCapex5.monthForm_list[i].fx);
            control.at(0).get('flagFirst_row').patchValue(true);
          }
          else {
            this.addMonth_withvalue4(
              MonthCapex5.monthForm_list[i].currencyTitle,
              MonthCapex5.monthForm_list[i].m1,
              MonthCapex5.monthForm_list[i].m2,
              MonthCapex5.monthForm_list[i].m3,
              MonthCapex5.monthForm_list[i].m4,
              MonthCapex5.monthForm_list[i].m5,
              MonthCapex5.monthForm_list[i].m6,
              MonthCapex5.monthForm_list[i].m7,
              MonthCapex5.monthForm_list[i].m8,
              MonthCapex5.monthForm_list[i].m9,
              MonthCapex5.monthForm_list[i].m10,
              MonthCapex5.monthForm_list[i].m11,
              MonthCapex5.monthForm_list[i].m12,
              +MonthCapex5.monthForm_list[i].overall,
              MonthCapex5.monthForm_list[i].fx
            );
          }
        }

        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

          if (+control.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
            control.at(i).get('flag_alert').patchValue(false);
            //  this.swalTool.SumCostMonth();
            this.flag_fail = "yes";

            this.capexvalidate = false;
          }
          else {
            this.flag_fail = "no";
            this.capexvalidate = true;

            control.at(i).get('flag_alert').patchValue(false);
          }
          this.CHk_validate();

        }



        for (let j = 1; j <= 12; j++) {
          let total = 0;
          for (let i = 0; i < xx; i++) {

            if (i != 0) {
              if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
                  total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

          mTotal = +this.totalAnual[this.year_m[4]] * 1000000;

        }

        this.monthForm1.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));

        if ((+monthTotal_overall) > +mTotal) {
          //  this.swalTool.SumCostMonth();
          this.flag_fail = "yes";
          this.capexvalidate = false;
        }
        else {
          this.flag_fail = "no";
          this.capexvalidate = true;
        }

        this.CHk_validate();

      }, 500);

    }
  }

  IsDetailMonth6() {
    if (sessionStorage.getItem('isMonthCapex6') === 'true') {
      const MonthCapex6 = JSON.parse(sessionStorage.getItem('MonthCapex6'));

      setTimeout(() => {
        const control = this.monthForm5.get('monthForm_list') as FormArray;
        for (let i = 0; i < MonthCapex6.monthForm_list.length; i++) {
          if (i == 0) {
            control.at(0).get('currencyTitle').patchValue(MonthCapex6.monthForm_list[i].currencyTitle);
            control.at(0).get('m1').patchValue(MonthCapex6.monthForm_list[i].m1);
            control.at(0).get('m2').patchValue(MonthCapex6.monthForm_list[i].m2);
            control.at(0).get('m3').patchValue(MonthCapex6.monthForm_list[i].m3);
            control.at(0).get('m4').patchValue(MonthCapex6.monthForm_list[i].m4);
            control.at(0).get('m5').patchValue(MonthCapex6.monthForm_list[i].m5);
            control.at(0).get('m6').patchValue(MonthCapex6.monthForm_list[i].m6);
            control.at(0).get('m7').patchValue(MonthCapex6.monthForm_list[i].m7);
            control.at(0).get('m8').patchValue(MonthCapex6.monthForm_list[i].m8);
            control.at(0).get('m9').patchValue(MonthCapex6.monthForm_list[i].m9);
            control.at(0).get('m10').patchValue(MonthCapex6.monthForm_list[i].m10);
            control.at(0).get('m11').patchValue(MonthCapex6.monthForm_list[i].m11);
            control.at(0).get('m12').patchValue(MonthCapex6.monthForm_list[i].m12);
            control.at(0).get('overall').patchValue(MonthCapex6.monthForm_list[i].overall);
            control.at(0).get('fx').patchValue(MonthCapex6.monthForm_list[i].fx);
            control.at(0).get('flagFirst_row').patchValue(true);
          }
          else {
            this.addMonth_withvalue5(
              MonthCapex6.monthForm_list[i].currencyTitle,
              MonthCapex6.monthForm_list[i].m1,
              MonthCapex6.monthForm_list[i].m2,
              MonthCapex6.monthForm_list[i].m3,
              MonthCapex6.monthForm_list[i].m4,
              MonthCapex6.monthForm_list[i].m5,
              MonthCapex6.monthForm_list[i].m6,
              MonthCapex6.monthForm_list[i].m7,
              MonthCapex6.monthForm_list[i].m8,
              MonthCapex6.monthForm_list[i].m9,
              MonthCapex6.monthForm_list[i].m10,
              MonthCapex6.monthForm_list[i].m11,
              MonthCapex6.monthForm_list[i].m12,
              +MonthCapex6.monthForm_list[i].overall,
              MonthCapex6.monthForm_list[i].fx
            );
          }
        }

        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

          if (+control.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
            control.at(i).get('flag_alert').patchValue(false);
            //  this.swalTool.SumCostMonth();
            this.flag_fail = "yes";
            this.capexvalidate = false;

          }
          else {
            this.flag_fail = "no";
            control.at(i).get('flag_alert').patchValue(false);
            this.capexvalidate = true;
          }
          this.CHk_validate();

        }



        for (let j = 1; j <= 12; j++) {
          let total = 0;
          for (let i = 0; i < xx; i++) {

            if (i != 0) {
              if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
                  total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

          mTotal = +this.totalAnual[this.year_m[5]] * 1000000;

        }

        this.monthForm1.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


        if ((+monthTotal_overall) > +mTotal) {
          //  this.swalTool.SumCostMonth();
          this.flag_fail = "yes";
          this.capexvalidate = false;
        }
        else {
          this.flag_fail = "no";
          this.capexvalidate = true;
        }
        this.CHk_validate();


      }, 500);

    }
  }

  IsDetailMonth7() {
    if (sessionStorage.getItem('isMonthCapex7') === 'true') {
      const MonthCapex7 = JSON.parse(sessionStorage.getItem('MonthCapex7'));

      setTimeout(() => {
        const control = this.monthForm6.get('monthForm_list') as FormArray;
        for (let i = 0; i < MonthCapex7.monthForm_list.length; i++) {
          if (i == 0) {
            control.at(0).get('currencyTitle').patchValue(MonthCapex7.monthForm_list[i].currencyTitle);
            control.at(0).get('m1').patchValue(MonthCapex7.monthForm_list[i].m1);
            control.at(0).get('m2').patchValue(MonthCapex7.monthForm_list[i].m2);
            control.at(0).get('m3').patchValue(MonthCapex7.monthForm_list[i].m3);
            control.at(0).get('m4').patchValue(MonthCapex7.monthForm_list[i].m4);
            control.at(0).get('m5').patchValue(MonthCapex7.monthForm_list[i].m5);
            control.at(0).get('m6').patchValue(MonthCapex7.monthForm_list[i].m6);
            control.at(0).get('m7').patchValue(MonthCapex7.monthForm_list[i].m7);
            control.at(0).get('m8').patchValue(MonthCapex7.monthForm_list[i].m8);
            control.at(0).get('m9').patchValue(MonthCapex7.monthForm_list[i].m9);
            control.at(0).get('m10').patchValue(MonthCapex7.monthForm_list[i].m10);
            control.at(0).get('m11').patchValue(MonthCapex7.monthForm_list[i].m11);
            control.at(0).get('m12').patchValue(MonthCapex7.monthForm_list[i].m12);
            control.at(0).get('overall').patchValue(MonthCapex7.monthForm_list[i].overall);
            control.at(0).get('fx').patchValue(MonthCapex7.monthForm_list[i].fx);
            control.at(0).get('flagFirst_row').patchValue(true);
          }
          else {
            this.addMonth_withvalue6(
              MonthCapex7.monthForm_list[i].currencyTitle,
              MonthCapex7.monthForm_list[i].m1,
              MonthCapex7.monthForm_list[i].m2,
              MonthCapex7.monthForm_list[i].m3,
              MonthCapex7.monthForm_list[i].m4,
              MonthCapex7.monthForm_list[i].m5,
              MonthCapex7.monthForm_list[i].m6,
              MonthCapex7.monthForm_list[i].m7,
              MonthCapex7.monthForm_list[i].m8,
              MonthCapex7.monthForm_list[i].m9,
              MonthCapex7.monthForm_list[i].m10,
              MonthCapex7.monthForm_list[i].m11,
              MonthCapex7.monthForm_list[i].m12,
              +MonthCapex7.monthForm_list[i].overall,
              MonthCapex7.monthForm_list[i].fx
            );
          }
        }

        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

          if (+control.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
            control.at(i).get('flag_alert').patchValue(false);
            //  this.swalTool.SumCostMonth();
            this.flag_fail = "yes";
            this.capexvalidate = false;

          }
          else {
            this.flag_fail = "no";
            control.at(i).get('flag_alert').patchValue(false);
            this.capexvalidate = true;
          }
          this.CHk_validate();

        }



        for (let j = 1; j <= 12; j++) {
          let total = 0;
          for (let i = 0; i < xx; i++) {

            if (i != 0) {
              if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
                  total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

          mTotal = +this.totalAnual[this.year_m[6]] * 1000000;

        }

        this.monthForm1.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


        if ((+monthTotal_overall) > +mTotal) {
          //  this.swalTool.SumCostMonth();
          this.capexvalidate = false;
          this.flag_fail = "yes";
        }
        else {
          this.flag_fail = "no";
          this.capexvalidate = true;

        }
        this.CHk_validate();


      }, 500);

    }
  }

  IsDetailMonth8() {
    if (sessionStorage.getItem('isMonthCapex8') === 'true') {
      const MonthCapex8 = JSON.parse(sessionStorage.getItem('MonthCapex8'));

      setTimeout(() => {
        const control = this.monthForm7.get('monthForm_list') as FormArray;
        for (let i = 0; i < MonthCapex8.monthForm_list.length; i++) {
          if (i == 0) {
            control.at(0).get('currencyTitle').patchValue(MonthCapex8.monthForm_list[i].currencyTitle);
            control.at(0).get('m1').patchValue(MonthCapex8.monthForm_list[i].m1);
            control.at(0).get('m2').patchValue(MonthCapex8.monthForm_list[i].m2);
            control.at(0).get('m3').patchValue(MonthCapex8.monthForm_list[i].m3);
            control.at(0).get('m4').patchValue(MonthCapex8.monthForm_list[i].m4);
            control.at(0).get('m5').patchValue(MonthCapex8.monthForm_list[i].m5);
            control.at(0).get('m6').patchValue(MonthCapex8.monthForm_list[i].m6);
            control.at(0).get('m7').patchValue(MonthCapex8.monthForm_list[i].m7);
            control.at(0).get('m8').patchValue(MonthCapex8.monthForm_list[i].m8);
            control.at(0).get('m9').patchValue(MonthCapex8.monthForm_list[i].m9);
            control.at(0).get('m10').patchValue(MonthCapex8.monthForm_list[i].m10);
            control.at(0).get('m11').patchValue(MonthCapex8.monthForm_list[i].m11);
            control.at(0).get('m12').patchValue(MonthCapex8.monthForm_list[i].m12);
            control.at(0).get('overall').patchValue(MonthCapex8.monthForm_list[i].overall);
            control.at(0).get('fx').patchValue(MonthCapex8.monthForm_list[i].fx);
            control.at(0).get('flagFirst_row').patchValue(true);
          }
          else {
            this.addMonth_withvalue7(
              MonthCapex8.monthForm_list[i].currencyTitle,
              MonthCapex8.monthForm_list[i].m1,
              MonthCapex8.monthForm_list[i].m2,
              MonthCapex8.monthForm_list[i].m3,
              MonthCapex8.monthForm_list[i].m4,
              MonthCapex8.monthForm_list[i].m5,
              MonthCapex8.monthForm_list[i].m6,
              MonthCapex8.monthForm_list[i].m7,
              MonthCapex8.monthForm_list[i].m8,
              MonthCapex8.monthForm_list[i].m9,
              MonthCapex8.monthForm_list[i].m10,
              MonthCapex8.monthForm_list[i].m11,
              MonthCapex8.monthForm_list[i].m12,
              +MonthCapex8.monthForm_list[i].overall,
              MonthCapex8.monthForm_list[i].fx
            );
          }
        }

        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

          if (+control.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
            control.at(i).get('flag_alert').patchValue(false);
            //  this.swalTool.SumCostMonth();
            this.flag_fail = "yes";
            this.capexvalidate = false;

          }
          else {
            this.flag_fail = "no";
            this.capexvalidate = true;

            control.at(i).get('flag_alert').patchValue(false);
          }
          this.CHk_validate();

        }



        for (let j = 1; j <= 12; j++) {
          let total = 0;
          for (let i = 0; i < xx; i++) {

            if (i != 0) {
              if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
                  total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

          mTotal = +this.totalAnual[this.year_m[7]] * 1000000;

        }

        this.monthForm1.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


        if ((+monthTotal_overall) > +mTotal) {
          //  this.swalTool.SumCostMonth();
          this.flag_fail = "yes";
          this.capexvalidate = false;
        }
        else {
          this.capexvalidate = true;
          this.flag_fail = "no";
        }
        this.CHk_validate();


      }, 500);

    }
  }

  IsDetailMonth9() {
    if (sessionStorage.getItem('isMonthCapex9') === 'true') {
      const MonthCapex9 = JSON.parse(sessionStorage.getItem('MonthCapex9'));

      setTimeout(() => {
        const control = this.monthForm8.get('monthForm_list') as FormArray;
        for (let i = 0; i < MonthCapex9.monthForm_list.length; i++) {
          if (i == 0) {
            control.at(0).get('currencyTitle').patchValue(MonthCapex9.monthForm_list[i].currencyTitle);
            control.at(0).get('m1').patchValue(MonthCapex9.monthForm_list[i].m1);
            control.at(0).get('m2').patchValue(MonthCapex9.monthForm_list[i].m2);
            control.at(0).get('m3').patchValue(MonthCapex9.monthForm_list[i].m3);
            control.at(0).get('m4').patchValue(MonthCapex9.monthForm_list[i].m4);
            control.at(0).get('m5').patchValue(MonthCapex9.monthForm_list[i].m5);
            control.at(0).get('m6').patchValue(MonthCapex9.monthForm_list[i].m6);
            control.at(0).get('m7').patchValue(MonthCapex9.monthForm_list[i].m7);
            control.at(0).get('m8').patchValue(MonthCapex9.monthForm_list[i].m8);
            control.at(0).get('m9').patchValue(MonthCapex9.monthForm_list[i].m9);
            control.at(0).get('m10').patchValue(MonthCapex9.monthForm_list[i].m10);
            control.at(0).get('m11').patchValue(MonthCapex9.monthForm_list[i].m11);
            control.at(0).get('m12').patchValue(MonthCapex9.monthForm_list[i].m12);
            control.at(0).get('overall').patchValue(MonthCapex9.monthForm_list[i].overall);
            control.at(0).get('fx').patchValue(MonthCapex9.monthForm_list[i].fx);
            control.at(0).get('flagFirst_row').patchValue(true);
          }
          else {
            this.addMonth_withvalue8(
              MonthCapex9.monthForm_list[i].currencyTitle,
              MonthCapex9.monthForm_list[i].m1,
              MonthCapex9.monthForm_list[i].m2,
              MonthCapex9.monthForm_list[i].m3,
              MonthCapex9.monthForm_list[i].m4,
              MonthCapex9.monthForm_list[i].m5,
              MonthCapex9.monthForm_list[i].m6,
              MonthCapex9.monthForm_list[i].m7,
              MonthCapex9.monthForm_list[i].m8,
              MonthCapex9.monthForm_list[i].m9,
              MonthCapex9.monthForm_list[i].m10,
              MonthCapex9.monthForm_list[i].m11,
              MonthCapex9.monthForm_list[i].m12,
              +MonthCapex9.monthForm_list[i].overall,
              MonthCapex9.monthForm_list[i].fx
            );
          }
        }

        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

          if (+control.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
            control.at(i).get('flag_alert').patchValue(false);
            //  this.swalTool.SumCostMonth();
            this.flag_fail = "yes";
            this.capexvalidate = false;

          }
          else {
            control.at(i).get('flag_alert').patchValue(false);
            this.capexvalidate = true;
            this.flag_fail = "no";

          }
          this.CHk_validate();

        }



        for (let j = 1; j <= 12; j++) {
          let total = 0;
          for (let i = 0; i < xx; i++) {

            if (i != 0) {
              if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
                  total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

          mTotal = +this.totalAnual[this.year_m[8]] * 1000000;

        }

        this.monthForm1.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


        if ((+monthTotal_overall) > +mTotal) {
          //  this.swalTool.SumCostMonth();
          this.flag_fail = "yes";
          this.capexvalidate = false;
        }
        else {
          this.flag_fail = "no";
          this.capexvalidate = true;

        }
        this.CHk_validate();


      }, 500);

    }
  }

  IsDetailMonth10() {
    if (sessionStorage.getItem('isMonthCapex10') === 'true') {
      const MonthCapex10 = JSON.parse(sessionStorage.getItem('MonthCapex10'));

      setTimeout(() => {
        const control = this.monthForm9.get('monthForm_list') as FormArray;
        for (let i = 0; i < MonthCapex10.monthForm_list.length; i++) {
          if (i == 0) {
            control.at(0).get('currencyTitle').patchValue(MonthCapex10.monthForm_list[i].currencyTitle);
            control.at(0).get('m1').patchValue(MonthCapex10.monthForm_list[i].m1);
            control.at(0).get('m2').patchValue(MonthCapex10.monthForm_list[i].m2);
            control.at(0).get('m3').patchValue(MonthCapex10.monthForm_list[i].m3);
            control.at(0).get('m4').patchValue(MonthCapex10.monthForm_list[i].m4);
            control.at(0).get('m5').patchValue(MonthCapex10.monthForm_list[i].m5);
            control.at(0).get('m6').patchValue(MonthCapex10.monthForm_list[i].m6);
            control.at(0).get('m7').patchValue(MonthCapex10.monthForm_list[i].m7);
            control.at(0).get('m8').patchValue(MonthCapex10.monthForm_list[i].m8);
            control.at(0).get('m9').patchValue(MonthCapex10.monthForm_list[i].m9);
            control.at(0).get('m10').patchValue(MonthCapex10.monthForm_list[i].m10);
            control.at(0).get('m11').patchValue(MonthCapex10.monthForm_list[i].m11);
            control.at(0).get('m12').patchValue(MonthCapex10.monthForm_list[i].m12);
            control.at(0).get('overall').patchValue(MonthCapex10.monthForm_list[i].overall);
            control.at(0).get('fx').patchValue(MonthCapex10.monthForm_list[i].fx);
            control.at(0).get('flagFirst_row').patchValue(true);
          }
          else {
            this.addMonth_withvalue9(
              MonthCapex10.monthForm_list[i].currencyTitle,
              MonthCapex10.monthForm_list[i].m1,
              MonthCapex10.monthForm_list[i].m2,
              MonthCapex10.monthForm_list[i].m3,
              MonthCapex10.monthForm_list[i].m4,
              MonthCapex10.monthForm_list[i].m5,
              MonthCapex10.monthForm_list[i].m6,
              MonthCapex10.monthForm_list[i].m7,
              MonthCapex10.monthForm_list[i].m8,
              MonthCapex10.monthForm_list[i].m9,
              MonthCapex10.monthForm_list[i].m10,
              MonthCapex10.monthForm_list[i].m11,
              MonthCapex10.monthForm_list[i].m12,
              +MonthCapex10.monthForm_list[i].overall,
              MonthCapex10.monthForm_list[i].fx
            );
          }
        }

        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

          if (+control.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
            control.at(i).get('flag_alert').patchValue(false);
            //  this.swalTool.SumCostMonth();
            this.flag_fail = "yes";

            this.capexvalidate = false;
          }
          else {
            this.flag_fail = "no";
            this.capexvalidate = true;
            control.at(i).get('flag_alert').patchValue(false);
          }
          this.CHk_validate();

        }



        for (let j = 1; j <= 12; j++) {
          let total = 0;
          for (let i = 0; i < xx; i++) {

            if (i != 0) {
              if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
                  total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

          mTotal = +this.totalAnual[this.year_m[9]] * 1000000;

        }

        this.monthForm1.controls['monthTotal_overall'].setValue(monthTotal_overall.toFixed(0));


        if ((+monthTotal_overall) > +mTotal) {
          //  this.swalTool.SumCostMonth();
          this.flag_fail = "yes";
          this.capexvalidate = false;
        }
        else {
          this.capexvalidate = true;
          this.flag_fail = "no";

        }
        this.CHk_validate();


      }, 500);

    }
  }



  GetInitiative() {

    // this.capexService.GetCapexsInfo(this.id.toString(), 'Createnew').subscribe(response => {
    this.capexService.GetCapexsInformationsByCapexInformationId(this.Capexid).subscribe(async response => {
      if (response) {
        this.id = response.initiativeId;

        this.capexInformationList = response;

        if (this.capexInformationList.length > 1) {
          this.IsShowRevisionButton = true;
        }


        this.seq_ = response.sequent;

        this.capexInformationId = response.capexInformationId;

        this.Initiative_tmp = response;


        let cost_;
        cost_ = response.projectCost;


        this.StartingDate = this.dateUtil.GetDate(new Date(response.startingDate));

        this.ProjecctComRun = this.dateUtil.GetDate(new Date(response.projecctComRun));
        this.ProjectExePeriodYear = response.projectExePeriodYear;
        this.ProjectExePeriodMonth = response.projectExePeriodMonth;
        this.AvailableBudget = response.availableBudget;
        this.PoolID = response.poolId;




        if (response.actionYear != "" && response.actionYear != null) {
          this.RequestIniNoDate = this.dateUtil.GetDate(new Date(response.actionYear));
        }
        else {
          this.RequestIniNoDate = "";
        }

        this.ProjectCost = cost_.toFixed(2);
        this.OldProjectCost = cost_.toFixed(2);
        this.organization = "";
        this.ReasonOfChanging = response.reasonOfChanging;

        if (response.reasonOfChanging != "") {
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


        // if (response.budgetPeriod == "Annual") {
        //   this.BudgetForm = "Annual";
        // }
        // else if (response.budgetPeriod == "Mid Year") {
        //   this.BudgetForm = "Mid Year";
        // }
        // else if (response.budgetPeriod == "Current year") {
        //   this.BudgetForm = "Current year";
        //   this.showContingency = true;
        //   this.ferPool = false;
        //   this.inshow = false;

        //   if (response.betweenYear == "Contingency") {
        //     this.BetweenYear = "Contingency";
        //   }
        //   else if (response.betweenYear == "Transfer") {
        //     this.BetweenYear = "Transfer";
        //   }
        //   else if (response.betweenYear == "BOD Approval on") {
        //     this.BetweenYear = "BOD Approval on";
        //   }
        //   else if (response.betweenYear == "Pool Budget") {
        //     this.BetweenYear = "Pool Budget";
        //   }

        //   if (this.BetweenYear == "Transfer") {
        //     this.inshow = true;
        //     this.ferPool = false;
        //   } else if (this.BetweenYear == "Pool Budget") {
        //     this.inshow = false;
        //     this.ferPool = true;
        //   } else {
        //     this.ferPool = false;
        //     this.inshow = false;
        //   }
        // }


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

        if (response.poolId != 0 && response.poolId != null) {
          let poolID_ = response.poolId;

          this.capexService.GetCapexsInfo(poolID_, 'Requestpool').subscribe(response2 => {

            if (response2 != null && response2 != undefined) {
              this.AvailableBudget = response2.availableBudget;


              this.InitiativeDetailForm.patchValue({
                PoolID: poolID_,
                AvailableBudget: this.AvailableBudget
              });

              this.InitiativeDetailForm.controls['PoolID'].setValue(poolID_);

            }

          });

        }


        this.capexService.GetAnnualInvestmentPlan(this.id.toString(), this.capexInformationId).subscribe(resp => {


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


            const control = this.AnnualForm.get('annualForm_list') as FormArray;

            control.at(0).get('currencyTitle').patchValue(resp[0].currency);
            control.at(0).get('y1').patchValue(resp[0].year1);
            control.at(0).get('y2').patchValue(resp[0].year2);
            control.at(0).get('y3').patchValue(resp[0].year3);
            control.at(0).get('y4').patchValue(resp[0].year4);
            control.at(0).get('y5').patchValue(resp[0].year5);
            control.at(0).get('y6').patchValue(resp[0].year6);
            control.at(0).get('y7').patchValue(resp[0].year7);
            control.at(0).get('y8').patchValue(resp[0].year8);
            control.at(0).get('y9').patchValue(resp[0].year9);
            control.at(0).get('y10').patchValue(resp[0].year10);
            control.at(0).get('overall').patchValue(resp[0].yearOverall);
            control.at(0).get('fx').patchValue(resp[0].currencyFx);
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
                  if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
                    if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
                      total = total + (+control.at(i).get('y' + j).value * +control.at(i).get('fx').value);
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
              AnnualTotal_overall = AnnualTotal_overall + +total;
              this.AnnualTotal_overall_tmp = +AnnualTotal_overall.toFixed(2);


              this.totalAnual[this.YearTable_capex[j - 1].columnname] = total;

            }


            this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall.toFixed(2));


          }


          for (let i = 0; i < +this.year_m.length; i++) {
            this.capexService.GetMonthlyInvestmentPlan(this.id.toString(), this.capexInformationId, this.year_m[i]).subscribe(resp => {

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
                      control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                      control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                      control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                      control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                      control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                      control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                      control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                      control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                      control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                      control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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


          this.CHk_validate();

          setTimeout(() => {
            this.InitiativeDetailForm.disable();
            this.AnnualForm.disable();
            this.monthForm0.disable();
            this.monthForm1.disable();
            this.monthForm2.disable();
            this.monthForm3.disable();
            this.monthForm4.disable();
            this.monthForm5.disable();
            this.monthForm6.disable();
            this.monthForm7.disable();
            this.monthForm8.disable();
            this.monthForm9.disable();
          }, 20);

        })



        this.InitiativeDetailForm = this.fb.group({

          StartingDate: [this.StartingDate, Validators.required],
          ProjecctComRun: [this.ProjecctComRun, Validators.required],
          RequestIniNoDate: [this.RequestIniNoDate, Validators.required],
          ProjectExePeriodYear: this.ProjectExePeriodYear,
          ProjectExePeriodMonth: this.ProjectExePeriodMonth,
          BudgetStartDate: this.BudgetStartDate,
          ProjectCost: [this.ProjectCost, Validators.required],
          organization: this.organization,
          ReasonOfChanging: this.ReasonOfChanging,
          BudgetForm: this.BudgetForm,
          BetweenYear: this.BetweenYear,
          TransferForm: this.TransferForm,
          PoolBudgetForm: this.PoolBudgetForm,
          strategy: this.strategy,
          CostCenterOfVP: [this.CostCenterOfVP, Validators.required],
          CodeCostCenterOfVP: [this.CodeCostCenterOfVP, Validators.required],
          AvailableBudget: [this.AvailableBudget, Validators.required],
          PoolID: [this.PoolID, Validators.required],
          PoolYear: this.PoolYear,

          StartingDate_tmp: response.startingDate,
          ProjecctComRun_tmp: response.projecctComRun,
          RequestIniNoDate_tmp: response.requestIniNoDate,
          ShowRemark_tmp: false

        });

        this.InitiativeDetailForm.patchValue({
          ProjecctComRun: this.ProjecctComRun
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
            fx: '',
            flagFirst_row: true
          })])
        })

        this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
        this.StartYear_1 = this.convertDate(this.RequestIniNoDate).substring(0, 4);

        this.YearTable_capex = [];

        for (let i = 0; i < 10; i++) {
          if (+this.StartYear_1 + i <= +this.EndYear_1) {
            this.YearTable_capex.push({
              columnname: +this.StartYear_1 + i,
              isEdit: true
            })
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

      }

    });


  }

  GetInitiativeInformation(id) {
    this.initiativeService.GetSuggestStatus(id).subscribe(response => {
      this.status = response.status;
      this.stage = response.stage;
      this.remark = response.remark;
      this.Cim = response.cim ? true : false;
      this.Capex = response.directCapex ? true : false;
      this.Strategy = response.strategy ? true : false;
      this.Max = response.max ? true : false;
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
      fx: '',
      flagFirst_row: false
    }));
  }


  addSellingPoint_withvalue(currencyTitle, y1, y2, y3, y4, y5, y6, y7, y8, y9, y10,
    overall, fx) {
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
      fx: fx,
      flagFirst_row: false
    }));
  }

  getPoolAva() {
    this.capexService.GetCapexsInfo(this.pool_id, 'Requestpool').subscribe(resp_1 => {
      if (resp_1) {

        if (resp_1.availableBudget == 0) {
          this.AvailableBudget = resp_1.projectCost;
        }
        else {
          this.AvailableBudget = resp_1.availableBudget;
        }

        this.InitiativeDetailForm.controls['AvailableBudget'].setValue(this.AvailableBudget);
      }
    });
  }

  changeRate(value, i) {

    const control = this.AnnualForm.get('annualForm_list') as FormArray;

    if (control.at(i).get('currencyTitle').value != "" && control.at(i).get('currencyTitle').value != undefined &&
      control.at(i).get('fx').value != "" && control.at(i).get('fx').value != undefined) {


      const control1 = this.monthForm0.get('monthForm_list') as FormArray;
      if (control1.at(i) == undefined) {
        this.addMonth_withvalue1(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value);
      }
      else {
        control1.at(i).get('currencyTitle').patchValue(control.at(i).get('currencyTitle').value.replace('Million ', ''));
      }

      const control2 = this.monthForm1.get('monthForm_list') as FormArray;
      if (control2.at(i) == undefined) {
        this.addMonth_withvalue2(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value);
      }
      else {
        control2.at(i).get('currencyTitle').patchValue(control.at(i).get('currencyTitle').value.replace('Million ', ''));
      }

      const control3 = this.monthForm2.get('monthForm_list') as FormArray;
      if (control3.at(i) == undefined) {
        this.addMonth_withvalue3(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value);
      }
      else {
        control3.at(i).get('currencyTitle').patchValue(control.at(i).get('currencyTitle').value.replace('Million ', ''));
      }

      const control4 = this.monthForm3.get('monthForm_list') as FormArray;
      if (control4.at(i) == undefined) {
        this.addMonth_withvalue4(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value);
      }
      else {
        control4.at(i).get('currencyTitle').patchValue(control.at(i).get('currencyTitle').value.replace('Million ', ''));
      }

      const control5 = this.monthForm4.get('monthForm_list') as FormArray;
      if (control5.at(i) == undefined) {
        this.addMonth_withvalue5(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value);
      }
      else {
        control5.at(i).get('currencyTitle').patchValue(control.at(i).get('currencyTitle').value.replace('Million ', ''));
      }

      const control6 = this.monthForm5.get('monthForm_list') as FormArray;
      if (control6.at(i) == undefined) {
        this.addMonth_withvalue6(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value);
      }
      else {
        control6.at(i).get('currencyTitle').patchValue(control.at(i).get('currencyTitle').value.replace('Million ', ''));
      }

      const control7 = this.monthForm6.get('monthForm_list') as FormArray;
      if (control7.at(i) == undefined) {
        this.addMonth_withvalue7(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value);
      }
      else {
        control7.at(i).get('currencyTitle').patchValue(control.at(i).get('currencyTitle').value.replace('Million ', ''));
      }

      const control8 = this.monthForm7.get('monthForm_list') as FormArray;
      if (control8.at(i) == undefined) {
        this.addMonth_withvalue8(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value);
      }
      else {
        control8.at(i).get('currencyTitle').patchValue(control.at(i).get('currencyTitle').value.replace('Million ', ''));
      }

      const control9 = this.monthForm8.get('monthForm_list') as FormArray;
      if (control9.at(i) == undefined) {
        this.addMonth_withvalue9(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value);
      }
      else {
        control9.at(i).get('currencyTitle').patchValue(control.at(i).get('currencyTitle').value.replace('Million ', ''));
      }

      const control10 = this.monthForm9.get('monthForm_list') as FormArray;
      if (control10.at(i) == undefined) {
        this.addMonth_withvalue10(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value);
      }
      else {
        control10.at(i).get('currencyTitle').patchValue(control.at(i).get('currencyTitle').value.replace('Million ', ''));
      }
    }

  }

  addMonth_withvalue1(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx) {
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
      fx: fx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue2(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx) {
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
      fx: fx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue3(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx) {
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
      fx: fx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue4(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx) {
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
      fx: fx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue5(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx) {
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
      fx: fx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue6(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx) {
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
      fx: fx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue7(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx) {
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
      fx: fx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue8(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx) {
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
      fx: fx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue9(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx) {
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
      fx: fx,
      flag_alert: false,
      flagFirst_row: true
    }));
  }

  addMonth_withvalue10(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx) {
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
      fx: fx,
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
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
              total = total + (+control.at(i).get('y' + j).value * +control.at(i).get('fx').value);
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
    const control = this.AnnualForm.get('annualForm_list') as FormArray;
    const AnnualTotal1 = this.AnnualForm.get('AnnualTotal1') as FormArray;

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
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
              total = total + (+control.at(i).get('y' + j).value * +control.at(i).get('fx').value);
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
      control.at(ii).get('fx').value != "" && control.at(ii).get('fx').value != undefined) {


      const control1 = this.monthForm0.get('monthForm_list') as FormArray;
      if (control1.at(ii) == undefined) {
        this.addMonth_withvalue1(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value);
      }
      else {
        control1.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control2 = this.monthForm1.get('monthForm_list') as FormArray;
      if (control2.at(ii) == undefined) {
        this.addMonth_withvalue2(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value);
      }
      else {
        control2.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control3 = this.monthForm2.get('monthForm_list') as FormArray;
      if (control3.at(ii) == undefined) {
        this.addMonth_withvalue3(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value);
      }
      else {
        control3.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control4 = this.monthForm3.get('monthForm_list') as FormArray;
      if (control4.at(ii) == undefined) {
        this.addMonth_withvalue4(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value);
      }
      else {
        control4.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control5 = this.monthForm4.get('monthForm_list') as FormArray;
      if (control5.at(ii) == undefined) {
        this.addMonth_withvalue5(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value);
      }
      else {
        control5.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control6 = this.monthForm5.get('monthForm_list') as FormArray;
      if (control6.at(ii) == undefined) {
        this.addMonth_withvalue6(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value);
      }
      else {
        control6.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control7 = this.monthForm6.get('monthForm_list') as FormArray;
      if (control7.at(ii) == undefined) {
        this.addMonth_withvalue7(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value);
      }
      else {
        control7.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control8 = this.monthForm7.get('monthForm_list') as FormArray;
      if (control8.at(ii) == undefined) {
        this.addMonth_withvalue8(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value);
      }
      else {
        control8.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control9 = this.monthForm8.get('monthForm_list') as FormArray;
      if (control9.at(ii) == undefined) {
        this.addMonth_withvalue9(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value);
      }
      else {
        control9.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control10 = this.monthForm9.get('monthForm_list') as FormArray;
      if (control10.at(ii) == undefined) {
        this.addMonth_withvalue10(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value);
      }
      else {
        control10.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
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

    if (+AnnualTotal_overall > +this.ProjectCost) {
      // //  this.swalTool.AlertAnnualInvestment();
      this.flag_fail = "yes";
      this.capexvalidate = false;
    }
    else {
      this.flag_fail = "no";
      this.capexvalidate = true;
    }
    this.CHk_validate();


  }

  ChangingValue(year_name) {
    // this.TotalYearColumn[i] = +value;
    const control = this.AnnualForm.get('annualForm_list') as FormArray;
    // const AnnualTotal1 = this.AnnualForm.get('AnnualTotal1') as FormArray;

    let xx = +control.length
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
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
              total = total + (+control.at(i).get('y' + j).value * +control.at(i).get('fx').value);
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
      this.AnnualForm.controls['AnnualTotal' + j].setValue(total.toFixed(2));
      AnnualTotal_overall = AnnualTotal_overall + +total.toFixed(2);
      AnnualTotal_overall = +AnnualTotal_overall.toFixed(2);
      this.AnnualTotal_overall_tmp = AnnualTotal_overall.toFixed(2);

      this.totalAnual[this.YearTable_capex[j - 1].columnname] = total.toFixed(2);

    }

    this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall.toFixed(2));


    if (+AnnualTotal_overall > +this.ProjectCost) {
      // //  this.swalTool.AlertAnnualInvestment();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";
    }

    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

    const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
    let xx_ = +control_month0.length
    for (let i = 0; i < xx_; i++) {
      let overall = 0;

      if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {
        control_month0.at(i).get('flag_alert').patchValue(false);

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
          control_month1.at(i).get('flag_alert').patchValue(false);




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
          control_month2.at(i).get('flag_alert').patchValue(false);




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
          control_month3.at(i).get('flag_alert').patchValue(false);



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
          control_month4.at(i).get('flag_alert').patchValue(false);




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
          control_month5.at(i).get('flag_alert').patchValue(false);




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
          control_month6.at(i).get('flag_alert').patchValue(false);




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
          control_month7.at(i).get('flag_alert').patchValue(false);




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
          control_month8.at(i).get('flag_alert').patchValue(false);




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
          control_month9.at(i).get('flag_alert').patchValue(false);




        }
        else {
          control_month9.at(i).get('flag_alert').patchValue(false);

        }
      }

    }

    this.CHk_validate();

    // this.ValidateSubmit();

  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
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
        fx: '',
        overall: '',
        flagFirst_row: true
      })])
    })

    this.YearTable_capex = [];

    this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
    this.StartYear_1 = this.year_now;


    for (let i = 0; i < 10; i++) {
      if (+this.StartYear_1 + i <= +this.EndYear_1) {
        this.YearTable_capex.push({
          columnname: +this.StartYear_1 + i,
          isEdit: true
        })
      }
      else {
        this.YearTable_capex.push({
          columnname: +this.StartYear_1 + i,
          isEdit: true
        })
      }
    }

  }

  initial_month() {

    //====================== Month Table ======================
    this.diffYear = +this.EndYear_1 - +this.StartYear_1;

    let startMonth = this.convertDate(this.RequestIniNoDate).substring(5).substring(0, 2);
    let endMonth = this.convertDate(this.ProjecctComRun).substring(5).substring(0, 2);

    this.year_m = [];
    for (let i = 0; i <= this.diffYear; i++) {
      this.year_m.push(+this.StartYear_1 + +i);
    }


    this.monthList_1 = [];
    this.monthList_x = [];
    this.monthList_last = [];

    if (this.diffYear == 0) {
      for (let i = 1; i <= 12; i++) {

        this.monthList_1.push({
          columnname: this.months[i],
          readOnly: true
        })

      }
    }
    else if (this.diffYear == 1) {
      for (let i = 1; i <= 12; i++) {

        this.monthList_1.push({
          columnname: this.months[i],
          readOnly: true
        })

        this.monthList_last.push({
          columnname: this.months[i],
          readOnly: true
        })

      }
    }
    else {
      for (let i = 1; i <= 12; i++) {

        this.monthList_1.push({
          columnname: this.months[i],
          readOnly: true
        })

        this.monthList_x.push({
          columnname: this.months[i],
          readOnly: true
        })

        this.monthList_last.push({
          columnname: this.months[i],
          readOnly: true
        })

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
        fx: '',
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
        fx: '',
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
        fx: '',
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
        fx: '',
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
        fx: '',
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
        fx: '',
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
        fx: '',
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
        fx: '',
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
        fx: '',
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
        fx: '',
        flag_alert: false,
        flagFirst_row: true
      })])
    })
  }





  ChangingValue_month_table1(year_name) {

    const control = this.monthForm0.get('monthForm_list') as FormArray;
    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

      if (+control.at(i).get('overall').value > +control_annual.at(i).get('y1').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        //  this.swalTool.SumCostMonth();
        this.flag_fail = "yes";

      }
      else {
        control.at(i).get('flag_alert').patchValue(false);
        this.flag_fail = "no";

      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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


    if ((+monthTotal_overall) > +mTotal) {
      //  this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    this.CHk_validate();

  }

  ChangingValue_month_table2(year_name) {


    const control = this.monthForm1.get('monthForm_list') as FormArray;
    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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
      if (+control.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        //  this.swalTool.SumCostMonth();
        this.flag_fail = "yes";

      }
      else {
        this.flag_fail = "no";
        control.at(i).get('flag_alert').patchValue(false);
      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

    if ((+monthTotal_overall) > +mTotal) {
      //  this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    this.CHk_validate();

  }

  ChangingValue_month_table3(year_name) {


    const control = this.monthForm2.get('monthForm_list') as FormArray;
    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

      if (+control.at(i).get('overall').value > +control_annual.at(i).get('y3').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        //  this.swalTool.SumCostMonth();
        this.flag_fail = "yes";

      }
      else {
        this.flag_fail = "no";
        control.at(i).get('flag_alert').patchValue(false);
      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

    if ((+monthTotal_overall) > +mTotal) {
      //  this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    this.CHk_validate();

  }

  ChangingValue_month_table4(year_name) {

    const control = this.monthForm3.get('monthForm_list') as FormArray;
    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

      if (+control.at(i).get('overall').value > +control_annual.at(i).get('y4').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        //  this.swalTool.SumCostMonth();
        this.flag_fail = "yes";

      }
      else {
        this.flag_fail = "no";
        control.at(i).get('flag_alert').patchValue(false);
      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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


    if ((+monthTotal_overall) > +mTotal) {
      //  this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    this.CHk_validate();

  }

  ChangingValue_month_table5(year_name) {

    const control = this.monthForm4.get('monthForm_list') as FormArray;
    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

      if (+control.at(i).get('overall').value > +control_annual.at(i).get('y5').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        //  this.swalTool.SumCostMonth();
        this.flag_fail = "yes";

      }
      else {
        control.at(i).get('flag_alert').patchValue(false);
        this.flag_fail = "no";
      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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


    if ((+monthTotal_overall) > +mTotal) {
      //  this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    this.CHk_validate();

  }

  ChangingValue_month_table6(year_name) {


    const control = this.monthForm5.get('monthForm_list') as FormArray;
    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

      if (+control.at(i).get('overall').value > +control_annual.at(i).get('y6').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        //  this.swalTool.SumCostMonth();
        this.flag_fail = "yes";


      }
      else {
        this.flag_fail = "no";
        control.at(i).get('flag_alert').patchValue(false);
      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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


    if ((+monthTotal_overall) > +mTotal) {
      //  this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    this.CHk_validate();

  }

  ChangingValue_month_table7(year_name) {

    const control = this.monthForm6.get('monthForm_list') as FormArray;
    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

      if (+control.at(i).get('overall').value > +control_annual.at(i).get('y7').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        //  this.swalTool.SumCostMonth();
        this.flag_fail = "yes";


      }
      else {
        control.at(i).get('flag_alert').patchValue(false);
        this.flag_fail = "no";

      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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

    if ((+monthTotal_overall) > +mTotal) {
      //  this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    this.CHk_validate();

  }

  ChangingValue_month_table8(year_name) {

    const control = this.monthForm7.get('monthForm_list') as FormArray;
    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

      if (+control.at(i).get('overall').value > +control_annual.at(i).get('y8').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        //  this.swalTool.SumCostMonth();
        this.flag_fail = "yes";


      }
      else {
        control.at(i).get('flag_alert').patchValue(false);
        this.flag_fail = "no";

      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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


    if ((+monthTotal_overall) > +mTotal) {
      //  this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    this.CHk_validate();

  }

  ChangingValue_month_table9(year_name) {


    const control = this.monthForm8.get('monthForm_list') as FormArray;
    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

      if (+control.at(i).get('overall').value > +control_annual.at(i).get('y9').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        //  this.swalTool.SumCostMonth();
        this.flag_fail = "yes";


      }
      else {
        control.at(i).get('flag_alert').patchValue(false);
        this.flag_fail = "no";

      }

    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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


    if ((+monthTotal_overall) > +mTotal) {
      //  this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    this.CHk_validate();

  }

  ChangingValue_month_table10(year_name) {


    const control = this.monthForm9.get('monthForm_list') as FormArray;
    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

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

      if (+control.at(i).get('overall').value > +control_annual.at(i).get('y10').value * 1000000) {
        control.at(i).get('flag_alert').patchValue(false);
        //  this.swalTool.SumCostMonth();
        this.flag_fail = "yes";

      }
      else {
        control.at(i).get('flag_alert').patchValue(false);
        this.flag_fail = "no";

      }


    }



    for (let j = 1; j <= 12; j++) {
      let total = 0;
      for (let i = 0; i < xx; i++) {

        if (i != 0) {
          if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
            if (control.at(i).get('m' + j).value != undefined && control.at(i).get('m' + j).value != "") {
              total = total + (+control.at(i).get('m' + j).value * +control.at(i).get('fx').value);
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



    if ((+monthTotal_overall) > +mTotal) {
      //  this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    this.CHk_validate();

  }

  setStartingDate(date1: string) {

    if (date1 != "") {
      this.capexvalidate = true;
    }
    else {
      this.capexvalidate = false;
    }



    if (this.StartingDate != date1) {
      this.StartingDate = date1;
      this.InitiativeDetailForm.controls['RequestIniNoDate'].setValue('');
      this.InitiativeDetailForm.controls['StartingDate'].setValue(date1);

      this.ProjecctComRun = "";
      this.RequestIniNoDate = "";

      this.InitiativeDetailForm.patchValue({
        ProjecctComRun: "",
        StartingDate_tmp: this.convertDate(date1)
      });

    }
  }

  setFinishDate(date1) {


    if (date1 != "") {
      this.capexvalidate = true;
    }
    else {
      this.capexvalidate = false;
    }

    if (this.convertDate(this.StartingDate) < this.convertDate(date1)) {
      if (this.ProjecctComRun != date1) {

        this.ProjecctComRun = date1
        this.EndYear_1 = this.convertDate(date1).substring(0, 4);

        this.InitiativeDetailForm.patchValue({
          ProjecctComRun: this.ProjecctComRun,
          StartingDate: this.StartingDate,
          RequestIniNoDate: "",
          StartingDate_tmp: this.convertDate(this.StartingDate),
          ProjecctComRun_tmp: this.convertDate(this.ProjecctComRun)
        });

        //     // this.initial_year();
        this.Diff();
        //     // this.initial_month();

      }
    }

    // else {
    //   // this.ProjecctComRun = "";
    //   this.InitiativeDetailForm.patchValue({
    //     ProjecctComRun: "",
    //     RequestIniNoDate: "",
    //     ProjecctComRun_tmp: "",
    //     RequestIniNoDate_tmp: ""
    //   });

    // }

  }

  setRequestDate(date1: string) {


    if (date1 != "") {
      if (this.RequestIniNoDate != date1) {

        let oldYear = this.year_m;

        this.RequestIniNoDate = date1;


        if (this.RequestIniNoDate != "") {

          this.StartYear_1 = this.convertDate(date1).substring(0, 4);

          let d1 = this.convertDate(this.StartingDate);
          let d2 = this.convertDate(this.ProjecctComRun);
          let d3 = this.convertDate(this.RequestIniNoDate);

          if ((d3 > d1 && d3 < d2) == false) {
            this.RequestIniNoDate = "";
            this.InitiativeDetailForm.controls['RequestIniNoDate'].setValue('');
            // this.InitiativeDetailForm.patchValue({ RequestIniNoDate: this.RequestIniNoDate });
            //  this.swalTool.DateBudgetStart();
            this.flag_fail = "yes";
            this.capexvalidate = false;
          }
          else {
            this.flag_fail = "no";
            this.capexvalidate = true;

            this.InitiativeDetailForm.patchValue({
              RequestIniNoDate: this.RequestIniNoDate,
              RequestIniNoDate_tmp: this.convertDate(this.RequestIniNoDate)
            });

          }


        }

        this.YearTable_capex = [];

        //====================== Year Table ======================
        let control_old = this.AnnualForm.get('annualForm_list') as FormArray;
        let oldValYear = control_old.value;

        this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
        this.StartYear_1 = this.convertDate(this.RequestIniNoDate).substring(0, 4);
        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

        for (let i = 0; i < 10; i++) {

          let yearname = +this.StartYear_1 + i;


          if (yearname <= +this.EndYear_1) {
            this.YearTable_capex.push({
              columnname: yearname,
              isEdit: true
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
              if (control_annual.at(i).get('fx').value != undefined && control_annual.at(i).get('fx').value != "") {
                if (control_annual.at(i).get('y' + j).value != undefined && control_annual.at(i).get('y' + j).value != "") {
                  total = total + (+control_annual.at(i).get('y' + j).value * +control_annual.at(i).get('fx').value);
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


        if (+AnnualTotal_overall > +this.ProjectCost) {
          //  this.swalTool.AlertAnnualInvestment();
          this.flag_fail = "yes";
          this.capexvalidate = false;

        }
        else {
          this.flag_fail = "no";
          this.capexvalidate = true;
        }




        if (this.monthForm0 == undefined) {
          this.initial_month();
        }
        else {

          //====================== Month Table ======================
          this.diffYear = +this.EndYear_1 - +this.StartYear_1;

          let startMonth = this.convertDate(this.RequestIniNoDate).substring(5).substring(0, 2);
          let endMonth = this.convertDate(this.ProjecctComRun).substring(5).substring(0, 2);

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
                  readOnly: true
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
                  readOnly: true
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
                  readOnly: true
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
                  readOnly: true
                })
              }

              this.monthList_x.push({
                columnname: this.months[i],
                readOnly: true
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
                  readOnly: true
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

      this.Diff();

      this.CHk_validate();

    }

    // this.initial_month();


  }

  convertDate(di) {
    let x = "";
    if (di != "" && di != null) {
      x = di.substring(6).substring(0, 4) + '-' + di.substring(3).substring(0, 2) + '-' + di.substring(0, 2);
    }

    return x;
  }

  convertDate_display(di) {
    let x = di.substring(8).substring(0, 2) + "/" + di.substring(5).substring(0, 2) + "/" + di.substring(0, 4);
    return x;
  }

  setProjectCost(value) {

    var x1 = +value.replace(/,/g, "");
    var x2 = +this.OldProjectCost;


    if (x1 != x2) {
      this.RemarkShow = true;
      this.InitiativeDetailForm.controls['ShowRemark_tmp'].setValue(true);
    }
    else {
      this.RemarkShow = false;
    }

    this.ProjectCost = value.replace(/,/g, "");
    this.InitiativeDetailForm.controls['ProjectCost'].setValue(value.replace(/,/g, ""));

    if (+this.AnnualTotal_overall_tmp > +this.ProjectCost) {
      //  this.swalTool.AlertAnnualInvestment();
      this.flag_fail = "yes";
      this.capexvalidate = false;
    }
    else {
      this.flag_fail = "no";
      this.capexvalidate = true;
    }
    this.CHk_validate();


    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

    const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
    let xx = +control_month0.length
    for (let i = 0; i < xx; i++) {
      let overall = 0;

      if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {
        control_month0.at(i).get('flag_alert').patchValue(false);

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
          control_month1.at(i).get('flag_alert').patchValue(false);


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
          control_month2.at(i).get('flag_alert').patchValue(false);




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
          control_month3.at(i).get('flag_alert').patchValue(false);



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
          control_month4.at(i).get('flag_alert').patchValue(false);




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
          control_month5.at(i).get('flag_alert').patchValue(false);




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
          control_month6.at(i).get('flag_alert').patchValue(false);




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
          control_month7.at(i).get('flag_alert').patchValue(false);




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
          control_month8.at(i).get('flag_alert').patchValue(false);




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
          control_month9.at(i).get('flag_alert').patchValue(false);




        }
        else {
          control_month9.at(i).get('flag_alert').patchValue(false);

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


      var date1 = new Date(this.convertDate(this.RequestIniNoDate));
      var date2 = new Date(this.convertDate(this.ProjecctComRun));

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
      this.InitiativeDetailForm.controls['ProjectExePeriodYear'].setValue(this.ProjectExePeriodYear);

      this.ProjectExePeriodMonth = m + 1;
      this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].setValue(this.ProjectExePeriodMonth);

      ////================= Year ======================
      // var x = this.ProjecctComRun.substring(6).substring(0, 4);
      // var y = this.RequestIniNoDate.substring(6).substring(0, 4);

      // if (+x > +y) {
      //   var diff = +x - y;

      //   this.ProjectExePeriodYear = diff
      //   this.InitiativeDetailForm.controls['ProjectExePeriodYear'].setValue(this.ProjectExePeriodYear);

      // }
      // else {
      //   this.InitiativeDetailForm.controls['ProjectExePeriodYear'].setValue("0");

      // }

      ////================= Month ======================

      // var x2 = this.ProjecctComRun.substring(3).substring(0, 2);
      // var y2 = this.RequestIniNoDate.substring(3).substring(0, 2);

      // if (+x2 > +y2) {
      //   var diff2 = +x2 - y2;

      //   this.ProjectExePeriodMonth = diff2
      //   this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].setValue(this.ProjectExePeriodMonth);

      // }
      // else {

      //   if (x == y) {
      //     this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].setValue("1");
      //   }
      //   else {
      //     this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].setValue("0");
      //   }

      // }

    }
    else {
      this.InitiativeDetailForm.controls['ProjectExePeriodYear'].setValue("0");
      this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].setValue("0");

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

      if (+this.ProjectCost < +this.totalCost) {
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
        //  this.swalTool.SumCost();
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

          if (+this.TotalYearColumn[1] * 1000000 < +this.totalCost_m) {
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
            ////  this.swalTool.SumCostMonth();
            this.flag_fail = "yes";
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
      //  this.swalTool.AlertAnnualInvestment();
      this.flag_fail = "yes";
      this.capexvalidate = false;

    }

    this.CHk_validate();

  }

  SearchOwnerName(event) {

    this.GetOwners(event.term.toString());
  }

  ClearOwnerName() {
    this.GetOwners();
  }

  GetOwners(Text?) {

    this.params.text = Text ? Text : '';

    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.owners = owners;
    });
  }

  GetOwnersVP(event) {
    this.params.text = event ? event : '';
    if (this.params.text != '') {
      this.initiativeService.GetOwnersVP(this.params).subscribe((response) => {
        this.selectedVP = response['email'];
      });
    } else {
      this.selectedVP = '';
    }

  }


  GetUser() {
  }


  setOwner(event) {
    this.InitiativeDetailForm.controls['CostCenterOfVP'].setValue(event.ownerName);
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

  RemoveCAPEXTH() {

  }

  OnChangeRequestOPEX(value) {


    this.BudgetForm = value;

    if (value == "Annual") {
      this.showContingency = false;
      this.ferPool = false;
      this.inshow = false;
    }
    else if (value == "Mid Year") {
      this.showContingency = false;
      this.ferPool = false;
      this.inshow = false;
    }
    else {
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
    this.InitiativeDetailForm.controls['TransferForm'].setValue(this.TransferForm);
    this.InitiativeDetailForm.controls['PoolBudgetForm'].setValue("");

  }

  pool(value) {
    this.PoolBudgetForm = value;
    if (this.PoolBudgetForm != "") {
      this.capexService.GetPoolInnitiative(this.PoolBudgetForm, this.year, this.id).subscribe(resp => this.PoolID_list = resp); // this.PoolID_list = resp);
    }

    this.InitiativeDetailForm.controls['PoolBudgetForm'].setValue(this.PoolBudgetForm);
    this.InitiativeDetailForm.controls['TransferForm'].setValue("");
  }


  SetMarkAsTouchedFormGeneral() {

    this.InitiativeDetailForm.controls.StartingDate.markAllAsTouched();
    this.InitiativeDetailForm.controls.ProjecctComRun.markAllAsTouched();
    this.InitiativeDetailForm.controls.RequestIniNoDate.markAllAsTouched();
    this.InitiativeDetailForm.controls.ProjectCost.markAllAsTouched();
    this.InitiativeDetailForm.controls.CostCenterOfVP.markAllAsTouched();
    this.InitiativeDetailForm.controls.CodeCostCenterOfVP.markAllAsTouched();
    this.InitiativeDetailForm.controls.BudgetForm.markAllAsTouched();

  }

  EnabledButtonSave() {
    this.isDisabledSubmit = true;
    this.isDisabledDraft = true;
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
                  control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                  control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                  control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                  control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                  control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                  control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                  control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                  control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                  control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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
                  control.at(0).get('fx').patchValue(resp[0].investmentCostFx);
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

    try {

      const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;
      const AnnualTotal_overall = this.AnnualForm.get('AnnualTotal_overall') as FormArray;

      if (+AnnualTotal_overall.value != this.InitiativeDetailForm.controls['ProjectCost'].value) {
        this.tmp_error = "yes";
      } else {
        this.tmp_error = "no";
      }

      if (+this.AvailableBudget < this.ProjectCost) {
        this.tmp_error = "yes";
      }

      const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
      let xx = +control_month0.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {
          control_month0.at(i).get('flag_alert').patchValue(false);
          this.tmp_error_m = "yes";
        }
        else {
          control_month0.at(i).get('flag_alert').patchValue(false);
          this.tmp_error_m = "no";

        }
      }

      const control_month1 = this.monthForm1.get('monthForm_list') as FormArray;
      xx = +control_month1.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;
        if (control_month1.at(i).get('overall').value != "") {

          if (control_month1.at(i).get('overall').value != control_annual.at(i).get('y2').value * 1000000) {
            control_month1.at(i).get('flag_alert').patchValue(false);
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
          if (control_month2.at(i).get('overall').value != control_annual.at(i).get('y3').value * 1000000) {
            control_month2.at(i).get('flag_alert').patchValue(false);

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
          if (control_month3.at(i).get('overall').value != control_annual.at(i).get('y4').value * 1000000) {
            control_month3.at(i).get('flag_alert').patchValue(false);

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
          if (control_month4.at(i).get('overall').value != control_annual.at(i).get('y5').value * 1000000) {
            control_month4.at(i).get('flag_alert').patchValue(false);

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
          if (control_month5.at(i).get('overall').value != control_annual.at(i).get('y6').value * 1000000) {
            control_month5.at(i).get('flag_alert').patchValue(false);

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

          if (control_month6.at(i).get('overall').value != control_annual.at(i).get('y7').value * 1000000) {
            control_month6.at(i).get('flag_alert').patchValue(false);

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
          if (control_month7.at(i).get('overall').value != control_annual.at(i).get('y8').value * 1000000) {
            control_month7.at(i).get('flag_alert').patchValue(false);

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
          if (control_month8.at(i).get('overall').value != control_annual.at(i).get('y9').value * 1000000) {
            control_month8.at(i).get('flag_alert').patchValue(false);

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
          if (control_month9.at(i).get('overall').value != control_annual.at(i).get('y10').value * 1000000) {
            control_month9.at(i).get('flag_alert').patchValue(false);

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

      if (this.flag_fail == "yes") {
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

    }
    catch {
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.capexvalidate = false;
    }
  }




  CHk_validate_submit() {

    this.SetMarkAsTouchedFormGeneral();

    this.tmp_error = "no";
    this.tmp_error_m = "no";

    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;
    const AnnualTotal_overall = this.AnnualForm.get('AnnualTotal_overall') as FormArray;

    if (+AnnualTotal_overall.value != this.InitiativeDetailForm.controls['ProjectCost'].value) {
      this.tmp_error = "yes";
    } else {
      this.tmp_error = "no";
    }

    if (+this.AvailableBudget < this.ProjectCost) {
      this.tmp_error = "yes";
    }

    const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
    let xx = +control_month0.length
    for (let i = 0; i < xx; i++) {
      let overall = 0;

      if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {
        control_month0.at(i).get('flag_alert').patchValue(false);
        this.tmp_error_m = "yes";
      }
      else {
        control_month0.at(i).get('flag_alert').patchValue(false);
        this.tmp_error_m = "no";

      }
    }

    const control_month1 = this.monthForm1.get('monthForm_list') as FormArray;
    xx = +control_month1.length
    for (let i = 0; i < xx; i++) {
      let overall = 0;
      if (control_month1.at(i).get('overall').value != "") {

        if (control_month1.at(i).get('overall').value != control_annual.at(i).get('y2').value * 1000000) {
          control_month1.at(i).get('flag_alert').patchValue(false);
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
        if (control_month2.at(i).get('overall').value != control_annual.at(i).get('y3').value * 1000000) {
          control_month2.at(i).get('flag_alert').patchValue(false);

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
        if (control_month3.at(i).get('overall').value != control_annual.at(i).get('y4').value * 1000000) {
          control_month3.at(i).get('flag_alert').patchValue(false);

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
        if (control_month4.at(i).get('overall').value != control_annual.at(i).get('y5').value * 1000000) {
          control_month4.at(i).get('flag_alert').patchValue(false);

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
        if (control_month5.at(i).get('overall').value != control_annual.at(i).get('y6').value * 1000000) {
          control_month5.at(i).get('flag_alert').patchValue(false);

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

        if (control_month6.at(i).get('overall').value != control_annual.at(i).get('y7').value * 1000000) {
          control_month6.at(i).get('flag_alert').patchValue(false);

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
        if (control_month7.at(i).get('overall').value != control_annual.at(i).get('y8').value * 1000000) {
          control_month7.at(i).get('flag_alert').patchValue(false);

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
        if (control_month8.at(i).get('overall').value != control_annual.at(i).get('y9').value * 1000000) {
          control_month8.at(i).get('flag_alert').patchValue(false);

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
        if (control_month9.at(i).get('overall').value != control_annual.at(i).get('y10').value * 1000000) {
          control_month9.at(i).get('flag_alert').patchValue(false);

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
  }


  Revision(controls) {
    this.capexService.revistionData = controls.capexInformationId;
    var url;
    if (controls.capexType == 'AddmoreCapex') {
      url = '/initiative/view-revistion-addmore';
    }
    else {
      url = '/initiative/view-revistion';
    }
    window.open(url);
  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }


}
