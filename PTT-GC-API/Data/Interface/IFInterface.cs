using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Dtos.NewApprovalSystem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface IFInterface
    {
        Task<bool> CAPEX_IF_001_SAPIM_CP(int initiativeId, DateTime nowDateTIme);
        Task<bool> CAPEX_IF_001_SAPIM_General(int initiativeId, DateTime nowDateTIme);
        Task<bool> CAPEX_IF_001_SAPIM_Yearly(int initiativeId, DateTime nowDateTIme);
        Task<bool> CAPEX_IF_001_SAPIM_Monthly(int initiativeId, DateTime nowDateTIme);
        Task<bool> InsertInitiativeIdToTempTable(int InitiativeId, string IFtype);
        Task<bool> IF_WBS(int initiativeId, DateTime nowDateTIme);
        Task<bool> IF_DAT(int initiativeId, DateTime nowDateTIme);
        Task<bool> IF_POC(int initiativeId, DateTime nowDateTIme);
        Task<bool> IF_PLA(int initiativeId, DateTime nowDateTIme);
        Task<string> InsertIncomingFileData();
        Task<int> Interface_OutGoing(int id, string status, string stage, InitiativeTypeSubType initiativeTypeSubType = null, ApprovalNewSystemParam approvalNewSystemParam = null);
        Task<bool> CAPEX_IF_020_RevisedBG(int initiativeId, DateTime nowDateTIme);
        Task<string> SendRequestWithXML(string xapikey, string endPointURL, string XMLcontent);
        Task<int> SendAppRequest(int id, DateTime nowDateTime, int? createType);
        Task<int> SendWBSRequest(int id, DateTime nowDateTime, int? createType);
        Task<string> ActulaPOCPercentUpdateToSAP(int InitiativeId, DateTime date, int diffDay = 10);
        Task<string> ProjectManagerUpdateToSAP(int InitiativeId);
        Task<string> ProgressOfCompletionFromSAP(int InitiativeId, int diffDay = 10);
        Task<int> SendAppRequestList(DateTime nowDateTime);
        Task<int> SendWBSRequestList(DateTime nowDateTime);
        Task<bool> ValidateWBSRequest(int id);
        Task<string> ChangeInitiativeCodeLongString(string initiativeCode);        
    }
}
