using System.Collections.Generic;
using PTT_GC_API.Models.ImpactTracking;

namespace PTT_GC_API.Dtos.Initiative
{
    public class InitiativeShareBenefitWorkstream
    {
        public virtual ICollection<ShareBenefitWorkstream> ShareBenefitWorkstreams { get; set; }
    }
}