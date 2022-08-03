using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ProjectImpactWork;
using PTT_GC_API.Models;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookbackProjectImpactWorkController : ControllerBase

    {
        private readonly ProjectImpactWorkInterface _repository;
        private readonly IMapper _mapper;
        public LookbackProjectImpactWorkController(ProjectImpactWorkInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;

        }
        [Route("GetProjectImpactWork")]
        [HttpGet]
        public async Task<IActionResult> GetProjectImpactWorkAll()
        {
            try
            {
                var data_ProjectImpactWork = await _repository.GetProjectImpactWorkAll();

                return Ok(data_ProjectImpactWork);
            }
            catch (Exception ex)
            {
                return Ok("ERROR" + ex.Message);
            }
        }
        [Route("CreateProjectImpactWork")]
        [HttpPost]
        public async Task<IActionResult> CreateProjectImpactWork(List<ProjectImpactWork> ProjectImpactWorkCreate)
        {
            try
            {
                for (int i = 0; i < ProjectImpactWorkCreate.Count; i++)
                {
                    var ItemProjectImpactWorkCreate = ProjectImpactWorkCreate[i];
                    var ProjectImpactWork_Create = _mapper.Map<ProjectImpactWork>(ItemProjectImpactWorkCreate);
                    _repository.Add(ProjectImpactWork_Create);
                    await _repository.Save();
                }
                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

        [Route("DeleteProjectImpactWork")]
        [HttpGet]
        public async Task<IActionResult> DeleteProjectImpactWork(int id)
        {
            try
            {
                var ProjectImpactWork_ID = await _repository.GetProjectImpactWorkByID(id);
                var dataProjectImpactWork_id = _mapper.Map<ProjectImpactWorkList>(ProjectImpactWork_ID);
                _repository.Delete(dataProjectImpactWork_id);
                await _repository.Save();

                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }
    }
}