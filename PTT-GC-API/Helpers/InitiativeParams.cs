using System;

namespace PTT_GC_API.API.Helpers
{
    public class InitiativeParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public string Page { get; set; }
        public string Text { get; set; }
        public string Id  { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string MyOwner { get; set; }
        public string OwnerName { get; set; }
        public string Organization { get; set; }
        public string Plant { get; set; }
        public string TypeOfInvestment { get; set; }
        public DateTime? RegisterDateSince { get; set; }
        public DateTime? RegisterDateTo { get; set; }
        public bool? Progress { get; set; }
        public bool? Complete { get; set; }
        public bool? Cancel { get; set; }
        public string Column { get; set; }
        public string OrderBy { get; set; }
        public string InitiativeSubType { get; set; }
        public string Username { get; set; }
        public string Workstream { get; set; }
        public string SubWorkstream1 { get; set; }
        public string Stage { get; set; }
        public string EmocNo { get; set; }
        public string WbsNo { get; set; }
        public string AppNo { get; set; }
        public string Company { get; set; }
    }
}