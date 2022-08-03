using PTT_GC_API.API.Helpers;
using PTT_GC_API.Dtos.SettingChart;
using PTT_GC_API.Models.SettingChart;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface CustomReportHeaderInterface
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
        Task<CustomReportHeaderPagination> GetAllReportHeader(int currentPage, int itemPerPage, string searchText, string[] dashboardType, string username);
        Task<bool> DeleteCustomReport(int id);
        Task<CustomReportMerge> GetCustomReport(int id);
        Task<CustomReportMerge> CreateCustomReport(CustomReportMerge customReportMerge);
        Task<CustomReportMerge> UpdateCustomReport(CustomReportMerge customReportMerge);
        Task<bool> DuplicateReportById(int reportId, DuplicateReport duplicateReport);

        Task<IEnumerable<CustomReportReportType>> GetReportType();
        Task<IEnumerable<CustomReportStageType>> GetStageType();
        Task<IEnumerable<V_Graph_DDL_X_Axis>> GetXAxis(string StageType);
        Task<IEnumerable<V_Graph_DDL_Y_Axis>> GetYAxis(string StageType);
        Task<IEnumerable<V_Graph_DDL_Param>> GetAllParam(string ReportType);
        Task<IEnumerable<V_CustomExcel1_Y>> GetCustomExcelYAxis(string ReportType);
        Task<ItemDropdown[]> GetItemDropdowns(ParamDropdown paramDropdown);
    }
}
