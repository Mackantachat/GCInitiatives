/****** Object:  View [dbo].[V_Temp_Date]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



 
 
 
CREATE view [dbo].[V_Temp_Date] AS 
 
 

SELECT  Project_Definition  AS [Project_Definition] 
	  ,MIN(Convert(DateTime,ZZZ_999Date.[Basic_Start_Date],104)) AS Basic_Start_Date
	  ,MAX(Convert(DateTime,ZZZ_999Date.[Basic_Finish_Date],104)) AS Basic_Finish_Date
	  ,MIN(Convert(DateTime,ZZZ_999Date.[Actual_Start_Date],104)) AS Actual_Start_Date 
  FROM [dbo].ZZZ_999Date
  GROUP BY Project_Definition
 
  

  
GO
