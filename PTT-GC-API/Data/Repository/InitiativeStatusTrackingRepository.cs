using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class InitiativeStatusTrackingRepository : InitiativeStatusTrackingInterface
    {
        private readonly DataContext _context;
        public InitiativeStatusTrackingRepository(DataContext context)
        {
            _context = context;
        }
        public async void Add<T>(T entity) where T : class
        {
            await _context.AddAsync(entity);
        }

        public async Task<bool> Any()
        {
            return await _context.InitiativeStatusTrackings.AnyAsync();
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> Save()
        {
           return await _context.SaveChangesAsync() > 0;
        }

        public void Update<T>(T entity) where T : class
        {
           _context.Update(entity);
        }

        public async Task<int> LastHistoryId(int id)
        {
            if (await Any() == false)
            {
                return 1;
            }
            var initiativeStatusTracking = await _context.InitiativeStatusTrackings.Where(i=>i.InitiativeId == id).OrderByDescending(p => p.HistoryId).FirstOrDefaultAsync();
            return initiativeStatusTracking.HistoryId + 1;
        }

        public async void AddInitiativeStatusTracking(InitiativeStatusTracking initiativeStatusTracking)
        {
            await _context.InitiativeStatusTrackings.AddAsync(initiativeStatusTracking);
        }

        public async Task<bool> CreateInitiativeStatusTrackings(InitiativeStatusTracking[] initiativeStatusTrackings)
        {
            foreach(InitiativeStatusTracking initiativeStatusTracking in initiativeStatusTrackings)
            {
                await _context.InitiativeStatusTrackings.AddAsync(initiativeStatusTracking);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<int> RemoveInitiativeStatusTrackingByInitiativeId(int initiativeId)
        {
            var _statusTrackings =await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeId).ToListAsync();
            foreach (var entity in _statusTrackings)
                _context.InitiativeStatusTrackings.Remove(entity);
            return await _context.SaveChangesAsync();
        }
    }
}
