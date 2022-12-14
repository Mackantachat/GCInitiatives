/****** Object:  View [dbo].[v_CAPEX_Report_ProjectDetail_FlexyColumn_backup]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO












CREATE view [dbo].[v_CAPEX_Report_ProjectDetail_FlexyColumn_backup]
AS

SELECT
    cap.Revistion AS [Revision No]
    ,cap.BudgetYear AS [Year]
    ,cap.BudgetPeriod + CASE WHEN ISNULL(cap.BetweenYear, '') <> '' THEN '(' + cap.BetweenYear + ')' ELSE '' END + CASE WHEN ISNULL(cap.PoolBudgetForm, '') <> '' THEN '(' + cap.PoolBudgetForm + ')' ELSE '' END AS [Budget Form]
    ,ini.InitiativeCode AS [Initiative No]
    ,ini.InitiativeType AS [Process]
    ,ini.Stage AS [Status]
    ,NULL AS [WBS]
    ,NULL AS [Appropriation No.]
    ,ini.Name AS [Project Name]
    ,NULL AS [Investment Type]  -- ยังไม่มี field MAP
    ,ini.TypeOfInvestment AS [Type of Investment]
    ,CASE WHEN ini.Company = 'PTTGC' OR ini.Company = 'PTT Global Chemical Public Company Limited' THEN 'GC Only' ELSE 'Subsidiary' END AS [Company Type]
    ,ISNULL(comp.CompanyShorttxt, ini.Company) AS [Company Name]
    ,ini.Organization AS [EVP]
    ,ini.Plant AS [VP]
    ,Isnull(det.projectirrbasecase, 0) AS [Project IRR(%)]
    ,Cast(Isnull(det.npvbasecase, 0)  AS DECIMAL(20, 2)) AS [NPV]
    ,Cast(Isnull(det.paybackbasecase, 0) AS VARCHAR(50)) + ' Year(s)' AS [Payback]
    ,Isnull(det.ebitdabasecase, 0) AS [EBITDA Uplift]
    ,ini.ResultObjective AS [Objective]
    ,NULL AS [Principle]
    ,ini.ScopeOfWork AS [Scope Of Work]
    ,det.BaseCase AS [Base Case]
    ,ini.Location AS [Location]
    ,ini.ResultObjective AS [Target and Result]
    ,COALESCE(CAST( CONVERT(DECIMAL(10,0), ISNULL( det.UsefulYear, 0) + (ISNULL(det.UsefulMonth, 0) / 12)) AS VARCHAR(MAX)), '') + ' Year(s) ' + COALESCE(CAST( CONVERT(DECIMAL(10,0), (ISNULL(det.UsefulMonth, 0) % 12) ) AS VARCHAR(MAX)), '') + ' Month(s)' AS [Useful life]
    ,ownVP.MainPositionCostCenter AS [Cost Center]
    ,cap.CapexInformationId AS [CapexInformationId]
    ,ini.Id AS [InitiativeId]
FROM v_Initiatives ini
INNER JOIN CapexInformations cap ON cap.InitiativeId = ini.Id AND cap.Revistion = (SELECT MAX(Revistion) FROM CapexInformations WHERE InitiativeId = ini.Id) AND cap.Sequent = (SELECT MAX(Sequent) FROM CapexInformations WHERE InitiativeId = ini.Id) 
INNER JOIN DetailInformations det ON det.InitiativeId = ini.Id
LEFT JOIN v_Companies comp ON comp.CompanyName = ini.Company
LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName
LEFT JOIN Owners ownVP ON CAST(own.DivManagerEmpID AS NVARCHAR(100)) = ownVP.EmployeeID

GO
