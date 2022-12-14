/****** Object:  Table [dbo].[ZZ_TbRptGovernanceException]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbRptGovernanceException](
	[ProjectID] [int] NOT NULL,
	[Period] [nvarchar](50) NOT NULL,
	[POCException] [bit] NULL,
	[HWException] [bit] NULL,
	[OIException] [bit] NULL,
	[ModifiedDate] [datetime] NULL,
	[CLException] [bit] NULL,
 CONSTRAINT [PK_TbRptGovernanceException] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC,
	[Period] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
