/****** Object:  View [dbo].[v_bi_ViewTbTxnPIMLessonLearned]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[v_bi_ViewTbTxnPIMLessonLearned] AS
select
distinct i.id as ProjectID,
1 as 'SECTION',
ll.MilestoneNo as ItemNo,
ll.AreaOfLearning as KnowledgeArea,
ll.Issues as Issue,
ll.Background as Background,
ll.LessonLearned as LessonLearned
from dbo.v_Initiatives i
left join LessonsLearned ll on ll.InitiativeId = i.id
where ll.MilestoneNo is not null
GO
