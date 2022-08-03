import { InitiativeService } from '@services/initiative/initiative.service';
import { CapexService } from '@services/capex/capex.service';
import { SwalTool } from '@tools/swal.tools';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { AuthService } from '@services/authentication/auth.service';
import { DetailService } from '@services/detail/detail.service';
import { StatusService } from '@services/status/status.service';
import { SubmitService } from '@services/submit/submit.service';
import { DateUtil } from '@utils/date.utils';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PoolService } from '@services/pool/pool.service';
import { CommonDataService } from '@services/common-data/common-data.service';
import { Currency } from '@models/commonData';

@Component({
  selector: 'app-pool-capex-info-form',
  templateUrl: './pool-capex-info-form.component.html',
  styleUrls: ['./pool-capex-info-form.component.css']
})
export class PoolCapexInfoFormComponent implements OnInit {

  constructor(
    private initiativeService: InitiativeService,
    private submitService: SubmitService,
    private capexService: CapexService,
    private dateUtil: DateUtil,
    private fb: FormBuilder,
    private swalTool: SwalTool,
    private poolService: PoolService,
    private commonDataService: CommonDataService

  ) {

  }

  @Input() formGroup: FormGroup;
  @Input() id: number;


  selectedVP: string = '';
  selectionVP: string = '';
  name = 'CAPEX Information';
  page = 'capex-information';

  CapexType = 'Createnew';

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

  // CapexReqForm = this.fb.group({
  //   capexPlane: this.fb.array([
  //   ])
  // });

  capexvalidate = false;
  CapexReqForm: FormGroup;

  PoolYear_close = false;

  // capexInformationForm: FormGroup;

  capexInformationForm = this.fb.group({
    capexInformationId: 0,
    startingDate: [''],
    projecctComRun: [''],
    requestIniNoDate: [null],
    projectExePeriodYear: '',
    projectExePeriodMonth: '',
    budgetStartDate: '',
    projectCost: [''],
    organization: '',
    reasonOfChanging: '',
    budgetPeriod: '',
    betweenYear: '',
    transferForm: '',
    poolBudgetForm: '',
    strategy: '',
    poolYear: '',
    costCenterOfVP: [null],
    codeCostCenterOfVP: [''],
    poolID: '0',
    availableBudget: '0',

    // add for submit
    submitTo: '',
    revistion: 0,

    //change type
    capexType: 'Requestpool',
    budgetYear: '',
    capexStatus: '',
    isMaxApprovedRev: false,
    sequent: '',
    existingBudget: '0',
    spendingActual: '0',
    additionalCost: '0',
    returnCost: '0',
    availableBudgetPool: '',
    actionYear: '',


    //for monthly
    year_m: '',


    startingDate_tmp: '',
    projecctComRun_tmp: '',
    requestIniNoDate_tmp: '',
    showRemark_tmp: false,
    manager: '',
    projectManager: ''
  });


