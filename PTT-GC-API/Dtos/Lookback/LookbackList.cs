using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PTT_GC_API.Models;
using PTT_GC_API.Dtos.LookbackReview;
using PTT_GC_API.Dtos.CoreUplift;
using PTT_GC_API.Dtos.ExecutionLookback;
using PTT_GC_API.Dtos.ProjectImpact;
using PTT_GC_API.Dtos.ProjectImpactWork;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using PTT_GC_API.Dtos.CimLookback;

namespace PTT_GC_API.Dtos.Lookback
{
    public class LookbackList
    {
        [JsonProperty(PropertyName = "ProjectLookbackId")]
        public int ProjectLookbackId { get; set; }
        [JsonProperty(PropertyName = "InitiativeId")]
        public int InitiativeId { get; set; }
        [JsonProperty(PropertyName = "FinishingDate")]
        public string FinishingDate { get; set; }
        [JsonProperty(PropertyName = "PlanLookbackDate")]
        public string PlanLookbackDate { get; set; }
        [JsonProperty(PropertyName = "PlanEnviLookBackDate")]
        public string PlanEnviLookBackDate { get; set; }
        [JsonProperty(PropertyName = "PlanPerformanceLookbackDate")]
        public string PlanPerformanceLookbackDate { get; set; }
        [JsonProperty(PropertyName = "LookbackReview")]
        public List<LookbackReviewList> LookbackReview { get; set; }
        [JsonProperty(PropertyName = "ProjectBackground")]
        public string ProjectBackground { get; set; }
        [JsonProperty(PropertyName = "ScopeOfInitiative")]
        public string ScopeOfInitiative { get; set; }
        [JsonProperty(PropertyName = "ProjectObjective")]
        public string ProjectObjective { get; set; }
        [JsonProperty(PropertyName = "ExecutionLookbackProcess")]
        public bool? ExecutionLookbackProcess { get; set; }
        [JsonProperty(PropertyName = "PerformanceLookback")]
        public bool? PerformanceLookback { get; set; }
        [JsonProperty(PropertyName = "EnvironmentLookback")]
        public bool? EnvironmentLookback { get; set; }
        [JsonProperty(PropertyName = "CimLookback")]
        public bool? CimLookback { get; set; }
        [JsonProperty(PropertyName = "ExecutionLookback")]
        public List<ExecutionLookbackList> ExecutionLookback { get; set; }
        [JsonProperty(PropertyName = "PerformancePlanLookbackDate")]
        public string PerformancePlanLookbackDate { get; set; }
        [JsonProperty(PropertyName = "CoreUplift")]
        public List<CoreUpliftList> CoreUplift { get; set; }
        [JsonProperty(PropertyName = "CoreUpliftResultDescription")]
        public string CoreUpliftResultDescription { get; set; }
        [JsonProperty(PropertyName = "CoreUpliftResultUnit")]
        public string CoreUpliftResultUnit { get; set; }
        [JsonProperty(PropertyName = "CoreUpliftResultBefore")]
        public string CoreUpliftResultBefore { get; set; }
        [JsonProperty(PropertyName = "CoreUpliftResultAfter")]
        public string CoreUpliftResultAfter { get; set; }
        [JsonProperty(PropertyName = "CoreUpliftResultBenefit")]
        public string CoreUpliftResultBenefit { get; set; }
        [JsonProperty(PropertyName = "CoreUpliftResultRating")]
        public string CoreUpliftResultRating { get; set; }
        [JsonProperty(PropertyName = "EnviPlanLookbackDate")]
        public string EnviPlanLookbackDate { get; set; }
        [JsonProperty(PropertyName = "ResponsibleEnvirEngineer")]
        public string ResponsibleEnvirEngineer { get; set; }
        [JsonProperty(PropertyName = "ProjectImpact")]
        public List<ProjectImpactList> ProjectImpact { get; set; }
        [JsonProperty(PropertyName = "ProjectImpactWork")]
        public List<ProjectImpactWorkList> ProjectImpactWork { get; set; }
        [JsonProperty(PropertyName = "PollutionPrevention")]
        public List<String> PollutionPrevention { get; set; }
        [JsonProperty(PropertyName = "PollutionPreventionSpecify")]
        public string PollutionPreventionSpecify { get; set; }
        [JsonProperty(PropertyName = "GlobalEnvirCons")]
        public List<String> GlobalEnvirCons { get; set; }
        [JsonProperty(PropertyName = "GlobalEnvirConsSpecify")]
        public string GlobalEnvirConsSpecify { get; set; }
        [JsonProperty(PropertyName = "ResourceCirculation")]
        public List<String> ResourceCirculation { get; set; }
        [JsonProperty(PropertyName = "ResourceCirculationSpecify")]
        public string ResourceCirculationSpecify { get; set; }
        [JsonProperty(PropertyName = "EnvironmentResultCategory")]
        public string EnvironmentResultCategory { get; set; }
        [JsonProperty(PropertyName = "EnvironmentResultUnit")]
        public string EnvironmentResultUnit { get; set; }
        [JsonProperty(PropertyName = "EnvironmentResultBefore")]
        public string EnvironmentResultBefore { get; set; }
        [JsonProperty(PropertyName = "EnvironmentResultAfter")]
        public string EnvironmentResultAfter { get; set; }
        [JsonProperty(PropertyName = "EnvironmentResultBenefitYear")]
        public string EnvironmentResultBenefitYear { get; set; }
        [JsonProperty(PropertyName = "EnvironmentResultBenefitYearThb")]
        public string EnvironmentResultBenefitYearThb { get; set; }
        [JsonProperty(PropertyName = "EnvironmentResultRemark")]
        public string EnvironmentResultRemark { get; set; }
        [JsonProperty(PropertyName = "McEndorseDate")]
        public string McEndorseDate { get; set; }
        [JsonProperty(PropertyName = "BusinessPlanAsOfDate")]
        public string BusinessPlanAsOfDate { get; set; }
        [JsonProperty(PropertyName = "BusinessPlanAsOfDate2")]
        public string BusinessPlanAsOfDate2 { get; set; }
        [JsonProperty(PropertyName = "CimLookbackId")]
        public List<CimLookbackList> CimLookbackId { get; set; }
        public List<EnvironmentResult> EnvironmentResult { get; set; }
        [JsonProperty(PropertyName = "ShowPerformanceLookback")]
        public bool ShowPerformanceLookback { get; set; }
        [JsonProperty(PropertyName = "ShowEnvironmentLookback")]
        public bool ShowEnvironmentLookback { get; set; }

