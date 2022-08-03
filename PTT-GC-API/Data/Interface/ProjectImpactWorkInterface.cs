using PTT_GC_API.Dtos.ProjectImpactWork;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface ProjectImpactWorkInterface
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
        Task<List<ProjectImpactWorkList>> GetProjectImpactWorkAll();
        Task<ProjectImpactWork> GetProjectImpactWorkByID(int id);
    }
}
