/****** Object:  StoredProcedure [dbo].[sp_ShowProgressTab]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
Create PROCEDURE [dbo].[sp_ShowProgressTab]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT,
    @flowType NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    -- logic update Field CapexTabStatus  = 1 (open tab and can edit)

    --INSERT INTO tmp_CheckExexuteStored(InitiativeId, FlowType, CurrentStage, CurrentStatus, StoredType)
    --SELECT Id, @flowType, Stage, STatus, 'PreStage' FROM v_Initiatives WHERE Id = @initiativeId


    UPDATE ini SET ini.ProgressTabStatus = 1 FROM Initiatives ini WHERE Id = @initiativeId

    --SELECT 1;
END
GO
