/****** Object:  View [dbo].[v_InvestmentType]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  




CREATE view [dbo].[v_InvestmentType]
AS
  
SELECT   
Attribute01 AS [ID],
Attribute02 AS [NAME]
FROM [dbo].[CommonData]
WHERE [DataType] = 'typeofinvestment'
  

GO
