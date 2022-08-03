using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.VacPic
{
    public class PicMember
    {
        [Key]
        public int PicMemberId { get; set; }
        public int? PicListId { get; set; }
        public string MemberType { get; set; }  // (  center  /  up  /  down  )
        public string MemberName { get; set; }
        public int? InitiativeId { get; set; }
        public int? Gate { get; set; }
    }
}
