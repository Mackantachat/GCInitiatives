/****** Object:  StoredProcedure [dbo].[sp_ORG_GenerateAllStageTrackings]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_ORG_GenerateAllStageTrackings]
(
    -- Add the parameters for the stored procedure here
    @initiativeId NVARCHAR(100),
    @initiativeType NVARCHAR(100)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here

DELETE FROM InitiativeStatusTrackings WHERE InitiativeId = @initiativeId

SELECT 'Not Start' AS 'Status',
        tsa.Stage AS 'Stage',
        NULL AS 'ApprovedBy',
        NULL AS 'ApprovedDate',
        ROW_NUMBER() OVER (ORDER BY  ts.[Order], tsa.[Order]) AS 'Sequence',
        @initiativeType AS 'ProcessType',
        0 AS 'HistoryId',
        @initiativeId AS 'InitiativeId'
FROM TypeStageApprover tsa INNER JOIN TypeStage ts ON ts.Stage = tsa.Stage AND ts.Type = tsa.Type WHERE tsa.Type = 'directCapex' ORDER BY ts.[Order], tsa.[Order]

END
GO
