import { Component, OnInit, ChangeDetectorRef, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { DetailService } from '@services/detail/detail.service';
import { ImpactService } from '@services/impact/impact.service';
import { MaxService } from '@services/max/max.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { DateUtil } from '@utils/date.utils';
import { SwalTool } from '@tools/swal.tools';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CapexService } from '@services/capex/capex.service';
import { DimService } from '@services/dim/dim.service';
import { PermissionService } from '@services/permission/permission.service';
import { Initiative } from '@models/initiative';
import { StageService } from '@services/stage/stage.service';
import { RolePermissionModel } from '@models/RolePermissionModel';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-detail-max-form',
  templateUrl: './detail-max-form.component.html',
  styleUrls: ['./detail-max-form.component.css']
})
export class DetailMaxFormComponent implements OnInit, OnChanges {
  userPermission: RolePermissionModel[];
  
  constructor(
    private fb: FormBuilder,
    private initiativeService: InitiativeService,
    private detailService: DetailService,
    private impactService: ImpactService,
    private maxService: MaxService,
    private detailInformationService: DetailInformationService,
    private dateUtil: DateUtil,
    private swalTool: SwalTool,
    private cdr: ChangeDetectorRef,
    private capexService: CapexService,
    private dimService: DimService,
    public ps: PermissionService,
    private stageService: StageService
  ) {
    this.userPermission = JSON.parse(sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY));
   }

  @Input() id: number;
  @Input() page: string;
  @Input() name: string;
  @Input() CheckCapexPage: any;
  @Input() formGroup: FormGroup;

  kpiDetailInformations: any = [];

  generalData: Initiative;
  workstreamIsNotExist : boolean;
  //dim detail

  IsShowScope = true;
  IsShowTimeline = true;
  IsShowCost = true;
  coDevelopers: any = [];
  SponsorEvp: any = [];
  ProjectSponsor: any = [];
  ITFocalPoint: any = [];
  ImpactedParties: any = [];
  TeamMember: any = [];
  valueChain: any = [];
  projectCategory: any = [];
  digitalStrategy: any = [];
  DigitalFocalPoint: any = [];
  FixedAsset: boolean;
  IsRequestSubPIC: boolean;



  Cim: boolean;
  Dim: boolean;
  Capex: boolean;
  Strategy: boolean;
  Max: boolean;

  CheckDim: boolean;
  ShowHandover: boolean;
  IsAcceptHandover: boolean;
  RequestProjectEngineer: boolean;

  status: string;
  remark: string;
  stage: string;

  initiativeDetails: any;
  frequencies: any;
  kpises: any;
  types: any;
  workStreams: any;
  subWorkstreams: any;

  strategicObjectives: any = [];
  strategies: any = [];
  years: any = [];

  workstreamLeader: string;

  workstreamLead: any = [];
  workstreamList: any = [];
  sponsor: any = [];
  sponsorList: any = [];
  toFinance: any = [];
  toFinanceList: any = [];
  cfo: any = [];
  cfoList: any = [];
  cto: any = [];
  ctoList: any = [];
  tot: any = [];
  totList: any = [];
  tfBt: any = [];
  tfBtList: any = [];
  toFinanceIL4: any = [];
  toFinanceIL4List: any = [];
  toFinanceIL5: any = [];
  toFinanceIL5List: any = [];
  financeExpert: any = [];
  financeExpertList: any = [];

  projectManagerList: any = [];

  TOTeamSelect: any = [];
  TfBtTOSelect: any = [];
  TOFinanceIL4select: any = [];
  TOFinanceIL5select: any = [];

  presidentList: any = [];
  managerList: any = [];
  params: any = {};

  procurementCategoryList: any = [];
  procurementSubCategoryList: any = [];
  procurementLeverList: any = [];

  StartDate: Date;
  FinishDate: Date;
  Irr: number;
  PaybackPeriod: number;

  IL3Date: string;
  IL4Date: string;
  IL5Date: string;

  IL3DateDisplay: string;
  IL4DateDisplay: string;
  IL5DateDisplay: string;

  CutFeedDate: string;
  StartUpDate: string;
  CycleDate: string;

  CutFeedDateDisplay: string;
  StartUpDateDisplay: string;
  CycleDateDisplay: string;

  ReplacementDate: string;
  ReplacementDateDisplay: string;

  //dim
  BaselineStartDate: string;
  BaselineStartDateDisplay: string;

  BaselineFinishDate: string;
  BaselineFinishDateDisplay: string;

  ReviseForecastStartDate: string;
  ReviseForecastStartDateDisplay: string;

  ReviseForecastFinishDate: string;
  ReviseForecastFinishDateDisplay: string;

  ActualStartDate: string;
  ActualStartDateDisplay: string;

  ActualFinishDate: string;
  ActualFinishDateDisplay: string;

  CapexCost: number = 0;
  CostEstCapexType: string = "M.THB";
  OpexCost: number = 0;
  CostEstOpexType: string = "M.THB";
  isDisabledSubmit = false;
  IsOriginalDisable;
  IsOriginalEnable;
  IsOriginalRequire;
  requireFieldReqestCapex: boolean;

  bsConfig: Partial<BsDatepickerConfig>;

  InitiativeDetail = { code: null, name: null, year: null, owner: null, organization: null };
  bsConfigStart = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  bsConfigFinish = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false, minDate: this.dateUtil.GetToday };
  bsConfigIL3Date = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  bsConfigIL4Date = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false, minDate: this.dateUtil.GetToday, maxDate: null };
  bsConfigIL5Date = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false, minDate: this.dateUtil.GetToday };
  bsConfigDate = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };


  Detail: number;

  requireDirectBenefit: boolean;
  requireIndirectBenefit: boolean;

  DetailMaxForm = this.fb.group({
    id: 0,
    initiativeId: this.initiativeService.id,
    initiativeYear: null,
    strategicObjective: '',
    strategy: { value: '', disabled: true },
    initiativeTypeMax: '',
    workstream: '',
    subWorkstream1: null,
    subWorkstream2: { value: '', disabled: true },
    proCategory: null,
    proSubCategory: null,
    proLever: null,
    baseline: '',
    baselineHistorical: '',
    baselineNonHistorical: '',
    saving: '',
    savingHistorical: '',
    savingNonHistorical: '',
    iL3Date: null,
    iL4Date: null,
    iL5Date: null,
    sponsorEvp: { value: null, disabled: true },
    workstreamLead: { value: '', disabled: true },
    toFinance: { value: '', disabled: true },
    cto: { value: '', disabled: true },
    cfo: { value: '', disabled: true },
    tot: null,
    tfb: null,
    toFinanceIL4: null,
    toFinanceIL5: null,
    financeExpert: null,
    president: null,
    manager: null,
    projectManager: null,
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
    usefulYear: 20,
    usefulMonth: 0,
    kpisForm: this.fb.group({ kpis: this.fb.array([]) }),
    forEnvironment: "true",
    forTurnaround: "true",
    cutFeedDate: null,
    startUpDate: null,
    cycleYear: null,
    cycleMonth: null,
    replaceEquipment: "true",
    equipmentName: null,
    replacementDate: null,
    oldAssetCondition: '',
    oldAssetNo: null,
    equipmentOrAsset: null,
    boi: "true",
    boiNo: null,
    haveAdditional: "true",
    capital: null,
    catalyst: null,
    software: null,
    rightOfUse: null,
    checklist: null,
    coordinate: "true",
    parties: null,
    remark: null,
    otherKpis: null,

    // Detail-Dim
    valueChain: '',
    digitalStrategy: '',
    projectCategory: '',
    projectSponsor: null,
    digitalFocalPoint: null,
    impactedParties: null,
    iTFocalPoint: null,
    teamMember: null,
    baselineStartDate: null,
    baselineFinishDate: null,
    reviseForecastStartDate: null,
    reviseForecastFinishDate: null,
    actualStartDate: null,
    actualFinishDate: null,
    isDeliverAsPerCommittedScope: 'true',
    scopeDetail: null,
    isDeliverAsPerCommittedDate: 'true',
    timelineDetail: null,
    isDeliverAsPerCommittedCost: 'true',
    costDetail: null,
    userFeedback: null,
    projectDocumentDatabase: null,

    requireDirectBenefit: false,
    directBenefit: '',
    requireIndirectBenefit: false,
    indirectBenefit: '',

    capexBenefit: 0,
    opexBenefit: 0,
    totalBenefit: 0,

    fixedAsset: false,
    requestSubPIC: false,
    internalOrderNo: null,

    //add
    ram: null,
    jFactor: null,
    projectNonFinancialBenefit: null

  });

  DimHandoverForm: FormGroup = this.fb.group({
    id: 0,
    initiativeId: null,
    // Checkbox Part
    isRequestITHandover: false,
    isDeliverables: false,
    commentDeliverables: null,
    isCommunicationOrTraining: false,
    commentCommunicationOrTraining: null,
    isAllIssueClosed: false,
    commentAllIssueClosed: null,
    isOperationSupport: false,
    commentOperationSupport: null,
    isOther: false,
    commentOther: null,

    // On-going Project Cost
    licenseOrSubscriptionFee: null,
    supportFee: null,
    startDate: null,
    finishDate: null,
    isAcceptHandover: false,
    acceptDate: this.dateUtil.GetToday,
    // engineerEmail: null
    handoverforIT: null
  })

  isRemoveKpis = true;
  isDisableAddKpis = false;

  IsShowFormCondition = false;
  IsShowProcurement = false;
  IsRequestCapex = false;
  IsShowTurnAround = true;
  IsShowReplace = true;
  IsShowOldAsset = false;
  IsShowBOI = true;
  IsShowParties = true;
  IsShowAdditional = true;
  IsShowReturn: boolean;
  IsShowRamAmdJFactor: boolean;
  IsCheckBoxRequestIT: boolean;

  eventManagerSelectSubscribtion: Subscription;

  CheckCapex: boolean = false;
  RequestCapex: boolean;
  CheckMax: boolean;

  typeOfInvestment: string;
  words: any = [];

  kpiArray: any = [];

  WorkstreamLeader: string;

  selectDigitalCapex: boolean;
  isERSource: boolean;

  get NoStage() {
    return !this.stage;
  }

  get GetStage() {
    return this.stage;
  }

  get StageIL0() {
    return this.stage === 'IL0';
  }

  get StageIL1() {
    return this.stage === 'IL1';
  }

  get isMax() {
    return this.initiativeService.suggestionStatus.max;
  }

  get invalidPresident() {
    return this.DetailMaxForm.controls.president.touched && this.DetailMaxForm.controls.president.invalid;
  }

  get invalidManager() {
    return this.DetailMaxForm.controls.manager.touched && this.DetailMaxForm.controls.manager.invalid;
  }

  get invalidWorkstream() {
    return this.DetailMaxForm.controls.workstream.touched && this.DetailMaxForm.controls.workstream.invalid;
  }

  get invalidProjectManager() {
    return this.DetailMaxForm.controls.projectManager.touched && this.DetailMaxForm.controls.projectManager.invalid;
  }

  get invalidInitiativeType() {
    return this.DetailMaxForm.controls.initiativeTypeMax.touched && this.DetailMaxForm.controls.initiativeTypeMax.invalid;
  }

  get invalidStrategyTitle() {
    return this.DetailMaxForm.controls.strategy.touched && this.DetailMaxForm.controls.strategy.invalid;
  }

  get invalidSubWorkstream() {
    return this.DetailMaxForm.controls.subWorkstream2.touched && this.DetailMaxForm.controls.subWorkstream2.invalid;
  }

  get invalidSubAndWorkstream() {
    return (this.DetailMaxForm.controls.workstream.valid) && (this.DetailMaxForm.controls.subWorkstream2.valid);
  }

  get invalidSponsor() {
    return this.DetailMaxForm.controls.sponsorEvp.touched && this.DetailMaxForm.controls.sponsorEvp.invalid;
  }

  get invalidWorkstreamLead() {
    return this.DetailMaxForm.controls.workstreamLead.touched && this.DetailMaxForm.controls.workstreamLead.invalid;
  }

  get invalidToFinance() {
    return this.DetailMaxForm.controls.toFinance.touched && this.DetailMaxForm.controls.toFinance.invalid;
  }

  get invalidCTO() {
    return this.DetailMaxForm.controls.cto.touched && this.DetailMaxForm.controls.cto.invalid;
  }

  get invalidIl3() {
    return this.DetailMaxForm.controls.iL3Date.touched && this.DetailMaxForm.controls.iL3Date.invalid;
  }

  get invalidIl4() {
    return this.DetailMaxForm.controls.iL4Date.touched && this.DetailMaxForm.controls.iL4Date.invalid;
  }

  get invalidBaseCase() {
    return this.DetailMaxForm.controls.baseCase.touched && this.DetailMaxForm.controls.baseCase.invalid;
  }

  get invalidProjectIrrBaseCase() {
    return this.DetailMaxForm.controls.projectIrrBaseCase.touched && this.DetailMaxForm.controls.projectIrrBaseCase.invalid;
  }

  get invalidNpvBaseCase() {
    return this.DetailMaxForm.controls.npvBaseCase.touched && this.DetailMaxForm.controls.npvBaseCase.invalid;
  }

  get invalidPaybackBaseCase() {
    return this.DetailMaxForm.controls.paybackBaseCase.touched && this.DetailMaxForm.controls.paybackBaseCase.invalid;
  }

  get invalidEbitdaBaseCase() {
    return this.DetailMaxForm.controls.ebitdaBaseCase.touched && this.DetailMaxForm.controls.ebitdaBaseCase.invalid;
  }

  get invalidDepreciationCost() {
    return this.DetailMaxForm.controls.depreciationCost.touched && this.DetailMaxForm.controls.depreciationCost.invalid;
  }

  get invalidUsefulYear() {
    return this.DetailMaxForm.controls.usefulYear.touched && this.DetailMaxForm.controls.usefulYear.invalid;
  }

  get invalidUsefulMonth() {
    return this.DetailMaxForm.controls.usefulMonth.touched && this.DetailMaxForm.controls.usefulMonth.invalid;
  }

  get invalidCutFeedDate() {
    return this.DetailMaxForm.controls.cutFeedDate.touched && this.DetailMaxForm.controls.cutFeedDate.invalid;
  }

  get invalidStartUpDate() {
    return this.DetailMaxForm.controls.startUpDate.touched && this.DetailMaxForm.controls.startUpDate.invalid;
  }

  get invalidCycleYear() {
    return this.DetailMaxForm.controls.cycleYear.touched && this.DetailMaxForm.controls.cycleYear.invalid;
  }

  get invalidEquipmentName() {
    return this.DetailMaxForm.controls.equipmentName.touched && this.DetailMaxForm.controls.equipmentName.invalid;
  }

  get invalidReplacementDate() {
    return this.DetailMaxForm.controls.replacementDate.touched && this.DetailMaxForm.controls.replacementDate.invalid;
  }

  get invalidOldAssetCondition() {
    return this.DetailMaxForm.controls.oldAssetCondition.touched && this.DetailMaxForm.controls.oldAssetCondition.invalid;
  }

  get invalidOldAssetNo() {
    return this.DetailMaxForm.controls.oldAssetNo.touched && this.DetailMaxForm.controls.oldAssetNo.invalid;
  }

  get invalidEquipmentOrAsset() {
    return this.DetailMaxForm.controls.equipmentOrAsset.touched && this.DetailMaxForm.controls.equipmentOrAsset.invalid;
  }

  get invalidBoiNo() {
    return this.DetailMaxForm.controls.boiNo.touched && this.DetailMaxForm.controls.boiNo.invalid;
  }

  get invalidParties() {
    return this.DetailMaxForm.controls.parties.touched && this.DetailMaxForm.controls.parties.invalid;
    // return false;
  }

  get invalidCycleMonth() {
    return this.DetailMaxForm.controls.cycleMonth.touched && this.DetailMaxForm.controls.cycleMonth.invalid;
  }

  get invalidIl5() {
    return this.DetailMaxForm.controls.iL5Date.touched && this.DetailMaxForm.controls.iL5Date.invalid;
  }

  get invalidRam() {
    return this.DetailMaxForm.controls.ram.touched && this.DetailMaxForm.controls.ram.invalid;
  }

  get invalidJfactor() {
    return this.DetailMaxForm.controls.jFactor.touched && this.DetailMaxForm.controls.jFactor.invalid;
  }

  getErrorField(field: string) {
    return this.DetailMaxForm.get(field).touched && this.DetailMaxForm.get(field).invalid;
  }
  // get requireDirectBenefit() {
  //   return this.DetailMaxForm.value.requireDirectBenefit;
  // }
  // get requireIndirectBenefit() {
  //   return this.DetailMaxForm.value.requireIndirectBenefit;
  // }
  get requireCAPEX() {
    return this.formGroup.get('initiativesForm').get('requestCapex') ? this.formGroup.get('initiativesForm').get('requestCapex').value === 'true' : false
  }

  get requireOPEX() {
    return this.formGroup.get('initiativesForm').get('requestOpex') ? this.formGroup.get('initiativesForm').get('requestOpex').value === "trueOpex" : false
  }

  get typeOfbenefit() {
    return this.formGroup.get('initiativesForm').get('typeBenefit') ? this.formGroup.get('initiativesForm').get('typeBenefit').value : null
  }


  ngOnInit(): void {
   
    if (!this.formGroup.get('DetailMaxForm')) {
      this.formGroup.addControl('DetailMaxForm', this.DetailMaxForm);
    }
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
    this.detailInformationService.GetFrequency().subscribe(frequency => this.frequencies = frequency);
    this.GetSuggestStatus(this.id);
    // Set Timeline value from general tab
    this.maxService.GetInitiativeTypeMax().subscribe(type => this.types = type);
    this.impactService.GetWorkStream().subscribe(workStreams => this.workStreams = workStreams);
    this.GetYears();
    this.GetDetailInformation(this.id);
    // this.IsDetailMax();
    // this.SetGeneral();
    this.GetPresident();
    this.GetManager();
    this.GetProjectManager();
    this.GetProcurementCategory();
    this.GetProcurementSubCategory();
    this.GetProcurementLever();
    // this.OnchangeUsefulYear();
    this.GetCurrentProjectManager()
  }
 
  InitialProjectStrategyDropdownList() {
    let dropdownMock = [
      'Operations',
      'Reliability',
      'Marketing and Sales',
      'Supply chain',
      'Logistics',
      'Business support functions',
      'Digital / IT foundation'
    ]
    dropdownMock.forEach(element => {
      this.projectCategory.push({ attribute01: element, attribute03: element, attribute02: element });
    });
  }

  InitialDigitalStrategyDropdownList() {
    let dropdownMock = [
      'Smart plant',
      'Smart sales and marketing',
      'Smart process',
      'Smart workplace',
      'Technology foundation'
    ];
    dropdownMock.forEach(element => {
      this.digitalStrategy.push({ attribute01: element, attribute03: element, attribute02: element });
    });
  }

  InitialProjectGroupDropdownList() {
    let dropdownMock = [
      {dropDownLabel:'Group A - Strategic',dropDownValue:'Group A Strategic',disabled: false},
      {dropDownLabel:'Group A - Foundation',dropDownValue:'Group A Foundation',disabled: false},
      {dropDownLabel:'Group A - Law, Regulation and Safety',dropDownValue:'Group A Law, Regulation and Safety',disabled: false},
      {dropDownLabel:'Group A - Reliability',dropDownValue:'Group A Reliability',disabled: true},
      {dropDownLabel:'Group A - Replacement for obsolete system', dropDownValue:'Group A Replace obsoleted system',disabled: false},
      {dropDownLabel:'Group A - New Technology (POC)',dropDownValue:'Group A New Technology (POC)',disabled: true},
      {dropDownLabel:'Group B - Benefit Base',dropDownValue:'Group B Benefit Base',disabled: false},
    ]

    dropdownMock.forEach(element => {
      this.valueChain.push({ attribute01: element.dropDownValue, attribute02: element.dropDownLabel , disabled : element.disabled });
    })
  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();

  }

  getDimMember() {
    const ProjectSponsorSelect = [];
    this.dimService.GetDimMember({ initiativeId: this.id, memberType: 'ProjectSponsor' }).subscribe((result) => {
      this.ProjectSponsor = result;
      this.ProjectSponsor.forEach((e) => {
        ProjectSponsorSelect.push(e.memberName);
      });
      this.DetailMaxForm.patchValue({ projectSponsor: ProjectSponsorSelect[0] });
    });

    // const SponsorEvp = [];
    // this.dimService.GetDimMember({ initiativeId: this.id, memberType: 'SponsorEvp' }).subscribe((result) => {
    //   this.SponsorEvp = result;
    //   this.SponsorEvp.forEach((e) => {
    //     SponsorEvp.push(e.memberName);
    //   });
    //   this.DetailMaxForm.patchValue({ sponsorEvp: SponsorEvp[0] });
    // });
    const ITFocalPointSelect = [];
    this.dimService.GetDimMember({ initiativeId: this.id, memberType: 'ITFocalPoint' }).subscribe((result) => {
      if (Array.isArray(result)) {
        // this.ITFocalPoint = result;
        // this.ITFocalPoint.forEach((e) => {
        //   ITFocalPointSelect.push(e.memberName);
        // });
        // this.DetailMaxForm.patchValue({ iTFocalPoint: ITFocalPointSelect });
        if (result.length > 0) {
          this.DetailMaxForm.patchValue({ iTFocalPoint: result[0].memberName });
        }
      }
    });
    const ImpactedPartiesSelect = [];
    this.dimService.GetDimMember({ initiativeId: this.id, memberType: 'ImpactedParties' }).subscribe((result) => {
      this.ImpactedParties = result;
      this.ImpactedParties.forEach((e) => {
        ImpactedPartiesSelect.push(e.memberName);
      });
      this.DetailMaxForm.patchValue({ impactedParties: ImpactedPartiesSelect });
    });
    const TeamMemberSelect = [];
    this.dimService.GetDimMember({ initiativeId: this.id, memberType: 'TeamMember' }).subscribe((result) => {
      this.TeamMember = result;
      this.TeamMember.forEach((e) => {
        TeamMemberSelect.push(e.memberName);
      });
      this.DetailMaxForm.patchValue({ teamMember: TeamMemberSelect });
    });

    const DigitalFocalPointSelect = [];
    this.dimService.GetDimMember({ initiativeId: this.id, memberType: 'digitalFocalPoint' }).subscribe((result) => {
      this.DigitalFocalPoint = result;
      this.DigitalFocalPoint.forEach((e) => {
        DigitalFocalPointSelect.push(e.memberName);
      });
      this.DetailMaxForm.patchValue({ digitalFocalPoint: DigitalFocalPointSelect[0] });
    });
  }



  get invalidSubmit() {
    return this.DetailMaxForm.valid;
  }

  get calculateDepreciationCost() {
    let initiativesForm = this.formGroup.get('initiativesForm') ? this.formGroup.get('initiativesForm').value : null;
    if (initiativesForm) {
      let year = initiativesForm.finishingDate != null ? new Date(initiativesForm.finishingDate).getFullYear() : null;
      let cost = initiativesForm.costEstCapex != null ? parseFloat(initiativesForm.costEstCapex) : null;
      if (year && cost) {
        let endDate = year.toString() + '-12-31';
        let firstdate = year.toString() + '-1-1';
        let endOfYear = new Date(endDate).valueOf();
        let firstOfYear = new Date(firstdate).valueOf();
        let start = new Date(initiativesForm.finishingDate).valueOf();
        let diff = endOfYear - start;
        let diffAllYear = endOfYear - firstOfYear;
        let oneDay = 1000 * 60 * 60 * 24;
        let day = Math.floor(diff / oneDay);
        let dayAllYear = Math.floor((diffAllYear + oneDay) / oneDay);
        let usefulYear: number = this.DetailMaxForm.get('usefulYear').value ? this.DetailMaxForm.get('usefulYear').value : 0;
        let usefulMonth: number = this.DetailMaxForm.get('usefulMonth').value ? this.DetailMaxForm.get('usefulMonth').value : 0;
        let usefulCal = parseFloat((usefulMonth / 12).toFixed(2)) + usefulYear;
        if (usefulCal != 0) {
          this.DetailMaxForm.get('depreciationCost').setValue(((cost / usefulCal) * (day / dayAllYear)).toFixed(2));
        } else {
          this.DetailMaxForm.get('depreciationCost').setValue('0');
        }
        return true;
      } else {
        this.DetailMaxForm.get('depreciationCost').setValue('0');
        return false;
      }
    } else {
      this.DetailMaxForm.get('depreciationCost').setValue('0');
      return false;
    }

  }

  SearchProjectManager(event) {
    this.GetProjectManager(event.term);
  }

  ClearProjectManager() {
    this.GetProjectManager();
  }

  GetProjectManager(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.projectManagerList = owners;
    });
  }

  SearchPresident(event) {
    this.GetPresident(event.term);
  }

  ClearPresident() {
    this.GetPresident();
    this.capexService.setViceOwner(this.formGroup, null);
  }

  GetPresident(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.presidentList = owners;
    });
  }

  SearchManager(event) {
    this.GetManager(event.term);
  }

  ClearGetManager() {
    this.GetManager();
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

  GetProcurementCategory() {
    this.detailService.GetProcurementCategory().subscribe(procurementName => this.procurementCategoryList = procurementName);
  }

  GetProcurementSubCategory() {
    this.detailService.GetProcurementSubCategory().subscribe(procurementName => this.procurementSubCategoryList = procurementName);
  }

  GetProcurementLever() {
    this.detailService.GetProcurementLever().subscribe(procurementName => this.procurementLeverList = procurementName);
  }

  SetGeneral() {
    if (sessionStorage.getItem('InitiativeValidated') === 'true') {
      sessionStorage.setItem('InitiativeValidate', 'true');
      sessionStorage.setItem('InitiativeActive', 'true');
    }
  }


  //dim
  GetCoDevelopers(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetCoDevelopers(this.params).subscribe(coDevelopers => {
      this.coDevelopers = coDevelopers;
    });
  }

  SearchCoDeveloper(event) {
    this.GetCoDevelopers(event.term);
  }

  RemoveCoDeveloper() {
    this.GetCoDevelopers();
  }

  //GetPresident() {
  //  this.detailService.GetPositionLevel30().subscribe(systemName => this.presidentList = systemName);
  //}

  //GetManager() {
  //  this.detailService.GetPositionLevel40().subscribe(systemName => this.managerList = systemName);
  //}

  GetSuggestStatus(id) {
    this.initiativeService.GetSuggestStatus(id).subscribe(response => {
      if (response) {
        this.initiativeService.suggestionStatus = response;

        // if (this.initiativeService.dimConfig) {
        //   //dim same capex

        //   this.status = response.status;
        //   this.stage = response.stage;
        //   this.remark = response.remark ? response.remark : null;
        //   this.Cim = response.cim ? true : false;
        //   this.Dim = false;
        //   this.CheckDim = false;
        //   this.Capex = response.directCapex || response.dim ? true : false;
        //   this.Strategy = response.strategy ? true : false;
        //   this.Max = response.max ? true : false;
        //   //this.CheckCapex = response.requestCapex ? true : false;
        //   this.RequestCapex = response.requestCapex ? true : false;
        //   this.status = response.status;
        // } else {
        //is dim origianl

        this.status = response.status;
        this.stage = response.stage;
        this.remark = response.remark ? response.remark : null;
        this.Cim = response.cim ? true : false;
        this.Dim = response.dim ? true : false;
        this.CheckDim = response.dim ? true : false;
        this.Capex = response.directCapex ? true : false;
        this.Strategy = response.strategy ? true : false;
        this.Max = response.max ? true : false;
        // this.CheckCapex = response.requestCapex ? true : false;
        // this.CheckCapex = this.initiativeService.ShowTabCapex ? true : false;
        this.RequestCapex = response.requestCapex ? true : false;
        this.status = response.status;

        //dim
        this.GetCoDevelopers();
        this.initiativeService.GetInitiative(this.id).subscribe(res => {
          this.CapexCost = parseFloat(res.costEstCapex?.toString());
          this.OpexCost = parseFloat(res.costEstOpex?.toString());
          this.CostEstCapexType = res.costEstCapexType;
          this.CostEstOpexType = res.costEstOpexType;
          this.DetailMaxForm.get('totalBenefit').patchValue(this.CapexCost ? this.CapexCost : 0 + this.OpexCost ? this.OpexCost : 0);
        })

        this.InitialDigitalStrategyDropdownList();
        this.InitialProjectStrategyDropdownList();
        this.InitialProjectGroupDropdownList();
        if (!this.formGroup.get('DimHandoverForm')) {
          this.formGroup.addControl('DimHandoverForm', this.DimHandoverForm);
          this.formGroup.get('DimHandoverForm').patchValue({ initiativeId: this.initiativeService.id });
        }
        if (this.initiativeService.suggestionStatus.dim) {
          this.dimService.GetHandover(this.initiativeService.id).subscribe((response) => {
            if (response) {

              if (response.isRequestITHandover) {
                this.IsCheckBoxRequestIT = true;
              } else {
                this.IsCheckBoxRequestIT = false;
              }

              this.formGroup.get('DimHandoverForm').patchValue(response);
              this.formGroup.get('DimHandoverForm').patchValue({
                startDate: new Date(response.startDate),
                finishDate: new Date(response.finishDate),
                acceptDate: response.acceptDate ? new Date(response.acceptDate) : new Date()
              });
              if (response.isAcceptHandover) {
                this.formGroup.get('DimHandoverForm').patchValue({
                  acceptDate: new Date(response.acceptDate)
                });
              }
            }
          });
        }

        let dimShowList = ['Adopt - Golive', 'Adopt - Closure',
          'Completed', 'Adopt IL3 - Golive', 'Adopt SIL4 - Closure',
          'Adopt IL4', 'Adopt SIL5', 'IL5', 'Adopt IL3', 'Adopt SIL4',
          'Adopt']
        let permissionPMODim: RolePermissionModel = this.userPermission.find(x =>
            x.roleName.toLowerCase() === "pmo dim"
          );
        if (this.initiativeService.suggestionStatus.dim && (dimShowList.indexOf(this.initiativeService.suggestionStatus.stage) !== -1)) {
          if(!(permissionPMODim && permissionPMODim.isEnable)) this.DetailMaxForm.disable();
          this.ShowHandover = true;
        }
        // this.CheckPage();
        this.calculateDepreciationCost;

        if (this.initiativeService.viewMode) {
          this.DetailMaxForm.disable();
        }
        // }

        this.SetValidateForm();
        this.CheckPage();
        if (this.stage === 'IL5') {
          this.DetailMaxForm.disable();
        }
      }

    });
  }

  CheckValidate() {
    if (sessionStorage.getItem('DetailMaxValidate') === 'false') {
      this.SetMarkAsTouchedForm();
    }
  }

  ngOnDestroy() {
    this.initiativeService.selectDigitalCapex = false;
  }

  CheckPage() {
    if (this.Max) {
      this.CheckMax = true;
      this.DetailMaxForm.controls.strategy.enable();
      this.DetailMaxForm.patchValue({ strategicObjective: '1' });
      this.detailService.GetStrategies(1).subscribe(strategies => this.strategies = strategies);
      this.DetailMaxForm.patchValue({ strategy: null });
    }

    // if (this.Capex) {
    //   this.CheckCapex = true;
    // }
    // switch (this.page) {
    //   case 'direct-capex':
    //     this.CheckCapex = true;
    //     if (sessionStorage.getItem('InitiativeValidate_capex')) {
    //       if (sessionStorage.getItem('InitiativeValidate_capex') === 'true') {
    //         sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(true));
    //       } else {
    //         sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
    //       }
    //     } else {
    //       sessionStorage.setItem('InitiativeValidate_capex', JSON.stringify(false));
    //     }
    //     break;
    //   case 'detail-max':
    //     this.CheckMax = true;
    //     this.DetailMaxForm.controls.strategy.enable();
    //     this.DetailMaxForm.patchValue({ strategicObjective: '1' });
    //     this.detailService.GetStrategies(1).subscribe(strategies => this.strategies = strategies);
    //     this.DetailMaxForm.patchValue({ strategy: 'S2020_004' });
    //     break;
    // }
  }



  SetValidateForm() {
    if (this.CheckCapex) {
      if (!this.stage) {
        this.DetailMaxForm.controls.president.setValidators([Validators.required]);
        this.DetailMaxForm.controls.president.updateValueAndValidity();
        this.DetailMaxForm.controls.manager.setValidators([Validators.required]);
        this.DetailMaxForm.controls.manager.updateValueAndValidity();
        this.DetailMaxForm.controls.projectManager.setValidators([Validators.required]);
        this.DetailMaxForm.controls.projectManager.updateValueAndValidity();
        this.DetailMaxForm.controls.baseCase.setValidators([Validators.required]);
        this.DetailMaxForm.controls.baseCase.updateValueAndValidity();
        this.DetailMaxForm.controls.projectIrrBaseCase.setValidators([Validators.required]);
        this.DetailMaxForm.controls.projectIrrBaseCase.updateValueAndValidity();
        this.DetailMaxForm.controls.npvBaseCase.setValidators([Validators.required]);
        this.DetailMaxForm.controls.npvBaseCase.updateValueAndValidity();
        this.DetailMaxForm.controls.paybackBaseCase.setValidators([Validators.required]);
        this.DetailMaxForm.controls.paybackBaseCase.updateValueAndValidity();
        this.DetailMaxForm.controls.ebitdaBaseCase.setValidators([Validators.required]);
        this.DetailMaxForm.controls.ebitdaBaseCase.updateValueAndValidity();
        this.DetailMaxForm.controls.depreciationCost.setValidators([Validators.required]);
        this.DetailMaxForm.controls.depreciationCost.updateValueAndValidity();
        this.DetailMaxForm.controls.usefulYear.setValidators([Validators.required]);
        this.DetailMaxForm.controls.usefulYear.updateValueAndValidity();
        this.DetailMaxForm.controls.usefulMonth.setValidators([Validators.required]);
        this.DetailMaxForm.controls.usefulMonth.updateValueAndValidity();
        this.DetailMaxForm.controls.cutFeedDate.setValidators([Validators.required]);
        this.DetailMaxForm.controls.cutFeedDate.updateValueAndValidity();
        this.DetailMaxForm.controls.startUpDate.setValidators([Validators.required]);
        this.DetailMaxForm.controls.startUpDate.updateValueAndValidity();
        this.DetailMaxForm.controls.cycleMonth.setValidators([Validators.required]);
        this.DetailMaxForm.controls.cycleMonth.updateValueAndValidity();
        this.DetailMaxForm.controls.cycleYear.setValidators([Validators.required]);
        this.DetailMaxForm.controls.cycleYear.updateValueAndValidity();
        this.DetailMaxForm.controls.equipmentName.setValidators([Validators.required]);
        this.DetailMaxForm.controls.equipmentName.updateValueAndValidity();
        this.DetailMaxForm.controls.replacementDate.setValidators([Validators.required]);
        this.DetailMaxForm.controls.replacementDate.updateValueAndValidity();
        this.DetailMaxForm.controls.oldAssetCondition.setValidators([Validators.required]);
        this.DetailMaxForm.controls.oldAssetCondition.updateValueAndValidity();
        this.DetailMaxForm.controls.equipmentOrAsset.setValidators([Validators.required]);
        this.DetailMaxForm.controls.equipmentOrAsset.updateValueAndValidity();
        this.DetailMaxForm.controls.boiNo.setValidators([Validators.required]);
        this.DetailMaxForm.controls.boiNo.updateValueAndValidity();
        this.DetailMaxForm.controls.capital.setValidators([Validators.required]);
        this.DetailMaxForm.controls.capital.updateValueAndValidity();
        this.DetailMaxForm.controls.catalyst.setValidators([Validators.required]);
        this.DetailMaxForm.controls.catalyst.updateValueAndValidity();
        this.DetailMaxForm.controls.software.setValidators([Validators.required]);
        this.DetailMaxForm.controls.software.updateValueAndValidity();
        this.DetailMaxForm.controls.rightOfUse.setValidators([Validators.required]);
        this.DetailMaxForm.controls.rightOfUse.updateValueAndValidity();
      }
    }
    if (this.CheckMax) {
      if (!this.stage) {
        this.SetValidateNullStage();
        this.SetValidateWorkstreamLead();
      } else {
        switch (this.stage) {
          case 'IL0':
          case 'IL2':
          case 'IL3-2':
          case 'IL4':
          case 'IL5':
            this.SetValidateWorkstreamLead();
            break;
          case 'IL1':
            this.SetValidateStageIL1();
            this.SetValidateWorkstreamLead();
            break;
        }
      }
    }
    this.CheckValidate();
  }

  SetValidateNullStage() {
    // this.DetailMaxForm.controls.initiativeTypeMax.setValidators([Validators.required]);
    // this.DetailMaxForm.controls.initiativeTypeMax.updateValueAndValidity();
    // this.DetailMaxForm.controls.workstream.setValidators([Validators.required]);
    // this.DetailMaxForm.controls.workstream.updateValueAndValidity();
    // this.DetailMaxForm.controls.subWorkstream2.setValidators([Validators.required]);
    // this.DetailMaxForm.controls.subWorkstream2.updateValueAndValidity();
  }

  SetValidateWorkstreamLead() {
    // this.DetailMaxForm.controls.workstreamLead.setValidators([Validators.required]);
    // this.DetailMaxForm.controls.workstreamLead.updateValueAndValidity();
  }

  SetValidateStageIL1() {
    // this.DetailMaxForm.controls.iL3Date.setValidators([Validators.required]);
    // this.DetailMaxForm.controls.iL3Date.updateValueAndValidity();
    // this.DetailMaxForm.controls.iL4Date.setValidators([Validators.required]);
    // this.DetailMaxForm.controls.iL4Date.updateValueAndValidity();
    // this.DetailMaxForm.controls.iL5Date.setValidators([Validators.required]);
    // this.DetailMaxForm.controls.iL5Date.updateValueAndValidity();
  }



  GetYears() {
    const year = this.dateUtil.GetToday.getFullYear();
    for (let i = 1; i <= 5; i++) {
      this.years.push(year - i);
    }
    this.years.unshift(year + 1, year);
  }

  GetKpiDetail(id) {
    this.detailInformationService.GetKpiDetail(id).subscribe(response => {
      if (response) {

        this.StartDate = response.startingDate ? new Date(response.startingDate) : null;
        this.FinishDate = response.finishingDate ? new Date(response.finishingDate) : null;

        // const finishingDate = new Date(response.finishingDate);
        // this.bsConfigIL3Date.maxDate = response.finishingDate ? new Date(finishingDate.setDate(finishingDate.getDate())) : null;

        if (response.requestCapex === 'true') {
          this.CheckShowForm(response);
          this.RequestCapex = true;
        } else {
          this.RequestCapex = false;
          if (response.strategy) {
            this.IsShowFormCondition = true;
          } else {
            this.IsShowFormCondition = false;
          }
        }

        //Fixed MAX Validator
        if (this.Max) {
          //2020-08-02 Tempolary Solutuion Prevent MAX to Combine with other process
          // this.IsRequestCapex = false;

          this.DetailMaxForm.controls.initiativeTypeMax.setValidators([Validators.required]);
          this.DetailMaxForm.controls.initiativeTypeMax.updateValueAndValidity();

          this.DetailMaxForm.controls.workstream.setValidators([Validators.required]);
          this.DetailMaxForm.controls.workstream.updateValueAndValidity();

          this.DetailMaxForm.controls.subWorkstream2.setValidators([Validators.required]);
          this.DetailMaxForm.controls.subWorkstream2.updateValueAndValidity();

          this.DetailMaxForm.controls.workstreamLead.setValidators([Validators.required]);
          this.DetailMaxForm.controls.workstreamLead.updateValueAndValidity();
        }
        if (this.Dim) {
          this.DetailMaxForm.controls.initiativeTypeMax.clearValidators();
          this.DetailMaxForm.controls.initiativeTypeMax.updateValueAndValidity();

          this.DetailMaxForm.controls.workstream.clearValidators();
          this.DetailMaxForm.controls.workstream.updateValueAndValidity();

          this.DetailMaxForm.controls.subWorkstream2.clearValidators();
          this.DetailMaxForm.controls.subWorkstream2.updateValueAndValidity();

          this.DetailMaxForm.controls.workstreamLead.clearValidators();
          this.DetailMaxForm.controls.workstreamLead.updateValueAndValidity();
        }


        const year = response.year;

        this.detailService.GetStrategicObjectives(year).subscribe(result => this.strategicObjectives = result);

        this.DetailMaxForm.patchValue({ initiativeYear: response.year });

        // if (sessionStorage.getItem('isDetailMax') !== 'true') {
        this.kpiDetailInformations = response.kpiDetailInformations;
        if (this.kpiDetailInformations.length !== 0 && this.initiativeService.ShowTabCapex) {
          const KpiControl = this.DetailMaxForm.controls.kpisForm.get('kpis') as FormArray;
          for (let i = 0; i < this.kpiDetailInformations.length; i++) {
            KpiControl.push(this.DetailKpisForm());
            KpiControl.at(i).patchValue(this.kpiDetailInformations[i]);
            KpiControl.at(i).get('id').patchValue(0);
            this.kpiArray.push({ id: i, title: this.kpiDetailInformations[i].kpis });
          }
          this.SetKpiSelect();
          this.isRemoveKpis = KpiControl.length > 1 ? false : true;
          this.isDisableAddKpis = KpiControl.length === this.kpises.length ? true : false;
        } else if (this.kpiDetailInformations.length === 0 && this.generalData.requestCapex) {
          this.AddKpis();
        } else if (this.DetailMaxForm.get('kpisForm') && !this.generalData.requestCapex) {
          this.DetailMaxForm.removeControl('kpisForm');
        }

        if (this.initiativeService.viewMode) {
          this.DetailMaxForm.get('kpisForm')?.disable();
        }
        // }
      }
    });
  }

  CheckShowForm(response) {
    const typeOfInvestment = response.typeOfInvestment;
    if (typeOfInvestment) {
      if (typeOfInvestment.indexOf('Growth') !== -1 || typeOfInvestment.indexOf('Sustain Core') !== -1) {
        const words = typeOfInvestment.split(':');
        if (words[0]) {
          if (['Growth', 'Sustain Core'].indexOf(words[0]) !== -1) {
            switch (words[0]) {
              case 'Growth':
              case 'Sustain Core':
                this.IsShowFormCondition = true;
                break;
              default:
                this.IsShowFormCondition = false;
                break;
            }
          }
        }
      }
    }
  }

  CheckProcurement(workstream, proCategory, proLever, proSubCategory) {
    if (workstream === 'Procurement') {
      this.IsShowProcurement = true;
      this.DetailMaxForm.controls.proCategory.enable();
      this.DetailMaxForm.controls.proSubCategory.enable();
      this.DetailMaxForm.controls.proLever.enable();
      this.DetailMaxForm.patchValue({ proCategory: proCategory, proSubCategory: proSubCategory, proLever: proLever });
    } else {
      this.IsShowProcurement = false;
      this.DetailMaxForm.controls.proCategory.disable();
      this.DetailMaxForm.controls.proSubCategory.disable();
      this.DetailMaxForm.controls.proLever.disable();
    }
  }

  GetDetailInformation(id) {

    this.initiativeService.GetInitiative(this.id).subscribe(generalRes => {
      this.Irr = generalRes.irr;
      this.PaybackPeriod = generalRes.payBackPeriod;
      this.isERSource = generalRes.budgetSource == 'ER' ? true : false;
      this.generalData = generalRes;
      this.initiativeService.ShowTabCapex = (generalRes.directCapex && !generalRes.requestProjectEngineer) || generalRes.capexTabStatus && generalRes.capexTabStatus > 0 ? true : false;
      this.CheckCapex = generalRes.directCapex ? true : false;
      this.requireFieldReqestCapex = (generalRes.directCapex && !generalRes.requestProjectEngineer) || generalRes.capexTabStatus && generalRes.capexTabStatus > 0 ? true : false;
      this.RequestProjectEngineer = generalRes.requestProjectEngineer ? true : false;

      if (generalRes.typeOfInvestment == "Digital CAPEX") {
        this.selectDigitalCapex = true;
        this.initiativeService.selectDigitalCapex = true;
      }

      let Indicator;
      if (generalRes.requestProjectEngineer || this.Dim) {
        Indicator = {
          variable: ['projectSponsor', 'president', 'manager', 'projectManager'],
          indicator: ['@EVP', '@VP', '@DM', '@projectmanager']
        };
      }else{
        Indicator = {
          variable: ['projectSponsor', 'president', 'manager'],
          indicator: ['@EVP', '@VP', '@DM']
        };
      }

      //Satety , Environment , Law & Regulation
      if (this.initiativeService.typeOfInvestmentShowRam.map((t) => t?.toLowerCase()).indexOf(generalRes.typeOfInvestment?.toLowerCase()) >= 0) {
        this.IsShowRamAmdJFactor = true;
      }

      if (generalRes.typeBenefit === 'FINANCIAL') {
        this.IsShowReturn = true;
      }

      this.detailInformationService.GetDetailInformation(id).subscribe(response => {
        if (response) {
          if (this.stageService.IsOriginalDisable.map((t) => t?.toLowerCase()).indexOf(this.initiativeService.suggestionStatus.stage?.toLowerCase()) >= 0) {
            this.IsOriginalDisable = true;
          } else {
            this.IsOriginalDisable = false;
          }


          if (this.stageService.IsOriginalRequire.map((t) => t?.toLowerCase()).indexOf(this.initiativeService.suggestionStatus.stage?.toLowerCase()) >= 0) {
            this.IsOriginalRequire = true;
          } else {
            this.IsOriginalRequire = false;
          }

          let year = generalRes.finishingDate != null ? new Date(generalRes.finishingDate).getFullYear() : null;
          let cost = generalRes.costEstCapex != null ? parseFloat(generalRes.costEstCapex?.toString()) : null;
          let usefulYear: number = 20;
          let usefulMonth: number = 0;
          let depreciationCost: string = '0';
          if (year && cost) {
            let endDate = year.toString() + '-12-31';
            let firstdate = year.toString() + '-1-1';
            let endOfYear = new Date(endDate).valueOf();
            let firstOfYear = new Date(firstdate).valueOf();
            let start = new Date(generalRes.finishingDate).valueOf();
            let diff = endOfYear - start;
            let diffAllYear = endOfYear - firstOfYear;
            let oneDay = 1000 * 60 * 60 * 24;
            let day = Math.floor(diff / oneDay);
            let dayAllYear = Math.floor((diffAllYear + oneDay) / oneDay);
            usefulYear = response.usefulYear ? response.usefulYear : 20;
            usefulMonth = response.usefulMonth ? response.usefulMonth : 0;
            let usefulCal = parseFloat((usefulMonth / 12).toFixed(2)) + usefulYear;
            if (usefulCal != 0) {
              depreciationCost = ((cost / usefulCal) * (day / dayAllYear)).toFixed(2);
              response.depreciationCost ? false : this.DetailMaxForm.get('depreciationCost').setValue(((cost / usefulCal) * (day / dayAllYear)).toFixed(2));

            } else {
              response.depreciationCost ? false : this.DetailMaxForm.get('depreciationCost').setValue('0');
            }
          }


          //set value to capex
          let managerDetail: {
            manager: string;
            projectManager: string;
          } = {
            manager: response.manager,
            projectManager: response.projectManager
          }

          this.capexService.changeManagerDetail(managerDetail);


          this.Detail = response.id;
          this.DetailMaxForm.patchValue(response);
          this.DetailMaxForm.patchValue({
            forEnvironment: response.forEnvironment == "true" ? "true" : "false",
            forTurnaround: response.forTurnaround == "true" ? "true" : "false",
            replaceEquipment: response.replaceEquipment == "true" ? "true" : "false",
            boi: response.boi == "true" ? "true" : "false",
            haveAdditional: response.haveAdditional == "true" ? "true" : "false",
            coordinate: response.coordinate == "true" ? "true" : "false",
            usefulYear: response.usefulYear ? response.usefulYear : 20,
            usefulMonth: response.usefulMonth ? response.usefulMonth : 0,
            depreciationCost: response.depreciationCost ? response.depreciationCost : depreciationCost,
          });
          this.requireDirectBenefit = response.requireDirectBenefit;
          this.requireIndirectBenefit = response.requireIndirectBenefit;

          this.IsShowTurnAround = response.forTurnaround == "true" ? true : false;
          this.IsShowReplace = response.replaceEquipment == "true" ? true : false;
          this.IsShowBOI = response.boi == "true" ? true : false;
          this.IsShowAdditional = response.haveAdditional == "true" ? true : false;
          this.IsShowParties = response.coordinate == "true" ? true : false;

          this.DetailMaxForm.get('iL3Date').setValue(response.iL3Date ? new Date(response.iL3Date) : null);
          this.DetailMaxForm.get('iL4Date').setValue(response.iL4Date ? new Date(response.iL4Date) : null);
          this.DetailMaxForm.get('iL5Date').setValue(response.iL5Date ? new Date(response.iL5Date) : null);
          this.DetailMaxForm.get('cutFeedDate').setValue(response.cutFeedDate ? new Date(response.cutFeedDate) : null);
          this.DetailMaxForm.get('startUpDate').setValue(response.startUpDate ? new Date(response.startUpDate) : null);
          this.DetailMaxForm.get('replacementDate').setValue(response.replacementDate ? new Date(response.replacementDate) : null);
          this.DetailMaxForm.get('baselineStartDate') ? this.DetailMaxForm.get('baselineStartDate').setValue(response.baselineStartDate ? new Date(response.baselineStartDate) : new Date(generalRes.startingDate)) : null;
          this.DetailMaxForm.get('baselineFinishDate') ? this.DetailMaxForm.get('baselineFinishDate').setValue(response.baselineFinishDate ? new Date(response.baselineFinishDate) : new Date(generalRes.finishingDate)) : null;
          this.DetailMaxForm.get('reviseForecastStartDate') ? this.DetailMaxForm.get('reviseForecastStartDate').setValue(response.reviseForecastStartDate ? new Date(response.reviseForecastStartDate) : null) : null;
          this.DetailMaxForm.get('reviseForecastFinishDate') ? this.DetailMaxForm.get('reviseForecastFinishDate').setValue(response.reviseForecastFinishDate ? new Date(response.reviseForecastFinishDate) : null) : null;
          this.DetailMaxForm.get('actualStartDate') ? this.DetailMaxForm.get('actualStartDate').setValue(response.actualStartDate ? new Date(response.actualStartDate) : null) : null;
          this.DetailMaxForm.get('actualFinishDate') ? this.DetailMaxForm.get('actualFinishDate').setValue(response.actualFinishDate ? new Date(response.actualFinishDate) : null) : null;
          this.DetailMaxForm.get('isDeliverAsPerCommittedCost').patchValue(response.isDeliverAsPerCommittedCost ? 'true' : 'false')
          this.OnChangeCost();
          this.DetailMaxForm.get('isDeliverAsPerCommittedDate').patchValue(response.isDeliverAsPerCommittedDate ? 'true' : 'false')
          this.OnChangeTimeLine();
          this.DetailMaxForm.get('isDeliverAsPerCommittedScope').patchValue(response.isDeliverAsPerCommittedScope ? 'true' : 'false')

          this.OnChangeScope();
          if (response.strategicObjective) {
            this.detailService.GetStrategies(response.strategicObjective).subscribe(strategies => this.strategies = strategies);
          }
          if (response.strategy) {
            this.DetailMaxForm.controls.strategy.enable();
          } else {
            this.DetailMaxForm.controls.strategy.disable();
          }

          this.DetailMaxForm.patchValue({ requestSubPIC: response.requestSubPic });
          if (response.fixedAsset) {
            this.FixedAsset = response.fixedAsset;
            this.IsRequestSubPIC = response.requestSubPic;
          }

          if (response.workstream) {
            if (!this.initiativeService.viewMode) this.DetailMaxForm.get('subWorkstream2').enable();
            this.maxService.GetSubWorkstream(response.workstream).subscribe(subWorkstream => this.subWorkstreams = subWorkstream);
            if (!this.initiativeService.viewMode) this.DetailMaxForm.get('workstreamLead').enable();
            this.WorkstreamLead(response.workstream);
            this.maxService.GetWorkstreamLead(this.id).subscribe(approve => {
              if (approve) {
                this.WorkstreamLeader = approve.approverEmail;
                this.DetailMaxForm.patchValue({ workstreamLead: approve.approverEmail });
              } else {
                this.WorkstreamLeader = null;
                this.DetailMaxForm.patchValue({ workstreamLead: '' });
              }
            });
          } else {
            this.DetailMaxForm.controls.subWorkstream2.disable();
            this.DetailMaxForm.controls.workstreamLead.disable();
          }

          if (response.subWorkstream2) {
            this.SubWorkstream(response.subWorkstream2);
          }

          this.CheckProcurement(response.workstream, response.proCategory, response.proLever, response.proSubCategory);

          // this.GetSetDate(response);

          if (this.IsShowRamAmdJFactor) {
            this.DetailMaxForm.patchValue({
              ram: response.ram?.toString().length > 0 ? response.ram : generalRes.ram,
              jFactor: response.jFactor?.toString().length > 0 ? response.jFactor : generalRes.jFactor
            });
          }


          this.DetailMaxForm.patchValue({
            projectIrrBaseCase: response.projectIrrBaseCase?.toString().length > 0 ? response.projectIrrBaseCase : this.Irr,
            paybackBaseCase: response.paybackBaseCase?.toString().length > 0 ? response.paybackBaseCase : this.PaybackPeriod,
          });

          this.DetailMaxForm.patchValue({
            oldAssetCondition: response.oldAssetCondition ? response.oldAssetCondition : '',
          });

          if (this.CheckCapex) {
            this.OnChangeBOI();
            this.OnChangeTurnaround();
            this.OnChangeOldAsset();
            this.OnChangeReplaceEquipment();
            this.OnChangeCoordinate();
            this.OnChangeAdditional();
          }
          this.getDimMember();

          if (this.stage === 'IL5') {
            this.DetailMaxForm.disable();
          }

          // if (response.requireDirectBenefit && !this.initiativeService.viewMode) {
          //   this.DetailMaxForm.get('sponsorEvp').enable();
          //   this.DetailMaxForm.get('toFinance').enable();
          //   this.DetailMaxForm.get('cfo').enable();
          //   this.DetailMaxForm.get('cto').enable();
          // }

        } else {
          //auto SVP VP DM
          Indicator.indicator.forEach((ind, index) => {
            let IndicatorData: any = {
              initiativeId: this.initiativeService.id,
              indicator: ind
            }
            this.initiativeService.GetOwnerNameByIndicator(IndicatorData).then((responseInd) => {
              // if(Indicator.variable[index] == 'coDevelopers'){
              //   this[Indicator.variable[index]] = responseInd;
              // }else{
              //   this[Indicator.variable[index]] = Indicator.variable[index];
              // }
              this.DetailMaxForm.get(Indicator.variable[index]).setValue(responseInd && responseInd[0] ? responseInd[0].ownerName : null);
            });
          });


          let year = generalRes.finishingDate != null ? new Date(generalRes.finishingDate).getFullYear() : null;
          let cost = generalRes.costEstCapex != null ? parseFloat(generalRes.costEstCapex?.toString()) : null;
          if (year && cost) {
            let endDate = year.toString() + '-12-31';
            let firstdate = year.toString() + '-1-1';
            let endOfYear = new Date(endDate).valueOf();
            let firstOfYear = new Date(firstdate).valueOf();
            let start = new Date(generalRes.finishingDate).valueOf();
            let diff = endOfYear - start;
            let diffAllYear = endOfYear - firstOfYear;
            let oneDay = 1000 * 60 * 60 * 24;
            let day = Math.floor(diff / oneDay);
            let dayAllYear = Math.floor((diffAllYear + oneDay) / oneDay);
            let usefulYear: number = this.DetailMaxForm.get('usefulYear').value ? this.DetailMaxForm.get('usefulYear').value : 20;
            let usefulMonth: number = this.DetailMaxForm.get('usefulMonth').value ? this.DetailMaxForm.get('usefulMonth').value : 0;
            let usefulCal = parseFloat((usefulMonth / 12).toFixed(2)) + usefulYear;
            if (usefulCal != 0) {
              this.DetailMaxForm.get('depreciationCost').setValue(((cost / usefulCal) * (day / dayAllYear)).toFixed(2));
            } else {
              this.DetailMaxForm.get('depreciationCost').setValue('0');
            }
          } else {
            this.DetailMaxForm.get('depreciationCost').setValue('0');
          }
          this.DetailMaxForm.patchValue({
            iL3Date: null,
            iL4Date: new Date(generalRes.finishingDate),
            projectIrrBaseCase: this.Irr,
            paybackBaseCase: this.PaybackPeriod,
            baselineStartDate: new Date(generalRes.startingDate),
            baselineFinishDate: new Date(generalRes.finishingDate)
          });
          if (generalRes.initiativeType.toLowerCase() == 'dim') {
            this.DetailMaxForm.patchValue({
              forEnvironment: "false",
              forTurnaround: "false",
              replaceEquipment: "false",
              boi: "false",
            });
            this.IsShowTurnAround = false;
            this.IsShowReplace = false;
            this.IsShowBOI = false;
          }
          if (this.IsShowRamAmdJFactor) {
            this.DetailMaxForm.patchValue({
              ram: generalRes.ram,
              jFactor: generalRes.jFactor
            });
          }
        }

        this.detailInformationService.GetKpis().subscribe(kpis => {
          this.kpises = kpis;
          this.kpises.forEach(result => result.disabled = false);
          this.GetKpiDetail(this.id);
        });

      });
    });
    if (this.initiativeService.viewMode) {
      this.DetailMaxForm.disable();
    }
  }

  storeViceOwner(event) {
    sessionStorage.setItem('ViceOwner', event.ownerName);
    this.capexService.setViceOwner(this.formGroup, event.ownerName);
  }

  getDateValue(field: string) {
    return this.DetailMaxForm.get(field).value;
  }

  OnChangeStrategic(event) {
    this.DetailMaxForm.get('strategy').enable();
    this.DetailMaxForm.get('strategy').updateValueAndValidity();
    this.DetailMaxForm.patchValue({ strategy: '' });
    const strategicObjectiveId = event.target.value;
    this.detailService.GetStrategies(strategicObjectiveId).subscribe(strategies => this.strategies = strategies);
  }

  WorkstreamLead(workstreamName) {
    this.workstreamList = [];
    this.maxService.GetMaxApprover({ name: workstreamName }).subscribe(workstreamList => {
      this.workstreamLead = workstreamList;
      this.detailService.workstreamLeader  = workstreamList;
      this.workstreamLead.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          if (owner) {
            this.workstreamList.push({ name: owner.ownerName, email: owner.email });
          }
        });
      });
    });
  }

  OnChangeWorkstreamLeader(event) {
    const workstreamLead = event.target.value;
    if (this.WorkstreamLeader !== workstreamLead) {
      if (this.Detail) {
        this.SetWorkstream();
      }
    }
  }

  SetWorkstream() {
    if (this.Detail) {
      setTimeout(() => {
        if (!this.initiativeService.viewMode) {

          this.DetailMaxForm.get('sponsorEvp').enable();
          this.DetailMaxForm.get('toFinance').enable();
          this.DetailMaxForm.get('cfo').enable();
          this.DetailMaxForm.get('cto').enable();
        }
        sessionStorage.setItem('SetWorkstream', 'true');
        sessionStorage.setItem('WorkstreamList', JSON.stringify(this.DetailMaxForm.value));
        this.DetailMaxForm.get('sponsorEvp').disable();
        this.DetailMaxForm.get('toFinance').disable();
        this.DetailMaxForm.get('cfo').disable();
        this.DetailMaxForm.get('cto').disable();
      }, 100);
    }
  }

  OnChangeWorkstream(event) {
    this.DetailMaxForm.get('subWorkstream2').enable();
    this.DetailMaxForm.get('subWorkstream2').updateValueAndValidity();

    this.DetailMaxForm.patchValue({ subWorkstream2: '' });

    this.DetailMaxForm.get('workstreamLead').enable();

    if (!this.stage) {
      // this.DetailMaxForm.controls.workstreamLead.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.workstreamLead.updateValueAndValidity();
    } else if (this.stage === 'IL5') {
      this.DetailMaxForm.get('workstreamLead').disable();
    }

    const workstreamName = event.target.value;
    this.maxService.GetSubWorkstream(workstreamName).subscribe(subWorkstream => this.subWorkstreams = subWorkstream);
    this.WorkstreamLead(workstreamName);

    this.DetailMaxForm.patchValue({
      workstreamLead: null,
      sponsorEvp: null,
      cfo: null,
      cto: null,
      toFinance: null
    });

    if (workstreamName === 'Procurement') {
      this.IsShowProcurement = true;
      this.DetailMaxForm.controls.proCategory.enable();
      this.DetailMaxForm.controls.proSubCategory.enable();
      this.DetailMaxForm.controls.proLever.enable();
      this.DetailMaxForm.patchValue({ proCategory: null, proSubCategory: null, proLever: null });
    } else {
      this.IsShowProcurement = false;
      this.DetailMaxForm.controls.proCategory.disable();
      this.DetailMaxForm.controls.proSubCategory.disable();
      this.DetailMaxForm.controls.proLever.disable();
    }

    this.SetWorkstream();
  }

  SubWorkstream(value) {
    const benefitAmount = this.formGroup.get('initiativesForm')?.get('benefitAmount')?.value;
    if (!this.checkNullValue(benefitAmount)) {
      return;
    }
    const sponsorSelect = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'Sponsor', initiativeId: this.id, benefit: this.formGroup.get('initiativesForm')?.get('benefitAmount')?.value }).subscribe(result => {
      this.sponsor = result;
      this.sponsor.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          if (owner) {
            this.sponsorList = [...this.sponsorList, { name: owner.ownerName, email: owner.email }];
            sponsorSelect.push(owner.email);
            this.DetailMaxForm.patchValue({ sponsorEvp: sponsorSelect });
          }
        });
      });
    });

    const toFinanceSelect = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'TO Finance', initiativeId: this.id, benefit: this.formGroup.get('initiativesForm')?.get('benefitAmount')?.value }).subscribe(result => {
      this.toFinance = result;
      this.toFinance.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          if (owner) {
            this.toFinanceList = [...this.toFinanceList, { name: owner.ownerName, email: owner.email }];
            toFinanceSelect.push(owner.email);
            this.DetailMaxForm.patchValue({ toFinance: toFinanceSelect });
            //console.log('owner', result);
          }
        });
      });
    });

    const cfoSelect = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'CFO', initiativeId: this.id, benefit: this.formGroup.get('initiativesForm')?.get('benefitAmount')?.value }).subscribe(result => {
      this.cfo = result;
      this.cfo.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          if (owner) {
            this.cfoList = [...this.cfoList, { name: owner.ownerName, email: owner.email }];
            cfoSelect.push(owner.email);
            this.DetailMaxForm.patchValue({ cfo: cfoSelect });
          }
        });
      });
    });

    const ctoSelect = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'CTO', initiativeId: this.id, benefit: this.formGroup.get('initiativesForm')?.get('benefitAmount')?.value }).subscribe(result => {
      this.cto = result;
      this.cto.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          if (owner) {
            this.ctoList = [...this.ctoList, { name: owner.ownerName, email: owner.email }];
            ctoSelect.push(owner.email);
            this.DetailMaxForm.patchValue({ cto: ctoSelect });
          }
        });
      });
    });

    const TOTeamSelect = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'TOTeam', initiativeId: this.id, benefit: this.formGroup.get('initiativesForm')?.get('benefitAmount')?.value }).subscribe(result => {
      this.tot = result;
      this.tot.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          if (owner) {
            this.totList = [...this.totList, { name: owner.ownerName, email: owner.email }];
            TOTeamSelect.push(owner.email);
            this.TOTeamSelect = TOTeamSelect;
            this.DetailMaxForm.patchValue({ tot: TOTeamSelect });
          }
        });
      });
    });

    const TfBtTOSelect = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'TF-BT-TO', initiativeId: this.id, benefit: this.formGroup.get('initiativesForm')?.get('benefitAmount')?.value }).subscribe(result => {
      this.tfBt = result;
      this.tfBt.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          if (owner) {
            this.tfBtList = [...this.tfBtList, { name: owner.ownerName, email: owner.email }];
            TfBtTOSelect.push(owner.email);
            this.TfBtTOSelect = TfBtTOSelect;
            this.DetailMaxForm.patchValue({ tfb: TfBtTOSelect });
          }
        });
      });
    });

    const toFinanceIL4Select = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'TOFinanceIL4', initiativeId: this.id, benefit: this.formGroup.get('initiativesForm')?.get('benefitAmount')?.value }).subscribe(result => {
      this.toFinanceIL4 = result;
      this.toFinanceIL4.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          if (owner) {
            this.toFinanceIL4List = [...this.toFinanceIL4List, { name: owner.ownerName, email: owner.email }];
            toFinanceIL4Select.push(owner.email);
            this.TOFinanceIL4select = toFinanceIL4Select;
            this.DetailMaxForm.patchValue({ toFinanceIL4: toFinanceIL4Select });
          }
        });
      });
    });

    const toFinanceIL5Select = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'TOFinanceIL5', initiativeId: this.id, benefit: this.formGroup.get('initiativesForm')?.get('benefitAmount')?.value }).subscribe(result => {
      this.toFinanceIL5 = result;
      this.toFinanceIL5.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          if (owner) {
            this.toFinanceIL5List = [...this.toFinanceIL5List, { name: owner.ownerName, email: owner.email }];
            toFinanceIL5Select.push(owner.email);
            this.TOFinanceIL5select = toFinanceIL5Select;
            this.DetailMaxForm.patchValue({ toFinanceIL5: toFinanceIL5Select });
          }
        });
      });
    });

    const financeExpert = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'Finance Expert', initiativeId: this.id, benefit: this.formGroup.get('initiativesForm')?.get('benefitAmount')?.value }).subscribe(result => {
      this.financeExpert = result;
      this.financeExpert.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          if (owner) {
            this.financeExpertList = [...this.financeExpertList, { name: owner.ownerName, email: owner.email }];
            financeExpert.push(owner.email);
            this.financeExpert = financeExpert;
            this.DetailMaxForm.patchValue({ financeExpert: financeExpert });
          }
        });
      });
    });
  }

  OnChangeSubWorkstream(event) {
    this.SubWorkstream(event.target.value);
    const subWorkstream = this.subWorkstreams.filter(obj => obj.subWorkstream2 === event.target.value);
    this.DetailMaxForm.patchValue({
      subWorkstream1: subWorkstream[0].subWorkstream1,
      sponsorEvp: null,
      cfo: null,
      cto: null,
      toFinance: null
    });
    this.SetWorkstream();
  }

  OnchangeUsefulMonth() {
    if (this.DetailMaxForm.controls.usefulMonth.value > 12) {
      this.DetailMaxForm.patchValue({ usefulMonth: 12 });
    }
    this.calculateDepreciationCost;
    if (this.DetailMaxForm.controls.usefulMonth.value) {
      this.DetailMaxForm.controls.usefulYear.clearValidators();
      this.DetailMaxForm.controls.usefulYear.updateValueAndValidity();
    } else {
      // this.DetailMaxForm.controls.usefulYear.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.usefulYear.updateValueAndValidity();
    }
  }

  OnchangeUsefulYear() {
    this.calculateDepreciationCost;
    if (this.DetailMaxForm.controls.usefulYear.value) {
      this.DetailMaxForm.controls.usefulMonth.clearValidators();
      this.DetailMaxForm.controls.usefulMonth.updateValueAndValidity();
    } else {
      // this.DetailMaxForm.controls.usefulMonth.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.usefulMonth.updateValueAndValidity();
    }
  }

  OnchangeCycleMonth() {
    if (this.DetailMaxForm.controls.cycleMonth.value > 12) {
      this.DetailMaxForm.patchValue({ cycleMonth: 12 });
    }
  }

  OnChangeTurnaround() {
    if (this.DetailMaxForm.controls.forTurnaround.value === 'true') {
      this.IsShowTurnAround = true;
      this.DetailMaxForm.controls.cutFeedDate.enable();
      this.DetailMaxForm.controls.startUpDate.enable();
      this.DetailMaxForm.controls.cycleYear.enable();
      this.DetailMaxForm.controls.cycleMonth.enable();
      // this.DetailMaxForm.controls.cutFeedDate.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.cutFeedDate.updateValueAndValidity();
      // this.DetailMaxForm.controls.startUpDate.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.startUpDate.updateValueAndValidity();
      // this.DetailMaxForm.controls.cycleYear.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.cycleYear.updateValueAndValidity();
      // this.DetailMaxForm.controls.cycleMonth.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.cycleMonth.updateValueAndValidity();
    } else {
      this.IsShowTurnAround = false;
      this.DetailMaxForm.controls.cutFeedDate.disable();
      this.DetailMaxForm.controls.startUpDate.disable();
      this.DetailMaxForm.controls.cycleMonth.disable();
      this.DetailMaxForm.controls.cycleYear.disable();
      this.DetailMaxForm.patchValue({
        cutFeedDate: this.CutFeedDateDisplay,
        startUpDate: this.StartUpDateDisplay,
      });
      this.DetailMaxForm.controls.cutFeedDate.clearValidators();
      this.DetailMaxForm.controls.cutFeedDate.updateValueAndValidity();
      this.DetailMaxForm.controls.startUpDate.clearValidators();
      this.DetailMaxForm.controls.startUpDate.updateValueAndValidity();
      this.DetailMaxForm.controls.cycleYear.clearValidators();
      this.DetailMaxForm.controls.cycleYear.updateValueAndValidity();
      this.DetailMaxForm.controls.cycleMonth.clearValidators();
      this.DetailMaxForm.controls.cycleMonth.updateValueAndValidity();
    }
  }

  OnChangeReplaceEquipment() {
    if (this.DetailMaxForm.controls.replaceEquipment.value === 'true') {
      this.IsShowReplace = true;
      this.DetailMaxForm.controls.equipmentName.enable();
      this.DetailMaxForm.controls.replacementDate.enable();
      this.DetailMaxForm.controls.oldAssetCondition.enable();
      // this.DetailMaxForm.controls.equipmentName.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.equipmentName.updateValueAndValidity();
      // this.DetailMaxForm.controls.replacementDate.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.replacementDate.updateValueAndValidity();
      // this.DetailMaxForm.controls.oldAssetCondition.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.oldAssetCondition.updateValueAndValidity();
    } else {
      this.IsShowReplace = false;
      this.IsShowOldAsset = false;
      this.DetailMaxForm.controls.equipmentName.disable();
      this.DetailMaxForm.controls.replacementDate.disable();
      this.DetailMaxForm.controls.oldAssetCondition.disable();
      this.DetailMaxForm.controls.equipmentOrAsset.disable();
      this.DetailMaxForm.controls.equipmentOrAsset.clearValidators();
      this.DetailMaxForm.controls.equipmentOrAsset.updateValueAndValidity();

      this.DetailMaxForm.controls.oldAssetNo.disable();
      this.DetailMaxForm.patchValue({ equipmentName: null, replacementDate: null, oldAssetCondition: null });
      this.DetailMaxForm.controls.equipmentName.clearValidators();
      this.DetailMaxForm.controls.equipmentName.updateValueAndValidity();
      this.DetailMaxForm.controls.replacementDate.clearValidators();
      this.DetailMaxForm.controls.replacementDate.updateValueAndValidity();
      this.DetailMaxForm.controls.oldAssetCondition.clearValidators();
      this.DetailMaxForm.controls.oldAssetCondition.updateValueAndValidity();
    }
  }

  OnChangeOldAsset() {
    if (this.DetailMaxForm.controls.oldAssetCondition.value === 'repair') {
      this.IsShowOldAsset = true;
      this.DetailMaxForm.controls.oldAssetNo.enable();
      // this.DetailMaxForm.controls.oldAssetNo.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.oldAssetNo.updateValueAndValidity();
    } else {
      this.IsShowOldAsset = false;
      this.DetailMaxForm.controls.oldAssetNo.disable();
      this.DetailMaxForm.patchValue({ oldAssetNo: null });
      this.DetailMaxForm.controls.oldAssetNo.clearValidators();
      this.DetailMaxForm.controls.oldAssetNo.updateValueAndValidity();
    }
  }

  OnChangeBOI() {
    if (this.DetailMaxForm.controls.boi.value === 'true') {
      this.IsShowBOI = true;
      this.DetailMaxForm.controls.boiNo.enable();
      // this.DetailMaxForm.controls.boiNo.setValidators([Validators.required]);
      // this.DetailMaxForm.controls.boiNo.updateValueAndValidity();
    } else {
      this.IsShowBOI = false;
      this.DetailMaxForm.controls.boiNo.disable();
      this.DetailMaxForm.patchValue({ boiNo: null });
      this.DetailMaxForm.controls.boiNo.clearValidators();
      this.DetailMaxForm.controls.boiNo.updateValueAndValidity();
    }
  }

  OnChangeCoordinate() {
    if (this.DetailMaxForm.controls.coordinate.value === 'true') {
      this.IsShowParties = true;
      this.DetailMaxForm.controls.parties.enable();
      //this.DetailMaxForm.controls.parties.setValidators([Validators.required]);
      //this.DetailMaxForm.controls.parties.updateValueAndValidity();
    } else {
      this.IsShowParties = false;
      this.DetailMaxForm.controls.parties.disable();
      //this.DetailMaxForm.controls.parties.clearValidators();
      //this.DetailMaxForm.controls.parties.updateValueAndValidity();
    }
  }

  OnChangeAdditional() {
    if (this.DetailMaxForm.controls.haveAdditional.value === 'true') {
      this.IsShowAdditional = true;
      this.DetailMaxForm.controls.capital.enable();
      this.DetailMaxForm.controls.catalyst.enable();
      this.DetailMaxForm.controls.software.enable();
      this.DetailMaxForm.controls.rightOfUse.enable();
    } else {
      this.IsShowAdditional = false;
      this.DetailMaxForm.controls.capital.disable();
      this.DetailMaxForm.controls.catalyst.disable();
      this.DetailMaxForm.controls.software.disable();
      this.DetailMaxForm.controls.rightOfUse.disable();
    }
  }

  OnChangeScope() {
    if (this.DetailMaxForm.controls.isDeliverAsPerCommittedScope.value === 'true') {
      this.IsShowScope = true;
      this.DetailMaxForm.controls.scopeDetail.enable();
    } else {
      this.IsShowScope = false;
      this.DetailMaxForm.controls.scopeDetail.disable();
    }
  }

  OnChangeTimeLine() {
    if (this.DetailMaxForm.controls.isDeliverAsPerCommittedDate.value === 'true') {
      this.IsShowTimeline = true;
      this.DetailMaxForm.controls.timelineDetail.enable();
    } else {
      this.IsShowTimeline = false;
      this.DetailMaxForm.controls.timelineDetail.disable();
    }
  }

  OnChangeCost() {
    if (this.DetailMaxForm.controls.isDeliverAsPerCommittedCost.value === 'true') {
      this.IsShowCost = true;
      this.DetailMaxForm.controls.costDetail.enable();
    } else {
      this.IsShowCost = false;
      this.DetailMaxForm.controls.costDetail.disable();
    }
  }





  ChangeKpis(index, event) {
    this.kpiArray = this.kpiArray.filter(el => el.id !== index);
    this.kpiArray.push({ id: index, title: event.target.value });
    this.SetKpiSelect();
  }

  SetKpiSelect() {
    this.kpises.forEach(result => {
      if (this.kpiArray.some(e => e.title === result.kpisTitle && e.title !== 'Other')) {
        result.disabled = true;
      } else {
        result.disabled = false;
      }
    });
  }

  ChangeIl3Date(value: Date): void {
    if (value) {
      let IL3Date = value ? new Date(value) : null;
      let IL4Date = this.DetailMaxForm.get('iL4Date').value;
      const time = new Date(value).getTime();
      this.bsConfigIL4Date.minDate = new Date(value);
      if (IL3Date) {
        if (time > 0) {
          if (IL4Date) {
            if (IL3Date >= IL4Date) {
              this.initiativeService.viewMode ? false : this.swalTool.DateTargetIL3();
              this.DetailMaxForm.patchValue({ iL3Date: null });
            }
          }
        }
      }
    }
  }

  ChangeIl4Date(value: Date): void {
    if (value) {
      let IL3Date = this.DetailMaxForm.get('iL3Date').value;
      let IL4Date = value ? new Date(value) : null;
      let IL5Date = this.DetailMaxForm.get('iL5Date').value;
      const time = new Date(value).getTime();
      this.bsConfigIL5Date.minDate = new Date(value);
      if (IL3Date) {
        if (time > 0) {
          if (IL3Date && IL3Date >= IL4Date) {
            if (!this.initiativeService.viewMode) {
              this.initiativeService.viewMode ? false : this.swalTool.DateValid();
              this.DetailMaxForm.patchValue({ iL4Date: null, iL5Date: null });
            }
          }
          if (IL5Date && IL4Date > IL5Date) {
            if (!this.initiativeService.viewMode) {
              this.initiativeService.viewMode ? false : this.swalTool.DateValid();
              this.DetailMaxForm.patchValue({ iL5Date: null });
            }
          }
        }
      }
    }
  }

  ChangeIl5Date(value: Date): void {
    if (value) {
      let IL4Date = this.DetailMaxForm.get('iL4Date').value;
      let IL5Date = value ? new Date(value) : null;
      const time = new Date(value).getTime();
      if (time > 0) {
        if (IL4Date <= IL5Date) {
          this.bsConfigIL4Date.maxDate = new Date(value);
        } else {
          this.initiativeService.viewMode ? false : this.swalTool.DateTargetIL5();
          this.DetailMaxForm.patchValue({ iL5Date: null });
        }
      }
    }
  }

  ChangeCutFeedDate(value: Date): void {
    this.CutFeedDate = value ? this.dateUtil.SetDate(new Date(value)) : null;
  }

  ChangeStartUpDate(value: Date): void {
    this.StartUpDate = value ? this.dateUtil.SetDate(new Date(value)) : null;
  }

  ChangeCycleDate(value: Date): void {
    this.CycleDate = value ? this.dateUtil.SetDate(new Date(value)) : null;
  }

  ChangeReplacementDate(value: Date): void {
    this.ReplacementDate = value ? this.dateUtil.SetDate(new Date(value)) : null;
  }

  //dim
  // ChangeBaselineStartDate(value: Date): void {
  //   this.BaselineStartDate = value ? this.dateUtil.SetDate(new Date(value)) : null;
  // }

  // ChangeBaselineFinishDate(value: Date): void {
  //   this.BaselineFinishDate = value ? new Date(value) : null;
  // }

  // ChangeReviseForecastStartDate(value: Date): void {
  //   this.ReviseForecastStartDate = value ? this.dateUtil.SetDate(new Date(value)) : null;
  // }

  // ChangeReviseForecastFinishDate(value: Date): void {
  //   this.ReviseForecastFinishDate = value ? this.dateUtil.SetDate(new Date(value)) : null;
  // }

  // ChangeActualStartDate(value: Date): void {
  //   this.ActualStartDate = value ? this.dateUtil.SetDate(new Date(value)) : null;
  // }

  // ChangeActualFinishDate(value: Date): void {
  //   this.ActualFinishDate = value ? this.dateUtil.SetDate(new Date(value)) : null;
  // }

  OnChangeBaseline() {
    this.CalculateBaseline();
  }

  OnChangeSaving() {
    this.CalculateSaving();
  }

  CalculateBaseline() {
    const baselineHistorical = this.DetailMaxForm.controls.baselineHistorical.value;
    const baselineNonHistorical = this.DetailMaxForm.controls.baselineNonHistorical.value;
    const result = Number(baselineHistorical) + Number(baselineNonHistorical);
    this.DetailMaxForm.patchValue({ baseline: result.toFixed(2) });
  }

  CalculateSaving() {
    const savingHistorical = this.DetailMaxForm.controls.savingHistorical.value;
    const savingNonHistorical = this.DetailMaxForm.controls.savingNonHistorical.value;
    const result = Number(savingHistorical) + Number(savingNonHistorical);
    this.DetailMaxForm.patchValue({ saving: result.toFixed(2) });
  }

  PatchForm() {
    // this.DetailMaxForm.patchValue({
    //   id: this.Detail ? this.Detail : 0,
    //   iL3Date: this.IL3Date ? this.IL3Date : null,
    //   iL4Date: this.IL4Date ? this.IL4Date : null,
    //   iL5Date: this.IL5Date ? this.IL5Date : null,
    //   cutFeedDate: this.CutFeedDate ? this.CutFeedDate : null,
    //   startUpDate: this.StartUpDate ? this.StartUpDate : null,
    //   cycle: this.CycleDate ? this.CycleDate : null,
    //   replacementDate: this.ReplacementDate ? this.ReplacementDate : null
    // });
  }

  DetailKpisForm(): FormGroup {
    return this.fb.group({ id: 0, kpis: '', target: null, frequency: '', initiativeId: this.id });
  }

  AddKpis() {
    const control = this.DetailMaxForm.controls.kpisForm.get('kpis') as FormArray;
    control.push(this.DetailKpisForm());
    this.isRemoveKpis = control.length > 1 ? false : true;
    this.isDisableAddKpis = control.length === this.kpises.length ? true : false;
  }

  RemoveKpis(index: number) {
    this.kpiArray = this.kpiArray.filter(el => el.id !== index);
    this.SetKpiSelect();
    const control = this.DetailMaxForm.controls.kpisForm.get('kpis') as FormArray;
    control.removeAt(index);
    this.DetailMaxForm.controls.kpisForm.markAsDirty();
    this.isRemoveKpis = control.length > 1 ? false : true;
    this.isDisableAddKpis = control.length === this.kpises.length ? true : false;
  }

  SaveMaxApprover() {
    if (this.invalidSubAndWorkstream) {
      if (this.DetailMaxForm.controls.workstreamLead.valid) {
        this.maxService.CreateWorkstreamLead(this.id, { email: this.DetailMaxForm.controls.workstreamLead.value }).subscribe(() => { });
      }
      if (this.DetailMaxForm.controls.sponsorEvp.valid) {
        this.maxService.CreateSponsor(this.id, this.DetailMaxForm.controls.sponsorEvp.value).subscribe(() => { });
      }
      if (this.DetailMaxForm.controls.toFinance.valid) {
        this.maxService.CreateFinance(this.id, this.DetailMaxForm.controls.toFinance.value).subscribe(() => { });
      }
      if (this.DetailMaxForm.controls.cfo.valid) {
        this.maxService.CreateCFO(this.id, this.DetailMaxForm.controls.cfo.value).subscribe(() => { });
      }
      if (this.DetailMaxForm.controls.cto.valid) {
        this.maxService.CreateCTO(this.id, this.DetailMaxForm.controls.cto.value).subscribe(() => { });
      }
      if (this.TOTeamSelect.length !== 0) {
        this.maxService.CreateTOTeam(this.id, this.TOTeamSelect).subscribe(() => { });
      }
      if (this.TfBtTOSelect.length !== 0) {
        this.maxService.CreateTfBtTO(this.id, this.TfBtTOSelect).subscribe(() => { });
      }
      if (this.TOFinanceIL4select.length !== 0) {
        this.maxService.CreateTOFinanceIL4(this.id, this.TOFinanceIL4select).subscribe(() => { });
      }
      if (this.TOFinanceIL5select.length !== 0) {
        this.maxService.CreateTOFinanceIL5(this.id, this.TOFinanceIL5select).subscribe(() => { });
      }
    }
  }

  DetailDraft(response) {
    this.DetailMaxForm.get('sponsorEvp').enable();
    this.DetailMaxForm.get('toFinance').enable();
    this.DetailMaxForm.get('cfo').enable();
    this.DetailMaxForm.get('cto').enable();

    this.SaveMaxApprover();

    this.DetailMaxForm.get('sponsorEvp').disable();
    this.DetailMaxForm.get('toFinance').disable();
    this.DetailMaxForm.get('cfo').disable();
    this.DetailMaxForm.get('cto').disable();

    if (response.subWorkstream2) {
      this.SubWorkstream(response.subWorkstream2);
    }

    this.DetailMaxForm.patchValue(response);
   
    // this.GetSetDate(response);

    if (response.workstream) {
      this.DetailMaxForm.patchValue({ workstreamLead: this.DetailMaxForm.controls.workstreamLead.value });
    }
    if (this.DetailMaxForm.controls.kpisForm.valid) {
      if (this.DetailMaxForm.controls.kpisForm.value.kpis[0].kpis) {
        this.detailInformationService.CreateKpi(this.id, this.DetailMaxForm.controls.kpisForm.value).subscribe(() => { });
      }
    }
  }

  DetailSubmit() {
    this.DetailMaxForm.get('sponsorEvp').enable();
    this.DetailMaxForm.get('toFinance').enable();
    this.DetailMaxForm.get('cfo').enable();
    this.DetailMaxForm.get('cto').enable();

    if (!this.Detail) { this.SaveMaxApprover(); }

    if (this.DetailMaxForm.controls.kpisForm.dirty) {

      if (this.DetailMaxForm.controls.kpisForm.value.kpis[0].kpis) {
        this.detailInformationService.CreateKpi(this.id, this.DetailMaxForm.controls.kpisForm.value).subscribe(() => { });
      }
    }
  }

  SaveDraft() {
    this.PatchForm();
    this.Detail ?
      this.detailInformationService.UpdateDetailInformation(this.id, this.DetailMaxForm.value).subscribe(
        (response) => this.DetailDraft(response)
      ) :
      this.detailInformationService.CreateDetailInformation(this.id, this.DetailMaxForm.value).subscribe(
        (response) => this.DetailDraft(response)
      );
  }

  CheckAdditional() {
    // if (!this.invalidAdditional) {
    //   this.DetailMaxForm.controls.capital.clearValidators();
    //   this.DetailMaxForm.controls.capital.updateValueAndValidity();
    //   this.DetailMaxForm.controls.catalyst.clearValidators();
    //   this.DetailMaxForm.controls.catalyst.updateValueAndValidity();
    //   this.DetailMaxForm.controls.software.clearValidators();
    //   this.DetailMaxForm.controls.software.updateValueAndValidity();
    //   this.DetailMaxForm.controls.rightOfUse.clearValidators();
    //   this.DetailMaxForm.controls.rightOfUse.updateValueAndValidity();
    // }
  }

  SetMarkAsTouchedForm() {
    if (this.CheckMax) {
      if (!this.stage) {
        this.DetailMaxForm.controls.initiativeTypeMax.markAsTouched();
        this.DetailMaxForm.controls.workstream.markAsTouched();
        this.DetailMaxForm.controls.subWorkstream2.markAsTouched();
        this.DetailMaxForm.controls.workstreamLead.markAsTouched();
      } else {
        switch (this.stage) {
          case 'IL0':
          case 'IL2':
          case 'IL3-2':
          case 'IL4':
          case 'IL5':
            this.DetailMaxForm.controls.workstreamLead.markAsTouched();
            break;
          case 'IL1':
            this.DetailMaxForm.controls.iL3Date.markAsTouched();
            this.DetailMaxForm.controls.iL4Date.markAsTouched();
            this.DetailMaxForm.controls.iL5Date.markAsTouched();
            this.DetailMaxForm.controls.workstreamLead.markAsTouched();
            break;
        }
      }
    }
    if (this.CheckCapex) {
      this.DetailMaxForm.controls.president.markAsTouched();
      this.DetailMaxForm.controls.manager.markAsTouched();
      this.DetailMaxForm.controls.projectManager.markAsTouched();
      this.DetailMaxForm.controls.baseCase.markAsTouched();
      this.DetailMaxForm.controls.projectIrrBaseCase.markAsTouched();
      this.DetailMaxForm.controls.npvBaseCase.markAsTouched();
      this.DetailMaxForm.controls.paybackBaseCase.markAsTouched();
      this.DetailMaxForm.controls.ebitdaBaseCase.markAsTouched();
      this.DetailMaxForm.controls.depreciationCost.markAsTouched();
      this.DetailMaxForm.controls.usefulYear.markAsTouched();
      this.DetailMaxForm.controls.usefulMonth.markAsTouched();
      this.DetailMaxForm.controls.equipmentOrAsset.markAsTouched();
      this.DetailMaxForm.controls.cycleYear.markAsTouched();
      this.DetailMaxForm.controls.cycleMonth.markAsTouched();
      this.DetailMaxForm.controls.boiNo.markAsTouched();
      if (this.DetailMaxForm.controls.forTurnaround.value === 'true') {
        this.DetailMaxForm.controls.cutFeedDate.markAsTouched();
        this.DetailMaxForm.controls.startUpDate.markAsTouched();
      }
      if (this.DetailMaxForm.controls.replaceEquipment.value === 'true') {
        this.DetailMaxForm.controls.equipmentName.markAsTouched();
        this.DetailMaxForm.controls.replacementDate.markAsTouched();
        this.DetailMaxForm.controls.oldAssetCondition.markAsTouched();
      }
      if (this.DetailMaxForm.controls.oldAssetCondition.value === 'repair') {
        this.DetailMaxForm.controls.oldAssetNo.markAsTouched();
      }
      if (this.DetailMaxForm.controls.boi.value === 'true') {
        this.DetailMaxForm.controls.boi.markAsTouched();
      }
      if (this.DetailMaxForm.controls.coordinate.value === 'true') {
        this.DetailMaxForm.controls.parties.markAsTouched();
      }
      // this.DetailMaxForm.controls.capital.markAsTouched();
      // this.DetailMaxForm.controls.catalyst.markAsTouched();
      // this.DetailMaxForm.controls.software.markAsTouched();
      // this.DetailMaxForm.controls.rightOfUse.markAsTouched();
    }
  }

  SaveSubmit() {
    this.SetMarkAsTouchedForm();
    this.CheckAdditional();
    if (this.invalidSubmit) {
      this.PatchForm();
      this.DetailSubmit();
      this.Detail ?
        this.detailInformationService.UpdateDetailInformation(this.id, this.DetailMaxForm.value).subscribe(
          (response) => { }
        ) :
        this.detailInformationService.CreateDetailInformation(this.id, this.DetailMaxForm.value).subscribe(
          (response) => { }
        );
    } else {
      this.initiativeService.viewMode ? false : this.swalTool.Required();
    }
  }

  Draft(page) {
    if (page === 'detail-max' || page === 'direct-capex') {
      this.SaveDraft();
    }
  }

  Submit(page) {
    if (page === 'detail-max' || page === 'direct-capex') {
      this.SaveSubmit();
    }
  }

  get IsRequestMoreCapex() {
    return this.initiativeService.suggestionStatus.isRequestCapex;
  }

  get IsRequestOpex() {
    return (this.formGroup.get('initiativesForm')?.get('requestOpex')?.value == 'trueOpex') ? true : false;
  }

  get getTotalFinancialBenefit() {

    if ((this.requireDirectBenefit || this.requireIndirectBenefit) == true) {
      let sumValue: number = 0.00;
      if (this.requireDirectBenefit) {
        sumValue += parseFloat(this.DetailMaxForm.get('directBenefit').value ? this.DetailMaxForm.get('directBenefit').value : 0);
      }

      if (this.requireIndirectBenefit) {
        sumValue += parseFloat(this.DetailMaxForm.get('indirectBenefit').value ? this.DetailMaxForm.get('indirectBenefit').value : 0);
      }

      return parseFloat(sumValue.toFixed(2));
    } else {
      return this.formGroup.get('initiativesForm').get('benefitAmount').value;
    }

    // return this.formGroup.get('initiativesForm').get('benefitAmount').value
  }

  get getPaybackPeriod() {
    return this.formGroup.get('initiativesForm').get('payBackPeriod').value
  }

  OnChangeDirectBenefit(event) {
    if (this.DetailMaxForm.value.requireDirectBenefit) {
      this.requireDirectBenefit = true;
      this.DetailMaxForm.get('directBenefit').enable();
      this.impactService.RequireDirectBenefit = true;
      this.formGroup.get('ImpactForm').patchValue({ indirectBenefit: 'true' });
      // this.DetailMaxForm.get('sponsorEvp').enable();
      // this.DetailMaxForm.get('toFinance').enable();
      // this.DetailMaxForm.get('cfo').enable();
      // this.DetailMaxForm.get('cto').enable();
      this.DetailMaxForm.get('workstreamLead').enable();
      // this.DetailMaxForm.get('tot').enable();
      // this.DetailMaxForm.get('tfb').enable();
      // this.DetailMaxForm.get('toFinanceIL4').enable();
      // this.DetailMaxForm.get('toFinanceIL5').enable();

    }
    else {
      this.requireDirectBenefit = false;
      this.DetailMaxForm.get('directBenefit').disable();
      this.impactService.RequireDirectBenefit = false;
      this.formGroup.get('ImpactForm').patchValue({ indirectBenefit: 'false' });
      // this.DetailMaxForm.get('sponsorEvp').disable();
      // this.DetailMaxForm.get('toFinance').disable();
      // this.DetailMaxForm.get('cfo').disable();
      // this.DetailMaxForm.get('cto').disable();
      this.DetailMaxForm.get('workstreamLead').disable();
      // this.DetailMaxForm.get('tot').disable();
      // this.DetailMaxForm.get('tfb').disable();
      // this.DetailMaxForm.get('toFinanceIL4').disable();
      // this.DetailMaxForm.get('toFinanceIL5').disable();

    }

  }

  OnChangeInDirectBenefit(event) {
    if (this.DetailMaxForm.value.requireIndirectBenefit) {
      this.requireIndirectBenefit = true;
      this.impactService.RequireIndirectBenefit = true;
      this.DetailMaxForm.get('indirectBenefit').enable();
    }
    else {
      this.requireIndirectBenefit = false;
      this.impactService.RequireIndirectBenefit = false;
      this.DetailMaxForm.get('indirectBenefit').disable();
    }

  }

  OnChangeStartDate(event) {
  }

  OnchangeFinishDate(event) {
  }

  OnAcceptHandover() {
    this.formGroup.get('DimHandoverForm').patchValue({
      acceptDate: this.dateUtil.GetToday
    });
  }

  IsTypeDiable(type) {
    if (type === 'MAX') {
      return true;
    }
    else {
      return false;
    }
  }

  OnChangeFixedAsset(event) {
    this.FixedAsset = this.DetailMaxForm.get('fixedAsset').value;
  }

  OnChangeRequestSubPIC(event) {
    this.IsRequestSubPIC = this.DetailMaxForm.get('requestSubPIC').value;
  }

  getDimHandoverProperties(name: string) {
    return this.DimHandoverForm.get(name).value;
  }

  get getMinDate() {
    return this.DetailMaxForm.get('baselineStartDate').value;
  }

  OnChangeRequestITHandover() {
    let value = this.DimHandoverForm.get('isRequestITHandover').value;
    if (value) {
      this.IsCheckBoxRequestIT = true;
    } else {
      this.IsCheckBoxRequestIT = false;
    }
  }

  ngOnChanges(): void {
    this.formGroup?.get('initiativesForm')?.get('benefitAmount')?.valueChanges.subscribe(() => {
      let subworkstream2 = this.formGroup?.get('DetailMaxForm')?.get('subWorkstream2')?.value;
      this.SubWorkstream(subworkstream2);
    });
  }

  GetCurrentProjectManager() {
    this.initiativeService.getPimProjectManager.subscribe(data => {
      console.log('getPimProjectManager >> ', data);
      if (data) {
        this.DetailMaxForm.get('projectManager').setValue(data);
      }
    })
  }

  checkNullValue(value): boolean {
    let valueCheck: string = value !== null && value !== undefined ? value.toString() : null;
    if (valueCheck?.length > 0) {
      return true;
    }
    return false;
  }

}
