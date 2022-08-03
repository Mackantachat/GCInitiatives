using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Initiative
{
    public class V_InitiativeStageDetail
    {

        public string Process { get; set; }
        public string Stage { get; set; }
        public int Sequence { get; set; }
        public string Subtype { get; set; }
        public int InitiativeId { get; set; }
        public string FlowType { get; set; }

    }
}
