/****** Object:  UserDefinedFunction [dbo].[fn_GetInitiativeIdFromInitiativeCode]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION [dbo].[fn_GetInitiativeIdFromInitiativeCode]
(
    -- Add the parameters for the function here
    @InitiativeCode NVARCHAR(150)
)
RETURNS INT
AS
BEGIN
    RETURN (SELECT Id FROM v_Initiatives WHERE InitiativeCode = @InitiativeCode)
END
GO
