/****** Object:  Table [dbo].[ZZ_TbTxnClosingEntry]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnClosingEntry](
	[ClosingEntryID] [int] IDENTITY(1,1) NOT NULL,
	[Year] [nvarchar](50) NULL,
	[Month] [nvarchar](50) NULL,
 CONSTRAINT [PK_TbTxnClosingEntry] PRIMARY KEY CLUSTERED 
(
	[ClosingEntryID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
