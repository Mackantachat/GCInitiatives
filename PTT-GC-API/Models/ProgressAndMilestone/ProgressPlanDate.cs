using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ProgressAndMilestone
{
    public class ProgressPlanDate
    {
        [Key]
        public int ProgressPlanDateId { get; set; }
        public string ProgressPlanDateType { get; set; }  // Overall Plan, Engineer, Procurement, Construction, Commissioning
        public DateTime? BasicStartDate { get; set; }
        public DateTime? BasicFinishDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualFinishDate { get; set; }
        public int? PocWeightPercent { get; set; }
        public int? InitiativeId { get; set; }
    }
}
