/****** Object:  UserDefinedFunction [dbo].[fn_MAP_SAP_Plant]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
CREATE FUNCTION [dbo].[fn_MAP_SAP_Plant]
( 
      @IdeaMANIPlant NVARCHAR(255) 
)
RETURNS NVARCHAR(50)
AS
BEGIN

     
    DECLARE  @ReturnValue  NVARCHAR(255) 
	IF ( @IdeaMANIPlant = '1019')
		BEGIN 
			SET @ReturnValue = '101A'
		END  
	ELSE
		BEGIN 
			SET @ReturnValue =  @IdeaMANIPlant
		END  


	RETURN @ReturnValue 
END
GO
