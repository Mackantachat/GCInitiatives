export interface Status {
  status: string;
  remark: string;
  stage: string;
  cim: boolean;
  pim: boolean;
  dim: boolean;
  max: boolean;
  directCapex: boolean;
  cpi: boolean;
  strategy: boolean;
  randD: boolean;
  other: boolean;
  initiativeType: string;
  requestCapex: boolean;
  isRequestCapex: boolean;
  flowType: string;
  subStage: string;
  subStatus: string;
  initiativeSubType: string;
}
