using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.IF
{
    public class IncomingFileData
    {
        [Key]
        public int Id { get; set; }
        public int? FileId { get; set; }
        [StringLength(100)]
        public string DirectoryPath { get; set; }
        [StringLength(100)]
        public string FileName { get; set; }
        public int? Row { get; set; }
        public DateTime? CreatedDate { get; set; }
        [StringLength(100)]
        public string Mark { get; set; }
        [StringLength(100)]
        public string Column1 { get; set; }
        [StringLength(100)]
        public string Column2 { get; set; }
        [StringLength(100)]
        public string Column3 { get; set; }
        [StringLength(100)]
        public string Column4 { get; set; }
        [StringLength(100)]
        public string Column5 { get; set; }
        [StringLength(100)]
        public string Column6 { get; set; }
        [StringLength(100)]
        public string Column7 { get; set; }
        [StringLength(100)]
        public string Column8 { get; set; }
        [StringLength(100)]
        public string Column9 { get; set; }
        [StringLength(100)]
        public string Column10 { get; set; }
        [StringLength(100)]
        public string Column11 { get; set; }
        [StringLength(100)]
        public string Column12 { get; set; }
        [StringLength(100)]
        public string Column13 { get; set; }
        [StringLength(100)]
        public string Column14 { get; set; }
        [StringLength(100)]
        public string Column15 { get; set; }
        [StringLength(100)]
        public string Column16 { get; set; }
        [StringLength(100)]
        public string Column17 { get; set; }
        [StringLength(100)]
        public string Column18 { get; set; }
        [StringLength(100)]
        public string Column19 { get; set; }
        [StringLength(100)]
        public string Column20 { get; set; }
        [StringLength(100)]
        public string Column21 { get; set; }
        [StringLength(100)]
        public string Column22 { get; set; }
        [StringLength(100)]
        public string Column23 { get; set; }
        [StringLength(100)]
        public string Column24 { get; set; }
        [StringLength(100)]
        public string Column25 { get; set; }
        [StringLength(100)]
        public string Column26 { get; set; }
        [StringLength(100)]
        public string Column27 { get; set; }
        [StringLength(100)]
        public string Column28 { get; set; }
        [StringLength(100)]
        public string Column29 { get; set; }
        [StringLength(100)]
        public string Column30 { get; set; }

    }
}
