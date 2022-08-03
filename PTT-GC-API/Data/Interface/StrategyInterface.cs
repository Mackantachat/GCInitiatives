using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.Strategy;

namespace PTT_GC_API.Data.Interface
{
    public interface StrategyInterface
    {
        Task<IEnumerable<Strategy>> GetList(int strategicObjectiveId);
    }
}