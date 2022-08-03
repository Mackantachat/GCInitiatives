export interface MaxApprover {
    id: number;
    workstreamType: string;
    workstreamValue: string;
    indicator: string;
    approverEmail: string;
    order: number;
    isRequestCapex: boolean;
    benefitMin: number;
    benefitMax: number;
    ownerName: string;
}