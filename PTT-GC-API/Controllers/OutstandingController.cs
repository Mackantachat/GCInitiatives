using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Dtos.Outstanding;
using PTT_GC_API.Services.Outstanding;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OutstandingController : ControllerBase
    {
        private readonly IOutstandingService _outstandingService;
        public OutstandingController(IOutstandingService service)
        {
            _outstandingService = service;
        }



        // GET: api/<OutstandingController>
        [HttpGet("GetOutstanding/{id}/{year}/{month}")]
        public IActionResult GetOutstandingForm(int id,int year,int month)
        {
            var result = _outstandingService.GetOutstandingForm(id,year,month);
            return Ok(result);
        }
        
        [HttpGet("GetAllOutstanding/{id}")]
        public IActionResult GetAllOutstanding(int id)
        {
            var result = _outstandingService.GetAllOutstanding(id);
            return Ok(result);
        }

        [HttpGet("GetOutstandingFormByYear/{id}/{year}")]
        public IActionResult GetOutstandingFormByYear(int id, int year)
        {
            var result = _outstandingService.GetOutstandingFormByYear(id, year);
            return Ok(result);
        }

        [HttpPost("InsertOutstanding")]
        public IActionResult InsertOutstandingForm([FromBody] OutstandingForm model)
        {
            //model.Month = GetNumberOfMonth(model.Month).ToString();
            var result = _outstandingService.InsertOutstandingModel(model);
            return Ok(result);
        }
        
        [HttpPost("InsertOutstandingDataModel")]
        public IActionResult InsertOutstandingDataModel([FromBody] OutstandingForm[] model)
        {
            //model.Month = GetNumberOfMonth(model.Month).ToString();
            var result = _outstandingService.InsertOutstandingDataModel(model);
            return Ok(result);
        }

        public int? GetNumberOfMonth(string month)
        {
            int number = 0;
            switch (month)
            {
                case "January":
                    number = 1;
                    break;
                case "February":
                    number = 2;
                    break;
                case "March":
                    number = 3;
                    break;
                case "April":
                    number = 4;
                    break;
                case "May":
                    number = 5;
                    break;
                case "June":
                    number = 6;
                    break;
                case "July":
                    number = 7;
                    break;
                case "August":
                    number = 8;
                    break;
                case "September":
                    number = 9;
                    break;
                case "October":
                    number = 10;
                    break;
                case "November":
                    number = 11;
                    break;
                case "December":
                    number = 12;
                    break;
                default:
                    number = 0;
                    break;
            }
            return number;
        }

        [HttpPut("UpdateOutstanding")]
        public IActionResult UpdateOutstandingModel([FromBody] OutstandingForm model)
        {
            var result = _outstandingService.UpdateOutstandingModel(model);
            return Ok(result);
        }

        // DELETE api/<OutstandingController>/5
        [HttpDelete("DeleteByInitiativeId/{initiativeId}")]
        public IActionResult DeleteByInitiativeId(int initiativeId)
        {
            var result = _outstandingService.DeleteOutstandingByInitiativeId(initiativeId);
            return Ok(result);
        }

        [HttpDelete("DeleteById/{id}")]
        public IActionResult DeleteById(int id)
        {
            var result = _outstandingService.DeleteOutstandingDataById(id);
            return Ok(result);
        }
    }
}
