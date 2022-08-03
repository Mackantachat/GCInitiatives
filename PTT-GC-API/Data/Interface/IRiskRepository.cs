using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Dtos;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface IRiskRepository
    {
        public Task<bool> InsertRiskData(RiskModelData[] riskModelData, int initiativeId);
        public int UpdateRiskData(RiskModelData riskModelData);
        public int DeleteRiskKri(RiskKRI kri);
        public bool DeleteRiskData(int RiskId);
        public List<RiskModelData> GetRiskData(int initiativeId);
    }
}
