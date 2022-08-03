using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ResourceNeeded
{
    public class Steam
    {

        //Steam Normal
        public Condensate HighPressure { get; set; }
        public Condensate MediumPressure { get; set; }
        public Condensate LowPressure { get; set; }
        public Condensate OtherSteamPressure { get; set; }
    }
}
