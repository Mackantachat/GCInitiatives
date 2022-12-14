/****** Object:  View [dbo].[v_bi_TbTxnAnnualEBITDA_test]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_TbTxnAnnualEBITDA_test] as 
select 
	i.Id [ProjectId]
      ,'2015' as [EbitdaYear]
      ,'' as [ExpectedGain]
      ,'' as [ExpectedStatus]
      ,'1' as [KPI]
      ,'3.142931' as [Annualized]
      ,'0.261910917' as [TargetJan]
      ,'0.261910917' as [TargetFeb]
      ,'0.261910917' as [TargetMar]
      ,'0.261910917' as [TargetApr]
      ,'0.261910917' as [TargetMay]
      ,'0.261910917' as [TargetJun]
      ,'0.261910917' as [TargetJul]
      ,'0.261910917' as [TargetAug]
      ,'0.261910917' as [TargetSep]
      ,'0.261910917' as [TargetOct]
      ,'0.261910917' as [TargetNov]
      ,'0.261910917' as [TargetDec]
      ,'1.095' as [ActualJan]
      ,'' as [ActualFeb]
      ,'' as [ActualMar]
      ,'' as [ActualApr]
      ,'' as [ActualMay]
      ,'' as [ActualJun]
      ,'' as [ActualJul]
      ,'' as [ActualAug]
      ,'' as [ActualSep]
      ,'' as [ActualOct]
      ,'' as [ActualNov]
      ,'' as [ActualDec]
FROM v_Initiatives i
left join CommonData cd on cd.Attribute03 = i.Company and cd.DataType = 'company'
left join DetailInformations di on i.Id = di.InitiativeId
left join Owners o on o.OwnerName = di.ProjectManager

GO
