using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ApprovalFlow
{
    public class StageActionMaster
    {
        [Key]
        public int Id { get; set; }
        public int StageMasterId { get; set; }
        public string ActionType { get; set; }
        public string ActionBy { get; set; }
    }
}
