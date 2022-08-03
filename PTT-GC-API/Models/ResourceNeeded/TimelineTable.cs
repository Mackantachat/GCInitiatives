using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ResourceNeeded
{
    public class TimelineTable
    {
        public int Id { get; set; }
        public int ResourceNeededId { get; set; }
        public double? TopicId { get; set; }
        public DateTime? FirstSupply { get; set; }
        public DateTime? COD { get; set; }
        public decimal? SupplyPeriods { get; set; }
    }
}
