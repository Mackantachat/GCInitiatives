export interface BscNarrativeModel {
    bscNarrativeId: number;
    initiativeId: number;
    year: number;
    month: number;
    // BSC
    engineering: string;
    construction: string;
    procurement: string;
    commissioningStartup: string;
    projectManagement: string;
    riskAndConcern: string;
    mitigationPlan: string;
    executiveSummary: string;
    workForNextMonth: string;
    environmentKpi: string;

    // Narrative
    highlightWork: string;
    catchupPlan: string;
    narrativeStatus: string;
}