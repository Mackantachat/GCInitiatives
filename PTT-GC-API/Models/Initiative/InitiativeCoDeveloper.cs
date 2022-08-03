using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Models.Initiative
{
    public class InitiativeCoDeveloper
    {
        public int Id { get; set; }
        [StringLength(255)]
        public string CoDeveloperName { get; set; }
        public int InitiativeId { get; set; }
    }
}