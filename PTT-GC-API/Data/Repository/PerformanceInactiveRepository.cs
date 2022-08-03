using Microsoft.EntityFrameworkCore;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.PerformanceInactive;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.PerformanceInactive;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class PerformanceInactiveRepository : PerformanceInactiveInterface
    {
        private readonly DataContext _context;
        public PerformanceInactiveRepository(DataContext context)
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
            return await _context.PerformanceInactive.AnyAsync();
        }

        public async Task<PerformanceInactive> GetPerformanceInactive(int id)
        {
            var PerformanceInactive = await _context.PerformanceInactive.SingleOrDefaultAsync(i => i.PerformanceInactiveId == id);
            return PerformanceInactive;
        }

        public async Task<List<PerformanceInactiveList>> GetPerformanceInactiveSearch(DateTime period)
        {

            DateTime periodNext = new DateTime(period.Year, period.Month + 1, 1);
            DateTime periodNext2 = new DateTime(period.Year, period.Month + 2, 1);
            //var dataReturn = await _context.PerformanceInactive.Where(p => p.FromDate >= period && p.FromDate < periodNext).ToListAsync();
            var data = await _context.PerformanceInactive.Join(_context.Initiatives.Where(i => (i.HistoryFlag == null || i.HistoryFlag == 0)).AsQueryable(),
                                d => d.InitiativeCode,
                                e => e.InitiativeCode,
                                (performanceInactive, initiatives) => new
                                {
                                    PerformanceInactive = performanceInactive,
                                    Initiatives = initiatives
                                }).Where(a => a.PerformanceInactive.FromDate.Value.Date >= periodNext.Date && a.PerformanceInactive.FromDate.Value.Date <= periodNext2.Date).ToListAsync();
            List<PerformanceInactiveList> joinInitiatives = new List<PerformanceInactiveList>();

            for (int i = 0; i < data.Count; i++)
            {
                PerformanceInactive Performance_Inactive = data[i].PerformanceInactive;
                Initiative initiatives = data[i].Initiatives;
                PerformanceInactiveList performanceInactiveList = new PerformanceInactiveList();
                performanceInactiveList.PerformanceInactiveId = Performance_Inactive.PerformanceInactiveId;
                performanceInactiveList.Name = initiatives.Name;
                performanceInactiveList.ProjectEngineer = initiatives.OwnerName;
                performanceInactiveList.InitiativeCode = Performance_Inactive.InitiativeCode;
                performanceInactiveList.POC = Performance_Inactive.POC;
                performanceInactiveList.OutstandingItems = Performance_Inactive.OutstandingItems;
                performanceInactiveList.HighlightWork = Performance_Inactive.HighlightWork;
                performanceInactiveList.CLSD = Performance_Inactive.CLSD;
                performanceInactiveList.BenefitTracking = Performance_Inactive.BenefitTracking;
                performanceInactiveList.FromDate = Performance_Inactive.FromDate;
                performanceInactiveList.ToDate = Performance_Inactive.ToDate;

                joinInitiatives.Add(performanceInactiveList);
            }

            return joinInitiatives;
        }
        public async Task<List<PerformanceInactiveList>> GetPerformanceInactiveAll()
        {
            //var data = await _context.PerformanceInactive.Join(_context.Initiatives,
            //                    d => d.InitiativeCode,
            //                    e => e.InitiativeCode,
            //                    (performanceInactive, initiatives) => new
            //                    {
            //                        PerformanceInactive = performanceInactive,
            //                        Initiatives = initiatives
            //                    }).ToListAsync();
            //List<PerformanceInactiveList> joinInitiatives = new List<PerformanceInactiveList>();

            //for (int i = 0; i < data.Count; i++)
            //{
            //    PerformanceInactive Performance_Inactive = data[i].PerformanceInactive;
            //    Initiative initiatives = data[i].Initiatives;
            //    PerformanceInactiveList performanceInactiveList = new PerformanceInactiveList();
            //    performanceInactiveList.PerformanceInactiveId = Performance_Inactive.PerformanceInactiveId;
            //    performanceInactiveList.Name = initiatives.Name;
            //    performanceInactiveList.ProjectEngineer = initiatives.OwnerName;
            //    performanceInactiveList.InitiativeCode = Performance_Inactive.InitiativeCode;
            //    performanceInactiveList.POC = Performance_Inactive.POC;
            //    performanceInactiveList.OutstandingItems = Performance_Inactive.OutstandingItems;
            //    performanceInactiveList.HighlightWork = Performance_Inactive.HighlightWork;
            //    performanceInactiveList.CLSD = Performance_Inactive.CLSD;
            //    performanceInactiveList.BenefitTracking = Performance_Inactive.BenefitTracking;
            //    performanceInactiveList.FromDate = Performance_Inactive.FromDate;
            //    performanceInactiveList.ToDate = Performance_Inactive.ToDate;

            //    joinInitiatives.Add(performanceInactiveList);
            //}

            //return joinInitiatives;

            var data = await _context.PerformanceInactive.ToListAsync();
            var getCode = data.Select(s => s.InitiativeCode).ToArray();
            var getInitiativeName = await _context.Initiatives.Where(i => getCode.Contains(i.InitiativeCode) && (i.HistoryFlag == null || i.HistoryFlag == 0)).ToListAsync();
            var getProjectEngineer = await _context.DetailInformations.Where(x => getInitiativeName.Select(a => a.Id).Contains(x.InitiativeId)).ToListAsync();

            List<PerformanceInactiveList> joinInitiatives = new List<PerformanceInactiveList>();
            for (int i = 0; i < data.Count; i++)
            {
                PerformanceInactiveList p = new PerformanceInactiveList();
                p.PerformanceInactiveId = data[i].PerformanceInactiveId;
                p.Name = getInitiativeName.Where(n=>n.InitiativeCode == data[i].InitiativeCode && (n.HistoryFlag == null || n.HistoryFlag == 0)).Select(n=>n.Name).FirstOrDefault();
                p.ProjectEngineer = getProjectEngineer.Where(p=>p.InitiativeId == getInitiativeName.Where(n => n.InitiativeCode == data[i].InitiativeCode && (n.HistoryFlag == null || n.HistoryFlag == 0)).Select(n => n.Id).FirstOrDefault()
                ).Select(p=>p.ProjectEngineer).FirstOrDefault();
                p.WbsNo = _context.ProgressHeader.FirstOrDefault(x => x.InitiativeId == _context.Initiatives.FirstOrDefault(e => e.InitiativeCode == data[i].InitiativeCode).Id)?.WbsNo;
                p.InitiativeCode = data[i].InitiativeCode;
                p.POC = data[i].POC;
                p.OutstandingItems = data[i].OutstandingItems;
                p.HighlightWork = data[i].HighlightWork;
                p.CLSD = data[i].CLSD;
                p.BenefitTracking = data[i].BenefitTracking;
                p.FromDate = data[i].FromDate;
                p.ToDate = data[i].ToDate;

                joinInitiatives.Add(p);
            }

            return joinInitiatives;

        }

        public async Task<List<PerformanceInactive>> GetBlogsAsync()
        {
            return await _context.PerformanceInactive.ToListAsync();
        }
        public async Task<int> LastIdPerformanceInactive()
        {
            int id;
            if (_context.PerformanceInactive.Any())
            {
                var max = await _context.PerformanceInactive.OrderByDescending(p => p.PerformanceInactiveId).FirstOrDefaultAsync();
                id = max.PerformanceInactiveId;
            }
            else
            {
                id = 0;
            }
            return id;
        }

        public async Task<PerformanceInactive> LastPerformanceInactive()
        {
            var PerformanceInactive = await _context.PerformanceInactive.OrderByDescending(p => p.PerformanceInactiveId).FirstOrDefaultAsync();
            return PerformanceInactive;
        }

        public async Task<PagedList<PerformanceInactive>> GetPerformanceInactive(PerformanceInactiveParams PerformanceInactiveParams)
        {
            var performance_inactives = _context.PerformanceInactive.AsQueryable();
            performance_inactives = performance_inactives.OrderByDescending(i => i.InitiativeCode);

            return await PagedList<PerformanceInactive>.CreateAsync(performance_inactives, PerformanceInactiveParams.PageNumber, PerformanceInactiveParams.PageSize);
        }

        public async Task<object> GetInitiativeCode()
        {
            //var dataReturn = await _context.Initiatives.Select(p => p.InitiativeCode).ToListAsync();
            var dataReturn = await (from a in _context.Initiatives.Where(i => (i.HistoryFlag == null || i.HistoryFlag == 0))
                                    select new
                                    {
                                        code = a.InitiativeCode,
                                        name = a.Name
                                    }).Take(50).ToListAsync();

            return dataReturn;
        }

        public async Task<object> SearchInitiativeCode(string param)
        {
            if (param == null)
            {
                var initiatives = await _context.Initiatives.Where(i => (i.HistoryFlag == null || i.HistoryFlag == 0)).OrderByDescending(i => i.Id)
                    .Select(s => new { code = s.InitiativeCode, name = s.Name }).Take(20).ToListAsync();
                return initiatives;
            }

            if (param.Length > 0)
            {
                var initiatives = await _context.Initiatives.Where(s => s.InitiativeCode.Contains(param) && (s.HistoryFlag == null || s.HistoryFlag == 0))
                    .Select(s=> new { code = s.InitiativeCode, name = s.Name }).Take(20).ToListAsync();
                return initiatives;
            }
            else
            {
                var initiatives = await _context.Initiatives.Where(i => (i.HistoryFlag == null || i.HistoryFlag == 0)).OrderByDescending(i => i.Id)
                    .Select(s => new { code = s.InitiativeCode, name = s.Name }).Take(20).ToListAsync();
                return initiatives;
            }
        }
    }
}
