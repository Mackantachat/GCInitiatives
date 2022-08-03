using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.TypeOfInvestment;

namespace PTT_GC_API.Data.Interface
{
    public interface TypeOfInvestmentInterface
    {
        Task<IEnumerable<TypeOfInvestment>> GetList();
    }
}