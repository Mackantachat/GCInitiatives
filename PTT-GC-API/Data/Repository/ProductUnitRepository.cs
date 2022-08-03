using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Product;

namespace PTT_GC_API.Data.Repository
{
    public class ProductUnitRepository : ProductUnitInterface
    {
        private readonly DataContext _context;
        public ProductUnitRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ProductUnit>> GetList()
        {
            return await _context.ProductUnits.ToListAsync();
        }
    }
}