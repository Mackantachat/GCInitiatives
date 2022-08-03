using PTT_GC_API.Models.DetailInformation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.DetailMaxInformation
{
    public class DetailInformationFront
    {
        public int Id { get; set; }

        // ------------------ Detail Max ---------------------- //
        public string InitiativeYear { get; set; }
        public string StrategicObjective { get; set; }
        public string Strategy { get; set; }
        public string InitiativeTypeMax { get; set; }
        public string Workstream { get; set; }
        public string SubWorkstream1 { get; set; }
        public string SubWorkstream2 { get; set; }
        public string ProCategory { get; set; }
        public string ProSubCategory { get; set; }
        public string ProLever { get; set; }
        public decimal? Baseline { get; set; }
        public decimal? BaselineHistorical { get; set; }
        public decimal? BaselineNonHistorical { get; set; }
        public decimal? Saving { get; set; }
        public decimal? SavingHistorical { get; set; }
        public decimal? SavingNonHistorical { get; set; }
        public DateTime? IL3Date { get; set; }
        public DateTime? IL4Date { get; set; }
        public DateTime? IL5Date { get; set; }
        // public string SponsorEvp { get; set; }
        // public string WorkstreamLead { get; set; }
        // public string ToFinance { get; set; }
        // public string CTO { get; set; }
        // public string CFO { get; set; }

        // ------------------ Direct CAPEX ---------------------- //
        public string President { get; set; }
        public string Manager { get; set; }
        public string ProjectManager { get; set; }

        // ------------------- Detail --------------------------- //
        public string ProductionProcess { get; set; }
        public string MilestoneSchedule { get; set; }
        public string ExpectedTarget { get; set; }
        public string ComparisonWithOther { get; set; }
        public string otherResources { get; set; }
        public string OtherInvestment { get; set; }
        public string Consistent { get; set; }
        public string KeySuccessFactor { get; set; }
        public string SynergyBenefit { get; set; }
        public string OtherStrategic { get; set; }
        public string MarketOverview { get; set; }
        public string PotentialCustomer { get; set; }
        public string SalesPlan { get; set; }
        public string SourceOfFeedback { get; set; }
        public string OtherBusiness { get; set; }
        public string SafetyIndex { get; set; }
        public string CorporateImageIndex { get; set; }
        public string OtherQuality { get; set; }
        public string BaseCase { get; set; }
        public decimal? ProjectIrrBaseCase { get; set; }
        public decimal? NpvBaseCase { get; set; }
        public decimal? PaybackBaseCase { get; set; }
        public decimal? EbitdaBaseCase { get; set; }
        public string OptimisticCase { get; set; }
        public decimal? ProjectIrrOptimisticCase { get; set; }
        public decimal? NpvOptimisticCase { get; set; }
        public decimal? PaybackOptimisticCase { get; set; }
        public decimal? EbitdaOptimisticCase { get; set; }
        public string PessimisticCase { get; set; }
        public decimal? ProjectIrrPessimisticCase { get; set; }
        public decimal? NpvPessimisticCase { get; set; }
        public decimal? PaybackPessimisticCase { get; set; }
        public decimal? EbitdaPessimisticCase { get; set; }
        public string DepreciationCost { get; set; }
        public string Remark { get; set; }
        public string ForEnvironment { get; set; }
        public string ForTurnaround { get; set; }
        public DateTime? CutFeedDate { get; set; }
        public DateTime? StartUpDate { get; set; }
        public string ReplaceEquipment { get; set; }
        public string EquipmentName { get; set; }
        public DateTime? ReplacementDate { get; set; }
        public string OldAssetCondition { get; set; }
        public string OldAssetNo { get; set; }
        public string EquipmentOrAsset { get; set; }
        public string Boi { get; set; }
        public string BoiNo { get; set; }
        public bool? Capital { get; set; }
        public bool? Catalyst { get; set; }
        public bool? Software { get; set; }
        public bool? RightOfUse { get; set; }
        public string Coordinate { get; set; }
        public string Parties { get; set; }
        public decimal? UsefulYear { get; set; }
        public decimal? UsefulMonth { get; set; }
        public decimal? CycleYear { get; set; }
        public decimal? CycleMonth { get; set; }
        public string OtherKpis { get; set; }
        public string HaveAdditional { get; set; }
        public int InitiativeId { get; set; }

        public string InitiativeCode { get; set; }
        public string DigitalStrategy { get; set; }
        public string ValueChain { get; set; }
        public string ProjectCategory { get; set; }
        public DateTime? BaselineStartDate { get; set; }
        public DateTime? BaselineFinishDate { get; set; }
        public DateTime? ReviseForecastStartDate { get; set; }
        public DateTime? ReviseForecastFinishDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualFinishDate { get; set; }
        public bool? IsDeliverAsPerCommittedScope { get; set; }
        public string ScopeDetail { get; set; }
        public bool? IsDeliverAsPerCommittedDate { get; set; }
        public bool? IsDeliverAsPerCommittedCost { get; set; }
        public string CostDetail { get; set; }
        public string UserFeedback { get; set; }
        public bool? requireDirectBenefit { get; set; }

        public decimal? DirectBenefit { get; set; }
        public bool? RequireIndirectBenefit { get; set; }
        public decimal? IndirectBenefit { get; set; }

        public string SubWorkstream { get; set; }
        public string InititativeType { get; set; }
        public string ProjectPriority { get; set; }
        public string ProjectControl { get; set; }
        public DateTime? KickoffMeeting { get; set; }
        public DateTime? Gate1Date { get; set; }
        public bool SimProjectSkipGate2 { get; set; }
        public DateTime? Gate2Date { get; set; }
        public DateTime? Gate3Date { get; set; }

        public bool IsImpactProduction { get; set; }
        public string GoalAchievement { get; set; }
        public string AssumptionOfGoal { get; set; }
        public string ReasonForChange { get; set; }
        public bool IsMainPlant { get; set; }
        public string DivMgrOfProcessEngineer { get; set; }
        public string Smes { get; set; }
        public string ProjectSponsor { get; set; }
        public string WorkstreamLeadVp { get; set; }
        // public string ToFinance { get; set; }
        //public string Cfo { get; set; }
        //public string Cto { get; set; }
        public bool IsAlignWithCorporateStrategy { get; set; }
        public bool IsSimProjectSkipGate2 { get; set; }
        public string ProjectDirector { get; set; }
        public string ProjectEngineer { get; set; }
        public string ProcessEngineer { get; set; }
        public string SourceOfImprovement { get; set; }
        public string TypeOfCpi { get; set; }
        public string AnalysisTool { get; set; }
        public string RootCause { get; set; }
        public string StepExplanation { get; set; }
        public decimal? EstimatedBudgetOpex { get; set; }
        public decimal? EstimatedBenefitSavings { get; set; }
        public string EstimatedBenefitCalculationDetails { get; set; }
        public decimal? ActualBudgetOpex { get; set; }
        public decimal? ActualBudgetSavings { get; set; }
        public string ActualBenefitCalculationDetails { get; set; }
        public string ProjectDocumentDatabase { get; set; }
        public bool? FixedAsset { get; set; }
        public bool? RequestSubPic { get; set; }
        public string InternalOrderNo { get; set; }
        public string Ram { get; set; }
        public decimal? JFactor { get; set; }
        public bool? AttachProcess { get; set; }
        public bool? AttachPlotPlanSite { get; set; }
        public bool? AttachReference { get; set; }
        public bool? AttachBenefit { get; set; }
        public bool? UseExternalEmoc { get; set; }
        public string ExternalEmoc { get; set; }
        public string ProjectNonFinancialBenefit { get; set; }

        //highlightWork
        public string HighlightWorkStatus { get; set; }
        public string HighlightWorkConCern { get; set; }
        public string NextActivities { get; set; }

        //Team Support
        public bool? RequestTeamSupport { get; set; }
        public bool? RequestHandoverExecution { get; set; }
        public bool? RequestHandoverPlantOwner { get; set; }
        public string VpOfPlantOwner { get; set; }
        public string DmOfPlantOwner { get; set; }
        public string PlantEngineer { get; set; }
        public string PlantProcessEngineer { get; set; }
        public string DivMgrOfPlantProcessEngineer { get; set; }
        public List<string> TeamSupports { get; set; }
        public List<TeamSupportComments> TeamSupportComments { get; set; }
    }

    public class HighlightWork
    {
        public string HighlightWorkStatus { get; set; }
        public string HighlightWorkConCern { get; set; }
        public string NextActivities { get; set; }
    }
    public class PimGateConfig
    {
        public string Gate0 { get; set; }
        public string Gate1 { get; set; }
        public string Gate2 { get; set; }
        public string Gate3 { get; set; }
        public string Gate4 { get; set; }
    }

    
}
