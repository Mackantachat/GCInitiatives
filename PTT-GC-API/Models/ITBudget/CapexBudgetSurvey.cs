using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ITBudget
{
    public class CapexBudgetSurvey
    {
        [Key]
        public int Id { get; set; }
        public int? InitiativeId { get; set; }
        public string TopicId { get; set; }
        public string Status { get; set; }
        public string ChoiceValue { get; set; }
        public string Law { get; set; }
        public string Impact { get; set; }
        public DateTime? Effective { get; set; }
        public string ChoiceId { get; set; }
    }
}
