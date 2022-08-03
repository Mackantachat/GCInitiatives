export interface Milestone {
  id: number;
  name: string;
  detail: string;
  keyDeliverable: string;
  actionBy: string;
  fromDate: Date;
  toDate: Date;
  milestoneStatus: string;
  initiativeId: number;
}
