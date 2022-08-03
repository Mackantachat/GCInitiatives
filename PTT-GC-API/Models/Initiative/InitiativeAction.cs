using System;
using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Models.Initiative
{
    public class InitiativeAction
    {
        public int Id { get; set; }
        [StringLength(255)]
        public string ActionBy { get; set; }
        [StringLength(255)]
        public string ActionByName { get; set; }
        [StringLength(255)]
        public string Action { get; set; }
        [StringLength(255)]
        public string Position { get; set; }
        [StringLength(100)]
        public string Status { get; set; }
        [StringLength(100)]
        public string Stage { get; set; }
        public int InitiativeId { get; set; }
        [StringLength(255)]
        public string Indicator { get; set; }
        [StringLength(255)]
        public string ConditionType { get; set; }
        public int Counter { get; set; }
        [StringLength(255)]
        public string ActionResult { get; set; }
        [StringLength(255)]
        public string FlowType { get; set; }
        public int? InitiativeStageDetailId { get; set; }
        public bool? IsInactive { get; set; }
        public DateTime? ActionDate { get; set; }
        [StringLength(255)]
        public string SwitchToProcess { get; set; }
    }
}