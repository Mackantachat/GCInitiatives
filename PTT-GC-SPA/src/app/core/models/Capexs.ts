
export interface Capexs {

  /**
   *
   *    public int CapexInformationId { get; set; }

        public int InitiativeId { get; set; }

        public DateTime? StartingDate { get; set; }

        public DateTime? ProjecctComRun { get; set; }

        public DateTime? RequestIniNoDate { get; set; }

        public string ProjectExePeriodYear { get; set; }

        public string ProjectExePeriodMonth { get; set; }

        public string CostCenterOfVP { get; set; }  //?????

        public decimal? ProjectCost { get; set; }

        public string ReasonOfChanging { get; set; }



        public string BudgetPeriod { get; set; }  // Annual Budget (2021) | Mid Year Budget (2020) | Between year  //ชื่อเก่าคือ BudgetForm

        public string BetweenYear { get; set; }  // Contingency (2020) | Transfer (2020) | BOD Approval on | Pool Budget (2020)

        public string TransferForm { get; set; } // if select:Transfer(xxxx) ( Dropdown : OPEX | RMA  )

        public string PoolBudgetForm { get; set; } // if select:PoolBudget(xxxx) ( Dropdown : MAX | DIM | PIX | ER  )

        public bool? RequestPoolMAX { get; set; }

        public int? CostCenter { get; set; }

        public string CodeCostCenterOfVP { get; set; }

        public decimal? AdditionalCost { get; set; }

        public int? Revistion { get; set; }

        public string CapexType { get; set; }

        public string CapexStatus { get; set; }

        public DateTime? ActionYear { get; set; }

        public bool? IsMaxApprovedRev { get; set; }

        public int? Sequent { get; set; }

        public decimal? SpendingActual { get; set; }

        public decimal? ExistingBudget { get; set; }

        public string BudgetYear { get; set; }

        public decimal? ReturnCost { get; set; }

        public decimal? SpendingActualAllPrevious { get; set; }

        public decimal? SpendingActualCurrentYear { get; set; }

        public decimal? CarriedCost { get; set; }

        public decimal? AvailableBudget { get; set; }

        public int? PoolId { get; set; }

        public string SubmitTo { get; set; }
   */


  capexInformationId: number;
  initiativeId: number;
  startingDate: Date;
  projecctComRun: Date;
  requestIniNoDate: Date;
  projectExePeriodYear: number;
  projectExePeriodMonth: number;
  costCenterOfVP: string;
  codeCostCenterOfVP: string;
  additionalCost: number;
  projectCost: number;
  reasonOfChanging: string;
  budgetPeriod: string;
  betweenYear: string;
  transferForm: string;
  poolBudgetForm: string;
  requestPoolMAX: boolean;

  revistion: number;
  capexType: string;
  capexStatus: string;
  actionYear: string;
  isMaxApprovedRev: boolean;
  sequent: number;
  spendingActual: number;
  existingBudget: number;
  budgetYear: string;
  returnCost: number;
  spendingActualAllPrevious: number;
  spendingActualCurrentYear: number;
  carriedCost: number;
  availableBudget: number;
  poolId: number;
  submitTo: string;









  // manager: string;
  // projectManager: string;

}

export interface ReturnDetail {
  existingCost: string;
  spendingActual: string;
  budgetAvailable: string;
  returnCost: string;
  projectCost: string;
  totalAvailable: string;
}

export interface CapexMonthly {
  monthlyInvestmentPlanId: number;
  annualInvestmentPlanId: number;
  initiativeId: number;
  investmentCost: string;  // Thousand Bath, Thousand Dollar, Thousand Yen, .....        
  investmentCostFx: number;  // FX (if not Thousand Bath)        
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  monthlyOverall: number;
  yearOfMonth: string;
  //Renew
  capexInformationId: number;
  sumMonthlyType: string;
}
