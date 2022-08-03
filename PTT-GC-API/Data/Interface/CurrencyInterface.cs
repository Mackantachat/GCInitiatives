using PTT_GC_API.Models.Currency;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface CurrencyInterface
    {
        Task<IEnumerable<Currency>> GetList();
    }
}
