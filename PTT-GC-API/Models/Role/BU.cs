using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Role
{
    public class BU
    {
        [Key]
        public int Id { get; set; }
        public string BUID { get; set; }
        public string BUText { get; set; }
    }
}
