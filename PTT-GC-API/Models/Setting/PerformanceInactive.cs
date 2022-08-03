using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Setting
{
    public class PerformanceInactive
    {
        [Key]
        public int PerformanceInactiveId { get; set; }
        public string InitiativeCode { get; set; }
        public bool? POC { get; set; }
        public bool? OutstandingItems { get; set; }
        public bool? HighlightWork { get; set; }
        public bool? CLSD { get; set; }
        public bool? BenefitTracking { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

    }
}
