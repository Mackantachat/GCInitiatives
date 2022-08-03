using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models
{
    public class LookbackReview
    {
        [Key]
        public int LookbackReviewId { get; set; }
        public int? ProjectLookbackId { get; set; }
        public string ProjectReviewTeam { get; set; }
    }
}