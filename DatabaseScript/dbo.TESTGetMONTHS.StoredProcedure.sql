/****** Object:  StoredProcedure [dbo].[TESTGetMONTHS]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[TESTGetMONTHS]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    DECLARE @cntMonths INT = (SELECT DATEDIFF(MONTH,GETDATE(), GETDATE() +999))
    DECLARE @tmpMonths INT = 0;
    DECLARE @startDate DATETIME = GETDATE();

    DECLARE @tmpQueryMonths NVARCHAR(MAX) = 'SELECT '

    WHILE (@tmpMonths <  @cntMonths )
    BEGIN
        IF (@tmpQueryMonths <> 'SELECT ') SET @tmpQueryMonths += ','

       

        DECLARE @dateName NVARCHAR(150) = ( DATENAME(MONTH, @startDate) + ' ' + CAST( DATEPART(YEAR,@startDate) AS VARCHAR(100)) )  ;

        SET @tmpQueryMonths += '  GETDATE() + 1 AS ''' + @dateName + ''''

        IF (YEAR(@startDate) <> YEAR(DATEADD(MONTH, 1 ,@startDate))) SET @tmpQueryMonths += ' , GETDATE() + 1 AS ''' + CAST( DATEPART(YEAR,@startDate) AS VARCHAR(100)) + ''''


        SET @startDate = DATEADD(MONTH, 1 ,@startDate);
        PRINT(@dateName)
        PRINT(@startDate)
        SET @tmpMonths += 1
    END

    SET @tmpQueryMonths += ' , GETDATE() + 1 AS ''' + CAST( DATEPART(YEAR,@startDate) AS VARCHAR(100)) + ''''

    SET @cntMonths = 0;


    PRINT (@tmpQueryMonths)
    EXEC  (@tmpQueryMonths)
END
GO
