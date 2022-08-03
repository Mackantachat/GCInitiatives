using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.VacPic
{
    public class initiativeMemberModel
    {
        public int InitiativeId { get; set; }
        public string InitiativeCode { get; set; }
        public string Name { get; set; }
        public string OwnerName { get; set; }
        public string InitiativeType { get; set; }
        public string Plant { get; set; }
        public string EmocNo { get; set; }
        public string Gate { get; set; }
        public string Presentation { get; set; }
        public string Pdd { get; set; }
        public string OverallCostEst { get; set; }
        public string RequestCapex { get; set; }
        public string CostEstCapexType { get; set; }
        public string RequestOpex { get; set; }
        public string CostEstOpexType { get; set; }
        public string FxExchange { get; set; }
        public List<string> Stages { get; set; }
        public List<string> MoveBacks { get; set; }
        public List<string> Leaves { get; set; }
        public List<string> SwitchProcesses { get; set; }
    }
}
