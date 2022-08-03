/****** Object:  StoredProcedure [dbo].[SP_ORGAPPROVE_EP2_DM]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ORGAPPROVE_EP2_DM]
	@INIID			NVARCHAR(50),
	@ACTIONBY		NVARCHAR(50)
AS
BEGIN
	IF(@ACTIONBY = 'DM')
	BEGIN
		SELECT [ActionBy],[Action],[Position],[Status],[Stage],[InitiativeId] 
		FROM [dbo].[InitiativeActions]
		WHERE InitiativeId = @INIID
	END
END
GO
