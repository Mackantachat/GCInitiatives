using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Audit;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuditController : ControllerBase
    {
        private readonly AuditInterface _repository;
        private readonly IMapper _mapper;
        public AuditController(AuditInterface repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetList([FromQuery]AuditParams AuditParams)
        {
            var auditData = await _repository.GetAudits(AuditParams);
            var audits = _mapper.Map<IEnumerable<V_Audit>>(auditData);
            Response.AddPagination(auditData.CurrentPage, auditData.PageSize, auditData.TotalCount, auditData.TotalPages);
            return Ok(audits);
        }

        [HttpPost("FullLog")]
        public async Task<IActionResult> CallFullLog(LogParams logParams)
        {
            return Ok(await _repository.CallFullLog(logParams));
        }

        [HttpPost("AuditLog")]
        public async Task<IActionResult> CallAuditLog(LogParams logParams)
        {
            return Ok(await _repository.CallAuditLog(logParams));
        }
    }
}