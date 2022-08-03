using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.WorkStream;

namespace PTT_GC_API.Data.Repository
{
    public class WorkStreamRepository : WorkStreamInterface
    {
         private readonly DataContext _context;
        public WorkStreamRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<WorkStream>> GetList()
        {
            return await _context.WorkStreams.OrderBy(t => t.WorkStreamTitle).ToListAsync();
        }
    }
}