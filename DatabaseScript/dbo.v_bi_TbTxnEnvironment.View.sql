/****** Object:  View [dbo].[v_bi_TbTxnEnvironment]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_TbTxnEnvironment] AS
select
i.id as ProjectID,
null as ValidateComplaint
from dbo.v_Initiatives i

GO
