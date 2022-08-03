import { CapexService } from '@services/capex/capex.service';
import { DetailService } from '@services/detail/detail.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DateUtil } from '@utils/date.utils';
import { SwalTool } from '@tools/swal.tools';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmitService } from '@services/submit/submit.service';
import { AuthService } from '@services/authentication/auth.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { ResponseService } from '@errors/response/response.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { DetailInformationService } from '@services/detail-information/detail-information.service';

@Component({
  selector: 'app-view-revition-addmore-pool',
  templateUrl: './view-revition-addmore-pool.component.html',
  styleUrls: ['./view-revition-addmore-pool.component.css']
})
export class ViewRevitionAddmorePoolComponent implements OnInit {

  constructor(
    private initiativeService: InitiativeService,
    private detailService: DetailService,
    private submitService: SubmitService,
    private detailInformationService: DetailInformationService,
    private capexService: CapexService,
    private dateUtil: DateUtil,
    private fb: FormBuilder,
    private swalTool: SwalTool,
    private route: ActivatedRoute,
    private response: ResponseService,
    private router: Router,
    private authService: AuthService,
    private unauthorized: UnauthorizedService,
    private spinner: NgxSpinnerService,
  ) {

  }

  name = 'CAPEX Information';
  page = 'capex-information-addmore';

  @Input() id;

  CapexType = 'Addmorepool';

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

  ExistingCost: any;
  AdditionalCost: any;

  kpises: any;
  kpiArray: any = [];
  kpiDetails: any;

  showContingency = false;
  showTransfer = false;
  showBOD = false;
  showTransferForm = false;
  showSubBOD = false;
  test: string = '1';

  Revistion: any[];
  capexStatus: any;
  capexType: any;

  isDisableAddKpis = false;
  isRemoveKpis = true;

  // CapexReqForm = this.fb.group({
  //   capexPlane: this.fb.array([
  //   ])
  // });

  CapexReqForm: FormGroup;
  GetRevision = { Revistion: null };


