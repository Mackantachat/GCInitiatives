using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Currency;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class CurrencyRepository : CurrencyInterface
    {
        private readonly DataContext _context;
        public CurrencyRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Currency>> GetList()
        {
            return await _context.Currency.ToListAsync();
        }
    }
}
