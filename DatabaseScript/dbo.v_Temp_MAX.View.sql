/****** Object:  View [dbo].[v_Temp_MAX]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_Temp_MAX] AS
 
select  * from v_Initiatives
where LEFT(InitiativeCode,5) IN ('0000-' )
 
  
GO
