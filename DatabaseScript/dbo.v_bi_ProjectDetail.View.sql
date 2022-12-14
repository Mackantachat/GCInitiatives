/****** Object:  View [dbo].[v_bi_ProjectDetail]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_ProjectDetail]
AS
SELECT        i.Id AS ProjectID, i.StartingDate, i.FinishingDate AS EndDate, i.Location, di.UsefulMonth, di.UsefulYear, di.Remark, di.BaseCase, di.ProjectIrrBaseCase AS IRRBase, di.NpvBaseCase AS NPVBase, 
                         di.PaybackBaseCase AS PayBackBase, di.OptimisticCase, di.ProjectIrrOptimisticCase AS IRROptimistic, di.NpvOptimisticCase AS NPVOptimistic, di.PaybackOptimisticCase AS PayBackOptimistic, di.PessimisticCase, 
                         di.ProjectIrrPessimisticCase AS IRRPessimistic, di.NpvPessimisticCase AS NPVPessmistic, di.PaybackPessimisticCase AS PayBackPessmistic, mip.Jan AS Investment1, mip.Feb AS Investment2, mip.Mar AS Investment3, 
                         mip.Apr AS Investment4, mip.May AS Investment5, mip.Jun AS Investment6, mip.Jul AS Investment7, mip.Aug AS Investment8, mip.Sep AS Investment9, mip.Oct AS Investment10, mip.Nov AS Investment11, 
                         mip.Dec AS Investment12, NULL AS JointVenture, NULL AS DERatio, i.ResultObjective AS Objective, i.Background AS PrincipleAndBackground, i.ScopeOfWork, i.SpecifyLocation AS ProjectLocation, NULL AS Procress, 
                         di.MilestoneSchedule AS MilestoneAndSchedule, di.ExpectedTarget AS TargetAndResult, di.Comparison, di.otherResources, NULL AS Others_51, NULL AS ConsistentWithStrategy, NULL AS BusinessStrategy, di.Consistent, 
                         di.KeySuccessFactor, NULL AS OperationImpact, NULL AS ConflictOfInterest, NULL AS Synergy, r2.MitigationProgress, NULL AS Other_52, NULL AS BusinessModel, di.MarketOverview, di.PotentialCustomer, di.SalesPlan, 
                         di.SourceOfFeedback, NULL AS Other_53, di.SafetyIndex, di.CorporateImageIndex AS CorporateImage, NULL AS ProductQuality, NULL AS OthersIndex, NULL AS Other_5, NULL AS Other_54, NULL AS NoteKPI, NULL 
                         AS Ex_Objective, NULL AS Ex_Reasons, NULL AS Ex_ROI, i.StartingDate AS RequestProjectNoDate, NULL AS ControlledCurrencyID, NULL AS ControlledExchangeRate, di.EbitdaBaseCase AS EBITDABase, 
                         di.EbitdaOptimisticCase AS EBITDAOptimistic, di.EbitdaPessimisticCase AS EBITDAPessmistic, ci.CodeCostCenterOfVP, di.InitiativeYear, di.StrategicObjective, di.Strategy, di.InitiativeTypeMax, di.Workstream, di.IL3Date, 
                         di.IL4Date, di.IL5Date, di.ProductionProcess, di.ComparisonWithOther, di.OtherInvestment, di.SynergyBenefit, di.OtherStrategic, di.OtherBusiness, di.OtherQuality, di.DepreciationCost, di.ProCategory, di.ProLever, 
                         di.ProSubCategory, di.SubWorkstream1, di.SubWorkstream2, di.Baseline, di.BaselineHistorical, di.BaselineNonHistorical, di.Saving, di.SavingHistorical, di.SavingNonHistorical, di.Boi, di.BoiNo, di.Capital, di.Catalyst, 
                         di.Coordinate, di.CutFeedDate, di.EquipmentName, di.EquipmentOrAsset, di.ForEnvironment, di.ForTurnaround, di.Manager, di.OldAssetCondition, di.OldAssetNo, di.Parties, di.President, di.ProjectManager, di.ReplaceEquipment, 
                         di.ReplacementDate, di.RightOfUse, di.Software, di.StartUpDate, di.CycleMonth, di.CycleYear, di.HaveAdditional, di.OtherKpis, di.InitiativeCode, di.ActualFinishDate, di.ActualStartDate, di.BaselineFinishDate, 
                         di.BaselineStartDate, di.CostDetail, di.IsDeliverAsPerCommittedCost, di.IsDeliverAsPerCommittedDate, di.IsDeliverAsPerCommittedScope, di.ProjectCategory, di.ReviseForecastFinishDate, di.ReviseForecastStartDate, 
                         di.UserFeedback, di.ValueChain, di.BOD1, di.BOD2, di.EntryMode, di.EntryModeSpecify, di.FX, di.FirstBudgetYear, di.Geography, di.GeographySpecify, di.ListOfEquipment, di.MgrOfProcessEngineer, di.Note, di.OthersStrategic, 
                         di.ProcessEngineer, di.ProgressUpdate, di.ProjectDirector, di.ProjectDmManager, di.ProjectEngineer, di.RequireBOD1, di.RequireProject, di.StatusProgress, ci.ProjecctComRun, ci.RequestIniNoDate, ci.ProjectExePeriodYear, 
                         ci.ProjectExePeriodMonth, ci.CostCenterOfVP, ci.ReasonOfChanging, ci.BetweenYear, ci.TransferForm, ci.PoolBudgetForm, ci.BudgetPeriod, ci.AdditionalCost, ci.CapexStatus, ci.CapexType, ci.Revistion, ci.Sequent, 
                         ci.SpendingActual, ci.ExistingBudget, ci.BudgetYear, ci.ReturnCost, ci.CarriedCost, ci.AvailableBudget, ci.PoolId
FROM            dbo.v_Initiatives AS i LEFT OUTER JOIN
                         dbo.DetailInformations AS di ON di.InitiativeId = i.Id LEFT OUTER JOIN
                         dbo.MonthlyInvestmentPlans AS mip ON mip.InitiativeId = i.Id LEFT OUTER JOIN
                         dbo.CapexInformations AS ci ON ci.InitiativeId = i.Id LEFT OUTER JOIN
                         dbo.Risk AS r2 ON r2.InitiativeId = i.Id
GO
