using PTT_GC_API.Models.DetailInformation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface ProcurementInterface
    {
        Task<IEnumerable<Procurement>> GetProcurementCategory();
        Task<IEnumerable<Procurement>> GetProcurementSubCategory();
        Task<IEnumerable<Procurement>> GetProcurementLever();
    }
}
