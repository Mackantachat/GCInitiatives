/****** Object:  StoredProcedure [dbo].[sp_FIX_PaybackPeriod]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_PaybackPeriod]
(
    -- Add the parameters for the stored procedure here
    @mode AS NVARCHAR(15) = 'find'
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    
    IF(@mode <> 'fix')

    BEGIN

                SELECT
                ini.INitiativeCode,
                ini.Stage,
                ini.Status,
                ISNULL(ini.RequestCapex, 'false'),
                CASE WHEN ISNULL(ini.BenefitAmount, 0) = 0 THEN 0 ELSE
                        CAST((CASE WHEN ISNULL(ini.RequestCapex, 'false') = 'true' 
                        THEN ISNULL(CostEstCapex, 0) ELSE 0 END 
                        +
                        CostEstOpex ) / BenefitAmount AS DECIMAL(18,2))
                END AS CalculatedPayback
                ,
                ini.PaybackPeriod

                FROM v_Initiatives ini
                WHERE 

                (
                    (
                    CASE WHEN ISNULL(ini.BenefitAmount, 0) = 0 THEN 0 ELSE
                            CAST((CASE WHEN ISNULL(ini.RequestCapex, 'false') = 'true' 
                            THEN ISNULL(CostEstCapex, 0) ELSE 0 END 
                            +
                            CostEstOpex ) / BenefitAmount AS DECIMAL(18,2))
                    END <> ISNULL(ini.PaybackPeriod, -9999)
                    AND ini.InitiativeCode LIKE '2020%'
                    )
                OR
                    (
                        CASE WHEN ISNULL(ini.BenefitAmount, 0) = 0 THEN 0 ELSE
                                CAST((CASE WHEN ISNULL(ini.RequestCapex, 'false') = 'true' 
                                THEN ISNULL(CostEstCapex, 0) ELSE 0 END 
                                +
                                CostEstOpex ) / BenefitAmount AS DECIMAL(18,2))
                        END <> ISNULL(ini.PaybackPeriod, -9999)
                        AND ini.InitiativeCode NOT LIKE '2020%'
                        AND ISNULL(PaybackPeriod, -9999) <> 3
                    )
                )

                AND InitiativeType LIKE '%max%'
                AND ini.Stage NOT IN ('Cancelled','IL5')


        END

        ELSE

        BEGIN

        
                --SELECT
                --ini.INitiativeCode,
                --ini.Stage,
                --ini.Status,
                --ISNULL(ini.RequestCapex, 'false'),
                --CASE WHEN ISNULL(ini.BenefitAmount, 0) = 0 THEN 0 ELSE
                --        CAST((CASE WHEN ISNULL(ini.RequestCapex, 'false') = 'true' 
                --        THEN ISNULL(CostEstCapex, 0) ELSE 0 END 
                --        +
                --        CostEstOpex ) / BenefitAmount AS DECIMAL(18,2))
                --END AS CalculatedPayback
                --,
                --ini.PaybackPeriod

                UPDATE ini 
                SET ini.PayBackPeriod = CASE WHEN ISNULL(ini.BenefitAmount, 0) = 0 THEN 0 ELSE
                                                CAST((CASE WHEN ISNULL(ini.RequestCapex, 'false') = 'true' 
                                                THEN ISNULL(CostEstCapex, 0) ELSE 0 END 
                                                +
                                                CostEstOpex ) / BenefitAmount AS DECIMAL(18,2))
                                        END
                FROM Initiatives ini
                WHERE 

                (
                    (
                    CASE WHEN ISNULL(ini.BenefitAmount, 0) = 0 THEN 0 ELSE
                            CAST((CASE WHEN ISNULL(ini.RequestCapex, 'false') = 'true' 
                            THEN ISNULL(CostEstCapex, 0) ELSE 0 END 
                            +
                            CostEstOpex ) / BenefitAmount AS DECIMAL(18,2))
                    END <> ISNULL(ini.PaybackPeriod, -9999)
                    AND ini.InitiativeCode LIKE '2020%'
                    )
                OR
                    (
                        CASE WHEN ISNULL(ini.BenefitAmount, 0) = 0 THEN 0 ELSE
                                CAST((CASE WHEN ISNULL(ini.RequestCapex, 'false') = 'true' 
                                THEN ISNULL(CostEstCapex, 0) ELSE 0 END 
                                +
                                CostEstOpex ) / BenefitAmount AS DECIMAL(18,2))
                        END <> ISNULL(ini.PaybackPeriod, -9999)
                        AND ini.InitiativeCode NOT LIKE '2020%'
                        AND ISNULL(PaybackPeriod, -9999) <> 3
                    )
                )

                AND InitiativeType LIKE '%max%'
                AND ini.Stage NOT IN ('Cancelled','IL5')

        END


END
GO
