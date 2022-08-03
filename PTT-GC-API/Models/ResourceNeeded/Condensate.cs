using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ResourceNeeded
{
    public class Condensate
    {
        [Key]
        public int Id { get; set; }
        public int? ResourceNeededId { get; set; }
        public double? TopicId { get; set; }
        public string CondensateType { get; set; }
        public string? PressureLevel { get; set; }
        public decimal? PressureNormal { get; set; }
        public decimal? TempNormal { get; set; }
        public decimal? FlowNormal { get; set; }
        public decimal? PressureMax { get; set; }
        public decimal? TempMax { get; set; }
        public decimal? FlowMax { get; set; }
        public DateTime? FirstSupply { get; set; }
        public DateTime? COD { get; set; }
        public float? SupplyPeriods { get; set; }
    }
}
