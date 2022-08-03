using Microsoft.EntityFrameworkCore;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.LookbackReview;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class LookbackReviewRepository : LookbackReviewInterface
    {
        private readonly DataContext _context;
        public LookbackReviewRepository(DataContext context)
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
            return await _context.LookbackReview.AnyAsync();
        }

        public async Task<LookbackReview> GetLookBack(int id)
        {
            var LookBack = await _context.LookbackReview.SingleOrDefaultAsync(i => i.LookbackReviewId == id);
            return LookBack;
        }

        public async Task<List<LookbackReview>> GetBlogsAsync()
        {
            return await _context.LookbackReview.ToListAsync();
        }
        public async Task<int> LastIdLookBack()
        {
            int id;
            if (_context.LookbackReview.Any())
            {
                var max = await _context.LookbackReview.OrderByDescending(p => p.LookbackReviewId).FirstOrDefaultAsync();
                id = max.LookbackReviewId;
            }
            else
            {
                id = 0;
            }
            return id;
        }

        public async Task<LookbackReview> LastLookBack()
        {
            var LookBack = await _context.LookbackReview.OrderByDescending(p => p.LookbackReviewId).FirstOrDefaultAsync();
            return LookBack;
        }

        public async Task<PagedList<LookbackReview>> GetLookBack(LookbackReviewParams LookbackReviewParams)
        {
            var performance_inactives = _context.LookbackReview.AsQueryable();
            performance_inactives = performance_inactives.OrderByDescending(i => i.ProjectLookbackId);

            return await PagedList<LookbackReview>.CreateAsync(performance_inactives, LookbackReviewParams.PageNumber, LookbackReviewParams.PageSize);
        }

        public Task<LookbackReview> LastLookbackReview()
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<LookbackReview>> GetLookbackReview(LookbackReviewParams LookbackReviewParams)
        {
            throw new NotImplementedException();
        }

        public Task<LookbackReview> GetLookbackReview(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<LookbackReviewList>>  GetLookbackReviewAll()
        {
            var data = await _context.LookbackReview.OrderByDescending(i => i.ProjectLookbackId).ToListAsync();
            List<LookbackReviewList> joinInitiatives = new List<LookbackReviewList>();
            for (int i = 0; i < data.Count; i++)
            {
                LookbackReviewList lookbackReviewParam = new LookbackReviewList();
                lookbackReviewParam.LookbackReviewId = data[i].LookbackReviewId;
                lookbackReviewParam.ProjectLookbackId = data[i].ProjectLookbackId;
                lookbackReviewParam.ProjectReviewTeam = data[i].ProjectReviewTeam;
                joinInitiatives.Add(lookbackReviewParam);
            }
            return joinInitiatives;
        }

        public async Task<LookbackReview> GetLookbackReviewByID(int id)
        {
            var LookbackReview = await _context.LookbackReview.SingleOrDefaultAsync(i => i.LookbackReviewId == id);
            return LookbackReview;
        }
    }
}
