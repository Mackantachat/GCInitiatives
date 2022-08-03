/****** Object:  View [dbo].[v_bi_TbMstCompany]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE view [dbo].[v_bi_TbMstCompany] AS
select
distinct 
cd.Attribute01 as CompanyID,
cd.Attribute03 as CompanyCode,
cd.Attribute02 as CompanyName,
cd.Attribute01  as ATOMsCompanyCode,
null as KBSCompany
from CommonData cd 
where cd.Attribute01 is not null and cd.DataType = 'company'
and cd.Attribute03  <> 'GCMP'
GO
