using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.EnvironmentProjectType;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class EnvironmentProjectTypeRepository : EnvironmentProjectTypeInterface
    {
        private readonly DataContext _context;
        public EnvironmentProjectTypeRepository(DataContext context)
        {
            _context = context;
        }

        public async void Add<T>(T entity) where T : class
        {
            await _context.AddAsync(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Any()
        {
            return await _context.EnvironmentProjectType.AnyAsync();
        }

        public async Task<EnvironmentProjectType> GetLookBack(int id)
        {
            var LookBack = await _context.EnvironmentProjectType.SingleOrDefaultAsync(i => i.EnviTypeId == id);
            return LookBack;
        }

        public async Task<List<EnvironmentProjectType>> GetBlogsAsync()
        {
            return await _context.EnvironmentProjectType.ToListAsync();
        }
        public async Task<int> LastIdEnvironmentProjectType()
        {
            int id;
            if (_context.EnvironmentProjectType.Any())
            {
                var max = await _context.EnvironmentProjectType.OrderByDescending(p => p.EnviTypeId).FirstOrDefaultAsync();
                id = max.EnviTypeId;
            }
            else
            {
                id = 0;
            }
            return id;
        }

        public async Task<EnvironmentProjectType> LastEnvironmentProjectType()
        {
            var EnvironmentProjectType = await _context.EnvironmentProjectType.OrderByDescending(p => p.EnviTypeId).FirstOrDefaultAsync();
            return EnvironmentProjectType;
        }


        public async Task<List<EnvironmentProjectTypeList>> GetEnvironmentProjectTypeListAll()
        {
            var data = await _context.EnvironmentProjectType.OrderByDescending(i => i.EnviTypeId).ToListAsync();
            List<EnvironmentProjectTypeList> joinInitiatives = new List<EnvironmentProjectTypeList>();
            for (int i = 0; i < data.Count; i++)
            {
                EnvironmentProjectTypeList ClsEnvironmentProjectType = new EnvironmentProjectTypeList();
                ClsEnvironmentProjectType.EnviTypeId = data[i].EnviTypeId;
                ClsEnvironmentProjectType.ProjectLookbackId = data[i].ProjectLookbackId;
                ClsEnvironmentProjectType.EnviType = data[i].EnviType;
                ClsEnvironmentProjectType.EnviTypeValue = data[i].EnviTypeValue;
                joinInitiatives.Add(ClsEnvironmentProjectType);
            }
            return joinInitiatives;
        }

        public async Task<EnvironmentProjectType> GetEnvironmentProjectTypeByID(int id)
        {
            var EnvironmentProjectType = await _context.EnvironmentProjectType.SingleOrDefaultAsync(i => i.EnviTypeId == id);
            return EnvironmentProjectType;
        }
        public async Task<EnvironmentProjectType> GetEnvironmentProjectTypeByProjectLookbackId(int ProjectLookbackId)
        {
            var EnvironmentProjectType = await _context.EnvironmentProjectType.SingleOrDefaultAsync(i => i.ProjectLookbackId == ProjectLookbackId);
            return EnvironmentProjectType;
        }

        public async Task<List<EnvironmentProjectTypeList>> GetEnvironmentProjectTypeListAllProjectLookbackId(int id, string Type)
        {
            var data = await _context.EnvironmentProjectType.Where(i => i.ProjectLookbackId == id && i.EnviType == Type).ToListAsync();
            List<EnvironmentProjectTypeList> joinInitiatives = new List<EnvironmentProjectTypeList>();
            for (int i = 0; i < data.Count; i++)
            {
                EnvironmentProjectTypeList ClsEnvironmentProjectType = new EnvironmentProjectTypeList();
                ClsEnvironmentProjectType.EnviTypeId = data[i].EnviTypeId;
                ClsEnvironmentProjectType.ProjectLookbackId = data[i].ProjectLookbackId;
                ClsEnvironmentProjectType.EnviType = data[i].EnviType;
                ClsEnvironmentProjectType.EnviTypeValue = data[i].EnviTypeValue;
                joinInitiatives.Add(ClsEnvironmentProjectType);
            }
            return joinInitiatives;
        }


        public async Task<List<EnvironmentProjectTypeList>> GetEnvironmentProjectTypeAllByProjectLookbackId(int id)
        {
            var data = await _context.EnvironmentProjectType.Where(i => i.ProjectLookbackId == id).ToListAsync();
            List<EnvironmentProjectTypeList> joinInitiatives = new List<EnvironmentProjectTypeList>();
            for (int i = 0; i < data.Count; i++)
            {
                EnvironmentProjectTypeList ClsEnvironmentProjectType = new EnvironmentProjectTypeList();
                ClsEnvironmentProjectType.EnviTypeId = data[i].EnviTypeId;
                ClsEnvironmentProjectType.ProjectLookbackId = data[i].ProjectLookbackId;
                ClsEnvironmentProjectType.EnviType = data[i].EnviType;
                ClsEnvironmentProjectType.EnviTypeValue = data[i].EnviTypeValue;
                joinInitiatives.Add(ClsEnvironmentProjectType);
            }
            return joinInitiatives;
        }

        public async Task<bool> GetEnvironmentProjectTypeByIdThenDelete(int id)
        {
            bool strRet = false;
            try
            {
                var environmentProjectTypesAll = _context.EnvironmentProjectType.Where(x => x.ProjectLookbackId == id).ToList();
                foreach (var item in environmentProjectTypesAll)
                {
                    _context.Remove(item);
                }
                await _context.SaveChangesAsync();
                strRet = true;
            }
            catch(Exception e)
            {
            }            

            return strRet;
        }

    }

}