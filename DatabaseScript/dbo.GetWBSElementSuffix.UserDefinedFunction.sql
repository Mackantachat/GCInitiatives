/****** Object:  UserDefinedFunction [dbo].[GetWBSElementSuffix]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 
 
CREATE FUNCTION [dbo].[GetWBSElementSuffix]
		(@TypeOfProgressPlanDate 	 	nvarchar(255))
RETURNS		VARCHAR(8000)
AS
BEGIN
	DECLARE	@OutputText  	nvarchar(255)


	SET @OutputText = 
	CASE WHEN UPPER(@TypeOfProgressPlanDate) = 'ENGINEER'	THEN '-W'
		 WHEN UPPER(@TypeOfProgressPlanDate) = 'ENGINEERING'	THEN '-W'
	     WHEN UPPER(@TypeOfProgressPlanDate) = 'PROCUREMENT'	THEN '-X'
		 WHEN UPPER(@TypeOfProgressPlanDate) = 'CONSTRUCTION'	THEN '-Y'
		 WHEN UPPER(@TypeOfProgressPlanDate) = 'COMMISSIONING'	THEN '-Z'
		 ELSE '' END 


 
	RETURN	@OutputText
END
GO
