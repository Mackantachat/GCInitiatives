using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.SettingChart;
using PTT_GC_API.Models.SettingChart;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomReportHeaderController : ControllerBase
    {
        private readonly CustomReportHeaderInterface _repository;
        private readonly IMapper _mapper;

        public CustomReportHeaderController(CustomReportHeaderInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReportHeader([FromQuery]int currentPage, [FromQuery]int itemPerPage, [FromQuery] string searchText, [FromQuery] string username)
        {
            var allReportData = await _repository.GetAllReportHeader(currentPage, itemPerPage, searchText, new string[] { }, username);
            return Ok(allReportData);

            //var initiativesData = await _repository.GetInitiatives(InitiativeParams);
            //var initiatives = _mapper.Map<IEnumerable<InitiativeList>>(initiativesData);
            //Response.AddPagination(initiativesData.CurrentPage, initiativesData.PageSize, initiativesData.TotalCount, initiativesData.TotalPages);
            //return Ok(initiatives);
        }

        [HttpGet("Builtin")]
        public async Task<IActionResult> GetAllReportHeaderBuiltin([FromQuery]int currentPage, [FromQuery]int itemPerPage, [FromQuery] string searchText, [FromQuery] string username)
        {
            var allReportData = await _repository.GetAllReportHeader(currentPage, itemPerPage, searchText, new string[] { "builtin" }, username);
            return Ok(allReportData);

            //var initiativesData = await _repository.GetInitiatives(InitiativeParams);
            //var initiatives = _mapper.Map<IEnumerable<InitiativeList>>(initiativesData);
            //Response.AddPagination(initiativesData.CurrentPage, initiativesData.PageSize, initiativesData.TotalCount, initiativesData.TotalPages);
            //return Ok(initiatives);
        }

        //GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomReport(int id)
        {
            return Ok(await _repository.GetCustomReport(id));
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> CreateReportTemplate(CustomReportMerge customReportMerge)
        {
            return Ok(await _repository.CreateCustomReport(customReportMerge));
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReportTemplate(CustomReportMerge customReportMerge)
        {
            return Ok(await _repository.UpdateCustomReport(customReportMerge));
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReportTemplate(int id)
        {
            return Ok(await _repository.DeleteCustomReport(id));
        }

        [HttpGet("GetReportType")]
        public async Task<IActionResult> GetReportType()
        {
            return Ok(await _repository.GetReportType());
        }

        [HttpGet("GetStageType")]
        public async Task<IActionResult> GetStageType()
        {
            return Ok(await _repository.GetStageType());
        }


        [HttpGet("V_Graph_DDL_X_Axis")]
        public async Task<IActionResult> GetXAxis([FromQuery] string stageType)
        {
            return Ok(await _repository.GetXAxis(stageType));
        }

        [HttpGet("V_Graph_DDL_Y_Axis")]
        public async Task<IActionResult> GetYAxis([FromQuery] string stageType)
        {
            return Ok(await _repository.GetYAxis(stageType));
        }

        [HttpGet("V_CustomExcel1_Y")]
        public async Task<IActionResult> GetCustomExcelYAxis([FromQuery] string reportType)
        {
            return Ok(await _repository.GetCustomExcelYAxis(reportType));
        }

        [HttpGet("GetAllParam")]
        public async Task<IActionResult> GetAllParam([FromQuery] string reportType)
        {
            return Ok(await _repository.GetAllParam(reportType));
        }

        [HttpPost("DuplicateReport/{reportId}")]
        public async Task<IActionResult> DuplicateReport(int reportId, DuplicateReport duplicateReport)
        {
            return Ok(await _repository.DuplicateReportById(reportId, duplicateReport));
        }

        [HttpGet("GetDropdownData")]
        public async Task<IActionResult> GetDropdownData([FromQuery]ParamDropdown paramDropdown)
        {
            return Ok(await _repository.GetItemDropdowns(paramDropdown));
        }
    }
}
