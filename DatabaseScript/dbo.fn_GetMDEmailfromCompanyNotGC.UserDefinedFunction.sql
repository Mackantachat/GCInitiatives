/****** Object:  UserDefinedFunction [dbo].[fn_GetMDEmailfromCompanyNotGC]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




 
 
CREATE FUNCTION [dbo].[fn_GetMDEmailfromCompanyNotGC]
( 
    @initiativeId INT
 
)
RETURNS  nvarchar(255)
AS
BEGIN

DECLARE @Company nvarchar(255) = (select top 1 company from v_Initiatives where id = @initiativeId)
DECLARE @MDEmployeeID nvarchar(255) = (select top 1 attribute05 from   CommonData  c where Attribute03 = @Company and datatype = 'company')
Declare @MDEmail nvarchar(255) = (select top 1 email from owners where employeeid = @MDEmployeeID)


RETURN @MDEmail;

END
GO
