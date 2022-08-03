using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Setting
{
    public class InactiveInitiativeCode
    {
        [Key]
        public int InactiveInitiativeCodeId { get; set; }
        public int PerformanceInactiveId { get; set; }
        public string InitiativeCode { get; set; }
    }
}
