using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Capexs
{
    public class CapexsInformations
    {
        //Investment Detail
        [Key]
        //public int CapexInformationId { get; set; }
        public int CapexInformationId { get; set; }
        public int InitiativeId { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? ProjecctComRun { get; set; }
        public DateTime? RequestIniNoDate { get; set; }
        public string ProjectExePeriodYear { get; set; }
        public string ProjectExePeriodMonth { get; set; }
        public string CostCenterOfVP { get; set; }  //?????
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectCost { get; set; }
        public string ReasonOfChanging { get; set; }

        ////Budget From :
        public string BudgetPeriod { get; set; }  // Annual Budget (2021) | Mid Year Budget (2020) | Between year
        public string BetweenYear { get; set; }  // Contingency (2020) | Transfer (2020) | BOD Approval on | Pool Budget (2020)
        public string TransferForm { get; set; } // if select:Transfer(xxxx) ( Dropdown : OPEX | RMA  )
        public string PoolBudgetForm { get; set; } // if select:PoolBudget(xxxx) ( Dropdown : MAX | DIM | PIX | ER  )

        public string CodeCostCenterOfVP { get; set; }
        public decimal? AdditionalCost { get; set; }

        //Renew
        public int? Revistion { get; set; }
        public string CapexType { get; set; }
        public string CapexStatus { get; set; }
        public DateTime? ActionYear { get; set; }
        public bool? IsMaxApprovedRev { get; set; }
        public int? Sequent { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SpendingActual { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ExistingBudget { get; set; }
        public string BudgetYear { get; set; }

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

        public string SubmitTo { get; set; } // dropdown : Gate 1, Gate 2, Gate 3, .....

        public string CreateBy { get; set; }
    }
}
