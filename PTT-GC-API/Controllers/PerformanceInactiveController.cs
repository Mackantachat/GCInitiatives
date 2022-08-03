using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.PerformanceInactive;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.PerformanceInactive;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerformanceInactiveController : ControllerBase
    {
        private readonly PerformanceInactiveInterface _repository;
        private readonly IMapper _mapper;
        public PerformanceInactiveController(PerformanceInactiveInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;

        }

        [HttpGet]
        public async Task<IActionResult> GetPerformanceInactive([FromQuery] PerformanceInactiveParams PerformanceInactiveParams)
        {

            var PerformanceInactiveData = await _repository.GetPerformanceInactive(PerformanceInactiveParams);
            var performanceInactive = _mapper.Map<IEnumerable<PerformanceInactive>>(PerformanceInactiveData);
            Response.AddPagination(PerformanceInactiveData.CurrentPage, PerformanceInactiveData.PageSize, PerformanceInactiveData.TotalCount, PerformanceInactiveData.TotalPages);
            return Ok(performanceInactive);
        }

        [Route("SearchPeriod")]
        [HttpGet]
        public async Task<IActionResult> GetPerformanceInactiveByPeriod(DateTime period)
        {
            try
            {
                var Performance_Inactive_Search = await _repository.GetPerformanceInactiveSearch(period);
                //List<PerformanceInactive> ListPerformanceInactives = new List<PerformanceInactive>();
                //for (int i = 0; i < Performance_Inactive_Search.Count; i++)
                //{
                //    var Performance_Inactive = _mapper.Map<PerformanceInactive>(Performance_Inactive_Search[i]);
                //    ListPerformanceInactives.Add(Performance_Inactive);
                //}
                return Ok(Performance_Inactive_Search);
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }
        [Route("GetDataAll")]
        [HttpGet]
        public async Task<IActionResult> GetPerformanceInactiveAll()
        {
            try
            {
                var Performance_Inactive_All = await _repository.GetPerformanceInactiveAll();
                return Ok(Performance_Inactive_All);
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }
        [Route("UpdatePerformanceInactive")]
        [HttpPost]
        public async Task<IActionResult> UpdatePerformanceInactive(PerformanceInactiveGeneral performanceInactiveCreate)
        {
            try
            {
                var id = performanceInactiveCreate.PerformanceInactiveId;
                var DataPerformanceInactive = await _repository.GetPerformanceInactive(id);
                DataPerformanceInactive.InitiativeCode = performanceInactiveCreate.InitiativeCode;
                DataPerformanceInactive.POC = performanceInactiveCreate.POC;
                DataPerformanceInactive.OutstandingItems = performanceInactiveCreate.OutstandingItems;
                DataPerformanceInactive.HighlightWork = performanceInactiveCreate.HighlightWork;
                DataPerformanceInactive.CLSD = performanceInactiveCreate.CLSD;
                DataPerformanceInactive.BenefitTracking = performanceInactiveCreate.BenefitTracking;
                DataPerformanceInactive.FromDate = performanceInactiveCreate.FromDate;
                DataPerformanceInactive.ToDate = performanceInactiveCreate.ToDate;
                _repository.Update(DataPerformanceInactive);
                await _repository.Save();

                var returnValue = await _repository.GetPerformanceInactiveAll();

                return Ok(returnValue);
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

        [Route("CreatePerformanceInactive")]
        [HttpPost]
        public async Task<IActionResult> CreatePerformanceInactive(List<PerformanceInactive> PerformanceInactiveCreate)
        {
            try
            {
                for (int i = 0; i < PerformanceInactiveCreate.Count; i++)
                {
                    var ItemPerformanceInactiveCreate = PerformanceInactiveCreate[i];
                    var Performance_Inactive = _mapper.Map<PerformanceInactive>(ItemPerformanceInactiveCreate);
                    _repository.Add(Performance_Inactive);
                    await _repository.Save();
                }
                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

        // GET api/PerformanceInactiveController/id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerformanceInactive(DateTime id)
        {
            try
            {
                var Performance_Inactive_ID = await _repository.GetPerformanceInactiveSearch(id);
                return Ok(Performance_Inactive_ID);
            }
            catch (Exception ex)
            {
                return Ok("ERROR");

            }
        }

        [Route("GetDataById")]
        [HttpGet]
        public async Task<IActionResult> GetPerformanceInactiveById(int id)
        {
            try
            {
                var Performance_Inactive_ID = await _repository.GetPerformanceInactive(id);
                var Performance_Inactive = _mapper.Map<PerformanceInactive>(Performance_Inactive_ID);
                return Ok(Performance_Inactive_ID);
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

        [Route("DeletePerformanceInactive")]
        [HttpGet]
        public async Task<IActionResult> DeletePerformanceInactive(int id)
        {
            try
            {
                var Performance_Inactive_ID = await _repository.GetPerformanceInactive(id);
                var Performance_Inactive = _mapper.Map<PerformanceInactive>(Performance_Inactive_ID);
                _repository.Delete(Performance_Inactive);
                await _repository.Save();

                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

        [Route("GetInitiativeCode")]
        [HttpGet]
        public async Task<IActionResult> GetInitiativeCode()
        {
            try
            {
                var Performance_Inactive_ID = await _repository.GetInitiativeCode();
                return Ok(Performance_Inactive_ID);
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

        [Route("SearchInitiativeCode")]
        [HttpGet]
        public async Task<IActionResult> SearchInitiativeCode(string text)
        {
            try
            {
                var Performance_Inactive_ID = await _repository.SearchInitiativeCode(text);
                return Ok(Performance_Inactive_ID);
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

    }
   
}
