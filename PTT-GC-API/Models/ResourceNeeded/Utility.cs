using PTT_GC_API.Models.ResourceNeededFormsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ResourceNeeded
{
    public class Utility
    {
        public List<Electricity> ElectricityData { get; set; }
        public Steam SteamData { get; set; }
        public Fluid DeminWaterData { get; set; }
        public Fluid TreatedClarifyWater { get; set; }
        public Condensate ReturnWater { get; set; }
        public Fluid Hydrogen { get; set; }
        public Fluid Nitrogen { get; set; }
        public Fluid NaturalGas { get; set; }
        public List<Other> OtherData { get; set; }
        
    }
}
