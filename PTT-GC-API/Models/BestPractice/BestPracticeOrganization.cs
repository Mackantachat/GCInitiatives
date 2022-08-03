using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Models.BestPractice
{
    public class BestPracticeOrganization
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public string Organization { get; set; }
    }
}
