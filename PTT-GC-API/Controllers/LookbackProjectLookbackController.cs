using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ProjectLookback;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookbackProjectLookbackController : ControllerBase

    {
        private readonly ProjectLookbackInterface _repository;
        private readonly IMapper _mapper;
        public LookbackProjectLookbackController(ProjectLookbackInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;

        }
        [Route("GetProjectLookbackItem")]
        [HttpGet]
        public async Task<IActionResult> GetProjectLookbackItem()
        {
            try
            {
                var data_ProjectLookback = await _repository.GetProjectLookbackAll();

                return Ok(data_ProjectLookback);
            }
            catch (Exception ex)
            {
                return Ok("ERROR" + ex.Message);
            }
        }
        [Route("GetProjectLookbackAll")]
        [HttpGet]
        public async Task<IActionResult> GetProjectLookbackAll()
        {
            try
            {
                var data_ProjectLookback = await _repository.GetProjectLookbackAll();

                return Ok(data_ProjectLookback);
            }
            catch (Exception ex)
            {
                return Ok("ERROR" + ex.Message);
            }
        }
        [Route("GetProjectLookbackByID")]
        [HttpGet]
        public async Task<IActionResult> GetProjectLookbackByID(int id)
        {
            try
            {
                var data_ProjectLookback = await _repository.GetProjectLookbackByID(id);

                return Ok(data_ProjectLookback);
            }
            catch (Exception ex)
            {
                return Ok("ERROR" + ex.Message);
            }
        }
        [Route("CreateProjectLookback")]
        [HttpPost]
        public async Task<IActionResult> CreateProjectLookback(List<ProjectLookbackList> ProjectLookbackCreate)
        {
            try
            {
                for (int i = 0; i < ProjectLookbackCreate.Count; i++)
                {
                    var ItemProjectLookbackCreate = ProjectLookbackCreate[i];
                    var ProjectLookback_Create = _mapper.Map<ProjectLookbackList>(ItemProjectLookbackCreate);
                    _repository.Add(ProjectLookback_Create);
                    await _repository.Save();
                }
                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

        [Route("DeleteProjectLookback")]
        [HttpGet]
        public async Task<IActionResult> DeleteProjectLookback(int id)
        {
            try
            {
                var ProjectLookback_ID = await _repository.GetProjectLookbackByID(id);
                var dataProjectLookback_id = _mapper.Map<ProjectLookbackList>(ProjectLookback_ID);
                _repository.Delete(dataProjectLookback_id);
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