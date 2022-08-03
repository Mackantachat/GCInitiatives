using PTT_GC_API.Dtos.CimLookback;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface CimLookbackInterface
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
        Task<List<CimLookbackList>> GetCimLookbackAll();
        Task<CimLookback> GetCimLookbackByID(int id);
        public Task<List<CimLookback>> GetLookbackCimListByProjectId(int id);
    }
}