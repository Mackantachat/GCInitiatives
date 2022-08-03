using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ProjectImpact;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class ProjectImpactRepository : ProjectImpactInterface
    {
        private readonly DataContext _context;
        public ProjectImpactRepository(DataContext context)
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
            return await _context.ProjectImpact.AnyAsync();
        }

        public async Task<ProjectImpact> GetLookBack(int id)
        {
            var LookBack = await _context.ProjectImpact.SingleOrDefaultAsync(i => i.ProjectImpactId == id);
            return LookBack;
        }

        public async Task<List<ProjectImpact>> GetBlogsAsync()
        {
            return await _context.ProjectImpact.ToListAsync();
        }
        public async Task<int> LastIdLookBack()
        {
            int id;
            if (_context.ProjectImpact.Any())
            {
                var max = await _context.ProjectImpact.OrderByDescending(p => p.ProjectImpactId).FirstOrDefaultAsync();
                id = max.ProjectImpactId;
            }
            else
            {
                id = 0;
            }
            return id;
        }

        public async Task<ProjectImpact> LastLookBack()
        {
            var LookBack = await _context.ProjectImpact.OrderByDescending(p => p.ProjectImpactId).FirstOrDefaultAsync();
            return LookBack;
        }


        public async Task<List<ProjectImpactList>> GetProjectImpactAll()
        {
            var data = await _context.ProjectImpact.OrderByDescending(i => i.ProjectLookbackId).ToListAsync();
            List<ProjectImpactList> joinInitiatives = new List<ProjectImpactList>();
            for (int i = 0; i < data.Count; i++)
            {
                ProjectImpactList projectImpactParam = new ProjectImpactList();
                projectImpactParam.ProjectImpactId = data[i].ProjectImpactId;
                projectImpactParam.ProjectLookbackId = data[i].ProjectLookbackId;
                projectImpactParam.Situation = data[i].Situation;
                projectImpactParam.Before = data[i].Before;
                projectImpactParam.Target = data[i].Target;
                projectImpactParam.After = data[i].After;
                joinInitiatives.Add(projectImpactParam);
            }
            return joinInitiatives;
        }

        public async Task<ProjectImpact> GetProjectImpactByID(int id)
        {
            var ProjectImpact = await _context.ProjectImpact.SingleOrDefaultAsync(i => i.ProjectImpactId == id);
            return ProjectImpact;
        }
    }
}
