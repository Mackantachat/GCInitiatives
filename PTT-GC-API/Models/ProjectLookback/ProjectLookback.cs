using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models                                                                 
{
    public class ProjectLookback
    {
        [Key]
        public int ProjectLookbackId { get; set; }
        public int InitiativeId { get; set; }
        public DateTime? FinishingDate { get; set; }
        public DateTime? PlanLookbackDate { get; set; }
        public DateTime? PlanEnviLookBackDate { get; set; }
        public DateTime? PlanPerformanceLookbackDate { get; set; }

        public string ProjectBackground { get; set; }
        public string ScopeOfInitiative { get; set; }
        public string ProjectObjective { get; set; }
        public bool? ExecutionLookback { get; set; }
        public bool? PerformanceLookback { get; set; }
        public bool? EnvironmentLookback { get; set; }
        public bool? CimLookback { get; set; }

        // **Table Execution Lookback

        public DateTime? PerformancePlanLookbackDate { get; set; }

        // Result ......
        public string CoreUpliftResultDescription { get; set; }
        public string CoreUpliftResultUnit { get; set; }
        public string CoreUpliftResultBefore { get; set; }
        public string CoreUpliftResultAfter { get; set; }
        public string CoreUpliftResultBenefit { get; set; }
        public string CoreUpliftResultRating { get; set; }


        public DateTime? EnviPlanLookbackDate { get; set; }
        public string ResponsibleEnvirEngineer { get; set; }

        // Project Impact
        // situation, Before, Target, After, Action
        // What worked, What didn't work, Action

        public string PollutionPrevention { get; set; }
        public string PollutionPreventionSpecify { get; set; }
        public string GlobalEnvirCons { get; set; }
        public string GlobalEnvirConsSpecify { get; set; }
        public string ResourceCirculation { get; set; }
        public string ResourceCirculationSpecify { get; set; }

        // Result..........
        public string EnvironmentResultCategory {get;set;}
        public string EnvironmentResultUnit { get; set; }
        public string EnvironmentResultBefore { get; set; }
        public string EnvironmentResultAfter { get; set; }
        public string EnvironmentResultBenefitYear { get; set; }
        public string EnvironmentResultBenefitYearThb { get; set; }
        public string EnvironmentResultRemark { get; set; }


        // CIM Lookback
        public DateTime? McEndorseDate { get; set; }
        public DateTime? BusinessPlanAsOfDate { get; set; }
        public DateTime? BusinessPlanAsOfDate2 { get; set; }

        // ProjectBackgroud
        // ProjectCost
        // show section
        public bool ShowEnvironmentLookback { get; set; }
        public bool ShowPerformanceLookback { get; set; }
    }
}
