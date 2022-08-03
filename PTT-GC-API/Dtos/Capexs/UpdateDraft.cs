using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Capexs
{
    public class UpdateDraft
    {      
        public string Status { get; set; }
        public string Stage { get; set; }
    }
}
