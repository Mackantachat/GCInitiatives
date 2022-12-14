/****** Object:  StoredProcedure [dbo].[sp_GroupEmailV4]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[sp_GroupEmailV4]
(
	@GetToday DateTime2
	--,@GetEmail NVARCHAR(255)
)
AS
	SELECT 
	OWNER.OwnerName
	,OWNER.Email AS Email
	FROM v_Initiatives INI
	LEFT JOIN DetailInformations DET ON DET.InitiativeId = INI.Id
	LEFT JOIN CapexInformations CAP ON CAP.InitiativeId = INI.Id
	inner JOIN Owners OWNER ON 
	--OWNER.OwnerName = DET.ProcessEngineer OR 
	OWNER.OwnerName = DET.ProjectEngineer
	LEFT JOIN ProgressHeader PRO ON PRO.InitiativeId = INI.Id
	WHERE isnull(CAP.ProjecctComRun,ini.FinishingDate) > @GetToday
	--and DET.ProcessEngineer is not null 
	and isnull(DET.ProjectEngineer,'') <> '' 
	and isnull(ini.RequestCapex,'false') = 'true'
	and PRO.WbsNo IS NOT NULL
	Group by OWNER.OwnerName ,OWNER.Email
--GO;
GO
