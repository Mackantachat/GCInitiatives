/****** Object:  View [dbo].[v_Graph_DDL_X_Axis]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_Graph_DDL_X_Axis]
AS
SELECT        ISNULL(ddlStageIL4.IL, ISNULL(ddlStageIL5.IL, NULL)) AS StageType, colName.COLUMN_NAME AS Value, REPLACE(colName.COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName LEFT OUTER JOIN
                             (SELECT        CAST('New IL 4' AS NVARCHAR(MAX)) AS IL) AS ddlStageIL4 ON colName.COLUMN_NAME LIKE '%IL4%' LEFT OUTER JOIN
                             (SELECT        CAST('IL5 Achievement' AS NVARCHAR(MAX)) AS IL) AS ddlStageIL5 ON colName.COLUMN_NAME LIKE '%IL5%'
WHERE        (colName.TABLE_NAME = 'v_DataGraphEnhanced') AND (colName.COLUMN_NAME IN ('Workstream', 'Sub-Workstream_1', 'C-level', 'Target_To_IL5_Week', 'Target_To_IL4_Week'))
GO
