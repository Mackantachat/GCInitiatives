/****** Object:  View [dbo].[v_bi_WorkflowHistory]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_WorkflowHistory] AS

select
ish.id as WorkFlowHistoryID,
i.id as PorjectID,
o.EmployeeID as EmployeeID,
o.OwnerName as EmployeeName,
ish.comment as Comment,
ish.ActionBy as Action,
ish.ActionDate as ActionDate,
o.DepOrgID as DepartmentID,
NULL as IsMainFlow,
NULL as IsExcludedEmail,
NULL as IsHide
from InitiativeStatusHistory ish 
left join v_Initiatives i on ish.InitiativeId = i.id
left join Owners o on i.OwnerName = o.OwnerName 
GO
