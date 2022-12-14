/****** Object:  Table [dbo].[ZZ_TbTxnProjectStatusException]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectStatusException](
	[ProjectID] [int] NOT NULL,
	[ProjectStatusID] [int] NULL,
 CONSTRAINT [PK_TbTxnProjectStatusException] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
