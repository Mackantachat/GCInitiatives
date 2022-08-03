using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Models.User;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.Milestone;
using PTT_GC_API.Models.Product;
using PTT_GC_API.Models.TypeOfInvestment;
using PTT_GC_API.Models.Organization;
using PTT_GC_API.Models.CoDeveloper;
using PTT_GC_API.Models.EntryMode;
using PTT_GC_API.Models.Owner;
using PTT_GC_API.Models.Plant;
using PTT_GC_API.Models.Strategy;
using PTT_GC_API.Models.TypeOfBenefit;
using PTT_GC_API.Models.WorkStream;
using PTT_GC_API.Models.ImpactTracking;
using PTT_GC_API.Models.DetailInformation;
using PTT_GC_API.Models.CapexInformation;
using PTT_GC_API.Models.PoolBudget;
using PTT_GC_API.Models.Currency;
using PTT_GC_API.Models.SettingChart;
using PTT_GC_API.Models.ProgressAndMilestone;
using PTT_GC_API.Models.TypeofStage;
using PTT_GC_API.Models.OverviewPermission;
using PTT_GC_API.Models.Chart;
using PTT_GC_API.Models.TempHRWebService;
using PTT_GC_API.Models.Permission;
using PTT_GC_API.Models.URLTableSetting;
using PTT_GC_API.Models.ITBudget;
using PTT_GC_API.Models.IF;
using PTT_GC_API.Models;
using PTT_GC_API.Models.ResourceNeeded;
using PTT_GC_API.Models.ResourceNeededFormsModel;
using PTT_GC_API.Models.DashboardPermission;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using System;
using PTT_GC_API.Models.DashboardPermission;
using System.Reflection;
using PTT_GC_API.Models.CommonData;
using PTT_GC_API.Models.LessonLearned;
using PTT_GC_API.Models.CpiDetailInformationData;
using PTT_GC_API.Models.BestPractice;
using PTT_GC_API.Models.KRI;
using ProgressDetail = PTT_GC_API.Models.ProgressAndMilestone.ProgressDetail;
using PTT_GC_API.Models.Outstanding;
using PTT_GC_API.Models.CpiDetailInformation;
using PTT_GC_API.Models.Setting;
using PTT_GC_API.Models.DimMaxHandover;
using PTT_GC_API.Models.EMOCs;
using PTT_GC_API.Models.Role;
using Action = PTT_GC_API.Models.Role.Action;
using PTT_GC_API.Models.VacPic;
using PTT_GC_API.Models.ApprovalFlow;
using PTT_GC_API.Models.PerformanceInactive;

