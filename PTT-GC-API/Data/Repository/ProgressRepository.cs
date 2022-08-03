using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ProgressAndMilestone;
using PTT_GC_API.Models.ProgressAndMilestone;
using System;
using PTT_GC_API.Models.Outstanding;
using PTT_GC_API.Helpers;
using System.Text.RegularExpressions;

namespace PTT_GC_API.Data.Repository
{
    public class ProgressRepository : ProgressInterface
    {
        private readonly DataContext _context;
        private readonly StoreProcedureInterface _storeProcedure;
        public ProgressRepository(DataContext context, StoreProcedureInterface storeProcedure)
        {
            _context = context;
            _storeProcedure = storeProcedure;
        }

        public async Task<CreateProgressDetail> CreateProgressDetail(int id, CreateProgressDetail CreateProgressDetail)
        {
            if (_context.ProgressDetails.Any())
            {
                var List = await _context.ProgressDetails.Where(i => i.InitiativeId == id).ToListAsync();
                foreach (var entity in List)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "Progress-33", SQLCommandType.DELETE);
                    // End log
                    _context.ProgressDetails.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }

            foreach (var item in CreateProgressDetail.details)
            {
                await _context.ProgressDetails.AddAsync(item);
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(item, "Progress-44", SQLCommandType.INSERT, false);
                // End log
                await _context.SaveChangesAsync();
            }
            return CreateProgressDetail;
        }

        public async Task<List<ProgressDetail>> GetProgressDetail(int initiativeId)
        {
            var progress = _context.ProgressDetails.Where(x => x.InitiativeId == initiativeId).ToList();
            return progress;
        }

        public async Task<bool> DeleteProgressData(int initiativeId)
        {
            var removeList = _context.ProgressDetails.Where(x => x.InitiativeId == initiativeId).ToList();
            foreach (var item in removeList)
            {
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(item, "Progress-63", SQLCommandType.DELETE);
                // End log
                _context.Remove(item);
            }
            _context.SaveChanges();

            return true;
        }

