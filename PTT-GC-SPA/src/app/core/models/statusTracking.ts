export interface StatusTracking {
   // status: string;
   // stage: string;
   // approvedBy: string;
   // approvedDate: Date;
   // sequence: number;
   // processType: string;

   status: string;
   stage: string;
   approvedBy: string;
   approvedDate: Date;
   sequence: number;
   runningSequence: number;
   processType: string;
   subType: string;
   historyId: number
   initiativeId: number
   flowType: string;
   currentStageDisplay: string;
   currentActionInformation: string;
   nextActionInformation: string;

}
