using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.DimMemberList;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DimMemberController : ControllerBase
    {
        private readonly IDimMemberRepository _repository;
        public DimMemberController(IDimMemberRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> GetDimMember([FromBody] DimMemberList DimMemberList)
        {
            return Ok(await _repository.GetDimMember(DimMemberList));
        }

        [HttpPost("ProjectSponsor/{id}")]
        public async Task<IActionResult> CreateProjectSponsor(int id, [FromBody] string[] form)
        {
            return Ok(await _repository.CreateProjectSponsor(id, form));
        }

        [HttpPost("ITFocalPoint/{id}")]
        public async Task<IActionResult> CreateITFocalPoint(int id, [FromBody] string[] form)
        {
            return Ok(await _repository.CreateITFocalPoint(id, form));
        }

        [HttpPost("ImpactedParties/{id}")]
        public async Task<IActionResult> CreateImpactedParties(int id, [FromBody] string[] form)
        {
            return Ok(await _repository.CreateImpactedParties(id, form));
        }

        [HttpPost("TeamMember/{id}")]
        public async Task<IActionResult> CreateTeamMember(int id, [FromBody] string[] form)
        {
            return Ok(await _repository.CreateTeamMember(id, form));
        }
        [HttpPost("DigitalFocalPoint/{id}")]
        public async Task<IActionResult> CreateDigitalFocalPoint(int id,[FromBody] string[] form)
        {
            var result = await _repository.CreateDigitalFocalPoint(id, form);
            return Ok(result);
        }
    }
}
