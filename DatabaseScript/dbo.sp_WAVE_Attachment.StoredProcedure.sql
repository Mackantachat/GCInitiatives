/****** Object:  StoredProcedure [dbo].[sp_WAVE_Attachment]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_WAVE_Attachment]
@IniCode NVARCHAR(100),
@FileName NVARCHAR(500),
@Name NVARCHAR(500)
AS
BEGIN
	declare @iniCodeCheck as varchar (50)
	set @iniCodeCheck = (select [ID] from [dbo].[v_Initiatives] where [InitiativeCode] = @inicode)
	if(@iniCodeCheck is not null)
	BEGIN
		INSERT INTO [dbo].[Attachments] ([Name],[InitiativeId],[FileName],[CreatedDate],[ContentType],[Extension])
		VALUES (@Name,@iniCodeCheck,@FileName,getdate(),'image/jpeg','.png')
	END
END
GO
