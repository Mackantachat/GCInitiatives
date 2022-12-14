/****** Object:  StoredProcedure [dbo].[sp_change_initaitive_code_format]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_change_initaitive_code_format]
AS
BEGIN
	UPDATE [dbo].[Initiatives]
	 SET InitiativeCode = SUBSTRING(RIGHT('000000000000000' + InitiativeCode, 10),1,6) + '/' + SUBSTRING(RIGHT('000000000000000' + InitiativeCode, 10),7,4)
 	WHERE Not InitiativeCode  like '%/%'
 
	SELECT *
	FROM [dbo].[v_Initiatives]

END
GO
