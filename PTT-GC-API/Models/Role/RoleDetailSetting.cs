using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Role
{
    public class RoleDetailSetting
    {
        [Key]
        public int Id { get; set; }
        [StringLength(500)]
        public string RoleId { get; set; }
        [StringLength(500)]
        public string RoleName { get; set; }
        public bool? IsActive { get; set; }
        [StringLength(500)]
        public string Description { get; set; }
    }
}
