using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Initiative
{
    public class SearchConditonPoolPim
    {
        //organization,plant,gate
        public string Organization { get; set; }
        public string Plant { get; set; }
        public string Gate { get; set; }
    }
}
