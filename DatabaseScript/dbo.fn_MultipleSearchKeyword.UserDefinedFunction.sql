/****** Object:  UserDefinedFunction [dbo].[fn_MultipleSearchKeyword]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 
CREATE FUNCTION [dbo].[fn_MultipleSearchKeyword]
( 
    @InputText AS NVARCHAR(300)
)
RETURNS NVARCHAR(300)
AS
BEGIN
    DECLARE @Output AS NVARCHAR(300)
	
	SET @Output = @InputText;

	SET @Output = REPLACE(@Output,',',''',''') 
	SET @Output = REPLACE(@Output,'<comma>',',') 
	--SET @Output = ''''+ @Output + ''''

	RETURN @Output

END
GO
