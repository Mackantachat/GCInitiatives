using Microsoft.EntityFrameworkCore;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Setting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class SettingRepository : SettingInterface
    {

        private readonly DataContext _context;
        public SettingRepository(DataContext context)
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
            return await _context.Setting.AnyAsync();
        }

        public async Task<Setting> GetSetting(int id)
        {
            var Setting = await _context.Setting.SingleOrDefaultAsync(i => i.SettingId == id);
            return Setting;
        }

        public async Task<Setting> GetSettingSearch(int id)
        {
            var Setting = await _context.Setting.SingleOrDefaultAsync(i => i.SettingId == id);
            return Setting;
        }

        public async Task<int> LastIdSetting()
        {
            int id;
            if (_context.Setting.Any())
            {
                var max = await _context.Setting.OrderByDescending(p => p.SettingId).FirstOrDefaultAsync();
                id = max.SettingId;
            }
            else
            {
                id = 0;
            }
            return id;
        }

        public async Task<Setting> LastSetting()
        {
            var Setting = await _context.Setting.OrderByDescending(p => p.SettingId).FirstOrDefaultAsync();
            return Setting;
        }

        public async Task<PagedList<Setting>> GetSetting(SettingParams SettingParams)
        {
            var performance_inactives = _context.Setting.AsQueryable();
            performance_inactives = performance_inactives.OrderByDescending(i => i.SettingId);

            return await PagedList<Setting>.CreateAsync(performance_inactives, SettingParams.PageNumber, SettingParams.PageSize);
        }
        public async Task<Setting> GetInitiativeSetting()
        {
            var setting = await _context.Setting.OrderByDescending(i => i.SettingId).FirstOrDefaultAsync();
            return setting;
        }

        public Task<PagedList<Setting>> GetSettings(SettingParams SettingParams)
        {
            throw new NotImplementedException();
        }
    }
}
