/****** Object:  Table [dbo].[ZZ_TbMstRiskLikelihood]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstRiskLikelihood](
	[Level] [int] NOT NULL,
	[UpperBound] [decimal](18, 1) NULL,
	[LowerBound] [decimal](18, 1) NULL,
	[Remark] [nvarchar](1000) NULL,
 CONSTRAINT [PK__TbMstRis__AAF899632042BE37] PRIMARY KEY CLUSTERED 
(
	[Level] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
