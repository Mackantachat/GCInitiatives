using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.VacPic
{
    public class VacMember
    {
        [Key]
        public int VacMemberId { get; set; }
        public int? VacListId { get; set; }
        public string MemberType { get; set; }  // (  common  /  specific  )
        public string MemberName { get; set; }
    }
}
