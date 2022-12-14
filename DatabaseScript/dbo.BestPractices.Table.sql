/****** Object:  Table [dbo].[BestPractices]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BestPractices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[IsBestPracticeRequired] [bit] NOT NULL,
	[KnowledgeType] [nvarchar](max) NULL,
	[SharedTo] [nvarchar](max) NULL,
	[SharedPracticeType] [nvarchar](max) NULL,
	[Title] [nvarchar](max) NULL,
	[KnowledgeOwner] [nvarchar](max) NULL,
	[Company] [nvarchar](max) NULL,
	[IsDigitalization] [bit] NOT NULL,
	[StartDate] [datetime2](7) NULL,
	[EndDate] [datetime2](7) NULL,
	[YearOfBestPractice] [datetime2](7) NULL,
	[LifeTimeOfProject] [int] NULL,
	[Investment] [decimal](18, 3) NULL,
	[ProjectCost] [decimal](18, 3) NULL,
	[AbstractSummary] [nvarchar](max) NULL,
	[Objective] [nvarchar](max) NULL,
	[BenefitDescription] [nvarchar](max) NULL,
	[KnowledgeTheme] [nvarchar](max) NULL,
	[EnterpriseKeyword] [nvarchar](max) NULL,
	[CaptureMethod] [nvarchar](max) NULL,
	[CaptureMethodNote] [nvarchar](max) NULL,
	[TargetGroupNote] [nvarchar](max) NULL,
	[ApplyFrom] [nvarchar](max) NULL,
	[ApplyFromOpEx] [nvarchar](max) NULL,
	[BusinessLine] [nvarchar](max) NULL,
	[ProjectType] [nvarchar](max) NULL,
	[OemsElement] [nvarchar](max) NULL,
	[Application] [nvarchar](max) NULL,
	[OperationFunction] [nvarchar](max) NULL,
	[OperationUnit] [nvarchar](max) NULL,
	[EquipmentType] [nvarchar](max) NULL,
	[ProductGroup] [nvarchar](max) NULL,
	[AbstractDetails] [nvarchar](max) NULL,
	[IsPublishToOpex] [bit] NOT NULL,
	[Organization] [nvarchar](max) NULL,
	[Plant] [nvarchar](max) NULL,
 CONSTRAINT [PK_BestPractices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[BestPractices] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsPublishToOpex]
GO
