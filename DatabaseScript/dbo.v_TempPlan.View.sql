/****** Object:  View [dbo].[v_TempPlan]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_TempPlan] AS
  

SELECT DISTINCT [Tobe Idea MANI Initiative] Initiative_No FROM [dbo].[Temp_WPMigration]
WHERE ISNULL([Project No Sap],'')<> ''
GO
