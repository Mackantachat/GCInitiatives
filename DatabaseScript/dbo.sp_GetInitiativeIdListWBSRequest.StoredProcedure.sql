/****** Object:  StoredProcedure [dbo].[sp_GetInitiativeIdListWBSRequest]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetInitiativeIdListWBSRequest]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    

UPDATE sd2 SET
NextCondition = REPLACE(sd2.NextCondition, '#passnocondition|','')
FROM v_Initiatives ini
LEFT JOIN InitiativeStage inist ON inist.InitiativeId = ini.Id
LEFT JOIN InitiativeStageDetail sd ON sd.InitiativeId = ini.Id
INNER JOIN ProgressHeader ph ON ini.Id = ph.InitiativeId
LEFT JOIN InitiativeStageDetail sd2 ON sd2.InitiativeId = ini.Id AND sd2.Event = 'createnew' AND sd2.CurrentStage = 'Budget Distribute'
WHERE 
(
ISNULL(ini.Stage, '') LIKE '%WBS%'
OR (ISNULL(inist.Stage, '') LIKE '%WBS%'
AND ISNULL(inist.Status, '') <> 'finish')
)
AND sd.Id IS NOT NULL
AND sd.Event = 'createnew' AND sd.CurrentStage IS NULL
AND ISNULL(ph.WbsNo, '') <> ''  --//wbs code  




         
SELECT DISTINCT
ini.Id,
ini.InitiativeCode,
ini.Stage,
ini.Status,
inist.Stage AS parallelStage,
inist.Status AS parallelStatus
--,sd.Id AS StageDetailId,
,ph.WbsNo
FROM v_Initiatives ini
LEFT JOIN InitiativeStage inist ON inist.InitiativeId = ini.Id
LEFT JOIN InitiativeStageDetail sd ON sd.InitiativeId = ini.Id
INNER JOIN ProgressHeader ph ON ini.Id = ph.InitiativeId
WHERE 
(
ISNULL(ini.Stage, '') LIKE '%WBS%'
OR (ISNULL(inist.Stage, '') LIKE '%WBS%'
AND ISNULL(inist.Status, '') <> 'finish')
)
AND sd.Id IS NOT NULL
AND sd.Event = 'createnew' AND sd.CurrentStage IS NULL
AND ISNULL(ph.WbsNo, '') <> ''  --//wbs code






END
GO
