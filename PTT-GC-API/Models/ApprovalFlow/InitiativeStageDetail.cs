using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ApprovalFlow
{
    public class InitiativeStageDetail
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeStageDetailId { get; set; }
        public int InitiativeId { get; set; }
        public string Event { get; set; }
        public string Process { get; set; }
        public string FlowType { get; set; }
        public string Subtype { get; set; }
        public string CurrentStage { get; set; }
        public string CurrentStatus { get; set; }
        public string NextStage { get; set; }
        public string NextStatus { get; set; }
        public string ReviseStage { get; set; }
        public string ReviseStatus { get; set; }
        public string RejectStage { get; set; }
        public string RejectStatus { get; set; }
        public string BackwardStage { get; set; }
        public string BackwardStatus { get; set; }
        public string CancelStage { get; set; }
        public string CancelStatus { get; set; }
        public decimal Sequence { get; set; }
        public string NextCondition { get; set; }
        public int? HistoryId { get; set; }
        public bool? IsSwitchProcess { get; set; }
        public bool? IsCreateType { get; set; }
        public string PreStageStoredProcedure { get; set; }
        public string PostStageStoredProcedure { get; set; }
        public string CurrentStageDisplay { get; set; }
        public string CurrentActionInformation { get; set; }
        public string NextActionInformation { get; set; }
        public string SwitchProcessStage { get; set; }
        public string SwitchProcessStatus { get; set; }
    }
}
