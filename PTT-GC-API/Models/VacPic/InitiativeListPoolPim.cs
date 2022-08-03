using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.VacPic
{
    public class InitiativeListPoolPim
    {
        [Key]
        public int InitiativeListPoolPimId { get; set; }
        public int? InitiativeId { get; set; }
        public string OwnerName { get; set; }
        public string InvestmentType { get; set; }
        public string BenefitType { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? BenefitValue { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? ProjectCost { get; set; }
        public string StageGate { get; set; }
        public string Reason { get; set; }
        public string initiativeCode { get; set; }
        public int? PoolId { get; set; }
        public bool? Reference { get; set; }
        public string GateSelect { get; set; }
    }
}