        public async Task<ProgressModel> CreateProgress(int id, ProgressModel CreateProgressHeader)
        {
            // By InitiativeId for Tempolary
            var getPrgress = _context.ProgressHeader.Where(x => x.InitiativeId == id).Count();

            //var checkInitiative = _context.Initiatives.Where(x => x.Id == id && (x.IsRequestCapex == true || x.DirectCapex == true)).Count();
            var checkInitiative = _context.Initiatives.Where(x => x.Id == id).FirstOrDefault();

            if (getPrgress > 0)
            {
                CreateProgressHeader = await this.UpdateProgress(id, CreateProgressHeader);

                //if (checkInitiative.DirectCapex == true || checkInitiative.IsRequestCapex == true)
                //{
                //await SubmitInvestmentCostFirstTime(id);
                //try {
                //await _storeProcedure.Execute_NoReturn($"EXEC sp_InsertToInvestmentCost {id}");
                //var planCost = await _context.InvestmentCost.Where(x => x.InitiativeId == id && x.InvestmentCostType == "planCost").ToListAsync();
                //if (planCost.Any())
                //{
                //    _context.RemoveRange(planCost);
                //    _context.SaveChanges();
                //}
                //} catch { };
                //}

            }
            else
            {
                var ProgressHeader = new ProgressHeader()
                {
                    ProgressHeaderId = CreateProgressHeader.ProgressHeaderId,
                    InitiativeId = CreateProgressHeader.InitiativeId,
                    AppropriationNo = CreateProgressHeader.AppropriationNo,
                    WbsNo = CreateProgressHeader.WbsNo,
                    StandardProjectDef = CreateProgressHeader.StandardProjectDef,
                    SolomonCategory = CreateProgressHeader.SolomonCategory,
                    AreaPlant = CreateProgressHeader.AreaPlant,
                    PhysicalBu = CreateProgressHeader.PhysicalBu,
                    PhysicalUnit = CreateProgressHeader.PhysicalUnit,
                    Responsible = CreateProgressHeader.Responsible,

                    Engineering = CreateProgressHeader.Engineering,
                    Construction = CreateProgressHeader.Construction,
                    Procurement = CreateProgressHeader.Procurement,
                    CommissioningStartup = CreateProgressHeader.CommissioningStartup,
                    ProjectManagement = CreateProgressHeader.ProjectManagement,
                    RiskAndConcern = CreateProgressHeader.RiskAndConcern,
                    MitigationPlan = CreateProgressHeader.MitigationPlan,
                    ExecutiveSummary = CreateProgressHeader.ExecutiveSummary,
                    WorkForNextMonth = CreateProgressHeader.WorkForNextMonth,
                    EnvironmentKpi = CreateProgressHeader.EnvironmentKpi
                };

                await _context.ProgressHeader.AddAsync(ProgressHeader);

                //if (checkInitiative.DirectCapex == true || checkInitiative.IsRequestCapex == true)
                //{
                //await SubmitInvestmentCostFirstTime(id);
                //try { 
                //    await _storeProcedure.Execute_NoReturn($"EXEC sp_InsertToInvestmentCost {id}");
                //} catch {
                //};
                //}
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(ProgressHeader, "Progress-137", SQLCommandType.INSERT, false);
                // End log
                await _context.SaveChangesAsync();
                CreateProgressDetail progressDetail = new CreateProgressDetail();
                progressDetail.details = CreateProgressHeader.Details;
                await this.CreateProgressDetail(CreateProgressHeader.InitiativeId, progressDetail);
            }

            //if(CreateProgressHeader.ProgressHeaderId != 0)
            //{
            //    CreateProgressHeader = await this.UpdateProgress(id, CreateProgressHeader);
            //}
            //else
            //{
            //    var ProgressHeader = new ProgressHeader()
            //    {
            //        ProgressHeaderId = CreateProgressHeader.ProgressHeaderId,
            //        InitiativeId = CreateProgressHeader.InitiativeId,
            //        AppropriationNo = CreateProgressHeader.AppropriationNo,
            //        WbsNo = CreateProgressHeader.WbsNo,
            //        StandardProjectDef = CreateProgressHeader.StandardProjectDef,
            //        SolomonCategory = CreateProgressHeader.SolomonCategory,
            //        AreaPlant = CreateProgressHeader.AreaPlant,
            //        PhysicalBu = CreateProgressHeader.PhysicalBu,
            //        PhysicalUnit = CreateProgressHeader.PhysicalUnit,
            //        Responsible = CreateProgressHeader.Responsible,

            //        Engineering = CreateProgressHeader.Engineering,
            //        Construction = CreateProgressHeader.Construction,
            //        Procurement = CreateProgressHeader.Procurement,
            //        CommissioningStartup = CreateProgressHeader.CommissioningStartup,
            //        ProjectManagement = CreateProgressHeader.ProjectManagement,
            //        RiskAndConcern = CreateProgressHeader.RiskAndConcern,
            //        MitigationPlan = CreateProgressHeader.MitigationPlan,
            //        ExecutiveSummary = CreateProgressHeader.ExecutiveSummary,
            //        WorkForNextMonth = CreateProgressHeader.WorkForNextMonth,
            //        EnvironmentKpi = CreateProgressHeader.EnvironmentKpi
            //    };
            //    await _context.ProgressHeader.AddAsync(ProgressHeader);

            //    await SubmitInvestmentCostFirstTime(id);

            //    //--- Turk ------
            //    //InvestmentCost planCost = new InvestmentCost()
            //    //{
            //    //    InvestmentCostId = CreateProgressHeader.PlanCost.InvestmentCostId,
            //    //    InvestmentCostType = CreateProgressHeader.PlanCost.InvestmentCostType,
            //    //    JanCost = CreateProgressHeader.PlanCost.JanCost,
            //    //    FebCost = CreateProgressHeader.PlanCost.FebCost,
            //    //    MarCost = CreateProgressHeader.PlanCost.MarCost,
            //    //    AprCost = CreateProgressHeader.PlanCost.AprCost,
            //    //    MayCost = CreateProgressHeader.PlanCost.MayCost,
            //    //    JunCost = CreateProgressHeader.PlanCost.JunCost,
            //    //    JulCost = CreateProgressHeader.PlanCost.JulCost,
            //    //    AugCost = CreateProgressHeader.PlanCost.AugCost,
            //    //    SepCost = CreateProgressHeader.PlanCost.SepCost,
            //    //    OctCost = CreateProgressHeader.PlanCost.OctCost,
            //    //    NovCost = CreateProgressHeader.PlanCost.NovCost,
            //    //    DecCost = CreateProgressHeader.PlanCost.DecCost,
            //    //    OverallCost = CreateProgressHeader.PlanCost.OverallCost,
            //    //    InitiativeId = CreateProgressHeader.PlanCost.InitiativeId
            //    //};
            //    //InvestmentCost actualCost = new InvestmentCost()
            //    //{
            //    //    InvestmentCostId = CreateProgressHeader.ActualCost.InvestmentCostId,
            //    //    InvestmentCostType = CreateProgressHeader.ActualCost.InvestmentCostType,
            //    //    JanCost = CreateProgressHeader.ActualCost.JanCost,
            //    //    FebCost = CreateProgressHeader.ActualCost.FebCost,
            //    //    MarCost = CreateProgressHeader.ActualCost.MarCost,
            //    //    AprCost = CreateProgressHeader.ActualCost.AprCost,
            //    //    MayCost = CreateProgressHeader.ActualCost.MayCost,
            //    //    JunCost = CreateProgressHeader.ActualCost.JunCost,
            //    //    JulCost = CreateProgressHeader.ActualCost.JulCost,
            //    //    AugCost = CreateProgressHeader.ActualCost.AugCost,
            //    //    SepCost = CreateProgressHeader.ActualCost.SepCost,
            //    //    OctCost = CreateProgressHeader.ActualCost.OctCost,
            //    //    NovCost = CreateProgressHeader.ActualCost.NovCost,
            //    //    DecCost = CreateProgressHeader.ActualCost.DecCost,
            //    //    OverallCost = CreateProgressHeader.ActualCost.OverallCost,
            //    //    InitiativeId = CreateProgressHeader.ActualCost.InitiativeId
            //    //};
            //    //await _context.InvestmentCost.AddAsync(planCost);
            //    //await _context.InvestmentCost.AddAsync(actualCost);
            //    //--- Turk ------

            //    await _context.SaveChangesAsync();
            //    CreateProgressDetail progressDetail = new CreateProgressDetail();
            //    progressDetail.details = CreateProgressHeader.Details;
            //    await this.CreateProgressDetail(CreateProgressHeader.InitiativeId, progressDetail);

            //}

            return CreateProgressHeader;
        }

