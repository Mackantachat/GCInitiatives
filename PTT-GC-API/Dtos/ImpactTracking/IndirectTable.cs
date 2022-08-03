namespace PTT_GC_API.Dtos.ImpactTracking
{
    public class IndirectTable
    {
        public int Id { get; set; }
        public string ImpactTypeOfBenefitTable { get; set; }
        public string TypeOfBenefit { get; set; }
        public VersionPrice VersionPrice { get; set; }
        public RunRate RunRate { get; set; }
    }
}