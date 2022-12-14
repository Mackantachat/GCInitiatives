/****** Object:  StoredProcedure [dbo].[sp_GetButtonEdit]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_GetButtonEdit]
(
      @email NVARCHAR(255),
	  @initiativeId NVARCHAR(255)
)
AS
BEGIN

	--DECLARE @email NVARCHAR(255) = 'THAMMATAD.A@FRONTISCOMPANY.COM';
	--DECLARE @initiativeId NVARCHAR(255) = '43309';
	DECLARE @QueryString NVARCHAR(MAX);


  SET @QueryString = 
'
SELECT 
ROW_NUMBER() OVER(ORDER BY INI.Id) AS rowNumber  
,INI.ID AS InitiativeId
,INI.InitiativeCode AS InitiativeCode
,INI.[Name] AS InitiativeName
,INI.OwnerName AS [Owner]
,DET.Workstream as Workstream
,OwnerAssignTo.OwnerName AS AssignTo
,INI.RegisteringDate AS RegisterDate
,INI.UpdatedDate AS UpdatedDate
,INI.Organization AS Organization
,INI.InitiativeType AS InitiativeType
,INI.Company AS Company
,UPPER(INI.Stage) AS Stage
,UPPER(INI.[Status]) AS [Status]  
FROM v_Initiatives INI 
INNER JOIN OWNERS ON UPPER(OWNERS.OwnerName) = UPPER(INI.OwnerName)  
LEFT JOIN CapexInformations CAP ON CAP.InitiativeId = INI.Id
LEFT JOIN DetailInformations DET ON DET.InitiativeId = INI.Id 
LEFT JOIN v_FirstNextAction  ACT ON ACT.InitiativeId = INI.Id AND ACT.ActionResult IS NULL  
LEFT JOIN OWNERS OwnerAssignTo ON OwnerAssignTo.Email = ACT.ActionBy
LEFT JOIN InitiativeCoDevelopers CODEV ON CODEV.InitiativeId = INI.ID AND OWNERS.OwnerName = CODEV.CoDeveloperName 
LEFT JOIN RequestEmoc ON RequestEmoc.InitiativeId = INI.ID
LEFT JOIN ProgressHeader ON ProgressHeader.InitiativeId = INI.ID
WHERE (1<>1)
';



DECLARE  @AdditionalCondition nvarchar(255)

SET @AdditionalCondition = 
(
SELECT Parameter01
FROM RoleSettingDetail 
INNER JOIN RoleDetailSetting ON CONVERT(nvarchar(255),RoleDetailSetting.Id ) = CONVERT(nvarchar(255),RoleSettingDetail.RoleId)
INNER JOIN UserRoles ON  CONVERT(nvarchar(255),UserRoles.RoleId) =   CONVERT(nvarchar(255),RoleDetailSetting.Id ) 
WHERE
RoleSettingDetail.PageID = 'OVERVIEW'
AND RoleSettingDetail.SectionId = 'EDITxxx'
AND UPPER(UserRoles.Email) = UPPER(@email)
)

 SET @QueryString =  @QueryString +   + ISNULL('OR (' + @AdditionalCondition + ')','') + ' AND  INI.ID = '+@initiativeId
 


 EXEC(@QueryString)


END
GO
