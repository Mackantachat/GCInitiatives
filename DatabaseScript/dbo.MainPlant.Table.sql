/****** Object:  Table [dbo].[MainPlant]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MainPlant](
	[MainPlanId] [int] IDENTITY(1,1) NOT NULL,
	[Plant] [nvarchar](max) NULL,
	[AreaUnit] [nvarchar](max) NULL,
	[TypeOfChange] [nvarchar](max) NULL,
	[MocCategory] [nvarchar](max) NULL,
	[ExpireDate] [datetime2](7) NULL,
	[DetailOfTheChange] [nvarchar](max) NULL,
	[InitialListOfPeople] [nvarchar](max) NULL,
	[EmocNo] [nvarchar](max) NULL,
	[MocChampion] [nvarchar](max) NULL,
	[IsMainPlant] [bit] NULL,
	[AssumptionOfGoal] [nvarchar](max) NULL,
	[GoalAchievement] [nvarchar](max) NULL,
	[InitiativeId] [int] NULL,
	[ReasonForChange] [nvarchar](max) NULL,
	[SpecifiedGoalAchievement] [nvarchar](max) NULL,
	[EMocTitle] [nvarchar](max) NULL,
 CONSTRAINT [PK_MainPlant] PRIMARY KEY CLUSTERED 
(
	[MainPlanId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
