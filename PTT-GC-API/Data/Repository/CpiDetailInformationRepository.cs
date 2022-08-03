using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.CpiDetailInformationDtos;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.CpiDetailInformationData;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.ProgressAndMilestone;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class CpiDetailInformationRepository : ICpiDetailInformationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CpiDetailInformationRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public int DeleteCpiDetailInformation(int initiativeId)
        {
            var removeCpi = _context.NewDetailInformations.FirstOrDefault(x => x.InitiativeId == initiativeId);
            var removeKpi = _context.CpiKpis.Where(x => x.InitiativeId == initiativeId).ToList();
            var removemilestone = _context.Milestones.Where(x => x.InitiativeId == initiativeId).ToList();

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(removeCpi, "CpiDetailInformationRepository-35", SQLCommandType.DELETE, false);
            // End log

            _context.NewDetailInformations.Remove(removeCpi);
            _context.CpiKpis.RemoveRange(removeKpi);
            _context.Milestones.RemoveRange(removemilestone);


            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(removeCpi, "CpiDetailInformationRepository-35", SQLCommandType.DELETE, true);
            // End log

            return _context.SaveChanges();
        }

        public CpiDetailInformationModel GetCpiDetailInformation(int initiativeId)
        {
            var cpi = _context.NewDetailInformations.FirstOrDefault(x => x.InitiativeId == initiativeId);
            var cpiKpi = _context.CpiKpis.Where(x => x.InitiativeId == initiativeId).ToList();
            var milestone = _context.ProgressDetails.Where(x => x.InitiativeId == initiativeId).ToList();
            var cpiKpiMonitor = _context.CpiKpiMonitor.Where(x => x.InitiativeId == initiativeId).ToList();
            if (cpiKpi == null) cpiKpi = new System.Collections.Generic.List<CpiKeyPerformanceIndicator>();
            if (milestone == null) milestone = new List<ProgressDetail>();
            var cpiModel = _mapper.Map<CpiDetailInformationModel>(cpi);
            if (cpiModel != null)
            {
                cpiModel.KpiFormList = cpiKpi;
                cpiModel.MilestoneFormList = milestone;
                cpiModel.KpiMonitorFormList = cpiKpiMonitor;
            }

            return cpiModel;
        }

        public async Task<int> InsertCpiDetailInformation(CpiDetailInformationModel detailInformationModel)
        {
            //var detailInformation = _mapper.Map<CpiDetailInformation>(detailInformationModel);
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(detailInformationModel, "CpiDetailInformationRepository-73", SQLCommandType.INSERT, false);
            // End log


            detailInformationModel.Id = 0;
            foreach (var item in detailInformationModel.KpiFormList)
            {
                item.Id = 0;
                item.InitiativeId = detailInformationModel.InitiativeId;
            }

            foreach (var item in detailInformationModel.KpiMonitorFormList)
            {
                item.Id = 0;
                item.InitiativeId = detailInformationModel.InitiativeId;
            }

            var detailCpi = _mapper.Map<DetailInformation>(detailInformationModel);
            await _context.NewDetailInformations.AddAsync(detailCpi);
            await _context.CpiKpis.AddRangeAsync(detailInformationModel.KpiFormList);
            await _context.CpiKpiMonitor.AddRangeAsync(detailInformationModel.KpiMonitorFormList);
            await _context.ProgressDetails.AddRangeAsync(detailInformationModel.MilestoneFormList);


            await _context.SaveChangesAsync();
            var detailData = await _context.NewDetailInformations.Where((x) => x.InitiativeId == detailInformationModel.InitiativeId).FirstOrDefaultAsync();
            
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(detailData, "CpiDetailInformationRepository-98", SQLCommandType.INSERT, true);
            // End log

            if (detailData == null)
            {
                return await Task.FromResult(0);
            }
            return await Task.FromResult(detailData.Id);
        }

        public async Task<int> UpdateCpiDetailInformation(CpiDetailInformationModel cpiDetailInformationModel)
        {
            //var detailInformation = _mapper.Map<CpiDetailInformation>(cpiDetailInformationModel);

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(cpiDetailInformationModel, "CpiDetailInformationRepository-116", SQLCommandType.UPDATE, false);
            // End log



            var detailCpi = _mapper.Map<DetailInformation>(cpiDetailInformationModel);
            _context.NewDetailInformations.Update(detailCpi);
            await _context.SaveChangesAsync();

            if (cpiDetailInformationModel.KpiFormList != null)
            {
                var kpiArray = await _context.CpiKpis.Where(x => x.InitiativeId == cpiDetailInformationModel.InitiativeId).ToListAsync();
                _context.RemoveRange(kpiArray);
                await _context.SaveChangesAsync();
                foreach (var item in cpiDetailInformationModel.KpiFormList)
                {
                    item.Id = 0;
                    item.InitiativeId = cpiDetailInformationModel.InitiativeId;
                }
                _context.AddRange(cpiDetailInformationModel.KpiFormList);
                await _context.SaveChangesAsync();
            }

            if (cpiDetailInformationModel.KpiMonitorFormList.Any())
            {
                var List = await _context.CpiKpiMonitor.Where(x => x.InitiativeId == cpiDetailInformationModel.InitiativeId).ToListAsync();
                foreach (var entity in List)
                    _context.CpiKpiMonitor.Remove(entity);
                await _context.SaveChangesAsync();


                foreach (var item in cpiDetailInformationModel.KpiMonitorFormList)
                {
                    item.Id = 0;
                    item.InitiativeId = cpiDetailInformationModel.InitiativeId;
                    await _context.CpiKpiMonitor.AddAsync(item);
                    await _context.SaveChangesAsync();
                }
            }


            if (cpiDetailInformationModel.MilestoneFormList != null)
            {
                var stepExplained = await _context.ProgressDetails.Where(x => x.InitiativeId == cpiDetailInformationModel.InitiativeId).ToListAsync();
                foreach (var item in cpiDetailInformationModel.MilestoneFormList)
                {
                    item.Id = 0;
                    item.InitiativeId = cpiDetailInformationModel.InitiativeId;
                }
                _context.RemoveRange(stepExplained);
                await _context.SaveChangesAsync();
                _context.AddRange(cpiDetailInformationModel.MilestoneFormList);
                await _context.SaveChangesAsync();
            }

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(cpiDetailInformationModel, "CpiDetailInformationRepository-116", SQLCommandType.UPDATE, true);
            // End log



            return await Task.FromResult(1);


        }

        public void UpdateListItems<T>(T list) where T : IEnumerable
        {
            foreach (var items in list)
            {
                _context.Add(items);
            }
        }
    }
}
