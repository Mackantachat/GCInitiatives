using PTT_GC_API.Models.DimMaxHandover;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface IHandoverRepository
    {
        public int CreateHandover(DimMaxHandover model);
        public Task<DimMaxHandover> GetHandover(int initiativeId);
        public bool UpdateHandover(DimMaxHandover model);
    }
}
