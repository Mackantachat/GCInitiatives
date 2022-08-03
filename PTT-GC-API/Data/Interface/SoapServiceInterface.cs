using PTT_GC_API.Models.SOAPservice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    [ServiceContract]
    interface SoapServiceInterface
    {
        [OperationContract]
        string GetInitiativeStatus(string initiativeCode);

        [OperationContract]
        void XmlMethod(System.Xml.Linq.XElement xml);

        [OperationContract]
        InitiativeStatus InitiativeStatusModel(InitiativeStatus model);
    }
}
