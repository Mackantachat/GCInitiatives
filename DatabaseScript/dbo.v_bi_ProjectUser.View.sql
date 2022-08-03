/****** Object:  View [dbo].[v_bi_ProjectUser]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_ProjectUser] AS
select
i.Id as ProjectID,
o.EmployeeID as RequesterEmployeeID,
o.FirstName + o.LastName as RequesterName,
o.OrgID as RequesterOrgID,
NULL as DMEmployeeID,
NULL as DMName,
NULL as DMOrgID,
NULL as VPEmployeeID,
NULL as VPName,
NULL as VPOrgID,
NULL as EVPEmployeeID,
NULL as EVPName,
NULL as EVPOrgID,
NULL as LastPersonEmployeeID,
NULL as LastPersonName,
NULL as LastPersonOrgID,
NULL as CoordinatorEmployeeID,
NULL as CoordinatorName,
NULL as CoordinatorOrgID,
o.OwnerName ,
o.FirstName,
o.[Indicator] ,
o.LastName ,
o.Telephone ,
o.Email ,
o.ActionText ,
o.ActionType ,
o.AdminGroup ,
o.AssignmentCostCenter ,
o.BloodGrp ,
o.CEOManagerEmpID ,
o.CEOManagerPositionID ,
o.CEOOrgID ,
o.CEOShortTextEN ,
o.CEOTextEN ,
o.CompanyCode ,
o.CompanyName ,
o.CompanyShortTxt ,
o.DepManagerEmpID ,
o.DepManagerPositionID ,
o.DepOrgID ,
o.DepShortTextEN ,
o.DepTextEN ,
o.DivManagerEmpID ,
o.DivManagerPositionID ,
o.DivOrgID ,
o.DivShortTextEN ,
o.DivTextEN ,
o.EmpGroup ,
o.EmpGroupTxt ,
o.EmpSubGroup ,
o.EmpSubGroupTxt ,
o.EmploymentStatus ,
o.EmploymentStatusTxt ,
o.Extension ,
o.FNGRPManagerEmpID ,
o.FNGRPManagerPositionID ,
o.FNGRPOrgID ,
o.FNGRPShortTextEN ,
o.FNGRPTextEN ,
o.FNManagerEmpID,
o.FNManagerPositionID ,
o.FNOrgID ,
o.FNShortTextEN ,
o.FNTextEN ,
o.MainPositionCostCenter ,
o.MainPositionFlg ,
o.OrgID ,
o.OrgLevel ,
o.OrgShortTextEN ,
o.OrgTextEN ,
o.PSDManagerEmpID ,
o.PSDManagerPositionID ,
o.PSDOrgID ,
o.PSDShortTextEN ,
o.PSDTextEN ,
o.ParentOrgID ,
o.PositionID ,
o.PositionLevel ,
o.PositionShortTextEN ,
o.PositionTextEN ,
o.ShiftManagerEmpID ,
o.ShiftManagerPositionID ,
o.ShiftOrgID ,
o.ShiftShortTextEN ,
o.ShiftTextEN ,
o.SupManagerEmpID ,
o.SupManagerPositionID ,
o.SupOrgID ,
o.SupShortTextEN ,
o.SupTextEN ,
o.Title ,
o.UnitManagerEmpID ,
o.UnitManagerPositionID ,
o.UnitOrgID ,
o.UnitShortTextEN ,
o.UnitTextEN ,
o.DataSource ,
o2.OwnerName as CreatedBy,
o2.EmployeeID as CreatedByID,
o2.OrgID as OrgCreate,
i.CreatedDate ,
o3.OwnerName as UpdatedBy,
o3.EmployeeID as UpdatedByID,
o3.OrgID as OrgUpdate,
i.UpdatedDate 
from v_Initiatives i 
left join DetailInformations di on di.InitiativeId = i.Id 
left join Owners o on o.OwnerName =i.OwnerName 
left join Owners o2 on o2.OwnerName = i.CreatedBy 
left join Owners o3 on o3.OwnerName = i.UpdatedBy


GO
