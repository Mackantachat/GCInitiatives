import { Kpi } from '@models/Kpi';

export interface KpiDetail {
    initiativeCode: string;
    name: string;
    year: string;
    ownerName: string;
    organization: string;
    requestCapex: string;
    typeOfInvestment: string;
    registeringDate: Date;
    startingDate: Date;
    finishingDate: Date;
    irr: number;
    typeBenefit: string;
    payBackPeriod: number;
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
    kpiDetailInformations: Kpi;
}
