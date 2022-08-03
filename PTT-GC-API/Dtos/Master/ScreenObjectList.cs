using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Master
{
    public class ScreenObjectList
    {
        public int Id { get; set; }
        public string ScreenObjectId { get; set; }
        public string ScreenObjectName { get; set; }
        public string Type { get; set; }
    }
}
