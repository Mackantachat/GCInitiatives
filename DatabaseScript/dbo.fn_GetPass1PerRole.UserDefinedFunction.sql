/****** Object:  UserDefinedFunction [dbo].[fn_GetPass1PerRole]    Script Date: 9/22/2021 6:29:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION [dbo].[fn_GetPass1PerRole]
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
    DECLARE @countApprover INT = -1;
    DECLARE @countApproved INT = -2;

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
        AND (ISNULL(ActionResult, '') IN ('approve','forward','backward','reject','revise','reject cancellation','approve cancellation'))   --- temporary add updateprogress for strategy
    HAVING COUNT(*) > 0

    -- Return the result of the function
	--krit edit 13-sep-2021 
    RETURN (SELECT 
			CASE 
			WHEN ISNULL(@countPermissionEdit,0) > 0 then 'true'
			WHEN @countApproved > 0 THEN 'true' 
			ELSE 'false' END)
END
GO