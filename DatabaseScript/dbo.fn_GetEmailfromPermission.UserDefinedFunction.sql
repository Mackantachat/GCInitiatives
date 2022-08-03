/****** Object:  UserDefinedFunction [dbo].[fn_GetEmailfromPermission]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetEmailfromPermission]
(
	-- Add the parameters for the function here
	
    @position NVARCHAR(150)
)
RETURNS 
@returnemail TABLE 
(
	-- Add the column definitions for the TABLE variable here
	Email NVARCHAR(300)
)
AS
BEGIN
	-- Fill the table variable with the rows for your result set
		DECLARE @OutputApprover nvarchar(300) 
		--(
		--select Email from roledetailsetting rol 
		--inner join UserRoles us  on cast(rol.id as nvarchar(255)) = us.RoleId
		--where RoleName = @position )
		INSERT INTO @returnemail (Email)
		select Email from roledetailsetting rol 
		inner join UserRoles us  on cast(rol.id as nvarchar(255)) = us.RoleId
		where RoleName = @position 


	RETURN 

END
GO
