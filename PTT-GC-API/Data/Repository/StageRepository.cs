using AutoMapper;
using PTT_GC_API.Dtos.NewApprovalSystem;
using PTT_GC_API.Dtos.SkipStageJoinModel;
using PTT_GC_API.Models.ApprovalFlow;
using PTT_GC_API.Models.CapexInformation;
using PTT_GC_API.Models.ImpactTracking;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.ProgressAndMilestone;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public interface IStageRepository
    {
        public V_Initiative GetInitiativeViewsById(int id);
        public InitiativeStage GetInitiativeStageByIdAndFlowType(int id, string flowType);
        public List<InitiativeAction> GetInitiativeActionById(int initiativeId);
        public DetailInformation_Old GetDetailInformationById(int initiativeId);
        public JoinCapexInformationInitiativesModel LeftJoinCapexInformationsViewInitiativeByInitiativeId(int initiativeId);
        public V_Initiative GetInitiativeViewsByIdAndType(int id, string type);
        public JoinViewInitiativeAndDetailInformationsModel LeftJoinViewInitiativeAndDetailInformationsByInitiativeId(int initiativeId);
        public JoinViewInitiativeAndDetailInformationsAndProgressHeader LeftJoinViewInitiativeDetailInformationsAndLeftJoinProgressHeader(int initiativeId);
        public List<InitiativeStage> GetInitiativeStageById(int initiativeId);
        public List<JoinViewInitiativeAndDetailInformationsModel> InnerJoinInitiativeAndDetailInformationsByInitiativeId(int initiativeId);
        public Initiative GetInitiativeById(int id); //To move to another services
        public void UpdateInitiative(Initiative initiatives);  //To move to another services
        public List<ImpactTypeOfBenefit> GetImpactTypeOfBenefits(int initiativesId);
        public void UpdateImpactTypeOfBenefits(ImpactTypeOfBenefit impactTYpeOfBenefitsRecords);
        public List<JoinImpactTypeOfBenefitsAndImpactTracking> JoinImpactTypeOfBenefitsAndImpactTracking(int initiativeId);
        public InitiativeStageDetail GetDetailCurrentStageFromDetail(ApprovalNewSystemParam approvalNewSystemParam);
        public JoinPimGateAndInitiatives InnerJoinPimGateAndInitiativesById(int initiativeId,int GateNumber);
    }

    public class StageRepository : IStageRepository
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public StageRepository(DataContext context, IMapper mapper)
        {
            this._context = context;
            _mapper = mapper;
        }

        public InitiativeStage GetInitiativeStageByIdAndFlowType(int initiativeId, string flowType)
        {
            return _context.InitiativeStage.FirstOrDefault(x => x.InitiativeId == initiativeId && x.FlowType == flowType);
        }

        public V_Initiative GetInitiativeViewsById(int id)
        {
            return _context.V_Initiative.FirstOrDefault(x => x.Id == id);
        }

        public List<InitiativeAction> GetInitiativeActionById(int initiativeId)
        {
            return _context.InitiativeActions.Where(x => x.InitiativeId == initiativeId).ToList();
        }

        public DetailInformation_Old GetDetailInformationById(int initiativeId)
        {
            return _context.DetailInformations.FirstOrDefault(x => x.InitiativeId == initiativeId);
        }

        public List<InitiativeStage> GetInitiativeStageById(int initiativeId)
        {
            return _context.InitiativeStage.Where(x => x.InitiativeId == initiativeId).ToList();
        }

        public V_Initiative GetInitiativeViewsByIdAndType(int id, string type)
        {
            return _context.V_Initiative.FirstOrDefault(x => x.Id == id && x.InitiativeType == type);
        }

        public JoinCapexInformationInitiativesModel LeftJoinCapexInformationsViewInitiativeByInitiativeId(int initiativeId)
        {
            int capexInformationMaxSequent = _context.CapexInformations.Where(x => x.InitiativeId == initiativeId).Max(x => x.Sequent) ?? 0;

            var result = (from capexInformations in _context.CapexInformations.Where(x => x.InitiativeId == initiativeId)
                          join v_initiative in _context.V_Initiative.Where(x => x.Id == initiativeId)
                          on capexInformations.InitiativeId equals v_initiative.Id into joinCapexinformationInitiatives
                          from record in joinCapexinformationInitiatives.DefaultIfEmpty()
                          select _mapper.Map(record,
                                              _mapper.Map<JoinCapexInformationInitiativesModel>(capexInformations))).ToList();
            return result.FirstOrDefault(x => x.Sequent == capexInformationMaxSequent);
        }

        public JoinViewInitiativeAndDetailInformationsModel LeftJoinViewInitiativeAndDetailInformationsByInitiativeId(int initiativeId)
        {
            var result = (from viewInitiative in _context.V_Initiative.Where(x => x.Id == initiativeId)
                          join detailInformations in _context.DetailInformations.Where(x => x.InitiativeId == initiativeId)
                          on viewInitiative.Id equals detailInformations.InitiativeId
                          into joinViewInitiative
                          from record in joinViewInitiative.DefaultIfEmpty()
                          select _mapper.Map(record,
                                            _mapper.Map<JoinViewInitiativeAndDetailInformationsModel>(viewInitiative))).ToList();
            return result.FirstOrDefault();
        }

        public JoinViewInitiativeAndDetailInformationsAndProgressHeader LeftJoinViewInitiativeDetailInformationsAndLeftJoinProgressHeader(int initiativeId)
        {
            var result = (from viewInitiative in _context.V_Initiative.Where(x => x.Id == initiativeId)
                          join detailInformations in _context.DetailInformations.Where(x => x.InitiativeId == initiativeId)
                          on viewInitiative.Id equals detailInformations.InitiativeId
                          join progressHeader in _context.ProgressHeader.Where(x => x.InitiativeId == initiativeId)
                          on viewInitiative.Id equals progressHeader.InitiativeId
                          into joinViewInitiative
                          from record in joinViewInitiative.DefaultIfEmpty()
                          select _mapper.Map(record,
                                             _mapper.Map<JoinViewInitiativeAndDetailInformationsAndProgressHeader>(viewInitiative)))
                                           .ToList();
            return result.FirstOrDefault();
        }

        public List<JoinViewInitiativeAndDetailInformationsModel> InnerJoinInitiativeAndDetailInformationsByInitiativeId(int initiativeId)
        {
            return (from initiatives in _context.V_Initiative
                    join detailInformation in _context.DetailInformations
                    on initiatives.Id equals detailInformation.InitiativeId into joinedContext
                    from record in joinedContext
                    select _mapper.Map(record,
                                       _mapper.Map<JoinViewInitiativeAndDetailInformationsModel>(initiatives))
                       ).Where(x => x.Id == initiativeId).ToList();
        }

        #region Initiative  
        public Initiative GetInitiativeById(int id)
        {
            return _context.Initiatives.FirstOrDefault(x => x.Id == id);
        }

        public void UpdateInitiative(Initiative initiatives)
        {
            _context.Initiatives.Update(initiatives);
            _context.SaveChanges();
        }
        #endregion

        #region ImpactTypeOfBenefits
        public List<ImpactTypeOfBenefit> GetImpactTypeOfBenefits(int initiativesId)
        {
            var result = _context.ImpactTypeOfBenefits.Where(x => x.InitiativeId == initiativesId).ToList();
            return result;
        }

        public void UpdateImpactTypeOfBenefits(ImpactTypeOfBenefit impactTYpeOfBenefitsRecords)
        {
            _context.ImpactTypeOfBenefits.Update(impactTYpeOfBenefitsRecords);
            _context.SaveChanges();
        }

        public List<JoinImpactTypeOfBenefitsAndImpactTracking> JoinImpactTypeOfBenefitsAndImpactTracking(int initiativeId)
        {
            var impactTypeOfBenefitsJoined1 = (from floatBen in _context.ImpactTypeOfBenefits
                                               join fixBen in _context.ImpactTypeOfBenefits
                                               on floatBen.InitiativeId equals fixBen.InitiativeId
                                               into joined1
                                               from p in joined1.DefaultIfEmpty()
                                               select new JoinImpactTypeOfBenefitsAndImpactTracking()
                                               {
                                                   FloatBen = floatBen,
                                                   FixBen = p
                                               })
                                               .Where(x => x.FixBen.VersionPrice == "FixedFX").ToList();

            var results = (from impactTypeOfBenefits in impactTypeOfBenefitsJoined1
                           join impactTracking in _context.ImpactTrackings
                           on impactTypeOfBenefits.FloatBen.InitiativeId equals impactTracking.InitiativeId
                           into joined2
                           from p in joined2.DefaultIfEmpty()
                           select new JoinImpactTypeOfBenefitsAndImpactTracking
                           {
                               FixBen = impactTypeOfBenefits.FixBen,
                               FloatBen = impactTypeOfBenefits.FloatBen,
                               ImpactTracking = p
                           })
                           .Where(x => x.FloatBen.VersionPrice == "FloatFX"
                                       && x.FixBen.InitiativeId == initiativeId)
                           .ToList();

            return results;
        }
        #endregion

        public InitiativeStageDetail GetDetailCurrentStageFromDetail(ApprovalNewSystemParam approvalNewSystemParam)
        {
            //Code from initiative Repository
            if (approvalNewSystemParam.ActionType == "switch process")
            {

                var maxHistoryStageDetail = _context.InitiativeStageDetail.Where(
                i => i.InitiativeId == approvalNewSystemParam.InitiativeId
                && i.Process == approvalNewSystemParam.Process
                && i.Subtype == approvalNewSystemParam.SubType
                && i.CurrentStage == approvalNewSystemParam.NowStage
                && i.CurrentStatus == approvalNewSystemParam.NowStatus
                && i.FlowType == approvalNewSystemParam.FlowType
                ).OrderByDescending(i => i.HistoryId).FirstOrDefault();

                var nowStageDetail = _context.InitiativeStageDetail.Where(
                    i => i.InitiativeId == approvalNewSystemParam.InitiativeId
                    && i.Process == approvalNewSystemParam.Process
                    && i.Subtype == approvalNewSystemParam.SubType
                    && i.CurrentStage == approvalNewSystemParam.NowStage
                    && i.CurrentStatus == approvalNewSystemParam.NowStatus
                    && i.FlowType == approvalNewSystemParam.FlowType
                    && i.HistoryId == (maxHistoryStageDetail == null ? 0 : maxHistoryStageDetail.HistoryId)
                    ).FirstOrDefault();

                return nowStageDetail;
            }
            else
            {
                var maxHistoryStageDetail = _context.InitiativeStageDetail.Where(
                    i => i.InitiativeId == approvalNewSystemParam.InitiativeId
                    && i.Process == approvalNewSystemParam.Process
                    && i.Subtype == approvalNewSystemParam.SubType
                    && i.CurrentStage == approvalNewSystemParam.NowStage
                    && i.CurrentStatus == approvalNewSystemParam.NowStatus
                    && i.FlowType == approvalNewSystemParam.FlowType
                    ).OrderByDescending(i => i.HistoryId).FirstOrDefault();

                var nowStageDetail = _context.InitiativeStageDetail.Where(
                    i => i.InitiativeId == approvalNewSystemParam.InitiativeId
                    && i.Process == approvalNewSystemParam.Process
                    && i.Subtype == approvalNewSystemParam.SubType
                    && i.CurrentStage == approvalNewSystemParam.NowStage
                    && i.CurrentStatus == approvalNewSystemParam.NowStatus
                    && i.FlowType == approvalNewSystemParam.FlowType
                    && i.HistoryId == (maxHistoryStageDetail == null ? 0 : maxHistoryStageDetail.HistoryId)
                    ).FirstOrDefault();

                return nowStageDetail;
            }

        }

        public JoinPimGateAndInitiatives InnerJoinPimGateAndInitiativesById(int initiativeId, int GateNumber)
        {
            var result = (from PIM in _context.PimGate.Where(x => x.InitiativeId == initiativeId)
                          join initiatives in _context.Initiatives on PIM.InitiativeId equals initiatives.Id
                          into groupJoined
                          from item in groupJoined
                          select new JoinPimGateAndInitiatives
                          {
                              Initiatives = item,
                              PimGate = PIM
                          }).FirstOrDefault();

            return result;
        }
    }
}
