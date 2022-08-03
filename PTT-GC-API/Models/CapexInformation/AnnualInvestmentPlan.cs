using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.CapexInformation
{
    public class AnnualInvestmentPlan
    {
        [Key]
        public int AnnualInvestmentPlanId { get; set; }
        public int CapexInformationId { get; set; }
        public int InitiativeId { get; set; }
        public string Currency { get; set; }  // Million Bath, Million Dollar, Million Yen, .....
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CurrencyFx { get; set; }  // FX (if not Million Bath)

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Year1 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Year2 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Year3 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Year4 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Year5 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Year6 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Year7 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Year8 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Year9 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Year10 { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? YearOverall { get; set; }

        //[Column(TypeName = "decimal(18,2)")]
        //public decimal? SpendingActual { get; set; }

        //Renew
        public string PlanType { get; set; }
        //[Column(TypeName = "decimal(18,2)")]
        //public decimal? ActualSpendingThisYear { get; set; }
        //[Column(TypeName = "decimal(18,2)")]
        //public decimal? FutureSpendingThisYear { get; set; }
        //[Column(TypeName = "decimal(18,2)")]
        //public decimal? CarryBudget { get; set; }
    }
}
