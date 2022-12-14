/****** Object:  StoredProcedure [dbo].[sp_ORG_Chart_Approval]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_ORG_Chart_Approval]
(
   @initiativeId VARCHAR(500),
   @InitiativeType NVARCHAR(200),
   @initiativeStage NVARCHAR(200),
   @initiativeStatus NVARCHAR(200), -- wait for approval , wait for cancellation, wait for submission, revised , draft
   @PositionApprover NVARCHAR(100) ---  DM VP EVP ------
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    
--  DepManagerEmpID   >>> DM
--  DivManagerEmpID   >>> VP
--  FNGRPManagerEmpID >>> EVP/MD/SEVP
--  FNManagerEmpID    >>> COE    -- อาจจะเป็น BudgetTeam
--  PSDManagerEmpID   >>> PSD 
--  CEOManagerEmpID   >>> CEO 

IF OBJECT_ID('tempdb..#tmpApprovers') IS NOT NULL
DROP TABLE #tmpApprovers

IF OBJECT_ID('tempdb..#tmpInitiativeOwner') IS NOT NULL
DROP TABLE #tmpInitiativeOwner


--SET @InitiativeType = 'directCapex';
DECLARE @Action NVARCHAR(200) = '';


DECLARE @OwnerEmail NVARCHAR(200) = '';
DECLARE @OwnerEmpId NVARCHAR(200) = '';
DECLARE @Position NVARCHAR(200) = '';

--SELECT  * FROM InitiativeActions order by id desc

IF (@initiativeStatus IN ('wait for approval','wait for cancellation'))
BEGIN
    SET @Position = 'approver'
    SET @Action = 'approve'
END

IF (@initiativeStatus IN ('revise','revised','draft','wait for submission','approved','admin check'))
BEGIN
    SET @Position = 'owner'
    SET @Action = 'add detail'
END

--------





DECLARE @isQueriedAndNotFound BIT = 0;
-- output
DECLARE @OutputApproverId NVARCHAR(200) = '';
DECLARE @OutputApproverEmail NVARCHAR(200) = '';
DECLARE @OutputApproverName NVARCHAR(200) = '';

SELECT 
    @OwnerEmail = own.Email,
    @OwnerEmpId = own.EmployeeID
FROM v_Initiatives ini
LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName
WHERE ini.Id = @InitiativeId

--temp this owner
SELECT * INTO #tmpInitiativeOwner FROM Owners WHERE EmployeeID = @OwnerEmpId

--Approvers Level < 40
SELECT * INTO #tmpApprovers FROM Owners WHERE PositionLevel <= 40
--SELECT * FROM #tmpApprovers






--SELECT @Stage, @Status, @OwnerEmail

--SELECT * FROM v_Initiatives 


    IF (@PositionApprover = 'DM' OR @isQueriedAndNotFound = 1)
        BEGIN
            SET @PositionApprover = 'DM'
            SELECT @OutputApproverId = own.DepManagerEmpID, @OutputApproverName = own.OwnerName , @isQueriedAndNotFound = 1 FROM #tmpInitiativeOwner own
        END

IF(@OutputApproverId <> '') GOTO returnApprover;

    IF (@PositionApprover = 'VP' OR @isQueriedAndNotFound = 1)
        BEGIN
            SET @PositionApprover = 'VP'
            SELECT @OutputApproverId = own.DivManagerEmpID, @isQueriedAndNotFound = 1 FROM #tmpInitiativeOwner own
        END
    
IF(@OutputApproverId <> '') GOTO returnApprover;

    IF (@PositionApprover IN ('EVP','MD','SEVP') OR @isQueriedAndNotFound = 1)
        BEGIN
            SET @PositionApprover = 'EVP/MD/SEVP/COE/PSD/CEO'
            SELECT @OutputApproverId = own.FNGRPManagerEmpID , @isQueriedAndNotFound = 1 FROM #tmpInitiativeOwner own
        END
     
IF(@OutputApproverId <> '') GOTO returnApprover;
      
    IF (@PositionApprover = 'COE' OR @isQueriedAndNotFound = 1)
        BEGIN
            SET @PositionApprover = 'EVP/MD/SEVP/COE/PSD/CEO'
            SELECT @OutputApproverId = own.FNManagerEmpID , @isQueriedAndNotFound = 1 FROM #tmpInitiativeOwner own
        END
    
IF(@OutputApproverId <> '') GOTO returnApprover;

    IF (@PositionApprover = 'PSD' OR @isQueriedAndNotFound = 1)
        BEGIN
            SET @PositionApprover = 'EVP/MD/SEVP/COE/PSD/CEO'
            SELECT @OutputApproverId = own.PSDManagerEmpID , @isQueriedAndNotFound = 1 FROM #tmpInitiativeOwner own
        END
    
IF(@OutputApproverId <> '') GOTO returnApprover;

    IF (@PositionApprover = 'CEO' OR @isQueriedAndNotFound = 1)
        BEGIN
            SET @PositionApprover = 'EVP/MD/SEVP/COE/PSD/CEO'
            SELECT @OutputApproverId = own.CEOManagerEmpID , @isQueriedAndNotFound = 1 FROM #tmpInitiativeOwner own
        END


returnApprover:


SELECT @OutputApproverEmail = Email, @OutputApproverName = OwnerName FROM #tmpApprovers WHERE EmployeeID = @OutputApproverId


--SELECT * FROM InitiativeACtions ORDER BY ID desc



------------------------------------------------------------------------------------------------------------------------


UPDATE Initiatives SET Stage = @PositionApprover, [Status] = @initiativeStatus WHERE Id = @InitiativeId

DELETE FROM InitiativeActions WHERE InitiativeId = @InitiativeId

INSERT INTO InitiativeActions (ActionBy ,[Action] ,Position ,[Status] ,Stage ,InitiativeId ,ActionByName)
SELECT 
    @OutputApproverEmail AS 'ActionBy',
    @Action AS 'Action',
    @Position AS 'Position',
    @initiativeStatus AS 'Status',
    @PositionApprover AS 'Stage',  --@initiativeStage AS 'Stage',
    @InitiativeId AS 'InitiativeId',
    @OutputApproverName AS 'ActionByName'
    

    --SELECT * FROM InitiativeACtions WHERE InitiativeId = @InitiativeId 
END
GO
