/****** Object:  StoredProcedure [dbo].[sp_GetPermission]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
CREATE PROCEDURE [dbo].[sp_GetPermission]
(
    @Email nvarchar(255),
	@initiativeId INT
)
AS
BEGIN
     
 
 /*
 SELECT  RoleSettingDetail.*
 FROM   
 RoleSettingDetail 
 LEFT JOIN  UserRoles ON UserRoles.RoleId = RoleSettingDetail.RoleId 
 WHERE UserRoles.Email = @Email OR (UserRoles.RoleId = 'Owner' AND dbo.IsOwner(@Email,@initiativeId)=1)
 */
DECLARE @RowID	NVARCHAR(1024)

DECLARE @tbTmp AS TABLE(
	 Id				INT
	,PageId			NVARCHAR(2048)
	,SectionId		NVARCHAR(2048)
	,FieldName		NVARCHAR(2048)
	,IsVisible		Bit
	,IsEnable		Bit
	,IsIndividual	Bit
	,Parameter01	NVARCHAR(2048)
	,Parameter02	NVARCHAR(2048)
	,Parameter03	NVARCHAR(2048)
	,Parameter04	NVARCHAR(2048)
	,Parameter05	NVARCHAR(2048)
	,Parameter06	NVARCHAR(2048)
	,Parameter07	NVARCHAR(2048)
	,Parameter08	NVARCHAR(2048)
	,Parameter09	NVARCHAR(2048)
	,Parameter10	NVARCHAR(2048)
	,Parameter11	NVARCHAR(2048)
	,Parameter12	NVARCHAR(2048)
	,Parameter13	NVARCHAR(2048)
	,Parameter14	NVARCHAR(2048)
	,Parameter15	NVARCHAR(2048)
	,Parameter16	NVARCHAR(2048)
	,Parameter17	NVARCHAR(2048)
	,Parameter18	NVARCHAR(2048)
	,Parameter19	NVARCHAR(2048)
	,Parameter20	NVARCHAR(2048)
	,RoleId			NVARCHAR(2048)
	,RoleName		NVARCHAR(2048)
	,InitiativeType	NVARCHAR(2048)
	,[Priority]		INT
	,Stage			NVARCHAR(2048)
	,[Status]		NVARCHAR(2048)
	,TypeOfInvestment	NVARCHAR(2048)
	,PermissionMasterId		INT
)

insert into @tbTmp
Select * from RoleSettingDetail where PageId='Permission' and SectionId='Permission' and FieldName='Permission'

union all

Select * from RoleSettingDetail where SectionId='Default-Freeze'

union all

SELECT RoleSettingDetail.*  FROM UserRoles
INNER JOIN RolePermission ON  CONVERT(varchar,RolePermission.RoleId) =  CONVERT(varchar,UserRoles.RoleId)
INNER JOIN RoleSettingDetail ON RoleSettingDetail.PermissionMasterId = RolePermission.PermissionMasterId
WHERE UserRoles.Email = @Email OR (UserRoles.RoleId = 'Owner' AND dbo.IsOwner(@Email,@initiativeId)=1)

--select * from @tbTmp where PageId = 'impact' and (SectionId = N'Default-Freeze' or SectionId is null) and FieldName = 'haveShareBenefit'

-- Try to get First Record
SELECT @RowID = MIN(Id) FROM @tbTmp

WHILE @RowID <= (SELECT MAX(Id) FROM @tbTmp)
BEGIN
	
	declare @pageID			nvarchar(2048)
	declare @sectionID		nvarchar(2048)
	declare @fieldName		nvarchar(2048)

	select @pageID = PageId,@sectionID = SectionId,@fieldName = FieldName from @tbTmp where Id = @RowID

	if (select count(1) from @tbTmp where PageId = @pageID and (SectionId = @sectionID or SectionId is null) and FieldName = @fieldName) = 2 
	begin
	
		delete from @tbTmp where PageId = @pageID and SectionId = @sectionID and FieldName = @fieldName

	end

	-- Set next id
	Select @RowID = MIN(Id) From @tbTmp
	where Id > @RowID

END

select * from @tbTmp

--IF EXISTS (SELECT 1 FROM @tbTmp WHERE PageId = N'impact' AND SectionId = N'Default-Freeze' AND FieldName = N'haveShareBenefit')
--BEGIN
	
--	SELECT * FROM @tbTmp WHERE SectionId IS NULL

--END

--ELSE
--BEGIN
	
--	SELECT * FROM @tbTmp

--END
-- =========================================================

--Select * from RoleSettingDetail where PageId='Permission' and SectionId='Permission' and FieldName='Permission'

--union all

--Select * from RoleSettingDetail where SectionId='Default-Freeze'

--union all

--SELECT RoleSettingDetail.* FROM UserRoles
--INNER JOIN RolePermission ON  CONVERT(varchar,RolePermission.RoleId) =  CONVERT(varchar,UserRoles.RoleId)
--INNER JOIN RoleSettingDetail ON RoleSettingDetail.PermissionMasterId = RolePermission.PermissionMasterId
--WHERE UserRoles.Email = @Email OR (UserRoles.RoleId = 'Owner' AND dbo.IsOwner(@Email,@initiativeId)=1)


END

GO
