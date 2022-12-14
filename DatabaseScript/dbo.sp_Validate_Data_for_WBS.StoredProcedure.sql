/****** Object:  StoredProcedure [dbo].[sp_Validate_Data_for_WBS]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_Validate_Data_for_WBS]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT
)
AS
BEGIN

	DECLARE @returnValue nvarchar(255) = 'true'

	DECLARE @InitiativeCode nvarchar(255)
	
	SET @InitiativeCode = (SELECT InitiativeCode FROM v_Initiatives WHERE ID = @initiativeId)


	DECLARE @count int  
	SET @count =( SELECT Count( *) FROM 
				(
						  SELECT InitiativeCode FROM  v_NotPassValidateionHEader  WHERE InitiativeCode = @InitiativeCode
					UNION SELECT InitiativeCode FROM  v_OutOfRange  WHERE InitiativeCode = @InitiativeCode
					UNION SELECT InitiativeCode FROM  v_NotComplete  WHERE InitiativeCode = @InitiativeCode
					
					
				)  AS T)

	IF ( @count> 0  ) BEGIN SET @returnValue = 'false' END 


	DECLARE @count2 int 
	SET @count2 = (SELECT Count(*) FROM v_Initiatives WHERE IsCreatedApp = 1 AND IsCreatedWbs IS NULL AND InitiativeCode = @InitiativeCode )
	IF ( @count2 = 0  ) BEGIN SET @returnValue = 'false' END 


    SELECT @returnValue
END
GO
