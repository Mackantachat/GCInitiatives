import { Milestone } from './milestone';
export interface bestPracticeModel {
    id: number;
    initiativeId: number;
    isBestPracticeRequired: boolean;
    knowledgeType: string;
    sharedTo: string;
    isPublishToOpex: boolean;
    sharedPracticeType: string;
    title: string;
    knowledgeOwner: string;
    company: string;
    isDigitalization: boolean;
    startDate: Date;
    endDate: Date;
    yearOfBestPractice: Date;
    lifeTimeOfProject: number;
    investment: number;
    projectCost: number;
    abstractSummary: string;
    abstractDetails: string;
    objective: string;
    benefitDescription: number;
    knowledgeTheme: string;
    enterpriseKeyword: string;
    captureMethod: string;
    captureMethodNote: string;
    targetGroupNote: string;
    applyFrom: Date;
    applyFromOpEx: Date;
    businessLine: string;
    projectType: string;
    oemsElement: string;
    application: string;
    operationFunction: string;
    operationUnit: string;
    equipmentType: string;
    productGroup: string;
    knowledgeContributor: string[];
    contact: Contact[];
    plant: string[];
    organization: string[];
    mileStoneModel: Milestone[]
}

export interface Contact {
    id: number;
    initiativeId: number;
    contactNo: number;
    name: string;
    phone: string;
    email: string;
}

export interface ProjectRefModel {
    id: number;
    initiativeId: number;
    no: number;
    projectReference: string;
    isDeleted: boolean;
}