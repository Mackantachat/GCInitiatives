/****** Object:  View [dbo].[v_CustomExcel1_Y]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE view [dbo].[v_CustomExcel1_Y]
AS
SELECT        'CustomExcel' AS ReportType, COLUMN_NAME AS Value, REPLACE(COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (TABLE_NAME = 'v_CustomExcel1')

UNION

SELECT        'CustomTable' AS ReportType, COLUMN_NAME AS Value, REPLACE(COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (TABLE_NAME = 'v_CustomExcel1')




UNION

SELECT        'CAPEXProjectDetail' AS ReportType, COLUMN_NAME AS Value, 
                         COLUMN_NAME AS Name
FROM            INFORMATION_SCHEMA.COLUMNS
WHERE        TABLE_NAME = 'v_CAPEX_Report_ProjectDetail_FlexyColumn' AND COLUMN_NAME NOT LIKE '%id'


UNION

SELECT        'CustomExcelCIM' AS ReportType, COLUMN_NAME AS Value, REPLACE(COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (TABLE_NAME = 'v_CustomExcelCIM')


UNION

SELECT        'CustomExcelDIM' AS ReportType, COLUMN_NAME AS Value, REPLACE(COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (TABLE_NAME = 'v_CustomExcelDIM')

UNION

SELECT        'CustomExcelPIM' AS ReportType, COLUMN_NAME AS Value, REPLACE(COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (TABLE_NAME = 'v_CustomExcelPIM')

UNION

SELECT        'CustomExcelStrategy' AS ReportType, COLUMN_NAME AS Value, REPLACE(COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (TABLE_NAME = 'v_CustomExcelStrategy')

UNION

SELECT        'CustomExcelCPI' AS ReportType, COLUMN_NAME AS Value, REPLACE(COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (TABLE_NAME = 'v_CustomExcelCPI')




GO
