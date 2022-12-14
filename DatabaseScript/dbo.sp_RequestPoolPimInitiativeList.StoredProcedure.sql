/****** Object:  StoredProcedure [dbo].[sp_RequestPoolPimInitiativeList]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO









CREATE PROCEDURE [dbo].[sp_RequestPoolPimInitiativeList]
(
    @organization NVARCHAR(50) = '' ,
	@plant NVARCHAR(50) = '' ,
	@gateName   NVARCHAR(50) = ''
	
)
as
BEGIN
	--SELECT a.id,a.name,a.OwnerName,a.TypeOfInvestment,a.TypeBenefit,b.Benefit,b.CostEstimate,a.stage,b.note,b.gate FROM v_Initiatives AS  a
	--JOIN pimgate AS b ON a.id=b.InitiativeId AND a.stage LIKE 'Gate2%' AND b.gate = 2
	
	with cte as
	(
	SELECT a.InitiativeCode,a.id,a.name,a.OwnerName,a.TypeOfInvestment,a.TypeBenefit,b.Benefit,b.CostEstimate,a.plant,a.Organization,
	isnull(a.stage,'') as Stage ,
	case 
	when isnull(a.stage,'') = 'GATE1 : PHASE2' then '1' 
	when isnull(a.stage,'') = 'GATE2 : CAPEX-1' then '2' 
	else ''
	end as stage1
	,b.note,b.gate FROM v_Initiatives AS  a
	JOIN pimgate AS b ON a.id=b.InitiativeId 
	where a.Stage in ('GATE1 : PHASE2','GATE2 : CAPEX-1'))
	
	select Id,InitiativeCode,name,OwnerName,TypeOfInvestment,TypeBenefit,Benefit,CostEstimate,Stage,Note,Gate from cte  
	where
	--stage1 = 1 and gate = 1 and Plant = plant and Organization = Organization
	(stage1 = 
	case when isnull(@gateName,'') = '' then stage1 
	else @gateName end
	and 
	gate = case when isnull(@gateName,'') = '' then gate 
	else @gateName end)
	and Plant = case when @plant  ='' then Plant 
	else @plant end
	--and
	--Organization = case when @organization =''  then Organization 
	--else @organization end

END
GO
