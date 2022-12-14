/****** Object:  StoredProcedure [dbo].[sp_DisableCAPEXTabOnlyGate2]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
create PROCEDURE [dbo].[sp_DisableCAPEXTabOnlyGate2]
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
    --SELECT Id, @flowType, Stage, STatus, 'sp_DisableCAPEXTab' FROM Initiatives WHERE Id = @initiativeId


    --DECLARE @STAGE NVARCHAR(255) = (Select stage from v_Initiatives where id = @initiativeId)
	DECLARE @Skipgate2 BIT = 0
	select 
	@Skipgate2 = ISNULL(simProjectSkipGate2,0) from DetailInformations where initiativeid = @initiativeId

	if(@Skipgate2 = 0) 
	begin
	UPDATE ini SET ini.CapexTabStatus = 2 FROM Initiatives ini WHERE Id = @initiativeId
	end
	ELSE
	BEGIN
		UPDATE ini SET ini.CapexTabStatus = null FROM Initiatives ini WHERE Id = @initiativeId
	END

    --SELECT 1;
END
GO
