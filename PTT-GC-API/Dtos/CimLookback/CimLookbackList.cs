using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.CimLookback
{
    public class CimLookbackList
    {
        [JsonProperty(PropertyName = "CimLookbackId")]
        public int CimLookbackId { get; set; }
        [JsonProperty(PropertyName = "ProjectLookbackId")]
        public int? ProjectLookbackId { get; set; }
        [JsonProperty(PropertyName = "CimLookbackType")]
        public string CimLookbackType { get; set; }  // Project Background, Project Cost, Schedule of Completion & Commercial Run, Key Assumption, Economic Return
        [JsonProperty(PropertyName = "Aspect")]
        public string Aspect { get; set; }
        [JsonProperty(PropertyName = "Approve")]
        public string Approve { get; set; }
        [JsonProperty(PropertyName = "Actual")]
        public string Actual { get; set; }
        [JsonProperty(PropertyName = "DifferenceNote")]
        public string DifferenceNote { get; set; }
        [JsonProperty(PropertyName = "BusinessPlan")]
        public string BusinessPlan { get; set; }
        [JsonProperty(PropertyName = "ResponsiblePerson")]
        public string ResponsiblePerson { get; set; }
    }
}
