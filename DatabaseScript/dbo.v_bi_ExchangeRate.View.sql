/****** Object:  View [dbo].[v_bi_ExchangeRate]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_ExchangeRate] AS
select InitiativeId , i.FxExchange ,c.id from AnnualInvestmentPlans aip 
left join Currency c on c.CurrencyTitle = aip.Currency 
left join v_Initiatives i on i.Id = aip.InitiativeId 
GO
