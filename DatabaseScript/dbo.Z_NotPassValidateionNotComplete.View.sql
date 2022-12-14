/****** Object:  View [dbo].[Z_NotPassValidateionNotComplete]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 
 
 
 
CREATE view [dbo].[Z_NotPassValidateionNotComplete] AS
 



 select   Initiative_NO from v_TempPlan
 WHERE Initiative_NO NOT IN
 (
		 select
		P.Initiative_NO
		from 
		Temp_Plan AS P
		WHERE (P.JAN  = '100' OR P.FEB  =  '100' OR P.MAR  =  '100'  OR P.APR  = '100' OR P.MAY  =  '100' OR P.JUN  =  '100'
		OR P.JUL  = '100' OR P.AUG  =  '100' OR P.SEP  = '100'  OR P.OCT  = '100' OR P.NOV  =  '100' OR P.DEC  =  '100' 
		)

		UNION
 
		 select
		P.Initiative_NO
		from 
		Temp_EPCC AS P
		WHERE (P.JAN  = '100' OR P.FEB  =  '100' OR P.MAR  =  '100'  OR P.APR  = '100' OR P.MAY  =  '100' OR P.JUN  =  '100'
		OR P.JUL  = '100' OR P.AUG  =  '100' OR P.SEP  = '100'  OR P.OCT  = '100' OR P.NOV  =  '100' OR P.DEC  =  '100' 
		)

)





GO
