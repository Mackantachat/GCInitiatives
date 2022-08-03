using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.ProjectImpactWork
{
    public class ProjectImpactWorkList
    {
        [JsonProperty(PropertyName = "ProjectImpactWorkId")]
        public int ProjectImpactWorkId { get; set; }
        [JsonProperty(PropertyName = "ProjectLookbackId")]
        public int? ProjectLookbackId { get; set; }
        [JsonProperty(PropertyName = "WhatWorked")]
        public string WhatWorked { get; set; }
        [JsonProperty(PropertyName = "WhatDidNotWork")]
        public string WhatDidNotWork { get; set; }
    }
}
