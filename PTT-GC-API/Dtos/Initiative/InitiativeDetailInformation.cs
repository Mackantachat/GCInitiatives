using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Dtos.Initiative
{
    public class InitiativeDetailInformation
    {
        public string InitiativeCode { get; set; }
        public string Name { get; set; }
        public string Year { get; set; }
        public string OwnerName { get; set; }
        public string Organization { get; set; }
        public string TypeOfInvestment { get; set; }
        public bool? Cim { get; set; }
        public bool? Pim { get; set; }
        public bool? Dim { get; set; }
        public bool? Max { get; set; }
        public bool? DirectCapex { get; set; }
        public bool? Cpi { get; set; }
        public bool? Strategy { get; set; }
        public bool? RandD { get; set; }
        public bool? Other { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public string Remark { get; set; }
        public string RequestOpex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostEstOpex { get; set; }
        public virtual DetailInformation_Old DetailInformations { get; set; }
    }
}