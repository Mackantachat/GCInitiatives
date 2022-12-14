/****** Object:  View [dbo].[v_CAPEX_Report_ProjectDetail_FlexyColumn]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE view [dbo].[v_CAPEX_Report_ProjectDetail_FlexyColumn] 
AS

WITH tbl AS
(
SELECT cap.Revistion AS [Revision No],

--cap.BudgetYear AS Year,
CASE WHEN ISNULL(cap.BudgetYear,'') = '' THEN (select top 1 BudgetYear from CapexInformations where InitiativeId = CAP.InitiativeId AND ISNULL(BudgetYear,'')<>'' Order by CapexInformationId) ELSE cap.BudgetYear END AS Year,

cap.BudgetPeriod + CASE WHEN ISNULL(cap.BetweenYear, '') <> '' THEN '(' + cap.BetweenYear + ')' ELSE '' END + CASE WHEN ISNULL(cap.PoolBudgetForm, '') 
             <> '' THEN '(' + cap.PoolBudgetForm + ')' ELSE '' END AS [Budget Form],
             ini.InitiativeCode AS [Initiative No], ini.InitiativeType AS Process,
             ini.Stage,
             ini.Status,
             mapping.WbsNo AS WBS,
             mapping.AppropriationNo AS [Appropriation No.],
             ini.Name AS [Project Name],
             ISNULL(ini.TypeOfInvestment,ISNULL(ini.PoolType + ' Pool','')) AS [Type of Investment],
             CASE WHEN ini.Company = 'PTTGC' OR
             ini.Company = 'PTT Global Chemical Public Company Limited' THEN 'GC Only' ELSE 'Subsidiary' END AS [Company Type],
             ISNULL(comp.CompanyShortTxt, ini.Company) AS [Company Name]
			 --, ini.Organization AS EVP, ini.Plant AS VP,
			 , ini.Organization AS Organization
             , ini.Plant AS Plant, /*Editted 14092020*/
             ISNULL(det.ProjectIrrBaseCase, 0) 
             AS [Project IRR(%)],
             CAST(ISNULL(det.NpvBaseCase, 0) AS DECIMAL(20, 2)) AS NPV,
             CAST(ISNULL(det.PaybackBaseCase, 0) AS VARCHAR(50)) + ' Year(s)' AS Payback,
             ISNULL(det.EbitdaBaseCase, 0) AS [EBITDA Uplift],
             ini.ResultObjective AS Objective,
             NULL AS Principle, 
             ini.ScopeOfWork AS [Scope Of Work],
             det.BaseCase AS [Base Case], 
             ini.Location, ini.ResultObjective AS [Target and Result], 
             COALESCE (CAST(CONVERT(DECIMAL(10, 0), ISNULL(det.UsefulYear, 0) + ISNULL(det.UsefulMonth, 0) / 12) AS VARCHAR(MAX)), N'') 
             + ' Year(s) ' + COALESCE (CAST(CONVERT(DECIMAL(10, 0), ISNULL(det.UsefulMonth, 0) % 12) AS VARCHAR(MAX)), N'') + ' Month(s)' AS [Useful life],
             cap.CodeCostCenterOfVP AS [Cost Center],
             cap.CapexInformationId
             , ini.Id AS InitiativeId
			 --,ini.OwnerName as OwnerName
			 ,ProjectCost
			,ROW_NUMBER() OVER (PARTITION BY ini.InitiativeCode Order BY ini.InitiativeCode) AS rowno,
            ownCostCenter.Indicator AS VP
			,cap.existingBudget-cap.spendingActual as BudgetAvailable
			,CAP.ExistingBudget,CAP.SpendingActual
FROM   dbo.v_Initiatives AS ini 

INNER JOIN (SELECT MAX(Revistion) as Revistion ,InitiativeId,MAx(CapexInformationId) as MaxCapId
           FROM CapexInformations
           GROUP BY InitiativeId) AS MaxCap ON MaxCap.InitiativeId = ini.Id

INNER JOIN dbo.CapexInformations AS cap ON cap.CapexInformationId = MaxCap.MaxCapId
--INNER JOIN dbo.CapexInformations AS cap ON cap.InitiativeId = ini.Id 

LEFT JOIN dbo.DetailInformations AS det ON det.InitiativeId = ini.Id 
LEFT OUTER JOIN dbo.v_Companies AS comp ON comp.CompanyName = ini.Company 
LEFT OUTER JOIN dbo.Owners AS own ON own.OwnerName = ini.OwnerName 
LEFT OUTER JOIN dbo.Owners AS ownVP ON CAST(own.DepManagerEmpID AS NVARCHAR(100)) = ownVP.EmployeeID
LEFT JOIN v_MappingIniAppWbs mapping ON mapping.InitiativeCode = ini.InitiativeCode
LEFT JOIN Owners ownCostCenter ON ownCostCenter.OwnerName = cap.CostCenterOfVP

--WHERE (ini.Status NOT IN ('draft', 'reject', 'cancelled')) AND (ini.Status IS NOT NULL)
)

SELECT *
FROM tbl
--WHERE rowno=1


--2020-003427
--2020-003428
--2020-003755
--2020-003910
GO
