/****** Object:  StoredProcedure [dbo].[sp_ORG_InsertStageTrackings]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_ORG_InsertStageTrackings]
(
    -- Add the parameters for the stored procedure here
    @initiativeId AS NVARCHAR(150),
    @processType AS NVARCHAR(150),
    @ApprovedBy AS NVARCHAR(150),
    @Stage AS NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    INSERT INTO InitiativeStatusTrackings
    (Status, Stage, ApprovedBy, ApprovedDate, [Sequence], ProcessType, HistoryId, InitiativeId) 
    VALUES
    (
      'Not Start'
    , @Stage
    , @ApprovedBy
    , NULL
    , (SELECT MAX([Sequence]) FROM InitiativeStatusTrackings WHERE InitiativeId = @initiativeId)
    , @processType
    , 0
    , @initiativeId);

END
GO
