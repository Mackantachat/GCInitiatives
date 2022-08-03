using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface IAuditedEntity
    {
        string CreatedBy { get; set; }
        DateTime CreatedAt { get; set; }
        string LastModifiedBy { get; set; }
        DateTime LastModifiedAt { get; set; }
    }

}
