/****** Object:  View [dbo].[v_TempPlan_X]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_TempPlan_X] AS
 SELECT distinct Initiative_No FROM 
(

select Initiative_No from Temp_EPCC
UNION 
select Initiative_No from Temp_Plan 
 ) AS T
 
 where   Initiative_No in (SELECT InitiativeCOde from v_Initiatives) 
  
GO
