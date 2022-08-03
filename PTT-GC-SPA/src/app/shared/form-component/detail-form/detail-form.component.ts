import { Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { InitiativeService } from '@services/initiative/initiative.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { DetailService } from '@services/detail/detail.service';
import { DateUtil } from '@utils/date.utils';
import { SwalTool } from '@tools/swal.tools';
import { BsDatepickerViewMode, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { RiskService } from '@services/risk/risk.service';
import { Initiative } from '@models/initiative';
import { CommonDataService } from '@services/common-data/common-data.service';
import { ProgressService } from '@services/progress/progress.service';
import { PermissionService } from '@services/permission/permission.service';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.css']
})
export class DetailFormComponent implements OnInit, AfterContentChecked {

  constructor(
    private initiativeService: InitiativeService,
    private fb: FormBuilder,
    private detailService: DetailService,
    private dateUtil: DateUtil,
    private swalTool: SwalTool,
    private riskService: RiskService,
    private cdref: ChangeDetectorRef,
    private commonDataService: CommonDataService,
    private progressService: ProgressService,
    public ps: PermissionService
  ) {
    this.initiativeService.getGeneralData.subscribe((generalDataRes) => {
      if (generalDataRes && this.dataLoaded) {
        this.generalData = generalDataRes;
      }
    })
  }

  @Input() id: number;
  @Input() formGroup: FormGroup;
  @Input() generalData: Initiative;
  name = 'Initiatives Progress Tracking';
  page = 'detail';

  params: any = {};

  Cim: boolean;
  Capex: boolean;
  Strategy: boolean;
  Max: boolean;

  // financial = 10;
  financial: number = 0;

  initiativeCode: string;
  initiativeYear: string;

  status: string;
  remark: string;
  stage: string;

  minMode: BsDatepickerViewMode = 'year';
  bsConfig: Partial<BsDatepickerConfig>;
  bsConfigYear: Partial<BsDatepickerConfig>;

