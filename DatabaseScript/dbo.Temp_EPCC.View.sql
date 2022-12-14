/****** Object:  View [dbo].[Temp_EPCC]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 
CREATE view [dbo].[Temp_EPCC] AS 

SELECT 
      --Temp_WPMigration.[Tobe Idea MANI Initiative] AS Initiative_No
	   POC.WBS_Element AS [WBS_Element]
      ,[POC_Weight] AS [POC_Weight]
	  ,Convert(DateTime,ZZZ_999Date.[Basic_Start_Date],104) AS Basic_Start_Date
	  ,Convert(DateTime,ZZZ_999Date.[Basic_Finish_Date],104) AS Basic_Finish_Date
	  ,Convert(DateTime,ZZZ_999Date.[Actual_Start_Date],104) AS Actual_Start_Date
      ,[PlanActual_PA]
      ,[Year]
      ,[Period_1] AS JAN
      ,[Period_2] AS FEB
      ,[Period_3] AS MAR
      ,[Period_4] AS APR
      ,[Period_5] AS MAY
      ,[Period_6] AS JUN
      ,[Period_7] AS JUL
      ,[Period_8] AS AUG
      ,[Period_9] AS SEP
      ,[Period_10] AS OCT
      ,[Period_11] AS NOV
      ,[Period_12] AS DEC
	  , CASE WHEN RIGHT(POC.WBS_Element,1) = 'W' THEN 'Engineering'
			 WHEN RIGHT(POC.WBS_Element,1) = 'X' THEN 'Procurement'
			 WHEN RIGHT(POC.WBS_Element,1) = 'Y' THEN 'Construction'
			 WHEN RIGHT(POC.WBS_Element,1) = 'Z' THEN 'Commissioning' END AS Phase_EPCC
  FROM [dbo].ZZZ_999POC POC 
  LEFT JOIN  ZZZ_999Date ON (ZZZ_999Date.WBS = POC.WBS_Element AND LEN(ZZZ_999Date.WBS) > 13 ) OR (LEFT(ZZZ_999Date.WBS,13) = LEFT(POC.WBS_Element ,13) AND LEN(ZZZ_999Date.WBS) = 13 ) 
  WHERE (1=1)
  -- AND [PlanActual_PA] = 'P'
  AND LEN(POC.WBS_Element) = 15

 
GO
