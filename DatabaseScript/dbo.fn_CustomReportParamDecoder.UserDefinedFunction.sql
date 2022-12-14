/****** Object:  UserDefinedFunction [dbo].[fn_CustomReportParamDecoder]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION [dbo].[fn_CustomReportParamDecoder]
(
    -- Add the parameters for the function here
    @textToDecode AS NVARCHAR(MAX)
)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    
    RETURN REPLACE(ISNULL(@textToDecode, ''), '<comma>', ','); 
END
GO
