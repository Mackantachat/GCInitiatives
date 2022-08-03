using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.KRI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class KpiKriMaintainController : ControllerBase
    {
        private readonly IKpiKriMaintain _repository;
        private readonly IMapper _mapper;

        public KpiKriMaintainController(IKpiKriMaintain repository,IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("GetProgreessMitigationByMaintainId/{id}")]
        public async Task<IActionResult> GetProgreessMitigationByMaintainId(int id)
        {
            var result = await _repository.GetProgreessMitigationByMaintainId(id);
            return Ok(result);
        }

        [HttpGet("GetMaintainKpiByYear/{year}")]
        public async Task<IActionResult> GetMaintainKpiByYear(string year)
        {
            var result = await _repository.GetMaintainKpiByYear(year);
            return Ok(result);
        }

        [HttpPost("PostMaintainKpi/{year}")]
        public async Task<IActionResult> PostMaintainKpi([FromBody] MaintainKpi[] kpis,string year)
        {
            var maintainKpis = _mapper.Map<MaintainKpi[]>(kpis);
            await _repository.AddRangeAsync(maintainKpis,year);
            //await _repository.SaveChangesAsync();
            return Ok(maintainKpis);
        }
        [HttpGet("GetMaintainKpi/{year}")]
        public async Task<IActionResult> GetMaintainKpiAsync(string year)
        {
            return Ok(await _repository.GetMaintainKpis(year));
        }
        [HttpGet("GetMaintainKpiById/{Id}")]
        public async Task<IActionResult> GetMaintainKpiById(int id)
        {
            return Ok(await _repository.GetMaintainKpiById(id));
        }

        [HttpGet("GetKriKpiModel/{year}/{id}/{username}")]
        public async Task<IActionResult> GetKriKpiModel(string year,int id, string username)
        {
            return Ok(await _repository.GetKriKpiModel(year,id,username));
        }

        [HttpPost("PostKpiKriModel/{id}")]
        public async Task<IActionResult> PostKpiKriModel(int id, KpiKriModel km)
        {
            return Ok(await _repository.PostKpiKriModel(id, km));
        }

        [HttpPost("SendEmailKri")]
        public async Task<IActionResult> SendEmailKri(InformKri informKri)
        {
            await _repository.SendMailInform(informKri);
            return Ok();
        }

        [HttpGet("CheckkpiExist/{id}")]
        public async Task<IActionResult> CheckkpiExist(int id)
        {
            return Ok(await _repository.CheckkpiExist(id));
        }

    }
}
