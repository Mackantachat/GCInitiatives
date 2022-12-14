/****** Object:  Table [dbo].[ZZ_TbTxnSituation1]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnSituation1](
	[ProjectID] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[Situation] [nvarchar](1000) NULL,
	[Before] [nvarchar](1000) NULL,
	[Target] [nvarchar](1000) NULL,
	[After] [nvarchar](1000) NULL,
 CONSTRAINT [PK__TbTxnSit__213D672E377B294A] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC,
	[ItemNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
