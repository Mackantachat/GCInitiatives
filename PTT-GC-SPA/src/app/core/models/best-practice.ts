import { ProgressDetail } from "./progressDetail";

export interface BestPracticeModel {
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
  plant: string[];
  organization: string[];
  isDigitalization: boolean;
  startDate: Date;
  endDate: Date;
  yearOfBestPractice: Date;
  lifeTimeOfProject: string;
  investment: string;
  projectCost: string;
  abstractSummary: string;
  abstractDetails: string;
  objective: string;
  benefitDescription: string;
  knowledgeTheme: string;
  enterpriseKeyword: string;
  captureMethod: string;
  captureMethodNote: string;
  targetGroupNote: string;
  applyFrom: string;
  applyFromOpEx: string;
  businessLine: string;
  projectType: string;
  oemsElement: string;
  application: string;
  operationFunction: string;
  operationUnit: string;
  equipmentType: string;
  productGroup: string;
  knowledgeContributor: string[];
  contactModel: Contact[];
  projectReferenceModel: ProjectReferenceModel[];
  mileStoneModel: ProgressDetail[];
}

export interface Contact {
  id: number;
  initiativeId: number;
  name: string;
  phone: string;
  email: string;
}
export interface ProjectReferenceModel {
  id: number;
  initiativeId: number;
  projectReference: string;
}
