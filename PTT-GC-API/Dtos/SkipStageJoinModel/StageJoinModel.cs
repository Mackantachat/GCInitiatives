using Castle.MicroKernel.SubSystems.Conversion;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using PTT_GC_API.Models.ImpactTracking;

namespace PTT_GC_API.Dtos.SkipStageJoinModel
{
    public class JoinCapexInformationInitiativesModel
    {
        public int CapexInformationId { get; set; }
        public int InitiativeId { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? ProjecctComRun { get; set; }
        public DateTime? RequestIniNoDate { get; set; }

        public string ProjectExePeriodYear { get; set; }

        public string ProjectExePeriodMonth { get; set; }

        public string CostCenterOfVP { get; set; } 
        public decimal? ProjectCost { get; set; }
        public string ReasonOfChanging { get; set; }

        //Budget From :

        public string BudgetPeriod { get; set; }  // Annual Budget (2021) | Mid Year Budget (2020) | Between year  //ชื่อเก่าคือ BudgetForm

        public string BetweenYear { get; set; }  // Contingency (2020) | Transfer (2020) | BOD Approval on | Pool Budget (2020)

        public string TransferForm { get; set; } // if select:Transfer(xxxx) ( Dropdown : OPEX | RMA  )

        public string PoolBudgetForm { get; set; } // if select:PoolBudget(xxxx) ( Dropdown : MAX | DIM | PIX | ER  )
        public bool? RequestPoolMAX { get; set; }
        public int? CostCenter { get; set; }

        public string CodeCostCenterOfVP { get; set; }
        public decimal? AdditionalCost { get; set; }

        //Renew
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
        public string SubmitTo { get; set; } // dropdown : Gate 1, Gate 2, Gate 3, .....
        public int Id { get; set; }
        
        public string InitiativeCode { get; set; }
        
        public string Name { get; set; }
        public string Year { get; set; }
        public string PoolType { get; set; }
        
        public string OwnerName { get; set; }
        
        public string Organization { get; set; }
        public bool? Integration { get; set; }
        public string Company { get; set; }
        public string SpecifyCompany { get; set; }
        public string Plant { get; set; }
        public string SpecifyPlant { get; set; }
        public string Location { get; set; }
        public string SpecifyLocation { get; set; }
        public DateTime? RegisteringDate { get; set; }
        public DateTime? FinishingDate { get; set; }
        public string Background { get; set; }
        public string ResultObjective { get; set; }
        public string ScopeOfWork { get; set; }
        public string Remark { get; set; }
        public string InitiativeType { get; set; }
        public string RequestCapex { get; set; }
        public decimal? CostEstCapex { get; set; }
        public string CostEstCapexType { get; set; }
        public string BudgetSource { get; set; }
        public string RequestOpex { get; set; }
        public decimal? CostEstOpex { get; set; }
        public string CostEstOpexType { get; set; }
        public string TypeOfInvestment { get; set; }
        public bool? Divestment { get; set; }
        public bool? InvolveItDigital { get; set; }
        public bool? RequestProjectEngineer { get; set; }
        public string BudgetType { get; set; }
        public string Ram { get; set; }
        public decimal? JFactor { get; set; }
        public string TypeBenefit { get; set; }
        public decimal? BenefitAmount { get; set; }
        public string BenefitAmountType { get; set; }
        public decimal? PayBackPeriod { get; set; }
        public decimal? Irr { get; set; }
        public decimal? Wacc { get; set; }
        public decimal? FxExchange { get; set; }
        public bool? Cim { get; set; }
        public bool? Pim { get; set; }
        public bool? Dim { get; set; }
        public bool? Max { get; set; }
        public bool? DirectCapex { get; set; }
        public bool? Cpi { get; set; }
        public bool? Strategy { get; set; }
        public bool? RandD { get; set; }
        public bool? Other { get; set; }
        public bool? TrackMax { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        
        public string UpdatedBy { get; set; }
        
        public string LastActivity { get; set; }
        public bool? DeletedFlag { get; set; }
        
        public string Status { get; set; }
        
        public string Stage { get; set; }
        public string CommentCancelled { get; set; }
        public DateTime? LastSubmittedDate { get; set; }
        public int? LagacyInitiativeId { get; set; }
        
        public string LagacyInitiativeCode { get; set; }
        
        public string SecretProject { get; set; }
        
        public string GoToStage { get; set; }
        
        public string SSPIM { get; set; }
        
        public string ITDigital { get; set; }
        
        public string CapexStage { get; set; }
        public bool? IsRequestCapex { get; set; }
        
        public string VPPlantOwner { get; set; }
        
        public string DMPlantOwner { get; set; }
        
        public string LookbackOwner { get; set; }
        public decimal? SortStage { get; set; }
        public int isSetInitiativeSubType { get; set; }
        
        public string InitiativeSubType { get; set; }

        public bool? AlignWithCorpStrategy { get; set; }
        
        public string StrategicYear { get; set; }
        
        public string StrategicObjective { get; set; }
        
        public string StrategyType { get; set; }
        public int? HistoryFlag { get; set; }
        public int? IsPassPimGate1 { get; set; }
        public int? CreateType { get; set; }
        public bool? IsCreatedApp { get; set; }
        public bool? IsCreatedWbs { get; set; }
        public int? GeneralTabStatus { get; set; }
        public int? DetailMaxDimCapexTabStatus { get; set; }
        public int? ImpactTabStatus { get; set; }
        public int? RiskTabStatus { get; set; }
        public int? ResourceTabStatus { get; set; }
        public int? CapexTabStatus { get; set; }
        public int? ProgressTabStatus { get; set; }
        public int? LessonLearnTabStatus { get; set; }
        public int? LookbackTabStatus { get; set; }
        public int? BestPracticeTabStatus { get; set; }
        public int? StrategyTabStatus { get; set; }
        public int? StatusTabStatus { get; set; }
        public int? DetailCimStrategyTabStatus { get; set; }
        public int? DetailPimTabStatus { get; set; }
        public int? DetailCpiTabStatus { get; set; }
        public bool? IsNextButtonClicked { get; set; }
        public decimal? ResidualValue { get; set; }
        public decimal? UtilitiesCost { get; set; }
        public decimal? MaintenanceCost { get; set; }
        public decimal? CatalystChemicalsCost { get; set; }
        public decimal? LabourCost { get; set; }
        public bool? UseIrrCalculate { get; set; }
        public string Likelihood { get; set; }
        public string Consequence { get; set; }
        public decimal? BaseRisk { get; set; }
        public decimal? RiskOfAlt { get; set; }
        public decimal? RiskReduction { get; set; }
        public decimal? PotentialConCost { get; set; }
        public string AnnualLikelihood { get; set; }
        public decimal? AnnualLikelihoodRatio { get; set; }
        public string ExposureFactor { get; set; }
        public decimal? ExposureFactorRatio { get; set; }
        public decimal? Probability { get; set; }
        public string Effectiveness { get; set; }
        
        public decimal? EffectivenessRatio { get; set; }
        
        public decimal? ProductionLoss { get; set; }
        
        public decimal? EconomicPenalties { get; set; }
        
        public decimal? EconomicBenefits { get; set; }
        
        public decimal? OpexPenaltiesCost { get; set; }
        
        public decimal? JustifiableCost { get; set; }
        public bool? IsReviseFlow { get; set; }
        
        public string AppropriationNo { get; set; }
        
        public string WBSNo { get; set; }
    }

    public class JoinViewInitiativeAndDetailInformationsModel
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string InitiativeCode { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
        [StringLength(4)]
        public string Year { get; set; }
        [StringLength(20)]
        public string PoolType { get; set; }
        [StringLength(255)]
        public string OwnerName { get; set; }
        [StringLength(50)]
        public string Organization { get; set; }
        public bool? Integration { get; set; }

        [StringLength(50)]
        public string Company { get; set; }
        [StringLength(50)]
        public string SpecifyCompany { get; set; }
        [StringLength(50)]
        public string Plant { get; set; }
        [StringLength(100)]
        public string SpecifyPlant { get; set; }
        [StringLength(100)]
        public string Location { get; set; }
        [StringLength(1000)]
        public string SpecifyLocation { get; set; }
        public DateTime? RegisteringDate { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? FinishingDate { get; set; }
        [StringLength(7000)]
        public string Background { get; set; }
        [StringLength(7000)]
        public string ResultObjective { get; set; }
        [StringLength(7000)]
        public string ScopeOfWork { get; set; }
        [StringLength(7000)]
        public string Remark { get; set; }
        [StringLength(100)]
        public string InitiativeType { get; set; }
        [StringLength(100)]
        public string RequestCapex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostEstCapex { get; set; }
        [StringLength(100)]
        public string CostEstCapexType { get; set; }
        [StringLength(100)]
        public string BudgetSource { get; set; }
        [StringLength(100)]
        public string RequestOpex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostEstOpex { get; set; }
        [StringLength(100)]
        public string CostEstOpexType { get; set; }
        [StringLength(200)]
        public string TypeOfInvestment { get; set; }
        public bool? Divestment { get; set; }
        public bool? InvolveItDigital { get; set; }
        public bool? RequestProjectEngineer { get; set; }
        [StringLength(100)]
        public string BudgetType { get; set; }
        [StringLength(100)]
        public string Ram { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? JFactor { get; set; }
        [StringLength(100)]
        public string TypeBenefit { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? BenefitAmount { get; set; }
        public string BenefitAmountType { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PayBackPeriod { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Irr { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Wacc { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? FxExchange { get; set; }
        public bool? Cim { get; set; }
        public bool? Pim { get; set; }
        public bool? Dim { get; set; }
        public bool? Max { get; set; }
        public bool? DirectCapex { get; set; }
        public bool? Cpi { get; set; }
        public bool? Strategy { get; set; }
        public bool? RandD { get; set; }
        public bool? Other { get; set; }
        public bool? TrackMax { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        [StringLength(100)]
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        [StringLength(100)]
        public string UpdatedBy { get; set; }
        [StringLength(100)]
        public string LastActivity { get; set; }
        public bool? DeletedFlag { get; set; }
        [StringLength(100)]
        public string Status { get; set; }
        [StringLength(100)]
        public string Stage { get; set; }
        [StringLength(5000)]
        public string CommentCancelled { get; set; }
        public DateTime? LastSubmittedDate { get; set; }
        public int? LagacyInitiativeId { get; set; }
        [StringLength(100)]
        public string LagacyInitiativeCode { get; set; }
        [StringLength(100)]
        public string SecretProject { get; set; }
        [StringLength(100)]
        public string GoToStage { get; set; }
        [StringLength(100)]
        public string SSPIM { get; set; }
        [StringLength(100)]
        public string ITDigital { get; set; }
        [StringLength(100)]
        public string CapexStatus { get; set; }
        [StringLength(100)]
        public string CapexStage { get; set; }
        public bool? IsRequestCapex { get; set; }
        [StringLength(200)]
        public string VPPlantOwner { get; set; }
        [StringLength(200)]
        public string DMPlantOwner { get; set; }
        [StringLength(200)]
        public string LookbackOwner { get; set; }
        public decimal? SortStage { get; set; }
        public int isSetInitiativeSubType { get; set; }
        [StringLength(100)]
        public string InitiativeSubType { get; set; }

        public bool? AlignWithCorpStrategy { get; set; }
        [StringLength(50)]
        public string StrategicYear { get; set; }
        [StringLength(100)]
        public string StrategicObjective { get; set; }
        [StringLength(100)]
        public string StrategyType { get; set; }
        public int? HistoryFlag { get; set; }
        public int? IsPassPimGate1 { get; set; }
        public int? CreateType { get; set; }
        public bool? IsCreatedApp { get; set; }
        public bool? IsCreatedWbs { get; set; }
        public int? GeneralTabStatus { get; set; }
        public int? DetailMaxDimCapexTabStatus { get; set; }
        public int? ImpactTabStatus { get; set; }
        public int? RiskTabStatus { get; set; }
        public int? ResourceTabStatus { get; set; }
        public int? CapexTabStatus { get; set; }
        public int? ProgressTabStatus { get; set; }
        public int? LessonLearnTabStatus { get; set; }
        public int? LookbackTabStatus { get; set; }
        public int? BestPracticeTabStatus { get; set; }
        public int? StrategyTabStatus { get; set; }
        public int? StatusTabStatus { get; set; }
        public int? DetailCimStrategyTabStatus { get; set; }
        public int? DetailPimTabStatus { get; set; }
        public int? DetailCpiTabStatus { get; set; }
        public bool? IsNextButtonClicked { get; set; }

        [Column(TypeName = "decimal(18,5)")]
        public decimal? ResidualValue { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? UtilitiesCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? MaintenanceCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? CatalystChemicalsCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? LabourCost { get; set; }
        public bool? UseIrrCalculate { get; set; }
        [StringLength(100)]
        public string Likelihood { get; set; }
        [StringLength(100)]
        public string Consequence { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? BaseRisk { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? RiskOfAlt { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? RiskReduction { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? PotentialConCost { get; set; }
        public string AnnualLikelihood { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? AnnualLikelihoodRatio { get; set; }
        public string ExposureFactor { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? ExposureFactorRatio { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? Probability { get; set; }
        public string Effectiveness { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? EffectivenessRatio { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? ProductionLoss { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? EconomicPenalties { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? EconomicBenefits { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? OpexPenaltiesCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? JustifiableCost { get; set; }
        public bool? IsReviseFlow { get; set; }
        [StringLength(100)]
        public string AppropriationNo { get; set; }
        [StringLength(100)]
        public string WBSNo { get; set; }
        // ------------------ Detail Max ---------------------- //
        [StringLength(4)]
        public string InitiativeYear { get; set; }
        [StringLength(100)]
        public string InitiativeTypeMax { get; set; }
        [StringLength(100)]
        public string Workstream { get; set; }
        [StringLength(100)]
        public string SubWorkstream1 { get; set; }
        [StringLength(100)]
        public string SubWorkstream2 { get; set; }
        [StringLength(100)]
        public string ProCategory { get; set; }
        [StringLength(100)]
        public string ProSubCategory { get; set; }
        [StringLength(100)]
        public string ProLever { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Baseline { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? BaselineHistorical { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? BaselineNonHistorical { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Saving { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SavingHistorical { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SavingNonHistorical { get; set; }
        public DateTime? IL3Date { get; set; }
        public DateTime? IL4Date { get; set; }
        public DateTime? IL5Date { get; set; }
        // public string SponsorEvp { get; set; }
        // public string WorkstreamLead { get; set; }
        // public string ToFinance { get; set; }
        // public string CTO { get; set; }
        // public string CFO { get; set; }

        // ------------------ Direct CAPEX ---------------------- //
        [StringLength(100)]
        public string President { get; set; }
        [StringLength(100)]
        public string Manager { get; set; }
        [StringLength(100)]
        public string ProjectManager { get; set; }

        // ------------------- Detail --------------------------- //
        //Max
        public string ProductionProcess { get; set; }
        //Max
        public string MilestoneSchedule { get; set; }
        //Max
        public string ExpectedTarget { get; set; }
        //Max
        public string ComparisonWithOther { get; set; }
        //Max
        public string otherResources { get; set; }
        //Max
        public string OtherInvestment { get; set; }
        //Max
        public string Consistent { get; set; }
        //Max
        public string KeySuccessFactor { get; set; }
        //Max
        public string SynergyBenefit { get; set; }
        //Max
        public string OtherStrategic { get; set; }
        //Max
        public string MarketOverview { get; set; }
        //Max
        public string PotentialCustomer { get; set; }
        //Max
        public string SalesPlan { get; set; }
        //Max
        public string SourceOfFeedback { get; set; }
        //Max
        public string OtherBusiness { get; set; }
        //max
        public string SafetyIndex { get; set; }
        //max
        public string CorporateImageIndex { get; set; }
        //max
        public string OtherQuality { get; set; }
        //max
        public string BaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaBaseCase { get; set; }
        public string OptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaOptimisticCase { get; set; }
        public string PessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaPessimisticCase { get; set; }
        [StringLength(500)]
        public string DepreciationCost { get; set; }
        [StringLength(100)]
        public string ForEnvironment { get; set; }
        [StringLength(100)]
        public string ForTurnaround { get; set; }
        public DateTime? CutFeedDate { get; set; }
        public DateTime? StartUpDate { get; set; }
        [StringLength(100)]
        public string ReplaceEquipment { get; set; }
        //max
        public string EquipmentName { get; set; }
        public DateTime? ReplacementDate { get; set; }
        [StringLength(500)]
        public string OldAssetCondition { get; set; }
        [StringLength(500)]
        public string OldAssetNo { get; set; }
        //max
        public string EquipmentOrAsset { get; set; }
        [StringLength(500)]
        public string Boi { get; set; }
        [StringLength(500)]
        public string BoiNo { get; set; }
        public bool? Capital { get; set; }
        public bool? Catalyst { get; set; }
        public bool? Software { get; set; }
        public bool? RightOfUse { get; set; }
        [StringLength(500)]
        public string Coordinate { get; set; }
        [StringLength(500)]
        public string Parties { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? UsefulYear { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? UsefulMonth { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CycleYear { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CycleMonth { get; set; }
        //max
        public string OtherKpis { get; set; }
        [StringLength(500)]
        public string HaveAdditional { get; set; }
        public int InitiativeId { get; set; }
        [StringLength(500)]
        public string DigitalStrategy { get; set; }
        [StringLength(500)]
        public string ValueChain { get; set; }
        [StringLength(500)]
        public string ProjectCategory { get; set; }
        public DateTime? BaselineStartDate { get; set; }
        public DateTime? BaselineFinishDate { get; set; }
        public DateTime? ReviseForecastStartDate { get; set; }
        public DateTime? ReviseForecastFinishDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualFinishDate { get; set; }
        public bool? IsDeliverAsPerCommittedScope { get; set; }
        public string ScopeDetail { get; set; }  //unknown Length
        public bool? IsDeliverAsPerCommittedDate { get; set; }
        //public string TimelineDetail { get; set; }
        public bool? IsDeliverAsPerCommittedCost { get; set; }
        public string CostDetail { get; set; }  //unknown Length
        public string UserFeedback { get; set; }   //unknown Length
        public bool? requireDirectBenefit { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? DirectBenefit { get; set; }
        public bool? RequireIndirectBenefit { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? IndirectBenefit { get; set; }
        [StringLength(200)]
        public string SubWorkstream { get; set; }
        [StringLength(500)]
        public string InititativeType { get; set; }
        [StringLength(500)]
        public string ProjectPriority { get; set; }
        [StringLength(500)]
        public string ProjectControl { get; set; }
        public DateTime? KickoffMeeting { get; set; }
        public DateTime? Gate1Date { get; set; }
        public bool SimProjectSkipGate2 { get; set; }
        public DateTime? Gate2Date { get; set; }
        public DateTime? Gate3Date { get; set; }

        public bool IsImpactProduction { get; set; }
        //max
        public string GoalAchievement { get; set; }
        //max
        public string AssumptionOfGoal { get; set; }
        //max
        public string ReasonForChange { get; set; }
        public bool IsMainPlant { get; set; }
        [StringLength(100)]
        public string DivMgrOfProcessEngineer { get; set; }
        [StringLength(500)]
        public string Smes { get; set; }
        [StringLength(500)]
        public string SponsorEvp { get; set; }
        [StringLength(500)]
        public string WorkstreamLeadVp { get; set; }
        [StringLength(500)]
        public string ToFinance { get; set; }
        [StringLength(500)]
        public string Cfo { get; set; }
        [StringLength(500)]
        public string Cto { get; set; }
        public bool IsAlignWithCorporateStrategy { get; set; }
        public bool IsSimProjectSkipGate2 { get; set; }
        [StringLength(100)]
        public string ProjectDirector { get; set; }
        [StringLength(100)]
        public string ProjectEngineer { get; set; }
        [StringLength(100)]
        public string ProcessEngineer { get; set; }
        [StringLength(1000)]
        public string SourceOfImprovement { get; set; }
        [StringLength(1000)]
        public string TypeOfCpi { get; set; }
        [StringLength(1000)]
        public string AnalysisTool { get; set; }
        //max
        public string RootCause { get; set; }
        //max
        public string StepExplanation { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimatedBudgetOpex { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimatedBenefitSavings { get; set; }
        //max
        public string EstimatedBenefitCalculationDetails { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBudgetOpex { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBudgetSavings { get; set; }
        //max
        public string ActualBenefitCalculationDetails { get; set; }
        [StringLength(500)]
        public string ProjectDocumentDatabase { get; set; } //pdd

        public bool? FixedAsset { get; set; }
        public bool? RequestSubPic { get; set; }
        [StringLength(100)]
        public string InternalOrderNo { get; set; }
        public bool? AttachProcess { get; set; }
        public bool? AttachPlotPlanSite { get; set; }
        public bool? AttachReference { get; set; }
        public bool? AttachBenefit { get; set; }
        public bool? UseExternalEmoc { get; set; }
        [StringLength(500)]
        public string ExternalEmoc { get; set; }
        //max
        public string ProjectNonFinancialBenefit { get; set; }
        [StringLength(100)]
        public string HighlightWorkStatus { get; set; }
        //max
        public string HighlightWorkConCern { get; set; }
        [StringLength(500)]
        public string NextActivities { get; set; }
        public bool? RequestTeamSupport { get; set; }
        public bool? RequestHandoverExecution { get; set; }
        public bool? RequestHandoverPlantOwner { get; set; }
        [StringLength(100)]
        public string VpOfPlantOwner { get; set; }
        [StringLength(100)]
        public string DmOfPlantOwner { get; set; }
        [StringLength(100)]
        public string PlantEngineer { get; set; }
        [StringLength(100)]
        public string PlantProcessEngineer { get; set; }
        [StringLength(100)]
        public string DivMgrOfPlantProcessEngineer { get; set; }
        public DateTime? IL0date { get; set; }
    }

    public class JoinViewInitiativeAndDetailInformationsAndProgressHeader
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string InitiativeCode { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
        [StringLength(4)]
        public string Year { get; set; }
        [StringLength(20)]
        public string PoolType { get; set; }
        [StringLength(255)]
        public string OwnerName { get; set; }
        [StringLength(50)]
        public string Organization { get; set; }
        public bool? Integration { get; set; }

        [StringLength(50)]
        public string Company { get; set; }
        [StringLength(50)]
        public string SpecifyCompany { get; set; }
        [StringLength(50)]
        public string Plant { get; set; }
        [StringLength(100)]
        public string SpecifyPlant { get; set; }
        [StringLength(100)]
        public string Location { get; set; }
        [StringLength(1000)]
        public string SpecifyLocation { get; set; }
        public DateTime? RegisteringDate { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? FinishingDate { get; set; }
        [StringLength(7000)]
        public string Background { get; set; }
        [StringLength(7000)]
        public string ResultObjective { get; set; }
        [StringLength(7000)]
        public string ScopeOfWork { get; set; }
        [StringLength(7000)]
        public string Remark { get; set; }
        [StringLength(100)]
        public string InitiativeType { get; set; }
        [StringLength(100)]
        public string RequestCapex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostEstCapex { get; set; }
        [StringLength(100)]
        public string CostEstCapexType { get; set; }
        [StringLength(100)]
        public string BudgetSource { get; set; }
        [StringLength(100)]
        public string RequestOpex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostEstOpex { get; set; }
        [StringLength(100)]
        public string CostEstOpexType { get; set; }
        [StringLength(200)]
        public string TypeOfInvestment { get; set; }
        public bool? Divestment { get; set; }
        public bool? InvolveItDigital { get; set; }
        public bool? RequestProjectEngineer { get; set; }
        [StringLength(100)]
        public string BudgetType { get; set; }
        [StringLength(100)]
        public string Ram { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? JFactor { get; set; }
        [StringLength(100)]
        public string TypeBenefit { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? BenefitAmount { get; set; }
        public string BenefitAmountType { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PayBackPeriod { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Irr { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Wacc { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? FxExchange { get; set; }
        public bool? Cim { get; set; }
        public bool? Pim { get; set; }
        public bool? Dim { get; set; }
        public bool? Max { get; set; }
        public bool? DirectCapex { get; set; }
        public bool? Cpi { get; set; }
        public bool? Strategy { get; set; }
        public bool? RandD { get; set; }
        public bool? Other { get; set; }
        public bool? TrackMax { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        [StringLength(100)]
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        [StringLength(100)]
        public string UpdatedBy { get; set; }
        [StringLength(100)]
        public string LastActivity { get; set; }
        public bool? DeletedFlag { get; set; }
        [StringLength(100)]
        public string Status { get; set; }
        [StringLength(100)]
        public string Stage { get; set; }
        [StringLength(5000)]
        public string CommentCancelled { get; set; }
        public DateTime? LastSubmittedDate { get; set; }
        public int? LagacyInitiativeId { get; set; }
        [StringLength(100)]
        public string LagacyInitiativeCode { get; set; }
        [StringLength(100)]
        public string SecretProject { get; set; }
        [StringLength(100)]
        public string GoToStage { get; set; }
        [StringLength(100)]
        public string SSPIM { get; set; }
        [StringLength(100)]
        public string ITDigital { get; set; }
        [StringLength(100)]
        public string CapexStatus { get; set; }
        [StringLength(100)]
        public string CapexStage { get; set; }
        public bool? IsRequestCapex { get; set; }
        [StringLength(200)]
        public string VPPlantOwner { get; set; }
        [StringLength(200)]
        public string DMPlantOwner { get; set; }
        [StringLength(200)]
        public string LookbackOwner { get; set; }
        public decimal? SortStage { get; set; }
        public int isSetInitiativeSubType { get; set; }
        [StringLength(100)]
        public string InitiativeSubType { get; set; }

        public bool? AlignWithCorpStrategy { get; set; }
        [StringLength(50)]
        public string StrategicYear { get; set; }
        [StringLength(100)]
        public string StrategicObjective { get; set; }
        [StringLength(100)]
        public string StrategyType { get; set; }
        public int? HistoryFlag { get; set; }
        public int? IsPassPimGate1 { get; set; }
        public int? CreateType { get; set; }
        public bool? IsCreatedApp { get; set; }
        public bool? IsCreatedWbs { get; set; }
        public int? GeneralTabStatus { get; set; }
        public int? DetailMaxDimCapexTabStatus { get; set; }
        public int? ImpactTabStatus { get; set; }
        public int? RiskTabStatus { get; set; }
        public int? ResourceTabStatus { get; set; }
        public int? CapexTabStatus { get; set; }
        public int? ProgressTabStatus { get; set; }
        public int? LessonLearnTabStatus { get; set; }
        public int? LookbackTabStatus { get; set; }
        public int? BestPracticeTabStatus { get; set; }
        public int? StrategyTabStatus { get; set; }
        public int? StatusTabStatus { get; set; }
        public int? DetailCimStrategyTabStatus { get; set; }
        public int? DetailPimTabStatus { get; set; }
        public int? DetailCpiTabStatus { get; set; }
        public bool? IsNextButtonClicked { get; set; }

        [Column(TypeName = "decimal(18,5)")]
        public decimal? ResidualValue { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? UtilitiesCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? MaintenanceCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? CatalystChemicalsCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? LabourCost { get; set; }
        public bool? UseIrrCalculate { get; set; }
        [StringLength(100)]
        public string Likelihood { get; set; }
        [StringLength(100)]
        public string Consequence { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? BaseRisk { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? RiskOfAlt { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? RiskReduction { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? PotentialConCost { get; set; }
        public string AnnualLikelihood { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? AnnualLikelihoodRatio { get; set; }
        public string ExposureFactor { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? ExposureFactorRatio { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? Probability { get; set; }
        public string Effectiveness { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? EffectivenessRatio { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? ProductionLoss { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? EconomicPenalties { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? EconomicBenefits { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? OpexPenaltiesCost { get; set; }
        [Column(TypeName = "decimal(18,5)")]
        public decimal? JustifiableCost { get; set; }
        public bool? IsReviseFlow { get; set; }
        [StringLength(100)]
        public string AppropriationNo { get; set; }
        [StringLength(100)]
        public string WBSNo { get; set; }
        // ------------------ Detail Max ---------------------- //
        [StringLength(4)]
        public string InitiativeYear { get; set; }
        [StringLength(100)]
        public string InitiativeTypeMax { get; set; }
        [StringLength(100)]
        public string Workstream { get; set; }
        [StringLength(100)]
        public string SubWorkstream1 { get; set; }
        [StringLength(100)]
        public string SubWorkstream2 { get; set; }
        [StringLength(100)]
        public string ProCategory { get; set; }
        [StringLength(100)]
        public string ProSubCategory { get; set; }
        [StringLength(100)]
        public string ProLever { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Baseline { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? BaselineHistorical { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? BaselineNonHistorical { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Saving { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SavingHistorical { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SavingNonHistorical { get; set; }
        public DateTime? IL3Date { get; set; }
        public DateTime? IL4Date { get; set; }
        public DateTime? IL5Date { get; set; }
        // public string SponsorEvp { get; set; }
        // public string WorkstreamLead { get; set; }
        // public string ToFinance { get; set; }
        // public string CTO { get; set; }
        // public string CFO { get; set; }

        // ------------------ Direct CAPEX ---------------------- //
        [StringLength(100)]
        public string President { get; set; }
        [StringLength(100)]
        public string Manager { get; set; }
        [StringLength(100)]
        public string ProjectManager { get; set; }

        // ------------------- Detail --------------------------- //
        //Max
        public string ProductionProcess { get; set; }
        //Max
        public string MilestoneSchedule { get; set; }
        //Max
        public string ExpectedTarget { get; set; }
        //Max
        public string ComparisonWithOther { get; set; }
        //Max
        public string otherResources { get; set; }
        //Max
        public string OtherInvestment { get; set; }
        //Max
        public string Consistent { get; set; }
        //Max
        public string KeySuccessFactor { get; set; }
        //Max
        public string SynergyBenefit { get; set; }
        //Max
        public string OtherStrategic { get; set; }
        //Max
        public string MarketOverview { get; set; }
        //Max
        public string PotentialCustomer { get; set; }
        //Max
        public string SalesPlan { get; set; }
        //Max
        public string SourceOfFeedback { get; set; }
        //Max
        public string OtherBusiness { get; set; }
        //max
        public string SafetyIndex { get; set; }
        //max
        public string CorporateImageIndex { get; set; }
        //max
        public string OtherQuality { get; set; }
        //max
        public string BaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaBaseCase { get; set; }
        public string OptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaOptimisticCase { get; set; }
        public string PessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaPessimisticCase { get; set; }
        [StringLength(500)]
        public string DepreciationCost { get; set; }
        //max
        [StringLength(100)]
        public string ForEnvironment { get; set; }
        [StringLength(100)]
        public string ForTurnaround { get; set; }
        public DateTime? CutFeedDate { get; set; }
        public DateTime? StartUpDate { get; set; }
        [StringLength(100)]
        public string ReplaceEquipment { get; set; }
        //max
        public string EquipmentName { get; set; }
        public DateTime? ReplacementDate { get; set; }
        [StringLength(500)]
        public string OldAssetCondition { get; set; }
        [StringLength(500)]
        public string OldAssetNo { get; set; }
        //max
        public string EquipmentOrAsset { get; set; }
        [StringLength(500)]
        public string Boi { get; set; }
        [StringLength(500)]
        public string BoiNo { get; set; }
        public bool? Capital { get; set; }
        public bool? Catalyst { get; set; }
        public bool? Software { get; set; }
        public bool? RightOfUse { get; set; }
        [StringLength(500)]
        public string Coordinate { get; set; }
        [StringLength(500)]
        public string Parties { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? UsefulYear { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? UsefulMonth { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CycleYear { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CycleMonth { get; set; }
        //max
        public string OtherKpis { get; set; }
        [StringLength(500)]
        public string HaveAdditional { get; set; }
        public int InitiativeId { get; set; }
        [StringLength(500)]
        public string DigitalStrategy { get; set; }
        [StringLength(500)]
        public string ValueChain { get; set; }
        [StringLength(500)]
        public string ProjectCategory { get; set; }
        public DateTime? BaselineStartDate { get; set; }
        public DateTime? BaselineFinishDate { get; set; }
        public DateTime? ReviseForecastStartDate { get; set; }
        public DateTime? ReviseForecastFinishDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualFinishDate { get; set; }
        public bool? IsDeliverAsPerCommittedScope { get; set; }
        public string ScopeDetail { get; set; }  //unknown Length
        public bool? IsDeliverAsPerCommittedDate { get; set; }
        //public string TimelineDetail { get; set; }
        public bool? IsDeliverAsPerCommittedCost { get; set; }
        public string CostDetail { get; set; }  //unknown Length
        public string UserFeedback { get; set; }   //unknown Length
        public bool? requireDirectBenefit { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? DirectBenefit { get; set; }
        public bool? RequireIndirectBenefit { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? IndirectBenefit { get; set; }
        [StringLength(200)]
        public string SubWorkstream { get; set; }
        [StringLength(500)]
        public string InititativeType { get; set; }
        [StringLength(500)]
        public string ProjectPriority { get; set; }
        [StringLength(500)]
        public string ProjectControl { get; set; }
        public DateTime? KickoffMeeting { get; set; }
        public DateTime? Gate1Date { get; set; }
        public bool SimProjectSkipGate2 { get; set; }
        public DateTime? Gate2Date { get; set; }
        public DateTime? Gate3Date { get; set; }

        public bool IsImpactProduction { get; set; }
        //max
        public string GoalAchievement { get; set; }
        //max
        public string AssumptionOfGoal { get; set; }
        //max
        public string ReasonForChange { get; set; }
        public bool IsMainPlant { get; set; }
        [StringLength(100)]
        public string DivMgrOfProcessEngineer { get; set; }
        [StringLength(500)]
        public string Smes { get; set; }
        [StringLength(500)]
        public string SponsorEvp { get; set; }
        [StringLength(500)]
        public string WorkstreamLeadVp { get; set; }
        [StringLength(500)]
        public string ToFinance { get; set; }
        [StringLength(500)]
        public string Cfo { get; set; }
        [StringLength(500)]
        public string Cto { get; set; }
        public bool IsAlignWithCorporateStrategy { get; set; }
        public bool IsSimProjectSkipGate2 { get; set; }
        [StringLength(100)]
        public string ProjectDirector { get; set; }
        [StringLength(100)]
        public string ProjectEngineer { get; set; }
        [StringLength(100)]
        public string ProcessEngineer { get; set; }
        [StringLength(1000)]
        public string SourceOfImprovement { get; set; }
        [StringLength(1000)]
        public string TypeOfCpi { get; set; }
        [StringLength(1000)]
        public string AnalysisTool { get; set; }
        //max
        public string RootCause { get; set; }
        //max
        public string StepExplanation { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimatedBudgetOpex { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimatedBenefitSavings { get; set; }
        //max
        public string EstimatedBenefitCalculationDetails { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBudgetOpex { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBudgetSavings { get; set; }
        //max
        public string ActualBenefitCalculationDetails { get; set; }
        [StringLength(500)]
        public string ProjectDocumentDatabase { get; set; } //pdd

        public bool? FixedAsset { get; set; }
        public bool? RequestSubPic { get; set; }
        [StringLength(100)]
        public string InternalOrderNo { get; set; }
        public bool? AttachProcess { get; set; }
        public bool? AttachPlotPlanSite { get; set; }
        public bool? AttachReference { get; set; }
        public bool? AttachBenefit { get; set; }
        public bool? UseExternalEmoc { get; set; }
        [StringLength(500)]
        public string ExternalEmoc { get; set; }
        //max
        public string ProjectNonFinancialBenefit { get; set; }
        [StringLength(100)]
        public string HighlightWorkStatus { get; set; }
        //max
        public string HighlightWorkConCern { get; set; }
        [StringLength(500)]
        public string NextActivities { get; set; }
        public bool? RequestTeamSupport { get; set; }
        public bool? RequestHandoverExecution { get; set; }
        public bool? RequestHandoverPlantOwner { get; set; }
        [StringLength(100)]
        public string VpOfPlantOwner { get; set; }
        [StringLength(100)]
        public string DmOfPlantOwner { get; set; }
        [StringLength(100)]
        public string PlantEngineer { get; set; }
        [StringLength(100)]
        public string PlantProcessEngineer { get; set; }
        [StringLength(100)]
        public string DivMgrOfPlantProcessEngineer { get; set; }
        public DateTime? IL0date { get; set; }
        public int ProgressHeaderId { get; set; }
        [StringLength(100)]
        public string WbsNo { get; set; }
        [StringLength(100)]
        public string StandardProjectDef { get; set; }
        [StringLength(100)]
        public string Responsible { get; set; }
        [StringLength(100)]
        public string SolomonCategory { get; set; }
        [StringLength(100)]
        public string AreaPlant { get; set; }
        [StringLength(100)]
        public string PhysicalBu { get; set; }
        [StringLength(100)]
        public string PhysicalUnit { get; set; }

        // BSC
        [StringLength(100)]
        public string Engineering { get; set; }
        [StringLength(100)]
        public string Construction { get; set; }
        [StringLength(100)]
        public string Procurement { get; set; }
        [StringLength(100)]
        public string CommissioningStartup { get; set; }
        [StringLength(100)]
        public string ProjectManagement { get; set; }
        [StringLength(100)]
        public string RiskAndConcern { get; set; }
        [StringLength(100)]
        public string MitigationPlan { get; set; }
        [StringLength(100)]
        public string ExecutiveSummary { get; set; }
        [StringLength(100)]
        public string WorkForNextMonth { get; set; }
        [StringLength(100)]
        public string EnvironmentKpi { get; set; }
        public bool? IsSendAppRequest { get; set; }
        public bool? IsSendWBS { get; set; }
    }
    
    public class JoinImpactTypeOfBenefitsAndImpactTracking
    {
        public ImpactTypeOfBenefit FixBen { get; set; }
        public ImpactTypeOfBenefit FloatBen { get; set; }
        public Models.Initiative.ImpactTracking ImpactTracking { get; set; }
    }

    public class JoinPimGateAndInitiatives
    {
        public Models.Initiative.Initiative Initiatives { get; set; }
        public Models.DetailInformation.PimGate PimGate { get; set; }
    }
}
