using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Dtos.ImpactTracking
{
    public class FX
    {
        [RegularExpression(@"\d+(\.\d{1,3})?")]
        [Column(TypeName = "decimal(18,3)")]
        public decimal? Row1 { get; set; }
        [RegularExpression(@"\d+(\.\d{1,3})?")]
        [Column(TypeName = "decimal(18,3)")]
        public decimal? Row2 { get; set; }
    }
}