/****** Object:  UserDefinedFunction [dbo].[fn_MaxApproverWithIndicator_DIM]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION [dbo].[fn_MaxApproverWithIndicator_DIM]
(
    -- Add the parameters for the function here
    @initiativeType NVARCHAR(300),
    @nowStage NVARCHAR(300),
    @approverType NVARCHAR(300)
)
RETURNS INT
AS
BEGIN
    -- Declare the return variable here
    DECLARE @returnValue INT = 0

    -- Add the T-SQL statements to compute the return value here
    
    IF (@initiativeType = 'max')
    BEGIN
        IF (@nowStage = 'SIL1' AND @approverType IN ('TOTeam', 'WorkstreamLead'))
        BEGIN
            SET @returnValue = 1
        END
        ELSE IF (@nowStage = 'SIL2' AND @approverType IN ('TF-BT-TO', 'WorkstreamLead', 'TO Finance'))
        BEGIN
            SET @returnValue = 1
        END
        ELSE IF (@nowStage = 'SIL3' AND @approverType IN ('CTO', 'Sponsor', 'TO Finance'))
        BEGIN
            SET @returnValue = 1
        END
        ELSE IF (@nowStage = 'SIL4' AND @approverType IN ('CTO', 'Sponsor', 'TOFinanceIL4'))
        BEGIN
            SET @returnValue = 1
        END
        ELSE IF (@nowStage = 'SIL5' AND @approverType IN ('CTO', 'Sponsor', 'TOFinanceIL5'))
        BEGIN
            SET @returnValue = 1
        END
        ELSE 
        BEGIN
            SET @returnValue = 0
        END
    END
    ELSE
    BEGIN
        SET @returnValue = 1
    END

	 IF (@initiativeType = 'dim' AND  @nowStage = 'Ideate SIL2 - Reviewing' AND @approverType NOT IN ('TF-BT-TO', 'WorkstreamLead', 'TO Finance'))
     BEGIN
		SET @returnValue = 0
     END
	 IF (@initiativeType = 'dim' AND  @nowStage = 'Implement SIL3' AND @approverType NOT IN ('Sponsor', 'CTO', 'TO Finance'))
     BEGIN
		SET @returnValue = 0
     END
	 IF (@initiativeType = 'dim' AND  @nowStage = 'Adopt SIL4' AND @approverType NOT IN ('Sponsor', 'CTO'))
     BEGIN
		SET @returnValue = 0
     END
	 IF (@initiativeType = 'dim' AND  @nowStage = 'Adopt SIL5' AND @approverType NOT IN ('Sponsor', 'CTO'))
     BEGIN
		SET @returnValue = 0
     END
	 	

	 	

     

    -- Return the result of the function
    RETURN @returnValue
END
GO
