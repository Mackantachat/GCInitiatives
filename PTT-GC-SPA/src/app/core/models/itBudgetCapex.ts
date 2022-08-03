export interface ITBudgetCapex {
  id: number;
  initiativeId: number;
  capexSummary: number;
  capexNo: string;
  advancedCapexChoice: string;
}

export interface CapexBudgetSurvey {
  id: number;
  initiativeId: number;
  topicId: string;
  status: boolean;
  choiceValue: string;
  law: string;
  impact: string;
  effective: string;
  choiceId: string;
}

