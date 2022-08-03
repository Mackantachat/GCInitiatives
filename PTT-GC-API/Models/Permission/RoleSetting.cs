using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Permission
{
    public class RoleSetting
    {
        [Key]
        public int Id { get; set; }
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
    }
}
