using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_DetailCapex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DetailCapexs",
                columns: table => new
                {
                    DetailCapexId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    VicePresidentOfOwner = table.Column<string>(nullable: true),
                    VpDepartment = table.Column<string>(nullable: true),
                    DivisionManagerOfOwner = table.Column<string>(nullable: true),
                    DmDepartment = table.Column<string>(nullable: true),
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
                    UsefulLife = table.Column<string>(nullable: true),
                    DepreciationCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    KpisRemark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailCapexs", x => x.DetailCapexId);
                });

            migrationBuilder.CreateTable(
                name: "KpisCapexs",
                columns: table => new
                {
                    KpisCapexId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DetailCapexId = table.Column<int>(nullable: false),
                    Kpis = table.Column<string>(nullable: true),
                    Target = table.Column<string>(nullable: true),
                    Frequency = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KpisCapexs", x => x.KpisCapexId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetailCapexs");

            migrationBuilder.DropTable(
                name: "KpisCapexs");
        }
    }
}
