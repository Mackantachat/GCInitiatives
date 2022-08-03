using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ApprovalFlow
{
    public class InitiativeStageActionDetail
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeStageDetailId { get; set; }
        public int InitiativeId { get; set; }
        public string ActionType { get; set; }
        public string ActionBy { get; set; }
        //public string ConditionType { get; set; }
    }
}
