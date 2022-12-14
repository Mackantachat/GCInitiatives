/****** Object:  View [dbo].[v_CAPEX_InvestmentPlan]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



 

CREATE view [dbo].[v_CAPEX_InvestmentPlan]
AS
 
SELECT			PH.InitiativeId
				,SUM(PO.Budget_Amount) AS SUMProjectCost 
				,SUM(PO.Actual) AS SUMActual
				,SUM(CASE WHEN RIGHT(PO.Period,4) = '2021' THEN PO.ACTUAL   ELSE 0 END) AS ACTUAL_THIS
				,SUM(CASE WHEN RIGHT(PO.Period,4) <> '2021' THEN PO.ACTUAL   ELSE 0 END) AS ACTUAL_PREVIOUS
FROM			[IF_Actual_PRPO] PO
INNER JOIN		ProgressHeader PH ON PH.WbsNo = PO.Project_Definition_Key
GROUP BY PH.InitiativeId
 
GO
