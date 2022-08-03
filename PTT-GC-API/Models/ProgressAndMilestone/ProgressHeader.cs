using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ProgressAndMilestone
{
    public class ProgressHeader
    {
        [Key]
        public int ProgressHeaderId { get; set; }
        public int InitiativeId { get; set; }
        [StringLength(100)]
        public string AppropriationNo { get; set; }
        [StringLength(100)]
        public string WbsNo { get; set; }
        [StringLength(100)]
        public string StandardProjectDef { get; set; }
        [StringLength(100)]
        public string Responsible { get; set; }
        [StringLength(100)]
        public string SolomonCategory { get; set; }
        [StringLength(100)]
        public string AreaPlant { get; set; }
        [StringLength(100)]
        public string PhysicalBu { get; set; }
        [StringLength(100)]
        public string PhysicalUnit { get; set; }

        // BSC
        [StringLength(100)]
        public string Engineering { get; set; }
        [StringLength(100)]
        public string Construction { get; set; }
        [StringLength(100)]
        public string Procurement { get; set; }
        [StringLength(100)]
        public string CommissioningStartup { get; set; }
        [StringLength(100)]
        public string ProjectManagement { get; set; }
        [StringLength(100)]
        public string RiskAndConcern { get; set; }
        [StringLength(100)]
        public string MitigationPlan { get; set; }
        [StringLength(100)]
        public string ExecutiveSummary { get; set; }
        [StringLength(100)]
        public string WorkForNextMonth { get; set; }
        [StringLength(100)]
        public string EnvironmentKpi { get; set; }
        public bool? IsSendAppRequest { get; set; }
        public bool? IsSendWBS { get; set; }
    }
}
