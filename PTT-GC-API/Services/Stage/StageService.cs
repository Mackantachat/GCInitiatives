using PTT_GC_API.Data.Interface;
using PTT_GC_API.Data.Repository;
using PTT_GC_API.Models.ApprovalFlow;
using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Services.State
{
    public interface IStageService
    {
        public bool GetPassCondition(int initiativeId, string flowType, string passCondition);
    }
    public class StageService : IStageService
    {
        private IStageRepository _stageRepository;
        private DetailInformationInterface _detailInformationRepository;

        public StageService(IStageRepository stageRepository, DetailInformationInterface detailInformationRepository)
        {
            _stageRepository = stageRepository;
            _detailInformationRepository = detailInformationRepository;
        }

        public bool GetPassCondition(int initiativeId, string flowType, string passCondition)
        {
            V_Initiative initiatives = _stageRepository.GetInitiativeViewsById(initiativeId);
            string nowStage = string.Empty;
            string nowStatus = string.Empty;
            var amount = initiatives.BenefitAmount;
            int maxCounterInitiativeActions = 0;

            if (!flowType.Equals("initiative"))
            {
                var initiativeStage = _stageRepository.GetInitiativeStageByIdAndFlowType(initiativeId, flowType);
                if (initiativeStage == null)
                {
                    throw new NullReferenceException($"Initiative Stage {initiativeId} And FlowType : {flowType} Is Empty");
                }
                nowStage = initiativeStage.Stage;
                nowStatus = initiativeStage.Status;
            }
            else
            {
                nowStage = initiatives.Stage;
                nowStatus = initiatives.Status;
            }

            var initiativeActions = _stageRepository.GetInitiativeActionById(initiativeId);
            maxCounterInitiativeActions = initiativeActions.FirstOrDefault(x => x.Stage == nowStage && x.FlowType == flowType).Counter;

            var nowInitiativeAction = initiativeActions.Where(x => x.Stage == nowStage && x.Counter == maxCounterInitiativeActions);

            if (passCondition.StartsWith("#"))
            {
                //SkipStage
                return this.GetSkipCondition(initiativeId, passCondition, flowType);
            }
            else if (passCondition.Equals("@submit"))
            {
                List<string> passConditionList = new List<string>() { "finish", "complete", "reject", "rejected", "cancelled" };
                if (passConditionList.Contains(nowStage))
                {
                    if (flowType.Equals("initiative"))
                    {
                        return false;
                    }
                    return true;
                }
                else if (nowStage == null)
                {
                    return true;
                }
                else
                {
                    var maxInitiativeId = nowInitiativeAction.Max(x => x.InitiativeId);
                    var maxPosition = nowInitiativeAction.Max(x => x.Position);
                    var maxCounter = nowInitiativeAction.Max(x => x.Counter);
                    var maxStage = nowInitiativeAction.Max(x => x.Stage);
                    var orderCondition = this.GetPass1PerRole(maxInitiativeId, maxPosition, maxCounter, maxStage);

                    var groupPosition = (from n in nowInitiativeAction
                                         group n by n.Position into g
                                         select new
                                         {
                                             maxInitiativeId = g.Max(x => x.InitiativeId),
                                             maxPosition = g.Max(x => x.Position),
                                             maxCounter = g.Max(x => x.Counter),
                                             maxStage = g.Max(x => x.Stage)
                                         }).ToList();
                    if (orderCondition)
                    {
                        groupPosition = groupPosition.OrderBy(x => x.maxPosition).ToList();
                    }
                    else
                    {
                        groupPosition = groupPosition.OrderBy(x => x.maxInitiativeId).ToList();
                    }

                    maxInitiativeId = groupPosition.Max(x => x.maxInitiativeId);
                    maxPosition = groupPosition.Max(x => x.maxPosition);
                    maxCounter = groupPosition.Max(x => x.maxCounter);
                    maxStage = groupPosition.Max(x => x.maxStage);

                    return this.GetPass1PerRole(maxInitiativeId, maxPosition, maxCounter, maxStage);
                }
            }
            else if (passCondition.Equals("@1perrole"))
            {
                var maxInitiativeId = nowInitiativeAction.Max(x => x.InitiativeId);
                var maxPosition = nowInitiativeAction.Max(x => x.Position);
                var maxCounter = nowInitiativeAction.Max(x => x.Counter);
                var maxStage = nowInitiativeAction.Max(x => x.Stage);
                var orderCondition = this.GetPass1PerRole(maxInitiativeId, maxPosition, maxCounter, maxStage);

                var groupPosition = (from n in nowInitiativeAction
                                     group n by n.Position into g
                                     select new
                                     {
                                         maxInitiativeId = g.Max(x => x.InitiativeId),
                                         maxPosition = g.Max(x => x.Position),
                                         maxCounter = g.Max(x => x.Counter),
                                         maxStage = g.Max(x => x.Stage)
                                     }).ToList();
                if (orderCondition)
                {
                    groupPosition = groupPosition.OrderBy(x => x.maxPosition).ToList();
                }
                else
                {
                    groupPosition = groupPosition.OrderBy(x => x.maxInitiativeId).ToList();
                }

                maxInitiativeId = groupPosition.Max(x => x.maxInitiativeId);
                maxPosition = groupPosition.Max(x => x.maxPosition);
                maxCounter = groupPosition.Max(x => x.maxCounter);
                maxStage = groupPosition.Max(x => x.maxStage);

                return this.GetPass1PerRole(maxInitiativeId, maxPosition, maxCounter, maxStage);
            }
            else if (passCondition.StartsWith("@allperrole"))
            {
                var maxInitiativeId = nowInitiativeAction.Max(x => x.InitiativeId);
                var maxPosition = nowInitiativeAction.Max(x => x.Position);
                var maxCounter = nowInitiativeAction.Max(x => x.Counter);
                var maxStage = nowInitiativeAction.Max(x => x.Stage);
                var orderCondition = this.GetPassAllPerRole(maxInitiativeId, maxPosition, maxCounter, maxStage);

                var groupPosition = (from n in nowInitiativeAction
                                     group n by n.Position into g
                                     select new
                                     {
                                         maxInitiativeId = g.Max(x => x.InitiativeId),
                                         maxPosition = g.Max(x => x.Position),
                                         maxCounter = g.Max(x => x.Counter),
                                         maxStage = g.Max(x => x.Stage)
                                     }).ToList();
                if (orderCondition)
                {
                    groupPosition = groupPosition.OrderBy(x => x.maxPosition).ToList();
                }
                else
                {
                    groupPosition = groupPosition.OrderBy(x => x.maxInitiativeId).ToList();
                }

                maxInitiativeId = groupPosition.Max(x => x.maxInitiativeId);
                maxPosition = groupPosition.Max(x => x.maxPosition);
                maxCounter = groupPosition.Max(x => x.maxCounter);
                maxStage = groupPosition.Max(x => x.maxStage);

                return this.GetPassAllPerRole(maxInitiativeId, maxPosition, maxCounter, maxStage);
            }

            return true;

        }

        public bool GetSkipCondition(int initiativeId, string skipCondition, string flowType)
        {

            if (skipCondition == "#skipbod")
            {
                var result = _stageRepository.LeftJoinCapexInformationsViewInitiativeByInitiativeId(initiativeId);
                if (result == null) return false;
                if (result.BudgetPeriod == "Current year")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (skipCondition == "#skipfixedasset")
            {
                DetailInformation_Old detailInformation = _stageRepository.GetDetailInformationById(initiativeId);
                if ((bool)detailInformation.FixedAsset)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (skipCondition == "#skipvac")
            {
                V_Initiative veiwInitiative = _stageRepository.GetInitiativeViewsByIdAndType(initiativeId, "max");
                var costEsOpexConvert = veiwInitiative.CostEstOpex * ((veiwInitiative.CostEstOpexType == "THB") ? 1 : veiwInitiative.FxExchange);
                if (veiwInitiative.RequestCapex == null || veiwInitiative.RequestOpex == null)
                {
                    return false;
                }
                else if (veiwInitiative.RequestCapex.StartsWith("false") || veiwInitiative.RequestOpex.StartsWith("false"))
                {
                    return true;
                }
                else if (costEsOpexConvert < 2 && costEsOpexConvert >= 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (skipCondition == "#skipopex")
            {
                V_Initiative veiwInitiative = _stageRepository.GetInitiativeViewsByIdAndType(initiativeId, "max");
                if (veiwInitiative.RequestCapex == null || veiwInitiative.RequestOpex == null)
                {
                    return false;
                }
                else if (veiwInitiative.RequestCapex.StartsWith("false") || veiwInitiative.RequestOpex.StartsWith("false"))
                {
                    return true;
                }
            }
            else if (skipCondition == "#costestcapex<=10")
            {
                V_Initiative viewInitiative = _stageRepository.GetInitiativeViewsById(initiativeId);
                var costEsCapexConvert = viewInitiative.CostEstOpex * ((viewInitiative.CostEstOpexType == "THB") ? 1 : viewInitiative.FxExchange);
                if (costEsCapexConvert <= 10)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (skipCondition == "#indirectbenefit")
            {
                var result = _stageRepository.LeftJoinViewInitiativeAndDetailInformationsByInitiativeId(initiativeId);
                if (result.PayBackPeriod < 3 && (bool)result.requireDirectBenefit)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else if (skipCondition == "#costestopex<=10")
            {
                V_Initiative viewInitiative = _stageRepository.GetInitiativeViewsById(initiativeId);
                var costEstTotal = (viewInitiative.CostEstCapex ?? 0) * ((viewInitiative.CostEstCapexType == "THB") ? 1 : viewInitiative.FxExchange ?? 0)
                                    + (viewInitiative.CostEstOpex ?? 0) * ((viewInitiative.CostEstOpexType == "THB") ? 1 : viewInitiative.FxExchange ?? 0);
                if (costEstTotal < 10)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (skipCondition == "#endindirect")
            {
                bool isPass;
                var result = _stageRepository.LeftJoinViewInitiativeAndDetailInformationsByInitiativeId(initiativeId);
                if (!(bool)result.requireDirectBenefit)
                {
                    isPass = true; //useless code from store , should re-define condition
                }
                else
                {
                    isPass = false; //useless code from store , should re-define condition
                }
                List<InitiativeAction> initiativeAction = _stageRepository.GetInitiativeActionById(initiativeId);
                int cntActionByActive2 = initiativeAction.Count(x => x.ActionResult == string.Empty && !(x.IsInactive ?? false) && x.FlowType == flowType);
                if (cntActionByActive2 > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (skipCondition == "#skipgate2")
            {
                var result = _stageRepository.LeftJoinViewInitiativeAndDetailInformationsByInitiativeId(initiativeId);
                if (result.SimProjectSkipGate2)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (skipCondition == "#notskipgate2")
            {
                var result = _stageRepository.LeftJoinViewInitiativeDetailInformationsAndLeftJoinProgressHeader(initiativeId);
                if (result.WbsNo != string.Empty)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (skipCondition == "#nosustain")
            {
                V_Initiative viewInitiative = _stageRepository.GetInitiativeViewsById(initiativeId);
                if (!viewInitiative.TypeOfInvestment.StartsWith("sustain"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (skipCondition == "#endflow")
            {
                List<InitiativeAction> initiativeAction = _stageRepository.GetInitiativeActionById(initiativeId);
                int cntActionByActive = initiativeAction.Where(x => x.ActionResult == string.Empty && (bool)!x.IsInactive && x.FlowType == flowType).Count();
                if (cntActionByActive > 0)
                {
                    return true;
                }
                else if (cntActionByActive <= 0)
                {
                    return false;
                }
            }
            else if (skipCondition == "#skipifrequestedcapex")
            {
                List<InitiativeStage> initiativeStage = _stageRepository.GetInitiativeStageById(initiativeId);
                int cntRec = initiativeStage.Count(x => x.FlowType == "requestcapex");
                if (cntRec > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (skipCondition == "#skipapp")
            {
                var initiativesView = _stageRepository.GetInitiativeViewsById(initiativeId);
                if (initiativesView.IsCreatedApp ?? false)
                {
                    return true;
                }
                return false;
            }
            else if (skipCondition == "#skipwbs")
            {
                var initiativesView = _stageRepository.GetInitiativeViewsById(initiativeId);
                if (initiativesView.IsCreatedWbs ?? false)
                {
                    return true;
                }
                return false;
            }
            else if (skipCondition == "#skiperprocess")
            {
                var initiativesView = _stageRepository.GetInitiativeViewsById(initiativeId);
                if ((initiativesView.TypeOfInvestment == "Engineering Request ER" || initiativesView.BudgetSource == "er") && initiativesView.InitiativeType == "directCapex")
                {
                    return true;
                }
                else if (initiativesView.InitiativeType == "Request Pool" && initiativesView.PoolType != "ER")
                {
                    return true;
                }
                return false;
            }
            else if (skipCondition == "#skipnotpx")
            {
                var initiativesView = _stageRepository.GetInitiativeViewsById(initiativeId);
                if (initiativesView.RequestProjectEngineer ?? false)
                {
                    return false;
                }
                return true;
            }
            else if (skipCondition == "#skipnoterprocess")
            {
                var initiativesView = _stageRepository.GetInitiativeViewsById(initiativeId);
                if ((initiativesView.TypeOfInvestment == "Engineering Request ER" || initiativesView.BudgetSource == "er")
                    && initiativesView.InitiativeType == "directCapex")
                {
                    return false;
                }
                else if (initiativesView.InitiativeType == "Request Pool" && initiativesView.PoolType != "ER")
                {
                    return false;
                }
                return true;
            }
            else if (skipCondition == "#skipnocapex")
            {
                var initiativesView = _stageRepository.GetInitiativeViewsById(initiativeId);
                if (initiativesView.RequestCapex == "false") // Nani???
                {
                    return true;
                }
                return false;
            }
            else if (skipCondition == "#requestPimAndCapex")
            {
                var initiativesJoinDetailsInformation = _stageRepository.LeftJoinViewInitiativeAndDetailInformationsByInitiativeId(initiativeId);
                if ((initiativesJoinDetailsInformation.RequestSubPic ?? false) && (initiativesJoinDetailsInformation.IsRequestCapex ?? false))
                {
                    return true;
                }
            }
            else if (skipCondition == "#passnocondition")
            {
                return true;
            }
            else if (skipCondition == "#skipnorequestpim")
            {
                var innerJoin = _stageRepository.InnerJoinInitiativeAndDetailInformationsByInitiativeId(initiativeId).FirstOrDefault(x => x.InitiativeType == "max");
                if (!innerJoin.RequestSubPic ?? false)
                {
                    return true;
                }
                return false;
            }
            else if (skipCondition == "#skipNoOpexOrNoRequestPim")
            {
                var innerJoin = _stageRepository.InnerJoinInitiativeAndDetailInformationsByInitiativeId(initiativeId).FirstOrDefault(x => x.InitiativeType == "max");
                if (innerJoin.RequestOpex.StartsWith("true") && (innerJoin.RequestSubPic ?? false))
                {
                    return false;
                }
                return true;
            }

            else if (skipCondition == "#skipFixedAssetOrNoRequestPim")
            {
                var innerJoin = _stageRepository.InnerJoinInitiativeAndDetailInformationsByInitiativeId(initiativeId).FirstOrDefault(x => x.InitiativeType == "max");
                if (innerJoin.FixedAsset ?? false)
                {
                    return true;
                }
                else if (!innerJoin.RequestSubPic ?? false)
                {
                    return true;
                }
                else if (innerJoin.RequestCapex.StartsWith("false"))
                {
                    return true;
                }
                else if (innerJoin.IsRequestCapex ?? false)
                {
                    return true;
                }
                return false;
            }
            else if (skipCondition == "#skipIsCapexLess50")
            {
                var initiative = _stageRepository.GetInitiativeViewsById(initiativeId);
                if ((initiative.CostEstCapex ?? 0) * ((initiative.CostEstCapexType == "THB") ? 1 : initiative.FxExchange ?? 1) < 50)
                {
                    return true;
                }
                return false;
            }

            return false;

        }

        public void SetIL0Date(int initiativeId, string flowType)
        {
            Initiative initiatives = _stageRepository.GetInitiativeById(initiativeId);
            DateTime? IL0Date = initiatives.UpdatedDate;

            DetailInformation_Old detailInformations = _stageRepository.GetDetailInformationById(initiativeId);
            detailInformations.IL0date = IL0Date;
            _detailInformationRepository.Update(detailInformations);
        }

        public void ShowDetailPIMTab(int initiativeId, string flowType)
        {
            Initiative initiatives = _stageRepository.GetInitiativeById(initiativeId);
            initiatives.DetailPimTabStatus = 1;
            _stageRepository.UpdateInitiative(initiatives);
        }

        public void DisableCAPEXTab(int initiativeId, string flowType)
        {
            Initiative initiatives = _stageRepository.GetInitiativeById(initiativeId);
            initiatives.CapexTabStatus = 2;
            _stageRepository.UpdateInitiative(initiatives);
        }

        public void ShowBestPracticeTab(int initiativeId, string flowType)
        {
            Initiative initiatives = _stageRepository.GetInitiativeById(initiativeId);
            initiatives.BestPracticeTabStatus = 1;
            _stageRepository.UpdateInitiative(initiatives);
        }

        public void ShowLookBackTab(int initiativeId, string flowType)
        {
            Initiative initiatives = _stageRepository.GetInitiativeById(initiativeId);
            initiatives.LookbackTabStatus = 1;
            _stageRepository.UpdateInitiative(initiatives);
        }

        public bool GetPass1PerRole(int initiativeId, string role, int maxCounter, string Stage)
        {
            int countApprover = -1;
            int countApproved = -2;
            List<InitiativeAction> initiativeActions = _stageRepository.GetInitiativeActionById(initiativeId);
            countApprover = initiativeActions.Count();
            countApprover = initiativeActions.Where(x => x.Counter == maxCounter && x.Stage == Stage && x.Position == role).Count();
            List<string> actionResultList = new List<string>() { "approve", "forward", "backward", "reject", "revise", "reject cancellation", "approve cancellation" };
            countApproved = initiativeActions.Where(x => x.Counter == maxCounter && x.Stage == Stage && x.Position == role && x.ActionResult != string.Empty && actionResultList.Contains(x.ActionResult)).Count();
            return countApproved > 0 ? true : false;
        }

        public bool GetPassAllPerRole(int initiativeId, string role, int maxCounter, string stage)
        {
            string initiativeType = string.Empty;
            bool? requireDirectBenefit = false;
            bool? requireIndirectBenefit = false;
            V_Initiative viewInitiative = _stageRepository.GetInitiativeViewsById(initiativeId);
            initiativeType = viewInitiative.InitiativeType;
            DetailInformation_Old detailInformation = _stageRepository.GetDetailInformationById(initiativeId);
            requireDirectBenefit = detailInformation.requireDirectBenefit;
            requireIndirectBenefit = detailInformation.RequireIndirectBenefit;

            int countApprover = -1;
            int countApproved = -2;
            List<InitiativeAction> initiativeActions = _stageRepository.GetInitiativeActionById(initiativeId);
            countApprover = initiativeActions.Where(x => x.Counter == maxCounter && x.Stage == stage && x.Position == role).Count();
            List<string> actionResult = new List<string>() { "approve", "forward", "backward", "reject", "revise", "reject cancellation", "approve cancellation" };
            countApproved = initiativeActions.Where(x => x.Counter == maxCounter && x.Stage == stage && x.Position == role && x.ActionResult != string.Empty && actionResult.Contains(x.ActionResult)).Count();

            if (role == "@sponsor" && initiativeType == "dim" && requireDirectBenefit == false)
            {
                return true;
            }
            else if (countApproved == countApprover)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
