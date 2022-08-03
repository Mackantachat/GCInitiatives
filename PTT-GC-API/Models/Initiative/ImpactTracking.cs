using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Models.Initiative
{
    public class ImpactTracking
    {
        public int Id { get; set; }
        [StringLength(200)]
        public string FinancialImpactArea { get; set; }
        public bool HaveShareBenefit { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL4RunRateRecurring { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5RunRateRecurring { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL4RunRateOnetime { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5RunRateOnetime { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5FixedFxRecurring { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5FloatFxRecurring { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5FixedFxOnetime { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5FloatFxOnetime { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? TotalRecurring { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? TotalOnetime { get; set; }
        public DateTime? FirstRunRateMonth { get; set; }
        public bool AutoCalculate { get; set; }
        public bool IndirectBenefit { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Explanation { get; set; }
        public bool ImpiemantCost  { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? TotalCostOPEX { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string ToComment { get; set; }
        [StringLength(500)]
        public string Remark1 { get; set; }
        [StringLength(500)]
        public string Remark2 { get; set; }
        [StringLength(500)]
        public string Remark3 { get; set; }
        [StringLength(500)]
        public string Remark4 { get; set; }
        [StringLength(500)]
        public string Remark5 { get; set; }
        public int InitiativeId { get; set; }
        [StringLength(50)]
        public string InitiativeCode { get; set; }
        [StringLength(10)]
        public string SIL4Achievement { get; set; }
        [StringLength(10)]
        public string SIL5Achievement { get; set; }
        [StringLength(500)]
        public string ContactIO { get; set; }
        public DateTime? LastApprovedIL4Date { get; set; }
        public DateTime? LastApprovedIL5Date { get; set; }
        [StringLength(500)]
        public string ContactIOBy { get; set; }
        public DateTime? FirstApprovedIL4Date { get; set; }
        public DateTime? LastSubmittedSIL4Date { get; set; }
        public DateTime? LastSubmittedSIL5Date { get; set; }
    }
}