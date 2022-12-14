/****** Object:  UserDefinedFunction [dbo].[fn_GetPassAllPerRole]    Script Date: 9/22/2021 6:40:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION [dbo].[fn_GetPassAllPerRole]
(
    -- Add the parameters for the function here
    @initiativeId INT,
    @role NVARCHAR(150),
    @maxCounter INT,
    @stage NVARCHAR(150)
)
RETURNS NVARCHAR(50)
AS
BEGIN
    -- Declare the return variable here
    --delcare with diff value to always return false if condition failed

    DECLARE @initiativeType NVARCHAR(100) = ''
    DECLARE @requireDirectBenefit BIT = 'false' 
    DECLARE @requireIndirectBenefit BIT = 'false'

	--krit add 13-sep-2021
	 DECLARE @countPermissionEdit INT = -1;

	 SELECT
        @countPermissionEdit = COUNT(*)
    FROM 
        InitiativeActions 
    WHERE 
        InitiativeID = @initiativeId 
        AND Counter = @maxCounter 
        AND Stage = @stage
		AND ConditionType = 'permissionedit'
		AND (ISNULL(ActionResult, '') IN ('approve','forward','backward','cancelled','reject','revise','reject cancellation','approve cancellation'))
    HAVING COUNT(*) > 0
	--krit add 13-sep-2021
    
    
    
    SELECT @initiativeType = InitiativeType FROM v_Initiatives WHERE Id = @initiativeId
    SELECT @requireDirectBenefit = requireDirectBenefit, @requireIndirectBenefit = requireIndirectBenefit FROM DetailInformations WHERE InitiativeID = @initiativeId



    DECLARE @countApprover INT = -1;
    DECLARE @countApproved INT = -2;


    SELECT
        @countApprover = COUNT(*)
    FROM 
        InitiativeActions 
    WHERE 
        InitiativeID = @initiativeId 
        AND Counter = @maxCounter 
        AND Stage = @stage
        AND Position = @role
    HAVING COUNT(*) > 0


     SELECT
        @countApproved = COUNT(*)
    FROM 
        InitiativeActions 
    WHERE 
        InitiativeID = @initiativeId 
        AND Counter = @maxCounter 
        AND Stage = @stage
        AND Position = @role
        AND ISNULL(ActionResult, '') IN ('approve','forward','backward','reject','revise','reject cancellation','approve cancellation')
    HAVING COUNT(*) > 0


    
    
    -- Return the result of the function
    RETURN ( SELECT CASE 
					WHEN ISNULL(@countPermissionEdit,0) > 0 then 'true'
                    WHEN @role = '@sponsor' AND ISNULL(@initiativeType, '') = 'dim' AND ISNULL(@requireDirectBenefit, 'false') = 'false' THEN 'true'    /* add @2021-01-06 by oat  fix dim no sponsor approve if not require direct benefit */
                    WHEN @countApproved = @countApprover THEN 'true'                     
                    ELSE 'false' END
           )

END
GO