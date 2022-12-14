/****** Object:  View [dbo].[V_SendingEmail_V1]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[V_SendingEmail_V1]
AS
SELECT        TOP (10) Id, InitiativeCode, Name, Year, OwnerName, Plant, Location, SpecifyLocation, RegisteringDate, FinishingDate, ScopeOfWork, ResultObjective, Remark, InitiativeType, RequestCapex, CostEstCapex, CostEstCapexType, 
                         TypeOfInvestment, BudgetType, Ram, JFactor, TypeBenefit, BenefitAmount, BenefitAmountType, PayBackPeriod, Irr, FxExchange, Cim, Pim, Dim, Max, DirectCapex, Cpi, Strategy, RandD, Other, ApprovedDate, CreatedDate, 
                         CreatedBy, UpdatedDate, UpdatedBy, LastActivity, DeletedFlag, Status, StartingDate, Wacc, Stage, Background, BudgetSource, Company, CostEstOpex, Integration, InvolveItDigital, Organization, RequestOpex, 
                         RequestProjectEngineer, SpecifyCompany, SpecifyPlant, TrackMax, CostEstOpexType, CommentCancelled, LastSubmittedDate, LagacyInitiativeCode, LagacyInitiativeId, Divestment, GoToStage, SecretProject, PoolType, 
                         ITDigital, CapexStage, CapexStatus, IsRequestCapex, SSPIM, DMPlantOwner, VPPlantOwner, LookbackOwner, SortStage, InitiativeSubType, isSetInitiativeSubType, AlignWithCorpStrategy, StrategicObjective, StrategicYear, 
                         StrategyType, HistoryFlag, IsPassPimGate1, CreateType, IsCreatedApp, IsCreatedWbs, BestPracticeTabStatus, CapexTabStatus, GeneralTabStatus, ImpactTabStatus, LessonLearnTabStatus, LookbackTabStatus, 
                         ProgressTabStatus, ResourceTabStatus, RiskTabStatus, StatusTabStatus, StrategyTabStatus, CatalystChemicalsCost, LabourCost, MaintenanceCost, ResidualValue, UtilitiesCost, UseIrrCalculate, AnnualLikelihood, 
                         AnnualLikelihoodRatio, BaseRisk, Consequence, EconomicBenefits, EconomicPenalties, Effectiveness, EffectivenessRatio, ExposureFactor, ExposureFactorRatio, JustifiableCost, Likelihood, OpexPenaltiesCost, 
                         PotentialConCost, Probability, ProductionLoss, RiskOfAlt, RiskReduction, DetailCimStrategyTabStatus, DetailCpiTabStatus, DetailMaxDimCapexTabStatus, DetailPimTabStatus, IsNextButtonClicked, IsReviseFlow, 
                         AppropriationNo, WBSNo
FROM            dbo.v_Initiatives
GO
