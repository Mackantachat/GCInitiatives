using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.CpiDetailInformation
{
    public class CpiKpiMonitor
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public int kpiNo { get; set; }
        public string kpiTitle { get; set; }
        public string result { get; set; }
        public string target { get; set; }
        public string status { get; set; }
    }
}
