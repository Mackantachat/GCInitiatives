/****** Object:  Table [dbo].[ZZ_TbMstPMOPerfLookback]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstPMOPerfLookback](
	[Id] [int] NOT NULL,
	[Topic] [nvarchar](200) NULL,
	[KnowledgeArea] [nvarchar](200) NULL,
	[Issue] [nvarchar](200) NULL,
	[IssueRequired] [bit] NULL,
	[Estimate] [nvarchar](200) NULL,
	[EstimateRequired] [bit] NULL,
	[Actual] [nvarchar](200) NULL,
	[ActualRequired] [bit] NULL,
	[WhyDifference] [nvarchar](200) NULL,
	[WhyDifferenceRequired] [bit] NULL,
	[IndentLevel] [int] NULL,
	[Order] [int] NULL,
	[Dashboard] [bit] NULL,
	[IsHeaderNotEdit] [bit] NULL,
	[GroupKnowled] [nvarchar](1) NULL,
	[GroupValidate] [int] NULL,
 CONSTRAINT [PK__TbMstPMO__3214EC0732B6742D] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
