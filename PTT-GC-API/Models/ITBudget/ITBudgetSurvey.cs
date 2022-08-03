using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ITBudget
{
    public class ITBudgetSurvey
    {
        [Key]
        public int Id { get; set; }
        public int? InitiativeId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CapexSummary { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? OpexSummary { get; set; }
        public string CapexNo { get; set; }
        public string OpexNo { get; set; }
        public string AdvancedCapexChoice { get; set; }
    }
}
