using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.DetailInformation;
using PTT_GC_API.Models.EMOCs;

namespace PTT_GC_API.Data.Interface
{
    public interface KpisInterface
    {
        Task<IEnumerable<Kpis>> GetList();
        //public bool InsertKpis(MaintainKpi maintainKpi);

        //void AddRange(IEnumerable<MaintainKpi> entities);

        //public Task <List<MaintainKpi>>GetMaintainKpi();
    }
}