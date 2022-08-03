using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Setting
{
    public class Setting
    {
        [Key]
        public int SettingId { get; set; }
        public string InitiativeCodeFormat { get; set; }
        public int? PeriodForKeeping { get; set; }

        public bool? IsAvailablePeriodAnnual { get; set; }
        public DateTime? StartPeriodAnnual { get; set; }
        public DateTime? FinishPeriodAnnual { get; set; }

        public bool? IsAvailablePeriodMid { get; set; }
        public DateTime? StartPeriodMid { get; set; }
        public DateTime? FinishPeriodMid { get; set; }

        public bool? IsAvailableBudgetPool { get; set; }
        public DateTime? StartPeriodBudgetPool { get; set; }
        public DateTime? FinishPeriodBudgetPool { get; set; }

        public bool? IsActiveITBudgetSurvey { get; set; }
        public DateTime? StartPeriodIT { get; set; }
        public DateTime? FinishPeriodIT { get; set; }

        public int? IL4TrackingPeriod { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? OneTimeBenefit { get; set; }
    }
}
