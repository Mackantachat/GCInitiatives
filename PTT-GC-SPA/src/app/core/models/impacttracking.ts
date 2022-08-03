export interface ImpactTracking {
    id: number;
    financialImpactArea: string;
    haveShareBenefit: boolean;
    iL4RunRateRecurring: number;
    iL5RunRateRecurring: number;
    iL4RunRateOnetime: number;
    iL5RunRateOnetime: number;
    iL5FixedFxRecurring: number;
    iL5FloatFxRecurring: number;
    iL5FixedFxOnetime: number;
    iL5FloatFxOnetime: number;
    totalRecurring: number;
    totalOnetime: number;
    firstRunRateMonth: Date;
    autoCalculate: boolean;
    indirectBenefit: boolean;
    explanation: string;
    impiemantCost: boolean;
    totalCostOPEX: number;
    toComment: string;
    remark1: string;
    remark2: string;
    remark3: string;
    remark4: string;
    remark5: string;
    initiativeId: number;
    initiativeCode: string;
    siL4Achievement: string;
    siL5Achievement: string;
    contactIO: string;
    lastApprovedIL4Date: Date;
    lastApprovedIL5Date: Date;
    contactIOBy: string;
    firstApprovedIL4Date: Date;
    lastSubmittedSIL4Date: Date;
    lastSubmittedSIL5Date: Date;
}
export interface FirstRunRateTable {
    id: number;
    impactTypeOfBenefitTable: string;
    typeOfBenefit: string;
    versionPrice: VersionPrice;
    runRate: RunRate;
    monthRows1: MonthRow;
    monthRows2: MonthRow;
    monthRows3: MonthRow;
}
export interface VersionPrice {
    row1: string;
    row2: string;
    row3: string;
}
export interface RunRate {
    row1: number;
    row2: number;
    row3: number;
}
export interface MonthRow {
    month1: number;
    month2: number;
    month3: number;
    month4: number;
    month5: number;
    month6: number;
    month7: number;
    month8: number;
    month9: number;
    month10: number;
    month11: number;
    month12: number;
    month13: number;
    month14: number;
    month15: number;
    month16: number;
    month17: number;
    month18: number;
    month19: number;
    month20: number;
    month21: number;
    month22: number;
    month23: number;
    month24: number;
    month25: number;
    month26: number;
    month27: number;
    month28: number;
    month29: number;
    month30: number;
    month31: number;
    month32: number;
    month33: number;
    month34: number;
    month35: number;
    month36: number;
}
export interface MonthRowDateTempData {
    month: Date;
    monthData: number;
}
export interface runRateTempData {
    runRateMonthTempMonth1: MonthRowDateTempData[];
    runRateMonthTempMonth2: MonthRowDateTempData[];
    runRateMonthTempMonth3: MonthRowDateTempData[];
}