/****** Object:  Table [dbo].[Initiatives_Capex_Max_Rel]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Initiatives_Capex_Max_Rel](
	[Max_Initiative_Code] [nvarchar](255) NULL,
	[Capex_Initiative_Code] [nvarchar](255) NULL,
	[Max_LagacyInitiativeId] [int] NULL,
	[Capex_LagacyInitiativeId] [int] NULL,
	[Max_InitiativeId] [int] NULL,
	[CapexInformationId] [int] NULL
) ON [PRIMARY]
GO
