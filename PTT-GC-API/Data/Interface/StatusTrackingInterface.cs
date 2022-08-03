using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Dtos.StatusTracking;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Interface
{
    public interface StatusTrackingInterface
    {
        Task<IEnumerable<StatusTrackingsWithDisplayName>> GetList(int id);
        Task<InitiativeStatusHistory> GetApproveComment(int id, ApproveComment ApproveComment);
        Task<IEnumerable<InitiativeStatusHistory>> GetHistoryStatus(int id, HistoryStatus HistoryStatus);
        Task<IEnumerable<InitiativeStatusHistory>> GetHistoryStatusList(int id);
    }
}