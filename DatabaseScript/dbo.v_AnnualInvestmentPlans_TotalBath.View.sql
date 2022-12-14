/****** Object:  View [dbo].[v_AnnualInvestmentPlans_TotalBath]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE view [dbo].[v_AnnualInvestmentPlans_TotalBath]
AS
SELECT        CapexInformationId, InitiativeId, SUM(ISNULL(CurrencyFx, 1) * Year1) AS Year1, SUM(ISNULL(CurrencyFx, 1) * Year2) AS Year2, SUM(ISNULL(CurrencyFx, 1) * Year3) AS Year3, 
                         SUM(ISNULL(CurrencyFx, 1) * Year4) AS Year4, SUM(ISNULL(CurrencyFx, 1) * Year5) AS Year5, SUM(ISNULL(CurrencyFx, 1) * Year6) AS Year6, SUM(ISNULL(CurrencyFx, 1) * Year7) AS Year7, 
                         SUM(ISNULL(CurrencyFx, 1) * Year8) AS Year8, SUM(ISNULL(CurrencyFx, 1) * Year9) AS Year9, SUM(ISNULL(CurrencyFx, 1) * Year10) AS Year10
FROM            dbo.AnnualInvestmentPlans an
WHERE PlanType = 'SumTotalBaht' 
GROUP BY InitiativeId, CapexInformationId
GO
