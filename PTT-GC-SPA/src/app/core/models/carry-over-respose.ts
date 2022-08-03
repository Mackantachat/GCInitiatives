export interface CarryOver {
    initiativeId: number;
    requestIniNoDate: string;
    wbsNo: string;
    initiativeName: string;
    initiativeOwner: string;
    investmentTypeGroup: string;
    investmentTypeSubGroup: string;
    vpCostCenter: string;
    codeOfCostCenter: string;
    requestCarriedDate: string;
    originalProjectCommercialDate: string;
    usefulLife: string;
    approvedBudget: string;
    actualAccumulated: string;
    currentActualAccumulated: string;
    available: string;
    newProjectCommercialDate: string;
    status: string;
    justification: string;
    sumBudget: number;
    totalCurrentYear: string;
    annualInvestmentPlan: AnnualInvestmentPlan[];
    monthlyInvestmentPlan: MonthlyInvestmentPlan[];
}

export interface AnnualInvestmentPlan {
    annualInvestmentPlanId: number;
    capexInformationId: number;
    currency: string;
    currencyFx: string;
    initiativeId: number;
    planType: string;
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
    year6: number;
    year7: number;
    year8: number;
    year9: number;
    year10: number;
    yearOverall: number;
}

export interface MonthlyInvestmentPlan {
    monthlyInvestmentPlanId: number;
    annualInvestmentPlanId: number;
    capexInformationId: number;
    initiativeId: number;
    investmentCost: string;
    investmentCostFx: string;
    yearOfMonth: string;
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;
    monthlyOverall: number;
    sumMonthlyType: string;
}

export class CarriedInformationConfig {
    public static months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
}  
