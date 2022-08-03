/****** Object:  View [dbo].[v_EmployeeName]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_EmployeeName]
AS
SELECT OwnerName,EmployeeId FROM (
SELECT ROW_NUMBER() OVER (PARTITION BY EmployeeId ORDER BY EmployeeId) AS rowNum, OwnerName,EmployeeId FROM Owners
GROUP BY  OwnerName,EmployeeId 
) a WHERE rowNum = 1


GO
