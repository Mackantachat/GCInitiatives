/****** Object:  UserDefinedFunction [dbo].[fn_GetOrgChartApproverByPosition]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetOrgChartApproverByPosition]
(
	@initiativeId INT,
    @position NVARCHAR(150)
)
RETURNS
@returnEmails TABLE 
(
	-- Add the column definitions for the TABLE variable here
	Email NVARCHAR(300)
)
AS
BEGIN
	


    --  DivManagerEmpID   >>> DM
--  DepManagerEmpID   >>> VP
--  FNGRPManagerEmpID >>> EVP/MD/SEVP
--  FNManagerEmpID    >>> COE    -- อาจจะเป็น BudgetTeam
--  PSDManagerEmpID   >>> PSD 
--  CEOManagerEmpID   >>> CEO 

DECLARE @Action NVARCHAR(200) = '';

DECLARE @OwnerName NVARCHAR(200) = '';
DECLARE @OwnerEmail NVARCHAR(200) = '';
DECLARE @OwnerEmpId NVARCHAR(200) = '';

--------




 
DECLARE @isQueriedAndNotFound BIT = 0; 
-- output
DECLARE @OutputApproverId NVARCHAR(200) = '';
DECLARE @OutputApproverEmail NVARCHAR(200) = '';
DECLARE @budgetTeamEmployeeId NVARCHAR(300)= '';
DECLARE @initiativetype NVARCHAR(300) = (select initiativetype from v_initiatives where id = @initiativeId);
--
SELECT TOP 1
	@OwnerName = ini.OwnerName,
    @OwnerEmail = own.Email,
    @OwnerEmpId = own.EmployeeID,
    @budgetTeamEmployeeId = budgetanalyst.Attribute01
FROM v_Initiatives ini
LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName
LEFT JOIN CommonData com ON com.DataType = 'company' AND (com.Attribute01 = ini.Company OR com.Attribute03 = ini.Company )
LEFT JOIN CommonData budgetAnalyst ON budgetAnalyst.DataType = 'budgetanalyst' AND budgetanalyst.Attribute03 = 'Y' AND budgetanalyst.Attribute02 = com.Attribute01
WHERE ini.Id = @InitiativeId

-- Nok เพิ่ม
DECLARE @President1 NVARCHAR(300) = (SELECT President FROM InitiativeDetails WHERE InitiativeId = @initiativeId)
         DECLARE @President2 NVARCHAR(300) = (SELECT President FROM DetailInformations WHERE InitiativeId = @initiativeId)
		 Declare @president3 NVARCHAR(300) = (SELECT TOP 1 CostCenterOfVP FROM CapexInformations WHERE InitiativeId = @initiativeId AND ISNULL(Sequent, 0 ) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = @initiativeId))
		 DECLARE @Presidentid NVARCHAR(300) = (select TOP 1 EmployeeID from Owners WHERE OwnerName = CASE WHEN ISNULL(@President1, '') <> '' 
		 THEN @President1
		 when ISNULL(@President2, '') <> '' THEN @President2
		 when ISNULL(@President3, '') <> '' THEN @President3
		 ELSE @OwnerName
		 END);


IF (@position = 'BudgetTeam') --Budget Team
        BEGIN
            SELECT @OutputApproverId = @budgetTeamEmployeeId
            GOTO returnApprover;
        END


IF (@position = 'DM' OR @isQueriedAndNotFound = 1)
        BEGIN

        /* oat ADD @ 2021-01-14  case ER use approver from plant */
            IF(   EXISTS(SELECT TOP 1 ini.InitiativeCode 
                        FROM v_Initiatives ini          
                        LEFT JOIN CapexInformations cap ON cap.InitiativeId = ini.Id AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
                        WHERE ini.Id = @initiativeId
                        AND isnull(ini.initiativetype,'') = 'directCapex' 
                        AND (isnull(ini.TypeOfInvestment, '') = 'Engineering Request ER' OR ISNULL(ini.BudgetSource, '') = 'ER' OR ISNULL(cap.PoolBudgetForm, '') = 'ER')
                    )
                )
            BEGIN
            /* find AU TEAM Approver by Plant  */
                SELECT @OutputApproverId = (SELECT DISTINCT TOP 1 own.EmployeeID
                                            FROM v_Initiatives ini 
                                            LEFT JOIN CommonData com ON com.DataType = 'plant' AND com.Attribute07 = ini.Plant
                                            LEFT JOIN Owners own ON own.Email = com.Attribute10
                                            WHERE 
                                                ini.Id = @initiativeId
                                                AND com.Id IS NOT NULL
                                                AND ISNULL(own.EmployeeID, '') NOT IN ('-','')
                                            )
            END
            ELSE
            BEGIN
                SELECT @OutputApproverId = own.DivManagerEmpID, @isQueriedAndNotFound = 1 FROM Owners own WHERE EmployeeID = @OwnerEmpId
            END

            IF(ISNULL(@OutputApproverId, '') = '')
            BEGIN
                SELECT @OutputApproverId = own.DivManagerEmpID, @isQueriedAndNotFound = 1 FROM Owners own WHERE EmployeeID = @OwnerEmpId
            END


        END


        --BEGIN
        --    SELECT @OutputApproverId = own.DivManagerEmpID, @isQueriedAndNotFound = 1 FROM Owners own WHERE EmployeeID = @OwnerEmpId
        --END

