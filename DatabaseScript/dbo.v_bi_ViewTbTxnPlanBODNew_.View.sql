/****** Object:  View [dbo].[v_bi_ViewTbTxnPlanBODNew_]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_ViewTbTxnPlanBODNew_] as 
select 
	'20140921' as TransactionDate
	,'2014' as Year
	,'B1' as Version
	,'1310-THB01-01-01-01-002' as AppropriationRequestNo
	,'CA-1031-13701' as CAPEXRequestOnlineNo
	,'450000000' as OriginalBudget
	,'450000000' as CurrentY0
	,'0' as CurrentY1
	,'0' as CurrentY2
	,'0' as CurrentY3
	,'' as CurrentY4
	,'' as CurrentY5
	,'' as CurrentY6
	,'' as CurrentY7
	,'' as CurrentY8
	,'' as CurrentY10
	,'' as CurrentY9
	,'' as FutureRemainYear
	,'150000000' as PlanBODJan
	,'150000000' as PlanBODMar
	,'' as PlanBODApr
	,'150000000' as PlanBODFeb
	,'' as PlanBODMay
	,'' as PlanBODJun
	,'' as PlanBODJul
	,'' as PlanBODAug
	,'' as PlanBODSep
	,'' as PlanBODNov
	,'' as PlanBODOct
	,'' as PlanBODDec
	,'THB' as Currency
	,'10' as CurrencyType
FROM v_Initiatives i
left join CommonData cd on cd.Attribute03 = i.Company and cd.DataType = 'company'
left join DetailInformations di on i.Id = di.InitiativeId
left join Owners o on o.OwnerName = di.ProjectManager

GO
