/****** Object:  View [dbo].[v_Graph_DDL_Y_Axis]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE view [dbo].[v_Graph_DDL_Y_Axis]
AS
SELECT DISTINCT        CASE WHEN REPLACE(COLUMN_NAME, '_', ' ') LIKE '% IL_' OR
                         REPLACE(COLUMN_NAME, '_', ' ') LIKE '%IL5%' THEN ddlStage.IL5 ELSE ddlStage.IL4 END AS StageType, INFORMATION_SCHEMA.COLUMNS.COLUMN_NAME AS Value, 
                         REPLACE(REPLACE(INFORMATION_SCHEMA.COLUMNS.COLUMN_NAME, '_', ' '), 'Blankable', 'Bankable') AS Name -- replace blankable to bankable
FROM            INFORMATION_SCHEMA.COLUMNS LEFT OUTER JOIN
                             (SELECT        'New IL 4' AS IL4, 'IL5 Achievement' AS IL5) AS ddlStage ON 1 = 1
WHERE        (INFORMATION_SCHEMA.COLUMNS.TABLE_NAME = 'v_DataGraphEnhanced') AND (REPLACE(INFORMATION_SCHEMA.COLUMNS.COLUMN_NAME, '_', ' ') LIKE '%IL_') OR
                         (INFORMATION_SCHEMA.COLUMNS.TABLE_NAME = 'v_DataGraphEnhanced') AND (INFORMATION_SCHEMA.COLUMNS.COLUMN_NAME LIKE '%Blankable%') OR
                         (INFORMATION_SCHEMA.COLUMNS.COLUMN_NAME LIKE '%Target Line')
GO
