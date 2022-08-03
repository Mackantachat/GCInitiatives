import { DateParseTokenFn } from 'ngx-bootstrap/chronos/types';

export interface PimGate {
  //vacDate: number;
  //username: string;
  //role: string;
  //userId: number;
  pimGateId: number;
  gate: number;
  vacDate: string;
  vacStatus: string;
  reviseBudgetRevision: number;
  gateDate: string;
  gateStatus: string;
  costEstimate: number;
  receivedOpexBudget: number;
  receivedCapexGate2: number;
  requestCapexGate3: number;
  requestOpex: number;
  additionalOpexBudget: number;
  tieInLongLeadItemsBudget: number;
  overallCapex: string;
  eMocStatus: string;
  executionLookbackStatus: string;
  sapStatus: string;
  benefit: number;
  irr: number;
  simplePayback: number;
  ram: number;
  jFactor: number;
  picMemberCenter: string;
  picMemberUpStream: string;
  picMemberDownStream: string;
  requestPool: boolean;
  note: string;
  simplefiedProject: string;

  presentationLink: string
  subPicMomLink: string
  picMomLink: string
  vacCheckListLink: string
  requestPoolStatus: string
  projectCharterLink: string

  //pic-member
  upStream: string[];
  centerStream: string[];
  downStream: string[];

}
