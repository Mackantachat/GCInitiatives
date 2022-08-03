using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.VacPic
{
    public class VacList
    {
        [Key]
        public int VacListId { get; set; }
        public DateTime? MeetingDate { get; set; }
        public string StatusVac { get; set; }
    }
}
