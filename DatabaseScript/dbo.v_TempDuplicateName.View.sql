/****** Object:  View [dbo].[v_TempDuplicateName]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 
CREATE view [dbo].[v_TempDuplicateName] AS

 
  
 select Name ,
   count(*) CNT
 from v_Initiatives Initiatives
 where Initiatives.Name IS NOT NULL
 group  by  Name
 having  count(*) > 1




GO