        public async Task<ProgressModel> GetProgress(int id)
        {
            string getYear = DateTime.Now.Year.ToString();
            ProgressModel progress = new ProgressModel();
            var ProgressHeader = _context.ProgressHeader.Where(x => x.InitiativeId == id).FirstOrDefault();

            // Turk
            // var planCost = _context.InvestmentCost.Where(x => x.InitiativeId == id && x.InvestmentCostType == "planCost").FirstOrDefault();

            // Aon
            var planCost = _context.MonthlyInvestmentPlans.Where(x => x.InitiativeId == id && x.YearOfMonth == getYear).FirstOrDefault();

            var actualCost = _context.InvestmentCost.Where(x => x.InitiativeId == id && x.InvestmentCostType == "actualCost" && x.YearCost == getYear).FirstOrDefault();

            var progressDetail = await GetProgressDetail(id);
            if (ProgressHeader != null && planCost != null)
            {
                progress = new ProgressModel()
                {
                    ProgressHeaderId = ProgressHeader.ProgressHeaderId,
                    InitiativeId = ProgressHeader.InitiativeId,
                    AppropriationNo = ProgressHeader.AppropriationNo,
                    WbsNo = ProgressHeader.WbsNo,
                    StandardProjectDef = ProgressHeader.StandardProjectDef,
                    SolomonCategory = ProgressHeader.SolomonCategory,
                    AreaPlant = ProgressHeader.AreaPlant,
                    PhysicalBu = ProgressHeader.PhysicalBu,
                    PhysicalUnit = ProgressHeader.PhysicalUnit,
                    Responsible = ProgressHeader.Responsible,
                    //PlanCost = planCost,
                    PlanCost = new InvestmentCost
                    {
                        JanCost = planCost.Jan,
                        FebCost = planCost.Feb,
                        MarCost = planCost.Mar,
                        AprCost = planCost.Apr,
                        MayCost = planCost.May,
                        JunCost = planCost.Jun,
                        JulCost = planCost.Jul,
                        AugCost = planCost.Aug,
                        SepCost = planCost.Aug,
                        OctCost = planCost.Oct,
                        NovCost = planCost.Nov,
                        DecCost = planCost.Dec,
                        OverallCost = planCost.MonthlyOverall,
                        YearCost = planCost.YearOfMonth
                    },
                    ActualCost = actualCost != null ? actualCost : null,

                    Engineering = ProgressHeader.Engineering,
                    Construction = ProgressHeader.Construction,
                    Procurement = ProgressHeader.Procurement,
                    CommissioningStartup = ProgressHeader.CommissioningStartup,
                    ProjectManagement = ProgressHeader.ProjectManagement,
                    RiskAndConcern = ProgressHeader.RiskAndConcern,
                    MitigationPlan = ProgressHeader.MitigationPlan,
                    ExecutiveSummary = ProgressHeader.ExecutiveSummary,
                    WorkForNextMonth = ProgressHeader.WorkForNextMonth,
                    EnvironmentKpi = ProgressHeader.EnvironmentKpi
                };
            }
            else if (ProgressHeader != null)
            {
                progress = new ProgressModel()
                {
                    ProgressHeaderId = ProgressHeader.ProgressHeaderId,
                    InitiativeId = ProgressHeader.InitiativeId,
                    AppropriationNo = ProgressHeader.AppropriationNo,
                    WbsNo = ProgressHeader.WbsNo,
                    StandardProjectDef = ProgressHeader.StandardProjectDef,
                    SolomonCategory = ProgressHeader.SolomonCategory,
                    AreaPlant = ProgressHeader.AreaPlant,
                    PhysicalBu = ProgressHeader.PhysicalBu,
                    PhysicalUnit = ProgressHeader.PhysicalUnit,
                    Responsible = ProgressHeader.Responsible,
                    ActualCost = actualCost != null ? actualCost : null,

                    Engineering = ProgressHeader.Engineering,
                    Construction = ProgressHeader.Construction,
                    Procurement = ProgressHeader.Procurement,
                    CommissioningStartup = ProgressHeader.CommissioningStartup,
                    ProjectManagement = ProgressHeader.ProjectManagement,
                    RiskAndConcern = ProgressHeader.RiskAndConcern,
                    MitigationPlan = ProgressHeader.MitigationPlan,
                    ExecutiveSummary = ProgressHeader.ExecutiveSummary,
                    WorkForNextMonth = ProgressHeader.WorkForNextMonth,
                    EnvironmentKpi = ProgressHeader.EnvironmentKpi
                };
            }
            if (progressDetail != null)
            {
                progress.Details = progressDetail;
            }

            return progress;
        }

