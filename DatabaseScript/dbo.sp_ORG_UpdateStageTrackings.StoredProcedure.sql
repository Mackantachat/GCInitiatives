/****** Object:  StoredProcedure [dbo].[sp_ORG_UpdateStageTrackings]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_ORG_UpdateStageTrackings]
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

    DECLARE @timeApproved NVARCHAR(19) = (SELECT CONVERT(VARCHAR(19), GETDATE(), 120))
    DECLARE @maxId INT = 0;

    UPDATE 
        InitiativeStatusTrackings 
    SET 
        ApprovedDate = @timeApproved
    WHERE 
        InitiativeId  =  @initiativeId
        AND ProcessType  =  @processType 
        AND ApprovedBy  =  @ApprovedBy 
        AND Stage  =  @Stage

    
    ------ if case next stage IL insert stamp time lastest approved
    SELECT 
        @maxId = MAX(Id)
    FROM 
        InitiativeStatusTrackings
    WHERE 
        InitiativeId  =  @initiativeId
        AND ProcessType  =  @processType
        AND Stage  =  @Stage

    
    SELECT TOP 1 
        Id 
        FROM 
        InitiativeStatusTrackings
    WHERE 
        InitiativeId  =  @initiativeId
        AND ProcessType  =  @processType
        AND Stage  =  @Stage
        AND Id > @maxId
 


END
GO
