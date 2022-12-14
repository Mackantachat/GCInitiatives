/****** Object:  StoredProcedure [dbo].[sp_CAPEX_IF_001_SAPIM_Monthly]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_IF_001_SAPIM_Monthly]
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
convert(varchar,getdate(),104) AS [Generate Date],
--ini.Id + 500 AS [Request ID], --test
ini.Id AS [Request ID],
--'0000' + InitiativeCode AS [Initiative CAPEX No.], -- พบปัญหาว่า เมื่อ Initiative code น้อยกว่า 11 หลัก ทำให้ไฟล์ส่งข้อมูลออกไปผิด
dbo.PadLeft(Initiativecode,'0',15) AS [Initiative CAPEX No.],  -- New 29/3/2021
--'00002020-000' + CAST(CAST(SUBSTRING(InitiativeCode, CHARINDEX('-',InitiativeCode) + 1,LEN(InitiativeCode)) AS INT) + 600 AS VARCHAR(150) )  AS [Initiative CAPEX No.],
YearOfMonth AS [Fiscal Year],
ISNULL(Jan, 0.00) AS [Total Value in Object Currency1],
ISNULL(Feb, 0.00) AS [Total Value in Object Currency2],
ISNULL([Mar], 0.00) AS [Total Value in Object Currency3],
ISNULL([Apr], 0.00) AS [Total Value in Object Currency4] ,
ISNULL([May], 0.00) AS [Total Value in Object Currency5] ,
ISNULL([Jun], 0.00) AS [Total Value in Object Currency6] ,
ISNULL([Jul], 0.00) AS [Total Value in Object Currency7] ,
ISNULL([Aug], 0.00) AS [Total Value in Object Currency8]
,ISNULL([Sep], 0.00) AS [Total Value in Object Currency9]
,ISNULL([Oct], 0.00) AS [Total Value in Object Currency10]
,ISNULL([Nov], 0.00) AS [Total Value in Object Currency11]
,ISNULL([Dec], 0.00) AS [Total Value in Object Currency12]
from MonthlyInvestmentPlans mt
inner join v_Initiatives ini on ini.id = mt.InitiativeId
inner join CapexInformations capex on capex.InitiativeId = ini.id AND ISNULL(capex.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)	 AND mt.CapexInformationId = capex.CapexInformationId
INNER JOIN TmpInitiativeIdIFs tmpIF ON tmpIF.InitiativeId = ini.Id AND tmpIF.IFType = 'IF001'

WHERE CONVERT(VARCHAR(10), tmpIF.CreatedDate, 120) = @StartTime


END
GO
