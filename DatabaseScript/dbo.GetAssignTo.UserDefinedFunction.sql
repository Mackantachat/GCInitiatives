/****** Object:  UserDefinedFunction [dbo].[GetAssignTo]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 
 
CREATE FUNCTION [dbo].[GetAssignTo]
( 
    @initiativeId INT
 
)
RETURNS  nvarchar(255)
AS
BEGIN

DECLARE @assignTo nvarchar(255)
 
 SET @assignTo =	(
						SELECT   TOP 1 OWNERS.OwnerName
						FROM InitiativeActions 
						INNER JOIN OWNERS ON  OWNERS.Email = InitiativeActions.ActionBy AND InitiativeActions.InitiativeId = @initiativeId
						WHERE InitiativeActions.ActionResult IS NULL 
						ORDER BY InitiativeActions.Id
					)

RETURN @assignTo

END
GO
