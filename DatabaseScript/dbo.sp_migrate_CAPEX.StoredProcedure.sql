/****** Object:  StoredProcedure [dbo].[sp_migrate_CAPEX]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_migrate_CAPEX]
AS
BEGIN
------------------------------------------------------------------------------
	UPDATE [dbo].[Initiatives]
	SET --InitiativeType		=	'directCapex',
		RequestCapex		=	'true',
		CostEstCapexType	=	'THB',
		--DirectCapex			=	'1',
		CreatedDate			=	StartingDate,
		CreatedBy			=	OwnerName,
		--Status				=	'approved',
		RequestOpex			=	'falseOpex'
	--where InitiativeCode like '%CP%' or InitiativeCode like '%CIM%'
	

	update [dbo].[CapexInformations] 
	set ProjectExePeriodYear= DATEDIFF(year,RequestIniNoDate,ProjecctComRun),
	ProjectExePeriodmonth= DATEDIFF(month,RequestIniNoDate,ProjecctComRun)  
	from [dbo].[CapexInformations] capex
	inner join [dbo].[v_Initiatives] ini on ini.id = capex.InitiativeId 
	where Initiativecode like '%CP%' or InitiativeCode like '%CIM%'

	update [dbo].[Initiatives]
	set Divestment = 0
	where InitiativeCode like '%CP%' or InitiativeCode like '%CIM%'

	update [dbo].[Initiatives]
	set BudgetSource = 'Capex'
	where TypeOfInvestment != 'Engineering Request (ER)'

	update [dbo].[Initiatives]
	set BudgetSource = 'ER'
	where TypeOfInvestment = 'Engineering Request (ER)'

	update [dbo].[Initiatives]
	set year = datepart(year from StartingDate)
	where InitiativeCode like '%CP%' or InitiativeCode like '%CIM%'

	UPDATE [dbo].[Initiatives]
	set InitiativeCode = right('000000' + convert(varchar(11), substring(InitiativeCode, len(InitiativeCode) - (len(InitiativeCode) - charindex('-', InitiativeCode)) + 1, len(InitiativeCode) - charindex('-', InitiativeCode))), 11)

	

end
GO
