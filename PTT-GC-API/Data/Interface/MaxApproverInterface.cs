using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Dtos.MaxApprover;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Interface
{
    public interface MaxApproverInterface
    {
        Task<IEnumerable<MaxApproverSetting>> GetWorkstreamList(Workstream Workstream);
        Task<IEnumerable<MaxApproverSetting>> GetSubWorkstream(Workstream Workstream);
        Task<MaxApprover> GetWorkstreamLead(int id);
        Task<MaxApprover> CreateWorkstreamLead(int id, WorkstreamLead Workstream);
        Task<string[]> CreateSponsor(int id, string[] form);
        Task<string[]> CreateFinance(int id, string[] form);
        Task<string[]> CreateCFO(int id, string[] form);
        Task<string[]> CreateCTO(int id, string[] form);
        Task<string[]> CreateTOTeam(int id, string[] form);
        Task<string[]> CreateTfBtTO(int id, string[] form);
        Task<string[]> CreateTOFinanceIL4(int id, string[] form);
        Task<string[]> CreateTOFinanceIL5(int id, string[] form);
        Task<string[]> CreateFinanceExpert(int id, string[] form);
    }
}