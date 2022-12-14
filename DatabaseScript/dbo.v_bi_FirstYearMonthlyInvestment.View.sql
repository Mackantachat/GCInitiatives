/****** Object:  View [dbo].[v_bi_FirstYearMonthlyInvestment]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_FirstYearMonthlyInvestment] AS


select * from 
(
select
aip.InitiativeId as ProjectID,
aip.Currency ,
1 as 'InvestmentMonth',
mip.Jan as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.Jan is not null and i2.id is not null

UNION 


select
aip.InitiativeId as ProjectID,
aip.Currency ,
2 as 'InvestmentMonth',
mip.Feb as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.Feb is not null and i2.id is not null

UNION 


select
aip.InitiativeId as ProjectID,
aip.Currency ,
3 as 'InvestmentMonth',
mip.Mar as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.Mar is not null and i2.id is not null

UNION 


select
aip.InitiativeId as ProjectID,
aip.Currency ,
4 as 'InvestmentMonth',
mip.Apr as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.Apr is not null and i2.id is not null

UNION 


select
aip.InitiativeId as ProjectID,
aip.Currency ,
5 as 'InvestmentMonth',
mip.May as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.May is not null and i2.id is not null

UNION 


select
aip.InitiativeId as ProjectID,
aip.Currency ,
6 as 'InvestmentMonth',
mip.Jun as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.Jun is not null and i2.id is not null	

UNION 


select
aip.InitiativeId as ProjectID,
aip.Currency ,
7 as 'InvestmentMonth',
mip.Jul as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.Jul is not null and i2.id is not null	

UNION 


select
aip.InitiativeId as ProjectID,
aip.Currency ,
8 as 'InvestmentMonth',
mip.Aug as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.Aug is not null and i2.id is not null	

UNION 

select
aip.InitiativeId as ProjectID,
aip.Currency ,
9 as 'InvestmentMonth',
mip.Sep as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.Sep is not null and i2.id is not null	

UNION 

select
aip.InitiativeId as ProjectID,
aip.Currency ,
10 as 'InvestmentMonth',
mip.Oct as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.Oct is not null and i2.id is not null	

UNION 

select
aip.InitiativeId as ProjectID,
aip.Currency ,
11 as 'InvestmentMonth',
mip.Nov as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.Nov is not null and i2.id is not null


UNION 

select
aip.InitiativeId as ProjectID,
aip.Currency ,
12 as 'InvestmentMonth',
mip.[Dec] as Investment,
mip.InvestmentCost ,
mip.InvestmentCostFx ,
mip.YearOfMonth ,
mip.CapexInformationId 
from AnnualInvestmentPlans aip 
left join MonthlyInvestmentPlans mip on aip.AnnualInvestmentPlanId = mip.AnnualInvestmentPlanId
left join v_Initiatives i2 on i2.Id = aip.InitiativeId 
left join Currency c2 on c2.CurrencyTitle = aip.Currency 
where i2.[Year] = mip.YearOfMonth or mip.[Dec] is not null and i2.id is not null
) as table_temp
GO
