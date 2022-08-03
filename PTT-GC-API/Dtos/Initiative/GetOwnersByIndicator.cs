using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Initiative
{
    public class GetOwnersByIndicator
    {
        public int InitiativeId { get; set; }
        public string Indicator { get; set; }
        public string Plant { get; set; }
    }
}
