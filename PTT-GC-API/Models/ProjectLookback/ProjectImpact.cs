using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models
{
    public class ProjectImpact
    {
        [Key]
        public int ProjectImpactId { get; set; }
        public int? ProjectLookbackId { get; set; }
        public string Situation { get; set; }
        public string Before { get; set; }
        public string Target { get; set; }
        public string After { get; set; }
    }
}
