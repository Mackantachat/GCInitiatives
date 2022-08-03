using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ResourceNeeded
{
    public class Manpower
    {
        [Key]
        public int Id { get; set; }
        public int? ResourceNeededId { get; set; }
        public string Position { get; set; }
        public int? AmountPerson { get; set; }
        public string Remark { get; set; }

    }
}
