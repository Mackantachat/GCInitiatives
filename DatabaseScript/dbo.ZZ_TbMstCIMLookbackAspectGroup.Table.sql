/****** Object:  Table [dbo].[ZZ_TbMstCIMLookbackAspectGroup]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstCIMLookbackAspectGroup](
	[Order] [int] NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
	[MarkDelete] [bit] NOT NULL,
	[FormType] [nvarchar](10) NOT NULL,
	[DisableApprove] [bit] NULL,
	[DisableActual] [bit] NULL,
	[DisableNote] [bit] NULL,
	[DisableBusinessPlan] [bit] NULL,
	[DisableMidCycle] [bit] NULL,
 CONSTRAINT [PK__TbMstCIM__67A3D86D0682EC34] PRIMARY KEY CLUSTERED 
(
	[Order] ASC,
	[FormType] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
