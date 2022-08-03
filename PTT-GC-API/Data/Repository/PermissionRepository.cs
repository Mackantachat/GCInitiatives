using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Permission;
using PTT_GC_API.Models.Permission;

namespace PTT_GC_API.Data.Repository
{
    public class PermissionRepository : PermissionInterface
    {
        private readonly DataContext _context;
        private readonly StoreProcedureInterface _storeProcedure;
        public PermissionRepository(DataContext context, StoreProcedureInterface storeProcedure)
        {
            _context = context;
            _storeProcedure = storeProcedure;
        }

        public async Task<bool> CheckOverviewPermission(Overview overview)
        {
            if (await _context.OverviewPermissions.Where(o => o.Email == overview.Email).AnyAsync())
                return true;
            return false;
        }
        public async Task<bool> CheckDashboardPermission(Dashboard dashboard)
        {
            if (await _context.DashboardPermissions.Where(o => o.Email == dashboard.Email).AnyAsync())
                return true;
            return false;
        }

        public async Task<bool> CheckSettingPermission(Setting setting)
        {
            if (await _context.CommonData.Where(o => o.Attribute01 == setting.Email).AnyAsync())
                return true;
            return false;
        }

        public async Task<object> GetListPermission(string email, string page, int initiativeId)
        { 
            var roleManageJson = new List<NoPermission>();
            var rolebyCreate = new List<NoPermission>();
            var roleManage = new List<RoleManagement>(); 
          
            if (page=="Test")
            {
                rolebyCreate.Add(new NoPermission
                {
                    username = email,
                    roleId = "",
                    roleName = "",
                    pageId = "",
                    pageName = "create",
                    sectionId = "S00005",
                    sectionName = "Submit",
                    fieldName = "company",
                    parameter01 = "10",
                    parameter02 = "11",
                    parameter03 = "12", 
                    isVisible = true,
                    isEnable = true
                }); 
                
                return rolebyCreate;

            }



            if (page == "create")  // submit : Page Create,
            {
                rolebyCreate.Add(new NoPermission
                {
                    username = email,
                    roleId = "",
                    roleName = "",
                    pageId = "",
                    pageName = "create",
                    sectionId = "S00005",
                    sectionName = "Submit",
                    isVisible = true,
                    isEnable = true
                });
            }
            else
            {
                //my Own ???
                var ownerName = await _context.Owners.Where(o => o.Email.ToLower() == email.ToLower()).Select(o => o.OwnerName).ToArrayAsync();
                var isMyOwn = await (from a in _context.Initiatives.Where(i => (i.HistoryFlag == null || i.HistoryFlag == 0)) where a.Id == initiativeId && ownerName.Contains(a.OwnerName) select a.InitiativeCode).CountAsync();
                if (isMyOwn > 0) // submit : Page Edit,
                {
                     
                    rolebyCreate.Add(new NoPermission
                    {
                        username = email,
                        roleId = "",
                        roleName = "",
                        pageId = "",
                        pageName = "create",
                        sectionId = "S00005",
                        sectionName = "Submit",
                        isVisible = true,
                        isEnable = true
                    });
                    rolebyCreate.Add(new NoPermission
                    {
                        username = email,
                        roleId = "",
                        roleName = "",
                        pageId = "",
                        pageName = "createss",
                        sectionId = "S00005ss",
                        sectionName = "Submitss",
                        isVisible = false,
                        isEnable = false
                    });
                }

                //user in permission ???
                var userId = await (from a in _context.UserManagements where a.Email == email select a.Id).FirstOrDefaultAsync();
                if (userId.ToString() != "")
                {
                    //var roleId = (from a in _context.UserRoles.ToList() where a.UserId == userId select a.RoleId).ToArray();
                    var roleId = await _context.UserRoles.Where(o => o.UserId == userId).Select(o => o.RoleId).ToArrayAsync();
                    if (roleId.Count() > 0)
                    {
                        //var roleManage =  (from a in  _context.RoleManagements where roleId.Contains(a.RoleId) select a).ToList();
                        //roleManage = await _context.RoleManagements.Select(o=>o).ToListAsync();
                        roleManageJson = await (from a in _context.RoleManagements
                                                join b in _context.UserRoles.Where(o => o.UserId == userId)
                                                on a.RoleId equals b.RoleId
                                                select new NoPermission
                                                {
                                                    username = email,
                                                    roleId = a.RoleId,
                                                    roleName = (from rn in _context.RoleSettings where rn.RoleId == a.RoleId select rn.RoleName).FirstOrDefault(),
                                                    pageId = a.PageId,
                                                    pageName = (from pn in _context.PageSettings where pn.PageId == a.PageId select pn.PageName).FirstOrDefault(),
                                                    sectionId = a.SectionId,
                                                    sectionName = (from sm in _context.SectionSettings where sm.SectionId == a.SectionId select sm.SectionName).FirstOrDefault(),
                                                    isVisible = a.IsVisible,
                                                    isEnable = a.IsEnable
                                                }).ToListAsync();
                    }
                }
            } 
            return  rolebyCreate.Union(roleManageJson);
           
        }

