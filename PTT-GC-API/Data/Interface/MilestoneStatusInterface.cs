using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.Milestone;

namespace PTT_GC_API.Data.Interface
{
    public interface MilestoneStatusInterface
    {
        Task<IEnumerable<MilestoneStatus>> GetList();
    }
}