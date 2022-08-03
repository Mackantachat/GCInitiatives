using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ProgressAndMilestone
{
    public class BscNarrative
    {
        [Key]
        public int BscNarrativeId { get; set; }
        public int? InitiativeId { get; set; }
        public int? Year { get; set; }
        public int? Month { get; set; }

        // BSC
        public string Engineering { get; set; }
        public string Construction { get; set; }
        public string Procurement { get; set; }
        public string CommissioningStartup { get; set; }
        public string ProjectManagement { get; set; }
        public string RiskAndConcern { get; set; }
        public string MitigationPlan { get; set; }
        public string ExecutiveSummary { get; set; }
        public string WorkForNextMonth { get; set; }
        public string EnvironmentKpi { get; set; }

        // Narrative
        public string HighlightWork  { get; set; }
        public string CatchupPlan { get; set; }
        public string NarrativeStatus { get; set; }

    }
}
