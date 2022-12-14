/****** Object:  StoredProcedure [dbo].[sp_PrintInitiative]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_PrintInitiative]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    SELECT 'Initiatives' AS SheetName ,* FROM v_Initiatives WHERE Id = @initiativeId
    SELECT 'Impact' AS SheetName ,* FROM ImpactTrackings WHERE InitiativeId = @initiativeId
    SELECT 'DetailInformation' AS SheetName ,* FROM DetailInformations WHERE InitiativeId = @initiativeId


END
GO
