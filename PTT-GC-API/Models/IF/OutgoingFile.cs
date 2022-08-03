using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.IF
{
    public class OutgoingFile
    {
        [Key]
        public int Id { get; set; }
        public string DirectoryPath { get; set; }
        public string FileName { get; set; }
        public byte[] Data { get; set; }
        public string Status { get; set; }
        public string CreateUser { get; set; }
        public DateTime? CreateDate { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
