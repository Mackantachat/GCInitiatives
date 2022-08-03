using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Dtos.Initiative
{
    public class InitiativeProductList
    {
        public string Name { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Capacity { get; set; }
        public string Type { get; set; }
        public string Other { get; set; }
        public string ProductUnit { get; set; }
    }
}