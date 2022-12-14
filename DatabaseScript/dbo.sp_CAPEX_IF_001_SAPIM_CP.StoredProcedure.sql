/****** Object:  StoredProcedure [dbo].[sp_CAPEX_IF_001_SAPIM_CP]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_IF_001_SAPIM_CP]
(
    -- Add the parameters for the stored procedure here    
    @StartTime NVARCHAR(20)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
        select 
            --'0000' + InitiativeCode AS [Initiative CAPEX No.], -- พบปัญหาว่า เมื่อ Initiative code น้อยกว่า 11 หลัก ทำให้ไฟล์ส่งข้อมูลออกไปผิด
			 dbo.PadLeft(Initiativecode,'0',15) AS [Initiative CAPEX No.],  -- New 29/3/2021
            --'00002020-000' + CAST(CAST(SUBSTRING(InitiativeCode, CHARINDEX('-',InitiativeCode) + 1,LEN(InitiativeCode)) AS INT) + 600 AS VARCHAR(150) )   AS [Initiative CAPEX No.],
            ResultObjective AS [Objective]
        from v_Initiatives ini
        INNER JOIN TmpInitiativeIdIFs tmpIF ON tmpIF.InitiativeId = ini.Id AND tmpIF.IFType = 'IF001'
        WHERE             
            CONVERT(VARCHAR(10), tmpIF.CreatedDate, 120) = @StartTime
END


GO
