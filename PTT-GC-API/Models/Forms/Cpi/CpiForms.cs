using PTT_GC_API.Dtos.ProgressAndMilestone;
using PTT_GC_API.Dtos.CpiDetailInformationDtos;
using PTT_GC_API.Models.LessonLearned;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
using System.Collections.Generic;
using PTT_GC_API.Dtos.BestPractice;

namespace PTT_GC_API.Models.Forms.Cpi
{
    public class CpiForms
    {
        //public PTT_GC_API.Models.Initiative.Initiative InitiativesForm { get; set; }
        public CpiDetailInformationModel DetailCpiForm { get; set; }
        public CreateProgressDetail? ProgessForm { get; set; }
        public List<LessonsLearned>? LessonLearnedForm { get; set; }
        public BestPracticeModelData? BestPracticeForm { get; set; }
    }
    public class CpiFormsFront
    {
        public PTT_GC_API.Models.Initiative.Initiative InitiativesForm { get; set; }
        public CpiDetailInformationModel DetailCpiForm { get; set; }
        public CreateProgressDetail? ProgessForm { get; set; }
        public List<LessonsLearned>? LessonLearnedForm { get; set; }
        public BestPracticeModelData? BestPracticeForm { get; set; }
    }
}
