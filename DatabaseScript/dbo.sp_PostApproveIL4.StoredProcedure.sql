/****** Object:  StoredProcedure [dbo].[sp_PostApproveIL4]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_PostApproveIL4]
(
    -- Add the parameters for the stored procedure here
	@InitiativeId INT,
    @flowType NVARCHAR(150)

)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON
	
    DECLARE @Currency NVARCHAR(150) = (SELECT currencyFloatFx from ImpactTypeOfBenefits where InitiativeId =   @InitiativeId and VersionPrice = N'FixedFX' and ImpactTypeOfBenefitTable = 'TypeBenefit'  )
 UPDATE  FloatBen 
SET

FloatBen.Month1=FixBen.Month1*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,1,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month2=FixBen.Month2*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,2,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month3=FixBen.Month3*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,3,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month4=FixBen.Month4*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,4,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month5=FixBen.Month5*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,5,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month6=FixBen.Month6*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,6,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month7=FixBen.Month7*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,7,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month8=FixBen.Month8*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,8,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month9=FixBen.Month9*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,9,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month10=FixBen.Month10*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,10,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month11=FixBen.Month11*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,11,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month12=FixBen.Month12*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,12,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month13=FixBen.Month13*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,13,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month14=FixBen.Month14*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,14,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month15=FixBen.Month15*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,15,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month16=FixBen.Month16*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,16,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month17=FixBen.Month17*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,17,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month18=FixBen.Month18*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,18,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month19=FixBen.Month19*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,19,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month20=FixBen.Month20*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,20,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month21=FixBen.Month21*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,21,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month22=FixBen.Month22*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,22,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month23=FixBen.Month23*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,23,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month24=FixBen.Month24*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,24,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month25=FixBen.Month25*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,25,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month26=FixBen.Month26*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,26,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month27=FixBen.Month27*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,27,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month28=FixBen.Month28*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,28,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month29=FixBen.Month29*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,29,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month30=FixBen.Month30*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,30,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month31=FixBen.Month31*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,31,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month32=FixBen.Month32*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,32,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month33=FixBen.Month33*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,33,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month34=FixBen.Month34*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,34,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month35=FixBen.Month35*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,35,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1),
FloatBen.Month36=FixBen.Month36*[dbo].[fn_FloatFX](ImpactTrackings.Firstrunratemonth,36,@Currency,@InitiativeId)/ISNULL(FixBen.FixedFX,1)


from 
ImpactTypeOfBenefits AS FloatBen
INNER JOIN ImpactTypeOfBenefits AS FixBen ON FixBen.InitiativeId = FloatBen.InitiativeId  AND  FixBen.VersionPrice = 'FixedFX'
INNER JOIN ImpactTrackings ON ImpactTrackings.InitiativeId = FloatBen.InitiativeId 
WHERE FloatBen.VersionPrice = 'FloatFX' 
AND FixBen.InitiativeId =   @InitiativeId
END
GO
