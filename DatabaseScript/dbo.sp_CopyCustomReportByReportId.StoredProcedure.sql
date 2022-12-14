/****** Object:  StoredProcedure [dbo].[sp_CopyCustomReportByReportId]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CopyCustomReportByReportId]
(
    -- Add the parameters for the stored procedure here
    @reportIdToCopy AS NVARCHAR(100), --Report ID
    @UserTo AS NVARCHAR(150) = '', --Email
    @isBuiltIn AS BIT = 0, --If 1 show in System Report , Other only Custom
    @reportName AS NVARCHAR(150) = '' -- Report name '' = same old report name
	-- Nok เพิ่ม Company ชั่วคราว
	--,@Companyname as nvarchar(150) = ''
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    DECLARE @MaxReportId NVARCHAR(100) = (SELECT MAX(ReportID) + 1 FROM CustomReportHeader )

    INSERT INTO CustomReportHeader (ReportID,ReportCode,ReportName,[Description],GraphType,X_AxisLabel,Y_AxisLabel,OtherTypeLabel,CreateUser,CreateDate,UpdateUser,UpdateDate,StageType,isAccumulate,SystemReportType)
    SELECT @MaxReportId,ReportCode, CASE WHEN @reportName = '' THEN ReportName ELSE @reportName END ,[Description],GraphType,X_AxisLabel,Y_AxisLabel,OtherTypeLabel, @UserTo ,CreateDate,UpdateUser,UpdateDate,StageType,isAccumulate, CASE WHEN @isBuiltIn = 0 THEN NULL ELSE 'builtin' END  FROM CustomReportHeader WHERE ReportId = @reportIdToCopy

    INSERT INTO CustomReportDetail (ReportID,FieldName,AggregateFunction,Axis,[Sequence],ColorCode)
    SELECT @MaxReportId,FieldName,AggregateFunction,Axis,[Sequence],ColorCode FROM CustomReportDetail WHERE ReportId = @reportIdToCopy

    INSERT INTO CustomReportParameter (ReportID,[Sequence],ParameterName,ParameterField,FilterCondition,ParameterType,[Required],DefaultValue)
    SELECT @MaxReportId,[Sequence],ParameterName,ParameterField,FilterCondition,ParameterType,[Required],DefaultValue FROM CustomReportParameter WHERE ReportId = @reportIdToCopy

	--update CustomReportParameter set DefaultValue = @Companyname where ReportID = @MaxReportId and ParameterField = 'Company Name'


    SELECT * FROM CustomReportHeader WHERE ReportId = @MaxReportId
    SELECT * FROM CustomReportDetail WHERE ReportId = @MaxReportId
    SELECT * FROM CustomReportParameter WHERE  ReportId = @MaxReportId
END
GO
