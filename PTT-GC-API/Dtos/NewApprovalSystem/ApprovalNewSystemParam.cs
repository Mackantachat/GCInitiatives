using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.NewApprovalSystem
{
    public class ApprovalNewSystemParam
    {
        public int InitiativeId { get; set; }
        public string Event { get; set; }
        public string Process { get; set; }
        public string SubType { get; set; }
        public string FlowType { get; set; }
        public string ActionBy { get; set; }
        public string ActionType { get; set; } // submit , approve
        public string GotoStage { get; set; }
        public string Direction { get; set; } // forward backward cancelled      //, approve, revise, reject, approve cancelled, reject cancelled
        public string NowStage { get; set; }
        public string NowStatus { get; set; }
        public string NextStageToBe { get; set; }
        public string NextStatusToBe { get; set; }
        public bool IsUserAction { get; set; } //on user Action submit or approve  this value will flag as true    after pass condition it will changed to false 
        public bool IsFirstPassStage { get; set; } //on first pass stage this will be true   else false    use for track that not coming from skipped pass condititon
        public DateTime nowDateTime { get; set; } //use this datetime anywhere
        public string SwitchToProcess { get; set; } //use this datetime anywhere
        public bool IsSkipFromGetPassCondition { get; set; } //use this datetime anywhere

    }
}
