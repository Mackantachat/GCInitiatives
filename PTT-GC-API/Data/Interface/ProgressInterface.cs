using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Dtos.ProgressAndMilestone;
using PTT_GC_API.Models.Outstanding;
using PTT_GC_API.Models.ProgressAndMilestone;

namespace PTT_GC_API.Data.Interface
{
    public interface ProgressInterface
    {
        Task<CreateProgressDetail> CreateProgressDetail(int id, CreateProgressDetail CreateProgressDetail);
        Task<List<Models.ProgressAndMilestone.ProgressDetail>> GetProgressDetail(int initiativeId);
        Task<bool> DeleteProgressData(int initiativeId);
        Task<ProgressModel> CreateProgress(int id, ProgressModel CreateProgressHeader);

        Task<ProgressModel> GetProgress(int id);

        Task<ProgressPlanDate> CreateProgressPlanDate(ProgressPlanDate progressPlanDate);
        Task<ProgressPlanDate> GetProgressPlanDateByIdThenDelete(ProgressPlanDate progressPlanDate);
        Task<List<ProgressPlanDate>> GetProgressPlanDate(int id);

        Task<ProgressPlan> CreateProgressPlan(ProgressPlan progressPlan);
        Task<ProgressPlan> GetProgressPlanByIdThenDelete(ProgressPlan progressPlan);
        Task<List<ProgressPlan>> GetProgressPlan(int id);

        Task<OutstandingModel> CreateOutStanding(OutstandingModel outstandingModel);
        Task<OutstandingData> CreateOutOutstandingData(OutstandingData outstandingData);

        Task<BscNarrative> CreateBscNarrative(BscNarrative bscNarrative);
        Task<BscNarrative[]> CreateAllBscNarrative(BscNarrative[] bscNarrative);
        Task<InvestmentCost[]> CreateAllCostSpending(int id,InvestmentCost[] investmentCosts);
        Task<BscNarrative> GetBscNarrative(int id, int year, int month);
        Task<List<BscNarrative>> GetBscNarrativeAll(int id);
        Task<InvestmentCost[]> CreatePlanCost(int id, InvestmentCost[] investmentCost);
        Task<decimal[]> GetCostSpendingMonthAsync(int id, int year, string type);
        Task<object> GetCostSpendingYearAsync(int id, string type);
        Task<List<InvestmentCost>> GetAllCostSpending(int id);
        Task SubmitInvestmentCostFirstTime(int id);
        //Task<string[]> GetCostSpendingYear(int id, int year, string type);
        Task<ProgressModel> GetProgressHeader(int id);
        Task<int> CreateProgressHeader(int initiativeId);
        Task<string> GetProgressPlanComplete(int initiativeId);

    }
}