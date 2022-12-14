/****** Object:  StoredProcedure [dbo].[sp_GetInitiativeIdListDistribute]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetInitiativeIdListDistribute]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    
        
SELECT DISTINCT
ini.Id,
ini.InitiativeCode,
ini.Stage,
ini.Status,
inist.Stage AS parallelStage,
inist.Status AS parallelStatus
--,sd.Id AS StageDetailId,
,icf.Column11
FROM v_Initiatives ini
LEFT JOIN InitiativeStage inist ON inist.InitiativeId = ini.Id
LEFT JOIN InitiativeStageDetail sd ON sd.InitiativeId = ini.Id
INNER JOIN IncomingFileData icf ON RIGHT('0000' + ini.InitiativeCode, 15) = icf.Column2
WHERE 
(
    (ISNULL(ini.Stage, '') = 'Budget Distribute'
    AND (ISNULL(ini.Status, '') <> 'finish' AND ISNULL(ini.Status, '') <> 'revised') -- aon 2021-03-25
    )
    OR 
    (ISNULL(inist.Stage, '') = 'Budget Distribute'
    AND (ISNULL(inist.Status, '') <> 'finish' AND ISNULL(inist.Status, '') <> 'revised')  --aon 2021-03-25
    )
	OR 
    (ISNULL(inist.Stage, '') = 'WBS Request'
    AND (ISNULL(inist.Status, '') <> 'finish' AND ISNULL(inist.Status, '') <> 'revised')  --aon 2021-03-25
    )
	OR 
    (ISNULL(inist.Stage, '') = 'WBS'
    AND (ISNULL(inist.Status, '') <> 'finish' AND ISNULL(inist.Status, '') <> 'revised')  --aon 2021-03-25
    )
)
AND ini.Status <> 'cancelled'  --aon 2021-03-25
AND sd.Id IS NOT NULL
AND sd.Event = 'createnew' AND sd.CurrentStage IS NULL
AND ISNULL(icf.Column11, '') = 'X'  --//budget distribute code







END
GO
