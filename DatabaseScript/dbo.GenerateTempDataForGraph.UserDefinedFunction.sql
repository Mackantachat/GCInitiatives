/****** Object:  UserDefinedFunction [dbo].[GenerateTempDataForGraph]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[GenerateTempDataForGraph]
(
	-- Add the parameters for the function here
	@startYear INT
)
RETURNS 
@returnSet TABLE 
(
	-- Add the column definitions for the TABLE variable here
	 Initiative_ID              NVARCHAR(300)
    ,Initiative_Name            NVARCHAR(300)
    ,Initiative_Owner           NVARCHAR(300)
    ,Stage_Gate                 NVARCHAR(300)
    ,Initiative_Type            NVARCHAR(300)
    ,SIL4_Achievement           INT
    ,SIL5_Achievement           INT
    ,Target_To_IL4_Date         DATE
    ,Target_To_IL5_Date         DATE
    ,[C-level]                  NVARCHAR(300)
    ,Workstream                 NVARCHAR(300)
    ,[Sub-Workstream_1]         NVARCHAR(300)
    ,[Sub-Workstream_2]         NVARCHAR(300)
    ,Financial_Impact_Area      NVARCHAR(300)
    ,[Latest approved IL4 date] DATE
    ,[Latest approved IL5 date] DATE
    ,[First submitted IL4 date] DATE
    ,[First submitted IL5 date] DATE
    ,Target_To_IL5_Week         INT
    ,Target_To_IL4_Week         INT
    ,Target_To_IL4_Date_C       DATE
    ,Target_to_IL5_Date_C       DATE
    ,[IL0-IL2]                  DECIMAL(18,3)
    ,IL3                        DECIMAL(18,3)
    ,SIL4                       DECIMAL(18,3)
    ,IL4                        DECIMAL(18,3)
    ,Unconverted_IL4            DECIMAL(18,3)
    ,IL5                        DECIMAL(18,3)
    ,SIL5                       DECIMAL(18,3)
    ,[New IL4 BlankableValue]   DECIMAL(18,3)
    ,[IL5 BlankableValue]       DECIMAL(18,3)
    ,[IL4 Target Line]          DECIMAL(18,3)
    ,[IL5 Target Line]          DECIMAL(18,3)
)
AS
BEGIN

    --force loop 10 year
	-- Fill the table variable with the rows for your result set
	--DECLARE @maxWeekOfThisYear AS INT = (SELECT TOP 1 DATEPART(wk, CAST( CAST(@year AS NVARCHAR(4)) + '-12-31'AS DATE)))

    DECLARE @cntMonth int = 1;
    DECLARE @loopMonth int = 12;
    
    DECLARE @loopYear int = 20

    DECLARE @maxDayInMonth int = 0;
    --DECLARE @loopDay int = 1;
    DECLARE @nowLoopDate DATE = (SELECT CAST(CAST(@startYear AS NVARCHAR(4)) + '-01-01' AS DATE))
    DECLARE @nowWeek INT = (SELECT DATEPART(wk, @nowLoopDate))
    DECLARE @prevNowWeek INT = (SELECT DATEPART(wk, @nowLoopDate))
    --COE
    --SEVP-D
    --SEVP-U/MCS

   
   DECLARE @loopDay int = ( select DATEDIFF(day, CAST(CAST(@startYear AS NVARCHAR(4)) + '-01-01' AS DATE), CAST(CAST(YEAR(GETDATE()) AS NVARCHAR(4)) + '-12-31' AS DATE) ))

   WHILE @loopDay > 0
    BEGIN

        SET @nowWeek = (SELECT DATEPART(wk, @nowLoopDate))

        IF (@prevNowWeek = @nowWeek) goto nextloop; 

        INSERT INTO @returnSet (Target_To_IL4_Date, Target_To_IL5_Date, [C-level], Target_To_IL5_Week, Target_To_IL4_Week, Target_To_IL4_Date_C , Target_to_IL5_Date_C, [New IL4 BlankableValue] ,[IL5 BlankableValue] ,[IL4 Target Line] ,[IL5 Target Line],Workstream,[Sub-Workstream_1],[Sub-Workstream_2])
        SELECT @nowLoopDate, @nowLoopDate, 'COE', @nowWeek  , @nowWeek, @nowLoopDate , @nowLoopDate, 
            (SELECT TOP 1 BlankableValue FROM BlankablePlans WHERE StageType = 'IL4' AND Week = @nowWeek AND Year = YEAR(@nowLoopDate) AND CLevel = 'COE') ,
            (SELECT TOP 1 BlankableValue FROM BlankablePlans WHERE StageType = 'IL5' AND Week = @nowWeek AND Year = YEAR(@nowLoopDate) AND CLevel = 'COE') ,
            (SELECT TOP 1 Target FROM CLevelTargetLines WHERE StageType = 'IL4' AND Year = YEAR(@nowLoopDate) AND CLevel = 'COE') ,
            (SELECT TOP 1 Target FROM CLevelTargetLines WHERE StageType = 'IL5' AND Year = YEAR(@nowLoopDate) AND CLevel = 'COE') ,
            'Aromatics',
            'Aromatics',
            'Aromatics - Availability'
            
        UNION
        SELECT @nowLoopDate, @nowLoopDate, 'SEVP-D', @nowWeek , @nowWeek , @nowLoopDate , @nowLoopDate, 
            (SELECT TOP 1 BlankableValue FROM BlankablePlans WHERE StageType = 'IL4' AND Week = @nowWeek AND Year = YEAR(@nowLoopDate) AND CLevel = 'SEVP-D') ,
            (SELECT TOP 1 BlankableValue FROM BlankablePlans WHERE StageType = 'IL5' AND Week = @nowWeek AND Year = YEAR(@nowLoopDate) AND CLevel = 'SEVP-D') ,
            (SELECT TOP 1 Target FROM CLevelTargetLines WHERE StageType = 'IL4' AND Year = YEAR(@nowLoopDate) AND CLevel = 'SEVP-D') ,
            (SELECT TOP 1 Target FROM CLevelTargetLines WHERE StageType = 'IL5' AND Year = YEAR(@nowLoopDate) AND CLevel = 'SEVP-D') ,
            'Aromatics',
            'Aromatics',
            'Aromatics - Availability'
        UNION
        SELECT @nowLoopDate, @nowLoopDate, 'SEVP-U/MCS', @nowWeek, @nowWeek, @nowLoopDate , @nowLoopDate, 
            (SELECT TOP 1 BlankableValue FROM BlankablePlans WHERE StageType = 'IL4' AND Week = @nowWeek AND Year = YEAR(@nowLoopDate) AND CLevel = 'SEVP-U/MCS') ,
            (SELECT TOP 1 BlankableValue FROM BlankablePlans WHERE StageType = 'IL5' AND Week = @nowWeek AND Year = YEAR(@nowLoopDate) AND CLevel = 'SEVP-U/MCS') ,
            (SELECT TOP 1 Target FROM CLevelTargetLines WHERE StageType = 'IL4' AND Year = YEAR(@nowLoopDate) AND CLevel = 'SEVP-U/MCS') ,
            (SELECT TOP 1 Target FROM CLevelTargetLines WHERE StageType = 'IL5' AND Year = YEAR(@nowLoopDate) AND CLevel = 'SEVP-U/MCS') ,
            'Aromatics',
            'Aromatics',
            'Aromatics - Availability'

        SET @prevNowWeek = @nowWeek;

        nextloop:
        SET @nowLoopDate = ( SELECT DATEADD(DAY, 1, @nowLoopDate) )
        SET @loopDay = @loopDay - 1
    END


   --WHILE @loopYear >= 0 
    --    BEGIN
    --        SET @cntMonth = 0;

    --        WHILE @cntMonth <= @loopMonth
    --            BEGIN
    --                SET @maxDayInMonth = (SELECT DAY(EOMONTH( CAST(@year AS NVARCHAR(4)) + '-' + CAST(@cntMonth AS NVARCHAR(2)) + '-01')))

    --                WHILE @loopDay <= @maxDayInMonth
    --                    BEGIN
    --                        (SELECT DAY(EOMONTH( CAST(@year AS NVARCHAR(4)) + '-' + CAST(@cntMonth AS NVARCHAR(2)) + '-' + CAST(@loopDay AS NVARCHAR(2)))))

    --                        SET @loopDay = @loopDay + 1;
    --                    END

    --                SET @cntMonth = @cntMonth + 1;
    --            END

    --        SET @loopYear = @loopYear - 1;
    --    END

    --DECLARE @i int = 1

    --WHILE @i <= @maxWeekOfThisYear
    --BEGIN
    --    INSERT INTO @returnSet
    --    SELECT @i AS wk

    --    SET @i = @i + 1;
        /* do some work */
    --END
	RETURN 
END


GO
