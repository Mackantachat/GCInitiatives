import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MaxService } from '@services/max/max.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DateUtil } from '@utils/date.utils';
import { ImpactService } from '@services/impact/impact.service';
import { SwalTool } from '@tools/swal.tools';
import { DetailService } from '@services/detail/detail.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';

@Component({
  selector: 'app-addmore-direct-capex',
  templateUrl: './addmore-direct-capex.component.html',
  styleUrls: ['./addmore-direct-capex.component.css']
})
export class AddmoreDirectCapexComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private initiativeService: InitiativeService,
    private detailService: DetailService,
    private impactService: ImpactService,
    private maxService: MaxService,
    private detailInformationService: DetailInformationService,
    private dateUtil: DateUtil,
    private swalTool: SwalTool
  ) { }

  @Input() id: number;
  @Input() name: string;
  page = 'direct-capex';

  kpiDetailInformations: any = [];

  Cim: boolean;
  Capex: boolean;
  Strategy: boolean;
  Max: boolean;

  status: string;
  remark: string;
  stage: string;

  presidentList: any = [];
  managerList: any = [];
  params: any = {};

  procurementCategoryList: any = [];
  procurementSubCategoryList: any = [];
  procurementLeverList: any = [];

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

  StartDate: string;
  FinishDate: string;
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

  isDisabledSubmit = false;

  bsConfig: Partial<BsDatepickerConfig>;

  InitiativeDetail = { code: null, name: null, year: null, owner: null, organization: null };

  bsConfigIL3Date = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false, minDate: new Date(), maxDate: new Date() };
  bsConfigIL4Date = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false, minDate: new Date() };
  bsConfigIL5Date = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false, minDate: new Date() };
  bsConfigDate = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };

  DetailMaxForm = this.fb.group({
    id: null,
    initiativeYear: null,
    strategicObjective: '',
    strategy: { value: '', disabled: true },
    initiativeTypeMax: '',
    workstream: '',
    subWorkstream1: null,
    subWorkstream2: { value: '', disabled: true },
    proCategory: '',
    proSubCategory: '',
    proLever: '',
    baseline: '',
    baselineHistorical: '',
    baselineNonHistorical: '',
    saving: '',
    savingHistorical: '',
    savingNonHistorical: '',
    sponsorEvp: { value: '', disabled: true },
    workstreamLead: { value: '', disabled: true },
    toFinance: { value: '', disabled: true },
    cto: { value: '', disabled: true },
    cfo: { value: '', disabled: true },
    president: { value: '', disabled: true },
    manager: { value: '', disabled: true },
    projectManager: { value: '', disabled: true },
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
    otherKpis: null,
    forEnvironment: { value: null, disabled: true },
    forTurnaround: { value: null, disabled: true },
    cutFeedDate: { value: null, disabled: true },
    startUpDate: { value: null, disabled: true },
    cycleYear: { value: null, disabled: true },
    cycleMonth: { value: null, disabled: true },
    replaceEquipment: { value: null, disabled: true },
    equipmentName: { value: null, disabled: true },
    replacementDate: { value: null, disabled: true },
    oldAssetCondition: { value: null, disabled: true },
    oldAssetNo: { value: null, disabled: true },
    equipmentOrAsset: { value: null, disabled: true },
    boi: { value: null, disabled: true },
    boiNo: { value: null, disabled: true },
    haveAdditional: { value: null, disabled: true },
    capital: { value: null, disabled: true },
    catalyst: { value: null, disabled: true },
    software: { value: null, disabled: true },
    rightOfUse: { value: null, disabled: true },
    checklist: { value: null, disabled: true },
    coordinate: { value: null, disabled: true },
    parties: { value: null, disabled: true }
  });

  isRemoveKpis = true;
  isDisableAddKpis = false;

  IsShowFormCondition = false;
  IsShowProcurement = false;
  IsRequestCapex = false;
  IsShowTurnAround = true;
  IsShowReplace = true;
  IsShowOldAsset = false;
  IsShowBOI = true;
  IsShowParties = false;
  IsShowAdditional = true;
  IsShowReturn = true;

  CheckCapex: boolean;
  CheckMax: boolean;

  typeOfInvestment: string;
  words: any = [];

  kpiArray: any = [];

  get NoStage() {
    return !this.stage;
  }

  get StageIL0() {
    return this.stage === 'IL0';
  }

  get StageIL1() {
    return this.stage === 'IL1';
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
  }

  get invalidCycleMonth() {
    return this.DetailMaxForm.controls.cycleMonth.touched && this.DetailMaxForm.controls.cycleMonth.invalid;
  }

  get invalidIl5() {
    return this.DetailMaxForm.controls.il5Date.touched && this.DetailMaxForm.controls.il5Date.invalid;
  }

  get invalidAdditional() {
    return (this.DetailMaxForm.controls.capital.touched && this.DetailMaxForm.controls.capital.invalid) &&
      (this.DetailMaxForm.controls.catalyst.touched && this.DetailMaxForm.controls.catalyst.invalid) &&
      (this.DetailMaxForm.controls.software.touched && this.DetailMaxForm.controls.software.invalid) &&
      (this.DetailMaxForm.controls.rightOfUse.touched && this.DetailMaxForm.controls.rightOfUse.invalid);
  }

  get invalidSubmit() {
    return this.DetailMaxForm.valid;
  }

  ngOnInit(): void {
    this.id = Number(sessionStorage.getItem('id'));
    sessionStorage.setItem('page', 'addmore-direct');
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
    this.detailInformationService.GetFrequency().subscribe(frequency => this.frequencies = frequency);
    this.detailInformationService.GetKpis().subscribe(kpis => {
      this.kpises = kpis;
      this.kpises.forEach(result => result.disabled = false);
      this.GetKpiDetail(this.id);
    });
    this.maxService.GetInitiativeTypeMax().subscribe(type => this.types = type);
    this.impactService.GetWorkStream().subscribe(workStreams => this.workStreams = workStreams);
    this.GetYears();
    this.IsAddMoreDetail();
    this.CheckPage();
    this.GetSuggestStatus(this.id);
  }

  GetSuggestStatus(id) {
    this.initiativeService.GetSuggestStatus(id).subscribe(response => {
      this.status = response.status;
      this.stage = response.stage;
      this.remark = response.remark ? response.remark : null;
      this.Cim = response.cim ? true : false;
      this.Capex = response.directCapex ? true : false;
      this.Strategy = response.strategy ? true : false;
      this.Max = response.max ? true : false;
      this.SetValidateForm();

      if (this.Capex === true) {
        this.page = 'direct-capex';
        this.name = 'Detail Information (Request CAPEX)';
      }

    });
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

  CheckValidate() {
    if (sessionStorage.getItem('DetailMaxValidate') === 'false') {
      setTimeout(() => this.SetMarkAsTouchedForm(), 50);
    }
  }

  ngOnDestroy() {
    sessionStorage.setItem('AddMoreDirectCapexValidate', JSON.stringify(this.invalidSubmit));
    if (this.DetailMaxForm.dirty) {
      this.DetailMaxForm.enable();
      sessionStorage.setItem('isAddMoreDirectCapex', 'true');
      sessionStorage.setItem('AddMoreDirectCapex', JSON.stringify(this.DetailMaxForm.value));
    }
  }

  CheckPage() {
    this.page = 'direct-capex';
    switch (this.page) {
      case 'direct-capex':
        this.CheckCapex = true;
        break;
      case 'detail-max':
        this.CheckMax = true;
        this.DetailMaxForm.controls.strategy.enable();
        this.DetailMaxForm.patchValue({ strategicObjective: '1' });
        this.detailService.GetStrategies(1).subscribe(strategies => this.strategies = strategies);
        this.DetailMaxForm.patchValue({ strategy: 'S2020_004' });
        break;
    }
  }

  SetValidateForm() {
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

    this.CheckValidate();
  }

  SetValidateNullStage() {
    this.DetailMaxForm.controls.workstream.setValidators([Validators.required]);
    this.DetailMaxForm.controls.workstream.updateValueAndValidity();
    this.DetailMaxForm.controls.subWorkstream2.setValidators([Validators.required]);
    this.DetailMaxForm.controls.subWorkstream2.updateValueAndValidity();
  }

  SetValidateStageIL1() {
    this.DetailMaxForm.controls.workstreamLead.setValidators([Validators.required]);
    this.DetailMaxForm.controls.workstreamLead.updateValueAndValidity();
  }

  IsDetailMax() {
    if (sessionStorage.getItem('isDetailMax') === 'true') {
      const DetailMax = JSON.parse(sessionStorage.getItem('DetailMax'));

      if (DetailMax.strategicObjective) {
        this.detailService.GetStrategies(DetailMax.strategicObjective).subscribe(strategies => this.strategies = strategies);
      }

      if (DetailMax.strategy) {
        this.DetailMaxForm.controls.strategy.enable();
      } else {
        this.DetailMaxForm.controls.strategy.disable();
      }

      setTimeout(() => this.DetailMaxForm.patchValue({ strategy: DetailMax.strategy ? DetailMax.strategy : '' }), 50);

      if (DetailMax.workstream) {
        this.maxService.GetSubWorkstream(DetailMax.workstream).subscribe(subWorkstream => this.subWorkstreams = subWorkstream);
      }

      if (DetailMax.subWorkstream2) {
        this.DetailMaxForm.controls.subWorkstream2.enable();
      } else {
        this.DetailMaxForm.controls.subWorkstream2.disable();
      }

      this.CheckProcurement(DetailMax.workstream);

      this.DetailMaxForm.patchValue(DetailMax);

      setTimeout(() => this.DetailMaxForm.patchValue({ subWorkstream2: DetailMax.subWorkstream2 ? DetailMax.subWorkstream2 : '' }), 50);

      this.CutFeedDateDisplay = DetailMax.cutFeedDate ? this.dateUtil.GetDate(new Date(DetailMax.cutFeedDate)) : null;
      this.StartUpDateDisplay = DetailMax.startUpDate ? this.dateUtil.GetDate(new Date(DetailMax.startUpDate)) : null;
      this.CycleDateDisplay = DetailMax.cycle ? this.dateUtil.GetDate(new Date(DetailMax.cycle)) : null;

      this.ReplacementDateDisplay = DetailMax.replacementDate ? this.dateUtil.GetDate(new Date(DetailMax.replacementDate)) : null;

      this.DetailMaxForm.patchValue({
        cutFeedDate: this.CutFeedDateDisplay,
        startUpDate: this.StartUpDateDisplay,
        cycle: this.CycleDateDisplay,
        replacementDate: this.ReplacementDateDisplay
      });

      if (DetailMax.kpisForm.kpis.length !== 0) {
        const KpiControl = this.DetailMaxForm.controls.kpisForm.get('kpis') as FormArray;
        for (let i = 0; i < DetailMax.kpisForm.kpis.length; i++) {
          if (i >= this.kpiDetailInformations.length) {
            KpiControl.push(this.DetailKpisForm());
            KpiControl.at(i).patchValue(DetailMax.kpisForm.kpis[i]);
            KpiControl.at(i).get('id').patchValue(0);
          }
        }
        this.isRemoveKpis = KpiControl.length > 1 ? false : true;
      }

    }
  }

  IsAddMoreDetail() {
    if (sessionStorage.getItem('isAddMoreDirectCapex') === 'true') {
      const DetailMax = JSON.parse(sessionStorage.getItem('AddMoreDirectCapex'));
      this.DetailMaxForm.patchValue(DetailMax);
      if (DetailMax.kpisForm.kpis.length !== 0) {
        const KpiControl = this.DetailMaxForm.controls.kpisForm.get('kpis') as FormArray;
        for (let i = 0; i < DetailMax.kpisForm.kpis.length; i++) {
          KpiControl.push(this.DetailKpisForm());
          KpiControl.at(i).patchValue(DetailMax.kpisForm.kpis[i]);
          KpiControl.at(i).get('id').patchValue(0);
        }
        this.isRemoveKpis = KpiControl.length > 1 ? false : true;
      }
    }
  }

  GetYears() {
    const year = new Date().getFullYear();
    for (let i = 1; i <= 5; i++) {
      this.years.push(year - i);
    }
    this.years.unshift(year + 1, year);
  }

  GetKpiDetail(id) {
    this.detailInformationService.GetKpiDetail(id).subscribe(response => {
      this.Irr = response.irr;
      this.PaybackPeriod = response.payBackPeriod;

      this.StartDate = this.dateUtil.GetDate(new Date(response.startingDate));
      this.FinishDate = this.dateUtil.GetDate(new Date(response.finishingDate));

      const finishingDate = new Date(response.finishingDate);
      this.bsConfigIL3Date.maxDate = new Date(finishingDate.setDate(finishingDate.getDate() - 1));

      if (response.requestCapex === 'true') {
        this.CheckShowForm(response);
        this.IsRequestCapex = true;
      } else {
        this.IsRequestCapex = false;
        if (response.strategy) {
          this.IsShowFormCondition = true;
        } else {
          this.IsShowFormCondition = false;
        }
      }

      const year = response.year;

      this.detailService.GetStrategicObjectives(year).subscribe(result => this.strategicObjectives = result);

      this.DetailMaxForm.patchValue({ initiativeYear: response.year });

      if (sessionStorage.getItem('isAddMoreDirectCapex') !== 'true') {
        this.kpiDetailInformations = response.kpiDetailInformations;
        if (this.kpiDetailInformations.length !== 0) {
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
        } else {
          this.AddKpis();
        }
      }

      this.GetDetailInformation(this.id);
    });
  }

  CheckShowForm(response) {
    const typeOfInvestment = response.typeOfInvestment;
    if (typeOfInvestment) {
      if (typeOfInvestment.includes('Growth') || typeOfInvestment.includes('Sustain Core')) {
        const words = typeOfInvestment.split(':');
        if (words[0]) {
          if (['Growth', 'Sustain Core'].includes(words[0])) {
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

  GetSetDate(response) {
    this.IL3Date = response.iL3Date ? this.dateUtil.SetDate(new Date(response.iL3Date)) : null;
    this.IL4Date = response.iL4Date ? this.dateUtil.SetDate(new Date(response.iL4Date)) : null;
    this.IL5Date = response.iL5Date ? this.dateUtil.SetDate(new Date(response.iL5Date)) : null;

    this.CutFeedDate = response.cutFeedDate ? this.dateUtil.SetDate(new Date(response.cutFeedDate)) : null;
    this.StartUpDate = response.startUpDate ? this.dateUtil.SetDate(new Date(response.startUpDate)) : null;
    this.CycleDate = response.cycle ? this.dateUtil.SetDate(new Date(response.cycle)) : null;

    this.ReplacementDate = response.replacementDate ? this.dateUtil.SetDate(new Date(response.replacementDate)) : null;

    this.IL3DateDisplay = response.iL3Date ? this.dateUtil.GetDate(new Date(response.iL3Date)) : this.StartDate;
    this.IL4DateDisplay = response.iL4Date ? this.dateUtil.GetDate(new Date(response.iL4Date)) : this.FinishDate;
    this.IL5DateDisplay = response.iL5Date ? this.dateUtil.GetDate(new Date(response.iL5Date)) : null;

    this.CutFeedDateDisplay = response.cutFeedDate ? this.dateUtil.GetDate(new Date(response.cutFeedDate)) : null;
    this.StartUpDateDisplay = response.startUpDate ? this.dateUtil.GetDate(new Date(response.startUpDate)) : null;
    this.CycleDateDisplay = response.cycle ? this.dateUtil.GetDate(new Date(response.cycle)) : null;

    this.ReplacementDateDisplay = response.replacementDate ? this.dateUtil.GetDate(new Date(response.replacementDate)) : null;

    setTimeout(() => {
      this.DetailMaxForm.patchValue({
        cutFeedDate: this.CutFeedDateDisplay,
        startUpDate: this.StartUpDateDisplay,
        cycle: this.CycleDateDisplay,
        replacementDate: this.ReplacementDateDisplay
      });
    }, 10);
  }

  CheckProcurement(workstream) {
    if (workstream === 'Procurement') {
      this.IsShowProcurement = true;
      this.DetailMaxForm.controls.proCategory.enable();
      this.DetailMaxForm.controls.proSubCategory.enable();
      this.DetailMaxForm.controls.proLever.enable();
      this.DetailMaxForm.patchValue({
        proCategory: '',
        proSubCategory: '',
        proLever: ''
      });
    } else {
      this.IsShowProcurement = false;
      this.DetailMaxForm.controls.proCategory.disable();
      this.DetailMaxForm.controls.proSubCategory.disable();
      this.DetailMaxForm.controls.proLever.disable();
    }
  }

  GetDetailInformation(id) {
    if (sessionStorage.getItem('isAddMoreDirectCapex') !== 'true') {
      this.detailInformationService.GetDetailInformation(id).subscribe(response => {
        if (response) {
          if (response.strategicObjective) {
            this.detailService.GetStrategies(response.strategicObjective).subscribe(strategies => this.strategies = strategies);
          }

          if (response.strategy) {
            this.DetailMaxForm.controls.strategy.enable();
          } else {
            this.DetailMaxForm.controls.strategy.disable();
          }

          if (response.workstream) {
            this.DetailMaxForm.get('subWorkstream2').enable();
            this.DetailMaxForm.get('subWorkstream2').updateValueAndValidity();

            this.maxService.GetSubWorkstream(response.workstream).subscribe(subWorkstream => this.subWorkstreams = subWorkstream);
            this.DetailMaxForm.get('workstreamLead').enable();
            this.WorkstreamLead(response.workstream);
          } else {
            this.DetailMaxForm.controls.subWorkstream2.disable();
            this.DetailMaxForm.controls.workstreamLead.disable();
          }

          if (response.subWorkstream2) {
            this.SubWorkstream(response.subWorkstream2);
          }

          this.CheckProcurement(response.workstream);

          this.DetailMaxForm.patchValue(response);

          this.GetSetDate(response);

          this.DetailMaxForm.patchValue({
            projectIrrBaseCase: response.projectIrrBaseCase ? response.projectIrrBaseCase : this.Irr,
            paybackBaseCase: response.paybackBaseCase ? response.paybackBaseCase : this.PaybackPeriod,
          });

          this.DetailMaxForm.patchValue({
            oldAssetCondition: response.oldAssetCondition ? response.oldAssetCondition : '',
          });

          this.OnChangeBOI();
          this.OnChangeTurnaround();
          this.OnChangeOldAsset();
          this.OnChangeReplaceEquipment();
          this.OnChangeCoordinate();

        } else {
          this.DetailMaxForm.patchValue({
            projectIrrBaseCase: this.Irr,
            paybackBaseCase: this.PaybackPeriod,
          });
        }
      });
    }
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
      this.workstreamLead.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          this.workstreamList.push({ name: owner.ownerName, email: owner.email });
        });
      });
    });
    this.maxService.GetWorkstreamLead(this.id).subscribe(approve => {
      if (approve) {
        this.DetailMaxForm.patchValue({ workstreamLead: approve.approverEmail ? approve.approverEmail : '' });
      }
    });
  }

  OnChangeWorkstream(event) {
    this.DetailMaxForm.get('subWorkstream2').enable();
    this.DetailMaxForm.get('subWorkstream2').updateValueAndValidity();
    this.DetailMaxForm.patchValue({ subWorkstream2: '' });

    this.DetailMaxForm.get('workstreamLead').enable();

    const workstreamName = event.target.value;
    this.maxService.GetSubWorkstream(workstreamName).subscribe(subWorkstream => this.subWorkstreams = subWorkstream);
    this.WorkstreamLead(workstreamName);

    if (workstreamName === 'Procurement') {
      this.IsShowProcurement = true;
      this.DetailMaxForm.controls.proCategory.enable();
      this.DetailMaxForm.controls.proSubCategory.enable();
      this.DetailMaxForm.controls.proLever.enable();
      this.DetailMaxForm.patchValue({
        proCategory: '',
        proSubCategory: '',
        proLever: ''
      });
    } else {
      this.IsShowProcurement = false;
      this.DetailMaxForm.controls.proCategory.disable();
      this.DetailMaxForm.controls.proSubCategory.disable();
      this.DetailMaxForm.controls.proLever.disable();
    }
  }

  SubWorkstream(value) {
    const sponsorSelect = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'Sponsor' }).subscribe(result => {
      this.sponsor = result;
      this.sponsor.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          this.sponsorList = [...this.sponsorList, { name: owner.ownerName, email: owner.email }];
          sponsorSelect.push(owner.email);
          this.DetailMaxForm.patchValue({ sponsorEvp: sponsorSelect });
        });
      });
    });

    const toFinanceSelect = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'TO Finance' }).subscribe(result => {
      this.toFinance = result;
      this.toFinance.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          this.toFinanceList = [...this.toFinanceList, { name: owner.ownerName, email: owner.email }];
          toFinanceSelect.push(owner.email);
          this.DetailMaxForm.patchValue({ toFinance: toFinanceSelect });
        });
      });
    });

    const cfoSelect = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'CFO' }).subscribe(result => {
      this.cfo = result;
      this.cfo.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          this.cfoList = [...this.cfoList, { name: owner.ownerName, email: owner.email }];
          cfoSelect.push(owner.email);
          this.DetailMaxForm.patchValue({ cfo: cfoSelect });
        });
      });
    });

    const ctoSelect = [];
    this.maxService.GetMaxApproverSubWorkstream({ name: value, Indicator: 'CTO' }).subscribe(result => {
      this.cto = result;
      this.cto.forEach((e) => {
        this.maxService.GetNameMaxApprover(e.approverEmail).subscribe(owner => {
          this.ctoList = [...this.ctoList, { name: owner.ownerName, email: owner.email }];
          ctoSelect.push(owner.email);
          this.DetailMaxForm.patchValue({ cto: ctoSelect });
        });
      });
    });
  }

  OnChangeSubWorkstream(event) {
    this.SubWorkstream(event.target.value);
    const subWorkstream = this.subWorkstreams.filter(obj => obj.subWorkstream2 === event.target.value);
    this.DetailMaxForm.patchValue({ subWorkstream1: subWorkstream[0].subWorkstream1 });
  }

  OnchangeUsefulMonth() {
    if (this.DetailMaxForm.controls.usefulMonth.value > 12) {
      this.DetailMaxForm.patchValue({ usefulMonth: 12 });
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
    } else {
      this.IsShowTurnAround = false;
      this.DetailMaxForm.controls.cutFeedDate.disable();
      this.DetailMaxForm.controls.startUpDate.disable();
      this.DetailMaxForm.patchValue({
        cutFeedDate: this.CutFeedDateDisplay,
        startUpDate: this.StartUpDateDisplay,
      });
    }
  }

  OnChangeReplaceEquipment() {
    if (this.DetailMaxForm.controls.replaceEquipment.value === 'true') {
      this.IsShowReplace = true;
      this.DetailMaxForm.controls.equipmentName.enable();
      this.DetailMaxForm.controls.replacementDate.enable();
      this.DetailMaxForm.controls.oldAssetCondition.enable();
    } else {
      this.IsShowReplace = false;
      this.DetailMaxForm.controls.equipmentName.disable();
      this.DetailMaxForm.controls.replacementDate.disable();
      this.DetailMaxForm.controls.oldAssetCondition.disable();
      this.DetailMaxForm.patchValue({ equipmentName: null, replacementDate: null, oldAssetCondition: null });
    }
  }

  OnChangeOldAsset() {
    if (this.DetailMaxForm.controls.oldAssetCondition.value === 'repair') {
      this.IsShowOldAsset = true;
      this.DetailMaxForm.controls.oldAssetNo.enable();
    } else {
      this.IsShowOldAsset = false;
      this.DetailMaxForm.controls.oldAssetNo.disable();
      this.DetailMaxForm.patchValue({ oldAssetNo: null });
    }
  }

  OnChangeBOI() {
    if (this.DetailMaxForm.controls.boi.value === 'true') {
      this.IsShowBOI = true;
      this.DetailMaxForm.controls.boiNo.enable();
    } else {
      this.IsShowBOI = false;
      this.DetailMaxForm.controls.boiNo.disable();
      this.DetailMaxForm.patchValue({ boiNo: null });
    }
  }

  OnChangeCoordinate() {
    if (this.DetailMaxForm.controls.coordinate.value === 'true') {
      this.IsShowParties = true;
      this.DetailMaxForm.controls.parties.enable();
    } else {
      this.IsShowParties = false;
      this.DetailMaxForm.controls.parties.disable();
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

  ChangeKpis(index, event) {
    this.kpiArray = this.kpiArray.filter(el => el.id !== index);
    this.kpiArray.push({ id: index, title: event.target.value });
    this.SetKpiSelect();
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

  ChangeIl3Date(value: Date): void {
    this.IL3Date = value ? this.dateUtil.SetDate(new Date(value)) : null;
    this.bsConfigIL4Date.minDate = new Date(value);
  }

  ChangeIl4Date(value: Date): void {
    this.IL4Date = value ? this.dateUtil.SetDate(new Date(value)) : null;
    const time = new Date(value).getTime();
    this.bsConfigIL5Date.minDate = new Date(value);
    if (this.IL3Date) {
      if (time > 0) {
        if (this.IL3Date < this.IL4Date) {
          this.IL4Date = this.dateUtil.SetDate(new Date(value));
        } else {
          this.IL4Date = null;
          if (!this.initiativeService.viewMode) {
            this.swalTool.DateValid();
            this.DetailMaxForm.patchValue({ il4Date: null, il5Date: null });
          }
        }
      }
    }
    if (this.IL4Date > this.IL5Date) {
      this.IL5Date = null;
      if (!this.initiativeService.viewMode) {
        this.swalTool.DateValid();
        this.DetailMaxForm.patchValue({ il5Date: null });
      }
    }
  }

  ChangeIl5Date(value: Date): void {
    this.IL5Date = value ? this.dateUtil.SetDate(new Date(value)) : null;
    const time = new Date(value).getTime();
    if (time > 0) {
      this.IL5Date = this.dateUtil.SetDate(new Date(value));
      if (this.IL4Date < this.IL5Date) {
        this.IL5Date = this.dateUtil.SetDate(new Date(value));
      } else {
        this.IL5Date = null;
        if (!this.initiativeService.viewMode) {
          this.swalTool.DateValid();
          this.DetailMaxForm.patchValue({ il5Date: null });
        }
      }
    }
  }

  ChangeCutFeedDate(value: Date): void {
    this.CutFeedDate = this.dateUtil.SetDate(new Date(value));
  }

  ChangeStartUpDate(value: Date): void {
    this.StartUpDate = this.dateUtil.SetDate(new Date(value));
  }

  ChangeCycleDate(value: Date): void {
    this.CycleDate = this.dateUtil.SetDate(new Date(value));
  }

  ChangeReplacementDate(value: Date): void {
    this.ReplacementDate = this.dateUtil.SetDate(new Date(value));
  }

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
    this.DetailMaxForm.patchValue({
      cutFeedDate: this.CutFeedDate ? this.CutFeedDate : null,
      startUpDate: this.StartUpDate ? this.StartUpDate : null,
      cycle: this.CycleDate ? this.CycleDate : null,
      replacementDate: this.ReplacementDate ? this.ReplacementDate : null
    });
  }

  DetailKpisForm(): FormGroup {
    return this.fb.group({ id: [0], kpis: '', target: null, frequency: '', initiativeId: this.id });
  }

  AddKpis() {
    const control = this.DetailMaxForm.controls.kpisForm.get('kpis') as FormArray;
    control.push(this.DetailKpisForm());
    this.isRemoveKpis = control.length > 1 ? false : true;
    setTimeout(() => this.isDisableAddKpis = control.length === this.kpises.length ? true : false, 200);
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

  SetMarkAsTouchedForm() {
  }

  SaveDraft() {
    this.PatchForm();
    this.DetailMaxForm.enable();
    this.detailInformationService.UpdateDetailInformation(this.id, this.DetailMaxForm.value).subscribe(() => {
      if (this.DetailMaxForm.controls.kpisForm.value.kpis[0].kpis) {
        this.detailInformationService.CreateKpi(this.id, this.DetailMaxForm.controls.kpisForm.value).subscribe(() => { });
      }
    });
  }

  SaveSubmit() {
    this.PatchForm();
    this.DetailMaxForm.enable();
    this.detailInformationService.UpdateDetailInformation(this.id, this.DetailMaxForm.value).subscribe(() => {
      if (this.DetailMaxForm.controls.kpisForm.value.kpis[0].kpis) {
        this.detailInformationService.CreateKpi(this.id, this.DetailMaxForm.controls.kpisForm.value).subscribe(() => { });
      }
    });
  }
}
