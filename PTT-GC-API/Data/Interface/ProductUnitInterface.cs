using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.Product;

namespace PTT_GC_API.Data.Interface
{
    public interface ProductUnitInterface
    {
        Task<IEnumerable<ProductUnit>> GetList();
    }
}