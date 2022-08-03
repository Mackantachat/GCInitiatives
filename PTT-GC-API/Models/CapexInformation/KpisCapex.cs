using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.CapexInformation
{
    public class KpisCapex
    {
        [Key]
        public int KpisCapexId { get; set; }
        public int DetailCapexId { get; set; }
        public string Kpis { get; set; }  //DropDown Frontend หรือใช้ของเก่าที่มีอยู่แล้ว
        public string Target { get; set; }
        public string Frequency { get; set; }  //DropDown Frontend หรือใช้ของเก่าที่มีอยู่แล้ว
    }
}
