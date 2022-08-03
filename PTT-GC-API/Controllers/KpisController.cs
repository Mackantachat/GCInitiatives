using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Kri;
using PTT_GC_API.Models.EMOCs;
using PTT_GC_API.Models.KRI;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class KpisController : ControllerBase
    {
        private readonly KpisInterface _repository;
        private readonly IMapper _mapper;
        public KpisController(KpisInterface repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            return Ok(await _repository.GetList());
        }

        //[HttpPost("PostMaintainKpi")]
        //public IActionResult PostMaintainKpi([FromBody] MaintainKpi[] kpis)
        //{
        //    var maintainKpis = _mapper.Map<MaintainKpi[]>(kpis);
        //    _repository.AddRange(maintainKpis);
        //    //await _repository.SaveChangesAsync();
        //    return Ok(maintainKpis);
        //}



        //[HttpGet("GetMaintainKpi/{year}")]
        //public async Task<IActionResult> GetMaintainKpiAsync(string year)
        //{
        //    return Ok(await _repository.GetMaintainKpis(year));
        //}

        //[HttpGet("GetKpiEvaluate/{id}/{year}")]
        //public async Task<IActionResult> GetKpiEvaluate(int id,string year)
        //{
        //    return Ok(await _repository.GetKpiEvaluate(id, year));
        //}
    }
}