using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.DetailInformation;

namespace PTT_GC_API.Data.Interface
{
    public interface FrequencyInterface
    {
        Task<IEnumerable<Frequency>> GetList();
    }
}