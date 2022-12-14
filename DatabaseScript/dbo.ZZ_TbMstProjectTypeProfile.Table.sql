/****** Object:  Table [dbo].[ZZ_TbMstProjectTypeProfile]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstProjectTypeProfile](
	[ProjectTypeID] [int] NOT NULL,
	[ProfileID] [int] NOT NULL,
 CONSTRAINT [PK_TbMstProjectTypeProfile] PRIMARY KEY CLUSTERED 
(
	[ProjectTypeID] ASC,
	[ProfileID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbMstProjectTypeProfile]  WITH CHECK ADD  CONSTRAINT [FK__TbMstProj__Profi__31F75A1E] FOREIGN KEY([ProfileID])
REFERENCES [dbo].[ZZ_TbMstProfile] ([ProfileID])
GO
ALTER TABLE [dbo].[ZZ_TbMstProjectTypeProfile] CHECK CONSTRAINT [FK__TbMstProj__Profi__31F75A1E]
GO
ALTER TABLE [dbo].[ZZ_TbMstProjectTypeProfile]  WITH CHECK ADD  CONSTRAINT [FK__TbMstProj__Proje__32EB7E57] FOREIGN KEY([ProjectTypeID])
REFERENCES [dbo].[ZZ_TbMstProjectType] ([ProjectTypeID])
GO
ALTER TABLE [dbo].[ZZ_TbMstProjectTypeProfile] CHECK CONSTRAINT [FK__TbMstProj__Proje__32EB7E57]
GO
