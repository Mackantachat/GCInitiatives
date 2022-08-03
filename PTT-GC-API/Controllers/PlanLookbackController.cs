using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.CimLookback;
using PTT_GC_API.Dtos.CoreUplift;
using PTT_GC_API.Dtos.ExecutionLookback;
using PTT_GC_API.Dtos.Lookback;
using PTT_GC_API.Dtos.LookbackReview;
using PTT_GC_API.Dtos.ProjectImpact;
using PTT_GC_API.Dtos.ProjectImpactWork;
using PTT_GC_API.Dtos.ProjectLookback;
using PTT_GC_API.Models;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanLookbackController : ControllerBase
    {

        private readonly PlanLookbackInterface _repository;
        private readonly ProjectLookbackInterface _Project_repository;
        private readonly LookbackReviewInterface _Review_repository;
        private readonly ExecutionLookbackInterface _Execution_repository;
        private readonly CoreUpliftInterface _CoreUplift_repository;
        private readonly ProjectImpactInterface _ProjectImpact_repository;
        private readonly ProjectImpactWorkInterface _ProjectImpactWork_repository;
        private readonly CimLookbackInterface _CimLookback_repository;
        private readonly EnvironmentProjectTypeInterface _EnvironmentProjectType_repository;
        private readonly IMapper _mapper;
        public PlanLookbackController(PlanLookbackInterface repository, ProjectLookbackInterface Project_repository, LookbackReviewInterface Review_repository, ExecutionLookbackInterface Execution_repository, CoreUpliftInterface CoreUplift_repository, ProjectImpactInterface ProjectImpact_repository, ProjectImpactWorkInterface ProjectImpactWork_repository, CimLookbackInterface CimLookback_repository, EnvironmentProjectTypeInterface EnvironmentProjectType_repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
            _Project_repository = Project_repository;
            _Review_repository = Review_repository;
            _Execution_repository = Execution_repository;
            _CoreUplift_repository = CoreUplift_repository;
            _ProjectImpact_repository = ProjectImpact_repository;
            _ProjectImpactWork_repository = ProjectImpactWork_repository;
            _CimLookback_repository = CimLookback_repository;
            _EnvironmentProjectType_repository = EnvironmentProjectType_repository;
        }
        [Route("GetPlanLookbackListAll")]
        [HttpGet]
        public async Task<IActionResult> GetPlanLookbackListAll()
        {
            try
            {
                var data_LookbackList = await _repository.GetPlanLookbackAll();

                return Ok(data_LookbackList);
            }
            catch (Exception ex)
            {
                return Ok("ERROR" + ex.Message);
            }
        }
        [Route("GetPlanLookbackByID")]
        [HttpGet]
        public async Task<IActionResult> GetPlanLookbackByID(int id)
        {
            try
            {
                var data_LookbackList = await _repository.GetPlanLookbackByID(id);

                return Ok(data_LookbackList);
            }
            catch (Exception ex)
            {
                return Ok("ERROR" + ex.Message);
            }
        }

        [Route("CreatePlanLookback")]
        [HttpPost]
        public async Task<IActionResult> CreatePlanLookback(LookbackList PlanLookbackCreate)
        {
            try
            {
                List<LookbackList> lookbackLists = new List<LookbackList>();
                var ItemPlanLookbackCreate = PlanLookbackCreate;
                var planLookback_Create = _mapper.Map<LookbackList>(ItemPlanLookbackCreate);
                ProjectLookback project_Lookback = new ProjectLookback();
                project_Lookback.InitiativeId = planLookback_Create.InitiativeId;
                if (planLookback_Create.FinishingDate != null)
                {
                    project_Lookback.FinishingDate = Convert.ToDateTime(planLookback_Create.FinishingDate);
                }

                if (planLookback_Create.PlanLookbackDate != null)
                {
                    project_Lookback.PlanLookbackDate = Convert.ToDateTime(planLookback_Create.PlanLookbackDate);
                }

                if (planLookback_Create.PlanPerformanceLookbackDate != null)
                {
                    project_Lookback.PlanEnviLookBackDate = Convert.ToDateTime(planLookback_Create.PlanEnviLookBackDate);
                }

                if (planLookback_Create.PlanPerformanceLookbackDate != null)
                {
                    project_Lookback.PlanPerformanceLookbackDate = Convert.ToDateTime(planLookback_Create.PlanPerformanceLookbackDate);
                }

                project_Lookback.ProjectBackground = planLookback_Create.ProjectBackground;
                project_Lookback.ScopeOfInitiative = planLookback_Create.ScopeOfInitiative;
                project_Lookback.ProjectObjective = planLookback_Create.ProjectObjective;
                project_Lookback.ExecutionLookback = Convert.ToBoolean(planLookback_Create.ExecutionLookbackProcess);
                project_Lookback.PerformanceLookback = Convert.ToBoolean(planLookback_Create.PerformanceLookback);
                project_Lookback.EnvironmentLookback = Convert.ToBoolean(planLookback_Create.EnvironmentLookback);
                project_Lookback.CimLookback = Convert.ToBoolean(planLookback_Create.CimLookback);

                if (planLookback_Create.PerformancePlanLookbackDate != null)
                {
                    project_Lookback.PerformancePlanLookbackDate = Convert.ToDateTime(planLookback_Create.PerformancePlanLookbackDate);
                }
                if (planLookback_Create.CoreUpliftResultDescription != null)
                {
                    project_Lookback.CoreUpliftResultDescription = planLookback_Create.CoreUpliftResultDescription;
                }
                if (planLookback_Create.CoreUpliftResultUnit != null)
                {
                    project_Lookback.CoreUpliftResultUnit = planLookback_Create.CoreUpliftResultUnit;
                }
                if (planLookback_Create.CoreUpliftResultBefore != null)
                {
                    project_Lookback.CoreUpliftResultBefore = planLookback_Create.CoreUpliftResultBefore;
                }
                if (planLookback_Create.CoreUpliftResultAfter != null)
                {
                    project_Lookback.CoreUpliftResultAfter = planLookback_Create.CoreUpliftResultAfter;
                }
                if (planLookback_Create.CoreUpliftResultBenefit != null)
                {
                    project_Lookback.CoreUpliftResultBenefit = planLookback_Create.CoreUpliftResultBenefit;
                }
                if (planLookback_Create.CoreUpliftResultRating != null)
                {
                    project_Lookback.CoreUpliftResultRating = planLookback_Create.CoreUpliftResultRating;
                }
                if (planLookback_Create.EnviPlanLookbackDate != null)
                {
                    project_Lookback.EnviPlanLookbackDate = Convert.ToDateTime(planLookback_Create.EnviPlanLookbackDate);
                }

                if(planLookback_Create.ResponsibleEnvirEngineer != null)
                {
                    project_Lookback.ResponsibleEnvirEngineer = planLookback_Create.ResponsibleEnvirEngineer;
                }

                //if(planLookback_Create.PollutionPrevention != null)
                //{
                //    for(int index=0; index < planLookback_Create.PollutionPrevention.Count; index++)
                //    {
                //        EnvironmentProjectType environmentProjectType = new EnvironmentProjectType();
                //        environmentProjectType.ProjectLookbackId = maxID;
                //        environmentProjectType.EnviType = "Poll";
                //        environmentProjectType.EnviTypeValue = planLookback_Create.PollutionPrevention[index];
                //        //var environmentProjectType_C = _mapper.Map<EnvironmentProjectType>(environmentProjectType);
                //        _EnvironmentProjectType_repository.Add(environmentProjectType);
                //        await _EnvironmentProjectType_repository.Save();
                //    }
                //}
                //project_Lookback.PollutionPrevention = planLookback_Create.PollutionPrevention;
                project_Lookback.PollutionPreventionSpecify = planLookback_Create.PollutionPreventionSpecify;
                ////project_Lookback.GlobalEnvirCons = planLookback_Create.GlobalEnvirCons;
                //if (planLookback_Create.GlobalEnvirCons != null)
                //{
                //    for (int index = 0; index < planLookback_Create.GlobalEnvirCons.Count; index++)
                //    {
                //        EnvironmentProjectType environmentProjectType = new EnvironmentProjectType();
                //        environmentProjectType.ProjectLookbackId = maxID;
                //        environmentProjectType.EnviType = "Global";
                //        environmentProjectType.EnviTypeValue = planLookback_Create.GlobalEnvirCons[index];
                //        //var environmentProjectType_C = _mapper.Map<EnvironmentProjectType>(environmentProjectType);
                //        _EnvironmentProjectType_repository.Add(environmentProjectType);
                //        await _EnvironmentProjectType_repository.Save();
                //    }
                //}
                project_Lookback.GlobalEnvirConsSpecify = planLookback_Create.GlobalEnvirConsSpecify;
                ////project_Lookback.ResourceCirculation = planLookback_Create.ResourceCirculation;
                //if (planLookback_Create.ResourceCirculation != null)
                //{
                //    for (int index = 0; index < planLookback_Create.ResourceCirculation.Count; index++)
                //    {
                //        EnvironmentProjectType environmentProjectType = new EnvironmentProjectType();
                //        environmentProjectType.ProjectLookbackId = maxID;
                //        environmentProjectType.EnviType = "Resource";
                //        environmentProjectType.EnviTypeValue = planLookback_Create.ResourceCirculation[index];
                //        //var environmentProjectType_C = _mapper.Map<EnvironmentProjectType>(environmentProjectType);
                //        _EnvironmentProjectType_repository.Add(environmentProjectType);
                //        await _EnvironmentProjectType_repository.Save();
                //    }
                //}
                project_Lookback.ResourceCirculationSpecify = planLookback_Create.ResourceCirculationSpecify;

                project_Lookback.EnvironmentResultCategory = planLookback_Create.EnvironmentResultCategory;
                project_Lookback.EnvironmentResultUnit = planLookback_Create.EnvironmentResultUnit;
                project_Lookback.EnvironmentResultBefore = planLookback_Create.EnvironmentResultBefore;
                project_Lookback.EnvironmentResultAfter = planLookback_Create.EnvironmentResultAfter;
                project_Lookback.EnvironmentResultBenefitYear = planLookback_Create.EnvironmentResultBenefitYear;
                project_Lookback.EnvironmentResultBenefitYearThb = planLookback_Create.EnvironmentResultBenefitYearThb;
                project_Lookback.EnvironmentResultRemark = planLookback_Create.EnvironmentResultRemark;
                project_Lookback.EnvironmentResultRemark = planLookback_Create.EnvironmentResultRemark;

                if (planLookback_Create.McEndorseDate != null)
                {
                    project_Lookback.McEndorseDate = Convert.ToDateTime(planLookback_Create.McEndorseDate);
                }

                if (planLookback_Create.BusinessPlanAsOfDate != null)
                {
                    project_Lookback.BusinessPlanAsOfDate = Convert.ToDateTime(planLookback_Create.BusinessPlanAsOfDate);
                }

                if (planLookback_Create.BusinessPlanAsOfDate2 != null)
                {
                    project_Lookback.BusinessPlanAsOfDate2 = Convert.ToDateTime(planLookback_Create.BusinessPlanAsOfDate2);
                }

                _Project_repository.Add(project_Lookback);
                await _Project_repository.Save();

                int maxID = await _repository.LastIdPlanLookBack();
                bool status = await _EnvironmentProjectType_repository.GetEnvironmentProjectTypeByIdThenDelete(maxID);
                if (!status)
                {
                    return Ok("Delete Table EnvironmentProjectType Error");
                }
                else
                {
                    if (planLookback_Create.PollutionPrevention != null)
                    {
                        for (int index = 0; index < planLookback_Create.PollutionPrevention.Count; index++)
                        {
                            EnvironmentProjectType environmentProjectType = new EnvironmentProjectType();
                            environmentProjectType.ProjectLookbackId = maxID;
                            environmentProjectType.EnviType = "Poll";
                            environmentProjectType.EnviTypeValue = planLookback_Create.PollutionPrevention[index];
                            _EnvironmentProjectType_repository.Add(environmentProjectType);
                            await _EnvironmentProjectType_repository.Save();
                        }
                    }
                    if (planLookback_Create.GlobalEnvirCons != null)
                    {
                        for (int index = 0; index < planLookback_Create.GlobalEnvirCons.Count; index++)
                        {
                            EnvironmentProjectType environmentProjectType = new EnvironmentProjectType();
                            environmentProjectType.ProjectLookbackId = maxID;
                            environmentProjectType.EnviType = "Global";
                            environmentProjectType.EnviTypeValue = planLookback_Create.GlobalEnvirCons[index];
                            _EnvironmentProjectType_repository.Add(environmentProjectType);
                            await _EnvironmentProjectType_repository.Save();
                        }
                    }
                    if (planLookback_Create.ResourceCirculation != null)
                    {
                        for (int index = 0; index < planLookback_Create.ResourceCirculation.Count; index++)
                        {
                            EnvironmentProjectType environmentProjectType = new EnvironmentProjectType();
                            environmentProjectType.ProjectLookbackId = maxID;
                            environmentProjectType.EnviType = "Resource";
                            environmentProjectType.EnviTypeValue = planLookback_Create.ResourceCirculation[index];
                            _EnvironmentProjectType_repository.Add(environmentProjectType);
                            await _EnvironmentProjectType_repository.Save();
                        }
                    }
                }
                List<LookbackReview> lookback_ReviewList = new List<LookbackReview>();
                List<LookbackReviewList> lookback_ReviewListItem = new List<LookbackReviewList>();
                if (planLookback_Create.LookbackReview != null)
                {
                    lookback_ReviewListItem = planLookback_Create.LookbackReview;
                    for (int j = 0; j < lookback_ReviewListItem.Count; j++)
                    {
                        LookbackReview lookback_Review = new LookbackReview();
                        lookback_Review.ProjectLookbackId = maxID;
                        lookback_Review.ProjectReviewTeam = lookback_ReviewListItem[j].ProjectReviewTeam;
                        var lookback_Review_C = _mapper.Map<LookbackReview>(lookback_Review);
                        _Review_repository.Add(lookback_Review_C);
                        await _Review_repository.Save();
                    }
                }

                List<ExecutionLookbackList> execution_LookbackListItem = new List<ExecutionLookbackList>();
                if (planLookback_Create.ExecutionLookback != null)
                {
                    execution_LookbackListItem = planLookback_Create.ExecutionLookback;
                    for (int j = 0; j < execution_LookbackListItem.Count; j++)
                    {
                        ExecutionLookback execution_Lookback = new ExecutionLookback();
                        execution_Lookback.ProjectLookbackId = maxID;
                        execution_Lookback.KnowledgeArea = execution_LookbackListItem[j].KnowledgeArea;
                        execution_Lookback.Plan = execution_LookbackListItem[j].Plan;
                        execution_Lookback.Actual = execution_LookbackListItem[j].Actual;
                        execution_Lookback.Issue = execution_LookbackListItem[j].Issue;
                        execution_Lookback.Background = execution_LookbackListItem[j].Background;
                        execution_Lookback.LessonLearned = execution_LookbackListItem[j].LessonLearned;
                        execution_Lookback.Remark = execution_LookbackListItem[j].Remark;
                        execution_Lookback.Comment = execution_LookbackListItem[j].Comment;
                        var lookback_Review_C = _mapper.Map<ExecutionLookback>(execution_Lookback);
                        _Execution_repository.Add(lookback_Review_C);
                        await _Execution_repository.Save();
                    }
                }

                List<CoreUpliftList> coreUplift_ListItem = new List<CoreUpliftList>();
                if (planLookback_Create.CoreUplift != null)
                {
                    coreUplift_ListItem = planLookback_Create.CoreUplift;
                    for (int j = 0; j < coreUplift_ListItem.Count; j++)
                    {
                        CoreUplift coreUplift = new CoreUplift();
                        coreUplift.ProjectLookbackId = maxID;
                        coreUplift.Economics = coreUplift_ListItem[j].Economics;
                        coreUplift.EstimatedPlaned = coreUplift_ListItem[j].EstimatedPlaned;
                        coreUplift.Actual = coreUplift_ListItem[j].Actual;
                        coreUplift.WhyDifference = coreUplift_ListItem[j].WhyDifference;
                        coreUplift.Remark = coreUplift_ListItem[j].Remark;
                        coreUplift.Comment = coreUplift_ListItem[j].Comment;
                        var lookback_Review_C = _mapper.Map<CoreUplift>(coreUplift);
                        _CoreUplift_repository.Add(lookback_Review_C);
                        await _CoreUplift_repository.Save();
                    }
                }

                List<ProjectImpactList> projectImpac_ListItem = new List<ProjectImpactList>();
                if (planLookback_Create.ProjectImpact != null)
                {
                    projectImpac_ListItem = planLookback_Create.ProjectImpact;
                    for (int j = 0; j < projectImpac_ListItem.Count; j++)
                    {
                        ProjectImpact projectImpac = new ProjectImpact();
                        projectImpac.ProjectLookbackId = maxID;
                        projectImpac.Situation = projectImpac_ListItem[j].Situation;
                        projectImpac.Before = projectImpac_ListItem[j].Before;
                        projectImpac.Target = projectImpac_ListItem[j].Target;
                        projectImpac.After = projectImpac_ListItem[j].After;
                        var lookback_Review_C = _mapper.Map<ProjectImpact>(projectImpac);
                        _ProjectImpact_repository.Add(lookback_Review_C);
                        await _ProjectImpact_repository.Save();
                    }
                }

                List<ProjectImpactWorkList> ProjectImpactWork_ListItem = new List<ProjectImpactWorkList>();
                if (planLookback_Create.ProjectImpactWork != null)
                {
                    ProjectImpactWork_ListItem = planLookback_Create.ProjectImpactWork;
                    for (int j = 0; j < ProjectImpactWork_ListItem.Count; j++)
                    {
                        ProjectImpactWork projectImpac_Work = new ProjectImpactWork();
                        projectImpac_Work.ProjectLookbackId = maxID;
                        projectImpac_Work.WhatWorked = ProjectImpactWork_ListItem[j].WhatWorked;
                        projectImpac_Work.WhatDidNotWork = ProjectImpactWork_ListItem[j].WhatDidNotWork;
                        var lookback_Review_C = _mapper.Map<ProjectImpactWork>(projectImpac_Work);
                        _ProjectImpactWork_repository.Add(lookback_Review_C);
                        await _ProjectImpactWork_repository.Save();
                    }
                }

                List<CimLookbackList> CimLookback_ListItem = new List<CimLookbackList>();
                if (planLookback_Create.CimLookbackId != null)
                {
                    CimLookback_ListItem = planLookback_Create.CimLookbackId;
                    for (int j = 0; j < CimLookback_ListItem.Count; j++)
                    {
                        CimLookback cimLookbackParam = new CimLookback();
                        cimLookbackParam.ProjectLookbackId = maxID;
                        cimLookbackParam.CimLookbackType = CimLookback_ListItem[j].CimLookbackType;
                        cimLookbackParam.Aspect = CimLookback_ListItem[j].Aspect;
                        cimLookbackParam.Approve = CimLookback_ListItem[j].Approve;
                        cimLookbackParam.Actual = CimLookback_ListItem[j].Actual;
                        cimLookbackParam.DifferenceNote = CimLookback_ListItem[j].DifferenceNote;
                        cimLookbackParam.BusinessPlan = CimLookback_ListItem[j].BusinessPlan;
                        cimLookbackParam.ResponsiblePerson = CimLookback_ListItem[j].ResponsiblePerson;
                        var lookback_Review_C = _mapper.Map<CimLookback>(cimLookbackParam);
                        _CimLookback_repository.Add(lookback_Review_C);
                        await _CimLookback_repository.Save();
                    }
                }


                //var data_LookbackList = await _repository.GetPlanLookbackByID(planLookback_Create.InitiativeId);
                return Ok(maxID);
                //return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR : " + ex.Message);
            }
        }

        [Route("UpdatePlanLookback")]
        [HttpPost]
        public async Task<IActionResult> UpdatePlanLookback(LookbackList PlanLookbackCreate)
        {
            try
            {

                List<LookbackList> lookbackLists = new List<LookbackList>();
                var ItemPlanLookbackCreate = PlanLookbackCreate;
                var planLookback_Create = _mapper.Map<LookbackList>(ItemPlanLookbackCreate);
                ProjectLookback project_Lookback = new ProjectLookback();
                project_Lookback.InitiativeId = planLookback_Create.InitiativeId;
                project_Lookback.ProjectLookbackId = planLookback_Create.ProjectLookbackId;
                if (planLookback_Create.FinishingDate != null)
                {
                    project_Lookback.FinishingDate = Convert.ToDateTime(planLookback_Create.FinishingDate);
                }

                if (planLookback_Create.PlanLookbackDate != null)
                {
                    project_Lookback.PlanLookbackDate = Convert.ToDateTime(planLookback_Create.PlanLookbackDate);
                }

                if (planLookback_Create.PlanPerformanceLookbackDate != null)
                {
                    project_Lookback.PlanEnviLookBackDate = Convert.ToDateTime(planLookback_Create.PlanEnviLookBackDate);
                }

                if (planLookback_Create.PlanPerformanceLookbackDate != null)
                {
                    project_Lookback.PlanPerformanceLookbackDate = Convert.ToDateTime(planLookback_Create.PlanPerformanceLookbackDate);
                }
                project_Lookback.ProjectBackground = planLookback_Create.ProjectBackground;
                project_Lookback.ScopeOfInitiative = planLookback_Create.ScopeOfInitiative;
                project_Lookback.ProjectObjective = planLookback_Create.ProjectObjective;
                project_Lookback.ExecutionLookback = Convert.ToBoolean(planLookback_Create.ExecutionLookbackProcess);
                project_Lookback.PerformanceLookback = Convert.ToBoolean(planLookback_Create.PerformanceLookback);
                project_Lookback.EnvironmentLookback = Convert.ToBoolean(planLookback_Create.EnvironmentLookback);
                project_Lookback.CimLookback = Convert.ToBoolean(planLookback_Create.CimLookback);

                if (planLookback_Create.PerformancePlanLookbackDate != null)
                {
                    project_Lookback.PerformancePlanLookbackDate = Convert.ToDateTime(planLookback_Create.PerformancePlanLookbackDate);
                }

                project_Lookback.CoreUpliftResultDescription = planLookback_Create.CoreUpliftResultDescription;
                project_Lookback.CoreUpliftResultUnit = planLookback_Create.CoreUpliftResultUnit;
                project_Lookback.CoreUpliftResultBefore = planLookback_Create.CoreUpliftResultBefore;
                project_Lookback.CoreUpliftResultAfter = planLookback_Create.CoreUpliftResultAfter;
                project_Lookback.CoreUpliftResultBenefit = planLookback_Create.CoreUpliftResultBenefit;
                project_Lookback.CoreUpliftResultRating = planLookback_Create.CoreUpliftResultRating;

                if (planLookback_Create.EnviPlanLookbackDate != null)
                {
                    project_Lookback.EnviPlanLookbackDate = Convert.ToDateTime(planLookback_Create.EnviPlanLookbackDate);
                }

                if (planLookback_Create.ResponsibleEnvirEngineer != null)
                {
                    project_Lookback.ResponsibleEnvirEngineer = planLookback_Create.ResponsibleEnvirEngineer;
                }

                project_Lookback.PollutionPreventionSpecify = planLookback_Create.PollutionPreventionSpecify;

                project_Lookback.GlobalEnvirConsSpecify = planLookback_Create.GlobalEnvirConsSpecify;

                project_Lookback.ResourceCirculationSpecify = planLookback_Create.ResourceCirculationSpecify;

                project_Lookback.EnvironmentResultCategory = planLookback_Create.EnvironmentResultCategory;
                project_Lookback.EnvironmentResultUnit = planLookback_Create.EnvironmentResultUnit;
                project_Lookback.EnvironmentResultBefore = planLookback_Create.EnvironmentResultBefore;
                project_Lookback.EnvironmentResultAfter = planLookback_Create.EnvironmentResultAfter;
                project_Lookback.EnvironmentResultBenefitYear = planLookback_Create.EnvironmentResultBenefitYear;
                project_Lookback.EnvironmentResultBenefitYearThb = planLookback_Create.EnvironmentResultBenefitYearThb;
                project_Lookback.EnvironmentResultRemark = planLookback_Create.EnvironmentResultRemark;

                if (planLookback_Create.McEndorseDate != null)
                {
                    project_Lookback.McEndorseDate = Convert.ToDateTime(planLookback_Create.McEndorseDate);
                }

                if (planLookback_Create.BusinessPlanAsOfDate != null)
                {
                    project_Lookback.BusinessPlanAsOfDate = Convert.ToDateTime(planLookback_Create.BusinessPlanAsOfDate);
                }

                if (planLookback_Create.BusinessPlanAsOfDate2 != null)
                {
                    project_Lookback.BusinessPlanAsOfDate2 = Convert.ToDateTime(planLookback_Create.BusinessPlanAsOfDate2);
                }

                _Project_repository.Update(project_Lookback);
                await _Project_repository.Save();

                int maxID = planLookback_Create.ProjectLookbackId;
                bool status = await _EnvironmentProjectType_repository.GetEnvironmentProjectTypeByIdThenDelete(maxID);
                if (!status)
                {
                    return Ok("Delete Table EnvironmentProjectType Error");
                }
                else
                {
                    if (planLookback_Create.PollutionPrevention != null)
                    {
                        for (int index = 0; index < planLookback_Create.PollutionPrevention.Count; index++)
                        {
                            EnvironmentProjectType environmentProjectType = new EnvironmentProjectType();
                            environmentProjectType.ProjectLookbackId = planLookback_Create.ProjectLookbackId;
                            environmentProjectType.EnviType = "Poll";
                            environmentProjectType.EnviTypeValue = planLookback_Create.PollutionPrevention[index];
                            //var environmentProjectType_C = _mapper.Map<EnvironmentProjectType>(environmentProjectType);
                            _EnvironmentProjectType_repository.Add(environmentProjectType);
                            await _EnvironmentProjectType_repository.Save();
                        }
                    }
                    if (planLookback_Create.GlobalEnvirCons != null)
                    {
                        for (int index = 0; index < planLookback_Create.GlobalEnvirCons.Count; index++)
                        {
                            EnvironmentProjectType environmentProjectType = new EnvironmentProjectType();
                            environmentProjectType.ProjectLookbackId = planLookback_Create.ProjectLookbackId;
                            environmentProjectType.EnviType = "Global";
                            environmentProjectType.EnviTypeValue = planLookback_Create.GlobalEnvirCons[index];
                            //var environmentProjectType_D = _mapper.Map<EnvironmentProjectType>(environmentProjectType);
                            _EnvironmentProjectType_repository.Add(environmentProjectType);
                            await _EnvironmentProjectType_repository.Save();
                        }
                    }
                    if (planLookback_Create.ResourceCirculation != null)
                    {
                        for (int index = 0; index < planLookback_Create.ResourceCirculation.Count; index++)
                        {
                            EnvironmentProjectType environmentProjectType = new EnvironmentProjectType();
                            environmentProjectType.ProjectLookbackId = maxID;
                            environmentProjectType.EnviType = "Resource";
                            environmentProjectType.EnviTypeValue = planLookback_Create.ResourceCirculation[index];
                            //var environmentProjectType_C = _mapper.Map<EnvironmentProjectType>(environmentProjectType);
                            _EnvironmentProjectType_repository.Add(environmentProjectType);
                            await _EnvironmentProjectType_repository.Save();
                        }
                    }
                }

                List<LookbackReview> lookback_ReviewList = new List<LookbackReview>();
                List<LookbackReviewList> lookback_ReviewListItem = new List<LookbackReviewList>();
                lookback_ReviewListItem = planLookback_Create.LookbackReview;
                for (int j = 0; j < lookback_ReviewListItem.Count; j++)
                {
                    LookbackReview lookback_Review = new LookbackReview();
                    lookback_Review.LookbackReviewId = lookback_ReviewListItem[j].LookbackReviewId;
                    lookback_Review.ProjectLookbackId = planLookback_Create.ProjectLookbackId;
                    lookback_Review.ProjectReviewTeam = lookback_ReviewListItem[j].ProjectReviewTeam;
                    var lookback_Review_C = _mapper.Map<LookbackReview>(lookback_Review);
                    _Review_repository.Update(lookback_Review_C);
                    await _Review_repository.Save();
                }


                List<ExecutionLookbackList> execution_LookbackListItem = new List<ExecutionLookbackList>();
                execution_LookbackListItem = planLookback_Create.ExecutionLookback;
                for (int j = 0; j < execution_LookbackListItem.Count; j++)
                {
                    ExecutionLookback execution_Lookback = new ExecutionLookback();
                    execution_Lookback.ExecutionLookbackId = execution_LookbackListItem[j].ExecutionLookbackId;
                    execution_Lookback.ProjectLookbackId = project_Lookback.ProjectLookbackId;
                    execution_Lookback.KnowledgeArea = execution_LookbackListItem[j].KnowledgeArea;
                    execution_Lookback.Plan = execution_LookbackListItem[j].Plan;
                    execution_Lookback.Actual = execution_LookbackListItem[j].Actual;
                    execution_Lookback.Issue = execution_LookbackListItem[j].Issue;
                    execution_Lookback.Background = execution_LookbackListItem[j].Background;
                    execution_Lookback.LessonLearned = execution_LookbackListItem[j].LessonLearned;
                    execution_Lookback.Remark = execution_LookbackListItem[j].Remark;
                    execution_Lookback.Comment = execution_LookbackListItem[j].Comment;
                    var lookback_Review_C = _mapper.Map<ExecutionLookback>(execution_Lookback);
                    _Execution_repository.Update(lookback_Review_C);
                    await _Execution_repository.Save();
                }

                List<CoreUpliftList> coreUplift_ListItem = new List<CoreUpliftList>();
                coreUplift_ListItem = planLookback_Create.CoreUplift;
                for (int j = 0; j < coreUplift_ListItem.Count; j++)
                {
                    CoreUplift coreUplift = new CoreUplift();
                    coreUplift.CoreUpliftId = coreUplift_ListItem[j].CoreUpliftId;
                    coreUplift.ProjectLookbackId = planLookback_Create.ProjectLookbackId;
                    coreUplift.Economics = coreUplift_ListItem[j].Economics;
                    coreUplift.EstimatedPlaned = coreUplift_ListItem[j].EstimatedPlaned;
                    coreUplift.Actual = coreUplift_ListItem[j].Actual;
                    coreUplift.WhyDifference = coreUplift_ListItem[j].WhyDifference;
                    coreUplift.Remark = coreUplift_ListItem[j].Remark;
                    coreUplift.Comment = coreUplift_ListItem[j].Comment;
                    var lookback_Review_C = _mapper.Map<CoreUplift>(coreUplift);
                    _CoreUplift_repository.Update(lookback_Review_C);
                    await _CoreUplift_repository.Save();
                }

                List<ProjectImpactList> projectImpac_ListItem = new List<ProjectImpactList>();
                projectImpac_ListItem = planLookback_Create.ProjectImpact;
                for (int j = 0; j < projectImpac_ListItem.Count; j++)
                {
                    ProjectImpact projectImpac = new ProjectImpact();
                    projectImpac.ProjectImpactId = projectImpac_ListItem[j].ProjectImpactId;
                    projectImpac.ProjectLookbackId = planLookback_Create.ProjectLookbackId;
                    projectImpac.Situation = projectImpac_ListItem[j].Situation;
                    projectImpac.Before = projectImpac_ListItem[j].Before;
                    projectImpac.Target = projectImpac_ListItem[j].Target;
                    projectImpac.After = projectImpac_ListItem[j].After;
                    var lookback_Review_C = _mapper.Map<ProjectImpact>(projectImpac);
                    _ProjectImpact_repository.Update(lookback_Review_C);
                    await _ProjectImpact_repository.Save();
                }

                List<ProjectImpactWorkList> ProjectImpactWork_ListItem = new List<ProjectImpactWorkList>();
                ProjectImpactWork_ListItem = planLookback_Create.ProjectImpactWork;
                for (int j = 0; j < ProjectImpactWork_ListItem.Count; j++)
                {
                    ProjectImpactWork projectImpac_Work = new ProjectImpactWork();
                    projectImpac_Work.ProjectImpactWorkId = ProjectImpactWork_ListItem[j].ProjectImpactWorkId;
                    projectImpac_Work.ProjectLookbackId = planLookback_Create.ProjectLookbackId;
                    projectImpac_Work.WhatWorked = ProjectImpactWork_ListItem[j].WhatWorked;
                    projectImpac_Work.WhatDidNotWork = ProjectImpactWork_ListItem[j].WhatDidNotWork;
                    var lookback_Review_C = _mapper.Map<ProjectImpactWork>(projectImpac_Work);
                    _ProjectImpactWork_repository.Update(lookback_Review_C);
                    await _ProjectImpactWork_repository.Save();
                }

                List<CimLookbackList> CimLookback_ListItem = new List<CimLookbackList>();

                // CimLookback_ListItem = planLookback_Create.CimLookbackId;
                var cimData = _CimLookback_repository.GetLookbackCimListByProjectId(planLookback_Create.ProjectLookbackId).Result;
                foreach (var item in cimData)
                {
                    _CimLookback_repository.Delete(item);
                }
                CimLookback_ListItem = planLookback_Create.CimLookbackId;
                for (int j = 0; j < CimLookback_ListItem.Count; j++)
                {
                    CimLookback cimLookbackParam = new CimLookback();
                    cimLookbackParam.CimLookbackId = CimLookback_ListItem[j].CimLookbackId;
                    cimLookbackParam.ProjectLookbackId = planLookback_Create.ProjectLookbackId;
                    cimLookbackParam.CimLookbackType = CimLookback_ListItem[j].CimLookbackType;
                    cimLookbackParam.Aspect = CimLookback_ListItem[j].Aspect;
                    cimLookbackParam.Approve = CimLookback_ListItem[j].Approve;
                    cimLookbackParam.Actual = CimLookback_ListItem[j].Actual;
                    cimLookbackParam.DifferenceNote = CimLookback_ListItem[j].DifferenceNote;
                    cimLookbackParam.BusinessPlan = CimLookback_ListItem[j].BusinessPlan;
                    cimLookbackParam.ResponsiblePerson = CimLookback_ListItem[j].ResponsiblePerson;
                    var lookback_Review_C = _mapper.Map<CimLookback>(cimLookbackParam);
                    _CimLookback_repository.Add(lookback_Review_C);
                }
                    await _CimLookback_repository.Save();

                return Ok(planLookback_Create.ProjectLookbackId);
            }
            catch (Exception ex)
            {
                return Ok("ERROR : " + ex.Message);
            }
        }

        [Route("DeletePlanLookback")]
        [HttpPost]
        public async Task<IActionResult> DeletePlanLookback(List<LookbackList> PlanLookbackCreate)
        {
            try
            {
                for (int i = 0; i < PlanLookbackCreate.Count; i++)
                {
                    var ItemPlanLookbackCreate = PlanLookbackCreate[i];
                    var planLookback_Create = _mapper.Map<LookbackList>(ItemPlanLookbackCreate);
                    int id = planLookback_Create.ProjectLookbackId;

                    var ProjectLookback_Data = await _Project_repository.GetProjectLookbackByID(id);
                    if (ProjectLookback_Data != null)
                    {
                        var project_Lookback = _mapper.Map<ProjectLookback>(ProjectLookback_Data);
                        _Project_repository.Delete(project_Lookback);
                        await _Project_repository.Save();

                        List<LookbackReviewList> lookback_ReviewListItem = new List<LookbackReviewList>();
                        lookback_ReviewListItem = planLookback_Create.LookbackReview;
                        for (int j = 0; j < lookback_ReviewListItem.Count; j++)
                        {
                            //var lookback_Review = await _Review_repository.GetLookbackReviewByID(lookback_ReviewListItem[j].LookbackReviewId);
                            LookbackReview lookback_Review = new LookbackReview();
                            lookback_Review.LookbackReviewId = lookback_ReviewListItem[j].LookbackReviewId;
                            lookback_Review.ProjectLookbackId = lookback_ReviewListItem[j].ProjectLookbackId;
                            lookback_Review.ProjectReviewTeam = lookback_ReviewListItem[j].ProjectReviewTeam;
                            //var lookback_Review_D = _mapper.Map<LookbackReview>(lookback_Review);
                            _Review_repository.Delete(lookback_Review);
                            await _Review_repository.Save();
                        }

                        List<ExecutionLookbackList> execution_LookbackListItem = new List<ExecutionLookbackList>();
                        execution_LookbackListItem = planLookback_Create.ExecutionLookback;
                        for (int j = 0; j < execution_LookbackListItem.Count; j++)
                        {
                            //var execution_Lookback = await _Execution_repository.GetExecutionLookbackByID(execution_LookbackListItem[j].ExecutionLookbackId);
                            ExecutionLookback execution_Lookback = new ExecutionLookback();
                            execution_Lookback.ExecutionLookbackId = execution_LookbackListItem[j].ExecutionLookbackId;
                            execution_Lookback.ProjectLookbackId = execution_LookbackListItem[j].ProjectLookbackId;
                            execution_Lookback.KnowledgeArea = execution_LookbackListItem[j].KnowledgeArea;
                            execution_Lookback.Plan = execution_LookbackListItem[j].Plan;
                            execution_Lookback.Actual = execution_LookbackListItem[j].Actual;
                            execution_Lookback.Issue = execution_LookbackListItem[j].Issue;
                            execution_Lookback.Background = execution_LookbackListItem[j].Background;
                            execution_Lookback.LessonLearned = execution_LookbackListItem[j].LessonLearned;
                            execution_Lookback.Remark = execution_LookbackListItem[j].Remark;
                            execution_Lookback.Comment = execution_LookbackListItem[j].Comment;
                            //var execution_Lookback_D = _mapper.Map<ExecutionLookback>(execution_Lookback);
                            _Execution_repository.Delete(execution_Lookback);
                            await _Execution_repository.Save();
                        }

                        List<CoreUpliftList> coreUplift_ListItem = new List<CoreUpliftList>();
                        coreUplift_ListItem = planLookback_Create.CoreUplift;
                        for (int j = 0; j < coreUplift_ListItem.Count; j++)
                        {
                            //var coreUplift = await _CoreUplift_repository.GetCoreUpliftByID(coreUplift_ListItem[j].CoreUpliftId);
                            CoreUplift coreUplift = new CoreUplift();
                            coreUplift.CoreUpliftId = coreUplift_ListItem[j].CoreUpliftId;
                            coreUplift.ProjectLookbackId = coreUplift_ListItem[j].ProjectLookbackId;
                            coreUplift.Economics = coreUplift_ListItem[j].Economics;
                            coreUplift.EstimatedPlaned = coreUplift_ListItem[j].EstimatedPlaned;
                            coreUplift.Actual = coreUplift_ListItem[j].Actual;
                            coreUplift.WhyDifference = coreUplift_ListItem[j].WhyDifference;
                            coreUplift.Remark = coreUplift_ListItem[j].Remark;
                            coreUplift.Comment = coreUplift_ListItem[j].Comment;
                            //var coreUplift_D = _mapper.Map<CoreUplift>(coreUplift);
                            _CoreUplift_repository.Delete(coreUplift);
                            await _CoreUplift_repository.Save();
                        }

                        List<ProjectImpactList> projectImpac_ListItem = new List<ProjectImpactList>();
                        projectImpac_ListItem = planLookback_Create.ProjectImpact;
                        for (int j = 0; j < projectImpac_ListItem.Count; j++)
                        {
                            //var projectImpac = await _ProjectImpact_repository.GetProjectImpactByID(projectImpac_ListItem[j].ProjectImpactId);
                            ProjectImpact projectImpac = new ProjectImpact();
                            projectImpac.ProjectImpactId = projectImpac_ListItem[j].ProjectImpactId;
                            projectImpac.ProjectLookbackId = projectImpac_ListItem[j].ProjectLookbackId;
                            projectImpac.Situation = projectImpac_ListItem[j].Situation;
                            projectImpac.Before = projectImpac_ListItem[j].Before;
                            projectImpac.Target = projectImpac_ListItem[j].Target;
                            projectImpac.After = projectImpac_ListItem[j].After;
                            //var projectImpac_D = _mapper.Map<ProjectImpact>(projectImpac);
                            _ProjectImpact_repository.Delete(projectImpac);
                            await _ProjectImpact_repository.Save();
                        }

                        List<ProjectImpactWorkList> ProjectImpactWork_ListItem = new List<ProjectImpactWorkList>();
                        ProjectImpactWork_ListItem = planLookback_Create.ProjectImpactWork;
                        for (int j = 0; j < ProjectImpactWork_ListItem.Count; j++)
                        {
                            //var projectImpac_Work = await _ProjectImpactWork_repository.GetProjectImpactWorkByID(ProjectImpactWork_ListItem[j].ProjectImpactWorkId);
                            ProjectImpactWork projectImpac_Work = new ProjectImpactWork();
                            projectImpac_Work.ProjectImpactWorkId = ProjectImpactWork_ListItem[j].ProjectImpactWorkId;
                            projectImpac_Work.ProjectLookbackId = ProjectImpactWork_ListItem[j].ProjectLookbackId;
                            projectImpac_Work.WhatWorked = ProjectImpactWork_ListItem[j].WhatWorked;
                            projectImpac_Work.WhatDidNotWork = ProjectImpactWork_ListItem[j].WhatDidNotWork;
                            //var lookback_Review_C = _mapper.Map<ProjectImpactWork>(projectImpac_Work);
                            _ProjectImpactWork_repository.Delete(projectImpac_Work);
                            await _ProjectImpactWork_repository.Save();
                        }

                        List<CimLookbackList> CimLookback_ListItem = new List<CimLookbackList>();
                        CimLookback_ListItem = planLookback_Create.CimLookbackId;
                        for (int j = 0; j < CimLookback_ListItem.Count; j++)
                        {
                            //var cimLookbackParam = await _CimLookback_repository.GetCimLookbackByID(CimLookback_ListItem[j].CimLookbackId);
                            CimLookback cimLookbackParam = new CimLookback();
                            cimLookbackParam.CimLookbackId = CimLookback_ListItem[j].CimLookbackId;
                            cimLookbackParam.ProjectLookbackId = CimLookback_ListItem[j].ProjectLookbackId;
                            cimLookbackParam.CimLookbackType = CimLookback_ListItem[j].CimLookbackType;
                            cimLookbackParam.Aspect = CimLookback_ListItem[j].Aspect;
                            cimLookbackParam.Approve = CimLookback_ListItem[j].Approve;
                            cimLookbackParam.Actual = CimLookback_ListItem[j].Actual;
                            cimLookbackParam.DifferenceNote = CimLookback_ListItem[j].DifferenceNote;
                            cimLookbackParam.BusinessPlan = CimLookback_ListItem[j].BusinessPlan;
                            cimLookbackParam.ResponsiblePerson = CimLookback_ListItem[j].ResponsiblePerson;
                            //var cimLookbackParam_D = _mapper.Map<CimLookback>(cimLookbackParam);
                            _CimLookback_repository.Delete(cimLookbackParam);
                            await _CimLookback_repository.Save();
                        }

                        //var dataEnvi = await _EnvironmentProjectType_repository.GetEnvironmentProjectTypeAllByProjectLookbackId(id);
                        //for (int idelete = 0; idelete < dataEnvi.Count; idelete++)
                        //{
                        //    EnvironmentProjectType environmentProjectType = new EnvironmentProjectType();
                        //    environmentProjectType.EnviTypeId = dataEnvi[idelete].EnviTypeId;
                        //    environmentProjectType.ProjectLookbackId = id;
                        //    environmentProjectType.EnviType = dataEnvi[idelete].EnviType.ToString();
                        //    environmentProjectType.EnviTypeValue = dataEnvi[idelete].EnviTypeValue.ToString();
                        //    //var environmentProjectType_D = _mapper.Map<EnvironmentProjectType>(environmentProjectType);
                        //    _EnvironmentProjectType_repository.Delete(environmentProjectType);
                        //    await _EnvironmentProjectType_repository.Save();
                        //}

                        bool status = await _EnvironmentProjectType_repository.GetEnvironmentProjectTypeByIdThenDelete(id);
                        if (!status)
                        {
                            return Ok("Delete Table EnvironmentProjectType Error");
                        }

                    }
                }

                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR : " + ex.Message);
            }
        }

        [Route("GetDataFromSAP/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetDataFromSAP(int id)
        {
            try
            {
                
                var data = await _Project_repository.GetDataFromSAP(id);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return Ok("ERROR" + ex.Message);
            }
        }
    }
}
