using PTT_GC_API.Models.KRI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Kri
{
    public class Kri
    {
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public int Year { get; set; }
        public KriProgressDetail ProgressDetails { get; set; }
        public KriMitigation MitigationModels { get; set; }
        public List<KriData> KriData { get; set; }
        public string Status { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Owner { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class KriModelData
    {
        public Kri KriForms { get; set; }
    }
}
