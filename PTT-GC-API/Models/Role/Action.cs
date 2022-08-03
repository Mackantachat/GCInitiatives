using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Role
{
    public class Action
    {
        [Key]
        public int Id { get; set; }
        public string ActionId { get; set; }
        public string ActionName { get; set; }
    }
}
