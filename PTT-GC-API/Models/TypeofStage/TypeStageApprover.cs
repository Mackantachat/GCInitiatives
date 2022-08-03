using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.TypeofStage
{
    public class TypeStageApprover
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Stage { get; set; }
        public string SubType { get; set; }
        public string Approver { get; set; }
        public int Order { get; set; }
    }
}
