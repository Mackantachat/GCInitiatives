using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Plant;

namespace PTT_GC_API.Data.Repository
{
    public class PlantRepository : PlantInterface
    {
        private readonly DataContext _context;
        public PlantRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Plant>> GetList()
        {
            return await _context.Plants.OrderBy(p => p.PlantTitle).ToListAsync();
        }
    }
}