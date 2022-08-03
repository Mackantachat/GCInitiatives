using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_DetailInformaton : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DetailInformation",
                columns: table => new
                {
                    DetailInformationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    InitiativeYear = table.Column<string>(nullable: true),
                    StrategicObjective = table.Column<string>(nullable: true),
                    Strategy = table.Column<string>(nullable: true),
                    InitiativeTypeMax = table.Column<string>(nullable: true),
                    Workstream = table.Column<string>(nullable: true),
                    SubWorkstream = table.Column<string>(nullable: true),
                    IL3Date = table.Column<DateTime>(nullable: true),
                    IL4Date = table.Column<DateTime>(nullable: true),
                    IL5Date = table.Column<DateTime>(nullable: true),
                    SponsorEvp = table.Column<string>(nullable: true),
                    WorkstreamLead = table.Column<string>(nullable: true),
                    ToFinance = table.Column<string>(nullable: true),
                    CTO = table.Column<string>(nullable: true),
                    CFO = table.Column<string>(nullable: true),
                    ProductionProcess = table.Column<string>(nullable: true),
                    ComparisonWithOther = table.Column<string>(nullable: true),
                    OtherInvestment = table.Column<string>(nullable: true),
                    KeySuccessFactor = table.Column<string>(nullable: true),
                    SynergyBenefit = table.Column<string>(nullable: true),
                    OtherStrategic = table.Column<string>(nullable: true),
                    MarketOverview = table.Column<string>(nullable: true),
                    PotentialCustomer = table.Column<string>(nullable: true),
                    SalesPlan = table.Column<string>(nullable: true),
                    SourceOfFeedstock = table.Column<string>(nullable: true),
                    OtherBusiness = table.Column<string>(nullable: true),
                    SefetyIndex = table.Column<string>(nullable: true),
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
                    UsefulLife = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    SubmitTo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailInformation", x => x.DetailInformationId);
                });

            migrationBuilder.CreateTable(
                name: "Frequency",
                columns: table => new
                {
                    FrequencyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FrequencyTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Frequency", x => x.FrequencyId);
                });

            migrationBuilder.CreateTable(
                name: "InitiativeTypeMax",
                columns: table => new
                {
                    InitiativeTypeMaxId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeTypeMaxTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativeTypeMax", x => x.InitiativeTypeMaxId);
                });

            migrationBuilder.CreateTable(
                name: "KpiDetailInformation",
                columns: table => new
                {
                    KpiDetailInformationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DetailInformationId = table.Column<int>(nullable: false),
                    KpisId = table.Column<int>(nullable: false),
                    Target = table.Column<string>(nullable: true),
                    FrequencyId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KpiDetailInformation", x => x.KpiDetailInformationId);
                });

            migrationBuilder.CreateTable(
                name: "Kpis",
                columns: table => new
                {
                    KpisId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KpisTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kpis", x => x.KpisId);
                });

            migrationBuilder.CreateTable(
                name: "SubWorkstream",
                columns: table => new
                {
                    SubWorkstreamId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkStreamTitle = table.Column<string>(nullable: true),
                    SubWorkstreamTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubWorkstream", x => x.SubWorkstreamId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetailInformation");

            migrationBuilder.DropTable(
                name: "Frequency");

            migrationBuilder.DropTable(
                name: "InitiativeTypeMax");

            migrationBuilder.DropTable(
                name: "KpiDetailInformation");

            migrationBuilder.DropTable(
                name: "Kpis");

            migrationBuilder.DropTable(
                name: "SubWorkstream");
        }
    }
}
