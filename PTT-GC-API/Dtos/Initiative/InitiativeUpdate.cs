using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Dtos.Initiative
{
    public class InitiativeUpdate
    {
        public string Name { get; set; }
        public string Year { get; set; }
        public string PoolType { get; set; }
        public string OwnerName { get; set; }
        public string Organization { get; set; }
        public bool? Integration { get; set; }
        public string Company { get; set; }
        public string SpecifyCompany { get; set; }
        public string Plant { get; set; }
        public string SpecifyPlant { get; set; }
        [MaxLength(300)]
        public string Location { get; set; }
        [MaxLength(300)]
        public string SpecifyLocation { get; set; }
        public DateTime? RegisteringDate { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? FinishingDate { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Background { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string ResultObjective { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string ScopeOfWork { get; set; }
        public string InitiativeType { get; set; }
        public string RequestCapex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostEstCapex { get; set; }
        public string CostEstCapexType { get; set; }
        public string BudgetSource { get; set; }
        public string RequestOpex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostEstOpex { get; set; }
        public string CostEstOpexType { get; set; }
        public string TypeOfInvestment { get; set; }
        public bool? Divestment { get; set; }
        public bool? InvolveItDigital { get; set; }
        public bool? RequestProjectEngineer { get; set; }
        public string BudgetType { get; set; }
        public string Ram { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? JFactor { get; set; }
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
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string ITDigital { get; set; }
        public bool? AlignWithCorpStrategy { get; set; }
        public string StrategicYear { get; set; }
        public string StrategicObjective { get; set; }
        public string StrategyType { get; set; }

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
        public string Likelihood { get; set; }
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
        public bool? IsRequestCapex { get; set; }
    }
}