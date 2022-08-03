namespace PTT_GC_API.Models.DetailInformation
{
    public class KpiDetailInformation
    {
        public int Id { get; set; }
        public string Kpis { get; set; }
        public string Target { get; set; }
        public string Frequency { get; set; }
        public int InitiativeId { get; set; }
    }
}
