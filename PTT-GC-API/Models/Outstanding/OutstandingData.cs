using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Outstanding
{
    public class OutstandingData
    {
        [Key]
        public int Id { get; set; }
        public int? InitiativeId { get; set; }
        public int? Year { get; set; }
        public int? Month { get; set; }
        public int? OutstandingId { get; set; }
        public string ItemDescription { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ItemListValueBaht { get; set; }
        public string RpcDescription { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? RpcValueBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Outstanding { get;set; }
        public bool? IsDeleted { get; set; }
    }
}
