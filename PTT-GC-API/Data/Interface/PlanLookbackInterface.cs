using PTT_GC_API.Dtos.Lookback;
using PTT_GC_API.Dtos.LookbackReview;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface PlanLookbackInterface
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
        Task<int> LastIdPlanLookBack();
        Task<List<LookbackList>> GetPlanLookbackAll();
        Task<LookbackList> GetPlanLookbackByID(int id);
    }
}
