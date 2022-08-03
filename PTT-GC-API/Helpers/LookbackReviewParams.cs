using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Helpers
{
    public class LookbackReviewParams
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
        public int LookbackReviewId { get; set; }
        public int? ProjectLookbackId { get; set; }
        public string ProjectReviewTeam { get; set; }
        public bool? Progress { get; set; }
        public bool? Complete { get; set; }
        public bool? Cancel { get; set; }
        public string Column { get; set; }
        public string OrderBy { get; set; }
        public string Username { get; set; }
    }
}
