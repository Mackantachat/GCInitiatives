/****** Object:  Table [dbo].[IF_ActualCost]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IF_ActualCost](
	[Id] [int] IDENTITY(0,1) NOT NULL,
	[Project_Definition_Key] [nvarchar](256) NULL,
	[Plan_Amount] [int] NULL,
	[Actual] [float] NULL,
	[PR] [int] NULL,
	[PO] [int] NULL,
	[Budget_Amount] [int] NULL,
	[Project_Definition_Created_on_Key] [date] NULL,
	[Project_Definition_Project_Close_Date_Key] [date] NULL,
	[Project_Definition_Capitalized_Date_Key] [date] NULL,
	[Project_Definition_Project_Flag_for_Del_Key] [date] NULL,
	[Project_Definition_Project_TECO_Date_Key] [date] NULL,
	[Project_Definition_Project_Release_Date_Key] [date] NULL,
	[Project_Definition_Project_Delete_Date_Key] [date] NULL,
	[Peroid] [nvarchar](256) NULL,
	[PR_Snapshot] [nvarchar](256) NULL,
	[PO_Snapshot] [nvarchar](256) NULL,
 CONSTRAINT [ActualCost_PK] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
