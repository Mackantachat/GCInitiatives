using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Dtos.DetailMaxInformation
{
    public class CreateDetailInformation
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
        public string President { get; set; }
        public string Manager { get; set; }
        public string ProjectManager { get; set; }

        // ------------------- Detail --------------------------- //
        public string ProductionProcess { get; set; }
        public string MilestoneSchedule  { get; set; }
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
        // ------------------------------ DIM ----------------------//
        public DateTime? BaselineStartDate { get; set; }
    }
}