using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.EnvironmentProjectType
{
    public class EnvironmentProjectTypeList
    {
        [JsonProperty(PropertyName = "EnviTypeId")]
        public int EnviTypeId { get; set; } // auto increment
        [JsonProperty(PropertyName = "ProjectLookbackId")]
        public int? ProjectLookbackId { get; set; }
        [JsonProperty(PropertyName = "EnviType")]
        public string EnviType { get; set; } // ( Poll, Global, Resource )
        [JsonProperty(PropertyName = "EnviTypeValue")]
        public string EnviTypeValue { get; set; } // value from Dropdown
    }
}
