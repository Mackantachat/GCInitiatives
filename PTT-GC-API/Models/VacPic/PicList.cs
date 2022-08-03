using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.VacPic
{
    public class PicList
    {
        [Key]
        public int PicListId { get; set; }
        public DateTime? MeetingDate { get; set; }
        public string StatusPic { get; set; }
    }
}
