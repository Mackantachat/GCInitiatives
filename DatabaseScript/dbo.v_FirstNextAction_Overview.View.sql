/****** Object:  View [dbo].[v_FirstNextAction_Overview]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 



CREATE view [dbo].[v_FirstNextAction_Overview]
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
				  , ROW_NUMBER() OVER (  PARTITION BY [InitiativeId]  ORDER BY [Id]    ) AS [ROW NUMBER]
			    
			 FROM [dbo].[InitiativeActions]
			 WHERE [ActionResult]  IS NULL
			 AND IsInactive IS NULL
			 AND ConditionType IS NULL
 ) ACT
 WHERE ACT.[ROW NUMBER] = 1
  

GO
