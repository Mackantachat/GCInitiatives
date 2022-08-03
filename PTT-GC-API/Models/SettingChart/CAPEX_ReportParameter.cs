
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Permissions;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.SettingChart
{
    public class CAPEX_ReportParameter
    {
        [Key]
        public int Id { get; set; }
        public string ReportType { get; set; }
        public string Value { get; set; }
        public string Name { get; set; }
    }
}
