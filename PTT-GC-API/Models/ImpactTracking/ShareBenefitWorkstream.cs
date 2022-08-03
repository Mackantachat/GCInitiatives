using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Models.ImpactTracking
{
    public class ShareBenefitWorkstream
    {
        public int Id { get; set; }
        [StringLength(200)]
        public string Workstream { get; set; }

        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Percent { get; set; }
        public int InitiativeId { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? IL4RRBlended { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? IL5RRBlended { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? IL5FixedFXOnetime { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? IL5FixedFxRecurring { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? IL5FloatFxOnetime { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? IL5FloatFxRecurring { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? IL4RROneTime { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? IL4RRRecurring { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? IL5RROneTime { get; set; }
        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? IL5RRRecurring { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? TotalRROnetime { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? TotalRRRecurring { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? TotalRRBlended { get; set; }

        [RegularExpression(@"\d+(\.\d{1,5})?")]
        [Column(TypeName = "decimal(21,5)")]
        public decimal? OnetimeImplementationCost { get; set; }
    }
}