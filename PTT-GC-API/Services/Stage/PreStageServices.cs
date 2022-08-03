using PTT_GC_API.Data.Interface;
using PTT_GC_API.Data.Repository;
using PTT_GC_API.Dtos.DetailMaxInformation;
using PTT_GC_API.Dtos.NewApprovalSystem;
using PTT_GC_API.Dtos.SkipStageJoinModel;
using PTT_GC_API.Models.ImpactTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Services.Stage
{
    public interface IPreStageServices
    {
        public int ExecutePreStage(ApprovalNewSystemParam approvalNewSystemParam);
        public void DisableCAPEXTab(int initiativeId, string flowType);
        public void ShowCAPEXTab(int initiativeId, string flowType);
        public void SetIL0Date(int initiativeId, string flowType);
        public void ShowResourceNeededTab(int initiativeId, string flowType);
        public void ShowRiskTab(int initiativeId, string flowType);
        public void ShowCAPEXTabOnlyGate2(int initiativeId, string flowType);
        public void PostApproveIL4(int initiativeId, string flowType);
        public void ShowLessonLearnTab(int initiativeId, string flowType);
        public void ShowLookbackTab(int initiativeId, string flowType);
        public void ShowBestPracticeTab(int initiativeId, string flowType);
        public PimGateConfig ShowHideGatePIMDetail(int initiativeId);
        public void UpdateStatusGate(int initiativeId, string flowType);
    }
    public class PreStageServices : IPreStageServices
    {
        private readonly IStageRepository _stageRepository;
        private readonly DetailInformationInterface _detailInformation;
        private readonly ICommonDataRepository _commonDataRepository;
        private readonly ProgressInterface _progressRepository;

        public PreStageServices(IStageRepository stageRepository,
                                DetailInformationInterface detailInformation,
                                ICommonDataRepository commonDataRepository,
                                ProgressInterface progressRepository)
        {
            _stageRepository = stageRepository;
            _detailInformation = detailInformation;
            _commonDataRepository = commonDataRepository;
            _progressRepository = progressRepository;
        }

        public int ExecutePreStage(ApprovalNewSystemParam approvalNewSystemParam)
        {
            try
            {

                var nowStageDetail = _stageRepository.GetDetailCurrentStageFromDetail(approvalNewSystemParam);

                if (nowStageDetail != null)
                {
                    if (nowStageDetail.PreStageStoredProcedure == null)
                        return 0;

                    var listStoredToExecute = nowStageDetail.PreStageStoredProcedure.Split(",");

                    foreach (string storedExe in listStoredToExecute)
                    {
                        if (storedExe == "sp_DisableCAPEXTab" && (nowStageDetail.FlowType == "initiative" || nowStageDetail.FlowType == "requestcapex"))
                        {
                            //call add cost spending;
                            _progressRepository.SubmitInvestmentCostFirstTime(approvalNewSystemParam.InitiativeId).GetAwaiter().GetResult();
                        }
                        switch (storedExe)
                        {
                            case "sp_PostApproveIL4": PostApproveIL4(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.FlowType); break;
                            case "sp_SetIL0Date": SetIL0Date(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.FlowType); break;
                            case "sp_ShowCAPEXTab": ShowCAPEXTab(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.FlowType); break;
                            case "sp_ShowCAPEXTabOnlyGate2": ShowCAPEXTabOnlyGate2(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.FlowType); break;
                            case "sp_ShowLessonLearnTab": ShowLessonLearnTab(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.FlowType); break;
                            case "sp_ShowLookback Tab": ShowLookbackTab(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.FlowType); break;
                            case "sp_ShowBestPracticeTab": ShowBestPracticeTab(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.FlowType); break;
                            case "sp_ShowResourceNeededTab": ShowResourceNeededTab(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.FlowType); break;
                            case "sp_ShowRiskTab": ShowRiskTab(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.FlowType); break;
                            case "sp_ShowHideGatePIMDetail": ShowHideGatePIMDetail(approvalNewSystemParam.InitiativeId);break;
                            case "sp_UpdateStatusGate": UpdateStatusGate(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.FlowType);break;
                        }
                    }

                    return 0;
                }
            }
            catch (Exception ex)
            {

            }
            return 1;

        }

        public void DisableCAPEXTab(int initiativeId, string flowType)
        {
            var initiatives = _stageRepository.GetInitiativeById(initiativeId);
            bool.TryParse(initiatives.RequestCapex, out bool requestCapex);
            if (requestCapex)
            {
                initiatives.CapexTabStatus = 2;
                _stageRepository.UpdateInitiative(initiatives);
            }
        }

        public void ShowCAPEXTab(int initiativeId, string flowType)
        {
            var initiatives = _stageRepository.GetInitiativeById(initiativeId);
            bool.TryParse(initiatives.RequestCapex, out bool requestCapex);
            if (requestCapex)
            {
                initiatives.CapexTabStatus = 1;
                _stageRepository.UpdateInitiative(initiatives);
            }
        }

        public void SetIL0Date(int initiativeId, string flowType)
        {
            var initiatives = _stageRepository.GetInitiativeById(initiativeId);
            var detailInformation = _stageRepository.GetDetailInformationById(initiativeId);
            DateTime? IL0Date = initiatives.UpdatedDate;
            detailInformation.IL0date = IL0Date;
            _detailInformation.Update(detailInformation);

        }

        public void ShowResourceNeededTab(int initiativeId, string flowType)
        {
            var initiatives = _stageRepository.GetInitiativeById(initiativeId);
            initiatives.ResourceTabStatus = 1;
            _stageRepository.UpdateInitiative(initiatives);
        }

        public void ShowRiskTab(int initiativeId, string flowType)
        {
            var initiatives = _stageRepository.GetInitiativeById(initiativeId);
            initiatives.RiskTabStatus = 1;
            _stageRepository.UpdateInitiative(initiatives);
        }

        public void ShowCAPEXTabOnlyGate2(int initiativeId, string flowType)
        {
            var initiatives = _stageRepository.GetInitiativeById(initiativeId);
            var detailInformations = _detailInformation.GetDetailInformation(initiativeId).GetAwaiter().GetResult();
            bool skipgate2 = detailInformations.SimProjectSkipGate2;
            if (!skipgate2)
            {
                initiatives.CapexTabStatus = 1;
                _stageRepository.UpdateInitiative(initiatives);
            }
            else
            {
                initiatives.CapexTabStatus = null;
                _stageRepository.UpdateInitiative(initiatives);
            }

        }

        public void PostApproveIL4(int initiativeId, string flowType)
        {
            var impactTypeOfBenefits = _stageRepository.GetImpactTypeOfBenefits(initiativeId);
            string currency = impactTypeOfBenefits.FirstOrDefault(x => x.VersionPrice == "FixedFX" && x.ImpactTypeOfBenefitTable == "TypeBenefit").currencyFloatFx;
            var result = _stageRepository.JoinImpactTypeOfBenefitsAndImpactTracking(initiativeId);
            foreach (var item in result)
            {
                item.FloatBen.Month1 = item.FixBen.Month1 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 1, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month2 = item.FixBen.Month2 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 2, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month3 = item.FixBen.Month3 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 3, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month4 = item.FixBen.Month4 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 4, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month5 = item.FixBen.Month5 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 5, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month6 = item.FixBen.Month6 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 6, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month7 = item.FixBen.Month7 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 7, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month8 = item.FixBen.Month8 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 8, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month9 = item.FixBen.Month9 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 9, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month10 = item.FixBen.Month10 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 10, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month11 = item.FixBen.Month11 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 11, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month12 = item.FixBen.Month12 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 12, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month13 = item.FixBen.Month13 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 13, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month14 = item.FixBen.Month14 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 14, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month15 = item.FixBen.Month15 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 15, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month16 = item.FixBen.Month16 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 16, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month17 = item.FixBen.Month17 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 17, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month18 = item.FixBen.Month18 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 18, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month19 = item.FixBen.Month19 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 19, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month20 = item.FixBen.Month20 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 20, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month21 = item.FixBen.Month21 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 21, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month22 = item.FixBen.Month22 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 22, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month23 = item.FixBen.Month23 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 23, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month24 = item.FixBen.Month24 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 24, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month25 = item.FixBen.Month25 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 25, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month26 = item.FixBen.Month26 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 26, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month27 = item.FixBen.Month27 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 27, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month28 = item.FixBen.Month28 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 28, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month29 = item.FixBen.Month29 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 29, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month30 = item.FixBen.Month30 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 30, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month31 = item.FixBen.Month31 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 31, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month32 = item.FixBen.Month32 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 32, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month33 = item.FixBen.Month33 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 33, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month34 = item.FixBen.Month34 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 34, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month35 = item.FixBen.Month35 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 35, currency, initiativeId) / item.FixBen.FixedFX ?? 1;
                item.FloatBen.Month36 = item.FixBen.Month36 * FloatFx(item.ImpactTracking.FirstRunRateMonth ?? new DateTime(), 36, currency, initiativeId) / item.FixBen.FixedFX ?? 1;

                _stageRepository.UpdateImpactTypeOfBenefits(item.FloatBen);
            }
        }

        public decimal FloatFx(DateTime firstRunRateMonth, int monthNum, string currency, int initiativeId)
        {
            var attr4 = _commonDataRepository.GetCommonDataByType("TOFinanceFX")
                                .GetAwaiter()
                                .GetResult()
                                .FirstOrDefault(x =>
                                {
                                    int.TryParse(x.Attribute02, out int year);
                                    int.TryParse(x.Attribute03, out int month);
                                    var addedMonth = firstRunRateMonth.AddMonths(monthNum - 1);
                                    return x.Attribute01 == currency
                                    && year == addedMonth.Year
                                    && month == addedMonth.Month;
                                }).Attribute04;
            decimal.TryParse(attr4, out decimal returnValue);
            decimal fixedFx = _stageRepository.GetImpactTypeOfBenefits(initiativeId)
                                .FirstOrDefault(x => x.VersionPrice == "FixedFX"
                                && x.ImpactTypeOfBenefitTable == "TypeBenefit").FixedFX ?? 1;
            if (returnValue == 0)
            {
                returnValue = fixedFx;
            }

            return returnValue;
        }

        public void ShowLessonLearnTab(int initiativeId, string flowType)
        {
            var initiatives = _stageRepository.GetInitiativeById(initiativeId);
            initiatives.LessonLearnTabStatus = 1;
            _stageRepository.UpdateInitiative(initiatives);
        }

        public void ShowLookbackTab(int initiativeId, string flowType)
        {
            var initiatives = _stageRepository.GetInitiativeById(initiativeId);
            initiatives.LookbackTabStatus = 1;
            _stageRepository.UpdateInitiative(initiatives);
        }

        public void ShowBestPracticeTab(int initiativeId, string flowType)
        {
            var initiatives = _stageRepository.GetInitiativeById(initiativeId);
            initiatives.BestPracticeTabStatus = 1;
            _stageRepository.UpdateInitiative(initiatives);
        }

        public PimGateConfig ShowHideGatePIMDetail(int initiativeId)
        {
            var initiatives = _stageRepository.GetInitiativeById(initiativeId);
            string stage = initiatives.Stage;
            string initiativetype = initiatives.InitiativeType;
            string Gate0 = "false";
            string Gate1 = "false";
            string Gate2 = "false";
            string Gate3 = "false";
            string Gate4 = "false";

            if (stage != null && (stage.Equals("Gate0") || stage.Equals("ASSIGN PROJECT ENG.")))
            {
                Gate0 = "true";
            }

            if (stage != null && stage.Equals("Gate1"))
            {
                Gate1 = "true";
            }

            if (stage != null && stage.Equals("Gate2"))
            {
                Gate2 = "true";
            }

            if (stage != null && stage.Equals("Gate3"))
            {
                Gate3 = "true";
            }

            if (stage != null && stage.Equals("Gate4"))
            {
                Gate4 = "true";
            }

            if (initiativetype == "max" && ((stage ?? string.Empty) != "ASSIGN PROJECT ENG."))
            {
                Gate0 =
                Gate1 =
                Gate2 =
                Gate3 = "true";
                Gate4 = "false";
            }
            else if (Gate4.Equals("true"))
            {
                Gate0 = "true";
                Gate1 =
                Gate2 =
                Gate3 = "disable";
                Gate4 = "true";
            }
            else if (Gate3.Equals("true"))
            {
                Gate0 = "true";
                Gate1 =
                Gate2 = "disable";
                Gate3 = "true";
                Gate4 = "false";
            }
            else if (Gate2.Equals("true"))
            {
                Gate0 = "true";
                Gate1 =
                Gate2 = "disable";
                Gate3 = "true";
                Gate4 = "false";
            }
            else if (Gate1.Equals("true"))
            {
                Gate0 = "true";
                Gate1 =
                Gate2 =
                Gate3 =
                Gate4 = "false";
            }
            else
            {
                Gate0 =
                Gate1 =
                Gate2 =
                Gate3 =
                Gate4 = "false";
            }

            return new PimGateConfig
            {
                Gate0 = Gate0,
                Gate1 = Gate1,
                Gate2 = Gate2,
                Gate3 = Gate3,
                Gate4 = Gate4
            };
        }

        public void UpdateStatusGate(int initiativeId, string flowType)
        {
            string latestAction;
            string latestStage;
            int maxLastestActionByCount = 0;
            var initiativeAction = _stageRepository.GetInitiativeActionById(initiativeId);

            maxLastestActionByCount = initiativeAction.OrderByDescending(x => x.Id)
                                                      .FirstOrDefault(x => !(x.IsInactive ?? false)
                                                        && x.Stage.Contains("VAC")
                                                        || x.Stage.Contains("PIC"))
                                                      .Counter;
            latestAction = initiativeAction.OrderByDescending(x => x.Id)
                                           .FirstOrDefault(x => (x.ActionResult != null)
                                                           && !(x.IsInactive ?? false)
                                                           && x.Counter == maxLastestActionByCount)
                                           .ActionResult;

            latestStage = initiativeAction.OrderByDescending(x => x.Id)
                                          .FirstOrDefault(x => (x.ActionResult != null)
                                                          && !(x.IsInactive ?? false)
                                                          && x.Counter == maxLastestActionByCount)
                                          .Stage;

            int.TryParse(latestStage.TakeLast(1).ToString(), out int gate);

            if (latestStage.Contains("VAC"))
            {
                var pim = _detailInformation.GetDetailPimGate(initiativeId, gate).GetAwaiter().GetResult();
                if (latestAction == "approve")
                {
                    pim.VacStatus = "Pass";
                }
                else if (latestAction == "revise")
                {
                    pim.VacStatus = "Not Pass";
                }
                else
                {
                    pim.VacStatus = string.Empty;
                }
            }
            if (latestStage.Contains("PIC"))
            {
                var pim = _detailInformation.GetDetailPimGate(initiativeId, gate).GetAwaiter().GetResult();
                if (latestAction == "approve")
                {
                    pim.GateStatus = "Pass";
                }
                else if (latestAction == "revise")
                {
                    pim.GateStatus = "Leave";
                }
                else if (latestAction == "reject")
                {
                    pim.GateStatus = "Move Back";
                }
                else if (latestAction == "cancelled")
                {
                    pim.GateStatus = "Cancelled";
                }
                else
                {
                    pim.GateStatus = string.Empty;
                }

                var initiatives = _stageRepository.GetInitiativeById(initiativeId);
                JoinPimGateAndInitiatives joinPimGateInitiative = _stageRepository.InnerJoinPimGateAndInitiativesById(initiativeId, gate);
                initiatives.CostEstCapex = (joinPimGateInitiative.PimGate.CostEstimate ?? 0) - (joinPimGateInitiative.PimGate.RequestOpex ?? 0)
                                            + (joinPimGateInitiative.PimGate.ReceivedOpexBudget ?? 0) + (joinPimGateInitiative.PimGate.AdditionalOpexBudget ?? 0);

                initiatives.CostEstOpex = (joinPimGateInitiative.PimGate.RequestOpex ?? 0) + (joinPimGateInitiative.PimGate.ReceivedOpexBudget ?? 0) + (joinPimGateInitiative.PimGate.AdditionalOpexBudget ?? 0);

                initiatives.BenefitAmount = joinPimGateInitiative.PimGate.Benefit ?? 0;
                initiatives.Irr = joinPimGateInitiative.PimGate.Irr ?? 0;
                initiatives.PayBackPeriod = joinPimGateInitiative.PimGate.SimplePayback ?? 0;

                _stageRepository.UpdateInitiative(initiatives);
            }
        }
    }
}
