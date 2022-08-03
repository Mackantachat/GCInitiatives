using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PTT_GC_API.Models.DetailInformation;
using PTT_GC_API.Models.ImpactTracking;
using PTT_GC_API.Models.ProgressAndMilestone;

namespace PTT_GC_API.Models.Initiative
{
    public class Initiative
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string InitiativeCode { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
        [StringLength(4)]
        public string Year { get; set; }
        [StringLength(20)]
        public string PoolType { get; set; }
        [StringLength(255)]
        public string OwnerName { get; set; }
        [StringLength(50)]
        public string Organization { get; set; }
        public bool? Integration { get; set; }

        [StringLength(50)]
        public string Company { get; set; }
        [StringLength(50)]
        public string SpecifyCompany { get; set; }
        [StringLength(50)]
        public string Plant { get; set; }
        [StringLength(100)]
        public string SpecifyPlant { get; set; }
        [StringLength(100)]
        public string Location { get; set; }
        [StringLength(1000)]
        public string SpecifyLocation { get; set; }
        public DateTime? RegisteringDate { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? FinishingDate { get; set; }
        [StringLength(7000)]
        public string Background { get; set; }
        [StringLength(7000)]
        public string ResultObjective { get; set; }
        [StringLength(7000)]
        public string ScopeOfWork { get; set; }
        [StringLength(7000)]
        public string Remark { get; set; }
        [StringLength(100)]
        public string InitiativeType { get; set; }
        [StringLength(100)]
        public string RequestCapex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostEstCapex { get; set; }
        [StringLength(100)]
        public string CostEstCapexType { get; set; }
        [StringLength(100)]
        public string BudgetSource { get; set; }
        [StringLength(100)]
        public string RequestOpex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostEstOpex { get; set; }
        [StringLength(100)]
        public string CostEstOpexType { get; set; }
        [StringLength(200)]
        public string TypeOfInvestment { get; set; }
        public bool? Divestment { get; set; }
        public bool? InvolveItDigital { get; set; }
        public bool? RequestProjectEngineer { get; set; }
        [StringLength(100)]
        public string BudgetType { get; set; }
        [StringLength(100)]
        public string Ram { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? JFactor { get; set; }
        [StringLength(100)]
        public string TypeBenefit { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? BenefitAmount { get; set; }
        public string BenefitAmountType { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PayBackPeriod { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Irr { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Wacc { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? FxExchange { get; set; }
        public bool? Cim { get; set; }
        public bool? Pim { get; set; }
        public bool? Dim { get; set; }
        public bool? Max { get; set; }
        public bool? DirectCapex { get; set; }
        public bool? Cpi { get; set; }
        public bool? Strategy { get; set; }
        public bool? RandD { get; set; }
        public bool? Other { get; set; }
        public bool? TrackMax { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        [StringLength(100)]
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        [StringLength(100)]
        public string UpdatedBy { get; set; }
        [StringLength(100)]
        public string LastActivity { get; set; }
        public bool? DeletedFlag { get; set; }
        [StringLength(100)]
        public string Status { get; set; }
        [StringLength(100)]
        public string Stage { get; set; }
        [StringLength(5000)]
        public string CommentCancelled { get; set; }
        public DateTime? LastSubmittedDate { get; set; }
        public int? LagacyInitiativeId { get; set; }
        [StringLength(100)]
        public string LagacyInitiativeCode { get; set; }
        [StringLength(100)]
        public string SecretProject { get; set; }
        [StringLength(100)]
        public string GoToStage { get; set; }
        [StringLength(100)]
        public string SSPIM { get; set; }
        [StringLength(100)]
        public string ITDigital { get; set; }
        [StringLength(100)]
        public string CapexStatus { get; set; }
        [StringLength(100)]
        public string CapexStage { get; set; }
        public bool? IsRequestCapex { get; set; }
        [StringLength(200)]
        public string VPPlantOwner { get; set; }
        [StringLength(200)]
        public string DMPlantOwner { get; set; }
        [StringLength(200)]
        public string LookbackOwner { get; set; }
        public decimal? SortStage { get; set; }
        public int isSetInitiativeSubType { get; set; }
        [StringLength(100)]
        public string InitiativeSubType { get; set; }

        public bool? AlignWithCorpStrategy { get; set; }
        [StringLength(50)]
        public string StrategicYear { get; set; }
        [StringLength(100)]
        public string StrategicObjective { get; set; }
        [StringLength(100)]
        public string StrategyType { get; set; }
        public int? HistoryFlag { get; set; }
        public int? IsPassPimGate1 { get; set; }
        public int? CreateType { get; set; }
        public bool? IsCreatedApp { get; set; }
        public bool? IsCreatedWbs { get; set; }
        public int? GeneralTabStatus { get; set; }
        public int? DetailMaxDimCapexTabStatus { get; set; }
        public int? ImpactTabStatus { get; set; }
        public int? RiskTabStatus { get; set; }
        public int? ResourceTabStatus { get; set; }
        public int? CapexTabStatus { get; set; }
        public int? ProgressTabStatus { get; set; }
        public int? LessonLearnTabStatus { get; set; }
        public int? LookbackTabStatus { get; set; }
        public int? BestPracticeTabStatus { get; set; }
        public int? StrategyTabStatus { get; set; }
        public int? StatusTabStatus { get; set; }
        public int? DetailCimStrategyTabStatus { get; set; }
        public int? DetailPimTabStatus { get; set; }
        public int? DetailCpiTabStatus { get; set; }
        public bool? IsNextButtonClicked { get; set; }

        [Column(TypeName = "decimal(18,5)")]
        public decimal? ResidualValue { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? UtilitiesCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? MaintenanceCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? CatalystChemicalsCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? LabourCost { get; set; }
        public bool? UseIrrCalculate { get; set; }
        [StringLength(100)]
        public string Likelihood { get; set; }
        [StringLength(100)]
        public string Consequence { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? BaseRisk { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? RiskOfAlt { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? RiskReduction { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? PotentialConCost { get; set; }
        public string AnnualLikelihood { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? AnnualLikelihoodRatio { get; set; }
        public string ExposureFactor { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? ExposureFactorRatio { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? Probability { get; set; }
        public string Effectiveness { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? EffectivenessRatio { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? ProductionLoss { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? EconomicPenalties { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? EconomicBenefits { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? OpexPenaltiesCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? JustifiableCost { get; set; }
        public bool? IsReviseFlow { get; set; }
        [StringLength(100)]
        public string AppropriationNo { get; set; }
        [StringLength(100)]
        public string WBSNo { get; set; }
        public int SurveyVersions { get; set; }
        public virtual ICollection<Attachment> Attachments { get; set; }
        public virtual ICollection<InitiativeCoDeveloper> InitiativeCoDevelopers { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<Milestone> Milestones { get; set; }
        public virtual ICollection<FinancialIndicator> FinancialIndicators { get; set; }
        public virtual Financial Financials { get; set; }
        public virtual InitiativeDetail InitiativeDetails { get; set; }
        public virtual ImpactTracking ImpactTrackings { get; set; }
        public virtual DetailInformation_Old DetailInformations { get; set; }
        public virtual ICollection<ImpactTypeOfBenefit> ImpactTypeOfBenefits { get; set; }
        public virtual ICollection<KpiDetailInformation> KpiDetailInformations { get; set; }
        public virtual ICollection<ShareBenefitWorkstream> ShareBenefitWorkstreams { get; set; }
        public virtual ICollection<InitiativeAction> InitiativeActions { get; set; }
        public virtual ICollection<ProgressDetail> ProgressDetails { get; set; }
        public virtual ICollection<InitiativeStatusTracking> InitiativeStatusTrackings { get; set; }
    }

    enum FlowType
    {
        Initiative = 1,
        Requestcapex = 2,
        Addmore = 3,
        Revise = 4,
        Return = 5
    }
}