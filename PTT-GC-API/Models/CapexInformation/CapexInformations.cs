using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.CapexInformation
{
    public class CapexInformations
    {
        //Investment Detail
        [Key]
        public int CapexInformationId { get; set; }
        public int InitiativeId { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? ProjecctComRun { get; set; }
        public DateTime? RequestIniNoDate { get; set; }
        [StringLength(100)]
        public string ProjectExePeriodYear { get; set; }
        [StringLength(100)]
        public string ProjectExePeriodMonth { get; set; }
        [StringLength(100)]
        public string CostCenterOfVP { get; set; }  //?????
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectCost { get; set; }
        public string ReasonOfChanging { get; set; }

        //Budget From :
        [StringLength(100)]
        public string BudgetPeriod { get; set; }  // Annual Budget (2021) | Mid Year Budget (2020) | Between year  //ชื่อเก่าคือ BudgetForm
        [StringLength(100)]
        public string BetweenYear { get; set; }  // Contingency (2020) | Transfer (2020) | BOD Approval on | Pool Budget (2020)
        [StringLength(100)]
        public string TransferForm { get; set; } // if select:Transfer(xxxx) ( Dropdown : OPEX | RMA  )
        [StringLength(100)]
        public string PoolBudgetForm { get; set; } // if select:PoolBudget(xxxx) ( Dropdown : MAX | DIM | PIX | ER  )
        public bool? RequestPoolMAX { get; set; }
        public int? CostCenter { get; set; }
        [StringLength(100)]
        public string CodeCostCenterOfVP { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? AdditionalCost { get; set; }

        //Renew
        public int? Revistion { get; set; }
        [StringLength(100)]
        public string CapexType { get; set; }
        [StringLength(100)]
        public string CapexStatus { get; set; }
        public DateTime? ActionYear { get; set; }
        public bool? IsMaxApprovedRev { get; set; }
        public int? Sequent { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SpendingActual { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ExistingBudget { get; set; }
        [StringLength(100)]
        public string BudgetYear { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ReturnCost { get; set; }

        //2020-06-16
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SpendingActualAllPrevious { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SpendingActualCurrentYear { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CarriedCost { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? AvailableBudget { get; set; }
        public int? PoolId { get; set; }

        //Monthly investment Plan  (table)  

        //attachment.....

        //Cost Spending
        //public string AppropriateNo { get; set; }
        //public string WbsNo { get; set; }

        //public string PlanCostSapVersion { get; set; }  //dropdown
        //public string PlanCostSapYear { get; set; }  //drowpdown

        //public string EstToCompleteMonthId { get; set; } //dropdown  from another table
        //public string ContingencyMonthAmountTHB { get; set; } //dropdown from another table
        [StringLength(100)]
        public string SubmitTo { get; set; } // dropdown : Gate 1, Gate 2, Gate 3, .....

        public DateTime? SubmittedDate { get; set; }

        //Added Field For TimeStamp
        public DateTime? CreateDate { get; set; }
        public string CreateBy { get; set; }
        public DateTime? ReviseBgDate { get; set; }
    }
}
