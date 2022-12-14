/****** Object:  View [dbo].[v_DataGraphEnhanced_NewNormal]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO











CREATE view [dbo].[v_DataGraphEnhanced_NewNormal]
AS


SELECT 
    ini.InitiativeCode AS 'Initiative_ID',
    ini.Name AS 'Initiative_Name',
    ini.OwnerName AS 'Initiative_Owner',
    ini.Stage AS 'Stage_Gate',
    det.InitiativeTypeMax AS 'Initiative_Type',
    imp.SIL4Achievement AS 'SIL4_Achievement',
    imp.SIL5Achievement AS 'SIL5_Achievement',
    det.IL4Date AS 'Target_To_IL4_Date',
    det.IL5Date AS 'Target_To_IL5_Date',
    ISNULL(subwork.CLevel, '') AS 'C-level',
    det.Workstream AS 'Workstream',
    det.SubWorkstream1 AS 'Sub-Workstream_1',
    det.SubWorkstream2 AS 'Sub-Workstream_2',
    imp.FinancialImpactArea AS 'Financial_Impact_Area',
    imp.LastApprovedIL4Date AS 'Latest approved IL4 date',
    imp.LastApprovedIL5Date AS 'Latest approved IL5 date',
    imp.LastSubmittedSIL4Date AS 'First submitted IL4 date',
    imp.LastSubmittedSIL5Date AS 'First submitted IL5 date',

    valGraph5.Week AS 'Target_To_IL5_Week',
    
    valGraph4.Week AS 'Target_To_IL4_Week', 

    CASE WHEN ISNULL(ini.Stage, '') LIKE '%IL%' 
    AND 
    (ISNULL(ini.Stage, '') NOT LIKE '%IL4%' AND ISNULL(ini.Stage, '') NOT LIKE '%IL5%')                          
    THEN det.IL4Date ELSE '1900-01-01' END AS 'Target_To_IL4_Date_C', 
    
    CASE WHEN ISNULL(ini.Stage, '') LIKE '%IL4%' 
    THEN det.IL5Date 
    ELSE '1900-01-01' END AS 'Target_to_IL5_Date_C', 

    ISNULL(valGraphIL2.Value, 0) AS 'IL0-IL2', 
    
    ISNULL(valGraphIL3.Value, 0) AS 'IL3', 

    --CAST( CASE WHEN ISNULL(ini.Stage, '') = 'SIL4' 
    --AND Isnull(imp.SIL4Achievement, '') = '' 
    --THEN ISNULL(IL4RunRateOnetime, 0) + ISNULL(IL4RunRateRecurring, 0)  
    --ELSE - 9999 END AS DECIMAL(10,3)) 
    0 AS 'SIL4', 

    ISNULL(valGraph4.Value, 0) AS 'IL4', 

    ISNULL(valGraphUnconvertIL4.Value, 0) AS 'Unconverted_IL4', 
	-- แก้จาก IL5Onetime -> TotalOnetime
	-- แก้จาก IL5Recuring -> TotalRecuring
    ISNULL(valGraphIL5.Value, 0) AS 'IL5', 
	-- แก้จาก IL5Onetime -> TotalOnetime
	-- แก้จาก IL5Recuring -> TotalRecuring
    --CAST( CASE WHEN ISNULL(ini.Stage, '') LIKE 'SIL5' AND Isnull(imp.SIL5Achievement, '') = '' 
    --THEN ISNULL(TotalOnetime, 0) + ISNULL(TotalRecurring, 0) 
    --ELSE - 9999 END AS DECIMAL(10,3)) 
    ISNULL(valGraph5.Value, 0)
    AS 'SIL5', 
	--
    CAST( bk_il4.Value AS DECIMAL(10,3)) AS [New IL4 BlankableValue],
    CAST( bk_il5.Value AS DECIMAL(10,3)) AS [IL5 BlankableValue],
    CAST( ctl_il4.Target AS DECIMAL(10,3)) AS [IL4 Target Line],
    CAST( ctl_il5.Target AS DECIMAL(10,3)) AS [IL5 Target Line]

    


FROM
    v_Initiatives ini
    LEFT JOIN ImpactTrackings imp ON ini.Id = imp.InitiativeId
    LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId
    LEFT JOIN SubWorkstreams subwork ON subwork.SubWorkstream2 = det.SubWorkstream2
    LEFT JOIN tmpValueGraph valGraph4 ON valGraph4.Week = ISNULL(DATEPART(wk, imp.LastSubmittedSIL4Date), ISNULL(DATEPART(wk, det.IL4Date), 0))  AND valGraph4.ValueType = 'SIL4'  --usage IL4
    LEFT JOIN tmpValueGraph valGraphIL3 ON valGraphIL3.Week = ISNULL(DATEPART(wk, imp.LastSubmittedSIL4Date), ISNULL(DATEPART(wk, det.IL4Date), 0))  AND valGraphIL3.ValueType = 'IL3'
    LEFT JOIN tmpValueGraph valGraphIL2 ON valGraphIL2.Week = ISNULL(DATEPART(wk, imp.LastSubmittedSIL4Date), ISNULL(DATEPART(wk, det.IL4Date), 0))  AND valGraphIL2.ValueType = 'IL0-IL2'
    LEFT JOIN tmpValueGraph valGraph5 ON valGraph5.Week = ISNULL(DATEPART(wk, imp.LastSubmittedSIL5Date), ISNULL(DATEPART(wk, det.IL5Date), 0))  AND valGraph5.ValueType = 'SIL5'
    LEFT JOIN tmpValueGraph valGraphIL5 ON valGraphIL5.Week = ISNULL(DATEPART(wk, imp.LastSubmittedSIL5Date), ISNULL(DATEPART(wk, det.IL5Date), 0))  AND valGraphIL5.ValueType = 'IL5'
    LEFT JOIN tmpValueGraph valGraphUnconvertIL4 ON valGraphUnconvertIL4.Week = ISNULL(DATEPART(wk, imp.LastSubmittedSIL5Date), ISNULL(DATEPART(wk, det.IL5Date), 0))  AND valGraphUnconvertIL4.ValueType = 'UnconvertedIL4'

    LEFT JOIN tmpValueGraph AS bk_il4 ON 
                bk_il4.Week = ISNULL(DATEPART(wk, imp.LastSubmittedSIL4Date), ISNULL(DATEPART(wk, det.IL4Date), 0))
                AND bk_il4.ValueType = 'BankableValueIL4'
    LEFT JOIN tmpValueGraph AS bk_il5 ON 
                bk_il5.Week = ISNULL(DATEPART(wk, imp.LastSubmittedSIL5Date), ISNULL(DATEPART(wk, det.IL5Date), 0))
                AND bk_il5.ValueType = 'BankableValueIL5' 
    LEFT JOIN CLevelTargetLines AS ctl_il4 ON ctl_il4.CLevel = subwork.CLevel 
                AND ctl_il4.Year = DATEPART(yy, det.IL4Date) 
                AND ctl_il4.StageType = 'IL4' 
    LEFT JOIN CLevelTargetLines AS ctl_il5 ON ctl_il5.CLevel = subwork.CLevel 
                AND ctl_il5.Year = DATEPART(yy, det.IL5Date) 
                AND ctl_il5.StageType = 'IL5'

                WHERE ISNULL(ini.InitiativeType, '') LIKE '%max%' 
                AND det.Workstream IS NOT NULL
                AND subwork.CLevel IS NOT NULL
				and ini.InitiativeCode like '%0000-%'
                
GO
