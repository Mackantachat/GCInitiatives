using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.TypeOfBenefit;

namespace PTT_GC_API.Data.Interface
{
    public interface TypeOfBenefitInterface
    {
        Task<IEnumerable<TypeOfBenefit>> GetListRecurringAndOneTime();
        Task<IEnumerable<TypeOfBenefit>> GetListImplementationCost();
    }
}