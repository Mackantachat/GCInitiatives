using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.StrategicObjective;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StrategicObjectiveController : ControllerBase
    {
        private readonly StrategicObjectiveInterface _repository;
        private readonly IMapper _mapper;

        public StrategicObjectiveController(StrategicObjectiveInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet("{year}")]
        public async Task<IActionResult> GetList(string year)
        {
            var Data = await _repository.GetList(year);
            var List = _mapper.Map<IEnumerable<StrategicObjectiveList>>(Data);
            return Ok(List);
        }

        [HttpGet("GetStrategicObjectiveYear")]
        public IActionResult GetStrategicObjectiveYear()
        {
            var Year = _repository.GetStrategicObjectiveYear();
            return Ok(new { Response = Year });
            //return Ok(new { Result = response });
        }
    }
}