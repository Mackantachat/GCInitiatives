/****** Object:  View [dbo].[v_Audits]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO








CREATE VIEW [dbo].[v_Audits]
AS
SELECT     MAX(a.Id) AS Id, MAX(ChangeSetId) AS ChangeSetId, InitiativeCode, a.ActionType, TableName, PK, FieldName, OldValue, NewValue, ActionDate AS ActionDate 
		  ,ISNULL(own.OwnerName, ActionBy) AS ActionBy , [CommentBy]
		  ,[CommentDate]
		  ,[CommentDetail]
		  ,[CommentByName]
FROM            dbo.Audits a
LEFT JOIN Owners own ON own.Email = a.ActionBy
--เพิ่ม Fields ในการ แก้ไข Field Name  พวก Process 
WHERE        (a.ActionType IN ('UPDATE', 'INSERT')) 
			 AND (FieldName NOT IN ('Id', 'InitiativeId','Strategy','RandD','Pim','Other','DirectCapex','Dim','Cpi','Cim' , 'HistoryFlag' ,'CreateType','ProgressHeaderId')) 
			 AND (ISNULL(OldValue, N'') <> ISNULL(NewValue, N''))
GROUP BY 
--CONVERT(VARCHAR(14), ActionDate, 121),
ActionDate,
InitiativeCode, a.ActionType, TableName, FieldName, OldValue, NewValue, ISNULL(own.OwnerName, ActionBy), PK, [CommentBy]
      ,[CommentDate]
      ,[CommentDetail]
      ,[CommentByName]
GO
