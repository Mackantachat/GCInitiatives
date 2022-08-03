using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Dtos.MaxApprover;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Owner;

namespace PTT_GC_API.Data.Interface
{
    public interface OwnerInterface
    {
        Task<IEnumerable<Owner>> GetList(OwnerParams OwnerParams);
        Task<IEnumerable<Owner>> GetEmailList(OwnerParams OwnerParams);
        Task<Owner> GetName(OwnerParams OwnerParams);
        Task<Owner> GetEmail(OwnerParams OwnerParams);
        Task<Owner> GetNameMaxApprover(NameMaxApprover NameMaxApprover);
        Task<List<string>> GetOwnerName();
        public Task<List<string>> GetTeamSupportName();
        Task<Owner> GetVP(OwnerParams OwnerParams);
        Task<Owner> GetUser(string username);
    }
}