/****** Object:  StoredProcedure [dbo].[sp_FIX_CalculatePoolAvailableBudget]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_CalculatePoolAvailableBudget]
(
    @initiativeId AS INT = -1
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    --SET NOCOUNT ON

    -- Insert statements for procedure here
	--SELECT 1;

    -- IF(@initiativeId = -1)
    -- BEGIN

        
         --SELECT
         --        ini.id
         --         ,ROW_NUMBER() OVER (ORDER BY ini.Id)      AS   [No]
         --         ,   cap.Revistion      AS   [Revision No]
         --         ,  cap.BudgetYear       AS   [Year]
         --         ,  ini.InitiativeCode       AS   [Initiative No]
         --         ,   ini.Name      AS   [Project Name]
         --         ,   ini.Organization      AS   [Organization]
         --         ,   cap.CodeCostCenterOfVP     AS   [Cost Center]
         --         ,   cap.ProjectCost      AS   [Total Budget]
         --         ,   budgetUsed.RealBudgetUsed      AS   [Budget Used]
         --         --,   dbo.fn_ReturnZeroIfLessThan(cap.ProjectCost - ISNULL(cap.AvailableBudget, 0) - ISNULL(budgetUsed.RealBudgetUsed, 0))    AS [Spending External Budget]
         --         ,   ISNULL(SpendingActualAllPrevious, 0)    AS [Spending External Budget]
         --         ,   cap.ProjectCost - ISNULL(budgetUsed.RealBudgetUsed, 0) - ISNULL(SpendingActualAllPrevious, 0)   AS   [Budget Available]
         --         , ISNULL(budgetUsed.RealBudgetUsed, 0) - ISNULL(SpendingActualAllPrevious, 0)  AS SpendingActual

             UPDATE cap SET cap.AvailableBudget = cap.ProjectCost - ISNULL(budgetUsed.RealBudgetUsed, 0) - ISNULL(SpendingActualAllPrevious, 0)
                     ,cap.SpendingActual = ISNULL(budgetUsed.RealBudgetUsed, 0) - ISNULL(SpendingActualAllPrevious, 0)

                  FROM
                  v_Initiatives ini
                  INNER JOIN CapexInformations cap ON cap.InitiativeId = ini.Id AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
             LEFT JOIN (
                        SELECT
                         PoolId, 
                         --SUM(cap.ProjectCost) AS RealBudgetUsed
                         SUM (CASE WHEN cap.CapexType = 'AddmoreCapex' THEN cap.AdditionalCost ELSE cap.ProjectCost END )  AS RealBudgetUsed
                         FROM v_Initiatives ini
                         INNER JOIN CapexInformations cap ON cap.InitiativeId = ini.Id --AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
                         WHERE 
                         --ISNULL(cap.PoolBudgetForm, '') <> '' AND 
                         ISNULL(ini.Stage, '') NOT IN ('','rejected','reject','cancelled','draft')
                         AND ISNULL(ini.Status, '') NOT IN ('revised', 'cancelled', 'rejected')
                         GROUP BY PoolId

                         ) budgetUsed ON budgetUsed.PoolId = ini.Id

             WHERE
             ini.InitiativeType = 'Request Pool'


    -- END
    -- ELSE
    -- BEGIN

        -- --SELECT
        -- --        ini.id
        -- --         ,ROW_NUMBER() OVER (ORDER BY ini.Id)      AS   [No]
        -- --         ,   cap.Revistion      AS   [Revision No]
        -- --         ,  cap.BudgetYear       AS   [Year]
        -- --         ,  ini.InitiativeCode       AS   [Initiative No]
        -- --         ,   ini.Name      AS   [Project Name]
        -- --         ,   ini.Organization      AS   [Organization]
        -- --         ,   cap.CodeCostCenterOfVP     AS   [Cost Center]
        -- --         ,   cap.ProjectCost      AS   [Total Budget]
        -- --         ,   budgetUsed.RealBudgetUsed      AS   [Budget Used]
        -- --         ,   dbo.fn_ReturnZeroIfLessThan(cap.ProjectCost - ISNULL(cap.AvailableBudget, 0) - ISNULL(budgetUsed.RealBudgetUsed, 0))    AS [Spending External Budget]
        -- --         ,   cap.ProjectCost - ISNULL(budgetUsed.RealBudgetUsed, 0) - dbo.fn_ReturnZeroIfLessThan(cap.ProjectCost - ISNULL(cap.AvailableBudget, 0) - ISNULL(budgetUsed.RealBudgetUsed, 0))     AS   [Budget Available]
     
            -- UPDATE cap SET cap.AvailableBudget = (cap.ProjectCost - ISNULL(budgetUsed.RealBudgetUsed, 0) - dbo.fn_ReturnZeroIfLessThan(cap.ProjectCost - ISNULL(cap.AvailableBudget, 0) - ISNULL(budgetUsed.RealBudgetUsed, 0)))
                    -- ,cap.SpendingActual = budgetUsed.RealBudgetUsed
                 -- FROM
                 -- v_Initiatives ini
                 -- INNER JOIN CapexInformations cap ON cap.InitiativeId = ini.Id AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
            -- LEFT JOIN (SELECT
                        -- PoolId, 
                        -- --SUM(cap.ProjectCost) AS RealBudgetUsed
                        -- SUM (CASE WHEN cap.CapexType = 'AddmoreCapex' THEN cap.AdditionalCost ELSE cap.ProjectCost END )  AS RealBudgetUsed
                        -- FROM v_Initiatives ini
                        -- INNER JOIN CapexInformations cap ON cap.InitiativeId = ini.Id --AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
                        -- WHERE ISNULL(cap.PoolBudgetForm, '') <> '' 
                        -- AND ISNULL(ini.Stage, '') NOT IN ('','rejected','cancelled','draft')
                        -- GROUP BY PoolId

                        -- ) budgetUsed ON budgetUsed.PoolId = ini.Id

            -- WHERE
            -- ini.InitiativeType = 'Request Pool'
            -- AND ini.Id = @initiativeId

    -- END
    

    




END
GO
