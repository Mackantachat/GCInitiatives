/****** Object:  View [dbo].[v_bi_KRI_Header]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE VIEW [dbo].[v_bi_KRI_Header] AS
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
	WHEN GM.[Month]='1' THEN Pro.Jan WHEN GM.[Month]='2' THEN Pro.Feb  WHEN GM.[Month]='3' THEN Pro.Mar
	WHEN GM.[Month]='4' THEN Pro.Apr WHEN GM.[Month]='5' THEN Pro.May  WHEN GM.[Month]='6' THEN Pro.Jun
	WHEN GM.[Month]='7' THEN Pro.Jul WHEN GM.[Month]='8' THEN Pro.Aug  WHEN GM.[Month]='9' THEN Pro.Sep
	WHEN GM.[Month]='10' THEN Pro.Oct WHEN GM.[Month]='11' THEN Pro.Nov  WHEN GM.[Month]='12' THEN Pro.Dec	
	ELSE '' END as ProgressDetail
,CASE 
	WHEN GM.[Month]='1' THEN Mit.Jan WHEN GM.[Month]='2' THEN Mit.Feb  WHEN GM.[Month]='3' THEN Mit.Mar
	WHEN GM.[Month]='4' THEN Mit.Apr WHEN GM.[Month]='5' THEN Mit.May  WHEN GM.[Month]='6' THEN Mit.Jun
	WHEN GM.[Month]='7' THEN Mit.Jul WHEN GM.[Month]='8' THEN Mit.Aug  WHEN GM.[Month]='9' THEN Mit.Sep
	WHEN GM.[Month]='10' THEN Mit.Oct WHEN GM.[Month]='11' THEN Mit.Nov  WHEN GM.[Month]='12' THEN Mit.Dec	
	ELSE '' END as Mitigation

,'https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoPage=kpi&gotoId=' + CONVERT(NVARCHAR(20),INI.Id)  + '&year=' + KPI.Year as Link
From MaintainKpi KPI
LEFT JOIN  v_Initiatives INI ON INI.Id = KPI.InitiativeId    
LEFT JOIN KriProgressMitigation Pro ON Pro.InitiativeId = KPI.InitiativeId AND Pro.KriType='progress'
LEFT JOIN KriProgressMitigation Mit ON Mit.InitiativeId = KPI.InitiativeId AND Mit.KriType='mitigation'
LEFT JOIN GetMonth GM ON KPI.InitiativeId=KPI.InitiativeId
--Where KPI.InitiativeId = 65675
--Where KPI.Year = 2021
GO
