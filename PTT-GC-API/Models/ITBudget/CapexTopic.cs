using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ITBudget
{
    public class CapexTopic
    {
        [Key]
        public int Id { get; set; }
        public string TopicId { get; set; }
        public string TopicName { get; set; }
        public bool? IsYesOrNo { get; set; }
        public string TopicType { get; set; }
        public int SurveyVersions { get; set; }
        public virtual ICollection<CapexChoice> CapexChoices { get; set; }
    }

    public class CapexTopicGet
    {
        [Key]
        public int Id { get; set; }
        public string TopicId { get; set; }
        public string TopicName { get; set; }
        public bool? IsYesOrNo { get; set; }
        public string TopicType { get; set; }
        public int SurveyVersions { get; set; }
        public List<CapexChoice> CapexChoices { get; set; }
    }
}
