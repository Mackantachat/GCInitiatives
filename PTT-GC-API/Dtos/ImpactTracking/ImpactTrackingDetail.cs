using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Dtos.ImpactTracking
{
    public class ImpactTrackingDetail
    {
        public int Id { get; set; }
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
        public bool ImpiemantCost { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? TotalCostOPEX { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string ToComment { get; set; }
        public string Remark1 { get; set; }
        public string Remark2 { get; set; }
        public string Remark3 { get; set; }
        public string Remark4 { get; set; }
        public string Remark5 { get; set; }
        public int InitiativeId { get; set; }
        public string InitiativeCode { get; set; }
        public string SIL4Achievement { get; set; }
        public string SIL5Achievement { get; set; }
        public string ContactIO { get; set; }
        public DateTime? LastApprovedIL4Date { get; set; }
        public DateTime? LastApprovedIL5Date { get; set; }
        public string ContactIOBy { get; set; }
        public DateTime? FirstApprovedIL4Date { get; set; }
        public DateTime? LastSubmittedSIL4Date { get; set; }
        public DateTime? LastSubmittedSIL5Date { get; set; }
    }
}