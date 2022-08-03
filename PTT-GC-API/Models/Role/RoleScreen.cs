using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Role
{
    public class RoleScreen
    {
        [Key]
        public int RoleScreenId { get; set; }
        public string RoleId { get; set; }
        public string ScreenObjectId { get; set; }
        public string ActionId { get; set; }

    }
}
