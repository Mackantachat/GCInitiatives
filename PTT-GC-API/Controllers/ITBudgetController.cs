using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ITBudget;
using PTT_GC_API.Models.ITBudget;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ITBudgetController : ControllerBase
    {
        private readonly ITBudgetInterface _repository;
        private readonly IMapper _mapper;
        public ITBudgetController(ITBudgetInterface repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetITBudget(int id)
        {
            return Ok(await _repository.GetITBudget(id));
        }

        [HttpPost("Capex/{id}")]
        public async Task<IActionResult> CreateITBudgetCapex(int id, ITBudgetCapex ITBudgetCapex)
        {
            if (ITBudgetCapex != null)
            {

                ITBudgetCapex.InitiativeId = id;
                var ITBudget = _mapper.Map<ITBudgetSurvey>(ITBudgetCapex);
                _repository.Add(ITBudget);
                await _repository.Save();
                return Ok(ITBudget);
            }
            return Ok(ITBudgetCapex);
        }

        [HttpPut("Capex/{id}")]
        public async Task<IActionResult> UpdateITBudgetCapex(int id, ITBudgetCapex ITBudgetCapex)
        {
            if (ITBudgetCapex != null)
            {
                ITBudgetCapex.InitiativeId = id;
                var ITBudget = _mapper.Map<ITBudgetSurvey>(ITBudgetCapex);
                _repository.Update(ITBudget);
                await _repository.Save();
                return Ok(ITBudget);
            }
            return Ok(ITBudgetCapex);
        }

        [HttpPost("Opex/{id}")]
        public async Task<IActionResult> CreateITBudgetOpex(int id, ITBudgetOpex ITBudgetOpex)
        {
            if (ITBudgetOpex != null)
            {
                ITBudgetOpex.InitiativeId = id;
                var ITBudget = _mapper.Map<ITBudgetSurvey>(ITBudgetOpex);
                _repository.Add(ITBudget);
                await _repository.Save();
                return Ok(ITBudget);
            }
            return Ok(ITBudgetOpex);
        }

        [HttpPut("Opex/{id}")]
        public async Task<IActionResult> UpdateITBudgetOpex(int id, ITBudgetOpex ITBudgetOpex)
        {
            if (ITBudgetOpex != null)
            {
                ITBudgetOpex.InitiativeId = id;
                var ITBudget = _mapper.Map<ITBudgetSurvey>(ITBudgetOpex);
                _repository.Update(ITBudget);
                await _repository.Save();
                return Ok(ITBudget);
            }
            return Ok(ITBudgetOpex);
        }

        [HttpGet("Hardware")]
        public async Task<IActionResult> GetHardwareList()
        {
            return Ok(await _repository.GetHardwareList());
        }

        [HttpGet("Software")]
        public async Task<IActionResult> GetSoftwareList()
        {
            return Ok(await _repository.GetSoftwareList());
        }

        [HttpGet("Hardware/{id}")]
        public async Task<IActionResult> GetHardware(int id)
        {
            return Ok(await _repository.GetHardware(id));
        }

        [HttpGet("Software/{id}")]
        public async Task<IActionResult> GetSoftware(int id)
        {
            return Ok(await _repository.GetSoftware(id));
        }

        [HttpPost("Hardware/{id}")]
        public async Task<IActionResult> CreateHardware(int id, CreateHardware CreateHardware)
        {
            await _repository.CreateHardware(id, CreateHardware);
            return StatusCode(201);
        }

        [HttpPost("Software/{id}")]
        public async Task<IActionResult> CreateSoftware(int id, CreateSoftware CreateSoftware)
        {
            await _repository.CreateSoftware(id, CreateSoftware);
            return StatusCode(201);
        }

        [HttpGet("CapexTopic")]
        public async Task<IActionResult> GetCapexTopic()
        {
            return Ok(await _repository.GetCapexTopic());
        }

        [HttpPost("CapexBudgetSurvey/{id}")]
        public async Task<IActionResult> CreateCapexBudgetSurvey(int id, CreateCapexBudgetSurvey CreateCapexBudgetSurvey)
        {
            await _repository.CreateCapexBudgetSurvey(id, CreateCapexBudgetSurvey);
            return StatusCode(201);
        }

        [HttpGet("CapexBudgetSurvey/{id}")]
        public async Task<IActionResult> GetCapexBudgetSurvey(int id)
        {
            return Ok(await _repository.GetCapexBudgetSurvey(id));
        }

        //////////////////////////////  new code ////////////////
        [HttpPost("CreateITBudget/{id}")]
        public async Task<IActionResult> CreateITBudget(int id, ITBudgetSurvey ITBudgetCapex)
        {
            if (ITBudgetCapex != null)
            {

                ITBudgetCapex.InitiativeId = id;
                //var ITBudget = _mapper.Map<ITBudgetSurvey>(ITBudgetCapex);
                _repository.Add(ITBudgetCapex);
                await _repository.Save();
                return Ok(ITBudgetCapex);
            }
            return Ok(ITBudgetCapex);
        }

        [HttpPut("UpdateITBudget/{id}")]
        public async Task<IActionResult> UpdateITBudget(int id, ITBudgetSurvey ITBudgetCapex)
        {
            if (ITBudgetCapex != null)
            {
                ITBudgetCapex.InitiativeId = id;
                //var ITBudget = _mapper.Map<ITBudgetSurvey>(ITBudgetCapex);
                _repository.Update(ITBudgetCapex);
                await _repository.Save();
                return Ok(ITBudgetCapex);
            }
            return Ok(ITBudgetCapex);
        }

        [HttpPost("CapexBudgetSurveyNew/{id}")]
        public async Task<IActionResult> CreateCapexBudgetSurveyNew(int id, CapexBudgetSurvey[] CreateCapexBudgetSurvey)
        {
            await _repository.CreateCapexBudgetSurveyNew(id, CreateCapexBudgetSurvey);
            return StatusCode(201);
        }

        [HttpGet("CapexTopicVersion/{version}")]
        public async Task<IActionResult> GetCapexTopicVersion(int version)
        {
            return Ok(await _repository.GetCapexTopicVersion(version));
        }

        [HttpGet("HardwareVersion/{version}")]
        public async Task<IActionResult> GetHardwareVersionList(int version)
        {
            return Ok(await _repository.GetHardwareVersionList(version));
        }

        [HttpGet("SoftwareVersion/{version}")]
        public async Task<IActionResult> GetSoftwareVersionList(int version)
        {
            return Ok(await _repository.GetSoftwareVersionList(version));
        }
        
        [HttpGet("GetLastSurveyVersions")]
        public async Task<IActionResult> GetLastSurveyVersions()
        {
            return Ok(await _repository.GetLastSurveyVersions());
        }
    }
}