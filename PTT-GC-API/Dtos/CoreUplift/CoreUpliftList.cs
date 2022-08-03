using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.CoreUplift
{
    public class CoreUpliftList
    {
        [JsonProperty(PropertyName = "CoreUpliftId")]
        public int CoreUpliftId { get; set; }
        [JsonProperty(PropertyName = "ProjectLookbackId")]
        public int? ProjectLookbackId { get; set; }
        [JsonProperty(PropertyName = "Economics")]
        public string Economics { get; set; }
        [JsonProperty(PropertyName = "EstimatedPlaned")]
        public string EstimatedPlaned { get; set; }
        [JsonProperty(PropertyName = "Actual")]
        public string Actual { get; set; }
        [JsonProperty(PropertyName = "WhyDifference")]
        public string WhyDifference { get; set; }
        [JsonProperty(PropertyName = "Remark")]
        public string Remark { get; set; }
        [JsonProperty(PropertyName = "Comment")]
        public string Comment { get; set; }
    }
}
