/****** Object:  UserDefinedFunction [dbo].[fn_FirstSplitColon]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
CREATE FUNCTION [dbo].[fn_FirstSplitColon]
( 
    @expression NVARCHAR(1500) 
	 

)
RETURNS NVARCHAR(50)
AS
BEGIN

	DECLARE @returnvalue NVARCHAR(1500) 
	DECLARE @splitchar NVARCHAR(25)  = ':'

	 

	IF (CHARINDEX (@splitchar,@expression )>0)  
		BEGIN 
			SET  @returnvalue = LTRIM(RTRIM(LEFT( @expression, CHARINDEX (@splitchar,@expression )-1)))
		END
	ELSE
		BEGIN 
			SET  @returnvalue =  LTRIM(RTRIM(@expression))
		END


	RETURN @returnvalue 
END
GO
