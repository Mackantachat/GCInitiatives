using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Permission
{
    public class RoleSettingDetail
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(1024)]
        public string PageId { get; set; }
        [MaxLength(1024)]
        public string SectionId { get; set; }
        [MaxLength(1024)]
        public string FieldName { get; set; }

        public bool? IsVisible { get; set; }
        public bool? IsEnable { get; set; }
        public bool? IsIndividual { get; set; }

        [MaxLength(1024)]
        public string Parameter01 { get; set; }
        [MaxLength(1024)]
        public string Parameter02 { get; set; }
        [MaxLength(1024)]
        public string Parameter03 { get; set; }
        [MaxLength(1024)]
        public string Parameter04 { get; set; }
        [MaxLength(1024)]
        public string Parameter05 { get; set; }
        [MaxLength(1024)]
        public string Parameter06 { get; set; }
        [MaxLength(1024)]
        public string Parameter07 { get; set; }
        [MaxLength(1024)]
        public string Parameter08 { get; set; }
        [MaxLength(1024)]
        public string Parameter09 { get; set; }
        [MaxLength(1024)]
        public string Parameter10 { get; set; }
        [MaxLength(1024)]
        public string Parameter11 { get; set; }
        [MaxLength(1024)]
        public string Parameter12 { get; set; }
        [MaxLength(1024)]
        public string Parameter13 { get; set; }
        [MaxLength(1024)]
        public string Parameter14 { get; set; }
        [MaxLength(1024)]
        public string Parameter15 { get; set; }
        [MaxLength(1024)]
        public string Parameter16 { get; set; }
        [MaxLength(1024)]
        public string Parameter17 { get; set; }
        [MaxLength(1024)]
        public string Parameter18 { get; set; }
        [MaxLength(1024)]
        public string Parameter19 { get; set; }
        [MaxLength(1024)]
        public string Parameter20 { get; set; }
        [MaxLength(500)]
        public string RoleId { get; set; }
        [MaxLength(500)]
        public string RoleName { get; set; }

        [MaxLength(500)]
        public string InitiativeType { get; set; }
        [MaxLength(500)]
        public string Stage { get; set; }
        [MaxLength(500)]
        public string Status { get; set; }
        [MaxLength(500)]
        public string TypeOfInvestment { get; set; }
        public int? Priority { get; set; }
        public int? PermissionMasterId { get; set; }

    }
}