  AnnualForm = this.fb.group({
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
      currencyFx: null,
      overall: null,
      flagFirst_row: true
    })])
  });


  //////////////////////////////////////
  GetRevision = { Revistion: null };

  currencyList: Currency[] = [];
  currencyMountList: Currency[] = [];


  SearchManager(event) {
    this.GetManager(event.term);
  }

  changeManager($event) {
    this.manager = encodeURIComponent($event.ownerName);

    sessionStorage.setItem('capexManager', encodeURIComponent($event.ownerName));
  }
  changeProjectManager($event) {
    this.projectManager = encodeURIComponent($event.ownerName);
    sessionStorage.setItem('capexProjectManager', encodeURIComponent($event.ownerName));
  }

  ClearGetManager() {
    this.GetManager();
    sessionStorage.removeItem('capexManager');
    this.manager = '';
  }

  valueOwnerChange($eventText: any, text: string) {
    try {
      this.eventManagerSelectSubscribtion.unsubscribe();
    } catch (e) { }
    if ($eventText && $eventText.term && $eventText.term.trim().length > 0) {
      this.eventManagerSelectSubscribtion = this.initiativeService.GetOwners({ text: $eventText.term })
        .pipe(debounceTime(1000))
        .subscribe(owners => {
          switch (text) {
            case 'manager':
              this.managerList = owners;
              break;
            case 'president':
              this.presidentList = owners;
              break;
            default:
              break;
          }
        });
    } else {
      this.eventManagerSelectSubscribtion = this.initiativeService.GetOwners({ text: null })
        .pipe(debounceTime(1000))
        .subscribe(owners => {
          switch (text) {
            case 'manager':
              this.managerList = owners;
              break;
            case 'president':
              this.presidentList = owners;
              break;
            default:
              break;
          }
        });
    }
  }

  GetManager(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.managerList = owners;
    });
  }

  GetPresident(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.presidentList = owners;
    });
  }

  SearchProjectManager(event) {
    this.GetProjectManager(event.term);
  }

  ClearProjectManager() {
    this.GetProjectManager();
    sessionStorage.removeItem('capexProjectManager');
    this.projectManager = '';
  }

  GetProjectManager(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.projectManagerList = owners;
    });
  }

  //get invalidProjectManager() {
  //   //return this.capexInformationForm.controls.projectManager.touched && this.CapexReqForm.controls.projectManager.invalid;
  //  return this.capexInformationForm.controls.projectManager.touched && this.capexInformationForm.controls.projectManager.invalid;
  //}

  //get invalidManager() {
  //   //return this.capexInformationForm.controls.manager.touched && this.CapexReqForm.controls.manager.invalid;
  //  return this.capexInformationForm.controls.manager.touched && this.capexInformationForm.controls.manager.invalid;
  //}

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


  // AnnualForm: FormGroup;

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
    this.id = this.initiativeService.id;

    this.commonDataService.GetcommonDataByType('currency').then((commonResp) => {
      if (commonResp.length > 0) {
        this.currencyList = [];
        this.currencyMountList = [];

        commonResp.forEach((data) => {
          if (data.attribute02 != 'Baht') {
            this.currencyList.push({
              currencyValue: data.attribute02,
              currencyMillionName: 'Million ' + data.attribute02,
              currencyName: data.attribute02,
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

    if (!this.formGroup.get('capexInformationForm')) {
      this.formGroup.addControl('capexInformationForm', this.capexInformationForm);
    }
    // this.init();

    this.initiativeService.GetOwners().subscribe(owners => this.owners = owners);



    this.bsConfigYear = Object.assign({}, { isAnimated: true, dateInputFormat: 'YYYY', minMode: this.minMode });
    this.year_now = (new Date()).getFullYear();
    this.year_next = (new Date()).getFullYear() + 1;


    if (this.initiativeService.id) {
      //have id
      this.GetInitiative();
      // alert('stage_Max: ' + this.stage_Max + '|| is_RequestCapex: ' + this.is_RequestCapex + '|| is_Max: ' + this.is_Max)
      this.initiativeService.GetDetailInformation(this.id).subscribe(resp => {

        if (resp != null && resp != undefined) {
          this.manager = (resp.manager);
          this.projectManager = (resp.projectManager);

        }
      });
      this.GetInitiativeInformation(this.id);
    } else {
      //create new
      this.init();
    }
  }

  init() {
    if (!this.capexInformationForm.get('AnnualForm')) {
      this.capexInformationForm.addControl('AnnualForm', this.AnnualForm);
    }
  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }

  GetRevistion() {
    if (this.id != 0) {
      this.capexService.GetCapexsInfo(this.id.toString(),
        this.CapexType).subscribe(response => {
          if (this.CapexType == 'AddmoreCapex' || this.CapexType == 'Return') {

            if (response.revistion == 0) {
              response.revistion = response.revistion + 1;
              this.GetRevision = {
                Revistion: response.revistion
              };
            }
            else {
              this.GetRevision = {
                Revistion: response.revistion
              };
            }

          }
          else if (this.CapexType == 'Createnew') {
            this.GetRevision = {
              Revistion: response.revistion
            };
          }
          else {
            this.GetRevision = {
              Revistion: response.revistion
            }
          }
        });
    }
  }

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
      if (this.PoolBudgetForm != "") {
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



  GetInitiative() {
    // after refresh
    this.capexService.GetCapexsInfo(this.id.toString(), 'Requestpool').subscribe(response => {


      if (response !== null) {
        sessionStorage.setItem("ViceOwner", response.costCenterOfVP);
      }
      if (response == null) {
        this.seq_ = 1;
        this.initiativeService.GetInitiative(this.id).subscribe(response => {
          this.stage_Max = response.stage;
          this.is_RequestCapex = response.isRequestCapex;
          this.is_Max = Boolean(response.max);
          this.initiativeService.GetDetailInformation(this.id).subscribe(resp => {
            let ViceOwner = sessionStorage.getItem("ViceOwner");
            if (resp != null && resp != undefined) {
              if (resp.president == ViceOwner) {
                this.GetOwnerID(resp.president);
              }
              else {
                if (ViceOwner != null) {
                  this.GetOwnerID(ViceOwner);
                } else {
                  this.GetOwnerID(resp.president);
                }
              }
              sessionStorage.setItem('capexManager', (resp.manager));
              sessionStorage.setItem('capexProjectManager', (resp.projectManager));
              this.manager = resp.manager && resp.manager != '' ? resp.manager : '';
              this.projectManager = resp.projectManager && resp.projectManager != '' ? resp.projectManager : '';
            }
            else {
              this.GetOwnerID(ViceOwner);
            }


          });

          this.Initiative_tmp = response;

          let cost_;

          if (response.costEstCapexType == "USD") {
            cost_ = response.costEstCapex * response.fxExchange;
          }
          else {
            cost_ = response.costEstCapex;
          }


          this.StartingDate = response.startingDate ? new Date(response.startingDate) : null;
          this.ProjecctComRun = response.finishingDate ? new Date(response.finishingDate) : null;

          this.ProjectExePeriodYear = "0";
          this.ProjectExePeriodMonth = "0";
          this.BudgetStartDate = "";
          this.ProjectCost = cost_.toFixed(2);
          this.OldProjectCost = cost_.toFixed(2);
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




          this.EndYear_1 = this.ProjecctComRun ? new Date(this.ProjecctComRun).getFullYear() : null;
          this.StartYear_1 = this.year_now;

          this.YearTable_capex = [];

          for (let i = 0; i < 10; i++) {
            if (this.StartingDate != null && this.ProjecctComRun != null && this.RequestIniNoDate != null
              && this.StartingDate != "" && this.ProjecctComRun != "" && this.RequestIniNoDate != "") {
              if (+this.StartYear_1 + i <= +this.EndYear_1) {
                this.YearTable_capex.push({
                  columnname: +this.StartYear_1 + i,
                  isEdit: false
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

            startingDate_tmp: response.startingDate,
            projecctComRun_tmp: response.finishingDate,
            requestIniNoDate_tmp: null,
            showRemark_tmp: false,
            poolYear: this.PoolYear,
            manager: this.manager && this.manager != '' ? this.manager : '',
            projectManager: this.projectManager && this.projectManager != '' ? this.projectManager : ''
          });
        });
      } else {
        this.year_now = (new Date()).getFullYear();
        this.year_next = (new Date()).getFullYear() + 1;
        this.initiativeService.GetInitiative(this.id).subscribe(r => {
          this.stage_Max = r.stage;
          this.is_RequestCapex = r.isRequestCapex;
          this.is_Max = Boolean(r.max);
        });
        this.seq_ = response.sequent;
        this.capexInformationId = response.capexInformationId;
        this.Initiative_tmp = response;
        let cost_;
        cost_ = response.projectCost;
        this.StartingDate = response.startingDate ? new Date(response.startingDate) : null;
        this.ProjecctComRun = response.projecctComRun ? new Date(response.projecctComRun) : null;
        this.ProjectExePeriodYear = response.projectExePeriodYear;
        this.ProjectExePeriodMonth = response.projectExePeriodMonth;
        if (response.actionYear != "" && response.actionYear != null) {
          this.RequestIniNoDate = response.actionYear ? new Date(response.actionYear) : null;
          this.BudgetStartDate = response.actionYear ? new Date(response.actionYear) : null;
        }
        else {
          this.RequestIniNoDate = null;
          this.BudgetStartDate = null;
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

        this.initiativeService.GetDetailInformation(this.id).subscribe(resp => {
          let ViceOwner = sessionStorage.getItem("ViceOwner");
          if (resp != null && resp != undefined) {
            if (resp.president == ViceOwner) {
              this.GetOwnerID(resp.president);

            }
            else {
              if (ViceOwner.toString() === 'null') {
                this.GetOwnerID(resp.president);
              } else {
                this.GetOwnerID(ViceOwner);
              }
            }
            sessionStorage.setItem('capexManager', (resp.manager));
            sessionStorage.setItem('capexProjectManager', (resp.projectManager));
            this.manager = (resp.manager);
            this.projectManager = (resp.projectManager);
          }
          else {
            this.GetOwnerID(ViceOwner);
          }


        });

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
              this.AnnualForm.controls['AnnualTotal' + j].setValue(total.toFixed(2));
              AnnualTotal_overall = AnnualTotal_overall + +total;
              this.AnnualTotal_overall_tmp = +AnnualTotal_overall.toFixed(2);


              this.totalAnual[this.YearTable_capex[j - 1].columnname] = total;

            }


            this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall.toFixed(2));

            if (!this.capexInformationForm.get('AnnualForm')) {
              this.capexInformationForm.addControl('AnnualForm', this.AnnualForm);
            }

          }

          this.capexInformationForm.get('year_m').setValue(this.year_m ? this.year_m : '');

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
                if (!this.capexInformationForm.get('monthForm0')) {
                  this.capexInformationForm.addControl('monthForm0', this.monthForm0);
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
                if (!this.capexInformationForm.get('monthForm1')) {
                  this.capexInformationForm.addControl('monthForm1', this.monthForm1);
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
                if (!this.capexInformationForm.get('monthForm2')) {
                  this.capexInformationForm.addControl('monthForm2', this.monthForm2);
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
                if (!this.capexInformationForm.get('monthForm3')) {
                  this.capexInformationForm.addControl('monthForm3', this.monthForm3);
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
                if (!this.capexInformationForm.get('monthForm4')) {
                  this.capexInformationForm.addControl('monthForm4', this.monthForm4);
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
                if (!this.capexInformationForm.get('monthForm5')) {
                  this.capexInformationForm.addControl('monthForm5', this.monthForm5);
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
                if (!this.capexInformationForm.get('monthForm6')) {
                  this.capexInformationForm.addControl('monthForm6', this.monthForm6);
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
                if (!this.capexInformationForm.get('monthForm7')) {
                  this.capexInformationForm.addControl('monthForm7', this.monthForm7);
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
                if (!this.capexInformationForm.get('monthForm8')) {
                  this.capexInformationForm.addControl('monthForm8', this.monthForm8);
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
                if (!this.capexInformationForm.get('monthForm9')) {
                  this.capexInformationForm.addControl('monthForm9', this.monthForm9);
                }
              }
            })
          }


        })


        let poolID_ = response.poolId;

        if (poolID_ != 0 && poolID_ != null) {

          this.capexService.GetCapexsInfo(poolID_, 'Requestpool').subscribe(response2 => {
            if (response2 != null && response2 != undefined) {
              if (response.availableBudget == 0) {
                this.AvailableBudget = response2.availableBudget;
              }
              else {
                this.AvailableBudget = response.availableBudget;
              }
              this.capexInformationForm.controls['poolID'].setValue(poolID_);
              this.capexInformationForm.controls['availableBudget'].setValue(this.AvailableBudget);

            }

          });

        }


        this.capexInformationForm.patchValue({
          capexInformationId: this.capexInformationId,
          startingDate: this.StartingDate,
          projecctComRun: this.ProjecctComRun,
          requestIniNoDate: this.RequestIniNoDate,
          projectExePeriodYear: this.ProjectExePeriodYear,
          projectExePeriodMonth: this.ProjectExePeriodMonth,
          budgetStartDate: this.BudgetStartDate,
          projectCost: this.ProjectCost,
          organization: this.organization,
          reasonOfChanging: this.ReasonOfChanging,
          budgetPeriod: this.BudgetForm,
          betweenYear: this.BetweenYear,
          transferForm: this.TransferForm,
          poolBudgetForm: this.PoolBudgetForm,
          strategy: this.strategy,
          costCenterOfVP: this.CostCenterOfVP,
          codeCostCenterOfVP: this.CodeCostCenterOfVP,
          availableBudget: this.AvailableBudget,
          poolID: this.PoolID,
          poolYear: this.PoolYear,
          startingDate_tmp: response.startingDate,
          projecctComRun_tmp: response.projecctComRun,
          requestIniNoDate_tmp: response.requestIniNoDate,
          showRemark_tmp: false,

          //add
          submitTo: response.submitTo,
          revistion: response.revistion,
          capexType: response.capexType,
          budgetYear: response.budgetYear,
          capexStatus: response.capexStatus,
          isMaxApprovedRev: response.isMaxApprovedRev,
          sequent: response.sequent,
          existingBudget: response.existingBudget,
          spendingActual: response.spendingActual,
          additionalCost: response.additionalCost,
          returnCost: response.returnCost,
          availableBudgetPool: response.availableBudgetPool,
          actionYear: response.actionYear,







          manager: this.manager && this.manager != '' ? this.manager : '', //== null ? '11' : this.manager,
          projectManager: this.projectManager && this.projectManager != '' ? this.projectManager : '' //== '' ? '44' : this.projectManager //'firsttime! from api projectManager'
        });

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
                isEdit: false
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
      }

      this.CHk_validate();
    });

    if (this.initiativeService.viewMode) {
      this.capexInformationForm.disable();
    }


  }

  GetInitiativeInformation(id) {
    this.initiativeService.GetSuggestStatus(id).subscribe(response => {
      this.status = response.status;
      this.stage = response.stage;
      this.remark = response.remark;
      this.Cim = response.cim ? true : false;
      this.Dim = response.dim ? true : false;
      this.Capex = response.directCapex ? true : false;
      this.Strategy = response.strategy ? true : false;
      this.Max = response.max ? true : false;
    });
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
    if (event.availableBudget == 0) {
      this.AvailableBudget = event.projectCost;
    } else {
      this.AvailableBudget = event.availableBudget;
    }

    this.capexInformationForm.controls['availableBudget'].setValue(this.AvailableBudget);
  }

  changeRate(value, i) {
    const control = this.AnnualForm.get('annualForm_list') as FormArray;
    let fxRate = this.currencyList.find(fx => fx.currencyMillionName == control.at(i).get('currencyTitle').value);
    control.at(i).get('currencyFx').patchValue(fxRate.fxRate);
    if (control.at(i).get('currencyTitle').value != "" && control.at(i).get('currencyTitle').value != undefined &&
      control.at(i).get('currencyFx').value != "" && control.at(i).get('currencyFx').value != undefined) {
      const control1 = this.monthForm0.get('monthForm_list') as FormArray;
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
      const control2 = this.monthForm1.get('monthForm_list') as FormArray;
      if (control2.at(i) == undefined) {
        this.addMonth_withvalue2(fxRate.currencyName, '', '', '', '',
          '', '', '', '', '', '', '', '', '', fxRate.fxRate);
      }
      else {
        control2.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
        control2.at(i).get('currencyFx').patchValue(fxRate.fxRate);
      }
      const control3 = this.monthForm2.get('monthForm_list') as FormArray;
      if (control3.at(i) == undefined) {
        this.addMonth_withvalue3(fxRate.currencyName, '', '', '', '',
          '', '', '', '', '', '', '', '', '', fxRate.fxRate);
      }
      else {
        control3.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
        control3.at(i).get('currencyFx').patchValue(fxRate.fxRate);
      }
      const control4 = this.monthForm3.get('monthForm_list') as FormArray;
      if (control4.at(i) == undefined) {
        this.addMonth_withvalue4(fxRate.currencyName, '', '', '', '',
          '', '', '', '', '', '', '', '', '', fxRate.fxRate);
      }
      else {
        control4.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
        control4.at(i).get('currencyFx').patchValue(fxRate.fxRate);
      }
      const control5 = this.monthForm4.get('monthForm_list') as FormArray;
      if (control5.at(i) == undefined) {
        this.addMonth_withvalue5(fxRate.currencyName, '', '', '', '',
          '', '', '', '', '', '', '', '', '', fxRate.fxRate);
      }
      else {
        control5.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
        control5.at(i).get('currencyFx').patchValue(fxRate.fxRate);
      }
      const control6 = this.monthForm5.get('monthForm_list') as FormArray;
      if (control6.at(i) == undefined) {
        this.addMonth_withvalue6(fxRate.currencyName, '', '', '', '',
          '', '', '', '', '', '', '', '', '', fxRate.fxRate);
      }
      else {
        control6.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
        control6.at(i).get('currencyFx').patchValue(fxRate.fxRate);
      }
      const control7 = this.monthForm6.get('monthForm_list') as FormArray;
      if (control7.at(i) == undefined) {
        this.addMonth_withvalue7(fxRate.currencyName, '', '', '', '',
          '', '', '', '', '', '', '', '', '', fxRate.fxRate);
      }
      else {
        control7.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
        control7.at(i).get('currencyFx').patchValue(fxRate.fxRate);
      }
      const control8 = this.monthForm7.get('monthForm_list') as FormArray;
      if (control8.at(i) == undefined) {
        this.addMonth_withvalue8(fxRate.currencyName, '', '', '', '',
          '', '', '', '', '', '', '', '', '', fxRate.fxRate);
      }
      else {
        control8.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
        control8.at(i).get('currencyFx').patchValue(fxRate.fxRate);
      }
      const control9 = this.monthForm8.get('monthForm_list') as FormArray;
      if (control9.at(i) == undefined) {
        this.addMonth_withvalue9(fxRate.currencyName, '', '', '', '',
          '', '', '', '', '', '', '', '', '', fxRate.fxRate);
      }
      else {
        control9.at(i).get('currencyTitle').patchValue(fxRate.currencyName);
        control9.at(i).get('currencyFx').patchValue(fxRate.fxRate);
      }
      const control10 = this.monthForm9.get('monthForm_list') as FormArray;
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
    const control = this.AnnualForm.get('annualForm_list') as FormArray;
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
      this.AnnualForm.controls['AnnualTotal' + j].setValue(total.toFixed(2));
      AnnualTotal_overall = AnnualTotal_overall + +total.toFixed(2);
      AnnualTotal_overall = +AnnualTotal_overall.toFixed(2);
      this.AnnualTotal_overall_tmp = AnnualTotal_overall.toFixed(2);
      this.totalAnual[this.YearTable_capex[j - 1].columnname] = total.toFixed(2);
    }

    this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall.toFixed(2));


    if (+AnnualTotal_overall > +this.ProjectCost) {
      this.initiativeService.viewMode ? false : this.swalTool.SumCost_3();
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
        control_month0.at(i).get('flag_alert').patchValue(true);
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
          control_month1.at(i).get('flag_alert').patchValue(true);
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
          control_month2.at(i).get('flag_alert').patchValue(true);
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
          control_month3.at(i).get('flag_alert').patchValue(true);
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
          control_month4.at(i).get('flag_alert').patchValue(true);
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
          control_month5.at(i).get('flag_alert').patchValue(true);
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
          control_month6.at(i).get('flag_alert').patchValue(true);
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
          control_month7.at(i).get('flag_alert').patchValue(true);
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
          control_month8.at(i).get('flag_alert').patchValue(true);
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
          control_month9.at(i).get('flag_alert').patchValue(true);
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
    if (this.AnnualForm) {
      this.AnnualForm.reset();

      this.YearTable_capex = [];
      this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
      this.StartYear_1 = this.year_now;

      for (let i = 0; i < 10; i++) {
        if (this.StartingDate != null && this.ProjecctComRun != null && this.RequestIniNoDate != null
          && this.StartingDate != "" && this.ProjecctComRun != "" && this.RequestIniNoDate != "") {
          if (+this.StartYear_1 + i <= +this.EndYear_1) {
            this.YearTable_capex.push({
              columnname: +this.StartYear_1 + i,
              isEdit: false
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
    }
  }

  initial_month() {
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

    //====================== Month Table ======================
    this.diffYear = +this.EndYear_1 - +this.StartYear_1;
    let startMonth = this.RequestIniNoDate ? new Date(this.RequestIniNoDate).getMonth() + 1 : 0;
    let endMonth = this.ProjecctComRun ? new Date(this.ProjecctComRun).getMonth() + 1 : 0;
    this.year_m = [];
    for (let i = 0; i <= this.diffYear; i++) {
      this.year_m.push(+this.StartYear_1 + +i);
      if (!this.formGroup.get('capexInformationForm').get('monthForm' + i)) {
        let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
        capexForm.addControl('monthForm' + i, this['monthForm' + i]);
      }
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
    if ((+monthTotal_overall) > +mTotal) {
      this.flag_fail = "yes";
    }
    else {
      this.flag_fail = "no";
    }
    if (!this.formGroup.get('capexInformationForm').get('monthForm0')) {
      let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
      capexForm.addControl('monthForm0', this.monthForm0);
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
        control.at(i).get('flag_alert').patchValue(true);
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
    if ((+monthTotal_overall) > +mTotal) {
      this.flag_fail = "yes";
    }
    else {
      this.flag_fail = "no";
    }
    if (!this.formGroup.get('capexInformationForm').get('monthForm1')) {
      let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
      capexForm.addControl('monthForm1', this.monthForm1);
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
        control.at(i).get('flag_alert').patchValue(true);
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
    if ((+monthTotal_overall) > +mTotal) {
      this.flag_fail = "yes";
    }
    else {
      this.flag_fail = "no";
    }
    if (!this.formGroup.get('capexInformationForm').get('monthForm2')) {
      let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
      capexForm.addControl('monthForm2', this.monthForm2);
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
        control.at(i).get('flag_alert').patchValue(true);
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


    if ((+monthTotal_overall) > +mTotal) {
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    if (!this.formGroup.get('capexInformationForm').get('monthForm3')) {
      let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
      capexForm.addControl('monthForm3', this.monthForm3);
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
        control.at(i).get('flag_alert').patchValue(true);
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


    if ((+monthTotal_overall) > +mTotal) {
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    if (!this.formGroup.get('capexInformationForm').get('monthForm4')) {
      let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
      capexForm.addControl('monthForm4', this.monthForm4);
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
        control.at(i).get('flag_alert').patchValue(true);
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


    if ((+monthTotal_overall) > +mTotal) {
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    if (!this.formGroup.get('capexInformationForm').get('monthForm5')) {
      let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
      capexForm.addControl('monthForm5', this.monthForm5);
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
        control.at(i).get('flag_alert').patchValue(true);
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

    if ((+monthTotal_overall) > +mTotal) {
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    if (!this.formGroup.get('capexInformationForm').get('monthForm6')) {
      let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
      capexForm.addControl('monthForm6', this.monthForm6);
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
        control.at(i).get('flag_alert').patchValue(true);
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


    if ((+monthTotal_overall) > +mTotal) {
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    if (!this.formGroup.get('capexInformationForm').get('monthForm7')) {
      let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
      capexForm.addControl('monthForm7', this.monthForm7);
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
        control.at(i).get('flag_alert').patchValue(true);
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


    if ((+monthTotal_overall) > +mTotal) {
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    if (!this.formGroup.get('capexInformationForm').get('monthForm8')) {
      let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
      capexForm.addControl('monthForm8', this.monthForm8);
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
        control.at(i).get('flag_alert').patchValue(true);
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



    if ((+monthTotal_overall) > +mTotal) {
      this.flag_fail = "yes";

    }
    else {
      this.flag_fail = "no";

    }
    if (!this.formGroup.get('capexInformationForm').get('monthForm9')) {
      let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
      capexForm.addControl('monthForm9', this.monthForm9);
    }
    this.CHk_validate();

  }

  setStartingDate(date1_Start: Date) {
    if (date1_Start) {
      this.capexvalidate = true;
      let convertDate = new Date(date1_Start);
      if (!isNaN(convertDate.getTime())) {
        if (new Date(this.StartingDate).getTime() != convertDate.getTime()) {
          this.StartingDate = convertDate;
          this.capexInformationForm.controls['requestIniNoDate'].setValue('');
          this.capexInformationForm.controls['startingDate'].setValue(convertDate);


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
      if (!isNaN(convertDate.getTime())) {
        this.capexvalidate = true;
        if (new Date(this.StartingDate).getTime() <= convertDate.getTime()) {

          if (new Date(this.ProjecctComRun).getTime() != convertDate.getTime()) {
            this.EndYear_1 = convertDate.getFullYear();
            this.ProjecctComRun = convertDate;
            this.RequestIniNoDate = null;
            this.year_m = [];
            this.formGroup.get('detailForm').get('depreciationCost').setValue(this.poolService.calculateDepreciationCost(this.formGroup));

            this.capexInformationForm.patchValue({
              projecctComRun: this.ProjecctComRun,
              startingDate: this.StartingDate,
              requestIniNoDate: "",
              actionYear: "",
              startingDate_tmp: this.StartingDate,
              projecctComRun_tmp: this.ProjecctComRun
            });
            this.clearMonthlyInvestmentTable();
            // this.adjustAnnualAndMonthlyTable(new Date(), 'projecctComRun');
            this.Diff();
          }
        } else {
          this.initiativeService.viewMode ? false : this.swalTool.DateBudgetStart();
          this.capexInformationForm.get('projecctComRun').setValue('');
          this.flag_fail = "yes";
        }

      }
      else {
        this.capexvalidate = false;
      }
    }
  }

  setRequestDate(date1: Date) {
    if (date1) {
      let convertDate1 = new Date(date1);
      if (!isNaN(convertDate1.getTime())) {
        if (new Date(this.RequestIniNoDate).getTime() != convertDate1.getTime()) {
          if (this.formGroup.get('capexInformationForm').get('AnnualForm')) {
            let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
            capexForm.removeControl('AnnualForm');
          }
          this.clearMonthlyInvestmentTable();

          this.RequestIniNoDate = convertDate1;
          if (this.RequestIniNoDate != "") {
            this.adjustAnnualAndMonthlyTable(convertDate1, 'RequestIniNoDate');
          }


        }
        this.Diff();

        this.CHk_validate();

      }
    } else {
      this.clearMonthlyInvestmentTable();
    }

    // this.initial_month();


  }

  clearMonthlyInvestmentTable() {
    this.year_m = [];
    this.RequestIniNoDate = null;
    let capexForm = this.formGroup.get('capexInformationForm') as FormGroup;
    capexForm.get('year_m').setValue(this.year_m);
    for (let index = 0; index < 10; index++) {
      if (this.formGroup.get('capexInformationForm').get('monthForm' + index)) {
        capexForm.get('monthForm' + index).reset();
        capexForm.removeControl('monthForm' + index);
      }
    }
    this.initial_year();
    // if (this.formGroup.get('capexInformationForm').get('AnnualForm')) {
    //   capexForm.removeControl('AnnualForm');
    // }
  }

  adjustAnnualAndMonthlyTable(dateStart: Date, type: string) {
    let oldYear = this.year_m;
    // this.StartYear_1 = dateStart.getFullYear();
    let d1 = this.StartingDate;
    let d2 = this.ProjecctComRun;
    let d3 = this.RequestIniNoDate;

    if ((d3 >= d1 && d3 < d2) == false && type === "RequestIniNoDate") {
      this.RequestIniNoDate = "";
      this.capexInformationForm.get('requestIniNoDate').invalid;
      this.capexInformationForm.get('requestIniNoDate').setValue('');
      this.initiativeService.viewMode ? false : this.swalTool.DateBudgetStart();
      this.flag_fail = "yes";
      this.capexvalidate = false;
    }
    else {
      this.flag_fail = "no";
      this.capexvalidate = true;
      this.capexInformationForm.patchValue({
        requestIniNoDate: this.RequestIniNoDate,
        actionYear: this.RequestIniNoDate,
        requestIniNoDate_tmp: this.RequestIniNoDate
      });



      this.YearTable_capex = [];

      //====================== Year Table ======================

      // if (!this.capexInformationForm.get('AnnualForm')) {
      //   this.capexInformationForm.addControl('AnnualForm', this.AnnualForm);
      // }


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


      if (+AnnualTotal_overall > +this.ProjectCost) {
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

  checkRequestIniNoDate(value) {
    if (this.RequestIniNoDate) {
      this.setProjectCost(value)
    } else {
      this.capexInformationForm.get('projectCost').setValue(null);
      this.capexInformationForm.get('requestIniNoDate').markAsTouched();
      this.ProjectCost = null;
    }
  }


  setProjectCost(value) {
    if (value) {


      var x1 = +value.replace(/,/g, "");
      var x2 = this.OldProjectCost ? +this.OldProjectCost : x1;

      if (x1 != x2) {
        this.RemarkShow = true;
        this.capexInformationForm.controls['showRemark_tmp'].setValue(true);
      }
      else {
        this.RemarkShow = false;
      }

      this.ProjectCost = value.replace(/,/g, "");
      this.capexInformationForm.controls['projectCost'].setValue(value.replace(/,/g, ""));

      if (+this.AnnualTotal_overall_tmp > +this.ProjectCost) {
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

      this.formGroup.get('detailForm').get('depreciationCost').setValue(this.poolService.calculateDepreciationCost(this.formGroup));

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

      ////================= Year ======================
      // var x = this.ProjecctComRun.substring(6).substring(0, 4);
      // var y = this.RequestIniNoDate.substring(6).substring(0, 4);

      // if (+x > +y) {
      //   var diff = +x - y;

      //   this.ProjectExePeriodYear = diff
      //   this.capexInformationForm.controls['ProjectExePeriodYear'].setValue(this.ProjectExePeriodYear);

      // }
      // else {
      //   this.capexInformationForm.controls['ProjectExePeriodYear'].setValue("0");

      // }

      ////================= Month ======================

      // var x2 = this.ProjecctComRun.substring(3).substring(0, 2);
      // var y2 = this.RequestIniNoDate.substring(3).substring(0, 2);

      // if (+x2 > +y2) {
      //   var diff2 = +x2 - y2;

      //   this.ProjectExePeriodMonth = diff2
      //   this.capexInformationForm.controls['ProjectExePeriodMonth'].setValue(this.ProjectExePeriodMonth);

      // }
      // else {

      //   if (x == y) {
      //     this.capexInformationForm.controls['ProjectExePeriodMonth'].setValue("1");
      //   }
      //   else {
      //     this.capexInformationForm.controls['ProjectExePeriodMonth'].setValue("0");
      //   }

      // }

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
        this.initiativeService.viewMode ? false : this.swalTool.SumCost();
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
            // this.initiativeService.viewMode ? false : this.swalTool.SumCostMonth();
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
      this.initiativeService.viewMode ? false : this.swalTool.AlertAnnualInvestment();
      this.flag_fail = "yes";
      this.capexvalidate = false;

    }

    this.CHk_validate();

  }

  SearchOwnerName(event) {
    this.GetOwners(event.term.toString());
  }

  ClearOwnerName() {
    this.capexInformationForm.controls["codeCostCenterOfVP"].setValue(null);
    if (this.formGroup.get('detailForm')) {
      this.formGroup.get('detailForm').get('president').setValue(null);
    }
  }

  GetOwners(Text?) {

    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.owners = owners;
    });
  }

  getCodeCostVP() {
    return true;
  }

  GetOwnersVP(event) {
    if (event) {
      this.params.text = event.ownerName ? event.ownerName : '';
      this.capexService.GetCodeOfCostCenterVP(this.params.text).subscribe((response) => {
        if (response.length != 0) {
          this.capexInformationForm.controls["codeCostCenterOfVP"].setValue(response[0].mainPositionCostCenter);
          //update detail max form
          if (this.formGroup.get('detailForm')) {
            this.formGroup.get('detailForm').get('president').setValue(response[0].ownerName);
          }
        }
        this.CHk_validate();
      });
    }
  }


  GetUser() {
  }


  setOwner(event) {
    this.capexInformationForm.controls['costCenterOfVP'].setValue(event.ownerName);
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


  pool(value) {
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

  Submit(submitForm) {

    this.SetMarkAsTouchedFormGeneral();
    this.CHk_validate_submit();
    this.SubmitClick(submitForm);
  }


  CHk_validate() {
    this.tmp_error = "no";
    this.tmp_error_m = "no";
    this.tmp_error_AnnualTotal = "no";
    this.tmp_error_pool = "no";

    try {

      const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;
      const AnnualTotal_overall = this.AnnualForm.get('AnnualTotal_overall') as FormArray;

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

          control_month0.at(i).get('flag_alert').patchValue(true);
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

            control_month1.at(i).get('flag_alert').patchValue(true);

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

            control_month2.at(i).get('flag_alert').patchValue(true);

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

            control_month3.at(i).get('flag_alert').patchValue(true);

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
            control_month4.at(i).get('flag_alert').patchValue(true);

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

            control_month5.at(i).get('flag_alert').patchValue(true);

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
            control_month6.at(i).get('flag_alert').patchValue(true);

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
            control_month7.at(i).get('flag_alert').patchValue(true);

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
            control_month8.at(i).get('flag_alert').patchValue(true);

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
            control_month9.at(i).get('flag_alert').patchValue(true);

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
        this.flag_fail = "yes";
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
        return;
      }

      if (this.capexInformationForm.controls['costCenterOfVP'].value == "" ||
        this.capexInformationForm.controls['costCenterOfVP'].value == null ||
        this.capexInformationForm.controls['costCenterOfVP'].value == undefined) {

        this.flag_fail = "yes";
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;

        return;

      }

      if (this.BudgetForm == "" || this.BudgetForm == null || this.BudgetForm == undefined) {

        this.flag_fail = "yes";
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
        return;
      }
      if (this.CodeCostCenterOfVP == "" || this.CodeCostCenterOfVP == null || this.CodeCostCenterOfVP == undefined) {
        this.flag_fail = "yes";
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
    }
    catch {

    }
  }

  CHk_validate_submit() {
    this.tmp_error = "no";
    this.tmp_error_AnnualTotal = "no";
    this.tmp_error_pool = "no";
    this.tmp_error_m = "no";

    let error_month = "";

    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;
    const AnnualTotal_overall = this.AnnualForm.get('AnnualTotal_overall') as FormArray;

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

        // if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {

        control_month0.at(i).get('flag_alert').patchValue(true);
        this.tmp_error_m = "yes";

        if (+control_month0.at(i).get('overall').value > +control_annual.at(i).get('y1').value * 1000000) {
          error_month = "more";
        }
        else {
          error_month = "less";
        }
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

          // if (control_month1.at(i).get('overall').value != control_annual.at(i).get('y2').value * 1000000) {
          control_month1.at(i).get('flag_alert').patchValue(true);

          this.tmp_error_m = "yes";

          if (+control_month1.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
            error_month = "more";
          }
          else {
            error_month = "less";
          }

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

          // if (control_month2.at(i).get('overall').value != control_annual.at(i).get('y3').value * 1000000) {
          control_month2.at(i).get('flag_alert').patchValue(true);

          this.tmp_error_m = "yes";

          if (+control_month2.at(i).get('overall').value > +control_annual.at(i).get('y3').value * 1000000) {
            error_month = "more";
          }
          else {
            error_month = "less";
          }

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

          // if (control_month3.at(i).get('overall').value != control_annual.at(i).get('y4').value * 1000000) {
          control_month3.at(i).get('flag_alert').patchValue(true);

          this.tmp_error_m = "yes";

          if (+control_month3.at(i).get('overall').value > +control_annual.at(i).get('y4').value * 1000000) {
            error_month = "more";
          }
          else {
            error_month = "less";
          }

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
          control_month4.at(i).get('flag_alert').patchValue(true);

          this.tmp_error_m = "yes";

          if (+control_month4.at(i).get('overall').value > +control_annual.at(i).get('y5').value * 1000000) {
            error_month = "more";
          }
          else {
            error_month = "less";
          }

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
          control_month5.at(i).get('flag_alert').patchValue(true);

          this.tmp_error_m = "yes";

          if (+control_month5.at(i).get('overall').value > +control_annual.at(i).get('y6').value * 1000000) {
            error_month = "more";
          }
          else {
            error_month = "less";
          }

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
          control_month6.at(i).get('flag_alert').patchValue(true);

          this.tmp_error_m = "yes";

          if (+control_month6.at(i).get('overall').value > +control_annual.at(i).get('y7').value * 1000000) {
            error_month = "more";
          }
          else {
            error_month = "less";
          }

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
          control_month7.at(i).get('flag_alert').patchValue(true);

          this.tmp_error_m = "yes";

          if (+control_month7.at(i).get('overall').value > +control_annual.at(i).get('y8').value * 1000000) {
            error_month = "more";
          }
          else {
            error_month = "less";
          }


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
          control_month8.at(i).get('flag_alert').patchValue(true);

          this.tmp_error_m = "yes";

          if (+control_month8.at(i).get('overall').value > +control_annual.at(i).get('y9').value * 1000000) {
            error_month = "more";
          }
          else {
            error_month = "less";
          }

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
          control_month9.at(i).get('flag_alert').patchValue(true);

          this.tmp_error_m = "yes";

          if (+control_month9.at(i).get('overall').value > +control_annual.at(i).get('y10').value * 1000000) {
            error_month = "more";
          }
          else {
            error_month = "less";
          }
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

      this.flag_fail = "yes";
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.capexvalidate = false;
      this.initiativeService.viewMode ? false : this.swalTool.Required();
      return;
    }

    if (this.capexInformationForm.controls['costCenterOfVP'].value == "" ||
      this.capexInformationForm.controls['costCenterOfVP'].value == null ||
      this.capexInformationForm.controls['costCenterOfVP'].value == undefined) {

      this.flag_fail = "yes";
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.capexvalidate = false;
      this.initiativeService.viewMode ? false : this.swalTool.Required();
      return;

    }

    if (this.BudgetForm == "" || this.BudgetForm == null || this.BudgetForm == undefined) {
      this.flag_fail = "yes";

      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.capexvalidate = false;
      this.initiativeService.viewMode ? false : this.swalTool.Required_BudgetPeriod();
      return;
    }
    if (this.CodeCostCenterOfVP == "" || this.CodeCostCenterOfVP == null || this.CodeCostCenterOfVP == undefined) {

      this.flag_fail = "yes";
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.capexvalidate = false;
      this.initiativeService.viewMode ? false : this.swalTool.Required();
      return;

    }


    if (this.tmp_error_m == "yes") {
      this.capexvalidate = false;

      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      if (error_month == "more") {
        this.initiativeService.viewMode ? false : this.swalTool.SumCostMonth();
      }
      else {
        this.initiativeService.viewMode ? false : this.swalTool.SumCostMonth_2();
      }
    }
    else if (this.tmp_error_AnnualTotal == "yes") {

      this.capexvalidate = false;
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.initiativeService.viewMode ? false : this.swalTool.SumCost_3();
    }
    else if (this.tmp_error_pool == "yes") {

      this.capexvalidate = false;
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.initiativeService.viewMode ? false : this.swalTool.SumCost_4();
    }
    else if (this.tmp_error == "yes") {

      this.capexvalidate = false;
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.initiativeService.viewMode ? false : this.swalTool.SumCost_2();
    }
    else {

      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(true));
      this.capexvalidate = true;
    }

  }


  SubmitClick(submitForm) {
    //Tempolary Solution Solve Anual Plan alway 0 when submit
    // this.Savedraf();
    ///////////////////////////////////////////
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

    let AvailableBudget = 0
    if (this.AvailableBudget == null || this.AvailableBudget == undefined) {
      AvailableBudget = 0;
    }
    else {
      AvailableBudget = +this.AvailableBudget - +this.ProjectCost;
    }
    this.BudgetAva = AvailableBudget;

    let PoolID = 0
    if (this.capexInformationForm.controls['poolID'].value == null ||
      this.capexInformationForm.controls['poolID'].value == undefined) {
      PoolID = 0;
    }
    else {
      PoolID = this.capexInformationForm.controls['poolID'].value;
    }


    this.capexInformationForm.controls['startingDate'].setValue(this.StartingDate);
    this.capexInformationForm.controls['projecctComRun'].setValue(this.ProjecctComRun);
    this.capexInformationForm.controls['requestIniNoDate'].setValue(this.RequestIniNoDate);

    if (this.capexvalidate == true) {
      this.capexService.GetCapexsInfo(this.id.toString(), 'Createnew').subscribe(resp_1 => {

        if (resp_1 == null) {
          this.capexService.CreateCapexsInfo(
            this.StartingDate,
            this.ProjecctComRun,
            this.RequestIniNoDate,
            this.capexInformationForm.controls['projectExePeriodYear'].value,
            this.capexInformationForm.controls['projectExePeriodMonth'].value,
            this.capexInformationForm.controls['costCenterOfVP'].value,
            this.capexInformationForm.controls['codeCostCenterOfVP'].value,
            this.capexInformationForm.controls['projectCost'].value,
            this.capexInformationForm.controls['reasonOfChanging'].value,
            this.BudgetForm, //this.capexInformationForm.controls['BudgetForm'].value,
            this.capexInformationForm.controls['betweenYear'].value,
            this.capexInformationForm.controls['transferForm'].value,
            this.capexInformationForm.controls['poolBudgetForm'].value,
            "",
            "0",
            "Createnew",
            BudgetYear,
            "Submit",
            "false",
            this.seq_,
            "0",
            "0",
            "0",
            "",
            "0",
            PoolID.toString(),
            this.id.toString(),
            this.BudgetAva
          ).subscribe(response => {
            this.capexService.GetCapexsInfo(this.id.toString(), 'Createnew').subscribe(resp_1 => {
              this.capexInformationId = resp_1.capexInformationId
              this.capexService.CreateAnnualInvestmentPlan(
                this.id.toString(), this.AnnualForm, resp_1.capexInformationId, "submit", 'Createnew'
              ).subscribe(resp => {
              });
              this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
                this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
                this.monthForm8, this.monthForm9, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                  if (this.page === 'capex-information' || this.page === 'capex-information-addmore') {
                    this.submitService.SubmitStageStatus(this.id, submitForm).subscribe(() => {
                      this.initiativeService.viewMode ? false : this.swalTool.Submit();
                    });
                  }
                });
            });
          });

        } else {
          this.capexInformationId = resp_1.capexInformationId;
          this.capexService.PutUpdateCapexsinformations(
            this.StartingDate,
            this.ProjecctComRun,
            this.RequestIniNoDate,
            this.capexInformationForm.controls['projectExePeriodYear'].value,
            this.capexInformationForm.controls['projectExePeriodMonth'].value,
            this.capexInformationForm.controls['costCenterOfVP'].value,
            this.capexInformationForm.controls['codeCostCenterOfVP'].value,
            this.capexInformationForm.controls['projectCost'].value,
            this.capexInformationForm.controls['reasonOfChanging'].value,
            this.BudgetForm, //this.capexInformationForm.controls['BudgetForm'].value,
            this.capexInformationForm.controls['betweenYear'].value,
            this.capexInformationForm.controls['transferForm'].value,
            this.capexInformationForm.controls['poolBudgetForm'].value,
            "",
            "0",
            "Createnew",
            BudgetYear,
            "Submit",
            "false",
            this.seq_,
            "0",
            "0",
            "0",
            "0",
            "0",
            PoolID.toString(),
            this.id.toString(),
            this.capexInformationId,
            this.BudgetAva,
            this.manager == '' ? '-' : encodeURIComponent(this.manager),// this.capexInformationForm.get('manager').value,
            this.projectManager == '' ? '-' : encodeURIComponent(this.projectManager)
          ).subscribe(response => {


            this.capexService.GetCapexsInfo(this.id.toString(), 'Createnew').subscribe(resp_1 => {

              this.capexInformationId = resp_1.capexInformationId

              this.capexService.CreateAnnualInvestmentPlan(
                this.id.toString(), this.AnnualForm, resp_1.capexInformationId, "submit", 'Createnew'
              ).subscribe(resp => {
                this.route_ = 'true';

              });

              this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
                this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
                this.monthForm8, this.monthForm9, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                  // this.bindMonth();

                  this.route_m = 'true';
                });

              if (this.tmp_error == "no") {
                // this.router.navigate(['/initiative/my-own']);
              }

            });

          });
        }

      });
    }




  }

  Savedraf() {

    let BudgetYear = "";
    let BudgetForm_ = "";
    let BetweenYear_ = "";
    let TransferForm_ = "";
    let PoolBudgetForm_ = "";
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



    if (BudgetForm_ != "Current year") {
      this.capexType_ = "Createnew";
    } else if (BudgetForm_ == "Current year") {
      this.capexType_ = "Use Pool";
    }

    this.capexInformationForm.controls['startingDate'].setValue(this.StartingDate);
    this.capexInformationForm.controls['projecctComRun'].setValue(this.ProjecctComRun);
    this.capexInformationForm.controls['requestIniNoDate'].setValue(this.RequestIniNoDate);

    let AvailableBudget = 0
    if (this.AvailableBudget == null || this.AvailableBudget == undefined) {
      AvailableBudget = 0;
    }
    else {
      AvailableBudget = this.AvailableBudget;
    }

    let PoolID = 0
    if (this.capexInformationForm.controls['poolID'].value == null ||
      this.capexInformationForm.controls['poolID'].value == undefined) {
      PoolID = 0;
    }
    else {
      PoolID = this.capexInformationForm.controls['poolID'].value;
    }


    this.capexService.GetCapexsInfo(this.id.toString(), 'Createnew').subscribe(resp_1 => {


      if (resp_1 == null) {

        this.capexService.CreateCapexsInfo(
          this.StartingDate,
          this.ProjecctComRun,
          this.RequestIniNoDate,
          this.capexInformationForm.controls['projectExePeriodYear'].value,
          this.capexInformationForm.controls['projectExePeriodMonth'].value,
          this.capexInformationForm.controls['costCenterOfVP'].value,
          this.capexInformationForm.controls['codeCostCenterOfVP'].value,
          this.capexInformationForm.controls['projectCost'].value,
          this.capexInformationForm.controls['reasonOfChanging'].value,
          this.BudgetForm, //this.capexInformationForm.controls['BudgetForm'].value,
          this.capexInformationForm.controls['betweenYear'].value,
          this.capexInformationForm.controls['transferForm'].value,
          this.capexInformationForm.controls['poolBudgetForm'].value,
          "",
          "0",
          "Createnew",
          BudgetYear,
          "Draft",
          "false",
          this.seq_,
          "0",
          "0",
          "0",
          "",
          AvailableBudget.toString(),
          PoolID.toString(),
          this.id.toString(),
          AvailableBudget.toString()
        ).subscribe(response => {
          this.capexService.GetCapexsInfo(this.id.toString(), 'Createnew').subscribe(resp_1 => {

            this.capexInformationId = resp_1.capexInformationId

            this.capexService.CreateAnnualInvestmentPlan(
              this.id.toString(), this.AnnualForm, resp_1.capexInformationId, "draft", 'Createnew'
            ).subscribe(resp => {

              this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
                this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
                this.monthForm8, this.monthForm9, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                  // this.bindMonth();
                });

            });
            // this.flag_fail = "yes";

          });

        });

      } else {

        this.capexInformationId = resp_1.capexInformationId;

        this.capexService.PutUpdateCapexsinformations(
          this.StartingDate,
          this.ProjecctComRun,
          this.RequestIniNoDate,
          this.capexInformationForm.controls['projectExePeriodYear'].value,
          this.capexInformationForm.controls['projectExePeriodMonth'].value,
          this.capexInformationForm.controls['costCenterOfVP'].value,
          this.capexInformationForm.controls['codeCostCenterOfVP'].value,
          this.capexInformationForm.controls['projectCost'].value,
          this.capexInformationForm.controls['reasonOfChanging'].value,
          this.BudgetForm, //this.capexInformationForm.controls['BudgetForm'].value,
          this.capexInformationForm.controls['betweenYear'].value,
          this.capexInformationForm.controls['transferForm'].value,
          this.capexInformationForm.controls['poolBudgetForm'].value,
          "",
          "0",
          "Createnew",
          BudgetYear,
          "Draft",
          "false",
          this.seq_,
          "0",
          "0",
          "0",
          "0",
          AvailableBudget.toString(),
          PoolID.toString(),
          this.id.toString(),
          this.capexInformationId,
          AvailableBudget.toString(),
          this.manager == '' ? '-' : encodeURIComponent(sessionStorage.getItem('capexManager')),// this.capexInformationForm.get('manager').value,
          this.projectManager == '' ? '-' : encodeURIComponent(sessionStorage.getItem('capexProjectManager'))
        ).subscribe(response => {


          this.capexService.GetCapexsInfo(this.id.toString(), 'Createnew').subscribe(resp_1 => {

            this.capexInformationId = resp_1.capexInformationId

            this.capexService.CreateAnnualInvestmentPlan(
              this.id.toString(), this.AnnualForm, resp_1.capexInformationId, "draft", 'Createnew'
            ).subscribe(resp => {

              this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
                this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
                this.monthForm8, this.monthForm9, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                  // this.bindMonth();
                });
            });
            // this.router.navigate(['/initiative/my-own']);

          });

        });
      }

    });

  }

}

