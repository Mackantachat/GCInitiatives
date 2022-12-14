/****** Object:  UserDefinedFunction [dbo].[FIRST_WORD]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[FIRST_WORD](@value nvarchar(1000))
RETURNS nvarchar(1000)
AS
BEGIN
RETURN CASE CHARINDEX(' ', @value, 1)
       WHEN 0
         THEN @value
       ELSE SUBSTRING(@value, 1, CHARINDEX(' ', @value, 1) - 1) END
 END
GO
