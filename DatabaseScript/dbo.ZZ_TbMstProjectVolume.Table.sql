/****** Object:  Table [dbo].[ZZ_TbMstProjectVolume]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstProjectVolume](
	[VolumeID] [int] NOT NULL,
	[VolumeType] [nvarchar](50) NOT NULL,
	[Unit] [nvarchar](50) NOT NULL,
	[IsDefault] [bit] NOT NULL,
 CONSTRAINT [PK_TbMstProjectVolume] PRIMARY KEY CLUSTERED 
(
	[VolumeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
