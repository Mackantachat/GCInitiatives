export interface HandoverModel {
    id: number;
    initiativeId: number;
    // Checkbox Part
    isDeliverables: boolean;
    isCommunicationOrTraining: boolean;
    isAllIssueClosed: boolean;
    isOperationSupport: boolean;

    // On-going Project Cost
    licenseOrSubscriptionFee: number;
    supportFee: number;
    startDate: Date;
    finishDate: Date;
    isAcceptHandover: boolean;
    acceptDate: Date;
    engineerEmail: string;
    handoverforIT: string;
    isRequestITHandover: boolean;
}