using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Dtos.Permission;

namespace PTT_GC_API.Data.Interface
{
    public interface PermissionInterface
    {
        Task<bool> CheckOverviewPermission(Overview overview);
        Task<bool> CheckDashboardPermission(Dashboard dashboard);
        Task<bool> CheckSettingPermission(Setting dashboard);
        Task<object> GetListPermission(string email, string page,int initiativeId);
        Task<object> GetRolesDetailList(string email, int? id);

        Task<object> Checkpermission(string email, string PageId, string SectionId, string FieldName);
        
    }
}