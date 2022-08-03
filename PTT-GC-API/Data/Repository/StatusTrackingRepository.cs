using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Dtos.StatusTracking;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Repository
{
    public class StatusTrackingRepository : StatusTrackingInterface
    {
        private readonly DataContext _context;
        private readonly InitiativeInterface _initiative_repo;
        private readonly IMapper _mapper;
        private readonly StoreProcedureInterface _storeProcedure;
        public StatusTrackingRepository(DataContext context, InitiativeInterface initiative_repo, IMapper mapper, StoreProcedureInterface storeProcedure)
        {
            _context = context;
            _initiative_repo = initiative_repo;
            _mapper = mapper;
            _storeProcedure = storeProcedure;
        }
        public async Task<IEnumerable<StatusTrackingsWithDisplayName>> GetList(int id)
        {
            string[] exceptStage = { "WBS Request", "Budget Distribute", "Budget Pool", "Budget Excellence Distribute" };

            //var listStatus = await _context.InitiativeStatusTrackings.Where(s => s.InitiativeId == id && exceptStage.Contains(s.Stage) == false).OrderBy(s => s.RunningSequence).ThenBy(i => i.HistoryId).ToListAsync();
            //var listStatus = await _context.InitiativeStatusTrackings.Where(s => s.InitiativeId == id).OrderBy(s => s.RunningSequence).ThenBy(i => i.HistoryId).ToListAsync();


            //var returnListStatus = _mapper.Map<IEnumerable<StatusTrackingsWithDisplayName>>(listStatus);

            //var returnVal = (from iniStatus in returnListStatus.ToList()
            //                 join stageDetail in _context.InitiativeStageDetail on
            //                 new
            //                 {
            //                     IniId = iniStatus.InitiativeId,
            //                     CurrentStage = iniStatus.Stage,
            //                     Event = "createnew",
            //                     FlowType = iniStatus.FlowType,
            //                     SubType = iniStatus.SubType,
            //                     Process = iniStatus.ProcessType
            //                 } 
            //                     equals
            //                 new
            //                 {
            //                     IniId =        stageDetail.InitiativeId,
            //                     CurrentStage = stageDetail.CurrentStage,
            //                     Event =        stageDetail.Event,
            //                     FlowType =     stageDetail.FlowType,
            //                     SubType =      stageDetail.Subtype,
            //                     Process =      stageDetail.Process
            //                 }
            //                 into p1

            //                 from p2 in p1.DefaultIfEmpty()
            //                 where p2.InitiativeId == id

            //                 select new StatusTrackingsWithDisplayName
            //                 {
            //                     InitiativeId                   = iniStatus.InitiativeId,
            //                     ProcessType                = iniStatus.ProcessType,
            //                     SubType                    = iniStatus.SubType,
            //                     ApprovedBy                     = iniStatus.ApprovedBy,
            //                     ApprovedDate                   = iniStatus.ApprovedDate,
            //                     FlowType                   = iniStatus.FlowType,
            //                     HistoryId                       = iniStatus.HistoryId,
            //                     RunningSequence                    = iniStatus.RunningSequence,
            //                     Sequence                        = iniStatus.Sequence,
            //                     Stage                          = iniStatus.Stage,
            //                     Status                                     = iniStatus.Status,
            //                     CurrentActionInformation                       = p2.CurrentActionInformation,
            //                     CurrentStageDisplay                    = p2.CurrentStageDisplay,
            //                     NextActionInformation                      = p2.NextActionInformation,
            //                 }
            //                ).Distinct();



            //foreach (StatusTrackingsWithDisplayName statusTrackingsWithDisplayName in returnListStatus)
            //{
            //    statusTrackingsWithDisplayName.CurrentStageDisplay = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == id && i.Event == "createnew" && i.CurrentStage == statusTrackingsWithDisplayName.Stage && i.FlowType == statusTrackingsWithDisplayName.FlowType && i.Subtype == statusTrackingsWithDisplayName.SubType && i.Process == statusTrackingsWithDisplayName.ProcessType).Select(i => i.CurrentStageDisplay).FirstOrDefaultAsync();
            //    statusTrackingsWithDisplayName.CurrentActionInformation = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == id && i.Event == "createnew" && i.CurrentStage == statusTrackingsWithDisplayName.Stage && i.FlowType == statusTrackingsWithDisplayName.FlowType && i.Subtype == statusTrackingsWithDisplayName.SubType && i.Process == statusTrackingsWithDisplayName.ProcessType).Select(i => i.CurrentActionInformation).FirstOrDefaultAsync();
            //    statusTrackingsWithDisplayName.NextActionInformation = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == id && i.Event == "createnew" && i.CurrentStage == statusTrackingsWithDisplayName.Stage && i.FlowType == statusTrackingsWithDisplayName.FlowType && i.Subtype == statusTrackingsWithDisplayName.SubType && i.Process == statusTrackingsWithDisplayName.ProcessType).Select(i => i.NextActionInformation).FirstOrDefaultAsync();
            //}

            //foreach (var entity in listStatus)
            //{
            //    entity.Stage = await _initiative_repo.GetStageNameOutput(id, entity.Stage);
            //}

            StatusTrackingsWithDisplayName[] returnVal = { };

            DataTable dataTable = new DataTable();
            try
            {
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log($"sp_GetInitiativeStatusTrackings '{id}'", "StatusTracking-104", SQLCommandType.EXECUTE, false);
                // End log
                dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_GetInitiativeStatusTrackings '{id}'");  //sp_RequestPoolPimInitiativeList
            }
            catch (Exception ex)
            {
                return new List<StatusTrackingsWithDisplayName>() { };
            }

            if(dataTable.Rows.Count > 0)
            {
                returnVal = CommonMethod.ConvertToArray<StatusTrackingsWithDisplayName>(dataTable);
            }

            return returnVal;
        }

        public async Task<InitiativeStatusHistory> GetApproveComment(int id, ApproveComment ApproveComment)
        {
            return await _context.InitiativeStatusHistory.Where(s => s.InitiativeId == id).OrderByDescending(s => s.ActionDate).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<InitiativeStatusHistory>> GetHistoryStatus(int id, HistoryStatus HistoryStatus)
        {
            var stage = await this.ConvertBackToCommonName(id, HistoryStatus.Stage);
            return await _context.InitiativeStatusHistory.Where(s => s.InitiativeId == id && s.Stage == stage).OrderBy(s => s.Id).ToListAsync();
        }

        public async Task<IEnumerable<InitiativeStatusHistory>> GetHistoryStatusList(int id)
        {
            //string[] stage = { "SIL1", "SIL2", "SIL3", "SIL4", "SIL5", "DM", "VP", "EVP/MD/SEVP/COE/PSD/CEO", "Budget Team", "BOD", "App. Request", "WBS Request", "Budget Distribute", "Budget Pool", "Budget Excellence Distribute" };
            var result = await _context.InitiativeStatusHistory.Where(s => s.InitiativeId == id).OrderBy(s => s.Id).ToListAsync();
            foreach (var item in result)
            {
                item.Stage = await _initiative_repo.GetStageNameOutput(id, item.Stage);
            }
            return result;
        }

        public async Task<string> ConvertBackToCommonName(int id, string stage = null)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();

            var dataStages = await _context.CommonData.Where(i => i.DataType == "stage"
            && i.Attribute08 == stage
            && i.Attribute05 == initiative.InitiativeType
            && i.Attribute06 == initiative.InitiativeSubType
            && i.Attribute01 != null
            ).FirstOrDefaultAsync();

            if (dataStages != null)
            {
                return dataStages.Attribute01;
            }

            return (stage != null) ? stage : initiative.Stage;
        }
    }
}