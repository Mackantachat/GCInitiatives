/****** Object:  Table [dbo].[ZZ_TbMstCIMLookbackItem]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstCIMLookbackItem](
	[AspectId] [int] NOT NULL,
	[Aspect] [nvarchar](1000) NULL,
	[IndentLevel] [int] NOT NULL,
	[AspectGroup] [int] NOT NULL,
	[FormType] [nvarchar](10) NOT NULL,
	[AspectDataType] [nvarchar](2) NULL,
	[AspectFlag] [bit] NOT NULL,
	[Required] [bit] NULL,
	[AspectOrder] [int] NOT NULL,
 CONSTRAINT [PK__TbMstCIM__1442AAB54A03EDD9] PRIMARY KEY CLUSTERED 
(
	[AspectId] ASC,
	[FormType] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbMstCIMLookbackItem] ADD  CONSTRAINT [DF__TbMstCIML__Aspec__27F8EE98]  DEFAULT ((1)) FOR [AspectFlag]
GO
ALTER TABLE [dbo].[ZZ_TbMstCIMLookbackItem] ADD  DEFAULT ((1)) FOR [Required]
GO
ALTER TABLE [dbo].[ZZ_TbMstCIMLookbackItem]  WITH CHECK ADD  CONSTRAINT [FK__TbMstCIMLookback__2E26C93A] FOREIGN KEY([AspectGroup], [FormType])
REFERENCES [dbo].[ZZ_TbMstCIMLookbackAspectGroup] ([Order], [FormType])
GO
ALTER TABLE [dbo].[ZZ_TbMstCIMLookbackItem] CHECK CONSTRAINT [FK__TbMstCIMLookback__2E26C93A]
GO
