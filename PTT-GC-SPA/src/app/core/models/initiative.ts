import { Product } from '@models/product';
import { Milestone } from '@models/milestone';
import { Financial } from '@models/financial';
import { Detail } from '@models/detail';
import { FinancialIndicator } from '@models/financialIndicator';
import { DetailInformation } from '@models/detailInformation';

export interface Initiative {
  id: number;
  initiativeCode: string;
  lagacyInitiativeCode: string;
  name: string;
  year: string;
  ownerName: string;
  organization: string;
  company: string;
  specifyCompany: string;
  plant: string;
  specifyPlant: string;
  location: string;
  specifyLocation: string;
  registeringDate: Date;
  startingDate: Date;
  finishingDate: Date;
  background: string;
  initiativeSubType: string;
  resultObjective: string;
  initiativeType: string;
  requestCapex: string;
  typeOfInvestment: string;
  involveItDigital: number;
  requestProjectEngineer: number;
  budgetType: string;
  ram: string;
  jFactor: number;
  irr: number;
  costEstCapex: number;
  costEstCapexType: string;
  divestment: number;
  budgetSource: string;
  requestOpex: string;
  costEstOpex: number;
  costEstOpexType: string;
  typeBenefit: string;
  benefitAmount: number;
  benefitAmountType: string;
  payBackPeriod: number;
  fxExchange: number;
  cim: number;
  pim: number;
  dim: number;
  max: number;
  directCapex: number;
  cpi: number;
  strategy: number;
  randD: number;
  other: number;
  trackMax: number;
  createdDate: Date;
  createdBy: string;
  updatedDate: Date;
  updatedBy: string;
  approvedDate: Date;
  lastActivity: Date;
  status: string;
  remark: string;
  commentCancelled: string;
  stage: string;
  attachments: [];
  initiativeCoDevelopers: InitiativeCoDeveloper[];
  initiativeDetails: Detail;
  products: Product;
  milestones: Milestone;
  detailInformations: DetailInformation;
  financialIndicators: FinancialIndicator;
  financials: Financial;
  initiativeId: number;
  itDigital: string;
  isRequestCapex;
  isAddMore: boolean;
  isRevise: boolean;
  isReturn: boolean;
  isCreatedApp: boolean;

  //new
  scopeOfWork: string;
  alignWithCorpStrategy: boolean;
  strategicObjective: string;
  poolType: string;
  requestReference: boolean;
  // int? StatusTabStatus

  detailCimStrategyTabStatus: number;
  detailCpiTabStatus: number;
  detailMaxDimCapexTabStatus: number;
  detailPimTabStatus: number;
  isNextButtonClicked: boolean;


  generalTabStatus: number;
  detailTabStatus: number;
  impactTabStatus: number;
  riskTabStatus: number;
  resourceTabStatus: number;
  capexTabStatus: number;
  progressTabStatus: number;
  lessonLearnTabStatus: number;
  lookbackTabStatus: number;
  bestPracticeTabStatus: number;
  strategyTabStatus: number;
  statusTabStatus: number;
  flowType: string;
  subStage: string;

  //irr calculate
  useIrrCalculate: boolean;
  residualValue: number;
  utilitiesCost: number;
  maintenanceCost: number; // default 1.5%
  catalystChemicalsCost: number;
  labourCost: number;
  wacc: number; //default 8.00%

  //ram 
  likelihood: string;
  consequence: string;

  //jfactor

  baseRisk: number;
  riskOfAlt: number;
  riskReduction: number;
  potentialConCost: number;
  annualLikelihood: string;
  annualLikelihoodRatio: number;
  exposureFactor: string;
  exposureFactorRatio: number;
  probability: number;
  effectiveness: string;
  effectivenessRatio: number;
  productionLoss: number;
  economicPenalties: number;
  economicBenefits: number;
  opexPenaltiesCost: number;
  justifiableCost: number;
  isReviseFlow: boolean;
  coDeveloper: string[];
  surveyVersions: number;
  historyFlag: number;
}

export interface InitiativeTabs {
  generalTabStatus: number;
  detailMaxDimCapexTabStatus: number;
  detailPimTabStatus: number;
  detailCpiTabStatus: number;
  detailCimStrategyTabStatus: number;
  impactTabStatus: number;
  riskTabStatus: number;
  resourceTabStatus: number;
  capexTabStatus: number;
  progressTabStatus: number;
  lessonLearnTabStatus: number;
  lookbackTabStatus: number;
  bestPracticeTabStatus: number;
  strategyTabStatus: number;
  statusTabStatus: number;
  isNextButtonClicked: boolean;
}



export interface StageDetail {
  process: string;
  stage: string;
  sequence: number;
  subtype: string;
  initiativeId: number;
  flowType: string;
}

export interface InitiativeCoDeveloper {
  id: number;
  coDeveloperName: string;
  initiativeId: number;
}

export interface IrrDetail {
  costEstCapex: number;
  benefitAmount: number;
  residualValue: number;
  utilitiesCost: number;
  maintenanceCost: number; // default 1.5%
  catalystChemicalsCost: number;
  labourCost: number;
  wacc: number; //default 8.00%
  startingDate: Date;
  finishingDate: Date;
  fxExchange: number;
}

export interface SelectFactorModel {
  name: string;
  value: string;
  factor: number;
}

export interface RamDetail {
  plant: string;
  likelihood: string;
  consequence: string;
}

export interface JFactorDetail {
  // baseRisk: number;
  // riskOfAlt: number;
  // riskReduction: number;
  plant: string;
  costEstCapex: number;
  fxExchange: number;
  //
  potentialConCost: number;
  annualLikelihood: string;
  annualLikelihoodRatio: number;
  exposureFactor: string;
  exposureFactorRatio: number;
  probability: number;
  effectiveness: string;
  effectivenessRatio: number;
  productionLoss: number;
  economicPenalties: number;
  economicBenefits: number;
  opexPenaltiesCost: number;
  justifiableCost: number;
}

export interface DropDownData {
  name: string;
  value: string;
}

export interface StageDetailById {
  backwardStage: string;
  backwardStatus: string;
  cancelStage: string;
  cancelStatus: string;
  currentActionInformation: string;
  currentStage: string;
  currentStageDisplay: string;
  currentStatus: string;
  event: string;
  flowType: string;
  historyId: boolean;
  initiativeId: number;
  initiativeStageDetailId: number;
  isCreateType: string;
  isSwitchProcess: string;
  nextActionInformation: string;
  nextCondition: string;
  nextStage: string;
  nextStatus: string;
  postStageStoredProcedure: string;
  preStageStoredProcedure: string;
  process: string;
  rejectStage: string;
  rejectStatus: string;
  reviseStage: string;
  reviseStatus: string;
  sequence: number;
  subtype: string;
  switchProcessStage: string;
  switchProcessStatus: string;
}


