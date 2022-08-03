using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Initiative
{
    public class StatusTrackingsWithDisplayName
    {
        public string Status { get; set; }
        public string Stage { get; set; }
        public string ApprovedBy { get; set; }
        public string ApprovedDate { get; set; }
        public decimal? Sequence { get; set; }
        public decimal? RunningSequence { get; set; }
        public string ProcessType { get; set; }
        public string SubType { get; set; }
        public int HistoryId { get; set; }
        public int InitiativeId { get; set; }
        public string FlowType { get; set; }
        public string CurrentStageDisplay { get; set; }
        public string CurrentActionInformation { get; set; }
        public string NextActionInformation { get; set; }
    }
}