        public async Task SubmitInvestmentCostFirstTime(int InitiativeId)
        {
            var planCostFromMonthly = _context.MonthlyInvestmentPlans.Where(x => x.InitiativeId == InitiativeId).ToList();
            var inCost = _context.InvestmentCost.Where(x => x.InitiativeId == InitiativeId).Count();
            if (inCost == 0)
            {
                for (int i = 0; i < planCostFromMonthly.Count; i++)
                {

                    InvestmentCost planCost = new InvestmentCost()
                    {
                        InitiativeId = InitiativeId,
                        InvestmentCostType = "planCost",
                        JanCost = planCostFromMonthly[i].Jan,
                        FebCost = planCostFromMonthly[i].Feb,
                        MarCost = planCostFromMonthly[i].Mar,
                        AprCost = planCostFromMonthly[i].Apr,
                        MayCost = planCostFromMonthly[i].May,
                        JunCost = planCostFromMonthly[i].Jun,
                        JulCost = planCostFromMonthly[i].Jul,
                        AugCost = planCostFromMonthly[i].Aug,
                        SepCost = planCostFromMonthly[i].Sep,
                        OctCost = planCostFromMonthly[i].Oct,
                        NovCost = planCostFromMonthly[i].Nov,
                        DecCost = planCostFromMonthly[i].Dec,
                        OverallCost = planCostFromMonthly[i].MonthlyOverall,
                        YearCost = planCostFromMonthly[i].YearOfMonth
                    };
                    InvestmentCost actualCost = new InvestmentCost()
                    {
                        InitiativeId = InitiativeId,
                        InvestmentCostType = "actualCost",
                        JanCost = null,
                        FebCost = null,
                        MarCost = null,
                        AprCost = null,
                        MayCost = null,
                        JunCost = null,
                        JulCost = null,
                        AugCost = null,
                        SepCost = null,
                        OctCost = null,
                        NovCost = null,
                        DecCost = null,
                        OverallCost = null,
                        YearCost = planCostFromMonthly[i].YearOfMonth
                    };

                    await _context.InvestmentCost.AddAsync(planCost);
                    await _context.InvestmentCost.AddAsync(actualCost);
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(planCost, "Progress-380", SQLCommandType.INSERT, false);
                    LogInsight.Log(actualCost, "Progress-381", SQLCommandType.INSERT, false);
                    // End log
                    await _context.SaveChangesAsync();
                }
            }
            //else
            //{
            //var ic = _context.InvestmentCost.Where(x => x.InitiativeId == InitiativeId && x.InvestmentCostType == "planCost").ToList();
            //foreach(var item in ic)
            //{
            //    _context.Remove(item);
            //}
            //_context.SaveChanges();
            //}
        }

        public async Task<ProgressModel> UpdateProgress(int id, ProgressModel progress)
        {
            var progressInDB = _context.ProgressHeader.Where(x => x.InitiativeId == id).ToList();
            foreach (var item in progressInDB)
            {
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(item, "Progress-403", SQLCommandType.DELETE, false);
                // End log
                _context.Remove(item);
            }

            // Turk
            //var investmentCostInDB = _context.InvestmentCost.Where(x => x.InitiativeId == id).ToList();

            // Aon
            //var investmentCostInDB = _context.InvestmentCost.Where(x => x.InitiativeId == id && x.YearCost == DateTime.Now.Year.ToString()).ToList();

            //if (investmentCostInDB.Count > 0)
            //{
            //    foreach (var item in investmentCostInDB)
            //    {
            //        _context.Remove(item);
            //    }
            //    await _context.SaveChangesAsync();
            //}


            var ProgressHeader = new ProgressHeader()
            {
                ProgressHeaderId = 0,
                InitiativeId = progress.InitiativeId,
                AppropriationNo = progress.AppropriationNo,
                WbsNo = progress.WbsNo,
                StandardProjectDef = progress.StandardProjectDef,
                SolomonCategory = progress.SolomonCategory,
                AreaPlant = progress.AreaPlant,
                PhysicalBu = progress.PhysicalBu,
                PhysicalUnit = progress.PhysicalUnit,
                Responsible = progress.Responsible,

                Engineering = progress.Engineering,
                Construction = progress.Construction,
                Procurement = progress.Procurement,
                CommissioningStartup = progress.CommissioningStartup,
                ProjectManagement = progress.ProjectManagement,
                RiskAndConcern = progress.RiskAndConcern,
                MitigationPlan = progress.MitigationPlan,
                ExecutiveSummary = progress.ExecutiveSummary,
                WorkForNextMonth = progress.WorkForNextMonth,
                EnvironmentKpi = progress.EnvironmentKpi

            };
            InvestmentCost planCost = new InvestmentCost()
            {
                InvestmentCostId = 0,
                InvestmentCostType = progress.PlanCost.InvestmentCostType,
                JanCost = progress.PlanCost.JanCost,
                FebCost = progress.PlanCost.FebCost,
                MarCost = progress.PlanCost.MarCost,
                AprCost = progress.PlanCost.AprCost,
                MayCost = progress.PlanCost.MayCost,
                JunCost = progress.PlanCost.JunCost,
                JulCost = progress.PlanCost.JulCost,
                AugCost = progress.PlanCost.AugCost,
                SepCost = progress.PlanCost.SepCost,
                OctCost = progress.PlanCost.OctCost,
                NovCost = progress.PlanCost.NovCost,
                DecCost = progress.PlanCost.DecCost,
                OverallCost = progress.PlanCost.OverallCost,
                InitiativeId = progress.PlanCost.InitiativeId,
                YearCost = DateTime.Now.Year.ToString()
            };
            InvestmentCost actualCost = new InvestmentCost()
            {
                InvestmentCostId = 0,
                InvestmentCostType = progress.ActualCost.InvestmentCostType,
                JanCost = progress.ActualCost.JanCost,
                FebCost = progress.ActualCost.FebCost,
                MarCost = progress.ActualCost.MarCost,
                AprCost = progress.ActualCost.AprCost,
                MayCost = progress.ActualCost.MayCost,
                JunCost = progress.ActualCost.JunCost,
                JulCost = progress.ActualCost.JulCost,
                AugCost = progress.ActualCost.AugCost,
                SepCost = progress.ActualCost.SepCost,
                OctCost = progress.ActualCost.OctCost,
                NovCost = progress.ActualCost.NovCost,
                DecCost = progress.ActualCost.DecCost,
                OverallCost = progress.ActualCost.OverallCost,
                InitiativeId = progress.ActualCost.InitiativeId,
                YearCost = DateTime.Now.Year.ToString()
            };
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(ProgressHeader, "Progress-490", SQLCommandType.INSERT, false);
            // End log
            await _context.ProgressHeader.AddAsync(ProgressHeader);
            //await _context.InvestmentCost.AddAsync(planCost);
            //await _context.InvestmentCost.AddAsync(actualCost);
            await _context.SaveChangesAsync();

            CreateProgressDetail progressDetail = new CreateProgressDetail();
            progressDetail.details = progress.Details;
            await this.CreateProgressDetail(progress.InitiativeId, progressDetail);
            _context.SaveChanges();


            return progress;
        }

