using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using PTT_GC_API.Data;
using PTT_GC_API.Data.Repository;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Services.State;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Xunit;
using AutoMapper;
using PTT_GC_API.Helpers;

namespace XUnitTestInitiatives
{
    public class StageServiceUnitTest
    {
        private DataContext _context;

        Mock<IStageRepository> _mockStageRepository;
        IStageRepository stageRepository;
        IMapper _mapper;

        public StageServiceUnitTest()
        {

            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfiles());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            _mapper = mapper;

            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer("Data Source=qagcinitiative.database.windows.net;Initial Catalog=DBinitiative_Training;Persist Security Info=True;User ID=gcinitiativeqa;Password=GC!n!tiativeQA;Trusted_Connection=false;MultipleActiveResultSets=true;");
            _context = new DataContext(optionsBuilder.Options);
            stageRepository = new StageRepository(_context, _mapper);
        }

        [Fact]
        public void notAUnittestGetPassConditionShouldReturnTrue()
        {
            
            //Arrange
            //_mockStageRepository.Setup(x => x.GetInitiativeActionByIdAndFlowType(It.IsAny<int>())).Returns(new List<InitiativeAction>());
            //_mockStageRepository.Setup(x => x.GetInitiativeStageByIdAndFlowType(It.IsAny<int>(), It.IsAny<string>())).Returns(new PTT_GC_API.Models.ApprovalFlow.InitiativeStage { Stage = "finish", Status = "complete" });
            //_mockStageRepository.Setup(x => x.GetInitiativeViewsById(It.IsAny<int>())).Returns(new V_Initiative { Stage = "finish", Status = "complete" });

            //Act
            //var service = new StageService(stageRepository);
            //var response = service.GetSkipCondition(46339, "#skipbod", "@submit");

            //Assert
            //Assert.True(response);
        }
    }
}
