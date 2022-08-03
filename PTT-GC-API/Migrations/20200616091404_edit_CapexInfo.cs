using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class edit_CapexInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualSpendingThisYear",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "CarryBudget",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "FutureSpendingThisYear",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "SpendingActual",
                table: "AnnualInvestmentPlans");

            migrationBuilder.AddColumn<string>(
                name: "SumMonthlyType",
                table: "MonthlyInvestmentPlans",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "CarriedCost",
                table: "CapexInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SpendingActualAllPrevious",
                table: "CapexInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SpendingActualCurrentYear",
                table: "CapexInformations",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SumMonthlyType",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "CarriedCost",
                table: "CapexInformations");

            migrationBuilder.DropColumn(
                name: "SpendingActualAllPrevious",
                table: "CapexInformations");

            migrationBuilder.DropColumn(
                name: "SpendingActualCurrentYear",
                table: "CapexInformations");

            migrationBuilder.AddColumn<decimal>(
                name: "ActualSpendingThisYear",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "CarryBudget",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "FutureSpendingThisYear",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SpendingActual",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);
        }
    }
}
