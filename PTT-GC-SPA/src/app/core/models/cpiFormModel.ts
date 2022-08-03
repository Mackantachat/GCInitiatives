import { Milestone } from '@models/milestone';
import { FormArray } from '@angular/forms';
import { bestPracticeModel } from './bestPracticeModel';
import { LessonLearnType } from './LessonLearnConstant';
import { ProgressDetail } from './progressDetail';
import { Initiative } from './initiative';

export interface CpiFormModel {
    initiativesForm: Initiative;
    detailCpiForm: detailCpi;
    progessForm: ProgressDetail;
    lessonLearnedForm: LessonLearnModel[];
    bestPracticeForm: bestPracticeModel;
}

export interface detailCpi {
    id: number;
    initiativeId: number;
    sourceOfImprovement: string;
    typeOfCpi: string;
    analysisTool: string;
    phnBuPillar: string;
    specifyPhnBuPillar: string;
    typeOfPhn: string;
    specifyTypeOfPhn: string;
    otherTool: string;
    rootCause: string;
    cpiApprover: string;
    estimatedBudgetOpex: number;
    estimatedBenefitSavings: number;
    estimatedBenefitCalculationDetails: string;
    actualBudgetOpex: number;
    actualBudgetSavings: number;
    actualBenefitCalculationDetails: string;
    lookbackText: string;
    milestoneFormList: ProgressDetail[];
    kpiFormList: Array<CpiKpi>;
    kpiMonitorFormList: Array<KpiMonitor>;
    // List<CpiKeyPerformanceIndicator> KpiFormList :string;
    // List<ProgressDetail> MilestoneFormList :string;
    // List<CpiKpiMonitor> KpiMonitorFormList :string;
}

export interface StepExplaination {
    id: number;
    initiativeId: number;
    stepTitle: string;
    start: Date;
    finish: Date;
    responsibleBy: string;
}

export interface CpiKpi {
    kpiNo: 0;
    kpiTitle: string;
    baseline: number;
    target: number;
    unit: string;
    remark: string;
}

export interface KpiMonitor {
    id: number;
    initiativeId: number;
    kpiNo: number;
    kpiTitle: string;
    result: string;
    target: string;
    status: string;
}

export interface LessonLearnModel {
    Id: number;
    IsDeleted: boolean;
    InitiativeId: number;
    ProjectPhaseNo: number;
    MilestoneNo: number;
    AreaOfLearning: string;
    Issues: string;
    Background: string;
    LessonLearned: string;
    Remark: string;
    Rating: number;
}