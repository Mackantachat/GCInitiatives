/****** Object:  StoredProcedure [dbo].[sp_FIX_CAPEX_AnnualSumTotalMissing]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_CAPEX_AnnualSumTotalMissing]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    INSERT INTO AnnualInvestmentPlans (CapexInformationId, Year1, Year2, Year3, Year4, Year5, Year6, Year7, Year8, Year9, Year10
	, YearOverall, InitiativeId, CurrencyFx, Currency, PlanType)
        SELECT a.CapexInformationId, a.YEAR1, a.Year2, a.Year3, a.Year4, a.Year5, a.Year6, a.Year7, a.year8, a.Year9, a.Year10
	        , a.YearOverall, a.InitiativeId, a.CurrencyFx, a.Currency, 'SumTotalBaht' AS PlanType
        FROM AnnualInvestmentPlans a 
        INNER JOIN v_Initiatives i ON i.id=a.InitiativeId
        WHERE PlanType = 'TotalBahtbyRevision' AND i.InitiativeCode in (
	        SELECT i.InitiativeCode
	        FROM AnnualInvestmentPlans a
	        INNER JOIN v_Initiatives i ON a.InitiativeId=i.Id
	        WHERE InitiativeId NOT IN(
		        SELECT a.InitiativeId
		        FROM AnnualInvestmentPlans a
		        INNER JOIN v_Initiatives i on a.InitiativeId=i.Id
		        WHERE (a.PlanType = 'SumTotalBaht')
		        AND (i.Status NOT IN ('draft','reject','cancelled'))
	        )
	        AND PlanType IS NOT NULL
	        AND (i.Status NOT IN ('draft','reject','cancelled'))
        )

END
GO
