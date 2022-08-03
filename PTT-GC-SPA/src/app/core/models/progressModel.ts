import { InvestmentCost } from './investmentCost';
import { ProgressDetail } from './progressDetail';

export interface ProgressModel {
  initiativeId: number,
  appropriationNo: number,
  wbsNo: string,
  standardProjectDef: string,
  responsible: string,
  solomonCategory: string,
  areaPlant: string,
  physicalBu: string,
  physicalUnit: string,
  details: Array<ProgressDetail>,
  progressHeaderId: number,
  planCost: InvestmentCost,
  actualCost: InvestmentCost,
  // bsc
  // engineering: string,
  // construction: string,
  // procurement: string,
  // commissioningStartup: string,
  // projectManagement: string,
  // riskAndConcern: string,
  // mitigationPlan: string,
  // executiveSummary: string,
  // workForNextMonth: string,
  // environmentKpi: string
}

export interface OutstandingModel {
  id: number;
  year: number;
  month: string;
  initiativeId: number;
  budgetBaht: number;
  actualBaht: number;
  prItemBaht: number;
  poItemBaht: number;
  commitmentBaht: number;
  contingency: number;
  estimateAtCompletion: number;
  isDeleted: boolean;
  outstandingFormArray: OutstandingData[];
}

export interface OutstandingData {
  id: number;
  initiativeId: number;
  year: number;
  month: string;
  outstandingId: number;
  itemDescription: string;
  itemListValueBaht: number;
  rpcDescription: string;
  rpcValueBaht: number;
  outstanding: number;
  isDeleted: boolean;
}
