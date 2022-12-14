/****** Object:  View [dbo].[v_bi_KRI_HeaderAndScore]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO










CREATE VIEW [dbo].[v_bi_KRI_HeaderAndScore] AS
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
), GetKriType
AS
(
    SELECT 1 as No,'kpi_name' as KriType UNION ALL
	SELECT 2 as No,'external_kri' as KriType UNION ALL
	SELECT 3 as No,'execution_kri' as KriType UNION ALL
	SELECT 4 as No,'long_term_target' as KriType UNION ALL
	SELECT 5 as No,'progress' as KriType UNION ALL
	SELECT 6 as No,'mitigation' as KriType

)

Select Distinct
INI.Id as InitiativeId
,INI.InitiativeCode
,INI.Name as InitiativeName
,KPI.Year
,GM.[Month]
,KRI.KriDetailMonthId as KeyId
,CASE 
	WHEN GT.KriType = 'kpi_name' THEN 'KPI Name'
	WHEN GT.KriType = 'external_kri' THEN 'External KRI'
	WHEN GT.KriType = 'execution_kri' THEN 'Execution KRI'
	WHEN GT.KriType = 'long_term_target' THEN 'Long Term Target'
	WHEN GT.KriType = 'progress' THEN 'Progress Detail'
	WHEN GT.KriType = 'mitigation' THEN 'Mitigation'
	ELSE '' END as [Type]

,CASE 
	WHEN GT.KriType = 'progress' THEN 'Progress Detail'
	WHEN GT.KriType = 'mitigation' THEN 'Mitigation'
 ELSE
	KRI.KriDetail
 END as [Name]
,CASE 
	WHEN GM.[Month]='1' THEN KRI.JanScore WHEN GM.[Month]='2' THEN KRI.FebScore  WHEN GM.[Month]='3' THEN KRI.MarScore
	WHEN GM.[Month]='4' THEN KRI.AprScore WHEN GM.[Month]='5' THEN KRI.MayScore  WHEN GM.[Month]='6' THEN KRI.JunScore
	WHEN GM.[Month]='7' THEN KRI.JulScore WHEN GM.[Month]='8' THEN KRI.AugScore  WHEN GM.[Month]='9' THEN KRI.SepScore
	WHEN GM.[Month]='10' THEN KRI.OctScore WHEN GM.[Month]='11' THEN KRI.NovScore  WHEN GM.[Month]='12' THEN KRI.DecScore	
	ELSE '' END as Score
,	CASE WHEN GT.KriType = 'progress' THEN
		CASE 
		WHEN GM.[Month]='1' THEN Pro.Jan WHEN GM.[Month]='2' THEN Pro.Feb  WHEN GM.[Month]='3' THEN Pro.Mar
		WHEN GM.[Month]='4' THEN Pro.Apr WHEN GM.[Month]='5' THEN Pro.May  WHEN GM.[Month]='6' THEN Pro.Jun
		WHEN GM.[Month]='7' THEN Pro.Jul WHEN GM.[Month]='8' THEN Pro.Aug  WHEN GM.[Month]='9' THEN Pro.Sep
		WHEN GM.[Month]='10' THEN Pro.Oct WHEN GM.[Month]='11' THEN Pro.Nov  WHEN GM.[Month]='12' THEN Pro.Dec	
		ELSE '' END 
	WHEN GT.KriType = 'mitigation' THEN
		CASE 
		WHEN GM.[Month]='1' THEN Mit.Jan WHEN GM.[Month]='2' THEN Mit.Feb  WHEN GM.[Month]='3' THEN Mit.Mar
		WHEN GM.[Month]='4' THEN Mit.Apr WHEN GM.[Month]='5' THEN Mit.May  WHEN GM.[Month]='6' THEN Mit.Jun
		WHEN GM.[Month]='7' THEN Mit.Jul WHEN GM.[Month]='8' THEN Mit.Aug  WHEN GM.[Month]='9' THEN Mit.Sep
		WHEN GM.[Month]='10' THEN Mit.Oct WHEN GM.[Month]='11' THEN Mit.Nov  WHEN GM.[Month]='12' THEN Mit.Dec	
		ELSE '' END
	ELSE
		NULL
	END
	as Detail

	--,GT.KriType as kriType
	--,KRI.KriType as kriType
	

,'https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoPage=kpi&gotoId=' + CONVERT(NVARCHAR(20),INI.Id)  + '&year=' + KPI.Year as Link
From MaintainKpi KPI
LEFT JOIN  v_Initiatives INI ON INI.Id = KPI.InitiativeId

--LEFT JOIN KriDetailMonth KRI ON KRI.KpiMaintainId = KPI.KpiMaintainId --AND KRI.KriType in ('long_term_target','external_kri','execution_kri')
--LEFT JOIN KriDetailMonth KRI_NAME ON KRI_NAME.KpiMaintainId = KPI.KpiMaintainId AND KRI_NAME.KriType = 'kpi_name'


LEFT JOIN GetMonth GM ON KPI.InitiativeId=KPI.InitiativeId
INNER JOIN GetKriType GT ON KPI.InitiativeId=KPI.InitiativeId

LEFT JOIN KriDetailMonth KRI ON KRI.KpiMaintainId = KPI.KpiMaintainId AND KRI.KriType=GT.KriType

LEFT JOIN KriProgressMitigation Pro ON Pro.InitiativeId = KPI.InitiativeId AND Pro.KriType = 'progress' AND Pro.KriType=GT.KriType
LEFT JOIN KriProgressMitigation Mit ON Mit.InitiativeId = KPI.InitiativeId AND Mit.KriType = 'mitigation' AND Mit.KriType=GT.KriType
--WHERE KRI.KriType IS NOT NULL
--WHERE (KRI.KriDetailMonthId IS NOT NULL AND GT.KriType NOT IN ('progress','mitigation') AND KRI.KriType IS NOT NULL)
--Where KRI.KriDetailMonthId IS NOT NULL 
--AND CASE GT.KriType NOT IN ('progress','mitigation')  
--WHEN GT.KriType = KRI.KriType ELSE 1 = 1 END

WHERE 
(KRI.KriDetailMonthId IS NOT NULL) OR
(KRI.KriDetailMonthId IS NULL AND GT.KriType IN ('progress','mitigation')) OR
(GT.KriType IN ('long_term_target','execution_kri','external_kri','kpi_name') AND KRI.KriType IS NOT NULL)


/*

AND	CASE  @CheckDay 
			WHEN '1' THEN
				CASE WHEN IFP.ProjectCloseDate <= @GetToday THEN 1 ELSE 0 END
			ELSE 
				CASE WHEN IFP.ProjectCloseDate = @GetToday THEN 1 ELSE 0 END
		 END = 1

*/

--Where KPI.Year = 2021
GO
