export interface IMeetingList {
  // id: number;
  // initialtiveName: string;
  // owner: string;
  // initialtiveType: string;
  // location: string;
  // eMocNo: number;
  // gate: number;
  // presentation: string;
  // pDD: string;
  // sMERequest: string;
  // budgetSource: string;
  // overallBudget: number;
  // requestBudget: number;
  // result: string;

  id: number;
  initiativeCode: string;
  name: string;
  ownerName: string;
  initiativeType: string;
  location: string;
  emocNo: string;
  gate: string;
  presentation: string;
  pdd: string;
  smesRequest: string;
  budgetSource: string;
  overallBudget: string;
  requestBudget: string;
}

export class InitiativeMember {
  initiativeMemberId: number;
  vacPicId: number
  memberType: string // pic, vac
  initiativeId: number;
  initiativeCode: string;
  name: string;
  ownerName: string;
  initiativeType: string;
  // location: string;
  // emocNo: string;
  // gate: string;
  // presentation: string;
  // pdd: string;
  // smesRequest: string;
  // budgetSource: string;
  // overallBudget: string;
  // requestBudget: string;
  plant: string;
  emocNo: string;
  gate: string;
  presentation: string;
  pdd: string;
  overallCostEst: string; // requestCapex + requestOpex
  requestCapex: string;
  costEstCapexType: string;
  requestOpex: string;
  costEstOpexType: string;
  fxExchange: string;
  result: string;
  stage: string;
  process: string;
  initiativeStatus: string;
  selected: boolean;
}

export interface InitiativeVacPicList {
  initiativeId: number;
  initiativeCode: string;
  name: string;
  ownerName: string;
  initiativeType: string;
  plant: string;
  emocNo: string;
  gate: string;
  presentation: string;
  pdd: string;
  overallCostEst: string; // requestCapex + requestOpex
  requestCapex: string;
  costEstCapexType: string;
  requestOpex: string;
  costEstOpexType: string;
  fxExchange: string;
  stages: string[];
  leaves: string[];
  moveBacks: string[];
  switchProcesses: string[];
}
