using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.CommonData
{
    public class CommonData
    {
        [Key]
        public int Id { get; set; }
        [StringLength(255)]
        public string DataType { get; set; }
        [StringLength(1024)]
        public string Attribute01 { get; set; }
        [StringLength(1024)]
        public string Attribute02 { get; set; }
        [StringLength(1024)]
        public string Attribute03 { get; set; }
        [StringLength(1024)]
        public string Attribute04 { get; set; }
        [StringLength(1024)]
        public string Attribute05 { get; set; }
        [StringLength(1024)]
        public string Attribute06 { get; set; }
        [StringLength(1024)]
        public string Attribute07 { get; set; }
        [StringLength(1024)]
        public string Attribute08 { get; set; }
        [StringLength(1024)]
        public string Attribute09 { get; set; }
        [StringLength(1024)]
        public string Attribute10 { get; set; }
        [StringLength(1024)]
        public string Attribute11 { get; set; }
        [StringLength(1024)]
        public string Attribute12 { get; set; }
        [StringLength(1024)]
        public string Attribute13 { get; set; }
        [StringLength(1024)]
        public string Attribute14 { get; set; }
        [StringLength(1024)]
        public string Attribute15 { get; set; }
        [StringLength(1024)]
        public string Attribute16 { get; set; }
        [StringLength(1024)]
        public string Attribute17 { get; set; }
        [StringLength(1024)]
        public string Attribute18 { get; set; }
        [StringLength(1024)]
        public string Attribute19 { get; set; }
        [StringLength(1024)]
        public string Attribute20 { get; set; }

        public bool? IsDelete { get; set; }
        public bool? IsDisable { get; set; }
    }
}
