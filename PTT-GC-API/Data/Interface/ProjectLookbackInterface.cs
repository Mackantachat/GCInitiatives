using PTT_GC_API.Dtos.ProjectLookback;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface ProjectLookbackInterface
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
        Task<List<ProjectLookbackList>> GetProjectLookbackAll();
        Task<List<ProjectLookbackList>> GetProjectLookbackItem();
        Task<ProjectLookback> GetProjectLookbackByID(int id);
        Task<Object> GetDataFromSAP(int id);
    }
}
