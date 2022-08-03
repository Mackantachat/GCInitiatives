/****** Object:  Table [dbo].[ZZ_TbMstPlanCostVersion]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstPlanCostVersion](
	[PlanCostVersionID] [int] IDENTITY(1,1) NOT NULL,
	[PlanCostVersion] [nvarchar](50) NULL,
 CONSTRAINT [PK_TbMstPlanCostVersion] PRIMARY KEY CLUSTERED 
(
	[PlanCostVersionID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
