using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 
namespace PTT_GC_API.Models.Initiative
{
    public class DetailInformation
    {
        [Key]
        public int Id { get; set; }

        // ------------------ Detail Max ---------------------- //
        [StringLength(4)]
        public string InitiativeYear { get; set; } //CIM
        [StringLength(100)]
        public string StrategicObjective { get; set; } //CIM
        [StringLength(100)]
        public string Strategy { get; set; } //CIM
        [StringLength(100)]
        public string InitiativeTypeMax { get; set; }
        [StringLength(100)]
        public string Workstream { get; set; }
        [StringLength(100)]
        public string SubWorkstream1 { get; set; }
        [StringLength(100)]
        public string SubWorkstream2 { get; set; }
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

        public string EntryMode { get; set; } //CIM
        public string EntryModeSpecify { get; set; } //CIM
        public string Geography { get; set; } //CIM
        public string GeographySpecify { get; set; } //CIM
        public bool? RequireBOD1 { get; set; } //CIM
        public DateTime? BOD1 { get; set; } //CIM
        public DateTime? BOD2 { get; set; } //CIM
        public bool? RequireProject { get; set; } //CIM
        [StringLength(100)]
        public string ProjectDirector { get; set; } //CIM
        [StringLength(100)]
        public string ProjectDmManager { get; set; } //CIM
        [StringLength(100)]
        public string ProjectEngineer { get; set; } //CIM
        [StringLength(100)]
        public string ProcessEngineer { get; set; } //CIM
        [StringLength(100)]
        public string MgrOfProcessEngineer { get; set; } //CIM

        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Irr { get; set; } //CIM
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Npv { get; set; } //CIM
        [MaxLength(500)]
        public string FX { get; set; } //CIM
        [MaxLength(10)]
        [StringLength(100)]
        public string FirstBudgetYear { get; set; } //CIM
        public string Note { get; set; }
        public string StatusProgress { get; set; } //CIM
        public string ProgressUpdate { get; set; } //CIM

        // ------------------ Direct CAPEX ---------------------- //
        [StringLength(100)]
        public string President { get; set; }
        [StringLength(100)]
        public string Manager { get; set; } //CIM
        [StringLength(100)]
        public string ProjectManager { get; set; } //CIM

        // ------------------- Detail --------------------------- //
        public string ProductionProcess { get; set; } //CIM //CIM
        public string MilestoneSchedule { get; set; }
        public string ExpectedTarget { get; set; }
        public string ListOfEquipment { get; set; } //CIM //CIM //CIM //CIM
        public string Comparison { get; set; } //CIM //CIM //CIM //CIM
        public string ComparisonWithOther { get; set; }
        public string otherResources { get; set; }
        public string OtherInvestment { get; set; } //CIM //CIM
        public string OthersStrategic { get; set; } //CIM //CIM //CIM //CIM

        public string Consistent { get; set; }
        public string KeySuccessFactor { get; set; } //CIM //CIM
        public string SynergyBenefit { get; set; } //CIM //CIM
        public string OtherStrategic { get; set; }

        public string MarketOverview { get; set; } //CIM //CIM
        public string PotentialCustomer { get; set; } //CIM //CIM
        public string SalesPlan { get; set; } //CIM //CIM
        public string SourceOfFeedback { get; set; } //CIM //CIM
        public string OtherBusiness { get; set; } //CIM //CIM

        public string SafetyIndex { get; set; } //CIM //CIM
        public string CorporateImageIndex { get; set; } //CIM //CIM
        public string OtherQuality { get; set; } //CIM //CIM

        //CIM //CIM
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
        [StringLength(100)]
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
        [Column(TypeName = "decimal(18,2)")]
        public decimal? UsefulYear { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? UsefulMonth { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CycleYear { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CycleMonth { get; set; }
        public string OtherKpis { get; set; }
        public string HaveAdditional { get; set; }
        public int InitiativeId { get; set; }
        [StringLength(100)]
        public string InitiativeCode { get; set; }
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
        //public string TimelineDetail { get; set; }
        public bool? IsDeliverAsPerCommittedCost { get; set; }
        public string CostDetail { get; set; }
        public string UserFeedback { get; set; }
        
        // CPI
        public string SourceOfImprovement { get; set; }
        public string TypeOfCpi { get; set; }
        public string AnalysisTool { get; set; }
        public string RootCause { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimatedBudgetOpex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimatedBenefitSavings { get; set; }
        public string EstimatedBenefitCalculationDetails { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBudgetOpex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBudgetSavings { get; set; }
        public string ActualBenefitCalculationDetails { get; set; }

        public string LookbackText { get; set; }
        [StringLength(100)]
        public string PhnBuPillar { get; set; }
        public string SpecifyPhnBuPillar { get; set; }
        [StringLength(100)]
        public string TypeOfPhn { get; set; }
        public string SpecifyTypeOfPhn { get; set; }
        public string OtherTool { get; set; }
        [StringLength(100)]
        public string CpiApprover { get; set; }
        
    }
}
