using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Dtos.Audit;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Audits;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Interface
{
    public interface AuditInterface
    {
        Task<PagedList<V_Audit>> GetAudits(AuditParams AuditParams);
        public Task<int> InsertData(Audits auditData);
        Task<int> CallFullLog(LogParams logParams);
        Task<bool> CallAuditLog(LogParams logParams);
    }
}