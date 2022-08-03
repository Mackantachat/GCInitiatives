using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.Initiative;
using System;
using System.Linq;
using AutoMapper;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Extensions.Options;
using PTT_GC_API.API.Helpers;
using System.Text;
using System.Text.RegularExpressions;
using PTT_GC_API.Dtos.ResourceNeededFormsModel;
using DocumentFormat.OpenXml.Office.CustomUI;
using FastReport.Utils;
using PTT_GC_API.Helpers;
using PTT_GC_API.Dtos.Master;
using PTT_GC_API.Dtos.VacPic;
using PTT_GC_API.Dtos.NewApprovalSystem;
using PTT_GC_API.Models.VacPic;
using NPOI.XSSF.UserModel;
using Microsoft.Extensions.Hosting;
using NPOI.SS.UserModel;
using NPOI.HSSF.UserModel;
using ExcelDataReader;
using System.Data;
using PTT_GC_API.Data.Repository;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InitiativeController : ControllerBase
    {
        private readonly InitiativeInterface _repository;
        private readonly DetailInformationInterface _repositoryDetail;
        private readonly IResourceNeededRepository _resourceNeededRepo;
        private readonly CapexsInformationsInterface _capexinformationRepository;
        private readonly IFInterface _repositoryIF;
        private readonly IMapper _mapper;
        private readonly IOptions<BlobConfig> _blobConfig;
        private readonly IConsumeAPI _consumeAPI;
        private readonly PDDInterface _pDD;
        private readonly IHostEnvironment _hostingEnvironment;
        private readonly IRRCalculationInterface _repositoryIRRCalculation;

        public InitiativeController(InitiativeInterface repository, IMapper mapper, IOptions<BlobConfig> blobConfig, IFInterface repositoryIF, IResourceNeededRepository resourceNeededRepository, IConsumeAPI consumeAPI, PDDInterface pDD, DetailInformationInterface repositoryDetail, IHostEnvironment hostingEnvironment, IRRCalculationInterface repositoryIRRCalculation,CapexsInformationsInterface capexsInformationsRepository)
        {
            _mapper = mapper;
            _repository = repository;
            _blobConfig = blobConfig;
            _repositoryIF = repositoryIF;
            _resourceNeededRepo = resourceNeededRepository;
            _consumeAPI = consumeAPI;
            _pDD = pDD;
            _repositoryDetail = repositoryDetail;
            _hostingEnvironment = hostingEnvironment;
            _repositoryIRRCalculation = repositoryIRRCalculation;
            _capexinformationRepository = capexsInformationsRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetInitiatives([FromQuery] InitiativeParams InitiativeParams)
        {
            var initiativesData = await _repository.GetInitiatives(InitiativeParams);
            var initiatives = _mapper.Map<IEnumerable<InitiativeList>>(initiativesData);

            initiatives = await _repository.Get3Dots(initiatives);

            initiatives = await _repository.GetNowStatus(initiatives);

            if (InitiativeParams.Page == "myTask")
            {
                try
                {
                    foreach (var entity in initiatives)
                    {
                        if (entity.InitiativeActions.Any())
                        {
                            entity.InitiativeActions = entity.InitiativeActions.Where(i => i.ActionResult == null && (i.IsInactive == null || i.IsInactive == false)).ToList();
                            var maxCounter = entity.InitiativeActions.OrderByDescending(i => i.Counter).Select(i => i.Counter).FirstOrDefault();
                            entity.InitiativeActions = entity.InitiativeActions.Where(i => i.Counter == maxCounter && (i.ActionBy == null ? i.ActionBy : i.ActionBy.Trim().ToLower()) == InitiativeParams.Username.Trim().ToLower()).ToList();
                        }
                    }

                    initiatives = initiatives.Where(i => i.InitiativeActions.Any());
                }
                catch (Exception ex)
                {

                }
            }
            else
            {
                try
                {
                    foreach (var entity in initiatives)
                    {
                        if (entity.InitiativeActions.Any())
                        {
                            entity.InitiativeActions = entity.InitiativeActions.Where(i => i.ActionResult == null && (i.IsInactive == null || i.IsInactive == false) && i.ActionByName != null).ToList();
                            var maxCounter = entity.InitiativeActions.OrderByDescending(i => i.Counter).Select(i => i.Counter).FirstOrDefault();
                            entity.InitiativeActions = entity.InitiativeActions.Where(i => i.Counter == maxCounter).ToList();
                        }
                    }
                }
                catch (Exception ex)
                {

                }
            }


            //initiatives = await _repository.GetAssignToOnlyMaxCounter(initiatives);            

            Response.AddPagination(initiativesData.CurrentPage, initiativesData.PageSize, initiativesData.TotalCount, initiativesData.TotalPages);
            return Ok(initiatives);
        }

        [HttpGet("Lists")]
        public async Task<IActionResult> GetInitiativeLists([FromQuery] InitiativeParams InitiativeParams)
        {
            var initiativesData = await _repository.GetListsInitiative(InitiativeParams);
            var initiatives = _mapper.Map<IEnumerable<InitiativeList>>(initiativesData);

            initiatives = await _repository.Get3Dots(initiatives);

            initiatives = await _repository.GetNowStatus(initiatives);

            Response.AddPagination(initiativesData.CurrentPage, initiativesData.PageSize, initiativesData.TotalCount, initiativesData.TotalPages);
            return Ok(initiatives);
        }

        [HttpGet("GetInitiativeList")]
        public async Task<IActionResult> GetInintiativeList([FromQuery] OwnerParams param)
        {
            var initiativeList = await _repository.GetInitiativeList(param);
            return Ok(initiativeList);
        }


        [HttpPost("GetInitiativeVac/{type}")]
        public async Task<IActionResult> GetInitiativeVac(int[] initiativeIdList, string type)
        {
            var initiativesData = await _repository.GetInitiative50(initiativeIdList, type);
            var initiatives = _mapper.Map<List<initiativeMemberModel>>(initiativesData);

            initiatives = await _repository.GetStages_SwitchProcessVAC(initiatives);

            return Ok(initiatives);
        }

        [HttpGet("InitiativeCode/{id}")]
        public async Task<IActionResult> GetInitiativeCode(int id)
        {
            var initiative = await _repository.GetInitiative(id);
            if (initiative == null)
            {
                return null;
            }
            return Ok(new { Code = initiative.InitiativeCode });
        }

        private async Task<string> InitiativeCode()
        {
            DateTime now = DateTime.Now;
            var Year = now.Year;
            string code;
            if (await _repository.Any())
            {
                var last = await _repository.LastInitiative();
                string[] words = last.InitiativeCode.Split('-');

                if (words.Count() == 1)
                {
                    code = Year.ToString() + "-000001";
                }
                else
                {
                    int lastCode = Int32.Parse(words[1]);
                    int InitiativeId = ++lastCode;
                    code = Year.ToString() + "-" + InitiativeId.ToString("D6");
                }
            }
            else
            {
                code = Year.ToString() + "-000001";
            }
            return code;
        }

        [HttpPost("Draft")]
        public async Task<IActionResult> CreateDraftInitiative(InitiativeCreate initiativeCreate)
        {
            initiativeCreate.InitiativeCode = await InitiativeCode();
            initiativeCreate.Status = "draft";
            if (initiativeCreate.BenefitAmount != null)
            {
                initiativeCreate.BenefitAmount = Math.Round(initiativeCreate.BenefitAmount.Value, 3);
            }
            initiativeCreate.UpdatedBy = initiativeCreate.CreatedBy;
            var initiative = _mapper.Map<Initiative>(initiativeCreate);
            _repository.Add(initiative);
            await _repository.Save();

            await _repository.UpdateInitiativeTypeFromFlag(initiative.Id);

            return Ok(initiative);
        }

        [HttpPost("Submit")]
        public async Task<IActionResult> CreateSubmitInitiative(InitiativeCreate initiativeCreate)
        {

            initiativeCreate.InitiativeCode = await InitiativeCode();
            initiativeCreate.UpdatedBy = initiativeCreate.CreatedBy;
            if (initiativeCreate.BenefitAmount != null)
            {
                initiativeCreate.BenefitAmount = Math.Round(initiativeCreate.BenefitAmount.Value, 3);
            }
            if (initiativeCreate.Cim == true || initiativeCreate.Strategy == true || initiativeCreate.Max == true || initiativeCreate.DirectCapex == true || initiativeCreate.Dim == true || initiativeCreate.Pim == true || initiativeCreate.InitiativeType == "IT" || initiativeCreate.InitiativeType == "Digital")
            {
                initiativeCreate.Status = "draft";
                initiativeCreate.Stage = null;
            }
            else
            {
                initiativeCreate.Status = "draft";
                initiativeCreate.Stage = null;
            }
            var initiative = _mapper.Map<Initiative>(initiativeCreate);
            _repository.Add(initiative);
            await _repository.Save();

            await _repository.UpdateInitiativeTypeFromFlag(initiative.Id);

            //InitiativeTypeSubType initiativeTypeSubType = new InitiativeTypeSubType()
            //{
            //    InitiativeId = initiative.Id,
            //    ProcessType = await _repository.GetProcessType(initiative.Id),
            //    SubType = await _repository.GetSubTypeFromInitiative(initiative.Id)
            //};

            //await _repository.SetActionBy(initiative.Id, initiativeCreate.CreatedBy, initiativeCreate.Status, initiativeCreate.Stage, initiativeTypeSubType);
            return Ok(initiative);
        }

        [HttpPut("Draft/{id}")]
        public async Task<IActionResult> UpdateDraftInitiative(int id, InitiativeUpdate initiativeUpdate)
        {
            if (initiativeUpdate.BenefitAmount != null)
            {
                initiativeUpdate.BenefitAmount = Math.Round(initiativeUpdate.BenefitAmount.Value, 3);
            }
            var initiativeData = await _repository.GetInitiative(id);
            //check new owner 
            await _repository.CheckOwnerOnInitiativeAction(initiativeData, initiativeUpdate);


            


            _mapper.Map(initiativeUpdate, initiativeData);
            initiativeData.UpdatedDate = DateTime.Now;
            if (initiativeData != null && initiativeData.Stage != null)
            {
                if (initiativeData.Status == "")
                {
                    initiativeData.Status = "draft";
                }
            }

            //real createPDD when approver approve  test create pdd when save draft
            //await _pDD.CallMicrosoftFlow_CreatePDD(id);



            await _repository.Save();
            var initiative = _mapper.Map<InitiativeGeneral>(initiativeData);

            if (!String.IsNullOrEmpty(initiative.InitiativeType))
            {
                if ((initiative.InitiativeType.ToUpper().Equals("IT") || initiative.InitiativeType.ToUpper().Equals("DIGITAL")))
                {
                    await _repository.UpdateIntiativeStageDetail(id, initiative.InitiativeType.ToLower());
                }
            }

            await _repository.UpdateInitiativeTypeFromFlag(id);
            return Ok(initiative);
        }

        [HttpPut("Addmore/{id}")]
        public async Task<IActionResult> UpdateDraftAddMoreInitiative(int id, InitiativeAddmore InitiativeAddmore)
        {
            var initiativeData = await _repository.GetInitiative(id);
            _mapper.Map(InitiativeAddmore, initiativeData);
            initiativeData.UpdatedDate = DateTime.Now;
            await _repository.Save();
            var initiative = _mapper.Map<InitiativeGeneral>(initiativeData);
            await _repository.UpdateInitiativeTypeFromFlag(initiative.Id);
            return Ok(initiative);
        }

        [HttpPut("Submit/{id}")]
        public async Task<IActionResult> UpdateSubmitInitiative(int id, InitiativeUpdate initiativeUpdate)
        {
            if (initiativeUpdate.BenefitAmount != null)
            {
                initiativeUpdate.BenefitAmount = Math.Round(initiativeUpdate.BenefitAmount.Value, 3);
            }
            var initiativeData = await _repository.GetInitiative(id);
            _mapper.Map(initiativeUpdate, initiativeData);
            initiativeData.UpdatedDate = DateTime.Now;
            await _repository.Save();
            //await _repository.SetActionBy(initiativeData.Id, initiativeData.CreatedBy, initiativeData.Status, initiativeData.Stage);
            var initiative = _mapper.Map<InitiativeGeneral>(initiativeData);

            //change process in initiativeStageDetail Table for IT and Digital Type
            if (!String.IsNullOrEmpty(initiative.InitiativeType))
            {
                if ((initiative.InitiativeType.ToUpper().Equals("IT") || initiative.InitiativeType.ToUpper().Equals("DIGITAL")))
                {
                    await _repository.UpdateIntiativeStageDetail(id, initiative.InitiativeType.ToLower());
                }

                //Stamp CapexInformation Submit Date
                _capexinformationRepository.StampSubmitDateTime(id, initiative.UpdatedDate);
            }

            await _repository.UpdateInitiativeTypeFromFlag(id);
            return Ok(initiative);
        }

        [HttpPut("RequestOpex/{id}")]
        public async Task<IActionResult> UpdateRequestOpex(int id, InitiativeRequestOpex InitiativeOpex)
        {
            var initiativeData = await _repository.GetInitiative(id);
            if (InitiativeOpex.RequestOpex == "true")
            {
                InitiativeOpex.RequestOpex = "trueOpex";
                InitiativeOpex.CostEstOpex = InitiativeOpex.CostEstOpex;
            }
            else
            {
                InitiativeOpex.RequestOpex = "falseOpex";
            }
            _mapper.Map(InitiativeOpex, initiativeData);
            await _repository.Save();
            return NoContent();
        }

        [HttpPut("BenefitAmount/{id}")]
        public async Task<IActionResult> UpdateBenefitAmount(int id, InitiativeBenefitAmount InitiativeBenefitAmount)
        {
            if (InitiativeBenefitAmount.BenefitAmount != null)
            {
                InitiativeBenefitAmount.BenefitAmount = Math.Round(InitiativeBenefitAmount.BenefitAmount.Value, 3);
            }
            var initiativeData = await _repository.GetInitiative(id);
            _mapper.Map(InitiativeBenefitAmount, initiativeData);
            await _repository.Save();
            return NoContent();
        }

        [HttpPost("Action/Submit/{id}")]
        public async Task<IActionResult> InitiativeActionSubmit(int id, InitiativeSubmit initiativeSubmit)
        {
            //On All Approved   
            await _repository.UpdateSubType(id);  //update subtype only first time
            var initiative = await _repository.GetInitiative(id);
            var detailinformation = await _repositoryDetail.GetDetailInformation(id);
            bool isTypeMaxAndRequestCapex = initiative.InitiativeType.Contains("max") && initiative.IsRequestCapex == true;
            var initiativeType = await _repository.GetProcessType(id);
            string[] InitiativeTypeCapex = await _repository.GetInitiativeTypeCapex();
            string[] initiativeTypeDIM = { "IT", "Digital" };
            string subType = await _repository.GetSubTypeFromInitiative(id);
            //if (initiativeType == "directCapex")
            //{
            //    //await _repository.CallMicrosoftFlow_OnApproved(id, initiativeSubmit.Status, "MSFLOW_ONALLAPPROVED");
            //}

            //real createPDD when approver approve
            if (initiative.Status.ToUpper() == "WAIT FOR APPROVAL"
            && new string[] { "FIRST REVIEW-2", "IDEATE - VP", "INITIATIVE-3", "PMO", "SIL1" }.Contains(initiative.Stage.ToUpper()))
            {
                await _pDD.CallMicrosoftFlow_CreatePDD(id); //don't forget remove comment for enable
            }

            if (await _repository.IsNewApprovalSystemx() == true)
            {

                ApprovalNewSystemParam approvalNewSystemParam;
                //NewApproval FLOW SYSTEM
                if (initiativeSubmit.Status == "switch process")
                {
                    approvalNewSystemParam = new ApprovalNewSystemParam()
                    {
                        ActionBy = initiativeSubmit.Username,
                        ActionType = "switch process",
                        Direction = initiativeSubmit.Status,
                        GotoStage = initiativeSubmit.GoToStage,
                        Event = "next",
                        Process = initiativeType?.ToLower(),
                        InitiativeId = id,
                        FlowType = await _repository.GetFlowTypeOfInitiative(id),
                        SubType = subType,
                        IsUserAction = true,
                        IsFirstPassStage = true,
                        nowDateTime = initiativeSubmit.ApprovedDate == null ? DateTime.Now : initiativeSubmit.ApprovedDate.Value,
                        SwitchToProcess = initiativeSubmit.SwitchProcessTo
                    };
                }
                else
                {
                    approvalNewSystemParam = new ApprovalNewSystemParam()
                    {
                        ActionBy = initiativeSubmit.Username,
                        ActionType = "approve",
                        Direction = initiativeSubmit.Status,
                        GotoStage = initiativeSubmit.GoToStage,
                        Event = await _repository.GetEventOfInitiative(id),
                        Process = initiativeType?.ToLower(),
                        InitiativeId = id,
                        FlowType = await _repository.GetFlowTypeOfInitiative(id),
                        SubType = subType,
                        IsUserAction = true,
                        IsFirstPassStage = true,
                        nowDateTime = initiativeSubmit.ApprovedDate == null ? DateTime.Now : initiativeSubmit.ApprovedDate.Value,
                    };
                }


                DateTime nowDateTime = approvalNewSystemParam.nowDateTime;

                if (approvalNewSystemParam.Direction == "approve")
                {
                    if (initiativeSubmit.CreateType != null)
                    {
                        await _repository.UpdateCreateType(id, initiativeSubmit.CreateType);
                    }

                    await _repository.UpdateApprovedDate(id, initiativeSubmit.UpdatedBy, nowDateTime);
                }

                var nowStageStatus = await _repository.GetNowStageStatus(approvalNewSystemParam);

                //only cim
                await _repository.UpdateFromFieldSSPIM(id, initiativeSubmit.SSPIM, nowStageStatus);

                await _repository.InsertStagesHistory(initiative, initiativeSubmit, nowStageStatus);

                await _repository.UpdateUpdatedDate_UpdatedBy(id, initiativeSubmit.UpdatedBy, nowDateTime);

                approvalNewSystemParam = await _repository.OnInitiativeApproveClick(approvalNewSystemParam, initiativeSubmit);










                //if (approvalNewSystemParam.NowStatus == "wait for create App." && approvalNewSystemParam.NowStage == "App. Request")
                //{
                //    await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, null, approvalNewSystemParam);
                //}

                ////if (tmpinitiativeSubmitStatus == "approve" && tmpinitiativeSubmitStage == "Gate3 : CAPEX-3")
                ////{
                ////    await _repositoryIF.Interface_OutGoing(id, approvalNewSystemParam.NowStatus, approvalNewSystemParam.NowStage, null, approvalNewSystemParam);
                ////}

                //if (approvalNewSystemParam.NowStatus == "wait for create" && new string[] { "Pre-DD-8", "Detail F/S-8" }.Contains(approvalNewSystemParam.NowStage))
                //{
                //    await _repositoryIF.Interface_OutGoing(id, approvalNewSystemParam.NowStatus, approvalNewSystemParam.NowStage, null, approvalNewSystemParam);
                //}

                //if (approvalNewSystemParam.NowStatus == "project planning" && new string[] { "Implementing IL2", "Implementing-1" }.Contains(approvalNewSystemParam.NowStage)) //interface for dim
                //{
                //    await _repositoryIF.Interface_OutGoing(id, approvalNewSystemParam.NowStatus, approvalNewSystemParam.NowStage, null, approvalNewSystemParam);
                //}


                //if (approvalNewSystemParam.Direction == "revise"
                //|| approvalNewSystemParam.Direction == "reject"
                //|| approvalNewSystemParam.Direction == "approve cancellation"
                //|| approvalNewSystemParam.Direction == "reject cancellation")
                //    await _repository.CallMicrosoftFlow_SendMail(id, approvalNewSystemParam.Direction);  // case 2 case 3  revise, reject  -  send mail to owner / creator

                //if (await _repository.CheckIsNextStageOwnerAction(id, approvalNewSystemParam) == true)
                //{ //send mail to owner / creator
                //    await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                //}
                //else
                //{ //send mail to approver
                //    await _repository.CallMicrosoftFlow_SendMail(id, "approve");
                //}

                //await _repository.RunStoreProcedureFixValueMissing(id); //temporary solution to fix data missing!!!

                return NoContent();
            }





            InitiativeTypeSubType initiativeTypeSubType = new InitiativeTypeSubType()
            {
                InitiativeId = id,
                ProcessType = initiativeType,
                SubType = subType
            };

            if (isTypeMaxAndRequestCapex == true)
            {
                initiativeTypeSubType.ProcessType = "pimcapex";
                initiativeTypeSubType.SubType = null;
            }

            //var switchStage = isTypeMaxAndRequestCapex == true ? initiative.CapexStage : initiative.Stage;
            var switchStage = initiative.Stage;

            string tmpinitiativeSubmitStatus = initiativeSubmit.Status;
            string tmpinitiativeSubmitStage = switchStage;
            await _repository.InsertStagesHistory(initiative, initiativeSubmit);


            if (initiativeSubmit.Status == "approve")
            {
                if (initiativeSubmit.CreateType != null)
                {
                    await _repository.UpdateCreateType(id, initiativeSubmit.CreateType);
                }


                //check if admin handover dim approve
                //if (await _repository.CheckApproverPosition(id, initiativeSubmit.Username) == "admin handover")
                //{
                //    await _repository.RemoveActionBy_ByPosition(id, "admin handover", initiativeSubmit.Username, "Admin Handover");
                //    return NoContent();
                //}



                if (await _repository.CountInitiativeAction(id) > 1 && switchStage != "waiting")  //stage waiting (admin check) ให้ approve คนเดียวผ่านได้เลย
                {
                    if (initiativeType.Contains("max") && isTypeMaxAndRequestCapex == false)
                    { // approve  1 คน ให้ลบคนที่เหลือออกทั้งหมด
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TO Finance"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TO Finance", initiativeSubmit.Username);
                        }
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "CTO"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "CTO", initiativeSubmit.Username);
                        }
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TOTeam"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TOTeam", initiativeSubmit.Username);
                        }
                        //if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "CFO"))
                        //{
                        //    await _repository.RemoveActionBy_ByApproverType(id, "CFO", initiativeSubmit.Username);
                        //}
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TOFinanceIL4"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TOFinanceIL4", initiativeSubmit.Username);
                        }
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TOFinanceIL5"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TOFinanceIL5", initiativeSubmit.Username);
                        }
                    }

                    if (new string[] { "IT", "Digital" }.Contains(initiativeType))
                        if (switchStage == "admin")
                            await _repository.RemoveActionBy_ByStage(id, switchStage, initiativeSubmit.Username);

                    await _repository.RemoveInitiativeActions(id, initiativeSubmit.Username);
                    await _repository.UpdateStagesTracking_OnApprove(initiative, initiativeSubmit, initiativeTypeSubType.SubType);

                    if (isTypeMaxAndRequestCapex == true) initiative.IsRequestCapex = false;

                    if (await _repository.CountInitiativeAction(id) == 0) goto next_stage; //if no more actionby then go to next stage

                    return NoContent();
                }
            }

            next_stage:

            if (initiativeType == "pim" && switchStage == "Initiative-2" && initiative.RequestProjectEngineer != true) // pim approve go to stage - skip project en
            {
                initiativeSubmit.GoToStage = "Gate0 : Phase1-2";
            }

            if (detailinformation != null)
                if (initiativeType == "pim" && switchStage == "Gate1 : PIC Gate2" && detailinformation.SimProjectSkipGate2 == true) // pim approve go to stage - skip project en
                {
                    initiativeSubmit.GoToStage = "Gate3 : CAPEX-1";
                }

            if (initiativeSubmit.GoToStage != null && !string.IsNullOrEmpty(initiativeSubmit.GoToStage))
            {
                switchStage = initiativeSubmit.GoToStage;
            }

            int nowOrderStage = await _repository.GetOrderStage(switchStage, initiativeTypeSubType);

            if (initiativeSubmit.GoToStage != null && !string.IsNullOrEmpty(initiativeSubmit.GoToStage)) //back to selected stage    revised goto stage for pim
                nowOrderStage--;

            if (initiativeSubmit.Status == "revise" && initiativeType == "dim") //if action revise on dim  go to stage check point
            {
                nowOrderStage = await _repository.GetOrderStage_OnRevise(initiative, initiativeTypeSubType);
            }

            string nextStage = await _repository.GetNextStage(nowOrderStage, initiativeTypeSubType);
            string reviseStage = await _repository.GetReviseStage(nowOrderStage, initiativeTypeSubType);
            string nowStatus = await _repository.GetApproveStatus(initiativeTypeSubType, initiativeSubmit, nextStage);

            if (initiativeTypeSubType.ProcessType.Contains("max") && switchStage == "Gate0 : Sub-PIC Gate1")
                initiative.IsPassPimGate1 = 1;

            //if (isTypeMaxAndRequestCapex == true)
            //{
            //    if (initiativeSubmit.Status == "approve")
            //    {
            //        initiativeSubmit.Status = "approved";
            //        initiativeSubmit.Stage = "IL3";
            //        initiative.CapexStatus = "approved";
            //        initiative.CapexStage = "Budget Team";
            //    }
            //    else if (initiativeSubmit.Status == "revise")
            //    {
            //        initiativeSubmit.Status = "approved";
            //        initiativeSubmit.Stage = "IL3";
            //        initiative.CapexStatus = "revised";
            //        initiative.CapexStage = "Budget Team";
            //    }
            //}
            //else
            //{
            if (initiativeSubmit.Status == "approve")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = nextStage == null ? switchStage : nextStage;
            }
            else if (initiativeSubmit.Status == "revise")
            {
                if (initiativeTypeDIM.Contains(initiativeType) == true)
                {
                    initiativeSubmit.Status = nowStatus;
                    initiativeSubmit.Stage = "draft";
                }
                else
                {
                    initiativeSubmit.Status = nowStatus;
                    initiativeSubmit.Stage = reviseStage;
                }
            }
            else if (initiativeSubmit.Status == "reject")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = "cancelled";
            }
            else if (initiativeSubmit.Status == "approve cancellation")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = "cancelled";
            }
            else if (initiativeSubmit.Status == "reject cancellation")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = switchStage;
            }
            //}

            if (!tmpinitiativeSubmitStatus.Contains("cancellation"))
            {
                await _repository.UpdateStagesTracking_OnApprove(initiative, initiativeSubmit, initiativeTypeSubType.SubType);

                if (initiative.Stage == "Gate3 : CAPEX-3" && initiativeTypeSubType.ProcessType.Contains("pimcapex"))
                {
                    initiative.IsRequestCapex = false;
                    initiativeTypeSubType.SubType = initiative.InitiativeSubType;
                    initiativeTypeSubType.ProcessType = initiative.InitiativeType;

                    await _repository.UpdateStagesTracking_OnApprove(initiative, initiativeSubmit, initiativeTypeSubType.SubType);
                }

            }

            int? tempCreateType = initiative.CreateType;
            string tempSubmitSSIM = initiativeSubmit.SSPIM;
            string tempSSIM = initiative.SSPIM;
            _mapper.Map(initiativeSubmit, initiative);
            initiative.UpdatedDate = initiative.ApprovedDate;

            if (initiativeSubmit.CreateType == null)
            {
                initiative.CreateType = tempCreateType;
            }


            if (initiativeType == "cim")
            {
                if (tmpinitiativeSubmitStage == "Commercial Operation-1" || tmpinitiativeSubmitStage == "Closing-1")
                {
                    initiative.SSPIM = tempSSIM;
                    initiative.VPPlantOwner = initiativeSubmit.SSPIM;
                }
                else if (tmpinitiativeSubmitStage == "Commercial Operation-2" || tmpinitiativeSubmitStage == "Closing-2")
                {
                    initiative.SSPIM = tempSSIM;
                    initiative.DMPlantOwner = initiativeSubmit.SSPIM;
                }
                else if (tmpinitiativeSubmitStage == "Commercial Operation-3" || tmpinitiativeSubmitStage == "Closing-3")
                {
                    initiative.SSPIM = tempSSIM;
                    initiative.LookbackOwner = initiativeSubmit.SSPIM;
                }
                else
                {
                    if (tempSubmitSSIM != null)
                    {
                        initiative.SSPIM = tempSubmitSSIM;
                    }
                    else
                    {
                        initiative.SSPIM = tempSSIM;
                    }
                }
            }


            await _repository.Save();
            await _repository.SetActionBy(initiative.Id, initiativeSubmit.Username, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);

            if (nextStage != null)
            {
                await _repository.ChangeApproverStatusTrackingFromSetActionBy(initiative, initiativeTypeSubType);
                await _repository.ChangeApproverStatusTrackingFromSetActionBy_NOMAX(initiative, initiativeTypeSubType);
            }

            if ((tmpinitiativeSubmitStatus == "revise"
                || tmpinitiativeSubmitStatus == "reject"
                || tmpinitiativeSubmitStatus == "approve cancellation"
                || tmpinitiativeSubmitStatus == "reject cancellation"
                ) && isTypeMaxAndRequestCapex == false)
                await _repository.CallMicrosoftFlow_SendMail(id, tmpinitiativeSubmitStatus);  // case 2 case 3  revise, reject  -  send mail to owner / creator

            if (tmpinitiativeSubmitStatus == "approve")
            {
                if (new string[] { "SIL4", "SIL5" }.Contains(tmpinitiativeSubmitStage)) //Date @ change stage to IL4 , IL5 (FROM SIL4 , SIL5)
                {
                    await _repository.UpdateLastestApproved(id, tmpinitiativeSubmitStage); //SIL4 , SIL5 only
                }

                if (await _repository.CheckIsNextStageOwnerAction(id) == true)
                { //send mail to owner / creator
                    await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                }
                else
                { //send mail to approver
                    await _repository.CallMicrosoftFlow_SendMail(id, "approve");
                }

                //if (InitiativeTypeCapex.Contains(initiativeType) || initiativeTypeDIM.Contains(initiativeType)) // case capex when approve go to next approver!
                //{
                //    if (initiativeSubmit.Status == "finish")
                //    {
                //        await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                //    }
                //    else
                //    {
                //        await _repository.CallMicrosoftFlow_SendMail(id, "approve");
                //    }
                //}
                //else
                //{

                //    await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                //}
                // case 4  send mail to owner / creator after approved all
            }


            //createPDD
            //if (initiativeSubmit.Stage == "Gate1 : Phase2" || new string[] { "Pre-DD-1", "Seeking Potential-1", "Detail F/S-1", "GATE0 : PHASE1-1","IL2-1","IL3-1" }.Contains(initiativeSubmit.Stage))
            //{
            //    await _pDD.CreateFolderPDD(id);
            //}
            //if(initiativeSubmit.Status.ToUpper() == "WAIT FOR APPROVAL" 
            //&& new string[] { "FIRST REVIEW-2", "IDEATE - VP", "INITIATIVE-3", "PMO", "SIL1" }.Contains(initiativeSubmit.Stage.ToUpper()))
            //{
            //    await _pDD.CreateFolderPDD(id);
            //}








            //if (tmpinitiativeSubmitStatus == "approve") //send interface only approve passed

            if (initiativeSubmit.Status == "wait for create App." && initiativeSubmit.Stage == "App. Request")
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            if (tmpinitiativeSubmitStatus == "approve" && tmpinitiativeSubmitStage == "Gate3 : CAPEX-3")
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            if (initiativeSubmit.Status == "wait for create" && new string[] { "Pre-DD-8", "Detail F/S-8" }.Contains(initiativeSubmit.Stage))
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            if (initiativeSubmit.Status == "project planning" && new string[] { "Implementing IL2", "Implementing-1" }.Contains(initiativeSubmit.Stage)) //interface for dim
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            //Send Interface for Capex -----------------------------------------------------------------
            //Interface CAPEX!!!   IF001
            //if (initiativeSubmit.Status == "wait for create App." && initiativeSubmit.Stage == "App. Request")
            //{
            //    var nowDateTime = DateTime.Now;
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //    await _repositoryIF.IF_WBS(id, nowDateTime);
            //    await _repositoryIF.IF_DAT(id, nowDateTime);
            //    await _repositoryIF.IF_POC(id, nowDateTime);
            //    await _repositoryIF.IF_PLA(id, nowDateTime);
            //}

            //Interface CAPEX!!!   IF001
            //if (initiative.CapexStatus == "approved" && initiative.CapexStage == "Budget Team")
            //{
            //    var nowDateTime = DateTime.Now;
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //    await _repositoryIF.IF_WBS(id, nowDateTime);
            //    await _repositoryIF.IF_DAT(id, nowDateTime);
            //    await _repositoryIF.IF_POC(id, nowDateTime);
            //    await _repositoryIF.IF_PLA(id, nowDateTime);
            //}

            //Interface CAPEX!!!   IF001  // CIM
            //if (initiativeSubmit.Status == "wait for create" && new string[] { "Pre-DD-8", "Detail F/S-8" }.Contains(initiativeSubmit.Stage))
            //{
            //    var nowDateTime = DateTime.Now;
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //    await _repositoryIF.IF_WBS(id, nowDateTime);
            //    await _repositoryIF.IF_DAT(id, nowDateTime);
            //    await _repositoryIF.IF_POC(id, nowDateTime);
            //    await _repositoryIF.IF_PLA(id, nowDateTime);
            //}

            await _repository.RunStoreProcedureFixValueMissing(id); //temporary solution to fix data missing!!!

            return NoContent();

        }
        [HttpPost("Approve/SwitchProcessMax/{id}")]
        public async Task<IActionResult> InitiativeApproveSwitchProcessMax(int id, InitiativeSubmit initiativeSubmit)
        {
            //On All Approved   
            await _repository.UpdateSubType(id);  //update subtype only first time
            var initiative = await _repository.GetInitiative(id);
            var detailinformation = await _repositoryDetail.GetDetailInformation(id);
            bool isTypeMaxAndRequestCapex = initiative.InitiativeType.Contains("max") && initiative.IsRequestCapex == true;
            var initiativeType = await _repository.GetProcessType(id);
            string[] InitiativeTypeCapex = await _repository.GetInitiativeTypeCapex();
            string[] initiativeTypeDIM = { "IT", "Digital" };
            string subType = await _repository.GetSubTypeFromInitiative(id);
            //if (initiativeType == "directCapex")
            //{
            //    //await _repository.CallMicrosoftFlow_OnApproved(id, initiativeSubmit.Status, "MSFLOW_ONALLAPPROVED");
            //}



            if (await _repository.IsNewApprovalSystemx() == true)
            {


                //NewApproval FLOW SYSTEM
                ApprovalNewSystemParam approvalNewSystemParam = new ApprovalNewSystemParam()
                {
                    ActionBy = initiativeSubmit.Username,
                    ActionType = "approve",
                    Direction = initiativeSubmit.Status,
                    GotoStage = initiativeSubmit.GoToStage,
                    Event = await _repository.GetEventOfInitiative(id),
                    Process = initiativeType?.ToLower(),
                    InitiativeId = id,
                    FlowType = await _repository.GetFlowTypeOfInitiative(id),
                    SubType = subType,
                    IsUserAction = true,
                    IsFirstPassStage = true,
                    nowDateTime = initiativeSubmit.ApprovedDate == null ? DateTime.Now : initiativeSubmit.ApprovedDate.Value,
                };

                DateTime nowDateTime = approvalNewSystemParam.nowDateTime;

                if (approvalNewSystemParam.Direction == "approve")
                {
                    if (initiativeSubmit.CreateType != null)
                    {
                        await _repository.UpdateCreateType(id, initiativeSubmit.CreateType);
                    }

                    await _repository.UpdateApprovedDate(id, initiativeSubmit.UpdatedBy, nowDateTime);
                }

                var nowStageStatus = await _repository.GetNowStageStatus(approvalNewSystemParam);

                //only cim
                await _repository.UpdateFromFieldSSPIM(id, initiativeSubmit.SSPIM, nowStageStatus);

                await _repository.InsertStagesHistory(initiative, initiativeSubmit, nowStageStatus);

                await _repository.UpdateUpdatedDate_UpdatedBy(id, initiativeSubmit.UpdatedBy, nowDateTime);

                approvalNewSystemParam = await _repository.OnInitiativeApproveClick(approvalNewSystemParam, initiativeSubmit);










                //if (approvalNewSystemParam.NowStatus == "wait for create App." && approvalNewSystemParam.NowStage == "App. Request")
                //{
                //    await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, null, approvalNewSystemParam);
                //}

                ////if (tmpinitiativeSubmitStatus == "approve" && tmpinitiativeSubmitStage == "Gate3 : CAPEX-3")
                ////{
                ////    await _repositoryIF.Interface_OutGoing(id, approvalNewSystemParam.NowStatus, approvalNewSystemParam.NowStage, null, approvalNewSystemParam);
                ////}

                //if (approvalNewSystemParam.NowStatus == "wait for create" && new string[] { "Pre-DD-8", "Detail F/S-8" }.Contains(approvalNewSystemParam.NowStage))
                //{
                //    await _repositoryIF.Interface_OutGoing(id, approvalNewSystemParam.NowStatus, approvalNewSystemParam.NowStage, null, approvalNewSystemParam);
                //}

                //if (approvalNewSystemParam.NowStatus == "project planning" && new string[] { "Implementing IL2", "Implementing-1" }.Contains(approvalNewSystemParam.NowStage)) //interface for dim
                //{
                //    await _repositoryIF.Interface_OutGoing(id, approvalNewSystemParam.NowStatus, approvalNewSystemParam.NowStage, null, approvalNewSystemParam);
                //}


                //if (approvalNewSystemParam.Direction == "revise"
                //|| approvalNewSystemParam.Direction == "reject"
                //|| approvalNewSystemParam.Direction == "approve cancellation"
                //|| approvalNewSystemParam.Direction == "reject cancellation")
                //    await _repository.CallMicrosoftFlow_SendMail(id, approvalNewSystemParam.Direction);  // case 2 case 3  revise, reject  -  send mail to owner / creator

                //if (await _repository.CheckIsNextStageOwnerAction(id, approvalNewSystemParam) == true)
                //{ //send mail to owner / creator
                //    await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                //}
                //else
                //{ //send mail to approver
                //    await _repository.CallMicrosoftFlow_SendMail(id, "approve");
                //}

                await _repository.RunStoreProcedureFixValueMissing(id); //temporary solution to fix data missing!!!

                return NoContent();
            }





            InitiativeTypeSubType initiativeTypeSubType = new InitiativeTypeSubType()
            {
                InitiativeId = id,
                ProcessType = initiativeType,
                SubType = subType
            };

            if (isTypeMaxAndRequestCapex == true)
            {
                initiativeTypeSubType.ProcessType = "pimcapex";
                initiativeTypeSubType.SubType = null;
            }

            //var switchStage = isTypeMaxAndRequestCapex == true ? initiative.CapexStage : initiative.Stage;
            var switchStage = initiative.Stage;

            string tmpinitiativeSubmitStatus = initiativeSubmit.Status;
            string tmpinitiativeSubmitStage = switchStage;
            await _repository.InsertStagesHistory(initiative, initiativeSubmit);


            if (initiativeSubmit.Status == "approve")
            {
                if (initiativeSubmit.CreateType != null)
                {
                    await _repository.UpdateCreateType(id, initiativeSubmit.CreateType);
                }


                //check if admin handover dim approve
                //if (await _repository.CheckApproverPosition(id, initiativeSubmit.Username) == "admin handover")
                //{
                //    await _repository.RemoveActionBy_ByPosition(id, "admin handover", initiativeSubmit.Username, "Admin Handover");
                //    return NoContent();
                //}



                if (await _repository.CountInitiativeAction(id) > 1 && switchStage != "waiting")  //stage waiting (admin check) ให้ approve คนเดียวผ่านได้เลย
                {
                    if (initiativeType.Contains("max") && isTypeMaxAndRequestCapex == false)
                    { // approve  1 คน ให้ลบคนที่เหลือออกทั้งหมด
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TO Finance"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TO Finance", initiativeSubmit.Username);
                        }
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "CTO"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "CTO", initiativeSubmit.Username);
                        }
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TOTeam"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TOTeam", initiativeSubmit.Username);
                        }
                        //if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "CFO"))
                        //{
                        //    await _repository.RemoveActionBy_ByApproverType(id, "CFO", initiativeSubmit.Username);
                        //}
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TOFinanceIL4"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TOFinanceIL4", initiativeSubmit.Username);
                        }
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TOFinanceIL5"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TOFinanceIL5", initiativeSubmit.Username);
                        }
                    }

                    if (new string[] { "IT", "Digital" }.Contains(initiativeType))
                        if (switchStage == "admin")
                            await _repository.RemoveActionBy_ByStage(id, switchStage, initiativeSubmit.Username);

                    await _repository.RemoveInitiativeActions(id, initiativeSubmit.Username);
                    await _repository.UpdateStagesTracking_OnApprove(initiative, initiativeSubmit, initiativeTypeSubType.SubType);

                    if (isTypeMaxAndRequestCapex == true) initiative.IsRequestCapex = false;

                    if (await _repository.CountInitiativeAction(id) == 0) goto next_stage; //if no more actionby then go to next stage

                    return NoContent();
                }
            }

            next_stage:

            if (initiativeType == "pim" && switchStage == "Initiative-2" && initiative.RequestProjectEngineer != true) // pim approve go to stage - skip project en
            {
                initiativeSubmit.GoToStage = "Gate0 : Phase1-2";
            }

            if (detailinformation != null)
                if (initiativeType == "pim" && switchStage == "Gate1 : PIC Gate2" && detailinformation.SimProjectSkipGate2 == true) // pim approve go to stage - skip project en
                {
                    initiativeSubmit.GoToStage = "Gate3 : CAPEX-1";
                }

            if (initiativeSubmit.GoToStage != null && !string.IsNullOrEmpty(initiativeSubmit.GoToStage))
            {
                switchStage = initiativeSubmit.GoToStage;
            }

            int nowOrderStage = await _repository.GetOrderStage(switchStage, initiativeTypeSubType);

            if (initiativeSubmit.GoToStage != null && !string.IsNullOrEmpty(initiativeSubmit.GoToStage)) //back to selected stage    revised goto stage for pim
                nowOrderStage--;

            if (initiativeSubmit.Status == "revise" && initiativeType == "dim") //if action revise on dim  go to stage check point
            {
                nowOrderStage = await _repository.GetOrderStage_OnRevise(initiative, initiativeTypeSubType);
            }

            string nextStage = await _repository.GetNextStage(nowOrderStage, initiativeTypeSubType);
            string reviseStage = await _repository.GetReviseStage(nowOrderStage, initiativeTypeSubType);
            string nowStatus = await _repository.GetApproveStatus(initiativeTypeSubType, initiativeSubmit, nextStage);

            if (initiativeTypeSubType.ProcessType.Contains("max") && switchStage == "Gate0 : Sub-PIC Gate1")
                initiative.IsPassPimGate1 = 1;

            //if (isTypeMaxAndRequestCapex == true)
            //{
            //    if (initiativeSubmit.Status == "approve")
            //    {
            //        initiativeSubmit.Status = "approved";
            //        initiativeSubmit.Stage = "IL3";
            //        initiative.CapexStatus = "approved";
            //        initiative.CapexStage = "Budget Team";
            //    }
            //    else if (initiativeSubmit.Status == "revise")
            //    {
            //        initiativeSubmit.Status = "approved";
            //        initiativeSubmit.Stage = "IL3";
            //        initiative.CapexStatus = "revised";
            //        initiative.CapexStage = "Budget Team";
            //    }
            //}
            //else
            //{
            if (initiativeSubmit.Status == "approve")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = nextStage == null ? switchStage : nextStage;
            }
            else if (initiativeSubmit.Status == "revise")
            {
                if (initiativeTypeDIM.Contains(initiativeType) == true)
                {
                    initiativeSubmit.Status = nowStatus;
                    initiativeSubmit.Stage = "draft";
                }
                else
                {
                    initiativeSubmit.Status = nowStatus;
                    initiativeSubmit.Stage = reviseStage;
                }
            }
            else if (initiativeSubmit.Status == "reject")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = "cancelled";
            }
            else if (initiativeSubmit.Status == "approve cancellation")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = "cancelled";
            }
            else if (initiativeSubmit.Status == "reject cancellation")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = switchStage;
            }
            //}

            if (!tmpinitiativeSubmitStatus.Contains("cancellation"))
            {
                await _repository.UpdateStagesTracking_OnApprove(initiative, initiativeSubmit, initiativeTypeSubType.SubType);

                if (initiative.Stage == "Gate3 : CAPEX-3" && initiativeTypeSubType.ProcessType.Contains("pimcapex"))
                {
                    initiative.IsRequestCapex = false;
                    initiativeTypeSubType.SubType = initiative.InitiativeSubType;
                    initiativeTypeSubType.ProcessType = initiative.InitiativeType;

                    await _repository.UpdateStagesTracking_OnApprove(initiative, initiativeSubmit, initiativeTypeSubType.SubType);
                }

            }

            int? tempCreateType = initiative.CreateType;
            string tempSubmitSSIM = initiativeSubmit.SSPIM;
            string tempSSIM = initiative.SSPIM;
            _mapper.Map(initiativeSubmit, initiative);
            initiative.UpdatedDate = initiative.ApprovedDate;

            if (initiativeSubmit.CreateType == null)
            {
                initiative.CreateType = tempCreateType;
            }


            if (initiativeType == "cim")
            {
                if (tmpinitiativeSubmitStage == "Commercial Operation-1" || tmpinitiativeSubmitStage == "Closing-1")
                {
                    initiative.SSPIM = tempSSIM;
                    initiative.VPPlantOwner = initiativeSubmit.SSPIM;
                }
                else if (tmpinitiativeSubmitStage == "Commercial Operation-2" || tmpinitiativeSubmitStage == "Closing-2")
                {
                    initiative.SSPIM = tempSSIM;
                    initiative.DMPlantOwner = initiativeSubmit.SSPIM;
                }
                else if (tmpinitiativeSubmitStage == "Commercial Operation-3" || tmpinitiativeSubmitStage == "Closing-3")
                {
                    initiative.SSPIM = tempSSIM;
                    initiative.LookbackOwner = initiativeSubmit.SSPIM;
                }
                else
                {
                    if (tempSubmitSSIM != null)
                    {
                        initiative.SSPIM = tempSubmitSSIM;
                    }
                    else
                    {
                        initiative.SSPIM = tempSSIM;
                    }
                }
            }


            await _repository.Save();
            await _repository.SetActionBy(initiative.Id, initiativeSubmit.Username, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);

            if (nextStage != null)
            {
                await _repository.ChangeApproverStatusTrackingFromSetActionBy(initiative, initiativeTypeSubType);
                await _repository.ChangeApproverStatusTrackingFromSetActionBy_NOMAX(initiative, initiativeTypeSubType);
            }

            if ((tmpinitiativeSubmitStatus == "revise"
                || tmpinitiativeSubmitStatus == "reject"
                || tmpinitiativeSubmitStatus == "approve cancellation"
                || tmpinitiativeSubmitStatus == "reject cancellation"
                ) && isTypeMaxAndRequestCapex == false)
                await _repository.CallMicrosoftFlow_SendMail(id, tmpinitiativeSubmitStatus);  // case 2 case 3  revise, reject  -  send mail to owner / creator

            if (tmpinitiativeSubmitStatus == "approve")
            {
                if (new string[] { "SIL4", "SIL5" }.Contains(tmpinitiativeSubmitStage)) //Date @ change stage to IL4 , IL5 (FROM SIL4 , SIL5)
                {
                    await _repository.UpdateLastestApproved(id, tmpinitiativeSubmitStage); //SIL4 , SIL5 only
                }

                if (await _repository.CheckIsNextStageOwnerAction(id) == true)
                { //send mail to owner / creator
                    await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                }
                else
                { //send mail to approver
                    await _repository.CallMicrosoftFlow_SendMail(id, "approve");
                }

                //if (InitiativeTypeCapex.Contains(initiativeType) || initiativeTypeDIM.Contains(initiativeType)) // case capex when approve go to next approver!
                //{
                //    if (initiativeSubmit.Status == "finish")
                //    {
                //        await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                //    }
                //    else
                //    {
                //        await _repository.CallMicrosoftFlow_SendMail(id, "approve");
                //    }
                //}
                //else
                //{

                //    await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                //}
                // case 4  send mail to owner / creator after approved all
            }


            //createPDD
            //if (initiativeSubmit.Stage == "Gate1 : Phase2" || new string[] { "Pre-DD-1", "Seeking Potential-1", "Detail F/S-1", "GATE0 : PHASE1-1","IL2-1","IL3-1" }.Contains(initiativeSubmit.Stage))
            //{
            //    await _pDD.CreateFolderPDD(id);
            //}
            //if (initiativeSubmit.Status.ToUpper() == "WAIT FOR APPROVAL"
            //&& new string[] { "FIRST REVIEW-2", "IDEATE - VP", "INITIATIVE-3", "PMO", "SIL1" }.Contains(initiativeSubmit.Stage.ToUpper()))
            //{
            //    await _pDD.CreateFolderPDD(id);
            //}








            //if (tmpinitiativeSubmitStatus == "approve") //send interface only approve passed

            if (initiativeSubmit.Status == "wait for create App." && initiativeSubmit.Stage == "App. Request")
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            if (tmpinitiativeSubmitStatus == "approve" && tmpinitiativeSubmitStage == "Gate3 : CAPEX-3")
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            if (initiativeSubmit.Status == "wait for create" && new string[] { "Pre-DD-8", "Detail F/S-8" }.Contains(initiativeSubmit.Stage))
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            if (initiativeSubmit.Status == "project planning" && new string[] { "Implementing IL2", "Implementing-1" }.Contains(initiativeSubmit.Stage)) //interface for dim
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            //Send Interface for Capex -----------------------------------------------------------------
            //Interface CAPEX!!!   IF001
            //if (initiativeSubmit.Status == "wait for create App." && initiativeSubmit.Stage == "App. Request")
            //{
            //    var nowDateTime = DateTime.Now;
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //    await _repositoryIF.IF_WBS(id, nowDateTime);
            //    await _repositoryIF.IF_DAT(id, nowDateTime);
            //    await _repositoryIF.IF_POC(id, nowDateTime);
            //    await _repositoryIF.IF_PLA(id, nowDateTime);
            //}

            //Interface CAPEX!!!   IF001
            //if (initiative.CapexStatus == "approved" && initiative.CapexStage == "Budget Team")
            //{
            //    var nowDateTime = DateTime.Now;
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //    await _repositoryIF.IF_WBS(id, nowDateTime);
            //    await _repositoryIF.IF_DAT(id, nowDateTime);
            //    await _repositoryIF.IF_POC(id, nowDateTime);
            //    await _repositoryIF.IF_PLA(id, nowDateTime);
            //}

            //Interface CAPEX!!!   IF001  // CIM
            //if (initiativeSubmit.Status == "wait for create" && new string[] { "Pre-DD-8", "Detail F/S-8" }.Contains(initiativeSubmit.Stage))
            //{
            //    var nowDateTime = DateTime.Now;
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //    await _repositoryIF.IF_WBS(id, nowDateTime);
            //    await _repositoryIF.IF_DAT(id, nowDateTime);
            //    await _repositoryIF.IF_POC(id, nowDateTime);
            //    await _repositoryIF.IF_PLA(id, nowDateTime);
            //}

            await _repository.RunStoreProcedureFixValueMissing(id); //temporary solution to fix data missing!!!

            return NoContent();

        }

        [HttpPost("Action/SwitchProcess/{id}")]
        public async Task<IActionResult> InitiativeActionSwitchProcess(int id, InitiativeSubmit initiativeSubmit)
        {
            //On All Approved   
            await _repository.UpdateSubType(id);  //update subtype only first time
            var initiative = await _repository.GetInitiative(id);
            var detailinformation = await _repositoryDetail.GetDetailInformation(id);
            bool isTypeMaxAndRequestCapex = initiative.InitiativeType.Contains("max") && initiative.IsRequestCapex == true;
            var initiativeType = await _repository.GetProcessType(id);
            string[] InitiativeTypeCapex = await _repository.GetInitiativeTypeCapex();
            string[] initiativeTypeDIM = { "IT", "Digital" };
            string subType = await _repository.GetSubTypeFromInitiative(id);
            //if (initiativeType == "directCapex")
            //{
            //    //await _repository.CallMicrosoftFlow_OnApproved(id, initiativeSubmit.Status, "MSFLOW_ONALLAPPROVED");
            //}



            if (await _repository.IsNewApprovalSystemx() == true)
            {


                //NewApproval FLOW SYSTEM
                ApprovalNewSystemParam approvalNewSystemParam = new ApprovalNewSystemParam()
                {
                    ActionBy = initiativeSubmit.Username,
                    ActionType = "approve",
                    Direction = initiativeSubmit.Status, // Status for direction
                    GotoStage = initiativeSubmit.GoToStage, // stage for direction
                    Event = "switchProcess",  //เพิ่ม event
                    Process = initiativeType?.ToLower(),// process for direction
                    InitiativeId = id,
                    FlowType = await _repository.GetFlowTypeOfInitiative(id), // flowtype for direction
                    SubType = subType, //subtype for direction
                    IsUserAction = true,
                    IsFirstPassStage = true,
                    nowDateTime = initiativeSubmit.ApprovedDate == null ? DateTime.Now : initiativeSubmit.ApprovedDate.Value,
                };

                DateTime nowDateTime = approvalNewSystemParam.nowDateTime;

                if (approvalNewSystemParam.Direction == "switchProcess")
                {
                    if (initiativeSubmit.CreateType != null)
                    {
                        await _repository.UpdateCreateType(id, initiativeSubmit.CreateType);
                    }

                    await _repository.UpdateApprovedDate(id, initiativeSubmit.UpdatedBy, nowDateTime);
                }

                var nowStageStatus = await _repository.GetNowStageStatus(approvalNewSystemParam);

                //only cim
                if (approvalNewSystemParam.Process == "cim")
                {
                    await _repository.UpdateFromFieldSSPIM(id, initiativeSubmit.SSPIM, nowStageStatus);
                }

                await _repository.InsertStagesHistory(initiative, initiativeSubmit, nowStageStatus);

                await _repository.UpdateUpdatedDate_UpdatedBy(id, initiativeSubmit.UpdatedBy, nowDateTime);

                approvalNewSystemParam = await _repository.OnInitiativeApproveClick(approvalNewSystemParam, initiativeSubmit);










                //if (approvalNewSystemParam.NowStatus == "wait for create App." && approvalNewSystemParam.NowStage == "App. Request")
                //{
                //    await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, null, approvalNewSystemParam);
                //}

                ////if (tmpinitiativeSubmitStatus == "approve" && tmpinitiativeSubmitStage == "Gate3 : CAPEX-3")
                ////{
                ////    await _repositoryIF.Interface_OutGoing(id, approvalNewSystemParam.NowStatus, approvalNewSystemParam.NowStage, null, approvalNewSystemParam);
                ////}

                //if (approvalNewSystemParam.NowStatus == "wait for create" && new string[] { "Pre-DD-8", "Detail F/S-8" }.Contains(approvalNewSystemParam.NowStage))
                //{
                //    await _repositoryIF.Interface_OutGoing(id, approvalNewSystemParam.NowStatus, approvalNewSystemParam.NowStage, null, approvalNewSystemParam);
                //}

                //if (approvalNewSystemParam.NowStatus == "project planning" && new string[] { "Implementing IL2", "Implementing-1" }.Contains(approvalNewSystemParam.NowStage)) //interface for dim
                //{
                //    await _repositoryIF.Interface_OutGoing(id, approvalNewSystemParam.NowStatus, approvalNewSystemParam.NowStage, null, approvalNewSystemParam);
                //}


                //if (approvalNewSystemParam.Direction == "revise"
                //|| approvalNewSystemParam.Direction == "reject"
                //|| approvalNewSystemParam.Direction == "approve cancellation"
                //|| approvalNewSystemParam.Direction == "reject cancellation")
                //    await _repository.CallMicrosoftFlow_SendMail(id, approvalNewSystemParam.Direction);  // case 2 case 3  revise, reject  -  send mail to owner / creator

                //if (await _repository.CheckIsNextStageOwnerAction(id, approvalNewSystemParam) == true)
                //{ //send mail to owner / creator
                //    await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                //}
                //else
                //{ //send mail to approver
                //    await _repository.CallMicrosoftFlow_SendMail(id, "approve");
                //}

                await _repository.RunStoreProcedureFixValueMissing(id); //temporary solution to fix data missing!!!

                return NoContent();
            }





            InitiativeTypeSubType initiativeTypeSubType = new InitiativeTypeSubType()
            {
                InitiativeId = id,
                ProcessType = initiativeType,
                SubType = subType
            };

            if (isTypeMaxAndRequestCapex == true)
            {
                initiativeTypeSubType.ProcessType = "pimcapex";
                initiativeTypeSubType.SubType = null;
            }

            //var switchStage = isTypeMaxAndRequestCapex == true ? initiative.CapexStage : initiative.Stage;
            var switchStage = initiative.Stage;

            string tmpinitiativeSubmitStatus = initiativeSubmit.Status;
            string tmpinitiativeSubmitStage = switchStage;
            await _repository.InsertStagesHistory(initiative, initiativeSubmit);


            if (initiativeSubmit.Status == "approve")
            {
                if (initiativeSubmit.CreateType != null)
                {
                    await _repository.UpdateCreateType(id, initiativeSubmit.CreateType);
                }


                //check if admin handover dim approve
                //if (await _repository.CheckApproverPosition(id, initiativeSubmit.Username) == "admin handover")
                //{
                //    await _repository.RemoveActionBy_ByPosition(id, "admin handover", initiativeSubmit.Username, "Admin Handover");
                //    return NoContent();
                //}



                if (await _repository.CountInitiativeAction(id) > 1 && switchStage != "waiting")  //stage waiting (admin check) ให้ approve คนเดียวผ่านได้เลย
                {
                    if (initiativeType.Contains("max") && isTypeMaxAndRequestCapex == false)
                    { // approve  1 คน ให้ลบคนที่เหลือออกทั้งหมด
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TO Finance"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TO Finance", initiativeSubmit.Username);
                        }
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "CTO"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "CTO", initiativeSubmit.Username);
                        }
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TOTeam"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TOTeam", initiativeSubmit.Username);
                        }
                        //if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "CFO"))
                        //{
                        //    await _repository.RemoveActionBy_ByApproverType(id, "CFO", initiativeSubmit.Username);
                        //}
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TOFinanceIL4"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TOFinanceIL4", initiativeSubmit.Username);
                        }
                        if (await _repository.isMatchedApproverType(id, initiativeSubmit.Username, "TOFinanceIL5"))
                        {
                            await _repository.RemoveActionBy_ByApproverType(id, "TOFinanceIL5", initiativeSubmit.Username);
                        }
                    }

                    if (new string[] { "IT", "Digital" }.Contains(initiativeType))
                        if (switchStage == "admin")
                            await _repository.RemoveActionBy_ByStage(id, switchStage, initiativeSubmit.Username);

                    await _repository.RemoveInitiativeActions(id, initiativeSubmit.Username);
                    await _repository.UpdateStagesTracking_OnApprove(initiative, initiativeSubmit, initiativeTypeSubType.SubType);

                    if (isTypeMaxAndRequestCapex == true) initiative.IsRequestCapex = false;

                    if (await _repository.CountInitiativeAction(id) == 0) goto next_stage; //if no more actionby then go to next stage

                    return NoContent();
                }
            }

            next_stage:

            if (initiativeType == "pim" && switchStage == "Initiative-2" && initiative.RequestProjectEngineer != true) // pim approve go to stage - skip project en
            {
                initiativeSubmit.GoToStage = "Gate0 : Phase1-2";
            }

            if (detailinformation != null)
                if (initiativeType == "pim" && switchStage == "Gate1 : PIC Gate2" && detailinformation.SimProjectSkipGate2 == true) // pim approve go to stage - skip project en
                {
                    initiativeSubmit.GoToStage = "Gate3 : CAPEX-1";
                }

            if (initiativeSubmit.GoToStage != null && !string.IsNullOrEmpty(initiativeSubmit.GoToStage))
            {
                switchStage = initiativeSubmit.GoToStage;
            }

            int nowOrderStage = await _repository.GetOrderStage(switchStage, initiativeTypeSubType);

            if (initiativeSubmit.GoToStage != null && !string.IsNullOrEmpty(initiativeSubmit.GoToStage)) //back to selected stage    revised goto stage for pim
                nowOrderStage--;

            if (initiativeSubmit.Status == "revise" && initiativeType == "dim") //if action revise on dim  go to stage check point
            {
                nowOrderStage = await _repository.GetOrderStage_OnRevise(initiative, initiativeTypeSubType);
            }

            string nextStage = await _repository.GetNextStage(nowOrderStage, initiativeTypeSubType);
            string reviseStage = await _repository.GetReviseStage(nowOrderStage, initiativeTypeSubType);
            string nowStatus = await _repository.GetApproveStatus(initiativeTypeSubType, initiativeSubmit, nextStage);

            if (initiativeTypeSubType.ProcessType.Contains("max") && switchStage == "Gate0 : Sub-PIC Gate1")
                initiative.IsPassPimGate1 = 1;

            //if (isTypeMaxAndRequestCapex == true)
            //{
            //    if (initiativeSubmit.Status == "approve")
            //    {
            //        initiativeSubmit.Status = "approved";
            //        initiativeSubmit.Stage = "IL3";
            //        initiative.CapexStatus = "approved";
            //        initiative.CapexStage = "Budget Team";
            //    }
            //    else if (initiativeSubmit.Status == "revise")
            //    {
            //        initiativeSubmit.Status = "approved";
            //        initiativeSubmit.Stage = "IL3";
            //        initiative.CapexStatus = "revised";
            //        initiative.CapexStage = "Budget Team";
            //    }
            //}
            //else
            //{
            if (initiativeSubmit.Status == "approve")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = nextStage == null ? switchStage : nextStage;
            }
            else if (initiativeSubmit.Status == "revise")
            {
                if (initiativeTypeDIM.Contains(initiativeType) == true)
                {
                    initiativeSubmit.Status = nowStatus;
                    initiativeSubmit.Stage = "draft";
                }
                else
                {
                    initiativeSubmit.Status = nowStatus;
                    initiativeSubmit.Stage = reviseStage;
                }
            }
            else if (initiativeSubmit.Status == "reject")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = "cancelled";
            }
            else if (initiativeSubmit.Status == "approve cancellation")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = "cancelled";
            }
            else if (initiativeSubmit.Status == "reject cancellation")
            {
                initiativeSubmit.Status = nowStatus;
                initiativeSubmit.Stage = switchStage;
            }
            //}

            if (!tmpinitiativeSubmitStatus.Contains("cancellation"))
            {
                await _repository.UpdateStagesTracking_OnApprove(initiative, initiativeSubmit, initiativeTypeSubType.SubType);

                if (initiative.Stage == "Gate3 : CAPEX-3" && initiativeTypeSubType.ProcessType.Contains("pimcapex"))
                {
                    initiative.IsRequestCapex = false;
                    initiativeTypeSubType.SubType = initiative.InitiativeSubType;
                    initiativeTypeSubType.ProcessType = initiative.InitiativeType;

                    await _repository.UpdateStagesTracking_OnApprove(initiative, initiativeSubmit, initiativeTypeSubType.SubType);
                }

            }

            int? tempCreateType = initiative.CreateType;
            string tempSubmitSSIM = initiativeSubmit.SSPIM;
            string tempSSIM = initiative.SSPIM;
            _mapper.Map(initiativeSubmit, initiative);
            initiative.UpdatedDate = initiative.ApprovedDate;

            if (initiativeSubmit.CreateType == null)
            {
                initiative.CreateType = tempCreateType;
            }


            if (initiativeType == "cim")
            {
                if (tmpinitiativeSubmitStage == "Commercial Operation-1" || tmpinitiativeSubmitStage == "Closing-1")
                {
                    initiative.SSPIM = tempSSIM;
                    initiative.VPPlantOwner = initiativeSubmit.SSPIM;
                }
                else if (tmpinitiativeSubmitStage == "Commercial Operation-2" || tmpinitiativeSubmitStage == "Closing-2")
                {
                    initiative.SSPIM = tempSSIM;
                    initiative.DMPlantOwner = initiativeSubmit.SSPIM;
                }
                else if (tmpinitiativeSubmitStage == "Commercial Operation-3" || tmpinitiativeSubmitStage == "Closing-3")
                {
                    initiative.SSPIM = tempSSIM;
                    initiative.LookbackOwner = initiativeSubmit.SSPIM;
                }
                else
                {
                    if (tempSubmitSSIM != null)
                    {
                        initiative.SSPIM = tempSubmitSSIM;
                    }
                    else
                    {
                        initiative.SSPIM = tempSSIM;
                    }
                }
            }


            await _repository.Save();
            await _repository.SetActionBy(initiative.Id, initiativeSubmit.Username, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);

            if (nextStage != null)
            {
                await _repository.ChangeApproverStatusTrackingFromSetActionBy(initiative, initiativeTypeSubType);
                await _repository.ChangeApproverStatusTrackingFromSetActionBy_NOMAX(initiative, initiativeTypeSubType);
            }

            if ((tmpinitiativeSubmitStatus == "revise"
                || tmpinitiativeSubmitStatus == "reject"
                || tmpinitiativeSubmitStatus == "approve cancellation"
                || tmpinitiativeSubmitStatus == "reject cancellation"
                ) && isTypeMaxAndRequestCapex == false)
                await _repository.CallMicrosoftFlow_SendMail(id, tmpinitiativeSubmitStatus);  // case 2 case 3  revise, reject  -  send mail to owner / creator

            if (tmpinitiativeSubmitStatus == "approve")
            {
                if (new string[] { "SIL4", "SIL5" }.Contains(tmpinitiativeSubmitStage)) //Date @ change stage to IL4 , IL5 (FROM SIL4 , SIL5)
                {
                    await _repository.UpdateLastestApproved(id, tmpinitiativeSubmitStage); //SIL4 , SIL5 only
                }

                if (await _repository.CheckIsNextStageOwnerAction(id) == true)
                { //send mail to owner / creator
                    await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                }
                else
                { //send mail to approver
                    await _repository.CallMicrosoftFlow_SendMail(id, "approve");
                }

                //if (InitiativeTypeCapex.Contains(initiativeType) || initiativeTypeDIM.Contains(initiativeType)) // case capex when approve go to next approver!
                //{
                //    if (initiativeSubmit.Status == "finish")
                //    {
                //        await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                //    }
                //    else
                //    {
                //        await _repository.CallMicrosoftFlow_SendMail(id, "approve");
                //    }
                //}
                //else
                //{

                //    await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                //}
                // case 4  send mail to owner / creator after approved all
            }


            //createPDD
            //if (initiativeSubmit.Stage == "Gate1 : Phase2" || new string[] { "Pre-DD-1", "Seeking Potential-1", "Detail F/S-1", "GATE0 : PHASE1-1","IL2-1","IL3-1" }.Contains(initiativeSubmit.Stage))
            //{
            //    await _pDD.CreateFolderPDD(id);
            //}
            //if (initiativeSubmit.Status.ToUpper() == "WAIT FOR APPROVAL"
            //&& new string[] { "FIRST REVIEW-2", "IDEATE - VP", "INITIATIVE-3", "PMO", "SIL1" }.Contains(initiativeSubmit.Stage.ToUpper()))
            //{
            //    await _pDD.CreateFolderPDD(id);
            //}








            //if (tmpinitiativeSubmitStatus == "approve") //send interface only approve passed

            if (initiativeSubmit.Status == "wait for create App." && initiativeSubmit.Stage == "App. Request")
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            if (tmpinitiativeSubmitStatus == "approve" && tmpinitiativeSubmitStage == "Gate3 : CAPEX-3")
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            if (initiativeSubmit.Status == "wait for create" && new string[] { "Pre-DD-8", "Detail F/S-8" }.Contains(initiativeSubmit.Stage))
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            if (initiativeSubmit.Status == "project planning" && new string[] { "Implementing IL2", "Implementing-1" }.Contains(initiativeSubmit.Stage)) //interface for dim
            {
                await _repositoryIF.Interface_OutGoing(id, initiativeSubmit.Status, initiativeSubmit.Stage, initiativeTypeSubType);
            }

            //Send Interface for Capex -----------------------------------------------------------------
            //Interface CAPEX!!!   IF001
            //if (initiativeSubmit.Status == "wait for create App." && initiativeSubmit.Stage == "App. Request")
            //{
            //    var nowDateTime = DateTime.Now;
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //    await _repositoryIF.IF_WBS(id, nowDateTime);
            //    await _repositoryIF.IF_DAT(id, nowDateTime);
            //    await _repositoryIF.IF_POC(id, nowDateTime);
            //    await _repositoryIF.IF_PLA(id, nowDateTime);
            //}

            //Interface CAPEX!!!   IF001
            //if (initiative.CapexStatus == "approved" && initiative.CapexStage == "Budget Team")
            //{
            //    var nowDateTime = DateTime.Now;
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //    await _repositoryIF.IF_WBS(id, nowDateTime);
            //    await _repositoryIF.IF_DAT(id, nowDateTime);
            //    await _repositoryIF.IF_POC(id, nowDateTime);
            //    await _repositoryIF.IF_PLA(id, nowDateTime);
            //}

            //Interface CAPEX!!!   IF001  // CIM
            //if (initiativeSubmit.Status == "wait for create" && new string[] { "Pre-DD-8", "Detail F/S-8" }.Contains(initiativeSubmit.Stage))
            //{
            //    var nowDateTime = DateTime.Now;
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //    await _repositoryIF.CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //    await _repositoryIF.IF_WBS(id, nowDateTime);
            //    await _repositoryIF.IF_DAT(id, nowDateTime);
            //    await _repositoryIF.IF_POC(id, nowDateTime);
            //    await _repositoryIF.IF_PLA(id, nowDateTime);
            //}

            await _repository.RunStoreProcedureFixValueMissing(id); //temporary solution to fix data missing!!!

            return NoContent();

        }

        [HttpPost("SubmitStageStatus/{id}")]
        public async Task<IActionResult> InitiativeSubmitStageStatus(int id, InitiativeSubmitStageStatus initiativeSubmitStageStatus)
        {
            //call microsoft flow  to set initiative action , Stage Trackings
            //await _repository.CallMicrosoftFlow_OnSubmit(id, initiativeSubmitStageStatus.Status, "MSFLOW_ONSUBMIT");
            await _repository.UpdateInitiativeTypeFromFlag(id);
            await _repository.UpdateSubType(id); //update subtype only first time
            var initiative = await _repository.GetInitiative(id);
            string statusDirection = initiativeSubmitStageStatus.Status;
            string[] InitiativeTypeCapex = await _repository.GetInitiativeTypeCapex();
            string[] initiativeTypeDIM = { "IT", "Digital", "dim" };

            bool isTypeMaxAndRequestCapex = initiative.InitiativeType.Contains("max") && initiative.IsRequestCapex == true;


            var subType = await _repository.GetSubTypeFromInitiative(id);
            var initiativeType = await _repository.GetProcessType(id);


            // close interface for upgrade  23-07-2021
            // 3 IFs
            //await _repositoryIF.ActulaPOCPercentUpdateToSAP2(id);
            //await _repositoryIF.ProjectManagerUpdateToSAP(id);
            //await _repositoryIF.ProgressOfCompletionFromSAP(id);


            if (await _repository.IsNewApprovalSystemx() == true)
            {
                //if (initiativeSubmitStageStatus.Username == null)
                //    initiativeSubmitStageStatus.Username = "thammatad.a@frontiscompany.com";

                await _repository.UpdateCancelledComment(id, initiativeSubmitStageStatus);

                ApprovalNewSystemParam approvalNewSystemParam = new ApprovalNewSystemParam()
                {
                    ActionBy = initiativeSubmitStageStatus.Username,
                    ActionType = "submit",
                    Direction = initiativeSubmitStageStatus.Status,
                    GotoStage = "",
                    Event = await _repository.GetEventOfInitiative(id),
                    Process = initiative.InitiativeType?.ToLower(),
                    InitiativeId = id,
                    FlowType = await _repository.GetFlowTypeOfInitiative(id),
                    //SubType = subType,
                    SubType = subType,
                    IsUserAction = true,
                    IsFirstPassStage = true,
                    nowDateTime = DateTime.Now,
                };

                ////update Process in initiativaStageDetail  only initiativeType = IT and Digital 
                //if((approvalNewSystemParam.Process.ToUpper().Equals("IT") || approvalNewSystemParam.Process.ToUpper().Equals("DIGITAL")) && approvalNewSystemParam.NowStatus.Equals("revised"))
                //{
                //    await _repository.UpdateIntiativeStageDetail(id, initiative.InitiativeType?.ToLower());
                //}
                if(approvalNewSystemParam.Process == "max")
                {
                    await _repository.CheckPermissionAndInsertAction(approvalNewSystemParam);
                }


                //NewApproval FLOW SYSTEM
                approvalNewSystemParam = await _repository.OnInitiativeSubmitClick(approvalNewSystemParam, initiativeSubmitStageStatus);

                await _repository.UpdateUpdatedDate_UpdatedBy(id, initiativeSubmitStageStatus.Username, approvalNewSystemParam.nowDateTime);

                await _repository.UpdateLastSubmittedDate(id, approvalNewSystemParam.nowDateTime);




                return NoContent();
            }



            InitiativeTypeSubType initiativeTypeSubType = new InitiativeTypeSubType()
            {
                InitiativeId = id,
                ProcessType = initiativeType,
                SubType = subType
            };


            // Strategy Submit loop
            if (initiativeSubmitStageStatus.Status == "updateprogress")
            {
                // update status only
                initiative.Status = "update progress";
                initiative.LastSubmittedDate = DateTime.Now;
                await _repository.Save();
                return NoContent();
            }

            //if (InitiativeType.Contains("directCapex"))
            //{
            //    await _repository.CallMicrosoftFlow_OnSubmit(id, initiativeSubmitStageStatus.Status, "MSFLOW_ONSUBMIT");
            //}


            if (isTypeMaxAndRequestCapex == true)
            {
                initiativeTypeSubType.ProcessType = "pimcapex";
                initiativeTypeSubType.SubType = null;
                if (initiative.Stage == "IL3" || initiative.Stage == "IL3-2")
                {
                    await _repository.AddStagesPimCapex(initiative, initiativeTypeSubType);
                }
            }

            int nowOrderStage = await _repository.GetOrderStage(initiative.Stage, initiativeTypeSubType);

            //string adminHandoverStage = "Admin Handover";
            //bool isAdminHandOver = false;
            //if (initiative.Stage == "Adopt IL3" || initiative.Stage == "Adopt")
            //{
            //    isAdminHandOver = true;
            //    nowOrderStage++;
            //}  //if dim stage adopt then go next of adminhandover stage
            if (InitiativeTypeCapex.Contains(initiativeTypeSubType.ProcessType) == true && nowOrderStage > 0) nowOrderStage--;  //case directcapex submit after revised change only status
            if (initiativeTypeSubType.ProcessType.ToLower() == "cim" && nowOrderStage > 0) nowOrderStage--;  //case directcapex submit after revised change only status
            if (initiativeTypeSubType.ProcessType.ToLower() == "strategy" && nowOrderStage > 0) nowOrderStage--;  //case directcapex submit after revised change only status
            if (initiativeTypeSubType.ProcessType.ToLower() == "cpi" && initiative.Status == "revised" && nowOrderStage > 0) nowOrderStage--;
            if (initiativeTypeSubType.ProcessType.ToLower() == "pim" && initiative.Status == "revised" && nowOrderStage > 0) nowOrderStage--;
            if (initiativeTypeSubType.ProcessType.ToLower() == "dim" && initiative.Status == "revised" && nowOrderStage <= 4) nowOrderStage--; // stage NOT action by owner then revised on now stage
            if (initiativeTypeSubType.ProcessType.ToLower() == "pimcapex" && initiative.Status == "revised" && nowOrderStage > 0) nowOrderStage--; // max capex revise

            string forwardStage = await _repository.GetSubmitNextStage(nowOrderStage, initiativeTypeSubType);
            string backwardStage = await _repository.GetReviseStage(nowOrderStage, initiativeTypeSubType);
            string nextStatus = await _repository.GetSubmitNextStatus(initiativeTypeSubType, initiativeSubmitStageStatus, initiative.Stage);

            //if (initiativeTypeSubType.ProcessType.Contains("max"))
            //{
            //    List<InitiativeStageStatus> nextStagesStatuses = await _consumeAPI.GetDataFromApi<InitiativeStageStatus>("GetNextStageMax", new InitiativeStage() { Stage = initiative.Stage });
            //    if (nextStagesStatuses.Count > 0)
            //    {
            //        forwardStage = nextStagesStatuses[0].Stage;
            //        nextStatus = nextStagesStatuses[0].Status;
            //    }
            //}           

            //if (isTypeMaxAndRequestCapex == true)
            //{
            //    if (initiative.Stage == "IL3" || initiative.Stage == "IL3-2")
            //    {
            //        await _repository.AddStagesPimCapex(initiative, initiativeTypeSubType);
            //    }
            //    //initiative.CapexStage = "Budget Team";
            //    //initiative.CapexStatus = "wait for review";
            //    //initiativeSubmitStageStatus.Stage = initiative.Stage;
            //    //initiativeSubmitStageStatus.Status = "wait for review";
            //}
            //else
            //{
            if (initiative.Stage == null || initiative.Stage == "draft")
            {
                string firstStageApprover = await _repository.GetFirstStageApprover(initiativeTypeSubType);
                if (initiativeType.Contains("max"))
                {
                    //initiativeSubmitStageStatus.Status = "admin check";
                    //initiativeSubmitStageStatus.Stage = "waiting";
                    initiativeSubmitStageStatus.Status = "draft";
                    initiativeSubmitStageStatus.Stage = "IL0";
                }
                else if (initiativeType.Contains("dim"))
                {
                    initiativeSubmitStageStatus.Status = nextStatus;
                    initiativeSubmitStageStatus.Stage = forwardStage;
                }
                else
                {
                    initiativeSubmitStageStatus.Status = "wait for approval";
                    initiativeSubmitStageStatus.Stage = firstStageApprover;
                }

                await _repository.CreateStagesTracking(initiative, initiativeTypeSubType);

            }
            else if (initiativeSubmitStageStatus.Status == "forward")
            {
                initiativeSubmitStageStatus.Status = nextStatus;
                initiativeSubmitStageStatus.Stage = forwardStage;
            }
            else if (initiativeSubmitStageStatus.Status == "backward")
            {
                initiativeSubmitStageStatus.Status = nextStatus;
                initiativeSubmitStageStatus.Stage = backwardStage;
            }
            else if (initiativeSubmitStageStatus.Status == "cancelled")
            {
                initiativeSubmitStageStatus.Status = nextStatus;
                initiativeSubmitStageStatus.Stage = "cancelled";

                if (initiative.InitiativeType.Contains("max") == true || initiative.InitiativeType == "strategy" || initiative.InitiativeType == "pim")
                    initiativeSubmitStageStatus.Stage = initiative.Stage;
            }
            //}

            //create All Stage Statuses
            if (initiativeSubmitStageStatus.Stage != null || initiativeSubmitStageStatus.Status == "cancelled" || initiativeSubmitStageStatus.Status == "wait for cancellation")
            {
                await _repository.UpdateStagesTracking_OnSubmit(initiative, initiativeSubmitStageStatus, statusDirection, initiativeTypeSubType);
                var SubmitStageStatus = _mapper.Map(initiativeSubmitStageStatus, initiative);
                DateTime dateTime = DateTime.Now;

                if (new string[] { "SIL4", "SIL5" }.Contains(initiativeSubmitStageStatus.Stage))
                { //Date @ change stage to IL4 , IL5
                    await _repository.UpdateLastestSubmittedSIL(id, initiativeSubmitStageStatus.Stage, dateTime);
                }
                SubmitStageStatus.LastSubmittedDate = dateTime;
                // _repository.Update(SubmitStageStatus);
                await _repository.Save();

                //if (isTypeMaxAndRequestCapex == true)
                //{
                //    await _repository.SetActionBy(initiative.Id, initiativeSubmitStageStatus.Username, initiative.CapexStatus, initiative.CapexStage, initiativeTypeSubType);
                //}
                //else
                //{
                await _repository.SetActionBy(initiative.Id, initiativeSubmitStageStatus.Username, initiativeSubmitStageStatus.Status, initiativeSubmitStageStatus.Stage, initiativeTypeSubType);
                //}
                await _repository.ChangeApproverStatusTrackingFromSetActionBy(initiative, initiativeTypeSubType);

                //var tmpNowStage = initiative.Stage;
                //if (isAdminHandOver == true)
                //{
                //    initiative.Stage = adminHandoverStage; // change status admin handover to in progress and update actionby
                //    await _repository.ChangeApproverStatusTrackingFromSetActionBy_NOMAX(initiative, initiativeTypeSubType);
                //    initiative.Stage = tmpNowStage;
                //    await _repository.Save();
                //}
                await _repository.ChangeApproverStatusTrackingFromSetActionBy_NOMAX(initiative, initiativeTypeSubType);


                string[] allStatusesForApproval = { "wait for review", "wait for create App.", "wait for create WBS", "wait for approval", "admin check" };

                if (await _repository.CheckIsNextStageOwnerAction(id) == true)
                { //send mail to owner / creator
                    await _repository.CallMicrosoftFlow_SendMail(id, "owner");
                }
                else
                { //send mail to approver
                    if (initiativeSubmitStageStatus.Status == "wait for cancellation")
                    {
                        await _repository.CallMicrosoftFlow_SendMail(id, "wait for cancellation"); // case 7 - send mail to to team
                    }
                    else
                    {
                        await _repository.CallMicrosoftFlow_SendMail(id, "approve");  // case 1 - send mail to approvers
                    }
                }

                //if (allStatusesForApproval.Contains(initiativeSubmitStageStatus.Status) && isTypeMaxAndRequestCapex == false)
                //{
                //    // send to microsoft flow if stage need approve
                //    await _repository.CallMicrosoftFlow_SendMail(id, "approve");  // case 1 - send mail to approvers
                //}
                //else if (initiativeSubmitStageStatus.Status == "wait for cancellation" && isTypeMaxAndRequestCapex == false)
                //{
                //    await _repository.CallMicrosoftFlow_SendMail(id, "wait for cancellation"); // case 7 - send mail to to team
                //}
            }

            await _repository.RunStoreProcedureFixValueMissing(id); //temporary solution to fix data missing!!!

            return NoContent();
        }

        [HttpPost("CheckApprove/{id}")]
        public async Task<IActionResult> CheckApprove(int id, CheckApprove CheckApprove)
        {
            var approve = await _repository.CheckApprove(id, CheckApprove.ActionBy);
            return Ok(approve);
        }

        [HttpPost("CheckSubmitTo")]
        public bool CheckSubmitTo(CheckSubmitTo CheckSubmitTo)
        {
            string[] status = { "wait for submission", "revised", "draft", "approved", "wait for review", "wait for create App.", "wait for create WBS", "", "draft", "update progress", "wait for approval" };
            string[] stage = { "IL0", "IL1", "IL2", "IL3", "IL4", "IL5", "DM", "VP", "EVP/MD/SEVP/COE/PSD/CEO", "Budget Team", "BOD", "App. Request", "WBS Request", "Initiative-1", "SIL1", "SIL2", "SIL3", "SIL4", "SIL5" };
            if (status.Contains(CheckSubmitTo.Status) && stage.Contains(CheckSubmitTo.Stage)) return true;
            return false;
        }

        [HttpPost("CheckSubmitToInformation")]
        public bool CheckSubmitToInformation(CheckSubmitTo CheckSubmitTo)
        {
            string[] status = { "wait for approval", "wait for review", "wait for create App.", "wait for create WBS" };
            if (status.Contains(CheckSubmitTo.Status)) return true;
            return false;
        }

        [HttpPost("CheckApproveInformation")]
        public bool CheckApproveInformation(CheckSubmitTo CheckSubmitTo)
        {
            string[] status = { "wait for approval", "revised", "draft", "wait for submission", "approved", "wait for review", "wait for create App.", "wait for create WBS", "wait for cancellation" };
            string[] stage = { "SIL1", "SIL2", "SIL3", "SIL4", "SIL5", "IL0", "IL1", "IL2", "IL3", "IL4", "IL5", "DM", "VP", "EVP/MD/SEVP/COE/PSD/CEO", "Budget Team", "BOD", "App. Request", "WBS Request" };
            if (status.Contains(CheckSubmitTo.Status) && stage.Contains(CheckSubmitTo.Stage)) return true;
            return false;
        }

        [HttpPost("CheckApproveInitiative")]
        public bool CheckApproveInitiative(CheckSubmitTo CheckSubmitTo)
        {
            string[] status = { "wait for submission", "revised", "rejected", "wait for approval", "approved", "cancelled", "reject", "wait for review", "wait for create App.", "wait for create WBS", "wait for cancellation" };
            string[] stage = { "reject", "cancelled", "IL0", "IL1", "IL2", "IL3", "IL4", "IL5", "SIL1", "SIL2", "SIL3", "SIL4", "SIL5", "DM", "VP", "EVP/MD/SEVP/COE/PSD/CEO", "Budget Team", "BOD", "App. Request", "WBS Request" };
            if (status.Contains(CheckSubmitTo.Status) && stage.Contains(CheckSubmitTo.Stage)) return true;
            return false;
        }

        [HttpPost("CheckInitiativeDetail")]
        public bool CheckInitiativeDetail(CheckSubmitTo CheckSubmitTo)
        {
            string[] status = { "draft", "wait for submission", "revised", "rejected", "wait for approval", "approved", "cancelled", "reject", "wait for review", "wait for create App.", "wait for create WBS", "wait for cancellation" };
            string[] stage = { "draft", "reject", "cancelled", "IL0", "IL1", "IL2", "IL3", "IL4", "IL5", "SIL1", "SIL2", "SIL3", "SIL4", "SIL5", "DM", "VP", "EVP/MD/SEVP/COE/PSD/CEO", "Budget Team", "BOD", "App. Request", "WBS Request", "IL3-1", "IL3-2", "Gate0 : VAC Gate1", "Gate0 : Sub-PIC Gate1", "Gate2 : VAC Gate3", "Gate2 : PIC Gate3", "Gate3 : CAPEX-1", "Gate3 : CAPEX-2", "Gate3 : CAPEX-3" };
            if (status.Contains(CheckSubmitTo.Status) && stage.Contains(CheckSubmitTo.Stage)) return true;
            return false;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInitiative(int id)
        {
            var initiativesData = await _repository.GetInitiative(id);
            var initiative = _mapper.Map<InitiativeGeneral>(initiativesData);
            initiative.FlowType = await _repository.GetFlowTypeOfInitiative(id);          
            ApprovalNewSystemParam approvalNewSystemParam = new ApprovalNewSystemParam()
            {
                InitiativeId = id,
                FlowType = initiative.FlowType,
            };

            approvalNewSystemParam = await _repository.GetNowStageStatus(approvalNewSystemParam);
            initiative.Stage = approvalNewSystemParam.NowStage;
            initiative.Status = approvalNewSystemParam.NowStatus;
            initiative.SubStage = approvalNewSystemParam.NowStage;

            return Ok(initiative);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInitiative(int id)
        {
            var initiative = await _repository.GetInitiative(id);
            initiative.Status = "cancelled";
            initiative.Stage = "cancelled";
            _repository.Update(initiative);
            await _repository.Save();
            return NoContent();
        }

        [HttpGet("last")]
        public async Task<IActionResult> GetLastInitiative()
        {
            int id = await _repository.LastIdInitiative();
            return Ok(id);
        }

        [HttpGet("SuggestStatus/{id}")]
        public async Task<IActionResult> InitiativeSuggestStatus(int id)
        {
            var initiativesData = await _repository.GetInitiative(id);
            var initiative = _mapper.Map<InitiativeSuggestStatus>(initiativesData);
            return Ok(initiative);
        }

        [HttpGet("Information/{id}")]
        public async Task<IActionResult> InitiativeInformation(int id)
        {
            var initiativesData = await _repository.GetInitiative(id);
            var initiative = _mapper.Map<InitiativeInformation>(initiativesData);
            return Ok(initiative);
        }

        [HttpGet("Detail/{id}")]
        public async Task<IActionResult> GetInitiativeDetail(int id)
        {
            var initiativesData = await _repository.GetInitiative(id);
            var initiative = _mapper.Map<InitiativeProgress>(initiativesData);
            return Ok(initiative);
        }

        [HttpPost("MyTask/InProgress")]
        public async Task<IActionResult> MyTaskInProgress(MyInitiative MyInitiative)
        {
            return Ok(await _repository.MyTaskInProgress(MyInitiative));
        }

        [HttpPost("MyTask/NotStarted")]
        public async Task<IActionResult> MyTaskNotStarted(MyInitiative MyInitiative)
        {
            return Ok(await _repository.MyTaskNotStarted(MyInitiative));
        }

        [HttpPost("MyInitiative/Draft")]
        public async Task<IActionResult> MyInitiativeDraft(MyInitiative MyInitiative)
        {
            return Ok(await _repository.MyInitiativeDraft(MyInitiative));
        }

        [HttpPost("MyInitiative/InProgress")]
        public async Task<IActionResult> MyInitiativeInProgress(MyInitiative MyInitiative)
        {
            return Ok(await _repository.MyInitiativeInProgress(MyInitiative));
        }

        [HttpPost("MyInitiative/Completed")]
        public async Task<IActionResult> MyInitiativeCompleted(MyInitiative MyInitiative)
        {
            return Ok(await _repository.MyInitiativeCompleted(MyInitiative));
        }

        [HttpPost("MyInitiative/Canceled")]
        public async Task<IActionResult> MyInitiativeCanceled(MyInitiative MyInitiative)
        {
            return Ok(await _repository.MyInitiativeCanceled(MyInitiative));
        }

        [HttpPost("Detail/{id}")]
        public async Task<IActionResult> CreateInitiativeDetail(int id, [FromBody] InitiativeCreateDetail initiativeCreateDetail)
        {
            // await _repository.InitiativeDetailDelete(id);
            initiativeCreateDetail.InitiativeId = id;
            var CreateDetail = _mapper.Map<InitiativeDetail>(initiativeCreateDetail);
            _repository.Add(CreateDetail);
            await _repository.Save();
            return Ok(CreateDetail);
        }

        [HttpPut("Detail/{id}")]
        public async Task<IActionResult> UpdateInitiativeDetail(int id, [FromBody] InitiativeCreateDetail initiativeUpdateDetail)
        {
            initiativeUpdateDetail.InitiativeId = id;
            var UpdateDetail = _mapper.Map<InitiativeDetail>(initiativeUpdateDetail);
            _repository.Update(UpdateDetail);
            await _repository.Save();
            return Ok(UpdateDetail);
        }

        [HttpPost("CoDeveloper/{id}")]
        public async Task<ActionResult<Initiative>> CreateInitiativeCoDeveloper(int id, [FromBody] string[] coDevelopers)
        {
            var coDeveloper = await _repository.InitiativeCoDeveloperCreate(id, coDevelopers);
            return Ok(coDevelopers);
        }

        [HttpPut("CoDeveloper/{id}")]
        public async Task<ActionResult<Initiative>> UpdateInitiativeCoDeveloper(int id, [FromBody] string[] coDevelopers)
        {
            await _repository.InitiativeCoDeveloperDelete(id);
            await _repository.InitiativeCoDeveloperCreate(id, coDevelopers);
            return NoContent();
        }

        [HttpDelete("CoDeveloper/{id}")]
        public async Task<ActionResult<Initiative>> DeleteInitiativeCoDeveloper(int id)
        {
            await _repository.InitiativeCoDeveloperDelete(id);
            return NoContent();
        }

        [HttpGet("Attachment/{id}")]
        public async Task<IActionResult> GetInitiativeAttachment(int id)
        {
            //var initiativesData = await _repository.GetInitiative(id);
            //var initiative = _mapper.Map<InitiativeAttachment>(initiativesData);
            AttechmentCategory attechmentCategory = new AttechmentCategory()
            {
                CategoryId = null,
                CategoryType = null
            };
            var initiativeFile = await _repository.GetCategoryAttachment(id, attechmentCategory);
            return Ok(initiativeFile);
        }

        [HttpPost("Attachment/Category/{id}")]
        public async Task<IActionResult> GetCategoryAttachment(int id, AttechmentCategory attechmentCategory)
        {
            //var initiativesData = await _repository.GetInitiative(id);

            //var initiative = _mapper.Map<InitiativeAttachment>(initiativesData);
            var initiativeFile = await _repository.GetCategoryAttachment(id, attechmentCategory);
            return Ok(initiativeFile);
        }

        [HttpPost("Attachment/{id}")]
        public async Task<ActionResult> CreateAttachment(int id, [FromForm] InitiativeCreateAttachment initiative)
        {
            var initiativesData = await _repository.GetInitiative(id);
            var containerCode = _mapper.Map<InitiativeGeneral>(initiativesData).InitiativeCode.ToLower().ToString();
            // containerCode = containerCode.Substring(0, 6) + "-" + containerCode.Substring(7, 4);
            //if (containerCode.Substring(6, 1) == "/")
            //{
            //    containerCode = containerCode.Substring(0, 6) + "-" + containerCode.Substring(7, 4);
            //}
            containerCode = await InitaitiveCodeToContainerBlob(containerCode);

            if (initiative.File.Length > 0)
            {
                var attachment = await _repository.InitiativeAttachmentCreate(id, initiative);
                var getAttachment = await _repository.GetAttachment(id);
                await UploadToBlob(_blobConfig.Value.PrefixContainer + containerCode, attachment.FileName, null, initiative.File.OpenReadStream());  //upload to Blob
                return Ok(attachment);
            }
            return NoContent();
        }

        [HttpPost("Attachment/{id}/{categoryId}/{categoryType}")]
        public async Task<ActionResult> CreateCategoryAttachment(int id, int categoryId, string categoryType, [FromForm] InitiativeCreateAttachment initiative)
        {
            AttechmentCategory attechmentCategory = new AttechmentCategory()
            {
                CategoryId = categoryId,
                CategoryType = categoryType
            };
            var initiativesData = await _repository.GetInitiative(id);
            var containerCode = _mapper.Map<InitiativeGeneral>(initiativesData).InitiativeCode.ToLower().ToString();
            // containerCode = containerCode.Substring(0, 6) + "-" + containerCode.Substring(7, 4);
            //if (containerCode.Substring(6, 1) == "/")
            //{
            //    containerCode = containerCode.Substring(0, 6) + "-" + containerCode.Substring(7, 4);
            //}
            containerCode = await InitaitiveCodeToContainerBlob(containerCode);

            if (initiative.File.Length > 0)
            {
                var attachment = await _repository.CategoryAttachmentCreate(id, initiative, attechmentCategory);
                var getAttachment = await _repository.GetAttachment(id);
                await UploadToBlob(_blobConfig.Value.PrefixContainer + containerCode, attachment.FileName, null, initiative.File.OpenReadStream());  //upload to Blob
                return Ok(attachment);
            }
            return NoContent();
        }

        [HttpDelete("Attachment/{id}")]
        public async Task<ActionResult> DeleteAttachment(int id)
        {
            var attachment = await _repository.GetAttachment(id);
            _repository.Delete(attachment);
            await _repository.Save();
            var initiativesData = await _repository.GetInitiative(attachment.InitiativeId);
            var containerCode = _mapper.Map<InitiativeGeneral>(initiativesData).InitiativeCode.ToLower().ToString();

            await InitaitiveCodeToContainerBlob(containerCode);

            //if (containerCode.Substring(6, 1) == "/")
            //{
            //    containerCode = containerCode.Substring(0, 6) + "-" + containerCode.Substring(7, 4);
            //}
            try
            {
                if (CloudStorageAccount.TryParse(_blobConfig.Value.StorageConnection, out CloudStorageAccount storageAccount))
                {
                    CloudBlobClient BlobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = BlobClient.GetContainerReference(_blobConfig.Value.PrefixContainer + containerCode);
                    if (await container.ExistsAsync())
                    {
                        CloudBlob file = container.GetBlobReference(attachment.FileName);  //File Name

                        if (await file.ExistsAsync())
                        {
                            await file.DeleteAsync();
                        }
                    }
                }
            }
            catch { }
            return Ok();
        }

        [HttpPost("Product/{id}")]
        public async Task<ActionResult> CreateInitiativeProduct(int id, InitiativeCreateProduct initiativeCreateProduct)
        {
            var ProductsData = await _repository.CreateInitiativeProduct(id, initiativeCreateProduct);
            return StatusCode(201);
        }

        [HttpPost("Milestone/{id}")]
        public async Task<ActionResult> CreateInitiativeMilestone(int id, InitiativeCreateMilestone initiativeCreateMilestone)
        {
            var Milestones = await _repository.CreateInitiativeMilestone(id, initiativeCreateMilestone);
            return Ok(Milestones);
        }

        [HttpPost("ProgressAndMilestone/{id}")]
        public async Task<ActionResult> CreateInitiativeProgressAndMilestone(int id, InitiativeProgressAndMilestone initiativeProgressAndMilestone)
        {
            var ProgressAndMilestones = await _repository.CreateInitiativeProgressAndMilestone(id, initiativeProgressAndMilestone);
            return Ok(ProgressAndMilestones);
        }

        [HttpPost("FinancialIndicator/{id}")]
        public async Task<ActionResult> CreateFinancialIndicator(int id, InitiativeCreateFinancialIndicator initiativeFinancialIndicator)
        {
            var FinancialIndicator = await _repository.CreateFinancialIndicator(id, initiativeFinancialIndicator);
            return Ok(FinancialIndicator);
        }

        [HttpPost("Financial/{id}")]
        public async Task<ActionResult> CreateFinancial(int id, InitiativeCreateFinancial initiativeCreateFinancial)
        {
            await _repository.InitiativeFinancialDelete(id);
            initiativeCreateFinancial.InitiativeId = id;
            var CreateFinancial = _mapper.Map<Financial>(initiativeCreateFinancial);
            CreateFinancial.Id = 0;
            _repository.Add(CreateFinancial);
            await _repository.Save();
            return Ok(CreateFinancial);
        }

        [HttpGet("KpiDetail/{id}")]
        public async Task<IActionResult> GetKpiDetail(int id)
        {
            var initiativesData = await _repository.GetInitiative(id);
            var initiative = _mapper.Map<InitiativeKpi>(initiativesData);
            return Ok(initiative);
        }

        [HttpGet("ShareBenefitWorkstream/{id}")]
        public async Task<IActionResult> GetShareBenefitWorkstream(int id)
        {
            var initiativesData = await _repository.GetInitiative(id);
            var initiative = _mapper.Map<InitiativeShareBenefitWorkstream>(initiativesData);
            return Ok(initiative);
        }

        [HttpGet("DetailInformation/{id}")]
        public async Task<IActionResult> DetailInformation(int id)
        {
            var initiativesData = await _repository.GetInitiative(id);
            var initiative = _mapper.Map<InitiativeDetailInformation>(initiativesData);
            return Ok(initiative);
        }

        [HttpGet("ProgressAndMilestone/{id}")]
        public async Task<IActionResult> ProgressAndMilestone(int id)
        {
            var initiativesData = await _repository.GetInitiative(id);
            var initiative = _mapper.Map<InitiativeProgressAndMilestone>(initiativesData);
            return Ok(initiative);
        }

        [HttpPost("ImpactExcel")]
        public async Task<ActionResult> ImpactExcel([FromForm] ImpactExcel impact)
        {
            await UploadToBlob("00-impacts-to-update", "impactExcel.xlsx");
            await UploadToBlob("00-impacts-to-update", "impactExcel.xlsx", null, impact.File.OpenReadStream());

            // Sync to SQL Table : KriMitigations ( For Test )
            await _repository.SyncExcelToImpact(impact);

            return Ok(impact);
        }

        [HttpGet("DownloadImpactExcel")]
        public async Task<IActionResult> DownloadFromBlob()
        {
            MemoryStream ms = new MemoryStream();
            if (CloudStorageAccount.TryParse(_blobConfig.Value.StorageConnection, out CloudStorageAccount storageAccount))
            {
                CloudBlobClient BlobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = BlobClient.GetContainerReference("00-impacts-to-update");

                if (await container.ExistsAsync())
                {
                    CloudBlob file = container.GetBlobReference("impactExcel.xlsx");
                    if (await file.ExistsAsync())
                    {
                        await file.DownloadToStreamAsync(ms);
                        Stream blobStream = file.OpenReadAsync().Result;
                        return File(blobStream, file.Properties.ContentType, file.Name);
                    }
                    else
                    {
                        return Content("File does not exist");
                    }
                }
                else
                {
                    return Content("Container does not exist");
                }
            }
            else
            {
                return Content("Error opening storage");
            }
        }

        [HttpGet("DownloadBlob/{id}/{fileName}")]
        public async Task<IActionResult> DownloadFromBlob(int id, string fileName)
        {
            fileName = fileName.Replace(@"%u", @"\u");
            fileName = Uri.UnescapeDataString(fileName);
            fileName = Regex.Unescape(fileName);
            var initiativesData = await _repository.GetInitiative(id);
            var containerCode = _mapper.Map<InitiativeGeneral>(initiativesData).InitiativeCode.ToString().ToLower();
            // containerCode = containerCode.Substring(0, 6) + "-" + containerCode.Substring(7, 4);

            containerCode = await InitaitiveCodeToContainerBlob(containerCode);

            //if (containerCode.Substring(6, 1) == "/")
            //{
            //    containerCode = containerCode.Substring(0, 6) + "-" + containerCode.Substring(7, 4);
            //}
            MemoryStream ms = new MemoryStream();
            if (CloudStorageAccount.TryParse(_blobConfig.Value.StorageConnection, out CloudStorageAccount storageAccount))
            {
                CloudBlobClient BlobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = BlobClient.GetContainerReference(_blobConfig.Value.PrefixContainer + containerCode);

                if (await container.ExistsAsync())
                {
                    CloudBlob file = container.GetBlobReference(fileName);
                    if (await file.ExistsAsync())
                    {
                        await file.DownloadToStreamAsync(ms);
                        Stream blobStream = file.OpenReadAsync().Result;
                        return File(blobStream, file.Properties.ContentType, file.Name);
                    }
                    else
                    {
                        return Content("File does not exist");
                    }
                }
                else
                {
                    return Content("Container does not exist");
                }
            }
            else
            {
                return Content("Error opening storage");
            }
        }

        [HttpGet("DownloadTrainingMaterial/{fileName}")]
        public IActionResult GetDownloadTrainingMaterial(string fileName)
        {
            if (fileName != null && fileName != "")
            {
                var filePath = _hostingEnvironment.ContentRootPath + @"/TrainingMaterial/" + fileName + ".pdf";
                var net = new System.Net.WebClient();
                var data = net.DownloadData(filePath);
                var content = new System.IO.MemoryStream(data);
                var contentType = "APPLICATION/octet-stream";
                return File(content, contentType, fileName + ".pdf");
            }
            else
            {
                return Content("File does not exist");
            }

        }

        private async Task<(bool, string)> UploadToBlob(string container, string filename, byte[] imageBuffer = null, Stream stream = null)
        {
            CloudStorageAccount storageAccount = null;
            CloudBlobContainer cloudBlobContainer = null;
            if (CloudStorageAccount.TryParse(_blobConfig.Value.StorageConnection, out storageAccount))
            {
                try
                {
                    CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();
                    cloudBlobContainer = cloudBlobClient.GetContainerReference(container);
                    await cloudBlobContainer.CreateIfNotExistsAsync();
                    BlobContainerPermissions permissions = new BlobContainerPermissions
                    {
                        PublicAccess = BlobContainerPublicAccessType.Blob
                    };
                    await cloudBlobContainer.SetPermissionsAsync(permissions);

                    CloudBlockBlob cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(filename);

                    if (imageBuffer != null)
                    {
                        await cloudBlockBlob.UploadFromByteArrayAsync(imageBuffer, 0, imageBuffer.Length);
                    }
                    else if (stream != null)
                    {
                        await cloudBlockBlob.UploadFromStreamAsync(stream);
                    }
                    else
                    {
                        return (false, null);
                    }

                    return (true, cloudBlockBlob.SnapshotQualifiedStorageUri.PrimaryUri.ToString());
                }
                catch (StorageException)
                {
                    return (false, null);
                }
                finally
                {
                    // OPTIONAL: Clean up resources, e.g. blob container
                    //if (cloudBlobContainer != null)
                    //{
                    //    await cloudBlobContainer.DeleteIfExistsAsync();
                    //}
                }
            }
            else
            {
                return (false, null);
            }

        }

        [HttpGet("getLastestUpdate/{id}")]
        public async Task<IActionResult> GetLastestUpdate(int id)
        {
            var initiativesData = await _repository.GetLastestUpdate(id);
            return Ok(initiativesData);
        }

        [HttpGet("getUserCompany")]
        public async Task<IActionResult> GetUserCompany([FromQuery] string email)
        {
            var getUserCompany = await _repository.GetUserCompany(email);
            return Ok(new { company = getUserCompany });
        }

        [HttpPut("SetRequestCapex/{id}")]
        public async Task<IActionResult> SetRequestCapex(int id)
        {
            // return Ok(await _repository.MyTaskInProgress(MyInitiative));
            return Ok(await _repository.SetRequestCapex(id));
        }

        [HttpGet("GetInitiativeActionStatusFromActionBy/{id}")]
        public async Task<IActionResult> GetInitiativeActionStatusFromActionBy(int id)
        {
            return Ok(await _repository.GetInitiativeActionStatusFromActionBy(id));
        }

        [HttpPost("UpdateBy")]
        public async Task<IActionResult> UpdateUserBy(InitiativeIdEmail inputParam)
        {
            var result = await _repository.UpdateByUser(inputParam.Id, inputParam.Email);
            return Ok(result);
        }

        [HttpGet("Print/{id}")]
        public async Task<IActionResult> PrintData(int id)
        {
            return await _repository.PrintData(id);
            //return File(new MemoryStream(stream.ToArray()), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }

        [HttpPost("Duplicate")]
        public async Task<IActionResult> DuplicateInitiative(InitiativeIdEmail inputParam)
        {
            var code = await InitiativeCode();
            var result = await _repository.DuplicateInitiative(inputParam.Id, code, inputParam.Email);
            return Ok(result);
            //return File(new MemoryStream(stream.ToArray()), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }

        [HttpGet("InitiativeHistoryIndex/{id}")]
        public async Task<IActionResult> GetHistoryIndex(int id)
        {
            return Ok(await _repository.GetHistoryIndex(id));
        }

        [HttpGet]
        [Route("GetOwnerInitiativeList")]
        public async Task<IActionResult> GetOwnerInitiativeList([FromQuery] InitiativeParams InitiativeParams)
        {
            var initiativesData = await _repository.GetOwnerInitiativeList(null);
            var initiatives = _mapper.Map<IEnumerable<OwnerInitiativeList>>(initiativesData);
            Response.AddPagination(initiativesData.CurrentPage, initiativesData.PageSize, initiativesData.TotalCount, initiativesData.TotalPages);
            return Ok(initiatives);
        }

        [HttpGet]
        [Route("GetOwnerInitiativeDetail")]
        public async Task<IActionResult> GetOwnerInitiativeDetail([FromQuery] string employeeId)
        {
            var initiativesData = await _repository.GetOwnerInitiativeDetail(employeeId);
            var initiatives = _mapper.Map<OwnerInitiativeDetail>(initiativesData);
            return Ok(initiatives);
        }

        [HttpGet]
        [Route("GetRoleDetail")]
        public async Task<IActionResult> GetRoleDetail([FromQuery] PagingParam Param)
        {
            var ropositoryData = await _repository.GetRoleDetail(Param);
            var mapperData = _mapper.Map<IEnumerable<RoleList>>(ropositoryData);
            Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
            return Ok(ropositoryData);
        }

        [HttpPost]
        [Route("UpdateOwnerInitiative")]
        public async Task<IActionResult> UpdateOwnerInitiative(OwnerInitiativeDetail initiative)
        {
            var updaterItem = await _repository.UpdateOwnerInitiative(initiative);
            return Ok(updaterItem);
        }

        [HttpGet]
        [Route("GetStageNameReplace/{id}")]
        public async Task<IActionResult> GetStageNameReplace(int id)
        {
            var stageName = await _repository.GetStageNameOutput(id);
            return Ok(stageName);
        }

        [HttpGet]
        [Route("IsDimCapex")]
        public async Task<IActionResult> IsDimCapex()
        {
            return Ok(await _repository.IsDimCapex());
        }

        [HttpGet]
        [Route("IsNewFeature")]
        public async Task<IActionResult> IsNewFeature()
        {
            return Ok(await _repository.IsNewFeature());
        }

        [HttpGet("GetInitiativeKpi")]
        public async Task<IActionResult> GetInitiativeKpi([FromQuery] string text)
        {
            var initiativesData = await _repository.GetInitiativeKpi(text == null ? "" : text);
            var initiatives = _mapper.Map<List<Initiative>>(initiativesData);
            return Ok(initiatives);
        }

        [HttpPost("GetRequestPoolPimInitiativeList")]
        public async Task<IActionResult> GetRequestPoolPimInitiativeList(SearchConditonPoolPim searchConditonPoolPim)
        {
            var initiativesData = await _repository.GetRequestPoolPimInitiativeList(searchConditonPoolPim);
            return Ok(initiativesData);
        }

        [HttpGet("GetLastSubmittedDate/{id}")]
        public async Task<IActionResult> GetLastSubmittedDate(int id)
        {
            var lastSubmittedDate = await _repository.GetLastSubmittedDate(id);
            return Ok(lastSubmittedDate);
        }

        [HttpGet("GetInitiativeStages/{id}")]
        public async Task<IActionResult> GetInitiativeStages(int id)
        {
            return Ok(await _repository.GetInitiativeStages(id));
        }

        [HttpGet("GetInitiativeStagesByInitiativeId/{id}")]
        public async Task<IActionResult> GetInitiativeStagesByInitiativeId(int id)
        {
            return Ok(await _repository.GetInitiativeStagesByInitiativeId(id));
        }

        [HttpPost("GetIsViewSubmitForm")]
        public async Task<IActionResult> GetIsViewSubmitForm(InitiativeIdEmail initiativeIdEmail)
        {
            return Ok(await _repository.GetIsViewSubmittoForm(initiativeIdEmail));
        }
        [HttpPost("GetButtonAction")]
        public async Task<IActionResult> GetButtonAction(InitiativeButtonAction initiativeButtonAction)
        {
            var action = await _repository.GetButtonAction(initiativeButtonAction);
            return Ok(new { Action = action });
        }

        [HttpPost("GetInitiativeIdFromInitiativeCode")]
        public async Task<IActionResult> GetInitiativeIdFromInitiativeCode(InitiativeCOde initiativeCode)
        {
            var initiativeId = await _repository.GetInitiativeIdFromInitiativeCode(initiativeCode);

            return Ok(initiativeId);
        }

        [HttpPost("CreateReferenceIniPoolPim/{id}")]
        public async Task<IActionResult> CreateReferenceIniPoolPim(int id, InitiativeListPoolPim[] initiativeList)
        {
            var initiativeId = await _repository.CreateReferenceIniPoolPim(id, initiativeList);

            return Ok(initiativeId);
        }

        [HttpGet("GetReferenceIniPoolPim/{id}")]
        public async Task<IActionResult> GetReferenceIniPoolPim(int id)
        {
            var list = await _repository.GetReferenceIniPoolPim(id);
            var initiativeList = _mapper.Map<List<InitiativeListPoolPim>>(list);
            return Ok(initiativeList);
        }

        [HttpGet("GetReferenceIniPoolPimById/{id}")]
        public async Task<IActionResult> GetReferenceIniPoolPimById(int id)
        {
            var initiative = await _repository.GetReferenceIniPoolPimById(id);
            return Ok(initiative);
        }

        [HttpPost("CalculateIrr")]
        public async Task<IActionResult> CalculateIrr(CalculateIrrDetail calculateIrrDetail)
        {
            //var initiativeId = await _repository.CreateReferenceIniPoolPim(id, initiativeList);
            //var 

            IRRCalculationInterface rRCalculationInterface = new IRRCalculationRepository(_hostingEnvironment);
            Guid obj = Guid.NewGuid();
            string newFileName = "/PSR Form" + obj.ToString() + ".xlsx";
            try
            {


                int millionMultiply = 1000000;

                rRCalculationInterface.LoadIrrExcel("IrrAndJFactorTemplate", "/PSR Form.xlsx");
                rRCalculationInterface.SetCellValue("FORM", 64, 5, calculateIrrDetail.CostEstCapex == null ? "0" : (calculateIrrDetail.CostEstCapex * calculateIrrDetail.FxExchange * millionMultiply).ToString());        //Total Investment Cost (฿)
                rRCalculationInterface.SetCellValue("FORM", 65, 5, calculateIrrDetail.StartingDate == null ? "0" : calculateIrrDetail.StartingDate.Value.Year.ToString());        //Project Starting Year
                rRCalculationInterface.SetCellValue("FORM", 66, 5, calculateIrrDetail.FinishingDate == null ? "0" : calculateIrrDetail.FinishingDate.Value.Year.ToString());        //Project Completion Year
                rRCalculationInterface.SetCellValue("FORM", 67, 5, calculateIrrDetail.ResidualValue == null ? "0" : (calculateIrrDetail.ResidualValue * millionMultiply).ToString());        //Residual Value (฿)
                rRCalculationInterface.SetCellValue("FORM", 68, 5, calculateIrrDetail.UtilitiesCost == null ? "0" : (calculateIrrDetail.UtilitiesCost * millionMultiply).ToString());        //Utilities (฿/year)
                rRCalculationInterface.SetCellValue("FORM", 69, 5, calculateIrrDetail.LabourCost == null ? "0" : (calculateIrrDetail.LabourCost * millionMultiply).ToString());        //Labour (฿/year)
                rRCalculationInterface.SetCellValue("FORM", 70, 5, calculateIrrDetail.MaintenanceCost == null ? "0" : (calculateIrrDetail.MaintenanceCost / 100).ToString());        //Maintenance (% of total investment cost)
                rRCalculationInterface.SetCellValue("FORM", 71, 5, calculateIrrDetail.CatalystChemicalsCost == null ? "0" : (calculateIrrDetail.CatalystChemicalsCost * millionMultiply).ToString());        //Catalyst & Chemicals (฿/year)
                rRCalculationInterface.SetCellValue("FORM", 72, 5, calculateIrrDetail.BenefitAmount == null ? "0" : (calculateIrrDetail.BenefitAmount * millionMultiply).ToString());        //Benefits (฿/year)
                rRCalculationInterface.SetCellValue("FORM", 78, 5, calculateIrrDetail.Wacc == null ? "8" : calculateIrrDetail.Wacc?.ToString());        //Benefits (฿/year)   // default value is 8


                rRCalculationInterface.SaveIrrExcel("IrrAndJFactorTemplate", newFileName);
                rRCalculationInterface.LoadIrrExcel("IrrAndJFactorTemplate", newFileName);

                //_repositoryIRRCalculation.LoopEvaluateWholeSheetWithIdx("FORM", 64, 73, 5, 6); //evaluate cell 5
                //_repositoryIRRCalculation.LoopEvaluateWholeSheetWithIdx("DCF-Base", 6, 15, 1, 2);

                double action = rRCalculationInterface.GetResultFromWorkbook("FORM", 75, 5);
                rRCalculationInterface.DeleteIrrExcel("IrrAndJFactorTemplate", newFileName);

                /* interop */

                //IRRCalculationInterface rRCalculationInterface = new IRRCalculateInterOp(_hostingEnvironment);
                //rRCalculationInterface.CopyIrrExcel("IrrAndJFactorTemplate", "/PSR Form.xlsx", newFileName);
                //rRCalculationInterface.LoadIrrExcel("IrrAndJFactorTemplate", newFileName);
                //rRCalculationInterface.SetCellValue("FORM", 65, 6, calculateIrrDetail.CostEstCapex == null ? "0" : (calculateIrrDetail.CostEstCapex * calculateIrrDetail.FxExchange * millionMultiply).ToString());        //Total Investment Cost (฿)
                //rRCalculationInterface.SetCellValue("FORM", 66, 6, calculateIrrDetail.StartingDate == null ? "0" : calculateIrrDetail.StartingDate.Value.Year.ToString());        //Project Starting Year
                //rRCalculationInterface.SetCellValue("FORM", 67, 6, calculateIrrDetail.FinishingDate == null ? "0" : calculateIrrDetail.FinishingDate.Value.Year.ToString());        //Project Completion Year
                //rRCalculationInterface.SetCellValue("FORM", 68, 6, calculateIrrDetail.ResidualValue == null ? "0" : (calculateIrrDetail.ResidualValue * millionMultiply).ToString());        //Residual Value (฿)
                //rRCalculationInterface.SetCellValue("FORM", 69, 6, calculateIrrDetail.UtilitiesCost == null ? "0" : (calculateIrrDetail.UtilitiesCost * millionMultiply).ToString());        //Utilities (฿/year)
                //rRCalculationInterface.SetCellValue("FORM", 70, 6, calculateIrrDetail.LabourCost == null ? "0" : (calculateIrrDetail.LabourCost * millionMultiply).ToString());        //Labour (฿/year)
                //rRCalculationInterface.SetCellValue("FORM", 71, 6, calculateIrrDetail.MaintenanceCost == null ? "0" : (calculateIrrDetail.MaintenanceCost / 100).ToString());        //Maintenance (% of total investment cost)
                //rRCalculationInterface.SetCellValue("FORM", 72, 6, calculateIrrDetail.CatalystChemicalsCost == null ? "0" : (calculateIrrDetail.CatalystChemicalsCost * millionMultiply).ToString());        //Catalyst & Chemicals (฿/year)
                //rRCalculationInterface.SetCellValue("FORM", 73, 6, calculateIrrDetail.BenefitAmount == null ? "0" : (calculateIrrDetail.BenefitAmount * millionMultiply).ToString());        //Benefits (฿/year)
                //rRCalculationInterface.SetCellValue("FORM", 78, 6, calculateIrrDetail.Wacc == null ? "8" : calculateIrrDetail.Wacc?.ToString());        //Benefits (฿/year)   // default value is 8

                //double action = rRCalculationInterface.GetResultFromWorkbook("FORM", 76, 6);
                //double action = rRCalculationInterface.GetResultFromWorkbook("FORM", 76, 6);
                //rRCalculationInterface.SaveIrrExcel("", "");
                //rRCalculationInterface.QuitProcess();
                //rRCalculationInterface.DeleteIrrExcel("IrrAndJFactorTemplate", newFileName);
                //double action = _repositoryIRRCalculation.GetResultFromWorkbook("FORM", 75, 5);

                return Ok(Math.Round(action * 100, 2));

            }
            catch (Exception ex)
            {
                rRCalculationInterface.DeleteIrrExcel("IrrAndJFactorTemplate", newFileName);
                //throw new Exception(ex.Message);
                return Ok(ex.Message);
            }


        }

        [HttpPost("CalculateRam")]
        public async Task<IActionResult> CalculateRam(CalculateRamDetail calculateRamDetail)
        {

            IRRCalculationInterface rRCalculationInterface = new IRRCalculationRepository(_hostingEnvironment);
            Guid obj = Guid.NewGuid();
            string newFileName = "/PSR Form" + obj.ToString() + ".xlsx";
            try
            {
                string plantMapping = await _repository.GetPlantMappingCommonData(calculateRamDetail.Plant);
                string plantChecked = await _repository.CheckPlantMappingRamJFactor(plantMapping);
                int millionMultiply = 1000000;

                rRCalculationInterface.LoadIrrExcel("IrrAndJFactorTemplate", "/PSR Form.xlsx");
                rRCalculationInterface.SetCellValue("FORM", 42, 1, calculateRamDetail.Consequence == null ? "0" : calculateRamDetail.Consequence);
                rRCalculationInterface.SetCellValue("FORM", 42, 25, calculateRamDetail.Likelihood == null ? "0" : calculateRamDetail.Likelihood);
                rRCalculationInterface.SetCellValue("FORM", 5, 4, plantChecked == null ? "Common " : plantChecked, "string");


                rRCalculationInterface.SaveIrrExcel("IrrAndJFactorTemplate", newFileName);
                rRCalculationInterface.LoadIrrExcel("IrrAndJFactorTemplate", newFileName);

                //_repositoryIRRCalculation.LoopEvaluateWholeSheetWithIdx("FORM", 64, 73, 5, 6); //evaluate cell 5
                //_repositoryIRRCalculation.LoopEvaluateWholeSheetWithIdx("DCF-Base", 6, 15, 1, 2);

                string ram = (string)rRCalculationInterface.GetResultFromWorkbook("FORM", 39, 1, "string");
                double potentialCons = rRCalculationInterface.GetResultFromWorkbook("FORM", 42, 3);
                rRCalculationInterface.DeleteIrrExcel("IrrAndJFactorTemplate", newFileName);

                return Ok(new
                {
                    ram = ram,
                    potentialCons = potentialCons / millionMultiply
                });

            }
            catch (Exception ex)
            {
                rRCalculationInterface.DeleteIrrExcel("IrrAndJFactorTemplate", newFileName);
                //throw new Exception(ex.Message);
                return Ok(ex.Message);
            }


        }
        [HttpPost("CalculateJFactor")]
        public async Task<IActionResult> CalculateJFactor(CalculateJFactorDetail calculateJFactorDetail)
        {

            IRRCalculationInterface rRCalculationInterface = new IRRCalculationRepository(_hostingEnvironment);
            Guid obj = Guid.NewGuid();
            string newFileName = "/PSR Form" + obj.ToString() + ".xlsx";
            try
            {
                string plantMapping = await _repository.GetPlantMappingCommonData(calculateJFactorDetail.Plant);
                string plantChecked = await _repository.CheckPlantMappingRamJFactor(plantMapping);

                int millionMultiply = 1000000;

                rRCalculationInterface.LoadIrrExcel("IrrAndJFactorTemplate", "/PSR Form.xlsx");
                rRCalculationInterface.SetCellValue("FORM", 41, 5, calculateJFactorDetail.PotentialConCost == null ? "0" : (calculateJFactorDetail.PotentialConCost * millionMultiply).ToString());      //
                rRCalculationInterface.SetCellValue("FORM", 43, 5, calculateJFactorDetail.AnnualLikelihoodRatio == null ? "0" : calculateJFactorDetail.AnnualLikelihoodRatio.ToString());      //Annual Likelihood  
                rRCalculationInterface.SetCellValue("FORM", 44, 5, calculateJFactorDetail.ExposureFactorRatio == null ? "0" : calculateJFactorDetail.ExposureFactorRatio.ToString());      //ExposureFactorRatio
                rRCalculationInterface.SetCellValue("FORM", 48, 5, calculateJFactorDetail.EffectivenessRatio == null ? "0" : calculateJFactorDetail.EffectivenessRatio.ToString());      //EffectivenessRatio

                rRCalculationInterface.SetCellValue("FORM", 52, 5, calculateJFactorDetail.CostEstCapex == null ? "0" : (calculateJFactorDetail.CostEstCapex * calculateJFactorDetail.FxExchange * millionMultiply).ToString());      //
                rRCalculationInterface.SetCellValue("FORM", 53, 5, calculateJFactorDetail.ProductionLoss == null ? "0" : (calculateJFactorDetail.ProductionLoss * millionMultiply).ToString());      //
                rRCalculationInterface.SetCellValue("FORM", 54, 5, calculateJFactorDetail.EconomicPenalties == null ? "0" : (calculateJFactorDetail.EconomicPenalties * millionMultiply).ToString());      //
                rRCalculationInterface.SetCellValue("FORM", 55, 5, calculateJFactorDetail.EconomicBenefits == null ? "0" : (calculateJFactorDetail.EconomicBenefits * millionMultiply).ToString());      //
                rRCalculationInterface.SetCellValue("FORM", 56, 5, calculateJFactorDetail.OpexPenaltiesCost == null ? "0" : calculateJFactorDetail.OpexPenaltiesCost.ToString());      //
                rRCalculationInterface.SetCellValue("FORM", 57, 5, calculateJFactorDetail.JustifiableCost == null ? "0" : calculateJFactorDetail.JustifiableCost.ToString());      //
                rRCalculationInterface.SetCellValue("FORM", 5, 4, plantChecked == null ? "Common " : plantChecked, "string");

                rRCalculationInterface.SaveIrrExcel("IrrAndJFactorTemplate", newFileName);
                rRCalculationInterface.LoadIrrExcel("IrrAndJFactorTemplate", newFileName);

                //_repositoryIRRCalculation.LoopEvaluateWholeSheetWithIdx("FORM", 64, 73, 5, 6); //evaluate cell 5
                //_repositoryIRRCalculation.LoopEvaluateWholeSheetWithIdx("DCF-Base", 6, 15, 1, 2);

                double baseRisk = rRCalculationInterface.GetResultFromWorkbook("FORM", 59, 5);
                double riskOfAlt = rRCalculationInterface.GetResultFromWorkbook("FORM", 60, 5);
                double riskReduction = rRCalculationInterface.GetResultFromWorkbook("FORM", 61, 5);
                double JFactor = rRCalculationInterface.GetResultFromWorkbook("FORM", 62, 5);
                rRCalculationInterface.DeleteIrrExcel("IrrAndJFactorTemplate", newFileName);

                return Ok(new
                {
                    jFactor = Math.Round(JFactor, 2),
                    riskOfAlt = Math.Round(riskOfAlt / millionMultiply, 2),
                    riskReduction = Math.Round(riskReduction / millionMultiply, 2),
                    baseRisk = Math.Round(baseRisk / millionMultiply, 2),
                });

            }
            catch (Exception ex)
            {
                rRCalculationInterface.DeleteIrrExcel("IrrAndJFactorTemplate", newFileName);
                //throw new Exception(ex.Message);
                return Ok(ex.Message);
            }


        }

        [AllowAnonymous]
        [HttpPost("ApproveSystemTrigger/{id}")]
        public async Task<IActionResult> ApproveSystemTrigger(int id)
        {
            return Ok(await _repository.ApproveSystemTrigger(id));
        }

        [AllowAnonymous]
        [HttpPost("CalculateIRRForTest")]
        public async Task<IActionResult> CalculateIRRForTest([FromBody] decimal val)
        {
            IWorkbook book = new XSSFWorkbook();
            XSSFFormulaEvaluator formula = new XSSFFormulaEvaluator(book);
            double valReturn;
            try
            {
                FileStream fs = new FileStream(_hostingEnvironment.ContentRootPath + @"/IrrAndJFactorTemplate/HH.xlsx", FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite);


                // Try to read workbook as XLSX:
                try
                {
                    book = new XSSFWorkbook(fs);

                }
                catch
                {
                    book = null;
                }

                // If reading fails, try to read workbook as XLS:
                if (book == null)
                {
                    book = new HSSFWorkbook(fs);
                }
            }
            catch (Exception ex)
            {
            }

            ISheet sheet = book.GetSheetAt(0);
            IRow row = sheet.GetRow(0);
            ICell cell = row.Cells[0];
            cell.SetCellValue(double.Parse(val.ToString()));

            IRow rowResult = sheet.GetRow(0);
            ICell cellResult = row.Cells[1];
            formula = new XSSFFormulaEvaluator(book);
            formula.EvaluateAll();
            valReturn = cellResult.NumericCellValue;

            return Ok(valReturn);
        }

        public async Task<string> InitaitiveCodeToContainerBlob(string initiativeCode)
        {
            initiativeCode = initiativeCode?.ToString()?.ToLower()?.Replace("/", "-");

            return await Task.FromResult(initiativeCode);
        }


        [HttpPost("GetOwnerNameByIndicator")]
        public async Task<IActionResult> GetOwnerNameByIndicator(GetOwnersByIndicator getOwnersByIndicator)
        {
            var listOwners = await _repository.GetOwnerNameByActionCode(getOwnersByIndicator.InitiativeId, getOwnersByIndicator.Indicator);
            return Ok(listOwners);
        }


        [HttpPost("SetInitiativeFlowRevise")]
        public async Task<IActionResult> SetInitiativeFlowRevise(InitiativeFlowType initiativeFlowType)
        {
            return Ok(await _repository.SetInitiativeFlowRevise(initiativeFlowType.Id));
        }

        [HttpPost("RealtimeInterface")]
        public async Task<IActionResult> RealtimeInterface(InitiativeFlowType initiativeFlowType)
        {
            string resultProgress = "Successful";
            string resultActulaPOC = await _repositoryIF.ActulaPOCPercentUpdateToSAP(initiativeFlowType.Id, DateTime.Now);
            string resultProjectManager = await _repositoryIF.ProjectManagerUpdateToSAP(initiativeFlowType.Id);
            if (resultActulaPOC.Equals("Successful EPCC"))
                resultProgress = await _repositoryIF.ProgressOfCompletionFromSAP(initiativeFlowType.Id);
            string errorMsg = !resultActulaPOC.Contains("Successful") ? resultActulaPOC : null;

            if (errorMsg == null)
                errorMsg = !resultProjectManager.Equals("Successful") ? resultProjectManager : null;
            else
                errorMsg = errorMsg + ", " + (!resultProjectManager.Equals("Successful") ? resultProjectManager : null);
            if (errorMsg == null)
                errorMsg = !resultProgress.Equals("Successful") ? resultProgress : null;
            else
                errorMsg = errorMsg + ", " + (!resultProjectManager.Equals("Successful") ? resultProjectManager : null);

            if (errorMsg == null)
                return Ok(initiativeFlowType.Id);
            else
                return StatusCode(500, errorMsg);
        }

        [HttpGet("GetInitiativeStageForMaxPermission/{id}")]
        public async Task<IActionResult> GetInitiativeStageForMaxPermission(int id)
        {
            return Ok(await _repository.GetInitiativeStageForMaxPermission(id));
        }

        [HttpPost("GetOwnerNameByIndicatorByPlant")]
        public async Task<IActionResult> GetOwnerNameByIndicatorByPlant(GetOwnersByIndicator getOwnersByIndicator)
        {
            var listOwners = await _repository.GetOwnerNameByIndicatorByPlant(getOwnersByIndicator.InitiativeId, getOwnersByIndicator.Indicator, getOwnersByIndicator.Plant) ;
            return Ok(listOwners);
        }
    }
}