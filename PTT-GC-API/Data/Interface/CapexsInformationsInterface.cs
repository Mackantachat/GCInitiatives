using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Dtos.Capexs;
using PTT_GC_API.Models.CapexInformation;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Interface
{
    public interface CapexsInformationsInterface 
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
        Task<CapexInformations> GetCapexsInformations(int id, string CapexType);
        Task<List<CapexInformations>> GetCapexsInformationList(int id);
        Task<CapexInformations> GetCapexsInformations_one(int id);
        Task<CapexInformations> GetCapexsInformationsByCapexInformationId(int CapexInformationId);
        Task<CreateAnnualInvestmentPlanDtos> CreateAnnualInvestmentPlan(int id,int capexid ,CreateAnnualInvestmentPlanDtos annualInvestmentPlan);
        
        Task<IEnumerable<AnnualInvestmentPlan>> GetAnnualInvestmentPlan(int id, int capexid);

        Task<CreateMonthlyInvestmentPlanDtos> CreateMonthlyInvestmentPlan(int id,int capexid,CreateMonthlyInvestmentPlanDtos annualInvestmentPlan);
        
        Task<IEnumerable<MonthlyInvestmentPlan>> GetMonthlyInvestmentPlan(int id, int capexid, string  year);

        Task<IEnumerable<AnnualInvestmentPlan>> GetTotalByRevisionAll(int id);

        Task<IEnumerable<CapexInformations>> GetCapexsInformationBySubmit(int id);

        Task<IEnumerable<CapexInitiaitve>> GetPoolInnitiative(string pooltype, int year, int initiativeId);

        Task<IEnumerable<CapexInitiaitve>> GetPoolInnitiativeByID(int poolid);

        Task<IEnumerable<CodeCostCenterDtos>> GetCodeOfCostCenterVP(CodeCostCenterDtos data);

        Task<AnnualInvestmentPlan> GetAnnualInvestmentPlan_sumtatal(int annaul_id);
        Task<DetailInformation> UpdateMangerForMax(int id, string manager, string projectMananger,string vp);
        public void StampSubmitDateTime(int initiativeId, DateTime? nowDatetime);
    }
}