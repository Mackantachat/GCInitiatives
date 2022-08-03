using PTT_GC_API.API.Helpers;
using PTT_GC_API.Dtos.PerformanceInactive;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.PerformanceInactive;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface PerformanceInactiveInterface
    {

        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
        Task<PerformanceInactive> LastPerformanceInactive();
        Task<PagedList<PerformanceInactive>> GetPerformanceInactive(PerformanceInactiveParams PerformanceInactiveParams);
        Task<PerformanceInactive> GetPerformanceInactive(int id);
        Task<List<PerformanceInactiveList>> GetPerformanceInactiveSearch(DateTime period);
        Task<List<PerformanceInactiveList>> GetPerformanceInactiveAll();
        Task<object> GetInitiativeCode();
        Task<object> SearchInitiativeCode(string param);
    }
}
