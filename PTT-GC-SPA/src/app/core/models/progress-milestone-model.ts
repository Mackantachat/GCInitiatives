export class Plan {
  planValue: number;
  planAccumulate: number;
  planDisabled: boolean = true;
  actualValue: number;
  actualAccumulate: number;
  actualDisabled: boolean = true;
}
// export interface Plan {
//   value: number;
//   accumulate: number;
//   disabled: boolean;
//   actual_value: number;
//   actual_accumulate: number;
//   actual_disabled: boolean;
// }

export interface Month {
  name: string;
  overall_plan: Plan;
  engineering_plan: Plan;
  procurement_plan: Plan;
  construction_plan: Plan;
  commissioning_plan: Plan;
}

export class ProgressPlan {
  year: number;
  listMonth: Array<Month>;
}


export interface ProgressPlanNew {
  year: string;
  listMonth: Array<listMonthNew>;
}


export interface listMonthNew {
  monthName: string
  actualAccumulate: string
  actualDisabled: string
  actualValue: string
  planAccumulate: string
  planDisabled: boolean
  planValue: string
}








// Progress and milestone v2 //
export class ProgressPlanModel {
  progressPlanId: number;
  initiativeId: number;
  progressPlanType: string;
  planActual: string;
  year: string;
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

export interface ProgressPlanDateModel {
  progressPlanDateId?: number;
  progressPlanDateType: string;
  basicStartDate: string;
  basicFinishDate: string;
  actualStartDate: string;
  actualFinishDate: string;
  pocWeightPercent?: number;
  initiativeId?: number;
}
