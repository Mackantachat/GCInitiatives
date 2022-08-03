using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Audit;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Audits;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Repository
{
    public class AuditRepository : AuditInterface
    {
        private readonly DataContext _context;
        private readonly StoreProcedureInterface _storeProcedure;
        public AuditRepository(DataContext context, StoreProcedureInterface storeProcedure)
        {
            _context = context;
            _storeProcedure = storeProcedure;
        }
        public async Task<PagedList<V_Audit>> GetAudits(AuditParams AuditParams)
        {
            var audits = _context.V_Audits.AsQueryable();

            audits = audits.Where(i => i.InitiativeCode == AuditParams.Code);

            if (!string.IsNullOrEmpty(AuditParams.Keyword))
            {
                audits = audits.Where(i =>
                    i.ChangeSetId.ToString().Contains(AuditParams.Keyword) ||
                    i.FieldName.Contains(AuditParams.Keyword.Trim()) ||
                    i.OldValue.Contains(AuditParams.Keyword.Trim()) ||
                    i.NewValue.Contains(AuditParams.Keyword.Trim()) ||
                    i.ActionBy.Contains(AuditParams.Keyword.Trim())
                );
            }
            if (AuditParams.StartDate.HasValue && AuditParams.EndDate.HasValue)
            {
                audits = audits.Where(i => i.ActionDate.Value.Date >= AuditParams.StartDate && i.ActionDate.Value.Date <= AuditParams.EndDate);
            }

            audits = audits.OrderByDescending(i => i.ActionDate);

            return await PagedList<V_Audit>.CreateAsync(audits, AuditParams.PageNumber, AuditParams.PageSize);
        }

        private async Task InsertDataToDB<T>(T data) where T : class
        {
            await _context.AddAsync<T>(data);
        }

        public async Task<int> InsertData(Audits auditData)
        {
            if (auditData != null) await this.InsertDataToDB(auditData);
            return 1;
        }

        public async Task<int> CallFullLog(LogParams logParams)
        {
            try
            {
                var initiative = await _context.Initiatives.Where(x => x.Id.Equals(logParams.InitiativeId)).FirstOrDefaultAsync();

                initiative.Id = 0;
                initiative.HistoryFlag = 1;
                await _context.Initiatives.AddAsync(initiative);
                await _context.SaveChangesAsync();

                //get log increment table
                //codev
                var coDevelopers = await _context.InitiativeCoDevelopers.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();

                //initaitive detail
                var initiativeDetail = await _context.InitiativeDetails.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).FirstOrDefaultAsync();
                //detail info
                var detailInformation = await _context.DetailInformations.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).FirstOrDefaultAsync();
                //max approve
                var maxApprover = await _context.MaxApprovers.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).FirstOrDefaultAsync();
                
                //impact table
                var impactTracking = await _context.ImpactTrackings.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).FirstOrDefaultAsync();

                //impact Type of benefit
                var impactTypeOfBenefits = await _context.ImpactTypeOfBenefits.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();

                //capex
                var capexInformations = await _context.CapexInformations.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();
                //annual Capex
                var annualInvestmentPlans = await _context.AnnualInvestmentPlans.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();
                //monthly Capex
                var monthlyInvestmentPlans = await _context.MonthlyInvestmentPlans.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();
                               
                //progress header and Sap
                var progressDetails = await _context.ProgressDetails.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();
                var progressHeader = await _context.ProgressHeader.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).FirstOrDefaultAsync();
                var progressPlanDates = await _context.ProgressPlanDate.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();
                var progressPlans = await _context.ProgressPlan.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();

                //outStanding
                var outstandings = await _context.Outstandings.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();
                var outstandingDatas = await _context.OutstandingData.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();


                //bsc Narrative
                var bscNarratives = await _context.BscNarrative.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();


                //costSpending
                var costSpendings = await _context.InvestmentCost.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();


                //emoc
                var emocDatas = await _context.MainPlant.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();


                //pimgate
                var pimGates = await _context.PimGate.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();
                //pic member
                var picMembers = await _context.PicMember.Where(x => x.InitiativeId.Equals(logParams.InitiativeId)).ToListAsync();




               





                //save data
                //CO-Dev
                if(coDevelopers?.Count > 0)
                {
                    foreach (var coDeveloper in coDevelopers)
                    {
                        coDeveloper.Id = 0;
                        coDeveloper.InitiativeId = initiative.Id;
                        await _context.InitiativeCoDevelopers.AddAsync(coDeveloper);
                    }
                }

                //iniTiativeDetail -- type CIM , strategy
                if(initiativeDetail != null)
                {
                    initiativeDetail.Id = 0;
                    initiativeDetail.InitiativeId = initiative.Id;
                    await _context.InitiativeDetails.AddAsync(initiativeDetail);
                }
                
                //detail info
                if(detailInformation != null)
                {
                    detailInformation.Id = 0;
                    detailInformation.InitiativeId = initiative.Id;
                    await _context.DetailInformations.AddAsync(detailInformation);
                }

                //maxApprover
                if (maxApprover != null)
                {
                    maxApprover.Id = 0;
                    maxApprover.InitiativeId = initiative.Id;
                    await _context.MaxApprovers.AddAsync(maxApprover);
                }
                //Impact
                if(impactTracking != null)
                {
                    impactTracking.Id = 0;
                    impactTracking.InitiativeId = initiative.Id;
                    await _context.ImpactTrackings.AddAsync(impactTracking);
                }

                //Impact Type of Benefit
                if (impactTypeOfBenefits?.Count > 0)
                {
                    foreach (var impactTypeOfBenefit in impactTypeOfBenefits)
                    {
                        impactTypeOfBenefit.Id = 0;
                        impactTypeOfBenefit.InitiativeId = initiative.Id;
                        await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                    }
                }

                //capex info all revision
                if(capexInformations?.Count > 0)
                {
                    foreach (var capexInformation in capexInformations)
                    {
                        var capexInformationIdOld = capexInformation.CapexInformationId;
                        capexInformation.CapexInformationId = 0;
                        capexInformation.InitiativeId = initiative.Id;
                        await _context.CapexInformations.AddAsync(capexInformation);
                        await _context.SaveChangesAsync();
                        if (annualInvestmentPlans.Count(x => x.CapexInformationId.Equals(capexInformationIdOld)) > 0)
                        {
                            var annualInvestmentPlansList = annualInvestmentPlans.Where(x => x.CapexInformationId.Equals(capexInformationIdOld)).ToList();
                            foreach (var annualList in annualInvestmentPlansList)
                            {
                                annualList.AnnualInvestmentPlanId = 0;
                                annualList.InitiativeId = initiative.Id;
                                annualList.CapexInformationId = capexInformation.CapexInformationId;
                                await _context.AnnualInvestmentPlans.AddAsync(annualList);
                            }
                        }
                        if (monthlyInvestmentPlans.Count(x => x.CapexInformationId.Equals(capexInformationIdOld)) > 0)
                        {
                            var monthlyInvestmentPlansList = monthlyInvestmentPlans.Where(x => x.CapexInformationId.Equals(capexInformationIdOld)).ToList();
                            foreach (var monthlyList in monthlyInvestmentPlansList)
                            {
                                monthlyList.MonthlyInvestmentPlanId = 0;
                                monthlyList.InitiativeId = initiative.Id;
                                monthlyList.CapexInformationId = capexInformation.CapexInformationId;
                                await _context.MonthlyInvestmentPlans.AddAsync(monthlyList);
                            }
                        }
                    }
                }


                //progress
                if(progressDetails?.Count > 0)
                {
                    foreach (var progressDetail in progressDetails)
                    {
                        progressDetail.Id = 0;
                        progressDetail.InitiativeId = initiative.Id;
                        await _context.ProgressDetails.AddAsync(progressDetail);
                    }
                }

                //progress  Header
                if(progressHeader != null)
                {
                    progressHeader.ProgressHeaderId = 0;
                    progressHeader.InitiativeId = initiative.Id;
                    await _context.ProgressHeader.AddAsync(progressHeader);
                }

                //progress plan date
                if (progressPlanDates?.Count > 0)
                {
                    foreach (var progressPlanDate in progressPlanDates)
                    {
                        progressPlanDate.ProgressPlanDateId = 0;
                        progressPlanDate.InitiativeId = initiative.Id;
                        await _context.ProgressPlanDate.AddAsync(progressPlanDate);
                    }
                }

                //progress plan
                if (progressPlans?.Count > 0)
                {
                    foreach (var progressPlan in progressPlans)
                    {
                        progressPlan.ProgressPlanId = 0;
                        progressPlan.InitiativeId = initiative.Id;
                        await _context.ProgressPlan.AddAsync(progressPlan);
                    }
                }

                //outstanding
                if (outstandings?.Count > 0)
                {
                    foreach (var outstanding in outstandings)
                    {
                        var outstandingOldId = outstanding.Id;
                        outstanding.Id = 0;
                        outstanding.InitiativeId = initiative.Id;
                        await _context.Outstandings.AddAsync(outstanding);
                        await _context.SaveChangesAsync();
                        if (outstandingDatas.Count(x => x.OutstandingId.Equals(outstandingOldId)) > 0)
                        {
                            var outstandingLists = outstandingDatas.Where(x => x.Outstanding.Equals(outstandingOldId)).ToList();
                            foreach (var outstandingList in outstandingLists)
                            {
                                outstandingList.Id = 0;
                                outstandingList.OutstandingId = outstanding.Id;
                                await _context.OutstandingData.AddAsync(outstandingList);
                            }
                        }
                    }
                }

                //bsc Narative
                if (bscNarratives?.Count > 0)
                {
                    foreach (var bscNarrative in bscNarratives)
                    {
                        bscNarrative.BscNarrativeId = 0;
                        bscNarrative.InitiativeId = initiative.Id;
                        await _context.BscNarrative.AddAsync(bscNarrative);
                    }
                }
                //bsc Narative
                if (costSpendings?.Count > 0)
                {
                    foreach (var cost in costSpendings)
                    {
                        cost.InvestmentCostId = 0;
                        cost.InitiativeId = initiative.Id;
                        await _context.InvestmentCost.AddAsync(cost);
                    }
                }
                //Emoc
                if (emocDatas?.Count > 0)
                {
                    foreach (var emoc in emocDatas)
                    {
                        emoc.MainPlanId = 0;
                        emoc.InitiativeId = initiative.Id;
                        await _context.MainPlant.AddAsync(emoc);
                    }
                }

                //PIMGate
                if (pimGates?.Count > 0)
                {
                    foreach(var pimGate in pimGates)
                    {
                        pimGate.PimGateId = 0;
                        pimGate.InitiativeId = initiative.Id;
                        await _context.PimGate.AddAsync(pimGate);
                    }
                }

                //PIC Member
                if(picMembers?.Count > 0)
                {
                    foreach(var picMember in picMembers)
                    {
                        picMember.PicMemberId = 0;
                        picMember.InitiativeId = initiative.Id;
                        await _context.PicMember.AddAsync(picMember);
                    }
                }


                await _context.SaveChangesAsync();
                //var result = await _storeProcedure.Execute($"EXEC sp_FullLog {logParams.InitiativeId}");
                //var newInit = result.Split(':');
                //var newInitiativeId = newInit[1].Substring(0, newInit[1].Length - 2);
                return 0;
            }
            catch (Exception ex)
            {
                return 0;

            }
        }

        public async Task<bool> CallAuditLog(LogParams logParams)
        {

            try
            {
                var initiative = await _context.Initiatives.Where(x => x.Id == logParams.InitiativeId).FirstOrDefaultAsync();
                var history = await _context.Initiatives.Where(h => h.InitiativeCode == initiative.InitiativeCode && h.HistoryFlag == 1).OrderByDescending(o => o.Id).FirstOrDefaultAsync();

                await _storeProcedure.Execute_NoReturn($"EXEC sp_AuditLog '{logParams.InitiativeId}' ,'{history.Id}', 'Initiatives' , 'Id'");
                await _storeProcedure.Execute_NoReturn($"EXEC sp_AuditLog '{logParams.InitiativeId}' ,'{history.Id}', 'InitiativeDetails' ,'InitiativeId' ");
                await _storeProcedure.Execute_NoReturn($"EXEC sp_AuditLog '{logParams.InitiativeId}' ,'{history.Id}', 'ProgressHeader' , 'InitiativeId'");
                //await _storeProcedure.Execute_NoReturn($"EXEC sp_AuditLog '{logParams.InitiativeId}' ,'{history.Id}', 'CapexInformations' , 'InitiativeId'");
                await _storeProcedure.Execute_NoReturn($"EXEC sp_AuditLog '{logParams.InitiativeId}' ,'{history.Id}', 'NewDetailInformations' , 'InitiativeId'");
                await _storeProcedure.Execute_NoReturn($"EXEC sp_AuditLog '{logParams.InitiativeId}' ,'{history.Id}', 'DetailInformations' , 'InitiativeId'");
                await _storeProcedure.Execute_NoReturn($"EXEC sp_AuditLog '{logParams.InitiativeId}' ,'{history.Id}', 'ImpactTrackings' , 'InitiativeId'");
                //await _storeProcedure.Execute_NoReturn($"EXEC sp_AuditLog '{logParams.InitiativeId}' ,'{history.Id}', 'PimGate' , 'InitiativeId'");
                return true;
            }
            catch (Exception ex)
            {
                return false;

            }
        }
        
    }
}