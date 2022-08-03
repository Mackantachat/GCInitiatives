using PTT_GC_API.Dtos.BestPractice;
using PTT_GC_API.Models.CpiDetailInformation;
using PTT_GC_API.Models.CpiDetailInformationData;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.ProgressAndMilestone;
using System.Collections.Generic;

namespace PTT_GC_API.Dtos.CpiDetailInformationDtos
{
    public class CpiDetailInformationModel
    {
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public string SourceOfImprovement { get; set; }
        public string TypeOfCpi { get; set; }
        public string AnalysisTool { get; set; }
        public string PhnBuPillar { get; set; }
        public string SpecifyPhnBuPillar { get; set; }
        public string TypeOfPhn { get; set; }        
        public string SpecifyTypeOfPhn { get; set; }
        public string OtherTool { get; set; }
        public string RootCause { get; set; }
        public string CpiApprover { get; set; }
        public decimal? EstimatedBudgetOpex { get; set; }
        public decimal? EstimatedBenefitSavings { get; set; }
        public string EstimatedBenefitCalculationDetails { get; set; }
        public decimal? ActualBudgetOpex { get; set; }
        public decimal? ActualBudgetSavings { get; set; }
        public string ActualBenefitCalculationDetails { get; set; }
        public string LookbackText { get; set; }
        public List<CpiKeyPerformanceIndicator> KpiFormList { get; set; }
        public List<ProgressDetail> MilestoneFormList { get; set; }
        public List<CpiKpiMonitor> KpiMonitorFormList { get; set; }
    }
}
