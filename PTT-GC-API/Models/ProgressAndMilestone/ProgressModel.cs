using PTT_GC_API.Dtos.ProgressAndMilestone;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ProgressAndMilestone
{
    public class ProgressModel
    {
        [Key]
        public int ProgressHeaderId { get; set; }
        public int InitiativeId { get; set; }
        public string AppropriationNo { get; set; }
        public string WbsNo { get; set; }
        public string StandardProjectDef { get; set; }
        public string Responsible { get; set; }
        public string SolomonCategory { get; set; }
        public string AreaPlant { get; set; }
        public string PhysicalBu { get; set; }
        public string PhysicalUnit { get; set; }
        public List<ProgressDetail> Details { get; set; }
        public InvestmentCost PlanCost { get; set; }
        public InvestmentCost ActualCost { get; set; }

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
    }
}
