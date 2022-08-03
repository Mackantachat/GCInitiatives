using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models
{
    public class ExecutionLookback
    {
        [Key]
        public int ExecutionLookbackId { get; set; }
        public int? ProjectLookbackId { get; set; }
        public string KnowledgeArea { get; set; } // Safety Performance (Case) * , Total Cost * , Time Completion Plan finished , Improvement Request(IR) *, Project Change Notice(PCN) * 
        public string Plan { get; set; }
        public string Actual { get; set; }
        public string Issue { get; set; }
        public string Background { get; set; }
        public string LessonLearned { get; set; }
        public string Remark { get; set; }
        public string Comment { get; set; }
    }
}
