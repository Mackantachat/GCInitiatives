/****** Object:  Table [dbo].[CAPEX_ReportParameter]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CAPEX_ReportParameter](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ReportType] [nvarchar](200) NULL,
	[Value] [nvarchar](150) NULL,
	[Name] [nvarchar](150) NULL
) ON [PRIMARY]
GO
