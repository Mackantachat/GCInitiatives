using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ProjectImpact;
using PTT_GC_API.Models;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookbackProjectImpactController : ControllerBase

    {
        private readonly ProjectImpactInterface _repository;
        private readonly IMapper _mapper;
        public LookbackProjectImpactController(ProjectImpactInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;

        }
        [Route("GetProjectImpact")]
        [HttpGet]
        public async Task<IActionResult> GetProjectImpactAll()
        {
            try
            {
                var data_ProjectImpact = await _repository.GetProjectImpactAll();

                return Ok(data_ProjectImpact);
            }
            catch (Exception ex)
            {
                return Ok("ERROR" + ex.Message);
            }
        }
        [Route("CreateProjectImpact")]
        [HttpPost]
        public async Task<IActionResult> CreateProjectImpact(List<ProjectImpact> ProjectImpactCreate)
        {
            try
            {
                for (int i = 0; i < ProjectImpactCreate.Count; i++)
                {
                    var ItemProjectImpactCreate = ProjectImpactCreate[i];
                    var ProjectImpact_Create = _mapper.Map<ProjectImpact>(ItemProjectImpactCreate);
                    _repository.Add(ProjectImpact_Create);
                    await _repository.Save();
                }
                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

        [Route("DeleteProjectImpact")]
        [HttpGet]
        public async Task<IActionResult> DeleteProjectImpact(int id)
        {
            try
            {
                var ProjectImpact_ID = await _repository.GetProjectImpactByID(id);
                var dataProjectImpact_id = _mapper.Map<ProjectImpactList>(ProjectImpact_ID);
                _repository.Delete(dataProjectImpact_id);
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