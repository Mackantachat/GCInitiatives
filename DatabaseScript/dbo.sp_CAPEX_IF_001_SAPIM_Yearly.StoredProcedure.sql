/****** Object:  StoredProcedure [dbo].[sp_CAPEX_IF_001_SAPIM_Yearly]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_IF_001_SAPIM_Yearly]
(
    -- Add the parameters for the stored procedure here
    @StartTime NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here

select 
--        ini.id AS [RID],
--        InitiativeCode AS [Initiative CAPEX No.],
--        --YEAR(RequestIniNoDate) + ROW_NUMBER() OVER (PARTITION BY ini.id ORDER BY AnnualInvestmentPlanId) AS [Year],
--        YEAR(ActionYear) + ROW_NUMBER() OVER (PARTITION BY ini.id ORDER BY AnnualInvestmentPlanId) AS [Year],
--        YearlyPlanAmount AS [Yearly Plan Amount],
--        Currency AS [Currency],
--        [CurrencyFx] AS [Exchange Rate]	
--from v_Initiatives ini	
--INNER JOIN TmpInitiativeIdIFs tmpIF ON tmpIF.InitiativeId = ini.Id AND tmpIF.IFType = 'IF001'
--inner join CapexInformations capex on capex.InitiativeId = ini.Id	
--inner join 	
--	(select initiativeid,AnnualInvestmentPlanId,YearlyPlanAmount,Currency,[CurrencyFx]
--	from  AnnualInvestmentPlans annual
--	UNPIVOT(YearlyPlanAmount for yearno in ([Year1],[Year2],[Year3],[Year4],[Year5],[Year6],[Year7],[Year8],[Year9],[Year10])) as pivotYear) annual
--on ini.id = annual.InitiativeId	
        ini.id AS [RID],
        --'0000' + InitiativeCode AS [Initiative CAPEX No.],-- พบปัญหาว่า เมื่อ Initiative code น้อยกว่า 11 หลัก ทำให้ไฟล์ส่งข้อมูลออกไปผิด
		dbo.PadLeft(Initiativecode,'0',15) AS [Initiative CAPEX No.],  -- New 29/3/2021
        --'00002020-000' + CAST(CAST(SUBSTRING(InitiativeCode, CHARINDEX('-',InitiativeCode) + 1,LEN(InitiativeCode)) AS INT) + 600 AS VARCHAR(150) )  AS [Initiative CAPEX No.],
        --YEAR(RequestIniNoDate) + (ROW_NUMBER() OVER (PARTITION BY ini.id ORDER BY AnnualInvestmentPlanId) - 1) AS [Year],
        YEAR(capex.ActionYear) + (ROW_NUMBER() OVER (PARTITION BY ini.id ORDER BY AnnualInvestmentPlanId) - 1) AS [Year],
        --Currency AS [Currency],
        'THB' AS [Currency],
        CASE WHEN YearlyPlanAmount = 0 THEN 0.00 ELSE YearlyPlanAmount END * 1000000 AS [Yearly Plan Amount],
        ISNULL([CurrencyFx], 1) AS [Exchange Rate]	
from v_Initiatives ini	
INNER JOIN TmpInitiativeIdIFs tmpIF ON tmpIF.InitiativeId = ini.Id AND tmpIF.IFType = 'IF001'
inner join CapexInformations capex on capex.InitiativeId = ini.id AND ISNULL(capex.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)	
inner join 	
	(select initiativeid,AnnualInvestmentPlanId,PlanType,CapexInformationId ,YearlyPlanAmount,Currency,[CurrencyFx]
	from  AnnualInvestmentPlans annual
	UNPIVOT(YearlyPlanAmount for yearno in ([Year1],[Year2],[Year3],[Year4],[Year5],[Year6],[Year7],[Year8],[Year9],[Year10])) as pivotYear WHERE PlanType = 'SumTotalBaht') annual
on ini.id = annual.InitiativeId AND capex.CapexInformationId = annual.CapexInformationId

WHERE CONVERT(VARCHAR(10), tmpIF.CreatedDate, 120) = @StartTime



END
GO
