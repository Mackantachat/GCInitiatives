/****** Object:  Table [dbo].[VacList]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VacList](
	[VacListId] [int] IDENTITY(1,1) NOT NULL,
	[MeetingDate] [datetime2](7) NULL,
	[StatusVac] [nvarchar](max) NULL,
 CONSTRAINT [PK_VacList] PRIMARY KEY CLUSTERED 
(
	[VacListId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
