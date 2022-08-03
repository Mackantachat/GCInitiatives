using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Initiative
{
    public class InitiativeTypeSubType
    {
        public int InitiativeId { get; set; }
        public string SubType { get; set; }
        public string ProcessType { get; set; }
    }
}
