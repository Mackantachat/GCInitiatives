/****** Object:  View [dbo].[v_TempDuplicateWBS]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 
CREATE view [dbo].[v_TempDuplicateWBS] AS

 
  
 select 
 ProgressHeader.WbsNo ,
 count(*) CNT
 from v_Initiatives 
 INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = v_Initiatives.ID
 where  ProgressHeader.WbsNo IS NOT NULL
 group  by  ProgressHeader.WbsNo
 having  count(*) > 1




GO
