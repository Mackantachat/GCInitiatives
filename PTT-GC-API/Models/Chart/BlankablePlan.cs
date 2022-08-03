using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Chart
{
    public class BlankablePlan
    {
        [Key]
        public int Id { get; set; }
        public int Week {get;set;}
        [StringLength(200)]
        public string CLevel { get; set; }
        [StringLength(4)]
        public string Year { get; set; }
        [StringLength(200)]
        public string StageType { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? BlankableValue { get; set; }
    }
}
