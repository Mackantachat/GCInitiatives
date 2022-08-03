import { StatusTracking } from '@models/statusTracking';

export interface Stage {
  initiativeCode: string;
  name: string;
  year: string;
  ownerName: string;
  organization: string;
  status: string;
  remark: string;
  stage: string;
  cim: number;
  pim: number;
  dim: number;
  max: number;
  directCapex: number;
  cpi: number;
  strategy: number;
  randD: number;
  other: number;
  initiativeStatusTrackings: StatusTracking;
}
