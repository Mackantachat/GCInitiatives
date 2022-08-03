using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.SettingChart
{
    public class CustomReportParameter
    {
        [Key]
        public int RunningID { get; set; }
        public int? ReportID { get; set; }
        public int? Sequence { get; set; }
        public string ParameterName { get; set; }
        public string ParameterField { get; set; }
        public string FilterCondition { get; set; }
        public string ParameterType { get; set; }
        public string Required { get; set; }
        public string DefaultValue { get; set; }
    }
}
