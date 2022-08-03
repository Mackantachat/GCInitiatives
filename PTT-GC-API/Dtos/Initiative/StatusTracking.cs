namespace PTT_GC_API.Dtos.Initiative
{
    public class StatusTracking
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public string ApprovedBy {get;set;}
        public string ApprovedDate { get; set; }
        public int Sequence { get; set; }
        public string ProcessType { get; set; }
        public int HistoryId { get; set; }
        public int InitiativeId { get; set; }
    }
}