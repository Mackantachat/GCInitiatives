using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Permission
{
    public class SectionSetting
    {
        [Key]
        public int Id { get; set; }
        public string SectionId { get; set; }
        public string SectionName { get; set; }
        public string Description { get; set; }

    }
}
