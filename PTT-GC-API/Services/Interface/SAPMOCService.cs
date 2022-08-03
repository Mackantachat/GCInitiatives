using PTT_GC_API.Data.Interface;
using PTT_GC_API.Data.Repository;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.IF;
using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Services.Interface
{
    public interface ISAPMOCService
    {
        public string GetSAPStatus(int initiativeId);
        public string GetMOCStatus(int initiativeId);
        public SAPMOCStatus GetSapMocStatus(int initiativeId);
        public IEnumerable<InitiativeList> GetSapMocStatus(IEnumerable<InitiativeList> initiative);
    }
    public class SAPMOCService : ISAPMOCService
    {
        private readonly IIFMOCTransactionRepository _ifMOCStatusRepository;
        private readonly IIFProjectDefinitionRepository _ifProjectDefinitionRepository;

        public SAPMOCService(IIFMOCTransactionRepository ifMOCStatusRepository, IIFProjectDefinitionRepository ifProjectDefinitionRepository)
        {
            _ifMOCStatusRepository = ifMOCStatusRepository;
            _ifProjectDefinitionRepository = ifProjectDefinitionRepository;
        }

        public string GetSAPStatus(int initiativeId)
        {
            IF_ProjectDefinition ifProjectDefinition = _ifProjectDefinitionRepository.GetSAPStatusByInitiativeId(initiativeId);
            if (ifProjectDefinition != null)
            {
                if (ifProjectDefinition.ProjectCloseDate != null)
                    return "Closed";
                else if (ifProjectDefinition.ProjectTECODate != null
                    && ifProjectDefinition.ProjectCloseDate == null)
                    return "TECO";
                else if (ifProjectDefinition.ProjectReleaseDate != null
                    && ifProjectDefinition.ProjectTECODate == null
                    && ifProjectDefinition.ProjectCloseDate == null)
                    return "Released";
                else if (ifProjectDefinition.ProjectReleaseDate == null
                    && ifProjectDefinition.ProjectTECODate == null
                    && ifProjectDefinition.ProjectCloseDate == null)
                    return "Created";
                else
                    return null;
            }
            else
            {
                return null;
            }
        }

        public string GetMOCStatus(int initiativeId)
        {
            int MOCItemCount = 0;
            int MOCRejectCount = 0;
            int MOCCancelCount = 0;
            int MOCCloseCount = 0;
            int MOCInProgressCount = 0;
            List<IF_MOCTransaction> ifMOCTransactions = _ifMOCStatusRepository.GetEmocStatusByIniitiativeId(initiativeId);
            MOCItemCount = ifMOCTransactions.Count;
            foreach (IF_MOCTransaction ifMOCTransaction in ifMOCTransactions)
            {
                if (ifMOCTransaction.EasyTrackingID == 102)
                    MOCRejectCount++;
                else if (ifMOCTransaction.EasyTrackingID == 101)
                    MOCCancelCount++;
                else if (ifMOCTransaction.EasyTrackingID == 100
                    && ifMOCTransaction.P3FinDate != null)
                    MOCCloseCount++;
                else if (ifMOCTransaction.EasyTrackingID < 100)
                    MOCInProgressCount++;
            }
            if (MOCItemCount > 0)
            {
                if (MOCItemCount == MOCRejectCount)
                    return "Rejected";
                else if (MOCItemCount == MOCCancelCount || MOCItemCount == (MOCCancelCount + MOCCloseCount))
                    return "Cancelled";
                else if (MOCItemCount >= MOCCloseCount && MOCInProgressCount == 0)
                    return "Closed";
                else if (MOCInProgressCount > 0)
                    return "In Progress";

            }
            return null;
        }

        public SAPMOCStatus GetSapMocStatus(int initiativeId)
        {
            SAPMOCStatus status = new SAPMOCStatus();
            status.SAPStatus = GetSAPStatus(initiativeId);
            status.MOCStatus = GetMOCStatus(initiativeId);
            return status;
        }

        public IEnumerable<InitiativeList> GetSapMocStatus(IEnumerable<InitiativeList> initiatives)
        {
            foreach (var initiative in initiatives)
            {
                string sapStatus = GetSAPStatus(initiative.Id);
                string mocStatus = GetMOCStatus(initiative.Id);
            }
            return initiatives;
        }
    }
}


