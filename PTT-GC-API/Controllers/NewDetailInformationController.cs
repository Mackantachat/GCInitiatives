using DocumentFormat.OpenXml.Office2010.ExcelAc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NewDetailInformationController : Controller
    {
        private readonly IDetailInformationRepository _DetailInformationRepository;
        public NewDetailInformationController(IDetailInformationRepository detailInfoRepository)
        {
            _DetailInformationRepository = detailInfoRepository;
        }
        [HttpGet("GetDetailInformation/{initiativeId}/{detailType}")]
        public async Task<IActionResult> GetDetailInformation(int initiativeId,string detailType)
        {
            //var detail = new NewDetailInformation
            //{
            //    IL3Date = System.DateTime.Now,
            //    IL4Date = System.DateTime.Now,
            //    IL5Date = System.DateTime.Now,
            //    BOD1 = System.DateTime.Now,
            //    BOD2 = System.DateTime.Now,
            //    RequireBOD1 = true,
            //    RequireProject = true,
            //    InitiativeId = 1,
            //    InitiativeCode = "xxxx",
            //    StrategicObjective = "eiei",
            //    Strategy = "eiei",
            //    EntryMode = "eiei",
            //    EntryModeSpecify = "eiei",
            //    Geography = "eiei",
            //    GeographySpecify = "eiei",
            //    ProjectDirector = "eiei",
            //    ProjectDmManager = "eiei",
            //    ProjectEngineer = "eiei",
            //    ProcessEngineer = "eiei",
            //    MgrOfProcessEngineer = "eiei",
            //    Irr = 100,
            //    Npv = 30,
            //    FX = "FX",
            //    FirstBudgetYear = "budget",
            //    StatusProgress = "progress",
            //    ProgressUpdate = "eieioo",
            //    ProductionProcess = "eeiei",
            //    ListOfEquipment = "List",
            //    Comparison = "eiei",
            //    OtherInvestment = "invest"
            //};

            //var financialInd = new List<FinancialIndicator>();
            //financialInd.Add(new FinancialIndicator());
            //var milestone = new List<Milestone>();
            //milestone.Add(new Milestone());
            //var product = new List<Product>();
            //product.Add(new Product());

            //var model = new NewDetailInformationModel
            //{
            //    DetailInformation = detail,
            //    Financial = new Financial(),
            //    FinancialIndicators = financialInd,
            //    Milestone = milestone,
            //    Product = product
            //};
            //return Ok(model);
            try
            {
                return Ok(await _DetailInformationRepository.GetDetailInformation(initiativeId, detailType));
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// Insert Detail Information to Database
        /// </summary>
        /// <param name="detailInformation">Model of DetailInformation tab</param>
        /// <returns></returns>
        [HttpPost("InsertDetailInformation/{initiativeId}")]
        public IActionResult InserDetailInformation([FromBody]NewDetailInformationModel detailInformation,int initiativeId)
        {
            try
            {
                var result = _DetailInformationRepository.InsertDetailInformation(detailInformation,initiativeId).GetAwaiter().GetResult();
                return Ok(result);
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPut("UpdateDetailInformation")]
        public IActionResult UpdateDetailInformation([FromBody]NewDetailInformationModel detailInformationModel)
        {
            try
            {
                return Ok(_DetailInformationRepository.UpdateDetailInformation(detailInformationModel).GetAwaiter().GetResult());
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete("DeleteDetailInformation/{initiativeId}")]
        public IActionResult DeleteDetailInformation(int initiativeId)
        {
            try
            {
                return Ok(_DetailInformationRepository.DeleteDetailInformation(initiativeId).GetAwaiter().GetResult());
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpDelete("DeleteDetailInformation")]
        public IActionResult DeleteDetailInformation([FromBody]NewDetailInformationModel detailInformation)
        {
            try
            {
                return Ok(_DetailInformationRepository.DeleteDetailInformation(detailInformation).GetAwaiter().GetResult());
            }
            catch(Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