        public async Task<object> GetRolesDetailList(string email, int? id)
        {
            DataTable dt = new DataTable();
            try
            {
                dt = await _storeProcedure.ExecuteReturnDatatable($"EXEC sp_GetPermission '{email}', {id}");
            }
            catch (Exception ex)
            {

            }

            return dt;
        }

        public async Task<object> Checkpermission(string email, string PageId, string SectionId, string FieldName)
        {
            var getRole = await (from u in _context.UserRoles
                                 join rp in _context.RolePermission on u.RoleId equals rp.RoleId.ToString()
                                 join rs in _context.RoleSettingDetail on rp.PermissionMasterId equals rs.PermissionMasterId
                                 join rd in _context.RoleDetailSetting on rp.RoleId equals rd.Id
                                 where u.Email.ToUpper().Trim() == email.ToUpper().Trim()
                                    && (string.IsNullOrEmpty(PageId) || rs.PageId.ToUpper().Trim() == PageId.ToUpper().Trim())
                                    //&& (string.IsNullOrEmpty(SectionId) || rs.SectionId.ToUpper().Trim() == SectionId.ToUpper().Trim())
                                    && (string.IsNullOrEmpty(FieldName) || rs.FieldName.ToUpper().Trim() == FieldName.ToUpper().Trim())
                                 select new RoleSettingDetail()
                                 {
                                     Id = rs.Id,
                                     PageId = rs.PageId,
                                     SectionId = rs.SectionId,
                                     FieldName = rs.FieldName,
                                     IsVisible = rs.IsVisible,
                                     IsEnable = rs.IsEnable,
                                     IsIndividual = rs.IsIndividual,
                                     Parameter01 = rs.Parameter01,
                                     Parameter02 = rs.Parameter02,
                                     Parameter03 = rs.Parameter03,
                                     Parameter04 = rs.Parameter04,
                                     Parameter05 = rs.Parameter05,
                                     Parameter06 = rs.Parameter06,
                                     Parameter07 = rs.Parameter07,
                                     Parameter08 = rs.Parameter08,
                                     Parameter09 = rs.Parameter09,
                                     Parameter10 = rs.Parameter10,
                                     Parameter11 = rs.Parameter11,
                                     Parameter12 = rs.Parameter12,
                                     Parameter13 = rs.Parameter13,
                                     Parameter14 = rs.Parameter14,
                                     Parameter15 = rs.Parameter15,
                                     Parameter16 = rs.Parameter16,
                                     Parameter17 = rs.Parameter17,
                                     Parameter18 = rs.Parameter18,
                                     Parameter19 = rs.Parameter19,
                                     Parameter20 = rs.Parameter20,
                                     RoleId = rd.Id.ToString(),
                                     RoleName = rd.RoleName,
                                     InitiativeType = rs.InitiativeType,
                                     Stage = rs.Stage,
                                     Status = rs.Status,
                                     TypeOfInvestment = rs.TypeOfInvestment,
                                     Priority = rs.Priority,
                                     PermissionMasterId = rs.PermissionMasterId
                                 }).Distinct().ToListAsync();


            var getMaxPermissions = await (from u in _context.UserRoles
                                 join rs in _context.RoleSettingDetail on u.RoleId equals rs.RoleId
                                 join rd in _context.RoleDetailSetting on rs.RoleId equals rd.Id.ToString()
                                 where u.Email.ToUpper().Trim() == email.ToUpper().Trim() 
                                 && (rd.RoleName.Contains("CTO") || rd.RoleName.Contains("CFO") || rd.RoleName.Contains("SPOC") || rd.RoleName.Contains("Young Leader")
                                     || rd.RoleName.Contains("Sponsor") || rd.RoleName.Contains("TF-BT-TO") || rd.RoleName.Contains("TO Finance") )
                                           select new RoleSettingDetail()
                                           {
                                               Id = rs.Id,
                                               PageId = rs.PageId,
                                               SectionId = rs.SectionId,
                                               FieldName = rs.FieldName,
                                               IsVisible = rs.IsVisible,
                                               IsEnable = rs.IsEnable,
                                               IsIndividual = rs.IsIndividual,
                                               Parameter01 = rs.Parameter01,
                                               Parameter02 = rs.Parameter02,
                                               Parameter03 = rs.Parameter03,
                                               Parameter04 = rs.Parameter04,
                                               Parameter05 = rs.Parameter05,
                                               Parameter06 = rs.Parameter06,
                                               Parameter07 = rs.Parameter07,
                                               Parameter08 = rs.Parameter08,
                                               Parameter09 = rs.Parameter09,
                                               Parameter10 = rs.Parameter10,
                                               Parameter11 = rs.Parameter11,
                                               Parameter12 = rs.Parameter12,
                                               Parameter13 = rs.Parameter13,
                                               Parameter14 = rs.Parameter14,
                                               Parameter15 = rs.Parameter15,
                                               Parameter16 = rs.Parameter16,
                                               Parameter17 = rs.Parameter17,
                                               Parameter18 = rs.Parameter18,
                                               Parameter19 = rs.Parameter19,
                                               Parameter20 = rs.Parameter20,
                                               RoleId = rs.RoleId,
                                               RoleName = rs.RoleName,
                                               InitiativeType = rs.InitiativeType,
                                               Stage = rs.Stage,
                                               Status = rs.Status,
                                               TypeOfInvestment = rs.TypeOfInvestment,
                                               Priority = rs.Priority,
                                               PermissionMasterId = rs.PermissionMasterId
                                           }).ToListAsync();

            var getRoleAndSpoc = getRole.Union(getMaxPermissions);

            //Get KPI Viewer
            var getEditableInform = await _context.InformKri.Where(x => x.Email.ToLower() == email.ToLower()).CountAsync();
            if (getEditableInform > 0)
            {
                var getViewer = await (from rs in _context.RoleSettingDetail
                                       where rs.PageId == "KPI-MAINTAIN-VIEWER" && rs.RoleName == "KPI-Viewer" && rs.SectionId == "ACCESS"
                                       select new RoleSettingDetail()
                                       {
                                           Id = rs.Id,
                                           PageId = rs.PageId,
                                           SectionId = rs.SectionId,
                                           FieldName = rs.FieldName,
                                           IsVisible = rs.IsVisible,
                                           IsEnable = rs.IsEnable,
                                           IsIndividual = rs.IsIndividual,
                                           Parameter01 = rs.Parameter01,
                                           Parameter02 = rs.Parameter02,
                                           Parameter03 = rs.Parameter03,
                                           Parameter04 = rs.Parameter04,
                                           Parameter05 = rs.Parameter05,
                                           Parameter06 = rs.Parameter06,
                                           Parameter07 = rs.Parameter07,
                                           Parameter08 = rs.Parameter08,
                                           Parameter09 = rs.Parameter09,
                                           Parameter10 = rs.Parameter10,
                                           Parameter11 = rs.Parameter11,
                                           Parameter12 = rs.Parameter12,
                                           Parameter13 = rs.Parameter13,
                                           Parameter14 = rs.Parameter14,
                                           Parameter15 = rs.Parameter15,
                                           Parameter16 = rs.Parameter16,
                                           Parameter17 = rs.Parameter17,
                                           Parameter18 = rs.Parameter18,
                                           Parameter19 = rs.Parameter19,
                                           Parameter20 = rs.Parameter20,
                                           RoleId = rs.RoleId,
                                           RoleName = rs.RoleName,
                                           InitiativeType = rs.InitiativeType,
                                           Stage = rs.Stage,
                                           Status = rs.Status,
                                           TypeOfInvestment = rs.TypeOfInvestment,
                                           Priority = rs.Priority,
                                           PermissionMasterId = rs.PermissionMasterId
                                       }).ToListAsync();

                var getRoleAndKpiViewer = getRoleAndSpoc.Union(getViewer);

                return getRoleAndKpiViewer;
            }

            return getRoleAndSpoc;

        }

        

        public class NoPermission
        {
            public string username { get; set; }
            public string roleId { get; set; }
            public string roleName { get; set; }
            public string pageId { get; set; }
            public string pageName { get; set; }
            public string sectionId { get; set; }
            public string sectionName { get; set; }
            public bool? isVisible { get; set; }
            public bool? isEnable { get; set; }  
            public bool? isIndividual { get; set; }
            public string fieldName { get; set; }
            public string parameter01 { get; set; }
            public string parameter02 { get; set; }
            public string parameter03 { get; set; }
            public string parameter04 { get; set; }
            public string parameter05 { get; set; }
            public string parameter06 { get; set; }
            public string parameter07 { get; set; }
            public string parameter08 { get; set; }
            public string parameter09 { get; set; }
            public string parameter10 { get; set; }
            public string parameter11 { get; set; }
            public string parameter12 { get; set; }
            public string parameter13 { get; set; }
            public string parameter14 { get; set; }
            public string parameter15 { get; set; }
            public string parameter16 { get; set; }
            public string parameter17 { get; set; }
            public string parameter18 { get; set; }
            public string parameter19 { get; set; }
            public string parameter20 { get; set; } 

        }
    }
}