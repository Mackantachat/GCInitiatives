/****** Object:  UserDefinedFunction [dbo].[fn_FixStandardProjectDef]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
CREATE FUNCTION [dbo].[fn_FixStandardProjectDef]
( 
      @stdPrj NVARCHAR(255) 
)
RETURNS NVARCHAR(50)
AS
BEGIN

     
    DECLARE  @ReturnValue  NVARCHAR(255) 
	
    SET @ReturnValue = REPLACE(REPLACE(@stdPrj, 'N2','N1'), 'N3','N1')



	RETURN @ReturnValue 
END
GO
