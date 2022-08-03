using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.TypeOfInvestment;

namespace PTT_GC_API.Data.Repository
{
    public class TypeOfInvestmentRepository : TypeOfInvestmentInterface
    {
        private readonly DataContext _context;
        public TypeOfInvestmentRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TypeOfInvestment>> GetList()
        {
            return await _context.TypeOfInvestments.OrderBy(t => t.TypeOfInvestmentTitle).ToListAsync();
        }
    }
}