using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.IF
{
    public class IncomingFile
    {
        [Key]
        public int Id { get; set; }
        [StringLength(100)]
        public string DirectoryPath { get; set; }
        [StringLength(100)]
        public string FileName { get; set; }
        public byte[] Data { get; set; }
        [StringLength(100)]
        public string Status { get; set; }
        [StringLength(100)]
        public string CreateUser { get; set; }
        public DateTime? CreateDate { get; set; }
        [StringLength(100)]
        public string UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
