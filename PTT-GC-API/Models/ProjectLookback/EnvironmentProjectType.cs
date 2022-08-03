using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models
{
    public class EnvironmentProjectType
    {
        [Key]
        public int EnviTypeId { get; set; } // auto increment
        public int ProjectLookbackId { get; set; }
        public string EnviType { get; set; } // ( Poll, Global, Resource )
        public string EnviTypeValue { get; set; } // value from Dropdown
    }
}
