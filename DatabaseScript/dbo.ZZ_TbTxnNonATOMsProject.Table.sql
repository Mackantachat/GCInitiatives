/****** Object:  Table [dbo].[ZZ_TbTxnNonATOMsProject]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnNonATOMsProject](
	[Company] [nvarchar](255) NULL,
	[AppropriationRequestNo] [nvarchar](255) NOT NULL,
	[AppropriationRequestDescription] [nvarchar](255) NULL,
	[ProjectNo] [nvarchar](255) NULL,
	[ProjectName] [nvarchar](255) NULL,
	[ProjectTypeNo] [nvarchar](255) NULL,
	[PlantCode] [nvarchar](255) NULL,
	[BU] [nvarchar](255) NULL,
	[Currency] [nvarchar](255) NULL,
	[ForecastStartDate] [nvarchar](255) NULL,
	[ForecastFinishDate] [nvarchar](255) NULL,
	[BasicStartDate] [nvarchar](255) NULL,
	[BasicFinishDate] [nvarchar](255) NULL,
	[ActualStartDate] [nvarchar](255) NULL,
	[EVP] [nvarchar](255) NULL,
	[VP] [nvarchar](255) NULL,
	[VPProjectOwnerName] [nvarchar](255) NULL,
	[ResponsibleCostCenterCode] [nvarchar](255) NULL,
	[ProjectManagerName] [nvarchar](255) NULL,
	[ProjectCoordinatorName] [nvarchar](255) NULL,
	[CurrencyType] [nvarchar](50) NULL,
 CONSTRAINT [PK_TbTxnNonATOMsProject] PRIMARY KEY CLUSTERED 
(
	[AppropriationRequestNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
