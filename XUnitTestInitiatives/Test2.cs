using System;
using System.Collections.Generic;
using System.Text;
using PTT_GC_API.Controllers;
using PTT_GC_API.Dtos.Initiative;
using Xunit;
using PTT_GC_API.Models;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Data.Interface;
using AutoMapper;
using PTT_GC_API;
using Microsoft.Extensions.Options;
using PTT_GC_API.Data.Repository;
using Microsoft.AspNetCore.Mvc;

namespace XUnitTestInitiatives
{
    public class Test2
    {
        [Fact]
        public void TestTest()
        {
            //var dd = new Initiative();
            //dd.Id = 001;
            //dd.Name = "Nok";
            //InitiativeSearch bb = new InitiativeSearch(); // ทำไมต้องประกาศตัวแปรของ Controllers
            //bb.Text = "Nok";
            // var aa = new InitiativeController(null, null); // ทำไมต้อง Null,Null

            //var cc = aa.SearchInitiative(bb); // ทำไมต้องประกาศตัวแปรของ Dtos

            //Assert.Equal(cc, InitiativeSearch);

            //InitiativeSearch initiative = new InitiativeSearch();
            //initiative.Text = "vee";

            //var a = new PTT_GC_API.Controllers.InitiativeController(null,null);
            //a.SearchInitiative()
        }
        private readonly InitiativeInterface _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<BlobConfig> _blobConfig;

        //[Fact]
        //public async void TestDBAsync()
        //{

        //    var a = new InitiativeController(_repository, _mapper, _blobConfig);
        //    var l = new InitiativeCreate
        //    {
        //        InitiativeCode = "001",
        //        Name = "ssss"
        //    };

        //    await a.CreateInitiative(l);


        //    //Initiative initiative = _mapper.Map<Initiative>(dd);
        //    //dd.Name = "sssssss";
        //    //_repository.Add(initiative);
        //    //await _repository.Save();

        //    try
        //    {

        //    }
        //    catch {

        //    }
        //}

        [Fact]
        public async void TestDBAsync2()
        {
        //    InitiativeInterface _repository2;
        //    IMapper _mapper2;
        //    IOptions<BlobConfig> _blobConfig2;

        ////Arrange
        //    var controller = new InitiativeController();
        //    var name = "test insert";
        //    var l = new InitiativeCreate
        //    {
        //        InitiativeCode = "001",
        //        Name = "ssss"
        //    };

        //    //Act
        //    var data = await controller.CreateInitiative(l);

        //    //Assert
        //    Assert.IsNotType <BadRequestResult> (data);
        }

    }
}
