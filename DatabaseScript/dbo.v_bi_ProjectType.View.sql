/****** Object:  View [dbo].[v_bi_ProjectType]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_ProjectType] AS

select
id as ProjectID, 
TypeOfInvestmentTitle as ProjectTypeName
from TypeOfInvestments toi 
GO
