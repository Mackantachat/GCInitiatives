/****** Object:  View [dbo].[v_bi_TbMstPlant]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE view [dbo].[v_bi_TbMstPlant] AS
select
cd.Attribute02 as PlantID,
cd.Attribute03 as PlantName,
cd.Attribute09 as BusinessUnitID,
cd.Attribute06 as ATOMsPlantCode,
cd.Attribute08 as PlantShortName,
null as IsOperatingPlant,
cd.Attribute08  as OperatingPlantGroup,
cd.Attribute08 as EMOCPlant,
null as KBSPlant
from CommonData cd 
where DataType = 'plant'
AND cd.Attribute02 IS NOT NULL
GO
