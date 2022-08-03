using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RiskController : Controller
    {
        private readonly IRiskRepository _riskRepository;

        public RiskController(IRiskRepository riskRepository)
        {
            _riskRepository = riskRepository;
        }

        [HttpPost("InsertRiskData/{id}")]
        public IActionResult InsertRiskData([FromBody]RiskModelData[] riskModel, int id)
        {
            try
            {
                return Ok(_riskRepository.InsertRiskData(riskModel, id).GetAwaiter().GetResult());
            }
            catch(Exception e)
            {
                return StatusCode(500,e);
            }
        }

        [HttpGet("GetRiskData/{initiativeId}")]
        public IActionResult GetRiskData(int initiativeId)
        {
            try
            {
                var result = _riskRepository.GetRiskData(initiativeId);
                return Ok(result);
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete("DeleteById")]
        public IActionResult DeleteRiskData(int RiskId)
        {
            try
            {
                var result = _riskRepository.DeleteRiskData(RiskId);
                return Ok(result);
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete("Delete")]
        public IActionResult DeleteRiskData(RiskModelData model)
        {
            throw new NotImplementedException();
        }

        [HttpPut("Update")]
        public IActionResult UpdateRiskData([FromBody]RiskModelData model)
        {
            try
            {
                var result = _riskRepository.UpdateRiskData(model);
                return Ok(result);
            }
            catch(Exception e )
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete("DeleteRiskKri")]
        public IActionResult DeleteRiskKri([FromBody]RiskKRI kri)
        {
            try
            {
                var result = _riskRepository.DeleteRiskKri(kri);
                return Ok(result);
            }catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
