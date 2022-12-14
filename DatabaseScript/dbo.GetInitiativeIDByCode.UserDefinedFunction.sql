/****** Object:  UserDefinedFunction [dbo].[GetInitiativeIDByCode]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
CREATE FUNCTION [dbo].[GetInitiativeIDByCode]
(
    @Code nvarchar(255)
)
RETURNS INT
AS
BEGIN
     RETURN (SELECT TOP 1 Initiatives.Id FROM  v_Initiatives Initiatives WHERE   Initiatives.InitiativeCode =  @Code)
END
GO
