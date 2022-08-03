using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.EMOCs
{
    public class MoCRequest
    {
        public string ProjectName { get; set; }
        public string MoCType { get; set; }
        public string ExpiredDate { get; set; }
        public string Initiator { get; set; }
        public string MainPlantID { get; set; }
        public MoCPlant[] Plants { get; set; }
    }
}
