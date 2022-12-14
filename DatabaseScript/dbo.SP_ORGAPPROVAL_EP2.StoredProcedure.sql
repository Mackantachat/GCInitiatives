/****** Object:  StoredProcedure [dbo].[SP_ORGAPPROVAL_EP2]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_ORGAPPROVAL_EP2] 
	@INIID			NVARCHAR(50),
	@ACTIONBY		NVARCHAR(50),
	@ACTION			NVARCHAR(50),
	@STATUS			NVARCHAR(50),
	@STAGE			NVARCHAR(50)
AS
BEGIN
	--CHECK ACTIONBY (POSITION)
	IF(@ACTIONBY = 'DM')
	BEGIN
	--CREATE TEMP TABLE
		DECLARE @TEMP_DM TABLE
		(
			ROWID INT	IDENTITY(1,1),
			APPROVE_ACTIONBY		NVARCHAR(30),
			APPROVE_POSITION		NVARCHAR(30)
		)
		--INSERT DATA INTO TEMP TABLE
		INSERT INTO @TEMP_DM (APPROVE_ACTIONBY,APPROVE_POSITION)
		SELECT  [EmailAddress],[PositionShortTextEN]
		FROM	[dbo].[Employee] EMP1
		WHERE	EMP1.[EmployeeID] IN (SELECT  [DivEmployeeID]
				FROM [dbo].[Employee]  EMP
				INNER JOIN [dbo].[v_Initiatives] INID ON INID.InitiativeOwnerID = EMP.EmployeeID
				WHERE INID.[InitiativeID] = @INIID)

		--INSERT DATA FROM TEAMP TABLE INTO INITIATIVEACTION
		INSERT INTO [dbo].[InitiativeActions] ([Id],[ActionBy],[Action],[Position],[Status],[Stage],[InitiativeId])
		SELECT ROWID,APPROVE_ACTIONBY,@ACTION,APPROVE_POSITION,@STATUS,@STAGE,@INIID
		FROM @TEMP_DM
	END

	ELSE IF(@ACTIONBY = 'VP')
	BEGIN
		DECLARE @TEMP_VP TABLE
		(
			ROWID INT	IDENTITY(1,1),
			APPROVE_ACTIONBY		NVARCHAR(30),
			APPROVE_POSITION		NVARCHAR(30)
		)
		INSERT INTO @TEMP_VP (APPROVE_ACTIONBY,APPROVE_POSITION)
		SELECT  [EmailAddress],[PositionShortTextEN]
		FROM	[dbo].[Employee] EMP1
		WHERE	EMP1.[EmployeeID] IN (SELECT  [DepEmployeeID]
				FROM [dbo].[Employee]  EMP
				INNER JOIN [dbo].[Initiatives] INID ON INID.InitiativeOwnerID = EMP.EmployeeID
				WHERE INID.[InitiativeID] = @INIID)

		INSERT INTO [dbo].[InitiativeActions] ([Id],[ActionBy],[Action],[Position],[Status],[Stage],[InitiativeId])
		SELECT ROWID,APPROVE_ACTIONBY,@ACTION,APPROVE_POSITION,@STATUS,@STAGE,@INIID
		FROM @TEMP_VP

	END

	ELSE IF(@ACTIONBY = 'EVP')
	BEGIN
		DECLARE @TEMP_EVP TABLE
		(
			ROWID INT	IDENTITY(1,1),
			APPROVE_ACTIONBY		NVARCHAR(30),
			APPROVE_POSITION		NVARCHAR(30)
		)
		INSERT INTO @TEMP_EVP (APPROVE_ACTIONBY,APPROVE_POSITION)
		SELECT  [EmailAddress],[PositionShortTextEN]
		FROM	[dbo].[Employee] EMP1
		WHERE	EMP1.[EmployeeID] IN (SELECT  [DepEmployeeID]
				FROM [dbo].[Employee]  EMP
				INNER JOIN [dbo].[Initiatives] INID ON INID.InitiativeOwnerID = EMP.EmployeeID
				WHERE INID.[InitiativeID] = @INIID)

		INSERT INTO [dbo].[InitiativeActions] ([Id],[ActionBy],[Action],[Position],[Status],[Stage],[InitiativeId])
		SELECT ROWID,APPROVE_ACTIONBY,@ACTION,APPROVE_POSITION,@STATUS,@STAGE,@INIID
		FROM @TEMP_EVP

	END

	ELSE IF(@ACTIONBY = 'OWNER')
	BEGIN
		DECLARE @TEMP_OWNER TABLE
		(
			ROWID INT	IDENTITY(1,1),
			APPROVE_ACTIONBY		NVARCHAR(30),
			APPROVE_POSITION		NVARCHAR(30)
		)
		INSERT INTO @TEMP_OWNER (APPROVE_ACTIONBY,APPROVE_POSITION)
		SELECT  [EmailAddress],[PositionShortTextEN]
		FROM	[dbo].[Employee] EMP1
		WHERE	EMP1.[EmployeeID] IN (SELECT  [EmployeeID]
				FROM [dbo].[Employee]  EMP
				INNER JOIN [dbo].[Initiatives] INID ON INID.InitiativeOwnerID = EMP.EmployeeID
				WHERE INID.[InitiativeID] = @INIID)

		INSERT INTO [dbo].[InitiativeActions] ([Id],[ActionBy],[Action],[Position],[Status],[Stage],[InitiativeId])
		SELECT ROWID,APPROVE_ACTIONBY,@ACTION,APPROVE_POSITION,@STATUS,@STAGE,@INIID
		FROM @TEMP_OWNER

		SELECT	[ActionBy],[Action],[Position],[Status],[Stage],[InitiativeId]
		FROM	[dbo].[InitiativeActions] 
	END

END
GO
