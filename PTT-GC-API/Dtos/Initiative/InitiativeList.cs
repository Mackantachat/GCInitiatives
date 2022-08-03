using System;
using System.Collections.Generic;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Dtos.Initiative
{
    public class InitiativeList
    {
        public int Id { get; set; }
        public string InitiativeCode { get; set; }
        public string Name { get; set; }
        public string OwnerName { get; set; }
        public string Organization { get; set; }
        public DateTime? RegisteringDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? Cim { get; set; }
        public bool? Pim { get; set; }
        public bool? Dim { get; set; }
        public bool? Max { get; set; }
        public bool? DirectCapex { get; set; }
        public bool? Cpi { get; set; }
        public bool? Strategy { get; set; }
        public bool? RandD { get; set; }
        public bool? Other { get; set; }
        public string InitiativeType { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public bool? IsAddMore { get; set; }
        public bool? IsRevise { get; set; }
        public bool? IsReturn { get; set; }
        public string WbsNo { get; set; }
        public string Company { get; set; }
        public string AssignTo { get; set; }
        public int Counter { get; set; }
        public string SapStatus { get; set; }
        public string MocStatus { get; set; }
        public virtual ICollection<InitiativeAction> InitiativeActions { get; set; }
    }
}