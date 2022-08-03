using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Permission
{
    public class RolePermissions
    {
        public int Id { get; set; }
        public string PageId { get; set; }
        public string SectionId { get; set; }
        public string FieldName { get; set; }
        public bool? IsVisible { get; set; }
        public bool? IsEnable { get; set; }
        public bool? IsIndividual { get; set; }
        public string Parameter01 { get; set; }
        public string Parameter02 { get; set; }
        public string Parameter03 { get; set; }
        public string Parameter04 { get; set; }
        public string Parameter05 { get; set; }
        public string Parameter06 { get; set; }
        public string Parameter07 { get; set; }
        public string Parameter08 { get; set; }
        public string Parameter09 { get; set; }
        public string Parameter10 { get; set; }
        public string Parameter11 { get; set; }
        public string Parameter12 { get; set; }
        public string Parameter13 { get; set; }
        public string Parameter14 { get; set; }
        public string Parameter15 { get; set; }
        public string Parameter16 { get; set; }
        public string Parameter17 { get; set; }
        public string Parameter18 { get; set; }
        public string Parameter19 { get; set; }
        public string Parameter20 { get; set; }
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public string InitiativeType { get; set; }
        public string Stage { get; set; }
        public string Status { get; set; }
        public string TypeOfInvestment { get; set; }
        public int? Priority { get; set; }
    }
}
