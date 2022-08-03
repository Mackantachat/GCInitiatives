using PTT_GC_API.Models.KRI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface IKpiKriMaintain
    {
        Task<List<MaintainKpi>> GetMaintainKpiByYear(string year);
        Task<List<KriProgressMitigation>> GetProgreessMitigationByMaintainId(int maintainId);
        Task<List<KriDetailMonth>> GetKriDetailMonthByMaintainId(int maintainId);

        // Maintain - KPI
        Task<int>AddRangeAsync(IEnumerable<MaintainKpi> entities,string year);
        Task<List<MaintainKpi>> GetMaintainKpis(string year);
        Task<MaintainKpi> GetMaintainKpiById(int id);
        Task<object>GetKriKpiModel(string year, int id, string username);

        Task<int>PostKpiKriModel(int id, KpiKriModel km);
        Task SendMailInform(InformKri informKri);
        Task<object> CheckkpiExist(int id);
    }
}
