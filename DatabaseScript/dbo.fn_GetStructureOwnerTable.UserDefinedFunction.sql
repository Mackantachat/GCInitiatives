/****** Object:  UserDefinedFunction [dbo].[fn_GetStructureOwnerTable]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[fn_GetStructureOwnerTable]
()
RETURNS TABLE
AS
RETURN 

	-- Add the SELECT statement with parameter references here
	SELECT * FROM Owners WHERE 1=0

GO