        [JsonProperty(PropertyName = "PerformanceLookbackPerson")]
        public string PerformanceLookbackPerson { get; set; }

        [JsonProperty(PropertyName = "LocalEnvironmentEngineer")]
        public string LocalEnvironmentEngineer { get; set; }

        [JsonProperty(PropertyName = "LookbackFocalPointPerson")]
        public string LookbackFocalPointPerson { get; set; }

    }

    public class LookbackPerson
    {
        public string Indicator { get; set; }
        public string EmployeeID { get; set; }
        public string OwnerName { get; set; }
    }

    public class PlantParam
    {
        public string Plant { get; set; }
    }
}

public class EnvironmentResult
{
    [JsonProperty(PropertyName = "EnvironmentResultId")]
    public int EnvironmentResultId { get; set; }
    [JsonProperty(PropertyName = "EnvironmentResultCategory")]
    public string EnvironmentResultCategory { get; set; }
    [JsonProperty(PropertyName = "EnvironmentResultUnit")]
    public string EnvironmentResultUnit { get; set; }
    [JsonProperty(PropertyName = "EnvironmentResultBefore")]
    public string EnvironmentResultBefore { get; set; }
    [JsonProperty(PropertyName = "EnvironmentResultAfter")]
    public string EnvironmentResultAfter { get; set; }
    [JsonProperty(PropertyName = "EnvironmentResultBenefitYear")]
    public string EnvironmentResultBenefitYear { get; set; }
    [JsonProperty(PropertyName = "EnvironmentResultBenefitYearThb")]
    public string EnvironmentResultBenefitYearThb { get; set; }
    [JsonProperty(PropertyName = "EnvironmentResultRemark")]
    public string EnvironmentResultRemark { get; set; }
}
