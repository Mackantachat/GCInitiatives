/****** Object:  View [dbo].[v_Company]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 


CREATE view [dbo].[v_Company]
AS
  

SELECT   
Attribute01 AS [ID],
Attribute02 AS [NAME],
Attribute03 AS [ShortName],
Attribute04 AS [LongName]
FROM [dbo].[CommonData]
WHERE [DataType] = 'company'
  
  

GO
