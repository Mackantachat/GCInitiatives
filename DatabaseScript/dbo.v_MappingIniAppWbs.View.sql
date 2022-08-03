/****** Object:  View [dbo].[v_MappingIniAppWbs]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 

CREATE view [dbo].[v_MappingIniAppWbs]
AS

 
SELECT 
Initiatives.ID AS InitiativeID
,Initiatives.InitiativeCode
,ProgressHeader.AppropriationNo AS AppropriationNo
,ProgressHeader.WbsNo
,InitiativeType
FROM	
v_Initiatives Initiatives
LEFT JOIN  ProgressHeader ON ProgressHeader.InitiativeId = Initiatives.ID

GO
