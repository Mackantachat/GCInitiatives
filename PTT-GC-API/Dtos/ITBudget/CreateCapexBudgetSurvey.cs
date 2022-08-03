using PTT_GC_API.Models.ITBudget;

namespace PTT_GC_API.Dtos.ITBudget
{
    public class CreateCapexBudgetSurvey
    {
        public CapexBudgetSurvey[] budgetSurvey { get; set; }
    }

    public class CreateCapexBudgetSurveyNew
    {
        public CapexBudgetSurvey[] budgetSurvey { get; set; }
    }
}