namespace PTT_GC_API.Dtos.ImpactTracking
{
    public class ImpiemantCostTable
    {
        public int Id { get; set; }
        public string ImpactTypeOfBenefitTable { get; set; }
        public string TypeOfBenefit { get; set; }
        public VersionPrice VersionPrice { get; set; }
        public RunRate RunRate { get; set; }
        public MonthRow monthRows1 { get; set; }
        public MonthRow monthRows2 { get; set; }
        public MonthRow monthRows3 { get; set; }
    }
}