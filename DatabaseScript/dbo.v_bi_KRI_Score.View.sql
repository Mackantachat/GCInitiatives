/****** Object:  View [dbo].[v_bi_KRI_Score]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO








CREATE VIEW [dbo].[v_bi_KRI_Score] AS
WITH GetMonth
AS
(
    SELECT 1 as [Month] UNION ALL
	SELECT 2 as [Month] UNION ALL
	SELECT 3 as [Month] UNION ALL
	SELECT 4 as [Month] UNION ALL
	SELECT 5 as [Month] UNION ALL
	SELECT 6 as [Month] UNION ALL
	SELECT 7 as [Month] UNION ALL
	SELECT 8 as [Month] UNION ALL
	SELECT 9 as [Month] UNION ALL
	SELECT 10 as [Month] UNION ALL
	SELECT 11 as [Month] UNION ALL
	SELECT 12 as [Month]
)
select Distinct
INI.Id as InitiativeId
,INI.InitiativeCode
,INI.Name as InitiativeName
,KPI.Year
,GM.[Month]
,CASE 
	WHEN KRI.KriType = 'kpi_name' THEN 'KPI Name'
	WHEN KRI.KriType = 'external_kri' THEN 'External KRI'
	WHEN KRI.KriType = 'execution_kri' THEN 'Execution KRI'
	WHEN KRI.KriType = 'long_term_target' THEN 'Long Term Target'
	ELSE '' END as [Type]
,KRI.KriDetailMonthId as KeyId
,KRI.KriDetail as [Name]
,CASE 
	WHEN GM.[Month]='1' THEN KRI.JanScore WHEN GM.[Month]='2' THEN KRI.FebScore  WHEN GM.[Month]='3' THEN KRI.MarScore
	WHEN GM.[Month]='4' THEN KRI.AprScore WHEN GM.[Month]='5' THEN KRI.MayScore  WHEN GM.[Month]='6' THEN KRI.JunScore
	WHEN GM.[Month]='7' THEN KRI.JulScore WHEN GM.[Month]='8' THEN KRI.AugScore  WHEN GM.[Month]='9' THEN KRI.SepScore
	WHEN GM.[Month]='10' THEN KRI.OctScore WHEN GM.[Month]='11' THEN KRI.NovScore  WHEN GM.[Month]='12' THEN KRI.DecScore	
	ELSE '' END as Score
,'https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoPage=kpi&gotoId=' + CONVERT(NVARCHAR(20),INI.Id)  + '&year=' + KPI.Year as Link
From MaintainKpi KPI
LEFT JOIN  v_Initiatives INI ON INI.Id = KPI.InitiativeId    
LEFT JOIN KriDetailMonth KRI ON KRI.KpiMaintainId = KPI.KpiMaintainId 
LEFT JOIN GetMonth GM ON KPI.InitiativeId=KPI.InitiativeId
WHERE KRI.KriType IS NOT NULL
--Where KPI.Year = 2021
GO
