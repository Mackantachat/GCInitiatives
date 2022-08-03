
--check script
select top 100 CostCenterOfVP,CodeCostCenterOfVP,* from CapexInformations where InitiativeId = '62025'


--***Urgent Case*** รบกวนแก้ไขข้อมูล Cost Center of VP และ รหัส Cost Center เป็น K.Prajak .S <COO-PY> รหัส Cost Center 32570100 { Initiative : 2020-004207 } 
-- 1 row effect Case: C-1828
update CapexInformations set CostCenterOfVP = 'PRAJAK.SOP <COO-PY/->', CodeCostCenterOfVP = '32570100' where CapexInformationId = '13670' 