using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.DetailInformation
{
    public class Procurement
    {
        [Key]
        public int Id { get; set; }
        public string ProcurementName { get; set; }
        public string ProcurementType { get; set; }
    }
}
