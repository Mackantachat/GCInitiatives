using Microsoft.EntityFrameworkCore;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.CoreUplift;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class CoreUpliftRepository : CoreUpliftInterface
    {
        private readonly DataContext _context;
        public CoreUpliftRepository(DataContext context)
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
            return await _context.CoreUplift.AnyAsync();
        }

        public async Task<CoreUplift> GetLookBack(int id)
        {
            var LookBack = await _context.CoreUplift.SingleOrDefaultAsync(i => i.CoreUpliftId == id);
            return LookBack;
        }

        public async Task<List<CoreUplift>> GetBlogsAsync()
        {
            return await _context.CoreUplift.ToListAsync();
        }
        public async Task<int> LastIdLookBack()
        {
            int id;
            if (_context.CoreUplift.Any())
            {
                var max = await _context.CoreUplift.OrderByDescending(p => p.CoreUpliftId).FirstOrDefaultAsync();
                id = max.CoreUpliftId;
            }
            else
            {
                id = 0;
            }
            return id;
        }

        public async Task<CoreUplift> LastLookBack()
        {
            var LookBack = await _context.CoreUplift.OrderByDescending(p => p.CoreUpliftId).FirstOrDefaultAsync();
            return LookBack;
        }


        public async Task<List<CoreUpliftList>> GetCoreUpliftAll()
        {
            var data = await _context.CoreUplift.OrderByDescending(i => i.ProjectLookbackId).ToListAsync();
            List<CoreUpliftList> joinInitiatives = new List<CoreUpliftList>();
            for (int i = 0; i < data.Count; i++)
            {
                CoreUpliftList ClscoreUplift = new CoreUpliftList();
                ClscoreUplift.CoreUpliftId = data[i].CoreUpliftId;
                ClscoreUplift.ProjectLookbackId = data[i].ProjectLookbackId;
                ClscoreUplift.Economics = data[i].Economics;
                ClscoreUplift.EstimatedPlaned = data[i].EstimatedPlaned;
                ClscoreUplift.Actual = data[i].Actual;
                ClscoreUplift.WhyDifference = data[i].WhyDifference;
                ClscoreUplift.Remark = data[i].Remark;
                ClscoreUplift.Comment = data[i].Comment;
                joinInitiatives.Add(ClscoreUplift);
            }
            return joinInitiatives;
        }

        public async Task<CoreUplift> GetCoreUpliftByID(int id)
        {
            var CoreUplift = await _context.CoreUplift.SingleOrDefaultAsync(i => i.CoreUpliftId == id);
            return CoreUplift;
        }
    }
}
