using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Dtos.ImpactTracking;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.ImpactTracking;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Interface
{
    public interface ImpactTrackingInterface
    {
        void Add<T>(T entity) where T: class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T: class;
        Task<bool> Save();
        Task<bool> Any();
        Task<bool> ImpactTrackingDelete(int id);
        Task<ImpactTracking> GetImpactTracking(int id);
        Task<FirstRunRateCreate> CreateFirstRunRate(int id, FirstRunRateCreate firstRunRateCreate);
        Task<IEnumerable<ImpactTypeOfBenefit>> GetFirstRunRate(int id);
        Task<IndirectCreate> CreateIndirect(int id, IndirectCreate IndirectCreate);
        Task<IEnumerable<ImpactTypeOfBenefit>> GetIndirect(int id);
        Task<ImpiemantCostCreate> CreateImpiemantCost(int id, ImpiemantCostCreate impiemantCostCreate);
        Task<bool> DeleteImpiemantCost(int id);
        Task<IEnumerable<ImpactTypeOfBenefit>> GetImpiemantCost(int id);
        Task<TypeBenefitCreate> CreateTypeOfBenefit(int id, TypeBenefitCreate typeBenefitCreate);
        Task<IEnumerable<ImpactTypeOfBenefit>> GetTypeOfBenefit(int id);
        Task<CreateWorkstream> CreateWorkstream(int id, CreateWorkstream CreateWorkstream);
        Task<bool> DeleteShareBenefitWorkstream(int id);
        Task<decimal?> GetTotalRecurring(int initiativeId);
        Task<decimal?> GetTotalOnetime(int initiativeId);
        Task<ImpactTrackingAll> GetImpactAllTracking(int initiativeId);
        Task<ImpactTrackingCreate> CreateImpactAllTracking(ImpactTrackingCreate impactTracking, string actionType);
        Task<ImpactTrackingCreate> UpdateImpactAllTracking(ImpactTrackingCreate impactTracking, string actionType);
    }
}