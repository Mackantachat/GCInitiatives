import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateUtil } from '@utils/date.utils';
import { ResponseService } from '@errors/response/response.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { AuthService } from '@services/authentication/auth.service';
import { ImpactService } from '@services/impact/impact.service';

@Component({
  selector: 'app-carried-general',
  templateUrl: './carried-general.component.html',
  styleUrls: ['./carried-general.component.css']
})
export class CarriedGeneralComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dateUtil: DateUtil,
    private authService: AuthService,
    private impactService: ImpactService,
    private unauthorized: UnauthorizedService,
    private response: ResponseService,
    private initiativeService: InitiativeService,
  ) { }

  @Input() id;

  @Output() CheckSubmit = new EventEmitter();

  plants: any = [];
  years: any = [];
  owners: any = [];
  organizations: any = [];
  coDevelopers: any = [];
  typeOfInvestments: any = [];
  coDeveloperSelected: any = [];
  selectListCoDeveloper: any = [];

  selectedItems = [];

  dateRegisterDisplay: string;
  dateStartDisplay: string;
  dateFinishDisplay: string;

  IsCim: boolean;
  IsPim: boolean;
  IsDim: boolean;
  IsCapex: boolean;
  IsMax: boolean;
  IsCpi: boolean;
  IsRandD: boolean;
  IsStrategy: boolean;
  IsOther: boolean;

  initiativesForm = this.fb.group({
    initiativeCode: null,
    name: null,
    year: null,
    ownerName: null,
    organization: null,
    company: null,
    specifyCompany: null,
    coDeveloper: null,
    integration: null,
    plant: null,
    specifyPlant: null,
    location: null,
    specifyLocation: null,
    registeringDate: null,
    startingDate: null,
    finishingDate: null,
    background: null,
    resultObjective: null,
    scopeOfWork: null,
    initiativeType: null,
    requestCapex: null,
    typeOfInvestment: null,
    involveItDigital: null,
    requestProjectEngineer: null,
    budgetType: null,
    ram: null,
    jFactor: null,
    irr: null,
    wacc: null,
    costEstCapex: null,
    costEstCapexType: null,
    budgetSource: null,
    requestOpex: null,
    costEstOpex: null,
    costEstOpexType: null,
    typeBenefit: null,
    benefitAmount: null,
    benefitAmountType: null,
    payBackPeriod: null,
    fxExchange: null,
    cim: null,
    pim: null,
    dim: null,
    max: null,
    cpi: null,
    directCapex: null,
    strategy: null,
    randD: null,
    other: null,
    trackMax: null
  });

  coDeveloperItems: any = [];

  showLocation = false;
  showTypeOfInvestment = true;
  showBudget = true;
  showRam = true;
  showJFactor = true;
  showIrr = true;
  showCostEstCapex = true;
  showCostEstCapexType = true;
  showCostEstOpex = true;
  showCostEstOpexType = true;
  showBudgetSource = true;
  showTypeBenefit = true;
  showFxExchange = true;
  showWacc = false;
  showBenefitAmount = false;
  showPayBackPeriod = false;

  params: any = {};

  ngOnInit(): void {
    this.GetSelectGeneral();
    this.GetYears();
    setTimeout(() => this.GetInitiative(), 200);
  }

  GetSelectGeneral() {
    this.initiativeService.GetPlants().subscribe(plants => this.plants = plants);
    this.plants.push({ id: 9999, plantId: 'P9999', plantTitle: 'Others (please specify)' });
    this.initiativeService.GetOrganizations().subscribe(organizations => this.organizations = organizations);
    this.initiativeService.GetCoDevelopers().subscribe(coDevelopers => this.coDevelopers = coDevelopers);
    this.initiativeService.GetOwners().subscribe(owners => this.owners = owners);
    this.initiativeService.GetTypeOfInvestments().subscribe(typeOfInvestments => this.typeOfInvestments = typeOfInvestments);
    this.typeOfInvestments.push({ id: 9999, typeOfInvestment: 'Others', typeOfInvestmentTitle: 'Others' });
  }

  GetYears() {
    const year = new Date().getFullYear();
    for (let i = 1; i <= 5; i++) { this.years.push(year - i); }
    this.years.unshift(year + 1, year);
  }

  SetHideForm() {
    this.showTypeOfInvestment = false;
    this.showBudget = false;
    this.showRam = false;
    this.showIrr = false;
    this.showJFactor = false;
    this.showCostEstCapex = false;
    this.showCostEstCapexType = false;
    this.showFxExchange = false;
  }

  CheckTypeOfInvestment(typeOfInvestment) {
    switch (typeOfInvestment) {
      case 'Maintain Reliability':
        this.showRam = false;
        this.showJFactor = false;
        this.showBudget = false;
        break;
      case 'Replacement':
        this.showRam = false;
        this.showJFactor = false;
        this.showIrr = false;
        break;
      case 'CSR':
      case 'Digital CAPEX':
      case 'IT CAPEX':
      case 'Turnaround':
      case 'Others':
      case 'Overhaul':
      case 'R&D':
      case 'Lab & Quality':
      case 'Technical Support for R&D':
      case 'Welfare':
        this.showRam = false;
        this.showJFactor = false;
        this.showIrr = false;
        this.showBudget = false;
        break;
      case 'Engineering Request ER':
        this.showRam = false;
        this.showJFactor = false;
        this.showIrr = false;
        break;
      case 'CVC':
      case 'Divestment':
      case 'M&A':
        this.showBudget = false;
        this.showRam = false;
        this.showJFactor = false;
        this.showIrr = false;
        this.showTypeBenefit = false;
        break;
      case 'Growth: Backbone':
      case 'Growth: New business':
      case 'Growth: Build International Competitive base':
      case 'Growth: Diversify to performance chemicals':
      case 'Growth: Enhance green':
      case 'Sustain Core: Synergy':
      case 'Sustain Core: Operational Excellence':
      case 'Sustain Core: Marketing Excellence':
      case 'Sustain Core: Debot/Expansion':
      case 'Sustain Core: Chain Integration':
      case 'Sustain Core: New derivative':
      case 'Sustain Core: Map ta put retrofit':
        this.showJFactor = false;
        this.showRam = false;
        this.showBudget = false;
        break;
      case 'Sustain Core: Energy saving':
        this.showJFactor = false;
        this.showRam = false;
        this.showBudget = false;
        this.showWacc = true;
        break;
      case 'Safety':
      case 'Environment':
      case 'Law & Regulation':
        this.showIrr = false;
        this.showTypeBenefit = false;
        this.showBudget = false;
        break;
    }
  }

  CheckCostEstimated(typeOfInvestment) {
    const costEstCapex = this.initiativesForm.controls.costEstCapex.value;
    switch (typeOfInvestment) {
      case 'Maintain Reliability':
      case 'Replacement':
      case 'Turnaround':
      case 'Lab & Quality':
      case 'Technical Support for R&D':
      case 'R&D':
      case 'Overhaul':
      case 'CSR':
      case 'Welfare':
      case 'Engineering Request ER':
      case 'Others':
        if (costEstCapex > 300) {
          this.showTypeBenefit = false;
          this.showBenefitAmount = false;
          this.showPayBackPeriod = false;
        } else {
          this.showTypeBenefit = true;
        }
        break;
      case 'Growth: Backbone':
      case 'Growth: New business':
      case 'Growth: Build International Competitive base':
      case 'Growth: Diversify to performance chemicals':
      case 'Growth: Enhance green':
      case 'Sustain Core: Synergy':
      case 'Sustain Core: Operational Excellence':
      case 'Sustain Core: Marketing Excellence':
      case 'Sustain Core: Debot/Expansion':
      case 'Sustain Core: Chain Integration':
      case 'Sustain Core: New derivative':
      case 'Sustain Core: Map ta put retrofit':
        if (costEstCapex > 300) {
          this.showTypeBenefit = false;
          this.showBenefitAmount = false;
          this.showPayBackPeriod = false;
          this.showIrr = false;
        } else {
          this.showIrr = true;
          this.showTypeBenefit = true;
        }
        break;
      case 'Digital CAPEX':
      case 'IT CAPEX':
        if (costEstCapex > 300) {
          this.showTypeBenefit = false;
          this.showBenefitAmount = false;
          this.showPayBackPeriod = false;
          this.showIrr = false;
        } else {
          this.showTypeBenefit = true;
        }
        break;
    }
  }

  ActiveSuggestion(response) {
    if (response.cim) {
      this.initiativesForm.patchValue({ cim: true });
      this.IsCim = true;
    }
    if (response.pim) {
      this.initiativesForm.patchValue({ pim: true });
      this.IsPim = true;
    }
    if (response.dim) {
      this.initiativesForm.patchValue({ dim: true });
      this.IsDim = true;
    }
    if (response.max) {
      this.initiativesForm.patchValue({ max: true });
      this.IsMax = true;
    }
    if (response.cpi) {
      this.initiativesForm.patchValue({ cpi: true });
      this.IsCpi = true;
    }
    if (response.randD) {
      this.initiativesForm.patchValue({ randD: true });
      this.IsRandD = true;
    }
    if (response.other) {
      this.initiativesForm.patchValue({ other: true });
      this.IsOther = true;
    }
    if (response.strategy) {
      this.initiativesForm.patchValue({ strategy: true });
      this.IsStrategy = true;
    }
    if (response.directCapex) {
      this.initiativesForm.patchValue({ directCapex: true });
      this.IsCapex = true;
    }
  }

  DisableForm(FormControl) {
    if (FormControl.includes('investment')) { this.initiativesForm.controls.typeOfInvestment.disable(); }
    if (FormControl.includes('budgetType')) { this.initiativesForm.controls.budgetType.disable(); }
    if (FormControl.includes('ram')) { this.initiativesForm.controls.ram.disable(); }
    if (FormControl.includes('jFactor')) { this.initiativesForm.controls.jFactor.disable(); }
    if (FormControl.includes('irr')) { this.initiativesForm.controls.irr.disable(); }
    if (FormControl.includes('fxExchange')) { this.initiativesForm.controls.fxExchange.disable(); }
    if (FormControl.includes('costEstCapex')) { this.initiativesForm.controls.costEstCapex.disable(); }
    if (FormControl.includes('costEstOpex')) { this.initiativesForm.controls.costEstOpex.disable(); }
    if (FormControl.includes('costEstCapexType')) { this.initiativesForm.controls.costEstCapexType.disable(); }
    if (FormControl.includes('costEstOpexType')) { this.initiativesForm.controls.costEstOpexType.disable(); }
    if (FormControl.includes('budgetSource')) { this.initiativesForm.controls.budgetSource.disable(); }
    if (FormControl.includes('typeBenefit')) { this.initiativesForm.controls.typeBenefit.disable(); }
    if (FormControl.includes('wacc')) { this.initiativesForm.controls.wacc.disable(); }
    if (FormControl.includes('benefitAmount')) { this.initiativesForm.controls.benefitAmount.disable(); }
    if (FormControl.includes('payBackPeriod')) { this.initiativesForm.controls.payBackPeriod.disable(); }
  }

  ShowForm(FormControl) {
    if (FormControl.includes('investment')) { this.showTypeOfInvestment = true; }
    if (FormControl.includes('budgetType')) { this.showBudget = true; }
    if (FormControl.includes('ram')) { this.showRam = true; }
    if (FormControl.includes('jFactor')) { this.showJFactor = true; }
    if (FormControl.includes('irr')) { this.showIrr = true; }
    if (FormControl.includes('costEstCapex')) { this.showCostEstCapex = true; }
    if (FormControl.includes('costEstCapexType')) { this.showCostEstCapexType = true; }
    if (FormControl.includes('typeBenefit')) { this.showTypeBenefit = true; }
    if (FormControl.includes('wacc')) { this.showWacc = true; }
    if (FormControl.includes('benefitAmount')) { this.showBenefitAmount = true; }
    if (FormControl.includes('payBackPeriod')) { this.showPayBackPeriod = true; }
    if (FormControl.includes('fxExchange')) { this.showFxExchange = true; }
  }

  HideForm(FormControl) {
    if (FormControl.includes('investment')) { this.showTypeOfInvestment = false; }
    if (FormControl.includes('budgetType')) { this.showBudget = false; }
    if (FormControl.includes('ram')) { this.showRam = false; }
    if (FormControl.includes('jFactor')) { this.showJFactor = false; }
    if (FormControl.includes('irr')) { this.showIrr = false; }
    if (FormControl.includes('costEstCapex')) { this.showCostEstCapex = false; }
    if (FormControl.includes('costEstOpex')) { this.showCostEstOpex = false; }
    if (FormControl.includes('costEstCapexType')) { this.showCostEstCapexType = false; }
    if (FormControl.includes('costEstOpexType')) { this.showCostEstOpexType = false; }
    if (FormControl.includes('budgetSource')) { this.showBudgetSource = false; }
    if (FormControl.includes('typeBenefit')) { this.showTypeBenefit = false; }
    if (FormControl.includes('wacc')) { this.showWacc = false; }
    if (FormControl.includes('benefitAmount')) { this.showBenefitAmount = false; }
    if (FormControl.includes('payBackPeriod')) { this.showPayBackPeriod = false; }
    if (FormControl.includes('fxExchange')) { this.showFxExchange = false; }
  }

  CheckOwner(ownerName, createdBy) {
    setTimeout(() => {
      this.authService.getMsalUser().subscribe((user) => {
        this.params.text = ownerName;
        this.initiativeService.GetOwnerName(this.params).subscribe(owners => {
          if ((user.mail === owners.email) || (user.mail === createdBy)) {
            this.CheckSubmit.emit(true);
          }
        });
      }, error => this.unauthorized.error(error));
    }, 200);

  }

  GetInitiative() {
    this.initiativeService.GetInitiative(this.id).subscribe(response => {

      this.initiativesForm.disable();
      this.initiativesForm.patchValue(response);

      this.coDeveloperSelected = response.initiativeCoDevelopers;
      this.coDeveloperSelected.forEach((element) => {
        if (element.coDeveloperName) { this.selectListCoDeveloper.push(element.coDeveloperName); }
      });
      this.coDeveloperItems = this.selectListCoDeveloper;
      this.initiativesForm.patchValue({ coDeveloper: this.coDeveloperItems });
      this.selectedItems = this.selectListCoDeveloper;
      this.dateRegisterDisplay = this.dateUtil.GetDate(new Date(response.registeringDate));
      this.dateStartDisplay = this.dateUtil.GetDate(new Date(response.startingDate));
      this.dateFinishDisplay = response.finishingDate ? this.dateUtil.GetDate(new Date(response.finishingDate)) : null;
      this.initiativesForm.patchValue({
        registeringDate: this.dateRegisterDisplay,
        startingDate: this.dateStartDisplay,
        finishingDate: this.dateFinishDisplay,
        jFactor: response.jFactor !== 0 ? response.jFactor : null,
        irr: response.irr !== 0 ? response.irr : null,
        costEstCapex: response.costEstCapex !== 0 ? response.costEstCapex : null,
        benefitAmount: response.benefitAmount !== 0 ? response.benefitAmount : null,
        fxExchange: response.fxExchange !== 0 ? response.fxExchange : null,
        payBackPeriod: response.payBackPeriod !== 0 ? response.payBackPeriod : null
      });
      this.CheckTypeOfInvestment(response.typeOfInvestment);
      this.CheckCostEstimated(response.typeOfInvestment);
      this.ActiveSuggestion(response);

      if (this.initiativesForm.controls.costEstCapex.value > 300) {
        this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc']);
        this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
        this.initiativesForm.patchValue({ typeBenefit: '' });
      } else {
        this.ShowForm(['typeBenefit']);
        this.DisableForm(['typeBenefit']);
      }

      switch (response.typeBenefit) {
        case 'EBIT':
        case 'EBITDA':
          this.showBenefitAmount = true;
          this.showPayBackPeriod = true;
          break;
        default:
          this.showBenefitAmount = false;
          break;
      }
      if (response.requestCapex === 'false') {
        this.ShowForm(['typeBenefit']);
        this.HideForm(['investment', 'budgetType', 'ram', 'irr', 'jFactor', 'costEstCapex', 'costEstCapexType', 'fxExchange']);
        this.DisableForm(['investment', 'budgetType', 'ram', 'irr', 'jFactor', 'costEstCapex', 'costEstCapexType', 'fxExchange']);
      }
      if (response.requestOpex === 'falseOpex') {
        this.HideForm(['costEstOpex', 'costEstOpexType']);
        this.DisableForm(['costEstOpex', 'costEstOpexType']);
      }

      if (response.benefitAmount) {
        this.impactService.GetImpactTotalRecurringOneTime(this.id).subscribe((result) => {
          if (result) {
            if (result !== 0) {
              this.initiativesForm.patchValue({ benefitAmount: result });
            }
          }
        });
      }

      this.CheckOwner(response.ownerName, response.createdBy);

    }, error => this.response.error(error));
  }

}
