using PTT_GC_API.Models.KRI;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Kri
{
    public class CorporateKpi
    {
        [Key]
        public int CorporateKpiId { get; set; }
        public string CorporateKpiStatus { get; set; }
        public string CorporateKpiDate { get; set; }
        public int? InitiativeId { get; set; }
        public KriProgressMitigation KriProgressMitigation { get; set; }
        public KriDetailMonth KriDetailMonth { get; set; }
    }
}
