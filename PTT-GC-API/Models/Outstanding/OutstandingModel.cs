using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Outstanding
{
    public class OutstandingModel
    {
        [Key]
        public int Id { get; set; }
        public int? InitiativeId { get; set; }
        public bool? IsDeleted { get; set; }
        public int? Year { get; set; }
        public int? Month { get; set; }
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
        public decimal? Contingency { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimateAtCompletion { get; set; }
    }
}
