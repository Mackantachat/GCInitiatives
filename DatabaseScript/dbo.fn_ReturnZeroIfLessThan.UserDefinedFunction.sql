/****** Object:  UserDefinedFunction [dbo].[fn_ReturnZeroIfLessThan]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION [dbo].[fn_ReturnZeroIfLessThan]
(
    -- Add the parameters for the function here
    @val AS DECIMAL
)
RETURNS DECIMAL
AS
BEGIN
    -- Declare the return variable here
    

    -- Return the result of the function
    RETURN (SELECT IIF(@val < 0 , 0 , @val));
END
GO
