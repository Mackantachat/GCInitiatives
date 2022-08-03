using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.Plant;

namespace PTT_GC_API.Data.Interface
{
    public interface PlantInterface
    {
        Task<IEnumerable<Plant>> GetList();
    }
}