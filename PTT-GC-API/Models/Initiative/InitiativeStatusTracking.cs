namespace PTT_GC_API.Models.Initiative
{
    public class InitiativeStatusTracking
    {
        public int Id { get; set; }
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
    }
}
