namespace PTT_GC_API.Dtos.MaxApprover
{
    public class Workstream
    {
        public string Name { get; set; }
        public string Indicator { get; set; }
        public int? InitiativeId { get; set; }
        public decimal? Benefit { get; set; }
        public string IsLoaded { get; set; }
    }
}