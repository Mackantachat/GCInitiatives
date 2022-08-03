/****** Object:  View [dbo].[Z_NotPassValidateionHEader]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 
 
 
CREATE view [dbo].[Z_NotPassValidateionHEader] AS
 


 select * from v_TempPlan 
 WHERE 
 NOT Initiative_No IN
 (
		select InitiativeCode from v_if_WBS
		where [LineNo] >=2 
		and  InitiativeCode IN (SELECT Initiative_NO FROm  v_TempPlan )  
		and [Project Definition] <> '' 
		and NOT [Project Definition] IS  NULl
		and NOT [Production/General Plant] IS  NULl
		and NOT [Physical Business Unit] IS  NULl 
		and NOT [Area/Panel No.] IS  NULl
		and NOT [Physical Business Unit] IS  NULl
 )







GO
