/****** Object:  View [dbo].[v_bi_Project]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







CREATE VIEW [dbo].[v_bi_Project]
AS

SELECT        i.Id AS ProjectID, 
 i.Name AS ProjectName, 
 i.InitiativeCode AS ProjectNo, 
 ProgressHeader.WbsNo AS SAPProjectNo, 
 o.EmployeeID AS ProjectOwner, 
 ci.Revistion AS RevisionNo, 
 cp.Attribute01 AS Company,  
 o.DepOrgID AS DepartmentID, 
 ci.CodeCostCenterOfVP AS VPCostCenter, 

 --CASE WHEN ci.PoolBudgetForm   = 'Digital CAPEX' THEN 23 
 --     WHEN ci.PoolBudgetForm   = 'ER' THEN 32
	--  ELSE toi.Id END  AS ProjectTypeID,  


 CASE WHEN i.PoolType   = 'Digital CAPEX' THEN 23 
      WHEN i.PoolType   = 'ER' THEN 32
	  WHEN i.PoolType	= 'IT CAPEX' THEN 22
	  WHEN i.PoolType	= 'MTPi' THEN 12
	  WHEN i.PoolType	= 'MAX' THEN 12
	  WHEN i.PoolType	= 'PIM' THEN 12
	  ELSE toi.Id END  AS ProjectTypeID,  



 NULL AS ProjectTypeFillIn, 
 NULL AS BatchStatus, 
 i.Year AS StartYear, 
 i.StartingDate AS RequestDate, 
 NULL AS VCID, 
 NULL    AS PMVPStatus, 
 NULL AS PMVPApproveDate, 
 0 AS CompleteStatus, 
 o2.EmployeeID AS CreatedByID, 
 i.Status AS WorkflowStatus, 
 NULL AS IsDraft, 
 NULL AS IsIDM, 
 NULL AS IsIT, 
 ci.ProjectCost, 
 NULL AS DestinationUser, 
ci.BudgetPeriod AS BudgetType, 
 NULL AS IsInform, 
 NULL AS IsAuthorization, 
 NULL AS IsCallWorkflow, 
 NULL AS VCThaiName, 
 NULL AS VCEngName, 
 NULL AS IsOverride, 
 CASE WHEN i.ApprovedDate IS NOT NULL  THEN 1 ELSE 0 END AS IsApprove, 
 i.FinishingDate, 
 ci.BetweenYear AS BudgetBetweenYearType, 
 NULL AS ProjectCoordinator, 
 i.Plant, 
 i.Location, 
 i.SpecifyLocation, 
 i.RegisteringDate, 
 i.CostEstCapex, 
 i.CostEstCapexType,  
 i.Ram, 
 i.JFactor, 
 i.TypeBenefit, 
 i.BenefitAmount, 
 i.BenefitAmountType, 
 i.PayBackPeriod, 
 i.Irr, 
 i.FxExchange, 
 i.Cim, 
 i.Pim, 
 i.Dim, 
 i.Max, 
 i.DirectCapex, 
 i.Cpi, 
 i.Strategy, 
 i.RandD, 
 i.Other, 
 i.ApprovedDate, 
 i.CreatedDate, 
 i.CreatedBy, 
  i.UpdatedDate, 
 i.UpdatedBy, 
 i.LastActivity, 
 i.DeletedFlag, 
 i.Status, 
 i.StartingDate, 
 i.Wacc, 
 i.Stage, 
 i.Background, 
 i.BudgetSource, 
 i.CostEstOpex, 
 i.Integration, 
 i.InvolveItDigital, 
 i.Organization, 
 i.RequestOpex,  
 i.RequestProjectEngineer, 
 i.SpecifyCompany, 
 i.SpecifyPlant, 
 i.TrackMax, 
 i.CostEstOpexType, 
 i.CommentCancelled, 
 i.LastSubmittedDate, 
 i.LagacyInitiativeCode, 
 i.LagacyInitiativeId, 
 i.Divestment, 
 i.GoToStage, 
 i.SecretProject,  i.PoolType, 
 i.CapexStage, 
 i.CapexStatus, 
 i.IsRequestCapex, 
 i.SortStage, 
 i.PoolType AS IsMax, 
 i.Integration AS IsMTPi 


FROM					 dbo.v_Initiatives AS i LEFT OUTER JOIN
                         dbo.CapexInformations AS ci ON ci.InitiativeId = i.Id LEFT OUTER JOIN
                         dbo.Owners AS o ON o.OwnerName = i.OwnerName LEFT OUTER JOIN
                         dbo.TypeOfInvestments AS toi ON toi.TypeOfInvestmentId = i.TypeOfInvestment LEFT OUTER JOIN
                         dbo.Owners AS o2 ON o2.OwnerName = i.CreatedBy LEFT OUTER JOIN
                         dbo.ProgressHeader ON ProgressHeader.InitiativeId = i.Id LEFT OUTER JOIN
                         dbo.CommonData AS cp ON cp.Attribute03 = i.Company
 
GO
