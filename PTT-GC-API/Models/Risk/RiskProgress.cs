using System;
using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Models
{
    public class RiskProgress
    {
        [Key]
        public int Id { get; set; }
        public int RiskId { get; set; }
        public int ActionNo { get; set; }
        public string ActionDescription { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ActualCompletingDate { get; set; }
        public string Responsible { get; set; }
        public string Status { get; set; }
        public string ActionDueStatus { get; set; }
        public string Remark { get; set; }
    }
}
