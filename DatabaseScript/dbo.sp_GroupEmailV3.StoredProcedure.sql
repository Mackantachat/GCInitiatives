/****** Object:  StoredProcedure [dbo].[sp_GroupEmailV3]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GroupEmailV3]
(
	@GetToday DateTime2
	--,@GetEmail NVARCHAR(255)
)
AS
	SELECT 
	OWNER.OwnerName AS OwnerName
	,OWNER.Email AS Email
	FROM v_Initiatives INI
	LEFT JOIN DetailInformations DET ON DET.InitiativeId = INI.Id
	LEFT JOIN CapexInformations CAP ON CAP.InitiativeId = INI.Id
	LEFT JOIN Owners OWNER ON OWNER.OwnerName = DET.ProcessEngineer OR OWNER.OwnerName = DET.ProjectEngineer
	LEFT JOIN ProgressHeader PRO ON PRO.InitiativeId = INI.Id
	WHERE CAP.ProjecctComRun < @GetToday and DET.ProcessEngineer is not null and DET.ProjectEngineer is not null
	Group BY OWNER.OwnerName,OWNER.Email
--GO;
GO
