using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models
{
    public class CimLookback
    {
        [Key]
        public int CimLookbackId { get; set; }
        public int? ProjectLookbackId { get; set; }
        public string CimLookbackType { get; set; }  // Project Background, Project Cost, Schedule of Completion & Commercial Run, Key Assumption, Economic Return
        public string Aspect { get; set; }
        public string Approve { get; set; }
        public string Actual { get; set; }
        public string DifferenceNote { get; set; }
        public string BusinessPlan { get; set; }
        public string ResponsiblePerson { get; set; }

    }
}
