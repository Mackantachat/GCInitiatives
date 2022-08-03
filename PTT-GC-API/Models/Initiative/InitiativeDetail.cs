using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Models.Initiative
{
    public class InitiativeDetail
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(500)]
        public string StrategicObjective { get; set; }
        [MaxLength(500)]
        public string StrategyDetail { get; set; }
        [MaxLength(500)]
        public string EntryMode { get; set; }
        public string Specify { get; set; }
        [StringLength(100)]
        public string President { get; set; }
        public string Manager { get; set; }
        public bool? RequireBOD1 { get; set; }
        public DateTime? BOD1 { get; set; }
        public DateTime? BOD2 { get; set; }
        public string HaveProduct { get; set; }
        // ------------------------------------------------ //
        public string Geography { get; set; }
        public string GeographySpecify { get; set; }
        public string Entity { get; set; }
        public string EntitySpecify { get; set; }
        public string BusinessModel { get; set; }
        public bool? RequireProject { get; set; }
        [StringLength(100)]
        public string ProjectDirector { get; set; }
        [StringLength(100)]
        public string ProjectManager { get; set; }
        [StringLength(100)]
        public string ProjectEngineer { get; set; }
        [StringLength(100)]
        public string ProcessEngineer { get; set; }
        [StringLength(100)]
        public string MgrOfProcessEngineer { get; set; }
        [StringLength(100)]
        public string ProductionProcess { get; set; }
        public string ListOfEquipment { get; set; }
        public string Comparison { get; set; }
        public string OtherInvestment { get; set; }
        public string KeySuccessFactor { get; set; }
        public string SynergyBenefit { get; set; }
        public string OthersStrategic { get; set; }
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
        // ------------------------------------------------ //
        [MaxLength(500)]
        public string FX { get; set; }
        [MaxLength(10)]
        public string FxChoice { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ShareOfInvestment { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Irr { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Npv { get; set; }
        [MaxLength(10)]
        public string FirstBudgetYear { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Note { get; set; }
        public int InitiativeId { get; set; }

        public string ProgressStatus { get; set; }
        public string ProgressUpdate { get; set; }
    }
}