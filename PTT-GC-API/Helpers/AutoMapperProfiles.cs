using AutoMapper;
using PTT_GC_API.Dtos;
using PTT_GC_API.Dtos.Audit;
using PTT_GC_API.Dtos.BestPractice;
using PTT_GC_API.Dtos.Capexs;
using PTT_GC_API.Dtos.CimLookback;
using PTT_GC_API.Dtos.CoDeveloper;
using PTT_GC_API.Dtos.CommonData;
using PTT_GC_API.Dtos.CpiDetailInformationDtos;
using PTT_GC_API.Dtos.DetailMaxInformation;
using PTT_GC_API.Dtos.ImpactTracking;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Dtos.ITBudget;
using PTT_GC_API.Dtos.Kri;
using PTT_GC_API.Dtos.Master;
using PTT_GC_API.Dtos.NewApprovalSystem;
using PTT_GC_API.Dtos.Outstanding;
using PTT_GC_API.Dtos.Owner;
using PTT_GC_API.Dtos.ResourceNeededFormsModel;
using PTT_GC_API.Dtos.SkipStageJoinModel;
using PTT_GC_API.Dtos.StrategicObjective;
using PTT_GC_API.Dtos.User;
using PTT_GC_API.Models;
using PTT_GC_API.Models.BestPractice;
using PTT_GC_API.Models.CapexInformation;
using PTT_GC_API.Models.CoDeveloper;
using PTT_GC_API.Models.CommonData;
using PTT_GC_API.Models.CpiDetailInformationData;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.ITBudget;
using PTT_GC_API.Models.KRI;
using PTT_GC_API.Models.Outstanding;
using PTT_GC_API.Models.Owner;
using PTT_GC_API.Models.Permission;
using PTT_GC_API.Models.ProgressAndMilestone;
using PTT_GC_API.Models.ResourceNeeded;
using PTT_GC_API.Models.Role;
using PTT_GC_API.Models.Strategy;
using PTT_GC_API.Models.User;
using System.Collections.Generic;

namespace PTT_GC_API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            // User
            CreateMap<UserRegister, User>();
            CreateMap<UserEdit, User>();
            CreateMap<User, UserList>();
            CreateMap<User, UserDetail>();
            // CoDeveloper
            CreateMap<CoDeveloper, CoDeveloperList>();
            // CommonData
            CreateMap<CommonDataSetting, CommonDataSettingModel>();
            CreateMap<CommonDataSettingModel,CommonDataSetting>();
            // Owner
            CreateMap<Owner, OwnerList>();
            // Initiative
            CreateMap<InitiativeCreate, Initiative>();
            CreateMap<InitiativeUpdate, Initiative>();
            CreateMap<InitiativeRequestOpex, Initiative>();
            CreateMap<InitiativeBenefitAmount, Initiative>();
            CreateMap<Initiative, InitiativeList>();
            CreateMap<Initiative, InitiativeGeneral>();
            CreateMap<Initiative, InitiativeAttachment>();
            CreateMap<Initiative, InitiativeInformation>();
            CreateMap<Initiative, InitiativeSuggestStatus>();
            CreateMap<InitiativeSubmit, Initiative>();
            CreateMap<InitiativeImpact, Initiative>();
            CreateMap<InitiativeSubmitStageStatus, Initiative>();
            CreateMap<InitiativeAddmore, Initiative>();
            // Initiative Detail Product
            CreateMap<Initiative, InitiativeProgress>();
            CreateMap<Product, InitiativeProductList>();
            CreateMap<InitiativeCreateFinancial, Financial>();
            CreateMap<InitiativeCreateDetail, InitiativeDetail>();
            // StrategicObjectiveList
            CreateMap<StrategicObjective, StrategicObjectiveList>();
            // ImpactTracking
            CreateMap<ImpactTrackingCreate, ImpactTracking>();
            CreateMap<ImpactTracking, ImpactTrackingDetail>();
            // DetailMaxInformation
            CreateMap<CreateDetailInformation, DetailInformation>();
            CreateMap<Initiative, InitiativeDetailInformation>();
            // Kpi
            CreateMap<Initiative, InitiativeKpi>();
            // ShareBenefitWorkstream
            CreateMap<Initiative, InitiativeShareBenefitWorkstream>();
            //DetailCarpexs
            CreateMap<DetailCapexsCreate, DetailCapex>();
            //CapexsInformation
            CreateMap<CapexsInformations, CapexInformations>();
            CreateMap<UpdateDraft, Initiative>();
            CreateMap<UpdateCostPool, CapexInformations>();
            CreateMap<UpdateSumtatalBaht, AnnualInvestmentPlan>();
            // ProgressDetail
            CreateMap<Initiative, InitiativeProgressAndMilestone>();
            // Status Tracking
            CreateMap<Initiative, StatusTracking>();
            // Audit
            CreateMap<V_Audit, AuditList>();
            CreateMap<LogComment, Audit>();

            // ITBudget
            CreateMap<ITBudgetCapex, ITBudgetSurvey>();
            CreateMap<ITBudgetOpex , ITBudgetSurvey>();

            //NewDetailInformation
            CreateMap<DetailInformation, CimModel>();
            CreateMap<DetailInformation, DetailInformation_Old>();
            CreateMap<CreateDetailInformation, DetailInformation_Old>();
            CreateMap<DetailInformation_Old, DetailInformationFront>();
            CreateMap<DetailInformationFront, DetailInformation_Old>();

            //Risk
            CreateMap<Risk, RiskModelData>();
            CreateMap< RiskModelData, Risk>();

            //Resource Needed
            CreateMap<ResourceNeeded, ResourceFormsModelData>();
            CreateMap<ResourceFormsModelData,ResourceNeeded>();

            //Best Practice
            CreateMap<BestPracticeModel,BestPracticeModelData>();
            CreateMap<BestPracticeModelData, BestPracticeModel>();

            // Cpi
            CreateMap<CpiDetailInformationModel, DetailInformation>();
            CreateMap<DetailInformation, CpiDetailInformationModel>();

            // KRI Mapper
            CreateMap<KriModel, Kri>();
            CreateMap<Kri, KriModel>();

            // Master
            CreateMap<UserManagement2, OwnerList>();
            CreateMap<Action, ActionList>();
            CreateMap<RoleDetailSetting, RoleList>();
            CreateMap<ScreenObject, ScreenObjectList>();
            CreateMap<UserRole, UserRoleList>();

            CreateMap<OutstandingForm, OutstandingModel>();

            CreateMap<ApprovalNewSystemParam, ApprovalNewSystemParam>();

            CreateMap<CimLookback, CimLookbackList>();

            CreateMap<InitiativeStatusTracking, StatusTrackingsWithDisplayName>();

            //Map For Joined Models
            CreateMap<V_Initiative, JoinCapexInformationInitiativesModel>();
            CreateMap<CapexInformations, JoinCapexInformationInitiativesModel>();

            CreateMap<V_Initiative, JoinViewInitiativeAndDetailInformationsModel>();
            CreateMap<DetailInformation_Old, JoinViewInitiativeAndDetailInformationsModel>();

            CreateMap<V_Initiative, JoinViewInitiativeAndDetailInformationsAndProgressHeader>();
            CreateMap<DetailInformation_Old, JoinViewInitiativeAndDetailInformationsAndProgressHeader>();
            CreateMap<ProgressHeader, JoinViewInitiativeAndDetailInformationsAndProgressHeader>();

        }
    }
}
