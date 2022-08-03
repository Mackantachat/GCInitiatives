using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PTT_GC_API.Dtos.ResourceNeededFormsModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.ResourceNeeded;
using PTT_GC_API.Models.ResourceNeededFormsModel;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceNeededController : Controller
    {
        private readonly IResourceNeededRepository _resourceNeededRepository;
        public ResourceNeededController(IResourceNeededRepository resourceNeededRepository)
        {
            _resourceNeededRepository = resourceNeededRepository;
        }

        /// <summary>
        /// Catagorize and Insert data from resource needed forms into Database.
        /// It will catagorize data into 4 tables such as 
        /// - ResourceNeededs 
        /// - Manpowers 
        /// - Lands 
        /// - AirPollution 
        /// - Wastes
        /// </summary>
        /// <param name="modelData">ResourceFormsModelData from body of http request, you can view 
        ///                         example in /Dtos/ResourceNeeded/ResourceFormsModelData
        /// </param>
        /// <returns></returns>
        [HttpPost("InsertForms")]
        public IActionResult InsertFormsToDatabase([FromBody] ResourceFormsModelData modelData)
        {
            try
            {
                var result = _resourceNeededRepository.InsertResourceNeededData(modelData).GetAwaiter().GetResult();
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// Get ResourceFormsModelData by specified id.
        /// </summary>
        /// <param name="resourceNeededId">id of data in resource neededs table</param>
        /// <returns></returns>
        [HttpGet("{resourceNeededId}")]
        public IActionResult GetResourceNeededData(int resourceNeededId)
        {
            try
            {
                var result = _resourceNeededRepository.GetResourceModelData(resourceNeededId).GetAwaiter().GetResult();
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// Get latest ResourceFormsModelData inserted.
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetLastInsertResourceNeeded")]
        public IActionResult GetLastInsertNeededData()
        {
            try
            {
                var result = _resourceNeededRepository.GetLastInsertModelData().GetAwaiter().GetResult();
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// Update ResourceFormsModelData
        /// </summary>
        /// <param name="resourceModelData">ResourceFormsModelData from body of http request
        ///  which you can view example in /Dtos/ResourceNeeded/ResourceFormsModelData.
        /// </param>
        /// <param name="resourceId"></param>
        /// <returns></returns>
        [HttpPost("UpdateResource/{resourceId}")]
        public IActionResult UpdateResource(int resourceId, ResourceFormsModelData resourceModelData)
        {
            try
            {
                return Ok(_resourceNeededRepository.UpdateResource(resourceModelData, resourceId).GetAwaiter().GetResult());
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// Delete ResouceNeeded by Id.
        /// </summary>
        /// <param name="resourceNeededId">id of resource needed</param>
        /// <returns></returns>
        [HttpDelete("DeleteResourceById/{resourceNeededId}")]
        public IActionResult DeleteResourceById(int resourceNeededId)
        {
            try
            {
                return Ok(_resourceNeededRepository.DeleteResourceById(resourceNeededId));
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// Delete Resource by input ResourceFormsModelData.
        /// </summary>
        /// <param name="modelData">ResourceFormsModelData from body of http request</param>
        /// <returns></returns>
        [HttpDelete("DeleteResourceByModelData")]
        public IActionResult DeleteResourceByModelData([FromBody] ResourceFormsModelData modelData)
        {
            try
            {
                return Ok(_resourceNeededRepository.DeleteResource(modelData));
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
