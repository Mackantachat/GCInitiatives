using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ExecutionLookback;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class ExecutionLookbackRepository : ExecutionLookbackInterface
    {
        private readonly DataContext _context;
        public ExecutionLookbackRepository(DataContext context)
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
            return await _context.ExecutionLookback.AnyAsync();
        }

        public async Task<ExecutionLookback> GetLookBack(int id)
        {
            var LookBack = await _context.ExecutionLookback.SingleOrDefaultAsync(i => i.ExecutionLookbackId == id);
            return LookBack;
        }

        public async Task<List<ExecutionLookback>> GetBlogsAsync()
        {
            return await _context.ExecutionLookback.ToListAsync();
        }
        public async Task<int> LastIdLookBack()
        {
            int id;
            if (_context.ExecutionLookback.Any())
            {
                var max = await _context.ExecutionLookback.OrderByDescending(p => p.ExecutionLookbackId).FirstOrDefaultAsync();
                id = max.ExecutionLookbackId;
            }
            else
            {
                id = 0;
            }
            return id;
        }

        public async Task<ExecutionLookback> LastLookBack()
        {
            var LookBack = await _context.ExecutionLookback.OrderByDescending(p => p.ExecutionLookbackId).FirstOrDefaultAsync();
            return LookBack;
        }


        public async Task<List<ExecutionLookbackList>> GetExecutionLookbackAll()
        {
            var dataExecutionLookback = await _context.ExecutionLookback.OrderByDescending(i => i.ProjectLookbackId).ToListAsync();
            List<ExecutionLookbackList> joinInitiatives = new List<ExecutionLookbackList>();
            for (int i = 0; i < dataExecutionLookback.Count; i++)
            {
                ExecutionLookbackList executionLookbackParam = new ExecutionLookbackList();
                executionLookbackParam.ExecutionLookbackId = dataExecutionLookback[i].ExecutionLookbackId;
                executionLookbackParam.ProjectLookbackId = dataExecutionLookback[i].ProjectLookbackId;
                executionLookbackParam.KnowledgeArea = dataExecutionLookback[i].KnowledgeArea;
                executionLookbackParam.Plan = dataExecutionLookback[i].Plan;
                executionLookbackParam.Actual = dataExecutionLookback[i].Actual;
                executionLookbackParam.Issue = dataExecutionLookback[i].Issue;
                executionLookbackParam.Background = dataExecutionLookback[i].Background;
                executionLookbackParam.LessonLearned = dataExecutionLookback[i].LessonLearned;
                executionLookbackParam.Remark = dataExecutionLookback[i].Remark;
                executionLookbackParam.Comment = dataExecutionLookback[i].Comment;
                joinInitiatives.Add(executionLookbackParam);
            }
            return joinInitiatives;
        }

        public async Task<ExecutionLookback> GetExecutionLookbackByID(int id)
        {
            var ExecutionLookback = await _context.ExecutionLookback.SingleOrDefaultAsync(i => i.ExecutionLookbackId == id);
            return ExecutionLookback;
        }
    }
}
