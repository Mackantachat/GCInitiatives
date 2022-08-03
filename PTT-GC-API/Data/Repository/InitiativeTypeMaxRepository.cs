using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.DetailInformation;

namespace PTT_GC_API.Data.Repository
{
    public class InitiativeTypeMaxRepository : InitiativeTypeMaxInterface
    {
        private readonly DataContext _context;
        public InitiativeTypeMaxRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<InitiativeTypeMax>> GetList()
        {
            return await _context.InitiativeTypeMaxs.ToListAsync();
        }
    }
}