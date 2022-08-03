using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Models.ResourceNeeded
{
    public class FutureFactors
    {
        /// <summary>
        /// Model Data for Other
        /// </summary>
        [Key]
        public int Id { get; set; }
        public int? ResourceNeededId { get; set; }
        public string Name { get; set; }
        public double? TopicId { get; set; }
        public string PressureNormalUnit { get; set; }
        public string FlowNormalUnit { get; set; }
        public string PressureMaxUnit { get; set; }
        public string FlowMaxUnit { get; set; }
        public int? PressureNormalAmount { get; set; }
        public int? FlowNormalAmount { get; set; }
        public int? PressureMaxAmount { get; set; }
        public int? FlowMaxAmount { get; set; }
    }
}
