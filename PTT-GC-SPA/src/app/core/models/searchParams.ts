export interface SearchParams {
    maxPageSize: number;
    pageNumber: number;
    pageSize: number;
    page: string;
    text: string;
    id: string;
    name: string;
    status: string;
    myOwner: string;
    ownerName: string;
    registerDateSince: Date;
    registerDateTo: Date;
    progress: boolean;
    complete: boolean;
    cancel: boolean;
    column: string;
    orderBy: string;
    initiativeSubType: string;
    username: string;
    workstream: string;
    subWorkstream1: string;
    emocNo: string;
    wbsNo: string;
    appNo: string;
    company: string;
    //mutiple value
    organization: string;
    plant: string;
    typeOfInvestment: string;
    stage: string;
    type: string;

}