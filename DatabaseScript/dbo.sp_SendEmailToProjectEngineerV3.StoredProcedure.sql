/****** Object:  StoredProcedure [dbo].[sp_SendEmailToProjectEngineerV3]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_SendEmailToProjectEngineerV3]
(
	@GetToday DateTime2,
	@GetEmail NVARCHAR(255)
)
AS
	SELECT 
	INI.Id AS [InitiativeId]
	,INI.InitiativeCode
	,INI.Name AS [InitiativeName]
	,DET.ProcessEngineer
	,DET.ProjectEngineer
	,OWNER.OwnerName AS OwnerName
	,OWNER.Email AS Email
	,'<a href=https://gcinitiative-front-qa.azurewebsites.net/initiative/initiativeredirector?gotoId=' + CONVERT(NVARCHAR(20),INI.Id)  +  '&gotoPage=edit> Click Here </a>' AS [URL_Link] 
	FROM v_Initiatives INI
	LEFT JOIN DetailInformations DET ON DET.InitiativeId = INI.Id
	LEFT JOIN CapexInformations CAP ON CAP.InitiativeId = INI.Id
	LEFT JOIN Owners OWNER ON OWNER.OwnerName = DET.ProcessEngineer OR OWNER.OwnerName = DET.ProjectEngineer
	LEFT JOIN ProgressHeader PRO ON PRO.InitiativeId = INI.Id
	WHERE CAP.ProjecctComRun < @GetToday and OWNER.Email = @GetEmail and DET.ProcessEngineer is not null and DET.ProjectEngineer is not null
--GO;
GO
