/****** Object:  Table [dbo].[ZZ_TbTxnProjectVolume]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectVolume](
	[ProjectID] [int] NOT NULL,
	[VolumeType] [nvarchar](50) NOT NULL,
	[Quantity] [decimal](18, 2) NULL,
	[Unit] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
