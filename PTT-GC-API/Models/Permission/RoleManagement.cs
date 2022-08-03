using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Permission
{
    public class RoleManagement
    {
        [Key]
        public int Id { get; set; }
        public string RoleId { get; set; }
        public string PageId { get; set; }
        public string SectionId { get; set; }
        public bool? IsVisible { get; set; }
        public bool? IsEnable { get; set; }
        public bool? IsIndividual { get; set; }

    }
}
