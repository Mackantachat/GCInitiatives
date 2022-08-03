using System;
using System.ComponentModel.DataAnnotations;


namespace PTT_GC_API.Models.ResourceNeededFormsModel
{
    public class Fluid
    {
        [Key]
        public int Id { get; set; }
        public int? ResourceNeededId { get; set; }
        public double? TopicId { get; set; }
        public string FluidType { get; set; }
        public int? PressureNormal { get; set; }
        public int? FlowNormal { get; set; }
        public string PressureUnit { get; set; }
        public string FlowUnit { get; set; }
        public int? PressureMax { get; set; }
        public int? FlowMax { get; set; }
        public DateTime? FirstSupply { get; set; }
        public DateTime? COD { get; set; }
        public float? SupplyPeriods { get; set; }
    }
}
