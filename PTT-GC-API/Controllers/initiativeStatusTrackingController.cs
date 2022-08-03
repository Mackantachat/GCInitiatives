using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InitiativeStatusTrackingController : ControllerBase
    {
        private readonly InitiativeStatusTrackingInterface _repository;
        public InitiativeStatusTrackingController(InitiativeStatusTrackingInterface repository)
        {
            _repository = repository;
        }

        //[HttpPost("")]
        //public async Task<IActionResult> CreateStatusTracking(InitiativeStatusTracking initiativeStatusTracking)
        //{

        //    int iCounter = 1;
        //    int lastHistoryId = await _repository.LastHistoryId();
        //    string approveDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        //    initiativeStatusTracking.Sequence = iCounter;
        //    initiativeStatusTracking.HistoryId = lastHistoryId;
        //    initiativeStatusTracking.ApprovedDate = approveDate;
        //    _repository.AddInitiativeStatusTracking(initiativeStatusTracking);

        //    return Ok(await _repository.Save());
        //}

        [HttpPost("CreateStatusTrackings")]
        public async Task<IActionResult> CreateStatusTrackings(InitiativeStatusTracking[] initiativeStatusTrackings)
        {
            return null;
            //int iCounter = 1;
            //int lastHistoryId = await _repository.LastHistoryId();
            //string approveDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            //foreach(InitiativeStatusTracking initiativeStatusTracking in initiativeStatusTrackings)
            //{
            //    initiativeStatusTracking.Sequence = iCounter;
            //    initiativeStatusTracking.HistoryId = lastHistoryId;
            //    initiativeStatusTracking.ApprovedDate = approveDate;
            //    iCounter++;
            //}

            //return Ok(await _repository.CreateInitiativeStatusTrackings(initiativeStatusTrackings));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatusTrackingByInitiativeId(int id)
        {
            return Ok(await _repository.RemoveInitiativeStatusTrackingByInitiativeId(id));
        }


    }
}