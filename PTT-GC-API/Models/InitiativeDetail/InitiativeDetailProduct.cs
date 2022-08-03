using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.InitiativeDetail
{
    public class InitiativeDetailProduct
    {
        [Key]
        public int InitiativeDetailProductId { get; set; }
        public int InitiativeDetailHeaderId { get; set; }
        public string ProductTitle { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Capacity { get; set; }
        public string Unit { get; set; }
        public string UnitOther { get; set; }
        public string ProductType { get; set; }
    }
}
