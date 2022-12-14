/****** Object:  StoredProcedure [dbo].[sp_GetInitiativesVACPIC]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetInitiativesVACPIC]
(
    @initiativeIdLists NVARCHAR(800),
    @type NVARCHAR(500)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    
    SELECT 
        TOP 20
     ini.Id AS InitiativeId		
    ,ini.InitiativeCode AS InitiativeCode		
    ,ini.Name AS Name				
    ,ini.OwnerName AS OwnerName			
    ,ini.InitiativeType AS InitiativeType		
    ,ini.Plant AS Plant				
    ,mp.EmocNo AS EmocNo				
    ,SUBSTRING( UPPER(ISNULL(iniStage.Stage, ini.Stage)) , 1 ,5) AS Gate				
    ,'' AS Presentation		
    ,det.ProjectDocumentDatabase AS Pdd				
    ,ini.FxExchange AS FxExchange			
    ,ini.CostEstCapexType AS CostEstCapexType	
    ,ini.CostEstOpexType AS CostEstOpexType	
    ,FORMAT(ini.CostEstCapex, '#,##0.00#') AS RequestCapex		
    ,FORMAT(ini.CostEstOpex,  '#,##0.00#') AS RequestOpex		
    FROM v_Initiatives ini
    INNER JOIN DetailInformations det ON det.InitiativeId = ini.Id
    LEFT JOIN InitiativeStage iniStage ON iniStage.InitiativeId = ini.Id
    LEFT JOIN MainPlant mp ON mp.InitiativeID = ini.ID AND ISNULL(mp.IsMainPlant, 'false') = 'false' 
    --WHERE

    --(
    --ini.Id IN (SELECT Value FROM string_split(@initiativeIdLists, ','))
    --OR ISNULL(iniStage.Stage, ini.Stage) LIKE '%' + @type + '%'
    --)
    --AND ISNULL(iniStage.Status, ini.Status) = 'wait for approval'

    ORDER BY ini.Id DESC








END
GO
