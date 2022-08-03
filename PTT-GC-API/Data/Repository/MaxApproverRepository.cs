using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.MaxApprover;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Repository
{
    public class MaxApproverRepository : MaxApproverInterface
    {
        private readonly DataContext _context;
        public MaxApproverRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<MaxApproverSetting>> GetWorkstreamList(Workstream Workstream)
        {
            return await _context.MaxApproverSettings.Where(s => s.WorkstreamType == "Workstream" && s.WorkstreamValue == Workstream.Name).OrderBy(s => s.Order).ToListAsync();
        }

        public async Task<IEnumerable<MaxApproverSetting>> GetSubWorkstream(Workstream Workstream)
        {
            bool isRequestCapex = false;
            var initiative = await _context.Initiatives.Where(i => i.Id == Workstream.InitiativeId).FirstOrDefaultAsync();
            List<MaxApproverSetting> maxApproverSettings = new List<MaxApproverSetting>();
            if (Workstream.InitiativeId != null && Workstream.Benefit != null)
            {
                var initiativeStage = await _context.InitiativeStage.Where(i => i.FlowType == "requestcapex" && i.Status == "finish" && i.InitiativeId == Workstream.InitiativeId).FirstOrDefaultAsync();
                if (initiativeStage != null)
                {
                    isRequestCapex = true;
                }
            }


            if (isRequestCapex == true && initiative != null && initiative.InitiativeType == "max")
            {
                maxApproverSettings = await _context.MaxApproverSettings.Where(s => s.WorkstreamType == "SubWorkstream" && s.WorkstreamValue == Workstream.Name && s.IsRequestCapex == true && s.Indicator == Workstream.Indicator).OrderBy(s => s.Order).ToListAsync();

            }
            else
            {
                maxApproverSettings = await _context.MaxApproverSettings.Where(s => s.WorkstreamType == "SubWorkstream" && s.WorkstreamValue == Workstream.Name && (s.IsRequestCapex == null ? false : s.IsRequestCapex) == false && Workstream.Benefit >= s.BenefitMin && Workstream.Benefit < s.BenefitMax && s.Indicator == Workstream.Indicator).OrderBy(s => s.Order).ToListAsync();
            }


            //var getMaxApp = await (from a in _context.MaxApprovers
            //                 where a.InitiativeId == Workstream.InitiativeId
            //                 && a.ApproverType == Workstream.Indicator
            //                 select new MaxApproverSetting
            //                 {
            //                     ApproverEmail = a.ApproverEmail,
            //                     WorkstreamType = a.ApproverType
            //                 }).ToListAsync();

            //if(getMaxApp.Count() > 0)
            //{
            //    return getMaxApp;
            //}


            //maxApproverSettings = await _context.MaxApproverSettings.Where(s =>
            //    s.WorkstreamType == "SubWorkstream" &&
            //    s.WorkstreamValue == Workstream.Name &&
            //    s.Indicator == Workstream.Indicator).OrderBy(s => s.Order).ToListAsync();

            return maxApproverSettings;
        }


        public async Task<MaxApprover> GetWorkstreamLead(int id)
        {
            var MaxApprover = await _context.MaxApprovers.Where(i => i.ApproverType == "WorkstreamLead").FirstOrDefaultAsync(i => i.InitiativeId == id);
            return MaxApprover;
        }

        public async Task<MaxApprover> CreateWorkstreamLead(int id, WorkstreamLead Workstream)
        {
            if (_context.MaxApprovers.Where(i => i.ApproverType == "WorkstreamLead" && i.InitiativeId == id).Any())
            {
                var data = await _context.MaxApprovers.Where(i => i.ApproverType == "WorkstreamLead" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "MaxApprover-87", SQLCommandType.DELETE, false);
                    // End log
                    _context.MaxApprovers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            var MaxApprover = new MaxApprover { InitiativeId = id, ApproverType = "WorkstreamLead", ApproverEmail = Workstream.Email };
            await _context.MaxApprovers.AddAsync(MaxApprover);
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(MaxApprover, "MaxApprover-97", SQLCommandType.INSERT, false);
            // End log
            await _context.SaveChangesAsync();
            return MaxApprover;
        }

        public async Task<string[]> CreateSponsor(int id, string[] form)
        {
            if (_context.MaxApprovers.Where(i => i.ApproverType == "Sponsor" && i.InitiativeId == id).Any())
            {
                var data = await _context.MaxApprovers.Where(i => i.ApproverType == "Sponsor" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "MaxApprover-111", SQLCommandType.DELETE, false);
                    // End log
                    _context.MaxApprovers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            if (form.Length > 0)
            {
                foreach (string item in form)
                {
                    var MaxApprover = new MaxApprover { InitiativeId = id, ApproverType = "Sponsor", ApproverEmail = item };
                    await _context.MaxApprovers.AddAsync(MaxApprover);
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(MaxApprover, "MaxApprover-122", SQLCommandType.INSERT, false);
                    // End log
                    await _context.SaveChangesAsync();
                }
            }

            return form;
        }

        public async Task<string[]> CreateFinance(int id, string[] form)
        {
            if (_context.MaxApprovers.Where(i => i.ApproverType == "TO Finance" && i.InitiativeId == id).Any())
            {
                var data = await _context.MaxApprovers.Where(i => i.ApproverType == "TO Finance" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "MaxApprover-138", SQLCommandType.DELETE, false);
                    // End log
                    _context.MaxApprovers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            if (form.Length > 0)
            {
                foreach (string item in form)
                {
                    var MaxApprover = new MaxApprover { InitiativeId = id, ApproverType = "TO Finance", ApproverEmail = item };
                    await _context.MaxApprovers.AddAsync(MaxApprover);
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(MaxApprover, "MaxApprover-148", SQLCommandType.INSERT, false);
                    // End log
                    await _context.SaveChangesAsync();
                }
            }

            return form;
        }

        public async Task<string[]> CreateCFO(int id, string[] form)
        {
            if (_context.MaxApprovers.Where(i => i.ApproverType == "CFO" && i.InitiativeId == id).Any())
            {
                var data = await _context.MaxApprovers.Where(i => i.ApproverType == "CFO" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "MaxApprover-164", SQLCommandType.DELETE, false);
                    // End log
                    _context.MaxApprovers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            if (form.Length > 0)
            {
                foreach (string item in form)
                {
                    var MaxApprover = new MaxApprover { InitiativeId = id, ApproverType = "CFO", ApproverEmail = item };
                    await _context.MaxApprovers.AddAsync(MaxApprover);
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(MaxApprover, "MaxApprover-174", SQLCommandType.INSERT, false);
                    // End log
                    await _context.SaveChangesAsync();
                }
            }

            return form;
        }

        public async Task<string[]> CreateCTO(int id, string[] form)
        {
            if (_context.MaxApprovers.Where(i => i.ApproverType == "CTO" && i.InitiativeId == id).Any())
            {
                var data = await _context.MaxApprovers.Where(i => i.ApproverType == "CTO" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "MaxApprover-190", SQLCommandType.DELETE, false);
                    // End log
                    _context.MaxApprovers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            if (form.Length > 0)
            {
                foreach (string item in form)
                {
                    var MaxApprover = new MaxApprover { InitiativeId = id, ApproverType = "CTO", ApproverEmail = item };
                    await _context.MaxApprovers.AddAsync(MaxApprover);
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(MaxApprover, "MaxApprover-201", SQLCommandType.INSERT, false);
                    // End log
                    await _context.SaveChangesAsync();
                }
            }
            return form;
        }

        public async Task<string[]> CreateTOTeam(int id, string[] form)
        {
            if (_context.MaxApprovers.Where(i => i.ApproverType == "TOTeam" && i.InitiativeId == id).Any())
            {
                var data = await _context.MaxApprovers.Where(i => i.ApproverType == "TOTeam" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "MaxApprover-216", SQLCommandType.DELETE, false);
                    // End log
                    _context.MaxApprovers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            if (form.Length > 0)
            {
                foreach (string item in form)
                {
                    var MaxApprover = new MaxApprover { InitiativeId = id, ApproverType = "TOTeam", ApproverEmail = item };
                    await _context.MaxApprovers.AddAsync(MaxApprover);
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(MaxApprover, "MaxApprover-227", SQLCommandType.INSERT, false);
                    // End log
                    await _context.SaveChangesAsync();
                }
            }
            return form;
        }

        public async Task<string[]> CreateTfBtTO(int id, string[] form)
        {
            if (_context.MaxApprovers.Where(i => i.ApproverType == "TF-BT-TO" && i.InitiativeId == id).Any())
            {
                var data = await _context.MaxApprovers.Where(i => i.ApproverType == "TF-BT-TO" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "MaxApprover-242", SQLCommandType.DELETE, false);
                    // End log
                    _context.MaxApprovers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            if (form.Length > 0)
            {
                foreach (string item in form)
                {
                    var MaxApprover = new MaxApprover { InitiativeId = id, ApproverType = "TF-BT-TO", ApproverEmail = item };
                    await _context.MaxApprovers.AddAsync(MaxApprover);
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(MaxApprover, "MaxApprover-253", SQLCommandType.INSERT, false);
                    // End log
                    await _context.SaveChangesAsync();
                }
            }

            return form;
        }

        public async Task<string[]> CreateTOFinanceIL4(int id, string[] form)
        {
            if (_context.MaxApprovers.Where(i => i.ApproverType == "TOFinanceIL4" && i.InitiativeId == id).Any())
            {
                var data = await _context.MaxApprovers.Where(i => i.ApproverType == "TOFinanceIL4" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "MaxApprover-268", SQLCommandType.DELETE, false);
                    // End log
                    _context.MaxApprovers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            if (form.Length > 0)
            {
                foreach (string item in form)
                {
                    var MaxApprover = new MaxApprover { InitiativeId = id, ApproverType = "TOFinanceIL4", ApproverEmail = item };
                    await _context.MaxApprovers.AddAsync(MaxApprover);
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(MaxApprover, "MaxApprover-279", SQLCommandType.INSERT, false);
                    // End log
                    await _context.SaveChangesAsync();
                }
            }

            return form;
        }

        public async Task<string[]> CreateTOFinanceIL5(int id, string[] form)
        {
            if (_context.MaxApprovers.Where(i => i.ApproverType == "TOFinanceIL5" && i.InitiativeId == id).Any())
            {
                var data = await _context.MaxApprovers.Where(i => i.ApproverType == "TOFinanceIL5" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "MaxApprover-294", SQLCommandType.DELETE, false);
                    // End log
                    _context.MaxApprovers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            if (form.Length > 0)
            {
                foreach (string item in form)
                {
                    var MaxApprover = new MaxApprover { InitiativeId = id, ApproverType = "TOFinanceIL5", ApproverEmail = item };
                    await _context.MaxApprovers.AddAsync(MaxApprover);
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(MaxApprover, "MaxApprover-304", SQLCommandType.INSERT, false);
                    // End log
                    await _context.SaveChangesAsync();
                }
            }

            return form;
        }

        public async Task<string[]> CreateFinanceExpert(int id, string[] form)
        {
            if (_context.MaxApprovers.Where(i => i.ApproverType == "Finance Expert" && i.InitiativeId == id).Any())
            {
                var data = await _context.MaxApprovers.Where(i => i.ApproverType == "Finance Expert" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "MaxApprover-320", SQLCommandType.DELETE, false);
                    // End log
                    _context.MaxApprovers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            if (form.Length > 0)
            {
                foreach (string item in form)
                {
                    var MaxApprover = new MaxApprover { InitiativeId = id, ApproverType = "Finance Expert", ApproverEmail = item };
                    await _context.MaxApprovers.AddAsync(MaxApprover);
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(MaxApprover, "MaxApprover-331", SQLCommandType.INSERT, false);
                    // End log
                    await _context.SaveChangesAsync();
                }
            }

            return form;
        }

    }
}