using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ResourceNeeded
{
    public class TimelineRecords
    {
        /// <summary>
        /// You can use TopicId to match topicId in utility items
        /// in case of which name to display in timeline's 
        /// </summary>
        [Key]
        public int Id { get; set; }
        public int ResourceNeededId { get; set; }
        public string Name { get; set; }
        //public double? TopicId { get; set; }
        public DateTime? FirstSupply { get; set; }
        public DateTime? COD { get; set; }
        public float? SupplyPeriods { get; set; }
    }
}
