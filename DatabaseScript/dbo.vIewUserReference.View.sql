/****** Object:  View [dbo].[vIewUserReference]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE view [dbo].[vIewUserReference]
AS

SELECT  
'TypeStageApprover' as TableName,
'Approver' as FieldName,
'Email' as [DataType],
Approver  as [Value]  
FROM TypeStageApprover 
UNION  
SELECT  
'Initiatives' as TableName,
'OwnerName' as FieldName,
'Name' as [DataType],
OwnerName  as [Value]  
FROM v_Initiatives Initiatives
--UNION  
--SELECT  
--'Initiatives' as TableName,
--'UpdatedBy' as FieldName,
--'Email' as [DataType],
--UpdatedBy  as [Value]  
--FROM Initiatives
UNION  
SELECT  
'Initiatives' as TableName,
'CreatedBy' as FieldName,
'Email' as [DataType],
CreatedBy  as [Value]  
FROM v_Initiatives Initiatives
UNION  
SELECT  
'Initiatives' as TableName,
'CommentCancelled' as FieldName,
'Name' as [DataType],
CommentCancelled  as [Value]  
FROM v_Initiatives Initiatives
UNION  
SELECT  
'ImpactTrackings' as TableName,
'ContactIOBy' as FieldName,
'Email' as [DataType],
ContactIOBy  as [Value]  
FROM ImpactTrackings
UNION  
SELECT  
'InitiativeActions' as TableName,
'ActionBy' as FieldName,
'Email' as [DataType],
ActionBy  as [Value]  
FROM InitiativeActions
UNION  
SELECT  
'InitiativeActions' as TableName,
'ActionByName' as FieldName,
'Name' as [DataType],
ActionByName  as [Value]  
FROM InitiativeActions
UNION  
SELECT  
'InitiativeStatusTrackings' as TableName,
'ApprovedBy' as FieldName,
'Name' as [DataType],
ApprovedBy  as [Value]  
FROM InitiativeStatusTrackings
UNION  
SELECT  
'InitiativeStatusHistory' as TableName,
'ActionBy' as FieldName,
'Name' as [DataType],
ActionBy  as [Value]  
FROM InitiativeStatusHistory
UNION  
SELECT  
'MaxApprovers' as TableName,
'ApproverEmail' as FieldName,
'Email' as [DataType],
ApproverEmail  as [Value]  
FROM MaxApprovers
UNION  
SELECT  
'MaxApproverSettings' as TableName,
'ApproverEmail' as FieldName,
'Email' as [DataType],
ApproverEmail  as [Value]  
FROM MaxApproverSettings

--UNION  
--SELECT  
--'CoDevelopers' as TableName,
--'CoDeveloperName' as FieldName,
--'Name' as [DataType],
--CoDeveloperName  as [Value]  
--FROM CoDevelopers


--UNION  
--SELECT  
--'CoDevelopers' as TableName,
--'Email' as FieldName,
--'Email' as [DataType],
--Email  as [Value]  
--FROM CoDevelopers 
UNION  
SELECT  
'CustomReportHeader' as TableName,
'CreateUser' as FieldName,
'Email' as [DataType],
CreateUser  as [Value]  
FROM CustomReportHeader
UNION  
SELECT  
'CustomReportHeader' as TableName,
'UpdateUser' as FieldName,
'Email' as [DataType],
UpdateUser  as [Value]  
FROM CustomReportHeader
UNION  
SELECT  
'OverviewPermissions' as TableName,
'Email' as FieldName,
'Email' as [DataType],
Email  as [Value]  
FROM OverviewPermissions
UNION  
SELECT  
'OverviewPermissions' as TableName,
'Email' as FieldName,
'Email' as [DataType],
Email  as [Value]  
FROM UserManagements
UNION  
SELECT  
'Milestones' as TableName,
'ActionBy' as FieldName,
'Name' as [DataType],
ActionBy  as [Value]  
FROM Milestones
/*
UNION  
SELECT  
'Audits' as TableName,
'ActionBy' as FieldName,
'Email' as [DataType],
ActionBy  as [Value]  
FROM Audits
UNION  
SELECT  
'Audits' as TableName,
'CommentBy' as FieldName,
'Email' as [DataType],
CommentBy  as [Value]  
FROM Audits
UNION  
SELECT  
'Audits' as TableName,
'CommentByName' as FieldName,
'Name' as [DataType],
CommentByName  as [Value]  
FROM Audits
*/


UNION

SELECT
'DetailInformations' AS TableName,
'Manager' as FieldName,
'Name' as [DataType],
Manager  as [Value] 
FROM DetailInformations

UNION

SELECT
'DetailInformations' AS TableName,
'ProjectManager' as FieldName,
'Name' as [DataType],
ProjectManager  as [Value] 
FROM DetailInformations

UNION

SELECT
'DetailInformations' AS TableName,
'President' as FieldName,
'Name' as [DataType],
President  as [Value] 
FROM DetailInformations

UNION

SELECT
'CapexInformations' AS TableName,
'CostCenterOfVP' as FieldName,
'Name' as [DataType],
CostCenterOfVP  as [Value] 
FROM CapexInformations


GO
