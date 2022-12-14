/****** Object:  Table [dbo].[ZZ_TbTxnAssignee]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnAssignee](
	[ProjectID] [int] NOT NULL,
	[EmployeeID] [nvarchar](50) NOT NULL,
	[GroupID] [int] NOT NULL,
 CONSTRAINT [PK_TbTxnAssignee] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC,
	[GroupID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
