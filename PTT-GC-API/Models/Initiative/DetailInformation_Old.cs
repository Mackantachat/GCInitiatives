using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Models.Initiative
{
    public class DetailInformation_Old
    {
        [Key]
        public int Id { get; set; }

        // ------------------ Detail Max ---------------------- //
        [StringLength(4)]
        public string InitiativeYear { get; set; }
        [StringLength(100)]
        public string StrategicObjective { get; set; }
        [StringLength(100)]
        public string Strategy { get; set; }
        [StringLength(100)]
        public string InitiativeTypeMax { get; set; }
        [StringLength(100)]
        public string Workstream { get; set; }
        [StringLength(100)]
        public string SubWorkstream1 { get; set; }
        [StringLength(100)]
        public string SubWorkstream2 { get; set; }
        [StringLength(100)]
        public string ProCategory { get; set; }
        [StringLength(100)]
        public string ProSubCategory { get; set; }
        [StringLength(100)]
        public string ProLever { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Baseline { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? BaselineHistorical { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? BaselineNonHistorical { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Saving { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SavingHistorical { get; set; }
        [Column(TypeName = "decimal(18,2)")]
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
        [StringLength(100)]
        public string President { get; set; }
        [StringLength(100)]
        public string Manager { get; set; }
        [StringLength(100)]
        public string ProjectManager { get; set; }

        // ------------------- Detail --------------------------- //
        //Max
        public string ProductionProcess { get; set; }
        //Max
        public string MilestoneSchedule { get; set; }
        //Max
        public string ExpectedTarget { get; set; }
        //Max
        public string ComparisonWithOther { get; set; }
        //Max
        public string otherResources { get; set; }
        //Max
        public string OtherInvestment { get; set; }
        //Max
        public string Consistent { get; set; }
        //Max
        public string KeySuccessFactor { get; set; }
        //Max
        public string SynergyBenefit { get; set; }
        //Max
        public string OtherStrategic { get; set; }
        //Max
        public string MarketOverview { get; set; }
        //Max
        public string PotentialCustomer { get; set; }
        //Max
        public string SalesPlan { get; set; }
        //Max
        public string SourceOfFeedback { get; set; }
        //Max
        public string OtherBusiness { get; set; }
        //max
        public string SafetyIndex { get; set; }
        //max
        public string CorporateImageIndex { get; set; }
        //max
        public string OtherQuality { get; set; }
        //max
        public string BaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaBaseCase { get; set; }
        public string OptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaOptimisticCase { get; set; }
        public string PessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaPessimisticCase { get; set; }
        [StringLength(500)]
        public string DepreciationCost { get; set; }
        //max
        public string Remark { get; set; }
        [StringLength(100)]
        public string ForEnvironment { get; set; }
        [StringLength(100)]
        public string ForTurnaround { get; set; }
        public DateTime? CutFeedDate { get; set; }
        public DateTime? StartUpDate { get; set; }
        [StringLength(100)]
        public string ReplaceEquipment { get; set; }
        //max
        public string EquipmentName { get; set; }
        public DateTime? ReplacementDate { get; set; }
        [StringLength(500)]
        public string OldAssetCondition { get; set; }
        [StringLength(500)]
        public string OldAssetNo { get; set; }
        //max
        public string EquipmentOrAsset { get; set; }
        [StringLength(500)]
        public string Boi { get; set; }
        [StringLength(500)]
        public string BoiNo { get; set; }
        public bool? Capital { get; set; }
        public bool? Catalyst { get; set; }
        public bool? Software { get; set; }
        public bool? RightOfUse { get; set; }
        [StringLength(500)]
        public string Coordinate { get; set; }
        [StringLength(500)]
        public string Parties { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? UsefulYear { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? UsefulMonth { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CycleYear { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CycleMonth { get; set; }
        //max
        public string OtherKpis { get; set; }
        [StringLength(500)]
        public string HaveAdditional { get; set; }
        public int InitiativeId { get; set; }
        [StringLength(50)]
        public string InitiativeCode { get; set; }
        [StringLength(500)]
        public string DigitalStrategy { get; set; }
        [StringLength(500)]
        public string ValueChain { get; set; }
        [StringLength(500)]
        public string ProjectCategory { get; set; }
        public DateTime? BaselineStartDate { get; set; }
        public DateTime? BaselineFinishDate { get; set; }
        public DateTime? ReviseForecastStartDate { get; set; }
        public DateTime? ReviseForecastFinishDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualFinishDate { get; set; }
        public bool? IsDeliverAsPerCommittedScope { get; set; }
        public string ScopeDetail { get; set; }  //unknown Length
        public bool? IsDeliverAsPerCommittedDate { get; set; }
        //public string TimelineDetail { get; set; }
        public bool? IsDeliverAsPerCommittedCost { get; set; }
        public string CostDetail { get; set; }  //unknown Length
        public string UserFeedback { get; set; }   //unknown Length
        public bool? requireDirectBenefit { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? DirectBenefit { get; set; }
        public bool? RequireIndirectBenefit { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? IndirectBenefit { get; set; }
        [StringLength(200)]
        public string SubWorkstream { get; set; }
        [StringLength(500)]
        public string InititativeType { get; set; }
        [StringLength(500)]
        public string ProjectPriority { get; set; }
        [StringLength(500)]
        public string ProjectControl { get; set; }
        public DateTime? KickoffMeeting { get; set; }
        public DateTime? Gate1Date { get; set; }
        public bool SimProjectSkipGate2 { get; set; }
        public DateTime? Gate2Date { get; set; }
        public DateTime? Gate3Date { get; set; }

        public bool IsImpactProduction { get; set; }
        //max
        public string GoalAchievement { get; set; }
        //max
        public string AssumptionOfGoal { get; set; }
        //max
        public string ReasonForChange { get; set; }
        public bool IsMainPlant { get; set; }
        [StringLength(100)]
        public string DivMgrOfProcessEngineer { get; set; }
        [StringLength(500)]
        public string Smes { get; set; }
        [StringLength(500)]
        public string SponsorEvp { get; set; }
        [StringLength(500)]
        public string WorkstreamLeadVp { get; set; }
        [StringLength(500)]
        public string ToFinance { get; set; }
        [StringLength(500)]
        public string Cfo { get; set; }
        [StringLength(500)]
        public string Cto { get; set; }
        public  bool IsAlignWithCorporateStrategy { get; set; }
        public bool IsSimProjectSkipGate2 { get; set; }
        [StringLength(100)]
        public string ProjectDirector { get; set; }
        [StringLength(100)]
        public string ProjectEngineer { get; set; }
        [StringLength(100)]
        public string ProcessEngineer { get; set; }
        [StringLength(1000)]
        public string SourceOfImprovement { get; set; }
        [StringLength(1000)]
        public string TypeOfCpi { get; set; }
        [StringLength(1000)]
        public string AnalysisTool { get; set; }
        //max
        public string RootCause { get; set; }
        //max
        public string StepExplanation { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimatedBudgetOpex { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimatedBenefitSavings { get; set; }
        //max
        public string EstimatedBenefitCalculationDetails { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBudgetOpex { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBudgetSavings { get; set; }
        //max
        public string ActualBenefitCalculationDetails { get; set; }
        [StringLength(500)]
        public string ProjectDocumentDatabase { get; set; } //pdd

        public bool? FixedAsset { get; set; }
        public bool? RequestSubPic { get; set; }
        [StringLength(100)]
        public string InternalOrderNo { get; set; }
        [StringLength(100)]
        public string Ram { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? JFactor { get; set; }
        public bool? AttachProcess { get; set; }
        public bool? AttachPlotPlanSite { get; set; }
        public bool? AttachReference { get; set; }
        public bool? AttachBenefit { get; set; }
        public bool? UseExternalEmoc { get; set; }
        [StringLength(500)]
        public string ExternalEmoc { get; set; }
        //max
        public string ProjectNonFinancialBenefit { get; set; }
        [StringLength(100)]
        public string HighlightWorkStatus { get; set; }
        //max
        public string HighlightWorkConCern { get; set; }
        [StringLength(500)]
        public string NextActivities { get; set; }
        public bool? RequestTeamSupport { get; set; }
        public bool? RequestHandoverExecution { get; set; }
        public bool? RequestHandoverPlantOwner { get; set; }
        [StringLength(100)]
        public string VpOfPlantOwner  { get; set; }
        [StringLength(100)]
        public string DmOfPlantOwner { get; set; }
        [StringLength(100)]
        public string PlantEngineer { get; set; }
        [StringLength(100)]
        public string PlantProcessEngineer { get; set; }
        [StringLength(100)]
        public string DivMgrOfPlantProcessEngineer { get; set; }
        public DateTime? IL0date { get; set; }
    }
}
