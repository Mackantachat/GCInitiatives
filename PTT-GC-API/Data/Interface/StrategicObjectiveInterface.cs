using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.Strategy;

namespace PTT_GC_API.Data.Interface
{
    public interface StrategicObjectiveInterface
    {
        Task<IEnumerable<StrategicObjective>> GetList(string year);
        public string GetStrategicObjectiveYear();
    }
}