/****** Object:  UserDefinedFunction [dbo].[fn_GetStringInbracket]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION [dbo].[fn_GetStringInbracket]
(
    -- Add the parameters for the function here
    @txtToSplit AS NVARCHAR(300)
)
RETURNS NVARCHAR(300)
AS
BEGIN
    
    DECLARE @returnTxt NVARCHAR(300) = '';

    SELECT @returnTxt = SUBSTRING(@txtToSplit,  CHARINDEX('(',@txtToSplit) + 1 , CHARINDEX(')',@txtToSplit) - CHARINDEX('(',@txtToSplit) - 1)

    -- Return the result of the function
    RETURN @returnTxt
END
GO
