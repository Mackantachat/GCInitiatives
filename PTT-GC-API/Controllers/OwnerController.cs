using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.MaxApprover;
using PTT_GC_API.Dtos.Owner;
using PTT_GC_API.Helpers;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly OwnerInterface _repository;
        private readonly IMapper _mapper;

        public OwnerController(OwnerInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetList([FromQuery]OwnerParams OwnerParams)
        {
            var OwnerData = await _repository.GetList(OwnerParams);
            var Owners    = _mapper.Map<IEnumerable<OwnerList>>(OwnerData);
            return Ok(Owners);
        }

        [HttpGet("Email")]
        public async Task<IActionResult> GetEmailList([FromQuery]OwnerParams OwnerParams)
        {
            var Owner = await _repository.GetEmailList(OwnerParams);
            return Ok(Owner);
        }

        [HttpGet("OwnerEmail")]
        public async Task<IActionResult> GetEmail([FromQuery]OwnerParams OwnerParams)
        {
            var Owner = await _repository.GetEmail(OwnerParams);
            return Ok(Owner);
        }

        [HttpGet("User/{username}")]
        public async Task<IActionResult> GetUser(string username)
        {
            var Owner = await _repository.GetUser(username);
            return Ok(Owner);
        }

        [HttpGet("Name")]
        public async Task<IActionResult> GetName([FromQuery]OwnerParams OwnerParams)
        {
            var Owner = await _repository.GetName(OwnerParams);
            return Ok(Owner);
        }

        [HttpPost("NameMaxApprover")]
        public async Task<IActionResult> GetNameMaxApprover(NameMaxApprover NameMaxApprover)
        {
            var Owner = await _repository.GetNameMaxApprover(NameMaxApprover);
            return Ok(Owner);
        }

        [HttpGet("getProjectManager")]
        public async Task<IActionResult> GetProjectManager()
        {
            var Owner = await _repository.GetOwnerName();
            return Ok(Owner);
        }

        [HttpGet("getTeamSupport")]
        public async Task<IActionResult> GetTeamSupport()
        {
            var Owner = await _repository.GetTeamSupportName();
            return Ok(Owner);
        }

        [HttpGet("getVP")]
        public async Task<IActionResult> GetVP([FromQuery]OwnerParams OwnerParams)
        {
            var Owner = await _repository.GetVP(OwnerParams);
            return Ok(Owner);
        }
    }
}