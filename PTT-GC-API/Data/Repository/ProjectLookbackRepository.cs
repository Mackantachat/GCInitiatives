using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Lookback;
using PTT_GC_API.Dtos.ProjectLookback;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class ProjectLookbackRepository : ProjectLookbackInterface
    {
        private readonly DataContext _context;
        private readonly StoreProcedureInterface _storeProcedure;
        public ProjectLookbackRepository(DataContext context, StoreProcedureInterface storeProcedure)
        {
            _context = context;
            _storeProcedure = storeProcedure;
        }

        public async void Add<T>(T entity) where T : class
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(entity, "ProjectLookback-27", SQLCommandType.INSERT, false);
            // End log
            await _context.AddAsync(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(entity, "ProjectLookback-35", SQLCommandType.UPDATE, true);
            // End log
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(entity, "ProjectLookback-43", SQLCommandType.DELETE, false);
            // End log
            _context.Remove(entity);
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Any()
        {
            return await _context.ProjectLookback.AnyAsync();
        }

        public async Task<ProjectLookback> GetLookBack(int id)
        {
            var LookBack = await _context.ProjectLookback.SingleOrDefaultAsync(i => i.ProjectLookbackId == id);
            return LookBack;
        }

        public async Task<List<ProjectLookback>> GetBlogsAsync()
        {
            return await _context.ProjectLookback.ToListAsync();
        }
        public async Task<int> LastIdLookBack()
        {
            int id;
            if (_context.ProjectLookback.Any())
            {
                var max = await _context.ProjectLookback.OrderByDescending(p => p.ProjectLookbackId).FirstOrDefaultAsync();
                id = max.ProjectLookbackId;
            }
            else
            {
                id = 0;
            }
            return id;
        }

        public async Task<ProjectLookback> LastLookBack()
        {
            var LookBack = await _context.ProjectLookback.OrderByDescending(p => p.ProjectLookbackId).FirstOrDefaultAsync();
            return LookBack;
        }


        public async Task<List<ProjectLookbackList>> GetProjectLookbackItem()
        {
            List<ProjectLookbackList> lookbackList = new List<ProjectLookbackList>();
            ProjectLookbackList lookbackParam = new ProjectLookbackList();
            var dataProjectLookback = await _context.ProjectLookback.SingleOrDefaultAsync(i => i.ProjectLookbackId == 1);
            if (dataProjectLookback != null)
            {
                lookbackParam.ProjectLookbackId = dataProjectLookback.ProjectLookbackId;
                lookbackParam.FinishingDate = dataProjectLookback.FinishingDate;
                lookbackParam.PlanLookbackDate = dataProjectLookback.PlanLookbackDate;
                lookbackParam.PlanEnviLookBackDate = dataProjectLookback.PlanEnviLookBackDate;
                lookbackParam.PlanPerformanceLookbackDate = dataProjectLookback.PlanPerformanceLookbackDate;            

                lookbackParam.ProjectBackground = dataProjectLookback.ProjectBackground.ToString();
                lookbackParam.ScopeOfInitiative = dataProjectLookback.ScopeOfInitiative.ToString();
                lookbackParam.ProjectObjective = dataProjectLookback.ProjectObjective.ToString();
                lookbackParam.ExecutionLookback = dataProjectLookback.ExecutionLookback;
                lookbackParam.PerformanceLookback = dataProjectLookback.PerformanceLookback;
                lookbackParam.EnvironmentLookback = dataProjectLookback.EnvironmentLookback;
                lookbackParam.CimLookback = dataProjectLookback.CimLookback;

                lookbackParam.PerformancePlanLookbackDate = dataProjectLookback.PerformancePlanLookbackDate;              

                lookbackParam.CoreUpliftResultDescription = dataProjectLookback.CoreUpliftResultDescription.ToString();
                lookbackParam.CoreUpliftResultUnit = dataProjectLookback.CoreUpliftResultUnit.ToString();
                lookbackParam.CoreUpliftResultBefore = dataProjectLookback.CoreUpliftResultBefore.ToString();
                lookbackParam.CoreUpliftResultAfter = dataProjectLookback.CoreUpliftResultAfter.ToString();
                lookbackParam.CoreUpliftResultBenefit = dataProjectLookback.CoreUpliftResultBenefit.ToString();
                lookbackParam.CoreUpliftResultRating = dataProjectLookback.CoreUpliftResultRating.ToString();
                lookbackParam.EnviPlanLookbackDate = dataProjectLookback.EnviPlanLookbackDate;


                lookbackParam.PollutionPrevention = dataProjectLookback.PollutionPrevention.ToString();
                lookbackParam.PollutionPreventionSpecify = dataProjectLookback.PollutionPreventionSpecify.ToString();
                lookbackParam.GlobalEnvirCons = dataProjectLookback.GlobalEnvirCons.ToString();
                lookbackParam.GlobalEnvirConsSpecify = dataProjectLookback.GlobalEnvirConsSpecify.ToString();
                lookbackParam.ResourceCirculation = dataProjectLookback.ResourceCirculation.ToString();
                lookbackParam.ResourceCirculationSpecify = dataProjectLookback.ResourceCirculationSpecify.ToString();

                lookbackParam.EnvironmentResultCategory = dataProjectLookback.EnvironmentResultCategory.ToString();
                lookbackParam.EnvironmentResultUnit = dataProjectLookback.EnvironmentResultUnit.ToString();
                lookbackParam.EnvironmentResultBefore = dataProjectLookback.EnvironmentResultBefore.ToString();
                lookbackParam.EnvironmentResultAfter = dataProjectLookback.EnvironmentResultAfter.ToString();
                lookbackParam.EnvironmentResultBenefitYear = dataProjectLookback.EnvironmentResultBenefitYear.ToString();
                lookbackParam.EnvironmentResultBenefitYearThb = dataProjectLookback.EnvironmentResultBenefitYearThb.ToString();
                lookbackParam.EnvironmentResultRemark = dataProjectLookback.EnvironmentResultRemark.ToString();

                lookbackParam.McEndorseDate = dataProjectLookback.McEndorseDate;
                lookbackParam.BusinessPlanAsOfDate = dataProjectLookback.BusinessPlanAsOfDate;
                lookbackParam.BusinessPlanAsOfDate2 = dataProjectLookback.BusinessPlanAsOfDate2;
            }
            lookbackList.Add(lookbackParam);
            return lookbackList;
        }


        public async Task<List<ProjectLookbackList>> GetProjectLookbackAll()
        {
          
            List<ProjectLookbackList> lookbackList = new List<ProjectLookbackList>();
            
            var dataProjectLookback = await _context.ProjectLookback.OrderByDescending(i => i.ProjectLookbackId).ToListAsync();

            if (dataProjectLookback != null)
            {
                List<ProjectLookbackList> joinInitiatives = new List<ProjectLookbackList>();
                for (int i = 0; i < dataProjectLookback.Count; i++)
                {
                    ProjectLookbackList lookbackParam = new ProjectLookbackList();
                    lookbackParam.ProjectLookbackId = dataProjectLookback[i].ProjectLookbackId;
                    lookbackParam.FinishingDate = dataProjectLookback[i].FinishingDate;
                    lookbackParam.PlanLookbackDate = dataProjectLookback[i].PlanLookbackDate;
                    lookbackParam.PlanEnviLookBackDate = dataProjectLookback[i].PlanEnviLookBackDate;
                    lookbackParam.PlanPerformanceLookbackDate = dataProjectLookback[i].PlanPerformanceLookbackDate;


                    lookbackParam.ProjectBackground = dataProjectLookback[i].ProjectBackground.ToString();
                    lookbackParam.ScopeOfInitiative = dataProjectLookback[i].ScopeOfInitiative.ToString();
                    lookbackParam.ProjectObjective = dataProjectLookback[i].ProjectObjective.ToString();
                    lookbackParam.ExecutionLookback = dataProjectLookback[i].ExecutionLookback;
                    lookbackParam.PerformanceLookback = dataProjectLookback[i].PerformanceLookback;
                    lookbackParam.EnvironmentLookback = dataProjectLookback[i].EnvironmentLookback;
                    lookbackParam.CimLookback = dataProjectLookback[i].CimLookback;

                    lookbackParam.PerformancePlanLookbackDate = dataProjectLookback[i].PerformancePlanLookbackDate;

                    lookbackParam.CoreUpliftResultDescription = dataProjectLookback[i].CoreUpliftResultDescription.ToString();
                    lookbackParam.CoreUpliftResultUnit = dataProjectLookback[i].CoreUpliftResultUnit.ToString();
                    lookbackParam.CoreUpliftResultBefore = dataProjectLookback[i].CoreUpliftResultBefore.ToString();
                    lookbackParam.CoreUpliftResultAfter = dataProjectLookback[i].CoreUpliftResultAfter.ToString();
                    lookbackParam.CoreUpliftResultBenefit = dataProjectLookback[i].CoreUpliftResultBenefit.ToString();
                    lookbackParam.CoreUpliftResultRating = dataProjectLookback[i].CoreUpliftResultRating.ToString();
                    lookbackParam.EnviPlanLookbackDate = dataProjectLookback[i].EnviPlanLookbackDate;


                    lookbackParam.PollutionPrevention = dataProjectLookback[i].PollutionPrevention.ToString();
                    lookbackParam.PollutionPreventionSpecify = dataProjectLookback[i].PollutionPreventionSpecify.ToString();
                    lookbackParam.GlobalEnvirCons = dataProjectLookback[i].GlobalEnvirCons.ToString();
                    lookbackParam.GlobalEnvirConsSpecify = dataProjectLookback[i].GlobalEnvirConsSpecify.ToString();
                    lookbackParam.ResourceCirculation = dataProjectLookback[i].ResourceCirculation.ToString();
                    lookbackParam.ResourceCirculationSpecify = dataProjectLookback[i].ResourceCirculationSpecify.ToString();

                    lookbackParam.EnvironmentResultCategory = dataProjectLookback[i].EnvironmentResultCategory.ToString();
                    lookbackParam.EnvironmentResultUnit = dataProjectLookback[i].EnvironmentResultUnit.ToString();
                    lookbackParam.EnvironmentResultBefore = dataProjectLookback[i].EnvironmentResultBefore.ToString();
                    lookbackParam.EnvironmentResultAfter = dataProjectLookback[i].EnvironmentResultAfter.ToString();
                    lookbackParam.EnvironmentResultBenefitYear = dataProjectLookback[i].EnvironmentResultBenefitYear.ToString();
                    lookbackParam.EnvironmentResultBenefitYearThb = dataProjectLookback[i].EnvironmentResultBenefitYearThb.ToString();
                    lookbackParam.EnvironmentResultRemark = dataProjectLookback[i].EnvironmentResultRemark.ToString();


                    lookbackParam.McEndorseDate = dataProjectLookback[i].McEndorseDate;
                    lookbackParam.BusinessPlanAsOfDate = dataProjectLookback[i].BusinessPlanAsOfDate;
                    lookbackParam.BusinessPlanAsOfDate2 = dataProjectLookback[i].BusinessPlanAsOfDate2;
                    lookbackList.Add(lookbackParam);
                }
            }
            
            return lookbackList;
        }
        public async Task<ProjectLookback> GetProjectLookbackByID(int id)
        {
            var ProjectLookback = await _context.ProjectLookback.SingleOrDefaultAsync(i => i.InitiativeId == id);
            return ProjectLookback;
        }
        
        public async Task<Object> GetDataFromSAP(int id)
        {
            DataTable dt = new DataTable();
            var ProgressHeader = await _context.ProgressHeader.Where(x => x.InitiativeId == id).FirstOrDefaultAsync();
            if(ProgressHeader.WbsNo == null)
            {
                return null;
            }
            dt = await _storeProcedure.ExecuteReturnDatatable($"EXEC sp_GetCommercialDateAndActualFromSAP '{ProgressHeader.WbsNo}'");
            if (dt.Rows.Count <= 0)
            {
                return null;
            }

            var date = dt.Rows[0][0];
            var actual = dt.Rows[0][1];




            return new object {  };
        }
        public async Task<PimGateAndTotalCost> GetDetailPimGateAndTotalCost(int id)
        {
            PimGateAndTotalCost pimGateAndTotalCost = new PimGateAndTotalCost();
            var ProgressHeader = await _context.ProgressHeader.Where(x => x.InitiativeId == id).FirstOrDefaultAsync();
            if(ProgressHeader?.WbsNo == null)
            {
                return null;
            }

            var pimGate = await _context.PimGate.Where(x => x.Gate == 3 && x.InitiativeId == id).FirstOrDefaultAsync();
            if(pimGate != null)
            {
                pimGateAndTotalCost.OverallCapex = pimGate.OverallCapex;
            }
            var invesmentyCost = await _context.InvestmentCost.Where(x => x.InitiativeId == id && x.InvestmentCostType == "actualCost").SumAsync(x => x.OverallCost);
            if(invesmentyCost != null)
            {
                pimGateAndTotalCost.ActualSendingCost = invesmentyCost;
            }



            return pimGateAndTotalCost;
        }
        public async Task<List<LookbackPerson>> GetLookbackPersonFromSettingByPlant(string plant)
        {
            List<LookbackPerson> lookbackPersons = new List<LookbackPerson>();
            var lookbackList = await _context.CommonData
                .Join(_context.Owners,
                commonDataTable => commonDataTable.Attribute03,
                owner=>owner.EmployeeID,
                (commonDataTable,owner) => new
                {
                      Id = commonDataTable.Id,
                      DataType = commonDataTable.DataType,
                      Attribute01 = commonDataTable.Attribute01,
                    Attribute02 = commonDataTable.Attribute02,
                    Attribute03 = commonDataTable.Attribute03,
                    OwnerName = owner.OwnerName
                })
                .Where(x => x.DataType == "LookbackMembers" && x.Attribute01 == plant).ToListAsync();



            //var maxApprover = await _context.MaxApproverSettings.Join(
            //             _context.Owners,
            //             maxApprover => maxApprover.ApproverEmail,
            //             owner => owner.Email,
            //             (maxApprover, owner) => new
            //             {
            //                 Id = maxApprover.Id,
            //                 WorkstreamType = maxApprover.WorkstreamType,
            //                 WorkstreamValue = maxApprover.WorkstreamValue,
            //                 Indicator = maxApprover.Indicator,
            //                 ApproverEmail = maxApprover.ApproverEmail,
            //                 Order = maxApprover.Order,
            //                 IsRequestCapex = maxApprover.IsRequestCapex,
            //                 BenefitMin = maxApprover.BenefitMin,
            //                 BenefitMax = maxApprover.BenefitMax,
            //                 OwnerName = owner.OwnerName

            //             }).Where(s => s.WorkstreamType == "SubWorkstream" && s.WorkstreamValue == Workstream.Name && s.IsRequestCapex == true).OrderBy(s => s.Order).ToListAsync();



            if (!lookbackList.Any())
            {
                return null;
            }

            foreach(var item in lookbackList)
            {
                LookbackPerson lookbackPerson =
                new LookbackPerson(){
                    Indicator = item.Attribute02,
                    EmployeeID = item.Attribute03,
                    OwnerName = item.OwnerName
                };
                lookbackPersons.Add(lookbackPerson);
            }

            return lookbackPersons;
        }
    }
}
