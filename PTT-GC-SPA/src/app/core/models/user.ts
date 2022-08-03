import { Approver } from '@models/approver';

export interface User {
  id: number;
  name: string;
  username: string;
  created: Date;
  lastActive: Date;
  approvers: Approver;
}
