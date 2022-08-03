using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.CoreUplift;
using PTT_GC_API.Models;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookbackCoreUpliftController : ControllerBase
    {
        private readonly CoreUpliftInterface _repository;
        private readonly IMapper _mapper;
        public LookbackCoreUpliftController(CoreUpliftInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;

        }
        [Route("GetCoreUplift")]
        [HttpGet]
        public async Task<IActionResult> GetCoreUpliftAll()
        {
            try
            {
                var data_CoreUplift = await _repository.GetCoreUpliftAll();

                return Ok(data_CoreUplift);
            }
            catch (Exception ex)
            {
                return Ok("ERROR" + ex.Message);
            }
        }
        [Route("CreateCoreUplift")]
        [HttpPost]
        public async Task<IActionResult> CreateCoreUplift(List<CoreUplift> CoreUpliftCreate)
        {
            try
            {
                for (int i = 0; i < CoreUpliftCreate.Count; i++)
                {
                    var ItemCoreUpliftCreate = CoreUpliftCreate[i];
                    var CoreUplift_Create = _mapper.Map<CoreUplift>(ItemCoreUpliftCreate);
                    _repository.Add(CoreUplift_Create);
                    await _repository.Save();
                }
                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

        [Route("DeleteCoreUplift")]
        [HttpGet]
        public async Task<IActionResult> DeleteCoreUplift(int id)
        {
            try
            {
                var CoreUplift_ID = await _repository.GetCoreUpliftByID(id);
                var dataCoreUplift_id = _mapper.Map<CoreUpliftList>(CoreUplift_ID);
                _repository.Delete(dataCoreUplift_id);
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