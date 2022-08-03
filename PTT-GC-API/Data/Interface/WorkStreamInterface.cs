using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.WorkStream;

namespace PTT_GC_API.Data.Interface
{
    public interface WorkStreamInterface
    {
        Task<IEnumerable<WorkStream>> GetList();
    }
}