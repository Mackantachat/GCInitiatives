/****** Object:  View [dbo].[v_bi_TbMstEVP]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[v_bi_TbMstEVP] AS

select
o.Attribute01 as EVPID,
o.Attribute03 as EVP
from CommonData o 
where DataType = 'organization'
GO
