using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Initiative
{
    public class DimMember
    {
        [Key]
        public int Id { get; set; }
        public string MemberType { get; set; }
        public string MemberName { get; set; }
        public string MemberEmployeeId { get; set; }
        public int InitiativeId { get; set; }

    }
}
