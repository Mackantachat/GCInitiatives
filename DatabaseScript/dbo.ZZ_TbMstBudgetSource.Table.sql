/****** Object:  Table [dbo].[ZZ_TbMstBudgetSource]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstBudgetSource](
	[BudgetSourceID] [int] IDENTITY(1,1) NOT NULL,
	[BudgetSourceName] [nvarchar](50) NULL,
 CONSTRAINT [PK_TbMstBudgetSource] PRIMARY KEY CLUSTERED 
(
	[BudgetSourceID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
