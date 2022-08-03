/****** Object:  Table [dbo].[ZZ_TbTxnPlanProgressHistory]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnPlanProgressHistory](
	[ProjectID] [int] NOT NULL,
	[Version] [nvarchar](50) NULL,
 CONSTRAINT [PK_TbTxnPlanProgressHistory] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
