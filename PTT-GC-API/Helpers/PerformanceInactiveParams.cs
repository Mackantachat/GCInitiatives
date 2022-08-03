using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Helpers
{
    public class PerformanceInactiveParams
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
        public string PerformanceInactiveId { get; set; }
        public int? InitiativeId { get; set; }
        public string InitiativeCode { get; set; }
        public bool? POC { get; set; }
        public bool? OutstandingItems { get; set; }
        public bool? HighlightWork { get; set; }
        public bool? CLSD { get; set; }
        public bool? BenefitTracking { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public bool? Progress { get; set; }
        public bool? Complete { get; set; }
        public bool? Cancel { get; set; }
        public string Column { get; set; }
        public string OrderBy { get; set; }
        public string Username { get; set; }
    }
}
