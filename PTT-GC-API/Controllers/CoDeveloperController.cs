using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.CoDeveloper;
using PTT_GC_API.Helpers;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CoDeveloperController : ControllerBase
    {
        private readonly CoDeveloperInterface _repository;
        private readonly IMapper _mapper;
        public CoDeveloperController(CoDeveloperInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> GetList([FromQuery]CoDeveloperParams CoDeveloperParams)
        {
            var CoDeveloperData = await _repository.GetList(CoDeveloperParams);
            var CoDevelopers    = _mapper.Map<IEnumerable<CoDeveloperList>>(CoDeveloperData);
            return Ok(CoDevelopers);
        }
    }
}