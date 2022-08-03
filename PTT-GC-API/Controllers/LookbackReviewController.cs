using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookbackReviewController : ControllerBase
    {

        private readonly LookbackReviewInterface _repository;
        private readonly IMapper _mapper;
        public LookbackReviewController(LookbackReviewInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;

        }
        [Route("GetLookbackReview")]
        [HttpGet]
        public async Task<IActionResult> GetLookbackReviewAll()
        {
            try
            {
                var data_LookbackReview = await _repository.GetLookbackReviewAll();

                return Ok(data_LookbackReview);
            }
            catch (Exception ex)
            {
                return Ok("ERROR" + ex.Message);
            }
        }
        [Route("CreateLookbackReview")]
        [HttpPost]
        public async Task<IActionResult> CreateLookbackReview(List<LookbackReview> LookbackReviewCreate)
        {
            try
            {
                for (int i = 0; i < LookbackReviewCreate.Count; i++)
                {
                    var ItemLookbackReviewCreate = LookbackReviewCreate[i];
                    var LookbackReview_Create = _mapper.Map<LookbackReview>(ItemLookbackReviewCreate);
                    _repository.Add(LookbackReview_Create);
                    await _repository.Save();
                }
                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

        [Route("DeleteLookbackReview")]
        [HttpGet]
        public async Task<IActionResult> DeleteLookbackReview(int id)
        {
            try
            {
                var Performance_Inactive_ID = await _repository.GetLookbackReviewByID(id);
                var Performance_Inactive = _mapper.Map<LookbackReview>(Performance_Inactive_ID);
                _repository.Delete(Performance_Inactive);
                await _repository.Save();

                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }
    }
}
