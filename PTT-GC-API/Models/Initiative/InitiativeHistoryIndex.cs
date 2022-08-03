using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Initiative
{
    public class InitiativeHistoryIndex
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeIdMain { get; set; }
        public int InitiativeIdHistory { get; set; }
        public string InitiativeCode { get; set; }
        public string Stage { get; set; }
        public string Status { get; set; }
        public string SubmittedBy { get; set; }
        public DateTime? SubmittedDate { get; set; }
        public string Comment { get; set; }
    }
}
