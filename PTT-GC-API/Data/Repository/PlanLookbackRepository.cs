using PTT_GC_API.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Dtos.LookbackReview;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Dtos.Lookback;
using PTT_GC_API.Dtos.ExecutionLookback;
using PTT_GC_API.Dtos.CoreUplift;
using PTT_GC_API.Dtos.ProjectImpact;
using PTT_GC_API.Dtos.ProjectImpactWork;
using System.Globalization;
using System.Threading;
using PTT_GC_API.Dtos.CimLookback;

namespace PTT_GC_API.Data.Repository
{
    public class PlanLookbackRepository : PlanLookbackInterface
    {
        private readonly DataContext _context;
        public PlanLookbackRepository(DataContext context)
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
            return await _context.LookbackReview.AnyAsync();
        }

        public async Task<LookbackReview> GetLookBack(int id)
        {
            var LookBack = await _context.LookbackReview.SingleOrDefaultAsync(i => i.LookbackReviewId == id);
            return LookBack;
        }

        public async Task<List<LookbackReview>> GetBlogsAsync()
        {
            return await _context.LookbackReview.ToListAsync();
        }
        public async Task<int> LastIdPlanLookBack()
        {
            int id;
            if (_context.LookbackReview.Any())
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

        public async Task<List<LookbackReviewList>> GetLookbackReviewAll()
        {
            var data = await _context.LookbackReview.OrderByDescending(i => i.ProjectLookbackId).ToListAsync();
            List<LookbackReviewList> joinInitiatives = new List<LookbackReviewList>();
            for (int i = 0; i < data.Count; i++)
            {
                LookbackReviewList lookbackReviewParam = new LookbackReviewList();
                lookbackReviewParam.LookbackReviewId = data[i].LookbackReviewId;
                lookbackReviewParam.ProjectLookbackId = data[i].ProjectLookbackId;
                lookbackReviewParam.ProjectReviewTeam = data[i].ProjectReviewTeam;
                joinInitiatives.Add(lookbackReviewParam);
            }
            return joinInitiatives;
        }

        public async Task<LookbackReview> GetLookbackReviewByID(int id)
        {
            var LookbackReview = await _context.LookbackReview.SingleOrDefaultAsync(i => i.LookbackReviewId == id);
            return LookbackReview;
        }



        public async Task<LookbackList> GetPlanLookbackByID(int id)
        {
            LookbackList lookbackList = new LookbackList();
            LookbackList lookbackParam = new LookbackList();
            CultureInfo us = CultureInfo.GetCultureInfo("en-US");
            var dataProjectLookback = await _context.ProjectLookback.Where(i => i.InitiativeId == id).FirstOrDefaultAsync();
            
            if (dataProjectLookback != null)
            {
                var lookbackId = dataProjectLookback.ProjectLookbackId;

                lookbackParam.ProjectLookbackId = dataProjectLookback.ProjectLookbackId;
                lookbackParam.InitiativeId = dataProjectLookback.InitiativeId;
                if (dataProjectLookback.FinishingDate != null)
                {
                    lookbackParam.FinishingDate = dataProjectLookback.FinishingDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                }
                if (dataProjectLookback.PlanLookbackDate != null)
                {
                    lookbackParam.PlanLookbackDate = dataProjectLookback.PlanLookbackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                }
                if (dataProjectLookback.PlanEnviLookBackDate != null)
                {
                    lookbackParam.PlanEnviLookBackDate = dataProjectLookback.PlanEnviLookBackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                }
                if (dataProjectLookback.PlanPerformanceLookbackDate != null)
                {
                    lookbackParam.PlanPerformanceLookbackDate = dataProjectLookback.PlanPerformanceLookbackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                }


                if (dataProjectLookback.ProjectBackground != null)
                {
                    lookbackParam.ProjectBackground = dataProjectLookback.ProjectBackground.ToString();
                }
                if (dataProjectLookback.ScopeOfInitiative != null)
                {
                    lookbackParam.ScopeOfInitiative = dataProjectLookback.ScopeOfInitiative.ToString();
                }
                if (dataProjectLookback.ProjectObjective != null)
                {
                    lookbackParam.ProjectObjective = dataProjectLookback.ProjectObjective.ToString();
                }
                if (dataProjectLookback.PerformanceLookback != null)
                {
                    lookbackParam.PerformanceLookback = dataProjectLookback.PerformanceLookback;
                }
                if (dataProjectLookback.ExecutionLookback != null)
                {
                    lookbackParam.ExecutionLookbackProcess = dataProjectLookback.ExecutionLookback;
                }
                if (dataProjectLookback.EnvironmentLookback != null)
                {
                    lookbackParam.EnvironmentLookback = dataProjectLookback.EnvironmentLookback;
                }
                if (dataProjectLookback.CimLookback != null)
                {
                    lookbackParam.CimLookback = dataProjectLookback.CimLookback;
                }

                if (dataProjectLookback.PerformancePlanLookbackDate != null)
                {
                    lookbackParam.PerformancePlanLookbackDate = dataProjectLookback.PerformancePlanLookbackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                }

                if (dataProjectLookback.CoreUpliftResultDescription != null)
                {
                    lookbackParam.CoreUpliftResultDescription = dataProjectLookback.CoreUpliftResultDescription.ToString();
                }
                if (dataProjectLookback.CoreUpliftResultUnit != null)
                {
                    lookbackParam.CoreUpliftResultUnit = dataProjectLookback.CoreUpliftResultUnit.ToString();
                }
                if (dataProjectLookback.CoreUpliftResultBefore != null)
                {
                    lookbackParam.CoreUpliftResultBefore = dataProjectLookback.CoreUpliftResultBefore.ToString();
                }
                if (dataProjectLookback.CoreUpliftResultAfter != null)
                {
                    lookbackParam.CoreUpliftResultAfter = dataProjectLookback.CoreUpliftResultAfter.ToString();
                }
                if (dataProjectLookback.CoreUpliftResultBenefit != null)
                {
                    lookbackParam.CoreUpliftResultBenefit = dataProjectLookback.CoreUpliftResultBenefit.ToString();
                }
                if (dataProjectLookback.CoreUpliftResultRating != null)
                {
                    lookbackParam.CoreUpliftResultRating = dataProjectLookback.CoreUpliftResultRating.ToString();
                }
                if (dataProjectLookback.EnviPlanLookbackDate != null)
                {
                    lookbackParam.EnviPlanLookbackDate = dataProjectLookback.EnviPlanLookbackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                }
                if (dataProjectLookback.ResponsibleEnvirEngineer != null)
                {
                    lookbackParam.ResponsibleEnvirEngineer = dataProjectLookback.ResponsibleEnvirEngineer;
                }
                var dataEnvironmentProjectType = await _context.EnvironmentProjectType.Where(i => i.ProjectLookbackId == lookbackId).ToListAsync();
                if (dataEnvironmentProjectType != null)
                {
                    List<String> ListPollutionPrevention = new List<string>();
                    List<String> ListGlobalEnvirCons = new List<string>();
                    List<String> ListResourceCirculation = new List<string>();
                    for (int index = 0; index < dataEnvironmentProjectType.Count; index++)
                    {
                        if (dataEnvironmentProjectType[index].EnviType == "Poll")
                        {
                            ListPollutionPrevention.Add(dataEnvironmentProjectType[index].EnviTypeValue);
                        }
                        else if (dataEnvironmentProjectType[index].EnviType == "Global")
                        {
                            ListGlobalEnvirCons.Add(dataEnvironmentProjectType[index].EnviTypeValue);
                        }
                        else if (dataEnvironmentProjectType[index].EnviType == "Resource")
                        {
                            ListResourceCirculation.Add(dataEnvironmentProjectType[index].EnviTypeValue);
                        }

                    }

                    lookbackParam.PollutionPrevention = ListPollutionPrevention;
                    lookbackParam.GlobalEnvirCons = ListGlobalEnvirCons;
                    lookbackParam.ResourceCirculation = ListResourceCirculation;
                }

                //if (dataProjectLookback.PollutionPrevention != null)
                //{
                //    lookbackParam.PollutionPrevention = dataProjectLookback.PollutionPrevention.ToString();
                //}
                if (dataProjectLookback.PollutionPreventionSpecify != null)
                {
                    lookbackParam.PollutionPreventionSpecify = dataProjectLookback.PollutionPreventionSpecify.ToString();
                }
                //if (dataProjectLookback.GlobalEnvirCons != null)
                //{
                //    lookbackParam.GlobalEnvirCons = dataProjectLookback.GlobalEnvirCons.ToString();
                //}
                if (dataProjectLookback.GlobalEnvirConsSpecify != null)
                {
                    lookbackParam.GlobalEnvirConsSpecify = dataProjectLookback.GlobalEnvirConsSpecify.ToString();
                }
                //if (dataProjectLookback.ResourceCirculation != null)
                //{
                //    lookbackParam.ResourceCirculation = dataProjectLookback.ResourceCirculation.ToString();
                //}
                if (dataProjectLookback.ResourceCirculationSpecify != null)
                {
                    lookbackParam.ResourceCirculationSpecify = dataProjectLookback.ResourceCirculationSpecify.ToString();
                }

                if (dataProjectLookback.EnvironmentResultCategory != null)
                {
                    lookbackParam.EnvironmentResultCategory = dataProjectLookback.EnvironmentResultCategory.ToString();
                }
                if (dataProjectLookback.EnvironmentResultCategory != null)
                {
                    lookbackParam.EnvironmentResultUnit = dataProjectLookback.EnvironmentResultUnit.ToString();
                }
                if (dataProjectLookback.EnvironmentResultCategory != null)
                {
                    lookbackParam.EnvironmentResultBefore = dataProjectLookback.EnvironmentResultBefore.ToString();
                }
                if (dataProjectLookback.EnvironmentResultCategory != null)
                {
                    lookbackParam.EnvironmentResultAfter = dataProjectLookback.EnvironmentResultAfter.ToString();
                }
                if (dataProjectLookback.EnvironmentResultCategory != null)
                {
                    lookbackParam.EnvironmentResultBenefitYear = dataProjectLookback.EnvironmentResultBenefitYear.ToString();
                }
                if (dataProjectLookback.EnvironmentResultBenefitYearThb != null)
                {
                    lookbackParam.EnvironmentResultBenefitYearThb = dataProjectLookback.EnvironmentResultBenefitYearThb.ToString();
                }
                if (dataProjectLookback.EnvironmentResultRemark != null)
                {
                    lookbackParam.EnvironmentResultRemark = dataProjectLookback.EnvironmentResultRemark.ToString();
                }

                var dataLookbackReview = await _context.LookbackReview.Where(i => i.ProjectLookbackId == lookbackId).ToListAsync();
                if (dataLookbackReview != null)
                {
                    lookbackParam.LookbackReview = new List<LookbackReviewList>();
                    for (int i = 0; i < dataLookbackReview.Count; i++)
                    {
                        LookbackReviewList lookbackReviewParam = new LookbackReviewList();
                        lookbackReviewParam.LookbackReviewId = dataLookbackReview[i].LookbackReviewId;
                        lookbackReviewParam.ProjectLookbackId = dataLookbackReview[i].ProjectLookbackId;
                        lookbackReviewParam.ProjectReviewTeam = dataLookbackReview[i].ProjectReviewTeam;
                        lookbackParam.LookbackReview.Add(lookbackReviewParam);
                    }
                }
                var dataExecutionLookback = await _context.ExecutionLookback.Where(i => i.ProjectLookbackId == lookbackId).ToListAsync();
                if (dataExecutionLookback != null)
                {
                    lookbackParam.ExecutionLookback = new List<ExecutionLookbackList>();
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
                        lookbackParam.ExecutionLookback.Add(executionLookbackParam);
                    }
                }
                var dataCoreUplift = await _context.CoreUplift.Where(i => i.ProjectLookbackId == lookbackId).ToListAsync();
                if (dataCoreUplift != null)
                {
                    lookbackParam.CoreUplift = new List<CoreUpliftList>();
                    for (int i = 0; i < dataCoreUplift.Count; i++)
                    {
                        CoreUpliftList coreUpliftParam = new CoreUpliftList();
                        coreUpliftParam.CoreUpliftId = dataCoreUplift[i].CoreUpliftId;
                        coreUpliftParam.ProjectLookbackId = dataCoreUplift[i].ProjectLookbackId;
                        coreUpliftParam.Economics = dataCoreUplift[i].Economics;
                        coreUpliftParam.EstimatedPlaned = dataCoreUplift[i].EstimatedPlaned;
                        coreUpliftParam.Actual = dataCoreUplift[i].Actual;
                        coreUpliftParam.WhyDifference = dataCoreUplift[i].WhyDifference;
                        coreUpliftParam.Remark = dataCoreUplift[i].Remark;
                        coreUpliftParam.Comment = dataCoreUplift[i].Comment;
                        lookbackParam.CoreUplift.Add(coreUpliftParam);
                    }
                }
                var dataProjectImpact = await _context.ProjectImpact.Where(i => i.ProjectLookbackId == lookbackId).ToListAsync();
                if (dataProjectImpact != null)
                {
                    lookbackParam.ProjectImpact = new List<ProjectImpactList>();
                    for (int i = 0; i < dataProjectImpact.Count; i++)
                    {
                        ProjectImpactList projectImpactParam = new ProjectImpactList();
                        projectImpactParam.ProjectImpactId = dataProjectImpact[i].ProjectImpactId;
                        projectImpactParam.ProjectLookbackId = dataProjectImpact[i].ProjectLookbackId;
                        projectImpactParam.Situation = dataProjectImpact[i].Situation;
                        projectImpactParam.Before = dataProjectImpact[i].Before;
                        projectImpactParam.Target = dataProjectImpact[i].Target;
                        projectImpactParam.After = dataProjectImpact[i].After;
                        lookbackParam.ProjectImpact.Add(projectImpactParam);
                    }
                }
                var dataProjectImpactWork = await _context.ProjectImpactWork.Where(i => i.ProjectLookbackId == lookbackId).ToListAsync();
                if (dataProjectImpactWork != null)
                {
                    lookbackParam.ProjectImpactWork = new List<ProjectImpactWorkList>();
                    for (int i = 0; i < dataProjectImpactWork.Count; i++)
                    {
                        ProjectImpactWorkList projectImpactWorkParam = new ProjectImpactWorkList();
                        projectImpactWorkParam.ProjectImpactWorkId = dataProjectImpactWork[i].ProjectImpactWorkId;
                        projectImpactWorkParam.ProjectLookbackId = dataProjectImpactWork[i].ProjectLookbackId;
                        projectImpactWorkParam.WhatWorked = dataProjectImpactWork[i].WhatWorked;
                        projectImpactWorkParam.WhatDidNotWork = dataProjectImpactWork[i].WhatDidNotWork;
                        lookbackParam.ProjectImpactWork.Add(projectImpactWorkParam);
                    }
                }

                var dataCimLookback = await _context.CimLookback.Where(i => i.ProjectLookbackId == lookbackId).ToListAsync();
                if (dataCimLookback != null)
                {
                    lookbackParam.CimLookbackId = new List<CimLookbackList>();
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
                        lookbackParam.CimLookbackId.Add(cimLookbackParam);
                    }
                }

                if (dataProjectLookback.McEndorseDate != null)
                {
                    lookbackParam.McEndorseDate = dataProjectLookback.McEndorseDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                }
                if (dataProjectLookback.BusinessPlanAsOfDate != null)
                {
                    lookbackParam.BusinessPlanAsOfDate = dataProjectLookback.BusinessPlanAsOfDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                }
                if (dataProjectLookback.BusinessPlanAsOfDate2 != null)
                {
                    lookbackParam.BusinessPlanAsOfDate2 = dataProjectLookback.BusinessPlanAsOfDate2.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                }

                lookbackList = lookbackParam;
            }
           
