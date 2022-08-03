using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Permission
{
    public class PageSetting
    {
        [Key]
        public int Id { get; set; }
        public string PageId { get; set; }
        public string PageName { get; set; }
        public string Description { get; set; }
    }
}
