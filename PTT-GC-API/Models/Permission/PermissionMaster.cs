using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Permission
{
    public class PermissionMaster
    {
        [Key]
        public int PermissionMasterId { get; set; }
        public string PermissionName { get; set; }
        public string Description { get; set; }
    }
}
