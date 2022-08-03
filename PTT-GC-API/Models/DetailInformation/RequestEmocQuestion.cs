using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.DetailInformation
{
    public class RequestEmocQuestion
    {
        [Key]
        public int RequestEmocQuestionId { get; set; }
        public int? InitiativeId { get; set; }
        [StringLength(200)]
        public string Plant { get; set; }
        [StringLength(500)]
        public string EmocQuestionId { get; set; }
        public bool? EmocAnswer { get; set; }
    }
}
