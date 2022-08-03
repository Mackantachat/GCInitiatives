using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.LookbackReview
{
    public class LookbackReviewList
    {
        [JsonProperty(PropertyName = "LookbackReviewId")]
        public int LookbackReviewId { get; set; }
        [JsonProperty(PropertyName = "ProjectLookbackId")]
        public int? ProjectLookbackId { get; set; }
        [JsonProperty(PropertyName = "ProjectReviewTeam")]
        public string ProjectReviewTeam { get; set; }
    }
}
