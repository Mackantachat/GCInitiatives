using System;
using System.Collections.Generic;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.ProgressAndMilestone;

namespace PTT_GC_API.Dtos.Initiative
{
    public class InitiativeProgress
    {
        public string InitiativeCode { get; set; }
        public string Year { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public string FxExchange { get; set; }
        public string Irr { get; set; }
        public string Remark { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? FinishingDate { get; set; }
        public string TypeOfInvestment { get; set; }
        public virtual InitiativeDetail InitiativeDetails { get; set; }
        public virtual Financial Financials { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<Milestone> Milestones { get; set; }
        public virtual ICollection<FinancialIndicator> FinancialIndicators { get; set; }
        public virtual ICollection<ProgressDetail> ProgressDetails { get; set; }
    }
}