using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Models.LessonLearned
{
    public class LessonsLearned
    {
        [Key]
        public int Id { get; set; }
        public bool? IsDeleted { get; set; }
        public int? InitiativeId { get; set; }
        public string LessonLearnTitle { get; set; }
        public string ProjectPhaseNo { get; set; }
        public string MilestoneNo { get; set; }
        public string AreaOfLearning { get; set; }
        public string Issues { get; set; }
        public string Background { get; set; }
        public string LessonLearned { get; set; }
        public string Remark { get; set; }
        public int? Rating { get; set; }
    }
}
