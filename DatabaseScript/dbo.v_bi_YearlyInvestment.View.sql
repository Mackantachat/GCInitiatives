/****** Object:  View [dbo].[v_bi_YearlyInvestment]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[v_bi_YearlyInvestment] AS
------> Y_Invest<--------
select * from (
	select InitiativeId,c.id as currency_id,toi.id as invest_id,i.[Year],Year1,AnnualInvestmentPlanId,CapexInformationId,CurrencyFx,PlanType from AnnualInvestmentPlans aip 
	left join Currency c on c.CurrencyTitle = aip.Currency 
	left join v_Initiatives i on i.Id = aip.InitiativeId 
	left join TypeOfInvestments toi on toi.TypeOfInvestmentId = i.TypeOfInvestment 
	
	UNION 
	
	select InitiativeId,c.id as currency_id,toi.id as invest_id,i.[Year] +1  ,Year2,AnnualInvestmentPlanId,CapexInformationId,CurrencyFx,PlanType from AnnualInvestmentPlans aip 
	left join Currency c on c.CurrencyTitle = aip.Currency 
	left join v_Initiatives i on i.Id = aip.InitiativeId 
	left join TypeOfInvestments toi on toi.TypeOfInvestmentId = i.TypeOfInvestment 
	
	UNION 
	
	select InitiativeId,c.id as currency_id,toi.id as invest_id,i.[Year] +2  ,Year3,AnnualInvestmentPlanId,CapexInformationId,CurrencyFx,PlanType from AnnualInvestmentPlans aip 
	left join Currency c on c.CurrencyTitle = aip.Currency 
	left join v_Initiatives i on i.Id = aip.InitiativeId 
	left join TypeOfInvestments toi on toi.TypeOfInvestmentId = i.TypeOfInvestment 
	
	UNION 
	
	select InitiativeId,c.id as currency_id,toi.id as invest_id,i.[Year] +3  ,Year4,AnnualInvestmentPlanId,CapexInformationId,CurrencyFx,PlanType from AnnualInvestmentPlans aip 
	left join Currency c on c.CurrencyTitle = aip.Currency 
	left join v_Initiatives i on i.Id = aip.InitiativeId 
	left join TypeOfInvestments toi on toi.TypeOfInvestmentId = i.TypeOfInvestment 
	
	UNION 
	
	select InitiativeId,c.id as currency_id,toi.id as invest_id,i.[Year] +4  ,Year5,AnnualInvestmentPlanId,CapexInformationId,CurrencyFx,PlanType from AnnualInvestmentPlans aip 
	left join Currency c on c.CurrencyTitle = aip.Currency 
	left join v_Initiatives i on i.Id = aip.InitiativeId 
	left join TypeOfInvestments toi on toi.TypeOfInvestmentId = i.TypeOfInvestment 
	
	UNION 
	
	select InitiativeId,c.id as currency_id,toi.id as invest_id,i.[Year] +5  ,Year6,AnnualInvestmentPlanId,CapexInformationId,CurrencyFx,PlanType from AnnualInvestmentPlans aip 
	left join Currency c on c.CurrencyTitle = aip.Currency 
	left join v_Initiatives i on i.Id = aip.InitiativeId 
	left join TypeOfInvestments toi on toi.TypeOfInvestmentId = i.TypeOfInvestment 
	
	UNION 
	
	select InitiativeId,c.id as currency_id,toi.id as invest_id,i.[Year] +6  ,Year7,AnnualInvestmentPlanId,CapexInformationId,CurrencyFx,PlanType from AnnualInvestmentPlans aip 
	left join Currency c on c.CurrencyTitle = aip.Currency 
	left join v_Initiatives i on i.Id = aip.InitiativeId 
	left join TypeOfInvestments toi on toi.TypeOfInvestmentId = i.TypeOfInvestment 
	
	UNION 
	
	select InitiativeId,c.id as currency_id,toi.id as invest_id,i.[Year] +7  ,Year8,AnnualInvestmentPlanId,CapexInformationId,CurrencyFx,PlanType from AnnualInvestmentPlans aip 
	left join Currency c on c.CurrencyTitle = aip.Currency 
	left join v_Initiatives i on i.Id = aip.InitiativeId 
	left join TypeOfInvestments toi on toi.TypeOfInvestmentId = i.TypeOfInvestment 
	
	UNION 
	
	select InitiativeId,c.id as currency_id,toi.id as invest_id,i.[Year] +8  ,Year9,AnnualInvestmentPlanId,CapexInformationId,CurrencyFx,PlanType from AnnualInvestmentPlans aip 
	left join Currency c on c.CurrencyTitle = aip.Currency 
	left join v_Initiatives i on i.Id = aip.InitiativeId 
	left join TypeOfInvestments toi on toi.TypeOfInvestmentId = i.TypeOfInvestment 
	
	UNION 
	
	select InitiativeId,c.id as currency_id,toi.id as invest_id,i.[Year] +9  ,Year10,AnnualInvestmentPlanId,CapexInformationId,CurrencyFx,PlanType from AnnualInvestmentPlans aip 
	left join Currency c on c.CurrencyTitle = aip.Currency 
	left join v_Initiatives i on i.Id = aip.InitiativeId 
	left join TypeOfInvestments toi on toi.TypeOfInvestmentId = i.TypeOfInvestment 
) as y_invest where [Year] IS NOT NULL
 

GO
