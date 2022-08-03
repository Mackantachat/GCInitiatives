using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ResourceNeeded
{
    public class Electricity
    {
        [Key]
        public int Id { get; set; }
        public int? ResourceNeededId { get; set; }
        public double? TopicId { get; set; }
        public decimal? Voltage { get; set; }
        public decimal? Normal { get; set; }
        public decimal? Max { get; set; }
        public DateTime? FirstSupply { get; set; }
        public DateTime? COD { get; set; }
        public float? SupplyPeriods { get; set; }
    }
}
