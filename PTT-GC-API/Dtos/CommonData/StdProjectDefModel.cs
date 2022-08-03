using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.CommonData
{
    public class StdProjectDefParams
    {
        public int? InitiativeId { get; set; }
        public string TypeOfInvestment { get; set; }
        public string BudgetSource { get; set; }
    }

    public class StdProjectDefRes
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public string TypeOfInvestment { get; set; }
        public string BudgetSource { get; set; }
        public string DefaultValue { get; set; }
    }
}
