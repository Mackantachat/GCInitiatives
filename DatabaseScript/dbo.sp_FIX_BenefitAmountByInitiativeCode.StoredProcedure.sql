/****** Object:  StoredProcedure [dbo].[sp_FIX_BenefitAmountByInitiativeCode]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_BenefitAmountByInitiativeCode]
(
    @InitiativeCode AS NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
        UPDATE ini
        SET 
        ini.BenefitAmount = ISNULL(imp.TotalOnetime, 0) + ISNULL(imp.TotalRecurring, 0)
        --,ini.PaybackPeriod = (ini.CostEstOpex + ini.CostEstCapex) / ini.BenefitAmount
        FROM v_Initiatives ini
        INNER JOIN ImpactTrackings imp ON ini.Id = imp.InitiativeId
        WHERE ini.InitiativeCOde = @InitiativeCode



END
GO
