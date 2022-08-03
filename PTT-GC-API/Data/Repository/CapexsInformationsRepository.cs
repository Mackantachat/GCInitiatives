using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Capexs;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.CapexInformation;
using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class CapexsInformationsRepository : CapexsInformationsInterface
    {
        private readonly DataContext _context;
        private readonly StoreProcedureInterface _storeProcedure;
        public CapexsInformationsRepository(DataContext context, StoreProcedureInterface storeProcedure)
        {
            _context = context;
            _storeProcedure = storeProcedure;
        }
        public async void Add<T>(T entity) where T : class
        {
            await _context.AddAsync(entity);
        }
        public async Task<bool> Any()
        {
            return await _context.CapexInformation.AnyAsync();
        }
        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<DetailInformation> UpdateMangerForMax(int id, string manager, string projectMananger, string vp)
        {
            //var getInitiativeDetail = _context.DetailInformations.Where(o => o.Id == id).FirstOrDefaultAsync();
            var getInitiativeDetail = (from a in _context.DetailInformations where a.InitiativeId == id select a).FirstOrDefaultAsync();

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(getInitiativeDetail, "CAPEXInformation", SQLCommandType.UPDATE, false);
            // End log

            getInitiativeDetail.Result.Manager = manager;
            getInitiativeDetail.Result.ProjectManager = projectMananger;
            getInitiativeDetail.Result.President = vp;

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(getInitiativeDetail, "CAPEXInformation", SQLCommandType.UPDATE, true);
            // End log

            await _context.SaveChangesAsync();
            return null;
        }

        public async Task<CapexInformations> GetCapexsInformations(int id, string CapexType)
        {
            //var impactTrackings = await _context.CapexInformation.SingleOrDefaultAsync(i => i.InitiativeId == id && i.CapexType.Contains(CapexType) && i.CapexStatus.Contains("Savedraft"));
            var impactTrackings = await _context.CapexInformation.OrderByDescending(p => p.Revistion).OrderByDescending(p => p.Sequent).FirstOrDefaultAsync(i => i.InitiativeId == id && i.CapexType == CapexType);
            if (impactTrackings == null)
            {
                impactTrackings = await _context.CapexInformation.OrderByDescending(p => p.Revistion).OrderByDescending(p => p.Sequent).FirstOrDefaultAsync(i => i.InitiativeId == id && i.CapexStatus == "Submit");
            }
            return impactTrackings;
        }

        public async Task<CapexInformations> GetCapexsInformations_one(int id)
        {
            //var impactTrackings = await _context.CapexInformation.SingleOrDefaultAsync(i => i.InitiativeId == id && i.CapexType.Contains(CapexType) && i.CapexStatus.Contains("Savedraft"));
            var impactTrackings = await _context.CapexInformation.OrderByDescending(p => p.CapexInformationId).FirstOrDefaultAsync(i => i.InitiativeId == id);
            //if (impactTrackings == null)
            //{
            //    impactTrackings = await _context.CapexInformation.OrderByDescending(p => p.Revistion).OrderByDescending(p => p.Sequent).FirstOrDefaultAsync(i => i.InitiativeId == id && i.CapexStatus == "Submit");
            //}
            return impactTrackings;
        }


        public async Task<CapexInformations> GetCapexsInformationsByCapexInformationId(int CapexInformationId)
        {
            var capexInformation = await _context.CapexInformation.FirstOrDefaultAsync(i => i.CapexInformationId == CapexInformationId);
            return capexInformation;
        }



        public async Task<CreateAnnualInvestmentPlanDtos> CreateAnnualInvestmentPlan(int id, int capexid, CreateAnnualInvestmentPlanDtos annualInvestmentPlan)
        {
            if (_context.AnnualInvestmentPlans.Any())
            {
                var AnnualInvestmentPlanList = await _context.AnnualInvestmentPlans
                .Where(i => i.InitiativeId == id && i.CapexInformationId == capexid)
                .ToListAsync();
                foreach (var entity in AnnualInvestmentPlanList)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "CAPEXInformation", SQLCommandType.DELETE);
                    // End log
                    _context.AnnualInvestmentPlans.Remove(entity);
                }
                //await _context.SaveChangesAsync();
            }

            foreach (var item in annualInvestmentPlan.AnnualInvestmentPlanTableDtos)
            {
                try
                {

                    var DataannualInvestmentPlan = new AnnualInvestmentPlan
                    {
                        CapexInformationId = capexid,
                        InitiativeId = id,
                        Currency = item.Currency,
                        CurrencyFx = item.CurrencyFx,
                        Year1 = item.Year1,
                        Year2 = item.Year2,
                        Year3 = item.Year3,
                        Year4 = item.Year4,
                        Year5 = item.Year5,
                        Year6 = item.Year6,
                        Year7 = item.Year7,
                        Year8 = item.Year8,
                        Year9 = item.Year9,
                        Year10 = item.Year10,
                        YearOverall = item.YearOverall,
                        PlanType = item.PlanType,
                        //ActualSpendingThisYear = item.ActualSpendingThisYear,
                        //FutureSpendingThisYear = item.FutureSpendingThisYear,
                        //CarryBudget = item.CarryBudget

                    };
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(DataannualInvestmentPlan, "CAPEXInformation", SQLCommandType.INSERT);
                    // End log
                    await _context.AnnualInvestmentPlans.AddAsync(DataannualInvestmentPlan);
                }
                catch (Exception exc)
                {
                    throw exc;
                }
            }
            await _context.SaveChangesAsync();
            return annualInvestmentPlan;
        }


        public async Task<IEnumerable<AnnualInvestmentPlan>> GetAnnualInvestmentPlan(int id, int capexid)
        {
            var GetAnnualInvestmentPlanList = await _context.AnnualInvestmentPlans
            .Where(i => i.InitiativeId == id && i.CapexInformationId == capexid)
            .ToListAsync();
            return GetAnnualInvestmentPlanList;
        }

        public async Task<CreateMonthlyInvestmentPlanDtos> CreateMonthlyInvestmentPlan(int id, int capexid, CreateMonthlyInvestmentPlanDtos monthlyInvestment)
        {
            if (_context.MonthlyInvestmentPlans.Any())
            {
                var MonthlyInvestmentPlanList = await _context.MonthlyInvestmentPlans
                .Where(i => i.InitiativeId == id && i.CapexInformationId == capexid)
                .ToListAsync();
                foreach (var entity in MonthlyInvestmentPlanList)
                {
                    // Temporary Log for Invetigate 2021-07-13
                    LogInsight.Log(entity, "CAPEXInformation", SQLCommandType.DELETE);
                    // End log

                    _context.MonthlyInvestmentPlans.Remove(entity);
                }
                //await _context.SaveChangesAsync();
            }

            foreach (var item in monthlyInvestment.MonthlyInvestmentPlanTableDtos)
            {
                var DatamonthlyInvestmentPlan = new MonthlyInvestmentPlan
                {
                    InitiativeId = id,
                    CapexInformationId = capexid,
                    AnnualInvestmentPlanId = item.AnnualInvestmentPlanId,
                    InvestmentCost = item.InvestmentCost,
                    InvestmentCostFx = item.InvestmentCostFx,
                    Jan = item.Jan,
                    Feb = item.Feb,
                    Mar = item.Mar,
                    Apr = item.Apr,
                    May = item.May,
                    Jun = item.Jun,
                    Jul = item.Jul,
                    Aug = item.Aug,
                    Sep = item.Sep,
                    Oct = item.Oct,
                    Nov = item.Nov,
                    Dec = item.Dec,
                    MonthlyOverall = item.MonthlyOverall,
                    YearOfMonth = item.YearOfMonth,
                    SumMonthlyType = item.SumMonthlyType

                };
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(DatamonthlyInvestmentPlan, "CAPEXInformation", SQLCommandType.INSERT);
                // End log
                await _context.MonthlyInvestmentPlans.AddAsync(DatamonthlyInvestmentPlan);
            }
            await _context.SaveChangesAsync();
            return monthlyInvestment;
        }

        public async Task<IEnumerable<MonthlyInvestmentPlan>> GetMonthlyInvestmentPlan(int id, int capexid, string year)
        {
            var GetMonthlyInvestmentPlanList = await _context.MonthlyInvestmentPlans
            .Where(i => i.InitiativeId == id && i.CapexInformationId == capexid && i.YearOfMonth.Contains(year))
            .ToListAsync();
            return GetMonthlyInvestmentPlanList;
        }

        public async Task<IEnumerable<AnnualInvestmentPlan>> GetTotalByRevisionAll(int id)
        {
            var GetAnnualInvestmentPlanList = await _context.AnnualInvestmentPlans
            .Where(i => i.InitiativeId == id && i.PlanType == "TotalBahtbyRevision")
            .ToListAsync();
            return GetAnnualInvestmentPlanList;
        }

        public async Task<IEnumerable<CapexInformations>> GetCapexsInformationBySubmit(int id)
        {
            var GetAnnualInvestmentPlanList = await _context.CapexInformation
            .Where(i => i.InitiativeId == id && i.CapexStatus == "Submit")
            .ToListAsync();
            return GetAnnualInvestmentPlanList;
        }

        public async Task<IEnumerable<CapexInitiaitve>> GetPoolInnitiative(string pooltype, int year, int initiativeId)
        {
            string getCompany = _context.Initiatives.Where(o => o.Id == initiativeId).Select(o => o.Company).FirstOrDefault();
            //Tempolary Solution // Not Support Case Add More Pool  // Need to Review 
            //var initiative = await _context.Initiatives.Where(o => o.Id == initiativeId).FirstOrDefaultAsync();
            //decimal? budgetReserved = 0;
            //var capexInformations = await _context.CapexInformations.Where(o => o.InitiativeId == initiativeId).OrderByDescending(i => i.Sequent).FirstOrDefaultAsync();

            //if ((initiative.Stage != null && initiative.Stage != "draft") && (initiative.Status == "revised" || initiative.Status == "draft"))
            //{

            //    if (capexInformations.CapexType == "AddmoreCapex")
            //    {
            //        budgetReserved = capexInformations.AdditionalCost;
            //    }
            //    else
            //    {
            //        budgetReserved = capexInformations.ProjectCost;
            //    }
            //}

            //var result = (from c in _context.CapexInformation
            //              join i in _context.Initiatives on c.InitiativeId equals i.Id
            //              where i.InitiativeType == "Request Pool" && i.PoolType == pooltype && i.Stage == "Budget Pool"
            //              && i.Status == "finish" && c.StartingDate.Value.Year == year && i.Company == getCompany
            //              orderby c.Sequent descending
            //              select new CapexInitiaitve
            //              {
            //                  Id = i.Id,
            //                  InitiativeCode = i.InitiativeCode,
            //                  ProjectCost = c.ProjectCost.Value,
            //                  AvailableBudget = c.AvailableBudget.Value + (capexInformations != null && i.Id == capexInformations.PoolId ? budgetReserved.Value : 0),
            //                  name = i.InitiativeCode + " " + i.Name,
            //                  seq = c.Sequent
            //              }).ToList();

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log("sp_FIX_CalculatePoolAvailableBudget", "CAPEXInformation", SQLCommandType.EXECUTE);
            // End log
            try { await _storeProcedure.Execute_NoReturn("sp_FIX_CalculatePoolAvailableBudget"); } catch { };


            var result = (from c in _context.CapexInformation
                          join i in _context.Initiatives.Where(i => (i.HistoryFlag == null || i.HistoryFlag == 0)) on c.InitiativeId equals i.Id
                          where i.InitiativeType == "Request Pool" && i.PoolType == pooltype && (i.Stage == "Budget Pool" || i.Stage == "BUDGET DISTRIBUTE")
                          && i.Status == "finish" && c.BudgetYear == year.ToString() && i.Company == getCompany
                          orderby c.Sequent descending
                          select new CapexInitiaitve
                          {
                              Id = i.Id,
                              InitiativeCode = i.InitiativeCode,
                              ProjectCost = c.ProjectCost.Value,
                              AvailableBudget = c.AvailableBudget.Value,
                              name = i.InitiativeCode + " " + i.Name,
                              seq = c.Sequent
                          }).ToList();

            var poolReturn = new List<CapexInitiaitve>();
            if (result?.Count > 0)
            {

                foreach (var res in result)
                {
                    if (poolReturn?.Count > 0)
                    {
                        if (poolReturn.Find(x => x.InitiativeCode == res.InitiativeCode && x.seq < res.seq) != null)
                        {
                            var removeIndex = poolReturn.Find(fIndex => fIndex.InitiativeCode == res.InitiativeCode && fIndex.seq < res.seq);
                            poolReturn.Remove(removeIndex);
                            poolReturn.Add(res);
                        }
                        else if (poolReturn.FindIndex(x => x.InitiativeCode == res.InitiativeCode) < 0)
                        {
                            poolReturn.Add(res);
                        }

                    }
                    else
                    {
                        poolReturn.Add(res);
                    }
                }
                return poolReturn;
            }

            return poolReturn;

        }

        public async Task<IEnumerable<CapexInitiaitve>> GetPoolInnitiativeByID(int poolid)
        {
            //var query = (from t1 in _context.Initiatives.ToList()
            //             join t2 in _context.CapexInformation.ToList()
            //             on t1.Id equals t2.InitiativeId
            //             where t1.Id == poolid
            //             select new CapexInitiaitve
            //             {
            //                 Id = t1.Id,
            //                 InitiativeCode = t1.InitiativeCode,
            //                 ProjectCost = t2.ProjectCost.Value,
            //                 AvailableBudget = t2.AvailableBudget.Value,
            //                 name = t1.InitiativeCode + " " + t1.Name

            //             }).ToList();
            var result = (from c in _context.CapexInformation
                          join i in _context.Initiatives.Where(i => (i.HistoryFlag == null || i.HistoryFlag == 0)) on c.InitiativeId equals i.Id
                          where i.Id == poolid
                          orderby c.Sequent descending
                          select new CapexInitiaitve
                          {
                              Id = i.Id,
                              InitiativeCode = i.InitiativeCode,
                              ProjectCost = c.ProjectCost.Value,
                              AvailableBudget = c.AvailableBudget.Value,
                              name = i.InitiativeCode + " " + i.Name,
                              seq = c.Sequent
                          }).ToList();

            return result;
        }

        public async Task<IEnumerable<CodeCostCenterDtos>> GetCodeOfCostCenterVP(CodeCostCenterDtos data)
        {
            /*  var query = (from t1 in _context.Owners.AsEnumerable()
                           where t1.OwnerName == data.OwnerName
                           select new CodeCostCenterDtos
                           {
                               OwnerName = t1.OwnerName,
                               MainPositionCostCenter = t1.MainPositionCostCenter.Value

                           }).ToList(); */
            var query = (from t1 in _context.Owners
                         where t1.OwnerName == data.OwnerName
                         select new CodeCostCenterDtos
                         {
                             OwnerName = t1.OwnerName,
                             MainPositionCostCenter = t1.MainPositionCostCenter.Value

                         }).ToList();
            return query;
        }


        public void Update<T>(T entity) where T : class
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(entity, "CAPEXInformation", SQLCommandType.UPDATE, true);
            // End log
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(entity, "CAPEXInformation", SQLCommandType.UPDATE);
            // End log
            _context.Remove(entity);
        }

        public async Task<AnnualInvestmentPlan> GetAnnualInvestmentPlan_sumtatal(int annaul_id)
        {
            var GetAnnualInvestmentPlanList = await _context.AnnualInvestmentPlans.FirstOrDefaultAsync(i => i.AnnualInvestmentPlanId == annaul_id);

            return GetAnnualInvestmentPlanList;
        }

        public async Task<List<CapexInformations>> GetCapexsInformationList(int id)
        {
            return await _context.CapexInformation.Where(x => x.InitiativeId == id).OrderBy(i => i.Sequent).ToListAsync();
        }

        public void UpdatePoolData(int id, int Spending)
        {
            var pool = this.GetCapexsInformations(id, "Requestpool").GetAwaiter().GetResult();
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(pool, "CAPEXInformation", SQLCommandType.UPDATE, false);
            // End log
            pool.AvailableBudget = pool.AvailableBudget - Spending;
            pool.SpendingActual = pool.SpendingActual + Spending;
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(pool, "CAPEXInformation", SQLCommandType.UPDATE, true);
            // End log
            _context.SaveChanges();
        }

        public void StampSubmitDateTime(int initiativeId, DateTime? nowDatetime)
        {
            var capexInformation = _context.CapexInformations.Where(x => x.InitiativeId == initiativeId).OrderByDescending(x => x.Revistion).FirstOrDefault();
            if (capexInformation != null)
            {
                capexInformation.SubmittedDate = nowDatetime ?? DateTime.Now;
                if (_context.SaveChanges() > 0) return;
                throw new DbUpdateException("Error Has been Occured in Stamp Add More Pool DateTime");
            }
        }
    }
}
