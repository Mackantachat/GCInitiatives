using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PTT_GC_API;
using PTT_GC_API.Controllers;
using PTT_GC_API.Data;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Data.Repository;
using PTT_GC_API.Dtos.Initiative;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace XUnitTestInitiatives
{
    public class PostUnitTestController
    {
        public InitiativeRepository repository;
        public InitiativeGeneral map;
        public  IMapper _mapper;
        //public  IOptions<BlobConfig> _blobConfig;
        public static DbContextOptions<DataContext> dbContextOptions { get; }
        public static string connectionString = "";

        static PostUnitTestController()
        {
            dbContextOptions = new DbContextOptionsBuilder<DataContext>().UseSqlServer(connectionString).Options;
        }
        public PostUnitTestController()
        {
            //var context = new DataContext(dbContextOptions);
            //DummyDataDBInitializer db = new DummyDataDBInitializer();
            //db.Seed(context);

            //repository = new InitiativeRepository(context);

        }
        [Fact]
        public async void Task_GetPostById_Return_OkResult()
        {
            //Arrange
            //var controller = new InitiativeController(repository);
            //int postId = 3;

            //Act
            //var data = await controller.GetInitiative(5);
            //Assert
            //Assert.IsType<OkObjectResult>(data);
        }

        //[Fact]
        //public async void Task_Add_ValidData_Return_OkResult()
        //{
        //    //Arrange
        //    var controller = new InitiativeController(repository);
        //    var post = new InitiativeCreate() { Name = "Test Title 3", CreatedDate = DateTime.Now };

        //    //Act
        //    var data = await controller.CreateInitiative(post);

        //    //Assert
        //    Assert.IsType<OkObjectResult>(data);
        //}

    }
}
