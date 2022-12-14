/****** Object:  StoredProcedure [dbo].[sp_IF_WBS]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE PROCEDURE [dbo].[sp_IF_WBS]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON
	
    -- Insert statements for procedure here
if exists (select initiativetype from v_Initiatives where id = @initiativeId and InitiativeType =  'Request Pool')
--if exists (select initiativetype from v_Initiatives where id = @initiativeId and (InitiativeType in  ('Request Pool', 'directCapex')))
 Begin --select * from v_Initiatives where 1 = 0
  INSERT INTO 
	[dbo].[DevLog] (LogDateTime, ProcessName, Details, InitiativeId) 
VALUES 
	(GETDATE(), 'WBS', 'Request Pool or directCapex', @initiativeId)
 end
 else
 begin
 SELECT
 
   [Project Definition] --A
,  [WBS]    --B 
,  [PS: Short description] --C
,  [Std. Proj. def] --D
,  [No. of Person Resp] --E
,  [Company code]   --F
,  [Production/General Plant] --G
,  [Profit Center] --H
,  [Start Date] --I
,  [Finished Date] --J
,  [Proj.type]   -- K
,  [Responsible Cost Center] --L 
,  [Request Cost Center] --M 
,  [BOI / NSTDA] --N 
,  [Const. for sales] --O 
,  [BOI NO.] --P 
,  [Asset Group] --Q 
, [Assigned Date] --R 
, [CAP.Date] --S  
,  [Basic Start Date] --T
,  [Basic Finish Date] --U
,  [Actual Start Date ] --V   
,  [Project Manager] --W  
,  [Project Coordinator] --X  
,  [Budget Owner] --Y  
,  [EVP Project Owner] --Z 
,  [EX-IO] --AA
, [Solomon Category] --AB
,  [Physical Business Unit] --AC
,  [Physical Plant (SAP Plant)]  --AD
,  [Area/Panel No.] --AE
,  [Physical Unit] --AF
,  [eMOC Number] -- TEMPX  --AG 
,  [Project Material Cost] --AH
,  [Appropriation request] --AI
,  [Project  Definition System Status] --AJ
,  [AK] --AK
,  [AL] --AL

 
FROM [v_if_WBS] 
left join v_Initiatives ini on [v_if_WBS].InitiativesID = ini.id 
WHERE 
1 =  case when ini.InitiativeType = 'Request Pool' then 0 else 1 end
AND
([LineNo] <2 OR[InitiativesID] = @initiativeId) 

ORDER BY [LineNo]
end
END
GO
