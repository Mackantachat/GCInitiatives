import { CapexService } from '@services/capex/capex.service';
import { DetailService } from '@services/detail/detail.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DateUtil } from '@utils/date.utils';
import { SwalTool } from '@tools/swal.tools';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/authentication/auth.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-return-capex',
  templateUrl: './return-capex.component.html',
  styleUrls: ['./return-capex.component.css']
})
export class ReturnCapexComponent implements OnInit {


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
  ) {

  }

  name = 'CAPEX Information';
  page = 'capex-information';

  @Input() id;
  @Input() capex;

  CapexType = 'Return';

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

  status: string;
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

  // CapexReqForm = this.fb.group({
  //   capexPlane: this.fb.array([
  //   ])
  // });

  CapexReqForm: FormGroup;
  capexStatus: any;
  capexType: any;

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
    CostCenterOfVP: ['', Validators.required],
    CodeCostCenterOfVP: ['', Validators.required],
    ExistingCost: '',
    AdditionalCost: 0,
    StartingDate_tmp: '',
    ProjecctComRun_tmp: '',
    RequestIniNoDate_tmp: '',
    ShowRemark_tmp: false,
    SpendingActual: 0,
    BudgetAvailable: '',
    TotalAvailable: '',
    TotalProjectCost: '',

    ReturnCost: 0

  });


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

  get invalidSubmit() {
    return this.InitiativeDetailForm.valid;
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

  YearTable = [];

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
  ExistingCost: any;
  ShowRemark_tmp_TMP: any;

  revision_: any;
  seq_: any;
  capexInformationId: any;

  SpendingActual: any;
  BudgetAvailable: any;
  TotalAvailable: any;
  AdditionalCost: any;

  ReturnCost: number;


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
  existingMonth_: any;

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

    this.initiativeService.GetOwners().subscribe(owners => this.owners = owners);

    this.year_now = (new Date()).getFullYear();
    this.year_next = (new Date()).getFullYear() + 1;

    this.id = Number(sessionStorage.getItem('id'));
    this.GetInitiativeInformation(this.id);
    this.GetInitiative();

    // sessionStorage.setItem('id', this.id.toString());
    // sessionStorage.setItem('page', 'capex-information');
    this.getCurrentSpendingActual();
  }

  CheckValidate() {

    if (sessionStorage.getItem('InitiativeValidate') === 'false') {
      setTimeout(() => this.SetMarkAsTouchedFormGeneral(), 50);
    }
  }

  GetInitiative() {

    this.capexService.GetCapexsInfo(this.id.toString(), 'Return').subscribe(response => {

      this.capexStatus = response.capexStatus;
      this.capexType = response.capexType;

      setTimeout(() => {
        if (this.capexStatus == "Submit") {
          // this.InitiativeDetailForm.disable();
          // this.AnnualForm.disable();
          // this.monthForm0.disable();
          // this.monthForm1.disable();
          // this.monthForm2.disable();
          // this.monthForm3.disable();
          // this.monthForm4.disable();
          // this.monthForm5.disable();
          // this.monthForm6.disable();
          // this.monthForm7.disable();
          // this.monthForm8.disable();
          // this.monthForm9.disable();
        }

      }, 100);

    });

    this.capexService.GetCapexsInfo(this.id.toString(), "Return").subscribe(response => {


      let AdditionalCost_ = 0;

      if (response == null) {


        this.initiativeService.GetInitiative(this.id).subscribe(response => {

          this.Initiative_tmp = response;

          let cost_;

          if (response.costEstCapexType == "USD") {
            cost_ = response.costEstCapex * response.fxExchange;
          }
          else {
            cost_ = response.costEstCapex;
          }

          console.log("COST===");
          console.log(+cost_.toFixed(2));
          this.StartingDate = this.dateUtil.GetDate(new Date(response.startingDate));

          this.ProjecctComRun = this.dateUtil.GetDate(new Date(response.finishingDate));
          this.ProjectExePeriodYear = "0";
          this.ProjectExePeriodMonth = "0";
          this.BudgetStartDate = "";
          this.RequestIniNoDate = ""; //=== MOCK-up Data
          this.ExistingCost = +cost_.toFixed(2);
          this.SpendingActual = '0.00';
          this.BudgetAvailable = parseFloat((+this.ExistingCost - this.SpendingActual).toString()).toFixed(2);
          this.ProjectCost = +cost_.toFixed(2) - 0;
          this.AdditionalCost = '';
          this.OldProjectCost = cost_.toFixed(2);
          this.organization = "";
          this.ReasonOfChanging = "";
          this.BudgetForm = "";
          this.BetweenYear = "";
          this.TransferForm = "";
          this.PoolBudgetForm = "";
          this.strategy = "MillionBaht";
          this.CostCenterOfVP = "";
          this.CodeCostCenterOfVP = "";

          //====================== Year Table ======================


          this.AnnualForm = this.fb.group({
            ExistingBudget_total: '',
            SpendingActual_total: '',
            BudgetAvailable_total: '',
            TotalAdditional_total: '',

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

          this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
          // this.year_now;
          this.StartYear_1 = this.convertDate(this.RequestIniNoDate).substring(0, 4);

          console.log(this.StartYear_1);

          for (let i = 0; i < 10; i++) {
            if ((+this.StartYear_1 + i <= +this.EndYear_1) && (+this.StartYear_1 + i >= +this.year_now)) {
              this.YearTable.push({
                columnname: +this.StartYear_1 + i,
                isEdit: false
              })
            }
            else {
              this.YearTable.push({
                columnname: +this.StartYear_1 + i,
                isEdit: true
              })
            }

          }

          this.InitiativeDetailForm = this.fb.group({
            StartingDate: [this.StartingDate, Validators.required],
            ProjecctComRun: [this.ProjecctComRun, Validators.required],
            RequestIniNoDate: [this.RequestIniNoDate, Validators.required],
            ProjectExePeriodYear: this.ProjectExePeriodYear,
            ProjectExePeriodMonth: this.ProjectExePeriodMonth,
            BudgetStartDate: this.BudgetStartDate,
            ProjectCost: [parseFloat(this.ProjectCost).toFixed(2), Validators.required],
            ExistingCost: parseFloat(this.ExistingCost).toFixed(2),
            SpendingActual: parseFloat(this.SpendingActual).toFixed(2),
            AdditionalCost: parseFloat(this.AdditionalCost).toFixed(2),
            organization: this.organization,
            ReasonOfChanging: this.ReasonOfChanging,
            BudgetForm: this.BudgetForm,
            BetweenYear: this.BetweenYear,
            TransferForm: this.TransferForm,
            PoolBudgetForm: this.PoolBudgetForm,
            strategy: this.strategy,
            CostCenterOfVP: [this.CostCenterOfVP, Validators.required],
            CodeCostCenterOfVP: [this.CodeCostCenterOfVP, Validators.required],

            StartingDate_tmp: response.startingDate,
            ProjecctComRun_tmp: response.finishingDate,
            RequestIniNoDate_tmp: '',

            ShowRemark_tmp: false,
            BudgetAvailable: parseFloat(this.BudgetAvailable).toFixed(2),
          });

        });

      }
      else {

        this.Initiative_tmp = response;
        this.capexInformationId = response.capexInformationId;
        console.log("Come else ===>");
        console.log(this.Initiative_tmp);

        let cost_;
        cost_ = response.projectCost;

        this.StartingDate = this.dateUtil.GetDate(new Date(response.startingDate));

        if (response.additionalCost != '' && response.additionalCost != undefined) {
          AdditionalCost_ = +response.additionalCost;
        }

        console.log(response.returnCost)
        this.ReturnCost = +response.returnCost;

        this.ExistingCost = +cost_.toFixed(2) + +this.ReturnCost;
        this.ProjectCost = +cost_.toFixed(2);

        this.SpendingActual = response.spendingActual;

        this.ProjecctComRun = this.dateUtil.GetDate(new Date(response.projecctComRun));
        this.ProjectExePeriodYear = response.projectExePeriodYear;
        this.ProjectExePeriodMonth = response.projectExePeriodMonth;
        this.RequestIniNoDate = this.dateUtil.GetDate(new Date(response.actionYear));

        this.OldProjectCost = cost_.toFixed(2);

        this.organization = "";
        this.ReasonOfChanging = response.reasonOfChanging;
        this.BudgetAvailable = +this.ExistingCost - this.SpendingActual;

        this.TotalAvailable = +this.ExistingCost - +this.SpendingActual - +this.ReturnCost;

        if (response.reasonOfChanging != "") {
          this.RemarkShow = true;
        }

        if (response.budgetPeriod.includes("Annual")) {
          this.BudgetForm = "Annual";
        }
        else if (response.budgetPeriod.includes("Mid Year")) {
          this.BudgetForm = "Mid Year";
        }
        else if (response.budgetPeriod.includes("Current year")) {
          this.BudgetForm = "Current year";

          this.showContingency = true;
          this.ferPool = false;
          this.inshow = false;

          if (response.betweenYear.includes("Contingency")) {
            this.BetweenYear = "Contingency";
          }
          else if (response.betweenYear.includes("Transfer")) {
            this.BetweenYear = "Transfer";
          }
          else if (response.betweenYear.includes("BOD Approval on")) {
            this.BetweenYear = "BOD Approval on";
          }
          else if (response.betweenYear.includes("Pool Budget")) {
            this.BetweenYear = "Pool Budget";
          }

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

        this.TransferForm = response.transferForm;
        this.PoolBudgetForm = response.poolBudgetForm;
        this.strategy = "MillionBaht";
        this.CostCenterOfVP = response.costCenterOfVP;
        this.CodeCostCenterOfVP = response.codeCostCenterOfVP;

        this.InitiativeDetailForm = this.fb.group({

          StartingDate: [this.StartingDate, Validators.required],
          ProjecctComRun: [this.ProjecctComRun, Validators.required],
          RequestIniNoDate: [this.RequestIniNoDate, Validators.required],
          ProjectExePeriodYear: this.ProjectExePeriodYear,
          ProjectExePeriodMonth: this.ProjectExePeriodMonth,
          BudgetStartDate: this.BudgetStartDate,
          ProjectCost: [parseFloat(this.ProjectCost).toFixed(2), Validators.required],
          ExistingCost: parseFloat(this.ExistingCost).toFixed(2),
          AdditionalCost: parseFloat(this.AdditionalCost).toFixed(2),
          organization: this.organization,
          ReasonOfChanging: this.ReasonOfChanging,
          BudgetForm: this.BudgetForm,
          BetweenYear: this.BetweenYear,
          TransferForm: this.TransferForm,
          PoolBudgetForm: this.PoolBudgetForm,
          strategy: this.strategy,
          CostCenterOfVP: [this.CostCenterOfVP, Validators.required],
          CodeCostCenterOfVP: [this.CodeCostCenterOfVP, Validators.required],

          StartingDate_tmp: response.startingDate,
          ProjecctComRun_tmp: response.projecctComRun,
          RequestIniNoDate_tmp: response.requestIniNoDate,
          ShowRemark_tmp: false,
          SpendingActual: parseFloat(this.SpendingActual).toFixed(2),

          BudgetAvailable: parseFloat(this.BudgetAvailable).toFixed(2),
          TotalAvailable: parseFloat(this.TotalAvailable).toFixed(2),

          ReturnCost: parseFloat(this.ReturnCost.toString()).toFixed(2)

        });

        //====================== Year Table ======================
        this.AnnualForm = this.fb.group({
          ExistingBudget_total: '',
          SpendingActual_total: '',
          BudgetAvailable_total: '',
          TotalAdditional_total: '',
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

        if (response.capexType != "Createnew" && response.capexStatus != "Submit") {

          if (response.capexType == "Createnew" && response.capexStatus == "Submit") {

            this.revision_ = response.revistion;
            this.seq_ = 0;

          }

          else if (response.capexType == "Return" && response.capexStatus == "Draft") {
            // this.revision_ = response.revistion;

            this.revision_ = response.revistion + 1;
            this.seq_ = response.sequent + 1;

          }
          else if (response.capexType == "Return" && response.capexStatus == "Submit") {

            this.revision_ = response.revistion + 1;
            this.seq_ = response.sequent + 1;

          }

          this.capexService.GetAnnualInvestmentPlan(this.id.toString(), this.capexInformationId).subscribe(resp => {

            console.log("Get Annual");
            console.log(resp);

            if (resp.length != 0) {

              for (let xx = 0; xx < resp.length; xx++) {
                if (xx == 0) {
                  const control = this.AnnualForm.get('annualForm_list') as FormArray;

                  console.log("Add Row :" + 0 + " > " + resp[0].currency);

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

                }


              }


            }
          })

        }
        else {

          if (response.capexType != "Createnew" && response.capexStatus != "Submit") {

            if (response.capexType == "Createnew" && response.capexStatus == "Submit") {

              this.revision_ = response.revistion;
              this.seq_ = 0;

            }

            else if (response.capexType == "Return" && response.capexStatus == "Draft") {
              // this.revision_ = response.revistion;

              // this.revision_ = response.revistion + 1;
              //   this.seq_ = response.sequent + 1;
              // if(response.revistion != this.revision_){
              this.revision_ = response.revistion + 1;
              //   this.seq_ = response.sequent + 1;
              // }

            }
            else if (response.capexType == "Return" && response.capexStatus == "Submit") {

              this.revision_ = response.revistion + 1;
              this.seq_ = response.sequent + 1;

            }
          }
        }

        this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
        // this.StartYear_1 = this.year_now; // this.convertDate(this.RequestIniNoDate).substring(0, 4);
        this.StartYear_1 = this.convertDate(this.RequestIniNoDate).substring(0, 4);

        for (let i = 0; i < 10; i++) {
          if ((+this.StartYear_1 + i <= +this.EndYear_1) && (+this.StartYear_1 + i >= +this.year_now)) {
            this.YearTable.push({
              columnname: +this.StartYear_1 + i,
              isEdit: false
            })
          }
          else {
            this.YearTable.push({
              columnname: +this.StartYear_1 + i,
              isEdit: true
            })
          }

        }


        //====================== Month Table ======================

        if (response.capexType != "Createnew" && response.capexStatus != "Submit") {
          this.existingMonth_ = "y";
          this.initial_month("y");
          for (let i = 0; i < +this.year_m.length; i++) {
            this.capexService.GetMonthlyInvestmentPlan(this.id.toString(), this.capexInformationId,
              this.year_m[i]).subscribe(resp => {

                console.log("Get Month in Year :" + this.year_m[i]);
                console.log(resp);

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
                          '', resp[j].investmentCostFx, true)
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
                          '', resp[j].investmentCostFx, true)
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
                          '', resp[j].investmentCostFx, true)
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
                          '', resp[j].investmentCostFx, true)
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
                          '', resp[j].investmentCostFx, true)
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
                          '', resp[j].investmentCostFx, true)
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
                          '', resp[j].investmentCostFx, true)
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
                          '', resp[j].investmentCostFx, true)
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
                          '', resp[j].investmentCostFx, true)
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
                          '', resp[j].investmentCostFx, true)
                      }
                    }

                    this.ChangingValue_month_table10(this.year_m[i]);


                  }
                }


              })
          }
        }
        else {
          this.existingMonth_ = "n";
          this.initial_month("n");
        }




      }
    });

  }


  setSpendingActual(value) {

    console.log(value);

    this.SpendingActual = value;
    this.TotalAvailable = +this.ExistingCost - +value - +this.ReturnCost;

    this.InitiativeDetailForm.patchValue({
      TotalAvailable: parseFloat(this.TotalAvailable).toFixed(2),
      SpendingActual: parseFloat(this.SpendingActual).toFixed(2)
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
    console.log("xxxx");
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

  setReturn(value) {

    console.log(value);
    let exCost;
    let exSpend;

    console.log(this.ExistingCost);

    if (this.ExistingCost == null || this.ExistingCost == "") {
      exCost = 0;
    }
    else {
      exCost = +this.ExistingCost;
    }

    if (this.SpendingActual == null || this.SpendingActual == "") {
      exSpend = 0;
    }
    else {
      exSpend = +this.SpendingActual;
    }


    if (value != null) {
      this.ProjectCost = exCost - value;
      this.ReturnCost = +value;

      this.TotalAvailable = +this.ExistingCost - +exSpend - +value;


      this.InitiativeDetailForm.patchValue({
        ProjectCost: parseFloat(this.ProjectCost).toFixed(2),
        ReturnCost: parseFloat(this.ReturnCost.toString()).toFixed(2),
        TotalAvailable: parseFloat(this.TotalAvailable).toFixed(2)
      });
    }



  }

  addSellingPoint_withvalue(currencyTitle, y1, y2, y3, y4, y5, y6, y7, y8, y9, y10,
    overall, fx, flagFirst_row) {
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
      flagFirst_row: flagFirst_row
    }));
  }

  changeRate(value, i) {
    const control = this.AnnualForm.get('annualForm_list') as FormArray;



    if (control.at(i).get('currencyTitle').value != "" && control.at(i).get('currencyTitle').value != undefined &&
      control.at(i).get('fx').value != "" && control.at(i).get('fx').value != undefined) {


      const control1 = this.monthForm0.get('monthForm_list') as FormArray;
      if (control1.at(i) == undefined) {
        this.addMonth_withvalue1(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value, true);
      }
      else {
        control1.at(i).get('fx').patchValue(control.at(i).get('fx').value);
      }

      const control2 = this.monthForm1.get('monthForm_list') as FormArray;
      if (control2.at(i) == undefined) {
        this.addMonth_withvalue2(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value, true);
      }
      else {
        control2.at(i).get('fx').patchValue(control.at(i).get('fx').value);
      }

      const control3 = this.monthForm2.get('monthForm_list') as FormArray;
      if (control3.at(i) == undefined) {
        this.addMonth_withvalue3(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value, true);
      }
      else {
        control3.at(i).get('fx').patchValue(control.at(i).get('fx').value);
      }

      const control4 = this.monthForm3.get('monthForm_list') as FormArray;
      if (control4.at(i) == undefined) {
        this.addMonth_withvalue4(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value, true);
      }
      else {
        control4.at(i).get('fx').patchValue(control.at(i).get('fx').value);
      }

      const control5 = this.monthForm4.get('monthForm_list') as FormArray;
      if (control5.at(i) == undefined) {
        this.addMonth_withvalue5(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value, true);
      }
      else {
        control5.at(i).get('fx').patchValue(control.at(i).get('fx').value);
      }

      const control6 = this.monthForm5.get('monthForm_list') as FormArray;
      if (control6.at(i) == undefined) {
        this.addMonth_withvalue6(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value, true);
      }
      else {
        control6.at(i).get('fx').patchValue(control.at(i).get('fx').value);
      }

      const control7 = this.monthForm6.get('monthForm_list') as FormArray;
      if (control7.at(i) == undefined) {
        this.addMonth_withvalue7(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value, true);
      }
      else {
        control7.at(i).get('fx').patchValue(control.at(i).get('fx').value);
      }

      const control8 = this.monthForm7.get('monthForm_list') as FormArray;
      if (control8.at(i) == undefined) {
        this.addMonth_withvalue8(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value, true);
      }
      else {
        control8.at(i).get('fx').patchValue(control.at(i).get('fx').value);
      }

      const control9 = this.monthForm8.get('monthForm_list') as FormArray;
      if (control9.at(i) == undefined) {
        this.addMonth_withvalue9(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value, true);
      }
      else {
        control9.at(i).get('fx').patchValue(control.at(i).get('fx').value);
      }

      const control10 = this.monthForm9.get('monthForm_list') as FormArray;
      if (control10.at(i) == undefined) {
        this.addMonth_withvalue10(control.at(i).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(i).get('fx').value, true);
      }
      else {
        control10.at(i).get('fx').patchValue(control.at(i).get('fx').value);
      }


    }



  }

  addMonth_withvalue1(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx, flagFirst_row) {
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
      flagFirst_row: flagFirst_row
    }));
  }

  addMonth_withvalue2(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx, flagFirst_row) {
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
      flagFirst_row: flagFirst_row
    }));
  }

  addMonth_withvalue3(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx, flagFirst_row) {
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
      flagFirst_row: flagFirst_row
    }));
  }

  addMonth_withvalue4(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx, flagFirst_row) {
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
      flagFirst_row: flagFirst_row
    }));
  }

  addMonth_withvalue5(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx, flagFirst_row) {
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
      flagFirst_row: flagFirst_row
    }));
  }

  addMonth_withvalue6(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx, flagFirst_row) {
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
      flagFirst_row: flagFirst_row
    }));
  }

  addMonth_withvalue7(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx, flagFirst_row) {
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
      flagFirst_row: flagFirst_row
    }));
  }

  addMonth_withvalue8(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx, flagFirst_row) {
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
      flagFirst_row: flagFirst_row
    }));
  }

  addMonth_withvalue9(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx, flagFirst_row) {
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
      flagFirst_row: flagFirst_row
    }));
  }

  addMonth_withvalue10(currencyTitle, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
    overall, fx, flagFirst_row) {
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
      flagFirst_row: flagFirst_row
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

      this.totalAnual[this.YearTable[j - 1].columnname] = total;

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

      this.totalAnual[this.YearTable[j - 1].columnname] = total.toFixed(2);

    }

    this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall);



    if (control.at(ii).get('currencyTitle').value != "" && control.at(ii).get('currencyTitle').value != undefined &&
      control.at(ii).get('fx').value != "" && control.at(ii).get('fx').value != undefined) {


      const control1 = this.monthForm0.get('monthForm_list') as FormArray;
      if (control1.at(ii) == undefined) {
        this.addMonth_withvalue1(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value, true);
      }
      else {
        control1.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control2 = this.monthForm1.get('monthForm_list') as FormArray;
      if (control2.at(ii) == undefined) {
        this.addMonth_withvalue2(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value, true);
      }
      else {
        control2.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control3 = this.monthForm2.get('monthForm_list') as FormArray;
      if (control3.at(ii) == undefined) {
        this.addMonth_withvalue3(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value, true);
      }
      else {
        control3.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control4 = this.monthForm3.get('monthForm_list') as FormArray;
      if (control4.at(ii) == undefined) {
        this.addMonth_withvalue4(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value, true);
      }
      else {
        control4.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control5 = this.monthForm4.get('monthForm_list') as FormArray;
      if (control5.at(ii) == undefined) {
        this.addMonth_withvalue5(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value, true);
      }
      else {
        control5.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control6 = this.monthForm5.get('monthForm_list') as FormArray;
      if (control6.at(ii) == undefined) {
        this.addMonth_withvalue6(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value, true);
      }
      else {
        control6.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control7 = this.monthForm6.get('monthForm_list') as FormArray;
      if (control7.at(ii) == undefined) {
        this.addMonth_withvalue7(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value, true);
      }
      else {
        control7.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control8 = this.monthForm7.get('monthForm_list') as FormArray;
      if (control8.at(ii) == undefined) {
        this.addMonth_withvalue8(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value, true);
      }
      else {
        control8.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control9 = this.monthForm8.get('monthForm_list') as FormArray;
      if (control9.at(ii) == undefined) {
        this.addMonth_withvalue9(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value, true);
      }
      else {
        control9.at(ii).get('fx').patchValue(control.at(ii).get('fx').value);
      }

      const control10 = this.monthForm9.get('monthForm_list') as FormArray;
      if (control10.at(ii) == undefined) {
        this.addMonth_withvalue10(control.at(ii).get('currencyTitle').value.replace('Million ', ''), '', '', '', '',
          '', '', '', '', '', '', '', '', '', control.at(ii).get('fx').value, true);
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
      this.swalTool.AlertAnnualInvestment();
      this.flag_fail = "yes";
    }
    else {
      this.flag_fail = "no";

    }
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

    // for (let j = 1; j <= 10; j++) {
    //   let total = 0;
    //   for (let i = 0; i < xx; i++) {

    //     if (i != 0) {
    //       if (control.at(i).get('fx').value != undefined && control.at(i).get('fx').value != "") {
    //         if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
    //           total = total + (+control.at(i).get('y' + j).value * +control.at(i).get('fx').value);
    //           total = +total.toFixed(2);
    //         }
    //       }
    //     }
    //     else {
    //       if (control.at(i).get('y' + j).value != undefined && control.at(i).get('y' + j).value != "") {
    //         total = total + +control.at(i).get('y' + j).value;
    //         total = +total.toFixed(2);
    //       }
    //     }

    //   }
    //   this.AnnualForm.controls['AnnualTotal' + j].setValue(total.toFixed(2));
    //   AnnualTotal_overall = AnnualTotal_overall + +total.toFixed(2);
    //   AnnualTotal_overall = +AnnualTotal_overall.toFixed(2);
    //   this.AnnualTotal_overall_tmp = AnnualTotal_overall.toFixed(2);

    //   this.totalAnual[this.YearTable[j - 1].columnname] = total.toFixed(2);

    // }

    // this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall.toFixed(2));


    // if (+AnnualTotal_overall > +this.ProjectCost) {
    //   this.swalTool.AlertAnnualInvestment();
    //   this.flag_fail = "yes";

    // }
    // else {
    //   this.flag_fail = "no";
    // }

    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;









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

    this.YearTable = [];

    this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
    this.StartYear_1 = this.year_now;


    for (let i = 0; i < 10; i++) {
      if (+this.StartYear_1 + i <= +this.EndYear_1) {
        this.YearTable.push({
          columnname: +this.StartYear_1 + i,
          isEdit: false
        })
      }
      else {
        this.YearTable.push({
          columnname: +this.StartYear_1 + i,
          isEdit: true
        })
      }
    }

  }


  initial_month(existingData) {

    console.log("aaaa");
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
            readOnly: false
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
            readOnly: false
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
            readOnly: false
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
            readOnly: false
          })
        }

        this.monthList_x.push({
          columnname: this.months[i],
          readOnly: false
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
            readOnly: false
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
        control.at(i).get('flag_alert').patchValue(true);
        this.swalTool.SumCostMonth();
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
      this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
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
        control.at(i).get('flag_alert').patchValue(true);
        this.swalTool.SumCostMonth();
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
      this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
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
        control.at(i).get('flag_alert').patchValue(true);
        this.swalTool.SumCostMonth();
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
      this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";


    }
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
        control.at(i).get('flag_alert').patchValue(true);
        this.swalTool.SumCostMonth();
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
      this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
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
        control.at(i).get('flag_alert').patchValue(true);
        this.swalTool.SumCostMonth();
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
      this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
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
        control.at(i).get('flag_alert').patchValue(true);
        this.swalTool.SumCostMonth();
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
      this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
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
        control.at(i).get('flag_alert').patchValue(true);
        this.swalTool.SumCostMonth();
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
      this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
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
        control.at(i).get('flag_alert').patchValue(true);
        this.swalTool.SumCostMonth();
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
      this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
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
        control.at(i).get('flag_alert').patchValue(true);
        this.swalTool.SumCostMonth();
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
      this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
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
        control.at(i).get('flag_alert').patchValue(true);
        this.swalTool.SumCostMonth();
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
      this.swalTool.SumCostMonth();
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
  }

  setStartingDate(date1: string) {
    if (this.StartingDate != date1) {
      this.StartingDate = date1;
      this.InitiativeDetailForm.controls['RequestIniNoDate'].setValue('');

      this.InitiativeDetailForm.patchValue({
        ProjecctComRun: "",
        RequestIniNoDate: "",
        StartingDate_tmp: this.convertDate(date1)
      });

    }
  }

  setFinishDate(date1: string) {
    if (this.StartingDate < date1) {
      if (this.ProjecctComRun != date1) {
        this.RequestIniNoDate = "";
        this.ProjecctComRun = date1;
        this.InitiativeDetailForm.controls['RequestIniNoDate'].setValue('');
        this.EndYear_1 = this.convertDate(date1).substring(0, 4);

        this.InitiativeDetailForm.patchValue({
          ProjecctComRun: this.ProjecctComRun,
          StartingDate: this.StartingDate,
          StartingDate_tmp: this.convertDate(this.StartingDate),
          ProjecctComRun_tmp: this.convertDate(this.ProjecctComRun)
        });

        // this.initial_year();
        this.Diff();
        // this.initial_month();

      }
    } else {
      // this.ProjecctComRun = "";
      this.InitiativeDetailForm.patchValue({
        ProjecctComRun: "",
        RequestIniNoDate: "",
        ProjecctComRun_tmp: "",
        RequestIniNoDate_tmp: ""
      });

    }

  }

  setRequestDate(date1: string) {


    if (this.RequestIniNoDate != date1) {

      const control_old = this.AnnualForm.get('annualForm_list') as FormArray;

      let oldYear = this.year_m;
      let oldValYear = control_old.value;

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
          this.swalTool.DateBudgetStart();
          this.flag_fail = "yes";

        }
        else {
          this.flag_fail = "no";

          this.InitiativeDetailForm.patchValue({
            RequestIniNoDate: this.RequestIniNoDate,
            RequestIniNoDate_tmp: this.convertDate(this.RequestIniNoDate)
          });

        }

      }

      this.YearTable = [];

      //====================== Year Table ======================

      this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
      this.StartYear_1 = this.convertDate(this.RequestIniNoDate).substring(0, 4);
      const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

      for (let i = 0; i < 10; i++) {

        let yearname = +this.StartYear_1 + i;


        if (yearname <= +this.EndYear_1) {
          this.YearTable.push({
            columnname: yearname,
            isEdit: false
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

          this.YearTable.push({
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

        this.totalAnual[this.YearTable[j - 1].columnname] = total.toFixed(2);

      }

      this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall.toFixed(2));


      if (+AnnualTotal_overall > +this.ProjectCost) {
        this.swalTool.AlertAnnualInvestment();
        this.flag_fail = "yes";

      }
      else {
        this.flag_fail = "no";
      }


      console.log(this.monthForm0);

      if (this.monthForm0 == undefined) {
        this.initial_month("n");
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
                readOnly: false
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
                readOnly: false
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
                readOnly: false
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
                readOnly: false
              })
            }

            this.monthList_x.push({
              columnname: this.months[i],
              readOnly: false
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
                readOnly: false
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
    // this.initial_month();


  }

  convertDate(di) {
    let x = di.substring(6).substring(0, 4) + "-" + di.substring(3).substring(0, 2) + "-" + di.substring(0, 2);
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
      this.swalTool.AlertAnnualInvestment();
      this.flag_fail = "yes";
    }
    else {
      this.flag_fail = "no";
    }


    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

    const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
    let xx = +control_month0.length
    for (let i = 0; i < xx; i++) {
      let overall = 0;

      if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {
        control_month0.at(i).get('flag_alert').patchValue(true);

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
          control_month1.at(i).get('flag_alert').patchValue(true);


          console.log("tess : ", control_month1.at(i).get('overall').value);
          console.log("tess2 : ", control_annual.at(i).get('y2').value * 1000000);




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
          control_month2.at(i).get('flag_alert').patchValue(true);




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
          control_month3.at(i).get('flag_alert').patchValue(true);



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
          control_month4.at(i).get('flag_alert').patchValue(true);




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
          control_month5.at(i).get('flag_alert').patchValue(true);




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
          control_month6.at(i).get('flag_alert').patchValue(true);




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
          control_month7.at(i).get('flag_alert').patchValue(true);




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
          control_month8.at(i).get('flag_alert').patchValue(true);




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
          control_month9.at(i).get('flag_alert').patchValue(true);




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

      console.log(this.yearsDiff(date1, date2))
      console.log(this.monthDiff(date1, date2))

      let m;
      let yy;


      if (this.monthDiff(date1, date2) < 12) {
        yy = 0;
        m = this.monthDiff(date1, date2);
        console.log("month less than 12  " + m);

      }
      else {

        let tmp_;

        tmp_ = (+this.monthDiff(date1, date2) / 12).toString().split('.');
        yy = +tmp_[0];

        m = +this.monthDiff(date1, date2) - (+tmp_[0] * 12);

        console.log("month more than 12  " + m);
      }


      console.log("--mm--  " + m);
      console.log("--yy-- " + yy);

      this.ProjectExePeriodYear = yy
      this.InitiativeDetailForm.controls['ProjectExePeriodYear'].setValue(this.ProjectExePeriodYear);

      this.ProjectExePeriodMonth = m
      this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].setValue(this.ProjectExePeriodMonth);

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
        this.swalTool.SumCost();
        this.flag_fail = "yes";

      }
      else {
        this.flag_fail = "no";

      }
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
            this.swalTool.SumCostMonth();
            this.flag_fail = "yes";

          }
          else {
            this.flag_fail = "no";

          }

          this.monthColumn[year][13] = this.totalCost_m;
          this.TotalMonthColumn[year][13] = this.totalCost_m;
        }

      }

      for (let j = 1; j <= 13; j++) {
        if (this.TotalMonthColumn[year][j] == undefined) {
          this.TotalMonthColumn[year][j] = "";
        }
      }
    }
    else {
      this.monthColumn[year][index] = "";
      this.totalCost_tmp_m[year][index] = "";
      this.swalTool.AlertAnnualInvestment();
      this.flag_fail = "yes";

    }

  }

  SearchOwnerName(event) {

    console.log(event)
    this.GetOwners(event.term.toString());
  }

  ClearOwnerName() {
    this.GetOwners();
  }

  GetOwners(Text?) {

    this.params.text = Text ? Text : '';
    console.log(this.params);
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.owners = owners;
      console.log(this.owners);
    });
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
    this.PoolBudgetForm = value
    this.InitiativeDetailForm.controls['PoolBudgetForm'].setValue(this.PoolBudgetForm);
    this.InitiativeDetailForm.controls['TransferForm'].setValue("");
  }


  SetMarkAsTouchedFormGeneral() {

    this.InitiativeDetailForm.controls.StartingDate.markAsTouched();
    this.InitiativeDetailForm.controls.ProjecctComRun.markAllAsTouched();
    this.InitiativeDetailForm.controls.RequestIniNoDate.markAllAsTouched();
    this.InitiativeDetailForm.controls.ProjectCost.markAllAsTouched();
    this.InitiativeDetailForm.controls.CostCenterOfVP.markAllAsTouched();
    this.InitiativeDetailForm.controls.CodeCostCenterOfVP.markAllAsTouched();

  }

  EnabledButtonSave() {
    this.isDisabledSubmit = true;
    this.isDisabledDraft = true;
  }

  Savedraf() {

    let BudgetYear = "";

    let BudgetForm_ = "";
    let BetweenYear_ = "";
    let TransferForm_ = "";
    let PoolBudgetForm_ = "";

    this.seq_ = +this.seq_ + 1;

    console.log("Sequency");
    console.log(this.seq_);

    if (this.BudgetForm == "Annual") {
      BudgetYear = this.year_next;
      BudgetForm_ = this.BudgetForm + " (" + this.year_next + ")";
    }
    else if (this.BudgetForm == "Mid Year") {
      BudgetYear = this.year_now;
      BudgetForm_ = this.BudgetForm + " (" + this.year_now + ")";
    }
    else {
      BudgetYear = this.year_now;

      BudgetForm_ = this.BudgetForm;

      if (this.BetweenYear == "BOD Approval on") {
        BetweenYear_ = this.BetweenYear;
      }
      else if (this.BetweenYear == "Transfer") {
        BetweenYear_ = this.BetweenYear + " (" + this.year_now + ")";
        TransferForm_ = this.TransferForm;
      }
      else if (this.BetweenYear == "Pool Budget") {
        BetweenYear_ = this.BetweenYear + " (" + this.year_now + ")";
        PoolBudgetForm_ = this.PoolBudgetForm;
      }
      else {
        BetweenYear_ = this.BetweenYear + " (" + this.year_now + ")";
      }
    }

    this.InitiativeDetailForm.controls['BudgetForm'].setValue(this.BudgetForm);
    this.InitiativeDetailForm.controls['BetweenYear'].setValue(this.BetweenYear);
    this.InitiativeDetailForm.controls['StartingDate'].setValue(this.StartingDate);
    this.InitiativeDetailForm.controls['ProjecctComRun'].setValue(this.ProjecctComRun);
    this.InitiativeDetailForm.controls['RequestIniNoDate'].setValue(this.RequestIniNoDate);
    this.InitiativeDetailForm.controls['TransferForm'].setValue(this.TransferForm);
    this.InitiativeDetailForm.controls['PoolBudgetForm'].setValue(this.PoolBudgetForm);

    this.capexService.GetCapexsInfo(this.id.toString(), 'Return').subscribe(resp_1 => {

      console.log("AddmoreCapex Info: " + resp_1);

      if (resp_1 == null) {

        this.seq_ = +this.seq_ + 1;
        this.revision_ = +this.revision_ + 1;

        this.capexService.CreateCapexsInfo(
          this.InitiativeDetailForm.controls['StartingDate'].value,
          this.InitiativeDetailForm.controls['ProjecctComRun'].value,
          this.InitiativeDetailForm.controls['RequestIniNoDate'].value,
          this.InitiativeDetailForm.controls['ProjectExePeriodYear'].value,
          this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].value,
          this.InitiativeDetailForm.controls['CostCenterOfVP'].value,
          this.InitiativeDetailForm.controls['CodeCostCenterOfVP'].value,
          this.InitiativeDetailForm.controls['ProjectCost'].value,
          this.InitiativeDetailForm.controls['ReasonOfChanging'].value,
          this.InitiativeDetailForm.controls['BudgetForm'].value,
          this.InitiativeDetailForm.controls['BetweenYear'].value,
          this.InitiativeDetailForm.controls['TransferForm'].value,
          this.InitiativeDetailForm.controls['PoolBudgetForm'].value,
          "",
          "0",
          "Return",
          BudgetYear,
          "Draft",
          "false",
          this.seq_,
          this.InitiativeDetailForm.controls['ExistingCost'].value,
          this.InitiativeDetailForm.controls['SpendingActual'].value,
          "0",
          this.InitiativeDetailForm.controls['ReturnCost'].value,
          "",
          "",
          this.id.toString(), "0"
        ).subscribe(response => {

          console.log("Response SAVE Capex info");
          console.log(response);
          this.capexService.GetCapexsInfo(this.id.toString(), 'Return').subscribe(resp_1 => {

            this.capexInformationId = resp_1.capexInformationId

            this.capexService.CreateAnnualInvestmentPlan_return(
              this.id.toString(), this.AnnualForm, resp_1.capexInformationId, "draft"
            ).subscribe(resp => {
            });

            this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
              this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
              this.monthForm8, this.monthForm9, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                // this.bindMonth();
              });

            this.swalTool.Draft();
            this.flag_fail = "yes";

          });

        });
      } else {
        if (this.capexType != "Return") {
          this.seq_ = +this.seq_ + 1;

          this.capexService.CreateCapexsInfo(
            this.InitiativeDetailForm.controls['StartingDate'].value,
            this.InitiativeDetailForm.controls['ProjecctComRun'].value,
            this.InitiativeDetailForm.controls['RequestIniNoDate'].value,
            this.InitiativeDetailForm.controls['ProjectExePeriodYear'].value,
            this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].value,
            this.InitiativeDetailForm.controls['CostCenterOfVP'].value,
            this.InitiativeDetailForm.controls['CodeCostCenterOfVP'].value,
            this.InitiativeDetailForm.controls['ProjectCost'].value,
            this.InitiativeDetailForm.controls['ReasonOfChanging'].value,
            this.InitiativeDetailForm.controls['BudgetForm'].value,
            this.InitiativeDetailForm.controls['BetweenYear'].value,
            this.InitiativeDetailForm.controls['TransferForm'].value,
            this.InitiativeDetailForm.controls['PoolBudgetForm'].value,
            "",
            "0",
            "Return",
            BudgetYear,
            "Draft",
            "false",
            this.seq_,
            this.InitiativeDetailForm.controls['ExistingCost'].value,
            this.InitiativeDetailForm.controls['SpendingActual'].value,
            "0",
            this.InitiativeDetailForm.controls['ReturnCost'].value,
            "",
            "",
            this.id.toString(), "0"
          ).subscribe(response => {

            console.log("Response SAVE Capex info");
            console.log(response);
            this.capexService.GetCapexsInfo(this.id.toString(), 'Return').subscribe(resp_1 => {

              this.capexInformationId = resp_1.capexInformationId

              this.capexService.CreateAnnualInvestmentPlan_return(
                this.id.toString(), this.AnnualForm, resp_1.capexInformationId, "draft"
              ).subscribe(resp => {
              });

              this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
                this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
                this.monthForm8, this.monthForm9, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                  // this.bindMonth();
                });

              this.swalTool.Draft();
              this.flag_fail = "yes";

            });

          });
        } else {
          // this.seq_ = this.seq_ + 1;
          // this.revision_ = this.revision_ +1;

          this.capexService.PutUpdateCapexsinformations(
            this.InitiativeDetailForm.controls['StartingDate'].value,
            this.InitiativeDetailForm.controls['ProjecctComRun'].value,
            this.InitiativeDetailForm.controls['RequestIniNoDate'].value,
            this.InitiativeDetailForm.controls['ProjectExePeriodYear'].value,
            this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].value,
            this.InitiativeDetailForm.controls['CostCenterOfVP'].value,
            this.InitiativeDetailForm.controls['CodeCostCenterOfVP'].value,
            this.InitiativeDetailForm.controls['ProjectCost'].value,
            this.InitiativeDetailForm.controls['ReasonOfChanging'].value,
            this.InitiativeDetailForm.controls['BudgetForm'].value,
            this.InitiativeDetailForm.controls['BetweenYear'].value,
            this.InitiativeDetailForm.controls['TransferForm'].value,
            this.InitiativeDetailForm.controls['PoolBudgetForm'].value,
            "",
            this.revision_,
            "Return",
            BudgetYear,
            "Draft",
            "false",
            this.seq_,
            this.ExistingCost,
            this.SpendingActual,
            this.AdditionalCost,
            "",
            "0",
            "0",
            this.id.toString(),
            this.capexInformationId, "0",
            '', ''
          ).subscribe(response => {

            this.capexService.GetCapexsInfo(this.id.toString(), 'Return').subscribe(resp_1 => {

              this.capexInformationId = resp_1.capexInformationId

              this.capexService.CreateAnnualInvestmentPlan_addMore(
                this.id.toString(), this.AnnualForm, resp_1.capexInformationId, "draft").subscribe(resp => {
                });

              this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
                this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
                this.monthForm8, this.monthForm9, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                  // this.bindMonth();
                });

              this.swalTool.Draft();
              // this.flag_fail = "yes";

            });

          });
        }

      }
    });



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
                    '', resp[j].investmentCostFx, true)
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
                    '', resp[j].investmentCostFx, true)
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
                    '', resp[j].investmentCostFx, true)
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
                    '', resp[j].investmentCostFx, true)
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
                    '', resp[j].investmentCostFx, true)
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
                    '', resp[j].investmentCostFx, true)
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
                    '', resp[j].investmentCostFx, true)
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
                    '', resp[j].investmentCostFx, true)
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
                    '', resp[j].investmentCostFx, true)
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
                    '', resp[j].investmentCostFx, true)
                }
              }

              this.ChangingValue_month_table10(this.year_m[i]);


            }
          }


        })
    }

  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }

  Submit() {
    this.SubmitClick();
  }

  SubmitClick() {

    console.log("SaveSubmit");

    this.seq_ = +this.seq_ + 1;

    let tmp_error = "no";
    let tmp_error_m = "no";

    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;
    const AnnualTotal_overall = this.AnnualForm.get('AnnualTotal_overall') as FormArray;

    console.log(AnnualTotal_overall.value);


    // if (+AnnualTotal_overall.value < this.InitiativeDetailForm.controls['ProjectCost'].value) {
    //   tmp_error = "yes";
    // }

    // const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
    // let xx = +control_month0.length
    // for (let i = 0; i < xx; i++) {
    //   let overall = 0;

    //   if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {
    //     control_month0.at(i).get('flag_alert').patchValue(true);
    //     tmp_error_m = "yes";
    //   }
    //   else {
    //     control_month0.at(i).get('flag_alert').patchValue(false);
    //     this.swalTool.Submit();
    //   }
    // }

    // const control_month1 = this.monthForm1.get('monthForm_list') as FormArray;
    // xx = +control_month1.length
    // for (let i = 0; i < xx; i++) {
    //   let overall = 0;
    //   if (control_month1.at(i).get('overall').value != "") {

    //     if (control_month1.at(i).get('overall').value != control_annual.at(i).get('y2').value * 1000000) {
    //       control_month1.at(i).get('flag_alert').patchValue(true);


    //       console.log("tess : ", control_month1.at(i).get('overall').value);
    //       console.log("tess2 : ", control_annual.at(i).get('y2').value * 1000000);


    //       tmp_error_m = "yes";

    //     }
    //     else {
    //       control_month1.at(i).get('flag_alert').patchValue(false);
    //       this.swalTool.Submit();
    //     }

    //   }

    // }

    // const control_month2 = this.monthForm2.get('monthForm_list') as FormArray;
    // xx = +control_month2.length
    // for (let i = 0; i < xx; i++) {
    //   let overall = 0;

    //   if (control_month2.at(i).get('overall').value != "") {
    //     if (control_month2.at(i).get('overall').value != control_annual.at(i).get('y3').value * 1000000) {
    //       control_month2.at(i).get('flag_alert').patchValue(true);

    //       tmp_error_m = "yes";


    //     }
    //     else {
    //       control_month2.at(i).get('flag_alert').patchValue(false);
    //       this.swalTool.Submit();
    //     }
    //   }
    // }

    // const control_month3 = this.monthForm3.get('monthForm_list') as FormArray;
    // xx = +control_month3.length
    // for (let i = 0; i < xx; i++) {
    //   let overall = 0;

    //   if (control_month3.at(i).get('overall').value) {
    //     if (control_month3.at(i).get('overall').value != control_annual.at(i).get('y4').value * 1000000) {
    //       control_month3.at(i).get('flag_alert').patchValue(true);

    //       tmp_error_m = "yes";

    //     }
    //     else {
    //       control_month3.at(i).get('flag_alert').patchValue(false);
    //       this.swalTool.Submit();
    //     }
    //   }
    // }

    // const control_month4 = this.monthForm4.get('monthForm_list') as FormArray;
    // xx = +control_month4.length
    // for (let i = 0; i < xx; i++) {
    //   let overall = 0;

    //   if (control_month4.at(i).get('overall').value != "") {
    //     if (control_month4.at(i).get('overall').value != control_annual.at(i).get('y5').value * 1000000) {
    //       control_month4.at(i).get('flag_alert').patchValue(true);

    //       tmp_error_m = "yes";


    //     }
    //     else {
    //       control_month4.at(i).get('flag_alert').patchValue(false);
    //       this.swalTool.Submit();
    //     }
    //   }
    // }

    // const control_month5 = this.monthForm5.get('monthForm_list') as FormArray;
    // xx = +control_month5.length
    // for (let i = 0; i < xx; i++) {
    //   let overall = 0;

    //   if (control_month5.at(i).get('overall').value != "") {
    //     if (control_month5.at(i).get('overall').value != control_annual.at(i).get('y6').value * 1000000) {
    //       control_month5.at(i).get('flag_alert').patchValue(true);

    //       tmp_error_m = "yes";


    //     }
    //     else {
    //       control_month5.at(i).get('flag_alert').patchValue(false);
    //       this.swalTool.Submit();
    //     }
    //   }

    // }

    // const control_month6 = this.monthForm6.get('monthForm_list') as FormArray;
    // xx = +control_month6.length
    // for (let i = 0; i < xx; i++) {
    //   let overall = 0;

    //   if (control_month6.at(i).get('overall').value) {

    //     if (control_month6.at(i).get('overall').value != control_annual.at(i).get('y7').value * 1000000) {
    //       control_month6.at(i).get('flag_alert').patchValue(true);

    //       tmp_error_m = "yes";


    //     }
    //     else {
    //       control_month6.at(i).get('flag_alert').patchValue(false);
    //       this.swalTool.Submit();
    //     }
    //   }

    // }

    // const control_month7 = this.monthForm7.get('monthForm_list') as FormArray;
    // xx = +control_month7.length
    // for (let i = 0; i < xx; i++) {
    //   let overall = 0;

    //   if (control_month7.at(i).get('overall').value) {
    //     if (control_month7.at(i).get('overall').value != control_annual.at(i).get('y8').value * 1000000) {
    //       control_month7.at(i).get('flag_alert').patchValue(true);

    //       tmp_error_m = "yes";


    //     }
    //     else {
    //       control_month7.at(i).get('flag_alert').patchValue(false);
    //       this.swalTool.Submit();
    //     }
    //   }
    // }

    // const control_month8 = this.monthForm8.get('monthForm_list') as FormArray;
    // xx = +control_month8.length
    // for (let i = 0; i < xx; i++) {
    //   let overall = 0;

    //   if (control_month8.at(i).get('overall').value != "") {
    //     if (control_month8.at(i).get('overall').value != control_annual.at(i).get('y9').value * 1000000) {
    //       control_month8.at(i).get('flag_alert').patchValue(true);

    //       tmp_error_m = "yes";


    //     }
    //     else {
    //       control_month8.at(i).get('flag_alert').patchValue(false);
    //       this.swalTool.Submit();
    //     }
    //   }

    // }

    // const control_month9 = this.monthForm9.get('monthForm_list') as FormArray;
    // xx = +control_month9.length
    // for (let i = 0; i < xx; i++) {
    //   let overall = 0;

    //   if (control_month9.at(i).get('overall').value != "") {
    //     if (control_month9.at(i).get('overall').value != control_annual.at(i).get('y10').value * 1000000) {
    //       control_month9.at(i).get('flag_alert').patchValue(true);

    //       tmp_error_m = "yes";


    //     }
    //     else {
    //       control_month9.at(i).get('flag_alert').patchValue(false);
    //       this.swalTool.Submit();
    //     }
    //   }

    // }

    // if (tmp_error_m == "yes") {
    //   this.swalTool.SumCostMonth_2();
    //   return;
    // }

    // if (tmp_error == "yes") {
    //   this.swalTool.SumCost_2();
    //   return;
    // }


    if (tmp_error != "yes" && this.flag_fail != "yes") {
      console.log("save");


      this.InitiativeDetailForm.controls['BudgetForm'].setValue(this.BudgetForm);
      this.InitiativeDetailForm.controls['BetweenYear'].setValue(this.BetweenYear);
      this.InitiativeDetailForm.controls['StartingDate'].setValue(this.StartingDate);
      this.InitiativeDetailForm.controls['ProjecctComRun'].setValue(this.ProjecctComRun);
      this.InitiativeDetailForm.controls['RequestIniNoDate'].setValue(this.RequestIniNoDate);


      let BudgetForm_ = "";
      let BetweenYear_ = "";
      let TransferForm_ = "";
      let PoolBudgetForm_ = "";

      let BudgetYear = "";


      if (this.BudgetForm == "Annual") {
        BudgetYear = this.year_next;
        BudgetForm_ = this.BudgetForm + " (" + this.year_next + ")";
      }
      else if (this.BudgetForm == "Mid Year") {
        BudgetYear = this.year_now;
        BudgetForm_ = this.BudgetForm + " (" + this.year_now + ")";
      }
      else {

        BudgetYear = this.year_now;
        BudgetForm_ = this.BudgetForm;

        if (this.BetweenYear == "BOD Approval on") {
          BetweenYear_ = this.BetweenYear;
        }
        else if (this.BetweenYear == "Transfer") {
          BetweenYear_ = this.BetweenYear + " (" + this.year_now + ")";
          TransferForm_ = this.TransferForm;
        }
        else if (this.BetweenYear == "Pool Budget") {
          BetweenYear_ = this.BetweenYear + " (" + this.year_now + ")";
          PoolBudgetForm_ = this.PoolBudgetForm;
        }
        else {
          BetweenYear_ = this.BetweenYear + " (" + this.year_now + ")";
        }
      }

      this.capexService.CreateCapexsInfo(
        this.InitiativeDetailForm.controls['StartingDate'].value,
        this.InitiativeDetailForm.controls['ProjecctComRun'].value,
        this.InitiativeDetailForm.controls['RequestIniNoDate'].value,
        this.InitiativeDetailForm.controls['ProjectExePeriodYear'].value,
        this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].value,
        this.InitiativeDetailForm.controls['CostCenterOfVP'].value,
        this.InitiativeDetailForm.controls['CodeCostCenterOfVP'].value,
        this.InitiativeDetailForm.controls['ProjectCost'].value,
        this.InitiativeDetailForm.controls['ReasonOfChanging'].value,
        this.InitiativeDetailForm.controls['BudgetForm'].value,
        this.InitiativeDetailForm.controls['BetweenYear'].value,
        this.InitiativeDetailForm.controls['TransferForm'].value,
        this.InitiativeDetailForm.controls['PoolBudgetForm'].value,
        "",
        "0",
        "Return",
        BudgetYear,
        "Submit",
        "false",
        this.seq_,
        this.InitiativeDetailForm.controls['ExistingCost'].value,
        this.InitiativeDetailForm.controls['SpendingActual'].value,
        "0",
        this.InitiativeDetailForm.controls['ReturnCost'].value,
        "",
        "",
        this.id.toString(), "0"
      ).subscribe(response => {


        this.capexService.GetCapexsInfo(this.id.toString(), 'Return').subscribe(resp_1 => {

          this.capexInformationId = resp_1.capexInformationId

          this.capexService.CreateAnnualInvestmentPlan(
            this.id.toString(), this.AnnualForm, resp_1.capexInformationId, "submit", 'Return'
          ).subscribe(resp => {
          });

          this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
            this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
            this.monthForm8, this.monthForm9, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
              // this.bindMonth();
            });

          this.swalTool.Draft();
          this.flag_fail = "yes";

        });

        // this.capexService.CreateAnnualInvestmentPlan(
        //   this.id.toString(), this.AnnualForm, this.capexInformationId
        // ).subscribe(resp => {

        // });

        // this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
        //   this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
        //   this.monthForm8, this.monthForm9, this.id.toString(), 1111, "").subscribe(response => {
        //     this.bindMonth();
        //   });


        this.swalTool.Draft();
        this.flag_fail = "yes";

        this.router.navigate(['/initiative/my-own']);
      });

    }
    else {
      this.swalTool.CannotSave();
      console.log(tmp_error);
      console.log(tmp_error_m);
      console.log(this.flag_fail);

      console.log("error");
    }




  }


  TESTEST() {

    console.log(this.YearTable);
    console.log(this.AnnualForm);
    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;
    console.log(control_annual);

    let oldYear = this.year_m;
    let oldValYear = control_annual.value;

    console.log(oldYear);
    console.log(oldValYear);






  }

  getCurrentSpendingActual() {
    this.initiativeService.getOptionSpendingActual.subscribe(data => {
        console.log('getOptionSpendingActual >> ', data);
        if (data) {
          this.InitiativeDetailForm.get('SpendingActual').setValue(parseFloat(data).toFixed(2));
        }
      })
    }

}
