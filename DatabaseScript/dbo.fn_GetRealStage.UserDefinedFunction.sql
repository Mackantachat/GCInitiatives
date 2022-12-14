/****** Object:  UserDefinedFunction [dbo].[fn_GetRealStage]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




 
CREATE FUNCTION [dbo].[fn_GetRealStage]
( 
      @initiativeid int
)
RETURNS NVARCHAR(50)
AS
BEGIN

     
    DECLARE  @ReturnValue  NVARCHAR(255) 
	DECLARE  @Issubflow bit = (select isrequestcapex from initiatives where id = @initiativeid)
	DECLARE  @Stage NVARCHAR(255) = (select Stage from initiatives where id = @initiativeid)
	DECLARE  @StageSubflow NVARCHAR(255) 
	DECLARE  @StatusSubflow NVARCHAR(255)
	
	select top 1 
	@StageSubflow = sta.Stage,
	@StatusSubflow = sta.Status
	from initiatives ini 
	inner join initiativestage sta on ini.id = sta.InitiativeId
	where IsRequestCapex = 1 and initiativeid = @initiativeid  order by sta.id desc


	IF (isnull(@Issubflow,0) = 0 or (@Issubflow = 1 and isnull(@StatusSubflow,'finish') = 'finish'))
		BEGIN 
			SET @ReturnValue = @Stage
		END  
	Else
		BEGIN 
			SET @ReturnValue =  @StageSubflow
		END  


	RETURN @ReturnValue 
END
GO
