using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Initiative
{
    public class KpiDetail
    {
        [Key]
        public int KpiDetailId { get; set; }
        public int CpiDetailId { get; set; }

        [StringLength(500)]
        public string KpiTitile { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Baseline { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Target { get; set; }
        public string Unit { get; set; }
        [StringLength(500)]
        public string Remark { get; set; }
        [StringLength(500)]
        public string StatusKpi { get; set; }
    }
}
