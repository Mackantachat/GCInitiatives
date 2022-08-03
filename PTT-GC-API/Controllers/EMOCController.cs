using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.EMOCs;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EMOCController : ControllerBase
    {
        private readonly EmocInterface _repository;
        private readonly PDDInterface _repositoryPDD;
        private readonly IFInterface _repositoryIF;

        public EMOCController(EmocInterface repository, PDDInterface repositoryPDD, IFInterface repositoryIF)
        {
            _repository = repository;
            _repositoryPDD = repositoryPDD;
            _repositoryIF = repositoryIF;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreateEmoc(int id)
        {
            CreateMoCResult createMoCResult = await _repository.CreateEmoc(id);
            return Ok(createMoCResult);
        }

        [HttpPost("MainPlant/{id}")]
        public async Task<IActionResult> CreateMainPlant(int id, [FromBody] List<MainPlant> data)
        {
            var result = await _repository.CreateMainPlant(id, data);
            return Ok(result);
        }
        
        [HttpPost("CreateEmoc/{id}")]
        public async Task<IActionResult> CreateEmoc(int id, [FromBody] List<MainPlant> data)
        {
            var result = await _repository.CreateEmoc(id, data);
            return Ok(result);
        }

        [HttpGet("MainPlant/{id}")]
        public async Task<IActionResult> GetMainPlant(int id)
        {
            var result = await _repository.GetMainPlant(id);
            return Ok(result);
        }
        
        [HttpDelete("DeleteMainPlant/{id}")]
        public async Task<IActionResult> DeleteMainPlant(int id)
        {
            var result = await _repository.DeleteMainPlant(id);
            return Ok(result);
        }


        [HttpPost("PDD/{id}")]
        public async Task<IActionResult> CreatePDD(int id)
        {
            await _repositoryPDD.CreateFolderPDD(id);
            return Ok();
        }

        [HttpPost("SendRequestWithXML")]
        public async Task<IActionResult> SendRequestWithXML(int id)
        {
            return Ok(await _repositoryIF.SendRequestWithXML("4f8ff1fc-0258-4a76-b194-179eda6cd01f", "https://apiportal-dev.pttgcgroup.com:8082/GCInit/ProgressOfCompletion", "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns=\"http://tempuri.org/\">   <soapenv:Header/>   <soapenv:Body>  <FROM_PERIOD>1</FROM_PERIOD>  <FROM_YEAR>2020</FROM_YEAR>  <PROGRESS_VERSION>CP02</PROGRESS_VERSION>  <PROJECTDEFINITION>CP_XXX</PROJECTDEFINITION>  <TO_PERIOD>1</TO_PERIOD>  <TO_YEAR>2020</TO_YEAR></soapenv:Body></soapenv:Envelope>"));
        }
    }
}