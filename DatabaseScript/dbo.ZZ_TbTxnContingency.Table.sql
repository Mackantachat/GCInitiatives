/****** Object:  Table [dbo].[ZZ_TbTxnContingency]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnContingency](
	[ProjectID] [int] NOT NULL,
	[Period] [nvarchar](50) NOT NULL,
	[ContingencyCost] [decimal](18, 2) NULL,
 CONSTRAINT [PK_TbTxnContingency] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC,
	[Period] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
