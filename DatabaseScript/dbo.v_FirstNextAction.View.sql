/****** Object:  View [dbo].[v_FirstNextAction]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE view [dbo].[v_FirstNextAction]
AS
  
SELECT * FROM 
(
			SELECT [Id]
				  ,[ActionBy]
				  ,[Action]
				  ,[Position]
				  ,[Status]
				  ,[Stage]
				  ,[InitiativeId]
				  ,[ActionByName]
				  ,[ConditionType]
				  ,[Counter]
				  ,[Indicator]
				  ,[ActionResult]
				  ,[FlowType]
				  ,[InitiativeStageDetailId]
				  ,[IsInactive]
				  ,[ActionDate]
				  , ROW_NUMBER() OVER (  PARTITION BY [InitiativeId] ,[Id]  ORDER BY [Id]    ) AS [ROW NUMBER]
			    
			 FROM [dbo].[InitiativeActions]
			 WHERE [ActionResult]  IS NULL
			 AND IsInactive IS NULL
			 AND ConditionType IS NULL
 ) ACT
 WHERE ACT.[ROW NUMBER] = 1
  

GO
