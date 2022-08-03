using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PTT_GC_API.Models.DetailInformation;

namespace PTT_GC_API.Dtos.Initiative
{
    public class InitiativeKpi
    {
        public string Year { get; set; }
        public string RequestCapex { get; set; }
        public string TypeOfInvestment { get; set; }
        public DateTime? RegisteringDate { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? FinishingDate { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PayBackPeriod { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Irr { get; set; }
        public string TypeBenefit { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public string Remark { get; set; }
        public virtual ICollection<KpiDetailInformation> KpiDetailInformations { get; set; }
    }
}