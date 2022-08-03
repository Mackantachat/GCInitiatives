using System.Collections.Generic;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Dtos.Initiative
{
    public class InitiativeAttachment
    {
        public virtual ICollection<Attachment> Attachments { get; set; }
    }
}