using PTT_GC_API.API.Helpers;
using PTT_GC_API.Dtos.Master;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Permission;
using PTT_GC_API.Models.Role;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{

    public interface MasterDataInterface
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
        Task<PagedList<UserManagement2>> GetOwner(PagingParam Params);
        Task<PagedList<Models.Role.Action>> GetAction(PagingParam Params);
        Task<PagedList<RoleDetailSetting>> GetRoleDetail(PagingParam Params);
        Task<RoleMasterModel> GetRoleDetailById(int Params);

        Task<PagedList<PermissionMaster>> GetPermissionMaster(PagingParam Params);

        Task<PagedList<ScreenObject>> GetScreenObject(PagingParam Params);
        Task<PagedList<UserRole>> GetUserRole(string email);

        Task<PagedList<Models.Role.BU>> GetBU();
        Task<PagedList<Models.Role.Position>> GetPosition();
        Task<PagedList<Models.Role.WorkStream2>> GetWorkStream();

        //Task<PagedList<Models.Role.PoolType>> GetPoolType();
        //Task<PagedList<Models.Role.Company>> GetCompany();
        //Task<PagedList<Models.Role.Organization>> GetOrganization();
        //Task<PagedList<Models.Role.StateGate>> GetStateGate();

        Task<List<RoleScreen>> CreateRoleDetail(RoleDetail Params);
        Task<List<RoleMasterModel>> SaveRoleDetail(RoleMasterModel Params);
    }


    //public class PagingParam
    //{
    //    private const int MaxPageSize = 50;
    //    public int PageNumber { get; set; } = 1;
    //    private int pageSize = 20;
    //    public int PageSize
    //    {
    //        get { return pageSize; }
    //        set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
    //    }
    //}
}
