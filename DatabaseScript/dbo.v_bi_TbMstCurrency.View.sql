/****** Object:  View [dbo].[v_bi_TbMstCurrency]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[v_bi_TbMstCurrency] AS
select
c.Id as CurrencyID,
c.CurrencyTitle as CurrencyName
from dbo.Currency c 
GO
