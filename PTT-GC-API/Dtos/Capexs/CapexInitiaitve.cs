using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Capexs
{
    public class CapexInitiaitve
    {
        public int Id { get; set; }
        public string InitiativeCode { get; set; }
        public decimal ProjectCost { get; set; }
        public decimal AvailableBudget { get; set; }
        public string name { get; set; }
        public int? seq { get; set; }
    }
}
