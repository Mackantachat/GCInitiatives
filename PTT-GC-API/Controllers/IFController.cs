using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Services.Interface;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IFController : ControllerBase
    {
        private readonly IFInterface _repositoryIF;
        private readonly ISAPMOCService _sapMOCService;

        public IFController(IFInterface repositoryIF, ISAPMOCService sapMOCService)
        {
            _repositoryIF = repositoryIF;
            _sapMOCService = sapMOCService;
        }

        [HttpPost("InsertIncomingFileData")]
        public async Task<IActionResult> InsertIncomingFileData()
        {

            return Ok(await _repositoryIF.InsertIncomingFileData());
        }

        [HttpPost("SendAppRequest/{id}")]
        public async Task<IActionResult> SendAppRequest(int id)
        {

            return Ok(await _repositoryIF.SendAppRequest(id, DateTime.Now, null));
        }

        [HttpPost("SendWbsRequest/{id}")]
        public async Task<IActionResult> SendWbsRequest(int id)
        {

            return Ok(await _repositoryIF.SendWBSRequest(id, DateTime.Now, null));
        }


        [HttpGet("ValidateWBSCheck/{id}")]
        public async Task<IActionResult> ValidateWbsRequest(int id)
        {
            return Ok(await _repositoryIF.ValidateWBSRequest(id));
        }


        [HttpPost("ActualPOCPercentUpdate/{id}")]
        public async Task<IActionResult> ActualPOCPercentUpdate(int id)
        {
            return Ok(await _repositoryIF.ActulaPOCPercentUpdateToSAP(id, DateTime.Now));
        }

        [HttpPost("ProjectManagerUpdateToSAP/{id}")]
        public async Task<IActionResult> ProjectManagerUpdateToSAP(int id)
        {
            return Ok(await _repositoryIF.ProjectManagerUpdateToSAP(id));
        }

        [HttpPost("ProgressOfCompletionFromSAP/{id}")]
        public async Task<IActionResult> ProgressOfCompletionFromSAP(int id)
        {
            return Ok(await _repositoryIF.ProgressOfCompletionFromSAP(id));
        }

        [HttpPost("SendAppRequestList")]
        public async Task<IActionResult> SendAppRequest([FromQuery] string requestType)
        {
            if(requestType?.ToLower() == "app")
            {
                return Ok(await _repositoryIF.SendAppRequestList(DateTime.Now));
            }
            else if (requestType?.ToLower() == "wbs")
            {
                return Ok(await _repositoryIF.SendWBSRequestList(DateTime.Now));
            }

            return Ok("requestType not matched");
            //return Ok(await _repositoryIF.SendAppRequest(id, DateTime.Now, null));
        }

        [HttpGet("SAPStatus/{id}")]
        public IActionResult SAPStatus(int id)
        {
            return Ok(_sapMOCService.GetSAPStatus(id));
        }

        [HttpGet("MOCStatus/{id}")]
        public IActionResult MOCStatus(int id)
        {
            return Ok(_sapMOCService.GetMOCStatus(id));
        }

        [HttpGet("SAPMOCStatus/{id}")]
        public IActionResult SAPMOCStatus(int id)
        {
            return Ok(_sapMOCService.GetSapMocStatus(id));
        }

        [AllowAnonymous]
        [HttpGet("TestString")]
        public async Task<IActionResult> TestString()
        {
            return Ok(await _repositoryIF.ChangeInitiativeCodeLongString("2021-004567"));
            
        }
    }
}

