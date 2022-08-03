using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using PTT_GC_API.Data;
using PTT_GC_API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Data.Repository;
using SoapCore;
using PTT_GC_API.Controllers;
using System.ServiceModel;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Services;
using PTT_GC_API.Services.Kri;
using PTT_GC_API.Services.Outstanding;
using PTT_GC_API.Services.Interface;
using PTT_GC_API.Services.Permission;
using System.Net.Http;

namespace PTT_GC_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(config =>
            {
                config.UseLazyLoadingProxies();
                config.UseSqlServer((Configuration.GetConnectionString("DefaultConnection")));
            });
            services.AddControllers().AddNewtonsoftJson(
            opt =>
            {
                opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddCors();
            services.AddAutoMapper(typeof(AuthRepository).Assembly);
            services.AddAutoMapper(typeof(UserRepository).Assembly);
            services.AddAutoMapper(typeof(InitiativeRepository).Assembly);
            services.AddScoped<AuthInterface, AuthRepository>();
            services.AddScoped<UserInterface, UserRepository>();
            services.AddScoped<InitiativeInterface, InitiativeRepository>();
            services.AddScoped<OrganizationInterface, OrganizationRepository>();
            services.AddScoped<CoDeveloperInterface, CoDeveloperRepository>();
            services.AddScoped<EntryModeInterface, EntryModeRepository>();
            services.AddScoped<MilestoneStatusInterface, MilestoneStatusRepository>();
            services.AddScoped<OwnerInterface, OwnerRepository>();
            services.AddScoped<PlantInterface, PlantRepository>();
            services.AddScoped<ProductUnitInterface, ProductUnitRepository>();
            services.AddScoped<StrategicObjectiveInterface, StrategicObjectiveRepository>();
            services.AddScoped<StrategyInterface, StrategyRepository>();
            services.AddScoped<TypeOfInvestmentInterface, TypeOfInvestmentRepository>();
            services.AddScoped<TypeOfBenefitInterface, TypeOfBenefitRepository>();
            services.AddScoped<StoreProcedureInterface, StoreProcedureRepository>();
            services.AddScoped<ImpactTrackingInterface, ImpactTrackingRepository>();
            services.AddScoped<WorkStreamInterface, WorkStreamRepository>();
            services.AddScoped<FrequencyInterface, FrequencyRepository>();
            services.AddScoped<KpisInterface, KpisRepository>();
            services.AddScoped<SubWorkstreamInterface, SubWorkstreamRepository>();
            services.AddScoped<InitiativeTypeMaxInterface, InitiativeTypeMaxRepository>();
            services.AddScoped<DetailInformationInterface, DetailInformationRepository>();
            services.AddScoped<DetailCapexsInterface, DetailCapexsRepository>();
            services.AddScoped<PoolBudgetInterface, PoolBudgetRepository>();
            services.AddScoped<CapexsInformationsInterface, CapexsInformationsRepository>();
            services.AddScoped<CurrencyInterface, CurrencyRepository>();
            services.AddScoped<ProgressInterface, ProgressRepository>();
            services.AddScoped<StatusTrackingInterface, StatusTrackingRepository>();
            services.AddScoped<PermissionInterface, PermissionRepository>();
            services.AddScoped<AuditInterface, AuditRepository>();
            services.AddScoped<MaxApproverInterface, MaxApproverRepository>();
            services.AddScoped<HRWebServiceInterface, HRWebServiceRepository>();
            services.AddScoped<LogCommentInterface, LogCommentRepository>();
            services.AddScoped<ITBudgetInterface, ITBudgetRepository>();
            services.AddScoped<InitiativeActionInterface, InitiativeActionRepository>();
            services.AddScoped<ProcurementInterface, ProcurementRepository>();
            services.AddScoped<IFInterface, IFRepository>();
            services.AddScoped<IResourceNeededRepository, ResourceNeededRepository>();
            services.AddScoped<IRiskRepository, RiskRepository>();
            services.AddScoped<IDetailInformationRepository, NewDetailInformationRepository>();
            services.AddScoped<ICommonDataRepository, CommonDataRepository>();
            services.AddScoped<IConsumeAPI, ConsumeAPIRepository>();
            services.AddScoped<ICpiDetailInformationRepository, CpiDetailInformationRepository>();
            services.AddScoped<ILessonLearnedRepository, LessonLearnedRepository>();
            services.AddScoped<IBestPracticeRepository, BestPracticeRepository>();
            services.AddScoped<IKriRepository, KriRepository>();

            services.AddAutoMapper(typeof(PlanLookbackRepository).Assembly);
            services.AddScoped<PlanLookbackInterface, PlanLookbackRepository>();

            services.AddAutoMapper(typeof(CoreUpliftRepository).Assembly);
            services.AddScoped<CoreUpliftInterface, CoreUpliftRepository>();

            services.AddAutoMapper(typeof(ExecutionLookbackRepository).Assembly);
            services.AddScoped<ExecutionLookbackInterface, ExecutionLookbackRepository>();

            services.AddAutoMapper(typeof(ProjectLookbackRepository).Assembly);
            services.AddScoped<ProjectLookbackInterface, ProjectLookbackRepository>();

            services.AddAutoMapper(typeof(ProjectImpactRepository).Assembly);
            services.AddScoped<ProjectImpactInterface, ProjectImpactRepository>();

            services.AddAutoMapper(typeof(ProjectImpactWorkRepository).Assembly);
            services.AddScoped<ProjectImpactWorkInterface, ProjectImpactWorkRepository>();

            services.AddAutoMapper(typeof(CimLookbackRepository).Assembly);
            services.AddScoped<CimLookbackInterface, CimLookbackRepository>();

            services.AddAutoMapper(typeof(EnvironmentProjectTypeRepository).Assembly);
            services.AddScoped<EnvironmentProjectTypeInterface, EnvironmentProjectTypeRepository>();

            services.AddAutoMapper(typeof(LookbackReviewRepository).Assembly);
            services.AddScoped<LookbackReviewInterface, LookbackReviewRepository>();

            services.AddScoped<ICpiFormService, CpiFormService>();
            services.AddScoped<IKriService, KriService>();

            services.AddScoped<EmocInterface, EmocRepository>();
            services.AddScoped<SettingInterface, SettingRepository>();

            services.AddScoped<PDDInterface, PDDRepository>();

            services.AddScoped<IDimMemberRepository, DimMemberRepository>();
            services.AddScoped<IHandoverRepository, HandoverRepository>();

            services.AddScoped<MasterDataInterface, MasterRepository>();
            services.AddScoped<IOutstandingRepository, OutstandingRepository>();
            services.AddScoped<IOutstandingService, OutstandingService>();

            services.AddScoped<KpiKriInterface, KpiKriRepository>();

            services.AddScoped<VacAndPicInterface, VacAndPicRepository>();

            services.AddScoped<IKpiKriMaintain, KpiKriMaintainRepository>();

            services.AddScoped<PerformanceInactiveInterface, PerformanceInactiveRepository>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
             .AddJwtBearer(options =>
             {
                 options.TokenValidationParameters = new TokenValidationParameters
                 {
                     ValidateIssuerSigningKey = true,
                     IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:SecretKey").Value)),
                     ValidateIssuer = false,
                     ValidateAudience = false
                 };
             });
            services.AddScoped<LogUserActivity>();
            services.Configure<BlobConfig>(Configuration.GetSection("BlobConfig"));
            services.Configure<SapInterface>(Configuration.GetSection("SapInterface"));
            services.Configure<UrlPowerAutomate>(Configuration.GetSection("UrlPowerAutomate"));
            services.Configure<UrlEMOC>(Configuration.GetSection("UrlEMOC"));
            services.Configure<UrlCreatePDD>(Configuration.GetSection("UrlCreatePDD"));

            //SOAP Webservice
            services.AddScoped<SoapServiceInterface, SoapServiceController>();
            services.AddSoapCore();

            //custom report header
            services.AddScoped<CustomReportHeaderInterface, CustomReportHeaderRepository>();
            services.AddScoped<InitiativeStatusTrackingInterface, InitiativeStatusTrackingRepository>();
            services.AddScoped<IRRCalculationInterface, IRRCalculationRepository>();
            services.AddScoped<IRRCalculationInterface, IRRCalculateInterOp>();

            //SAPMOCStatus
            services.AddScoped<IIFMOCTransactionRepository, IFMOCTransactionRepository>();
            services.AddScoped<IIFProjectDefinitionRepository, IFProjectDefinitionRepository>();
            services.AddScoped<ISAPMOCService, SAPMOCService>();

            //add scope
            services.AddScoped<IRolePermissionsRepository, RolePermissionsRepository>();
            services.AddScoped<IPermissionService, PermissionService>();

            // more specific than AddMvc()
            services.AddControllersWithViews().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            services.AddHttpClient();

            services.AddHttpClient("SAP").ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; }
            });

            //set timeout
            //services.Configure<FormOptions>(options =>
            //{
            //    options.ValueLengthLimit = int.MaxValue;
            //    options.MultipartBodyLengthLimit = long.MaxValue; // <-- ! long.MaxValue
            //    options.MultipartBoundaryLengthLimit = int.MaxValue;
            //    options.MultipartHeadersCountLimit = int.MaxValue;
            //    options.MultipartHeadersLengthLimit = int.MaxValue;
            //});

            services.AddApplicationInsightsTelemetry(Configuration["APPINSIGHTS_INSTRUMENTATIONKEY"]);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseMiddleware<DeChunkerMiddleware>();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                endpoints.UseSoapEndpoint<SoapServiceInterface>("/GetInitiativeStatus.asmx", new BasicHttpBinding
                {
                    TextEncoding = new UTF8Encoding(false)
                }); //Soap Service

                endpoints.MapDefaultControllerRoute();
            });

            app.UseFastReport(); //fast report

        }
    }
}
