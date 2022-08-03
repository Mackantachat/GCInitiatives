using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.DetailInformation
{
    public class RequestEmoc
    {
        [Key]
        public int RequestEmocId { get; set; }
        public int? InitiativeId { get; set; }
        [StringLength(200)]
        public string Plant { get; set; }
        [StringLength(200)]
        public string EmocNo { get; set; }
        [StringLength(200)]
        public string EmocName { get; set; }
        [StringLength(200)]
        public string EmocRequestStatus { get; set; }
        [StringLength(200)]
        public string EmocStatus { get; set; }

    }
}
