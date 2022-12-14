/****** Object:  Table [dbo].[ZZ_TbMstCIMLookbackStrategy]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstCIMLookbackStrategy](
	[LookbackStrategyId] [int] NOT NULL,
	[LookbackStrategy] [nvarchar](50) NOT NULL,
	[LookbackOrder] [int] NOT NULL,
	[MarkDelete] [bit] NOT NULL,
 CONSTRAINT [PK__TbMstCIM__743CB5172E5BD364] PRIMARY KEY CLUSTERED 
(
	[LookbackStrategyId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
