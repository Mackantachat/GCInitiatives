/****** Object:  StoredProcedure [dbo].[SP_GROUPAPPROVAL]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_GROUPAPPROVAL]
	@EMPID			NVARCHAR(50),
	@INIID			NVARCHAR(50),
	@APPROVAL		NVARCHAR(50)
AS
BEGIN
	DECLARE @APPROVALLIST NVARCHAR(50)
	SET @APPROVALLIST = (SELECT EmployeeID FROM [Employee] WHERE EmployeeID IN( SELECT VALUE FROM string_split('111,222,333,444',',')))
	--ทำ temp table สำหรับเก็บค่า แล้ววนลูบ while สำหรับเพื่อ insert ข้อมูลเข้า database
    
END
GO
