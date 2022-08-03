import { ValidateService } from '@services/validate/validate.service';
import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResponseService } from '@errors/response/response.service';
import { SwalTool } from '@tools/swal.tools';
import { InitiativeService } from '@services/initiative/initiative.service';
import { ImpactService } from '@services/impact/impact.service';
import { MaxService } from '@services/max/max.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { DateUtil } from '@utils/date.utils';
import { PermissionService } from '@services/permission/permission.service';
import { BsDatepickerViewMode, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { StageService } from '@services/stage/stage.service';
import { CommonDataService } from '@services/common-data/common-data.service';
import { commonData } from '@models/commonData';
import { FirstRunRateTable, MonthRowDateTempData, runRateTempData } from '@models/impactTracking';
import { AuthService } from '@services/authentication/auth.service';
import { RolePermissionModel } from '@models/RolePermissionModel';
import { ImpactTrackingModel, ImpactTypeOfBenefits } from '@models/ImpactTrackingModel';
import { Initiative } from '@models/initiative';

@Component({
  selector: 'app-impact-form',
  templateUrl: './impact-form.component.html',
  styleUrls: ['./impact-form.component.css']
})
export class ImpactFormComponent implements OnInit {

  // @ViewChild('stickyMenu') menuElement: ElementRef;

  sticky: boolean = false;
  elementPosition: any;
  userPermission: RolePermissionModel[];
  public permissionServiceStaticVar = PermissionService;

  toComment

  toFinanceOnly

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private response: ResponseService,
    private swalTool: SwalTool,
    private initiativeService: InitiativeService,
    private impactService: ImpactService,
    private maxService: MaxService,
    private detailInformationService: DetailInformationService,
    private dateUtil: DateUtil,
    private stageService: StageService,
    public permissionService: PermissionService,
    private cdref: ChangeDetectorRef,
    private commonDataService: CommonDataService,
    private authService: AuthService,
  ) {
    this.impactService.RequireDirectBenefit = false;
    this.impactService.RequireIndirectBenefit = false;
    this.userPermission = JSON.parse(sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY));
  }

  // permissionCheck: any;
  // isDisabled: any = [];
  // isHidden: any = [];

  @Input() id: number;
  @Input() formGroup: FormGroup;
  page = 'impact';
  name = 'Initiative Impact Tracking';

  Cim: boolean;
  Capex: boolean;
  Strategy: boolean;
  Max: boolean;

  suggestion = { cim: false, strategy: false, max: false };

  status: string;
  remark: string;
  stage: string;

  isHaveShareBenefit = 'false';
  isHaveImpiemantCost = 'false';
  isIndirectBenefit = 'false';

  showSection = true;

  recurringAndOneTime: any = [];
  implementationCost: any = [];

  initiativeDetails: any;
  subWorkstreams: any;
  workStreams: any = [];
  entryModes: any = [];

  minMode: BsDatepickerViewMode = 'month';

  bsConfig: Partial<BsDatepickerConfig>;

  RequireDirectBenefit: boolean = false;
  RequireIndirectBenefit: boolean = false;

  isAutoCalculate: boolean = true;
  IsIL3 = false;
  IsIL4 = false;
  IsIL5 = false;

  itemsMonth: any = [];
  monthName: string;
  month: number;
  year: number;

  //permission
  isHidden = [];
  isDisabled = [];
  isEnabled = [];

  months = ['MONTH', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  monthObjectAuto = {
    month1: null,
    month2: null,
    month3: null,
    month4: null,
    month5: null,
    month6: null,
    month7: null,
    month8: null,
    month9: null,
    month10: null,
    month11: null,
    month12: null,
    month13: null,
    month14: null,
    month15: null,
    month16: null,
    month17: null,
    month18: null,
    month19: null,
    month20: null,
    month21: null,
    month22: null,
    month23: null,
    month24: null,
    month25: null,
    month26: null,
    month27: null,
    month28: null,
    month29: null,
    month30: null,
    month31: null,
    month32: null,
    month33: null,
    month34: null,
    month35: null,
    month36: null
  };

  monthObject = {
    month1: null,
    month2: null,
    month3: null,
    month4: null,
    month5: null,
    month6: null,
    month7: null,
    month8: null,
    month9: null,
    month10: null,
    month11: null,
    month12: null,
    month13: null,
    month14: null,
    month15: null,
    month16: null,
    month17: null,
    month18: null,
    month19: null,
    month20: null,
    month21: null,
    month22: null,
    month23: null,
    month24: null,
    month25: null,
    month26: null,
    month27: null,
    month28: null,
    month29: null,
    month30: null,
    month31: null,
    month32: null,
    month33: null,
    month34: null,
    month35: null,
    month36: null
  };

  monthObjectAddRow = {
    month1: { value: null, disabled: true },
    month2: { value: null, disabled: true },
    month3: { value: null, disabled: true },
    month4: { value: null, disabled: true },
    month5: { value: null, disabled: true },
    month6: { value: null, disabled: true },
    month7: { value: null, disabled: true },
    month8: { value: null, disabled: true },
    month9: { value: null, disabled: true },
    month10: { value: null, disabled: true },
    month11: { value: null, disabled: true },
    month12: { value: null, disabled: true },
    month13: { value: null, disabled: true },
    month14: { value: null, disabled: true },
    month15: { value: null, disabled: true },
    month16: { value: null, disabled: true },
    month17: { value: null, disabled: true },
    month18: { value: null, disabled: true },
    month19: { value: null, disabled: true },
    month20: { value: null, disabled: true },
    month21: { value: null, disabled: true },
    month22: { value: null, disabled: true },
    month23: { value: null, disabled: true },
    month24: { value: null, disabled: true },
    month25: { value: null, disabled: true },
    month26: { value: null, disabled: true },
    month27: { value: null, disabled: true },
    month28: { value: null, disabled: true },
    month29: { value: null, disabled: true },
    month30: { value: null, disabled: true },
    month31: { value: null, disabled: true },
    month32: { value: null, disabled: true },
    month33: { value: null, disabled: true },
    month34: { value: null, disabled: true },
    month35: { value: null, disabled: true },
    month36: { value: null, disabled: true }
  };



  monthObjectArray = {
    month1: [],
    month2: [],
    month3: [],
    month4: [],
    month5: [],
    month6: [],
    month7: [],
    month8: [],
    month9: [],
    month10: [],
    month11: [],
    month12: [],
    month13: [],
    month14: [],
    month15: [],
    month16: [],
    month17: [],
    month18: [],
    month19: [],
    month20: [],
    month21: [],
    month22: [],
    month23: [],
    month24: [],
    month25: [],
    month26: [],
    month27: [],
    month28: [],
    month29: [],
    month30: [],
    month31: [],
    month32: [],
    month33: [],
    month34: [],
    month35: [],
    month36: []
  };

  monthObjectSumRow = {
    month1: 0,
    month2: 0,
    month3: 0,
    month4: 0,
    month5: 0,
    month6: 0,
    month7: 0,
    month8: 0,
    month9: 0,
    month10: 0,
    month11: 0,
    month12: 0,
    month13: 0,
    month14: 0,
    month15: 0,
    month16: 0,
    month17: 0,
    month18: 0,
    month19: 0,
    month20: 0,
    month21: 0,
    month22: 0,
    month23: 0,
    month24: 0,
    month25: 0,
    month26: 0,
    month27: 0,
    month28: 0,
    month29: 0,
    month30: 0,
    month31: 0,
    month32: 0,
    month33: 0,
    month34: 0,
    month35: 0,
    month36: 0
  };

  monthObjectArrayRow1 = {
    month1: [],
    month2: [],
    month3: [],
    month4: [],
    month5: [],
    month6: [],
    month7: [],
    month8: [],
    month9: [],
    month10: [],
    month11: [],
    month12: [],
    month13: [],
    month14: [],
    month15: [],
    month16: [],
    month17: [],
    month18: [],
    month19: [],
    month20: [],
    month21: [],
    month22: [],
    month23: [],
    month24: [],
    month25: [],
    month26: [],
    month27: [],
    month28: [],
    month29: [],
    month30: [],
    month31: [],
    month32: [],
    month33: [],
    month34: [],
    month35: [],
    month36: []
  };

  monthObjectArrayRow2 = {
    month1: [],
    month2: [],
    month3: [],
    month4: [],
    month5: [],
    month6: [],
    month7: [],
    month8: [],
    month9: [],
    month10: [],
    month11: [],
    month12: [],
    month13: [],
    month14: [],
    month15: [],
    month16: [],
    month17: [],
    month18: [],
    month19: [],
    month20: [],
    month21: [],
    month22: [],
    month23: [],
    month24: [],
    month25: [],
    month26: [],
    month27: [],
    month28: [],
    month29: [],
    month30: [],
    month31: [],
    month32: [],
    month33: [],
    month34: [],
    month35: [],
    month36: []
  };

  monthObjectArrayRow3 = {
    month1: [],
    month2: [],
    month3: [],
    month4: [],
    month5: [],
    month6: [],
    month7: [],
    month8: [],
    month9: [],
    month10: [],
    month11: [],
    month12: [],
    month13: [],
    month14: [],
    month15: [],
    month16: [],
    month17: [],
    month18: [],
    month19: [],
    month20: [],
    month21: [],
    month22: [],
    month23: [],
    month24: [],
    month25: [],
    month26: [],
    month27: [],
    month28: [],
    month29: [],
    month30: [],
    month31: [],
    month32: [],
    month33: [],
    month34: [],
    month35: [],
    month36: []
  };

  monthObjectSumRow1 = {
    month1: 0,
    month2: 0,
    month3: 0,
    month4: 0,
    month5: 0,
    month6: 0,
    month7: 0,
    month8: 0,
    month9: 0,
    month10: 0,
    month11: 0,
    month12: 0,
    month13: 0,
    month14: 0,
    month15: 0,
    month16: 0,
    month17: 0,
    month18: 0,
    month19: 0,
    month20: 0,
    month21: 0,
    month22: 0,
    month23: 0,
    month24: 0,
    month25: 0,
    month26: 0,
    month27: 0,
    month28: 0,
    month29: 0,
    month30: 0,
    month31: 0,
    month32: 0,
    month33: 0,
    month34: 0,
    month35: 0,
    month36: 0
  };

  monthObjectSumRow2 = {
    month1: 0,
    month2: 0,
    month3: 0,
    month4: 0,
    month5: 0,
    month6: 0,
    month7: 0,
    month8: 0,
    month9: 0,
    month10: 0,
    month11: 0,
    month12: 0,
    month13: 0,
    month14: 0,
    month15: 0,
    month16: 0,
    month17: 0,
    month18: 0,
    month19: 0,
    month20: 0,
    month21: 0,
    month22: 0,
    month23: 0,
    month24: 0,
    month25: 0,
    month26: 0,
    month27: 0,
    month28: 0,
    month29: 0,
    month30: 0,
    month31: 0,
    month32: 0,
    month33: 0,
    month34: 0,
    month35: 0,
    month36: 0
  };

  monthObjectSumRow3 = {
    month1: 0,
    month2: 0,
    month3: 0,
    month4: 0,
    month5: 0,
    month6: 0,
    month7: 0,
    month8: 0,
    month9: 0,
    month10: 0,
    month11: 0,
    month12: 0,
    month13: 0,
    month14: 0,
    month15: 0,
    month16: 0,
    month17: 0,
    month18: 0,
    month19: 0,
    month20: 0,
    month21: 0,
    month22: 0,
    month23: 0,
    month24: 0,
    month25: 0,
    month26: 0,
    month27: 0,
    month28: 0,
    month29: 0,
    month30: 0,
    month31: 0,
    month32: 0,
    month33: 0,
    month34: 0,
    month35: 0,
    month36: 0
  };

  monthBenefitArrayRow1 = {
    month1: [],
    month2: [],
    month3: [],
    month4: [],
    month5: [],
    month6: [],
    month7: [],
    month8: [],
    month9: [],
    month10: [],
    month11: [],
    month12: [],
    month13: [],
    month14: [],
    month15: [],
    month16: [],
    month17: [],
    month18: [],
    month19: [],
    month20: [],
    month21: [],
    month22: [],
    month23: [],
    month24: [],
    month25: [],
    month26: [],
    month27: [],
    month28: [],
    month29: [],
    month30: [],
    month31: [],
    month32: [],
    month33: [],
    month34: [],
    month35: [],
    month36: []
  };

  monthBenefitArrayRow2 = {
    month1: [],
    month2: [],
    month3: [],
    month4: [],
    month5: [],
    month6: [],
    month7: [],
    month8: [],
    month9: [],
    month10: [],
    month11: [],
    month12: [],
    month13: [],
    month14: [],
    month15: [],
    month16: [],
    month17: [],
    month18: [],
    month19: [],
    month20: [],
    month21: [],
    month22: [],
    month23: [],
    month24: [],
    month25: [],
    month26: [],
    month27: [],
    month28: [],
    month29: [],
    month30: [],
    month31: [],
    month32: [],
    month33: [],
    month34: [],
    month35: [],
    month36: []
  };

  monthBenefitSumRow1 = {
    month1: 0,
    month2: 0,
    month3: 0,
    month4: 0,
    month5: 0,
    month6: 0,
    month7: 0,
    month8: 0,
    month9: 0,
    month10: 0,
    month11: 0,
    month12: 0,
    month13: 0,
    month14: 0,
    month15: 0,
    month16: 0,
    month17: 0,
    month18: 0,
    month19: 0,
    month20: 0,
    month21: 0,
    month22: 0,
    month23: 0,
    month24: 0,
    month25: 0,
    month26: 0,
    month27: 0,
    month28: 0,
    month29: 0,
    month30: 0,
    month31: 0,
    month32: 0,
    month33: 0,
    month34: 0,
    month35: 0,
    month36: 0
  };

  monthBenefitSumRow2 = {
    month1: 0,
    month2: 0,
    month3: 0,
    month4: 0,
    month5: 0,
    month6: 0,
    month7: 0,
    month8: 0,
    month9: 0,
    month10: 0,
    month11: 0,
    month12: 0,
    month13: 0,
    month14: 0,
    month15: 0,
    month16: 0,
    month17: 0,
    month18: 0,
    month19: 0,
    month20: 0,
    month21: 0,
    month22: 0,
    month23: 0,
    month24: 0,
    month25: 0,
    month26: 0,
    month27: 0,
    month28: 0,
    month29: 0,
    month30: 0,
    month31: 0,
    month32: 0,
    month33: 0,
    month34: 0,
    month35: 0,
    month36: 0
  };

  monthArray = Object.keys(this.monthObject);

  financialImpactArea = this.fb.group({ financialImpactArea: null });

  HaveShareBenefit = this.fb.group({ haveShareBenefit: 'false' });

  ShareBenefitFrom = this.fb.group({ shareBenefitWorkstreams: this.fb.array([]) });

  // iLForm = this.fb.group({
  //   iL4RunRateRecurring: null,
  //   iL5RunRateRecurring: null,
  //   iL4RunRateOnetime: null,
  //   iL5RunRateOnetime: null,
  //   iL5FixedFxRecurring: null,
  //   iL5FloatFxRecurring: null,
  //   iL5FixedFxOnetime: null,
  //   iL5FloatFxOnetime: null
  // });

  monthForm = this.fb.group({ firstRunRateMonth: [(new Date())] });

  CalculateForm = this.fb.group({ calculate: true });

  FirstRunRateForm = this.fb.group({ firstRunRateTable: this.fb.array([]) });

  FirstRunRateTotalForm = this.fb.group({
    id: [0],
    typeOfBenefit: null,
    impactTypeOfBenefitTable: null,
    versionPrice: this.fb.group({
      row1: 'Target',
      row2: 'Revise',
      row3: 'Actual',
    }),
    runRate: this.fb.group({
      row1: null,
      row2: null,
      row3: null,
    }),
    monthRows1: this.fb.group(this.monthObjectAuto),
    monthRows2: this.fb.group(this.monthObjectAuto),
    monthRows3: this.fb.group(this.monthObjectAuto)
  });

  IndirectBenefit = this.fb.group({ indirectBenefit: 'false' });

  IndirectForm = this.fb.group({ indirectTable: this.fb.array([]) });

  explanationForm = this.fb.group({ explanation: null });

  HaveImpiemantCost = this.fb.group({ haveImpiemantCost: 'false' });

  ImpiemantCostForm = this.fb.group({
    id: [0],
    impactTypeOfBenefitTable: "ImpiemantCost",
    versionPrice: this.fb.group({
      row1: 'Estimate cost',
      row2: 'Actual',
    }),
    runRate: this.fb.group({
      row1: null,
      row2: null,
    }),
    monthRows1: this.fb.group(this.monthObjectAddRow),
    monthRows2: this.fb.group(this.monthObjectAddRow)
  });

  TypeBenefitForm = this.fb.group({ typeBenefitTable: this.fb.array([]) });

  TypeBenefitTotalForm = this.fb.group({
    id: [0],
    currencyFloatFx: null,
    impactTypeOfBenefitTable: null,
    typeOfBenefit: null,
    versionPrice: this.fb.group({
      row1: null,
      row2: null,
    }),
    runRate: this.fb.group({
      row1: null,
      row2: null,
    }),
    monthRows1: this.fb.group(this.monthObjectAuto),
    monthRows2: this.fb.group(this.monthObjectAuto)
  });

  toCommentForm = this.fb.group({ toComment: null });

  remarkForm = this.fb.group({
    remark1: null,
    remark2: null,
    remark3: null,
    remark4: null,
    remark5: null
  });

  submitToForm = this.fb.group({ submitTo: 'forward' });

  Impact: number;

  ImpactForm = this.fb.group({
    id: 0,
    financialImpactArea: '',
    haveShareBenefit: 'false',
    iL4RunRateRecurring: null,
    iL5RunRateRecurring: null,
    iL4RunRateOnetime: null,
    iL5RunRateOnetime: null,
    iL5FixedFxRecurring: null,
    iL5FloatFxRecurring: null,
    iL5FixedFxOnetime: null,
    iL5FloatFxOnetime: null,
    firstRunRateMonth: new Date(),
    autoCalculate: 'true',
    indirectBenefit: 'false',
    explanation: null,
    impiemantCost: 'false',
    toComment: null,
    remark1: null,
    remark2: null,
    remark3: null,
    remark4: null,
    remark5: null,
    totalRecurring: 0,
    totalOnetime: 0,
    totalCostOPEX: 0,
    siL4Achievement: null,
    siL5Achievement: null,
    initiativeId: this.initiativeService.id,
    contactIO: null,
    lastApprovedIL4Date: null,
    lastApprovedIL5Date: null,
    contactIOBy: null,
    firstApprovedIL4Date: null,
    lastSubmittedSIL4Date: null,
    lastSubmittedSIL5Date: null,
  });

  setMonth: string;

  isRemoveFirstRunRate = true;
  isRemoveShareBenefit = true;
  isRemoveIndirect = true;

  monthRowTableLength: number;

  groupBenefit: any = [];
  titleBenefit: any = [];

  titleIndirect: any = [];

  FirstRunRateList: any = [];
  FirstRunRateTypeOfBenefit: any = [];
  FirstRunRateLength: number;
  FirstRunRateStart: number;

  IndirectList: any = [];
  IndirectSelect: any = [];
  IndirectStart: number;
  IndirectLength: number;

  ImpiemantCostList: any = [];

  TypeOfBenefitList: any = [];
  TypeOfBenefitSelect: any = [];
  currencyFloatFxSelect: any = [];
  TypeOfBenefitStart: number;
  TypeOfBenefitLength: number;

  ImpiemantCostTooltip: string;

  recurringAndOneTimeArray: any = [];
  recurring: any = [];
  onetime: any = [];

  isCheckRecurring: any = [];
  isCheckOneTime: any = [];

  recurringAndOneTimeIndirect: any = [];
  recurringIndirect: any = [];
  onetimeIndirect: any = [];

  isIndirectRecurring: any = [];
  isIndirectOneTime: any = [];

  shareBenefitWorkstreams: any = [];

  isMax: any = false;
  subWorkstream1: string;
  detailInformations: any = {};

  isShowTable = false;
  isOpenCopy = true;

  startRunRate: number;
  startBenefit: number;

  iL4RunRateRecurringSum: number;
  iL5RunRateRecurringSum: number;
  iL4RunRateOnetimeSum: number;
  iL5RunRateOnetimeSum: number;

  requestOpex: string;
  costEstOpex: number;

  TypeOfBenefit = false;

  SIL4Achievement: string;
  SIL5Achievement: string;

  IsFirstRunRate: boolean;
  newFeature: boolean;

  testName = ['remark4', 'remark5'];

  currencyFloatFxList: {
    name: string;
    value: string;
  }[] = [];

  firstRunRateMonthTemp: Date;
  firstRunRateTemp: runRateTempData[] = [] as runRateTempData[];
  typeBenefitTableTemp: runRateTempData[] = [] as runRateTempData[];

  scale = 1;

  toDay = this.dateUtil.GetToday;
  itemsMonthDateTime: any = [];


  get StageIL1() {
    return this.stage === 'IL1';
  }

  isDirectBenefit() {
    return this.formGroup.get('DetailMaxForm') ? this.formGroup.get('DetailMaxForm').get('requireDirectBenefit').value : false;
  }

  isIndirectBenefits() {
    return this.formGroup.get('DetailMaxForm') ? this.formGroup.get('DetailMaxForm').get('requireIndirectBenefit').value : false;
  }

  get invalidFinancialImpactArea() {
    return this.ImpactForm.get('financialImpactArea').touched && this.ImpactForm.get('financialImpactArea').invalid;
  }



  ngOnInit() {
    let generalData: Initiative = this.initiativeService.generalData.value;
    //this.permissionService.CheckSectionNewLogic(this.page, (this.initiativeService.id).toString());
    // this.initiativeService.getNewFeature().subscribe((newFeatureRes) => {
    //   this.initiativeService.newFeature = newFeatureRes;
    //   this.newFeature = newFeatureRes;
    // });
    if (!this.formGroup.get('ImpactForm')) {
      this.formGroup.addControl('ImpactForm', this.ImpactForm);
    }

    this.commonDataService.GetCurrencyFloatFx().then((currencyRes) => {
      if (currencyRes.length > 0) {
        currencyRes.forEach((currency) => {
          let obj: {
            name: string;
            value: string;
          } = {
            name: currency,
            value: currency
          }
          this.currencyFloatFxList.push(obj);
        });
      }
    });


    //this.permissionService.getPermissionById(this.testName[0]);
    //this.permissionService.getPermissionById(this.testName[1]);

    // this.permissionService.CheckSection(this.page, sessionStorage.getItem('id').toString());
    // this.GetRecurringAndOnetime();
    //this.impactService.GetImplementationCostSelect().subscribe(implementationCost => this.implementationCost = implementationCost);
    //this.impactService.GetWorkStream().subscribe(workStreams => this.workStreams = workStreams);
    this.maxService.GetSubWorkstreamAll().subscribe(subWorkstream => this.subWorkstreams = subWorkstream);
    this.bsConfig = Object.assign({}, { minMode: this.minMode, isAnimated: true, dateInputFormat: 'MMM YYYY' });
    //this.GetSuggestStatus(this.id);
    this.stage = generalData.stage;
    // this.SetGeneral();
    // this.GetImpactTracking(this.id);
    // this.GetInitiativeDetail(this.id);
    // this.GetShareBenefitWorkstream(this.id);
    // this.IsImpact();
    this.init();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngAfterViewInit() {
    // this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    let element = document.querySelector('#sticky-content') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('change-colour');
    } else {
      element.classList.remove('change-colour');
    }
  }

  init() {
    //pack all form
    if (!this.ImpactForm.get('ShareBenefitFrom')) {
      this.ImpactForm.addControl('ShareBenefitFrom', this.ShareBenefitFrom);
    }

    if (!this.ImpactForm.get('FirstRunRateForm')) {
      this.ImpactForm.addControl('FirstRunRateForm', this.FirstRunRateForm);
    }

    if (!this.ImpactForm.get('HaveImpiemantCost')) {
      this.ImpactForm.addControl('HaveImpiemantCost', this.HaveImpiemantCost);
    }

    if (!this.ImpactForm.get('TypeBenefitForm')) {
      this.ImpactForm.addControl('TypeBenefitForm', this.TypeBenefitForm);
    }

    if (!this.ImpactForm.get('ImpiemantCostForm')) {
      this.ImpactForm.addControl('ImpiemantCostForm', this.ImpiemantCostForm);
    }

    if (!this.ImpactForm.get('IndirectForm')) {
      this.ImpactForm.addControl('IndirectForm', this.IndirectForm);
    }

    //set total First runrate
    if (!this.ImpactForm.get('FirstRunRateTotalForm')) {
      this.ImpactForm.addControl('FirstRunRateTotalForm', this.FirstRunRateTotalForm);
    }

    //set total Type of Benefit
    if (!this.ImpactForm.get('TypeBenefitTotalForm')) {
      this.ImpactForm.addControl('TypeBenefitTotalForm', this.TypeBenefitTotalForm);
    }



    const GetImpactAllTracking = new Promise((resolve, reject) => {
      this.impactService.GetImpactTrackAll(this.id).subscribe((res) => {
        this.GetImpactTrackingAll(res);
        resolve(true);
      })
    });

    const GetRecurringAndOnetime = new Promise((resolve, reject) => {
      this.GetRecurringAndOnetime();
      resolve(true);
    });

    // const GetShareBenefitWorkstream = new Promise((resolve, reject) => {
    //   this.GetShareBenefitWorkstream(this.id);
    //   resolve(true);

    // });


    Promise.all([
      // GetShareBenefitWorkstream,
      GetRecurringAndOnetime,
      GetImpactAllTracking
    ]).then((values) => {
      if (this.initiativeService.viewMode) {
        this.FirstRunRateForm.disable();
        this.TypeBenefitForm.disable();
        this.ImpiemantCostForm.disable();
        this.ImpactForm.disable();
        this.explanationForm.disable();
      }
    });
    // });
  }

  getImpiemantCostForm() {
    return this.ImpactForm.get('ImpiemantCostForm');
  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }



  InvalidTypeOfBenefit(i) {
    const control = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    return control.at(i).get('typeOfBenefit').touched && control.at(i).get('typeOfBenefit').invalid;
  }

  InvalidRunRate(i) {
    const control = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    return control.at(i).get('runRate').get('row1').touched && control.at(i).get('runRate').get('row1').invalid;
  }

  InvalidMonthRows1(i, month) {
    const control = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    return control.at(i).get('monthRows1').touched && control.at(i).get('monthRows1').invalid;
  }

  InvalidRevise(i) {
    const control = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    return control.at(i).get('runRate').get('row2').touched && control.at(i).get('runRate').get('row2').invalid;
  }

  InvalidActual(i) {
    const control = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    return control.at(i).get('runRate').get('row3').touched && control.at(i).get('runRate').get('row3').invalid;
  }

  SetValidateForm() {
    if (this.stage === 'IL1') {
      // financialImpactArea
      this.ImpactForm.get('financialImpactArea').setValidators([Validators.required]);
      this.ImpactForm.get('financialImpactArea').updateValueAndValidity();
    }
  }

  CheckPercent() {
    if (this.ImpactForm.get('haveShareBenefit').value) {
      const control = this.ShareBenefitFrom.get('shareBenefitWorkstreams') as FormArray;
      const arraySum = [];
      for (let i = 0; i < control.length; i++) {
        if (control.at(i).get('percent').value !== null) {
          arraySum.push(Number(control.at(i).get('percent').value));
        }
      }
      const sum = arraySum.reduce((a, b) => a + b, 0);
      if (sum < 100) {
        sessionStorage.setItem('PercentImpact', 'true');
      } else {
        sessionStorage.removeItem('PercentImpact');
      }
    } else {
      sessionStorage.removeItem('PercentImpact');
    }
  }

  GetSuggestStatus(id) {
    this.initiativeService.GetSuggestStatus(id).subscribe(response => {
      this.status = response.status;
      this.stage = response.stage;
      this.remark = response.remark;
      this.Cim = response.cim ? true : false;
      this.Capex = response.directCapex ? true : false;
      this.Strategy = response.strategy ? true : false;
      this.Max = response.max ? true : false;
      this.SetValidateForm();
      this.SetMarkAsTouchedForm();
      // this.CheckValidate();
    });
    return true;
  }

  GetShareBenefitWorkstream(id) {
    this.impactService.GetShareBenefitWorkstream(id).subscribe(response => {
      if (response) {
        this.shareBenefitWorkstreams = response.shareBenefitWorkstreams;
        if (this.shareBenefitWorkstreams.length !== 0) {
          const ShareBenefit = this.ShareBenefitFrom.get('shareBenefitWorkstreams') as FormArray;
          for (let i = 0; i < this.shareBenefitWorkstreams.length; i++) {
            ShareBenefit.push(this.InitialShareBenefitFrom());
            ShareBenefit.at(i).patchValue(this.shareBenefitWorkstreams[i]);
            ShareBenefit.at(i).get('id').patchValue(0);
          }
          this.isRemoveShareBenefit = ShareBenefit.length > 1 ? false : true;
        } else {
          this.AddShareBenefit();
          this.AddShareBenefit();
        }
      }
    }, error => this.response.error(error));
  }

  GetRecurringAndOnetime() {
    this.impactService.GetRecurringAndOneTimeSelect().subscribe(recurringAndOneTime => {
      this.recurringAndOneTime = recurringAndOneTime;
    });
  }

  GetRecurringAndOnetimeArray() {
    this.impactService.GetRecurringAndOneTimeSelect().subscribe(recurring => {
      this.recurring = recurring;
      this.recurring = this.recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'Recurring' && (obj.typeOfBenefitTitle.indexOf('Indirect') === -1));
      this.recurringAndOneTimeArray.push(this.recurring);
    });
  }

  GetRecurringAndOnetimeIndirect() {
    this.impactService.GetRecurringAndOneTimeSelect().subscribe(recurring => {
      this.recurringIndirect = recurring;
      this.recurringIndirect = this.recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'Recurring' && (obj.typeOfBenefitTitle.indexOf('Indirect') !== -1));

      this.recurringAndOneTimeIndirect.push(this.recurringIndirect);
    });
  }



  FirstRunRateLoading() {
    setTimeout(() => {
      this.spinner.hide();
      // this.IsFirstRunRate = false;
    }, 600);
  }

  GetImpactTrackingAll(impact: ImpactTrackingModel) {
    // this.IsFirstRunRate = true;
    this.spinner.show();
    const generalData = this.initiativeService.generalData.value;

    //
    this.status = generalData.status;
    this.stage = generalData.stage;
    this.remark = generalData.remark;
    this.Cim = generalData.cim ? true : false;
    this.Capex = generalData.directCapex ? true : false;
    this.Strategy = generalData.strategy ? true : false;
    this.Max = generalData.max ? true : false;
    this.SetValidateForm();
    this.SetMarkAsTouchedForm();

    this.requestOpex = generalData.requestOpex;
    this.costEstOpex = generalData.costEstOpex;

    if (this.requestOpex === 'trueOpex') { // detailResponse.impiemantCost
      this.ImpactForm.patchValue({ impiemantCost: true });
      this.isHaveImpiemantCost = 'true';
      if (!this.initiativeService.viewMode) this.ImpactForm.get('ImpiemantCostForm').enable();
      this.ImpactForm.get('ImpiemantCostForm').get('runRate').patchValue({ row1: this.costEstOpex ? this.costEstOpex : null });
    } else {
      this.ImpactForm.patchValue({ impiemantCost: false });
      this.isHaveImpiemantCost = 'false';
      this.ImpactForm.get('ImpiemantCostForm').disable();
    }

    this.isMax = generalData.max;
    if (this.isMax) {
      this.subWorkstream1 = impact.detailInformation.subWorkstream1;
    }

    if (impact.id) {
      this.isAutoCalculate = Boolean(impact.autoCalculate) ? true : false;
      if (Boolean(impact.detailInformation.requireDirectBenefit)) {
        this.impactService.RequireDirectBenefit = true;
      } else {
        this.impactService.RequireDirectBenefit = false;
      }
      if (Boolean(impact.detailInformation.requireIndirectBenefit)) {
        this.impactService.RequireIndirectBenefit = true;
        this.ImpactForm.patchValue({ indirectBenefit: true });
      } else {
        this.impactService.RequireIndirectBenefit = false;
        this.ImpactForm.patchValue({ indirectBenefit: false });
      }

      this.SIL4Achievement = impact.siL4Achievement;
      this.SIL5Achievement = impact.siL5Achievement;
      const stage4 = ['IL4', 'SIL4'];
      const stage5 = ['IL5', 'SIL5'];

      if (stage4.indexOf(this.stage) !== -1) {
        if (!impact.siL4Achievement) {
          const yearDate = new Date(new Date().getFullYear(), 11, 31);
          const todaysDate = new Date();
          if (yearDate.toTimeString() === todaysDate.toTimeString()) {
            this.ImpactForm.patchValue({ siL4Achievement: new Date().getFullYear() });
          } else {
            this.ImpactForm.patchValue({ siL4Achievement: impact.siL4Achievement });
          }
        } else {
          this.ImpactForm.patchValue({ siL4Achievement: impact.siL4Achievement });
        }
      }

      if (stage5.indexOf(this.stage) !== -1) {
        if (!impact.siL5Achievement) {
          const yearDate = new Date(new Date().getFullYear(), 11, 31);
          const todaysDate = new Date();
          if (yearDate.toTimeString() === todaysDate.toTimeString()) {
            this.ImpactForm.patchValue({ siL5Achievement: new Date().getFullYear() });
          } else {
            this.ImpactForm.patchValue({ siL5Achievement: impact.siL5Achievement });
          }
        } else {
          this.ImpactForm.patchValue({ siL5Achievement: impact.siL5Achievement });
        }
      }


      this.firstRunRateMonthTemp = impact.firstRunRateMonth ? new Date(impact.firstRunRateMonth) : null;
      this.Impact = impact.id;
      this.ImpactForm.patchValue(impact);

      this.ImpactForm.patchValue({ firstRunRateMonth: impact.firstRunRateMonth ? new Date(impact.firstRunRateMonth) : null });


      if (impact.haveShareBenefit) {
        this.ImpactForm.patchValue({ haveShareBenefit: 'true' });
        this.isHaveShareBenefit = 'true';
      } else {
        this.ImpactForm.patchValue({ haveShareBenefit: 'false' });
        this.isHaveShareBenefit = 'false';
      }

      if (impact.impiemantCost) {
        this.isHaveImpiemantCost = 'true';
        this.ImpactForm.patchValue({ impiemantCost: 'true' });
        if (!this.initiativeService.viewMode) this.ImpactForm.get('ImpiemantCostForm').enable();
        this.ImpactForm.get('ImpiemantCostForm').get('runRate').patchValue({ row1: this.costEstOpex ? this.costEstOpex : null });
      } else {
        this.ImpactForm.patchValue({ impiemantCost: 'false' });
        this.isHaveImpiemantCost = 'false';
        this.ImpactForm.get('ImpiemantCostForm').disable();
      }

      if (impact.indirectBenefit && impact.detailInformation.requireIndirectBenefit) {
        this.ImpactForm.patchValue({ indirectBenefit: 'true' });
        this.isIndirectBenefit = 'true';
      } else {
        this.ImpactForm.patchValue({ indirectBenefit: 'false' });
        this.isIndirectBenefit = 'false';
      }

      // this.explanationForm.patchValue({ explanation: response.explanation ? response.explanation : null });
      // this.toCommentForm.patchValue({ toComment: response.toComment ? response.toComment : null });

      const FirstRunRate = this.ImpactForm.get('FirstRunRateForm').get('firstRunRateTable') as FormArray;
      const Indirect = this.ImpactForm.get('IndirectForm').get('indirectTable') as FormArray;
      const TypeBenefit = this.ImpactForm.get('TypeBenefitForm').get('typeBenefitTable') as FormArray;

      //recurringAndOneTime
      const recurringAndOneTime = impact.recurringAndOneTime;
      this.recurringAndOneTime = impact.recurringAndOneTime;

      //first runrate
      const FirstRunRateList = impact.firstRunrates;
      const FirstRunRateTotalList = impact.firstRunrateTotal;
      const firstRunrateType: string[] = ["Target", "Revise", "Actual"];
      const FirstRunRateRow = { row1: [], row2: [], row3: [] };
      const FirstRunRateRowSum = { row1: 0, row2: 0, row3: 0 };
      const FirstRunRateMonthRow = {
        row1: this.monthObjectArrayRow1,
        row2: this.monthObjectArrayRow2,
        row3: this.monthObjectArrayRow3
      };
      const FirstRunRateMonthRowSum = {
        row1: this.monthObjectSumRow1,
        row2: this.monthObjectSumRow2,
        row3: this.monthObjectSumRow3
      };

      //type benefit
      const TypeBenefitList = impact.typeBenefits;
      const TypeBenefitTotalList = impact.typeBenefitTotal;
      const typeBenefitType: string[] = ["FixedFX", "FloatFX"];
      const BenefitRunRateRow = { row1: [], row2: [] };
      const BenefitRunRateRowSum = { row1: 0, row2: 0 };
      const BenefitMonthRow = {
        row1: this.monthBenefitArrayRow1,
        row2: this.monthBenefitArrayRow2,
      };

      const BenefitMonthRowSum = {
        row1: this.monthBenefitSumRow1,
        row2: this.monthBenefitSumRow2,
      };

      //indirect
      const indirectType: string[] = ["Target", "Actual"];

      let sumFixedFXRecurring: {
        type: string;
        value: number
      }[];

      this.FirstRunRateList = FirstRunRateList;

      //first runrate and to finance only
      const firstRunrateCount: ImpactTypeOfBenefits[] = FirstRunRateList?.filter(x => x.versionPrice === "Target");
      this.isRemoveFirstRunRate = firstRunrateCount.length > 1 ? false : true;
      this.monthRowTableLength = firstRunrateCount.length;
      if (this.FirstRunRateList.length !== 0) {
        this.isOpenCopy = false;
        firstRunrateCount.forEach((item, indexCount) => {
          const firstRunrateList: ImpactTypeOfBenefits[] = FirstRunRateList.filter(x => x.orderIndex === indexCount);
          const typeOfBanefitList: ImpactTypeOfBenefits[] = TypeBenefitList.filter(x => x.orderIndex === indexCount);


          const typeOfBenefit = recurringAndOneTime.find(
            obj => obj.typeOfBenefitCode === item.typeOfBenefit
          );

          FirstRunRate.push(this.InitialFirstRunRate());
          TypeBenefit.push(this.InitialTypeBenefit());
          FirstRunRate.at(indexCount).patchValue({
            typeOfBenefit: item.typeOfBenefit,
            impactTypeOfBenefitTable: "FirstRunRate"
          });
          TypeBenefit.at(indexCount).patchValue({
            typeOfBenefit: item.typeOfBenefit,
            impactTypeOfBenefitTable: "TypeBenefit"
          });

          if (typeOfBenefit) {
            this.groupBenefit.push(typeOfBenefit.typeOfBenefitGroup);
            this.titleBenefit.push(typeOfBenefit.typeOfBenefitTitle);
            switch (typeOfBenefit.typeOfBenefitGroup) {
              case 'Recurring':
                this.isCheckRecurring.push(true);
                this.isCheckOneTime.push(false);
                FirstRunRate.at(indexCount).get("typeOfBenefitGroup").patchValue("recurring");
                this.recurring = recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'Recurring' && (obj.typeOfBenefitTitle.indexOf('Indirect') === -1));
                this.recurringAndOneTimeArray.push(this.recurring);
                break;
              case 'One time':
                this.isCheckRecurring.push(false);
                this.isCheckOneTime.push(true);
                FirstRunRate.at(indexCount).get("typeOfBenefitGroup").patchValue("onetime");
                this.onetime = recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'One time' && (obj.typeOfBenefitTitle.indexOf('Indirect') === -1));
                this.recurringAndOneTimeArray.push(this.onetime);
                break;
            }
          } else {
            this.isCheckRecurring.push(true);
            this.isCheckOneTime.push(false);
            FirstRunRate.at(indexCount).get("typeOfBenefitGroup").patchValue("recurring");
            this.recurring = recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'Recurring' && (obj.typeOfBenefitTitle.indexOf('Indirect') === -1));
            this.recurringAndOneTimeArray.push(this.recurring);
          }

          firstRunrateType.forEach((item, index) => {
            const rowIndex = index + 1;
            FirstRunRate.at(indexCount).get('runRate').get("row" + rowIndex).patchValue(firstRunrateList[index].runRate);

            Object.keys(this.monthObject).forEach(name => {
              FirstRunRate.at(indexCount).get('monthRows' + rowIndex).patchValue({ [name]: firstRunrateList[index][name] });
            });

            if (this.stage === 'IL1') {
              FirstRunRate.at(indexCount).get('runRate').get('row1').setValidators([Validators.required]);
              FirstRunRate.at(indexCount).get('runRate').get('row1').updateValueAndValidity();
            }
            if (this.stage === 'IL3-2') {
              FirstRunRate.at(indexCount).get('runRate').get('row2').setValidators([Validators.required]);
              FirstRunRate.at(indexCount).get('runRate').get('row2').updateValueAndValidity();
            }
            if (this.stage === 'IL4') {
              FirstRunRate.at(indexCount).get('runRate').get('row3').setValidators([Validators.required]);
              FirstRunRate.at(indexCount).get('runRate').get('row3').updateValueAndValidity();
            }
          });

          typeBenefitType.forEach((item, index) => {
            const rowIndex = index + 1;
            if (rowIndex === 1) {
              TypeBenefit.at(indexCount).patchValue({ currencyFloatFx: typeOfBanefitList[index].currencyFloatFx });
              TypeBenefit.at(indexCount).get("versionPrice").get("row1").patchValue(typeOfBanefitList[index].fixedFX);
            }
            TypeBenefit.at(indexCount).get('runRate').get("row" + rowIndex).patchValue(typeOfBanefitList[index].runRate);
            Object.keys(this.monthObject).forEach(name => {
              TypeBenefit.at(indexCount).get('monthRows' + rowIndex).patchValue({ [name]: typeOfBanefitList[index][name] });
            });
          });

        });
        // if (firstRunrateCount.length > 1) {
        //total runrate
        FirstRunRateTotalList.forEach((item, index) => {
          const rowIndex = index + 1;
          this.FirstRunRateTotalForm.get("impactTypeOfBenefitTable").patchValue("FirstRunRateTotal");
          this.FirstRunRateTotalForm.get("runRate").get("row" + rowIndex).patchValue(this.checkNullValue(FirstRunRateTotalList[index].runRate) ? parseFloat(this.round(FirstRunRateTotalList[index].runRate, 3)) : null);
          if (this.checkNullValue(FirstRunRateTotalList[index].runRate)) {
            Object.keys(this.monthObject).forEach(name => {
              if (this.checkNullValue(item[name])) {
                this.FirstRunRateTotalForm.get('monthRows' + rowIndex).patchValue({
                  [name]: parseFloat(this.round(item[name], 3))
                });
              } else {
                this.FirstRunRateTotalForm.get('monthRows' + rowIndex).patchValue({
                  [name]: null
                });
              }
            });
          } else {
            Object.keys(this.monthObject).forEach(name => {
              this.FirstRunRateTotalForm.get('monthRows' + rowIndex).patchValue({
                [name]: null
              });
            });
          }
        });

        //total to finance only
        TypeBenefitTotalList.forEach((item, index) => {
          const rowIndex = index + 1;
          this.TypeBenefitTotalForm.get("impactTypeOfBenefitTable").patchValue("TypeBenefitTotal");
          this.TypeBenefitTotalForm.get("runRate").get("row" + rowIndex).patchValue(this.checkNullValue(TypeBenefitTotalList[index].runRate) ? parseFloat(this.round(TypeBenefitTotalList[index].runRate, 3)) : null);
          if (this.checkNullValue(TypeBenefitTotalList[index].runRate)) {
            Object.keys(this.monthObject).forEach(name => {
              if (this.checkNullValue(item[name])) {
                this.TypeBenefitTotalForm.get('monthRows' + rowIndex).patchValue({
                  [name]: parseFloat(this.round(item[name], 3))
                });
              } else {
                this.TypeBenefitTotalForm.get('monthRows' + rowIndex).patchValue({
                  [name]: null
                });
              }
            });
          } else {
            Object.keys(this.monthObject).forEach(name => {
              this.TypeBenefitTotalForm.get('monthRows' + rowIndex).patchValue({
                [name]: null
              });
            });
          }
        });
      } else {
        this.FirstRunRateLoading();
        switch (this.stage) {
          case 'IL1':
          case 'IL3-2':
          case 'IL4':
            this.TypeOfBenefit = true;
            break;
        }
        this.AddMonthRow();
      }

      //table inditect
      if (this.isIndirectBenefit == 'true') {
        const IndirectLists = impact.indirectBenefits;
        const indirectListCount: ImpactTypeOfBenefits[] = IndirectLists?.filter(x => x.versionPrice === "Target");
        this.IndirectList = IndirectLists;
        if (indirectListCount.length > 0) {

          indirectListCount.forEach((item, indexCount) => {
            const indirectLis: ImpactTypeOfBenefits[] = IndirectLists.filter(x => x.orderIndex === indexCount);
            const typeOfBenefit = recurringAndOneTime.find(
              obj => obj.typeOfBenefitCode === item.typeOfBenefit
            );

            if (typeOfBenefit?.id > 0) {
              Indirect.push(this.InitialIndirect());
              Indirect.at(indexCount).patchValue({ typeOfBenefit: item.typeOfBenefit });
              this.titleIndirect.push(typeOfBenefit.typeOfBenefitTitle);
              if (typeOfBenefit) {
                switch (typeOfBenefit.typeOfBenefitGroup) {
                  case 'Recurring':
                    this.isIndirectRecurring.push(true);
                    this.isIndirectOneTime.push(false);
                    Indirect.at(indexCount).get("typeOfBenefitGroup").patchValue("recurring");
                    this.recurringIndirect = recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'Recurring' && (obj.typeOfBenefitTitle.indexOf('Indirect') !== -1));
                    this.recurringAndOneTimeIndirect.push(this.recurringIndirect);
                    break;
                  case 'One time':
                    this.isIndirectRecurring.push(false);
                    this.isIndirectOneTime.push(true);
                    Indirect.at(indexCount).get("typeOfBenefitGroup").patchValue("onetime");
                    this.onetimeIndirect = recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'One time' && (obj.typeOfBenefitTitle.indexOf('Indirect') !== -1));
                    this.recurringAndOneTimeIndirect.push(this.onetimeIndirect);
                    break;
                }
              }
            } else {
              Indirect.push(this.InitialIndirect());
              Indirect.at(indexCount).patchValue({
                typeOfBenefit: item.typeOfBenefit,
                impactTypeOfBenefitTable: "IndirectBenefit"
              });
              if (!this.initiativeService.viewMode) Indirect.at(indexCount).enable();
            }

            indirectType.forEach((item, index) => {
              const rowIndex = index + 1;
              Indirect.at(indexCount).get('runRate').get("row" + rowIndex).patchValue(indirectLis[index].runRate);

            });

          });
          this.isRemoveIndirect = Indirect.length > 1 ? false : true;
        } else {
          this.AddIndirect();
        }
      }

      //table implementCost
      // if (this.isHaveImpiemantCost === 'true') {
      const ImplementationList = impact.impiemantCosts;
      this.ImpiemantCostList = ImplementationList;
      if (this.ImpiemantCostList.length !== 0) {
        this.ImpiemantCostForm.get('impactTypeOfBenefitTable').patchValue("ImpiemantCost");
        for (let i = 0; i <= 1; i++) {
          if (i === 0) {
            this.ImpiemantCostForm.get('versionPrice').patchValue({ row1: this.ImpiemantCostList[i].versionPrice });
            this.ImpiemantCostForm.get('runRate').patchValue({
              row1: this.ImpiemantCostList[i].runRate ? this.ImpiemantCostList[i].runRate : this.costEstOpex
            });
            Object.keys(this.monthObject).forEach(name => {
              this.ImpiemantCostForm.get('monthRows1').patchValue({ [name]: this.ImpiemantCostList[i][name] });
            });
          } else {
            this.ImpiemantCostForm.get('versionPrice').patchValue({ row2: this.ImpiemantCostList[i].versionPrice });
            this.ImpiemantCostForm.get('runRate').patchValue({ row2: this.ImpiemantCostList[i].runRate });
            Object.keys(this.monthObject).forEach(name => {
              this.ImpiemantCostForm.get('monthRows2').patchValue({ [name]: this.ImpiemantCostList[i][name] });
            });
          }
        }
      }
      if (this.ImpiemantCostForm.get('runRate').get('row2').value) {
        this.ImpiemantCostForm.get('runRate').patchValue({ row2: this.costEstOpex });
      } else {
        this.ImpiemantCostForm.get('runRate').patchValue({ row1: this.costEstOpex });
      }
      // }

      //End of get Data





      // if (this.initiativeService.suggestionStatus.stage == 'IL3-2' || this.initiativeService.suggestionStatus.stage == 'Adopt IL3 - Golive'
      //   || this.initiativeService.suggestionStatus.stage == 'Adopt IL3' || this.initiativeService.suggestionStatus.stage == 'Implement IL3') {
      //   this.IsIL3 = true;
      // }
      // else if (this.initiativeService.suggestionStatus.stage == 'IL4' || this.initiativeService.suggestionStatus.stage == 'Adopt IL4') {
      //   this.IsIL4 = true;
      // }

      // if (stage4.indexOf(generalData.stage) !== -1) {
      //   // this.ImpactForm.patchValue({ iL4RunRateRecurring: impact.iL4RunRateRecurring });
      //   // this.ImpactForm.patchValue({ iL4RunRateOnetime: impact.iL4RunRateOnetime });
      // }



      let stagesIL4Runrate = ['IL4', 'SIL4', 'IL5', 'SIL5', 'Adopt SIL4', 'Adopt IL4', 'Adopt SIL5'] as string[];
      if (stagesIL4Runrate.includes(generalData.stage)) {
        //show real formControl
        this.IsIL4 = true;
        // this.ImpactForm.patchValue({ iL4RunRateRecurring: impact.iL4RunRateRecurring });
        // this.ImpactForm.patchValue({ iL4RunRateOnetime: impact.iL4RunRateOnetime });
      } else {
        this.IsIL4 = false;
      }

      let stagesIL5Runrate = ['IL5', 'SIL5', 'Adopt SIL5'] as string[];
      if (stagesIL5Runrate.includes(generalData.stage)) {
        //show real formControl
        this.IsIL5 = true;
        // this.ImpactForm.patchValue({ iL4RunRateRecurring: impact.iL4RunRateRecurring });
        // this.ImpactForm.patchValue({ iL4RunRateOnetime: impact.iL4RunRateOnetime });
      } else {
        this.IsIL5 = false;
      }


      // this.ImpactForm.patchValue({
      //   iL4RunRateRecurring: impact.iL4RunRateRecurring,
      //   iL4RunRateOnetime: impact.iL4RunRateOnetime,
      //   iL5RunRateOnetime: impact.iL5RunRateOnetime,
      //   iL5RunRateRecurring: impact.iL5RunRateRecurring
      // });

      //share benefit 



      setTimeout(() => {
        this.FirstRunRateLoading();
      }, 2000);


    } else {
      this.FirstRunRateLoading();
      switch (this.stage) {
        case 'IL1':
        case 'IL3-2':
        case 'IL4':
          this.TypeOfBenefit = true;
          break;
      }
      this.AddMonthRow();
      this.AddIndirect();
    }

    if (impact.haveShareBenefit) {
      this.shareBenefitWorkstreams = impact.shareBenefit;
      // if share benefit is length = 1 is default
      if (this.shareBenefitWorkstreams.length > 1) {
        const ShareBenefit = this.ShareBenefitFrom.get('shareBenefitWorkstreams') as FormArray;
        for (let i = 0; i < this.shareBenefitWorkstreams.length; i++) {
          ShareBenefit.push(this.InitialShareBenefitFrom());
          ShareBenefit.at(i).patchValue(this.shareBenefitWorkstreams[i]);
          ShareBenefit.at(i).get('id').patchValue(0);
        }
        this.isRemoveShareBenefit = ShareBenefit.length > 1 ? false : true;
      } else {
        this.AddShareBenefit();
        this.AddShareBenefit();
      }
    } else {
      this.AddShareBenefit();
      this.AddShareBenefit();
    }
  }

  ChangeHaveShareBenefit(event) {
    this.isHaveShareBenefit = event.target.value;
    if (this.isHaveShareBenefit === 'true') {
      (this.ShareBenefitFrom.get('shareBenefitWorkstreams') as FormArray).controls.forEach(item => { if (!this.initiativeService.viewMode) item.enable(); });
      const control = this.ShareBenefitFrom.get('shareBenefitWorkstreams') as FormArray;
      for (let i = 0; i < control.length; i++) {
        if (i === 0) {
          control.at(i).patchValue({ workstream: this.subWorkstream1 ? this.subWorkstream1 : null });
        }
      }
    } else {
      (this.ShareBenefitFrom.get('shareBenefitWorkstreams') as FormArray).controls.forEach(item => { item.disable(); });
      const control = this.ShareBenefitFrom.get('shareBenefitWorkstreams') as FormArray;
      for (let i = 0; i < control.length; i++) {
        control.at(i).patchValue({ percent: null });
      }
    }
    this.CheckPercent();
  }

  ChangeHaveImpiemantCost(event) {
    this.isHaveImpiemantCost = event.target.value;
    if (this.isHaveImpiemantCost === 'true') {
      // this.AddIndirect();
      this.formGroup.get('initiativesForm').get('requestOpex').setValue('trueOpex');
      this.initiativeService.showCostEstOpex = true;
      if (!this.initiativeService.viewMode) this.ImpiemantCostForm.enable();
    } else {
      //requestOpex: 'falseOpex'
      this.initiativeService.showCostEstOpex = false;
      this.formGroup.get('initiativesForm').get('requestOpex').setValue('falseOpex');
      this.ImpiemantCostForm.disable();
    }
  }

  ChangeIndirectBenefit(event) {
    this.isIndirectBenefit = event.target.value;
    if (event.target.value) {
      let IndirectFormArray = this.ImpactForm.get('IndirectForm').get('indirectTable') as FormArray;
      if (IndirectFormArray.length <= 0) {
        this.AddIndirect();
      }
    }
  }

  ChangePercent(index) {
    const control = this.ShareBenefitFrom.get('shareBenefitWorkstreams') as FormArray;
    const arraySum = [];
    for (let i = 0; i < control.length; i++) {
      if (control.at(i).get('percent').value !== null) {
        arraySum.push(Number(control.at(i).get('percent').value));
      }
    }
    const sum = arraySum.reduce((a, b) => a + b, 0);
    if (sum > 100) {
      for (let i = 0; i < control.length; i++) {
        if (control.at(i).get('percent').value !== null) {
          control.at(index).get('percent').patchValue(null);
        }
      }
      this.initiativeService.viewMode ? false : this.swalTool.SumPercent();
    }
    this.CheckPercent();
  }
  presentDate: Date;
  updateDataInTable(months: number) {
    if (this.ImpactForm) {
      let firstRunRateTable = this.ImpactForm.get('FirstRunRateForm').get('firstRunRateTable') as FormArray
      let typeBenefitForm = this.ImpactForm.get('TypeBenefitForm').get('typeBenefitTable') as FormArray
      for (var i = 0; i < firstRunRateTable.length; i++) {
        if (months > 0) {
          for (var j = 1; j <= 36; j++) {
            if (j - months < 0) {
              firstRunRateTable.at(i).get('monthRows1')?.get('month' + (j)).patchValue(null);
              firstRunRateTable.at(i).get('monthRows2')?.get('month' + (j)).patchValue(null);
              firstRunRateTable.at(i).get('monthRows3')?.get('month' + (j)).patchValue(null);

              typeBenefitForm.at(i).get('monthRows1')?.get('month' + (j)).patchValue(null);
              typeBenefitForm.at(i).get('monthRows2')?.get('month' + (j)).patchValue(null);
              typeBenefitForm.at(i).get('monthRows3')?.get('month' + (j)).patchValue(null);
            } else if (j - months > 0 && j - months <= 36) {

              firstRunRateTable.at(i).get('monthRows1')?.get('month' + (j - months)).patchValue(firstRunRateTable.at(i).get('monthRows1')?.get('month' + (j)).value);
              firstRunRateTable.at(i).get('monthRows1')?.get('month' + (j)).patchValue(null);
              firstRunRateTable.at(i).get('monthRows2')?.get('month' + (j - months)).patchValue(firstRunRateTable.at(i).get('monthRows2')?.get('month' + (j)).value);
              firstRunRateTable.at(i).get('monthRows2')?.get('month' + (j)).patchValue(null);
              firstRunRateTable.at(i).get('monthRows3')?.get('month' + (j - months)).patchValue(firstRunRateTable.at(i).get('monthRows3')?.get('month' + (j)).value);
              firstRunRateTable.at(i).get('monthRows3')?.get('month' + (j)).patchValue(null);

              typeBenefitForm.at(i).get('monthRows1')?.get('month' + (j - months)).patchValue(typeBenefitForm.at(i).get('monthRows1')?.get('month' + (j)).value);
              typeBenefitForm.at(i).get('monthRows1')?.get('month' + (j)).patchValue(null);
              typeBenefitForm.at(i).get('monthRows2')?.get('month' + (j - months)).patchValue(typeBenefitForm.at(i).get('monthRows2')?.get('month' + (j)).value);
              typeBenefitForm.at(i).get('monthRows2')?.get('month' + (j)).patchValue(null);
              typeBenefitForm.at(i).get('monthRows3')?.get('month' + (j - months)).patchValue(typeBenefitForm.at(i).get('monthRows3')?.get('month' + (j)).value);
              typeBenefitForm.at(i).get('monthRows3')?.get('month' + (j)).patchValue(null);
            }
          }
        }
        else {
          for (var j = 36; j >= 1; j--) {
            if (j - months >= 36) {
              firstRunRateTable.at(i).get('monthRows1')?.get('month' + (j)).patchValue(null);
              firstRunRateTable.at(i).get('monthRows2')?.get('month' + (j)).patchValue(null);
              firstRunRateTable.at(i).get('monthRows3')?.get('month' + (j)).patchValue(null);
            }
            if (j - months > 0 && j - months <= 36) {
              firstRunRateTable.at(i).get('monthRows1')?.get('month' + (j - months)).patchValue(firstRunRateTable.at(i).get('monthRows1')?.get('month' + (j)).value);
              firstRunRateTable.at(i).get('monthRows1')?.get('month' + (j)).patchValue(null);
              firstRunRateTable.at(i).get('monthRows2')?.get('month' + (j - months)).patchValue(firstRunRateTable.at(i).get('monthRows2')?.get('month' + (j)).value);
              firstRunRateTable.at(i).get('monthRows2')?.get('month' + (j)).patchValue(null);
              firstRunRateTable.at(i).get('monthRows3')?.get('month' + (j - months)).patchValue(firstRunRateTable.at(i).get('monthRows3')?.get('month' + (j)).value);
              firstRunRateTable.at(i).get('monthRows3')?.get('month' + (j)).patchValue(null);
            }
          }
        }

      }
      let impiemantCostForm = this.ImpactForm.get('ImpiemantCostForm');
      if (months > 0) {
        for (var j = 1; j <= 36; j++) {
          if (j - months < 0) {
            impiemantCostForm.get('monthRows1').get('month' + (j)).patchValue(null);
            impiemantCostForm.get('monthRows2').get('month' + (j)).patchValue(null);
          } else if (j - months > 0 && j - months <= 36) {
            impiemantCostForm.get('monthRows1').get('month' + (j - months)).patchValue(impiemantCostForm.get('monthRows1').get('month' + (j)).value);
            impiemantCostForm.get('monthRows1').get('month' + (j)).patchValue(null);
            impiemantCostForm.get('monthRows2').get('month' + (j - months)).patchValue(impiemantCostForm.get('monthRows2').get('month' + (j)).value);
            impiemantCostForm.get('monthRows2').get('month' + (j)).patchValue(null);
          }
        }
      }
      else {
        for (var j = 36; j >= 1; j--) {
          if (j - months >= 36) {
            impiemantCostForm.get('monthRows1').get('month' + (j)).patchValue(null);
            impiemantCostForm.get('monthRows2').get('month' + (j)).patchValue(null);
          } else if (j - months > 0 && j - months <= 36) {
            impiemantCostForm.get('monthRows1').get('month' + (j - months)).patchValue(impiemantCostForm.get('monthRows1').get('month' + (j)).value);
            impiemantCostForm.get('monthRows1').get('month' + (j)).patchValue(null);
            impiemantCostForm.get('monthRows2').get('month' + (j - months)).patchValue(impiemantCostForm.get('monthRows2').get('month' + (j)).value);
            impiemantCostForm.get('monthRows2').get('month' + (j)).patchValue(null);
          }
        }
      }
    }
  }
  ChangeMonth(value: Date): void {
    let getTime = new Date(value);
    if (this.presentDate) {
      let months = (value.getFullYear() - this.presentDate.getFullYear()) * 12;
      months -= this.presentDate.getMonth();
      months += value.getMonth();
      // this.updateDataInTable(months);
    }
    if (!isNaN(getTime.getTime()) && value) {
      const formattedDate = this.months[new Date(value).getMonth() + 1] + ' ' + new Date(value).getFullYear();
      this.year = new Date(value).getFullYear();
      this.month = new Date(value).getMonth();
      this.CalculateMonthStage(value);
      this.CalculateMonthYear();
      this.ImpactForm.get('firstRunRateMonth').setValue(value);
      setTimeout(() => this.monthName = formattedDate, 300);
    } else {
      let today = new Date();
      const formattedDate = this.months[today.getMonth() + 1] + ' ' + today.getFullYear();
      this.year = today.getFullYear();
      this.month = today.getMonth();
      this.CalculateMonthStage(today);
      this.CalculateMonthYear();
      this.ImpactForm.get('firstRunRateMonth').setValue(today);
      setTimeout(() => this.monthName = formattedDate, 300);
    }
    this.presentDate = this.ImpactForm.get('firstRunRateMonth').value;
  }

  CalculateMonthStage(value) {
    const stage3 = this.stageService.impactRunRateActual;
    if (stage3.indexOf(this.stage) !== -1) {
      const year = new Date().getFullYear();
      const month = new Date().getMonth();
      const FirstRunRate = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
      const monthRunRateArray = [
        'month1', 'month2', 'month3', 'month4', 'month5', 'month6',
        'month7', 'month8', 'month9', 'month10', 'month11', 'month12',
        'month13', 'month14', 'month15', 'month16', 'month17', 'month18',
        'month19', 'month20', 'month21', 'month22', 'month23', 'month24',
        'month25', 'month26', 'month27', 'month28', 'month29', 'month30',
        'month31', 'month32', 'month33', 'month34', 'month35', 'month36',
      ];
      const time = new Date(value).getTime();
      const timeNow = new Date().getTime();
      if (time > 0) {
        if (time < timeNow) {
          if (this.year === year) {
            const result = month - this.month;
            if (result) {
              for (let i = 0; i < FirstRunRate.length; i++) {
                for (let start = 0; start < 36; start++) {
                  if (start < (result + 1)) {
                    if (!this.initiativeService.viewMode) FirstRunRate.at(i).get('monthRows3').get([monthRunRateArray[start]]).enable();
                  } else {
                    FirstRunRate.at(i).get('monthRows3').get([monthRunRateArray[start]]).disable();
                  }
                }
              }
            } else {
              for (let i = 0; i < FirstRunRate.length; i++) {
                if (!this.initiativeService.viewMode) FirstRunRate.at(i).get('monthRows3').get('month1').enable();
                for (let start = 0; start < 36; start++) {
                  if (start === 0) {
                    if (!this.initiativeService.viewMode) FirstRunRate.at(i).get('monthRows3').get([monthRunRateArray[start]]).enable();
                  } else {
                    FirstRunRate.at(i).get('monthRows3').get([monthRunRateArray[start]]).disable();
                  }
                }
              }
            }
          } else {
            const result = month + (((year - this.year) * 12) - this.month);
            for (let i = 0; i < FirstRunRate.length; i++) {
              for (let start = 0; start < 36; start++) {
                if (start < (result + 1)) {
                  if (!this.initiativeService.viewMode) FirstRunRate.at(i).get('monthRows3').get([monthRunRateArray[start]]).enable();
                }
              }
            }
          }
        } else {
          for (let i = 0; i < FirstRunRate.length; i++) {
            for (let start = 0; start < 36; start++) {
              FirstRunRate.at(i).get('monthRows3').get([monthRunRateArray[start]]).disable();
            }
          }
        }
      }
    }
  }

  CalculateMonthYear() {
    this.itemsMonth = [];
    this.itemsMonthDateTime = [];
    for (let i = 0; i <= 35; i++) {
      this.month++;
      if (this.month > 12) {
        this.year = ++this.year;
        this.month = this.month - 12;
      }
      this.itemsMonth.push((this.months[this.month]) + ' ' + this.year);
      let data: {
        year: string;
        month: number
      } = {
        year: this.year.toString(),
        month: this.month
      }
      this.itemsMonthDateTime.push(this.dateUtil.GetMinDate(data));
    }
  }

  InitialShareBenefitFrom(): FormGroup {
    return this.fb.group({ id: [0], workstream: null, percent: null, initiativeId: this.id });
  }

  AddShareBenefit() {
    const control = this.ShareBenefitFrom.get('shareBenefitWorkstreams') as FormArray;
    control.push(this.InitialShareBenefitFrom());
    this.isRemoveShareBenefit = control.length > 1 ? false : true;
  }

  RemovedShareBenefit(index: number) {
    const control = this.ShareBenefitFrom.get('shareBenefitWorkstreams') as FormArray;
    control.removeAt(index);
    this.ShareBenefitFrom.markAsDirty();
    this.isRemoveShareBenefit = control.length > 1 ? false : true;
    this.CheckPercent();
  }

  InitialFirstRunRate(): FormGroup {
    return this.fb.group({
      id: [0],
      typeOfBenefitGroup: 'recurring',
      impactTypeOfBenefitTable: null,
      typeOfBenefit: [],
      versionPrice: this.fb.group({
        row1: 'Target',
        row2: 'Revise',
        row3: 'Actual',
      }),
      runRate: this.fb.group({
        row1: null,
        row2: null,
        row3: null,
      }),
      monthRows1: this.fb.group(this.monthObject),
      monthRows2: this.fb.group(this.monthObject),
      monthRows3: this.fb.group(this.monthObject)
    });
  }

  InitialTypeBenefit(): FormGroup {
    return this.fb.group({
      id: [0],
      typeOfBenefitGroup: null,
      impactTypeOfBenefitTable: null,
      currencyFloatFx: null,
      typeOfBenefit: null,
      versionPrice: this.fb.group({
        row1: null,
        row2: null
      }),
      runRate: this.fb.group({
        row1: null,
        row2: null,
      }),
      monthRows1: this.fb.group(this.monthObject),
      monthRows2: this.fb.group(this.monthObject)
    });
  }

  InitialIndirect(): FormGroup {
    return this.fb.group({
      id: [0],
      typeOfBenefitGroup: 'recurring',
      impactTypeOfBenefitTable: null,
      typeOfBenefit: null,
      versionPrice: this.fb.group({
        row1: 'Target',
        row2: 'Revise',
      }),
      runRate: this.fb.group({
        row1: null,
        row2: null,
      })
    });
  }

  //new row
  InitialFirstRunRateAddRow(): FormGroup {
    return this.fb.group({
      id: [0],
      impactTypeOfBenefitTable: "FirstRunRate",
      typeOfBenefitGroup: 'recurring',
      typeOfBenefit: [],
      versionPrice: this.fb.group({
        row1: 'Target',
        row2: 'Revise',
        row3: 'Actual',
      }),
      runRate: this.fb.group({
        row1: { value: null, disabled: true },
        row2: { value: null, disabled: true },
        row3: { value: null, disabled: true },
      }),
      monthRows1: this.fb.group(this.monthObjectAddRow),
      monthRows2: this.fb.group(this.monthObjectAddRow),
      monthRows3: this.fb.group(this.monthObjectAddRow)
    });
  }

  InitialTypeBenefitAddRow(): FormGroup {
    return this.fb.group({
      id: [0],
      typeOfBenefitGroup: null,
      impactTypeOfBenefitTable: "TypeBenefit",
      currencyFloatFx: null,
      typeOfBenefit: null,
      versionPrice: this.fb.group({
        row1: null,
        row2: null
      }),
      runRate: this.fb.group({
        row1: null,
        row2: null,
      }),
      monthRows1: this.fb.group(this.monthObjectAddRow),
      monthRows2: this.fb.group(this.monthObjectAddRow)
    });
  }

  InitialIndirectAddRow(): FormGroup {
    return this.fb.group({
      id: [0],
      typeOfBenefitGroup: 'recurring',
      impactTypeOfBenefitTable: "IndirectBenefit",
      typeOfBenefit: null,
      versionPrice: this.fb.group({
        row1: 'Target',
        row2: 'Revise',
      }),
      runRate: this.fb.group({
        row1: null,
        row2: null,
      })
    });
  }

  ChangeTypeOfBenefitGroup(event, index) {
    const FirstRunRate = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    const TypeBenefit = this.TypeBenefitForm.get('typeBenefitTable') as FormArray;

    FirstRunRate.at(index).patchValue({ typeOfBenefit: null });
    TypeBenefit.at(index).patchValue({ typeOfBenefit: null });

    FirstRunRate.at(index).disable();
    if (!this.initiativeService.viewMode) FirstRunRate.at(index).get('typeOfBenefit').enable();

    TypeBenefit.at(index).disable();
    if (!this.initiativeService.viewMode) TypeBenefit.at(index).get('typeOfBenefit').enable();

    switch (event.target.value) {
      case 'recurring':
        this.recurring = this.recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'Recurring' && (obj.typeOfBenefitTitle.indexOf('Indirect') === -1));
        this.recurringAndOneTimeArray[index] = this.recurring;
        break;
      case 'onetime':
        this.onetime = this.recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'One time' && (obj.typeOfBenefitTitle.indexOf('Indirect') === -1));
        this.recurringAndOneTimeArray[index] = this.onetime;
        break;
    }
  }

  ChangeIndirectGroup(event, index) {
    const Indirect = this.IndirectForm.get('indirectTable') as FormArray;

    // runRate: this.fb.group({
    //   row1: { value: null, disabled: true },
    //   row2: { value: null, disabled: true },
    // })
    Indirect.at(index).patchValue({
      typeOfBenefit: null
    });
    Indirect.at(index).get('runRate').patchValue({
      row1: null,
      row2: null
    });


    if (!this.initiativeService.viewMode) Indirect.at(index).get('typeOfBenefit').enable();

    switch (event.target.value) {
      case 'recurring':
        this.recurringIndirect = this.recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'Recurring' && (obj.typeOfBenefitTitle.indexOf('Indirect') !== -1));
        this.recurringAndOneTimeIndirect[index] = this.recurringIndirect;
        this.changeIndirectValue(index);
        break;
      case 'onetime':
        this.onetimeIndirect = this.recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'One time' && (obj.typeOfBenefitTitle.indexOf('Indirect') !== -1));
        this.recurringAndOneTimeIndirect[index] = this.onetimeIndirect;
        this.changeIndirectValue(index);
        break;
    }
  }

  changeIndirectValue(index) {
    let IndirectTable = this.IndirectForm.get('indirectTable') as FormArray;
    const totalRecurring = [];
    let totalRecurringSum = 0;

    const totalOnetime = [];
    let totalOnetimeSum = 0;

    for (let i = 0; i < IndirectTable.length; i++) {
      const typeOfBenefit = this.recurringAndOneTime.filter(
        obj => obj.typeOfBenefitCode === IndirectTable.at(i).get('typeOfBenefit').value
      );
      if (typeOfBenefit.length !== 0) {
        // FirstRunRateTotal.at(i).enable();
        switch (typeOfBenefit[0].typeOfBenefitGroup) {
          case 'Recurring':
            if (IndirectTable.at(i).get('runRate').value.row3) {
              totalRecurring.push(Number(IndirectTable.at(i).get('runRate').value.row3));
            } else if (IndirectTable.at(i).get('runRate').value.row2) {
              totalRecurring.push(Number(IndirectTable.at(i).get('runRate').value.row2));
            } else if (IndirectTable.at(i).get('runRate').value.row1) {
              totalRecurring.push(Number(IndirectTable.at(i).get('runRate').value.row1));
            }
            break;
          case 'One time':
            if (IndirectTable.at(i).get('runRate').value.row3) {
              totalOnetime.push(parseFloat(this.round(IndirectTable.at(i).get('runRate').value.row3 * 0.1, 3)));
            } else if (IndirectTable.at(i).get('runRate').value.row2) {
              totalOnetime.push(parseFloat(this.round(IndirectTable.at(i).get('runRate').value.row2 * 0.1, 3)));
            } else if (IndirectTable.at(i).get('runRate').value.row1) {
              totalOnetime.push(parseFloat(this.round(IndirectTable.at(i).get('runRate').value.row1 * 0.1, 3)));
            }
            break;
        }
      }
    }

    totalRecurringSum = totalRecurring.reduce((a, b) => a + b, 0);
    totalOnetimeSum = totalOnetime.reduce((a, b) => a + b, 0);

    this.formGroup.get('DetailMaxForm').patchValue({ indirectBenefit: parseFloat(this.round(totalRecurringSum, 2)) + parseFloat(this.round(totalOnetimeSum, 2)) });
    IndirectTable.at(index).get('runRate').disable();
  }

  StageCheck(i) {
    this.stage = this.initiativeService.suggestionStatus?.stage;
    const FirstRunRateForm = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    const stage1 = this.stageService.impactRunRateTraget;
    const stage2 = this.stageService.impactRunRateRevise;
    const stage3 = this.stageService.impactRunRateActual;
    // const stage1 = ['IL0', 'SIL1', 'IL1', 'SIL2', 'IL2', 'SIL3'];
    // const stage2 = ['IL3-2', 'SIL4'];
    // const stage3 = ['IL4', 'SIL5', 'IL5'];
    if (stage1.indexOf(this.stage) !== -1) {
      FirstRunRateForm.at(i).get('runRate').get('row2').disable();
      FirstRunRateForm.at(i).get('runRate').get('row3').disable();
      Object.keys(this.monthObject).forEach(name => {
        FirstRunRateForm.at(i).get('monthRows2').get([name]).disable();
        FirstRunRateForm.at(i).get('monthRows3').get([name]).disable();
      });

    } else if (stage2.indexOf(this.stage) !== -1) {
      if (FirstRunRateForm.at(i).get('runRate').value.row1 === FirstRunRateForm.at(i).get('runRate').value.row2) {
        FirstRunRateForm.at(i).get('runRate').patchValue({ row2: FirstRunRateForm.at(i).get('runRate').value.row1 });
        FirstRunRateForm.at(i).get('runRate').get('row1').disable();
        FirstRunRateForm.at(i).get('runRate').get('row3').disable();
        Object.keys(this.monthObject).forEach(name => {
          // FirstRunRateForm.at(i).get('monthRows2').patchValue({ [name]: FirstRunRateForm.at(i).get('monthRows1').value[name] });
          FirstRunRateForm.at(i).get('monthRows1').get([name]).disable();
          FirstRunRateForm.at(i).get('monthRows3').get([name]).disable();
        });

      } else if (FirstRunRateForm.at(i).get('runRate').value.row1 !== FirstRunRateForm.at(i).get('runRate').value.row2) {
        if (FirstRunRateForm.at(i).get('runRate').value.row2 || FirstRunRateForm.at(i).get('runRate').value.row2 === 0 || FirstRunRateForm.at(i).get('runRate').value.row2 === '0.000') {
          FirstRunRateForm.at(i).get('runRate').patchValue({ row2: FirstRunRateForm.at(i).get('runRate').value.row2 });
          FirstRunRateForm.at(i).get('runRate').get('row1').disable();
          FirstRunRateForm.at(i).get('runRate').get('row3').disable();
          Object.keys(this.monthObject).forEach(name => {
            FirstRunRateForm.at(i).get('monthRows2').patchValue({ [name]: FirstRunRateForm.at(i).get('monthRows2').value[name] });
            FirstRunRateForm.at(i).get('monthRows1').get([name]).disable();
            FirstRunRateForm.at(i).get('monthRows3').get([name]).disable();
          });

        } else {
          FirstRunRateForm.at(i).get('runRate').patchValue({ row2: FirstRunRateForm.at(i).get('runRate').value.row2 });
          FirstRunRateForm.at(i).get('runRate').get('row1').disable();
          FirstRunRateForm.at(i).get('runRate').get('row3').disable();
          Object.keys(this.monthObject).forEach(name => {
            const monthRow2 = FirstRunRateForm.at(i).get('monthRows2').value[name];
            if (monthRow2 === 0 || monthRow2 === '0') {
              FirstRunRateForm.at(i).get('monthRows2').patchValue({ [name]: 0 });
            } else {
              FirstRunRateForm.at(i).get('monthRows2').patchValue({ [name]: FirstRunRateForm.at(i).get('monthRows2').value[name] });
            }
            FirstRunRateForm.at(i).get('monthRows1').get([name]).disable();
            FirstRunRateForm.at(i).get('monthRows3').get([name]).disable();
          });
          this.CalculateMonthTotal(i, 'row2', 'monthRows2', null, 'stageCheck');
        }
      }
    } else if (stage3.indexOf(this.stage) !== -1) {
      FirstRunRateForm.at(i).get('runRate').get('row1').disable();
      FirstRunRateForm.at(i).get('runRate').get('row2').disable();
      if (this.stage === 'IL5') {
        FirstRunRateForm.at(i).get('runRate').get('row3').disable();
      }
      Object.keys(this.monthObject).forEach(name => {
        FirstRunRateForm.at(i).get('monthRows1').get([name]).disable();
        FirstRunRateForm.at(i).get('monthRows3').get([name]).disable();
      });
      this.ChangeMonth(this.ImpactForm.controls.firstRunRateMonth.value);
    }
  }

  ChangeTypeOfBenefit(i) {
    switch (this.stage) {
      case 'IL1':
      case 'IL3-2':
      case 'IL4':
        this.TypeOfBenefit = false;
        break;
    }
    const FirstRunRateForm = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    const TypeBenefitForm = this.TypeBenefitForm.get('typeBenefitTable') as FormArray;

    if (!this.initiativeService.viewMode) FirstRunRateForm.at(i).enable();
    if (!this.initiativeService.viewMode) TypeBenefitForm.at(i).enable();

    const typeOfBenefit = this.recurringAndOneTime.filter(
      obj => obj.typeOfBenefitCode === FirstRunRateForm.at(i).get('typeOfBenefit').value
    );

    this.StageCheck(i);

    if (typeOfBenefit.length > 0 && typeOfBenefit[0].typeOfBenefitGroup) {
      this.isOpenCopy = false;
      this.groupBenefit[i] = typeOfBenefit[0].typeOfBenefitGroup;
      this.titleBenefit[i] = typeOfBenefit[0].typeOfBenefitTitle;
    }

    TypeBenefitForm.at(i).patchValue({ typeOfBenefit: FirstRunRateForm.at(i).get('typeOfBenefit').value });

    const monthObject = { row1: 'monthRows1', row2: 'monthRows2', row3: 'monthRows3' };
    for (const [row, monthRow] of Object.entries(monthObject)) {
      this.CalculateMonthTotal(i, row, monthRow, null, 'stageCheck');
      this.CalculateRunRateTotal(row);
      if (row !== 'row3') {
        this.CalculateMonthBenefitTotal(i, row, monthRow);
        this.CalculateBenefitTotal(row);
      }
    }
  }

  ChangeIndirect(i) {

    const Indirect = this.IndirectForm.get('indirectTable') as FormArray;

    if (!this.initiativeService.viewMode) Indirect.at(i).enable();

    const typeOfBenefit = this.recurringAndOneTime.filter(obj => obj.typeOfBenefitCode === Indirect.at(i).get('typeOfBenefit').value);

    if (typeOfBenefit[0].typeOfBenefitGroup) { this.titleIndirect[i] = typeOfBenefit[0].typeOfBenefitTitle; }
  }

  FixPosition(event) {
    if (event.data === '-' || event.data === '0' || event.data === null || event.data === '.') {
      const text = event.target;
      const start = text.selectionStart;
      text.value = event.target.value;
      text.focus();
      const caretPos = start + event.target.value.length;
      text.setSelectionRange(caretPos, caretPos);
    }
  }

  CalculateRunRateTotal(Row, event?) {

    if (event) { this.FixPosition(event); }

    const FirstRunRate = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;

    const runRateRow = [];
    let runRateRowSum = null;

    for (let i = 0; i < FirstRunRate.length; i++) {
      const typeOfBenefit = this.recurringAndOneTime.filter(
        obj => obj.typeOfBenefitCode === FirstRunRate.at(i).get('typeOfBenefit').value
      );
      if (typeOfBenefit.length !== 0) {
        switch (typeOfBenefit[0].typeOfBenefitGroup) {
          case 'Recurring':
            if (this.checkNullValue((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue()[Row])) {
              runRateRow.push(parseFloat((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue()[Row]));
            }
            break;
          case 'One time':
            if (this.checkNullValue((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue()[Row])) {
              runRateRow.push(parseFloat(this.round(((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue()[Row] * 0.1), 3)));
            }
            break;
        }
      }
    }

    if (runRateRow.length > 0) {
      runRateRowSum = 0;
      runRateRowSum = runRateRow.reduce((a, b) => a + b, 0);
    }

    this.FirstRunRateTotalForm.get('runRate').patchValue({
      [Row]: runRateRowSum != null && runRateRowSum.toString().length > 0 ? parseFloat(this.round(runRateRowSum, 3)) : null
    });

    const iL4RunRateRecurring = [];
    let iL4RunRateRecurringSum = null;

    const iL5RunRateRecurring = [];
    let iL5RunRateRecurringSum = null;

    const iL4RunRateOnetime = [];
    let iL4RunRateOnetimeSum = null;

    const iL5RunRateOnetime = [];
    let iL5RunRateOnetimeSum = null;

    for (let i = 0; i < FirstRunRate.length; i++) {
      const typeOfBenefit = this.recurringAndOneTime.filter(
        obj => obj.typeOfBenefitCode === FirstRunRate.at(i).get('typeOfBenefit').value
      );
      if (typeOfBenefit.length !== 0) {
        switch (typeOfBenefit[0].typeOfBenefitGroup) {
          case 'Recurring':
            if (this.checkNullValue((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue().row2)) {
              iL4RunRateRecurring.push(Number((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue().row2));
            }
            if (this.checkNullValue((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue().row3)) {
              iL5RunRateRecurring.push(Number((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue().row3));
            }
            break;
          case 'One time':
            if (this.checkNullValue((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue().row2)) {
              iL4RunRateOnetime.push(parseFloat(this.round((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue().row2 * 0.1, 3)));
            }
            if (this.checkNullValue((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue().row3)) {
              iL5RunRateOnetime.push(parseFloat(this.round((FirstRunRate.at(i).get('runRate') as FormGroup).getRawValue().row3 * 0.1, 3)));
            }
            break;
        }
      }
    }

    if (iL4RunRateRecurring.length > 0) {
      iL4RunRateRecurringSum = 0;
      iL4RunRateRecurringSum = iL4RunRateRecurring.reduce((a, b) => a + b, 0);
    }

    if (iL4RunRateOnetime.length > 0) {
      iL4RunRateOnetimeSum = 0;
      iL4RunRateOnetimeSum = iL4RunRateOnetime.reduce((a, b) => a + b, 0);
    }

    if (iL5RunRateRecurring.length > 0) {
      iL5RunRateRecurringSum = 0;
      iL5RunRateRecurringSum = iL5RunRateRecurring.reduce((a, b) => a + b, 0);
    }
    if (iL5RunRateOnetime.length > 0) {
      iL5RunRateOnetimeSum = 0;
      iL5RunRateOnetimeSum = iL5RunRateOnetime.reduce((a, b) => a + b, 0);
    }
    const stageIL3 = ['IL3-2', 'Implement IL3', 'Adopt IL3 - Golive', 'Adopt IL3'];
    if (stageIL3.indexOf(this.stage) !== -1) {
      this.iL4RunRateRecurringSum = iL4RunRateRecurringSum;
      this.iL4RunRateOnetimeSum = iL4RunRateOnetimeSum;
      this.ImpactForm.patchValue({
        iL4RunRateRecurring: iL4RunRateRecurringSum ? this.round(iL4RunRateRecurringSum, 3) : null,
        iL4RunRateOnetime: iL4RunRateOnetimeSum ? this.round(iL4RunRateOnetimeSum, 3) : null
      });
    }

    const stageIL4 = ['IL4', 'Adopt IL4'];
    if (stageIL4.indexOf(this.stage) !== -1) {
      this.iL5RunRateRecurringSum = iL5RunRateRecurringSum;
      this.iL5RunRateOnetimeSum = iL5RunRateOnetimeSum;
      this.ImpactForm.patchValue({
        iL5RunRateRecurring: iL5RunRateRecurringSum ? this.round(iL5RunRateRecurringSum, 3) : null,
        iL5RunRateOnetime: iL5RunRateOnetimeSum ? this.round(iL5RunRateOnetimeSum, 3) : null
      });
    }

    this.CalculateTotal(event);


  }

  CalculateMonthTotal(index, Row, monthRow, event?, mode?) {

    if (event) { this.FixPosition(event); }

    const FirstRunRate = this.ImpactForm.get('FirstRunRateForm').get('firstRunRateTable') as FormArray;
    Object.keys(this.monthObject).forEach(name => {
      this.monthObjectArray[name] = [];
      this.monthObjectSumRow[name] = 0;
    });

    const monthRunRateArray = [
      'month1', 'month2', 'month3', 'month4', 'month5', 'month6',
      'month7', 'month8', 'month9', 'month10', 'month11', 'month12',
      'month13', 'month14', 'month15', 'month16', 'month17', 'month18',
      'month19', 'month20', 'month21', 'month22', 'month23', 'month24',
      'month25', 'month26', 'month27', 'month28', 'month29', 'month30',
      'month31', 'month32', 'month33', 'month34', 'month35', 'month36',
    ];

    const FirstRunRateMonthRow = {
      row1: this.monthObjectArray,
      row2: this.monthObjectArray,
      row3: this.monthObjectArray
    };

    const FirstRunRateMonthRowSum = {
      row1: this.monthObjectSumRow,
      row2: this.monthObjectSumRow,
      row3: this.monthObjectSumRow
    };

    const FirstRunRateYearRow = {
      row1: [],
      row2: [],
      row3: []
    };

    const FirstRunRateYearRowSum = {
      row1: 0,
      row2: 0,
      row3: 0
    };

    this.isCheckRecurring = [];
    this.isCheckOneTime = [];
    for (let i = 0; i < FirstRunRate.length; i++) {
      const typeOfBenefit = this.recurringAndOneTime.filter(
        obj => obj.typeOfBenefitCode === FirstRunRate.at(i).get('typeOfBenefit').value
      );
      if (typeOfBenefit.length !== 0) {
        switch (typeOfBenefit[0].typeOfBenefitGroup) {
          case 'Recurring':
            this.isCheckRecurring.push(true);
            this.isCheckOneTime.push(false);
            Object.keys(this.monthObject).forEach(name => {
              FirstRunRateMonthRow[Row][name].push((FirstRunRate.at(i).get(monthRow) as FormGroup).getRawValue()[name] != null && (FirstRunRate.at(i).get(monthRow) as FormGroup).getRawValue()[name] != undefined && (FirstRunRate.at(i).get(monthRow) as FormGroup).getRawValue()[name]?.toString().length != 0 ? Number((FirstRunRate.at(i).get(monthRow) as FormGroup).getRawValue()[name]) : null);
            });
            break;
          case 'One time':
            this.isCheckRecurring.push(false);
            this.isCheckOneTime.push(true);
            Object.keys(this.monthObject).forEach(name => {
              FirstRunRateMonthRow[Row][name].push((FirstRunRate.at(i).get(monthRow) as FormGroup).getRawValue()[name] != null && (FirstRunRate.at(i).get(monthRow) as FormGroup).getRawValue()[name] != undefined && (FirstRunRate.at(i).get(monthRow) as FormGroup).getRawValue()[name]?.toString().length != 0 ? parseFloat(this.round((FirstRunRate.at(i).get(monthRow) as FormGroup).getRawValue()[name] * 0.1, 3)) : null);
            });
            break;
        }
      }
    }

    Object.keys(this.monthObject).forEach(name => {
      FirstRunRateMonthRowSum[Row][name] = FirstRunRateMonthRow[Row][name].every(x => x == null) ? null : FirstRunRateMonthRow[Row][name].reduce((a, b) => a + b, null);
    });

    Object.keys(this.monthObject).forEach(name => {
      this.FirstRunRateTotalForm.get(monthRow).patchValue({
        [name]: FirstRunRateMonthRowSum[Row][name] != null && FirstRunRateMonthRowSum[Row][name] != undefined && FirstRunRateMonthRowSum[Row][name]?.toString().length != 0 ? parseFloat(this.round(FirstRunRateMonthRowSum[Row][name], 3)) : null
      });
    });

    for (let start = 0; start < 36; start++) {
      if (FirstRunRate.at(index).get(monthRow).value[monthRunRateArray[start]]) {
        this.startRunRate = start;
        break;
      }
    }

    if (this.startRunRate != null) {
      monthRunRateArray.forEach((month, i) => {
        if ((this.startRunRate <= i) && (i < (this.startRunRate + 12))) {
          FirstRunRateYearRow[Row].push(FirstRunRate.at(index).get(monthRow).value[month] != null && FirstRunRate.at(index).get(monthRow).value[month] != undefined && FirstRunRate.at(index).get(monthRow).value[month]?.toString().length != 0 ? Number(FirstRunRate.at(index).get(monthRow).value[month]) : null);
        }
      });
    }

    var tmpSumRunRate = null;
    FirstRunRateYearRow[Row].forEach(val => {
      if (val != null && val != undefined) {
        if (tmpSumRunRate == null) {
          tmpSumRunRate = 0;
        }
        tmpSumRunRate += val;
      }
    });
    FirstRunRateYearRowSum[Row] = tmpSumRunRate;
    if (FirstRunRateYearRowSum[Row] != null && FirstRunRateYearRowSum[Row] != undefined && FirstRunRateYearRowSum[Row]?.toString().length != 0) FirstRunRateYearRowSum[Row] = parseFloat(this.round(FirstRunRateYearRowSum[Row], 3));

    var oldValueRunRate = (FirstRunRate.at(index).get('runRate') as FormGroup)?.getRawValue()[Row];

    //const stage = ['IL4', 'SIL5', 'IL5'];
    const stage = ['IL4', 'SIL5', 'IL5'];
    if (!(stage.indexOf(this.stage) !== -1)) {
      FirstRunRate.at(index).get('runRate').patchValue({
        // [Row]: FirstRunRateYearRowSum[Row]
        [Row]: FirstRunRateYearRowSum[Row] != null && FirstRunRateYearRowSum[Row] != undefined && FirstRunRateYearRowSum[Row]?.toString().length != 0 ? FirstRunRateYearRowSum[Row] : null
      });

      if (mode == 'deleteRow' || mode == 'stageCheck') {
        if (oldValueRunRate != null && oldValueRunRate != undefined) {
          FirstRunRate.at(index).get('runRate').patchValue({
            [Row]: oldValueRunRate != null && oldValueRunRate != undefined && oldValueRunRate?.toString().length != 0 ? parseFloat(this.round(oldValueRunRate, 3)) : null
          });
        }
      }
    }
    // if ((this.stageService.impactRunRateTraget.map(x => x.toUpperCase()).indexOf(this.stage) !== -1) && Row === 'row1') {
    //   }
    // }
    // if ((this.stageService.impactRunRateRevise.map(x => x.toUpperCase()).indexOf(this.stage) !== -1) && Row === 'row2') {
    //   FirstRunRate.at(index).get('runRate').patchValue({
    //     // [Row]: FirstRunRateYearRowSum[Row]
    //     row2: FirstRunRateYearRowSum[Row] != null && FirstRunRateYearRowSum[Row] != undefined ? FirstRunRateYearRowSum[Row] : null
    //   });

    //   if (mode == 'deleteRow' || mode == 'stageCheck') {
    //     if (oldValueRunRate != null && oldValueRunRate != undefined && oldValueRunRate?.toString().length != 0) {
    //       FirstRunRate.at(index).get('runRate').patchValue({
    //         row2: oldValueRunRate != null && oldValueRunRate != undefined ? Number(oldValueRunRate).toFixed(3) : null
    //       });
    //     }
    //   }
    // }
    // if ((this.stageService.impactRunRateActual.map(x => x.toUpperCase()).indexOf(this.stage) !== -1) && Row === 'row3') {
    //   FirstRunRate.at(index).get('runRate').patchValue({
    //     // [Row]: FirstRunRateYearRowSum[Row]
    //     row3: FirstRunRateYearRowSum[Row] != null && FirstRunRateYearRowSum[Row] != undefined ? FirstRunRateYearRowSum[Row] : null
    //   });

    //   if (mode == 'deleteRow' || mode == 'stageCheck') {
    //     if (oldValueRunRate != null && oldValueRunRate != undefined && oldValueRunRate?.toString().length != 0) {
    //       FirstRunRate.at(index).get('runRate').patchValue({
    //         row3: oldValueRunRate != null && oldValueRunRate != undefined ? Number(oldValueRunRate).toFixed(3) : null
    //       });
    //     }
    //   }
    // }

    this.CalculateRunRateTotal(Row);
  }


  CalculateBenefitTotal(Row, event?) {

    if (event) { this.FixPosition(event); }

    const TypeBenefit = this.TypeBenefitForm.get('typeBenefitTable') as FormArray;
    const runRateRow = [];
    let runRateRowSum = 0;
    for (let i = 0; i < TypeBenefit.length; i++) {
      const typeOfBenefit = this.recurringAndOneTime.filter(
        obj => obj.typeOfBenefitCode === TypeBenefit.at(i).get('typeOfBenefit').value
      );
      if (typeOfBenefit.length !== 0) {
        switch (typeOfBenefit[0].typeOfBenefitGroup) {
          case 'Recurring':
            runRateRow.push(Number(TypeBenefit.at(i).get('runRate').value[Row]));
            break;
          case 'One time':
            runRateRow.push(parseFloat(this.round(TypeBenefit.at(i).get('runRate').value[Row] * 0.1, 3)));
            break;
        }
      }
    }
    runRateRowSum = runRateRow.reduce((a, b) => a + b, 0);
    this.TypeBenefitTotalForm.get('runRate').patchValue({ [Row]: runRateRowSum ? runRateRowSum : null });

    const iL5FixedFxRecurring = [];
    let iL5FixedFxRecurringSum = null;

    const iL5FloatFxRecurring = [];
    let iL5FloatFxRecurringSum = null;

    const iL5FixedFxOnetime = [];
    let iL5FixedFxOnetimeSum = null;

    const iL5FloatFxOnetime = [];
    let iL5FloatFxOnetimeSum = null;

    for (let i = 0; i < TypeBenefit.length; i++) {
      const typeOfBenefit = this.recurringAndOneTime.filter(
        obj => obj.typeOfBenefitCode === TypeBenefit.at(i).get('typeOfBenefit').value
      );
      if (typeOfBenefit.length !== 0) {
        let fixedRate = (Number(TypeBenefit.at(i).get('versionPrice').value.row1)) ? TypeBenefit.at(i).get('versionPrice').value.row1 : 1;
        let floatRate = (Number(TypeBenefit.at(i).get('versionPrice').value.row2)) ? TypeBenefit.at(i).get('versionPrice').value.row2 : 1;
        switch (typeOfBenefit[0].typeOfBenefitGroup) {
          case 'Recurring':
            // temporary solution
            if (this.checkNullValue(TypeBenefit.at(i).get('runRate').value.row1)) {
              iL5FixedFxRecurring.push(Number(TypeBenefit.at(i).get('runRate').value.row1) * fixedRate);
              // iL5FixedFxRecurring.push(Number(TypeBenefit.at(i).get('runRate').value.row1));
            }
            if (this.checkNullValue(TypeBenefit.at(i).get('runRate').value.row2)) {
              iL5FloatFxRecurring.push(Number(TypeBenefit.at(i).get('runRate').value.row2) * floatRate);
              // iL5FloatFxRecurring.push(Number(TypeBenefit.at(i).get('runRate').value.row2));
            }
            break;
          case 'One time':
            if (this.checkNullValue(TypeBenefit.at(i).get('runRate').value.row1)) {
              iL5FixedFxRecurring.push(parseFloat(this.round(TypeBenefit.at(i).get('runRate').value.row1 * 0.1, 3)) * fixedRate);
              //iL5FixedFxOnetime.push(Number(TypeBenefit.at(i).get('runRate').value.row1 * 0.1));
            }
            if (this.checkNullValue(TypeBenefit.at(i).get('runRate').value.row2)) {
              iL5FixedFxRecurring.push(parseFloat(this.round(TypeBenefit.at(i).get('runRate').value.row2 * 0.1, 3)) * floatRate);
              //iL5FloatFxOnetime.push(Number(TypeBenefit.at(i).get('runRate').value.row2 * 0.1));
            }
            break;
        }
      }
    }
    if (iL5FixedFxRecurring.length > 0) {
      iL5FixedFxRecurringSum = 0
      iL5FixedFxRecurringSum = iL5FixedFxRecurring.reduce((a, b) => a + b, 0);
    }
    if (iL5FloatFxRecurring.length > 0) {
      iL5FloatFxRecurringSum = 0
      iL5FloatFxRecurringSum = iL5FloatFxRecurring.reduce((a, b) => a + b, 0);
    }
    if (iL5FixedFxOnetime.length > 0) {
      iL5FixedFxOnetimeSum = 0;
      iL5FixedFxOnetimeSum = iL5FixedFxOnetime.reduce((a, b) => a + b, 0);
    }
    if (iL5FloatFxOnetime.length > 0) {
      iL5FloatFxOnetimeSum = 0;
      iL5FloatFxOnetimeSum = iL5FloatFxOnetime.reduce((a, b) => a + b, 0);
    }

    this.ImpactForm.patchValue({ iL5FixedFxRecurring: iL5FixedFxRecurringSum ? this.round(iL5FixedFxRecurringSum, 3) : null });
    this.ImpactForm.patchValue({ iL5FloatFxRecurring: iL5FloatFxRecurringSum ? this.round(iL5FloatFxRecurringSum, 3) : null });
    this.ImpactForm.patchValue({ iL5FixedFxOnetime: iL5FixedFxOnetimeSum ? this.round(iL5FixedFxOnetimeSum, 3) : null });
    this.ImpactForm.patchValue({ iL5FloatFxOnetime: iL5FloatFxOnetimeSum ? this.round(iL5FloatFxOnetimeSum, 3) : null });

  }



  CalculateMonthBenefitTotal(index, Row, monthRow, event?, mode?) {

    if (event) { this.FixPosition(event); }

    const TypeBenefit = this.TypeBenefitForm.get('typeBenefitTable') as FormArray;

    Object.keys(this.monthObject).forEach(name => {
      this.monthObjectArray[name] = [];
      this.monthObjectSumRow[name] = 0;
    });

    const monthRunRateArray = [
      'month1', 'month2', 'month3', 'month4', 'month5', 'month6',
      'month7', 'month8', 'month9', 'month10', 'month11', 'month12',
      'month13', 'month14', 'month15', 'month16', 'month17', 'month18',
      'month19', 'month20', 'month21', 'month22', 'month23', 'month24',
      'month25', 'month26', 'month27', 'month28', 'month29', 'month30',
      'month31', 'month32', 'month33', 'month34', 'month35', 'month36',
    ];

    const TypeBenefitMonthRow = {
      row1: this.monthObjectArray,
      row2: this.monthObjectArray
    };

    const TypeBenefitMonthRowSum = {
      row1: this.monthObjectSumRow,
      row2: this.monthObjectSumRow
    };

    const TypeBenefitYearRow = {
      row1: [],
      row2: [],
      row3: []
    };

    const TypeBenefitYearRowSum = {
      row1: 0,
      row2: 0,
      row3: 0
    };

    for (let i = 0; i < TypeBenefit.length; i++) {
      const typeOfBenefit = this.recurringAndOneTime.filter(
        obj => obj.typeOfBenefitCode === TypeBenefit.at(i).get('typeOfBenefit').value
      );
      if (typeOfBenefit.length !== 0) {
        switch (typeOfBenefit[0].typeOfBenefitGroup) {
          case 'Recurring':
            Object.keys(this.monthObject).forEach(name => {
              TypeBenefitMonthRow[Row][name].push(Number(TypeBenefit.at(i).get(monthRow).value[name]));
            });
            break;
          case 'One time':
            Object.keys(this.monthObject).forEach(name => {
              TypeBenefitMonthRow[Row][name].push(parseFloat(this.round(TypeBenefit.at(i).get(monthRow).value[name] * 0.1, 3)));
            });
            break;
        }
      }
    }

    Object.keys(this.monthObject).forEach(name => {
      TypeBenefitMonthRowSum[Row][name] = TypeBenefitMonthRow[Row][name].reduce((a, b) => a + b, 0);
    });

    Object.keys(this.monthObject).forEach(name => {
      this.TypeBenefitTotalForm.get(monthRow).patchValue({
        [name]: TypeBenefitMonthRowSum[Row][name] ? TypeBenefitMonthRowSum[Row][name] : null
      });
    });

    for (let start = 0; start < 36; start++) {
      if (TypeBenefit.at(index).get(monthRow).value[monthRunRateArray[start]]) {
        this.startBenefit = start;
        break;
      }
    }

    if (this.startBenefit != null) {
      monthRunRateArray.forEach((month, i) => {
        if ((this.startBenefit <= i) && (i < (this.startBenefit + 12))) {
          TypeBenefitYearRow[Row].push(Number(TypeBenefit.at(index).get(monthRow).value[month]));
        }
      });
    }

    var tmpSumRunRate = null;
    TypeBenefitYearRow[Row].forEach(val => {
      if (val != null && val != undefined) {
        if (tmpSumRunRate == null) {
          tmpSumRunRate = 0;
        }
        tmpSumRunRate += val;
      }
    });

    TypeBenefitYearRowSum[Row] = tmpSumRunRate;
    var oldValueRunRate = (TypeBenefit.at(index).get('runRate') as FormGroup)?.getRawValue()[Row];
    TypeBenefit.at(index).get('runRate').patchValue({ [Row]: TypeBenefitYearRowSum[Row] });

    if (mode == 'deleteRow') {
      if (oldValueRunRate != null && oldValueRunRate != undefined) {
        TypeBenefit.at(index).get('runRate').patchValue({
          [Row]: oldValueRunRate != null && oldValueRunRate != undefined ? parseFloat(this.round(oldValueRunRate, 3)) : null
        });
      }
    }

    this.CalculateBenefitTotal(Row);
  }

  CalculateImpiemantCostTotal(Row, monthRow) {
    const ImpiemantCostMonthRow = { row1: [], row2: [] };
    const ImpiemantCostMonthRowSum = { row1: 0, row2: 0 };
    Object.keys(this.monthObject).forEach(name => {
      if (this.checkNullValue(this.ImpiemantCostForm.controls[monthRow].value[name])) {
        ImpiemantCostMonthRow[Row].push(Number(this.ImpiemantCostForm.controls[monthRow].value[name]));
      }
    });
    if (ImpiemantCostMonthRow[Row].length > 0) {
      ImpiemantCostMonthRowSum[Row] = ImpiemantCostMonthRow[Row].reduce((a, b) => a + b, 0);
    } else {
      ImpiemantCostMonthRowSum[Row] = null;
    }
    this.ImpiemantCostForm.get('runRate').patchValue({ [Row]: ImpiemantCostMonthRowSum[Row] ? ImpiemantCostMonthRowSum[Row] : null });
    let totalActual = this.ImpactForm.get('ImpiemantCostForm') ? this.ImpactForm.get('ImpiemantCostForm').get('runRate').get('row2').value : null;
    let totalEstimateCost = this.ImpactForm.get('ImpiemantCostForm') ? this.ImpactForm.get('ImpiemantCostForm').get('runRate').get('row1').value : null;

    if (totalActual != null && totalActual != "") {
      this.formGroup.get('initiativesForm').get('costEstOpex').setValue(totalActual);
    } else {
      this.formGroup.get('initiativesForm').get('costEstOpex').setValue(totalEstimateCost);
    }
  }

  updateTotalCostOpex() {
    let totalEstimateCost = this.ImpactForm.get('ImpiemantCostForm') ? this.ImpactForm.get('ImpiemantCostForm').get('runRate').get('row1').value : null;
    let totalActual = this.ImpactForm.get('ImpiemantCostForm') ? this.ImpactForm.get('ImpiemantCostForm').get('runRate').get('row2').value : null;
    if (totalActual != null && totalActual != "") {
      this.formGroup.get('initiativesForm').get('costEstOpex').setValue(totalActual);
    } else {
      this.formGroup.get('initiativesForm').get('costEstOpex').setValue(totalEstimateCost);
    }
  }

  UpdatePatch(index, row, monthRow, month, num) {
    const FirstRunRate = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    if (this.isAutoCalculate) {
      if (row !== 'row3') {
        const typeOfBenefit = this.recurringAndOneTime.filter(
          obj => obj.typeOfBenefitCode === FirstRunRate.at(index).get('typeOfBenefit').value
        );
        if (typeOfBenefit.length !== 0) {
          switch (typeOfBenefit[0].typeOfBenefitGroup) {
            case 'Recurring':
              if (month === 'month1') {
                for (let m = 0; m < 36; m++) { this.monthObjectAuto[this.monthArray[m]] = null; }
              } else {
                for (let m = 0; m < 36; m++) { this.monthObjectAuto[this.monthArray[m]] = null; }
                for (let m = 0; m < num; m++) { delete this.monthObjectAuto[this.monthArray[m]]; }
              }
              Object.keys(this.monthObjectAuto).forEach(name => {
                FirstRunRate.at(index).get(monthRow).patchValue(
                  { [name]: FirstRunRate.at(index).get(monthRow).value[month] }
                );
              });
              this.CalculateMonthTotal(index, row, monthRow);
              break;
          }
        }
      }
    }
  }

  ChangeAutoCalculate(event) {
    this.isAutoCalculate = event.target.checked ? true : false;
  }

  ChangeImpiemantCost() {
    this.ImpiemantCostTooltip = this.ImpiemantCostForm.controls.typeOfBenefit.value;
  }

  AddMonthRow() {
    const FirstRunRateForm = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    const TypeBenefitForm = this.TypeBenefitForm.get('typeBenefitTable') as FormArray;

    FirstRunRateForm.push(this.InitialFirstRunRateAddRow());
    TypeBenefitForm.push(this.InitialTypeBenefitAddRow());

    FirstRunRateForm.at(FirstRunRateForm.length - 1).get("typeOfBenefitGroup").patchValue("recurring");

    this.isCheckRecurring.push(true);
    this.isCheckOneTime.push(false);

    this.monthRowTableLength = FirstRunRateForm.length;
    this.isRemoveFirstRunRate = FirstRunRateForm.length > 1 ? false : true;

    setTimeout(() => {
      // if (this.stage === 'IL1') {
      if (this.stageService.impactRunRateTraget.map((t) => t?.toLowerCase()).includes(this.stage?.toLowerCase())) {
        for (let i = 0; i < FirstRunRateForm.length; i++) {
          FirstRunRateForm.at(i).get('runRate').get('row1').setValidators([Validators.required]);
          FirstRunRateForm.at(i).get('runRate').get('row1').updateValueAndValidity();
        }
      }
      if (this.stageService.impactRunRateRevise.map((t) => t?.toLowerCase()).includes(this.stage?.toLowerCase())) {
        for (let i = 0; i < FirstRunRateForm.length; i++) {
          FirstRunRateForm.at(i).get('runRate').get('row2').setValidators([Validators.required]);
          FirstRunRateForm.at(i).get('runRate').get('row2').updateValueAndValidity();
        }
      }
      if (this.stageService.impactRunRateActual.map((t) => t?.toLowerCase()).includes(this.stage?.toLowerCase())) {
        for (let i = 0; i < FirstRunRateForm.length; i++) {
          FirstRunRateForm.at(i).get('runRate').get('row3').setValidators([Validators.required]);
          FirstRunRateForm.at(i).get('runRate').get('row3').updateValueAndValidity();
        }
      }
      this.recurring = this.recurringAndOneTime.filter(obj => obj.typeOfBenefitGroup === 'Recurring' && (obj.typeOfBenefitTitle.indexOf('Indirect') === -1));
      this.recurringAndOneTimeArray.push(this.recurring);
    }, 200);

    //this.GetRecurringAndOnetimeArray();
  }

  RemoveRow(index) {
    const FirstRunRate = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    const TypeBenefit = this.TypeBenefitForm.get('typeBenefitTable') as FormArray;

    FirstRunRate.removeAt(index);
    TypeBenefit.removeAt(index);

    FirstRunRate.markAsDirty();
    TypeBenefit.markAsDirty();

    this.monthRowTableLength = FirstRunRate.length;
    this.isRemoveFirstRunRate = FirstRunRate.length > 1 ? false : true;

    this.groupBenefit.splice(index, 1);
    this.titleBenefit.splice(index, 1);

    const monthObject = { row1: 'monthRows1', row2: 'monthRows2', row3: 'monthRows3' };
    for (let j = 0; j < FirstRunRate.length; j++) {
      for (const [Row, monthRow] of Object.entries(monthObject)) {
        this.CalculateMonthTotal(j, Row, monthRow, null, 'deleteRow');
        this.CalculateRunRateTotal(Row);
        if (Row !== 'row3') {
          this.CalculateMonthBenefitTotal(j, Row, monthRow, null, 'deleteRow');
          this.CalculateBenefitTotal(Row);
        }
      }
    }
  }

  AddIndirect() {
    const Indirect = this.IndirectForm.get('indirectTable') as FormArray;
    Indirect.push(this.InitialIndirectAddRow());
    Indirect.at(Indirect.length - 1).get("typeOfBenefitGroup").patchValue("recurring");

    this.isIndirectRecurring.push(true);
    this.isIndirectOneTime.push(false);

    this.isRemoveIndirect = Indirect.length > 1 ? false : true;

    this.GetRecurringAndOnetimeIndirect();
  }

  RemoveIndirect(index) {
    const Indirect = this.IndirectForm.get('indirectTable') as FormArray;
    Indirect.removeAt(index);
    this.isRemoveIndirect = Indirect.length > 1 ? false : true;
  }

  CopyTable() {
    this.isShowTable = true;
    setTimeout(() => {
      if (document.createRange && window.getSelection) {
        const selTable = document.querySelector('#CopyFirstRunRateForm');
        const range = document.createRange();
        window.getSelection().removeAllRanges();
        try {
          range.selectNode(selTable);
          window.getSelection().addRange(range);
        } catch (e) {
          range.selectNode(selTable);
          window.getSelection().addRange(range);
        }
      }
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      this.initiativeService.viewMode ? false : this.swalTool.Copied();
      this.isShowTable = false;
    }, 100);
  }

  typeOfBenefitTable(index) {
    const FirstRunRate = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    const typeOfBenefit = this.recurringAndOneTime.filter(
      obj => obj.typeOfBenefitCode === FirstRunRate.at(index).get('typeOfBenefit').value
    );
    return typeOfBenefit.length > 0 ? typeOfBenefit[0].typeOfBenefitGroup + ' - ' + typeOfBenefit[0].typeOfBenefitTitle : null;
  }

  VersionPriceTable(index, row) {
    const FirstRunRate = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    return FirstRunRate.at(index).get('versionPrice').value[row];
  }

  RunRateTable(index, row) {
    const FirstRunRate = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    return FirstRunRate.at(index).get('runRate').value[row];
  }

  MonthTable(index, row, month) {
    const FirstRunRate = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    return FirstRunRate.at(index).get(row).value[month];
  }

  VersionPriceTotal(row) {
    return this.FirstRunRateTotalForm.get('versionPrice').value[row];
  }

  RunRateTotal(row) {
    return this.FirstRunRateTotalForm.get('runRate').value[row];
  }

  MonthTotal(row, month) {
    return this.FirstRunRateTotalForm.get(row).value[month];
  }

  CalculateTotal(event?) {
    const FirstRunRateTotal = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;

    const totalRecurring = [];
    let totalRecurringSum = 0;

    const totalOnetime = [];
    let totalOnetimeSum = 0;
    let reCurring = null;
    let oneTime = null;

    let IsNull = FirstRunRateTotal.length;
    if (IsNull != 0) {
      FirstRunRateTotal.getRawValue().forEach(element => {
        if (element['typeOfBenefit'] !== null) {
          IsNull--;
        }
      });
      for (let i = 0; i < FirstRunRateTotal.length; i++) {
        const typeOfBenefit = this.recurringAndOneTime.filter(
          obj => obj.typeOfBenefitCode === FirstRunRateTotal.at(i).get('typeOfBenefit').value
        );
        if (typeOfBenefit.length !== 0) {
          let runRateFormValue = (FirstRunRateTotal.at(i).get('runRate') as FormGroup).getRawValue();
          switch (typeOfBenefit[0].typeOfBenefitGroup) {
            case 'Recurring':
              if (runRateFormValue.row3 !== null && runRateFormValue.row3 !== "") {
                totalRecurring.push(Number(runRateFormValue.row3));
                reCurring = 1;
              } else if (runRateFormValue.row2 !== null && runRateFormValue.row2 !== "") {
                totalRecurring.push(Number(runRateFormValue.row2));
                reCurring = 1;
              } else if (runRateFormValue.row1 !== null && runRateFormValue.row1 !== "") {
                totalRecurring.push(Number(runRateFormValue.row1));
                reCurring = 1;
              } else {
                reCurring = null;
              }
              break;
            case 'One time':
              if (runRateFormValue.row3 !== null && runRateFormValue.row3 !== "") {
                totalOnetime.push(parseFloat(this.round((runRateFormValue.row3 * 0.1), 3)));
                oneTime = 1;
              } else if (runRateFormValue.row2 !== null && runRateFormValue.row2 !== "") {
                totalOnetime.push(parseFloat(this.round((runRateFormValue.row2 * 0.1), 3)));
                oneTime = 1;
              } else if (runRateFormValue.row1 !== null && runRateFormValue.row1 !== "") {
                totalOnetime.push(parseFloat(this.round((runRateFormValue.row1 * 0.1), 3)));
                oneTime = 1;
              } else {
                oneTime = null;
              }
              break;
            default:
              reCurring = null;
              oneTime = null;
          }
        }
      }
      totalRecurringSum = totalRecurring.reduce((a, b) => a + b, 0);
      totalOnetimeSum = totalOnetime.reduce((a, b) => a + b, 0);

      this.ImpactForm.patchValue({ totalRecurring: totalRecurringSum, totalOnetime: totalOnetimeSum });


      //get total 
      let result = null;
      const FirstRunRateTotalValue = (this.FirstRunRateTotalForm as FormGroup).getRawValue();
      if (FirstRunRateTotalValue.runRate.row3 !== null && FirstRunRateTotalValue.runRate.row3 !== "" && this.stageService.impactRunRateActual.indexOf(this.stage) >= 0) {
        result = parseFloat(this.round(FirstRunRateTotalValue.runRate.row3, 3));
      } else if (FirstRunRateTotalValue.runRate.row2 !== null && FirstRunRateTotalValue.runRate.row2 !== "" && this.stageService.impactRunRateRevise.indexOf(this.stage) >= 0) {
        result = parseFloat(this.round(FirstRunRateTotalValue.runRate.row2, 3));
      } else if (FirstRunRateTotalValue.runRate.row1 !== null && FirstRunRateTotalValue.runRate.row1 !== "" && this.stageService.impactRunRateTraget.indexOf(this.stage) >= 0) {
        result = parseFloat(this.round(FirstRunRateTotalValue.runRate.row1, 3));
      } else {
        IsNull = 1;
      }





      // result.toFixed(3);
      //auto fill to benefit amount
      if (this.formGroup.get('initiativesForm').enabled && this.formGroup.get('initiativesForm') && this.formGroup.get('initiativesForm').get('benefitAmount')) {

        if (IsNull == 0 && (oneTime || reCurring) && this.checkNullValue(result)) {
          // this.formGroup.get('initiativesForm').get('benefitAmount').setValue(result.toFixed(3));
          this.formGroup.get('initiativesForm').get('benefitAmount').setValue(parseFloat(this.round(result, 3)));
        } else {
          this.formGroup.get('initiativesForm').get('benefitAmount').setValue(this.initiativeService.benefitAmount);
        }
      }
      if (this.formGroup.get('DetailMaxForm')?.get('directBenefit') && IsNull == 0 && (oneTime || reCurring)) {
        if (IsNull == 0 && (oneTime || reCurring)) {
          this.formGroup.get('DetailMaxForm')?.patchValue({ directBenefit: totalRecurringSum + totalOnetimeSum })
        } else {
          this.formGroup.get('DetailMaxForm')?.patchValue({ directBenefit: this.initiativeService.benefitAmount })
        }
      }

    }
  }


  //
  CalculateTotalCostOPEX() {
    if (this.ImpactForm.controls.impiemantCost.value === 'true') {
      if (this.ImpiemantCostForm.controls.runRate.value.row2) {
        const opex = { requestOpex: 'true', costEstOpex: this.ImpiemantCostForm.controls.runRate.value.row2 };
        this.initiativeService.UpdateRequestOpex(this.id, opex).subscribe(() => { });
        this.ImpactForm.patchValue({ totalCostOPEX: this.ImpiemantCostForm.controls.runRate.value.row2 });
      } else if (this.ImpiemantCostForm.controls.runRate.value.row1) {
        const opex = { requestOpex: 'true', costEstOpex: this.ImpiemantCostForm.controls.runRate.value.row1 };
        this.ImpactForm.patchValue({ totalCostOPEX: this.ImpiemantCostForm.controls.runRate.value.row1 });
      } else {
        const opex = { requestOpex: 'true', costEstOpex: this.costEstOpex };
        this.ImpactForm.patchValue({ totalCostOPEX: 0 });
      }
    } else {
      this.ImpactForm.patchValue({ totalCostOPEX: null });
      this.initiativeService.UpdateRequestOpex(this.id, { requestOpex: 'no' }).subscribe(() => { });
      this.impactService.DeleteImpiemantCost(this.id).subscribe(() => { });
    }
  }


  CheckShareBenefit() {
    if (this.HaveShareBenefit.controls.haveShareBenefit.value === 'false') {
      if (this.shareBenefitWorkstreams.length !== 0) {
        this.impactService.DeleteShareBenefitWorkstream(this.id).subscribe(() => { });
      }
    }
  }

  SILAchievement() {
    const stage4 = ['IL4', 'SIL4'];
    const stage5 = ['IL5', 'SIL5'];

    if (stage4.indexOf(this.stage) !== -1) {
      if (!this.SIL4Achievement) {
        const yearDate = new Date(new Date().getFullYear(), 11, 31);
        const todaysDate = new Date();
        if (yearDate.toTimeString() === todaysDate.toTimeString()) {
          this.ImpactForm.patchValue({ siL4Achievement: new Date().getFullYear() });
        }
      } else {
        this.ImpactForm.patchValue({ siL4Achievement: this.SIL4Achievement });
      }
    }

    if (stage5.indexOf(this.stage) !== -1) {
      if (!this.SIL5Achievement) {
        const yearDate = new Date(new Date().getFullYear(), 11, 31);
        const todaysDate = new Date();
        if (yearDate.toTimeString() === todaysDate.toTimeString()) {
          this.ImpactForm.patchValue({ siL5Achievement: new Date().getFullYear() });
        }
      } else {
        this.ImpactForm.patchValue({ siL5Achievement: this.SIL5Achievement });
      }
    }
  }

  SetNumberFirstRunRate() {
    const FirstRunRate = this.FirstRunRateForm.get('firstRunRateTable') as FormArray;
    for (let i = 0; i < FirstRunRate.length; i++) {
      if (FirstRunRate.at(i).get('runRate').value.row1) {
        FirstRunRate.at(i).get('runRate').patchValue({ row1: Number(FirstRunRate.at(i).get('runRate').value.row1) });
      } else if (FirstRunRate.at(i).get('runRate').value.row1 === 0) {
        FirstRunRate.at(i).get('runRate').patchValue({ row1: 0 });
      } else {
        FirstRunRate.at(i).get('runRate').patchValue({ row1: null });
      }

      if (FirstRunRate.at(i).get('runRate').value.row2) {
        FirstRunRate.at(i).get('runRate').patchValue({ row2: Number(FirstRunRate.at(i).get('runRate').value.row2) });
      } else if (FirstRunRate.at(i).get('runRate').value.row2 === 0) {
        FirstRunRate.at(i).get('runRate').patchValue({ row2: 0 });
      } else {
        FirstRunRate.at(i).get('runRate').patchValue({ row2: null });
      }

      if (FirstRunRate.at(i).get('runRate').value.row3) {
        FirstRunRate.at(i).get('runRate').patchValue({ row3: Number(FirstRunRate.at(i).get('runRate').value.row3) });
      } else if (FirstRunRate.at(i).get('runRate').value.row3 === 0) {
        FirstRunRate.at(i).get('runRate').patchValue({ row3: 0 });
      } else {
        FirstRunRate.at(i).get('runRate').patchValue({ row3: null });
      }

      // FirstRunRate.at(i).get('runRate').patchValue( { row1 : Number(FirstRunRate.at(i).get('runRate').value.row1) });
      // FirstRunRate.at(i).get('runRate').patchValue( { row2 : Number(FirstRunRate.at(i).get('runRate').value.row2) });
      // FirstRunRate.at(i).get('runRate').patchValue( { row3 : Number(FirstRunRate.at(i).get('runRate').value.row3) });

      ['monthRows1', 'monthRows2', 'monthRows3'].forEach(row => {
        Object.keys(this.monthObject).forEach(name => {
          if (FirstRunRate.at(i).get([row]).value[name] === 0 || FirstRunRate.at(i).get([row]).value[name] === '0') {
            FirstRunRate.at(i).get([row]).patchValue({ [name]: 0 });
          } else {
            const value = Number(FirstRunRate.at(i).get([row]).value[name]);
            FirstRunRate.at(i).get([row]).patchValue({ [name]: value ? value : null });
          }
        });
      });
    }
  }

  SetNumberTypeBenefit() {
    const TypeBenefit = this.TypeBenefitForm.get('typeBenefitTable') as FormArray;
    for (let i = 0; i < TypeBenefit.length; i++) {
      ['monthRows1', 'monthRows2'].forEach(row => {
        Object.keys(this.monthObject).forEach(name => {
          if (TypeBenefit.at(i).get([row]).value[name] === 0 || TypeBenefit.at(i).get([row]).value[name] === '0') {
            TypeBenefit.at(i).get([row]).patchValue({ [name]: 0 });
          }
          else if (TypeBenefit.at(i).get([row]).value[name] != null && TypeBenefit.at(i).get([row]).value[name]?.toString().length != 0 && Number(TypeBenefit.at(i).get([row]).value[name]) === 0) {
            TypeBenefit.at(i).get([row]).patchValue({ [name]: 0 });
          }
          else {
            const value = Number(TypeBenefit.at(i).get([row]).value[name]);
            TypeBenefit.at(i).get([row]).patchValue({ [name]: value ? value : null });
          }
        });
      });
    }
  }

  get ImapactService() {
    return this.impactService;
  }



  SetMarkAsTouchedForm() {

    // Target
    if (this.stageService.impactRunRateTraget.map((t) => t?.toLowerCase()).includes(this.stage?.toLowerCase())) {
      // this.ImpactForm.get('financialImpactArea').markAsTouched();
      if (this.ImpactForm.get('FirstRunRateForm')) {
        setTimeout(() => {
          const FirstRunRate = this.ImpactForm.get('FirstRunRateForm').get('firstRunRateTable') as FormArray;
          for (let i = 0; i < FirstRunRate.length; i++) {
            FirstRunRate.at(i).get('typeOfBenefit').markAsTouched();
            FirstRunRate.at(i).get('runRate').get('row1').markAsTouched();
          }
        }, 500);
      }
    }
    // Revise
    if (this.stageService.impactRunRateRevise.map((t) => t?.toLowerCase()).includes(this.stage?.toLowerCase())) {
      if (this.ImpactForm.get('FirstRunRateForm')) {
        setTimeout(() => {
          const FirstRunRate = this.ImpactForm.get('FirstRunRateForm').get('firstRunRateTable') as FormArray;
          for (let i = 0; i < FirstRunRate.length; i++) {
            FirstRunRate.at(i).get('typeOfBenefit').markAsTouched();
            FirstRunRate.at(i).get('runRate').get('row2').markAsTouched();
          }
        }, 500);
      }
    }
    // Actual
    if (this.stageService.impactRunRateActual.map((t) => t?.toLowerCase()).includes(this.stage?.toLowerCase())) {
      if (this.ImpactForm.get('FirstRunRateForm')) {
        setTimeout(() => {
          const FirstRunRate = this.ImpactForm.get('FirstRunRateForm').get('firstRunRateTable') as FormArray;
          for (let i = 0; i < FirstRunRate.length; i++) {
            FirstRunRate.at(i).get('typeOfBenefit').markAsTouched();
            FirstRunRate.at(i).get('runRate').get('row3').markAsTouched();
          }
        }, 500);
      }
    }
  }

  GetInitiativeService() {
    return this.initiativeService;
  }

  OnChangeIndirectValue(event) {
    let IndirectTable = this.IndirectForm.get('indirectTable') as FormArray;
    const totalRecurring = [];
    let totalRecurringSum = 0;

    const totalOnetime = [];
    let totalOnetimeSum = 0;

    for (let i = 0; i < IndirectTable.length; i++) {
      const typeOfBenefit = this.recurringAndOneTime.filter(
        obj => obj.typeOfBenefitCode === IndirectTable.at(i).get('typeOfBenefit').value
      );
      if (typeOfBenefit.length !== 0) {
        // FirstRunRateTotal.at(i).enable();
        switch (typeOfBenefit[0].typeOfBenefitGroup) {
          case 'Recurring':
            if (IndirectTable.at(i).get('runRate').value.row3) {
              totalRecurring.push(Number(IndirectTable.at(i).get('runRate').value.row3));
            } else if (IndirectTable.at(i).get('runRate').value.row2) {
              totalRecurring.push(Number(IndirectTable.at(i).get('runRate').value.row2));
            } else if (IndirectTable.at(i).get('runRate').value.row1) {
              totalRecurring.push(Number(IndirectTable.at(i).get('runRate').value.row1));
            }
            break;
          case 'One time':
            if (IndirectTable.at(i).get('runRate').value.row3) {
              totalOnetime.push(parseFloat(this.round(IndirectTable.at(i).get('runRate').value.row3 * 0.1, 3)));
            } else if (IndirectTable.at(i).get('runRate').value.row2) {
              totalOnetime.push(parseFloat(this.round(IndirectTable.at(i).get('runRate').value.row2 * 0.1, 3)));
            } else if (IndirectTable.at(i).get('runRate').value.row1) {
              totalOnetime.push(parseFloat(this.round(IndirectTable.at(i).get('runRate').value.row1 * 0.1, 3)));
            }
            break;
        }
      }
    }

    totalRecurringSum = totalRecurring.reduce((a, b) => a + b, 0);
    totalOnetimeSum = totalOnetime.reduce((a, b) => a + b, 0);

    this.formGroup.get('DetailMaxForm').patchValue({ indirectBenefit: parseFloat(this.round(totalRecurringSum, 3)) + parseFloat(this.round(totalOnetimeSum, 3)) });
  }

  checkWorkstream(value: string, index: number) {
    let workStreamFormArray: any[] = this.ShareBenefitFrom.get('shareBenefitWorkstreams').value;
    let valueIndex = workStreamFormArray.findIndex((x) => x.workstream == value);
    return valueIndex >= 0 ? true : false;
  }

  convertRunRateData(runrateData: FirstRunRateTable[]) {

    this.firstRunRateMonthTemp
    if (!this.firstRunRateMonthTemp) {
      return;
    }
    runrateData.forEach((runRate, runRateIndex) => {
      let runRatePush: runRateTempData = {} as runRateTempData;
      let monthRow1: MonthRowDateTempData[] = [] as MonthRowDateTempData[];
      let monthRow2: MonthRowDateTempData[] = [] as MonthRowDateTempData[];
      let monthRow3: MonthRowDateTempData[] = [] as MonthRowDateTempData[];
      for (let index = 1; index < 37; index++) {
        // runRate.monthRows1['month' + index];
        let m1: MonthRowDateTempData = {} as MonthRowDateTempData;
        let m2: MonthRowDateTempData = {} as MonthRowDateTempData;
        let m3: MonthRowDateTempData = {} as MonthRowDateTempData;
        m1.month = this.dateUtil.GetRunRateMonth(this.firstRunRateMonthTemp, index - 1);
        m1.monthData = runRate.monthRows1['month' + index];
        m2.month = this.dateUtil.GetRunRateMonth(this.firstRunRateMonthTemp, index - 1);
        m2.monthData = runRate.monthRows2['month' + index];
        m3.month = this.dateUtil.GetRunRateMonth(this.firstRunRateMonthTemp, index - 1);
        m3.monthData = runRate.monthRows2['month' + index];
        monthRow1.push(m1);
        monthRow2.push(m2);
        monthRow3.push(m3);
      }
      runRatePush.runRateMonthTempMonth1 = monthRow1
      runRatePush.runRateMonthTempMonth2 = monthRow2
      runRatePush.runRateMonthTempMonth3 = monthRow3

      this.firstRunRateTemp.push(runRatePush);

    });

  }
  convertTypeBenefitData(runrateData: FirstRunRateTable[]) {

    this.firstRunRateMonthTemp
    if (!this.firstRunRateMonthTemp) {
      return;
    }
    runrateData.forEach((runRate, runRateIndex) => {
      let runRatePush: runRateTempData = {} as runRateTempData;
      let monthRow1: MonthRowDateTempData[] = [] as MonthRowDateTempData[];
      let monthRow2: MonthRowDateTempData[] = [] as MonthRowDateTempData[];
      let monthRow3: MonthRowDateTempData[] = [] as MonthRowDateTempData[];
      for (let index = 1; index < 37; index++) {
        // runRate.monthRows1['month' + index];
        let m1: MonthRowDateTempData = {} as MonthRowDateTempData;
        let m2: MonthRowDateTempData = {} as MonthRowDateTempData;
        let m3: MonthRowDateTempData = {} as MonthRowDateTempData;
        m1.month = this.dateUtil.GetRunRateMonth(this.firstRunRateMonthTemp, index - 1);
        m1.monthData = runRate.monthRows1['month' + index];
        m2.month = this.dateUtil.GetRunRateMonth(this.firstRunRateMonthTemp, index - 1);
        m2.monthData = runRate.monthRows2['month' + index];
        m3.month = this.dateUtil.GetRunRateMonth(this.firstRunRateMonthTemp, index - 1);
        m3.monthData = runRate.monthRows2['month' + index];
        monthRow1.push(m1);
        monthRow2.push(m2);
        monthRow3.push(m3);
      }
      runRatePush.runRateMonthTempMonth1 = monthRow1
      runRatePush.runRateMonthTempMonth2 = monthRow2
      runRatePush.runRateMonthTempMonth3 = monthRow3

      this.typeBenefitTableTemp.push(runRatePush);

    });

  }



  disableRunrateStageTarget(index: number): boolean {
    const typeOfBenefit = (this.FirstRunRateForm.get("firstRunRateTable") as FormArray).at(index).get("typeOfBenefit").value;
    if (this.stageService.impactRunRateTraget.indexOf(this.stage) >= 0 && typeOfBenefit) {
      return false;
    }
    return true;
  }

  disableRunrateStageRevise(index: number): boolean {
    const typeOfBenefit = (this.FirstRunRateForm.get("firstRunRateTable") as FormArray).at(index).get("typeOfBenefit").value;
    if (this.stageService.impactRunRateRevise.indexOf(this.stage) >= 0 && typeOfBenefit) {
      return false;
    }
    return true;
  }

  disableRunrateStageReviseMonth(index: number): boolean {
    const typeOfBenefit = (this.FirstRunRateForm.get("firstRunRateTable") as FormArray).at(index).get("typeOfBenefit").value;
    if ((this.stageService.impactRunRateRevise.indexOf(this.stage) >= 0 || this.stageService.impactRunRateActual.indexOf(this.stage) >= 0) && typeOfBenefit) {
      return false;
    }
    return true;
  }

  disableRunrateStageActual(index: number): boolean {
    const typeOfBenefit = (this.FirstRunRateForm.get("firstRunRateTable") as FormArray).at(index).get("typeOfBenefit").value;
    if (this.stageService.impactRunRateActualIL4.indexOf(this.stage) >= 0 && typeOfBenefit) {
      return false;
    }
    return true;
  }
  disableRunrateStageActualByMonth(i, index: number): boolean {
    //this.toDay
    //this.itemsMonthDateTime
    //this.months[this.month]) + ' ' + this.year
    const toDayMonth = this.dateUtil.GetToday.getMonth() + 1;
    const toDayYear = this.dateUtil.GetToday.getFullYear();
    const factor = 4;
    //const actualDatetime = this.itemsMonth[index];
    const firstRunrateMount = this.itemsMonth[0].split(" ");
    const firstMonth = this.months.findIndex(x => x == firstRunrateMount[0]);
    const firstYear = firstRunrateMount[1];
    const actualIndex = this.itemsMonth.findIndex(x => x == this.months[toDayMonth] + ' ' + toDayYear);
    const typeOfBenefit = (this.FirstRunRateForm.get("firstRunRateTable") as FormArray).at(i).get("typeOfBenefit").value;
    let chackActualDate: boolean = false;

    //กรอกล่วงหน้า ตาม factor
    //if ((actualIndex >= 0 && index >= actualIndex)) {


    //ห้ามกรอกล่วงหน้า
    if ((this.stageService.impactRunRateActual.indexOf(this.stage) >= 0
      && typeOfBenefit) && (actualIndex >= 0 && index <= actualIndex && toDayYear >= parseInt(firstYear))) {
      return false;
    } else if ((this.stageService.impactRunRateActual.indexOf(this.stage) >= 0
      && typeOfBenefit) && (actualIndex < 0 && toDayYear >= parseInt(firstYear))) {
      return false;
    } else {
      return true;
    }
  }

  checkStageActual() {
    let permissionSPOC: RolePermissionModel = this.userPermission.find(x =>
      x.pageId.toUpperCase() === "EDITALLTYPEMAX"
      && x.roleName.toLowerCase() === "spoc all workstream"
    );
    if (this.stageService.disableSelectFirstRunrate.indexOf(this.stage) >= 0 && !permissionSPOC) {
      return true;
    }
    return false;
  }

  get transform(): string {
    return `scale(${this.scale})`;
  }

  get height(): number {
    return this.scale * 20;
  }

  onElastic(scale: number) {
    this.scale = Math.max(scale, 0.5);
  }

  //check permission
  CheckPermissionImpact(fieldName: string): boolean {
    if (!this.userPermission) {
      return false;
    }
    let accessDetail: RolePermissionModel = this.userPermission.find(x =>
      x.pageId.toLowerCase() === PermissionService.IMPACTFORM_PAGE_ID
      && x.fieldName.toLowerCase() === fieldName
    );
    if (accessDetail?.isEnable) {
      return false;
    }
    return true;

  }

  checkNullValue(value): boolean {
    let valueCheck: string = value !== null && value !== undefined ? value.toString() : null;
    if (valueCheck?.length > 0) {
      return true;
    }
    return false;
  }

  round(num, precision) {
    var base = 10 ** precision;
    return (Math.round(num * base) / base).toFixed(precision);
  }

  getRecurring(index: number): boolean {
    const typeOfBenefit: string = (this.FirstRunRateForm.get("firstRunRateTable") as FormArray).at(index).get("typeOfBenefitGroup").value;
    if (typeOfBenefit && typeOfBenefit.startsWith("re")) {
      return true;
    }
    return false;
  }

  getOneTime(index: number): boolean {
    const typeOfBenefit: string = (this.FirstRunRateForm.get("firstRunRateTable") as FormArray).at(index).get("typeOfBenefitGroup").value;
    if (typeOfBenefit && typeOfBenefit.startsWith("one")) {
      return true;
    }
    return false;
  }

  getInDirectRecurring(index: number): boolean {
    const typeOfBenefit: string = (this.IndirectForm.get("indirectTable") as FormArray).at(index).get("typeOfBenefitGroup").value;
    if (typeOfBenefit && typeOfBenefit.startsWith("re")) {
      return true;
    }
    return false;
  }

  getInDirectOneTime(index: number): boolean {
    const typeOfBenefit: string = (this.IndirectForm.get("indirectTable") as FormArray).at(index).get("typeOfBenefitGroup").value;
    if (typeOfBenefit && typeOfBenefit.startsWith("one")) {
      return true;
    }
    return false;
  }
}

