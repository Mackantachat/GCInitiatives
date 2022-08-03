using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.SOAPservice
{
    [DataContract]
    public class InitiativeStatus
    {
        [DataMember]
        public string InitiativeCode { get; set; }
        [DataMember]
        public string Status { get; set; }
    }
}
