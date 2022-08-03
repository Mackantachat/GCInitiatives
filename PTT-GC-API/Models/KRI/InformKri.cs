using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.KRI
{
    public class InformKri
    {
        [Key]
        public int InformKriId { get; set; }
        public string InformType { get; set; }
        public string Year { get; set; }
        public int? InitiativeId { get; set; }
        public string OwnerName { get; set; }
        public string Email { get; set; }
    }
}
