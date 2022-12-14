/****** Object:  UserDefinedFunction [dbo].[fn_OwnerDispByEmail]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





 
 
CREATE FUNCTION [dbo].[fn_OwnerDispByEmail]
( 
    @email nvarchar(255)
 
)
RETURNS  nvarchar(255)
AS
BEGIN

DECLARE @OwnerDisp nvarchar(255) =  REPLACE(LEFT(@email,  CHARINDEX ('@',@email,0)-1),'.', ' ')
 
RETURN @OwnerDisp;

END
GO