        public async Task<ProgressPlanDate> CreateProgressPlanDate(ProgressPlanDate progressPlanDate)
        {
            await _context.ProgressPlanDate.AddAsync(progressPlanDate);
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(progressPlanDate, "Progress-510", SQLCommandType.INSERT, false);
            // End log
            await _context.SaveChangesAsync();
            return progressPlanDate;
        }

        public async Task<InvestmentCost[]> CreatePlanCost(int initiativeId, InvestmentCost[] investmentCost)
        {
            var planCost = await _context.InvestmentCost.Where(x => x.InitiativeId == initiativeId && x.InvestmentCostType == "planCost").ToListAsync();
            if (planCost.Any())
            {
                _context.RemoveRange(planCost);
                _context.SaveChanges();
            }

            await _context.InvestmentCost.AddRangeAsync(investmentCost);
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(investmentCost, "Progress-527", SQLCommandType.INSERT, false);
            // End log
            await _context.SaveChangesAsync();
            return investmentCost;
        }




        public async Task<ProgressPlanDate> GetProgressPlanDateByIdThenDelete(ProgressPlanDate progressPlanDate)
        {
            var aa = _context.ProgressPlanDate.Where(x => x.InitiativeId == progressPlanDate.InitiativeId).ToList();
            foreach (var item in aa)
            {
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(item, "Progress-542", SQLCommandType.DELETE, false);
                // End log
                _context.Remove(item);
            }
            await _context.SaveChangesAsync();

            return progressPlanDate;
        }

        public async Task<List<ProgressPlanDate>> GetProgressPlanDate(int id)
        {
            //var progress = await _context.ProgressPlanDate.Where(x => x.InitiativeId == id).ToListAsync();
            return await _context.ProgressPlanDate.Where(x => x.InitiativeId == id).ToListAsync();
        }

        public async Task<ProgressPlan> CreateProgressPlan(ProgressPlan progressPlan)
        {
            progressPlan.ProgressPlanId = 0;
            await _context.ProgressPlan.AddAsync(progressPlan);
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(progressPlan, "Progress-561", SQLCommandType.INSERT, false);
            // End log
            await _context.SaveChangesAsync();
            return progressPlan;
        }
        public async Task<ProgressPlan> GetProgressPlanByIdThenDelete(ProgressPlan progressPlan)
        {
            var aa = _context.ProgressPlan.Where(x => x.InitiativeId == progressPlan.InitiativeId).ToList();
            foreach (var item in aa)
            {
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(item, "Progress-574", SQLCommandType.DELETE, false);
                // End log
                _context.Remove(item);
            }
            await _context.SaveChangesAsync();

            return progressPlan;
        }
        public async Task<List<ProgressPlan>> GetProgressPlan(int id)
        {
            return await _context.ProgressPlan.Where(x => x.InitiativeId == id).OrderBy(x => x.Year).ThenBy(x => x.ProgressPlanType).ToListAsync();
        }

