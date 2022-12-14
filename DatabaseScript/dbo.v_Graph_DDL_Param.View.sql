/****** Object:  View [dbo].[v_Graph_DDL_Param]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO










CREATE view [dbo].[v_Graph_DDL_Param]
AS
SELECT        rpt.Value AS [ReportType], COLUMN_NAME AS Value, REPLACE(COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS inf LEFT JOIN
                         CustomReportReportType rpt ON 1 = 1
WHERE        (TABLE_NAME = 'v_DataGraphEnhanced') AND (COLUMN_NAME IN ('Workstream', 'Sub-Workstream_1', 'C-level', 'Initiative_ID', 'Initiative_Name', 'Initiative_Type', 'Stage_Gate', 'Target_To_IL5_Date', 'Target_To_IL4_Date', 
                         'Target_To_IL5_Date_C', 'Target_To_IL4_Date_C', 'Financial_impact_area')) 
                         AND rpt.Value NOT IN ('NewCapexReport', 'CapexReportByCompany', 'BGSlide', 'CustomExcel', 'CustomTable', 'Cash-In', 'ApproverDashboardExcel', 
                         'ApproverDashboardTable', 'CAPEXReportGroupByandCompanyType', 'CAPEXSummaryReportbyCompany', 'CAPEXProjectApproved', 'CAPEXAllProjectsSubmittedInPeriod', 'CAPEXDepreciationForNewProjectReport','CAPEXNewCapexGcGroupByProjectType',
                         'CAPEXReportRequestPool' , 'CAPEXReportUsedPool', 'CAPEXProjectDetail'
                         , 'GraphHistoricalIL5' 
                         ,'GraphHistoricalIL5_COE'
                         ,'GraphHistoricalIL5_SEVP-D'
                         ,'GraphHistoricalIL5_SEVP-U/MCS'
                         ,'GraphHistoricalIL4'
                         ,'GraphHistoricalIL4_COE'
                         ,'GraphHistoricalIL4_SEVP-D'
                         ,'GraphHistoricalIL4_SEVP-U/MCS'
                         , 'UFDD'
                         ,'CustomExcelCIM'
                         ,'CustomExcelDIM'
                         ,'CustomExcelPIM'
                         ,'CustomExcelStrategy'
                         ,'CustomExcelCPI'
                         )
UNION
SELECT        'CustomExcel' AS ReportType, colName.COLUMN_NAME AS Value, REPLACE(colName.COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (colName.TABLE_NAME = 'v_CustomExcel1')
UNION
SELECT        'CustomTable' AS ReportType, colName.COLUMN_NAME AS Value, REPLACE(colName.COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (colName.TABLE_NAME = 'v_CustomExcel1')
UNION
--SELECT        'NewCapexReport', REPLACE(VALUE, ' ', '') AS value, VALUE AS Name
--FROM            string_split('Budget Year,Budget Type,Company Type,Company,Organization,Investment Type Group,Investment Type Sub-Group,Investment Type', ',')
--UNION
--SELECT        'CapexReportByCompany', REPLACE(VALUE, ' ', '') AS value, VALUE AS Name
--FROM            string_split('Budget Year,Budget Type,Company Type,Company,Organization,Investment Type Group,Investment Type Sub-Group,Investment Type', ',')
--UNION
--SELECT        'BGSlide', COLUMN_NAME AS Value, COLUMN_NAME AS Name
--FROM            INFORMATION_SCHEMA.COLUMNS
--WHERE        (INFORMATION_SCHEMA.COLUMNS.TABLE_NAME = 'v_BGSlides_PPT') AND COLUMN_NAME NOT LIKE 'F%'
--UNION
SELECT        'Cash-In', COLUMN_NAME AS Value, COLUMN_NAME AS Name
FROM            INFORMATION_SCHEMA.COLUMNS
WHERE        (INFORMATION_SCHEMA.COLUMNS.TABLE_NAME = 'v_CashIn')
UNION
SELECT        'ApproverDashboardExcel', COLUMN_NAME AS Value, COLUMN_NAME AS Name
FROM            INFORMATION_SCHEMA.COLUMNS
WHERE        (INFORMATION_SCHEMA.COLUMNS.TABLE_NAME = 'v_ApproverDashboard')
UNION
SELECT        'ApproverDashboardTable', COLUMN_NAME AS Value, COLUMN_NAME AS Name
FROM            INFORMATION_SCHEMA.COLUMNS
WHERE        (INFORMATION_SCHEMA.COLUMNS.TABLE_NAME = 'v_ApproverDashboard')
UNION
SELECT        ReportType, [Value], [Name]
FROM            CAPEX_ReportParameter
UNION
SELECT        'UFDD', COLUMN_NAME AS Value, COLUMN_NAME AS Name
FROM            INFORMATION_SCHEMA.COLUMNS
WHERE        (INFORMATION_SCHEMA.COLUMNS.TABLE_NAME = 'v_UFDD')


UNION
SELECT        'CustomExcelCIM' AS ReportType, colName.COLUMN_NAME AS Value, REPLACE(colName.COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (colName.TABLE_NAME = 'v_CustomExcelCIM')
UNION
SELECT        'CustomExcelPIM' AS ReportType, colName.COLUMN_NAME AS Value, REPLACE(colName.COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (colName.TABLE_NAME = 'v_CustomExcelPIM')
UNION
SELECT        'CustomExcelDIM' AS ReportType, colName.COLUMN_NAME AS Value, REPLACE(colName.COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (colName.TABLE_NAME = 'v_CustomExcelDIM')
UNION
SELECT        'CustomExcelCPI' AS ReportType, colName.COLUMN_NAME AS Value, REPLACE(colName.COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (colName.TABLE_NAME = 'v_CustomExcelCPI')
UNION
SELECT        'CustomExcelStrategy' AS ReportType, colName.COLUMN_NAME AS Value, REPLACE(colName.COLUMN_NAME, '_', ' ') AS Name
FROM            INFORMATION_SCHEMA.COLUMNS AS colName
WHERE        (colName.TABLE_NAME = 'v_CustomExcelStrategy')


GO
