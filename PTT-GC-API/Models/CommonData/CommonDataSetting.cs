using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.CommonData
{
    public class CommonDataSetting
    {
        [Key]
        public int Id { get; set; }
        [StringLength(255)]
        public string DataType { get; set; }
        [StringLength(255)]
        public string DisplayName { get; set; }
        [StringLength(1024)]
        public string AttributeName01 { get; set; }
        [StringLength(1024)]
        public string AttributeName02 { get; set; }
        [StringLength(1024)]
        public string AttributeName03 { get; set; }
        [StringLength(1024)]
        public string AttributeName04 { get; set; }
        [StringLength(1024)]
        public string AttributeName05 { get; set; }
        [StringLength(1024)]
        public string AttributeName06 { get; set; }
        [StringLength(1024)]
        public string AttributeName07 { get; set; }
        [StringLength(1024)]
        public string AttributeName08 { get; set; }
        [StringLength(1024)]
        public string AttributeName09 { get; set; }
        [StringLength(1024)]
        public string AttributeName10 { get; set; }
        [StringLength(1024)]
        public string AttributeName11 { get; set; }
        [StringLength(1024)]
        public string AttributeName12 { get; set; }
        [StringLength(1024)]
        public string AttributeName13 { get; set; }
        [StringLength(1024)]
        public string AttributeName14 { get; set; }
        [StringLength(1024)]
        public string AttributeName15 { get; set; }
        [StringLength(1024)]
        public string AttributeName16 { get; set; }
        [StringLength(1024)]
        public string AttributeName17 { get; set; }
        [StringLength(1024)]
        public string AttributeName18 { get; set; }
        [StringLength(1024)]
        public string AttributeName19 { get; set; }
        [StringLength(1024)]
        public string AttributeName20 { get; set; }
    }
}
