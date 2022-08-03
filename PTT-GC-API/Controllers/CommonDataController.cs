using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.CommonData;
using PTT_GC_API.Models.CommonData;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommonDataController : Controller
    {
        private readonly ICommonDataRepository _commonDataRepository;

        public CommonDataController(ICommonDataRepository commonDataRepository)
        {
            _commonDataRepository = commonDataRepository;
        }

        [HttpGet("GetTopics")]
        public IActionResult GetTopics()
        {
            try
            {
                return Ok(_commonDataRepository.GetTopic());
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }
        
        [HttpGet("GetCommonData/{dataType}/{criteria}/{pageNumber}/{orderByFieldName}/{sortDirection}")]
        public IActionResult GetCommonDataModel(string dataType, string criteria,int pageNumber, string orderByFieldName, string sortDirection)
        {
            try
            {
                var model = _commonDataRepository.GetCommonDataModel(dataType,criteria,5,pageNumber,orderByFieldName,sortDirection).GetAwaiter().GetResult();
                return Ok(model);
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet("GetCommonData/{dataType}/{pageNumber}/{orderByFieldName}/{sortDirection}")]
        public IActionResult GetCommonDataModel(string dataType,int pageNumber, string orderByFieldName, string sortDirection)
        {
            try
            {
                var model = _commonDataRepository.GetCommonDataModel(dataType, "", 5, pageNumber, orderByFieldName, sortDirection).GetAwaiter().GetResult();
                return Ok(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet("GetDataDetail/{dataType}/{keyword}/{pageNumber}/{orderByFieldName}/{sortDirection}")]
        public IActionResult GetDataDetail(string dataType,string keyword, int pageNumber, string orderByFieldName, string sortDirection)
        {
            try
            {
                var model = _commonDataRepository.GetDataDetail(dataType, keyword, 5, pageNumber, orderByFieldName, sortDirection).GetAwaiter().GetResult();
                return Ok(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet("GetDataDetail/{dataType}/{pageNumber}/{orderByFieldName}/{sortDirection}")]
        public IActionResult GetDataDetail(string dataType, int pageNumber, string orderByFieldName, string sortDirection)
        {
            try
            {
                var model = _commonDataRepository.GetDataDetail(dataType, "", 5, pageNumber, orderByFieldName, sortDirection).GetAwaiter().GetResult();
                return Ok(model);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("GetSTDDef")]
        public async Task<IActionResult> GetSTDDef(StdProjectDefParams projectDefParams)
        {
            try
            {
                var result = await  _commonDataRepository.GetStdProjectDef(projectDefParams);
                return Ok(result);
            }
            catch(Exception e)
            {
                return StatusCode(500,e);
            }
        }
        
        [HttpPost("GetResponsible")]
        public async Task<IActionResult> GetResponsible(StdProjectDefParams projectDefParams)
        {
            try
            {
                var result = await  _commonDataRepository.GetStdProjectDef(projectDefParams);
                return Ok(result);
            }
            catch(Exception e)
            {
                return StatusCode(500,e);
            }
        }

        [HttpPost("GetResponsibleEng")]
        public IActionResult GetResponsibleEng(ResponsibleModel projectEngineer)
        {
            try
            {
                return Ok(_commonDataRepository.GetResponsibleEng(projectEngineer.OwnerName));
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("GetResponsibleNoEng")]
        public async Task<IActionResult> GetResponsibleNoEng(NoEngResponsibleModel codeOfVP)
        {
            try
            {
                var result = await  _commonDataRepository.GetResponsibleNoEng(codeOfVP.CodeOfVP);
                return Ok(result);
            }
            catch(Exception e)
            {
                return StatusCode(500,e);
            }
        }
        
        [HttpPost("InsertCommonData")]
        public IActionResult InsertCommonData([FromBody]List<CommonDataSettingModel> commonDataModel)
        {
            try
            {
                var result = _commonDataRepository.InsertCommonData(commonDataModel);
                return Ok(result);
            }
            catch(Exception e)
            {
                return StatusCode(500,e);
            }
        }

        [HttpPut("UpdateCommonData")]
        public IActionResult UpdateCommonData([FromBody] List<CommonDataSettingModel> model)
        {
            try
            {
                var result = _commonDataRepository.UpdateCommonData(model);
                return Ok(result);
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete("DeleteCommonData/{dataType}")]
        public IActionResult DeleteCommonData(string dataType)
        {
            try
            {
                var result = _commonDataRepository.Delete(dataType);
                return Ok(result);
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("AddSingleCommonData")]
        public IActionResult AddSingleCommonData([FromBody]CommonData data)
        {
            var result = _commonDataRepository.AddSingleCommonData(data);
            return Ok(result);
        }

        [HttpDelete("DeleteItemInCommonData/{Id}")]
        public IActionResult DeleteItem(int Id)
        {
            var result = _commonDataRepository.DeleteSingleCommonDataById(Id);
            return Ok(result);
        }

        [HttpGet("GetSapDropdown/{type}/{initiativeid}/{areaplant}")]
        public IActionResult GetSapDropdown(string Type, int initiativeid, string areaplant)
        {
            var result = _commonDataRepository.GetSapDropdown(Type, initiativeid, areaplant);
            return Ok(result);
        }
        [HttpGet("GetBuStream")]
        public async Task<IActionResult> GetBuStream()
        {
            return Ok(await _commonDataRepository.GetBuStream());
        } 

        [HttpGet("GetKnowledgeThemesDropDown")]
        public IActionResult GetKnowledgeThemesDropDown()
        {
            var result = _commonDataRepository.GetKnowledgeThemesDropDown();
            return Ok(result);
        }
        [HttpGet("BusinessLine")]
        public IActionResult GetBusinessLineDropDown()
        {
            var result = _commonDataRepository.GetBusinessLineDropDown();
            return Ok(result);
        }
        [HttpGet("ProjectType")]
        public IActionResult GetProjectTypeDropDown()
        {
            var result = _commonDataRepository.GetProjectTypeDropDown();
            return Ok(result);
        }
        [HttpGet("OperationalFunction")]
        public IActionResult GetOperationalFunctionDropDown()
        {
            var result = _commonDataRepository.GetOperationalFunctionDropDown();
            return Ok(result);
        }
        [HttpGet("OperationalUnit")]
        public IActionResult GetOperationalUnitDropDown()
        {
            var result = _commonDataRepository.GetOperationalUnitDropDown();
            return Ok(result);
        }

        [HttpGet("EquipmentType")]
        public IActionResult GetEquipmentTypeDropDown()
        {
            var result = _commonDataRepository.GetEquipmentTypeDropDown();
            return Ok(result);
        }

        [HttpGet("ProductGroup")]
        public IActionResult GetProductGroupDropDown()
        {
            var result = _commonDataRepository.GetProductGroupDropDown();
            return Ok(result);
        }

        [HttpGet("AreaOfLearning")]
        public IActionResult GetAreaOfLearningDropDown()
        {
            var result = _commonDataRepository.GetAreaOfLearningDropDown();
            return Ok(result);
        }
        [HttpGet("OEMSElement")]
        public IActionResult GetOEMSElementDropDown()
        {
            var result = _commonDataRepository.GetOEMSElementDropDown();
            return Ok(result);
        }

        [HttpGet("GetCommonDataByType/{dataType}")]
        public async Task<IActionResult> GetCommonDataByType(string dataType)
        {
           
            return Ok(await _commonDataRepository.GetCommonDataByType(dataType));
        }

        [HttpGet("GetCurrencyFloatFx")]
        public async Task<IActionResult> GetCurrencyFloatFx()
        {
            return Ok(await _commonDataRepository.GetCurrencyFloatFx());
        }

        [HttpGet("GetCurrencyFxRate")]
        public async Task<IActionResult> GetCurrencyFxRate()
        {
            return Ok(await _commonDataRepository.GetCurrencyFxRate());
        }


    }
}
