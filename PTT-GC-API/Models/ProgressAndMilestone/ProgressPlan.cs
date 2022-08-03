using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ProgressAndMilestone
{
    public class ProgressPlan
    {
        [Key]
        public int ProgressPlanId { get; set; }
        public int? InitiativeId { get; set; }
        public string ProgressPlanType { get; set; }  // - , Over All, Engineer, Procurement, Construction, Commissioning
        public string PlanActual { get; set; } // Plan, Actual
        public string Year { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Jan { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Feb { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Mar { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Apr { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? May { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Jun { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Jul { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Aug { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Sep { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Oct { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Nov { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Dec { get; set; }

        public decimal? GetByMonth(int month)
        {
            switch (month)
            {
                case 1:
                    return Jan;
                case 2:
                    return Feb;
                case 3:
                    return Mar;
                case 4:
                    return Apr;
                case 5:
                    return May;
                case 6:
                    return Jun;
                case 7:
                    return Jul;
                case 8:
                    return Aug;
                case 9:
                    return Sep;
                case 10:
                    return Oct;
                case 11:
                    return Nov;
                case 12:
                    return Dec;
                default:
                    return null;
            }
        }
    }
}
