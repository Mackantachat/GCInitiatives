using System.Collections.Generic;
using PTT_GC_API.Models.ProgressAndMilestone;

namespace PTT_GC_API.Dtos.Initiative
{
    public class InitiativeProgressAndMilestone
    {
        public virtual ICollection<ProgressDetail> ProgressDetails { get; set; }
    }
}