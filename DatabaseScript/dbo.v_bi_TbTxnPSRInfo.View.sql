/****** Object:  View [dbo].[v_bi_TbTxnPSRInfo]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO









 
CREATE VIEW [dbo].[v_bi_TbTxnPSRInfo] AS
select
distinct
i.id as ProjectID,
i.RegisteringDate as RegisteredDate,
o.EmployeeID as [Initiator],
o.EmployeeID + ' ' + [dbo].[fn_OwnerDispByEmail](o.email) as InitiatorByDisp,
o.EmployeeID as Approver,
o.EmployeeID + ' ' + [dbo].[fn_OwnerDispByEmail](o.email) as ApproverDisp,
Convert(nvarchar(2000),null) as UnitNo,
i.JFactor as JFactor,
i.PayBackPeriod as SimpPaybackYear,
i.Irr as IRR,
null as PriorityID,
i.StartingDate as KickoffDate,
case
	when i.TypeOfInvestment = 'Engineering Request ER' then 2
	else 1
end as ProposeBudgetID,

Convert(nvarchar(255),null) as HazopLeader,
Convert(nvarchar(255),null) as HazopLeaderDisp,
Convert(datetime,null) as HazopDate,
Convert(datetime,null) as PSSRPlan,
Convert(datetime,null) as PSSRDate,
Convert(datetime,null) as LookbackDate,
Convert(nvarchar(1000),null) as Note, 
Convert(float,null) as BenefitVG

from dbo.Initiatives i 
left join Owners o on o.OwnerName = i.OwnerName 
left join DetailInformations di on di.InitiativeId = i.Id 
GO
