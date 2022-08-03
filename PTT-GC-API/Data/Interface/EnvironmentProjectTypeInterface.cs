using PTT_GC_API.Dtos.EnvironmentProjectType;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface EnvironmentProjectTypeInterface
    {

        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
        Task<List<EnvironmentProjectTypeList>> GetEnvironmentProjectTypeListAll();
        Task<List<EnvironmentProjectTypeList>> GetEnvironmentProjectTypeListAllProjectLookbackId(int id,string type);
        Task<List<EnvironmentProjectTypeList>> GetEnvironmentProjectTypeAllByProjectLookbackId(int id);
        Task<bool> GetEnvironmentProjectTypeByIdThenDelete(int id);
        Task<EnvironmentProjectType> GetEnvironmentProjectTypeByID(int id);
    }
}
