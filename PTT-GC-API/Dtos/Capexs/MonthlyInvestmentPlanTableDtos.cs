using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Dtos.Capexs
{
    public class MonthlyInvestmentPlanTableDtos
    {
        public int AnnualInvestmentPlanId { get; set; }
        public int InitiativeId { get; set; }
        public string InvestmentCost { get; set; }  // Thousand Bath, Thousand Dollar, Thousand Yen, .....
        [Column(TypeName = "decimal(18,2)")]
        public decimal? InvestmentCostFx { get; set; }  // FX (if not Thousand Bath)

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Jan { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Feb { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Mar { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Apr { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? May { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Jun { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Jul { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Aug { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Sep { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Oct { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Nov { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Dec { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? MonthlyOverall { get; set; }

        public string YearOfMonth { get; set; }

        //Renew
        public int? CapexInformationId { get; set; }

        public string SumMonthlyType { get; set; }

    }
}
