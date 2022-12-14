/****** Object:  StoredProcedure [dbo].[sp_ShowHideGatePIMDetail]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO













-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
 CREATE PROCEDURE [dbo].[sp_ShowHideGatePIMDetail]
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
    -- logic update Field CapexTabStatus  = 1 (open tab and can edit)

    --INSERT INTO tmp_CheckExexuteStored(InitiativeId, FlowType, CurrentStage, CurrentStatus, StoredType)
    --SELECT Id, @flowType, Stage, STatus, 'PreStage' FROM Initiatives WHERE Id = @initiativeId
--select 
--'true' as Gate1 ,
--'true' as Gate2 ,
--'true' as Gate3 ,
--'true' as Gate4

	DECLARE @Stage NVARCHAR(255) = (select stage from Initiatives where id = @initiativeId)
	DECLARE @Initiativetype NVARCHAR(255) = (select InitiativeType from Initiatives where id = @initiativeId)
	DECLARE @Gate0 NVARCHAR(255) 
	DECLARE @Gate1 NVARCHAR(255) 
	DECLARE @Gate2 NVARCHAR(255) 
	DECLARE @Gate3 NVARCHAR(255) 
	DECLARE @Gate4 NVARCHAR(255) 
	select 
	@Gate0 = 
	CASE WHEN (
			   isnull(right(@Stage,5),'') = 'Gate0'		or  
			   isnull(left(@Stage,5),'') = 'Gate0'		or
			   isnull(@stage,'') = 'ASSIGN PROJECT ENG.'
			  ) 
	then 'true'	else 'false' end ,
	@Gate1 = 
	CASE WHEN (isnull(right(@Stage,5),'') = 'Gate1' or  isnull(left(@Stage,5),'') = 'Gate1') 
	then 'true'	else 'false' end ,
	@Gate2 =
	CASE WHEN (isnull(right(@Stage,5),'') = 'Gate2' or  isnull(left(@Stage,5),'') = 'Gate2') 
	then 'true'	else 'false' end ,
	@Gate3 = 
	CASE WHEN (isnull(right(@Stage,5),'') = 'Gate3' or  isnull(left(@Stage,5),'') = 'Gate3') 
	then 'true'	else 'false' end ,
	@Gate4 =
	CASE WHEN (isnull(right(@Stage,5),'') = 'Gate4' or  isnull(left(@Stage,5),'') = 'Gate4') 
	then 'true'	else 'false' end 

		---------------------- IF MAX
		IF(@Initiativetype  = 'max' and isnull(@stage,'') <> 'ASSIGN PROJECT ENG.')
		Begin 
			select 
				'true' as Gate0 ,
				'true' as Gate1 ,
				'true' as Gate2 ,
				'true' as Gate3 ,
				'false' as Gate4
		END
	
	
	---------------------- IF GATE 4 RETURN TRUE
		ELSE if(@Gate4 = 'true')
		Begin 
			select 
				'true' as Gate0 ,
				'disable' as Gate1 , --disable gate edit by krit 03-06-2021
				'disable' as Gate2 , --disable gate edit by krit 03-06-2021
				'disable' as Gate3 , --disable gate edit by krit 03-06-2021
				'true' as Gate4
		END
	---------------------- IF GATE 3 RETURN TRUE
		ELSE IF(@Gate3 = 'true')
		Begin 
			select 
				'true' as Gate0 ,
				'disable' as Gate1 , --disable gate edit by krit 03-06-2021
				'disable' as Gate2 , --disable gate edit by krit 03-06-2021
				'true' as Gate3 ,
				'false' as Gate4
		END
	---------------------- IF GATE 2 RETURN TRUE
		ELSE IF(@Gate2 = 'true')
		Begin 
			select 
				'true' as Gate0 ,
				'disable' as Gate1 , --disable gate edit by krit 03-06-2021
				'true' as Gate2 ,
				'false' as Gate3 ,
				'false' as Gate4
		END
	---------------------- IF GATE 1 RETURN TRUE
		ELSE IF(@Gate1 = 'true')
		Begin 
			select 
				'true' as Gate0 ,
				'true' as Gate1 ,
				'false' as Gate2 ,
				'false' as Gate3 ,
				'false' as Gate4
		END
	---------------------- IF GATE 0 RETURN TRUE
	ELSE IF(@Gate0 = 'true')
	Begin 
		select 
			'true' as Gate0 ,
			'false' as Gate1 ,
			'false' as Gate2 ,
			'false' as Gate3 ,
			'false' as Gate4
	END
	---------------------- IF RETURN FALSE ALL GATE
		ELSE 
		Begin 
			select 
				'false' as Gate0 ,
				'false' as Gate1 ,
				'false' as Gate2 ,
				'false' as Gate3 ,
				'false' as Gate4
		END


    --SELECT 1;
END
GO
