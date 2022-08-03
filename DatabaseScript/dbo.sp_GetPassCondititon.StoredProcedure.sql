/****** Object:  StoredProcedure [dbo].[sp_GetPassCondititon]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetPassCondititon]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT,
    @flowType NVARCHAR(150),
    @passConditition NVARCHAR(300)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    SELECT TOP 1 * INTO #tmpThisInitiative FROM v_Initiatives WHERE Id = @initiativeId

    DECLARE @returnIsPass NVARCHAR(50) = 'false'
    DECLARE @returnIsSkip NVARCHAR(50) = 'false'

    DECLARE @nowStage AS NVARCHAR(150) = ''
    DECLARE @nowStatus AS NVARCHAR(150) = ''

    IF(@flowType != 'initiative')
    BEGIN
        SELECT TOP 1 @nowStage = Stage FROM InitiativeStage WHERE InitiativeId = @initiativeId AND FlowType = @flowType
        SELECT TOP 1 @nowStatus = Status FROM InitiativeStage WHERE InitiativeId = @initiativeId AND FlowType = @flowType
    END
    ELSE
    BEGIN
        SELECT TOP 1 @nowStage = Stage FROM #tmpThisInitiative
        SELECT TOP 1 @nowStatus = Status FROM #tmpThisInitiative
    END

    DECLARE @amount AS DECIMAL(18,4) = (SELECT TOP 1 BenefitAmount FROM #tmpThisInitiative)

    DECLARE @maxCounterInitiativeActions INT = 0;
    SELECT @maxCounterInitiativeActions = ISNULL(Counter, 0) FROM InitiativeActions WHERE InitiativeID = @initiativeId AND Stage = @nowStage AND FlowType = @flowType
    SELECT * INTO #tmpNowInitiativeAction FROM InitiativeActions WHERE InitiativeID = @initiativeId AND Stage = @nowStage AND Counter = @maxCounterInitiativeActions

    --#skipbod|@1perrole

    IF (@passConditition LIKE '#%') --start with '#' meaning is skip condition
    BEGIN
        SELECT dbo.fn_GetSkipCondition(@initiativeId, @passConditition, @flowType);
    END
    ELSE IF (@passConditition = '@submit')
        BEGIN
            IF(@nowStatus IN ('finish','complete','reject','rejected','cancelled')) 
            BEGIN
                IF(@flowType = 'initiative') SELECT 'false' 
                IF(@flowType <> 'initiative') SELECT 'true' 
            END                
            ELSE IF(@nowStage IS NULL) 
            BEGIN
                SELECT 'true';
            END
            ELSE
            BEGIN            


                SELECT dbo.fn_GetPass1PerRole(MAX(InitiativeId), MAX(Position), MAX(Counter), MAX(Stage)) AS isPass  FROM #tmpNowInitiativeAction GROUP BY Position ORDER BY CASE WHEN dbo.fn_GetPass1PerRole(MAX(InitiativeId), MAX(Position), MAX(Counter), MAX(Stage)) = 'false' THEN 1 ELSE 2 END
            END
        END
    ELSE IF (@passConditition = '@1perrole')
        BEGIN

            SELECT dbo.fn_GetPass1PerRole(MAX(InitiativeId), MAX(Position), MAX(Counter), MAX(Stage)) AS isPass  FROM #tmpNowInitiativeAction GROUP BY Position ORDER BY CASE WHEN dbo.fn_GetPass1PerRole(MAX(InitiativeId), MAX(Position), MAX(Counter), MAX(Stage)) = 'false' THEN 1 ELSE 2 END

        END    
    ELSE IF (@passConditition LIKE '@allperrole%')
    BEGIN
            SELECT dbo.fn_GetPassAllPerRole(MAX(InitiativeId), dbo.fn_GetStringInbracket(@passConditition), MAX(Counter), MAX(Stage)) AS isPass  FROM #tmpNowInitiativeAction ORDER BY CASE WHEN dbo.fn_GetPassAllPerRole(MAX(InitiativeId), MAX(Position), MAX(Counter), MAX(Stage)) = 'false' THEN 1 ELSE 2 END
    END    
    ELSE IF (@passConditition = '@3')
    BEGIN
        SELECT 'false';
    END
    ELSE
        BEGIN
            SELECT 'false';
        END





END
GO
