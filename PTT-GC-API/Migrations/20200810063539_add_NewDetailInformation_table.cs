using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_NewDetailInformation_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsUtilityTableRequired",
                table: "ResourceNeededs",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "NewDetailInformations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeYear = table.Column<string>(nullable: true),
                    StrategicObjective = table.Column<string>(nullable: true),
                    Strategy = table.Column<string>(nullable: true),
                    InitiativeTypeMax = table.Column<string>(nullable: true),
                    Workstream = table.Column<string>(nullable: true),
                    SubWorkstream1 = table.Column<string>(nullable: true),
                    SubWorkstream2 = table.Column<string>(nullable: true),
                    ProCategory = table.Column<string>(nullable: true),
                    ProSubCategory = table.Column<string>(nullable: true),
                    ProLever = table.Column<string>(nullable: true),
                    Baseline = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BaselineHistorical = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BaselineNonHistorical = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Saving = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    SavingHistorical = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    SavingNonHistorical = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    IL3Date = table.Column<DateTime>(nullable: true),
                    IL4Date = table.Column<DateTime>(nullable: true),
                    IL5Date = table.Column<DateTime>(nullable: true),
                    EntryMode = table.Column<string>(nullable: true),
                    EntryModeSpecify = table.Column<string>(nullable: true),
                    Geography = table.Column<string>(nullable: true),
                    GeographySpecify = table.Column<string>(nullable: true),
                    RequireBOD1 = table.Column<bool>(nullable: true),
                    BOD1 = table.Column<DateTime>(nullable: true),
                    BOD2 = table.Column<DateTime>(nullable: true),
                    RequireProject = table.Column<bool>(nullable: true),
                    ProjectDirector = table.Column<string>(nullable: true),
                    ProjectDmManager = table.Column<string>(nullable: true),
                    ProjectEngineer = table.Column<string>(nullable: true),
                    ProcessEngineer = table.Column<string>(nullable: true),
                    MgrOfProcessEngineer = table.Column<string>(nullable: true),
                    Irr = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Npv = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    FX = table.Column<string>(maxLength: 500, nullable: true),
                    FirstBudgetYear = table.Column<string>(maxLength: 10, nullable: true),
                    Note = table.Column<string>(nullable: true),
                    StatusProgress = table.Column<string>(nullable: true),
                    ProgressUpdate = table.Column<string>(nullable: true),
                    President = table.Column<string>(nullable: true),
                    Manager = table.Column<string>(nullable: true),
                    ProjectManager = table.Column<string>(nullable: true),
                    ProductionProcess = table.Column<string>(nullable: true),
                    MilestoneSchedule = table.Column<string>(nullable: true),
                    ExpectedTarget = table.Column<string>(nullable: true),
                    ListOfEquipment = table.Column<string>(nullable: true),
                    Comparison = table.Column<string>(nullable: true),
                    ComparisonWithOther = table.Column<string>(nullable: true),
                    otherResources = table.Column<string>(nullable: true),
                    OtherInvestment = table.Column<string>(nullable: true),
                    OthersStrategic = table.Column<string>(nullable: true),
                    Consistent = table.Column<string>(nullable: true),
                    KeySuccessFactor = table.Column<string>(nullable: true),
                    SynergyBenefit = table.Column<string>(nullable: true),
                    OtherStrategic = table.Column<string>(nullable: true),
                    MarketOverview = table.Column<string>(nullable: true),
                    PotentialCustomer = table.Column<string>(nullable: true),
                    SalesPlan = table.Column<string>(nullable: true),
                    SourceOfFeedback = table.Column<string>(nullable: true),
                    OtherBusiness = table.Column<string>(nullable: true),
                    SafetyIndex = table.Column<string>(nullable: true),
                    CorporateImageIndex = table.Column<string>(nullable: true),
                    OtherQuality = table.Column<string>(nullable: true),
                    BaseCase = table.Column<string>(nullable: true),
                    ProjectIrrBaseCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    NpvBaseCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PaybackBaseCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    EbitdaBaseCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OptimisticCase = table.Column<string>(nullable: true),
                    ProjectIrrOptimisticCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    NpvOptimisticCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PaybackOptimisticCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    EbitdaOptimisticCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PessimisticCase = table.Column<string>(nullable: true),
                    ProjectIrrPessimisticCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    NpvPessimisticCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PaybackPessimisticCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    EbitdaPessimisticCase = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    DepreciationCost = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    ForEnvironment = table.Column<string>(nullable: true),
                    ForTurnaround = table.Column<string>(nullable: true),
                    CutFeedDate = table.Column<DateTime>(nullable: true),
                    StartUpDate = table.Column<DateTime>(nullable: true),
                    ReplaceEquipment = table.Column<string>(nullable: true),
                    EquipmentName = table.Column<string>(nullable: true),
                    ReplacementDate = table.Column<DateTime>(nullable: true),
                    OldAssetCondition = table.Column<string>(nullable: true),
                    OldAssetNo = table.Column<string>(nullable: true),
                    EquipmentOrAsset = table.Column<string>(nullable: true),
                    Boi = table.Column<string>(nullable: true),
                    BoiNo = table.Column<string>(nullable: true),
                    Capital = table.Column<bool>(nullable: true),
                    Catalyst = table.Column<bool>(nullable: true),
                    Software = table.Column<bool>(nullable: true),
                    RightOfUse = table.Column<bool>(nullable: true),
                    Coordinate = table.Column<string>(nullable: true),
                    Parties = table.Column<string>(nullable: true),
                    UsefulYear = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    UsefulMonth = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CycleYear = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CycleMonth = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OtherKpis = table.Column<string>(nullable: true),
                    HaveAdditional = table.Column<string>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false),
                    InitiativeCode = table.Column<string>(nullable: true),
                    ValueChain = table.Column<string>(nullable: true),
                    ProjectCategory = table.Column<string>(nullable: true),
                    BaselineStartDate = table.Column<DateTime>(nullable: true),
                    BaselineFinishDate = table.Column<DateTime>(nullable: true),
                    ReviseForecastStartDate = table.Column<DateTime>(nullable: true),
                    ReviseForecastFinishDate = table.Column<DateTime>(nullable: true),
                    ActualStartDate = table.Column<DateTime>(nullable: true),
                    ActualFinishDate = table.Column<DateTime>(nullable: true),
                    IsDeliverAsPerCommittedScope = table.Column<bool>(nullable: true),
                    ScopeDetail = table.Column<string>(nullable: true),
                    IsDeliverAsPerCommittedDate = table.Column<bool>(nullable: true),
                    TimelineDetail = table.Column<string>(nullable: true),
                    IsDeliverAsPerCommittedCost = table.Column<bool>(nullable: true),
                    CostDetail = table.Column<string>(nullable: true),
                    UserFeedback = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewDetailInformations", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "IsUtilityTableRequired",
                table: "ResourceNeededs");
        }
    }
}
