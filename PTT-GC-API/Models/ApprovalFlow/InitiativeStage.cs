using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ApprovalFlow
{
    public class InitiativeStage
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public string FlowType { get; set; }
        public string Stage { get; set; }
        public string Status { get; set; }
    }
}
