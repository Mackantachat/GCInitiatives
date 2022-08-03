using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models
{
    public class Risk
    {
        [Key]
        public int Id { get; set; }

        //public int RiskNo { get; set; }
        // Risk Headers
        //public int RiskId { get; set; }
        public int InitiativeId { get; set; }
        public string RiskLevelMitigationProgress { get; set; }
        public DateTime? RegisterDate { get; set; }
        public DateTime? ApprovePeriod { get; set; }
        public string Description { get; set; }
        public string RiskFactor { get; set; }
        public string Phase { get; set; }
        // Exiting Control
        public string ExitingControl { get; set; }
        public string ImpactExitingControl { get; set; }
        public string LikelihoodExitingControl { get; set; }
        public string RiskLevelExitingControl { get; set; }
        // Mitigation Plan
        public string MitigationPlan { get; set; }
        public string ImpactMitigationPlan { get; set; }
        public string LikelihoodMitigationPlan { get; set; }
        public string RiskLevelMitigationPlan { get; set; }
        // Progress
        public string MitigationProgress { get; set; }
        public string MitigationProgressImpact { get; set; }
        public string MitigationProgressLikelihood { get; set; }
    }
}
