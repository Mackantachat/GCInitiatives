using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ApprovalFlow
{
    public class SwitchProcessStageMapping
    {
        [Key]
        public int Id { get; set; }
        public string OldProcess { get; set; }
        public string OldStage { get; set; }
        public string NewProcess { get; set; }
        public string NewStage { get; set; }
    }
}
