using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Helpers
{
    public class SettingParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 20;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public string Page { get; set; }
        public string Text { get; set; }
        public string Id { get; set; }
        public string InitiativeCodeFormat { get; set; }
        public int PeriodForKeeping { get; set; }
        public bool IsAvailablePeriodAnnual { get; set; }
        public DateTime StartPeriodAnnual { get; set; }
        public DateTime FinishPeriodAnnual { get; set; }
        public bool IsAvailablePeriodMid { get; set; }
        public DateTime StartPeriodMid { get; set; }
        public DateTime FinishPeriodMid { get; set; }
        public bool IsAvailableBudgetPool { get; set; }
        public DateTime StartPeriodBudgetPool { get; set; }
        public DateTime FinishPeriodBudgetPool { get; set; }
        public bool IsActiveITBudgetSurvey { get; set; }
        public DateTime StartPeriodIT { get; set; }
        public DateTime FinishPeriodIT { get; set; }
        public int IL4TrackingPeriod { get; set; }
        public decimal OneTimeBenefit { get; set; }
        public bool? Progress { get; set; }
        public bool? Complete { get; set; }
        public bool? Cancel { get; set; }
        public string Column { get; set; }
        public string OrderBy { get; set; }
        public string Username { get; set; }
    }
}
