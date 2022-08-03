using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.EntryMode;

namespace PTT_GC_API.Data.Interface
{
    public interface EntryModeInterface
    {
        Task<IEnumerable<EntryMode>> GetList();
    }
}