/****** Object:  View [dbo].[v_SAP_Budget]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 

CREATE view [dbo].[v_SAP_Budget]
AS
 
SELECT 
Project_Definition_Key
,SUM(Budget_Amount) Budget_Amount
FROM IF_Actual_PRPO 
GROUP BY Project_Definition_Key



GO
