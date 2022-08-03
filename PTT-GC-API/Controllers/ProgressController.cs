using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ProgressAndMilestone;
using PTT_GC_API.Models.Outstanding;
using PTT_GC_API.Models.ProgressAndMilestone;


namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        private readonly ProgressInterface _repository;
        public ProgressController(ProgressInterface repository)
        {
            _repository = repository;
        }

        [HttpPost("CreateProgressDetail/{id}")]
        public async Task<IActionResult> CreateProgressDetail(int id, CreateProgressDetail CreateProgressDetail)
        {
            await _repository.CreateProgressDetail(id, CreateProgressDetail);
            return StatusCode(201);
        }

        [HttpPost("CreateProgress/{id}")]
        public async Task<IActionResult> CreateProgress(int id, [FromBody] ProgressModel CreateProgressHeader)
        {
            var progress = await _repository.CreateProgress(id, CreateProgressHeader);
            return Ok(progress);
        }
        
        [HttpPost("CreatePlanCost/{id}")]
        public async Task<IActionResult> CreatePlanCost(int id,InvestmentCost[] investmentCost)
        {
            var planCost = await _repository.CreatePlanCost(id, investmentCost);
            return Ok(planCost);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProgress(int id)
        {
            var progress = await _repository.GetProgress(id);
            return Ok(progress);
        }

        //------------- Progress Plan ------------------------------
        [HttpPost("CreateProgressPlanDate")]
        public async Task<IActionResult> CreateProgressPlanDate(List<ProgressPlanDate> ProgressPlanDateCreate)
        {
            //var x = await _repository.GetProgressPlanDateByIdThenDelete(ProgressPlanDateCreate);
            //var ProgressPlanDate_Create = await _repository.CreateProgressPlanDate(ProgressPlanDateCreate);
            var x = await _repository.GetProgressPlanDateByIdThenDelete(ProgressPlanDateCreate[0]);
            for (int ix = 0; ix < ProgressPlanDateCreate.Count; ix++)
            {
                var pro = await _repository.CreateProgressPlanDate(ProgressPlanDateCreate[ix]);
            }
            return Ok(ProgressPlanDateCreate);
        }
        [HttpGet("GetProgressPlanDate/{id}")]
        public async Task<IActionResult> GetProgressPlanDate(int id)
        {
            var progress = await _repository.GetProgressPlanDate(id);
            return Ok(progress);
        }

        [HttpPost("CreateProgressPlan")]
        public async Task<IActionResult> CreateProgressPlan(List<ProgressPlan> progressPlan)
        {
            if (progressPlan.Count > 0)
            {
                var x = await _repository.GetProgressPlanByIdThenDelete(progressPlan[0]);
                for (int ix = 0; ix < progressPlan.Count; ix++)
                {
                    var pro = await _repository.CreateProgressPlan(progressPlan[ix]);
                }
            }
            return Ok(progressPlan);
        }

        [HttpGet("GetProgressPlan/{id}")]
        public async Task<List<ProgressPlan>> GetProgressPlan(int id)
        {
            return await _repository.GetProgressPlan(id);
        }

        [HttpPost("CreateOutStanding")]
        public async Task<IActionResult> CreateOutStanding(OutstandingModel outs)
        {
            var resulte = await _repository.CreateOutStanding(outs);
            return Ok(resulte);
        }

        [HttpPost("CreateOutOutstandingData")]
        public async Task<IActionResult> CreateOutOutstandingData([FromBody] OutstandingData  outs)
        {
            //for (int ix = 0; ix < outs.Count; ix++)
            //{
            //    var resulte = await _repository.CreateOutOutstandingData(outs[ix]);
            //}
            //return Ok(outs);
            return null;
        }

        [HttpPost("CreateBscNarrative")]
        public async Task<IActionResult> CreateBscNarrative(BscNarrative bscNarrative)
        {
            var resulte = await _repository.CreateBscNarrative(bscNarrative);
            return Ok(resulte);
        }
        
        [HttpPost("CreateAllBscNarrative")]
        public async Task<IActionResult> CreateAllBscNarrative(BscNarrative[] bscNarrative)
        {
            var resulte = await _repository.CreateAllBscNarrative(bscNarrative);
            return Ok(resulte);
        }
        
        [HttpPost("CreateAllCostSpending/{id}")]
        public async Task<IActionResult> CreateAllCostSpending(int id,InvestmentCost[] investmentCost)
        {
            var resulte = await _repository.CreateAllCostSpending(id, investmentCost);
            return Ok(resulte);
        }

        [HttpGet("GetBscNarrative/{id}/{year}/{month}")]
        public async Task<BscNarrative> GetBscNarrative(int id,int year,int month)
        {
            return await _repository.GetBscNarrative(id,year,month);
        }
        
        [HttpGet("GetBscNarrativeAll/{id}")]
        public async Task<List<BscNarrative>> GetBscNarrativeAll(int id)
        {
            return await _repository.GetBscNarrativeAll(id);
        }

        [HttpGet("GetCostSpendingMonth/{id}/{year}/{type}")]
        public async Task<decimal[]> GetCostSpendingMonth(int id,int year,string type)
        {
            return await _repository.GetCostSpendingMonthAsync(id, year, type);
        }

        [HttpGet("GetCostSpendingYear/{id}/{type}")]
        public async Task<object> GetCostSpendingYear(int id, string type)
        {
            return await _repository.GetCostSpendingYearAsync(id, type);
        }
        
        [HttpGet("GetAllCostSpending/{id}")]
        public async Task<List<InvestmentCost>> GetAllCostSpending(int id)
        {
            return await _repository.GetAllCostSpending(id);
        }

        [HttpGet("GetProgressHeader/{id}")]
        public async Task<IActionResult> GetProgressHeader(int id)
        {
            var progress = await _repository.GetProgressHeader(id);
            return Ok(progress);
        }

        [HttpPost("CreateProgressHeader/{id}")]
        public async Task<IActionResult> CreateProgressHeader(int id)
        {
            var progress = await _repository.CreateProgressHeader(id);
            return Ok(progress);
        }

        [HttpGet("GetProgressPlanComplete/{id}")]
        public async Task<IActionResult> GetProgressPlanComplete(int id)
        {
            var progress = await _repository.GetProgressPlanComplete(id);
            return Ok(progress);
        }

    }

}