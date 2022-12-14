/****** Object:  View [dbo].[v_NotComplete]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 
 
 
 
CREATE view [dbo].[v_NotComplete] AS
 
 
 SELECT  InitiativeCode from v_Initiatives
 WHERE InitiativeCode NOT IN
 (
		select
		I.InitiativeCode
		from 
		ProgressPlan AS P
		INNER JOIN v_Initiatives I ON  I.Id =  P.InitiativeId  
		WHERE
		(P.PlanActual = 'Plan') AND 
		(P.JAN  = '100' OR P.FEB  =  '100' OR P.MAR  =  '100'  OR P.APR  = '100' OR P.MAY  =  '100' OR P.JUN  =  '100'
		OR P.JUL  = '100' OR P.AUG  =  '100' OR P.SEP  = '100'  OR P.OCT  = '100' OR P.NOV  =  '100' OR P.DEC  =  '100' )

	  
)





GO
