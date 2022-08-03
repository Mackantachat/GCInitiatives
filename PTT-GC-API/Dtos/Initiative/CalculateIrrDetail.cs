using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Initiative
{
    public class CalculateIrrDetail
    {

        public decimal? CostEstCapex { get; set; }
        public decimal? BenefitAmount { get; set; }
        public decimal? ResidualValue { get; set; }
        public decimal? UtilitiesCost { get; set; }
        public decimal? MaintenanceCost { get; set; } // default 1.5%
        public decimal? CatalystChemicalsCost { get; set; }
        public decimal? LabourCost { get; set; }
        public decimal? Wacc { get; set; } //default 8.00%
        public DateTime? StartingDate { get; set; }
        public DateTime? FinishingDate {get;set;}
        public decimal? FxExchange { get;set;}
    }
}
