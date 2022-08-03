export interface KpiKriData {
  status: string;
  date: string;
  years?: { [key: string]: DIYears };
}

export interface DIYears {
  information: DIInformation;
  details: DIDetail[];
}

export interface DIInformation {
  jan: DIMonth;
  feb: DIMonth;
  mar: DIMonth;
  apr: DIMonth;
  may: DIMonth;
  jun: DIMonth;
  jul: DIMonth;
  aug: DIMonth;
  sep: DIMonth;
  oct: DIMonth;
  nov: DIMonth;
  dec: DIMonth;
}

export interface DIDetail {
  type: string;
  status: boolean;
  detail: DIDetailRows[];
  jan?: DIScore;
  feb?: DIScore;
  mar?: DIScore;
  apr?: DIScore;
  may?: DIScore;
  jun?: DIScore;
  jul?: DIScore;
  aug?: DIScore;
  sep?: DIScore;
  oct?: DIScore;
  nov?: DIScore;
  dec?: DIScore;
}

export interface DIDetailRows {
  name: string;
  1: string | KPINameData;
  2: string | KPINameData;
  3: string | KPINameData;
  4?: KPINameData;
  5?: KPINameData;
}

export interface DIMonth {
  progressDetail: string;
  mitigation: string;
}

export interface DIScore {
  score: number;
  colour: string;
}

export interface KPINameData {
  text: string;
  colour: string;
}

export interface KpiMaintainModel {
  kpiMaintainId: number;
  initiativeId: number;
  kpiName: string;
  scoreText1: string;
  scoreLevel1: number;
  scoreText2: string;
  scoreLevel2: number;
  scoreText3: string;
  scoreLevel3: number;
  scoreText4: string;
  scoreLevel4: number;
  scoreText5: string;
  scoreLevel5: number;
  year: string;
  isActive: boolean;
}

export interface KriDetailMonth {
  kriDetailMonthId: number;
  kpiMaintainId: number;
  initiativeId: number;
  year: string;
  kriType: string;
  kriDetail: string;
  janScore: number;
  janColor: string;
  febScore: number;
  febColor: string;
  marScore: number;
  marColor: string;
  aprScore: number;
  aprColor: string;
  mayScore: number;
  mayColor: string;
  junScore: number;
  junColor: string;
  julScore: number;
  julColor: string;
  augScore: number;
  augColor: string;
  sepScore: number;
  sepColor: string;
  octScore: number;
  octColor: string;
  novScore: number;
  novColor: string;
  decScore: number;
  decColor: string;
  kriOrder: number;
  isAction: boolean;
  executionKri: string;
  target1: string;
  target2: string;
  target3: string;
}

export interface KriProgressMitigation {
  kriProgressMitigationId: number;
  kpiMaintainId: number;
  initiativeId: number;
  year: string;
  kriType: string;
  jan: string;
  feb: string;
  mar: string;
  apr: string;
  may: string;
  jun: string;
  jul: string;
  aug: string;
  sep: string;
  oct: string;
  nov: string;
  dec: string;
}

export interface MaintainKpi {
  kpiMaintainId: number;
  initiativeId: number;
  kpiName: string;
  scoreText1: string;
  scoreLevel1: number;
  scoreText2: string;
  scoreLevel2: number;
  scoreText3: string;
  scoreLevel3: number;
  scoreText4: string;
  scoreLevel4: number;
  scoreText5: string;
  scoreLevel5: number;
  year: string;
  isActive: boolean;
}

export interface InformKri {
  informKriId: number;
  informType: string;
  year: string;
  initiativeId: number;
  ownerName: string;
  email: string;
}

export interface KpiKriModel {
  statusKri :string;
  dateKri:string;
  informName: string[];
  editableName: string[];
  maintainKpi:MaintainKpi[];
  ownerEmail:string;
  isAdmin:boolean;
  initiativeYears:  string[];
  kriProgressMitigation:KriProgressMitigation[];
  kriDetailMonth:KriDetailMonth[];
  informKri:InformKri[];
}