        // OutStanding
        public async Task<OutstandingModel> CreateOutStanding(OutstandingModel model)
        {
            await _context.Outstandings.AddAsync(model);
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(model, "Progress-592", SQLCommandType.INSERT, false);
            // End log
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<OutstandingData> CreateOutOutstandingData(OutstandingData model)
        {
            await _context.OutstandingData.AddAsync(model);
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(model, "Progress-602", SQLCommandType.INSERT, false);
            // End log
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<BscNarrative> CreateBscNarrative(BscNarrative bscNarrative)
        {
            var getModel = _context.BscNarrative.Where(x => x.InitiativeId == bscNarrative.InitiativeId
            && x.Year == bscNarrative.Year && x.Month == bscNarrative.Month).FirstOrDefault();

            if (getModel != null)
            {
                getModel.InitiativeId = bscNarrative.InitiativeId;
                getModel.Year = bscNarrative.Year;
                getModel.Month = bscNarrative.Month;
                // bsc
                getModel.Engineering = bscNarrative.Engineering;
                getModel.Construction = bscNarrative.Construction;
                getModel.Procurement = bscNarrative.Procurement;
                getModel.CommissioningStartup = bscNarrative.CommissioningStartup;
                getModel.ProjectManagement = bscNarrative.ProjectManagement;
                getModel.RiskAndConcern = bscNarrative.RiskAndConcern;
                getModel.MitigationPlan = bscNarrative.MitigationPlan;
                getModel.ExecutiveSummary = bscNarrative.ExecutiveSummary;
                getModel.WorkForNextMonth = bscNarrative.WorkForNextMonth;
                getModel.EnvironmentKpi = bscNarrative.EnvironmentKpi;
                // narrative
                getModel.HighlightWork = bscNarrative.HighlightWork;
                getModel.CatchupPlan = bscNarrative.CatchupPlan;
                getModel.NarrativeStatus = bscNarrative.NarrativeStatus;
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(getModel, "Progress-634", SQLCommandType.INSERT, false);
                // End log
                _context.SaveChanges();
            }
            else
            {
                bscNarrative.BscNarrativeId = 0;
                // create
                await _context.BscNarrative.AddAsync(bscNarrative);
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(bscNarrative, "Progress-644", SQLCommandType.INSERT, false);
                // End log
                await _context.SaveChangesAsync();
            }



            // update

            return bscNarrative;
        }
        public async Task<BscNarrative[]> CreateAllBscNarrative(BscNarrative[] bscNarrative)
        {
            if (bscNarrative == null)
            {
                return new BscNarrative[] { };
            }
            var getModel = await _context.BscNarrative.Where(x => x.InitiativeId == bscNarrative[0].InitiativeId).ToListAsync();

            if (getModel.Any())
            {
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(getModel, "Progress-666", SQLCommandType.DELETE, false);
                // End log
                _context.RemoveRange(getModel);
                await _context.SaveChangesAsync();
            }

            foreach (var item in bscNarrative)
            {
                item.BscNarrativeId = 0;
                // create
                await _context.BscNarrative.AddAsync(item);
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(item, "Progress-678", SQLCommandType.INSERT, false);
                // End log
                await _context.SaveChangesAsync();
            }



            // update

            return bscNarrative;
        }
        public async Task<InvestmentCost[]> CreateAllCostSpending(int id, InvestmentCost[] investmentCosts)
        {
            if (investmentCosts == null)
            {
                return new InvestmentCost[] { };
            }
            //var getModel = await _context.InvestmentCost.Where(x => x.InitiativeId == id && x.InvestmentCostType == "planCost").ToListAsync();
            var getModel = await _context.InvestmentCost.Where(x => x.InitiativeId == id).ToListAsync();

            if (getModel.Any())
            {

                _context.RemoveRange(getModel);
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(getModel, "Progress-703", SQLCommandType.DELETE, false);
                // End log
                await _context.SaveChangesAsync();
            }

            foreach (var item in investmentCosts)
            {
                //if (item.InvestmentCostType == "planCost")
                //{
                //}
                item.InvestmentCostId = 0;
                // create
                await _context.InvestmentCost.AddAsync(item);
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(item, "Progress-717", SQLCommandType.INSERT, false);
                // End log
                await _context.SaveChangesAsync();
            }



            // update

            return investmentCosts;
        }

        public async Task<BscNarrative> GetBscNarrative(int id, int year, int month)
        {
            return await _context.BscNarrative.Where(x => x.InitiativeId == id && x.Month == month && x.Year == year).FirstOrDefaultAsync();
        }

        public async Task<List<BscNarrative>> GetBscNarrativeAll(int id)
        {
            return await _context.BscNarrative.Where(x => x.InitiativeId == id).ToListAsync();
        }

        public async Task<decimal[]> GetCostSpendingMonthAsync(int id, int year, string type)
        {
            var getModel = await _context.InvestmentCost.Where(x => x.InitiativeId == id && x.YearCost == year.ToString() && x.InvestmentCostType == type).FirstOrDefaultAsync();

            if (getModel != null)
            {
                decimal[] costMonth = new decimal[] {
                    (decimal)(getModel.JanCost == null ? 0 : getModel.JanCost),
                    (decimal)(getModel.FebCost == null ? 0 : getModel.FebCost),
                    (decimal)(getModel.MarCost == null ? 0 : getModel.MarCost),
                    (decimal)(getModel.AprCost == null ? 0 : getModel.AprCost),
                    (decimal)(getModel.MayCost == null ? 0 : getModel.MayCost),
                    (decimal)(getModel.JunCost == null ? 0 : getModel.JunCost),
                    (decimal)(getModel.JulCost == null ? 0 : getModel.JulCost),
                    (decimal)(getModel.AugCost == null ? 0 : getModel.AugCost),
                    (decimal)(getModel.SepCost == null ? 0 : getModel.SepCost),
                    (decimal)(getModel.OctCost == null ? 0 : getModel.OctCost),
                    (decimal)(getModel.NovCost == null ? 0 : getModel.NovCost),
                    (decimal)(getModel.DecCost == null ? 0 : getModel.DecCost),
                };
                return costMonth;
            }

            return null;
        }

        public async Task<List<InvestmentCost>> GetAllCostSpending(int id)
        {
            var getModel = await _context.InvestmentCost.Where(x => x.InitiativeId == id).ToListAsync();

            return getModel;
        }

        public async Task<object> GetCostSpendingYearAsync(int id, string type)
        {
            var yearPlanCost = (from a in await _context.InvestmentCost.ToListAsync()
                                where a.InvestmentCostType == "planCost" && a.InitiativeId == id
                                orderby a.YearCost
                                group a by a.YearCost into g
                                //orderby g.Select(x=>x.YearCost)
                                select new
                                {
                                    year = g.Key,
                                    //cost = g.Sum(p=>p.JanCost)+ g.Sum(p => p.FebCost) + g.Sum(p => p.MarCost) + g.Sum(p => p.AprCost) + g.Sum(p => p.MayCost) + g.Sum(p => p.JunCost)
                                    //     + g.Sum(p => p.JulCost) + g.Sum(p => p.AugCost) + g.Sum(p => p.SepCost) + g.Sum(p => p.OctCost) + g.Sum(p => p.NovCost) + g.Sum(p => p.DecCost)
                                    cost = g.Sum(x => x.OverallCost) == null ? 0 : g.Sum(x => x.OverallCost)
                                });
            var yearActualCost = from a in await _context.InvestmentCost.ToListAsync()
                                 where a.InvestmentCostType == "actualCost" && a.InitiativeId == id
                                 orderby a.YearCost
                                 group a by a.YearCost into g
                                 //orderby g.Select(x => x.YearCost)
                                 select new
                                 {
                                     year = g.Key,
                                     cost = g.Sum(x => x.OverallCost) == null ? 0 : g.Sum(x => x.OverallCost)
                                 };


            List<CostSpendingYearArray> arrayCost = new List<CostSpendingYearArray>();
            arrayCost.Add(new CostSpendingYearArray { Type = "planCost", Cost = yearPlanCost.Select(x => x.cost == null ? 0 : x.cost).ToArray() });
            arrayCost.Add(new CostSpendingYearArray { Type = "actualCost", Cost = yearActualCost.Select(x => x.cost == null ? 0 : x.cost).ToArray() });

            CostSpendingYearModel model = new CostSpendingYearModel
            {
                Year = _context.InvestmentCost.Where(x => x.InitiativeId == id).OrderBy(x => x.YearCost).Select(p => p.YearCost).Distinct().ToArray(),
                CostSpendingYearArray = arrayCost
            };
            //&& x.InvestmentCostType == type
            return model;
        }

        public async Task<ProgressModel> GetProgressHeader(int id)
        {
            ProgressModel progress = new ProgressModel();
            var ProgressHeader = await _context.ProgressHeader.Where(x => x.InitiativeId == id).FirstOrDefaultAsync();

            if (ProgressHeader != null)
            {
                progress = new ProgressModel()
                {
                    ProgressHeaderId = ProgressHeader.ProgressHeaderId,
                    InitiativeId = ProgressHeader.InitiativeId,
                    AppropriationNo = ProgressHeader.AppropriationNo,
                    WbsNo = ProgressHeader.WbsNo,
                    StandardProjectDef = ProgressHeader.StandardProjectDef,
                    SolomonCategory = ProgressHeader.SolomonCategory,
                    AreaPlant = ProgressHeader.AreaPlant,
                    PhysicalBu = ProgressHeader.PhysicalBu,
                    PhysicalUnit = ProgressHeader.PhysicalUnit,
                    Responsible = ProgressHeader.Responsible,

                    Engineering = ProgressHeader.Engineering,
                    Construction = ProgressHeader.Construction,
                    Procurement = ProgressHeader.Procurement,
                    CommissioningStartup = ProgressHeader.CommissioningStartup,
                    ProjectManagement = ProgressHeader.ProjectManagement,
                    RiskAndConcern = ProgressHeader.RiskAndConcern,
                    MitigationPlan = ProgressHeader.MitigationPlan,
                    ExecutiveSummary = ProgressHeader.ExecutiveSummary,
                    WorkForNextMonth = ProgressHeader.WorkForNextMonth,
                    EnvironmentKpi = ProgressHeader.EnvironmentKpi
                };
            }
            return progress;

        }
        public async Task<int> CreateProgressHeader(int initiativeId)
        {
            ProgressModel progress = new ProgressModel();
            var ProgressHeaderCheck = await _context.ProgressHeader.Where(x => x.InitiativeId == initiativeId).FirstOrDefaultAsync();

            if (ProgressHeaderCheck == null)
            {
                var ProgressHeader = new ProgressHeader()
                {
                    ProgressHeaderId = 0,
                    InitiativeId = initiativeId,
                    AppropriationNo = null,
                    WbsNo = null,
                    StandardProjectDef = null,
                    SolomonCategory = null,
                    AreaPlant = null,
                    PhysicalBu = null,
                    PhysicalUnit = null,
                    Responsible = null,
                    Engineering = null,
                    Construction = null,
                    Procurement = null,
                    CommissioningStartup = null,
                    ProjectManagement = null,
                    RiskAndConcern = null,
                    MitigationPlan = null,
                    ExecutiveSummary = null,
                    WorkForNextMonth = null,
                    EnvironmentKpi = null
                };
                await _context.ProgressHeader.AddAsync(ProgressHeader);
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(ProgressHeader, "Progress-878", SQLCommandType.INSERT, false);
                // End log
                return await _context.SaveChangesAsync();
            }
            return 0;

        }
        public async Task<string> GetProgressPlanComplete(int initiativeId)
        {
            ProgressModel progress = new ProgressModel();
            string[] month = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
            string[] progressPlanType = { "Engineering", "Procurement", "Construction", "Commissioning" };

            List<ProgressPlan> progressPlan = await _context.ProgressPlan.Where(x => x.InitiativeId == initiativeId && x.PlanActual == "Actual").ToListAsync();
            List<ProgressPlanDate> progressPlanDate = await _context.ProgressPlanDate.Where(x => x.InitiativeId == initiativeId).ToListAsync();
            ProgressHeader progressHeader = await _context.ProgressHeader.Where(x => x.InitiativeId == initiativeId).FirstOrDefaultAsync();
            DateTime today = DateTime.Now;
            Regex regex = new Regex("^CP.*1$");

            if (progressPlanDate != null)
            {
                //is EPCC
                if (progressHeader != null && regex.IsMatch(progressHeader.StandardProjectDef))
                {
                    string[] epccComplete = new string[4];
                    int maxYear = 0;
                    for (int idx = 0; idx<progressPlanType.Length; idx++)
                    {
                        var weightPlan = progressPlanDate.Find(x => x.ProgressPlanDateType == progressPlanType[idx]);
                        var planItem = progressPlan.FindAll(x => x.ProgressPlanType == progressPlanType[idx]);
                        if (weightPlan.PocWeightPercent > 0)
                        {
                            foreach (ProgressPlan plan in planItem)
                            {
                                if (plan.Jan == 100)
                                    epccComplete[idx] = plan.Year;
                                if (plan.Feb == 100)
                                    epccComplete[idx] = plan.Year;
                                if (plan.Mar == 100)
                                    epccComplete[idx] = plan.Year;
                                if (plan.Apr == 100)
                                    epccComplete[idx] = plan.Year;
                                if (plan.May == 100)
                                    epccComplete[idx] = plan.Year;
                                if (plan.Jun == 100)
                                    epccComplete[idx] = plan.Year;
                                if (plan.Jul == 100)
                                    epccComplete[idx] = plan.Year;
                                if (plan.Aug == 100)
                                    epccComplete[idx] = plan.Year;
                                if (plan.Sep == 100)
                                    epccComplete[idx] = plan.Year;
                                if (plan.Oct == 100)
                                    epccComplete[idx] = plan.Year;
                                if (plan.Nov == 100)
                                    epccComplete[idx] = plan.Year;
                                if (plan.Dec == 100)
                                    epccComplete[idx] = plan.Year;
                            }
                        }
                        else
                        {
                            epccComplete[idx] = "Skip";
                        }
                    }

                    for (int idx = 0; idx < epccComplete.Length; idx++)
                    {
                        if (!string.IsNullOrWhiteSpace(epccComplete[idx]) && epccComplete[idx].Equals("Skip"))
                        {
                            continue;
                        }
                        else if (string.IsNullOrWhiteSpace(epccComplete[idx]))
                        {
                            return null;
                        }
                        else if (int.TryParse(epccComplete[idx], out int year))
                        {
                            maxYear = maxYear < year ? year : maxYear;
                        }
                    }
                    return maxYear + "";
                }
                else
                {
                    foreach (var planItem in progressPlan)
                    {
                        if (planItem.Jan == 100)
                            return planItem.Year;
                        if (planItem.Feb == 100)
                            return planItem.Year;
                        if (planItem.Mar == 100)
                            return planItem.Year;
                        if (planItem.Apr == 100)
                            return planItem.Year;
                        if (planItem.May == 100)
                            return planItem.Year;
                        if (planItem.Jun == 100)
                            return planItem.Year;
                        if (planItem.Jul == 100)
                            return planItem.Year;
                        if (planItem.Aug == 100)
                            return planItem.Year;
                        if (planItem.Sep == 100)
                            return planItem.Year;
                        if (planItem.Oct == 100)
                            return planItem.Year;
                        if (planItem.Nov == 100)
                            return planItem.Year;
                        if (planItem.Dec == 100)
                            return planItem.Year;
                    }
                    return null;
                }

            }
            else
            {

                return null;
            }
        }
    }
}