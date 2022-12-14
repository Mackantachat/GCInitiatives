/****** Object:  View [dbo].[v_DataGraphEnhanced_TEST]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO













CREATE view [dbo].[v_DataGraphEnhanced_TEST]
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

    CASE ini.Stage 
    WHEN 'SIL5' THEN CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastSubmittedSIL5Date) THEN 1 ELSE DATEPART(wk, imp.LastSubmittedSIL5Date) END
    WHEN 'IL5' THEN CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastApprovedIL5Date) THEN 1 ELSE DATEPART(wk, imp.LastApprovedIL5Date) END
    ELSE CASE WHEN YEAR(GETDATE()) > YEAR(det.IL5Date) THEN 1 ELSE DATEPART(wk, det.IL5Date) END
    END AS 'Target_To_IL5_Week',
    
    CASE ini.Stage 
    WHEN 'SIL5' THEN  CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastSubmittedSIL5Date) THEN 1 ELSE DATEPART(wk, imp.LastSubmittedSIL5Date) END
    WHEN 'IL5' THEN   CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastApprovedIL4Date) THEN 1 ELSE DATEPART(wk, imp.LastApprovedIL4Date)    END
    WHEN 'SIL4' THEN  CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastSubmittedSIL4Date) THEN 1 ELSE DATEPART(wk, imp.LastSubmittedSIL4Date) END
    WHEN 'IL4' THEN   CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastApprovedIL4Date) THEN 1 ELSE DATEPART(wk, imp.LastApprovedIL4Date)    END
    ELSE CASE WHEN YEAR(GETDATE()) > YEAR(det.IL4Date) THEN 1 ELSE DATEPART(wk, det.IL4Date) END 
    END AS 'Target_To_IL4_Week', 

    CASE WHEN ISNULL(ini.Stage, '') LIKE '%IL%'
    AND 
    (ISNULL(ini.Stage, '') NOT LIKE '%IL4%' AND ISNULL(ini.Stage, '') NOT LIKE '%IL5%')                          
    THEN det.IL4Date 

    WHEN ISNULL(ini.Stage, '') LIKE '%IL%'    AND ISNULL(det.IL4Date, '') = ''
    AND 
    (ISNULL(ini.Stage, '') NOT LIKE '%IL4%' AND ISNULL(ini.Stage, '') NOT LIKE '%IL5%')
    THEN CONVERT( VARCHAR(10), DATEADD(YEAR, 1000, GETDATE()) , 120)

    ELSE '1900-01-01' END AS 'Target_To_IL4_Date_C', 
    
    CASE WHEN ISNULL(ini.Stage, '') LIKE '%IL4%' 
    THEN det.IL5Date 

    WHEN ISNULL(ini.Stage, '') LIKE '%IL4%' AND ISNULL(det.IL5Date , '') = ''
    THEN CONVERT( VARCHAR(10), DATEADD(YEAR, 1000, GETDATE()) , 120)

    ELSE '1900-01-01' END AS 'Target_to_IL5_Date_C', 

    CASE WHEN (ISNULL(ini.Stage, '') = 'IL0' OR
    ISNULL(ini.Stage, '') = 'IL1' OR
    ISNULL(ini.Stage, '') = 'SIL1' OR
    ISNULL(ini.Stage, '') = 'IL2' OR
    ISNULL(ini.Stage, '') = 'SIL2' OR
    ISNULL(ini.Stage, '') = 'SIL3') AND Isnull(imp.SIL4Achievement, '') = '' 
    THEN ISNULL(TotalOnetime, 0) + ISNULL(TotalRecurring, 0) 
    ELSE - 9999 END AS 'IL0-IL2', 
    
    CAST( CASE WHEN ISNULL(ini.Stage, '') = 'IL3' 
    AND Isnull(imp.SIL4Achievement, '') = '' 
    THEN ISNULL(TotalOnetime, 0) + ISNULL(TotalRecurring, 0) 
    ELSE - 9999 END AS DECIMAL(10,3)) AS 'IL3', 

    CAST( CASE WHEN ISNULL(ini.Stage, '') = 'SIL4' 
    AND Isnull(imp.SIL4Achievement, '') = '' 
    THEN ISNULL(IL4RunRateOnetime, 0) + ISNULL(IL4RunRateRecurring, 0)  
    ELSE - 9999 END AS DECIMAL(10,3)) AS 'SIL4', 

    CAST( CASE WHEN (ISNULL(ini.Stage, '') = 'IL4' OR
    ISNULL(ini.Stage, '') = 'IL5' OR
    ISNULL(ini.Stage, '') = 'SIL5') AND Isnull(imp.SIL4Achievement, '') = ''  
    THEN ISNULL(IL4RunRateOnetime, 0) + ISNULL(IL4RunRateRecurring, 0) 
    ELSE - 9999 END AS DECIMAL(10,3)) AS 'IL4', 

    CAST( CASE WHEN (ISNULL(ini.Stage, '') = 'IL4' OR
    ISNULL(ini.Stage, '') = 'SIL4') AND Isnull(imp.SIL4Achievement, '') <> ''  
    THEN ISNULL(TotalOnetime, 0) + ISNULL(TotalRecurring, 0) 
    ELSE - 9999 END AS DECIMAL(10,3)) AS 'Unconverted_IL4', 
	-- แก้จาก IL5Onetime -> TotalOnetime
	-- แก้จาก IL5Recuring -> TotalRecuring
    CAST( CASE WHEN ISNULL(ini.Stage, '') = 'IL5' AND Isnull(imp.SIL5Achievement, '') = '' 
    THEN ISNULL(TotalOnetime, 0) + ISNULL(TotalRecurring, 0) 
    ELSE - 9999 END AS DECIMAL(10,3)) AS 'IL5', 
	-- แก้จาก IL5Onetime -> TotalOnetime
	-- แก้จาก IL5Recuring -> TotalRecuring
    CAST( CASE WHEN ISNULL(ini.Stage, '') LIKE 'SIL5' AND Isnull(imp.SIL5Achievement, '') = '' 
    THEN ISNULL(TotalOnetime, 0) + ISNULL(TotalRecurring, 0) 
    ELSE - 9999 END AS DECIMAL(10,3)) AS 'SIL5', 
	--
    CAST( bk_il4.BlankableValue AS DECIMAL(10,3)) AS [New IL4 BlankableValue],
    CAST( bk_il5.BlankableValue AS DECIMAL(10,3)) AS [IL5 BlankableValue],
    CAST( ctl_il4.Target AS DECIMAL(10,3)) AS [IL4 Target Line],
    CAST( ctl_il5.Target AS DECIMAL(10,3)) AS [IL5 Target Line]

    


FROM
    v_Initiatives ini
    LEFT JOIN ImpactTrackings imp ON ini.Id = imp.InitiativeId
    LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId
    LEFT JOIN SubWorkstreams subwork ON subwork.SubWorkstream2 = det.SubWorkstream2
    LEFT JOIN BlankablePlans AS bk_il4 ON bk_il4.CLevel = subwork.CLevel 
                AND bk_il4.Week = CASE ini.Stage 
    WHEN 'SIL5' THEN  CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastSubmittedSIL5Date) THEN 1 ELSE DATEPART(wk, imp.LastSubmittedSIL5Date) END
    WHEN 'IL5' THEN   CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastApprovedIL4Date) THEN 1 ELSE DATEPART(wk, imp.LastApprovedIL4Date)    END
    WHEN 'SIL4' THEN  CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastSubmittedSIL4Date) THEN 1 ELSE DATEPART(wk, imp.LastSubmittedSIL4Date) END
    WHEN 'IL4' THEN   CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastApprovedIL4Date) THEN 1 ELSE DATEPART(wk, imp.LastApprovedIL4Date)    END
    ELSE CASE WHEN YEAR(GETDATE()) > YEAR(det.IL4Date) THEN 1 ELSE DATEPART(wk, det.IL4Date) END 
    END
                AND bk_il4.Year = DATEPART(yy, det.IL4Date) 
                AND bk_il4.StageType = 'IL4' 
    LEFT JOIN BlankablePlans AS bk_il5 ON bk_il5.CLevel = subwork.CLevel
                AND bk_il5.Week = CASE ini.Stage 
    WHEN 'SIL5' THEN CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastSubmittedSIL5Date) THEN 1 ELSE DATEPART(wk, imp.LastSubmittedSIL5Date) END
    WHEN 'IL5' THEN CASE WHEN YEAR(GETDATE()) > YEAR(imp.LastApprovedIL5Date) THEN 1 ELSE DATEPART(wk, imp.LastApprovedIL5Date) END
    ELSE CASE WHEN YEAR(GETDATE()) > YEAR(det.IL5Date) THEN 1 ELSE DATEPART(wk, det.IL5Date) END
    END
                AND bk_il5.Year = DATEPART(yy, det.IL5Date) 
                AND bk_il5.StageType = 'IL5' 
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
