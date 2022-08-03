using Microsoft.AspNetCore.Mvc;
using NPOI.OpenXmlFormats.Wordprocessing;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Kri;
using System;
using System.Collections.Generic;
using System.IdentityModel.Selectors;
using System.Linq;
using System.Security;
using System.Threading.Tasks;

namespace PTT_GC_API.Services.Kri
{
    public class KriService : IKriService
    {
        private readonly IKriRepository _kriRepository;
        private readonly InitiativeInterface _initiativeRepository;
        private readonly InitiativeActionInterface _initiativeActionRepository;
        public KriService(IKriRepository krirepository, InitiativeInterface initiativeRepository,InitiativeActionInterface initiativeActionRepository)
        {
            _kriRepository = krirepository;
            _initiativeRepository = initiativeRepository;
            _initiativeActionRepository = initiativeActionRepository;
        }

        public bool DeleteKriModel(int initiativeId)
        {
            return _kriRepository.DeleteKriModel(initiativeId);
        }

        public KriModelData GetKriModelData(int initiativeId,int year)
        {
            var KriModelData = _kriRepository.GetKriModelData(initiativeId,year);
            return KriModelData;
        }

        public bool InsertKriModel(KriModelData model)
        {
            var result = _kriRepository.InsertKriModel(model);
            return result;
        }

        public bool RemoveKriData(int initiativeId, int sequence)
        {
            return _kriRepository.RemoveKriData(initiativeId, sequence);
        }

        public KriModelData UpdateKriModel(KriModelData model)
        { 
            return _kriRepository.UpdateKriModel(model);
        }

        public bool ChangeStatus(int initiativeId, string status)
        {
            return _kriRepository.ChangeStatus(initiativeId, status);
        }
    }
}