  bsBOD1 = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false, minDate: null, maxDate: null };
  bsBOD2 = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false, minDate: null, maxDate: null };
  bsConBetween = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };

  strategicObjectives: any = [];
  strategies: any = [];
  entryModes: any = [];
  productUnits: any = [];
  owners: any = [];
  milestoneStatuses: any = [];
  presidentList: any = [];
  managerList: any = [];

  directorList: any = [];
  projectManagerList: any = [];
  projectEngineerList: any = [];
  processEngineerList: any = [];
  divManagerProcessList: any = [];

  isHaveProduct = 'false';

  year: string;
  setYear: string;

  initiativeDetails: any;
  products: any;
  progressDetails: any;
  financialIndicators: any;
  financials: any;

  BOD1Date: Date;
  BOD2Date: Date;

  isDisabledMilestone = true;
  isDisabledProduct = true;
  isAddFinancial = false;
  isRemoveFinancial = false;
  showSpecify = false;
  showGeography = false;
  showEntity = false;
  ShowProject = false;
  financialLength: number;

  Detail: number;

  ShowBOD = false;

  planStatus: any = [];

  ebitdaNumberPattern = {
    'negative': {pattern: new RegExp('-?')},
    '0': {pattern: new RegExp('[0-9]')}
  }

  initiativesDetailForm = this.fb.group({
    id: 0,
    strategicObjective: ['', Validators.required],
    strategyDetail: { value: '', disabled: true },
    entryMode: '',
    specify: '',
    geography: '',
    geographySpecify: '',
    entity: '',
    entitySpecify: '',
    businessModel: '',
    shareOfInvestment: '',
    president: null,
    manager: null,
    requireBOD1: false,
    boD1: null,
    boD2: null,
    requireProject: false,
    projectDirector: '',
    projectManager: '',
    projectEngineer: '',
    processEngineer: '',
    mgrOfProcessEngineer: '',
    haveProduct: 'false',
    fx: '',
    fxChoice: 'THB',
    irr: '',
    npv: '',
    firstBudgetYear: null,
    note: '',
    initiativeId: '',
    productionProcess: '',
    listOfEquipment: '',
    comparison: '',
    otherInvestment: '',
    keySuccessFactor: '',
    synergyBenefit: '',
    othersStrategic: '',
    marketOverview: '',
    potentialCustomer: '',
    salesPlan: '',
    sourceOfFeedback: '',
    otherBusiness: '',
    safetyIndex: '',
    corporateImageIndex: '',
    otherQuality: '',
    baseCase: '',
    projectIrrBaseCase: '',
    npvBaseCase: '',
    paybackBaseCase: '',
    ebitdaBaseCase: '',
    optimisticCase: '',
    projectIrrOptimisticCase: '',
    npvOptimisticCase: '',
    paybackOptimisticCase: '',
    ebitdaOptimisticCase: '',
    pessimisticCase: '',
    projectIrrPessimisticCase: '',
    npvPessimisticCase: '',
    paybackPessimisticCase: '',
    ebitdaPessimisticCase: '',
    progressStatus: "Not started",
    progressUpdate: ''
  });

  financialIndicatorForm = this.fb.group({
    fx: null,
    fxChoice: 'THB',
    irr: null,
    npv: null,
    firstBudgetYear: null
  });

  financialAvgForm = this.fb.group({
    id: 0,
    initiativeId: this.initiativeService.id,
    avgRevenue: null,
    avgEbitda: null,
    totalCapex: null,
    totalOpex: null,
    totalValuation: null,
  });

  initiativesHaveProduct = this.fb.group({ haveProduct: 'true' });

  noteForm = this.fb.group({ note: null });

  productForm = this.fb.group({ products: this.fb.array([]) });
  milestoneForm = this.fb.group({ progressDetails: this.fb.array([]) });
  financialForm = this.fb.group({ financials: this.fb.array([]) });

  ValidateProduct = true;

  typeOfInvestment: string;

  startDate: Date;
  finishDate: Date;
  projectDirector: Array<string>
  projectManager: Array<string>
  projectEngineer: Array<string>
  processEngineer: Array<string>
  mgrOfProcessEngineer: Array<string>
  AfterApprove = false;
  dataLoaded: boolean;

  get getStage() {
    return this.initiativeService.suggestionStatus.stage && this.initiativeService.suggestionStatus.stage.indexOf('Admin Check') === -1 && (this.initiativeService.suggestionStatus.stage.indexOf('First Review') === -1) && this.initiativeService.suggestionStatus.stage !== '' && this.initiativeService.suggestionStatus.stage !== 'draft';
  }
  get invalidBOD1() {
    return this.initiativesDetailForm.controls.boD1.touched && this.initiativesDetailForm.controls.boD1.invalid;
  }

  get invalidSpecify() {
    return this.initiativesDetailForm.controls.specify.touched && this.initiativesDetailForm.controls.specify.invalid;
  }

  get invalidGeographySpecify() {
    return this.initiativesDetailForm.controls.geographySpecify.touched && this.initiativesDetailForm.controls.geographySpecify.invalid;
  }

  get invalidEntryMode() {
    return this.initiativesDetailForm.controls.entryMode.touched && this.initiativesDetailForm.controls.entryMode.invalid;

  }

  get invalidEntity() {
    return this.initiativesDetailForm.controls.entity.touched && this.initiativesDetailForm.controls.entity.invalid;
  }

  get invalidEntitySpecify() {
    return this.initiativesDetailForm.controls.entitySpecify.touched && this.initiativesDetailForm.controls.entitySpecify.invalid;
  }

  get invalidBod2() {
    return this.initiativesDetailForm.controls.boD2.touched && this.initiativesDetailForm.controls.boD2.invalid;
  }

  get invalidStrategicObjective() {
    return this.initiativesDetailForm.controls.strategicObjective.touched && this.initiativesDetailForm.controls.strategicObjective.invalid;
  }

  get invalidStrategyDetail() {
    return this.initiativesDetailForm.controls.strategyDetail.touched && this.initiativesDetailForm.controls.strategyDetail.invalid;
  }

  get invalidProjectManager() {
    return this.initiativesDetailForm.controls.projectManager.touched && this.initiativesDetailForm.controls.projectManager.invalid;
  }

  get invalidProjectEngineer() {
    return this.initiativesDetailForm.controls.projectEngineer.touched && this.initiativesDetailForm.controls.projectEngineer.invalid;
  }

  get invalidShare() {
    return this.initiativesDetailForm.controls.shareOfInvestment.touched && this.initiativesDetailForm.controls.shareOfInvestment.invalid;
  }

  get invalidAvgEbitda() {
    return this.financialAvgForm.controls.avgEbitda.touched && this.financialAvgForm.controls.avgEbitda.invalid;
  }

  get invalidTotalCapex() {
    return this.financialAvgForm.controls.totalCapex.touched && this.financialAvgForm.controls.totalCapex.invalid;
  }

  get invalidTotalValuation() {
    return this.financialAvgForm.controls.totalValuation.touched && this.financialAvgForm.controls.totalValuation.invalid;
  }

  get invalidSubmit() {
    return this.initiativesDetailForm.valid && this.ValidateProduct && this.financialAvgForm.valid;
  }

  get invalidPresident() {
    return this.initiativesDetailForm.controls.president.touched && this.initiativesDetailForm.controls.president.invalid;
  }

  get invalidManager() {
    var returnvalue = this.initiativesDetailForm.controls.manager.touched && this.initiativesDetailForm.controls.manager.invalid;
    return returnvalue
  }

  get invalidBaseCase() {
    return this.initiativesDetailForm.controls.baseCase.touched && this.initiativesDetailForm.controls.baseCase.invalid;
  }

  get invalidProjectIrrBaseCase() {
    return this.initiativesDetailForm.controls.projectIrrBaseCase.touched && this.initiativesDetailForm.controls.projectIrrBaseCase.invalid;
  }

  get invalidNpvBaseCase() {
    return this.initiativesDetailForm.controls.npvBaseCase.touched && this.initiativesDetailForm.controls.npvBaseCase.invalid;
  }

  get invalidPaybackBaseCase() {
    return this.initiativesDetailForm.controls.paybackBaseCase.touched && this.initiativesDetailForm.controls.paybackBaseCase.invalid;
  }

  get invalidEbitdaBaseCase() {
    return this.initiativesDetailForm.controls.ebitdaBaseCase.touched && this.initiativesDetailForm.controls.ebitdaBaseCase.invalid;
  }

  get InvalidFx() {
    return this.initiativesDetailForm.controls.fx.touched && this.initiativesDetailForm.controls.fx.invalid;
  }

  get InvalidBudgetYear() {
    return this.initiativesDetailForm.controls.firstBudgetYear.touched && this.initiativesDetailForm.controls.firstBudgetYear.invalid;
  }

  get InvalidGeography() {
    return this.initiativesDetailForm.controls.geography.touched && this.initiativesDetailForm.controls.geography.invalid;
  }

  get InvalidBusinessModel() {
    return this.initiativesDetailForm.controls.businessModel.touched && this.initiativesDetailForm.controls.businessModel.invalid;
  }
  InvalidProduct(i) {
    if (!this.Cim) {
      return false;
    }
    const control = this.productForm.get('products') as FormArray;
    return control.at(i).get('name').touched && control.at(i).get('name').invalid;
  }

  InvalidCapacity(i) {
    if (!this.Cim) {
      return false;
    }
    const control = this.productForm.get('products') as FormArray;
    return control.at(i).get('capacity').touched && control.at(i).get('capacity').invalid;
  }

  InvalidProductUnit(i) {
    if (!this.Cim) {
      return false;
    }
    const control = this.productForm.get('products') as FormArray;
    return control.at(i).get('productUnit').touched && control.at(i).get('productUnit').invalid;
  }
  InvalidOtherProduct(i) {
    if (!this.Cim) {
      return false;
    }
    const control = this.productForm.get('products') as FormArray;
    return control.at(i).get('other').touched && control.at(i).get('other').invalid;
  }
  InvalidTypeProduct(i) {
    if (!this.Cim) {
      return false;
    }
    const control = this.productForm.get('products') as FormArray;
    return control.at(i).get('type').touched && control.at(i).get('type').invalid;
  }

  ngOnInit() {
    if (!this.formGroup.get('initiativesDetailForm')) {
      this.formGroup.addControl('initiativesDetailForm', this.initiativesDetailForm);
    }
    this.detailService.GetProductUnits().subscribe(productUnits => this.productUnits = productUnits);
    this.detailService.GetMilestoneStatuses().subscribe(milestoneStatuses => this.milestoneStatuses = milestoneStatuses);
    this.detailService.GetOwners().subscribe(owners => this.owners = owners);
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
    this.bsConfigYear = Object.assign({}, { isAnimated: true, dateInputFormat: 'YYYY', minMode: this.minMode });
    this.GetSuggestStatus(this.id);
    this.GetInitiativeDetail(this.id);
    this.SetEntryMode();
    this.GetPresident();

    this.formGroup.get('initiativesForm').get("requestProjectEngineer").valueChanges.subscribe(selectedValue => {
      if (this.formGroup.get('initiativesForm').get("requestProjectEngineer").value) {
        this.ShowProject = true;
        this.formGroup.get('initiativesDetailForm').get('requireProject').setValue(true);
      }
      else {
        this.ShowProject = false;
        this.formGroup.get('initiativesDetailForm').get('requireProject').setValue(false);
      }
    });
  }

  init() {
    let detailForm = this.initiativesDetailForm as FormGroup;
    if (!detailForm.get('milestoneForm')) {
      detailForm.addControl('milestoneForm', this.milestoneForm);
    }
    if (!detailForm.get('financialForm')) {
      detailForm.addControl('financialForm', this.financialForm);
    }
    if (!detailForm.get('financialAvgForm')) {
      detailForm.addControl('financialAvgForm', this.financialAvgForm);
    }

    if (this.Cim) {
      if (!detailForm.get('productForm')) {
        detailForm.addControl('productForm', this.productForm);
      }
    }

  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  async SetEntryMode() {
    await this.detailService.GetInitiativeDetail(this.id).toPromise().then(res => {
      if (res) {
      }
    });
  }

  isShowEntity() {
    return this.showEntity;
  }



  ngOnDestroy() {
    this.dataLoaded = false;
  }



  get StageIL5() {
    return this.stage === 'IL5';
  }

  InvalidMilestone(i) {
    const control = this.milestoneForm.get('progressDetails') as FormArray;
    if (control.at(i)) {
      return control.at(i).get('milestone').touched && control.at(i).get('milestone').invalid;
    } else {
      return null;
    }
  }

  InvalidStartDate(i) {
    const control = this.milestoneForm.get('progressDetails') as FormArray;
    return control.at(i).get('start').touched && control.at(i).get('start').invalid;
  }

  InvalidKeyDeliverable(i) {
    const control = this.milestoneForm.get('progressDetails') as FormArray;
    return control.at(i).get('keyDeliverable').touched && control.at(i).get('keyDeliverable').invalid;
  }
  InvalidPlanFinish(i) {
    const control = this.milestoneForm.get('progressDetails') as FormArray;
    return control.at(i).get('planFinish').touched && control.at(i).get('planFinish').invalid;
  }

  GetSuggestStatus(id) {
    this.initiativeService.GetSuggestStatus(id).subscribe(response => {

      if (response) {


        this.status = response.status;
        this.stage = response.stage;
        this.remark = response.remark ? response.remark : null;

        this.Cim = response.cim ? true : false;
        this.Capex = response.directCapex ? true : false;
        this.Max = response.max ? true : false;
        this.Strategy = response.strategy;
        if (response.strategy) {
          this.productForm.disable();
          this.financial = 5;

        } else {
          this.initiativeService.initiativeType = "cim";
          this.financial = 10;
        }
        if (response.stage == 'initiative' && response.status == null) {
          this.AfterApprove = true;
        }
        this.init();

      }
    });
  }

  SetMarkAsTouchedTotal() {
    switch (this.typeOfInvestment) {
      case 'Divestment':
        this.financialAvgForm.controls.totalValuation.markAsTouched();
        break;
      default:
        this.financialAvgForm.controls.avgEbitda.markAsTouched();
        this.financialAvgForm.controls.totalCapex.markAsTouched();
        break;
    }
  }

  GetInitiativeDetail(id) {
    this.detailService.GetInitiativeDetail(id).subscribe(response => {
      if (response) {

        this.detailService.initiativeDetailId = response.id;
        this.startDate = response.startingDate;
        this.finishDate = response.finishingDate;

        this.bsBOD1.minDate = response.startingDate ? new Date(response.startingDate) : null;
        this.bsBOD1.maxDate = response.finishingDate ? new Date(response.finishingDate) : null;
        this.bsBOD2.minDate = this.bsBOD1.minDate ? this.bsBOD1.minDate : response.startingDate ? new Date(response.startingDate) : null;
        this.bsBOD2.maxDate = response.finishingDate ? new Date(response.finishingDate) : null;
        this.typeOfInvestment = response.typeOfInvestment;
        this.initiativeCode = response.initiativeCode;
        let getYear = new Date(response.year);
        if (!isNaN(getYear.getTime()) && getYear.getTime() > 0) {
          this.initiativeYear = getYear.getFullYear().toString();
          this.year = getYear.getFullYear().toString();
        } else {
          this.initiativeYear = response.year;
          this.year = response.year;
        }
        this.detailService.GetStrategicObjectives(this.initiativeYear).subscribe(result => this.strategicObjectives = result);

        //set investment
        this.riskService.changeTypeOfInvestment(response.typeOfInvestment);
        if (response.initiativeDetails?.requireProject) {
          this.initiativesDetailForm.patchValue({ processEngineer: response.initiativeDetails.processEngineer });
          this.ShowProject = true;
        }
        this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(general => {

          if (response.typeOfInvestment === 'CVC') {
            this.entryModes.push({ entryModeId: 'E002', entryModeTitle: 'CVC' });
          }
          else if (response.typeOfInvestment === 'M&A') {
            this.entryModes.push({ entryModeId: 'E005', entryModeTitle: 'M&A' });
          }
          else if (response.typeOfInvestment === 'Divestment' || general.divestment) {

            this.entryModes.push({ entryModeId: 'E006', entryModeTitle: 'Divestment' });
          }
          else {
            this.entryModes.push({ entryModeId: 'E001', entryModeTitle: 'JV' });
            this.entryModes.push({ entryModeId: 'E003', entryModeTitle: 'Existing Unit' });
            this.entryModes.push({ entryModeId: 'E004', entryModeTitle: 'Organic' });
            this.entryModes.push({ entryModeId: 'E009', entryModeTitle: 'Other' });
          }
        });
        this.initiativesDetailForm.patchValue({
          irr: response.irr,
          firstBudgetYear: response.year
        });

        this.initiativeDetails = response.initiativeDetails;
        this.products = response.products;

        // change Milestones to progressDetails
        this.progressDetails = response.progressDetails;
        this.financialIndicators = response.financialIndicators;
        this.financials = response.financials;
        if (this.initiativeDetails && this.initiativeDetails.entity === 'other') {
          this.showEntity = true;
        }
        if (this.initiativeDetails && this.initiativeDetails.geography === 'other') {
          this.showGeography = true;
        }
        if (this.initiativeDetails && this.initiativeDetails.entryMode === 'other') {
          this.showSpecify = true;
        }



        if (this.initiativeDetails) {

          this.riskService.changeEntryMode(this.initiativeDetails.entryMode);

          this.Detail = this.initiativeDetails.id;

          if (this.initiativeDetails.strategyDetail) {
            this.initiativesDetailForm.controls.strategyDetail.enable();
          } else {
            this.initiativesDetailForm.controls.strategyDetail.disable();
          }

          if (this.initiativeDetails.requireBOD1) {
            this.ShowBOD = true;
          } else {
            this.ShowBOD = false;
          }

          if (this.initiativeDetails.strategicObjective) {
            this.detailService.GetStrategies(this.initiativeDetails.strategicObjective).subscribe(result => this.strategies = result);
          }

          if (this.initiativeDetails.entryMode === 'E009') {
            this.showSpecify = true;
            this.initiativesDetailForm.controls.specify.enable();
          } else {
            this.showSpecify = false;
            this.initiativesDetailForm.controls.specify.disable();
            this.initiativesDetailForm.patchValue({ specify: null });
          }

          this.initiativesDetailForm.patchValue(this.initiativeDetails);

          this.BOD1Date = this.initiativeDetails.boD1 ? new Date(this.initiativeDetails.boD1) : null;
          this.BOD2Date = this.initiativeDetails.boD2 ? new Date(this.initiativeDetails.boD2) : null;

          this.initiativesDetailForm.patchValue({
            strategyDetail: this.initiativeDetails.strategyDetail ? this.initiativeDetails.strategyDetail : '',
            boD1: this.BOD1Date,
            boD2: this.BOD2Date
          });

          // this.initiativesHaveProduct.patchValue({
          //   haveProduct: this.initiativeDetails.haveProduct ? this.initiativeDetails.haveProduct : 'true'
          // });

          if (this.initiativeDetails.haveProduct == "true") {
            (this.productForm.get('products') as FormArray).controls.forEach(item => { item.enable(); });
            const ProductControl = this.productForm.get('products') as FormArray;
            for (let i = 0; i < ProductControl.length; i++) {
              ProductControl.at(i).get('other').disable();
            }
            this.isHaveProduct = 'true';
          } else {
            (this.productForm.get('products') as FormArray).controls.forEach(item => { item.disable(); });
            this.isHaveProduct = 'false';
          }
          this.initiativesDetailForm.patchValue({
            irr: this.initiativeDetails.irr ? this.initiativeDetails.irr : '',
            npv: this.initiativeDetails.npv ? this.initiativeDetails.npv : '',
            fx: this.initiativeDetails.fx ? this.initiativeDetails.fx : '',
            fxChoice: this.initiativeDetails.fxChoice ? this.initiativeDetails.fxChoice : 'THB',
            shareOfInvestment: this.initiativeDetails.shareOfInvestment ? this.initiativeDetails.shareOfInvestment : '',
            firstBudgetYear: this.initiativeDetails.firstBudgetYear ? this.initiativeDetails.firstBudgetYear : response.year
          });

        } else {
          this.initiativesDetailForm.patchValue({ initiativeId: this.id });
        }

        if (this.products.length === 0) {
          this.AddProduct();
        } else {
          const ProductControls = this.productForm.get('products') as FormArray;
          for (let i = 0; i < this.products.length; i++) {
            ProductControls.push(this.InitialProductForm());
            ProductControls.at(i).setValue(this.products[i]);
            ProductControls.at(i).get('other').enable();
          }
          for (let i = 0; i < ProductControls.length; i++) {
            if (ProductControls.at(i).get('productUnit').value === 'PU03') {
              ProductControls.at(i).get('other').enable();
            } else {
              ProductControls.at(i).get('other').disable();
            }
          }
          this.isDisabledProduct = ProductControls.length > 1 ? false : true;
        }

        if (this.progressDetails.length === 0) {
          this.AddMilestone();
        } else {
          const MilestoneControls = this.milestoneForm.get('progressDetails') as FormArray;
          for (let i = 0; i < this.progressDetails.length; i++) {
            MilestoneControls.push(this.InitialMilestoneForm());
            MilestoneControls.at(i).setValue(response.progressDetails[i]);
            const startResponse = this.progressDetails[i].start ? new Date(this.progressDetails[i].start) : null;
            const plantFinishResponse = this.progressDetails[i].planFinish ? new Date(this.progressDetails[i].planFinish) : null;
            const actualFinishResponse = this.progressDetails[i].actualFinish ? new Date(this.progressDetails[i].actualFinish) : null;
            MilestoneControls.at(i).get('start').patchValue(startResponse);
            MilestoneControls.at(i).get('planFinish').patchValue(plantFinishResponse);
            MilestoneControls.at(i).get('actualFinish').patchValue(actualFinishResponse);
          }
          this.isDisabledMilestone = MilestoneControls.length > 1 ? false : true;
        }

        if (this.financialIndicators.length === 0) {
          this.AddFinancial();
        } else {
          const FinancialControls = this.financialForm.get('financials') as FormArray;
          for (let i = 0; i < this.financialIndicators.length; i++) {
            FinancialControls.push(this.InitialFinancialForm());
            FinancialControls.at(i).setValue(response.financialIndicators[i]);
          }
          this.financialLength = FinancialControls.length;
        }
        if (this.financials) {
          this.RevenueChange();
          this.EbitdaChange();
          this.CapexChange();
          this.OpexChange();
          this.ValuationChange();
          //this.financialAvgForm.setValue(response.financials);
        }


      } else {
        this.commonDataService.GetcommonDataByType('currency').then(currency => {
          let fx = currency.find(x => x.attribute02 === 'Dollar').attribute03;
          this.initiativesDetailForm.patchValue({
            fx: response.fxExchange ? response.fxExchange : fx,
          })
          this.initiativesDetailForm.get('fx').patchValue(fx);
        });
      }
      // this.SetValidateTotal();
      this.dataLoaded = true
      if (this.initiativeService.viewMode) {
        this.initiativesDetailForm.disable();
      }

      this.dataLoaded = true;

    });


  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }


  InitialProductForm(): FormGroup {
    return this.fb.group({
      id: 0,
      name: null,
      capacity: '',
      productUnit: '',
      other: { value: '', disabled: true },
      type: '',
      initiativeId: this.id
    });
  }

  InitialMilestoneForm(): FormGroup {
    return this.fb.group({
      id: 0,
      milestone: null,
      keyDeliverable: null,
      start: null,
      planFinish: null,
      actualFinish: null,
      activity: 'Critical',
      initiativeId: this.id,
      initiativeCode: null
    });
  }

  InitialFinancialForm(): FormGroup {
    return this.fb.group({
      id: 0,
      year: null,
      revenue: null,
      ebitda: null,
      capex: null,
      opex: null,
      valuation: null,
      initiativeId: this.id
    });
  }

  AddProduct() {
    const control = this.productForm.get('products') as FormArray;
    control.push(this.InitialProductForm());
    this.isDisabledProduct = control.length > 1 ? false : true;
  }

  RemoveProduct(index: number) {
    const control = this.productForm.get('products') as FormArray;
    control.removeAt(index);
    this.productForm.markAsDirty();
    this.isDisabledProduct = control.length > 1 ? false : true;
  }

  AddMilestone() {
    const control = this.milestoneForm.get('progressDetails') as FormArray;
    control.push(this.InitialMilestoneForm());
    this.planStatus.push(null);
    this.isDisabledMilestone = control.length > 1 ? false : true;
  }

  RemoveMilestone(index: number) {
    const control = this.milestoneForm.get('progressDetails') as FormArray;
    control.removeAt(index);
    this.milestoneForm.markAsDirty();
    this.planStatus.splice(index, 1);
    this.isDisabledMilestone = control.length > 1 ? false : true;
  }

  setRequestDate(date: any, fieldName: string, index: number) {

    let dateCheck = date ? new Date(date).setHours(0, 0, 0, 0) : 0;
    if (dateCheck > 0) {

      let dateStart = new Date(this.startDate).getTime();
      let dateFinish = new Date(this.finishDate).getTime();


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
  //   let mileStoneArray = this.milestoneForm.get('progressDetails') as FormArray;
  //   // mileStoneArray.at(index).get('planFinish').setValue('');
  //   // mileStoneArray.at(index).get('actualFinish').setValue('');
  // }


  ChangePlanDate(i, value: Date): void {
    const time = value ? this.dateUtil.GetDateOnly(value).getTime() : null;
    const timeNow = this.dateUtil.GetToday.getTime();
    if (this.milestoneForm.get('progressDetails')) {
      const control = this.milestoneForm.get('progressDetails') as FormArray;
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
  }

  getStartDate(i: number): Date {
    const control = this.milestoneForm.get('progressDetails') as FormArray;
    return control.at(i).get('start').value ? control.at(i).get('start').value as Date : this.formGroup.get('initiativesForm').get('startingDate').value as Date;
  }

  changeActualFinish(index: number) {
    this.ChangeActual(index);
  }

  ChangeActual(i) {
    const control = this.milestoneForm.get('progressDetails') as FormArray;
    if (control) {
      const time = control.at(i).get('planFinish').value ? this.dateUtil.GetDateOnly(control.at(i).get('planFinish').value).getTime() : null;
      const timeNow = this.dateUtil.GetToday.getTime();
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
    return;
  }

  ChangeActualNull(i) {
    const control = this.milestoneForm.get('details') as FormArray;
    if (control) {
      const time = control.at(i).get('planFinish').value ? this.dateUtil.GetDateOnly(control.at(i).get('planFinish').value).getTime() : null;
      control.at(i).get('actualFinish').patchValue(null);
      const timeNow = this.dateUtil.GetToday.getTime();
      if (time > 0) {
        if (time >= timeNow) {
          this.planStatus[i] = 'min';
        } else {
          this.planStatus[i] = 'max';
        }
      }
    }
    return;
  }

  AddFinancial() {
    const control = this.financialForm.get('financials') as FormArray;
    if (!this.Strategy) {
      this.financial = control.length >= 10 ? 5 : this.financial;
      for (let i = 1; i <= this.financial; i++) {
        if (control.length < 20) { control.push(this.InitialFinancialForm()); }
      }
      const year = parseInt(this.year);
      for (let i = 0; i < control.length; i++) {
        if (i < 20) { control.at(i).get('year').patchValue(year + i); }
      }
    } else {
      this.financial = control.length >= 10 ? 5 : this.financial;
      for (let i = 1; i <= this.financial; i++) {
        if (control.length < 20) { control.push(this.InitialFinancialForm()); }
      }
      const year = parseInt(this.year);
      for (let i = 0; i < control.length; i++) {
        if (i < 20) { control.at(i).get('year').patchValue(year + i); }
      }
    }
    this.financialLength = control.length;
    this.isRemoveFinancial = control.length === 1 ? true : false;
    this.isAddFinancial = control.length === 20 ? true : false;
  }




  RemoveFinancial(index) {
    const control = this.financialForm.get('financials') as FormArray;
    control.removeAt(index);
    this.financialLength = control.length;
    this.isRemoveFinancial = control.length > 1 ? false : true;
    this.isAddFinancial = control.length === 20 ? true : false;
    this.RevenueChange();
    this.EbitdaChange();
    this.CapexChange();
    this.OpexChange();
    this.ValuationChange();
    this.financialForm.markAsDirty();
  }

  OnChangeStrategic(event) {
    this.initiativesDetailForm.controls.strategyDetail.enable();
    this.initiativesDetailForm.controls.strategyDetail.setValidators([Validators.required]);
    this.initiativesDetailForm.controls.strategyDetail.updateValueAndValidity();
    const strategicObjectiveId = event.target.value;
    this.detailService.GetStrategies(strategicObjectiveId).subscribe(strategies => this.strategies = strategies);
  }

  OnChangeUnit(i) {
    const control = this.productForm.get('products') as FormArray;
    if (control.at(i).get('productUnit').value === 'PU03') {
      control.at(i).get('other').enable();
    } else {
      control.at(i).get('other').patchValue('');
      control.at(i).get('other').disable();
    }
  }

  RequireBOD1(event) {
    if (event.target.checked) {
      this.ShowBOD = true;
    } else {
      this.ShowBOD = false;
      this.bsBOD2.minDate = new Date(this.startDate);
    }
  }

  RequireProject() {
    if (this.initiativesDetailForm.controls.requireProject.value === false) {
      this.ShowProject = true;
      this.formGroup.get('initiativesForm').get('requestProjectEngineer').setValue(true);
      this.initiativesDetailForm.controls.projectDirector.enable();
      this.initiativesDetailForm.controls.projectManager.enable();
      this.initiativesDetailForm.controls.projectEngineer.enable();
      this.initiativesDetailForm.controls.processEngineer.enable();
      this.initiativesDetailForm.controls.mgrOfProcessEngineer.enable();
      this.detailService.GetTeamSupport().subscribe(res => {
        this.projectDirector = res as Array<string>,
          this.projectManager = res as Array<string>,
          this.projectEngineer = res as Array<string>,
          this.processEngineer = res as Array<string>,
          this.mgrOfProcessEngineer = res as Array<string>
      });
      this.initiativesDetailForm.controls.projectManager.setValidators([Validators.required]);
      this.initiativesDetailForm.controls.projectManager.updateValueAndValidity();

      this.initiativesDetailForm.controls.projectEngineer.setValidators([Validators.required]);
      this.initiativesDetailForm.controls.projectEngineer.updateValueAndValidity();
    } else {
      this.ShowProject = false;
      this.formGroup.get('initiativesForm').get('requestProjectEngineer').setValue(false);
      this.initiativesDetailForm.controls.projectDirector.disable();
      this.initiativesDetailForm.controls.projectManager.disable();
      this.initiativesDetailForm.controls.projectEngineer.disable();
      this.initiativesDetailForm.controls.processEngineer.disable();
      this.initiativesDetailForm.controls.mgrOfProcessEngineer.disable();
      this.initiativesDetailForm.controls.projectManager.clearValidators();
      this.initiativesDetailForm.controls.projectManager.updateValueAndValidity();
      this.initiativesDetailForm.controls.projectEngineer.clearValidators();
      this.initiativesDetailForm.controls.projectEngineer.updateValueAndValidity();
    }
  }

  OnChangeEntryMode() {
    if (this.initiativesDetailForm.controls.entryMode.value === 'E009') {
      this.showSpecify = true;
      this.initiativesDetailForm.controls.specify.enable();
      this.initiativesDetailForm.controls.specify.setValidators([Validators.required]);
      this.initiativesDetailForm.controls.specify.updateValueAndValidity();
    } else {
      this.showSpecify = false;
      this.initiativesDetailForm.controls.specify.disable();
      this.initiativesDetailForm.patchValue({ specify: null });
      this.initiativesDetailForm.controls.specify.clearValidators();
      this.initiativesDetailForm.controls.specify.updateValueAndValidity();
    }
  }

  OnChangeGeography() {
    if (this.initiativesDetailForm.controls.geography.value === 'other') {
      this.showGeography = true;
      this.initiativesDetailForm.controls.geographySpecify.enable();
      this.initiativesDetailForm.controls.geographySpecify.setValidators([Validators.required]);
      this.initiativesDetailForm.controls.geographySpecify.updateValueAndValidity();
    } else {
      this.showGeography = false;
      this.initiativesDetailForm.controls.geographySpecify.disable();
      this.initiativesDetailForm.patchValue({ geographySpecify: null });
      this.initiativesDetailForm.controls.geographySpecify.clearValidators();
      this.initiativesDetailForm.controls.geographySpecify.updateValueAndValidity();
    }
  }

  OnChangeEntity() {
    if (this.initiativesDetailForm.controls.entity.value === 'other') {
      this.showEntity = true;
      this.initiativesDetailForm.controls.entitySpecify.enable();
      this.initiativesDetailForm.controls.entitySpecify.setValidators([Validators.required]);
      this.initiativesDetailForm.controls.entitySpecify.updateValueAndValidity();
    } else {
      this.showEntity = false;
      this.initiativesDetailForm.controls.entitySpecify.disable();
      this.initiativesDetailForm.patchValue({ entitySpecify: null });
      this.initiativesDetailForm.controls.entitySpecify.clearValidators();
      this.initiativesDetailForm.controls.entitySpecify.updateValueAndValidity();
    }

  }

  ChangeYear(value) {
    if (value) {
      const controls = this.financialForm.get('financials') as FormArray;
      this.year = value.getFullYear();
      for (let i = 0; i < controls.length; i++) { controls.at(i).get('year').patchValue(this.year + i); }
      this.setYear = this.dateUtil.SetYear(new Date(value));
    } else {
      return null;
    }
  }

  ChangeBOD1(value: Date): void {
    const time = value ? new Date(value).getTime() : 0;
    let startTime = new Date(this.bsBOD1.minDate).getTime();
    let finishTime = new Date(this.bsBOD1.maxDate).getTime();
    if (time > 0) {
      if (startTime > time || time > finishTime) {
        this.initiativesDetailForm.get('boD1').markAsTouched();
        if (!this.initiativeService.viewMode) {
          this.initiativeService.viewMode ? false : this.swalTool.DateValid();
          this.initiativesDetailForm.patchValue({ boD1: null, boD2: null });
        }
      }
      else {
        this.bsBOD2.minDate = this.BOD1Date
        this.initiativesDetailForm.patchValue({ boD2: null });
      }
    }
  }

  OnShowBOD1() {
    this.initiativesDetailForm.controls.boD1.clearValidators();
    this.initiativesDetailForm.controls.boD1.updateValueAndValidity();
  }

  OnHiddenBOD1() {
    if (!this.initiativesDetailForm.controls.boD1.value) {
    }
  }

  ChangeBOD2(value: Date): void {
    let checkDate = value ? new Date(value).getTime() : 0;
    let startDate = new Date(this.bsBOD2.minDate).getTime();
    let finishDate = new Date(this.bsBOD2.maxDate).getTime();
    if (checkDate > 0) {
      if (startDate > checkDate || checkDate > finishDate) {
        this.initiativesDetailForm.get('boD2').markAsTouched();
        if (!this.initiativeService.viewMode) {
          this.initiativeService.viewMode ? false : this.swalTool.DateValid();
          this.initiativesDetailForm.patchValue({ boD2: null });
        }
      }
    }
  }

  ClickBODDate() {
    let startDate = this.formGroup.get('initiativesForm').get('startingDate').value;
    let finishdate = this.formGroup.get('initiativesForm').get('finishingDate').value;
    this.bsBOD1.minDate = startDate ? new Date(startDate) : null;
    this.bsBOD1.maxDate = finishdate ? new Date(finishdate) : null;
    let boD1 = this.initiativesDetailForm.get('boD1') ? this.initiativesDetailForm.get('boD1').value : null;
    if (boD1) {
      this.bsBOD2.minDate = new Date(boD1);
    } else {
      this.bsBOD2.minDate = startDate ? new Date(startDate) : null;
    }
    this.bsBOD2.maxDate = finishdate ? new Date(finishdate) : null;
  }

  OnChangeShareOfInvestment() {
    const shareOfInvestment = this.initiativesDetailForm.controls.shareOfInvestment.value;
    if (shareOfInvestment > 100) {
      this.initiativesDetailForm.patchValue({ shareOfInvestment: 100 });
    }
    if (shareOfInvestment < 0) {
      this.initiativesDetailForm.patchValue({ shareOfInvestment: 0 });
    }
  }

  RevenueChange() {
    this.CalculateFinancial('revenue');
  }

  EbitdaChange() {
    this.CalculateFinancial('ebitda');
  }
  CapexChange() {
    this.CalculateFinancial('capex');
  }

  OpexChange() {
    this.CalculateFinancial('opex');
  }

  ValuationChange() {
    this.CalculateFinancial('valuation');
  }

  CalculateFinancial(type) {
    const controls = this.financialForm.get('financials') as FormArray;
    const value = [];
    let table = 0;
    for (let i = 0; i < controls.length; i++) {
      if (controls.at(i).get(type).value !== null && controls.at(i).get(type).value !== '') {
        let removedCommaValue = controls.at(i).get(type).value.toString().replace(',','');
        value.push(parseFloat(removedCommaValue)); table += 1;
      } else {
        value.push(null);
      }
    }
    let sum;
    let result;
    if (!value.every(v => v == null)) {
      sum = value.reduce((a, b) => a + b, 0);
      result = (sum / table);
      switch (type) {
        case 'revenue':
          this.financialAvgForm.patchValue({
            avgRevenue: isNaN(result) ? 0 : result.toFixed(2)
          });
          break;
        case 'ebitda':
          this.financialAvgForm.patchValue({
            avgEbitda: isNaN(result) ? 0 : result.toFixed(2)
          });
          break;
        case 'capex':
          this.financialAvgForm.patchValue({
            totalCapex: isNaN(sum) ? 0 : sum.toFixed(2)
          });
          break;
        case 'opex':
          this.financialAvgForm.patchValue({
            totalOpex: isNaN(sum) ? 0 : sum.toFixed(2)
          });
          break;
        case 'valuation':
          this.financialAvgForm.patchValue({
            totalValuation: isNaN(sum) ? 0 : sum.toFixed(2)
          });
          break;
      }
    } else {
      switch (type) {
        case 'revenue':
          this.financialAvgForm.patchValue({
            avgRevenue: null
          });
          break;
        case 'ebitda':
          this.financialAvgForm.patchValue({
            avgEbitda: null
          });
          break;
        case 'capex':
          this.financialAvgForm.patchValue({
            totalCapex: null
          });
          break;
        case 'opex':
          this.financialAvgForm.patchValue({
            totalOpex: null
          });
          break;
        case 'valuation':
          this.financialAvgForm.patchValue({
            totalValuation: null
          });
          break;
      }
    }

  }

  ChangeHaveProduct(event) {
    this.isHaveProduct = event.target.value;
    if (this.isHaveProduct === 'true') {
      this.ValidateProduct = true;
      (this.productForm.get('products') as FormArray).controls.forEach(item => item.enable());
      const control = this.productForm.get('products') as FormArray;
      for (let i = 0; i < control.length; i++) {
        control.at(i).get('other').disable();
      }
    } else {
      this.ValidateProduct = false;
      (this.productForm.get('products') as FormArray).controls.forEach(item => item.disable());
      const control = this.productForm.get('products') as FormArray;
      for (let i = 0; i < control.length; i++) {
        control.at(i).get('name').disable();
        control.at(i).get('other').disable();
      }
    }
  }

  CheckProductValid() {
    return this.ValidateProduct
    //if (this.isHaveProduct === 'true' && this.Cim) {
    //  this.productForm.controls.products.markAsTouched();
    //  const control = this.productForm.get('products') as FormArray;
    //  for (let i = 0; i < control.length; i++) {
    //    this.ValidateProduct = control.at(i).get('name').value ? true : false;
    //  }
    //} else {
    //  this.ValidateProduct = true;
    //}
  }

  SetMarkAsTouchedDetail() {
    this.initiativesDetailForm.controls.strategicObjective.markAsTouched();
    this.initiativesDetailForm.controls.strategyDetail.markAsTouched();
    this.initiativesDetailForm.controls.specify.markAsTouched();
    this.initiativesDetailForm.controls.shareOfInvestment.markAsTouched();
    this.initiativesDetailForm.controls.baseCase.markAsTouched();
    this.initiativesDetailForm.controls.projectIrrBaseCase.markAsTouched();
    this.initiativesDetailForm.controls.npvBaseCase.markAsTouched();
    this.initiativesDetailForm.controls.paybackBaseCase.markAsTouched();
    this.initiativesDetailForm.controls.ebitdaBaseCase.markAsTouched();
    if (this.ShowBOD) { this.initiativesDetailForm.controls.boD1.markAsTouched(); }
    if (this.isHaveProduct === 'true') {
      this.productForm.controls.products.markAsTouched();
      const control = this.productForm.get('products') as FormArray;
      for (let i = 0; i < control.length; i++) { control.at(i).get('name').markAsTouched(); }
    }
  }

  PatchForm() {
    this.initiativesDetailForm.patchValue({
      id: this.Detail ? this.Detail : 0,
      boD1: this.BOD1Date ? this.BOD1Date : null,
      boD2: this.BOD2Date ? this.BOD2Date : null,
      haveProduct: this.initiativesHaveProduct.controls.haveProduct.value,
      irr: this.financialIndicatorForm.controls.irr.value,
      npv: this.financialIndicatorForm.controls.npv.value,
      fx: this.financialIndicatorForm.controls.fx.value,
      fxChoice: this.financialIndicatorForm.controls.fxChoice.value,
      firstBudgetYear: this.setYear,
      note: this.noteForm.controls.note.value
    });
  }

  //set date ondestroy



  GetPerson(Position, Text?) {
    this.params.text = Text ? Text : '';
    switch (Position.toLowerCase()) {
      case 'dm':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.managerList = owners; });
        break;
      case 'vp':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.presidentList = owners; });
        break;
      case 'director':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.directorList = owners; });
        break;
      case 'projectmanager':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.projectManagerList = owners; });
        break;
      case 'projectengineer':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.projectEngineerList = owners; });
        break;
      case 'processengineer':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.processEngineerList = owners; });
        break;
      case 'divmanagerprocess':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.divManagerProcessList = owners; });
        break;
    }
  }

  SearchPerson(event, position) {
    this.GetPerson(position, event.term);
  }

  ClearPerson(position) {
    this.GetPerson(position);
  }

  GetPresident(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.presidentList = owners;
      this.managerList = owners;
    });
  }

  get initiativeStartDate(): Date {
    return this.formGroup.get('initiativesForm').get('startingDate').value as Date;
  }

  get initiativeFinishDate(): Date {
    return this.formGroup.get('initiativesForm').get('finishingDate').value as Date;
  }

  // IsProgressFormDisable(): boolean {
  //   if (this.formGroup.get('progressForm')) {
  //     this.milestoneForm.disable();
  //     return false;
  //   }
  //   else {
  //     this.milestoneForm.enable();
  //     return true;
  //   }
  // }

  get requireProjectEng() {
    return this.formGroup.get('initiativesForm').get('requestProjectEngineer').value;
  }

  get haveProgressForm() {
    return this.progressService.haveProgress;
  }

  changeFinanceYear() {
    // const value = this.financialForm.get('financials').value;
    let control = this.financialForm.get('financials') as FormArray;
    const startYear = this.generalData.startingDate ? new Date(this.generalData.startingDate).getFullYear() : parseInt(this.year);
    if(startYear == parseInt(this.year)){
      return;
    }
    this.year = startYear.toString();
    this.formGroup.get('initiativesDetailForm').get('firstBudgetYear').setValue(startYear);
    
    control.clear();
    if (!this.Strategy) {
      this.financial = control.length >= 10 ? 5 : this.financial;
      for (let i = 1; i <= this.financial; i++) {
        if (control.length < 20) { control.push(this.InitialFinancialForm()); }
      }
      const year = startYear;
      for (let i = 0; i < control.length; i++) {
        if (i < 20) { control.at(i).get('year').patchValue(year + i); }
      }
    } else {
      this.financial = control.length >= 10 ? 5 : this.financial;
      for (let i = 1; i <= this.financial; i++) {
        if (control.length < 20) { control.push(this.InitialFinancialForm()); }
      }
      const year = startYear;
      for (let i = 0; i < control.length; i++) {
        if (i < 20) { control.at(i).get('year').patchValue(year + i); }
      }
    }
    this.financialLength = control.length;
    this.isRemoveFinancial = control.length === 1 ? true : false;
    this.isAddFinancial = control.length === 20 ? true : false;
  }
}

