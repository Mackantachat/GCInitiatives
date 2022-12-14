/****** Object:  Table [dbo].[ZZ_TbTxnOutstandingItems]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnOutstandingItems](
	[ProjectID] [int] NOT NULL,
	[Period] [nvarchar](50) NOT NULL,
	[ItemID] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](50) NULL,
	[Cost] [decimal](18, 2) NULL,
 CONSTRAINT [PK_TbTxnOutstandingItems] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC,
	[Period] ASC,
	[ItemID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
