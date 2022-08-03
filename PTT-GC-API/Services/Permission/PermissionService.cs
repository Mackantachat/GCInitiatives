using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Data.Repository;
using PTT_GC_API.Dtos.Permission;
using PTT_GC_API.Models.Permission;

namespace PTT_GC_API.Services.Permission
{
    public interface IPermissionService
    {
        public Task<List<RoleSettingDetail>> GetPermissionsByEmail(string email);
    }
    public class PermissionService : IPermissionService
    {
        private IRolePermissionsRepository _rolePermissionRepository;
        public PermissionService(IRolePermissionsRepository rolePermissionRepository)
        {
            _rolePermissionRepository = rolePermissionRepository;
        }

        public async Task<List<RoleSettingDetail>> GetPermissionsByEmail(string email)
        {
            var permissionData = await _rolePermissionRepository.GetPermissionsByEmail(email);
            return permissionData;
        }

    }
}
