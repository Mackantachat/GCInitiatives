using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.DimMaxHandover;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HandoverController : ControllerBase
    {
        private readonly IHandoverRepository _repository;
        public HandoverController(IHandoverRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("CreateHandover")]
        public IActionResult CreateHandover(DimMaxHandover model)
        {
            var result = _repository.CreateHandover(model);
            return Ok(result);
        }

        [HttpGet("GetHandover/{initiativeId}")]
        public IActionResult GetHandover(int initiativeId)
        {
            var result = _repository.GetHandover(initiativeId).GetAwaiter().GetResult();
            return Ok(result);
        }

        [HttpPut("UpdateHandover")]
        public IActionResult UpdateHandover(DimMaxHandover model)
        {
            var result = _repository.UpdateHandover(model);
            return Ok(result);
        }
    }
}
