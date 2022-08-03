using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ProjectImpactWork;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class ProjectImpactWorkRepository : ProjectImpactWorkInterface
    {
        private readonly DataContext _context;
        public ProjectImpactWorkRepository(DataContext context)
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
            return await _context.ProjectImpactWork.AnyAsync();
        }

        public async Task<ProjectImpactWork> GetLookBack(int id)
        {
            var LookBack = await _context.ProjectImpactWork.SingleOrDefaultAsync(i => i.ProjectImpactWorkId == id);
            return LookBack;
        }

        public async Task<List<ProjectImpactWork>> GetBlogsAsync()
        {
            return await _context.ProjectImpactWork.ToListAsync();
        }
        public async Task<int> LastIdLookBack()
        {
            int id;
            if (_context.ProjectImpactWork.Any())
            {
                var max = await _context.ProjectImpactWork.OrderByDescending(p => p.ProjectImpactWorkId).FirstOrDefaultAsync();
                id = max.ProjectImpactWorkId;
            }
            else
            {
                id = 0;
            }
            return id;
        }

        public async Task<ProjectImpactWork> LastLookBack()
        {
            var LookBack = await _context.ProjectImpactWork.OrderByDescending(p => p.ProjectImpactWorkId).FirstOrDefaultAsync();
            return LookBack;
        }


        public async Task<List<ProjectImpactWorkList>> GetProjectImpactWorkAll()
        {
            var data = await _context.ProjectImpactWork.OrderByDescending(i => i.ProjectLookbackId).ToListAsync();
            List<ProjectImpactWorkList> jsonProjectImpactWorkList = new List<ProjectImpactWorkList>();
            for (int i = 0; i < data.Count; i++)
            {
                ProjectImpactWorkList projectImpactWorkParam = new ProjectImpactWorkList();
                projectImpactWorkParam.ProjectImpactWorkId = data[i].ProjectImpactWorkId;
                projectImpactWorkParam.ProjectLookbackId = data[i].ProjectLookbackId;
                projectImpactWorkParam.WhatWorked = data[i].WhatWorked;
                projectImpactWorkParam.WhatDidNotWork = data[i].WhatDidNotWork;
                jsonProjectImpactWorkList.Add(projectImpactWorkParam);
            }
            return jsonProjectImpactWorkList;
        }

        public async Task<ProjectImpactWork> GetProjectImpactWorkByID(int id)
        {
            var ProjectImpactWork = await _context.ProjectImpactWork.SingleOrDefaultAsync(i => i.ProjectImpactWorkId == id);
            return ProjectImpactWork;
        }
    }
}
