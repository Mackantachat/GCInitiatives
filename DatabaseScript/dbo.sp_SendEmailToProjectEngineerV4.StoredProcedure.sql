/****** Object:  StoredProcedure [dbo].[sp_SendEmailToProjectEngineerV4]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[sp_SendEmailToProjectEngineerV4]
(
	@GetToday DateTime2
	,@GetEmail NVARCHAR(255)
)
AS
	SELECT 
	INI.Id AS [InitiativeId]
	,INI.InitiativeCode
	,INI.Name AS [InitiativeName]
	,DET.ProcessEngineer
	,DET.ProjectEngineer
	,OWNER.OwnerName
	,OWNER.Email AS Email
	,'<a href=https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoId=' + CONVERT(NVARCHAR(20),INI.Id)  +  '&gotoPage=edit> Click Here </a>' AS [URL_Link] 
	FROM v_Initiatives INI
	LEFT JOIN DetailInformations DET ON DET.InitiativeId = INI.Id
	LEFT JOIN CapexInformations CAP ON CAP.InitiativeId = INI.Id
	inner JOIN Owners OWNER ON 
	--OWNER.OwnerName = DET.ProcessEngineer 
	--OR 
	OWNER.OwnerName = DET.ProjectEngineer
	LEFT JOIN ProgressHeader PRO ON PRO.InitiativeId = INI.Id
	WHERE isnull(CAP.ProjecctComRun,ini.FinishingDate) > @GetToday and OWNER.Email = 'TIPAKORN.C@pttgcgroup.com'
	--and DET.ProcessEngineer is not null 
	and isnull(DET.ProjectEngineer,'') <> '' 
	and isnull(ini.RequestCapex,'false') = 'true'
	and PRO.WbsNo IS NOT NULL
	
--GO;
GO
