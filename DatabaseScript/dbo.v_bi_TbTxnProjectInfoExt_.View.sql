/****** Object:  View [dbo].[v_bi_TbTxnProjectInfoExt_]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_TbTxnProjectInfoExt_] as 
select 
	i.id as [ProjectID]
      ,'' as [ProjectShortName]
      ,'P3' as [ProjectCategoryId]
      ,'To mitigate Lost Production Opportunity (LPO) due to severe corrosion
 and erosion from pH solvent low at U-540 and
 cause  to  serious leak that need long time 
for repair and prevent the incident of column collapsed.' as [ProjectBackground]
      ,'12/31/2015 12:00:00 AM' as [PlanUpliftStartDate]
      ,'12/31/2015 12:00:00 AM' as [PlanLookbackDate]
      ,'12/31/2015 12:00:00 AM' as [ActualLookbackDate]
      ,'Images/107/Oil mist_ Mark up plot plan.png' as [DiagramFilePath]
      ,'26001665' as [PIRNo]
      ,'26001750' as [PIRReviewer1]
      ,'26001750 Sirichai Pl' as [PIRReviewer1Disp]
      ,'26001936' as [PIRReviewer2]
      ,'26001936 Songsak S' as [PIRReviewer2Disp]
      ,'26000922' as [PIRReviewer3]
      ,'26000922 Piphat T' as [PIRReviewer3Disp]
      ,'26001749' as [PIRReviewer4]
      ,'26001749 Patcharaporn L' as [PIRReviewer4Disp]
      ,'26002710' as [PIRReviewer5]
      ,'26002710 Patthamika C' as [PIRReviewer5Disp]
      ,'12/31/2015 12:00:00 AM' as [MCEndorseDate]
      ,'' as [LookbackStrategy]
      ,'' as [LookbackStatus]
      ,'26002820' as [ProjectRiskOwner]
      ,'26002820 Jeerawat W' as [ProjectRiskOwnerDisp]
      ,'12/31/2015 12:00:00 AM' as [BPAsOfDate]
      ,'26001671 Pornpon M' as [SubmitBy]
      ,'12/31/2015 12:00:00 AM' as [SubmitedDate]
      ,'26001671 Pornpon M' as [PublishBy]
      ,'12/31/2015 12:00:00 AM' as [PublishedDate]
      ,'' as [RejectBy]
      ,'' as [RejectDate]
      ,'' as [ApproveBy]
      ,'' as [ApprovedDate]
      ,'' as [ReviseBy]
      ,'' as [ReviseDate]
      ,'' as [ScopeOfProject]
FROM v_Initiatives i
left join CommonData cd on cd.Attribute03 = i.Company and cd.DataType = 'company'
left join DetailInformations di on i.Id = di.InitiativeId
left join Owners o on o.OwnerName = di.ProjectManager

GO
