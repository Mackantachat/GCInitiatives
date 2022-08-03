using PTT_GC_API.API.Helpers;
using PTT_GC_API.Models.SettingChart;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.SettingChart
{
    public class CustomReportHeaderPagination
    {
        public List<CustomReportHeader> allReportHeader { get; set; }
        public PaginationHeader paginationHeader { get; set; }
    }
}
