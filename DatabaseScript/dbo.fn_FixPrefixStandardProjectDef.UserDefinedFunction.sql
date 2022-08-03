/****** Object:  UserDefinedFunction [dbo].[fn_FixPrefixStandardProjectDef]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
CREATE FUNCTION [dbo].[fn_FixPrefixStandardProjectDef]
( 
      @prefix NVARCHAR(255) 
)
RETURNS NVARCHAR(50)
AS
BEGIN

     
    DECLARE  @ReturnValue  NVARCHAR(255) 
	
    SET @ReturnValue = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(@prefix, 'CA','CE'), 'CD','CE'), 'CD', 'CE'), 'CM', 'CE'), 'CP', 'CE')







	RETURN @ReturnValue 
END
GO
