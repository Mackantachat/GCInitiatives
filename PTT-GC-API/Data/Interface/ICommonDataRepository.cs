using PTT_GC_API.API.Helpers;
using PTT_GC_API.Dtos.CommonData;
using PTT_GC_API.Models.CommonData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface ICommonDataRepository
    {
        // Insert Common Data
        public int InsertCommonData(List<CommonDataSettingModel> commonData);
        // public Task<List<CommonDataSettingModel>> GetCommonDataModel();
        public List<CommonDataSetting> GetTopic();
        public Task<List<CommonDataSettingModel>> GetCommonDataModel(string dataType, string criteria, int pageSize, int pageNumber, string orderByFieldName, string sortDirection);
        public Task<Object> GetDataDetail(string dataType, string criteria, int pageSize, int pageNumber, string orderByFieldName, string sortDirection);
        public Task<List<StdProjectDefRes>> GetStdProjectDef(StdProjectDefParams projectDefParams);

        public CommonData GetResponsibleEng(string projectEngineer);
        public Task<List<CommonData>> GetResponsibleNoEng(string codeOfVP);
        public bool UpdateCommonData(List<CommonDataSettingModel> model);
        public int Delete(string Datatype);
        public int AddSingleCommonData(CommonData data);
        public int DeleteSingleCommonDataById(int id);
        public List<CommonData> GetSapDropdown(string Type, int InitiativeId, string AreaPlant);
        Task<List<CommonData>> GetBuStream();
        Task<List<string>> GetCurrencyFloatFx();

        public List<CommonData> GetKnowledgeThemesDropDown();

        public List<CommonData> GetBusinessLineDropDown();

        public List<CommonData> GetProjectTypeDropDown();
        public List<CommonData> GetOperationalFunctionDropDown();
        public List<CommonData> GetOperationalUnitDropDown();
        public List<CommonData> GetEquipmentTypeDropDown();
        public List<CommonData> GetProductGroupDropDown();
        public List<CommonData> GetAreaOfLearningDropDown();
        public List<CommonData> GetOEMSElementDropDown();
        public Task<List<CommonData>> GetCommonDataByType(string dataType);
        Task<CommonData> GetCurrencyFxRate();

    }
}
