using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Role
{
    public class Position
    {
        [Key]
        public int Id { get; set; }
        public string PositionID { get; set; }
        public string PositionLevel { get; set; }
        public string PositionShortTextEN { get; set; }
        public string PositionTextEN { get; set; }
    }
}
