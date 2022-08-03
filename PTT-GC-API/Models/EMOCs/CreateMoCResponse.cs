using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace PTT_GC_API.Models.EMOCs
{
    public class CreateMoCResponse
    {
    }

    public class CreateMoCResult
    {
        public string Status { get; set; }

        public string Message { get; set; }

        public MoCs[] MoCs { get; set; }
    }

    public class MoCs
    {
        public MoCResponse MoCResponse { get; set; }
    }

    public class MoCResponse
    {
        public string MoCNo { get; set; }
        public string PlantID { get; set; }
        public string IsMainPlant { get; set; }
    }
}
