using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ProgressAndMilestone
{
    public class InvestmentCost
    {
        [Key]
        public int InvestmentCostId { get; set; }
        public string InvestmentCostType { get; set; }
        public string YearCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? JanCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? FebCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? MarCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? AprCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? MayCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? JunCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? JulCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? AugCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SepCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? OctCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NovCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? DecCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? OverallCost { get; set; }

        public int? InitiativeId { get; set; }
    }
}
