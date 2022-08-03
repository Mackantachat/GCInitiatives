using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Outstanding
{
    public class OutstandingYear
    {
        public string Month { get; set; }  //  [Column(TypeName = "decimal(18,2)")]

        [Column(TypeName = "decimal(18,2)")]
        public decimal? BudgetBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PrItemBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PoItemBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CommitmentBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ItemListValueBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? RpcValueBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? OutStanding { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Contingency { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimateAtCompletion { get; set; }
    }
}
