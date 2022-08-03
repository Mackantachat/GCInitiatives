using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.SettingChart
{
    public class CustomReportDetail
    {
        [Key]
        public int RunningID { get; set; }
        public int? ReportID { get; set; }
        public string FieldName { get; set; }
        public string AggregateFunction { get; set; }
        public string Axis { get; set; }
        public int? Sequence { get; set; }
        public string ColorCode { get; set; }
    }
}
