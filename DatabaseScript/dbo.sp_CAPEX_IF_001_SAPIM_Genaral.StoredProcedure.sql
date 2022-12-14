/****** Object:  StoredProcedure [dbo].[sp_CAPEX_IF_001_SAPIM_Genaral]    Script Date: 10/8/2021 6:17:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO










-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_IF_001_SAPIM_Genaral]
(
    -- Add the parameters for the stored procedure here
    @StartTime NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON


    IF OBJECT_ID('tempdb..#tmpOwnerNoDups') IS NOT NULL
        DROP TABLE #tmpOwnerNoDups
        

        ----       
       SELECT 
            SUBSTRING(Email,0,CHARINDEX('@',Email)) + ' <' + ISNULL(MAX(Indicator),'') + '/' + ISNULL(MAX(Extension),'-') +  '>' AS OwnerName,
			MAX(OwnerName) AS oldOwnerName,
            Email,
            MAX(DepTextEN) AS DepTextEN,
            MAX(DepShortTextEN) AS DepShortTextEN,
            MAX(EmployeeId)  AS     EmployeeId         ,
            MAX(DepManagerEmpID  )  AS DepManagerEmpID       ,
            MAX(DepOrgID)     AS DepOrgID         ,
            MAX(OrgID       )   AS OrgID           ,
            MAX(MainPositionCostCenter) AS MainPositionCostCenter
            INTO #tmpOwnerNoDups
        FROM Owners
        GROUP BY
            Email



    -- Insert statements for procedure here
       select  DISTINCT
        ini.id AS [RID], --A

        case	when ini.Id IN (65390) THEN 'THB01-01-04-12' 
				when ISNULL(ini.InitiativeType, '') = 'ER' 
				OR ISNULL(capex.PoolBudgetForm, '') = 'ER' 
				OR ISNULL(ini.PoolType, '') = 'ER' 
				OR ISNULL(ini.BudgetSource, '') = 'ER' 
				OR invest.Attribute01 = '07' THEN 
					--ISNULL(plant.Attribute14, invest.Attribute05) --อันเก่า 
					ISNULL(PlantPool.Attribute14, InvestPool.Attribute05)  -- อันใหม่มาจาก Pool
				WHEN ini.CostEstCapex >= 300 THEN   ISNULL(invest.Attribute07, invest.Attribute05)
		ELSE invest.Attribute05 END AS [Investment Position (IM Position)],  -- using mock data    --B    --copy

        case	when ISNULL(ini.InitiativeType, '') = 'ER' 
				OR ISNULL(capex.PoolBudgetForm, '') = 'ER' 
				OR ISNULL(ini.PoolType, '') = 'ER' 
				OR ISNULL(ini.BudgetSource, '') = 'ER' OR invest.Attribute01 = '07' Then '07' 
        Else invest.Attribute01 END AS [Investment Type],  -- using mock data  --C

        --'0000' + ini.InitiativeCode AS [Initiative CAPEX No.], -- พบปัญหาว่า เมื่อ Initiative code น้อยกว่า 11 หลัก ทำให้ไฟล์ส่งข้อมูลออกไปผิด
		dbo.PadLeft(ini.Initiativecode,'0',15) AS [Initiative CAPEX No.],  -- New 29/3/2021  --D

        --'00002020-000' + CAST(CAST(SUBSTRING(InitiativeCode, CHARINDEX('-',InitiativeCode) + 1,LEN(InitiativeCode)) AS INT) + 600 AS VARCHAR(150) )  AS [Initiative CAPEX No.],
        --case when ISNULL(ini.InitiativeType, '') = 'ER' OR ISNULL(capex.PoolBudgetForm, '') = 'ER' OR ISNULL(ini.PoolType, '') = 'ER' then 'E' Else 'P' end as [Appropriation Request type],	
        case when ISNULL(ini.InitiativeType, '') = 'ER' OR ISNULL(capex.PoolBudgetForm, '') = 'ER' OR ISNULL(ini.PoolType, '') = 'ER' OR ISNULL(ini.BudgetSource, '') = 'ER' OR invest.Attribute01 = '07' then 'E' Else 'P' end as [Appropriation Request type], --E

        case when capex.Revistion = '0' then '1' else '2' end as [Budget Request Type],  --F

        ini.[name] AS [Project Name],  --G

        YEAR(capex.ActionYear) AS [Commence Year],  --H

        --own.CompanyCode AS [Company Code],  
        comp.Attribute01 AS [Company Code], -- using mock data  --I

        --own.MainPositionCostCenter AS [Department],
        capex.CodeCostCenterOfVP AS [Department], --J

        --own.FNShortTextEN AS [GPC/BU],
        ini.Organization AS [GPC/BU],  --K

         case when ISNULL(ini.InitiativeType, '') = 'ER' OR ISNULL(capex.PoolBudgetForm, '') = 'ER' OR ISNULL(ini.PoolType, '') = 'ER' OR ISNULL(ini.BudgetSource, '') = 'ER' OR invest.Attribute01 = '07' then 
			--VP_ER.EmployeeID 
			OwnPool.EmployeeID  -- from Pool
        Else 
            CASE WHEN ini.InitiativeType = 'cim' THEN 
				VP_inidet.EmployeeID 
			ELSE 
				--VP.EmployeeID 
				VP_ER.EmployeeID 
			END
        END  AS [VP ID], --L  --copy

        case when ISNULL(ini.InitiativeType, '') = 'ER' OR ISNULL(capex.PoolBudgetForm, '') = 'ER' OR ISNULL(ini.PoolType, '') = 'ER' OR ISNULL(ini.BudgetSource, '') = 'ER' OR invest.Attribute01 = '07' then 
			ISNULL(OwnPool.Title, '') + ' ' + ISNULL(OwnPool.FirstName, '') + ' ' + ISNULL(OwnPool.LastName, '') -- from Pool
        Else 
            CASE WHEN ini.InitiativeType = 'cim' THEN 
				ISNULL(VP_inidet.Title, '') + ' ' + ISNULL(VP_inidet.FirstName, '') + ' ' + ISNULL(VP_inidet.LastName, '') 
			ELSE 
				ISNULL(VP_ER.Title, '') + ' ' + ISNULL(VP_ER.FirstName, '') + ' ' + ISNULL(VP_ER.LastName, '') 
			END
        END AS [VP Name], --M   --copy

       case when ISNULL(ini.InitiativeType, '') = 'ER' OR ISNULL(capex.PoolBudgetForm, '') = 'ER' OR ISNULL(ini.PoolType, '') = 'ER' OR ISNULL(ini.BudgetSource, '') = 'ER' OR invest.Attribute01 = '07' then 
			--VP_ER.MainPositionCostCenter 
			OwnPool.MainPositionCostCenter
        Else 
            CASE WHEN ini.InitiativeType = 'cim' THEN 
				VP_inidet.MainPositionCostCenter 
			ELSE 
				--VP.MainPositionCostCenter 
				VP_ER.MainPositionCostCenter 
			END 
        END AS [VP Department],  --N   --copy

         --own.EmployeeId AS [Coordinator ID],  --O   --copy
		CASE WHEN ISNULL(ini.InitiativeType, '') = 'ER' OR ISNULL(capex.PoolBudgetForm, '') = 'ER' OR ISNULL(ini.PoolType, '') = 'ER' OR ISNULL(ini.BudgetSource, '') = 'ER' OR invest.Attribute01 = '07' then 
			OwnAU.EmployeeId
		ELSE
			own.EmployeeId
		END AS [Coordinator ID],  --O   --copy

         --ISNULL(own.Title, '') + ' ' + ISNULL(own.FirstName, '') + ' ' + ISNULL(own.LastName, '')  AS [Coordinator Name],  --P   --copy
		CASE WHEN ISNULL(ini.InitiativeType, '') = 'ER' OR ISNULL(capex.PoolBudgetForm, '') = 'ER' OR ISNULL(ini.PoolType, '') = 'ER' OR ISNULL(ini.BudgetSource, '') = 'ER' OR invest.Attribute01 = '07' then 
			ISNULL(OwnAU.Title, '') + ' ' + ISNULL(OwnAU.FirstName, '') + ' ' + ISNULL(OwnAU.LastName, '')
		ELSE
			ISNULL(own.Title, '') + ' ' + ISNULL(own.FirstName, '') + ' ' + ISNULL(own.LastName, '')
		END AS [Coordinator Name],  --P  --copy

        --own.MainPositionCostCenter AS [Coordinator Department], --Q   --copy
		CASE WHEN ISNULL(ini.InitiativeType, '') = 'ER' OR ISNULL(capex.PoolBudgetForm, '') = 'ER' OR ISNULL(ini.PoolType, '') = 'ER' OR ISNULL(ini.BudgetSource, '') = 'ER' OR invest.Attribute01 = '07' then 
			OwnAU.MainPositionCostCenter
		ELSE
			own.MainPositionCostCenter
		END AS [Coordinator Department], --Q   --copy

        budgetanalyst.Attribute01 AS [Budget Analyst ID],   -- using mock data  --R

        budgetname.Title + ' ' + budgetname.FirstName + ' ' + budgetname.LastName AS [Budget Analyst Name],   -- using mock data  --S

        --CostEstCapexType AS [Currency Budget to be controlled],
        'THB' AS [Currency Budget to be controlled],  --T

        ISNULL(capex.ProjectCost, 0) * 1000000 AS [Total Amount in Control Currency],  --U

        --convert(varchar,RequestIniNoDate,104) AS [Plan Start Date],

        --convert(varchar,capex.StartingDate,104) AS [Plan Start Date],   -- using mock data

        convert(varchar,capex.ActionYear,104) AS [Plan Start Date],   -- change to plan budget start date  --V

        convert(varchar,capex.ProjecctComRun,104) AS [Plan Finish Date],  --W

        convert(varchar,capex.ActionYear,104) AS [Plan Budget Start Date],  --X

        convert(varchar,capex.ProjecctComRun,104) AS [Plan Budget Finish Date], --Y

        CASE 
			WHEN capex.BudgetPeriod = 'Annual' THEN '3' 
			WHEN capex.BudgetPeriod =  'Mid Year' THEN 'M3' 
			WHEN capex.BudgetPeriod =  'Current year' AND (ISNULL(capex.PoolBudgetForm, '') <> '' OR ISNULL(capex.BetweenYear, '') = 'BOD Approval') THEN 'M4' ELSE NULL 
		END AS [Version], --Z
        CASE 
            WHEN ini.Id IN (61817,61900,61914,61920,61992,61994,61995,61996,62001,62002,62021,62024,62032,62044,62055) THEN 'Direct Capex'  -- temporary fix ini type pim as capex

            WHEN  ini.InitiativeType <> 'Request Pool' AND ISNULL(ini.InitiativeType, '') = 'ER' OR ISNULL(capex.PoolBudgetForm, '') = 'ER' OR ISNULL(ini.PoolType, '') = 'ER' OR ISNULL(ini.BudgetSource, '') = 'ER' OR invest.Attribute01 = '07' THEN 'ER'
            WHEN ini.BudgetSource = 'ER'  AND ini.InitiativeType = 'directCapex' THEN 'ER'  
		     WHEN ini.InitiativeType = 'directCapex' THEN 'Direct Capex'  
			 WHEN ini.InitiativeType = 'Request Pool' AND ini.PoolType = 'Digital CAPEX' THEN 'REQUEST POOL DIM'  
			 WHEN ini.InitiativeType = 'Request Pool' AND ini.PoolType = 'IT CAPEX' THEN 'REQUEST POOL DIM'  
			 WHEN ini.InitiativeType = 'Request Pool' AND ini.PoolType = 'ER' THEN 'REQUEST POOL ER'  
			 WHEN ini.InitiativeType = 'Request Pool' AND ini.PoolType = 'MAX' THEN 'REQUEST POOL MAX'  
			 WHEN ini.InitiativeType = 'Request Pool' AND ini.PoolType = 'PIM' THEN 'REQUEST POOL PIM'  
			 WHEN ini.InitiativeType = 'Request Pool' AND ini.PoolType = 'MTPi' THEN 'REQUEST POOL MTPI' 
			 ELSE UPPER(ini.InitiativeType)  
			 END AS [Process]  --AA

    from v_Initiatives ini		
    INNER JOIN TmpInitiativeIdIFs tmpIF ON tmpIF.InitiativeId = ini.Id AND tmpIF.IFType = 'IF001'
    inner join CapexInformations capex on capex.InitiativeId = ini.id AND ISNULL(capex.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)	
    LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName    --'Mr. Subin Phoomrin' -- using mock data
    LEFT JOIN DetailInformations det ON det.InitiativeId = ini.Id
    LEFT JOIN InitiativeDetails inidet ON inidet.InitiativeId = ini.Id
    LEFT JOIN Owners VP_inidet ON VP_INIDET.OwnerName = inidet.President
	LEFT JOIN Owners VP ON vp.OwnerName = det.President    --'26006215' -- using mock data  fix VP employee id
    LEFT JOIN Owners VP_ER ON VP_ER.OwnerName = capex.CostCenterOfVP    --'26006215' -- using mock data  fix VP employee id
    LEFT JOIN CommonData comp ON comp.DataType = 'company' AND (ini.Company = comp.Attribute03 OR ini.Company = comp.Attribute02 OR ini.Company = comp.Attribute01)
    LEFT JOIN CommonData invest ON invest.DataType = 'typeofinvestment' AND invest.Attribute02 = ini.TypeOfInvestment
    LEFT JOIN CommonData bu ON bu.DataType = 'organization' AND (bu.Attribute03 = own.FNShortTextEN)   -- data duplicated >> need to be grouped 
    LEFT JOIN CommonData plant ON plant.DataType = 'plant' AND (plant.Attribute04 = ini.Plant OR plant.Attribute07 = ini.Plant)
    LEFT JOIN CommonData budgetanalyst ON budgetanalyst.DataType = 'budgetanalyst' AND budgetanalyst.Attribute02 = comp.Attribute01 AND budgetanalyst.Attribute03 = 'Y' --'10'  -- fix companycode to 10
    LEFT JOIN Owners budgetname ON budgetname.EmployeeID = budgetanalyst.Attribute01
    --WHERE ini.UpdatedDate >= @StartTime	

	--copy
	Left Join v_Initiatives IniPool ON IniPool.Id = capex.PoolId
	Left JOIN CapexInformations CapexPool ON CapexPool.InitiativeId = capex.PoolId AND ISNULL(CapexPool.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = IniPool.Id)	
	left join Owners OwnPool ON OwnPool.OwnerName = CapexPool.CostCenterOfVP --Pool
	left join Owners OwnAU ON OwnAU.OwnerName = det.Manager  -- manager
	LEFT JOIN CommonData InvestPool ON InvestPool.DataType = 'typeofinvestment' AND InvestPool.Attribute02 = IniPool.TypeOfInvestment
	LEFT JOIN CommonData PlantPool ON PlantPool.DataType = 'plant' AND (PlantPool.Attribute04 = IniPool.Plant OR PlantPool.Attribute07 = IniPool.Plant)
	
    WHERE CONVERT(VARCHAR(10), tmpIF.CreatedDate, 120) = @StartTime

    Order By ini.Id
--select IMPositionCode,InvestmentType		
--from IMPosition		
		
--select CompanyCode,DepOrgID,OrgID,MainPositionCostCenter,dep.DepManagerEmpID,dep.DepManagerEmpName,Dep.Depposition,EmployeeID,Firstname as employeeName,PositionShortTextEN,MainPositionCostCenter		
--from owners ow		
--inner join 		
--(select distinct EmployeeID as DepManagerEmpID,FirstName as DepManagerEmpName,PositionShortTextEN as Depposition
--from owners
--where  PositionLevel = 30) dep on ow.DepManagerEmpID = dep.DepManagerEmpID


END


