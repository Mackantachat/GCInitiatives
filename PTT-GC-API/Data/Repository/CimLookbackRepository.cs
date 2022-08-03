using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.CimLookback;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class CimLookbackRepository : CimLookbackInterface
    {
        private readonly DataContext _context;
        public CimLookbackRepository(DataContext context)
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
            return await _context.CimLookback.AnyAsync();
        }

        public async Task<CimLookback> GetLookBack(int id)
        {
            var LookBack = await _context.CimLookback.SingleOrDefaultAsync(i => i.CimLookbackId == id);
            return LookBack;
        }

        public async Task<List<CimLookback>> GetBlogsAsync()
        {
            return await _context.CimLookback.ToListAsync();
        }
        public async Task<int> LastIdLookBack()
        {
            int id;
            if (_context.CimLookback.Any())
            {
                var max = await _context.CimLookback.OrderByDescending(p => p.CimLookbackId).FirstOrDefaultAsync();
                id = max.CimLookbackId;
            }
            else
            {
                id = 0;
            }
            return id;
        }

        public async Task<CimLookback> LastLookBack()
        {
            var LookBack = await _context.CimLookback.OrderByDescending(p => p.CimLookbackId).FirstOrDefaultAsync();
            return LookBack;
        }


        public async Task<List<CimLookbackList>> GetCimLookbackAll()
        {
            var dataCimLookback = await _context.CimLookback.OrderByDescending(i => i.ProjectLookbackId).ToListAsync();
            List<CimLookbackList> joinInitiatives = new List<CimLookbackList>();
            for (int i = 0; i < dataCimLookback.Count; i++)
            {
                CimLookbackList cimLookbackParam = new CimLookbackList();
                cimLookbackParam.CimLookbackId = dataCimLookback[i].CimLookbackId;
                cimLookbackParam.ProjectLookbackId = dataCimLookback[i].ProjectLookbackId;
                cimLookbackParam.CimLookbackType = dataCimLookback[i].CimLookbackType;
                cimLookbackParam.Aspect = dataCimLookback[i].Aspect;
                cimLookbackParam.Approve = dataCimLookback[i].Approve;
                cimLookbackParam.Actual = dataCimLookback[i].Actual;
                cimLookbackParam.DifferenceNote = dataCimLookback[i].DifferenceNote;
                cimLookbackParam.BusinessPlan = dataCimLookback[i].BusinessPlan;
                cimLookbackParam.ResponsiblePerson = dataCimLookback[i].ResponsiblePerson;
                joinInitiatives.Add(cimLookbackParam);
            }
            return joinInitiatives;
        }

        public async Task<List<CimLookback>> GetLookbackCimListByProjectId(int id)
        {
            var dataCimLookback = await _context.CimLookback.Where(i => i.ProjectLookbackId == id).ToListAsync();
            //List<CimLookbackList> joinInitiatives = new List<CimLookbackList>();
            //for (int i = 0; i < dataCimLookback.Count; i++)
            //{
            //    CimLookbackList cimLookbackParam = new CimLookbackList();
            //    cimLookbackParam.CimLookbackId = dataCimLookback[i].CimLookbackId;
            //    cimLookbackParam.ProjectLookbackId = dataCimLookback[i].ProjectLookbackId;
            //    cimLookbackParam.CimLookbackType = dataCimLookback[i].CimLookbackType;
            //    cimLookbackParam.Aspect = dataCimLookback[i].Aspect;
            //    cimLookbackParam.Approve = dataCimLookback[i].Approve;
            //    cimLookbackParam.Actual = dataCimLookback[i].Actual;
            //    cimLookbackParam.DifferenceNote = dataCimLookback[i].DifferenceNote;
            //    cimLookbackParam.BusinessPlan = dataCimLookback[i].BusinessPlan;
            //    cimLookbackParam.ResponsiblePerson = dataCimLookback[i].ResponsiblePerson;
            //    joinInitiatives.Add(cimLookbackParam);
            //}
            return dataCimLookback;
        }

        public async Task<CimLookback> GetCimLookbackByID(int id)
        {
            var CimLookback = await _context.CimLookback.SingleOrDefaultAsync(i => i.CimLookbackId == id);
            return CimLookback;
        }
    }
}