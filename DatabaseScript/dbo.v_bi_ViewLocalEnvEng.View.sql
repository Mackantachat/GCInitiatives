/****** Object:  View [dbo].[v_bi_ViewLocalEnvEng]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE view [dbo].[v_bi_ViewLocalEnvEng] AS
select
i.id as ProjectID, 
Attribute08 as PlantShortName,
Attribute16 AS [OperatingPlantGroup],
NULL AS LocalEnviEng 
from v_Initiatives i 
left join Commondata cd on cd.Attribute01 = i.Plant and DataType = 'plant'
where Attribute08 is not NULL 
GO
