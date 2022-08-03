using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.URLTableSetting
{
    public class URLTable
    {
        [Key]
        public int Id { get; set; }
        public string URLType { get; set; }
        public string URL { get; set; }
        public string Remark { get; set; }
    }
}
