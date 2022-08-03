using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Permission
{
    public class UserWorkstream
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string WorkstreamTitle { get; set; }
    }
}
