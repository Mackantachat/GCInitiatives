using PTT_GC_API.Models.TempHRWebService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface HRWebServiceInterface
    {
         Task<IEnumerable<TempHRWebService>> GetList();
    }
}
