using System.Threading.Tasks;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Interface
{
    public interface LogCommentInterface
    {
        Task<bool> Save();
        Task<Audit> GetAudit(int id);
    }
}