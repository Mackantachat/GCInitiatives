

// Execution lookback model
// export class ExecutionLookbackModel {
//     id: string;
//     issue: string;
//     background: string;
//     leassonLearned: string;
//     remark: string;
//     comment: string;
// }

// Lookback Review List
// export class LookbackReviewListModel {
//     no: number;
//     projectReview: string;
// }

// Lookback Model
// export class PlanLookbackModel {
//     finishingDate: Date;
//     planLookbackDate: Date;
//     environmentDate: Date;
//     performanceDate: Date;
//     projectBackground: Date;
//     scope: string;
//     projectObjective: string;
// }

export class LookbackReviewModel {
    LookbackReviewId: number;
    ProjectLookbackId: number;
    ProjectReviewTeam: string;
}

export interface ExececutionLookbackModel {
    // ExecutionLookbackId: number;
    ProjectLookbackId: number;
    Plan: Date;
    Actual: Date;
    KnowledgeArea: string;
    Issue: string;
    Background: string;
    LessonLearned: string;
    Remark: string;
    Comment: string;
}

export interface ProjectImpactWorkModel {
    // ProjectImpactWorkId: number;
    ProjectLookbackId: number;
    WhatWorked: string;
    WhatDidNotWork: string;
}

export interface CoreUpliftModel {
    // CoreUpliftId: number;
    ProjectLookbackId: number;
    Economics: string;
    EstimatedPlaned: string;
    Actual: string;
    WhyDifference: string;
    Remark: string;
    Comment: string;
}

export interface ProjectImpactModel {
    // ProjectImpactId: number;
    ProjectLookbackId: number;
    Situation: string;
    Before: string;
    Target: string;
    After: string;
}

export interface CIMLookbackModel {
    // CimLookbackId: number;
    ProjectLookbackId: number;
    CimLookbackId: number;
    CimLookbackType: string;
    Aspect: string;
    Approve: string;
    Actual: string;
    DifferenceNote: string;
    BusinessPlan: string;
    ResponsiblePerson: string;
}

export interface PlanLookbackModel {
    ProjectLookbackId?: number;
    InitiativeId: number;
    FinishingDate: string;
    PlanLookbackDate: string;
    PlanEnviLookBackDate: string;
    PlanPerformanceLookbackDate: string;

    LookbackReview: LookbackReviewModel[]; // Ref.

    ProjectBackground: string;
    ScopeOfInitiative: string;
    ProjectObjective: string;

    ExecutionLookbackProcess: boolean;
    PerformanceLookback: boolean;
    EnvironmentLookback: boolean;
    CimLookback: boolean;

    ExecutionLookback: ExececutionLookbackModel[]; // Ref.
    PerformancePlanLookbackDate: string;
    CoreUplift: CoreUpliftModel[]; // Ref.
    CoreUpliftResultDescription: string;
    CoreUpliftResultUnit: string;
    CoreUpliftResultBefore: string;
    CoreUpliftResultAfter: string;
    CoreUpliftResultBenefit: string;
    CoreUpliftResultRating: string;
    EnviPlanLookbackDate: string;

    ProjectImpact: ProjectImpactModel[]; // Ref.
    ProjectImpactWork: ProjectImpactWorkModel[]; // Ref.

    PollutionPrevention: string;
    PollutionPreventionSpecify: string;
    GlobalEnvirCons: string;
    GlobalEnvirConsSpecify: string;
    ResourceCirculation: string;
    ResourceCirculationSpecify: string;

    EnvironmentResultCategory: string;
    EnvironmentResultUnit: string;
    EnvironmentResultBefore: string;
    EnvironmentResultAfter: string;
    EnvironmentResultBenefitYear: string;
    EnvironmentResultBenefitYearThb: string;
    EnvironmentResultRemark: string;

    McEndorseDate: string;
    BusinessPlanAsOfDate: string;
    BusinessPlanAsOfDate2: string;

    CimLookbackId: CIMLookbackModel[];

    EnvironmentResult: EnvironmentResultModel[];

}

export interface EnvironmentResultModel {
    //EnvironmentResultId:number;
    EnvironmentResultCategory: string;
    EnvironmentResultUnit: string;
    EnvironmentResultBefore: string;
    EnvironmentResultAfter: string;
    EnvironmentResultBenefitYear: string;
    EnvironmentResultBenefitYearThb: string;
    EnvironmentResultRemark: string;
}
