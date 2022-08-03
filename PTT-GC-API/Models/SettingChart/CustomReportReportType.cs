using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.SettingChart
{
    public class CustomReportReportType
    {
        [Key]
        public int RunningID { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public int OrderBy { get; set; }
    }
}
