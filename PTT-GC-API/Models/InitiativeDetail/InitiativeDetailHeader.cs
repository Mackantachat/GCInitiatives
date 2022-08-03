using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.InitiativeDetail
{
    //public string xxxxx { get; set; }
    public class InitiativeDetailHeader
    {
        //Initiative Detail
        [Key]
        public int Id { get; set; }
        public string TrackMaxBenefit { get; set; }  //DimByMax  PimTrackByMax  PimCapex  DimCapex CapexAppByMax  Strategy  StrategyByMax  OtherTrackByMax
        public string InitiativeYear { get; set; } //DimByMax  PimTrackByMax  PimCapex  CimCapex  DimCapex   MaxCapexApp  CapexAppByMax  Strategy  StrategyByMax
        public string StrategicObjective { get; set; } //DimByMax Pim  PimCapex  CimCapex  DimCapex  MaxCapexApp  CapexAppByMax  Strategy  StrategyByMax
        public string Strategy { get; set; } //DimByMax PimTrackByMax  PimCapex  CimCapex  DimCapex  MaxCapexApp  CapexAppByMax  Strategy  StrategyByMax
        public string ValueChain { get; set; } //DimByMax   DimCapex
        public string ProjectCategory { get; set; } //DimByMax  DimCapex
        public string InitiativeTypeMax { get; set; } //DimByMax  DimCapex  MaxCapexApp  CapexAppByMax
        public string Worksream { get; set; } //DimByMax PimTrackByMax  DimCapex  MaxCapexApp  CapexAppByMax  StrategyByMax  OtherTrackByMax
        public string SubWorkstream { get; set; } //DimByMax PimTrackByMax  DimCapex  MaxCapexApp  CapexAppByMax  StrategyByMax  OtherTrackByMax
        public string InititativeType { get; set; }  //PimTrackByMax  StrategyByMax
        public string ProjectPriority { get; set; }  //PimTrackByMax  PimCapex
        public string ProjectControl { get; set; }  //PimTrackByMax  PimCapex
        public string EntryMode { get; set; }  //CimCapex  Strategy
        public string Geography { get; set; }  //CimCapex  Strategy
        public string Entity { get; set; }  //CimCapex  Strategy
        public string PercentShare { get; set; }  //CimCapex
        public string BusinessModel { get; set; }  //CimCapex

        public string SourceOfImprovement { get; set; }  //CPI
        public string TypeOfCpi { get; set; }   //CPI
        public string TypeOfPerformance { get; set; }   //CPI
        public string Background { get; set; }   //CPI
        public string Objective { get; set; }   //CPI

        //Date
        public string ExpectedDimApproval { get; set; } //DimByMax
        public string StrartImplementDate { get; set; } //DimByMax
        public string GoLiveDate { get; set; } //DimByMax //CimCapex  DimCapex  Strategy
        public DateTime? IL3Date { get; set; } //DimByMax PimTrackByMax  MaxCapexApp  CapexAppByMax  StrategyByMax  OtherTrackByMax
        public DateTime? IL4Date { get; set; } //DimByMax PimTrackByMax  MaxCapexApp  CapexAppByMax  StrategyByMax  OtherTrackByMax
        public DateTime? IL5Date { get; set; } //DimByMax PimTrackByMax  MaxCapexApp  CapexAppByMax  StrategyByMax  OtherTrackByMax
        public string ExpectedDimAppproval { get; set; }  //DimCapex
        public string StartImplementDate { get; set; }  //DimCapex


        public DateTime? Bod1 { get; set; }  //CimCapex
        public DateTime? Bod2 { get; set; }  //CimCapex

        public DateTime? VacGate1DatePlan { get; set; }  //PimTrackByMax  PimCapex
        public DateTime? VacGate2DatePlan { get; set; }  //PimTrackByMax  PimCapex
        public DateTime? VacGate3DatePlan { get; set; }  //PimTrackByMax  PimCapex
        public DateTime? VacGate4DatePlan { get; set; }  //PimTrackByMax  PimCapex


        //Key Performance Indicator
        //KPI Table
        public string AnalysisTool { get; set; }  //CPI
        public string RootCause { get; set; }  //CPI
        public string ActualCapexThb { get; set; }  //CPI
        public string ActualOpexThb { get; set; }  //CPI
        public string ActualBenefitThb { get; set; }  //CPI



        //Team support
        public string DexName { get; set; } //DimByMax  DimCapex
        public string DexSupportLevel { get; set; } //DimByMax  DimCapex
        public string ItFocalPointName { get; set; } //DimByMax  DimCapex
        public string WorkingTeam { get; set; } //DimByMax  DimCapex

        public string ProjectDirector { get; set; }  //PimTrackByMax  PimCapex   CimCapex
        public string ProjectManager { get; set; }  //PimTrackByMax  PimCapex   CimCapex
        public string ProjectEngineer { get; set; }  //PimTrackByMax  PimCapex   CimCapex
        public string ProcessEngineer { get; set; }  //PimTrackByMax  PimCapex   CimCapex
        public string DivMgrOfProcessEngineer { get; set; }  //Pim  PimCapex   CimCapex
        public string Smes { get; set; }  //PimTrackByMax  PimCapex


        //Approved detail
        public string SponsorEvp { get; set; } //DimByMax  PimTrackByMax  PimCapex   DimCapex  MaxCapexApp  CapexAppByMax  StrategyByMax  OtherTrackByMax
        public string ToFinance { get; set; } //DimByMax  PimTrackByMax  MaxCapexApp  CapexAppByMax  StrategyByMax  OtherTrackByMax
        public string Cfo { get; set; } //DimByMax  PimTrackByMax  MaxCapexApp  CapexAppByMax  StrategyByMax  OtherTrackByMax
        public string WorkstreamLeadVp { get; set; } //DimByMax  PimTrackByMax   DimCapex  MaxCapexApp  CapexAppByMax  StrategyByMax  OtherTrackByMax
        public string Cto { get; set; } //DimByMax  PimTrackByMax  MaxCapexApp  CapexAppByMax  StrategyByMax  OtherTrackByMax
        public string LeaderVp_______55 { get; set; }  //CimCapex   Strategy มันซ้ำกับที่อยู่ใน Interface

        //interface
        public string ProjectDocumentDatabase { get; set; } //DimByMax   PimTrackByMax  PimCapex  DimCapex
        public string EmocNo { get; set; } //DimByMax  PimTrackByMax  PimCapex  DimCapex
        //public string LeaderVp { get; set; }  //CimCapex  Strategy
        //---------------------------------------------------------------------------------------------

        //Product Table    CimCapex

        //---------------------------------------------------------------------------------------------

        //The Collape 5     DimCapex/CimCapex/PimCapex/PimTrackByMax/DimByMax/MaxCapexApp/CapexAppByMax/CapexApp
        //Invesment Framework
        public string ProductionProcess { get; set; }
        public string ComparisonWithOther { get; set; }
        public string OtherInvestment { get; set; }

        //Strategic Analysis
        public string KeySuccessFactor { get; set; }
        public string SynergyBenefit { get; set; }
        public string OtherStrategic { get; set; }

        //Business Analysis
        public string MarketOverview { get; set; }
        public string PotentialCustomer { get; set; }
        public string SalesPlan { get; set; }
        public string SourceOfFeedstock { get; set; }
        public string OtherBusiness { get; set; }

        //Quality Index
        public string SafetyIndex { get; set; }
        public string CorporateImageIndex { get; set; }
        public string OtherQuality { get; set; }

        //Return Of Investment
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

        public string UsefulLife { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? DepreciationCost { get; set; }

        //ตาราง KpisCapex
        public string KpisRemark { get; set; }

        //---------------------------------------------------------------------------------------------
        //DIM Committee  (-- DIM only (DimCapexApp) --)  
        public string PresentationLink { get; set; }
        public string ExpertReviewLink { get; set; }
        public string ItEaLink { get; set; }
        public string OpexMb { get; set; }
        public string MinuteOfMeetingMom { get; set; }

        //Implement (-- DIM only (DimCapexApp) --)
        public string BaselineStartDate { get; set; }
        public string BaselineFinishDate { get; set; }
        public string ReviseStartDate { get; set; }
        public string ReviseFinishDate { get; set; }
        public string ActualStartDate { get; set; }
        public string ActualFinishDate { get; set; }
        public string ProjectSteeringCommittee { get; set; }

        //Closure  (-- DIM only (DimCapexApp) --)
        public string ProjectClosureCheckList { get; set; }
        public string DeliverableCheckList { get; set; }
        //---------------------------------------------------------------------------------------------


        //PIM CapexApp
        //Gate1
        //public string xxxxx { get; set; }
        public string VacGate1Status { get; set; }
        public string CostEst50PercentThb { get; set; }
        public string RequestOpexBudgetThb { get; set; }
        public string EndorsedGate1Date { get; set; }
        public string Gate1Status { get; set; }
        public string PresentationGate1Link { get; set; }
        public string IerGate1Link { get; set; }
        public string SubPicMomLink { get; set; }
        public string NoteForGate1 { get; set; }

        //Gate2
        public string VacGate2Status { get; set; }
        public string CostEst30PercentThb { get; set; }
        public string Gate2ReceivedOpexBudgetThb { get; set; }
        public string AdditionalOpexBudgetThb { get; set; }
        public string TieInLongLeadItemsBudgetThb { get; set; }
        public string PresentGate2Date { get; set; }
        public string Gate2Status { get; set; }
        public string PresentationGate2Link { get; set; }
        public string IerGate2Line { get; set; }
        public string Gate2PicMomLink { get; set; }
        public string NoteForGate2 { get; set; }

        //Gate3
        public string VacGate3Status { get; set; }
        public string Gate3CostEst10PercentThb { get; set; }
        public string Gate3ReceivedOpexBudgetThb { get; set; }
        public string Gate3ReceivedCapexBudgetThb { get; set; }
        public string Gate3RequestedCapexBudgetThb { get; set; }
        public string PresentationGate3Date { get; set; }
        public string Gate3Status { get; set; }
        public string PresentationGate3Link { get; set; }
        public string IerGate3Link { get; set; }
        public string ProjectCharterLink { get; set; }
        public string Gate3PicMomLink { get; set; }
        public string NoteForGate3 { get; set; }

        //Revise
        public string VacReviseBudgetStatus { get; set; }
        public string CostEst10PercentThb { get; set; }
        public string ReviseReceivedOpexBudgetThb { get; set; }
        public string ReviseReceivedCapexBudgetThb { get; set; }
        public string AdditionalCapexBudgetThb { get; set; }
        public string EndorseReviseBugateDate { get; set; }
        public string ReviseBudgetStatus { get; set; }
        public string PresentationReviseLink { get; set; }
        public string IerReviseBudgetLink { get; set; }
        public string RevisePicSubPicMomLink { get; set; }
        public string NoteForRevise { get; set; }

        //Gate4
        public string VacGate4Status { get; set; }
        public string VacDeliverablesGate4Status { get; set; }
        public string PicGate4Date { get; set; }
        public string PIcGate4Status { get; set; }
        public string PresentationGate4Link { get; set; }
        public string PicMomLink { get; set; }
        public string NoteForGate4 { get; set; }

        //Cancelled
        public string VacCancelStatus { get; set; }
        public string CancelReceivedOpexBudgetThb { get; set; }
        public string CancelReceivedCapexBudgetThb { get; set; }
        public string ActualSpendingThb { get; set; }
        public string PicSubPicCancelDate { get; set; }
        public string PicSubPicCancelStatus { get; set; }
        public string PresentationCancelLink { get; set; }
        public string CancelPicSubPicMomLink { get; set; }
        public string NoteForCancel { get; set; }
    }
}
