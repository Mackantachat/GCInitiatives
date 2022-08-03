namespace PTT_GC_API.Dtos.Initiative
{
    public class InitiativeSuggestStatus
    {
        public bool? Cim { get; set; }
        public bool? Pim { get; set; }
        public bool? Dim { get; set; }
        public bool? Max { get; set; }
        public bool? DirectCapex { get; set; }
        public bool? Cpi { get; set; }
        public bool? Strategy { get; set; }
        public bool? RandD { get; set; }
        public bool? Other { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public string Remark { get; set; }
        public bool? IsRequestCapex { get; set; }
        public bool? RequestCapex { get; set; }
        public string InitiativeSubType { get; set; }
        public string InitiativeType { get; set; }
    }
}