import { DetailInformation } from '@models/detailInformation';

export interface DetailMax {
  initiativeCode: string;
  name: string;
  year: string;
  ownerName: string;
  organization: string;
  typeOfInvestment: string;
  cim: number;
  pim: number;
  dim: number;
  max: number;
  directCapex: number;
  cpi: number;
  strategy: number;
  randD: number;
  other: number;
  status: string;
  remark: string;
  stage: string;
  requestOpex: string;
  costEstOpex: number;
  detailInformations: DetailInformation;
}
