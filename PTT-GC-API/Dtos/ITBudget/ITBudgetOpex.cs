using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Dtos.ITBudget
{
    public class ITBudgetOpex
    {
        public int Id { get; set; }
        public int? InitiativeId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? OpexSummary { get; set; }
        public string OpexNo { get; set; }
    }
}