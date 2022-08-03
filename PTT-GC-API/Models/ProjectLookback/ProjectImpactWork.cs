using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models
{
    public class ProjectImpactWork
    {
        [Key]
        public int ProjectImpactWorkId { get; set; }
        public int? ProjectLookbackId { get; set; }
        public string WhatWorked { get; set; }
        public string WhatDidNotWork { get; set; }

    }
}
