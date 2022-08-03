using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Dtos.ImpactTracking
{
    public class RunRate
    {
        [Column(TypeName = "decimal(18,3)")]
        public decimal? Row1 { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? Row2 { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? Row3 { get; set; }
    }
}