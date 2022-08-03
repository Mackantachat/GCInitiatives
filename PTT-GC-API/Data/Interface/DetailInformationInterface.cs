using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Dtos.DetailMaxInformation;
using PTT_GC_API.Models.DetailInformation;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Interface
{
    public interface DetailInformationInterface
    {
        void Add<T>(T entity) where T: class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T: class;
        Task<bool> Save();
        Task<bool> Any();
        Task<bool> DetailInformationDelete(int id);
        Task<DetailInformation_Old> GetDetailInformation(int id);
        Task<CreateKpiDetailInformation> CreateKpiDetailInformation(int id, CreateKpiDetailInformation CreateKpiDetailInformation);

        Task<PimGate> CreateDetailPimGate(PimGateCreate pg,int id);
        Task<PimGate> UpdateDetailPimGate(PimGateCreate pg, int id);
        Task<PimGateCreate> GetDetailPimGate(int id, int gate);
        Task<int> UpdateHighlightWork(int id, HighlightWork data);
        Task<int> CreateTeamSupports(int id, List<string> data);
        Task<int> CreateTeamSupportComments(int id, List<TeamSupportComments> data);
        Task<int> DeleteTeamSupportComment(int id);
        Task<List<TeamSupports>> GetTeamSupports(int id);
        Task<List<TeamSupportComments>> GetTeamSupportComments(int id);
        Task<int> SendEmailTeamSupport(int id);
        Task<PimGateConfig> ShowPimGate(int id);
    }
}