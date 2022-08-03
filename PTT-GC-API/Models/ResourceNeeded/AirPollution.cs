using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ResourceNeeded
{
    public class AirPollution
    {
        [Key]
        public int Id { get; set; }
        public int? ResourceNeededId { get; set; }
        public string Topic { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? Amount { get; set; }
        public string Unit { get; set; }
        public string Remark { get; set; }
    }
}
