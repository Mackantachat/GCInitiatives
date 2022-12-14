/****** Object:  View [dbo].[v_Operation_Warehouse_Plant_Mapping]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



  




CREATE view [dbo].[v_Operation_Warehouse_Plant_Mapping]
AS
  
SELECT   
Attribute16 AS [OperationPlant],
Attribute17 AS [WarehousePlant]
FROM [dbo].[CommonData]
WHERE [DataType] = 'plant'
AND NOT ( Attribute16  IS NULL)
AND NOT ( Attribute17  IS NULL)
GO
