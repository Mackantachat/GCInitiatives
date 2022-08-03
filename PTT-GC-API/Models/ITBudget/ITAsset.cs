using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ITBudget
{
    public class ITAsset
    {
        [Key]
        public int Id { get; set; }
        public string AssetId { get; set; }
        public string AssetType { get; set; }
        public string AssetName { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostPerUnit { get; set; }
        public int SurveyVersions { get; set; }
    }
}
