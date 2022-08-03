using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.KRI
{
    public class KriProgressMitigation
    {
        [Key]
        public int KriProgressMitigationId { get; set; }
        public int? KpiMaintainId { get; set; }
        public int? InitiativeId { get; set; }
        public string Year { get; set; }
        public string KriType { get; set; }   // progress, mitigation
        public string Jan { get; set; }
        public string Feb { get; set; }
        public string Mar { get; set; }
        public string Apr { get; set; }
        public string May { get; set; }
        public string Jun { get; set; }
        public string Jul { get; set; }
        public string Aug { get; set; }
        public string Sep { get; set; }
        public string Oct { get; set; }
        public string Nov { get; set; }
        public string Dec { get; set; }
    }
}
