using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.CapexInformation;
using PTT_GC_API.Models.CoDeveloper;
namespace PTT_GC_API.Data.Interface
{
    public interface DetailCapexsInterface
    {
        void Add<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
    }
}