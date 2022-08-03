using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_CapexRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AnnualInvestmentPlans",
                columns: table => new
                {
                    AnnualInvestmentPlanId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CapexInformationId = table.Column<int>(nullable: false),
                    InvestmentPlan = table.Column<string>(nullable: true),
                    InvestmentPlanFx = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Year1 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Year2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Year3 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Year4 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Year5 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Year6 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Year7 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Year8 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Year9 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Year10 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    YearOverall = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnualInvestmentPlans", x => x.AnnualInvestmentPlanId);
                });

            migrationBuilder.CreateTable(
                name: "CapexInformations",
                columns: table => new
                {
                    CapexInformationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    StartingDate = table.Column<DateTime>(nullable: true),
                    ProjecctComRun = table.Column<DateTime>(nullable: true),
                    RequestIniNoDate = table.Column<DateTime>(nullable: true),
                    ProjectExePeriodYear = table.Column<string>(nullable: true),
                    ProjectExePeriodMonth = table.Column<string>(nullable: true),
                    CostCenterOfVP = table.Column<string>(nullable: true),
                    ProjectCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ReasonOfChanging = table.Column<string>(nullable: true),
                    BudgetForm = table.Column<string>(nullable: true),
                    BetweenYear = table.Column<string>(nullable: true),
                    TransferForm = table.Column<string>(nullable: true),
                    PoolBudgetForm = table.Column<string>(nullable: true),
                    SubmitTo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CapexInformations", x => x.CapexInformationId);
                });

            migrationBuilder.CreateTable(
                name: "MonthlyInvestmentPlans",
                columns: table => new
                {
                    MonthlyInvestmentPlanId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnnualInvestmentPlanId = table.Column<int>(nullable: false),
                    InvestmentCost = table.Column<string>(nullable: true),
                    InvestmentCostFx = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Jan = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Feb = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Mar = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Apr = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    May = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Jun = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Jul = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Aug = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Sep = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Oct = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Nov = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Dec = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MonthlyOverall = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonthlyInvestmentPlans", x => x.MonthlyInvestmentPlanId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnnualInvestmentPlans");

            migrationBuilder.DropTable(
                name: "CapexInformations");

            migrationBuilder.DropTable(
                name: "MonthlyInvestmentPlans");
        }
    }
}
