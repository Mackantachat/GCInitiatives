using PTT_GC_API.Models.SettingChart;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.SettingChart
{
    public class CustomReportMerge
    {
        public CustomReportHeader ReportHeader { get; set; }
        public CustomReportDetail ReportDetailX { get; set; }
        public CustomReportDetail[] ReportDetailY { get; set; }
        public CustomReportParameter[] ReportParam { get; set; }
    }
}
