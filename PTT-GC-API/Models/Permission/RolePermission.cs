using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Permission
{
    public class RolePermission
    {
        [Key]
        public int RolePermissionId { get; set; }
        public int? RoleId { get; set; }
        public int? PermissionMasterId { get; set; }

    }
}
