using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.DetailMaxInformation
{
    public class PimGateCreate
    {
        // Middle
        [Key]
        public int PimGateId { get; set; }  // 1 2 3 4 
        public int? InitiativeId { get; set; } // 1 2 3 4 
        public string PimGateStatus { get; set; } // 1 2 3 4 

        public int? ReviseBudgetRevision { get; set; } // 1 2 3 4 
        public int? Gate { get; set; } // 1 2 3 4 
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostEstimate { get; set; } // 1, 2, 3
        [Column(TypeName = "decimal(18,2)")]
        public decimal? OverallCapex { get; set; } // 1, 2, 3
        [Column(TypeName = "decimal(18,2)")]
        public decimal? RequestOpex { get; set; } // 1
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Benefit { get; set; } // 1, 2
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Irr { get; set; } // 1, 2
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SimplePayback { get; set; } // 1, 2
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Ram { get; set; } // 1, 2
        [Column(TypeName = "decimal(18,2)")]
        public decimal? JFactor { get; set; } // 1, 2
        public string PresentationLink { get; set; } // 1, 2
        public string PicMomLink { get; set; } // 2

        public bool? RequestPool { get; set; } // 2
        public string Note { get; set; } // 1, 2, 3
        public bool? SimplefiedProject { get; set; } // 1

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ReceivedOpexBudget { get; set; } // 2, 3
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ReceivedCapexGate2 { get; set; }  // 3
        [Column(TypeName = "decimal(18,2)")]
        public decimal? RequestCapexGate3 { get; set; }  // 3
        [Column(TypeName = "decimal(18,2)")]
        public decimal? AdditionalOpexBudget { get; set; }  // 2
        [Column(TypeName = "decimal(18,2)")]
        public decimal? TieInLongLeadItemsBudget { get; set; }  // 2

        public string EmocStatus { get; set; } // 4
        public string ExecutionLookbackStatus { get; set; } // 4
        public string SapStatus { get; set; } // 4


        // VAC
        public DateTime? VacDate { get; set; } // 1, 2, 3, 4
        public string VacStatus { get; set; } // 1, 2, 3, 4


        // PIC
        public DateTime? GateDate { get; set; } // 1, 2, 4
        public string GateStatus { get; set; } // 1, 2, 4

        public string SubPicMomLink { get; set; } // 1
        public string VacCheckListLink { get; set; } // 2
        public string ProjectCharterLink { get; set; } // 2
        public string RequestPoolStatus { get; set; } // 2

        //PIC-Member
        public List<string> UpStream { get; set; } // 1
        public List<string> CenterStream { get; set; } // 1
        public List<string> DownStream { get; set; } // 1
    }
}
