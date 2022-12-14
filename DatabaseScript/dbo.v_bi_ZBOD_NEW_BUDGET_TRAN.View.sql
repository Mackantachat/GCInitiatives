/****** Object:  View [dbo].[v_bi_ZBOD_NEW_BUDGET_TRAN]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_ZBOD_NEW_BUDGET_TRAN]
AS
SELECT PH.AppropriationNo, I.InitiativeCode, '20' AS ValueType, CPI.BudgetPeriod, MIP.Period, MIP.Amount, 'THB' AS Currency, 
	MIP.YearOfMonth, '10' AS CurrencyType, MIP.InvestmentCost AS Unit, PLAN_TYPE, I.Status, I.Stage, CPI.BudgetYear,
	 I.Id, CPI.CapexInformationId, CPI.Revistion, CPIRev0.BudgetYear AS Revision0_Year
  FROM [dbo].v_Initiatives AS I 
  LEFT OUTER JOIN [dbo].ProgressHeader AS PH ON I.Id = PH.InitiativeId
  LEFT OUTER JOIN [dbo].CapexInformations AS CPI ON I.Id = CPI.InitiativeId
  LEFT OUTER JOIN (
  	SELECT InitiativeId,MonthlyInvestmentPlanId, AnnualInvestmentPlanId, YearOfMonth,  Month_Name AS Period, Amount, 'MONTHLY' AS [PLAN_TYPE], InvestmentCost, CapexInformationId
	FROM dbo.MonthlyInvestmentPlans AS MIP
	UNPIVOT( Amount FOR Month_Name IN (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec )) AS pvt
  ) AS MIP ON CPI.CapexInformationId = MIP.CapexInformationId
  LEFT OUTER JOIN CapexInformations AS CPIRev0 ON I.Id = CPIRev0.InitiativeId 
  AND CPIRev0.Revistion = 0
UNION
 SELECT PH.AppropriationNo, I.InitiativeCode, '20' AS ValueType, CPI.BudgetPeriod, AIP.Period, AIP.Amount, 'THB' AS Currency, 
 CPI.BudgetYear AS YearOfMonth, '10' AS CurrencyType, 'Million Baht'  AS Unit, PLAN_TYPE, I.Status, I.Stage, CPI.BudgetYear, 
 I.Id, CPI.CapexInformationId, CPI.Revistion, CPIRev0.BudgetYear AS Revision0_Year
  FROM [dbo].v_Initiatives AS I 
  LEFT OUTER JOIN [dbo].ProgressHeader AS PH ON I.Id = PH.InitiativeId
  LEFT OUTER JOIN [dbo].CapexInformations AS CPI ON I.Id = CPI.InitiativeId
  LEFT OUTER JOIN (
  	SELECT InitiativeId, AnnualInvestmentPlanId, Year_Number AS Period, Amount, 'YEARLY' AS [PLAN_TYPE], PlanType, CapexInformationId
	FROM dbo.[AnnualInvestmentPlans] AS AIP
	UNPIVOT( Amount FOR Year_Number IN (Year1, Year2, Year3, Year4, Year5, Year6, Year7, Year8, Year9, Year10 )
) AS pvt
  ) AS AIP ON CPI.CapexInformationId = AIP.CapexInformationId
    LEFT OUTER JOIN CapexInformations AS CPIRev0 ON I.Id = CPIRev0.InitiativeId AND CPIRev0.Revistion = 0
  WHERE AIP.PlanType = 'TotalBahtbyRevision'

UNION
 SELECT PH.AppropriationNo, I.InitiativeCode, '50' AS ValueType, CPI.BudgetPeriod, 'TotalBudget' AS [Period], CPI.ProjectCost, 'THB' AS Currency, 
 CPI.BudgetYear AS YearOfMonth, '10' AS CurrencyType, 'Million Baht' AS Unit, 'TOTAL_BUDGET' AS PLAN_TYPE, I.Status, I.Stage, CPI.BudgetYear, 
 I.Id, CPI.CapexInformationId, CPI.Revistion, CPIRev0.BudgetYear AS Revision0_Year
  FROM [dbo].v_Initiatives AS I 
  LEFT OUTER JOIN [dbo].ProgressHeader AS PH ON I.Id = PH.InitiativeId
  LEFT OUTER JOIN [dbo].CapexInformations AS CPI ON I.Id = CPI.InitiativeId
    LEFT OUTER JOIN CapexInformations AS CPIRev0 ON I.Id = CPIRev0.InitiativeId AND CPIRev0.Revistion = 0
GO
