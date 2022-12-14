/****** Object:  UserDefinedFunction [dbo].[fn_FullFillInitiativeCode]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[fn_FullFillInitiativeCode] (
	@initiativeCode NVARCHAR(50)
)
RETURNS NVARCHAR(50) AS
BEGIN
	DECLARE @return_value NVARCHAR(50)
	SET @return_value = @initiativeCode;
    IF (LEN(@initiativeCode) = 7) SET @return_value  = '00000000';
    IF (LEN(@initiativeCode) = 8) SET @return_value  = '0000000';
	--IF (LEN(@initiativeCode) = 9) SET @return_value  = '000000';
	--IF (LEN(@initiativeCode) = 10) SET @return_value = '00000';
	IF (LEN(@initiativeCode) = 11) SET @return_value = '0000';
	--IF (LEN(@initiativeCode) = 12) SET @return_value = '000';
 
    RETURN @return_value + @initiativeCode
END;
GO