--IF(@OutputApproverId <> '') GOTO returnApprover;

--    IF (@position = 'VP' OR @isQueriedAndNotFound = 1)
--        BEGIN
--            SELECT @OutputApproverId = own.DepManagerEmpID, @isQueriedAndNotFound = 1 FROM Owners own WHERE EmployeeID = @OwnerEmpId
--        END
IF(@OutputApproverId <> '') GOTO returnApprover;

    IF ((@position = 'VP' OR @isQueriedAndNotFound = 1) and @initiativetype = 'Request Pool')
        BEGIN
		  SELECT @OutputApproverId = @Presidentid , @isQueriedAndNotFound = 1 FROM Owners  ;

        END
IF(@OutputApproverId <> '') GOTO returnApprover;

	IF ((@position = 'VP' OR @isQueriedAndNotFound = 1) and @initiativetype <> 'Request Pool')
	   BEGIN
          SELECT @OutputApproverId = own.DepManagerEmpID, @isQueriedAndNotFound = 1 FROM Owners own WHERE EmployeeID = @OwnerEmpId
        END
-- Nok แก้ไข ให้ EVP ดึงมาจาก EVP ของ VP 2020-12-07-------------------------------------
--IF(@OutputApproverId <> '') GOTO returnApprover;

--    IF (@position IN ('EVP','MD','SEVP') OR @isQueriedAndNotFound = 1)
--        BEGIN
--            SELECT @OutputApproverId = own.FNManagerEmpID , @isQueriedAndNotFound = 1 FROM Owners own WHERE EmployeeID = @OwnerEmpId
--        END
-- Nok แก้ไข ให้ EVP ดึงมาจาก EVP ของ VP 2020-12-07-------------------------------------
		IF(@OutputApproverId <> '') GOTO returnApprover;

    IF (@position IN ('EVP','MD','SEVP') OR @isQueriedAndNotFound = 1)
        BEGIN
		         SELECT @OutputApproverId = own.FNManagerEmpID , @isQueriedAndNotFound = 1 FROM Owners own WHERE EmployeeID = @Presidentid
        END
-- Nok แก้ไข ให้ EVP ดึงมาจาก EVP ของ VP 2020-12-07--------------------------------------
IF(@OutputApproverId <> '') GOTO returnApprover;
      
    IF (@position = 'COE' OR @isQueriedAndNotFound = 1)
        BEGIN
            SELECT @OutputApproverId = own.FNGRPManagerEmpID , @isQueriedAndNotFound = 1 FROM Owners own WHERE EmployeeID = @OwnerEmpId
        END


    
IF(@OutputApproverId <> '') GOTO returnApprover;

    IF (@position = 'PSD' OR @isQueriedAndNotFound = 1)
        BEGIN
            SELECT @OutputApproverId = own.PSDManagerEmpID , @isQueriedAndNotFound = 1 FROM Owners own WHERE EmployeeID = @OwnerEmpId
        END
    
IF(@OutputApproverId <> '') GOTO returnApprover;

    IF (@position = 'CEO' OR @isQueriedAndNotFound = 1)
        BEGIN
            SELECT @OutputApproverId = own.CEOManagerEmpID , @isQueriedAndNotFound = 1 FROM Owners own WHERE EmployeeID = @OwnerEmpId
        END



returnApprover:




------------------------------------------------------------------------------------------------------------------------

INSERT INTO @returnEmails (Email)
SELECT TOP 1 
    Email
FROM Owners approverReturn
WHERE EmployeeId = @OutputApproverId







	RETURN 
END
GO
