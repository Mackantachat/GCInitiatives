using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Capexs;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.CapexInformation;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CapexsInformationsController : ControllerBase
    {
        private readonly CapexsInformationsInterface _CapexsInformation;
        private readonly InitiativeInterface _repository;
        private readonly IMapper _mapper;
        private string[] capexStatusParallelFlow = { "revise", "return", "addmore" };
        public CapexsInformationsController(InitiativeInterface repository, CapexsInformationsInterface CapexsInformation, IMapper mapper)
        {
            _CapexsInformation = CapexsInformation;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost("{id}/{idpool}/{AvailableBudgetPool}/{CapexStatus}")]
        public async Task<IActionResult> CreateCapexsInformations(int id, CapexsInformations DetailCapexs, int idpool, decimal AvailableBudgetPool, string CapexStatus)
        {
            DetailCapexs.InitiativeId = id;

            var CapexInfor = _mapper.Map<CapexInformations>(DetailCapexs);
            var nowDatetime = DateTime.Now;
            CapexInfor.CreateDate = nowDatetime;

            _CapexsInformation.Add(CapexInfor);
            await _CapexsInformation.Save();

            if (await _repository.IsNewApprovalSystemx() == true)
            {
                if (capexStatusParallelFlow.Contains(CapexStatus))
                {
                    var initiativeData = await _repository.GetInitiative(id);
                    initiativeData.UpdatedDate = nowDatetime;
                    initiativeData.IsRequestCapex = true;

                    if (initiativeData.CapexTabStatus == 2) //if disabled tab capex then enable it on create record parallel flow
                    {
                        initiativeData.CapexTabStatus = 1;
                    }

                    await _repository.Save();
                }
                else
                {
                    var initiativeData = await _repository.GetInitiative(id);
                    initiativeData.CapexTabStatus = 1;
                    await _repository.Save();
                }
            }
            else
            {
                if (CapexStatus == "addmore")
                {
                    UpdateDraft intitaive = new UpdateDraft
                    {
                        Stage = null,
                        Status = "add more"
                    };
                    var initiativeData = await _repository.GetInitiative(id);
                    _mapper.Map(intitaive, initiativeData);
                    initiativeData.UpdatedDate = nowDatetime;
                    initiativeData.Stage = null;
                    initiativeData.Status = "add more";
                    await _repository.Save();
                    var initiative = _mapper.Map<InitiativeGeneral>(initiativeData);
                }
            }




            if (DetailCapexs.CapexType == "AddmoreCapex" && DetailCapexs.CapexStatus == "Draft")
            {
                UpdateDraft intitaive = new UpdateDraft
                {
                    Stage = null,
                    Status = "add more"
                };
                var initiativeData = await _repository.GetInitiative(id);
                _mapper.Map(intitaive, initiativeData);
                initiativeData.UpdatedDate = nowDatetime;
                initiativeData.Stage = null;
                initiativeData.Status = "add more";
                await _repository.Save();
                var initiative = _mapper.Map<InitiativeGeneral>(initiativeData);
            }
            else if (DetailCapexs.CapexType == "Addmorepool" && DetailCapexs.CapexStatus == "Draft")
            {
                UpdateDraft intitaive = new UpdateDraft
                {
                    Stage = null,
                    Status = "add more pool"
                };
                var initiativeData = await _repository.GetInitiative(id);
                _mapper.Map(intitaive, initiativeData);
                initiativeData.UpdatedDate = nowDatetime;
                initiativeData.Stage = null;
                initiativeData.Status = "add more pool";
                await _repository.Save();
                var initiative = _mapper.Map<InitiativeGeneral>(initiativeData);
            }

            //Use pool or add more.
            if (idpool != 0)
            {
                UpdateCostPool capex = new UpdateCostPool
                {
                    AvailableBudget = AvailableBudgetPool
                };
                var Capexdata = await _CapexsInformation.GetCapexsInformations(idpool, "Requestpool");
                _mapper.Map(capex, Capexdata);


                if (DetailCapexs.CapexType == "AddmoreCapex")
                {
                    Capexdata.AvailableBudget = Capexdata.AvailableBudget - DetailCapexs.AdditionalCost;

                    if (Capexdata.SpendingActual != null)
                    {
                        Capexdata.SpendingActual = Capexdata.SpendingActual + DetailCapexs.AdditionalCost;
                    }
                    else
                    {
                        Capexdata.SpendingActual = DetailCapexs.AdditionalCost;
                    }
                    //DetailCapexs.SpendingActual = DetailCapexs.AdditionalCost;
                }
                else
                {
                    Capexdata.AvailableBudget = AvailableBudgetPool - DetailCapexs.ProjectCost;
                    if (Capexdata.SpendingActual != null)
                    {
                        Capexdata.SpendingActual = Capexdata.SpendingActual + DetailCapexs.ProjectCost;
                    }
                    else
                    {
                        Capexdata.SpendingActual = DetailCapexs.ProjectCost;
                    }
                    //DetailCapexs.SpendingActual = DetailCapexs.ProjectCost;
                }
                await _CapexsInformation.Save();
                var initiative = _mapper.Map<CapexInformations>(Capexdata);
            }

            return Ok(CapexInfor);
        }

        [HttpGet("{id}/{CapexType}")]
        public async Task<IActionResult> GetCapexsInformations(int id, string CapexType)
        {
            var List = await _CapexsInformation.GetCapexsInformations(id, CapexType);
            var CapexsInformation = _mapper.Map<CapexInformations>(List);
            return Ok(CapexsInformation);
        }

        [HttpGet("GetCapexInformationList/{id}")]
        public async Task<IActionResult> GetCapexInformationList(int id)
        {
            var capexInformationList = _CapexsInformation.GetCapexsInformationList(id);
            return Ok(capexInformationList.Result);
        }

        [HttpGet("GetCapexsInformations_one/{id}")]
        public async Task<IActionResult> GetCapexsInformations_one(int id)
        {
            var List = await _CapexsInformation.GetCapexsInformations_one(id);
            var CapexsInformation = _mapper.Map<CapexInformations>(List);
            return Ok(CapexsInformation);
        }

        [HttpGet("GetCapexsInformationsByCapexInformationId/{id}")]
        public async Task<IActionResult> GetCapexsInformationsByCapexInformationId(int id)
        {
            var List = await _CapexsInformation.GetCapexsInformationsByCapexInformationId(id);
            var CapexsInformation = _mapper.Map<CapexInformations>(List);
            return Ok(CapexsInformation);
        }



        [HttpPost("CreateAnnualInvestmentPlan/{id}/{capexid}")]
        public async Task<IActionResult> CreateAnnualInvestmentPlan(int id, int capexid, CreateAnnualInvestmentPlanDtos annualInvestmentPlan)
        {
            return Ok(await _CapexsInformation.CreateAnnualInvestmentPlan(id, capexid, annualInvestmentPlan));
        }

        [HttpGet("GetAnnualInvestmentPlan/{id}/{capexid}")]
        public async Task<IActionResult> GetAnnualInvestmentPlan(int id, int capexid)
        {
            return Ok(await _CapexsInformation.GetAnnualInvestmentPlan(id, capexid));
        }

        [HttpPost("CreateMonthlyInvestmentPlan/{id}/{capexid}")]
        public async Task<IActionResult> CreateMonthlyInvestmentPlan(int id, int capexid, CreateMonthlyInvestmentPlanDtos monthlyInvestmentPlan)
        {
            return Ok(await _CapexsInformation.CreateMonthlyInvestmentPlan(id, capexid, monthlyInvestmentPlan));
        }


        [HttpGet("GetMonthlyInvestmentPlan/{id}/{capexid}/{year}")]
        public async Task<IActionResult> GetMonthlyInvestmentPlan(int id, int capexid, string year)
        {
            return Ok(await _CapexsInformation.GetMonthlyInvestmentPlan(id, capexid, year));
        }

        [HttpGet("GetTotalByRevisionAll/{id}")]
        public async Task<IActionResult> GetTotalByRevisionAll(int id)
        {
            return Ok(await _CapexsInformation.GetTotalByRevisionAll(id));
        }

        [HttpGet("GetCapexsInformationBySubmit/{id}")]
        public async Task<IActionResult> GetCapexsInformationBySubmit(int id)
        {
            return Ok(await _CapexsInformation.GetCapexsInformationBySubmit(id));
        }

        [HttpPut("{id}/{capexid}/{idpool}/{AvailableBudgetPool}/{manager}/{projectManager}/{CapexStatus}")]
        public async Task<IActionResult> PutUpdateCapexsinformations(int id, int capexid, CapexsInformations DetailCapexs, int idpool, decimal AvailableBudgetPool, string manager, string projectManager, string CapexStatus)
        {
            manager = manager.Replace(@"%u", @"\u");
            manager = Uri.UnescapeDataString(manager);
            manager = Regex.Unescape(manager);

            projectManager = projectManager.Replace(@"%u", @"\u");
            projectManager = Uri.UnescapeDataString(projectManager);
            projectManager = Regex.Unescape(projectManager);

            if (manager == "null" || projectManager == "null")
            {
                return Ok(null);
            }

            if (manager != "-" || projectManager != "-")
            {
                await _CapexsInformation.UpdateMangerForMax(id, manager, projectManager, DetailCapexs.CostCenterOfVP);
            }



            DetailCapexs.InitiativeId = id;
            var oldCapex = _CapexsInformation.GetCapexsInformations(id, DetailCapexs.CapexType).GetAwaiter().GetResult();
            DetailCapexs.CapexInformationId = capexid;
            var UpdateDetailCapexs = _mapper.Map<CapexInformations>(DetailCapexs);
            _CapexsInformation.Update(UpdateDetailCapexs);
            await _CapexsInformation.Save();

            if (await _repository.IsNewApprovalSystemx() == true)
            {
                if (capexStatusParallelFlow.Contains(CapexStatus))
                {
                    var initiativeData = await _repository.GetInitiative(id);
                    initiativeData.UpdatedDate = DateTime.Now;
                    initiativeData.IsRequestCapex = true;
                    await _repository.Save();
                }
            }
            else
            {
                if (CapexStatus == "addmore")
                {
                    UpdateDraft intitaive = new UpdateDraft
                    {
                        Stage = null,
                        Status = "add more"
                    };
                    var initiativeData = await _repository.GetInitiative(id);
                    _mapper.Map(intitaive, initiativeData);
                    initiativeData.UpdatedDate = DateTime.Now;
                    initiativeData.Stage = null;
                    initiativeData.Status = "add more";
                    await _repository.Save();
                    var initiative = _mapper.Map<InitiativeGeneral>(initiativeData);
                }
            }

            if (DetailCapexs.CapexType == "AddmoreCapex" && DetailCapexs.CapexStatus == "Draft")
            {
                UpdateDraft intitaive = new UpdateDraft
                {
                    Stage = null,
                    Status = "add more"
                };
                var initiativeData = await _repository.GetInitiative(id);
                _mapper.Map(intitaive, initiativeData);
                initiativeData.UpdatedDate = DateTime.Now;
                initiativeData.Stage = null;
                initiativeData.Status = "add more";
                await _repository.Save();
                var initiative = _mapper.Map<InitiativeGeneral>(initiativeData);
            }

            if (idpool != 0)
            {
                UpdateCostPool capex = new UpdateCostPool
                {
                    AvailableBudget = AvailableBudgetPool
                };
                var Capexdata = await _CapexsInformation.GetCapexsInformations(idpool, "Requestpool");
                _mapper.Map(capex, Capexdata);

                Capexdata.AvailableBudget = Capexdata.AvailableBudget + Capexdata.SpendingActual;
                
                    if (DetailCapexs.CapexType == "AddmoreCapex")
                    {
                        Capexdata.SpendingActual = ((Capexdata.SpendingActual != null) ? Capexdata.SpendingActual : 0) - oldCapex.AdditionalCost;
                        Capexdata.SpendingActual = ((Capexdata.SpendingActual != null) ? Capexdata.SpendingActual : 0) + (DetailCapexs.AdditionalCost);
                    }
                    else
                    {
                        Capexdata.SpendingActual = ((Capexdata.SpendingActual != null) ? Capexdata.SpendingActual : 0) - oldCapex.ProjectCost;
                        Capexdata.SpendingActual = ((Capexdata.SpendingActual != null) ? Capexdata.SpendingActual : 0) + (DetailCapexs.ProjectCost);
                    }
                    Capexdata.AvailableBudget = Capexdata.AvailableBudget - Capexdata.SpendingActual;

                await _CapexsInformation.Save();
                var initiative = _mapper.Map<CapexInformations>(Capexdata);
            }
            return Ok(UpdateDetailCapexs);
        }

        [HttpPut("UpdateCapexsinformations/{id}/{CapexStatus}")]
        public async Task<IActionResult> UpdateCapexsinformations(int id, CapexsInformations capexsInformations, string CapexStatus)
        {
            //manager = manager.Replace(@"%u", @"\u");
            //manager = Uri.UnescapeDataString(manager);
            //manager = Regex.Unescape(manager);

            //projectManager = projectManager.Replace(@"%u", @"\u");
            //projectManager = Uri.UnescapeDataString(projectManager);
            //projectManager = Regex.Unescape(projectManager);

            //if (manager != "-" || projectManager != "-")
            //{
            //    await _CapexsInformation.UpdateMangerForMax(id, manager, projectManager, DetailCapexs.CostCenterOfVP);
            //}





            //if (capexsInformations.CapexType == "AddmoreCapex" && capexsInformations.CapexStatus == "Draft")
            //{
            //    UpdateDraft intitaive = new UpdateDraft
            //    {
            //        Stage = null,
            //        Status = "add more"
            //    };
            //    var initiativeData = await _repository.GetInitiative(id);
            //    _mapper.Map(intitaive, initiativeData);
            //    initiativeData.UpdatedDate = DateTime.Now;
            //    initiativeData.Stage = null;
            //    initiativeData.Status = "add more";
            //    await _repository.Save();
            //    var initiative = _mapper.Map<InitiativeGeneral>(initiativeData);
            //}
            var oldCapex = _CapexsInformation.GetCapexsInformations(id, capexsInformations.CapexType).GetAwaiter().GetResult();
            if (await _repository.IsNewApprovalSystemx() == true)
            {
                if (capexStatusParallelFlow.Contains(CapexStatus))
                {
                    var initiativeData = await _repository.GetInitiative(id);
                    initiativeData.UpdatedDate = DateTime.Now;
                    initiativeData.IsRequestCapex = true;
                    await _repository.Save();
                }
            }
            else
            {
                if (CapexStatus == "addmore")
                {
                    UpdateDraft intitaive = new UpdateDraft
                    {
                        Stage = null,
                        Status = "add more"
                    };
                    var initiativeData = await _repository.GetInitiative(id);
                    _mapper.Map(intitaive, initiativeData);
                    initiativeData.UpdatedDate = DateTime.Now;
                    initiativeData.Stage = null;
                    initiativeData.Status = "add more";
                    await _repository.Save();
                    var initiative = _mapper.Map<InitiativeGeneral>(initiativeData);
                }
            }

            if (capexsInformations.PoolId != 0 && capexsInformations.PoolId != null && capexsInformations.BetweenYear == "Pool Budget" && capexsInformations.BudgetPeriod == "Current year")
            {
                //UpdateCostPool capex = new UpdateCostPool
                //{
                //    AvailableBudget = capexsInformations.AvailableBudget - capexsInformations.ProjectCost
                //};
                //var ///////////////Capexdata = await _CapexsInformation.GetCapexsInformations(capexsInformations.PoolId, "Requestpool");
                //_mapper.Map(capex, Capexdata);

                UpdateCostPool capex = new UpdateCostPool
                {
                    AvailableBudget = capexsInformations.AvailableBudget
                };
                var Capexdata = await _CapexsInformation.GetCapexsInformations((int)capexsInformations.PoolId, "Requestpool");
                //_mapper.Map(capex, Capexdata);
                //Capexdata.AvailableBudget = capexsInformations.AvailableBudget;
                //Revise Case.
                Capexdata.AvailableBudget = ((Capexdata.AvailableBudget != null) ? Capexdata.AvailableBudget : 0) + ((Capexdata.SpendingActual != null) ? Capexdata.SpendingActual : 0);
                if (capexsInformations.CapexType == "AddmoreCapex")
                {
                    Capexdata.SpendingActual = ((Capexdata.SpendingActual != null) ? Capexdata.SpendingActual : 0) - oldCapex.AdditionalCost;
                    Capexdata.SpendingActual = ((Capexdata.SpendingActual != null) ? Capexdata.SpendingActual : 0) + (capexsInformations.AdditionalCost);
                }
                else
                {
                    Capexdata.SpendingActual = ((Capexdata.SpendingActual != null) ? Capexdata.SpendingActual : 0) - oldCapex.ProjectCost;
                    Capexdata.SpendingActual = ((Capexdata.SpendingActual != null) ? Capexdata.SpendingActual : 0) + (capexsInformations.ProjectCost);
                }
                Capexdata.AvailableBudget = Capexdata.AvailableBudget - Capexdata.SpendingActual;
                capexsInformations.SpendingActual = Capexdata.SpendingActual;


                await _CapexsInformation.Save();

                capexsInformations.AvailableBudget = Capexdata.AvailableBudget;
                capexsInformations.SpendingActual = Capexdata.SpendingActual;

                //await _CapexsInformation.Save();
                //var initiative = _mapper.Map<CapexInformations>(Capexdata);
            }

            capexsInformations.InitiativeId = id;
            //var UpdateDetailCapexs = _mapper.Map<CapexInformations>(capexsInformations);
            //_CapexsInformation.Update(UpdateDetailCapexs);
            _mapper.Map(capexsInformations, oldCapex);
            await _CapexsInformation.Save();

            return Ok(oldCapex);
        }

        [HttpGet("GetPoolInnitiative/{pooltype}/{year}/{initiativeId}")]
        public async Task<IActionResult> GetPoolInnitiative(string pooltype, int year, int initiativeId)
        {
            return Ok(await _CapexsInformation.GetPoolInnitiative(pooltype, year, initiativeId));
        }

        [HttpGet("GetPoolInnitiativeByID/{poolid}")]
        public async Task<IActionResult> GetPoolInnitiativeByID(int poolid)
        {
            return Ok(await _CapexsInformation.GetPoolInnitiativeByID(poolid));
        }

        [HttpPost("GetCodeOfCostCenterVP")]
        public async Task<IActionResult> GetCodeOfCostCenterVP(CodeCostCenterDtos data)
        {
            return Ok(await _CapexsInformation.GetCodeOfCostCenterVP(data));
        }

        [HttpGet("GetAnnualInvestmentPlan_sumtatal/{annaul_id}")]
        public async Task<IActionResult> GetAnnualInvestmentPlan_sumtatal(int annaul_id)
        {
            return Ok(await _CapexsInformation.GetAnnualInvestmentPlan_sumtatal(annaul_id));
        }

        [HttpGet("UpdateSumTotalBaht/{id_annual}/{sumtotal}")]
        public async Task<IActionResult> UpdateSumTotalBaht(int id_annual, Decimal sumtotal)
        {
            UpdateSumtatalBaht datasum = new UpdateSumtatalBaht
            {
                YearOverall = sumtotal
            };

            var Annualdata = await _CapexsInformation.GetAnnualInvestmentPlan_sumtatal(id_annual);
            _mapper.Map(datasum, Annualdata);

            Annualdata.YearOverall = sumtotal;

            await _CapexsInformation.Save();
            var initiative = _mapper.Map<AnnualInvestmentPlan>(Annualdata);

            return Ok(initiative);
        }

        [HttpGet("GetIsDisabledCapexTab/{id}")]
        public async Task<IActionResult> GetIsDisabledCapexTab(int id)
        {
            var initiative = await _repository.GetInitiative(id);

            return Ok(initiative.IsCreatedApp == true);
        }

    }
}