  tmp_exist_projectcost: any;

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
    ExistingCost: new FormControl(''),
    AdditionalCost: 0,
    StartingDate_tmp: '',
    ProjecctComRun_tmp: '',
    RequestIniNoDate_tmp: '',
    ShowRemark_tmp: false,
    SpendingActual: '',
    BudgetAvailable: '',
    TotalAvailable: '',
    TotalProjectCost: ''

  });

  DetailForm = this.fb.group({
    id: 0,
    productionProcess: null,
    milestoneSchedule: null,
    expectedTarget: null,
    comparisonWithOther: null,
    otherResources: null,
    otherInvestment: null,
    consistent: null,
    keySuccessFactor: null,
    synergyBenefit: null,
    otherStrategic: null,
    marketOverview: null,
    potentialCustomer: null,
    salesPlan: null,
    sourceOfFeedback: null,
    sourceOfFeedstock: null,
    otherBusiness: null,
    safetyIndex: null,
    corporateImageIndex: null,
    otherQuality: null,
    baseCase: null,
    projectIrrBaseCase: null,
    npvBaseCase: null,
    paybackBaseCase: null,
    ebitdaBaseCase: null,
    optimisticCase: null,
    projectIrrOptimisticCase: null,
    npvOptimisticCase: null,
    paybackOptimisticCase: null,
    ebitdaOptimisticCase: null,
    pessimisticCase: null,
    projectIrrPessimisticCase: null,
    npvPessimisticCase: null,
    paybackPessimisticCase: null,
    ebitdaPessimisticCase: null,
    depreciationCost: null,
    usefulYear: null,
    usefulMonth: null,
    kpisForm: this.fb.group({ kpis: this.fb.array([]) }),
    remark: null,
    otherKpis: null
  });

  PoolForm = this.fb.group({
    id: '',
    initiativeType: 'Request Pool',
    poolType: ['', Validators.required],
    registeringDate: null,
    name: [null, Validators.required],
    ownerName: [null, Validators.required],
    organization: [null, Validators.required],
    company: [null, Validators.required],
    plant: [null, Validators.required],
    createdBy: null,
    updatedBy: null
  });

  InitiativeDetail = { stage: null, code: null, name: null, year: null, owner: null, organization: null };


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
    return this.capexvalidate;
  }

  get invalidPlant() {
    return this.PoolForm.controls.plant.touched && this.PoolForm.controls.plant.invalid;
  }

  get invalidCompany() {
    return this.PoolForm.controls.company.touched && this.PoolForm.controls.company.invalid;
  }

  get invalidPoolType() {
    return this.PoolForm.controls.poolType.touched && this.PoolForm.controls.poolType.invalid;
  }

  get invalidOwnerName() {
    return this.PoolForm.controls.ownerName.touched && this.PoolForm.controls.ownerName.invalid;
  }

  get invalidName() {
    return this.PoolForm.controls.name.touched && this.PoolForm.controls.name.invalid;
  }

  get ValidGeneral() {
    return this.PoolForm.valid;
  }

  //================= Value 20200422 =================
  createdBy: string;
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

  type: string;

  AnnualForm: FormGroup;
  AnnualForm_capex: any[];

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
  value: string;

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

  ///=========================== New Value Add more  CAPEX =============================
  SpendingActual: any;
  BudgetAvailable: any;

  capexInformationId: any;

  tableShow: any;

  TotalAvailable: any;
  seq_: any;
  revision_: any;

  existingMonth_: any;
  dateRegister: string;
  statusView: any;

  tmp_error_AnnualTotal: any;
  tmp_error_pool: any;

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
  capexvalidate = false;
  detail: number;
  frequencies: any;

  companyName: any = [];
  plants: any = [];
  disableTable = "false";

  get PoolView() {
    return this.page === 'pool-view';
  }

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
    this.GetInitiative();
    this.GetInitiativeInformation(this.id);
    sessionStorage.setItem('id', this.id.toString());
    this.page = sessionStorage.getItem('page');

    this.year_now = (new Date()).getFullYear();
    this.year_next = (new Date()).getFullYear() + 1;

    this.GetOwners();
    this.GetUser();
    this.GetCompany();
    this.GetOrganizations();
    this.GetPlants();
    this.CheckPage();
    this.GetCAPEX();
    this.setTable();
  }

  SearchOwnerName(event) {

    this.GetOwners(event.term.toString());
  }

  GetUser() {
    this.authService.getMsalUser().subscribe((response) => {
      this.username = response.mail;
      this.params.text = this.username;
      this.initiativeService.GetOwnersEmail(this.params).subscribe(owners => {
        this.owners = owners;
        const owner = this.owners.filter(obj => {
          return obj.email.toLowerCase().trim() === this.username.toLowerCase().trim();
        });
        if (!this.id) {
          this.PoolForm.patchValue({ ownerName: owner[0].ownerName });
        }
      });
    }, error => this.unauthorized.error(error));
  }

  GetOwners(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.owners = owners;
    });
  }

  setFinishDate(date1: string) {
    if (this.StartingDate < date1) {
      if (this.ProjecctComRun != date1) {

        this.ProjecctComRun = date1;
        this.EndYear_1 = this.convertDate(date1).substring(0, 4);

        this.InitiativeDetailForm.patchValue({
          ProjecctComRun: this.ProjecctComRun,

          ProjecctComRun_tmp: this.convertDate(this.ProjecctComRun)
        });

        // this.initial_year();
        this.Diff();
        // this.initial_month();

        this.YearTable = [];

        //====================== Year Table ======================

        this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
        this.StartYear_1 = this.convertDate(this.RequestIniNoDate).substring(0, 4);
        const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;

        const control_old = this.AnnualForm.get('annualForm_list') as FormArray;

        let oldYear = this.year_m;
        let oldValYear = control_old.value;

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


        if (this.monthForm0 == undefined) {
          this.initial_month(this.existingMonth_);
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

          // for (let i = 0; i < this.year_m.length; i++) {
          //   if (i == 0) {
          //     this.ChangingValue_month_table1(this.year_m[i]);
          //   }
          //   else if (i == 1) {
          //     this.ChangingValue_month_table2(this.year_m[i]);
          //   }
          //   else if (i == 2) {
          //     this.ChangingValue_month_table3(this.year_m[i]);
          //   }
          //   else if (i == 3) {
          //     this.ChangingValue_month_table4(this.year_m[i]);
          //   }
          //   else if (i == 4) {
          //     this.ChangingValue_month_table5(this.year_m[i]);
          //   }
          //   else if (i == 5) {
          //     this.ChangingValue_month_table6(this.year_m[i]);
          //   }
          //   else if (i == 6) {
          //     this.ChangingValue_month_table7(this.year_m[i]);
          //   }
          //   else if (i == 7) {
          //     this.ChangingValue_month_table8(this.year_m[i]);
          //   }
          //   else if (i == 8) {
          //     this.ChangingValue_month_table9(this.year_m[i]);
          //   }
          //   else if (i == 9) {
          //     this.ChangingValue_month_table10(this.year_m[i]);
          //   }
          // }

        }

      }
    } else {
      // this.ProjecctComRun = "";
      this.InitiativeDetailForm.patchValue({
        ProjecctComRun: "",
        ProjecctComRun_tmp: ""
      });

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

      this.ProjectExePeriodYear = yy
      this.InitiativeDetailForm.controls['ProjectExePeriodYear'].setValue(this.ProjectExePeriodYear);

      this.ProjectExePeriodMonth = m
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

  setTable() {

    if (this.RequestIniNoDate != '' && this.RequestIniNoDate != null && this.RequestIniNoDate != undefined
      && this.ProjectCost != 0.00 && this.ProjectCost != 0 && this.ProjectCost != null && this.ProjectCost != undefined) {

      this.disableTable = 'true';
    } else {
      this.disableTable = 'false';
    }
  }

  CheckPage() {

    this.page = ['pool-edit', 'pool-view'].includes(sessionStorage.getItem('page')) ? sessionStorage.getItem('page') : 'pool-create';

    // switch (this.page) {
    //   case 'pool-create':
    //     this.name = 'New Investment Detail';
    //     break;
    //   case 'pool-edit':
    //     this.name = 'Edit Investment Detail';
    //     this.id = Number(sessionStorage.getItem('id'));
    //     if (this.id) { this.GetInitiative(); }
    //     break;
    //   case 'pool-view':
    //     this.name = 'Investment Detail';
    //     this.id = Number(sessionStorage.getItem('id'));
    //     if (this.id) { this.GetInitiative(); }
    //     this.PoolForm.disable();
    //     this.DetailForm.disable();
    //     break;
    // }

    this.statusView = "true";
    this.name = 'Investment Detail';
    this.id = Number(sessionStorage.getItem('id'));
    if (this.id) { this.GetInitiative(); }
    this.PoolForm.disable();
    this.DetailForm.disable();

  }

  CurrentPage() {

    switch (this.page) {
      case 'pool-create':

        switch (this.type) {

          case 'draft': this.CreateDraftInitiative(); break;
          case 'submit': this.CreateSubmitInitiative(); break;
        }
        break;
      case 'pool-edit':

        switch (this.type) {
          case 'draft': this.UpdateDraftInitiative(); break;
          case 'submit': this.UpdateSubmitInitiative(); break;
        }
        break;

      case 'pool-view':
        this.statusView = "true";
        break;
    }
  }

  SetEdit(id) {
    sessionStorage.setItem('id', id.toString());
    sessionStorage.setItem('page', 'pool-edit');
    this.page = 'pool-edit';
    this.name = 'Edit Investment Detail';
  }

  CreateDraftInitiative() {
    this.initiativeService.CreateDraftInitiative(this.PoolForm.value).subscribe(response => {
      this.id = response.id;
      this.PoolForm.patchValue(response);
      this.SetEdit(response.id);


      // if (this.id != 0) {
      //   this.SaveDraft_CAPEX(response.id);
      // }


      // this.GetCAPEX(); ///<<<<<<<< addb by noon

      this.swalTool.Draft();
    }, error => this.response.error(error));
  }

  CreateSubmitInitiative() {
    this.initiativeService.CreateSubmitInitiative(this.PoolForm.value).subscribe(response => {
      sessionStorage.setItem('id', response.id.toString());

      if (this.capexvalidate == true) {
        if (response.id != 0) {
          this.SubmitClick();
        }
        this.submitService.SubmitStageStatus(response.id, { status: 'forward', comment: '' }).subscribe(() => this.swalTool.Submit());
      }
      else {
        this.swalTool.CannotSave()
      }

    }, error => this.response.error(error));
  }

  UpdateDraftInitiative() {
    this.PoolForm.patchValue({ updatedBy: this.username });
    this.initiativeService.UpdateDraftInitiative(this.id, this.PoolForm.value).subscribe(response => {
      sessionStorage.setItem('id', response.id.toString());
      this.PoolForm.patchValue(response);

      // if (response.id != 0) {
      //   this.SaveDraft_CAPEX(response.id);
      // }

      this.swalTool.Draft();
    }, error => this.response.error(error));
  }

  UpdateSubmitInitiative() {
    this.PoolForm.patchValue({ updatedBy: this.username });
    this.initiativeService.UpdateSubmitInitiative(this.id, this.PoolForm.value).subscribe(response => {
      sessionStorage.setItem('id', response.id.toString());


      if (this.capexvalidate == true) {

        this.SubmitClick();
        this.submitService.SubmitStageStatus(response.id, { status: 'forward', comment: '' }).subscribe(() => this.swalTool.Submit());
      }
      else {

        this.CHk_validate_submit();
        // this.swalTool.CannotSave()
      }

      // this.submitService.SubmitStageStatus(this.id, { status: 'forward', comment: '' }).subscribe(() => this.swalTool.Submit());
    }, error => this.response.error(error));
  }

  convertDate(di) {
    let x = "";
    if (di != "" && di != null) {
      x = di.substring(6).substring(0, 4) + '-' + di.substring(3).substring(0, 2) + '-' + di.substring(0, 2);
    }

    return x;
  }


  CHk_validate_submit() {

    this.SetMarkAsTouchedFormGeneral();

    this.tmp_error = "no";
    this.tmp_error_m = "no";
    let error_month = "";
    let error_ProjectCode = "";

    const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;
    const AnnualTotal_overall = this.AnnualForm.get('AnnualTotal_overall') as FormArray;


    if (+AnnualTotal_overall.value > +this.AdditionalCost) {
      this.tmp_error_AnnualTotal = "yes";
    } else {
      this.tmp_error_AnnualTotal = "no";
    }

    if (+AnnualTotal_overall.value < +this.AdditionalCost) {
      this.tmp_error = "yes";
    }

    if (this.AdditionalCost == 0.00 || this.AdditionalCost == 0) {
      error_ProjectCode = "yes";
    }

    const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
    let xx = +control_month0.length
    for (let i = 0; i < xx; i++) {
      let overall = 0;

      if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {
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
        this.tmp_error_m = "no";

      }
    }

    const control_month1 = this.monthForm1.get('monthForm_list') as FormArray;
    xx = +control_month1.length
    for (let i = 0; i < xx; i++) {
      let overall = 0;
      if (control_month1.at(i).get('overall').value != "") {

        if (control_month1.at(i).get('overall').value != control_annual.at(i).get('y2').value * 1000000) {
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
        if (control_month2.at(i).get('overall').value != control_annual.at(i).get('y3').value * 1000000) {
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
        if (control_month3.at(i).get('overall').value != control_annual.at(i).get('y4').value * 1000000) {
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
        if (control_month4.at(i).get('overall').value != control_annual.at(i).get('y5').value * 1000000) {
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
        if (control_month5.at(i).get('overall').value != control_annual.at(i).get('y6').value * 1000000) {
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

        if (control_month6.at(i).get('overall').value != control_annual.at(i).get('y7').value * 1000000) {
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
        if (control_month7.at(i).get('overall').value != control_annual.at(i).get('y8').value * 1000000) {
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
        if (control_month8.at(i).get('overall').value != control_annual.at(i).get('y9').value * 1000000) {
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
        if (control_month9.at(i).get('overall').value != control_annual.at(i).get('y10').value * 1000000) {
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
      this.swalTool.Required();
      return;
    }

    if (this.BudgetForm == "" || this.BudgetForm == null || this.BudgetForm == undefined) {
      this.flag_fail = "yes";
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.capexvalidate = false;
      this.swalTool.Required();
      return;
    }


    if (this.InitiativeDetailForm.controls['CostCenterOfVP'].value == "" ||
      this.InitiativeDetailForm.controls['CostCenterOfVP'].value == null ||
      this.InitiativeDetailForm.controls['CostCenterOfVP'].value == undefined) {

      this.flag_fail = "yes";
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.capexvalidate = false;
      this.swalTool.Required();
      return;

    }

    if (this.CodeCostCenterOfVP == "" || this.CodeCostCenterOfVP == null || this.CodeCostCenterOfVP == undefined) {

      this.flag_fail = "yes";
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.capexvalidate = false;
      this.swalTool.Required();
      return;

    }

    if (this.tmp_error_m == "yes") {
      this.capexvalidate = false;
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      if (error_month == "more") {
        this.swalTool.SumCostMonth();
      }
      else {
        this.swalTool.SumCostMonth_2();
      }
    }
    else if (this.tmp_error_AnnualTotal == "yes") {
      this.capexvalidate = false;
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.swalTool.SumCost_3();
    }
    else if (this.tmp_error_pool == "yes") {
      this.capexvalidate = false;
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.swalTool.SumCost_4();
    }
    else if (this.tmp_error == "yes") {
      this.capexvalidate = false;
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.swalTool.SumCost_2();
    }

    else if (error_ProjectCode == "yes") {
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.capexvalidate = false;
      this.swalTool.Required_Additional();
    }
    else {
      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(true));
      this.capexvalidate = true;
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
          CodeCostCenterOfVP: this.CodeCostCenterOfVPTMP
        });


      }, 500);
    }
  }

  // --------------------  Investment Detail -------------------- //

  GetCompany() {
    this.initiativeService.GetCompany().subscribe(companyName => this.companyName = companyName);
  }

  GetOrganizations() {
    this.initiativeService.GetOrganizations().subscribe(organizations => this.organizations = organizations);
  }

  GetPlants() {
    this.initiativeService.GetPlants().subscribe(plants => this.plants = plants);
    this.plants.push({ id: 9999, plantId: 'P9999', plantTitle: 'Others (please specify)' });
  }

  ClearOwnerName() {
    this.GetOwners();
  }

  GetDetail(id) {
    this.detailInformationService.GetDetailInformation(id).subscribe(response => {
      if (response) {
        this.detail = response.id;
        this.DetailForm.patchValue(response);
      }
    });
  }

  GetDetailInformation() {
    this.GetFrequency();
    this.GetKpis();
  }

  GetKpis() {
    this.detailInformationService.GetKpis().subscribe(kpis => {
      this.kpises = kpis;
      this.kpises.forEach(result => result.disabled = false);
      this.GetKpiDetail(this.id);
      this.GetDetail(this.id);
    });
  }

  GetFrequency() {
    this.detailInformationService.GetFrequency().subscribe(frequency => this.frequencies = frequency);
  }

  OnchangeUsefulMonth() {
    if (this.DetailForm.controls.usefulMonth.value > 12) {
      this.DetailForm.patchValue({ usefulMonth: 12 });
    }
  }

  PatchDetail() {
    this.DetailForm.patchValue({ id: this.detail ? this.detail : 0 });
  }

  ChangeKpis(index, event) {
    this.kpiArray = this.kpiArray.filter(el => el.id !== index);
    this.kpiArray.push({ id: index, title: event.target.value });
    this.SetKpiSelect();
  }

  GetKpiDetail(id) {
    this.detailInformationService.GetKpiDetail(id).subscribe(response => {
      this.kpiDetails = response.kpiDetailInformations;
      if (this.kpiDetails.length !== 0) {
        const KpiControl = this.DetailForm.controls.kpisForm.get('kpis') as FormArray;
        for (let i = 0; i < this.kpiDetails.length; i++) {
          KpiControl.push(this.DetailKpisForm());
          KpiControl.at(i).patchValue(this.kpiDetails[i]);
          KpiControl.at(i).get('id').patchValue(0);
          this.kpiArray.push({ id: i, title: this.kpiDetails[i].kpis });
          if (this.page === 'pool-view') { KpiControl.at(i).disable(); }
        }
        this.SetKpiSelect();
        this.isRemoveKpis = KpiControl.length > 1 ? false : true;
        this.isDisableAddKpis = KpiControl.length === this.kpises.length ? true : false;
      } else {
        this.AddKpis();
      }
    });
  }

  SetKpiSelect() {
    this.kpises.forEach(result => {
      if (this.kpiArray.some(e => e.title === result.kpisTitle)) {
        result.disabled = true;
      } else {
        result.disabled = false;
      }
    });
  }

  DetailKpisForm(): FormGroup {
    return this.fb.group({ id: [0], kpis: '', target: null, frequency: '', initiativeId: this.id });
  }


  AddKpis() {
    const control = this.DetailForm.controls.kpisForm.get('kpis') as FormArray;
    control.push(this.DetailKpisForm());
    this.isRemoveKpis = control.length > 1 ? false : true;
    this.isDisableAddKpis = control.length === this.kpises.length ? true : false;
  }

  RemoveKpis(index: number) {
    this.kpiArray = this.kpiArray.filter(el => el.id !== index);
    this.SetKpiSelect();
    const control = this.DetailForm.controls.kpisForm.get('kpis') as FormArray;
    control.removeAt(index);
    this.DetailForm.controls.kpisForm.markAsDirty();
    this.isRemoveKpis = control.length > 1 ? false : true;
    this.isDisableAddKpis = control.length === this.kpises.length ? true : false;
  }

  GetInitiative() {


    if (this.id != 0) {

      this.initiativeService.GetSuggestStatus(this.id).subscribe(response => {
        this.status = response.status;
      });

      this.initiativeService.GetInitiative(this.id).subscribe(response => {

        this.PoolForm.patchValue(response);
        this.dateRegister = this.dateUtil.SetDate(new Date(response.registeringDate));
        this.createdBy = response.createdBy;
        this.GetDetailInformation();

      }, error => this.response.error(error));
    }

  }

  SetForm() {
    this.PoolForm.patchValue({
      registeringDate: this.dateRegister ? this.dateRegister : this.dateUtil.SetDate(new Date()),
      createdBy: this.createdBy ? this.createdBy : this.username
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

    this.capexService.GetCapexsInfo(this.id.toString(), 'Addmorepool').subscribe(resp_1 => {


      if (resp_1 == null) {


        let tmprevision_ = +this.revision_ + 1;
        let tmpseq_ = +this.seq_ + 1;

        this.capexType = "Addmorepool";

        this.capexService.CreateCapexsInfo(
          this.InitiativeDetailForm.controls['StartingDate'].value,
          this.InitiativeDetailForm.controls['ProjecctComRun'].value,
          this.InitiativeDetailForm.controls['RequestIniNoDate'].value,
          this.InitiativeDetailForm.controls['ProjectExePeriodYear'].value,
          this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].value,
          this.InitiativeDetailForm.controls['CostCenterOfVP'].value,
          this.InitiativeDetailForm.controls['CodeCostCenterOfVP'].value,
          this.tmp_exist_projectcost,
          this.InitiativeDetailForm.controls['ReasonOfChanging'].value,
          this.InitiativeDetailForm.controls['BudgetForm'].value,
          this.InitiativeDetailForm.controls['BetweenYear'].value,
          this.InitiativeDetailForm.controls['TransferForm'].value,
          this.InitiativeDetailForm.controls['PoolBudgetForm'].value,
          "",
          tmprevision_.toString(),
          "Addmorepool",
          BudgetYear,
          "Draft",
          "false",
          tmpseq_.toString(),
          this.ExistingCost,
          this.SpendingActual,
          this.AdditionalCost,
          "",
          "0",
          "0",
          this.id.toString(), "0"
        ).subscribe(response => {

          this.capexService.GetCapexsInfo(this.id.toString(), 'Addmorepool').subscribe(resp_1 => {

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
      else {

        if (this.capexType != "Addmorepool") {

          this.capexType = "Addmorepool";


          let tmprevision_ = +this.revision_ + 1;
          let tmpseq_ = +this.seq_ + 1;

          this.capexService.CreateCapexsInfo(
            this.InitiativeDetailForm.controls['StartingDate'].value,
            this.InitiativeDetailForm.controls['ProjecctComRun'].value,
            this.InitiativeDetailForm.controls['RequestIniNoDate'].value,
            this.InitiativeDetailForm.controls['ProjectExePeriodYear'].value,
            this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].value,
            this.InitiativeDetailForm.controls['CostCenterOfVP'].value,
            this.InitiativeDetailForm.controls['CodeCostCenterOfVP'].value,
            this.tmp_exist_projectcost,
            this.InitiativeDetailForm.controls['ReasonOfChanging'].value,
            this.InitiativeDetailForm.controls['BudgetForm'].value,
            this.InitiativeDetailForm.controls['BetweenYear'].value,
            this.InitiativeDetailForm.controls['TransferForm'].value,
            this.InitiativeDetailForm.controls['PoolBudgetForm'].value,
            "",
            tmprevision_.toString(),
            "Addmorepool",
            BudgetYear,
            "Draft",
            "false",
            tmpseq_.toString(),
            this.ExistingCost,
            this.SpendingActual,
            this.AdditionalCost,
            "",
            "0",
            "0",
            this.id.toString(), "0"
          ).subscribe(response => {

            this.capexService.GetCapexsInfo(this.id.toString(), 'Addmorepool').subscribe(resp_1 => {

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
        else {

          this.revision_ = resp_1.revistion;
          this.seq_ = resp_1.sequent;

          this.capexService.PutUpdateCapexsinformations(
            this.InitiativeDetailForm.controls['StartingDate'].value,
            this.InitiativeDetailForm.controls['ProjecctComRun'].value,
            this.InitiativeDetailForm.controls['RequestIniNoDate'].value,
            this.InitiativeDetailForm.controls['ProjectExePeriodYear'].value,
            this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].value,
            this.InitiativeDetailForm.controls['CostCenterOfVP'].value,
            this.InitiativeDetailForm.controls['CodeCostCenterOfVP'].value,
            this.tmp_exist_projectcost,
            this.InitiativeDetailForm.controls['ReasonOfChanging'].value,
            this.InitiativeDetailForm.controls['BudgetForm'].value,
            this.InitiativeDetailForm.controls['BetweenYear'].value,
            this.InitiativeDetailForm.controls['TransferForm'].value,
            this.InitiativeDetailForm.controls['PoolBudgetForm'].value,
            "",
            this.revision_,
            "Addmorepool",
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
            this.capexInformationId, "0", '', ''
          ).subscribe(response => {

            this.capexService.GetCapexsInfo(this.id.toString(), 'Addmorepool').subscribe(resp_1 => {

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

  Submit() {
    this.CHk_validate_submit();
    this.UpdateSubmitInitiative();
  }

  SubmitClick() {


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

    this.InitiativeDetailForm.controls['BudgetForm'].setValue(this.BudgetForm);
    this.InitiativeDetailForm.controls['BetweenYear'].setValue(this.BetweenYear);
    this.InitiativeDetailForm.controls['StartingDate'].setValue(this.StartingDate);
    this.InitiativeDetailForm.controls['ProjecctComRun'].setValue(this.ProjecctComRun);
    this.InitiativeDetailForm.controls['RequestIniNoDate'].setValue(this.RequestIniNoDate);
    this.InitiativeDetailForm.controls['TransferForm'].setValue(this.TransferForm);
    this.InitiativeDetailForm.controls['PoolBudgetForm'].setValue(this.PoolBudgetForm);


    if (this.capexvalidate == true) {

      this.capexService.GetCapexsInfo(this.id.toString(), 'Addmorepool').subscribe(resp_1 => {


        if (resp_1 == null) {


          this.capexType = "Addmorepool";

          this.capexService.CreateCapexsInfo(
            this.InitiativeDetailForm.controls['StartingDate'].value,
            this.InitiativeDetailForm.controls['ProjecctComRun'].value,
            this.InitiativeDetailForm.controls['RequestIniNoDate'].value,
            this.InitiativeDetailForm.controls['ProjectExePeriodYear'].value,
            this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].value,
            this.InitiativeDetailForm.controls['CostCenterOfVP'].value,
            this.InitiativeDetailForm.controls['CodeCostCenterOfVP'].value,
            this.tmp_exist_projectcost,
            this.InitiativeDetailForm.controls['ReasonOfChanging'].value,
            this.InitiativeDetailForm.controls['BudgetForm'].value,
            this.InitiativeDetailForm.controls['BetweenYear'].value,
            this.InitiativeDetailForm.controls['TransferForm'].value,
            this.InitiativeDetailForm.controls['PoolBudgetForm'].value,
            "",
            this.revision_,
            "Addmorepool",
            BudgetYear,
            "Submit",
            "false",
            this.seq_,
            this.ExistingCost,
            this.SpendingActual,
            this.AdditionalCost,
            "",
            this.TotalAvailable,
            "0",
            this.id.toString(), "0"
          ).subscribe(response => {

            this.capexService.GetCapexsInfo(this.id.toString(), 'Addmorepool').subscribe(resp_1 => {

              this.capexInformationId = resp_1.capexInformationId;

              this.capexService.CreateAnnualInvestmentPlan_addMore(
                this.id.toString(), this.AnnualForm, resp_1.capexInformationId, "submit").subscribe(resp => {
                });

              this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
                this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
                this.monthForm8, this.monthForm9, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                  // this.bindMonth();


                });

              this.swalTool.Submit();
              this.flag_fail = "yes";

            });

          });
        }
        else {


          if (this.capexType != "Addmorepool") {


            this.capexType = "Addmorepool";
            this.capexService.CreateCapexsInfo(
              this.InitiativeDetailForm.controls['StartingDate'].value,
              this.InitiativeDetailForm.controls['ProjecctComRun'].value,
              this.InitiativeDetailForm.controls['RequestIniNoDate'].value,
              this.InitiativeDetailForm.controls['ProjectExePeriodYear'].value,
              this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].value,
              this.InitiativeDetailForm.controls['CostCenterOfVP'].value,
              this.InitiativeDetailForm.controls['CodeCostCenterOfVP'].value,
              this.tmp_exist_projectcost,
              this.InitiativeDetailForm.controls['ReasonOfChanging'].value,
              this.InitiativeDetailForm.controls['BudgetForm'].value,
              this.InitiativeDetailForm.controls['BetweenYear'].value,
              this.InitiativeDetailForm.controls['TransferForm'].value,
              this.InitiativeDetailForm.controls['PoolBudgetForm'].value,
              "",
              this.revision_,
              "Addmorepool",
              BudgetYear,
              "Submit",
              "false",
              this.seq_,
              this.ExistingCost,
              this.SpendingActual,
              this.AdditionalCost,
              "",
              this.TotalAvailable,
              "0",
              this.id.toString(), "0"
            ).subscribe(response => {

              this.capexService.GetCapexsInfo(this.id.toString(), 'Addmorepool').subscribe(resp_1 => {

                this.capexInformationId = resp_1.capexInformationId;

                this.capexService.CreateAnnualInvestmentPlan_addMore(
                  this.id.toString(), this.AnnualForm, resp_1.capexInformationId, "submit").subscribe(resp => {
                  });

                this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
                  this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
                  this.monthForm8, this.monthForm9, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                    // this.bindMonth();

                  });

                this.swalTool.Submit();
                this.flag_fail = "yes";

              });

            });
          }
          else {

            this.revision_ = resp_1.revistion;
            this.seq_ = resp_1.sequent;


            this.capexService.PutUpdateCapexsinformations(
              this.InitiativeDetailForm.controls['StartingDate'].value,
              this.InitiativeDetailForm.controls['ProjecctComRun'].value,
              this.InitiativeDetailForm.controls['RequestIniNoDate'].value,
              this.InitiativeDetailForm.controls['ProjectExePeriodYear'].value,
              this.InitiativeDetailForm.controls['ProjectExePeriodMonth'].value,
              this.InitiativeDetailForm.controls['CostCenterOfVP'].value,
              this.InitiativeDetailForm.controls['CodeCostCenterOfVP'].value,
              this.tmp_exist_projectcost,
              this.InitiativeDetailForm.controls['ReasonOfChanging'].value,
              this.InitiativeDetailForm.controls['BudgetForm'].value,
              this.InitiativeDetailForm.controls['BetweenYear'].value,
              this.InitiativeDetailForm.controls['TransferForm'].value,
              this.InitiativeDetailForm.controls['PoolBudgetForm'].value,
              "",
              this.revision_,
              "Addmorepool",
              BudgetYear,
              "Submit",
              "false",
              this.seq_,
              this.ExistingCost,
              this.SpendingActual,
              this.AdditionalCost,
              "",
              this.TotalAvailable,
              "0",
              this.id.toString(),
              this.capexInformationId, "0", '', ''
            ).subscribe(response => {

              this.capexService.GetCapexsInfo(this.id.toString(), 'Addmorepool').subscribe(resp_1 => {

                this.capexInformationId = resp_1.capexInformationId;


                this.capexService.CreateAnnualInvestmentPlan_addMore(
                  this.id.toString(), this.AnnualForm, resp_1.capexInformationId, "submit").subscribe(resp => {
                  });

                this.capexService.CreateMonthlyInvestmentPlan(this.year_m, this.monthForm0, this.monthForm1,
                  this.monthForm2, this.monthForm3, this.monthForm4, this.monthForm5, this.monthForm6, this.monthForm7,
                  this.monthForm8, this.monthForm9, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                    // this.bindMonth();

                  });

                this.swalTool.Submit();
                this.flag_fail = "yes";

              });

            });
          }

        }

      });

    }



  }

  OnSelect(data: TabDirective): void {
    this.value = data.heading;
    sessionStorage.setItem('InformationTab', this.value);
  }

  changeTab(tabId) {
    this.YearTable = [];

    if (tabId.heading == "CAPEX Information") {

      sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      this.capexvalidate = false;

      this.GetCAPEX();
    }
  }

  initial_month(existingData) {

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
        if (this.statusView == "false") {
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
        else {
          this.monthList_1.push({
            columnname: this.months[i],
            readOnly: true
          })
        }
      }
    }
    else if (this.diffYear == 1) {
      for (let i = 1; i <= 12; i++) {
        if (this.statusView == "false") {
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
        else {
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
    }
    else {
      for (let i = 1; i <= 12; i++) {
        if (this.statusView == "false") {
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
        else {
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

  addSellingPoint_withvalue(currencyTitle, y1, y2, y3, y4, y5, y6, y7, y8, y9, y10,
    overall, fx, isStatus) {
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
      flagFirst_row: isStatus
    }));
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

      this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall);

      this.totalAnual[this.YearTable[j - 1].columnname] = total.toFixed(2);
    }

    if (+this.AnnualForm.controls['AnnualTotal_overall'].value > +this.AdditionalCost) {
      this.flag_fail = "yes";
    }
    else {
      this.flag_fail = "no";
    }


    if (this.AnnualForm.controls['AnnualTotal_overall'].value != "") {
      if (+this.AnnualForm.controls['AnnualTotal_overall'].value < +this.AdditionalCost) {
        this.flag_fail = "yes";
      }
      else if (+this.AnnualForm.controls['AnnualTotal_overall'].value > +this.AdditionalCost) {
        this.flag_fail = "yes";
        this.swalTool.SumCost_5();
      }
    }
    else {
      this.swalTool.AlertAnnualInvestment();
      this.flag_fail = "yes";
    }




    this.CHk_validate();

  }

  deleteSellingPoint(index) {
    this.annualForm_.removeAt(index);

    const control = this.AnnualForm.get('annualForm_list') as FormArray;
    const AnnualTotal1 = this.AnnualForm.get('AnnualTotal1') as FormArray;

    let xx = +control.length
    let AnnualTotal_overall = 0;
    let TotalAdditional_total_ = 0;

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

      TotalAdditional_total_ = TotalAdditional_total_ + +total.toFixed(2);
      TotalAdditional_total_ = +TotalAdditional_total_.toFixed(2);

      this.totalAnual[this.YearTable[j - 1].columnname] = total.toFixed(2);

    }


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
    let overall = 0;



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

  setAdditionalCost(value) {

    let AnnualTotal_overall_ = 0;
    let TotalAdditional_total_ = 0;

    if (value != "" && value != null) {
      this.AdditionalCost = value
      this.tableShow = true;


      if (this.AnnualForm.controls['AnnualTotal_overall'].value != "" &&
        this.AnnualForm.controls['AnnualTotal_overall'].value != undefined) {
        AnnualTotal_overall_ = this.AnnualForm.controls['AnnualTotal_overall'].value
      }


      if (this.AnnualForm.controls['TotalAdditional_total'].value != "" &&
        this.AnnualForm.controls['TotalAdditional_total'].value != undefined) {
        TotalAdditional_total_ = this.AnnualForm.controls['TotalAdditional_total'].value
      }

      this.ProjectCost = +this.ExistingCost + +value;

      this.TotalAvailable = +this.BudgetAvailable + +this.AdditionalCost;

      this.InitiativeDetailForm.patchValue({
        ProjectCost: this.ProjectCost.toFixed(2),
        AdditionalCost: this.AdditionalCost,
        TotalAvailable: this.TotalAvailable
      });


      if (+this.ProjectCost < +AnnualTotal_overall_) {
        this.flag_fail = "yes";
        this.swalTool.SumCost();
      }

      if (+value < +TotalAdditional_total_) {
        this.flag_fail = "yes";
        this.swalTool.TotalAdd_Alert();
      }
    }
    else {
      this.AdditionalCost = 0;

      this.tableShow = false;

      this.InitiativeDetailForm.patchValue({
        AdditionalCost: this.AdditionalCost
      });

      this.flag_fail = "yes";
    }

    this.CHk_validate();


    // this.InitiativeDetailForm.controls['ProjectCost'].setValue( this.ProjectCost.replace(/,/g, ""));


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
    this.CHk_validate();

  }

  GetCAPEX() {  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



    this.GetInformation();
    this.GetRevistion();

    let AdditionalCost_ = 0;
    let BudgetAvailable_ = 0;

    this.capexService.GetCapexsInfo(this.id.toString(), 'Addmorepool').subscribe(response => {

      if (response == null) {


        this.capexService.GetCapexsInfo(this.id.toString(), "Requestpool").subscribe(response => {


          this.Initiative_tmp = response;


          this.capexStatus = response.capexStatus;
          this.capexType = response.capexType;

          if (response.revistion != undefined && response.revistion != null) {
            this.revision_ = response.revistion;
            this.seq_ = response.sequent;
          }


          let cost_;
          cost_ = response.projectCost;

          this.StartingDate = this.dateUtil.GetDate(new Date(response.startingDate));


          this.ProjecctComRun = this.dateUtil.GetDate(new Date(response.projecctComRun));
          this.ProjectExePeriodYear = response.projectExePeriodYear;
          this.ProjectExePeriodMonth = response.projectExePeriodMonth;
          this.RequestIniNoDate = this.dateUtil.GetDate(new Date(response.actionYear));

          this.BudgetStartDate = "";
          this.ExistingCost = +cost_.toFixed(2);
          this.SpendingActual = 0;
          this.BudgetAvailable = +this.ExistingCost - this.SpendingActual;
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
              overall: '',
              fx: '',
              flagFirst_row: true
            })])
          })

          this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
          // this.year_now;
          this.StartYear_1 = this.convertDate(this.RequestIniNoDate).substring(0, 4);


          this.YearTable = [];

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
            ProjectCost: [this.ProjectCost, Validators.required],
            ExistingCost: this.ExistingCost,
            SpendingActual: this.SpendingActual,
            AdditionalCost: this.AdditionalCost,
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
            RequestIniNoDate_tmp: response.actionYear,

            ShowRemark_tmp: false,
            BudgetAvailable: this.BudgetAvailable,
            TotalAvailable: 0,
          });



        });



      }
      else {

        this.Initiative_tmp = response;
        this.capexInformationId = response.capexInformationId;

        this.capexStatus = response.capexStatus;
        this.capexType = response.capexType;

        if (this.capexStatus == "Draft" || this.status == "revised") {
          this.statusView = "false"
        }
        else {
          if (response.capexType == "Addmorepool" && response.capexStatus == "Submit") {
            this.statusView = "true"
          }
          else {
            this.statusView = "false"
          }
        }

        this.revision_ = response.revistion;
        this.seq_ = response.sequent;


        let cost_;
        cost_ = response.projectCost;

        this.tmp_exist_projectcost = response.projectCost;

        this.StartingDate = this.dateUtil.GetDate(new Date(response.startingDate));

        if (response.additionalCost != '' && response.additionalCost != undefined) {
          AdditionalCost_ = +response.additionalCost;
        }

        if (response.availableBudget != 0) {
          BudgetAvailable_ = +response.availableBudget;
        }
        else {
          BudgetAvailable_ = +cost_.toFixed(2);
        }

        this.ExistingCost = +cost_.toFixed(2);
        this.BudgetAvailable = BudgetAvailable_;
        this.SpendingActual = +response.spendingActual;
        this.AdditionalCost = AdditionalCost_;
        this.ProjectCost = +this.tmp_exist_projectcost + +AdditionalCost_;
        this.TotalAvailable = +this.BudgetAvailable + +this.AdditionalCost;

        if (+AdditionalCost_ > 0) {
          this.tableShow = true;
        }

        this.ProjecctComRun = this.dateUtil.GetDate(new Date(response.projecctComRun));
        this.ProjectExePeriodYear = response.projectExePeriodYear;
        this.ProjectExePeriodMonth = response.projectExePeriodMonth;
        this.RequestIniNoDate = this.dateUtil.GetDate(new Date(response.actionYear));

        this.OldProjectCost = cost_.toFixed(2);

        this.organization = "";
        this.ReasonOfChanging = response.reasonOfChanging;


        if (response.reasonOfChanging != "") {
          this.RemarkShow = true;
        }

        if (response.budgetPeriod == "Annual") {
          this.BudgetForm = "Annual";
        }
        else if (response.budgetPeriod == "Mid Year") {
          this.BudgetForm = "Mid Year";
        }
        else if (response.budgetPeriod == "Current year") {
          this.BudgetForm = "Current year";
          this.showContingency = true;
          this.ferPool = false;
          this.inshow = false;

          if (response.betweenYear == "Contingency") {
            this.BetweenYear = "Contingency";
          }
          else if (response.betweenYear == "Transfer") {
            this.BetweenYear = "Transfer";
          }
          else if (response.betweenYear == "BOD Approval on") {
            this.BetweenYear = "BOD Approval on";
          }
          else if (response.betweenYear == "Pool Budget") {
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

        this.EndYear_1 = this.convertDate(this.ProjecctComRun).substring(0, 4);
        this.StartYear_1 = this.convertDate(this.RequestIniNoDate).substring(0, 4);

        this.YearTable = [];
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
          ProjectCost: [this.ProjectCost, Validators.required],
          ExistingCost: this.ExistingCost,
          AdditionalCost: this.AdditionalCost,
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
          SpendingActual: this.SpendingActual,

          BudgetAvailable: this.BudgetAvailable,
          TotalAvailable: this.TotalAvailable

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


        if (response.capexType != "Requestpool") {
          this.existingMonth_ = "y";
          this.initial_month("y");
        }
        else {
          this.existingMonth_ = "n";
          this.initial_month("n");
        }

        if (response.capexType != "Requestpool") {


          this.capexService.GetAnnualInvestmentPlan(this.id.toString(), this.capexInformationId).subscribe(resp => {



            this.tableShow = true;

            if (resp.length != 0) {

              for (let xx = 0; xx < resp.length; xx++) {
                if (xx == 0) {
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
                }
                else {
                  if (resp[xx].planType != "SumTotalBaht" && resp[xx].planType != "TotalBahtbyRevision") {


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
                      resp[xx].currencyFx,
                      false);

                  }
                }

              }

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
                // AnnualTotal_overall = +AnnualTotal_overall.toFixed(2);

                this.AnnualForm.controls['AnnualTotal_overall'].setValue(AnnualTotal_overall);

                this.totalAnual[this.YearTable[j - 1].columnname] = total.toFixed(2);
              }


            }


            //====================== Month Table ======================

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

            if (this.statusView == "true") {
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
            }

            this.CHk_validate();

          })



        }


      }

    });

  }

  CHk_validate() {


    this.tmp_error = "no";
    this.tmp_error_m = "no";
    this.tmp_error_AnnualTotal = "no";

    let error_month = "";
    let error_ProjectCode = "";

    try {

      const control_annual = this.AnnualForm.get('annualForm_list') as FormArray;
      const AnnualTotal_overall = this.AnnualForm.get('AnnualTotal_overall') as FormArray;

      if (+AnnualTotal_overall.value > +this.AdditionalCost) {
        this.tmp_error_AnnualTotal = "yes";
      } else {
        this.tmp_error_AnnualTotal = "no";
      }
      if (+AnnualTotal_overall.value < +this.AdditionalCost) {
        this.tmp_error = "yes";
      }

      if (this.AdditionalCost == 0.00 || this.AdditionalCost == 0) {
        error_ProjectCode = "yes";
      }

      const control_month0 = this.monthForm0.get('monthForm_list') as FormArray;
      let xx = +control_month0.length
      for (let i = 0; i < xx; i++) {
        let overall = 0;

        if (control_month0.at(i).get('overall').value != control_annual.at(i).get('y1').value * 1000000) {
          control_month0.at(i).get('flag_alert').patchValue(true);

          if (+control_month0.at(i).get('overall').value > +control_annual.at(i).get('y1').value * 1000000) {
            error_month = "more";
          }
          else {
            error_month = "less";
          }

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

          if (control_month1.at(i).get('overall').value != control_annual.at(i).get('y2').value * 1000000) {
            control_month1.at(i).get('flag_alert').patchValue(true);



            if (+control_month1.at(i).get('overall').value > +control_annual.at(i).get('y2').value * 1000000) {
              error_month = "more";
            }
            else {
              error_month = "less";
            }

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
          if (control_month3.at(i).get('overall').value != control_annual.at(i).get('y4').value * 1000000) {
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
          if (control_month4.at(i).get('overall').value != control_annual.at(i).get('y5').value * 1000000) {
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
          if (control_month5.at(i).get('overall').value != control_annual.at(i).get('y6').value * 1000000) {
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

          if (control_month6.at(i).get('overall').value != control_annual.at(i).get('y7').value * 1000000) {
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
          if (control_month7.at(i).get('overall').value != control_annual.at(i).get('y8').value * 1000000) {
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
          if (control_month8.at(i).get('overall').value != control_annual.at(i).get('y9').value * 1000000) {
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
          if (control_month9.at(i).get('overall').value != control_annual.at(i).get('y10').value * 1000000) {
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

      if (this.InitiativeDetailForm.controls['CostCenterOfVP'].value == "" ||
        this.InitiativeDetailForm.controls['CostCenterOfVP'].value == null ||
        this.InitiativeDetailForm.controls['CostCenterOfVP'].value == undefined) {

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

      else if (this.tmp_error_AnnualTotal == "yes") {
        this.capexvalidate = false;
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
      }
      else if (this.tmp_error_m == "yes") {
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
      }
      else if (this.tmp_error == "yes") {
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
      }
      else if (error_month == "yes") {
        sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
        this.capexvalidate = false;
      }
      else if (error_ProjectCode == "yes") {
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

  GetInformation() {
    if (this.id != 0) {
      this.initiativeService.GetInformation(this.id).subscribe((response) => {
        this.InitiativeDetail = {
          stage: response.stage,
          code: response.initiativeCode,
          name: response.name,
          year: response.year,
          owner: response.ownerName,
          organization: response.organization
        };
      });
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

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


  GetRevistion() {

    if (this.id != 0) {
      this.capexService.GetCapexsInfo(this.id.toString(), this.CapexType).subscribe(response => {

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

  // --------------------  Save --------------------------------- //
  Draft() {
    this.Savedraf();
    // window.location.reload();
  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }

}
