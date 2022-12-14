/****** Object:  UserDefinedFunction [dbo].[fn_GetPositionfromPlantOwner]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetPositionfromPlantOwner]
(
	-- Add the parameters for the function here
	@initiativeId INT,
    @position NVARCHAR(150)
)
RETURNS 
@returnemail TABLE 
(
	-- Add the column definitions for the TABLE variable here
	Email NVARCHAR(300)
)
AS
BEGIN
	-- Fill the table variable with the rows for your result set
	declare @OutputApprover nvarchar(300)
    declare @projectmanager nvarchar(300)
	declare @projectmanagerchoose nvarchar(300)
    declare @PMO nvarchar(300)
    declare @AU nvarchar(300)
    declare @DM nvarchar(300)

    select 
	distinct
	top 1
    @projectmanager = a.Attribute18 ,
	@projectmanagerchoose = pm.Email,
    @PMO = a.Attribute19 ,
    @AU = a.Attribute10,
	@DM = dm.Email
    from v_Initiatives ini
    left join CommonData a
    on a.DataType = 'plant' and (a.Attribute07 = ini.Plant or a.Attribute01 = ini.Plant) and isnull(a.Attribute07,'') <> ''
	left join detailinformations det
	on ini.id = det.initiativeid
	left join owners dm
	on det.Manager = dm.OwnerName
	left join owners pm
	on det.ProjectManager = pm.OwnerName
    where ini.id = @initiativeId

	IF (@position = 'Projectmanager') --Project Team
		BEGIN
		IF (isnull(@projectmanager,'') = '') 
		BEGIN	
			Select @OutputApprover = (select * from fn_GetOrgChartApproverByPosition (@initiativeid,'DM'))
		end
		else

			SELECT @OutputApprover = @projectmanager
        END
	IF(@OutputApprover <> '') GOTO returnApprover;

	IF (@position = 'PMO') --PMO
        BEGIN
		IF (isnull(@PMO,'') = '') 
		BEGIN	
			Select @OutputApprover = 'PIYAWAN.A@PTTGCGROUP.COM'
		end
		else
            SELECT @OutputApprover = @PMO
        END
	IF(@OutputApprover <> '') GOTO returnApprover;

	IF (@position = 'AU') --AU
	    BEGIN
		IF (isnull(@AU,'') = '') 	
        BEGIN
			Select @OutputApprover = @DM 
		end
		Else
            SELECT @OutputApprover = @AU
        END

	IF(@OutputApprover <> '') GOTO returnApprover;

	returnApprover:
-----------------------------------------------
INSERT INTO @returnemail (EMAIL)
values (@OutputApprover);


	RETURN 

END
GO
