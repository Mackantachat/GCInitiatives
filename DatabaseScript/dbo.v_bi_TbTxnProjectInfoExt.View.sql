/****** Object:  View [dbo].[v_bi_TbTxnProjectInfoExt]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE view [dbo].[v_bi_TbTxnProjectInfoExt] AS
select
distinct
i.id as ProjectId,
i.Name as ProjectShortName,
convert(nvarchar(1000),NULL) as ProjectCategoryId,
i.Background as ProjectBackground,
convert(datetime,null) as PlanUpliftStartDate,
convert(datetime,lookback.PlanLookbackDate) as PlanLookbackDate,
convert(datetime,PlanDate.ActualFinishDate) as [ActualLookbackDate],
convert(nvarchar(1000),NULL)  as DiagramFilePath,
i.id as PIRNo,
PIRReviewer.EmployeeID as PIRReviewer1,
PIRReviewer.OwnerName as PIRReviewer1Disp,
convert(nvarchar(1000),NULL) as PIRReviewer2,
convert(nvarchar(1000),NULL) as PIRReviewer2Disp,
convert(nvarchar(1000),NULL) as PIRReviewer3,
convert(nvarchar(1000),NULL) as PIRReviewer3Disp,
convert(nvarchar(1000),NULL) as PIRReviewer4,
convert(nvarchar(1000),NULL) as PIRReviewer4Disp,
convert(nvarchar(1000),NULL) as PIRReviewer5,
convert(nvarchar(1000),NULL) as PIRReviewer5Disp,
convert(datetime,null) as MCEndorseDate,
convert(nvarchar(1000),NULL) as LookbackStrategy,
convert(nvarchar(1000),NULL) as LookbackStatus,
convert(nvarchar(1000),NULL) as ProjectRiskOwner,
convert(nvarchar(1000),NULL) as ProjectRiskOwnerDisp,
convert(datetime,null) as BPAsOfDate,
convert(nvarchar(1000),NULL) as SubmitBy,
convert(datetime,null) as SubmitedDate,
convert(nvarchar(1000),NULL) as PublishBy,
convert(datetime,null) as PublishedDate,
convert(nvarchar(1000),NULL) as RejectBy,
convert(datetime,null) as RejectDate,
convert(nvarchar(1000),NULL) as ApproveBy,
convert(datetime,null) as ApprovedDate,
convert(nvarchar(1000),NULL) as ReviseBy,
convert(datetime,null) as ReviseDate,
i.ScopeOfWork as ScopeOfProject
FROM dbo.v_Initiatives i 
left join ProjectLookback Lookback on Lookback.InitiativeId = i.Id
left join ProgressPlanDate PlanDate on PlanDate.InitiativeId = i.Id  and  PlanDate.ProgressPlanDateType IN( 'Overall' , 'Over All')
left join LookbackReview Review on Lookback.ProjectLookbackId = Review.ProjectLookbackId 
left join Owners PIRReviewer on PIRReviewer.OwnerName = Review.ProjectReviewTeam

GO
