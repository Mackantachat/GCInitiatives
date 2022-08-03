using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Models.BestPractice
{
    public class BestPracticePlant
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public string Plant { get; set; }
    }
}
