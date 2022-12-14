/****** Object:  StoredProcedure [dbo].[sp_FIX_CheckImpactTypeOfBenefitZeroOnFirstMonth]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_CheckImpactTypeOfBenefitZeroOnFirstMonth]
(
    -- Add the parameters for the stored procedure here
    @mode NVARCHAR(20) = 'find'
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    
IF(@mode <> 'fix')
    BEGIN

    


            SELECT 
            au.OldValue AS old,
            au.NewValue AS new,
            ini.Id,
            ini.InitiativeCode,
            ini.Status,
            ini.Stage,


            it.ImpactTypeOfBenefitTable
            ,it.TypeOfBenefit
            ,it.VersionPrice
            ,it.RunRate
            ,it.Month1
            ,it.Month2
            ,it.Month3
            ,it.Month4
            ,it.Month5
            ,it.Month6
            ,it.Month7
            ,it.Month8
            ,it.Month9
            ,it.Month10
            ,it.Month11
            ,it.Month12
            ,it.Month13
            ,it.Month14
            ,it.Month15
            ,it.Month16
            ,it.Month17
            ,it.Month18
            ,it.Month19
            ,it.Month20
            ,it.Month21
            ,it.Month22
            ,it.Month23
            ,it.Month24
            ,it.Month25
            ,it.Month26
            ,it.Month27
            ,it.Month28
            ,it.Month29
            ,it.Month30
            ,it.Month31
            ,it.Month32
            ,it.Month33
            ,it.Month34
            ,it.Month35
            ,it.Month36
            ,it.InitiativeId
            ,it.FixedFX

            --*

            --UPDATE it SET it.Month1 = NULL
            FROM v_Initiatives ini
            INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
            INNER JOIN ImpactTypeOfBenefits it ON it.InitiativeId = ini.Id AND it.VersionPrice = 'Actual'
            LEFT JOIN Audits au ON au.InitiativeCode = ini.InitiativeCode AND au.FieldName = 'Stage' AND ISNULL(au.NewValue, '') NOT IN ('IL4','IL5','SIL5')
            WHERE
            (1=1
            )
            AND ini.Stage IN ('IL0','IL1','IL2','SIL2','IL3','SIL3','SIL4')
            AND 
            ISNULL(it.Month1, -999) = 0 
            AND ISNULL(it.RunRate, -999) = -999 
            --AND ini.Id NOT IN (51753,51753,51655)

            AND
            (
             it.Month2     IS NULL
            AND it.Month3     IS NULL
            AND it.Month4     IS NULL
            AND it.Month5     IS NULL
            AND it.Month6     IS NULL
            AND it.Month7     IS NULL
            AND it.Month8     IS NULL
            AND it.Month9     IS NULL
            AND it.Month10    IS NULL
            AND it.Month11    IS NULL
            AND it.Month12    IS NULL
            AND it.Month13    IS NULL
            AND it.Month14    IS NULL
            AND it.Month15    IS NULL
            AND it.Month16    IS NULL
            AND it.Month17    IS NULL
            AND it.Month18    IS NULL
            AND it.Month19    IS NULL
            AND it.Month20    IS NULL
            AND it.Month21    IS NULL
            AND it.Month22    IS NULL
            AND it.Month23    IS NULL
            AND it.Month24    IS NULL
            AND it.Month25    IS NULL
            AND it.Month26    IS NULL
            AND it.Month27    IS NULL
            AND it.Month28    IS NULL
            AND it.Month29    IS NULL
            AND it.Month30    IS NULL
            AND it.Month31    IS NULL
            AND it.Month32    IS NULL
            AND it.Month33    IS NULL
            AND it.Month34    IS NULL
            AND it.Month35    IS NULL
            AND it.Month36    IS NULL


            )







            SELECT 
            au.OldValue AS old,
            au.NewValue AS new,
            ini.Id,
            ini.InitiativeCode,
            ini.Status,
            ini.Stage,


            it.ImpactTypeOfBenefitTable
            ,it.TypeOfBenefit
            ,it.VersionPrice
            ,it.RunRate
            ,it.Month1
            ,it.Month2
            ,it.Month3
            ,it.Month4
            ,it.Month5
            ,it.Month6
            ,it.Month7
            ,it.Month8
            ,it.Month9
            ,it.Month10
            ,it.Month11
            ,it.Month12
            ,it.Month13
            ,it.Month14
            ,it.Month15
            ,it.Month16
            ,it.Month17
            ,it.Month18
            ,it.Month19
            ,it.Month20
            ,it.Month21
            ,it.Month22
            ,it.Month23
            ,it.Month24
            ,it.Month25
            ,it.Month26
            ,it.Month27
            ,it.Month28
            ,it.Month29
            ,it.Month30
            ,it.Month31
            ,it.Month32
            ,it.Month33
            ,it.Month34
            ,it.Month35
            ,it.Month36
            ,it.InitiativeId
            ,it.FixedFX

            --*

            --UPDATE it SET it.Month1 = NULL
            FROM v_Initiatives ini
            INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
            INNER JOIN ImpactTypeOfBenefits it ON it.InitiativeId = ini.Id AND it.VersionPrice = 'Revise'
            LEFT JOIN Audits au ON au.InitiativeCode = ini.InitiativeCode AND au.FieldName = 'Stage' AND ISNULL(au.NewValue, '') NOT IN ('IL3','SIL4','IL4','IL5','SIL5')
            WHERE
            (1=1
            )
            AND ini.Stage IN ('IL0','IL1','IL2','SIL2','SIL3')
            AND 
            ISNULL(it.Month1, -999) = 0 
            AND ISNULL(it.RunRate, -999) = -999 
            --AND ini.Id NOT IN (51753,51753,51655)


            AND
            (
             it.Month2     IS NULL
            AND it.Month3     IS NULL
            AND it.Month4     IS NULL
            AND it.Month5     IS NULL
            AND it.Month6     IS NULL
            AND it.Month7     IS NULL
            AND it.Month8     IS NULL
            AND it.Month9     IS NULL
            AND it.Month10    IS NULL
            AND it.Month11    IS NULL
            AND it.Month12    IS NULL
            AND it.Month13    IS NULL
            AND it.Month14    IS NULL
            AND it.Month15    IS NULL
            AND it.Month16    IS NULL
            AND it.Month17    IS NULL
            AND it.Month18    IS NULL
            AND it.Month19    IS NULL
            AND it.Month20    IS NULL
            AND it.Month21    IS NULL
            AND it.Month22    IS NULL
            AND it.Month23    IS NULL
            AND it.Month24    IS NULL
            AND it.Month25    IS NULL
            AND it.Month26    IS NULL
            AND it.Month27    IS NULL
            AND it.Month28    IS NULL
            AND it.Month29    IS NULL
            AND it.Month30    IS NULL
            AND it.Month31    IS NULL
            AND it.Month32    IS NULL
            AND it.Month33    IS NULL
            AND it.Month34    IS NULL
            AND it.Month35    IS NULL
            AND it.Month36    IS NULL


            )







            SELECT 
            au.OldValue AS old,
            au.NewValue AS new,
            ini.Id,
            ini.InitiativeCode,
            ini.Status,
            ini.Stage,


            it.ImpactTypeOfBenefitTable
            ,it.TypeOfBenefit
            ,it.VersionPrice
            ,it.RunRate
            ,it.Month1
            ,it.Month2
            ,it.Month3
            ,it.Month4
            ,it.Month5
            ,it.Month6
            ,it.Month7
            ,it.Month8
            ,it.Month9
            ,it.Month10
            ,it.Month11
            ,it.Month12
            ,it.Month13
            ,it.Month14
            ,it.Month15
            ,it.Month16
            ,it.Month17
            ,it.Month18
            ,it.Month19
            ,it.Month20
            ,it.Month21
            ,it.Month22
            ,it.Month23
            ,it.Month24
            ,it.Month25
            ,it.Month26
            ,it.Month27
            ,it.Month28
            ,it.Month29
            ,it.Month30
            ,it.Month31
            ,it.Month32
            ,it.Month33
            ,it.Month34
            ,it.Month35
            ,it.Month36
            ,it.InitiativeId
            ,it.FixedFX

            --*

            --UPDATE it SET it.Month1 = NULL
            FROM v_Initiatives ini
            INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
            INNER JOIN ImpactTypeOfBenefits it ON it.InitiativeId = ini.Id AND it.VersionPrice = 'FixedFX'
            LEFT JOIN Audits au ON au.InitiativeCode = ini.InitiativeCode AND au.FieldName = 'Stage' AND ISNULL(au.NewValue, '') NOT IN ('IL4','IL5','SIL5')
            WHERE
            (1=1
            )
            AND ini.Stage IN ('IL0','IL1','IL2','SIL2','IL3','SIL3','SIL4')
            AND 
            ISNULL(it.Month1, -999) = 0 
            AND ISNULL(it.RunRate, -999) = -999 
            --AND ini.Id NOT IN (51753,51753,51655)


            AND
            (
             it.Month2     IS NULL
            AND it.Month3     IS NULL
            AND it.Month4     IS NULL
            AND it.Month5     IS NULL
            AND it.Month6     IS NULL
            AND it.Month7     IS NULL
            AND it.Month8     IS NULL
            AND it.Month9     IS NULL
            AND it.Month10    IS NULL
            AND it.Month11    IS NULL
            AND it.Month12    IS NULL
            AND it.Month13    IS NULL
            AND it.Month14    IS NULL
            AND it.Month15    IS NULL
            AND it.Month16    IS NULL
            AND it.Month17    IS NULL
            AND it.Month18    IS NULL
            AND it.Month19    IS NULL
            AND it.Month20    IS NULL
            AND it.Month21    IS NULL
            AND it.Month22    IS NULL
            AND it.Month23    IS NULL
            AND it.Month24    IS NULL
            AND it.Month25    IS NULL
            AND it.Month26    IS NULL
            AND it.Month27    IS NULL
            AND it.Month28    IS NULL
            AND it.Month29    IS NULL
            AND it.Month30    IS NULL
            AND it.Month31    IS NULL
            AND it.Month32    IS NULL
            AND it.Month33    IS NULL
            AND it.Month34    IS NULL
            AND it.Month35    IS NULL
            AND it.Month36    IS NULL


            )






            SELECT 
            au.OldValue AS old,
            au.NewValue AS new,
            ini.Id,
            ini.InitiativeCode,
            ini.Status,
            ini.Stage,


            it.ImpactTypeOfBenefitTable
            ,it.TypeOfBenefit
            ,it.VersionPrice
            ,it.RunRate
            ,it.Month1
            ,it.Month2
            ,it.Month3
            ,it.Month4
            ,it.Month5
            ,it.Month6
            ,it.Month7
            ,it.Month8
            ,it.Month9
            ,it.Month10
            ,it.Month11
            ,it.Month12
            ,it.Month13
            ,it.Month14
            ,it.Month15
            ,it.Month16
            ,it.Month17
            ,it.Month18
            ,it.Month19
            ,it.Month20
            ,it.Month21
            ,it.Month22
            ,it.Month23
            ,it.Month24
            ,it.Month25
            ,it.Month26
            ,it.Month27
            ,it.Month28
            ,it.Month29
            ,it.Month30
            ,it.Month31
            ,it.Month32
            ,it.Month33
            ,it.Month34
            ,it.Month35
            ,it.Month36
            ,it.InitiativeId
            ,it.FixedFX

            --*

            --UPDATE it SET it.Month1 = NULL
            FROM v_Initiatives ini
            INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
            INNER JOIN ImpactTypeOfBenefits it ON it.InitiativeId = ini.Id AND it.VersionPrice = 'FloatFX'
            LEFT JOIN Audits au ON au.InitiativeCode = ini.InitiativeCode AND au.FieldName = 'Stage' AND ISNULL(au.NewValue, '') NOT IN ('IL4','IL5','SIL5')
            WHERE
            (1=1
            )
            AND ini.Stage IN ('IL0','IL1','IL2','SIL2','IL3','SIL3','SIL4')
            AND 
            ISNULL(it.Month1, -999) = 0 
            AND ISNULL(it.RunRate, -999) = -999 
            --AND ini.Id NOT IN (51753,51753,51655)


            AND
            (
             it.Month2     IS NULL
            AND it.Month3     IS NULL
            AND it.Month4     IS NULL
            AND it.Month5     IS NULL
            AND it.Month6     IS NULL
            AND it.Month7     IS NULL
            AND it.Month8     IS NULL
            AND it.Month9     IS NULL
            AND it.Month10    IS NULL
            AND it.Month11    IS NULL
            AND it.Month12    IS NULL
            AND it.Month13    IS NULL
            AND it.Month14    IS NULL
            AND it.Month15    IS NULL
            AND it.Month16    IS NULL
            AND it.Month17    IS NULL
            AND it.Month18    IS NULL
            AND it.Month19    IS NULL
            AND it.Month20    IS NULL
            AND it.Month21    IS NULL
            AND it.Month22    IS NULL
            AND it.Month23    IS NULL
            AND it.Month24    IS NULL
            AND it.Month25    IS NULL
            AND it.Month26    IS NULL
            AND it.Month27    IS NULL
            AND it.Month28    IS NULL
            AND it.Month29    IS NULL
            AND it.Month30    IS NULL
            AND it.Month31    IS NULL
            AND it.Month32    IS NULL
            AND it.Month33    IS NULL
            AND it.Month34    IS NULL
            AND it.Month35    IS NULL
            AND it.Month36    IS NULL


            )



    END

ELSE

    BEGIN

    


            UPDATE it SET it.Month1 = NULL
            FROM v_Initiatives ini
            INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
            INNER JOIN ImpactTypeOfBenefits it ON it.InitiativeId = ini.Id AND it.VersionPrice = 'Actual'
            LEFT JOIN Audits au ON au.InitiativeCode = ini.InitiativeCode AND au.FieldName = 'Stage' AND ISNULL(au.NewValue, '') NOT IN ('IL4','IL5','SIL5')
            WHERE
            (1=1
            )
            AND ini.Stage IN ('IL0','IL1','IL2','SIL2','IL3','SIL3','SIL4')
            AND 
            ISNULL(it.Month1, -999) = 0 
            AND ISNULL(it.RunRate, -999) = -999 
            --AND ini.Id NOT IN (51753,51753,51655)

            AND
            (
             it.Month2     IS NULL
            AND it.Month3     IS NULL
            AND it.Month4     IS NULL
            AND it.Month5     IS NULL
            AND it.Month6     IS NULL
            AND it.Month7     IS NULL
            AND it.Month8     IS NULL
            AND it.Month9     IS NULL
            AND it.Month10    IS NULL
            AND it.Month11    IS NULL
            AND it.Month12    IS NULL
            AND it.Month13    IS NULL
            AND it.Month14    IS NULL
            AND it.Month15    IS NULL
            AND it.Month16    IS NULL
            AND it.Month17    IS NULL
            AND it.Month18    IS NULL
            AND it.Month19    IS NULL
            AND it.Month20    IS NULL
            AND it.Month21    IS NULL
            AND it.Month22    IS NULL
            AND it.Month23    IS NULL
            AND it.Month24    IS NULL
            AND it.Month25    IS NULL
            AND it.Month26    IS NULL
            AND it.Month27    IS NULL
            AND it.Month28    IS NULL
            AND it.Month29    IS NULL
            AND it.Month30    IS NULL
            AND it.Month31    IS NULL
            AND it.Month32    IS NULL
            AND it.Month33    IS NULL
            AND it.Month34    IS NULL
            AND it.Month35    IS NULL
            AND it.Month36    IS NULL


            )







            UPDATE it SET it.Month1 = NULL
            FROM v_Initiatives ini
            INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
            INNER JOIN ImpactTypeOfBenefits it ON it.InitiativeId = ini.Id AND it.VersionPrice = 'Revise'
            LEFT JOIN Audits au ON au.InitiativeCode = ini.InitiativeCode AND au.FieldName = 'Stage' AND ISNULL(au.NewValue, '') NOT IN ('IL3','SIL4','IL4','IL5','SIL5')
            WHERE
            (1=1
            )
            AND ini.Stage IN ('IL0','IL1','IL2','SIL2','SIL3')
            AND 
            ISNULL(it.Month1, -999) = 0 
            AND ISNULL(it.RunRate, -999) = -999 
            --AND ini.Id NOT IN (51753,51753,51655)


            AND
            (
             it.Month2     IS NULL
            AND it.Month3     IS NULL
            AND it.Month4     IS NULL
            AND it.Month5     IS NULL
            AND it.Month6     IS NULL
            AND it.Month7     IS NULL
            AND it.Month8     IS NULL
            AND it.Month9     IS NULL
            AND it.Month10    IS NULL
            AND it.Month11    IS NULL
            AND it.Month12    IS NULL
            AND it.Month13    IS NULL
            AND it.Month14    IS NULL
            AND it.Month15    IS NULL
            AND it.Month16    IS NULL
            AND it.Month17    IS NULL
            AND it.Month18    IS NULL
            AND it.Month19    IS NULL
            AND it.Month20    IS NULL
            AND it.Month21    IS NULL
            AND it.Month22    IS NULL
            AND it.Month23    IS NULL
            AND it.Month24    IS NULL
            AND it.Month25    IS NULL
            AND it.Month26    IS NULL
            AND it.Month27    IS NULL
            AND it.Month28    IS NULL
            AND it.Month29    IS NULL
            AND it.Month30    IS NULL
            AND it.Month31    IS NULL
            AND it.Month32    IS NULL
            AND it.Month33    IS NULL
            AND it.Month34    IS NULL
            AND it.Month35    IS NULL
            AND it.Month36    IS NULL


            )






            UPDATE it SET it.Month1 = NULL
            FROM v_Initiatives ini
            INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
            INNER JOIN ImpactTypeOfBenefits it ON it.InitiativeId = ini.Id AND it.VersionPrice = 'FixedFX'
            LEFT JOIN Audits au ON au.InitiativeCode = ini.InitiativeCode AND au.FieldName = 'Stage' AND ISNULL(au.NewValue, '') NOT IN ('IL4','IL5','SIL5')
            WHERE
            (1=1
            )
            AND ini.Stage IN ('IL0','IL1','IL2','SIL2','IL3','SIL3','SIL4')
            AND 
            ISNULL(it.Month1, -999) = 0 
            AND ISNULL(it.RunRate, -999) = -999 
            --AND ini.Id NOT IN (51753,51753,51655)


            AND
            (
             it.Month2     IS NULL
            AND it.Month3     IS NULL
            AND it.Month4     IS NULL
            AND it.Month5     IS NULL
            AND it.Month6     IS NULL
            AND it.Month7     IS NULL
            AND it.Month8     IS NULL
            AND it.Month9     IS NULL
            AND it.Month10    IS NULL
            AND it.Month11    IS NULL
            AND it.Month12    IS NULL
            AND it.Month13    IS NULL
            AND it.Month14    IS NULL
            AND it.Month15    IS NULL
            AND it.Month16    IS NULL
            AND it.Month17    IS NULL
            AND it.Month18    IS NULL
            AND it.Month19    IS NULL
            AND it.Month20    IS NULL
            AND it.Month21    IS NULL
            AND it.Month22    IS NULL
            AND it.Month23    IS NULL
            AND it.Month24    IS NULL
            AND it.Month25    IS NULL
            AND it.Month26    IS NULL
            AND it.Month27    IS NULL
            AND it.Month28    IS NULL
            AND it.Month29    IS NULL
            AND it.Month30    IS NULL
            AND it.Month31    IS NULL
            AND it.Month32    IS NULL
            AND it.Month33    IS NULL
            AND it.Month34    IS NULL
            AND it.Month35    IS NULL
            AND it.Month36    IS NULL


            )




            UPDATE it SET it.Month1 = NULL
            FROM v_Initiatives ini
            INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
            INNER JOIN ImpactTypeOfBenefits it ON it.InitiativeId = ini.Id AND it.VersionPrice = 'FloatFX'
            LEFT JOIN Audits au ON au.InitiativeCode = ini.InitiativeCode AND au.FieldName = 'Stage' AND ISNULL(au.NewValue, '') NOT IN ('IL4','IL5','SIL5')
            WHERE
            (1=1
            )
            AND ini.Stage IN ('IL0','IL1','IL2','SIL2','IL3','SIL3','SIL4')
            AND 
            ISNULL(it.Month1, -999) = 0 
            AND ISNULL(it.RunRate, -999) = -999 
            --AND ini.Id NOT IN (51753,51753,51655)


            AND
            (
             it.Month2     IS NULL
            AND it.Month3     IS NULL
            AND it.Month4     IS NULL
            AND it.Month5     IS NULL
            AND it.Month6     IS NULL
            AND it.Month7     IS NULL
            AND it.Month8     IS NULL
            AND it.Month9     IS NULL
            AND it.Month10    IS NULL
            AND it.Month11    IS NULL
            AND it.Month12    IS NULL
            AND it.Month13    IS NULL
            AND it.Month14    IS NULL
            AND it.Month15    IS NULL
            AND it.Month16    IS NULL
            AND it.Month17    IS NULL
            AND it.Month18    IS NULL
            AND it.Month19    IS NULL
            AND it.Month20    IS NULL
            AND it.Month21    IS NULL
            AND it.Month22    IS NULL
            AND it.Month23    IS NULL
            AND it.Month24    IS NULL
            AND it.Month25    IS NULL
            AND it.Month26    IS NULL
            AND it.Month27    IS NULL
            AND it.Month28    IS NULL
            AND it.Month29    IS NULL
            AND it.Month30    IS NULL
            AND it.Month31    IS NULL
            AND it.Month32    IS NULL
            AND it.Month33    IS NULL
            AND it.Month34    IS NULL
            AND it.Month35    IS NULL
            AND it.Month36    IS NULL


            )


    END


END
GO
