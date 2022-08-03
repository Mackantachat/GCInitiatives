using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Dtos.ITBudget
{
    public class ITBudgetCapex
    {
        public int Id { get; set; }
        public int? InitiativeId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CapexSummary { get; set; }
        public string CapexNo { get; set; }
        public string AdvancedCapexChoice { get; set; }
    }
}