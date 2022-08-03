/****** Object:  UserDefinedFunction [dbo].[SPE_CHR]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 

CREATE FUNCTION [dbo].[SPE_CHR](@value nvarchar(1000))
RETURNS nvarchar(1000)
AS
BEGIN

DECLARE @return  nvarchar(1000)

SET @return  = @return ;
SET @return  = REPLACE(@return,'@owner','Initiative Owner') ;
SET @return  = REPLACE(@return,'@creator','User ที่สร้าง Initiative') ;
SET @return  = REPLACE(@return,'@projecteng','Project Engineer') ;
SET @return  = REPLACE(@return,'@adminDIM','Admin DIM') ;


SET @return  = REPLACE(@return,'@VPBudget','VP ที่ถูกเลือกในหน้า Detail Information') ;
SET @return  = REPLACE(@return,'@BudgetTeam','BudgetTeam') ;

 









RETURN @return
 
END
GO
