/****** Object:  View [dbo].[Z_NotHaveAppReq]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 
 
 
CREATE view [dbo].[Z_NotHaveAppReq] AS
 


 select * from v_TempPlan 
 WHERE 
 NOT Initiative_No IN
 ( 
		select  RIGHT(Column2,11)  from [dbo].[IncomingFileData]
		where  [fileName] = 'IM-CPO-MappingCapexAppWbs.txt'
		and Column9 <> '' 

 )

 


GO
