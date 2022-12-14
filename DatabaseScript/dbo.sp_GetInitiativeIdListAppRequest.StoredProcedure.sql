/****** Object:  StoredProcedure [dbo].[sp_GetInitiativeIdListAppRequest]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetInitiativeIdListAppRequest]
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
            ,ph.AppropriationNo
            ,ini.InitiativeType
            FROM v_Initiatives ini
            LEFT JOIN InitiativeStage inist ON inist.InitiativeId = ini.Id
            LEFT JOIN InitiativeStageDetail sd ON sd.InitiativeId = ini.Id
            INNER JOIN [v_MappingIniAppWbs] ph ON ini.Id = ph.InitiativeId
            WHERE 
            (
            ISNULL(ini.Stage, '')  LIKE '%APP.%' OR ISNULL(ini.Stage, '') LIKE '%APP %'
            OR ISNULL(inist.Stage, '')  LIKE '%APP.%' OR ISNULL(inist.Stage, '') LIKE '%APP %'
            )
            AND sd.Id IS NOT NULL
            AND sd.Event = 'createnew' AND sd.CurrentStage IS NULL
            AND ISNULL(ph.AppropriationNo, '') <> ''  --//app code

            

END



















GO
