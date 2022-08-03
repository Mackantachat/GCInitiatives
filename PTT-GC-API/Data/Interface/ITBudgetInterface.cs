using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Dtos.ITBudget;
using PTT_GC_API.Models.ITBudget;

namespace PTT_GC_API.Data.Interface
{
    public interface ITBudgetInterface
    {
        void Add<T>(T entity) where T: class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T: class;
        Task<bool> Save();
        Task<IEnumerable<ITBudgetSurvey>> GetITBudget(int id);
        Task<IEnumerable<ITAsset>> GetHardwareList();
        Task<IEnumerable<ITAsset>> GetSoftwareList();
        Task<IEnumerable<ITBudgetSurveyAsset>> GetHardware(int id);
        Task<IEnumerable<ITBudgetSurveyAsset>> GetSoftware(int id);
        Task<CreateHardware> CreateHardware(int id, CreateHardware CreateHardware);
        Task<CreateSoftware> CreateSoftware(int id, CreateSoftware CreateSoftware);
        Task<IEnumerable<CapexTopic>> GetCapexTopic();
        Task<IEnumerable<CapexTopic>> GetCapexTopicVersion(int version);
        Task<CreateCapexBudgetSurvey> CreateCapexBudgetSurvey(int id, CreateCapexBudgetSurvey CreateCapexBudgetSurvey);
        Task<CapexBudgetSurvey[]> CreateCapexBudgetSurveyNew(int id, CapexBudgetSurvey[] CreateCapexBudgetSurvey);
        Task<IEnumerable<CapexBudgetSurvey>> GetCapexBudgetSurvey(int id);
        Task<IEnumerable<ITAsset>> GetHardwareVersionList(int version);
        Task<IEnumerable<ITAsset>> GetSoftwareVersionList(int version);
        Task<int> GetLastSurveyVersions();
    }
}