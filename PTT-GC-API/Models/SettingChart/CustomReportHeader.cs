using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.SettingChart
{
    public class CustomReportHeader
    {       
        [Key]
        public int RunningID { get; set; }
        public int? ReportID { get; set; }
        public string ReportCode { get; set; }
        public string ReportName { get; set; }
        public string Description { get; set; }
        public string GraphType { get; set; }
        public string X_AxisLabel { get; set; }
        public string Y_AxisLabel { get; set; }
        public string OtherTypeLabel { get; set; }
        public string CreateUser { get; set; }
        public DateTime? CreateDate { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string StageType { get; set; }
        public Boolean? isAccumulate { get; set; }
        public string SystemReportType { get; set; }

    }
}
