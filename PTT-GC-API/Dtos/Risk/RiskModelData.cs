using PTT_GC_API.Models;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos
{
    public class RiskModelData
    {

        //public RiskTable RiskData { get; set; }
        //public List<RiskCards> RiskCardData { get; set; }
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public DateTime? RegisterDate { get; set; }
        public DateTime? ApprovePeriod { get; set; }
        public string Description { get; set; }
        public string RiskFactor { get; set; }
        public string RiskLevelMitigationProgress { get; set; }
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

        // Update Risk Progress
        public List<RiskProgress> RiskProgressArray { get; set; }
        public List<RiskKRI> KriArray { get; set; }

        public string MitigationProgress { get; set; }
        public string MitigationProgressImpact { get; set; }
        public string MitigationProgressLikelihood { get; set; }


    }
}
