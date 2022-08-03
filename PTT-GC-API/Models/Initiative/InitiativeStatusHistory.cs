using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Initiative
{
    public class InitiativeStatusHistory
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public string Stage { get; set; }
        public string SubType { get; set; }
        public string Status { get; set; }
        public string ActionBy { get; set; }
        public string ActionDate { get; set; }
        public string Comment { get; set; }
        public DateTime? LastSubmittedDate { get; set; }
    }
}
