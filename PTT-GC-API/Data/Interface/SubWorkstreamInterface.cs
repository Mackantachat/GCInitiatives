using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Models.DetailInformation;

namespace PTT_GC_API.Data.Interface
{
    public interface SubWorkstreamInterface
    {
        Task<IEnumerable<string>> GetAll();
        Task<IEnumerable<SubWorkstream>> GetList(string name);
        Task<IEnumerable<string>> GetSubWorkstream1(string name);
    }
}