/****** Object:  UserDefinedFunction [dbo].[fn_MAP_Initiative_Stage]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 
CREATE FUNCTION [dbo].[fn_MAP_Initiative_Stage]
( 
      @stage NVARCHAR(255) 
)
RETURNS NVARCHAR(50)
AS
BEGIN

     
    DECLARE  @ReturnValue  NVARCHAR(255) 
	IF ( @stage like 'Initiative%')
		BEGIN 
			SET @ReturnValue = 'Initiative'
		END  
	ELSE
		BEGIN 
			SET @ReturnValue =  @stage 
		END  


	RETURN @ReturnValue 
END
GO
