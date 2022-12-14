/****** Object:  StoredProcedure [dbo].[sp_GroupEmailEngineer_6]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[sp_GroupEmailEngineer_6]
(
	@GetToday DateTime2
	--,@GetType NVARCHAR(200)  --ENG-6,ENG-13
	--,@GetEmail NVARCHAR(255)
)
AS
;with emailList as
(

SELECT 
	DISTINCT
	 OWNER.OwnerName
	,OWNER.Email AS Email
	,PER.InitiativeCode as [p_iniCode]
	,MP.EmocNo
	,INI.Id
	,INI.InitiativeType
	,INI.Stage
	,INI.Status

	,PRO.WbsNo
	,CASE WHEN ISNULL(PRO.WbsNo,'')='' THEN 'Require' ELSE'-' END AS [Approval Phase Status]
	--,CASE WHEN ISNULL(PRO.WbsNo,'') <> '' THEN 'Require' END AS [Project Progress] 
	-- WHEN ISNULL(IFM.P4FinDate,'') <> '' THEN ''
	,CASE WHEN ISNULL(PRO.WbsNo,'') = '' THEN '' 
		  WHEN ISNULL(PER.InitiativeCode,'')<>'' AND (PER.FromDate <= @GetToday AND PER.ToDate >= @GetToday) THEN CASE WHEN PER.POC = 1 THEN 'Completed' ELSE 'Require' END
		  WHEN ISNULL(IFM.P3FinDate,'') <> '' OR ISNULL(IPD.ProjectTECODate,'') <> '' THEN ''
		  WHEN MONTH(@GetToday) = 1 AND ISNULL(PRO.WbsNo,'')=''		AND ISNULL(PP.Jan,0)=0		THEN 'Require'
		  WHEN MONTH(@GetToday) = 2 AND ISNULL(PRO.WbsNo,'')=''		AND ISNULL(PP.Feb,0)=0		THEN 'Require'
		  WHEN MONTH(@GetToday) = 3 AND ISNULL(PRO.WbsNo,'')=''		AND ISNULL(PP.Mar,0)=0		THEN 'Require'
		  WHEN MONTH(@GetToday) = 4 AND ISNULL(PRO.WbsNo,'')=''		AND ISNULL(PP.Apr,0)=0		THEN 'Require'
		  WHEN MONTH(@GetToday) = 5 AND ISNULL(PRO.WbsNo,'')=''		AND ISNULL(PP.May,0)=0		THEN 'Require'
		  WHEN MONTH(@GetToday) = 6 AND ISNULL(PRO.WbsNo,'')=''		AND ISNULL(PP.Jun,0)=0		THEN 'Require'
		  WHEN MONTH(@GetToday) = 7 AND ISNULL(PRO.WbsNo,'')=''		AND ISNULL(PP.Jul,0)=0		THEN 'Require'
		  WHEN MONTH(@GetToday) = 8 AND ISNULL(PRO.WbsNo,'')=''		AND ISNULL(PP.Aug,0)=0		THEN 'Require'
		  WHEN MONTH(@GetToday) = 9 AND ISNULL(PRO.WbsNo,'')=''		AND ISNULL(PP.Sep,0)=0		THEN 'Require'
		  WHEN MONTH(@GetToday) = 10 AND ISNULL(PRO.WbsNo,'')=''	AND ISNULL(PP.Oct,0)=0		THEN 'Require'
		  WHEN MONTH(@GetToday) = 11 AND ISNULL(PRO.WbsNo,'')=''	AND ISNULL(PP.Nov,0)=0		THEN 'Require'
		  WHEN MONTH(@GetToday) = 12 AND ISNULL(PRO.WbsNo,'')=''	AND ISNULL(PP.[Dec],0)=0	THEN 'Require'
		  
		  WHEN MONTH(@GetToday) = 1 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.Jan,0) > 0	THEN	'Completed'
		  WHEN MONTH(@GetToday) = 2 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.Feb,0) > 0	THEN	'Completed'
		  WHEN MONTH(@GetToday) = 3 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.Mar,0) > 0	THEN	'Completed'
		  WHEN MONTH(@GetToday) = 4 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.Apr,0) > 0	THEN	'Completed'
		  WHEN MONTH(@GetToday) = 5 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.May,0) > 0	THEN	'Completed'
		  WHEN MONTH(@GetToday) = 6 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.Jun,0) > 0	THEN	'Completed'
		  WHEN MONTH(@GetToday) = 7 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.Jul,0) > 0	THEN	'Completed'
		  WHEN MONTH(@GetToday) = 8 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.Aug,0) > 0	THEN	'Completed'
		  WHEN MONTH(@GetToday) = 9 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.Sep,0) > 0	THEN	'Completed'
		  WHEN MONTH(@GetToday) = 10 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.Oct,0) > 0	THEN	'Completed'
		  WHEN MONTH(@GetToday) = 11 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.Nov,0) > 0	THEN	'Completed'
		  WHEN MONTH(@GetToday) = 12 AND ISNULL(PRO.WbsNo,'')<>''	AND ISNULL(PP.[Dec],0) > 0	THEN	'Completed'

		  ELSE 'Require' END AS [Project Progress] 

	,CASE WHEN ISNULL(PRO.WbsNo,'') = '' THEN '' 
		  WHEN ISNULL(PER.InitiativeCode,'')<>'' AND (PER.FromDate <= @GetToday AND PER.ToDate >= @GetToday) THEN CASE WHEN PER.OutstandingItems = 1 THEN 'Completed' ELSE 'Require' END
		  WHEN ISNULL(IFM.P3FinDate,'') <> ''  OR ISNULL(IPD.ProjectTECODate,'') <> ''  THEN '' WHEN  ISNULL(PRO.WbsNo,'')<>'' AND OS.Outstanding is NOT NULL	 THEN 'Completed' ELSE 'Require' END AS [Outstanding Items Cost] 
	
	,CASE WHEN ISNULL(PRO.WbsNo,'') = '' THEN '' 
		  WHEN ISNULL(PER.InitiativeCode,'')<>'' AND (PER.FromDate <= @GetToday AND PER.ToDate >= @GetToday) THEN CASE WHEN PER.HighlightWork = 1 THEN 'Completed' ELSE 'Require' END
	      WHEN ISNULL(IFM.P3FinDate,'') <> ''  OR ISNULL(IPD.ProjectTECODate,'') <> ''  THEN '' WHEN  ISNULL(PRO.WbsNo,'')<>'' AND ISNULL(BSC.HighlightWork,'')<>'' THEN 'Completed' ELSE 'Require' END AS  [Highlight Work]

	,CASE WHEN ISNULL(PRO.WbsNo,'') <> '' 
	THEN 
		CASE WHEN ISNULL(MP.EmocNo,'') <> '' 
			THEN 
				CASE WHEN ISNULL(IFM.P3FinDate,'') <> '' then 'Require'
				ELSE '-' END
		ELSE 
				CASE WHEN ISNULL(IPD.ProjectTECODate,'') <> '' then 'Require'
				ELSE '-' END 
		END
	ELSE '-'
	END AS [CLSD]

	FROM v_Initiatives INI
	LEFT JOIN DetailInformations DET ON DET.InitiativeId = INI.Id
	LEFT JOIN CapexInformations CAP ON CAP.InitiativeId = INI.Id
	inner JOIN Owners OWNER ON OWNER.OwnerName = DET.ProjectEngineer
	LEFT JOIN ProgressHeader PRO ON PRO.InitiativeId = INI.Id
	LEFT JOIN ProgressPlan PP ON PP.InitiativeId = INI.Id and PP.PlanActual='actual' and PP.Year = Year(@GetToday)
	
	AND ProgressPlanType = 
	CASE 
	 WHEN MONTH(@GetToday) = 1 		AND JAN > 0		AND ProgressPlanType = 'Engineering' 		THEN 'Engineering'
	 WHEN MONTH(@GetToday) = 2 		AND Feb > 0		AND ProgressPlanType = 'Engineering' 	 	THEN 'Engineering'
	 WHEN MONTH(@GetToday) = 3 		AND mar > 0		AND ProgressPlanType = 'Engineering' 	 	THEN 'Engineering'
	 WHEN MONTH(@GetToday) = 4 		AND apr > 0		AND ProgressPlanType = 'Engineering' 	 	THEN 'Engineering'
	 WHEN MONTH(@GetToday) = 5 		AND may > 0		AND ProgressPlanType = 'Engineering' 	 	THEN 'Engineering'
	 WHEN MONTH(@GetToday) = 6 		AND Jun > 0		AND ProgressPlanType = 'Engineering' 	 	THEN 'Engineering'
	 WHEN MONTH(@GetToday) = 7 		AND Jul > 0		AND ProgressPlanType = 'Engineering' 	 	THEN 'Engineering'
	 WHEN MONTH(@GetToday) = 8 		AND aug > 0		AND ProgressPlanType = 'Engineering' 	 	THEN 'Engineering'
	 WHEN MONTH(@GetToday) = 9 		AND sep > 0		AND ProgressPlanType = 'Engineering' 	 	THEN 'Engineering'
	 WHEN MONTH(@GetToday) = 10 	AND oct > 0		AND ProgressPlanType = 'Engineering' 	 	THEN 'Engineering'
	 WHEN MONTH(@GetToday) = 11 	AND nov > 0		AND ProgressPlanType = 'Engineering' 	 	THEN 'Engineering'
	 WHEN MONTH(@GetToday) = 12 	AND dec > 0		AND ProgressPlanType = 'Engineering' 	 	THEN 'Engineering'
	                                                                       
	 WHEN MONTH(@GetToday) = 1 		AND JAN > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	 WHEN MONTH(@GetToday) = 2 		AND Feb > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	 WHEN MONTH(@GetToday) = 3 		AND mar > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	 WHEN MONTH(@GetToday) = 4 		AND apr > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	 WHEN MONTH(@GetToday) = 5 		AND may > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	 WHEN MONTH(@GetToday) = 6 		AND Jun > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	 WHEN MONTH(@GetToday) = 7 		AND Jul > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	 WHEN MONTH(@GetToday) = 8 		AND aug > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	 WHEN MONTH(@GetToday) = 9 		AND sep > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	 WHEN MONTH(@GetToday) = 10 	AND oct > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	 WHEN MONTH(@GetToday) = 11 	AND nov > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	 WHEN MONTH(@GetToday) = 12 	AND dec > 0		AND ProgressPlanType = 'Procurement' 	 	THEN 'Procurement'
	                                                                       
	 WHEN MONTH(@GetToday) = 1 		AND JAN > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	 WHEN MONTH(@GetToday) = 2 		AND Feb > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	 WHEN MONTH(@GetToday) = 3 		AND mar > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	 WHEN MONTH(@GetToday) = 4 		AND apr > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	 WHEN MONTH(@GetToday) = 5 		AND may > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	 WHEN MONTH(@GetToday) = 6 		AND Jun > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	 WHEN MONTH(@GetToday) = 7 		AND Jul > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	 WHEN MONTH(@GetToday) = 8 		AND aug > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	 WHEN MONTH(@GetToday) = 9 		AND sep > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	 WHEN MONTH(@GetToday) = 10 	AND oct > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	 WHEN MONTH(@GetToday) = 11 	AND nov > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	 WHEN MONTH(@GetToday) = 12 	AND dec > 0		AND ProgressPlanType = 'Construction' 	 	THEN 'Construction'
	                                                                       
	 WHEN MONTH(@GetToday) = 1 		AND JAN > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 WHEN MONTH(@GetToday) = 2 		AND Feb > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 WHEN MONTH(@GetToday) = 3 		AND mar > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 WHEN MONTH(@GetToday) = 4 		AND apr > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 WHEN MONTH(@GetToday) = 5 		AND may > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 WHEN MONTH(@GetToday) = 6 		AND Jun > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 WHEN MONTH(@GetToday) = 7 		AND Jul > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 WHEN MONTH(@GetToday) = 8 		AND aug > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 WHEN MONTH(@GetToday) = 9 		AND sep > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 WHEN MONTH(@GetToday) = 10 	AND oct > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 WHEN MONTH(@GetToday) = 11 	AND nov > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 WHEN MONTH(@GetToday) = 12 	AND dec > 0		AND ProgressPlanType = 'Commissioning' 	 	THEN 'Commissioning'
	 
	 WHEN MONTH(@GetToday) = 1 		AND JAN > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	 WHEN MONTH(@GetToday) = 2 		AND Feb > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	 WHEN MONTH(@GetToday) = 3 		AND mar > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	 WHEN MONTH(@GetToday) = 4 		AND apr > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	 WHEN MONTH(@GetToday) = 5 		AND may > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	 WHEN MONTH(@GetToday) = 6 		AND Jun > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	 WHEN MONTH(@GetToday) = 7 		AND Jul > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	 WHEN MONTH(@GetToday) = 8 		AND aug > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	 WHEN MONTH(@GetToday) = 9 		AND sep > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	 WHEN MONTH(@GetToday) = 10 	AND oct > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	 WHEN MONTH(@GetToday) = 11 	AND nov > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	 WHEN MONTH(@GetToday) = 12 	AND dec > 0		AND ProgressPlanType = '-' 	 	THEN '-'
	ELSE '' END

	
	left join ProgressPlanDate PDD on ini.id = pdd.InitiativeId and pdd.ProgressPlanDateType in ('Overall','Over All','-','Overall Plan')
	LEFT JOIN OutstandingData OS ON OS.InitiativeId = INI.Id AND OS.Month = MONTH(@GetToday) AND OS.Year = Year(@GetToday)
	LEFT JOIN MainPlant MP ON MP.InitiativeId = INI.Id
	LEFT JOIN BscNarrative BSC ON BSC.InitiativeId = INI.Id AND BSC.Month = MONTH(@GetToday) AND BSC.Year = Year(@GetToday)
	LEFT JOIN IF_MOCTransaction IFM  ON IFM.MOCNo = MP.EmocNo  --INNER
	LEFT JOIN IF_ProjectDefinition IPD ON IPD.Project_Definition_Key = PRO.WbsNo --IF_ProjectDefinition
	LEFT JOIN PerformanceInactive PER ON PER.InitiativeCode = INI.InitiativeCode 
	WHERE 
	--isnull(CAP.ProjecctComRun,ini.FinishingDate) > @GetToday and
	 ISNULL(PRO.WbsNo,'') <> ''  -- IF WBS
	and isnull(DET.ProjectEngineer,'') <> '' 
	and isnull(ini.RequestCapex,'false') = 'true'
	and isnull(ini.RequestProjectEngineer,'false') = 'true'
	and ini.Status<>'cancelled'

	and PRO.WbsNo not like 'CM%'
	and PRO.WbsNo not like 'CE-1451%'
	and PRO.WbsNo not like 'CP-1451%'

	and PRO.WbsNo Not In (
	'CE-1011-16012','CE-1011-16013','CE-101A-10701','CE-101A-14011','CE-101A-14702','CE-101A-14703','CE-101A-17010','CE-101A-18015','CE-101A-19030','CE-101A-19030','CE-101A-20003'
	,'CE-101A-20003','CE-1021-18009','CE-1022-11701','CE-1022-17008','CE-1031-14002','CE-1031-18003','CE-1034-14708','CE-1034-18014','CE-1034-18015','CE-1034-18019','CE-1036-18007'
	,'CE-1037-14713','CE-1151-14003','CE-1151-20001','CE-1151-20001','CE-1151-20002','CE-1151-20002','CE-1151-20006','CE-1151-20006','CE-1151-20006','CE-1151-20006','CE-1151-20008'
	,'CE-1151-20008','CE-1152-20004','CE-1152-20004','CE-2141-20012','CE-2141-20012','CE-2992-18005','CP-100B-13703','CP-100B-15001','CP-100B-16001','CP-1011-09702','CP-1011-10702'
	,'CP-1011-12701','CP-1011-12702','CP-1011-12704','CP-1011-13701','CP-1011-18003','CP-1011-19005','CP-1011-19009','CP-1011-19009','CP-1011-20001','CP-101A-08701','CP-101A-10701'
	,'CP-101A-10703','CP-101A-10704','CP-101A-10705','CP-101A-11701','CP-101A-12701','CP-101A-12702','CP-101A-13705','CP-101A-13707','CP-101A-14701','CP-101A-14702','CP-101A-14705'
	,'CP-101A-15001','CP-101A-15004','CP-101A-16001','CP-101A-16004','CP-101A-17005','CP-101A-19001','CP-101A-19003','CP-101A-19004','CP-101A-19005','CP-101A-20004','CP-1021-12701'
	,'CP-1021-13713','CP-1021-14702','CP-1021-17002','CP-1021-17002','CP-1021-17003','CP-1021-17003','CP-1021-17004','CP-1021-18003','CP-1022-12001','CP-1022-12702','CP-1022-12704'
	,'CP-1022-13701','CP-1022-13703','CP-1022-15003','CP-1022-17001','CP-1022-17001','CP-1022-17004','CP-1031-10701','CP-1031-11702','CP-1031-11703','CP-1031-12701','CP-1031-13703'
	,'CP-1031-13704','CP-1031-18002','CP-1031-18005','CP-1031-18005','CP-1031-19001','CP-1032-10701','CP-1033-12702','CP-1033-13701','CP-1033-13702','CP-1033-13705','CP-1033-13706'
	,'CP-1033-14701','CP-1033-17002','CP-1034-11701','CP-1034-11702','CP-1034-12702','CP-1034-13701','CP-1034-13702','CP-1034-13703','CP-1034-15001','CP-1034-16003','CP-1034-18002'
	,'CP-1034-18005','CP-1034-19002','CP-1034-19007','CP-1034-19007','CP-1034-19008','CP-1034-19008','CP-1034-19008','CP-1034-19011','CP-1034-19013','CP-1035-11701','CP-1035-12701'
	,'CP-1035-18001','CP-1035-18001','CP-1036-08701','CP-1036-08701','CP-1036-19001','CP-1037-12701','CP-1037-14702','CP-1037-14703','CP-1037-15001','CP-1037-18001','CP-1041-11701'
	,'CP-1041-13701','CP-1043-13701','CP-1044-12701','CP-1044-13702','CP-1044-16001','CP-1045-14702','CP-1151-12702','CP-1151-13701','CP-1151-13703','CP-1151-17001','CP-1151-18001'
	,'CP-1152-12701','CP-1152-12702','CP-1152-14702','CP-1561-13710','CP-1561-14702','CP-1561-14706','CP-1561-14707','CP-1561-16001','CP-1561-16002','CP-1561-16003','CP-1661-14704'
	,'CP-1661-18001','CP-2141-14701','CP-2991-15703','CP-2991-15716','CP-2991-17002','CP-2991-19001','CP-2991-19001','CP-2992-15701','CP-3171-17001','CP-3271-17001','CX-G150002'
    ,'CP-1034-19001'  -- 2021-05-05
	,'CE-1036-17005'  -- 2021-05-05
	,'CE-1031-20006'  -- 2021-05-27
	,'CE-2991-21008'  -- 2021-05-27
	,'CP-2993-21005'  -- 2021-05-28
	,'CP-1021-21002'  -- 2021-05-28
	,'CP-101A-21005'  -- 2021-08-25
	,'CP-1011-20003'  -- 2021-08-27
	,'CE-1011-20008'  -- 2021-08-27
	)
	And PRO.WbsNo Not IN ('CE-1151-21003')

	AND PRO.WbsNo NOT IN 
	('CP-101A-16004','CE-1037-20011','CP-1034-18003','CP-1011-18007','CE-2993-20002'
	,'CE-1037-20002','CE-1022-20006','CE-2993-21001','CE-2991-21005')  -- อยู่ใน Excel ที่ mag เพิ่มเข้ามา

	and ISNULL(IFM.P3FinDate,'') = '' -- [EmocDate]       จะต้องใส่ในการส่งครั้งที่ 1,2  หรือไม่ก็ hard code จาก excel ของ คุณ En
	and ISNULL(IPD.ProjectTECODate,'') = '' --[TecoDate]
	and isnull(IPD.ProjectCloseDate,'') = ''   -- [SapCloseDate]

	)
	select OwnerName,Email from emailList 
	where (isnull([Project Progress],'') IN ('Require','') OR isnull([Outstanding Items Cost],'') IN ('Require','') OR  isnull([Highlight Work],'')  IN ('Require','') ) OR isnull([CLSD],'')  IN ('Require')
	Group by OwnerName,Email
	--ORder By Id
--GO;
GO
