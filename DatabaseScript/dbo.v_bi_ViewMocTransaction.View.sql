/****** Object:  View [dbo].[v_bi_ViewMocTransaction]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE view [dbo].[v_bi_ViewMocTransaction] AS
select
i.id as ProjectID,
EMOC.EmocNo as ReqNo,
--EMOC.EmocNo as EMOCNo,
EMOC.EmocNo as MOCNo,
EMOC.TypeOfChange as MoCTypeID,
i.Name  as ProjectName,
i.OwnerName AS [Initiator],
i.CreatedBy AS CreateDate,
MOCChampion.EmployeeID as MOCChampion,
o2.[Indicator] as 'Indicator',
cd.Attribute08 as PlantID,
i.CreatedDate as CreatedDate,
IF_MOC.StepID as StepID,
EMOC.ExpireDate as 'ExpireDate',
IF_MOC.P1FinDate as P1FinDate,
IF_MOC.P2FinDate as P2FinDate,
IF_MOC.P3FinDate as P3FinDate,
IF_MOC.P4FinDate as P4FinDate,
IF_MOC.[CompleteStartUpDate] as CompleteStartUpDate,
IF_MOC.UploadDate as UploadDate,
IF_MOC.MOCID as MOCID,
IF_MOC.part as part,
IF_MOC.EasyTrackingID as EasyTrackingID,
null as EasyTrackingDesc,
EMOC.MocCategory as MoCCategory,

IF_MOC.SHERepDM as SHERepDM,
IF_MOC.SHERepDMDisp as SHERepDMDisp,
LEFT(OW_SHE.Email,  CHARINDEX ('@',OW_SHE.Email,0)-1) as SHERepDMName,
OW_SHE.Indicator as SHERepDMIndicator,

IF_MOC.SHERepReviewer as SHERepReviewer,
OW_SHERep.OwnerName as SHERepReviewerDisp,
LEFT(OW_SHERep.Email,  CHARINDEX ('@',OW_SHERep.Email,0)-1) as SHERepReviewerName,
OW_SHERep.Indicator as SHERepReviewerIndicator,


IF_MOC.ProcessEngDM as ProcessEngDM,
OW_ProEngDM.OwnerName as ProcessEngDMDisp,
LEFT(OW_ProEngDM.Email,  CHARINDEX ('@',OW_ProEngDM.Email,0)-1)  as ProcessEngDMName,
OW_ProEngDM.Indicator as ProcessEngDMIndicator,

IF_MOC.ProcessEngReviewer as ProcessEngReviewer,
IF_MOC.ProcessEngReviewerDisp as ProcessEngReviewerDisp,
LEFT(OW_ProEngRe.Email,  CHARINDEX ('@',OW_ProEngRe.Email,0)-1)  as ProcessEngReviewerName,
OW_ProEngRe.Indicator as ProcessEngReviewerIndicator,


IF_MOC.UnitName as UnitName,
IF_MOC.BasicDesignReviewDate as BasicDesignReviewDate,
null as EngineerDM,
di.DivMgrOfProcessEngineer as EngineerDMDisp,
null as EngineerDMIndicator
from v_Initiatives i 
left join Owners o2 on i.OwnerName = o2.OwnerName 
left join CommonData cd on cd.Attribute06 = i.Plant
left join DetailInformations di on di.InitiativeId = i.Id 
left join MainPlant EMOC on EMOC.InitiativeId = i.id
left join Owners MOCChampion on EMOC.MocChampion = MOCChampion.OwnerName

left join Owners OW_ENG on OW_ENG.OwnerName = di.ProjectEngineer
left join IF_MOCTransaction IF_MOC on IF_MOC.MOCNo = EMOC.EmocNo

left join Owners OW_SHE on OW_SHE.EmployeeID = IF_MOC.SHERepDM
left join Owners OW_SHERep on OW_SHERep.EmployeeID = IF_MOC.SHERepReviewer
left join Owners OW_ProEngRe on OW_ProEngRe.EmployeeID = IF_MOC.ProcessEngReviewer
left join Owners OW_ProEngDM on OW_ProEngDM.EmployeeID = IF_MOC.ProcessEngDM
where ISNULL(EMOC.EmocNo,'')  <> ''
GO