                return lookbackList;
            
        }

        public async Task<List<LookbackList>> GetPlanLookbackAll()
        {
            List<LookbackList> lookbackList = new List<LookbackList>();
    
            CultureInfo us = CultureInfo.GetCultureInfo("en-US");         

            var dataProjectLookback = await _context.ProjectLookback.OrderByDescending(i => i.ProjectLookbackId).ToListAsync();
            if (dataProjectLookback != null)
            {
                List<LookbackList> joinInitiatives = new List<LookbackList>();
                for (int i = 0; i < dataProjectLookback.Count; i++)
                {
                    LookbackList lookbackParam = new LookbackList();
                    lookbackParam.ProjectLookbackId = dataProjectLookback[i].ProjectLookbackId;
                    //lookbackParam.FinishingDate = dataProjectLookback[i].FinishingDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    //lookbackParam.PlanLookbackDate = dataProjectLookback[i].PlanLookbackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    //lookbackParam.PlanEnviLookBackDate = dataProjectLookback[i].PlanEnviLookBackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    //lookbackParam.PlanPerformanceLookbackDate = dataProjectLookback[i].PlanPerformanceLookbackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);

                    //lookbackParam.ProjectBackground = dataProjectLookback[i].ProjectBackground.ToString();
                    //lookbackParam.ScopeOfInitiative = dataProjectLookback[i].ScopeOfInitiative.ToString();
                    //lookbackParam.ProjectObjective = dataProjectLookback[i].ProjectObjective.ToString();
                    //lookbackParam.ExecutionLookbackProcess = dataProjectLookback[i].ExecutionLookback.ToString();
                    //lookbackParam.PerformanceLookback = dataProjectLookback[i].PerformanceLookback.ToString();
                    //lookbackParam.EnvironmentLookback = dataProjectLookback[i].EnvironmentLookback.ToString();
                    //lookbackParam.CimLookback = dataProjectLookback[i].CimLookback.ToString();

                    if (dataProjectLookback[i].FinishingDate != null)
                    {
                        lookbackParam.FinishingDate = dataProjectLookback[i].FinishingDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    }
                    if (dataProjectLookback[i].PlanLookbackDate != null)
                    {
                        lookbackParam.PlanLookbackDate = dataProjectLookback[i].PlanLookbackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    }
                    if (dataProjectLookback[i].PlanEnviLookBackDate != null)
                    {
                        lookbackParam.PlanEnviLookBackDate = dataProjectLookback[i].PlanEnviLookBackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    }
                    if (dataProjectLookback[i].PlanPerformanceLookbackDate != null)
                    {
                        lookbackParam.PlanPerformanceLookbackDate = dataProjectLookback[i].PlanPerformanceLookbackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    }


                    if (dataProjectLookback[i].ProjectBackground != null)
                    {
                        lookbackParam.ProjectBackground = dataProjectLookback[i].ProjectBackground.ToString();
                    }
                    if (dataProjectLookback[i].ScopeOfInitiative != null)
                    {
                        lookbackParam.ScopeOfInitiative = dataProjectLookback[i].ScopeOfInitiative.ToString();
                    }
                    if (dataProjectLookback[i].ProjectObjective != null)
                    {
                        lookbackParam.ProjectObjective = dataProjectLookback[i].ProjectObjective.ToString();
                    }
                    if (dataProjectLookback[i].PerformanceLookback != null)
                    {
                        lookbackParam.PerformanceLookback = dataProjectLookback[i].PerformanceLookback;
                    }
                    if (dataProjectLookback[i].ExecutionLookback != null)
                    {
                        lookbackParam.ExecutionLookbackProcess = dataProjectLookback[i].ExecutionLookback;
                    }
                    if (dataProjectLookback[i].EnvironmentLookback != null)
                    {
                        lookbackParam.EnvironmentLookback = dataProjectLookback[i].EnvironmentLookback;
                    }
                    if (dataProjectLookback[i].CimLookback != null)
                    {
                        lookbackParam.CimLookback = dataProjectLookback[i].CimLookback;
                    }

                    if (dataProjectLookback[i].PerformancePlanLookbackDate != null)
                    {
                        lookbackParam.PerformancePlanLookbackDate = dataProjectLookback[i].PerformancePlanLookbackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    }

                    if (dataProjectLookback[i].CoreUpliftResultDescription != null)
                    {
                        lookbackParam.CoreUpliftResultDescription = dataProjectLookback[i].CoreUpliftResultDescription.ToString();
                    }
                    if (dataProjectLookback[i].CoreUpliftResultUnit != null)
                    {
                        lookbackParam.CoreUpliftResultUnit = dataProjectLookback[i].CoreUpliftResultUnit.ToString();
                    }
                    if (dataProjectLookback[i].CoreUpliftResultBefore != null)
                    {
                        lookbackParam.CoreUpliftResultBefore = dataProjectLookback[i].CoreUpliftResultBefore.ToString();
                    }
                    if (dataProjectLookback[i].CoreUpliftResultAfter != null)
                    {
                        lookbackParam.CoreUpliftResultAfter = dataProjectLookback[i].CoreUpliftResultAfter.ToString();
                    }
                    if (dataProjectLookback[i].CoreUpliftResultBenefit != null)
                    {
                        lookbackParam.CoreUpliftResultBenefit = dataProjectLookback[i].CoreUpliftResultBenefit.ToString();
                    }
                    if (dataProjectLookback[i].CoreUpliftResultRating != null)
                    {
                        lookbackParam.CoreUpliftResultRating = dataProjectLookback[i].CoreUpliftResultRating.ToString();
                    }
                    if (dataProjectLookback[i].EnviPlanLookbackDate != null)
                    {
                        lookbackParam.EnviPlanLookbackDate = dataProjectLookback[i].EnviPlanLookbackDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    }
                    if (dataProjectLookback[i].ResponsibleEnvirEngineer != null)
                    {
                        lookbackParam.ResponsibleEnvirEngineer = dataProjectLookback[i].ResponsibleEnvirEngineer;
                    }


                    int id = dataProjectLookback[i].ProjectLookbackId;
                    var dataEnvironmentProjectType = await _context.EnvironmentProjectType.Where(i => i.ProjectLookbackId == id).ToListAsync();
                    if (dataEnvironmentProjectType != null)
                    {
                        List<String> ListPollutionPrevention = new List<string>();
                        List<String> ListGlobalEnvirCons = new List<string>();
                        List<String> ListResourceCirculation = new List<string>();
                        for (int index = 0; index < dataEnvironmentProjectType.Count; index++)
                        {
                            if (dataEnvironmentProjectType[index].EnviType == "Poll")
                            {
                                ListPollutionPrevention.Add(dataEnvironmentProjectType[index].EnviTypeValue);
                            }
                            else if (dataEnvironmentProjectType[index].EnviType == "Global")
                            {
                                ListGlobalEnvirCons.Add(dataEnvironmentProjectType[index].EnviTypeValue);
                            }
                            else if (dataEnvironmentProjectType[index].EnviType == "Resource")
                            {
                                ListResourceCirculation.Add(dataEnvironmentProjectType[index].EnviTypeValue);
                            }

                        }

                        lookbackParam.PollutionPrevention = ListPollutionPrevention;
                        lookbackParam.GlobalEnvirCons = ListGlobalEnvirCons;
                        lookbackParam.ResourceCirculation = ListResourceCirculation;
                    }

                    //if (dataProjectLookback[i].PollutionPrevention != null)
                    //{
                    //    lookbackParam.PollutionPrevention = dataProjectLookback[i].PollutionPrevention.ToString();
                    //}
                    if (dataProjectLookback[i].PollutionPreventionSpecify != null)
                    {
                        lookbackParam.PollutionPreventionSpecify = dataProjectLookback[i].PollutionPreventionSpecify.ToString();
                    }
                    //if (dataProjectLookback[i].GlobalEnvirCons != null)
                    //{
                    //    lookbackParam.GlobalEnvirCons = dataProjectLookback[i].GlobalEnvirCons.ToString();
                    //}
                    if (dataProjectLookback[i].GlobalEnvirConsSpecify != null)
                    {
                        lookbackParam.GlobalEnvirConsSpecify = dataProjectLookback[i].GlobalEnvirConsSpecify.ToString();
                    }
                    //if (dataProjectLookback[i].ResourceCirculation != null)
                    //{
                    //    lookbackParam.ResourceCirculation = dataProjectLookback[i].ResourceCirculation.ToString();
                    //}
                    if (dataProjectLookback[i].ResourceCirculationSpecify != null)
                    {
                        lookbackParam.ResourceCirculationSpecify = dataProjectLookback[i].ResourceCirculationSpecify.ToString();
                    }

                    if (dataProjectLookback[i].EnvironmentResultCategory != null)
                    {
                        lookbackParam.EnvironmentResultCategory = dataProjectLookback[i].EnvironmentResultCategory.ToString();
                    }
                    if (dataProjectLookback[i].EnvironmentResultCategory != null)
                    {
                        lookbackParam.EnvironmentResultUnit = dataProjectLookback[i].EnvironmentResultUnit.ToString();
                    }
                    if (dataProjectLookback[i].EnvironmentResultCategory != null)
                    {
                        lookbackParam.EnvironmentResultBefore = dataProjectLookback[i].EnvironmentResultBefore.ToString();
                    }
                    if (dataProjectLookback[i].EnvironmentResultCategory != null)
                    {
                        lookbackParam.EnvironmentResultAfter = dataProjectLookback[i].EnvironmentResultAfter.ToString();
                    }
                    if (dataProjectLookback[i].EnvironmentResultCategory != null)
                    {
                      lookbackParam.EnvironmentResultBenefitYear = dataProjectLookback[i].EnvironmentResultBenefitYear.ToString();
                    }
                    if (dataProjectLookback[i].EnvironmentResultBenefitYearThb != null)
                    {
                        lookbackParam.EnvironmentResultBenefitYearThb = dataProjectLookback[i].EnvironmentResultBenefitYearThb.ToString();
                    }
                    if (dataProjectLookback[i].EnvironmentResultRemark != null)
                    {
                        lookbackParam.EnvironmentResultRemark = dataProjectLookback[i].EnvironmentResultRemark.ToString();
                    }
                    if (dataProjectLookback[i].McEndorseDate != null)
                    {
                        lookbackParam.McEndorseDate = dataProjectLookback[i].McEndorseDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    }
                    if (dataProjectLookback[i].BusinessPlanAsOfDate != null)
                    {
                        lookbackParam.BusinessPlanAsOfDate = dataProjectLookback[i].BusinessPlanAsOfDate.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    }
                    if (dataProjectLookback[i].BusinessPlanAsOfDate2 != null)
                    {
                        lookbackParam.BusinessPlanAsOfDate2 = dataProjectLookback[i].BusinessPlanAsOfDate2.Value.ToString("yyyy-MM-dd HH:mm:ss", us);
                    }

                    var dataLookbackReview = await _context.LookbackReview.Where(i => i.ProjectLookbackId == lookbackParam.ProjectLookbackId).ToListAsync();
                    if (dataLookbackReview != null)
                    {
                        lookbackParam.LookbackReview = new List<LookbackReviewList>();
                        for (int j = 0; j < dataLookbackReview.Count; j++)
                        {
                            LookbackReviewList lookbackReviewParam = new LookbackReviewList();
                            lookbackReviewParam.LookbackReviewId = dataLookbackReview[j].LookbackReviewId;
                            lookbackReviewParam.ProjectLookbackId = dataLookbackReview[j].ProjectLookbackId;
                            lookbackReviewParam.ProjectReviewTeam = dataLookbackReview[j].ProjectReviewTeam;
                            lookbackParam.LookbackReview.Add(lookbackReviewParam);
                        }
                    }
                    var dataExecutionLookback = await _context.ExecutionLookback.Where(i => i.ProjectLookbackId == lookbackParam.ProjectLookbackId).ToListAsync();
                    if (dataExecutionLookback != null)
                    {
                        lookbackParam.ExecutionLookback = new List<ExecutionLookbackList>();
                        for (int j = 0; j < dataExecutionLookback.Count; j++)
                        {
                            ExecutionLookbackList executionLookbackParam = new ExecutionLookbackList();
                            executionLookbackParam.ExecutionLookbackId = dataExecutionLookback[j].ExecutionLookbackId;
                            executionLookbackParam.ProjectLookbackId = dataExecutionLookback[j].ProjectLookbackId;
                            executionLookbackParam.KnowledgeArea = dataExecutionLookback[j].KnowledgeArea;
                            executionLookbackParam.Plan = dataExecutionLookback[j].Plan;
                            executionLookbackParam.Actual = dataExecutionLookback[j].Actual; 
                            executionLookbackParam.Issue = dataExecutionLookback[j].Issue;
                            executionLookbackParam.Background = dataExecutionLookback[j].Background;
                            executionLookbackParam.LessonLearned = dataExecutionLookback[j].LessonLearned;
                            executionLookbackParam.Remark = dataExecutionLookback[j].Remark;
                            executionLookbackParam.Comment = dataExecutionLookback[j].Comment;
                            lookbackParam.ExecutionLookback.Add(executionLookbackParam);
                        }
                    }
                    var dataCoreUplift = await _context.CoreUplift.Where(i => i.ProjectLookbackId == lookbackParam.ProjectLookbackId).ToListAsync();
                    if (dataCoreUplift != null)
                    {
                        lookbackParam.CoreUplift = new List<CoreUpliftList>();
                        for (int j = 0; j < dataCoreUplift.Count; j++)
                        {
                            CoreUpliftList coreUpliftParam = new CoreUpliftList();
                            coreUpliftParam.CoreUpliftId = dataCoreUplift[j].CoreUpliftId;
                            coreUpliftParam.ProjectLookbackId = dataCoreUplift[j].ProjectLookbackId;
                            coreUpliftParam.Economics = dataCoreUplift[j].Economics;
                            coreUpliftParam.EstimatedPlaned = dataCoreUplift[j].EstimatedPlaned;
                            coreUpliftParam.Actual = dataCoreUplift[j].Actual;
                            coreUpliftParam.WhyDifference = dataCoreUplift[j].WhyDifference;
                            coreUpliftParam.Remark = dataCoreUplift[j].Remark;
                            coreUpliftParam.Comment = dataCoreUplift[j].Comment;
                            lookbackParam.CoreUplift.Add(coreUpliftParam);
                        }
                    }
                    var dataProjectImpact = await _context.ProjectImpact.Where(i => i.ProjectLookbackId == lookbackParam.ProjectLookbackId).ToListAsync();
                    if (dataProjectImpact != null)
                    {
                        lookbackParam.ProjectImpact = new List<ProjectImpactList>();
                        for (int j = 0; j < dataProjectImpact.Count; j++)
                        {
                            ProjectImpactList projectImpactParam = new ProjectImpactList();
                            projectImpactParam.ProjectImpactId = dataProjectImpact[j].ProjectImpactId;
                            projectImpactParam.ProjectLookbackId = dataProjectImpact[j].ProjectLookbackId;
                            projectImpactParam.Situation = dataProjectImpact[j].Situation;
                            projectImpactParam.Before = dataProjectImpact[j].Before;
                            projectImpactParam.Target = dataProjectImpact[j].Target;
                            projectImpactParam.After = dataProjectImpact[j].After;
                            lookbackParam.ProjectImpact.Add(projectImpactParam);
                        }
                    }
                    var dataProjectImpactWork = await _context.ProjectImpactWork.Where(i => i.ProjectLookbackId == lookbackParam.ProjectLookbackId).ToListAsync();
                    if (dataProjectImpactWork != null)
                    {
                        lookbackParam.ProjectImpactWork = new List<ProjectImpactWorkList>();
                        for (int j = 0; j < dataProjectImpactWork.Count; j++)
                        {
                            ProjectImpactWorkList projectImpactWorkParam = new ProjectImpactWorkList();
                            projectImpactWorkParam.ProjectImpactWorkId = dataProjectImpactWork[j].ProjectImpactWorkId;
                            projectImpactWorkParam.ProjectLookbackId = dataProjectImpactWork[j].ProjectLookbackId;
                            projectImpactWorkParam.WhatWorked = dataProjectImpactWork[j].WhatWorked;
                            projectImpactWorkParam.WhatDidNotWork = dataProjectImpactWork[j].WhatDidNotWork;
                            lookbackParam.ProjectImpactWork.Add(projectImpactWorkParam);
                        }
                    }

                    var dataCimLookback = await _context.CimLookback.Where(i => i.ProjectLookbackId == lookbackParam.ProjectLookbackId).ToListAsync();
                    if (dataCimLookback != null)
                    {
                        lookbackParam.CimLookbackId = new List<CimLookbackList>();
                        for (int j = 0; j < dataCimLookback.Count; j++)
                        {
                            CimLookbackList cimLookbackParam = new CimLookbackList();
                            cimLookbackParam.CimLookbackId = dataCimLookback[j].CimLookbackId;
                            cimLookbackParam.ProjectLookbackId = dataCimLookback[j].ProjectLookbackId;
                            cimLookbackParam.CimLookbackType = dataCimLookback[j].CimLookbackType;
                            cimLookbackParam.Aspect = dataCimLookback[j].Aspect;
                            cimLookbackParam.Approve = dataCimLookback[j].Approve;
                            cimLookbackParam.Actual = dataCimLookback[j].Actual;
                            cimLookbackParam.DifferenceNote = dataCimLookback[j].DifferenceNote;
                            cimLookbackParam.BusinessPlan = dataCimLookback[j].BusinessPlan;
                            cimLookbackParam.ResponsiblePerson = dataCimLookback[j].ResponsiblePerson;
                            lookbackParam.CimLookbackId.Add(cimLookbackParam);
                        }
                    }
                    lookbackList.Add(lookbackParam);
                }
              


              
            }

           
            return lookbackList;

        }
    }
}

