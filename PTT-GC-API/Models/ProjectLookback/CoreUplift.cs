using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models
{
    public class CoreUplift
    {
        [Key]
        public int CoreUpliftId { get; set; }
        public int? ProjectLookbackId { get; set; }
        public string Economics { get; set; }
        public string EstimatedPlaned { get; set; }
        public string Actual { get; set; }
        public string WhyDifference { get; set; }
        public string Remark { get; set; }
        public string Comment { get; set; }

    }
}