namespace PTT_GC_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Plant> Plants { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<CoDeveloper> CoDevelopers { get; set; }
        public DbSet<Owner> Owners { get; set; }
        public DbSet<TypeOfInvestment> TypeOfInvestments { get; set; }
        public DbSet<Initiative> Initiatives { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<InitiativeCoDeveloper> InitiativeCoDevelopers { get; set; }
        public DbSet<InitiativeDetail> InitiativeDetails { get; set; }
        public DbSet<FinancialIndicator> FinancialIndicators { get; set; }
        public DbSet<Milestone> Milestones { get; set; }
        public DbSet<MilestoneStatus> MilestoneStatuses { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductUnit> ProductUnits { get; set; }
        public DbSet<Strategy> Strategies { get; set; }
        public DbSet<StrategicObjective> StrategicObjectives { get; set; }
        public DbSet<EntryMode> EntryModes { get; set; }
        public DbSet<Financial> Financials { get; set; }
        public DbSet<TypeOfBenefit> TypeOfBenefits { get; set; }
        public DbSet<WorkStream> WorkStreams { get; set; }
        public DbSet<ImpactTracking> ImpactTrackings { get; set; }
        public DbSet<ImpactTypeOfBenefit> ImpactTypeOfBenefits { get; set; }
        public DbSet<ShareBenefitWorkstream> ShareBenefitWorkstreams { get; set; }
        public DbSet<DetailInformation_Old> DetailInformations { get; set; }
        public DbSet<DimMaxHandover> DimMaxHandsover { get; set; }
        public DbSet<InitiativeTypeMax> InitiativeTypeMaxs { get; set; }
        public DbSet<SubWorkstream> SubWorkstreams { get; set; }
        public DbSet<Kpis> Kpises { get; set; }
        public DbSet<Frequency> Frequencies { get; set; }
        public DbSet<KpiDetailInformation> KpiDetailInformations { get; set; }
        public DbSet<InitiativeAction> InitiativeActions { get; set; }
        public DbSet<DetailCapex> DetailCapexs { get; set; }
        public DbSet<KpisCapex> KpisCapexs { get; set; }
        public DbSet<AnnualInvestmentPlan> AnnualInvestmentPlans { get; set; }
        public DbSet<CapexInformations> CapexInformations { get; set; }
        public DbSet<MonthlyInvestmentPlan> MonthlyInvestmentPlans { get; set; }
        public DbSet<PoolBudgetFrom> PoolBudgetFrom { get; set; }
        public DbSet<CapexInformations> CapexInformation { get; set; }
        public DbSet<Currency> Currency { get; set; }
        public DbSet<CustomReportDetail> CustomReportDetail { get; set; }
        public DbSet<CustomReportHeader> CustomReportHeader { get; set; }
        public DbSet<CustomReportParameter> CustomReportParameter { get; set; }
        public DbSet<ProgressDetail> ProgressDetails { get; set; }
        public DbSet<CustomReportReportType> CustomReportReportType { get; set; }
        public DbSet<CustomReportStageType> CustomReportStageType { get; set; }
        public DbSet<InitiativeStatusTracking> InitiativeStatusTrackings { get; set; }
        public DbSet<OverviewPermission> OverviewPermissions { get; set; }
        public DbSet<V_Graph_DDL_Param> V_Graph_DDL_Param { get; set; }
        public DbSet<V_Graph_DDL_X_Axis> V_Graph_DDL_X_Axis { get; set; }
        public DbSet<V_Graph_DDL_Y_Axis> V_Graph_DDL_Y_Axis { get; set; }
        public DbSet<V_CustomExcel1_Y> V_CustomExcel1_Y { get; set; }
        public DbSet<TypeStage> TypeStage { get; set; }
        public DbSet<TypeStageApprover> TypeStageApprover { get; set; }
        public DbSet<BlankablePlan> BlankablePlans { get; set; }
        public DbSet<CLevelTargetLine> CLevelTargetLines { get; set; }
        public DbSet<Audit> Audits { get; set; }
        public DbSet<V_Audit> V_Audits { get; set; }
        public DbSet<MaxApprover> MaxApprovers { get; set; }
        public DbSet<MaxApproverSetting> MaxApproverSettings { get; set; }
        public DbSet<TempHRWebService> TempHRWebServices { get; set; }
        public DbSet<InitiativeStatusHistory> InitiativeStatusHistory { get; set; }

        //Permission
        public DbSet<PageSetting> PageSettings { get; set; }
        public DbSet<RoleManagement> RoleManagements { get; set; }
        public DbSet<RoleSetting> RoleSettings { get; set; }
        public DbSet<SectionSetting> SectionSettings { get; set; }
        public DbSet<UserManagement> UserManagements { get; set; }
        public DbSet<UserOrganization> UserOrganizations { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<UserWorkstream> UserWorkstreams { get; set; }
        public DbSet<URLTable> URLTables { get; set; }

        public DbSet<ITAsset> ITAssets { get; set; }  // Master Data
        public DbSet<CapexTopic> CapexTopics { get; set; } // Master Data
        public DbSet<CapexChoice> CapexChoices { get; set; } // Master Data
        public DbSet<CapexBudgetSurvey> CapexBudgetSurveys { get; set; }
        public DbSet<ITBudgetSurvey> ITBudgetSurveys { get; set; }
        public DbSet<ITBudgetSurveyAsset> ITBudgetSurveyAssets { get; set; }
        public DbSet<Procurement> Procurements { get; set; }
        public DbSet<IncomingFile> IncomingFile { get; set; }
        public DbSet<OutgoingFile> OutgoingFile { get; set; }
        public DbSet<TmpInitiativeCodeIF> TmpInitiativeIdIFs { get; set; }
        public DbSet<DashboardPermission> DashboardPermissions { get; set; }

        public DbSet<ResourceNeeded> ResourceNeededs { get; set; }
        public DbSet<AirPollution> AirPollutions { get; set; }
        public DbSet<Land> Lands { get; set; }
        public DbSet<Manpower> Manpowers { get; set; }
        public DbSet<Waste> Wastes { get; set; }
        public DbSet<Other> Others { get; set; }
        public DbSet<Fluid> Fluids { get; set; }
        public DbSet<Electricity> Electricities { get; set; }
        public DbSet<Condensate> Condensates { get; set; }
        //public DbSet<TimelineRecords> TimelineTables { get; set; }
        //public DbSet<FutureFactors> FutureFactors { get; set; }
        //public DbSet<FutureFactorTimelineRecords> FutureFactorTimelineTables { get; set; }

        public DbSet<Risk> Risk { get; set; }
        public DbSet<RiskProgress> RiskProgress { get; set; }
        public DbSet<RiskKRI> RiskKRIs { get; set; }
        public DbSet<CommonData> CommonData { get; set; }
        public DbSet<CommonDataSetting> CommonDataSetting { get; set; }
        public DbSet<DimMember> DimMembers { get; set; }
        public DbSet<MappingCapexAppWbs> MappingCapexAppWbs { get; set; }

        // Test NewDetailInformation
        public DbSet<DetailInformation> NewDetailInformations { get; set; }
        public DbSet<ProgressPlan> ProgressPlan { get; set; }
        public DbSet<ProgressPlanMontly> ProgressPlanMontly { get; set; }

        // Cpi DetailInformation
        public DbSet<CpiDetailInformation> CpiDetailInformations { get; set; }
        public DbSet<CpiKeyPerformanceIndicator> CpiKpis { get; set; }
        public DbSet<CpiStepExplaination> CpiStepExplaination { get; set; }
        public DbSet<CpiKpiMonitor> CpiKpiMonitor { get; set; }

        // LessonLearned
        public DbSet<LessonsLearned> LessonsLearned { get; set; }

        // BestPractice
        public DbSet<BestPracticeModel> BestPractices { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<ProjectReferenceModel> ProjectReference { get; set; }
        public DbSet<KnowledgeContributorModel> BestPracticeKnowledgeContributors { get; set; }
        public DbSet<BestPracticePlant> BestPracticePlants { get; set; }
        public DbSet<BestPracticeOrganization> BestPracticeOrganizations { get; set; }

        // KRI
        public DbSet<KriModel> Kri { get; set; }
        public DbSet<KriData> KriData { get; set; }
        public DbSet<KriMitigation> KriMitigations { get; set; }
        public DbSet<PTT_GC_API.Models.KRI.KriProgressDetail> KriProgressDetails { get; set; }

        // Outstanding
        public DbSet<OutstandingModel> Outstandings { get; set; }
        public DbSet<OutstandingData> OutstandingData { get; set; }

        public DbSet<RequestEmoc> RequestEmoc { get; set; }
        public DbSet<RequestEmocQuestion> RequestEmocQuestion { get; set; }
        public DbSet<PimGate> PimGate { get; set; }
        public DbSet<ProgressHeader> ProgressHeader { get; set; }
        public DbSet<InvestmentCost> InvestmentCost { get; set; }
        public DbSet<IF_MOCTransaction> IF_MOCTransaction { get; set; }
        public DbSet<IF_ProjectDefinition> IF_ProjectDefinition { get; set; }
        public DbSet<IncomingFileData> IncomingFileData { get; set; }
        public DbSet<InitiativeHistoryIndex> InitiativeHistoryIndex { get; set; }
        public DbSet<InitiativePrint> InitiativePrint { get; set; }

        public DbSet<ProgressPlanDate> ProgressPlanDate { get; set; }
        public DbSet<Setting> Setting { get; set; }

        public DbSet<MainPlant> MainPlant { get; set; }
        public DbSet<MaintainKpi> MaintainKpi { get; set; }
        public DbSet<RoleSettingDetail> RoleSettingDetail { get; set; }

        // New Role
        public DbSet<RoleScreen> RoleScreen { get; set; }
        public DbSet<Action> Action { get; set; }
        public DbSet<RoleDetailSetting> RoleDetailSetting { get; set; }
        public DbSet<ScreenObject> ScreenObject { get; set; }
        public DbSet<BU> BU { get; set; }
        public DbSet<WorkStream2> WorkStream2 { get; set; }
        public DbSet<Position> Position { get; set; }
        public DbSet<UserManagement2> UserManagement2 { get; set; }

        public DbSet<PicList> PicList { get; set; }
        public DbSet<PicMember> PicMember { get; set; }
        public DbSet<InitiativeMember> InitiativeMember { get; set; }
        public DbSet<VacList> VacList { get; set; }
        public DbSet<VacMember> VacMember { get; set; }

        public DbSet<BscNarrative> BscNarrative { get; set; }
        public DbSet<CAPEX_ReportParameter> CAPEX_ReportParameter { get; set; }
        public DbSet<CoreUplift> CoreUplift { get; set; }
        public DbSet<ExecutionLookback> ExecutionLookback { get; set; }
        public DbSet<ProjectImpact> ProjectImpact { get; set; }
        public DbSet<ProjectLookback> ProjectLookback { get; set; }
        public DbSet<LookbackReview> LookbackReview { get; set; }
        public DbSet<CimLookback> CimLookback { get; set; }
        public DbSet<EnvironmentProjectType> EnvironmentProjectType { get; set; }
        public DbSet<ProjectImpactWork> ProjectImpactWork { get; set; }
        public DbSet<InitiativeStage> InitiativeStage { get; set; }
        public DbSet<InitiativeStageActionDetail> InitiativeStageActionDetail { get; set; }
        public DbSet<InitiativeStageDetail> InitiativeStageDetail { get; set; }
        public DbSet<StageActionMaster> StageActionMaster { get; set; }
        public DbSet<StageMaster> StageMaster { get; set; }
        public DbSet<V_InitiativeStageDetail> V_InitiativeStageDetail { get; set; }
        public DbSet<HistoricalGraphIL5Achievement> HistoricalGraphIL5Achievement { get; set; }
        public DbSet<HistoricalGraphNewIL4> HistoricalGraphNewIL4 { get; set; }
        public DbSet<InitiativeListPoolPim> InitiativeListPoolPim { get; set; }

        public DbSet<KriDetailMonth> KriDetailMonth { get; set; }
        public DbSet<KriProgressMitigation> KriProgressMitigation { get; set; }

        public DbSet<InformKri> InformKri { get; set; }
        public DbSet<TmpInitiativeIdAppLists> TmpInitiativeIdAppLists { get; set; }
        public DbSet<TmpInitiativeIdWBSLists> TmpInitiativeIdWBSLists { get; set; }
        public DbSet<Models.PerformanceInactive.PerformanceInactive> PerformanceInactive { get; set; }

        public DbSet<RolePermission> RolePermission { get; set; }
        public DbSet<PermissionMaster> PermissionMaster { get; set; }
        public DbSet<InterfaceActionLog> InterfaceActionLog { get; set; }
        
        //team support
        public DbSet<TeamSupports> TeamSupports { get; set; }
        public DbSet<TeamSupportComments> TeamSupportComments { get; set; }
        public DbSet<SwitchProcessStageMapping> SwitchProcessStageMapping { get; set; }

        //Convert Store Procedure
        public DbSet<V_Initiative> V_Initiative { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<V_Graph_DDL_Param>(e => e.ToView("v_Graph_DDL_Param").HasNoKey());
            modelBuilder.Entity<V_Graph_DDL_X_Axis>(e => e.ToView("v_Graph_DDL_X_Axis").HasNoKey());
            modelBuilder.Entity<V_Graph_DDL_Y_Axis>(e => e.ToView("v_Graph_DDL_Y_Axis").HasNoKey());
            modelBuilder.Entity<V_CustomExcel1_Y>(e => e.ToView("v_CustomExcel1_Y").HasNoKey());
            modelBuilder.Entity<V_Audit>(e => e.ToView("v_Audits").HasNoKey());
            modelBuilder.Entity<V_InitiativeStageDetail>(e => e.ToView("v_InitiativeStageDetail").HasNoKey());
            modelBuilder.Entity<V_Initiative>(e => e.ToView("v_Initiatives").HasNoKey());

            //[6:42 PM] Pasuth Kasemphumirat
            //modelBuilder.Entity<ApplicationUser>().ToTable("ApplicationUsers", t => t.ExcludeFromMigrations());

            modelBuilder.Entity<IF_MOCTransaction>().HasNoKey().ToView(null);
            modelBuilder.Entity<IF_ProjectDefinition>().HasNoKey().ToView(null);
        }

        public override int SaveChanges()
        {
            try
            {
                //ChangeTracker.DetectChanges();
                //var addedAuditedEntities = ChangeTracker.Entries()
                //    .Where(p => p.State == EntityState.Added && p.Metadata.ClrType.Name == "Initiative").ToList();
                //var modifiedAuditedEntities = ChangeTracker.Entries()
                //    .Where(p => p.State == EntityState.Modified && p.Metadata.ClrType.Name == "Initiative").ToList();
                //var deletedAuditedEntities = ChangeTracker.Entries()
                //    .Where(p => p.State == EntityState.Deleted && p.Metadata.ClrType.Name == "Initiative").ToList();
                //foreach (var added in addedAuditedEntities)
                //{
                //    var addObj = added.Properties;
                //    var initiativeCode = added.Properties.Where(x => x.Metadata.Name == "InitiativeCode").First();
                //    var actionDate = added.Properties.Where(x => x.Metadata.Name == "UpdatedDate").First();
                //    var actionBy = added.Properties.Where(x => x.Metadata.Name == "UpdatedBy").First();

                //    foreach (var addItem in addObj)
                //    {

                //        base.Add<Audit>(
                //            new Audit
                //            {
                //                InitiativeCode = initiativeCode.CurrentValue.ToString(),
                //                ActionType = "INSERT",
                //                TableName = addItem.Metadata.DeclaringType.ClrType.Name,
                //                FieldName = addItem.Metadata.Name,
                //                OldValue = null,
                //                NewValue = addItem.CurrentValue != null ? addItem.CurrentValue.ToString() : null,
                //                ActionBy = actionBy.CurrentValue?.ToString(),
                //                ActionDate = Convert.ToDateTime(actionDate.CurrentValue.ToString())
                //            });
                //    }
                //}


                //foreach (var modified in modifiedAuditedEntities)
                //{
                //    var modifyObj = modified.Properties.Where(x => x.IsModified == true);
                //    var initiativeCode = modified.Properties.Where(x => x.Metadata.Name == "InitiativeCode").First();
                //    var actionDate = modified.Properties.Where(x => x.Metadata.Name == "UpdatedDate").First();
                //    var actionBy = modified.Properties.Where(x => x.Metadata.Name == "UpdatedBy").First();

                //    foreach (var modifyItem in modifyObj)
                //    {

                //        base.Add<Audit>(
                //            new Audit
                //            {
                //                InitiativeCode = initiativeCode.CurrentValue.ToString(),
                //                ActionType = "UPDATE",
                //                TableName = modifyItem.Metadata.DeclaringType.ClrType.Name,
                //                FieldName = modifyItem.Metadata.Name,
                //                OldValue = modifyItem.OriginalValue != null ? modifyItem.OriginalValue.ToString() : null,
                //                NewValue = modifyItem.CurrentValue != null ? modifyItem.CurrentValue.ToString() : null,
                //                ActionBy = actionBy.CurrentValue?.ToString(),
                //                ActionDate = Convert.ToDateTime(actionDate.CurrentValue.ToString())
                //            });
                //    }
                //}
                //foreach (var deleted in deletedAuditedEntities)
                //{
                //    var deleteObj = deleted.Properties;
                //    var initiativeCode = deleted.Properties.Where(x => x.Metadata.Name == "InitiativeCode").First();
                //    var actionDate = deleted.Properties.Where(x => x.Metadata.Name == "UpdatedDate").First();
                //    var actionBy = deleted.Properties.Where(x => x.Metadata.Name == "UpdatedBy").First();

                //    foreach (var deleteItem in deleteObj)
                //    {

                //        base.Add<Audit>(
                //            new Audit
                //            {
                //                InitiativeCode = initiativeCode.CurrentValue.ToString(),
                //                ActionType = "DELETE",
                //                TableName = deleteItem.Metadata.DeclaringType.ClrType.Name,
                //                FieldName = deleteItem.Metadata.Name,
                //                OldValue = deleteItem.OriginalValue != null ? deleteItem.OriginalValue.ToString() : null,
                //                NewValue = deleteItem.CurrentValue != null ? deleteItem.CurrentValue.ToString() : null,
                //                ActionBy = actionBy.CurrentValue?.ToString(),
                //                ActionDate = Convert.ToDateTime(actionDate.CurrentValue.ToString())
                //            });
                //    }
                //}
                return base.SaveChanges();
            }
            catch (Exception exc)
            {
                return base.SaveChanges();
                //throw exc;
            }
        }
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            try
            {
                //ChangeTracker.DetectChanges();
                //var addedAuditedEntities = ChangeTracker.Entries()
                //  .Where(p => p.State == EntityState.Added && p.Metadata.ClrType.Name == "Initiative").ToList();
                //var modifiedAuditedEntities = ChangeTracker.Entries()
                //  .Where(p => p.State == EntityState.Modified && p.Metadata.ClrType.Name == "Initiative").ToList();
                //var deletedAuditedEntities = ChangeTracker.Entries()
                //    .Where(p => p.State == EntityState.Deleted && p.Metadata.ClrType.Name == "Initiative").ToList();
                //foreach (var added in addedAuditedEntities)
                //{
                //    var addObj = added.Properties;
                //    var initiativeCode = added.Properties.Where(x => x.Metadata.Name == "InitiativeCode").First();
                //    var actionDate = added.Properties.Where(x => x.Metadata.Name == "UpdatedDate").First();
                //    var actionBy = added.Properties.Where(x => x.Metadata.Name == "UpdatedBy").First();

                //    foreach (var addItem in addObj)
                //    {

                //        await base.AddAsync<Audit>(
                //            new Audit
                //            {
                //                InitiativeCode = initiativeCode.CurrentValue.ToString(),
                //                ActionType = "INSERT",
                //                TableName = addItem.Metadata.DeclaringType.ClrType.Name,
                //                FieldName = addItem.Metadata.Name,
                //                OldValue = null,
                //                NewValue = addItem.CurrentValue != null ? addItem.CurrentValue.ToString() : null,
                //                ActionBy = actionBy.CurrentValue?.ToString(),
                //                ActionDate = Convert.ToDateTime(actionDate.CurrentValue.ToString())
                //            });
                //    }
                //}


                //foreach (var modified in modifiedAuditedEntities)
                //{
                //    var modifyObj = modified.Properties.Where(x => x.IsModified == true);
                //    var initiativeCode = modified.Properties.Where(x => x.Metadata.Name == "InitiativeCode").First();
                //    var actionDate = modified.Properties.Where(x => x.Metadata.Name == "UpdatedDate").First();
                //    var actionBy = modified.Properties.Where(x => x.Metadata.Name == "UpdatedBy").First();

                //    foreach (var modifyItem in modifyObj)
                //    {

                //        await base.AddAsync<Audit>(
                //            new Audit
                //            {
                //                InitiativeCode = initiativeCode.CurrentValue.ToString(),
                //                ActionType = "UPDATE",
                //                TableName = modifyItem.Metadata.DeclaringType.ClrType.Name,
                //                FieldName = modifyItem.Metadata.Name,
                //                OldValue = modifyItem.OriginalValue != null ? modifyItem.OriginalValue.ToString() : null,
                //                NewValue = modifyItem.CurrentValue != null ? modifyItem.CurrentValue.ToString() : null,
                //                ActionBy = actionBy.CurrentValue?.ToString(),
                //                ActionDate = Convert.ToDateTime(actionDate.CurrentValue.ToString())
                //            });
                //    }
                //}
                //foreach (var deleted in deletedAuditedEntities)
                //{
                //    var deleteObj = deleted.Properties;
                //    var initiativeCode = deleted.Properties.Where(x => x.Metadata.Name == "InitiativeCode").First();
                //    var actionDate = deleted.Properties.Where(x => x.Metadata.Name == "UpdatedDate").First();
                //    var actionBy = deleted.Properties.Where(x => x.Metadata.Name == "UpdatedBy").First();

                //    foreach (var deleteItem in deleteObj)
                //    {

                //        await base.AddAsync<Audit>(
                //            new Audit
                //            {
                //                InitiativeCode = initiativeCode.CurrentValue.ToString(),
                //                ActionType = "DELETE",
                //                TableName = deleteItem.Metadata.DeclaringType.ClrType.Name,
                //                FieldName = deleteItem.Metadata.Name,
                //                OldValue = deleteItem.OriginalValue != null ? deleteItem.OriginalValue.ToString() : null,
                //                NewValue = deleteItem.CurrentValue != null ? deleteItem.CurrentValue.ToString() : null,
                //                ActionBy = actionBy.CurrentValue?.ToString(),
                //                ActionDate = Convert.ToDateTime(actionDate.CurrentValue.ToString())
                //            });
                //    }
                //}
                return (await base.SaveChangesAsync(true, cancellationToken));
            }
            catch (Exception exc)
            {
                return (await base.SaveChangesAsync(true, cancellationToken));
                //throw exc;
            }
        }

    }
}