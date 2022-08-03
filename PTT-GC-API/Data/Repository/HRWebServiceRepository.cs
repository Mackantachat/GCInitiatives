using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.TempHRWebService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class HRWebServiceRepository : HRWebServiceInterface
    {
        private readonly DataContext _context;
        public HRWebServiceRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TempHRWebService>> GetList()
        {
            return await _context.TempHRWebServices.OrderBy(o => o.CompanyName).Distinct().ToListAsync();
        }
    }
}
