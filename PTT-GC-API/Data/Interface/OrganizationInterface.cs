using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Models.Organization;

namespace PTT_GC_API.Data.Interface
{
    public interface OrganizationInterface
    {
        Task<IEnumerable<Organization>> GetList();
    }
}