using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ITBudget
{
    public class ITBudgetSurveyAsset
    {
        [Key]
        public int Id { get; set; }
        public int ITBudgetSurveyId { get; set; }
        public string AssetId { get; set; }
        public string OtherName { get; set; }
        public int? NumberOfUnit { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostPerUnit { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalMTHB { get; set; }
    }
}
