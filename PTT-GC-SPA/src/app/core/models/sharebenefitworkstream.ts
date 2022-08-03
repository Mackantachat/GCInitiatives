export interface ShareBenefitWorkstream {
    id: number;
    workstream: string;
    percent: string;
    initiativeId: number;
    il4RRBlended: number;
    il5RRBlended: number;
    il5FixedFXOnetime: number;
    il5FixedFxRecurring: number;
    il5FloatFxOnetime: number;
    il5FloatFxRecurring: number;
    il4RROneTime: number;
    il4RRRecurring: number;
    il5RROneTime: number;
    il5RRRecurring: number;
    totalRROnetime: number;
    totalRRRecurring: number;
    totalRRBlended: number;
    onetimeImplementationCost: number;
}
