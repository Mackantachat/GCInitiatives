using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.IF
{
    public class IF_ProjectDefinition
    {
        public DateTime? Load_Date { get; set; }
        public DateTime? UpdateDate { get; set; }
        [StringLength(256)]
        public string Project_Definition_Key { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ProjectReleaseDate { get; set; }
        public DateTime? CapitalizedDate { get; set; }
        public DateTime? ProjectTECODate { get; set; }
        public DateTime? ProjectCloseDate { get; set; }
        public DateTime? ProjectFlagForDel { get; set; }
        public DateTime? ProjectDeleteDate { get; set; }
    }
}
