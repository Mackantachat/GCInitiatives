using AutoMapper;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Dtos.ResourceNeededFormsModel;
using PTT_GC_API.Models.Forms.Cpi;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.ProgressAndMilestone;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Services
{
    public class CpiFormService : ICpiFormService
    {
        private readonly ICpiDetailInformationRepository _cpiRepository;
        private readonly InitiativeInterface _initiativeRepository;
        private readonly IMapper _mapper;
        private readonly IResourceNeededRepository _resourceNeededRepo;
        private readonly ProgressInterface _progressRepository;
        private readonly ILessonLearnedRepository _lessonLearnedRepository;
        private readonly IBestPracticeRepository _bestPracticeRepository;

        public CpiFormService(ICpiDetailInformationRepository cpiRepository, InitiativeInterface initiativeRepository
            , IMapper mapper, IResourceNeededRepository resourceNeededRepository, ProgressInterface progressRepository,
            ILessonLearnedRepository lessonLearnedRepository, IBestPracticeRepository bestPracticeRepository)
        {
            _cpiRepository = cpiRepository;
            _initiativeRepository = initiativeRepository;
            _mapper = mapper;
            _resourceNeededRepo = resourceNeededRepository;
            _progressRepository = progressRepository;
            _lessonLearnedRepository = lessonLearnedRepository;
            _bestPracticeRepository = bestPracticeRepository;
        }

        public async Task<int> InsertCpiDetailForm(CpiForms forms)
        {
            //var initiativeId = InsertInitiativeAsync(forms.InitiativesForm).GetAwaiter().GetResult();
            //InitiativeSubmitStageStatus(initiativeId,forms.SubmitToForm).GetAwaiter().GetResult();
            var detailId = await _cpiRepository.InsertCpiDetailInformation(forms.DetailCpiForm);
            //_progressRepository.CreateProgressDetail(forms.InitiativesForm.Id, forms.ProgessForm).GetAwaiter().GetResult();
            //_lessonLearnedRepository.InsertLessonLearned(forms.LessonLearnedForm);
            //_bestPracticeRepository.InsertBestPractice(forms.BestPracticeForm);

            return detailId;
        }

        public Task<int> UpdateOnlyLessonLearn(List<Models.LessonLearned.LessonsLearned> forms)
        {
            //var initiativeId = InsertInitiativeAsync(forms.InitiativesForm).GetAwaiter().GetResult();
            //InitiativeSubmitStageStatus(initiativeId,forms.SubmitToForm).GetAwaiter().GetResult();
            return _lessonLearnedRepository.UpdateLessonLearned(forms);
        }

        public async Task<bool> UpdateCpiDetailForm(CpiForms forms)
        {
            // Update Initiative
            //forms.InitiativesForm.UpdatedDate = DateTime.Now;

            //if (forms.InitiativesForm != null && forms.InitiativesForm.Stage != null && forms.InitiativesForm.Status == "")
            //{
            //    forms.InitiativesForm.Status = "draft";
            //}

            //var old_initiative = await _initiativeRepository.GetInitiative(forms.InitiativesForm.Id);
            //forms.InitiativesForm.InitiativeCode = old_initiative.InitiativeCode;
            //_initiativeRepository.Update(forms.InitiativesForm);
            //await _initiativeRepository.Save();
            //await _initiativeRepository.UpdateInitiativeTypeFromFlag(forms.InitiativesForm.Id);

            //Update CpiDetailInformation
            if (forms.DetailCpiForm != null)
            {
                //forms.DetailCpiForm.InitiativeId = forms.InitiativesForm.Id;
                await _cpiRepository.UpdateCpiDetailInformation(forms.DetailCpiForm);
            }

            // ProgessForm Detail
            //if (forms.ProgessForm != null)
            //{
            //    await _progressRepository.CreateProgressDetail(forms.InitiativesForm.Id, forms.ProgessForm);
            //}

            // BestPractice
            //if (forms.BestPracticeForm != null)
            //{
            //    //check data
            //    forms.BestPracticeForm.InitiativeId = forms.InitiativesForm.Id;
            //    _bestPracticeRepository.UpdateBestPractice(forms.BestPracticeForm);
            //}

            return await Task.FromResult(true);
        }

        public async Task<CpiFormsFront> GetCpiForm(int initiativeId)
        {
            var initiative = await _initiativeRepository.GetInitiative(initiativeId);
            var cpiDetailInformation = _cpiRepository.GetCpiDetailInformation(initiativeId);
            var bestPractice = _bestPracticeRepository.GetBestPractice(initiativeId);
            var lessonLearned = await _lessonLearnedRepository.GetLessonLearned(initiativeId);
            List<ProgressDetail> progress = await _progressRepository.GetProgressDetail(initiativeId);

            var cpiForm = new CpiFormsFront
            {
                InitiativesForm = initiative,
                DetailCpiForm = cpiDetailInformation,
                ProgessForm = new Dtos.ProgressAndMilestone.CreateProgressDetail { details = progress.ToList() },
                BestPracticeForm = bestPractice,
                LessonLearnedForm = lessonLearned
            };

            return cpiForm;
        }

        public async Task<bool> DeleteCpiForms(int initiativeId)
        {
            //delete initiative.
            var initiative = await _initiativeRepository.GetInitiative(initiativeId);
            initiative.Status = "cancelled";
            initiative.Stage = "cancelled";
            _initiativeRepository.Update(initiative);
            await _initiativeRepository.Save();

            //delete cpi detail information.
            var result = _cpiRepository.DeleteCpiDetailInformation(initiativeId);

            //delete progress detail.
            _progressRepository.DeleteProgressData(initiativeId);

            //delete lessonlearned.
            _lessonLearnedRepository.DeleteByInitiativeId(initiativeId);

            //delete bestpractice
            _bestPracticeRepository.DeleteBestPracticeModel(initiativeId);
            return (result > 0);
        }


        //will be discuss later.
        private async Task<int> InsertInitiativeAsync(Initiative initiative)
        {
            initiative.InitiativeCode = await InitiativeCode();
            initiative.Status = "draft";
            initiative.UpdatedBy = initiative.CreatedBy;
            _initiativeRepository.Add(initiative);
            await _initiativeRepository.Save();

            var initiativeId = _initiativeRepository.LastIdInitiative().GetAwaiter().GetResult();
            await _resourceNeededRepo.InsertResourceNeededData(new ResourceFormsModelData
            {
                InitiativeId = initiativeId,
                ImportExportFacilityData = null,
                IsAirPollutionRequire = false,
                IsImportRequire = false,
                IsLandRequire = false,
                IsManpowerRequire = false,
                IsWasteRequire = false,
                RemarkImport = string.Empty,
                IsUtilityRequire = false,
                AirForm = null,
                LandForm = null,
                ManpowerForm = null,
                UtilityData = null,
                WasteForm = null
            });

            return initiativeId;
        }

        private async Task<string> InitiativeCode()
        {
            DateTime now = DateTime.Now;
            var Year = now.Year;
            string code;
            if (await _initiativeRepository.Any())
            {
                var last = await _initiativeRepository.LastInitiative();
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

        private async Task<bool> InitiativeSubmitStageStatus(int id, InitiativeSubmitStageStatus initiativeSubmitStageStatus)
        {
            //call microsoft flow  to set initiative action , Stage Trackings
            //await _repository.CallMicrosoftFlow_OnSubmit(id, initiativeSubmitStageStatus.Status, "MSFLOW_ONSUBMIT");
            await _initiativeRepository.UpdateInitiativeTypeFromFlag(id);
            var initiative = await _initiativeRepository.GetInitiative(id);
            string statusDirection = initiativeSubmitStageStatus.Status;
            string[] InitiativeTypeCapex = await _initiativeRepository.GetInitiativeTypeCapex();
            string[] initiativeTypeDIM = { "IT", "Digital", "dim" };

            bool isTypeMaxAndRequestCapex = initiative.InitiativeType.Contains("max") && initiative.IsRequestCapex == true;
            var subType = await _initiativeRepository.GetSubType(id);
            var initiativeType = await _initiativeRepository.GetProcessType(id);

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
                await _initiativeRepository.Save();
                return true;
            }

            //if (InitiativeType.Contains("directCapex"))
            //{
            //    await _repository.CallMicrosoftFlow_OnSubmit(id, initiativeSubmitStageStatus.Status, "MSFLOW_ONSUBMIT");
            //}


            int nowOrderStage = await _initiativeRepository.GetOrderStage(initiative.Stage, initiativeTypeSubType);
            if (InitiativeTypeCapex.Contains(initiativeType) == true && nowOrderStage > 0) nowOrderStage--;  //case directcapex submit after revised change only status
            if (initiativeType.ToLower() == "cim" && nowOrderStage > 0) nowOrderStage--;  //case directcapex submit after revised change only status

            string forwardStage = await _initiativeRepository.GetSubmitNextStage(nowOrderStage, initiativeTypeSubType);
            string backwardStage = await _initiativeRepository.GetReviseStage(nowOrderStage, initiativeTypeSubType);
            string nextStatus = await _initiativeRepository.GetSubmitNextStatus(initiativeTypeSubType, initiativeSubmitStageStatus, initiative.Stage);

            //if (initiativeTypeSubType.ProcessType.Contains("max"))
            //{
            //    List<InitiativeStageStatus> nextStagesStatuses = await _consumeAPI.GetDataFromApi<InitiativeStageStatus>("GetNextStageMax", new InitiativeStage() { Stage = initiative.Stage });
            //    if (nextStagesStatuses.Count > 0)
            //    {
            //        forwardStage = nextStagesStatuses[0].Stage;
            //        nextStatus = nextStagesStatuses[0].Status;
            //    }
            //}           

            if (isTypeMaxAndRequestCapex)
            {
                initiative.CapexStage = "Budget Team";
                initiative.CapexStatus = "wait for review";
                initiativeSubmitStageStatus.Stage = initiative.Stage;
                initiativeSubmitStageStatus.Status = "wait for review";
            }
            else
            {
                if (initiative.Stage == null || initiative.Stage == "draft")
                {
                    string firstStageApprover = await _initiativeRepository.GetFirstStageApprover(initiativeTypeSubType);
                    if (initiativeType.Contains("max"))
                    {
                        initiativeSubmitStageStatus.Status = "admin check";
                        initiativeSubmitStageStatus.Stage = "waiting";
                    }
                    else
                    {
                        initiativeSubmitStageStatus.Status = "wait for approval";
                        initiativeSubmitStageStatus.Stage = firstStageApprover;
                    }

                    await _initiativeRepository.CreateStagesTracking(initiative, initiativeTypeSubType);
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

                    if (initiative.InitiativeType.Contains("max") || initiative.InitiativeType == "strategy")
                        initiativeSubmitStageStatus.Stage = initiative.Stage;

                }
            }

            //create All Stage Statuses
            if (initiativeSubmitStageStatus.Stage != null || initiativeSubmitStageStatus.Status == "cancelled" || initiativeSubmitStageStatus.Status == "wait for cancellation")
            {
                await _initiativeRepository.UpdateStagesTracking_OnSubmit(initiative, initiativeSubmitStageStatus, statusDirection, initiativeTypeSubType);
                var SubmitStageStatus = _mapper.Map(initiativeSubmitStageStatus, initiative);
                DateTime dateTime = DateTime.Now;

                if (new string[] { "SIL4", "SIL5" }.Contains(initiativeSubmitStageStatus.Stage))
                { //Date @ change stage to IL4 , IL5
                    await _initiativeRepository.UpdateLastestSubmittedSIL(id, initiativeSubmitStageStatus.Stage, dateTime);
                }
                SubmitStageStatus.LastSubmittedDate = dateTime;
                await _initiativeRepository.Save();

                if (isTypeMaxAndRequestCapex == true)
                {
                    await _initiativeRepository.SetActionBy(initiative.Id, initiativeSubmitStageStatus.Username, initiative.CapexStatus, initiative.CapexStage, initiativeTypeSubType);
                }
                else
                {
                    await _initiativeRepository.SetActionBy(initiative.Id, initiativeSubmitStageStatus.Username, initiativeSubmitStageStatus.Status, initiativeSubmitStageStatus.Stage, initiativeTypeSubType);
                }
                await _initiativeRepository.ChangeApproverStatusTrackingFromSetActionBy(initiative, initiativeTypeSubType);
                await _initiativeRepository.ChangeApproverStatusTrackingFromSetActionBy_NOMAX(initiative, initiativeTypeSubType);

                string[] allStatusesForApproval = { "wait for review", "wait for create App.", "wait for create WBS", "wait for approval", "admin check" };
                if (allStatusesForApproval.Contains(initiativeSubmitStageStatus.Status) && isTypeMaxAndRequestCapex == false)
                {
                    // send to microsoft flow if stage need approve
                    await _initiativeRepository.CallMicrosoftFlow_SendMail(id, "approve");  // case 1 - send mail to approvers
                }
                else if (initiativeSubmitStageStatus.Status == "wait for cancellation" && isTypeMaxAndRequestCapex == false)
                {
                    await _initiativeRepository.CallMicrosoftFlow_SendMail(id, "wait for cancellation"); // case 7 - send mail to to team
                }
            }

            await _initiativeRepository.RunStoreProcedureFixValueMissing(id); //temporary solution to fix data missing!!!

            return true;
        }
    }
}
