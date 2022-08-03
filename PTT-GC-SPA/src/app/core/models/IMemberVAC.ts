import { InitiativeMember } from './IMeetingList';

export interface IMemberVAC {
  vacListId: number;
  meetingDate: Date;
  common: string[];
  specific: string[];
  initiativeId: number[];
  totalInitialtive: number;
  statusVac: string;
  initiativeMember: InitiativeMember[];
  stage: string[];
}

// public int InitiativeId { get; set; }
//         public string InitiativeCode { get; set; }
//         public string Name { get; set; }
//         public string OwnerName { get; set; }
//         public string InitiativeType { get; set; }
//         public string Location { get; set; }
//         public string EmocNo { get; set; }
//         public string Gate { get; set; }
//         public string Presentation { get; set; }
//         public string Pdd { get; set; }
//         public string SmesRequest { get; set; }
//         public string BudgetSource { get; set; }
//         public string OverallBudget { get; set; }
//         public string RequestBudget { get; set; }
//         public List<string> Stages { get; set; }
//         public List<string> SwitchProcesses { get; set; }



