using System;
using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Models.CpiDetailInformationData
{
    public class CpiStepExplaination
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public string StepTitle { get; set; }
        public DateTime Start { get; set; }
        public DateTime Finish { get; set; }
        public string ResponsibleBy { get; set; }
    }
}
