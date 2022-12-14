/****** Object:  Table [dbo].[ZZ_TbTxnMultiPlant]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnMultiPlant](
	[ProjectID] [int] NOT NULL,
	[PlantID] [int] NOT NULL,
	[ProjectEngineer] [nvarchar](255) NOT NULL,
	[ProjectEngineerDisp] [nvarchar](255) NULL,
	[ProjectEngineerDept] [nvarchar](255) NULL,
 CONSTRAINT [PK_TbTxnMultiPlant] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC,
	[PlantID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
