import { RiskProgressModel } from './riskProgressModel';
import { KRIModel } from './kriModel';

export interface RiskModel {
    id: string,
    approvePeriod: Date,
    description: string,
    exitingControl: string,
    impactExitingControl: string,
    impactMitigationPlan: string,
    likelihoodExitingControl: string,
    likelihoodMitigationPlan: string,
    mitigationPlan: string,
    phase: string,
    registerDate: Date,
    riskFactor: string,
    riskLevelExitingControl: string,
    riskLevelMitigationPlan: string,
    riskProgressArray: Array<RiskProgressModel>,
    kriArray: Array<KRIModel>,
    mitigationProgress: string,
    mitigationProgressImpact: string,
    mitigationProgressLikelihood: string,
    riskLevelMitigationProgress: string,
    initiativeId: string,
    addNew: string
}
