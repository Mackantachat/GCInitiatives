/****** Object:  View [dbo].[v_NotPassValidateionHEader]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 
CREATE view [dbo].[v_NotPassValidateionHEader] AS
  

 SELECT InitiativeCode from v_Initiatives 
 WHERE 
 NOT InitiativeCode IN
 (
		SELECT InitiativeCode 
		FROM v_if_WBS
		WHERE [LineNo] >=2 
		and [Project Definition] <> '' 
		and NOT [Project Definition] IS  NULl
		and NOT [Production/General Plant] IS  NULl
		and NOT [Physical Business Unit] IS  NULl 
		and NOT [Area/Panel No.] IS  NULl
		and NOT [Physical Business Unit] IS  NULl
 )

  


GO
