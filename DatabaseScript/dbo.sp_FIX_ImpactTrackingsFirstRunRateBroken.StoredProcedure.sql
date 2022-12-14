/****** Object:  StoredProcedure [dbo].[sp_FIX_ImpactTrackingsFirstRunRateBroken]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_ImpactTrackingsFirstRunRateBroken](
@mode AS NVARCHAR(10) = 'find'
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    

    IF (@mode = 'find')
        BEGIN
        finder:

            SELECT
            ini.Id,
            ini.InitiativeCOde,
            ini.Stage,
            ini.UpdatedDate,
            ini.LastSubmittedDate,
            COALESCE(
                CASE WHEN CONVERT(VARCHAR(10), imp.FirstRunRateMonth        , 120) = '1970-01-01' THEN NULL ELSE imp.FirstRunRateMonth      END
                , CASE WHEN CONVERT(VARCHAR(10), imp02.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp02.FirstRunRateMonth    END
                , CASE WHEN CONVERT(VARCHAR(10), imp29.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp29.FirstRunRateMonth    END
                , CASE WHEN CONVERT(VARCHAR(10), imp28.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp28.FirstRunRateMonth    END
                , CASE WHEN CONVERT(VARCHAR(10), imp27.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp27.FirstRunRateMonth    END
              ) AS FirstRunRateMonth_dddd,

            COALESCE(
                CASE WHEN ISNULL(imp.FinancialImpactArea        , '') = '' THEN NULL ELSE       imp.FinancialImpactArea     END              
                , CASE WHEN ISNULL(imp02.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp02.FinancialImpactArea   END             
                , CASE WHEN ISNULL(imp29.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp29.FinancialImpactArea   END             
                , CASE WHEN ISNULL(imp28.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp28.FinancialImpactArea   END             
                , CASE WHEN ISNULL(imp27.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp27.FinancialImpactArea   END     
              ) AS FinancialImpactArea_dddd

            ,  
            COALESCE(
                CASE WHEN ISNULL(imp.ImpiemantCost        , '') = '' THEN NULL ELSE       imp.ImpiemantCost     END
                , CASE WHEN ISNULL(imp02.ImpiemantCost      , '') = '' THEN NULL ELSE       imp02.ImpiemantCost   END
                , CASE WHEN ISNULL(imp29.ImpiemantCost      , '') = '' THEN NULL ELSE       imp29.ImpiemantCost   END
                , CASE WHEN ISNULL(imp28.ImpiemantCost      , '') = '' THEN NULL ELSE       imp28.ImpiemantCost   END
                , CASE WHEN ISNULL(imp27.ImpiemantCost      , '') = '' THEN NULL ELSE       imp27.ImpiemantCost   END
              ) AS ImpiemantCost_dddd


            ,  
            COALESCE(
                CASE WHEN ISNULL(imp.AutoCalculate        , '') = '' THEN NULL ELSE       imp.AutoCalculate     END       
                , CASE WHEN ISNULL(imp02.AutoCalculate      , '') = '' THEN NULL ELSE       imp02.AutoCalculate   END     
                , CASE WHEN ISNULL(imp29.AutoCalculate      , '') = '' THEN NULL ELSE       imp29.AutoCalculate   END     
                , CASE WHEN ISNULL(imp28.AutoCalculate      , '') = '' THEN NULL ELSE       imp28.AutoCalculate   END     
                , CASE WHEN ISNULL(imp27.AutoCalculate      , '') = '' THEN NULL ELSE       imp27.AutoCalculate   END 
              ) AS AutoCalculate_dddd




              ,
            imp.FirstRunRateMonth   
            --,imp26.FirstRunRateMonth      ,imp21.FirstRunRateMonth,   imp21_1.FirstRunRateMonth  ,   imp18.FirstRunRateMonth,   imp4.FirstRunRateMonth,
            ,
            imp.FinancialImpactArea 
            --,imp26.FinancialImpactArea    ,imp21.FinancialImpactArea, imp21_1.FinancialImpactArea, imp18.FinancialImpactArea, imp4.FinancialImpactArea
            --,* 


            --UPDATE imp

 

            --SET

 

            -- imp.FinancialImpactArea =  COALESCE(
            --    CASE WHEN ISNULL(imp.FinancialImpactArea        , '') = '' THEN NULL ELSE       imp.FinancialImpactArea     END
            --    , CASE WHEN ISNULL(imp27.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp27.FinancialImpactArea   END
            --  , CASE WHEN ISNULL(imp26.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp26.FinancialImpactArea   END
            --  , CASE WHEN ISNULL(imp25.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp25.FinancialImpactArea   END
            --  , CASE WHEN ISNULL(imp24.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp24.FinancialImpactArea   END
            --  , CASE WHEN ISNULL(imp21.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp21.FinancialImpactArea   END
            --  , CASE WHEN ISNULL(imp21_1.FinancialImpactArea        , '') = '' THEN NULL ELSE   imp21_1.FinancialImpactArea END
            --  , CASE WHEN ISNULL(imp18.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp18.FinancialImpactArea   END
            --  , CASE WHEN ISNULL(imp04.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp04.FinancialImpactArea   END
            --  )
            --,imp.FirstRunRateMonth   = COALESCE(
            --    CASE WHEN CONVERT(VARCHAR(10), imp.FirstRunRateMonth        , 120) = '1970-01-01' THEN NULL ELSE imp.FirstRunRateMonth                           END
            --    , CASE WHEN CONVERT(VARCHAR(10), imp27.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp27.FirstRunRateMonth                         END
            --  , CASE WHEN CONVERT(VARCHAR(10), imp26.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp26.FirstRunRateMonth                         END
            --  , CASE WHEN CONVERT(VARCHAR(10), imp25.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp25.FirstRunRateMonth                         END
            --  , CASE WHEN CONVERT(VARCHAR(10), imp24.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp24.FirstRunRateMonth                         END
            --  , CASE WHEN CONVERT(VARCHAR(10), imp21.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp21.FirstRunRateMonth                         END
            --  , CASE WHEN CONVERT(VARCHAR(10), imp21_1.FirstRunRateMonth    , 120) = '1970-01-01' THEN NULL ELSE imp21_1.FirstRunRateMonth                       END
            --  , CASE WHEN CONVERT(VARCHAR(10), imp18.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp18.FirstRunRateMonth                         END
            --  , CASE WHEN CONVERT(VARCHAR(10), imp04.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp04.FirstRunRateMonth                         END
            --  )
            --,imp.AutoCalculate       = ISNULL(COALESCE(
            --    CASE WHEN ISNULL(imp.AutoCalculate        , '') = '' THEN NULL ELSE       imp.AutoCalculate     END
            --    , CASE WHEN ISNULL(imp27.AutoCalculate      , '') = '' THEN NULL ELSE       imp27.AutoCalculate   END
            --  , CASE WHEN ISNULL(imp26.AutoCalculate      , '') = '' THEN NULL ELSE       imp26.AutoCalculate   END
            --  , CASE WHEN ISNULL(imp25.AutoCalculate      , '') = '' THEN NULL ELSE       imp25.AutoCalculate   END
            --  , CASE WHEN ISNULL(imp24.AutoCalculate      , '') = '' THEN NULL ELSE       imp24.AutoCalculate   END
            --  , CASE WHEN ISNULL(imp21.AutoCalculate      , '') = '' THEN NULL ELSE       imp21.AutoCalculate   END
            --  , CASE WHEN ISNULL(imp21_1.AutoCalculate    , '') = '' THEN NULL ELSE   imp21_1.AutoCalculate END
            --  , CASE WHEN ISNULL(imp18.AutoCalculate      , '') = '' THEN NULL ELSE       imp18.AutoCalculate   END
            --  , CASE WHEN ISNULL(imp04.AutoCalculate      , '') = '' THEN NULL ELSE       imp04.AutoCalculate   END
            --  ), 0)
            --,imp.ImpiemantCost       = ISNULL(COALESCE(
            --    CASE WHEN ISNULL(imp.ImpiemantCost        , '') = '' THEN NULL ELSE       imp.ImpiemantCost     END
            --    , CASE WHEN ISNULL(imp27.ImpiemantCost      , '') = '' THEN NULL ELSE       imp27.ImpiemantCost   END
            --  , CASE WHEN ISNULL(imp26.ImpiemantCost      , '') = '' THEN NULL ELSE       imp26.ImpiemantCost   END
            --  , CASE WHEN ISNULL(imp25.ImpiemantCost      , '') = '' THEN NULL ELSE       imp25.ImpiemantCost   END
            --  , CASE WHEN ISNULL(imp24.ImpiemantCost      , '') = '' THEN NULL ELSE       imp24.ImpiemantCost   END
            --  , CASE WHEN ISNULL(imp21.ImpiemantCost      , '') = '' THEN NULL ELSE       imp21.ImpiemantCost   END
            --  , CASE WHEN ISNULL(imp21_1.ImpiemantCost        , '') = '' THEN NULL ELSE   imp21_1.ImpiemantCost END
            --  , CASE WHEN ISNULL(imp18.ImpiemantCost      , '') = '' THEN NULL ELSE       imp18.ImpiemantCost   END
            --  , CASE WHEN ISNULL(imp04.ImpiemantCost      , '') = '' THEN NULL ELSE       imp04.ImpiemantCost   END
            --  ), 0)

 

            FROM 

 

            ImpactTrackings imp             
            LEFT JOIN [ImpactTrackings_2020_09_29_08_00]     imp29      ON imp.InitiativeId = imp29.InitiativeId
            LEFT JOIN [ImpactTrackings_2020_09_28_08_00]     imp28      ON imp.InitiativeId = imp28.InitiativeId
            LEFT JOIN [ImpactTrackings_2020_09_27_19_00]     imp27      ON imp.InitiativeId = imp27.InitiativeId
            LEFT JOIN [ImpactTrackings_2020_10_02_08_00]     imp02      ON imp.InitiativeId = imp02.InitiativeId
            INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
            WHERE 
            (imp.FirstRunRateMonth IS NULL OR imp.FirstRunRateMonth = '1970-01-01') AND ini.Stage LIKE '%IL%'
            --AND imp18.FirstRunRateMonth IS NOT NULL

            ORDER BY UpdatedDate DESC
        END
        ELSE IF (@mode = 'fix')
        BEGIN
            UPDATE imp
            SET
             imp.FinancialImpactArea =  COALESCE(
                CASE WHEN ISNULL(imp.FinancialImpactArea        , '') = '' THEN NULL ELSE       imp.FinancialImpactArea     END
                , CASE WHEN ISNULL(imp02.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp02.FinancialImpactArea   END
                , CASE WHEN ISNULL(imp29.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp29.FinancialImpactArea   END
                , CASE WHEN ISNULL(imp28.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp28.FinancialImpactArea   END
                , CASE WHEN ISNULL(imp27.FinancialImpactArea      , '') = '' THEN NULL ELSE       imp27.FinancialImpactArea   END
              )
            ,imp.FirstRunRateMonth   = COALESCE(
                CASE WHEN CONVERT(VARCHAR(10), imp.FirstRunRateMonth        , 120) = '1970-01-01' THEN NULL ELSE imp.FirstRunRateMonth                           END
                , CASE WHEN CONVERT(VARCHAR(10), imp02.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp02.FirstRunRateMonth                         END
                , CASE WHEN CONVERT(VARCHAR(10), imp29.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp29.FirstRunRateMonth                         END
                , CASE WHEN CONVERT(VARCHAR(10), imp28.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp28.FirstRunRateMonth                         END
                , CASE WHEN CONVERT(VARCHAR(10), imp27.FirstRunRateMonth      , 120) = '1970-01-01' THEN NULL ELSE imp27.FirstRunRateMonth                         END
              )
            ,imp.AutoCalculate       = ISNULL(COALESCE(
                CASE WHEN ISNULL(imp.AutoCalculate        , '') = '' THEN NULL ELSE       imp.AutoCalculate     END
                , CASE WHEN ISNULL(imp02.AutoCalculate      , '') = '' THEN NULL ELSE       imp02.AutoCalculate   END
                , CASE WHEN ISNULL(imp29.AutoCalculate      , '') = '' THEN NULL ELSE       imp29.AutoCalculate   END
                , CASE WHEN ISNULL(imp28.AutoCalculate      , '') = '' THEN NULL ELSE       imp28.AutoCalculate   END
                , CASE WHEN ISNULL(imp27.AutoCalculate      , '') = '' THEN NULL ELSE       imp27.AutoCalculate   END
              ), 0)
            ,imp.ImpiemantCost       = ISNULL(COALESCE(
                CASE WHEN ISNULL(imp.ImpiemantCost        , '') = '' THEN NULL ELSE       imp.ImpiemantCost     END
                , CASE WHEN ISNULL(imp02.ImpiemantCost      , '') = '' THEN NULL ELSE       imp02.ImpiemantCost   END
                , CASE WHEN ISNULL(imp29.ImpiemantCost      , '') = '' THEN NULL ELSE       imp29.ImpiemantCost   END
                , CASE WHEN ISNULL(imp28.ImpiemantCost      , '') = '' THEN NULL ELSE       imp28.ImpiemantCost   END
                , CASE WHEN ISNULL(imp27.ImpiemantCost      , '') = '' THEN NULL ELSE       imp27.ImpiemantCost   END
              ), 0)

            FROM 
            ImpactTrackings imp 
            LEFT JOIN [ImpactTrackings_2020_09_29_08_00]     imp29      ON imp.InitiativeId = imp29.InitiativeId
            LEFT JOIN [ImpactTrackings_2020_09_28_08_00]     imp28      ON imp.InitiativeId = imp28.InitiativeId
            LEFT JOIN [ImpactTrackings_2020_09_27_19_00]     imp27      ON imp.InitiativeId = imp27.InitiativeId
						LEFT JOIN [ImpactTrackings_2020_10_02_08_00]     imp02      ON imp.InitiativeId = imp02.InitiativeId
            INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
            WHERE 
            (imp.FirstRunRateMonth IS NULL OR imp.FirstRunRateMonth = '1970-01-01') AND ini.Stage LIKE '%IL%'
            --AND imp18.FirstRunRateMonth IS NOT NULL
        END
        ELSE
        BEGIN
            goto finder;
        END








END
GO
