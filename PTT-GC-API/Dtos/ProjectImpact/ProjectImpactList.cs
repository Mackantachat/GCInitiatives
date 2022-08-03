using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.ProjectImpact
{
    public class ProjectImpactList
    {
        [JsonProperty(PropertyName = "ProjectImpactId")]
        public int ProjectImpactId { get; set; }
        [JsonProperty(PropertyName = "ProjectLookbackId")]
        public int? ProjectLookbackId { get; set; }
        [JsonProperty(PropertyName = "Situation")]
        public string Situation { get; set; }
        [JsonProperty(PropertyName = "Before")]
        public string Before { get; set; }
        [JsonProperty(PropertyName = "Target")]
        public string Target { get; set; }
        [JsonProperty(PropertyName = "After")]
        public string After { get; set; }
    }
}
