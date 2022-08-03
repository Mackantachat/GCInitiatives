using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface InitiativeStatusTrackingInterface
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();

        Task<int> LastHistoryId(int id);
        void AddInitiativeStatusTracking(InitiativeStatusTracking initiativeStatusTracking);
        Task<bool> CreateInitiativeStatusTrackings(InitiativeStatusTracking[] initiativeStatusTrackings);
        Task<int> RemoveInitiativeStatusTrackingByInitiativeId(int initiativeId);
    }
}
