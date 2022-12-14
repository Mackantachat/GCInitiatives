/****** Object:  View [dbo].[v_maxApprovers]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[v_maxApprovers]
AS
SELECT        STRING_AGG(max1.ApproverEmail, ', ') AS Sponsor, STRING_AGG(max2.ApproverEmail, ', ') AS [TO Finance], STRING_AGG(max3.ApproverEmail, ', ') AS [Workstream Leader], ini.Id
FROM            dbo.v_Initiatives AS ini INNER JOIN
                             (SELECT        ApproverEmail, ApproverType, InitiativeId
                               FROM            dbo.MaxApprovers
                               WHERE        (ApproverType = 'sponsor')) AS max1 ON ini.Id = max1.InitiativeId INNER JOIN
                             (SELECT        ApproverEmail, ApproverType, InitiativeId
                               FROM            dbo.MaxApprovers AS MaxApprovers_2
                               WHERE        (ApproverType = 'TO Finance')) AS max2 ON ini.Id = max2.InitiativeId INNER JOIN
                             (SELECT        ApproverEmail, ApproverType, InitiativeId
                               FROM            dbo.MaxApprovers AS MaxApprovers_1
                               WHERE        (ApproverType = 'WorkstreamLead')) AS max3 ON ini.Id = max3.InitiativeId
GROUP BY ini.Id, max1.ApproverType, max2.ApproverType, max3.ApproverType
GO
