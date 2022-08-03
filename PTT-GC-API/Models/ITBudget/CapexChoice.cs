using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ITBudget
{
    public class CapexChoice
    {
        [Key]
        public int Id { get; set; }
        public int CapexTopicId { get; set; }
        public string TopicId { get; set; }
        public string ChoiceType { get; set; }
        public string ChoiceId { get; set; }
        public string ChoiceName { get; set; }
        public int SurveyVersions { get; set; }
    }
}
