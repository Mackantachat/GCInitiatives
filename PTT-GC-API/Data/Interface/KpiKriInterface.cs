using PTT_GC_API.Models.EMOCs;
using PTT_GC_API.Models.KRI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface KpiKriInterface
    {
        // kpi-maintain
        void AddRange(IEnumerable<MaintainKpi> entities);

        Task<List<MaintainKpi>> GetMaintainKpis(string year);

        Task <List<KriDetailMonth>> GetKpiEvaluate(int id, string year);
    }
}
