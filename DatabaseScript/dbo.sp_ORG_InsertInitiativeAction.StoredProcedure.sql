/****** Object:  StoredProcedure [dbo].[sp_ORG_InsertInitiativeAction]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_ORG_InsertInitiativeAction]
(
    -- Add the parameters for the stored procedure here
     @InitiativeId AS NVARCHAR(150),
     @Action AS NVARCHAR(150),
     @Position AS NVARCHAR(150),
     @initiativeStatus AS NVARCHAR(150),
     @Stage AS NVARCHAR(150),
     @ApproverEmail AS NVARCHAR(150),
     @ApproverName AS NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    INSERT INTO InitiativeActions (ActionBy ,[Action] ,Position ,[Status] ,Stage ,InitiativeId ,ActionByName)
    SELECT 
        @ApproverEmail AS 'ActionBy',
        @Action AS 'Action',
        @Position AS 'Position',
        @initiativeStatus AS 'Status',
        @Stage AS 'Stage',
        @InitiativeId AS 'InitiativeId',
        @ApproverName AS 'ActionByName'

    UPDATE Initiatives SET Stage = @Stage, [Status] = @initiativeStatus WHERE Id = @InitiativeId

END
GO
