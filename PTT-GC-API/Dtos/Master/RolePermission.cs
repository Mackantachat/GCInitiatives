using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Master
{
    public class RoleMasterModel
    {
        public int Id { get; set; }
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public bool? IsActive { get; set; }
        public string Description { get; set; }
        public List<RolePermissionModel> RolePermissionModel { get; set; }
    }

    public class RolePermissionModel
    {
        // public int RolePermissionId { get; set; }
        public int? RoleId { get; set; }
        public int? PermissionMasterId { get; set; }
    }
}
