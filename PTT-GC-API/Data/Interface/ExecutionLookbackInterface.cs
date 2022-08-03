using PTT_GC_API.Dtos.ExecutionLookback;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface ExecutionLookbackInterface
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
        Task<List<ExecutionLookbackList>> GetExecutionLookbackAll();
        Task<ExecutionLookback> GetExecutionLookbackByID(int id);
    }
}
