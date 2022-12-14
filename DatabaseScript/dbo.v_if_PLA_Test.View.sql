/****** Object:  View [dbo].[v_if_PLA_Test]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


































CREATE view [dbo].[v_if_PLA_Test]
AS
SELECT 0 AS [LineNo], NULL AS [InitiativesID], NULL AS [InitiativeCode], NULL AS [InitiativeName], 'POSID' AS [WBS Element], 'VERSN' AS [Plan Version], 'KSTAR' AS [Cost element], 'GJAHR' AS [Year], 'WTG001' AS [Period1], 'WTG002' AS [Period2], 'WTG003' AS [Period3], 
             'WTG004' AS [Period4], 'WTG005' AS [Period5], 'WTG006' AS [Period6], 'WTG007' AS [Period7], 'WTG008' AS [Period8], 'WTG009' AS [Period9], 'WTG010' AS [Period10], 'WTG011' AS [Period11], 'WTG012' AS [Period12]
UNION
SELECT 1 AS [LineNo], NULL AS [InitiativesID], NULL AS [InitiativeCode], NULL AS [InitiativeName], 'WBS Element' AS [WBS Element], 'Plan Version' AS [Plan Version], 'Cost element' AS [Cost element], 'Year' AS [Year], 'Period1' AS [Period1], 'Period2' AS [Period2], 'Period3' AS [Period3], 
             'Period4' AS [Period4], 'Period5' AS [Period5], 'Period6' AS [Period6], 'Period7' AS [Period7], 'Period8' AS [Period8], 'Period9' AS [Period9], 'Period10' AS [Period10], 'Period11' AS [Period11], 'Period12' AS [Period12]
UNION
SELECT PlanVersion.[LineNo] AS [LineNo],

Initiatives.ID AS [InitiativesID],

Initiatives.InitiativeCode AS [InitiativeCode],

Initiatives.[Name] AS [InitiativeName],

CASE WHEN ProgressHeader.WbsNo IS NULL OR
             ProgressHeader.WbsNo = '' OR
             ProgressHeader.WbsNo = '0' THEN 
             
             CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(LEFT(ProgressHeader.StandardProjectDef,2), ''))
            WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(LEFT(ProgressHeader.StandardProjectDef,2), ''))
            ELSE
                LEFT(ProgressHeader.StandardProjectDef,2)
            END
             
             + '-' + LEFT(dbo.[fn_MAP_SAP_Plant](Initiatives.Plant), 4) + '-' + RIGHT(CONVERT(nvarchar(200), DATEPART(yy, CapexInformations.ActionYear)), 2) 
             + 'XXX' ELSE
             
             CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(ProgressHeader.WbsNo, ''))
            WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(ProgressHeader.WbsNo, ''))
            ELSE
                ProgressHeader.WbsNo
            END
             
             --+ [dbo].[GetWBSElementSuffix](ProgressPlanDate.ProgressPlanDateType) 
             
             END AS [WBS Element],
             
             --ProgressHeader.WbsNo AS [WBS Element],
             
             PlanVersion.Version AS [Plan Version], '90000100' AS [Cost element], 



			 LTRIM(RTRIM(STR(MonthlyInvestmentPlans.YearOfMonth))) AS [Year], 
			 LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.Jan,'#0.00'))) AS [Period1], 
			 LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.Feb,'#0.00'))) AS [Period2], 
			 LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.Mar,'#0.00'))) AS [Period3], 
			 LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.Apr,'#0.00'))) AS [Period4], 
			 LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.May,'#0.00'))) AS [Period5], 
			 LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.Jun,'#0.00'))) AS [Period6], 
			 LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.Jul,'#0.00'))) AS [Period7], 
             LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.Aug,'#0.00'))) AS [Period8], 
			 LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.Sep,'#0.00'))) AS [Period9], 
			 LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.Oct,'#0.00'))) AS [Period10], 
			 LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.Nov,'#0.00'))) AS [Period11], 
			 LTRIM(RTRIM(FORMAT(MonthlyInvestmentPlans.Dec,'#0.00'))) AS [Period12]

			 ------ แม็กเอาออก เนื่องจาก Investment Cost ไม่ผ่าน SIT 29/4/2021
			 --LTRIM(RTRIM(STR(InvestmentCost.YearCost))) AS [Year], 
			 --LTRIM(RTRIM(FORMAT(InvestmentCost.JanCost,'#0.00'))) AS [Period1], 
			 --LTRIM(RTRIM(FORMAT(InvestmentCost.FebCost,'#0.00'))) AS [Period2], 
			 --LTRIM(RTRIM(FORMAT(InvestmentCost.MarCost,'#0.00'))) AS [Period3], 
			 --LTRIM(RTRIM(FORMAT(InvestmentCost.AprCost,'#0.00'))) AS [Period4], 
			 --LTRIM(RTRIM(FORMAT(InvestmentCost.MayCost,'#0.00'))) AS [Period5], 
			 --LTRIM(RTRIM(FORMAT(InvestmentCost.JunCost,'#0.00'))) AS [Period6], 
			 --LTRIM(RTRIM(FORMAT(InvestmentCost.JulCost,'#0.00'))) AS [Period7], 
    --         LTRIM(RTRIM(FORMAT(InvestmentCost.AugCost,'#0.00'))) AS [Period8], 
			 --LTRIM(RTRIM(FORMAT(InvestmentCost.SepCost,'#0.00'))) AS [Period9], 
			 --LTRIM(RTRIM(FORMAT(InvestmentCost.OctCost,'#0.00'))) AS [Period10], 
			 --LTRIM(RTRIM(FORMAT(InvestmentCost.NovCost,'#0.00'))) AS [Period11],
			 --LTRIM(RTRIM(FORMAT(InvestmentCost.DecCost,'#0.00'))) AS [Period12]


FROM  v_Initiatives  Initiatives 
LEFT JOIN CommonData invest ON invest.DataType = 'typeofinvestment' AND invest.Attribute02 = Initiatives.TypeOfInvestment

             LEFT JOIN ProgressHeader ON ProgressHeader.InitiativeID = Initiatives.ID 
             LEFT JOIN ProgressPlan ON ProgressPlan.InitiativeId = Initiatives.ID 
             LEFT JOIN ProgressPlanDate ON ProgressPlanDate.InitiativeId = Initiatives.ID   
             LEFT JOIN InvestmentCost ON InvestmentCost.InitiativeId = Initiatives.ID AND InvestmentCost.InvestmentCOstType = 'planCost'  
			 LEFT JOIN CapexInformations ON CapexInformations.InitiativeID = Initiatives.ID 
			 LEFT JOIN MonthlyInvestmentPlans ON MonthlyInvestmentPlans.InitiativeId = Initiatives.ID
			 LEFT JOIN  (SELECT 2 AS [LineNo], 'P3' AS [Version]  UNION SELECT 3 AS [LineNo], 'P0' [Version] UNION  SELECT 4 AS [LineNo], 'CSP' [Version]) AS PlanVersion ON 1 = 1

GO
