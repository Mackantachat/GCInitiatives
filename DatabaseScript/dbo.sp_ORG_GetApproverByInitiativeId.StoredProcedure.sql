/****** Object:  StoredProcedure [dbo].[sp_ORG_GetApproverByInitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_ORG_GetApproverByInitiativeId]
(
   @initiativeId VARCHAR(500),
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

DECLARE @Action NVARCHAR(200) = '';


DECLARE @OwnerEmail NVARCHAR(200) = '';
DECLARE @OwnerEmpId NVARCHAR(200) = '';
DECLARE @Position NVARCHAR(200) = '';

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



    IF (@PositionApprover = 'DM')
        BEGIN
            SET @PositionApprover = 'DM'
            SELECT @OutputApproverId = own.DepManagerEmpID, @OutputApproverName = own.OwnerName FROM #tmpInitiativeOwner own
            GOTO returnApprover;
        END


    IF (@PositionApprover = 'VP')
        BEGIN
            SET @PositionApprover = 'VP'
            SELECT @OutputApproverId = own.DivManagerEmpID FROM #tmpInitiativeOwner own
            GOTO returnApprover;
        END
    

    IF (@PositionApprover IN ('EVP','MD','SEVP'))
        BEGIN
            SET @PositionApprover = 'EVP/MD/SEVP/COE/PSD/CEO'
            SELECT @OutputApproverId = own.FNGRPManagerEmpID FROM #tmpInitiativeOwner own
            GOTO returnApprover;
        END
     
      
    IF (@PositionApprover = 'COE')
        BEGIN
            SET @PositionApprover = 'EVP/MD/SEVP/COE/PSD/CEO'
            SELECT @OutputApproverId = own.FNManagerEmpID FROM #tmpInitiativeOwner own
            GOTO returnApprover;
        END
    

    IF (@PositionApprover = 'PSD')
        BEGIN
            SET @PositionApprover = 'EVP/MD/SEVP/COE/PSD/CEO'
            SELECT @OutputApproverId = own.PSDManagerEmpID FROM #tmpInitiativeOwner own
            GOTO returnApprover;
        END
    

    IF (@PositionApprover = 'CEO')
        BEGIN
            SET @PositionApprover = 'EVP/MD/SEVP/COE/PSD/CEO'
            SELECT @OutputApproverId = own.CEOManagerEmpID FROM #tmpInitiativeOwner own
            GOTO returnApprover;
        END


returnApprover:


SELECT @OutputApproverEmail = Email, @OutputApproverName = OwnerName FROM #tmpApprovers WHERE EmployeeID = @OutputApproverId



------------------------------------------------------------------------------------------------------------------------

--INSERT INTO InitiativeActions (ActionBy ,[Action] ,Position ,[Status] ,Stage ,InitiativeId ,ActionByName)
SELECT 
    @InitiativeId AS 'InitiativeId',
    @PositionApprover AS 'Stage',
    @OutputApproverEmail AS 'ActionBy',
    @OutputApproverName AS 'ActionByName'    


END
GO
