using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Role
{
    public class WorkStream2
    {
        [Key]
        public int Id { get; set; }
        public string WorkstreamID { get; set; }
        public string WorkstreamTitle { get; set; }
    }
}
