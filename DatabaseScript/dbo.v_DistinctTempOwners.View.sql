/****** Object:  View [dbo].[v_DistinctTempOwners]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 
 
 
CREATE view [dbo].[v_DistinctTempOwners] AS
 
 
 
 SELECT * FROM TEMP_OWNERS 
 WHERE  Email IN 
 ( 
 SELECT Email FROM TEMP_OWNERS 
 WHERE MainPositionFLg = 1  AND EmploymentStatusTxt = 'Active' 
 GROUP BY Email
 HAVING Count(*) = 1
 )
 AND MainPositionFLg = 1  AND EmploymentStatusTxt = 'Active' 

 UNION

 
 
 SELECT * FROM TEMP_OWNERS 
 WHERE ID IN
 (
 SELECT 
 ID FROM 
 (

 
			 SELECT  
			 ID,
			 Email,
			 ROW_NUMBER() OVER( PARTITION BY Email  ORDER BY ID  desc ) AS rowNumber  
			 FROM Temp_Owners
			 WHERE Email IN
			 (
  
					SELECT    Email   
					FROM  Temp_Owners 
					WHERE MainPositionFLg = 1  AND EmploymentStatusTxt = 'Active' 
					AND Email <> ''
					GROUP  BY Email
					HAVING COUNT(*) > 1
			 )
			 
			 AND	MainPositionFLg = 1
 
 ) AS T

 WHERE T.rowNumber = 1

 )




GO
