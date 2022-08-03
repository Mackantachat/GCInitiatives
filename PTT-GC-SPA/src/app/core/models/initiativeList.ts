export interface InitiativeList {
  id: number;
  initiativeCode: string;
  name: string;
  ownerName: string;
  organization: string;
  registeringDate: Date;
  cim: number;
  pim: number;
  dim: number;
  max: number;
  directCapex: number;
  cpi: number;
  strategy: number;
  randD: number;
  other: number;
  initiativeType: string;
  status: string;
  stage: string;
  createdBy: string;
  createdDate: Date;
  isAddMore: boolean;
  isRevise: boolean;
  isReturn: boolean;
  updatedDate: Date;
  wbsNo: string;
  company: string;
  assignTo: string;
  counter: number;
}

/**
 * Initiative ID
Initiative Name
Owner Name
Investment type​
Benefit Type​ (IRR/Jfactor)
Benefit Value​
Project Cost (M THB)
Stage Gate
Reason (Concern Issue/Necessity)​
 */

export interface InitiativeListPoolPim {
  selected: boolean;
  id: number;
  initiativeCode: string;
  name: string;
  ownerName: string;
  typeOfInvestment: string;
  typeBenefit: string;
  benefit: number;
  costEstimate: number;
  stage: string;
  note: string;
}

export interface SearchConditonPoolPim {
  organization: string;
  plant: string;
  gate: string;
}

export interface InitiativeMemberVACPIC {
  vacPicId: number;
  memberType: string; // pic, vac
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
  overallCostEst: number;
  requestCapex: number;
  costEstCapexType: number;
  requestOpex: number;
  fxExchange: number;
  costEstOpexType: string;
  result: string;
  stage: string;
  process: string;
  tnitiativeStatus: string;
}