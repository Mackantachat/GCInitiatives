/****** Object:  StoredProcedure [dbo].[sp_IncomingProcess]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[sp_IncomingProcess]
AS
BEGIN
    -- #######################################################################################
    --                             1) IM-CPO-MappingCapexAppWbs.txt
    -- #######################################################################################
    -- 1.1) UPDATE AppropriationNo and WBS from SAP
    UPDATE 
        [P]
    SET 
        [P].[WbsNo] = CASE 
            WHEN [F].[Column6] = '' OR [F].[Column6] IS NULL 
                THEN [P].[WbsNo] 
            ELSE [F].[Column6] END, 
        [P].[AppropriationNo] = CASE 
            WHEN [F].[Column4] = '' OR [F].[Column4] IS NULL 
                THEN [P].[AppropriationNo] 
            ELSE [F].[Column4] END 
    FROM 
        [dbo].[IncomingFileData] [F] 
    INNER JOIN 
        [v_Initiatives] [I] 
    ON 
        --Change from previous version to support any digits of Initiative code
        --REPLACE(LTRIM(REPLACE([F].[Column2], '0', ' ')), ' ', '0') = [I].[InitiativeCode]
		[F].[Column2] = dbo.PadLeft([I].[InitiativeCode],'0',15)
	INNER JOIN 
        [ProgressHeader] [P] 
    ON 
        [P].[InitiativeId] = [I].[ID]
	WHERE 
        [F].[FileName] = 'IM-CPO-MappingCapexAppWbs.txt'
		AND ( ([Mark] <> 'Y') OR ([Mark] IS NULL) )

	-- 1.2) Update Mark flag	 
	UPDATE
        [dbo].[IncomingFileData]
    SET 
        [Mark] = 'Y'
	WHERE 
        [FileName] = 'IM-CPO-MappingCapexAppWbs.txt' 
		AND [Mark] IS NULL

    -- #######################################################################################
    --                                 2) File: OUT_ACTDATE.csv
    -- #######################################################################################

	-- 2.1) UPDATE Actual Date from SAP		   		 
	UPDATE 
        [dbo].[progressplandate] 
	SET 
        [progressplandate].[ActualStartDate] = [IncomingFileData].[Column2]
	FROM  
        [dbo].[IncomingFileData]
	INNER JOIN 
        [dbo].[ProgressHeader] 
    ON 
        LEFT([IncomingFileData].[Column1],13) = [ProgressHeader].[WbsNo]
	INNER JOIN 
        [dbo].[progressplandate] 
    ON 
        [ProgressHeader].[WbsNo] + [dbo].[GetWBSElementSuffix]([progressplandate].[ProgressPlanDateType]) = [IncomingFileData].[Column1] 
		AND [progressplandate].[InitiativeId] = [ProgressHeader].[InitiativeId]
		AND [IncomingFileData].[FileName] = 'OUT_ACTDATE.csv' 
        AND ( ([IncomingFileData].[Mark] <> 'Y') OR ([IncomingFileData].[Mark] IS NULL) )

	-- 2.2) Update Mark flag
    UPDATE 
        [dbo].[IncomingFileData] 
	SET 
        [Mark] = 'Y'
	WHERE 
        [FileName] = 'OUT_ACTDATE.csv'
		AND [Mark] IS NULL

    -- #######################################################################################
    --                                 3) File: OUT_RP.csv 
    -- #######################################################################################
    -- 3.1) UPDATE Responsible person
	MERGE INTO 
		[dbo].[CommonData] [CommonData]
	USING
		(
			SELECT 
			'responsible' AS [DataType],
			[Column1] AS [Attribute01],
			[Column1] + ' ' + [Column2] AS [Attribute02],
			[Column1] AS [Attribute03],
			[Column1] AS [Attribute04],

			GETDATE() AS [UpdateDate],
			'sp_IncomingProcess' AS [UpdateBy]
		FROM 
			[dbo].[IncomingFileData]
		WHERE 
			[FileName] = 'OUT_RP.csv'
			AND NOT [Column2] LIKE '%delete%'
			AND [Mark] IS NULL
		) AS [IncomingFileData]
	ON
		[IncomingFileData].[Attribute01] = [CommonData].[Attribute01]
		AND [IncomingFileData].[DataType] = [CommonData].[DataType]
	WHEN MATCHED THEN UPDATE SET
		[CommonData].[Attribute01] = [IncomingFileData].[Attribute01],
		[CommonData].[Attribute02] = [IncomingFileData].[Attribute02],
		[CommonData].[Attribute03] = [IncomingFileData].[Attribute03],
		[CommonData].[Attribute04] = [IncomingFileData].[Attribute04],
		[CommonData].[UpdateDate] = [IncomingFileData].[UpdateDate],
		[CommonData].[UpdateBy] = [IncomingFileData].[UpdateBy]
	WHEN NOT MATCHED THEN 
		INSERT ([DataType],[Attribute01],[Attribute02],[Attribute03],[Attribute04],[UpdateDate],[UpdateBy])
		VALUES (
			[IncomingFileData].[DataType],
			[IncomingFileData].[Attribute01],
			[IncomingFileData].[Attribute02],
			[IncomingFileData].[Attribute03],
			[IncomingFileData].[Attribute04],
			[IncomingFileData].[UpdateDate],
			[IncomingFileData].[UpdateBy]
		);

    -- 3.2) Update Mark flag
    UPDATE 
        [dbo].[IncomingFileData] 
	SET 
        [Mark] = 'Y'
	WHERE 
        [FileName] = 'OUT_RP.csv'
		AND [Mark] IS NULL
    
    -- #######################################################################################
    --                                 4) File: OUT_PROJCATE.csv 
    -- #######################################################################################
    -- 4.1) areaplant
    MERGE INTO 
		[dbo].[CommonData] [CommonData]
	USING
		(
			SELECT
				'areaplant' AS [DataType],
				[Column3] AS [Attribute01],
				[Column3] + ' ' + [Column4] AS [Attribute02],
				[Column2] AS [Attribute03],
				GETDATE() AS [UpdateDate],
				'sp_IncomingProcess' AS [UpdateBy]
			FROM 
				[dbo].[IncomingFileData]
			WHERE 
				[FileName] = 'OUT_PROJCATE.csv'
				AND [Column1] = 'AREA'
				AND [Mark] IS NULL
		) AS [IncomingFileData]
	ON
		[IncomingFileData].[Attribute01] = [CommonData].[Attribute01]
		AND [IncomingFileData].[Attribute03] = [CommonData].[Attribute03]
		AND [IncomingFileData].[DataType] = [CommonData].[DataType]
	WHEN MATCHED THEN UPDATE SET
		[CommonData].[Attribute01] = [IncomingFileData].[Attribute01],
		[CommonData].[Attribute02] = [IncomingFileData].[Attribute02],
		[CommonData].[Attribute03] = [IncomingFileData].[Attribute03],
		[CommonData].[UpdateDate] = [IncomingFileData].[UpdateDate],
		[CommonData].[UpdateBy] = [IncomingFileData].[UpdateBy]
	WHEN NOT MATCHED THEN 
		INSERT ([DataType],[Attribute01],[Attribute02],[Attribute03],[UpdateDate],[UpdateBy])
		VALUES (
			[IncomingFileData].[DataType],
			[IncomingFileData].[Attribute01],
			[IncomingFileData].[Attribute02],
			[IncomingFileData].[Attribute03],
			[IncomingFileData].[UpdateDate],
			[IncomingFileData].[UpdateBy]
		);

    -- 4.2) physicalbu
   MERGE INTO 
		[dbo].[CommonData] [CommonData]
	USING
		(
			SELECT
				'physicalbu' AS [DataType],
				[Column3] AS [Attribute01],
				[Column3] + ' ' + [Column4] AS [Attribute02],
				[Column2] AS [Attribute03],
				GETDATE() AS [UpdateDate],
				'sp_IncomingProcess' AS [UpdateBy]
			FROM 
				[dbo].[IncomingFileData]
			WHERE
				[FileName] = 'OUT_PROJCATE.csv'
				AND [Column1] = 'PHYBU'
				AND [Mark] IS NULL
		) AS [IncomingFileData]
	ON
		[IncomingFileData].[Attribute01] = [CommonData].[Attribute01]
		AND [IncomingFileData].[Attribute03] = [CommonData].[Attribute03]
		AND [IncomingFileData].[DataType] = [CommonData].[DataType]
	WHEN MATCHED THEN UPDATE SET
		[CommonData].[Attribute01] = [IncomingFileData].[Attribute01],
		[CommonData].[Attribute02] = [IncomingFileData].[Attribute02],
		[CommonData].[Attribute03] = [IncomingFileData].[Attribute03],
		[CommonData].[UpdateDate] = [IncomingFileData].[UpdateDate],
		[CommonData].[UpdateBy] = [IncomingFileData].[UpdateBy]
	WHEN NOT MATCHED THEN 
		INSERT ([DataType],[Attribute01],[Attribute02],[Attribute03],[UpdateDate],[UpdateBy])
		VALUES (
			[IncomingFileData].[DataType],
			[IncomingFileData].[Attribute01],
			[IncomingFileData].[Attribute02],
			[IncomingFileData].[Attribute03],
			[IncomingFileData].[UpdateDate],
			[IncomingFileData].[UpdateBy]
		);

    -- 4.3) solomoncategory
	MERGE INTO 
		[dbo].[CommonData] [CommonData]
	USING
		(
		SELECT
			'solomoncategory' AS [DataType],
			[Column3] AS [Attribute01],
			[Column3] + ' ' + [Column4] AS [Attribute02],
			[Column2] AS [Attribute03],
			GETDATE() AS [UpdateDate],
			'sp_IncomingProcess' AS [UpdateBy]
		FROM
			[dbo].[IncomingFileData]
		WHERE 
			[FileName] = 'OUT_PROJCATE.csv'
			AND [Column1] = 'SOLOMON_CAT'
			AND [Mark] IS NULL
		) AS [IncomingFileData]
	ON
		[IncomingFileData].[Attribute01] = [CommonData].[Attribute01]
		AND [IncomingFileData].[Attribute03] = [CommonData].[Attribute03]
		AND [IncomingFileData].[DataType] = [CommonData].[DataType]
	WHEN MATCHED THEN UPDATE SET
		[CommonData].[Attribute01] = [IncomingFileData].[Attribute01],
		[CommonData].[Attribute02] = [IncomingFileData].[Attribute02],
		[CommonData].[Attribute03] = [IncomingFileData].[Attribute03],
		[CommonData].[UpdateDate] = [IncomingFileData].[UpdateDate],
		[CommonData].[UpdateBy] = [IncomingFileData].[UpdateBy]
	WHEN NOT MATCHED THEN 
		INSERT ([DataType],[Attribute01],[Attribute02],[Attribute03],[UpdateDate],[UpdateBy])
		VALUES (
			[IncomingFileData].[DataType],
			[IncomingFileData].[Attribute01],
			[IncomingFileData].[Attribute02],
			[IncomingFileData].[Attribute03],
			[IncomingFileData].[UpdateDate],
			[IncomingFileData].[UpdateBy]
		);

    -- 4.4) physicalunit
   MERGE INTO 
		[dbo].[CommonData] [CommonData]
	USING
		(
			SELECT
			'physicalunit' AS [DataType],
			[Column3] AS [Attribute01],
			[Column3] + ' ' + [Column4] AS [Attribute02],
			[Column2] AS [Attribute03],
			GETDATE() AS [UpdateDate],
			'sp_IncomingProcess' AS [UpdateBy]
		FROM 
			[dbo].[IncomingFileData]
		WHERE 
			[FileName] = 'OUT_PROJCATE.csv'
			AND [Column1] = 'UNIT'
			AND [Mark] IS NULL
		) AS [IncomingFileData]
	ON
		[IncomingFileData].[Attribute01] = [CommonData].[Attribute01]
		AND [IncomingFileData].[Attribute03] = [CommonData].[Attribute03]
		AND [IncomingFileData].[DataType] = [CommonData].[DataType]
	WHEN MATCHED THEN UPDATE SET
		[CommonData].[Attribute01] = [IncomingFileData].[Attribute01],
		[CommonData].[Attribute02] = [IncomingFileData].[Attribute02],
		[CommonData].[Attribute03] = [IncomingFileData].[Attribute03],
		[CommonData].[UpdateDate] = [IncomingFileData].[UpdateDate],
		[CommonData].[UpdateBy] = [IncomingFileData].[UpdateBy]
	WHEN NOT MATCHED THEN 
		INSERT ([DataType],[Attribute01],[Attribute02],[Attribute03],[UpdateDate],[UpdateBy])
		VALUES (
			[IncomingFileData].[DataType],
			[IncomingFileData].[Attribute01],
			[IncomingFileData].[Attribute02],
			[IncomingFileData].[Attribute03],
			[IncomingFileData].[UpdateDate],
			[IncomingFileData].[UpdateBy]
		);

    -- 4.5) Update Mark flag
    UPDATE 
        [dbo].[IncomingFileData]
	SET 
        [Mark] = 'Y'
	WHERE 
        [FileName] = 'OUT_PROJCATE.csv'
		AND [Mark] IS NULL

    -- #######################################################################################
    --                                 5) File: OUT_PLANT.csv 
    -- #######################################################################################
    -- 5.1) Insert into Plants
 --   INSERT INTO 
 --       [Plants]
 --   SELECT 
 --       [Column1],
 --       [Column1] + ' - ' + [Column3]
 --   FROM
 --       [dbo].[IncomingFileData]
 --   WHERE 
 --       [FileName] = 'OUT_PLANT.csv'
 --       AND ( ([Mark] <> 'Y') OR ([Mark] IS NULL) )

 --   -- 5.2) Update common data   
	--UPDATE
	--	[dbo].[CommonData]
	--SET
	--	[Attribute17] = [Column2]
	--FROM
	--	[dbo].[IncomingFileData]
	--WHERE
	--	[DataType] = 'plant'
	--	AND [Attribute06] = [Column1]
	--	AND ( ([Mark] <> 'Y') OR ([Mark] IS NULL) )

	---- 5.3) Update Mark flag
 --   UPDATE 
 --       [dbo].[IncomingFileData]
	--SET 
 --       [Mark] = 'Y'
	--WHERE 
 --       [FileName] = 'OUT_PLANT.csv'

END

GO
