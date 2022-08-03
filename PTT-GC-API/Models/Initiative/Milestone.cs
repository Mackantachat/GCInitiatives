using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Models.Initiative
{
    public class Milestone
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Detail { get; set; }
        public string KeyDeliverable { get; set; }
        public string ActionBy { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string MilestoneStatus { get; set; }
        public bool IsCpiDetail { get; set; }
        public int InitiativeId { get; set; }
    }
}