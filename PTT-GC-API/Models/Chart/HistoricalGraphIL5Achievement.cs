using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Chart
{
    public class HistoricalGraphIL5Achievement
    {
        [Key]
        public int Id { get; set; }
        public int? Year { get; set; }
        public int? Week { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5 { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? SIL5 { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? UnconvertedIL4 { get; set; }
        public string CLevel { get; set; }
    }
}
