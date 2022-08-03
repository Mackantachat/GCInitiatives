export interface InitiativeHistoryIndex {
    id: number;
    initiativeIdMain: number;
    initiativeIdHistory: number;
    initiativeCode: string;
    stage: string;
    status: string;
    submittedBy: string;
    submittedDate: Date
    comment: string;
}