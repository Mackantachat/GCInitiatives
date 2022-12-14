/****** Object:  View [dbo].[v_FirstLastApprovedMax]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE view [dbo].[v_FirstLastApprovedMax]
AS
SELECT a.InitiativeId AS 'InitiativeId' , a.ActionDate AS 'FirstApprovedIL4', b.ActionDate AS 'LastApprovedIL4', c.ActionDate AS 'LastApprovedIL5'  FROM (
    SELECT firstapproveil4.InitiativeId, firstapproveil4.ActionDate FROM (
        SELECT 
        ROW_NUMBER() OVER (PARTITION BY InitiativeId ORDER BY InitiativeId, Id) AS rowNum
        ,* 
        FROM InitiativeStatusHistory WHERE Status = 'approve' AND Stage = 'SIL4'  -- First Approved SIL 4
    ) firstapproveil4 WHERE firstapproveil4.rowNum = 1
) a 

LEFT OUTER JOIN (
    SELECT lastapprovedil4.InitiativeId, lastapprovedil4.ActionDate FROM (
        SELECT 
        ROW_NUMBER() OVER (PARTITION BY InitiativeId ORDER BY InitiativeId, Id DESC) AS rowNum
        ,* 
        FROM InitiativeStatusHistory WHERE Status = 'approve' AND Stage = 'SIL4'  -- last approved SIL 4
    ) lastapprovedil4 WHERE lastapprovedil4.rowNum = 1
) b ON a.InitiativeId = b.InitiativeId

LEFT OUTER JOIN (
    SELECT lastapprovedIL5.InitiativeId, lastapprovedIL5.ActionDate FROM 
        (SELECT 
        ROW_NUMBER() OVER (PARTITION BY InitiativeId ORDER BY InitiativeId, Id DESC) AS rowNum
        ,* 
        FROM InitiativeStatusHistory WHERE Status = 'approve' AND Stage = 'SIL5'  -- last approved SIL 5
    ) lastapprovedIL5 WHERE lastapprovedIL5.rowNum = 1

) c ON b.InitiativeId = c.InitiativeId
GO
