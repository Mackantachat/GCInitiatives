/****** Object:  View [dbo].[v_bi_ProjectStatus]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE view [dbo].[v_bi_ProjectStatus]
AS
SELECT i.Id, CASE WHEN MOC.EasyTrackingID = 101 OR G6.InitiativeId IS NOT NULL THEN 3 
			 WHEN MOC.MOCNo IS NOT NULL AND moc.CompleteStartUpDate IS NOT NULL THEN 2 
			 WHEN MOC.MOCNo IS NULL AND MAX(PlanDate.ActualStartDate) IS NOT NULL THEN 2 
			 WHEN MOC.MOCNo IS NULL AND MAX(PlanDate.ActualFinishDate) IS NOT NULL THEN 2 
			 ELSE 1 END AS ProjectStatusID
FROM	dbo.v_Initiatives AS i 
		LEFT OUTER JOIN dbo.v_bi_ViewMocTransaction AS MOC ON MOC.ProjectID = i.Id 
		LEFT OUTER JOIN dbo.PimGate AS G6 ON G6.InitiativeId = i.Id AND G6.GateStatus = 'Pass' 
		LEFT OUTER JOIN dbo.ProgressPlanDate AS PlanDate ON PlanDate.InitiativeId = i.Id 
		LEFT OUTER JOIN dbo.ProgressHeader AS Progress ON Progress.InitiativeId = i.Id
GROUP BY I.Id,MOC.EasyTrackingID,G6.InitiativeId,MOC.MOCNo,moc.CompleteStartUpDate

GO
