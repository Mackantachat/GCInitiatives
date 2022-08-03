using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Initiative
{
    public class MaxApproverSetting
    {
        [Key]
        public int Id { get; set; }
        [StringLength(100)]
        public string WorkstreamType { get; set; }
        [StringLength(200)]
        public string WorkstreamValue { get; set; }
        [StringLength(100)]
        public string Indicator { get; set; }
        [StringLength(100)]
        public string ApproverEmail { get; set; }
        public int? Order { get; set; }
        public bool? IsRequestCapex { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? BenefitMin { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? BenefitMax { get; set; }

    }
}
