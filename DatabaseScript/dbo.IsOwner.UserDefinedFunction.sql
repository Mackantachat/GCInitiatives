/****** Object:  UserDefinedFunction [dbo].[IsOwner]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
CREATE FUNCTION [dbo].[IsOwner]
(
    @Email nvarchar(255),
    @initiativeId INT
 
)
RETURNS INT
AS
BEGIN
    return 1
END
GO
