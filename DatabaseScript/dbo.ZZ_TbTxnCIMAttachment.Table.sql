/****** Object:  Table [dbo].[ZZ_TbTxnCIMAttachment]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnCIMAttachment](
	[AttachYear] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[Description] [nvarchar](200) NULL,
	[FilePath] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK__TbTxnAtt__302221EA38D961D7] PRIMARY KEY CLUSTERED 
(
	[AttachYear] ASC,
	[ItemNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
