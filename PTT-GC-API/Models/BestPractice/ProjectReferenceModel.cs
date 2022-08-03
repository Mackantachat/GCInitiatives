using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.BestPractice
{
    public class ProjectReferenceModel
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public int No { get; set; }
        public string ProjectReference { get; set; }
        public bool IsDeleted { get; set; }
    }
}
