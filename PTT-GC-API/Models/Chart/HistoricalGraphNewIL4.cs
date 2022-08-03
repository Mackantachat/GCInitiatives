using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Chart
{
    public class HistoricalGraphNewIL4
    {
        [Key]
        public int Id { get; set; }
        public int? Year { get; set; }
        public int? Week { get; set; }
        public decimal? IL4 { get; set; }
        public decimal? SIL4 { get; set; }
        public decimal? IL3 { get; set; }
        public decimal? IL0_IL2 { get; set; }
        public string CLevel { get; set; }
    }
}
