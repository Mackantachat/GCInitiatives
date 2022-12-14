/****** Object:  StoredProcedure [dbo].[sp_FIX_Get_CAPEX_InitiativeStatusTrackingByInitiativeCode]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_Get_CAPEX_InitiativeStatusTrackingByInitiativeCode]
(
    -- Add the parameters for the stored procedure here
    @InitiativeCode AS NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SELECT DISTINCT
    NULL,
'Not Start',
ty.Stage,
CASE ty.Stage 
    WHEN 'DM' THEN DM.OwnerName
    WHEN 'VP' THEN VP.OwnerName
    WHEN 'EVP/MD/SEVP/COE/PSD/CEO' THEN EVP.OwnerName
    WHEN 'Budget Team' THEN budgetteam.OwnerName
    ELSE tsaOwnerName.OwnerName
END,
NULL,
ty.[Order] AS Sequence,
ini.InitiativeType AS ProcessType,
0 AS HistoryId,
ini.Id,
ty.[Order] AS RunningSequence,
ty.SubType
FROM v_Initiatives ini
INNER JOIN DetailInformations det ON ini.Id = det.InitiativeId
INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id )
INNER JOIN TypeStage ty ON ty.Type = ini.InitiativeType AND ty.SubType = dbo.fn_GetSubTypeFromCapexInformations(cap.CapexInformationId)
LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName
LEFT JOIN Owners DM ON DM.EmployeeID = CAST(COALESCE(own.DivManagerEmpID, own.DepManagerEmpID, own.FNManagerEmpID, own.FNGRPManagerEmpID, own.PSDManagerEmpID, own.CEOManagerEmpID) AS NVARCHAR(150))
LEFT JOIN Owners VP ON VP.OwnerName = det.President
LEFT JOIN Owners EVP ON EVP.EmployeeID = CAST(COALESCE(VP.FNManagerEmpID, VP.FNGRPManagerEmpID, VP.PSDManagerEmpID, VP.CEOManagerEmpID) AS NVARCHAR(150))
LEFT JOIN TypeStageApprover tsa ON tsa.Type = ty.Type AND tsa.SubType = ty.SubType
LEFT JOIN CommonData companyCode ON companyCode.DataType = 'company' AND (companyCode.Attribute01 = ini.Company OR  companyCode.Attribute03 = ini.Company)
LEFT JOIN CommonData budget ON budget.DataType = 'budgetanalyst' AND budget.Attribute03 = 'Y' AND budget.Attribute02 = companyCode.Attribute01
LEFT JOIN Owners budgetteam ON budgetteam.EmployeeID = budget.Attribute01
LEFT JOIN Owners tsaOwnerName ON tsaOwnerName.Email = tsa.Approver

WHERE ini.InitiativeCode = @InitiativeCode

ORDER BY ty.[Order]
END
GO
