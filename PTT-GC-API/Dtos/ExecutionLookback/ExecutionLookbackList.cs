using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.ExecutionLookback
{
    public class ExecutionLookbackList
    {
        [JsonProperty(PropertyName = "ExecutionLookbackId")]
        public int ExecutionLookbackId { get; set; }
        [JsonProperty(PropertyName = "ProjectLookbackId")]
        public int? ProjectLookbackId { get; set; }
        [JsonProperty(PropertyName = "Plan")]
        public string Plan { get; set; }
        [JsonProperty(PropertyName = "Actual")]
        public string Actual { get; set; }
        [JsonProperty(PropertyName = "KnowledgeArea")]
        public string KnowledgeArea { get; set; }
        [JsonProperty(PropertyName = "Issue")]
        public string Issue { get; set; }
        [JsonProperty(PropertyName = "Background")]
        public string Background { get; set; }
        [JsonProperty(PropertyName = "LessonLearned")]
        public string LessonLearned { get; set; }
        [JsonProperty(PropertyName = "Remark")]
        public string Remark { get; set; }
        [JsonProperty(PropertyName = "Comment")]
        public string Comment { get; set; }
        
    }
}
