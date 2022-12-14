/****** Object:  StoredProcedure [dbo].[sp_IF_RevisedBG]    Script Date: 10/11/2021 7:57:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_IF_RevisedBG]
(
    -- Add the parameters for the stored procedure here
    @StartTime NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    select DISTINCT
        dbo.PadLeft(i.Initiativecode,'0',15)  as InitiativeCode  ,
        ci.Revistion ,
        case
            when ci.Revistion = 0 then 'Original'
            when ci.CapexType = 'AddmoreCapex' then 'Supplement'
            when ci.CapexType = 'ReturnCapex' then 'Return'
        end as TransactionType    ,
        'PTTGCGRP' as Program    ,

        -- Nok เพิ่ม Leftjoin Plant สำหรับกรณี InvestmentType = 'ER' @ 2020-12-11

        CASE 
        when i.Id IN (65390) THEN 'THB01-01-04-12'
        WHEN i.InitiativeCode = '2020-004443' THEN 'THB01-01-04-30' ELSE 

		case when i.TypeOfInvestment = 'Engineering Request ER' OR ISNULL(i.PoolType, '') = 'ER'
        OR ISNULL(i.InitiativeType, '') = 'ER' OR ISNULL(ci.PoolBudgetForm, '') = 'ER' OR ISNULL(i.PoolType, '') = 'ER' OR cd.Attribute01 = '07'
        OR (i.BudgetSource = 'ER'  AND i.InitiativeType = 'directCapex')
        then 
		plant.Attribute14 else cd.Attribute05 end 
        
        END 

        as 'Position ID' ,
		--cd.Attribute05 as 'Position ID',
		----------------------------------------------------------------------

		-- Nok แก้ไขเอง @2020-12-07
		--year(i.ApprovedDate) as ApprovalYear,
		CASE WHEN i.Id IN (64921) THEN '2021' ELSE RIGHT(CONVERT(nvarchar(200),DATEPART(yy,ci.ActionYear)),4) END AS ApprovalYear,
        ISNULL(pg.WbsNo, '') as WBS,

        /* add by oat @2020-01-05  เพิ่ม capex type = addmore ให้ดึง additionalcost มาแทน*/
        CASE 
        WHEN CapexType = 'AddmoreCapex' THEN ci.AdditionalCost * 1000000 
		WHEN CapexType = 'ReturnCapex' THEN ci.ReturnCost * 1000000 
        ELSE ci.ProjectCost * 1000000 
        END
        as BudgetAmount

        from v_Initiatives i
        INNER JOIN TmpInitiativeIdIFs tmpIF ON tmpIF.InitiativeId = i.Id AND tmpIF.IFType = 'IF020'
        inner join CapexInformations ci on ci.InitiativeId = i.Id and ISNULL(ci.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = i.Id)
        left join CommonData cd on cd. Attribute02 = i.TypeOfInvestment and cd.DataType = 'typeofinvestment' 
		left join ProgressHeader pg on pg.InitiativeId = i.id
		-- Nok เพิ่ม Leftjoin Plant สำหรับกรณี InvestmentType = 'ER' @ 2020-12-11
		LEFT JOIN CommonData plant ON plant.DataType = 'plant' AND (plant.Attribute04 = i.Plant OR plant.Attribute07 = i.Plant)
        LEFT JOIN IncomingFileData ifd ON ifd.FileName = 'IM-CPO-MappingCapexAppWbs.txt' AND ISNULL(ifd.Column11, '') = 'X' AND ISNULL(dbo.PadLeft(i.Initiativecode,'0',15), '') = ISNULL(ifd.Column2, '') AND CONVERT(VARCHAR(10), ifd.CreatedDate, 120) = @StartTime
		----------------------------------------------------------------------
        where ( CapexType = 'AddmoreCapex' or CapexType = 'ReturnCapex' or Revistion = 0  )
        AND CONVERT(VARCHAR(10), tmpIF.CreatedDate, 120) = @StartTime
        AND ifd.Id IS NULL 
		--AND ci.BudgetPeriod <> 'Current year' AND ci.BetweenYear <> 'Contingency'  --Aon 2021-06-14
		------------------------------- Nok Edit increase stage <> 'Cancelled'  2021-03-18 ---------------------------------------------
		AND isnull(i.Stage,'') not in ('cancelled') 
		AND BetweenYear NOT IN ('Contingency', 'Transfer')
END
