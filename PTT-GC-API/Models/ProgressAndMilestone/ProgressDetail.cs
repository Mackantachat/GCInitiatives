using System;

namespace PTT_GC_API.Models.ProgressAndMilestone
{
    public class ProgressDetail
    {
        public int Id { get; set; }
        public string Milestone { get; set; }
        public string KeyDeliverable { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? PlanFinish { get; set; }
        public DateTime? ActualFinish { get; set; }
        public string Activity { get; set; }
        public int InitiativeId { get; set; }
        public string InitiativeCode { get; set; }
       
    }
}