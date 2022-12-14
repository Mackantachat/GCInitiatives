/****** Object:  Table [dbo].[ZZ_TbTxnGeneralParameter]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnGeneralParameter](
	[ParameterID] [int] NOT NULL,
	[ReportAsDate] [datetime] NULL,
	[DataAs] [datetime] NULL,
 CONSTRAINT [PK_TbTxnGeneralParameter] PRIMARY KEY CLUSTERED 
(
	[ParameterID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
