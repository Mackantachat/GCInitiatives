using Microsoft.EntityFrameworkCore;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Master;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Permission;
using PTT_GC_API.Models.Role;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class MasterRepository : MasterDataInterface
    {
        private readonly DataContext _context;
        public MasterRepository(DataContext context)
        {
            _context = context;
        }

        public async void Add<T>(T entity) where T : class
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(entity, "Master-26", SQLCommandType.INSERT, false);
            // End log
            await _context.AddAsync(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(entity, "Master-34", SQLCommandType.UPDATE, false);
            // End log
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(entity, "Master-42", SQLCommandType.DELETE, false);
            // End log
            _context.Remove(entity);
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Any()
        {
            return await _context.Initiatives.AnyAsync();
        }

        //public async Task<PagedList<Models.Role.UserManagement>> GetOwner(PagingParam Params)
        //{
        //    var OwnerList = _context.UserManagement.AsQueryable();
        //    return await PagedList<Models.Role.UserManagement>.CreateAsync(OwnerList, 1, 50);
        //}

        //public async Task<PagedList<Models.Role.Action>> GetAction(PagingParam Params)
        //{
        //    var ActionList = _context.Action.AsQueryable();
        //    return await PagedList<Models.Role.Action>.CreateAsync(ActionList, 1, 50);
        //}

        //public async Task<PagedList<RoleDetailSetting>> GetRoleDetail(PagingParam Params)
        //{
        //    var RoleList = _context.RoleDetailSetting.AsQueryable();
        //    return await PagedList<RoleDetailSetting>.CreateAsync(RoleList, 1, 50);
        //}

        public async Task<RoleMasterModel> GetRoleDetailById(int Params)
        {
            var detail = await _context.RoleDetailSetting
                .Where(x => x.Id == Params)
                .FirstOrDefaultAsync();

            // var screenAction = await _context.RoleScreen.Where(x => x.RoleId == Params).ToListAsync();
            //var groupScreenAction = screenAction.GroupBy(g => g.ScreenObjectId).ToList();

            //var result = new RoleDetail()
            //{
            //    Id = detail.Id,
            //    RoleId = detail.RoleId,
            //    RoleName = detail.RoleName,
            //    Description = detail.Description,
            //    IsActive = detail.IsActive,
            //    //Item = groupScreenAction.Select(s => new RoleGroupItem
            //    //{
            //    //    ScreenObject = s.Key,
            //    //    Action = s.Select(s => s.ActionId).ToArray()
            //    //}).ToArray()
            //};

            var rolePermission = await _context.RolePermission.Where(x => x.RoleId == Params).ToArrayAsync();

            var result = new RoleMasterModel()
            {
                Id = detail.Id,
                RoleId = detail.RoleId,
                RoleName = detail.RoleName,
                Description = detail.Description,
                IsActive = detail.IsActive,
                RolePermissionModel = rolePermission.Select(s => new RolePermissionModel
                {
                    RoleId = s.RoleId,
                    PermissionMasterId = s.PermissionMasterId
                }).ToList()
                //RolePermissionModel = null
            };

            return result;
        }

        public async Task<PagedList<PermissionMaster>> GetPermissionMaster(PagingParam Params)
        {
            var ScreenObject = _context.PermissionMaster.AsQueryable();
            return await PagedList<PermissionMaster>.CreateAsync(ScreenObject, 1, 1000);
        }

        public async Task<PagedList<ScreenObject>> GetScreenObject(PagingParam Params)
        {
            var ScreenObject = _context.ScreenObject.AsQueryable();
            return await PagedList<ScreenObject>.CreateAsync(ScreenObject, 1, 50);
        }

        public async Task<PagedList<UserRole>> GetUserRole(string email)
        {
            var Result = _context.UserRoles.AsQueryable();
            return await PagedList<UserRole>.CreateAsync(Result, 1, 50);
        }

        public async Task<PagedList<BU>> GetBU()
        {
            var Result = _context.BU.AsQueryable();
            return await PagedList<BU>.CreateAsync(Result, 1, 50);
        }

        public async Task<PagedList<Position>> GetPosition()
        {
            var Result = _context.Position.AsQueryable();
            return await PagedList<Position>.CreateAsync(Result, 1, 50);
        }

        public async Task<PagedList<WorkStream2>> GetWorkStream()
        {
            var Result = _context.WorkStream2.AsQueryable();
            return await PagedList<WorkStream2>.CreateAsync(Result, 1, 50);
        }

        //public async Task<PagedList<PoolType>> GetPoolType()
        //{
        //    var Result = _context.PoolType.AsQueryable();
        //    return await PagedList<PoolType>.CreateAsync(Result, 1, 50);
        //}

        //public async Task<PagedList<Company>> GetCompany()
        //{
        //    var Result = _context.Company.AsQueryable();
        //    return await PagedList<Company>.CreateAsync(Result, 1, 50);
        //}


        //public async Task<PagedList<StateGate>> GetStateGate()
        //{
        //    var Result = _context.StateGate.AsQueryable();
        //    return await PagedList<StateGate>.CreateAsync(Result, 1, 50);
        //}

        public async Task<List<RoleScreen>> CreateRoleDetail(RoleDetail Params)
        {
            var detail = await _context.RoleDetailSetting
                .Where(x => x.RoleId == Params.RoleId)
                .FirstOrDefaultAsync();

            if (detail != null)
                return null;

            var roleDetail = new RoleDetailSetting()
            {
                RoleId = Params.RoleId,
                RoleName = Params.RoleName,
                Description = Params.Description,
                IsActive = Params.IsActive
            };

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(roleDetail, "Master-191", SQLCommandType.INSERT, false);
            // End log
            _context.RoleDetailSetting.Add(roleDetail);

            var listItem = new List<RoleScreen>();
            foreach (var param in Params.Item)
            {
                if (!string.IsNullOrEmpty(param.ScreenObject))
                {
                    var ScreenObject = await _context.RoleScreen.Where(x => x.ScreenObjectId == param.ScreenObject).ToListAsync();
                    if (ScreenObject != null && ScreenObject.Count > 0)
                    {
                        // Temporary Log for Invetigate 2021-07-13
                        LogInsight.Log(ScreenObject, "Master-205", SQLCommandType.DELETE, false);
                        // End log
                        _context.RoleScreen.RemoveRange(ScreenObject);

                        if (param.Action != null && param.Action.Length > 0)
                        {
                            foreach (var action in param.Action)
                            {
                                listItem.Add(new RoleScreen()
                                {
                                    RoleId = Params.RoleId,
                                    ScreenObjectId = param.ScreenObject,
                                    ActionId = action
                                });
                            }
                        }
                        else
                        {
                            listItem.Add(new RoleScreen()
                            {
                                RoleId = Params.RoleId,
                                ScreenObjectId = param.ScreenObject,
                                ActionId = null
                            });
                        }
                    }
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(listItem, "Master-231", SQLCommandType.INSERT, false);
                    // End log
                    _context.RoleScreen.AddRange(listItem);
                }
            }

            _context.SaveChanges();

            return listItem;
        }
        public async Task<List<RoleMasterModel>> SaveRoleDetail(RoleMasterModel Params)
        {
            if(Params.Id == 0)
            {
                RoleDetailSetting rd = new RoleDetailSetting();
                rd.RoleName = Params.RoleName;
                rd.Description = Params.Description;
                rd.IsActive = Params.IsActive;
                _context.RoleDetailSetting.Add(rd);
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(rd, "Master-251", SQLCommandType.INSERT, false);
                // End log
                _context.SaveChanges();

                // var detail = await _context.RoleDetailSetting.Where(x => x.Id == Params.Id).FirstOrDefaultAsync();
                // get Lastest Id
                var getLastId = await _context.RoleDetailSetting.OrderByDescending(x => x.Id).Select(x => x.Id).FirstOrDefaultAsync();

                List<RolePermission> listItem = new List<RolePermission>();

                if(Params.RolePermissionModel != null)
                {
                    foreach (var p in Params.RolePermissionModel)
                    {
                        listItem.Add(new RolePermission() { RoleId = getLastId, PermissionMasterId = p.PermissionMasterId });
                    }
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(listItem, "Master-268", SQLCommandType.INSERT, false);
                    // End log
                    _context.RolePermission.AddRange(listItem);
                }

                _context.SaveChanges();

            }
            else
            {
                var detail = await _context.RoleDetailSetting.Where(x => x.Id == Params.Id).FirstOrDefaultAsync();

                detail.RoleId = Params.RoleId;
                detail.RoleName = Params.RoleName;
                detail.Description = Params.Description;
                detail.IsActive = Params.IsActive;

                var listPermission = await _context.RolePermission.Where(x => x.RoleId == Params.Id).ToListAsync();
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(listPermission, "Master-287", SQLCommandType.DELETE, false);
                // End log
                _context.RemoveRange(listPermission);

                List<RolePermission> listItem = new List<RolePermission>();
                if (Params.RolePermissionModel != null)
                {
                    foreach (var p in Params.RolePermissionModel)
                    {
                        listItem.Add(new RolePermission() { RoleId = p.RoleId, PermissionMasterId = p.PermissionMasterId });
                    }
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(listItem, "Master-299", SQLCommandType.INSERT, false);
                    // End log
                    _context.RolePermission.AddRange(listItem);
                }

                _context.SaveChanges();
            }

           

            return null;
        }



        public async Task<PagedList<Models.Role.Action>> GetAction(PagingParam Params)
        {
            var ActionList = _context.Action.AsQueryable().OrderBy(r => r.ActionName);
            return await PagedList<Models.Role.Action>.CreateAsync(ActionList, 1, 5000);
        }

        public async Task<PagedList<RoleDetailSetting>> GetRoleDetail(PagingParam Params)
        {
            var RoleList = _context.RoleDetailSetting.AsQueryable().OrderBy(r => r.RoleName);
            return await PagedList<RoleDetailSetting>.CreateAsync(RoleList, 1, 5000);
        }


        public async Task<PagedList<Models.Role.UserManagement2>> GetOwner(PagingParam Params)
        {
            var OwnerList = _context.UserManagement2.AsQueryable().OrderBy(r => r.FirstName);
            return await PagedList<Models.Role.UserManagement2>.CreateAsync(OwnerList, 1, 5000);
        }


    }
}
