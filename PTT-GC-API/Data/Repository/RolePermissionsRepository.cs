using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Dtos.Permission;
using PTT_GC_API.Models.Permission;

namespace PTT_GC_API.Data.Repository
{
    public interface IRolePermissionsRepository
    {
        Task<List<RoleSettingDetail>> GetPermissionsByEmail(string email);
    }
    public class RolePermissionsRepository : IRolePermissionsRepository
    {

        private DataContext _context;
        private readonly IMapper _mapper;

        public RolePermissionsRepository(DataContext context, IMapper mapper)
        {
            this._context = context;
            _mapper = mapper;
        }

        public async Task<List<RoleSettingDetail>> GetPermissionsByEmail(string email)
        {
            var getPermissions = await (from ur in _context.UserRoles
                                        join rp in _context.RolePermission on ur.RoleId equals rp.RoleId.ToString()
                                        join rs in _context.RoleSettingDetail on rp.PermissionMasterId equals rs.PermissionMasterId
                                        join rd in _context.RoleDetailSetting on rp.RoleId equals rd.Id
                                        where ur.Email.ToUpper().Trim().Equals(email.ToUpper().Trim())
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
            //Get KPI Viewer
            var getEditableInform = await _context.InformKri.Where(x => x.Email.ToLower().Equals(email.ToLower())).CountAsync();
            if (getEditableInform > 0)
            {
                var getViewer = await (from rs in _context.RoleSettingDetail
                                       where rs.PageId.Equals("KPI-MAINTAIN-VIEWER") || rs.PageId.Equals("SETTINGTAB")
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



                foreach (var item in getViewer)
                {
                    if (getPermissions.Count(x => x.PageId.Equals(item.PageId)) <= 0)
                    {
                        getPermissions.Add(item);
                    }
                }
                return getPermissions;
            }
            return getPermissions;

        }
    }
}
